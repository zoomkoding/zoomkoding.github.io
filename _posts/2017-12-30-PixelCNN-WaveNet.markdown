---
layout: post
title:  "Pixel CNN & WaveNet Review"
date:   2017-12-30 19:00:00 +0700
author: Jin
categories: Speech_Synthesis
tags:	TTS Speech_Synthesis GenerativeModel
cover:  "/assets/instacode.png"
---

+	레퍼런스의 Pixel CNN과 WaveNet에 대한 리뷰를 번역하고 약간 수정한 글임.

Pixel CNN, Wavenet에 관련된 간단한 노트이다.

흥미롭게도 모두 게이트 기반 구조이고, 이미지, 오디오, 언어를 generation 하기 위한 AR Model이다. 이런 종류의 AR(AutoRegressive) model은 language modeling에서는 매우 흔하다. 사람들이 이전 단어들이 주어졌을 때 보통 LSTM을 사용해서 다음 단어를 예측하기 때문이다. 지금은 더 많은 분야에 적용되고 있다.

Pixel CNN과 Wavenet은 Deepmind에서 냈다.

## Pixel CNN
+	Pixel CNN paper는 Pixel RNN에 기반을 두고 있다. Pixel RNN은 정확히 language modeling 방법을 이미지에 적용하기 위한 것이다. 그래서 2D 이미지 구조에서 그들은 grid LSTM을 사용한다. 그들은 pixel RNN paper에서 간단한 pixel CNN을 제안한다. 하지만 그 모델은 사각지대를 가져서 이전 픽셀을 모두 사용하는 것이 아니다.
+	더 이상 사각지대를 갖지 않는 조건부 pixel CNN은 더 나은 pixel CNN을 제안한다(NIPS Paper). 그들은 convnet을 수직, 수평으로 두개를 쌓는 것을 제안한다. 수직 스택은 현재 row를 제외한 모든 위쪽 픽셀(그림에서 파란색)을 보고, 수평 스택은 현재 row에서 왼쪽 픽셀(그림에서 보라색)을 본다.

![Screenshot Jupyter](https://raw.githubusercontent.com/yangyangii/yangyangii.github.io/master/assets/_posts/pixel_cnn_example.jpg  "pixel_cnn_example")

+	수직 스택에서의 feature들은 수평 스택과 융합한다. 그래서 수평 스택은 실제로 위쪽 픽셀을 볼 수 있다. 그리고 수평 스택에서는 residual을 사용하고 수직 스택에서는 사용하지 않는다. Future pixel들을 보는 것을 피하려고 masked convolution을 사용한다. 게다가 gated activation unit을 다음 공식과 같이 사용한다.
+	y=tanh(Wf*x)⊙σ(Wg*x)

![Screenshot Jupyter](https://raw.githubusercontent.com/yangyangii/yangyangii.github.io/master/assets/_posts/gated_pixel_cnn.jpg  "gated_pixel_cnn")

+	LSTM으로부터 activation을 빌려왔다. 이미지를 보면, 실제 네트워크에서의 블록이다. 그림은 Gated PixelCNN 구조의 싱글레이어다. 초록색이 Convolution이고, 빨간색은 element-wise로 더하거나 곱해진다. 파란색에서는 convolution에서 두개의 Weight를 조합해서 연산한 아웃풋을 둘로 쪼갠다.

+	Gated unit에 또다른 인풋을 추가해서 조건부 pixel CNN을 얻을 수 있다(아마도 위치 정보를 가질?). 실험결과를 보면 픽셀 당 평균 NLL이 몇몇 데이터에서 좋은 결과를 얻었다.

![Screenshot Jupyter](https://raw.githubusercontent.com/yangyangii/yangyangii.github.io/master/assets/_posts/pixel_cnn_result1.png  "pixel_cnn_result1")

![Screenshot Jupyter](https://raw.githubusercontent.com/yangyangii/yangyangii.github.io/master/assets/_posts/pixel_cnn_result2.png  "pixel_cnn_result2")

+	CIFAR-10에서 PixelRNN보다 약간 안 좋은 성능이었고, ImageNet에서는 더 좋았다. 학습 속도는 2배 빨랐다. (32GPU 60시간)

## Pros.
+	Likelihood를 계산하는 방법을 제공한다
+	학습할 때 GAN보다 더 안정적이다
+	이산 데이터와 연속 데이터 모두에서 작동한다


## Cons.
+	모델이 generation 순서를 어느정도 띤다
+	샘플링이 느리다
+	학습이 느리다(pixel RNN보다는 빠름)
+	샘플 퀄리티가 별로 안 좋다(pixel RNN에 비해서)
+	Feature 학습을 위해 적용이 안된다

## WaveNet
+	WaveNet은 pixelCNN과 구조가 비슷하다. 하지만 PixelCNN이 image generation에서 드러낸 결과보다 audio generation에서 WaveNet이 훨씬 성공적이다. 모델은 raw audio waveform에서 학습되고, raw audio를 생성할 수 있다.

![Screenshot Jupyter](https://raw.githubusercontent.com/yangyangii/yangyangii.github.io/master/assets/_posts/dilated_causal_convolution.jpg  "dilated_causal_convolution")
(dilated convolution은 input을 dilation만큼 건너 뛰면서 진행한다고 보면 됨)

+	최종 구조에서 실제로 레이어 한 묶음을 쌓았다(이미지 참고). 다음 샘플 포인트를 생성하는 regression을 사용하는 대신에 classification framework를 사용한다. Continuous audio는 256개의 value로 정량화(quantize)한다. 여기서 Residual과 gated activation을 사용한다. 게다가 skip connection도 사용한다.

![Screenshot Jupyter](https://raw.githubusercontent.com/yangyangii/yangyangii.github.io/master/assets/_posts/wavenet_architecture.jpg  "wavenet_architecture")
(Causal convolution은 기존에 zero padding을 symmetric하게 하던 것을 왼쪽 시퀀스에만 하는 것)

+	Gated unit에 또다른 인풋을 더함으로써 이 모델을 conditional하게 만들 수 있다. Conditional input은 언어 feature나 speaker의 identity인 one-hot vector가 될 수 있다.
+	Receptive field를 확장하기 위해 Dilated convolution을 사용했지만, receptive field는 겨우 약 300milliseconds다. 그래서 context stacks라고 불리는 또다른 모듈을 더한다. Context stacks는 낮은 해상도에서도 작동하고, 적은 parameter에서 더 이전의 신호를 볼 수 있다.(Receptive field를 계산함에 있어서 몇몇 오해의 소지가 있으나 다음 글에서 언급하도록 함)
+	Wavenet의 결과는 놀라울 정도로 좋다. [https://deepmind.com/blog/wavenet-generative-model-raw-audio/](https://deepmind.com/blog/wavenet-generative-model-raw-audio/)에서 확인할 수 있다. WaveNet은 느리다고 알려져 있지만 Fast WaveNet, Parallel WaveNet에서 간단하게 가속하는 방법을 제안(Parallel은 결코 간단하지 않다...)하고 있다. 단순히 몇몇 redundant 연산을 제거하는 방법이다(마치 브루트 포스에서 다이나믹 프로그래밍으로 바꾸는 느낌 같은 느낌). PixelCNN과 마찬가지로 학습속도는 느리다.
+	WaveNet, Tacotron 등은 조만간 번역이 아닌 나의 리뷰 글을 추가로 올릴 예정.


## References
+   <em>[http://ruotianluo.github.io/2017/01/10/pixelcnn-wavenet/](http://ruotianluo.github.io/2017/01/10/pixelcnn-wavenet/)</em>
+	<em>[https://arxiv.org/pdf/1606.05328v2.pdf](https://arxiv.org/pdf/1606.05328v2.pdf)</em>
+	<em>[https://arxiv.org/pdf/1609.03499.pdf](https://arxiv.org/pdf/1609.03499.pdf)</em>
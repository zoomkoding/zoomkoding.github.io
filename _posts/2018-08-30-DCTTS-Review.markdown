---
layout: post
title:  "Paper Review (DCTTS)"
date:   2018-08-30 15:00:00 +0900
author: Yangyangii
categories: Speech_Synthesis
tags:	Speech_Synthesis
cover:  "/assets/instacode.png"
---

# Efficiently Trainable Text-To-Speech System Based On Deep Convolutional Networks with Guided Attention [Tachibana, H. et al. / 2017]

## Introduction

이 논문은 컨볼루션 신경망 (CNN) 기반의 음성합성 모델인 Deep Convolutional Text-To-Speech (DCTTS)를 제안한다. DCTTS는 선행연구인 Tacotron[1]과 컨볼루션 시퀀스 변환 모델 (Convolutional sequence to sequence transform model)[2]를 기반으로 하고 있다. Tacotron은 전통적인 음성 합성 방식과 달리 딥러닝을 이용한 모델이다. Tacotron은 RNN으로 구성된 인코더와 디코더를 이용해 텍스트를 스펙트로그램(spectrogram)으로 변환하고, Griffin-Lim 알고리즘에 의해 스펙트로그램을 음성 신호로 변환한다. 한편, [2]는 기존의 시퀀스 간 변환 알고리즘들이 RNN에 기반하고 있는데 반해 RNN 대신 CNN을 이용해 시퀀스 간 변환을 수행할 수 있으며, 이 경우 속도 및 성능을 개선할 수 있음을 보였다. 본 논문에서는 [1]의 인코더와 디코더에 사용된 RNN을 [2]에서와 같이 CNN으로 대체함으로써 속도 및 성능을 개선하였으며, 추가적으로 음성 데이터의 특성에 맞는 몇 가지 아이디어를 적용해 학습 효율을 개선하였다.

## Model Architecture: Text2Mel & SSRN

DCTTS는 텍스트를 멜 스펙트로그램(mel spectrogram)으로 변환하는 네트워크(Text2Mel)와 스펙트로그램 변환 네트워크(SSRN, Spectrogram Super-resolution Network)로 구성된다. Text2Mel은 텍스트에서 변환된 문자 임베딩 시퀀스를 입력받아 음성의 멜 스펙트로그램을 출력한다. Text2Mel은 텍스트 인코더(Text encoder), 음성 인코더(Audio Encoder), 주목모델(Attention), 음성 디코더(Audio Decoder) 4개의 하부네트워크로 구성된다. 텍스트 인코더는 1차원 비인과 컨볼루션 (1D non-causal convolution)을 사용하고, 음성 인코더와 음성 디코더는 미래의 정보를 사용하지 않기 위해 1차원 인과 컨볼루션 (1D causal convolution)을 사용한다. SSRN은 멜 스펙트로그램을 입력 받아 이를 선형 스펙트로그램(linear spectrogram)으로 변환한다. SSRN은 단일 네트워크이며 멜 스펙트로그램에서 선형 스펙트로그램의 차원으로 업샘플링하기 위한 컨볼루션으로 구성된다. SSRN을 학습하기 위해서는 Text2Mel이 출력한 멜 스펙트로그램이 요구되지만, 기준값(ground-truth) 멜 스펙트로그램을 이용할 경우 Text2Mel과 동시에 병렬적으로 학습할 수 있다.

![Screenshot](https://raw.githubusercontent.com/yangyangii/yangyangii.github.io/master/assets/_posts/dctts-network-architecture.JPG  "network-architecture")

## Guided Attention

DCTTS에 적용된 또 하나의 아이디어는 주목 모델에 손실 함수를 적용함으로써 학습 효율을 개선한 것이다. 텍스트를 음성으로 변환할 때 문자 간 순서가 뒤바뀌는 경우는 거의 없기 때문에 텍스트를 이루는 문자들과 음성 신호 간 관계는 선형적인 단조 증가 형태를 보인다. DCTTS에는 이 같은 음성 신호의 특성에 착안해 주목행렬(Attention matrix)에서 대각선에서 멀리 있는 원소(element)가 큰 값을 갖는 것을 억제하는 손실 함수를 적용하였다. 이 손실 함수는 문자열과 음성신호 간 대응이 단조 증가 형태를 갖도록 유도함으로써 학습 효율을 개선한다. 실험에서 이러한 손실 함수를 적용하였을 때 주목모델의 학습에 필요한 반복 횟수가 10만 회에서 5천 회로 크게 감소하였다.

$$ Loss(A) = E_{nt}[A_{nt}W_{nt}] $$

$$ W_{nt} = 1 - \exp\{-(n/N - t/T)^2/2g^2\} $$

## Result

DCTTS의 성능을 평가하기 위해 실험을 통해 Tacotron과 성능을 비교했다. 실험에는 한 명의 화자에 대한 음성 데이터인 LJ 데이터가 사용되었다. Tacotron의 MOS는 2.07로 측정된 반면 DCTTS의 MOS는 2.71로 측정되어 DCTTS의 MOS가 0.64만큼 우수하였다. 또한, Tacotron의 학습에 12일이 소요된 반면 DCTTS는 불과 15시간만에 학습이 완료되어 학습 속도가 12배 이상 개선되었다.

## Opinion

CNN으로 바꾸면서 학습 속도가 월등히 빨라진 것은 정말 바람직한 결과다. 구글과 같은 기업이 아닌 이상에야 우리 같은 소시민은 RNN 기반의 모델을 여러 아이디어를 실험해보기에는 어려움이 많다..ㅠㅠ 또한, 음성합성 모델에서 Key, Value, Query를 통해 구성되는 Attention에서 각 Encoder의 아웃풋이 어떤 의미를 갖는지 고민해보는 등 생각해 볼 부분도 많아 좋은 것 같다.

## References
+	[1] <em>[Wang, Yuxuan, et al. "Tacotron: A fully end-to-end text-to-speech synthesis model." arXiv preprint (2017).](https://arxiv.org/abs/1703.10135)</em>
+	[2] <em>[Gehring, Jonas, et al. "Convolutional sequence to sequence learning." arXiv preprint arXiv:1705.03122 (2017).](https://arxiv.org/abs/1705.03122)</em>
+   [3] <em>[Tachibana, Hideyuki, Katsuya Uenoyama, and Shunsuke Aihara. "Efficiently Trainable Text-to-Speech System Based on Deep Convolutional Networks with Guided Attention." arXiv preprint arXiv:1710.08969 (2017).](https://arxiv.org/abs/1710.08969)</em>
---
layout: post
title:  "You May Not Need Attention (Review)"
date:   2018-11-06 23:50:00 +0900
author: Yangyangii
categories: NLP
tags:	NLP
cover:  "/assets/instacode.png"
---

# You May Not Need Attention [Press, O., et al. / 2018]

## Introduction

최근에 좋은 성능을 내고 있는 대부분의 NMT 모델들은 attention을 encoder-decoder 모델이다. 이 논문의 저자들은 attention 없이도 충분한 성능을 낼 수 있다고 주장한다. 여기서 attention이 없어도 된다는 것은 attention mechanism [2]이 없어도 된다는 것이지, alignment가 필요없다는 이야기가 아니다.

## Model Architecture: RNN

제안하는 모델의 구조는 매우 간단하다. 우리가 익히 알고 있는 RNN 모델이다. 논문에서는 <b>eager translation model</b>이라고 표현한다. 하지만 기본적인 RNN 모델로는 순서가 뒤바뀌거나 long term dependency에 대해 잘 학습하기가 어렵다. 따라서, Data preprocessing을 해주는데, alignment를 수작업으로 해준듯 하다. 즉, source sentence의 단어들이 각각 target sentence의 어떤 단어에 해당하는지에 대한 정보가 paired 되어 있다. 그리고 auto-regressive model의 특성으로 causal한 단어 매칭을 위해 padding token으로 $$ \varepsilon $$을 사용한다. target sentence의 단어의 time이 source sentence의 단어의 time보다 먼저나오는 경우 $$ \varepsilon $$을 추가하여 한칸씩 밀어낸다. 따라서, input length와 output length가 같다.

<img src="https://user-images.githubusercontent.com/6456004/48075554-d8478300-e226-11e8-9b59-8e913b9a7bcc.JPG" width="300">

## Experimental Result

실험은 WMT 2014, newstest2013으로 학습하고 newstest2014로 테스트했다. reference model로는 [2]의 구현인 OpenNMT를 사용했다. 개인적으로 BLEU Score가 어떻게 나왔나보다는 Table 1이 더 흥미롭다. Table 1은 각 task별로 $$ \varepsilon $$이 얼마나 들어갔는지를 나타낸다. 각 언어의 문법으로 인해 달라지는 문장 구조를 나타낸다고 볼 수도 있는데, 한국어는 얼마나 나올지 궁금하다.

<img src="https://user-images.githubusercontent.com/6456004/48075555-d8478300-e226-11e8-8933-9e0353756e39.JPG" width="200">

Table 3는 Reference model과의 BLEU score 비교이다. 전체적으로 sentence length가 길수록 더 좋은 성능을 보인다는 것을 어필한다. 아무래도 attention이 만능은 아니다보니 alignment를 supervised learning을 통해 학습한 것 보다는 약한 것 같다. 하지만 이 부분은 길이가 긴 데이터가 더 있다면 이마저도 reference model이 더 좋을것 같다. 특히 큰 비중을 차지하는 word-level의 길이가 20이하인 sentence에 대해 성능이 많이 차이나는데, 치명적인 단점으로 작용하지 않을까 싶다. 대부분 우리는 문장을 짧게 쓰지 않나...?

<img src="https://user-images.githubusercontent.com/6456004/48075556-d8478300-e226-11e8-8249-26fafa54b9fd.JPG" width="200">

## Conclusion

결론은 어텐션 없는 간단한 번역 모델로 [2]의 어텐션 있는 모델만큼 성능이 나왔다는 것이다. 이 논문의 모델과 방법이 좋다는 생각은 딱히 들지 않고, 어텐션이 갖고 있는 의미가 무엇인가에 대해 다시 생각해 볼 여지를 주는 것 같다. 만약 한국어와 영어의 번역도 실험결과로 보여줬다면 뭔가 더 생각할만한 것이 있지 않았을까라는 아쉬움 가득한 논문이다.


## References
+	[1] <em>[Ofir, Press, et al. "You May Not Need Attention."](https://arxiv.org/abs/1810.13409)</em>
+	[2] <em>[Bahdanau, Dzmitry, Kyunghyun Cho, and Yoshua Bengio. "Neural machine translation by jointly learning to align and translate." arXiv preprint arXiv:1409.0473 (2014).](https://arxiv.org/abs/1409.0473)</em>

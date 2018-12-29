---
layout: post
title:  "Statistics Summary with R(3) - Correlation"
date:   2017-01-03 17:18:23 +0700
author: Jin
categories: R
tags:	R Statistics
cover:  "/assets/instacode.png"
---


## 통계에서 필요한 개념들 요약 정리
+   데이터 마이닝을 하는 데에 있어서 필요한 통계적 기법들이 있다. 그런 것들을 분석을 하는 데에 자주 사용하기 위해 정리하는 것이 좋을 것 같다.
+	R을 통해 실습을 하도록 하고, 의미를 파악하고 통찰력을 갖는 데에 필요한 것들을 위주로 통계 개념을 정리한다.

- Topic: Correlation

+	Correlation Coefficient
두 변수의 선형관계의 정도를 보기 위한 방법.
(r = Correlation Coefficient)
-1 <= r <= 1
r=0 -> No correlation
r=-1 or r=1 -> Perfect linear relationship
r<0 -> Negative relationship, r>0 -> Positive relationship
Cor(X, Y) = Cor(Y, X). that is, r treats X and Y symmetricallly
---> Difference with Regression
표준화를 하면 r은 Regression Line의 기울기다.
아래는 재밌는 사이트. Correlation에 대해 직관?을 가질 수 있게 도와주는 게임...ㅋㅋ
(URL: [http://guessthercorrelation.com/](http://guessthercorrelation.com/))
Correlation은 그룹 별로 잘 나눠서 관찰하는 것이 중요하며, Non-linear association의 관계를 나타내기는 어렵다.
해석할 때 Correlation은 인과관계의 원인을 암시하지는 않는다.(그런 경우도 있지만 무조건적으로 결론내리는 것은 좋지않다.)
아래는 잘못된 해석의 예시들을 발견한 것들을 보여준다.
(URL: [https://www.buzzfeed.com/kjh2110/the-10-most-bizarre-correlations?utm_term=.gb4B9e4dpj#.nbxDb4qkOL/](잘못된 Correlation 해석))
아래는 Wikipedia에 있는 Simpson's Paradox 예시들이다.
그룹별로 색깔을 다르게 시각화하면 이런 것들을 예방할 수 있다.
![Screenshot Simpson'sParadox](https://raw.githubusercontent.com/yangyangii/yangyangii.github.io/master/assets/_posts/Simpson's_paradox.png  "Screenshot Simpson'sParadox")
![Screenshot Kidney_stone_treatment](https://raw.githubusercontent.com/yangyangii/yangyangii.github.io/master/assets/_posts/Kidney_stone_treatment.PNG  "Screenshot Kidney_stone_treatment")
하지만 반대로 상관관계가 그룹별로는 강하지만 개개별로 했을 경우에는 약한 경우가 많다.
이런 경우에는 그룹별로만 판단하면 안된다.(Ecological Fallacy)

{% highlight python %}
> cor(mtcars[,1:5], use="complete.obs", method = "pearson")
            mpg        cyl       disp         hp       drat
mpg   1.0000000 -0.8521620 -0.8475514 -0.7761684  0.6811719
cyl  -0.8521620  1.0000000  0.9020329  0.8324475 -0.6999381
disp -0.8475514  0.9020329  1.0000000  0.7909486 -0.7102139
hp   -0.7761684  0.8324475  0.7909486  1.0000000 -0.4487591
drat  0.6811719 -0.6999381 -0.7102139 -0.4487591  1.0000000
{% endhighlight %}

cor 함수를 통해서 상관계수를 볼 수 있으며, use="complete.obs"를 사용하면 NA를 자동으로 걸러준다.


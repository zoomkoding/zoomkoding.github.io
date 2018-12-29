---
layout: post
title:  "Statistics Summary with R(1) - Basic"
date:   2017-01-02 17:18:23 +0700
author: Jin
categories: R
tags:	R Statistics
cover:  "/assets/instacode.png"
---


## 통계에서 필요한 개념들 요약 정리
+   데이터 마이닝을 하는 데에 있어서 필요한 통계적 기법들이 있다. 그런 것들을 분석을 하는 데에 자주 사용하기 위해 정리하는 것이 좋을 것 같다.
+	R을 통해 실습을 하며 익히는 데에 있어서 그 의미를 파악하고 통찰력을 갖는 데에 필요한 것들을 위주로 정리한다.

Bernoulli distribution, Binomial distribution, Poisson distribution, Geometric distribution

Normal distribution


+	Bernoulli Distribution
시행횟수 1번이다.
Outcome이 0 또는 1만 가진다. 성공 혹은 실패.
성공확률 p로 나타내며, 실패확률은 q 혹은 (1-p)로 나타낸다.
E(X) = p 이며, V(X) = p(1-p) 이므로, p = 0.5일 때, 분산값이 가장 크다.
Denoted by X~Bernoulli(p)
Parameter 1개

+	Binomial Distribution
n번 던졌을 때... (즉, 몇번 던질지가 정해져 있다. n은 고정이다.)
E(X) = np, V(X) = np(1-p)
Denoted by X~Bin(n, p)
Parameter 2개
Bernoulli(p) 는 Binomial의 Special Case.(n=1일 때)
Example)
{% highlight python %}
> plot(seq(0,6,1), dbinom(seq(0,6,1), 6, 0.3), type='h', lwd=3)
{% endhighlight %}
![Screenshot Binomial](https://raw.githubusercontent.com/yangyangii/yangyangii.github.io/master/assets/_posts/Statistics-Summary-withR-1.jpeg  "Screenshot Binomial")
{% highlight python %}
> plot(seq(0,6,1), dbinom(seq(0,6,1), 6, 0.5), type='h', lwd=3)
{% endhighlight %}
![Screenshot Binomial2](https://raw.githubusercontent.com/yangyangii/yangyangii.github.io/master/assets/_posts/Statistics-Summary-withR-2.jpeg  "Screenshot Binomial2")

+	Poisson Distribution
단위시간에 일어나는 갯수
E(X) = lambda, Var(X) = lambda
포아송으로 할 경우, 평균과 분산이 같은지는 체크해 볼 필요가 있음.
Denoted by X~Poi(lambda)
Example)
{% highlight python %}
> plot(seq(0,4,1), dpois(seq(0,4,1), 0.5), type='h', lwd=3)
{% endhighlight %}
![Screenshot Poissong](https://raw.githubusercontent.com/yangyangii/yangyangii.github.io/master/assets/_posts/Statistics-Summary-withR-3.jpeg  "Screenshot Poissong")
Example2)
날마다 불량률이 0.5일 때, 오늘 불량이 나지 않을 확률과 3번이상 불량이 날 확률.
{% highlight python %}
> dpois(0, 0.5)
[1] 0.6065307
> 1 - (dpois(0, 0.5) + dpois(1, 0.5) + dpois(2, 0.5))
[1] 0.01438768
> 1 - ppois(2, 0.5)
[1] 0.01438768
{% endhighlight %}

+	Geometric Distribution
남아선호사상이 있을 때, 첫 아들이 나올 때까지 자녀를 낳는다고 해도, 남녀 비율은 1:1이다.
성공할 때까지 낳아야할 자녀의 수.(Setting)
그렇다면 남자 비율이 더 많은 이유는..?

+	Negative Binomial Distribution
k번 성공할 때까지의 횟수.
Geometric distribution은 Special case(k=1)

+	Normal Distribution
Denoted by X~N(μ, σ²)
표준 정규 분포
Z ~ N(0, 1)
μ 로부터 ±σ, ±2σ, ±3σ 범위 내에 확률변수 값이 포함된 확률은 각각 68.3%, 95.4%, 99.7% 이다.
Example)
평균이 75점이고 표준편차 8일 때, 60점부터 80점까지에 분포하는 학생들의 비율
{% highlight python %}
> pnorm(80, 75, 8) - pnorm(60, 75, 8)
[1] 0.7036181
> pnorm(0.625) - pnorm(-1.875)
[1] 0.7036181
{% endhighlight %}



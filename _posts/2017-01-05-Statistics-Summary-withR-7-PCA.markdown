---
layout: post
title:  "Statistics Summary with R(7) - PCA"
date:   2017-01-05 17:18:23 +0700
author: Jin
categories: R
tags:	R Statistics
cover:  "/assets/instacode.png"
---


## 통계에서 필요한 개념들 요약 정리
+   데이터 마이닝을 하는 데에 있어서 필요한 통계적 기법들이 있다. 그런 것들을 분석을 하는 데에 자주 사용하기 위해 정리하는 것이 좋을 것 같다.
+	R을 통해 실습을 하도록 하고, 의미를 파악하고 통찰력을 갖는 데에 필요한 것들을 위주로 통계 개념을 정리한다.

- Topic: Principal Component Analysis, Factor Analysis

+	Principal Component Analysis
PCA는 기존에 Regression을 할 때 x 변수들 간에 Correlation이 높으면 예측모델이 이상해지는데, 이를 보완하기 위한 방법이다.
PCA를 사용하면 x 변수들 간의 Correlation을 줄이고 x들의 변동을 잘 나타내는 값들을 만들어준다.
이 PC값들이 x들의 관계는 Correlation 없이 잘 나타내주지만, y를 잘 대변해주는가는 다른 문제이다.

{% highlight python %}
> install.packages("ISLR")
> library(ISLR)
> train.smarket <- (Smarket$Year < 2005)
> Smarket.2005 <- Smarket[!train.smarket, ]
> dim(Smarket.2005)
[1] 252   9
> Direction.2005 <- Smarket$Direction[!train.smarket]
> glm.fit <- glm(Direction ~ .-Year-Today-Volume,
+                data = Smarket, family = binomial, subset = train.smarket)
> glm.probs <- predict(glm.fit, Smarket.2005, type = "response")
> glm.pred <- rep("Down", 252)
> glm.pred[glm.probs > .5] <- "Up"
> table(glm.pred, Direction.2005)
        Direction.2005
glm.pred Down  Up
    Down   37  30
    Up     74 111
> mean(glm.pred==Direction.2005)
[1] 0.5873016
{% endhighlight %}


+	Factor Analysis
FA는 x 변수들 중에 원하는 변수들만 짝지어준다고 생각하면 쉽다.
예를 들어 국어, 영어, 수학이 있으면 영어, 수학만 가지고 분석하는 방법이다.


--
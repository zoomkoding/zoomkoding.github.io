---
layout: post
title:  "Statistics Summary with R(6) - GLM"
date:   2017-01-04 17:18:23 +0700
author: Jin
categories: R
tags:	R Statistics
cover:  "/assets/instacode.png"
---


## 통계에서 필요한 개념들 요약 정리
+   데이터 마이닝을 하는 데에 있어서 필요한 통계적 기법들이 있다. 그런 것들을 분석을 하는 데에 자주 사용하기 위해 정리하는 것이 좋을 것 같다.
+	R을 통해 실습을 하도록 하고, 의미를 파악하고 통찰력을 갖는 데에 필요한 것들을 위주로 통계 개념을 정리한다.

- Topic: Generalized Linear Model, Logistic Regression

+	Logistic Regression
Generalized Linear Model에는 여러가지가 있는데 그 중에 Logistic Regression을 많이 사용한다.
Logistic Regression은 Linear Regression과 다르게 Binary response variable을 사용가능하다.
link function을 사용하게 되는데, 쉽게 말하자면 성공확률/실패확률이다. 그리고 이것을 Odds라고 한다.
또한 아웃풋으로 1이나 0을 반환하는 것이 아니라, 1일 확률과 0일 확률을 반환한다.
그래서 그 기준을 나누는 적절한 θ를 정하는 것이 이슈가 되기도 한다.(단순히 0.5로 나누는 것이 정답이 아니다)
이 θ를 정하는 방법으로는 θ의 범위를 정하고 모든 성능에 대해 그래프를 그린 후 가장 성능이 좋을 때의 θ를 취하는 방법이 있다.
(이에 대해서는 적절한 예제와 함게 추후에 다루도록 한다)
Logistic Regression에서 Estimate은 Odds가 Xi가 증가할 때 βi배만큼 증가한다는 뜻이다.
이 경우 Intercept는 무시해도 된다.
다음은 Smarket 데이터(S&P Stock Market Data)를 이용해 2005년전까지의 데이터로 학습하고 2005년의 값을 예측한 모델이다.

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

Lag은 주가의 등락을 퍼센트로 나타낸 변수이며, 숫자는 몇일 전 데이터인지 나타낸다.
위의 과정을 통해 Lag 변수로 Logistic Regression을 통해 학습하고 예측한 결과 58%라는 정확도를 얻었다.
물론 변수를 조정하면 예측 성공율 또한 달라진다.
주가 예측에 관련해서도 여러번 시도해봤는데, 정말 쉽지 않다.
Time-series를 이용해 MLP와 RNN으로 예측한 것을 참고하여 Scale도 해보고, 주식 기술 지표들도 넣고 해봤으나 65%정도에 도달하는 것이 최대였다.
혼자 주가 예측을 하여 부자가 되려던 욕심은 그렇게 막이 내렸다는 비밀아닌 비밀...TT

예측을 하는데에 있어서 여기서는 크게 보이지 않지만, 데이터에 따라서 예측 테이블의 Type 1 Error와 Type 2 Error의 중요도가 다른 경우가 있다.
(혹은 False Positive, False Negative)
예를 들면, 기업의 부도예측을 하는 경우

[ 부도가 나는 기업을 부도가 나지 않는다고 하는 것 vs. 멀쩡한 기업을 부도가 난다고 예측하는 것 ]

위와 같은 2가지 에러가 있다고 하자.
이런 예측 시스템이 공개적일 경우 아마도 기업에게는 후자가 치명적으로 작용할 것이고, 주식을 산다거나 고객의 입장에서는 전자가 더 치명적일 것이다.(물론 관점에 따라 달라질 수 있고 그렇기에 중요한 이슈이다)
이런 것들을 조정하는 것 또한 빅데이터를 다루는 전문가가 고려해야할 부분들 중 하나일 것이다.

--
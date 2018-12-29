---
layout: post
title:  "Statistics Summary with R(9) - Penalized Regression"
date:   2017-01-05 17:18:23 +0700
author: Jin
categories: R
tags:	R Statistics
cover:  "/assets/instacode.png"
---


## 통계에서 필요한 개념들 요약 정리
+   데이터 마이닝을 하는 데에 있어서 필요한 통계적 기법들이 있다. 그런 것들을 분석을 하는 데에 자주 사용하기 위해 정리하는 것이 좋을 것 같다.
+	R을 통해 실습을 하도록 하고, 의미를 파악하고 통찰력을 갖는 데에 필요한 것들을 위주로 통계 개념을 정리한다.

- Topic: Penalized Regression

+	Penalized Regression
Regression을 할 때 차원이 높아질때의 해결방법으로 Subset Selection, PCA가 있던 것을 공부했다.
이 외에도 Penalized Regression도 그 방법 중의 하나이다.
Penalized Regression은 Penalty와 fit 사이를 λ를 통해 조정하는 것이다.
λ에 따라 너무 작으면 over-fitting 너무 크면 under-fitting 되는 문제가 생긴다.
따라서, λ를 얼마로 정하느냐에 따라 성능이 차이가 난다.
Penalty function에는 Ridge regression, Lasso, Elastic net 3가지가 있다.

- Ridge regression
제곱합에 Penalty를 주는 것이다.
k-fold Cross-validation
k개의 집합으로 나눠서 train set과 test set을 교차해가며 모델의 성능을 측정해보는 방법이다.
데이터가 클 경우 시간이 오래걸린다는 단점이 있다.
{% highlight python %}
> library(glmnet)
> str(mtcars)
'data.frame':	32 obs. of  11 variables:
 $ mpg : num  21 21 22.8 21.4 18.7 18.1 14.3 24.4 22.8 19.2 ...
 $ cyl : num  6 6 4 6 8 6 8 4 4 6 ...
 $ disp: num  160 160 108 258 360 ...
 $ hp  : num  110 110 93 110 175 105 245 62 95 123 ...
 $ drat: num  3.9 3.9 3.85 3.08 3.15 2.76 3.21 3.69 3.92 3.92 ...
 $ wt  : num  2.62 2.88 2.32 3.21 3.44 ...
 $ qsec: num  16.5 17 18.6 19.4 17 ...
 $ vs  : num  0 0 1 1 0 1 0 1 1 1 ...
 $ am  : num  1 1 1 0 0 0 0 0 0 0 ...
 $ gear: num  4 4 4 3 3 3 3 4 4 4 ...
 $ carb: num  4 4 1 1 2 1 4 2 2 4 ...
> theta = 24
> mc.len = dim(mtcars)[1]
> train.mc <- mtcars[1:theta, ]
> test.mc <- mtcars[(theta+1):mc.len, ]
> mc.train.x <- as.matrix(train.mc[,-1])
> mc.train.y <- as.matrix(train.mc[,1])
> mc.test.x <- as.matrix(test.mc[,-1])
> mc.test.y <- as.matrix(test.mc[,1])
# OLS (Ordinary Least Squares)
> lm.fit <- lm(mpg ~ ., data = train.mc)
> lm.pred <- predict(lm.fit, test.mc)
> (rmse.lm <- sqrt(mean((mc.test.y - lm.pred)^2)))
[1] 4.292271
# Ridge Regression with static lambda
> r.fit <- glmnet(mc.train.x, mc.train.y, family = "gaussian", alpha = 0, lambda = 0.001)
> r.pred <- predict(r.fit, mc.test.x, type = "link")
> (rmse.r <- sqrt(mean((mc.test.y - r.pred)^2)))
[1] 4.283061
# Ridge Regression with cross-validation
> r.cv <- cv.glmnet(mc.train.x, mc.train.y, family = "gaussian", alpha = 0)
> plot(r.cv)
> r.cv$lambda.min
[1] 2.789266
> r.bfit <- glmnet(mc.train.x, mc.train.y, family = "gaussian", alpha = 0, lambda = r.cv$lambda.min)
> r.bpred <- predict(r.bfit, mc.test.x, type = "link")
> (r.brmse <- sqrt(mean((mc.test.y - r.bpred)^2)))
[1] 2.694585
{% endhighlight %}
확인해 보면 Cross-validation을 거친 lambda로 Ridge Regression을 했을 경우 가장 성능이 좋은 것을 확인할 수 있다.
아래는 Cross validation을 plot으로 그린 것이다.
![Screenshot Cross-validation](https://raw.githubusercontent.com/yangyangii/yangyangii.github.io/master/assets/_posts/RR-Cross-Validation.jpeg  "Screenshot Cross-validation")

- Lasso(Least Absolute Shrinkage and Selection Operator)
절대값의 합에 Penalty를 주는 것이다.
{% highlight python %}
> lasso.cv <- cv.glmnet(mc.train.x, mc.train.y, family = "gaussian", alpha = 1)
> lasso.bfit <- glmnet(mc.train.x, mc.train.y, family = "gaussian", alpha = 1, lambda = lasso.cv$lambda.min)
> lasso.bpred <- predict(lasso.bfit, mc.test.x, type = "link")
> (lasso.brmse <- sqrt(mean((mc.test.y - lasso.bpred)^2)))
[1] 3.740217
{% endhighlight %}


- Elastic net
Ridge Regression과 Lasso	를 적절히 취하는 방법이다.
{% highlight python %}
> elastic.cv <- cv.glmnet(mc.train.x, mc.train.y, family = "gaussian", alpha = 0.5)
> elastic.bfit <- glmnet(mc.train.x, mc.train.y, family = "gaussian", alpha = 0.5, lambda = elastic.cv$lambda.min)
> elastic.bpred <- predict(elastic.bfit, mc.test.x, type = "link")
> (elastic.brmse <- rmse(mc.test.y, elastic.bpred))
[1] 2.978411
{% endhighlight %}

mtcars 데이터에서의 성능을 확인해 보면 아래와 같다.
Ridge Regression w/CV > Elastic net w/CV > Lasso w/CV > OLS
물론 데이터에 따라 얼마든지 달라질 수 있으므로 모든 과정을 기억하도록 하자.

--
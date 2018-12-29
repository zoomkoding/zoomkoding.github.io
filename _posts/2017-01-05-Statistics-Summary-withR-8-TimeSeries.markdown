---
layout: post
title:  "Statistics Summary with R(8) - TimeSeries"
date:   2017-01-05 17:18:23 +0700
author: Jin
categories: R
tags:	R Statistics
cover:  "/assets/instacode.png"
---


## 통계에서 필요한 개념들 요약 정리
+   데이터 마이닝을 하는 데에 있어서 필요한 통계적 기법들이 있다. 그런 것들을 분석을 하는 데에 자주 사용하기 위해 정리하는 것이 좋을 것 같다.
+	R을 통해 실습을 하도록 하고, 의미를 파악하고 통찰력을 갖는 데에 필요한 것들을 위주로 통계 개념을 정리한다.

- Topic: Time Series, Smoothing Techniques, ARIMA

+	Time Series
데이터 분석에 있어서 Time Series 데이터들을 어떻게 다룰 것인가에는 여러가지 이슈가 있다.
Time Series 같은 경우에는 x값이 없고 y값만을 가지고 분석을 진행한다.
대부분 특정 날짜에 y값을 가지고 있다. 그래서 y값의 trend 등을 통해 예측을 하게 된다.
또한 Time Series는 오늘의 데이터가 어제, 그제, 그 전날들의 데이터와 Correlation을 갖고 있기 때문에, 이를 다루는 여러 기법들이 나와있다.
그 중에 Smoothing Techniques로는 Moving Average, Exponential Smoothing이 있다.
Moving Average는 y값을 최근 몇일간의 평균값으로 취하는 방법이다.

{% highlight python %}
> mvAvg <- filter(AirPassengers, rep(1/5, 5), sides = 1)
> plot(AirPassengers, col = "blue", ylab = "AirPassengers")
> par(new=T)
> plot(mvAvg, col = "red", ylab = "AirPassengers")
{% endhighlight %}
![Screenshot MovingAverage](https://raw.githubusercontent.com/yangyangii/yangyangii.github.io/master/assets/_posts/TimeSeries-MovingAverage.jpeg  "Screenshot MovingAverage")


Exponential Smoothing은 α를 정해서 과거로 갈수록 (1-α)를 거듭제곱하여 과거의 데이터에 영향을 받지만 α에 따라 강하게 받을지 약하게 받을지를 정하는 방법이다.

{% highlight python %}
> par(mfrow = c(2, 2))
> plot(HoltWinters(AirPassengers, alpha = 0.25, beta = F, gamma = F), main = "Alpha = 0.25")
> plot(HoltWinters(AirPassengers, alpha = 0.5, beta = F, gamma = F), main = "Alpha = 0.5")
> plot(HoltWinters(AirPassengers, alpha = 0.75, beta = F, gamma = F), main = "Alpha = 0.75")
> plot(HoltWinters(AirPassengers, alpha = 1.0, beta = F, gamma = F), main = "Alpha = 1")
{% endhighlight %}
![Screenshot ExponentialSmoothing](https://raw.githubusercontent.com/yangyangii/yangyangii.github.io/master/assets/_posts/Timeseries-Exponential.jpeg  "Screenshot ExponentialSmoothing")

HoltWinters를 통해 forecast 함수를 쓰는 경우 seasonality 등의 요소를 고려해 자동으로 예측한 테이블을 반환해준다.

{% highlight python %}
> plot(forecast(HoltWinters(AirPassengers), h = 12))
{% endhighlight %}
![Screenshot ForecastHoltwinters](https://raw.githubusercontent.com/yangyangii/yangyangii.github.io/master/assets/_posts/Forecast-Holtwinters.jpeg  "Screenshot ForecastHoltwinters")


+	ARIMA(AutoRegressive Integrated Moving Average)
ARIMA도 Smoothing Techniques의 Moving Average처럼 과거의 데이터에 영향을 받아서 예측하기 위한 알고리즘이다.
내부적으로도 Moving Average Model이 있다.
일반적으로 ARIMA(p, d, q)로 3개의 parameter가 있다.
p = order of the autoregressive part
d = degree of first differencing involved
q = order of the moving average part
위와 같은 역할을 하는 parameter가 있으며, arima()함수를 이용하면 수동으로 설정해서 가능하지만 auto.arima() 함수를 사용하면 parameter를 최적화해서 제공한다.

{% highlight python %}
> (arima.fit <- auto.arima(log10(AirPassengers)))
Series: log10(AirPassengers) 
ARIMA(0,1,1)(0,1,1)[12]                    

Coefficients:
          ma1     sma1
      -0.4018  -0.5569
s.e.   0.0896   0.0731

sigma^2 estimated as 0.0002586:  log likelihood=353.96
AIC=-701.92   AICc=-701.73   BIC=-693.29
> arima.fc <- forecast(arima.fit, h = 24)
> plot(arima.fc)
{% endhighlight %}
![Screenshot ARIMA](https://raw.githubusercontent.com/yangyangii/yangyangii.github.io/master/assets/_posts/ARIMA-Forecast.jpeg  "Screenshot ARIMA")

--
---
layout: post
title:  "Statistics Summary with R(5) - ANOVA"
date:   2017-01-04 17:18:23 +0700
author: Jin
categories: R
tags:	R Statistics
cover:  "/assets/instacode.png"
---


## 통계에서 필요한 개념들 요약 정리
+   데이터 마이닝을 하는 데에 있어서 필요한 통계적 기법들이 있다. 그런 것들을 분석을 하는 데에 자주 사용하기 위해 정리하는 것이 좋을 것 같다.
+	R을 통해 실습을 하도록 하고, 의미를 파악하고 통찰력을 갖는 데에 필요한 것들을 위주로 통계 개념을 정리한다.

- Topic: ANOVA, F-test

+	One-way ANOVA
t-test로는 1개 혹은 2개의 그룹에 대해서만 검증이 가능하다.
그 이상의 그룹을 검증할 경우 여러번의 test를 거쳐야하는데, 이 경우에는 Type1 error가 증가하는 등 Multiple test의 문제가 발생한다.
이를 해결하는 방법은 아직도 논의중이다.
그래서 2개 이상의 그룹에 대해 ANOVA를 통해 test를 하게 된다.
ANOVA의 경우에는 statistic을 구할 때 Between groups와 Within groups로 나누어 Mean Squares(Variance)를 계산하고 MSB/MSW를 계산한다.

{% highlight python %}
> tapply(InsectSprays$count, InsectSprays$spray, mean)
        A         B         C         D         E         F 
14.500000 15.333333  2.083333  4.916667  3.500000 16.666667 
> tapply(InsectSprays$count, InsectSprays$spray, var)
        A         B         C         D         E         F 
22.272727 18.242424  3.901515  6.265152  3.000000 38.606061 
> tapply(InsectSprays$count, InsectSprays$spray, length)
 A  B  C  D  E  F 
12 12 12 12 12 12 
> boxplot(count ~ spray, data = InsectSprays)
{% endhighlight %}
![Screenshot ANOVA-Boxplot](https://raw.githubusercontent.com/yangyangii/yangyangii.github.io/master/assets/_posts/ANOVA-Boxplot.jpeg  "Screenshot ANOVA-Boxplot")


Box Plot을 관찰해보면 test를 하기에 유의해보인다. 그러므로 One-way ANOVA test를 진행해보자
{% highlight python %}
> oneway.test(count ~ spray, data = InsectSprays)

	One-way analysis of means (not assuming equal variances)

data:  count and spray
F = 36.065, num df = 5.000, denom df = 30.043, p-value = 7.999e-12
{% endhighlight %}
ANOVA test는 오른쪽 꼬리만 생각하면된다.
p-value < .5 이므로 각 그룹이 같지 않다고 볼 수 있다.

+	Two-way ANOVA
One-way ANOVA와의 큰 차이점으로 interaction이 있다고 보면된다.
변수들간에 interaction에서 어떤 결과가 나오는지를 다 나타내준다.
대표적인 편리한 함수로 interaction.plot()이 있다.
lm()함수의 결과에 anova()함수를 쓰면 anova table을 확인할 수 있다.
또한 마찬가지로 테스트하기에 앞서 Box Plot을 그려서 육안으로 확인해보는 것이 좋다.
interaction의 결과를 보면 어떻게 했을 때 더 좋은 결과가 있는지 등을 확인할 수 있다.


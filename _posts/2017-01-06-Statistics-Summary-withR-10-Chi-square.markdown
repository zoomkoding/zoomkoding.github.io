---
layout: post
title:  "Statistics Summary with R(10) - Chi-square"
date:   2017-01-06 17:18:23 +0700
author: Jin
categories: R
tags:	R Statistics
cover:  "/assets/instacode.png"
---


## 통계에서 필요한 개념들 요약 정리
+   데이터 마이닝을 하는 데에 있어서 필요한 통계적 기법들이 있다. 그런 것들을 분석을 하는 데에 자주 사용하기 위해 정리하는 것이 좋을 것 같다.
+	R을 통해 실습을 하도록 하고, 의미를 파악하고 통찰력을 갖는 데에 필요한 것들을 위주로 통계 개념을 정리한다.

- Topic: Chi-squared Test

+	Chi-squared Test
Chi-squared Test를 하는 경우는 다음 3가지와 같다.
• Testing independence • Testing homogeneity • Testing goodness-of-fit
두 변수가 얼마나 독립적인가, 두 그룹이 얼마나 같은 분포를 가지고 있나(동질성), 특정 분포에서 일관되는가를 검정한다.
주로 실제 관찰된 빈도와 기대 빈도가 얼마나 가까운가를 검정하는데 따라서, Count의 값을 가진 데이터를 사용한다.
독립성과 동질성은 테스트 방법이 동일하다.
먼저 Test-statistic 계산 공식은 아래와 같다.

![Screenshot Chi-squared-test](https://raw.githubusercontent.com/yangyangii/yangyangii.github.io/master/assets/_posts/Chi-squared-test.PNG  "Screenshot Chi-squared-test")


독립성과 동질성에서 기대값은 (Row Total * Col Total) / Total 이다.
독립성 테스트의 귀무가설은 "H0: 두 변수는 독립적이다"
동질성 테스트의 귀무가설은 "H0: 두 그룹의 분포가 같다"
Goodness of fit 테스트의 귀무가설은 "H0: 해당 값들이 치우치지 않았다"
다음은 Goodness of fit test의 결과이다.
{% highlight python %}
> (insect.table <- tapply(InsectSprays$count, InsectSprays$spray, sum))
  A   B   C   D   E   F 
174 184  25  59  42 200 
> chisq.test(insect.table)

	Chi-squared test for given probabilities

data:  insect.table
X-squared = 280.93, df = 5, p-value < 2.2e-16
{% endhighlight %}
유의수준을 0.05라고 할 때, p-value < 0.05 이므로 두 그룹의 값들이 치우쳐져 있다고 볼 수 있다.


--
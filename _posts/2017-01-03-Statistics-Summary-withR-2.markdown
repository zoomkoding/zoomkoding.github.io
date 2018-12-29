---
layout: post
title:  "Statistics Summary with R(2) - CLT, t-test"
date:   2017-01-03 17:18:23 +0700
author: Jin
categories: R
tags:	R Statistics
cover:  "/assets/instacode.png"
---


## 통계에서 필요한 개념들 요약 정리
+   데이터 마이닝을 하는 데에 있어서 필요한 통계적 기법들이 있다. 그런 것들을 분석을 하는 데에 자주 사용하기 위해 정리하는 것이 좋을 것 같다.
+	R을 통해 실습을 하도록 하고, 의미를 파악하고 통찰력을 갖는 데에 필요한 것들을 위주로 통계 개념을 정리한다.

Sampling, Central Limit Theorem, t distribution, chi-square distribution, F distribution


+	Sampling Distribution
표본들의 평균은 모집단의 평균이다.
μx̄ = μ
실제 생활에서는 모집단의 정보를 알아내기 위해 표본집단의 정보를 사용하고 이를 위해 통계가 쓰인다.


+	Central Limit Theorem
모집단이 Normal이면 표본도 Normal
모집단이 Normal이 아니어도, N이 충분히 크면(N>=30) approximately Normal
Example)
{% highlight python %}
> hist(rbinom(10000, 1, 0.9), breaks = c(-0.5,0.5,1.5), freq=F, xlab='x', main='Bernoulli(0.9)')
{% endhighlight %}
![Screenshot CentralLimitTheorem](https://raw.githubusercontent.com/yangyangii/yangyangii.github.io/master/assets/_posts/Statistics-Summary-withR-4.jpeg  "Screenshot CentralLimitTheorem")
{% highlight python %}
> x <- numeric()
> for (i in 1:10000) x <- c(x, mean(rbinom(50,1,0.9)))
> hist(x, freq = F, main='n=50')
{% endhighlight %}
![Screenshot CentralLimitTheorem2](https://raw.githubusercontent.com/yangyangii/yangyangii.github.io/master/assets/_posts/Statistics-Summary-withR-5.jpeg  "Screenshot CentralLimitTheorem2")


+	Hypothesis Testing
p-value, test statistic, t-value
H0 : μ = 0
H1 : μ ≠ 0
-> 양측 검정.
H0 : μ = 0
H1 : μ > 0 or H1 : μ < 0
-> 단측 검정.

Steps of Hypothesis Testing
1. Build hypothesis
2. Set significance level
3. Determine test statistic
4. Collect data
5. Calculate test statistic
6. Make conclusion

+	t-test example
(출처: [http://www.kocw.net/home/search/kemView.do?kemId=865312/](http://www.kocw.net/home/search/kemView.do?kemId=865312/))
* 위 출처에 있는 강의자료 pdf는 R에 대하여 아주 훌륭하게 요약 정리 되어있다. 다른 프로그래밍 언어를 익힌 개발자의 경우 아주 짧은 시간 내에 R을 개략적으로 익힐 수 있다.

문제 예시1: mtcars 자료를 이용하여 1973 년부터 1974 년까지 미국에서 생산된 자동차들의 평균 연비는 갤런당 20 마일(20mpg)로 알려져 있다. 수동미션 차량들이 자동미션 차량보다 연비가 좋다는 것을 밝히기 위해 수동 미션 차량들의 연비는 20mpg 보다 크다고 할 수 있는지 유의수준 0.05 에서 검정하시오 

{% highlight python %}
> with(mtcars, t.test(mpg[am==1], mu=20, alternative="greater"))

	One Sample t-test

data:  mpg[am == 1]
t = 2.5682, df = 12, p-value = 0.01231
alternative hypothesis: true mean is greater than 20
95 percent confidence interval:
 21.3441     Inf
sample estimates:
mean of x 
 24.39231 
{% endhighlight %}

위는 t값, p-value 등 값을 구해주며, decision은 개발자가 직접 판단 후 내려야한다.
이 경우에는 p-value가 0.05 보다 작으므로 reject 할 수 없다. 즉, 수동미션 차량이 연비가 더 좋다고 볼 수 있다.

문제 예시2: R 내장자료인 sleep 은 서로 다른 두 종류(group)의 수면제로 각각의 약을 투여하고 수면시간의 증감(extra)을 조사하였다. 서로 다른 두 약물은 수면 시간의 증감에 차이가 있는지 유의수준 0.05 에서 검정하시오. 
{% highlight python %}
> str(sleep)
'data.frame':	20 obs. of  3 variables:
 $ extra: num  0.7 -1.6 -0.2 -1.2 -0.1 3.4 3.7 0.8 0 2 ...
 $ group: Factor w/ 2 levels "1","2": 1 1 1 1 1 1 1 1 1 1 ...
 $ ID   : Factor w/ 10 levels "1","2","3","4",..: 1 2 3 4 5 6 7 8 9 10 ...
> with(sleep, t.test(extra[group == 1], extra[group == 2], paired = T))

	Paired t-test

data:  extra[group == 1] and extra[group == 2]
t = -4.0621, df = 9, p-value = 0.002833
alternative hypothesis: true difference in means is not equal to 0
95 percent confidence interval:
 -2.4598858 -0.7001142
sample estimates:
mean of the differences 
  -1.58 
{% endhighlight %}
p-value < 0.05 이므로 두 약물은 수면 시간의 증감에 차이가 있다고 볼 수 있다.

문제 예시3: R 내장자료인 InsectSpray 는 서로 다른 여섯종류(spray)의 살충제를 뿌려 죽은 벌레의 수(count)를 관찰한 데이터이다. 이중 A 와 B 살충제의 성능을 비교하려고 한다. A 와 B 두 살충제는 단위 면적당 죽인 벌레 수에 차이가 있는지 유의수준 0.05 에서 검정하시오.(A 와 B 의 단위 면적당 죽인 벌레 수의 분산은 서로 동일하다고 가정한다.) 
{% highlight python %}
> with(InsectSprays, t.test(count[spray == "A"], count[spray == "B"], var.equal = T))

	Two Sample t-test

data:  count[spray == "A"] and count[spray == "B"]
t = -0.45352, df = 22, p-value = 0.6546
alternative hypothesis: true difference in means is not equal to 0
95 percent confidence interval:
 -4.643994  2.977327
sample estimates:
mean of x mean of y 
 14.50000  15.33333
{% endhighlight %}

각 약물의 평균은 육안으로 보기에는 차이가 나보이나, p-value > 0.05 이므로 차이가 난다고 보기 어렵다.
(두 약물이 같지 않다는 대립가설을 reject)
var.equal의 경우에는 모분산이 서로 동일하다는 가정하에서 사용하는데, 이를 검증하기 위해서는 F검증을 통해서 가능하다.


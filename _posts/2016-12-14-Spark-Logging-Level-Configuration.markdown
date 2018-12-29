---
layout: post
title:  "Spark Logging Level Configuration"
date:   2016-12-14 15:18:23 +0700
author: Jin
categories: Spark
tags:	Spark Cloudera
cover:  "/assets/instacode.png"
---



## 귀찮은 Spark Log Level 지우기
+   Spark를 사용하는 경우 yarn으로 클러스터가 연동되어 있으면 [INFO] Level의 로그가 상당히 많이 뜨게 된다. 이 경우 로그 레벨을 조정해서 콘솔창을 깔끔하게 사용할 수 있다. 아래와 같이 변경하면 된다.


{% highlight ruby %}
sudo vi /etc/spark/conf/log4j.properties

root.logger=INFO,console
-> root.logger=WARN,console
{% endhighlight %}
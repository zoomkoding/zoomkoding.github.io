---
layout: post
title:  "Ubuntu 14.04LTS에서 클라우데라 구축하기(2)"
date:   2016-09-28 15:18:23 +0700
author: Jin
categories: Spark
tags:	Spark Cloudera
cover:  "/assets/instacode.png"
---

이전 글에서는 Ubuntu14.04LTS 환경에서 Cloudera Manager Server 설치와 여러가지 환경설정을 보았다. 이번 글에서는 설치된 Server에 접속하여 Web UI에서 클러스터를 구축하는 법을 보도록 한다.

## References
+   <em>[https://github.com/biospin/BigBio/blob/master/part03/week01_160503/hadoop/cloudera_install.md](https://github.com/biospin/BigBio/blob/master/part03/week01_160503/hadoop/cloudera_install.md)</em> - 운영체제와 관련없이 겹치는 부분은 대부분 보고 그대로 적은 부분이 많습니다.
+   <em>[https://community.cloudera.com/t5/CDH-Manual-Installation/How-to-resolve-quot-Permission-denied-quot-errors-in-CDH/ta-p/36141](https://community.cloudera.com/t5/CDH-Manual-Installation/How-to-resolve-quot-Permission-denied-quot-errors-in-CDH/ta-p/36141)</em> - Hadoop Permission Error Trouble Shooting


## Web UI Install

![Screenshot WebLogin](https://raw.githubusercontent.com/yangyangii/yangyangii.github.io/master/assets/_posts/WebUI-Login.JPG  "Screenshot WebLogin")

+   초기 ID/PW는 admin/admin이다. 필요에 따라 변경해주면 되겠다.

+   각 서버의 호스트 이름은 번호를 ubuntu1, ubuntu2, ..., ubuntu9 등 넘버링으로 하면 관리하기 편하다.

+   클러스터를 구성하는 도메인명을 등록해야한다.


![Screenshot Web](https://raw.githubusercontent.com/yangyangii/yangyangii.github.io/master/assets/_posts/web1.JPG  "Screenshot Web")

+   동의 후 계속

![Screenshot Web](https://raw.githubusercontent.com/yangyangii/yangyangii.github.io/master/assets/_posts/web2.JPG  "Screenshot Web")

+   필요에 따라 엔터프라이즈 혹은 무료버젼을 사용하도록 하자. 학습용으로 체험하고자 한다면 60일 체험판도 나쁘지 않을 것 같다.

![Screenshot Web](https://raw.githubusercontent.com/yangyangii/yangyangii.github.io/master/assets/_posts/web3.JPG  "Screenshot Web")

+   그냥 계속하면 된다. 설명에 나온 각각의 서비스들은 나중에 선택 가능하다.

![Screenshot Web](https://raw.githubusercontent.com/yangyangii/yangyangii.github.io/master/assets/_posts/web4.JPG  "Screenshot Web")

+   기본값으로 두고 계속. 우리는 CDH5 최신버젼을 사용할 것이므로 CDH5를 선택한 후 계속한다.

![Screenshot Web](https://raw.githubusercontent.com/yangyangii/yangyangii.github.io/master/assets/_posts/web5.JPG  "Screenshot Web")

+   위처럼 다운로드 - 배포 - 압축해제 - 활성화 순서로 진행된다. 약간의 시간이 소요되므로 기다리도록 하자. 각각 호스트의 갯수만큼 진행된다.

![Screenshot Web](https://raw.githubusercontent.com/yangyangii/yangyangii.github.io/master/assets/_posts/web6.JPG  "Screenshot Web")

+   완료된 후 계속을 누르면 각 호스트에 대해서 설치가 진행된다. 가끔 연결이 실패하거나 설치가 오류나는 경우가 있는데, 걱정하지말고 우측에 뜨는 제거 및 재설치 버튼을 통해 진행해주면 된다. 중간에 취소를 하더라도 언제든지 UI로 다시 접속하여 중간단계부터 진행 가능하다. 하지만 물론 한번에 잘 설치하는 것을 권장한다.

+	이 단계가 완료되면, 아까전에 보았던 서비스들을 클러스터에 추가 및 설정하는 단계로 넘어간다.

![Screenshot Web](https://raw.githubusercontent.com/yangyangii/yangyangii.github.io/master/assets/_posts/web7.JPG  "Screenshot Web")

+	원하는 호스트들을 검색한 후, 선택해서 진행하면 된다. 필자의 경우 설치를 모두 마친 후에 스크린샷을 찍어서 모두 관리되어 선택 불가능하게 나온다.

+	이 후 나오는 스크린샷을 촬영하지 못했는데, Hadoop Ecosystem에서 필요한 패키지를 선택하여 설정하고 추가하면 된다. 선택에 따라 각각의 호스트에 자원을 할당해주어야 하며, Hadoop Ecosystem의 효율적인 자원관리는 따로 공부가 필요해 보인다.

![Screenshot Finish](https://raw.githubusercontent.com/yangyangii/yangyangii.github.io/master/assets/_posts/cluster-finish.JPG  "Screenshot Finish")

+	정상적으로 모든 과정을 마치면, 위와 같이 각각의 서비스들이 돌아가고 있는 것을 확인할 수 있다. 서비스들은 추가 되었으나, 돌아가고 있지 않다면 Cloudera Management Service의 빨간색 네모 부분을 클릭해서 재시작을 해주면 모니터링이 정상적으로 시작된다.

+	네트워크 상태 및 여러가지 조건에 따라 서비스가 불량이 되기도 하고 양호가 되기도 하는데, 불량이 되는 경우 해당 서비스를 재시작해주면 대부분 해결된다.


## Trouble Shooting

+	클러스터 설정 및 설치 시에 Namenode에서 supervisor.conf와 관련하여 Permission 문제가 발생하는 경우가 있다. 해결 방법이 여러가지가 있는것 같으나, localhost의 IP address를 127.0.0.1에서 127.0.1.1로 수정하면 해결되는 것으로 확인했다.

+	모두 구축한 후에 shell에서 pyspark를 치고 들어가면, hadoop permission 문제로 SparkContext가 정상적으로 작동하지 않는 경우가 발생한다. 이 경우도 마찬가지로 Namenode 문제였는데, hdfs://<특정 IP>:8020으로 되어있는 것을 아래와 같이 수정하여 해결하면 된다.
{% highlight ruby %}
vi /etc/hadoop/conf/core-site.xml


<property>
    <name>fs.defaultFS</name>
    <value>hdfs://0.0.0.0:8020</value>
</property>
{% endhighlight %}

[jekyll-gh]: https://github.com/mojombo/jekyll
[jekyll]:    http://jekyllrb.com

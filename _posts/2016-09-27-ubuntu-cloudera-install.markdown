---
layout: post
title:  "Ubuntu 14.04LTS에서 클라우데라 구축하기(1)"
date:   2016-09-27 15:18:23 +0700
author: Jin
categories: Spark
tags:	Spark Cloudera
cover:  "/assets/instacode.png"
---

클라우데라와 관련해서는 정보가 많이 없다.
구축에 관련한 포스트들도 대부분 Redhat 기반으로 되어 있기 때문에, Ubuntu로 구축할 경우 오류가 나는 부분이 많다. 그래서 우분투 사용자를 위해 몇가지를 변경하고 세세한 부분을 보충하여 포스팅한다.

## References
+   <em>[https://github.com/biospin/BigBio/blob/master/part03/week01_160503/hadoop/cloudera_install.md](https://github.com/biospin/BigBio/blob/master/part03/week01_160503/hadoop/cloudera_install.md)</em> - 운영체제와 관련없이 겹치는 부분은 대부분 보고 그대로 적은 부분이 많습니다.
+   <em>[http://www.cloudera.com/downloads/manager/5-7-0.html](http://www.cloudera.com/downloads/manager/5-7-0.html)</em> - 구축 당시 5.7버젼으로 했으나 현재 기준 최신버젼 5.8.1 버젼까지 나와있음
+   <em>[https://www.server-world.info/en/note?os=Ubuntu_14.04&p=dhcp&f=1](https://www.server-world.info/en/note?os=Ubuntu_14.04&p=dhcp&f=1)</em>

## Software Spec.
Ubuntu 14.04 LTS (16.04는 현재 클라우데라가 지원하지 않고 있는 것으로 알고 있다.)

Cloudera 

CDH5

## Required Resource
디스크 용량

+   <em>Cloudera Manager Server( 관리서버 )</em> - /var : 5 GB, /usr : 500 MB

+   <em>Cloudera Management Service( 서비스서버 )</em> - /var : 20 GB

+   <em>RAM : 4GB</em>

+   <em>Python : CDH 5 requires Python 2.6 or 2.7</em>

요구되는 네트워킹

+   <em>ssh 통신 필요</em>

+   <em>Security-Enhanced Linux (SELinux) 설정 해제 (이 경우 Ubuntu 14.04 LTS 운영체제의 경우 따로 설정할 필요가 없는 듯 했다. 혹여 해당 문제가 발생하면 참고 링크에서 보면 될 듯 하다)</em>

+   <em>7180 포트 오픈</em>

## Before Install
+   괜히 사용자 계정 써서 sudo 쓰고 다시 설정하고 하는 수고로움을 하지 말고 바로 root로 접속해서 하도록 한다.

+   각 서버의 호스트 이름은 번호를 ubuntu1, ubuntu2, ..., ubuntu9 등 넘버링으로 하면 관리하기 편하다.

+   클러스터를 구성하는 도메인명을 등록해야한다.


## Setting Network
Local Network Server를 사용하는 사람도 있을 것이고, AWS Server와 같은 Cloud Server를 사용하는 사람도 있을 것이다.

필자의 경우에는 학교에 Server를 두고 구축해야 했기에, Local Network Server를 기준으로 한다.

총 9대의 서버가 있으며, 스위치를 통해 각 네트워크를 연결하고 1번 서버를 호스트 서버로 통해서 종속된 서버들에 접속하기 위해 호스트 서버에만 외부 랜을 연결했고, 나머지 서버에는 Private IP를 설정하고 구축했다.


+   <em>DHCP Server</em> - 1번 서버에만 외부 랜이 연결되어 있으므로, 나머지 서버들이 1번 서버를 통해 인터넷이 가능하게 하기 위하여 1번 서버에서 DHCP Server를 가동해준다.

```
root@dlp:~# apt-get -y install isc-dhcp-server
root@dlp:~# vi /etc/dhcp/dhcpd.conf
# line 16: specify domain name
option domain-name "srv.world";
# line 17: specify nameserver's hostname or IP address
option domain-name-servers dlp.srv.world;
# line 24: uncomment
authoritative;
# add at the last
# specify network address and subnet-mask
subnet 192.168.0.0 netmask 255.255.255.0 {
     # specify default gateway
     option routers 192.168.0.1;
     # specify subnet-mask
     option subnet-mask 255.255.255.0;
     # specify the range of leased IP address
     range dynamic-bootp 192.168.0.1 192.168.0.254;
}
root@dlp:~# initctl start isc-dhcp-server 
isc-dhcp-server start/running, process 1852
```

+   <em>Host Setting</em> - 중요한 부분인데 각 호스트들을 FQDN(Fully Qualified Domain Name)으로 설정해 주어야 한다. /etc/hosts 파일을 아래와 같이 설정하면 된다.
{% highlight ruby %}
127.0.0.1 localhost

192.168.xx.xx1  ubuntu1.mycompany.co.kr  ubuntu1  # ubuntu1이 관리서버라고 가정함. mycompany.co.kr 은 /etc/network/interfaces에 dns-search로 등록되어 있어야한다.
192.168.xx.xx2  ubuntu2.mycompany.co.kr  ubuntu2
192.168.xx.xx3  ubuntu3.mycompany.co.kr  ubuntu3
192.168.xx.xx4  ubuntu4.mycompany.co.kr  ubuntu4
192.168.xx.xx5  ubuntu5.mycompany.co.kr  ubuntu5
192.168.xx.xx6  ubuntu6.mycompany.co.kr  ubuntu6
192.168.xx.xx7  ubuntu7.mycompany.co.kr  ubuntu7
192.168.xx.xx8  ubuntu8.mycompany.co.kr  ubuntu8
192.168.xx.xx9  ubuntu9.mycompany.co.kr  ubuntu9
{% endhighlight %}

+   <em>SSH Setting</em> - 우분투 설치 시에 옵션에서 선택했다면 따로 설치는 하지 않아도 된다. 아래는 로그인과정 없이 ssh 접속이 가능하도록 설정하는 것이다.
{% highlight ruby %}
# ssh-keygen 입력후에 특별한 입력없이 엔터 3번
ssh-keygen

# 클러스터를 구성하는 모든 서버들에 대해서 아래와 같이 함
# 첫번째 입력 요구시 yes, 두번째 입력 요구시 해당서버의 root 패스워드 입력
ssh-copy-id -i  ~/.ssh/id_rsa.pub  ubuntu1
ssh-copy-id -i  ~/.ssh/id_rsa.pub  ubuntu2
ssh-copy-id -i  ~/.ssh/id_rsa.pub  ubuntu3
        ...
ssh-copy-id -i  ~/.ssh/id_rsa.pub  ubuntu9

# 관리서버의 ~/.ssh/의 파일들을 모든 서버들에 카피함.
# 아래 작업후에는 모든 서버들간에는 ssh 로그인과정없이 접속이 가능함.
scp -r  ~/.ssh/*  ubuntu1:~/.ssh/
     ... 
scp -r  ~/.ssh/*  ubuntu9:~/.ssh/

# ssh를 하나씩 접속해보면서 정상적으로 되었는지 확인해보자.
ssh ubuntu1
     ...
ssh ubuntu9
{% endhighlight %}
가끔 offending key 발생으로 접속이 제한되는 경우가 생기는데 이 경우 다음 링크에서처럼 해당 ssh keygen을 지우고 다시 설정하면 된다.

url: [http://www.thegeekstuff.com/2010/04/how-to-fix-offending-key-in-sshknown_hosts-file/](http://www.thegeekstuff.com/2010/04/how-to-fix-offending-key-in-sshknown_hosts-file/)


## Default Setting Before Installing Cloudera

+   <em>PSSH Setting</em> - PSSH는 ssh 명령어를 여러 호스트에게 전체적으로 전달할 수 있는 방법이다.

+   <em>PSCP Setting</em> - PSCP는 scp 명령어를 여러 호스트에게 전체적으로 전달할 수 있는 방법이다. 해당 파일을 다른 서버들로 한꺼번에 복사할 수 있다.
{% highlight ruby %}
# PSSH 설치
cd /usr/local/src
wget http://parallel-ssh.googlecode.com/files/pssh-2.1.1.tar.gz
tar xvf pssh-2.1.1.tar.gz
cd pssh-2.1.1
wget 'http://peak.telecommunity.com/dist/ez_setup.py'
python ez_setup.py
python setup.py install

# 홈디렉토리에 all_hosts.txt 와 hosts.txt 만들기
vi ~/all_hosts.txt
# 관리서버를 포함함
ubuntu1
~
ubuntu9

vi ~/hosts.txt
# 관리서버를 포함하지 않음
ubuntu2
~
ubuntu9

# /etc/hosts 파일을 관리서버를 제외한 모든 서버에 카피
pscp -h ~/hosts.txt /etc/hosts /etc/hosts
{% endhighlight %}


## 준비 작업
+   <em>iptables 정지(방화벽 정지)</em>
{% highlight ruby %}
pssh -h ~/all_hosts.txt  service iptables stop
pssh -h ~/all_hosts.txt  chkconfig iptables off
{% endhighlight %}

+   <em>swappiness 설정</em>
{% highlight ruby %}
pssh -h ~/all_hosts.txt  'sysctl –w vm.swappiness=0'
echo 'vm.swappiness=0' >> /etc/sysctl.conf
pscp -h ~/hosts.txt  /etc/sysctl.conf   /etc/sysctl.conf
{% endhighlight %}

+   <em>transparent_hugepage</em>
{% highlight ruby %}
pssh -h ~/all_hosts.txt   echo never > /sys/kernel/mm/transparent_hugepage/defrag
cat <<EOT >>  /etc/rc.local
echo never > /sys/kernel/mm/transparent_hugepage/defrag
EOT

pscp -h ~/hosts.txt /etc/rc.local /etc/rc.local
{% endhighlight %}

+   <em>NTP Synchronization</em>
{% highlight ruby %}
pssh -h ~/all_hosts.txt   yum install -y ntp
또는
pscp -h ~/hosts.txt  /root/ntp-4.2.6p5-5.el6.centos.4.x86_64.rpm  /root/
pscp -h ~/hosts.txt  /root/ntpdate-4.2.6p5-5.el6.centos.4.x86_64.rpm  /root/
pssh -h ~/all_hosts.txt "rpm -Uvh  ntpdate-4.2.6p5-5.el6.centos.4.x86_64.rpm    ntp-4.2.6p5-5.el6.centos.4.x86_64.rpm"


cat <<EOT >>  /etc/ntp.conf 
server 0.kr.pool.ntp.org
server 3.asia.pool.ntp.org
server 2.asia.pool.ntp.org
EOT

pscp -h ~/hosts.txt       /etc/ntp.conf  /etc/ntp.conf 
pssh -h ~/all_hosts.txt   service ntpd stop
pssh -h ~/all_hosts.txt   ntpdate kr.pool.ntp.org
pssh -h ~/all_hosts.txt   service ntpd start
pssh -h ~/all_hosts.txt   chkconfig ntpd on
{% endhighlight %}

+   <em>File descriptor</em>
{% highlight ruby %}
cat <<EOT >>   /etc/security/limits.conf
*    hard nofile 131072
*    soft nofile 131072
root hard nofile 131072
root soft nofile 131072
EOT

pscp -h ~/hosts.txt /etc/security/limits.conf  /etc/security/limits.conf
{% endhighlight %}

+   <em>Reboot all of the server</em>
{% highlight ruby %}
pssh -h ~/all_hosts.txt reboot
{% endhighlight %}

## Download Cloudera Manager Installer


## Install Cloudera Manager

+   1번 호스트 서버에서만 root계정으로 접속하여 설치하면 된다.

+   Reference site에서는 5~10분이면 된다고 하였으나, 서버 상태에 따라 오래걸릴수도 있다. 필자의 경우 30분정도가 소요된 것 같다.

{% highlight ruby %}
wget http://archive.cloudera.com/cm5/installer/latest/cloudera-manager-installer.bin
chmod u+x cloudera-manager-installer.bin
./cloudera-manager-installer.bin
{% endhighlight %}

+   설치 진행 과정에서 모두 agree or yes를 하고 진행하면 된다. 이 과정은 Manager를 설치하는 것이며, 클러스터 설정 및 설치는 웹 UI에서 진행한다.

+   간혹 설치 중간에 오랜 시간 멈춰있는 경우가 있는데(usually 40%에서), 겁먹지 말고 인내심을 갈고 닦으며 기다리도록 하자. 참으면 복이 온다지 않나. 혹여라도 중간에 설치를 취소하거나 하는 경우.. 상당히 곤란한 상황이 도래할 수 있다.

+   설치가 완료되면 http://<1번서버IP>:7180 으로 접속하면 되며, username: admin, password: admin 으로 로그인하라고 다음과 같이 완료 메세지를 띄워준다.

![Screenshot Success Server](https://raw.githubusercontent.com/yangyangii/yangyangii.github.io/master/assets/_posts/success-cloudera-manager-server.JPG  "Success Server")

![Screenshot WebLogin](https://raw.githubusercontent.com/yangyangii/yangyangii.github.io/master/assets/_posts/WebUI-Login.JPG  "Screenshot WebLogin")

+   혹시 접속이 되지 않는 다면, 아래와 같이 포트가 열려있는지 확인해본다. 재부팅하거나 했을 때는 서버가 열리는데 시간이 조금 걸린다.
{% highlight ruby %}
netstat -tln|grep 7180
{% endhighlight %}

** 여기까지 Cloudera Manager 설치가 완료되었으며, Manager Web UI에서 클러스터 설치하는 것은 다음 포스트에서 계속하도록 한다. **


---
layout: post
title:  "openai gym-retro 환경 구축(with Sonic)"
date:   2018-05-30 19:00:00 +0700
author: Jin
categories: Reinforcement_Learning
tags:	Reinforcement_Learning Sonic gym-retro
cover:  "/assets/instacode.png"
---

## Basic env.
+	Python3.6(Anaconda)

## gym-retro
+	openai gym에 이어 SEGA game을 추가하고 보강한 gym-retro가 나왔다.
+	gym도 많은 이들이 환경구축에서 좌절하는데... 더 어려워졌다!
+	환경구축에서 해야할 일이 추가된 점은 Steam을 설치하고 인증하고 다운받는 것 정도이다.
+	현재 contest가 진행중인데... 너무 늦게 알아버렸다. 4월에 시작해서 6월 5일에 끝난다.
+	그래도 앞으로 강화학습에 대한 열정으로 공부하기위해 환경구축을 해보자.

## Ubuntu(17.10LTS)
+	cmake와 gym-retro를 먼저 설치
{% highlight python %}
pip install cmake
pip install https://storage.googleapis.com/gym-retro/builds/gym_retro-0.5.2-cp36-cp36m-linux_x86_64.whl
{% endhighlight %}
+	Steam 가입 후 다운로드 -> <em>[Link](https://store.steampowered.com/about/)</em>
+	다음 링크에서 소닉 구매(5,500원) <em>[Sonic1](https://store.steampowered.com/app/71113/Sonic_The_Hedgehog/)</em>
+	curl python-apt zenity 통해 3가지 패키지를 설치 후 스팀 설치
{% highlight python %}
sudo apt-get install curl python-apt zenity lib32gcc1
sudo dpkg -i steam.deb
{% endhighlight %}

+	gym-retro github의 최신버젼 코드를 확인하면 ROM 설치하는 코드에서 다소 다른 점이 있는데, 버그를 fix한 것으로 보인다. 그에 맞춰서 코드를 수정해줄 필요가 있다.
+	pip로 설치된 retro의 lib 폴더를 찾아가서 retro/retro/scripts/import_sega_classics.py의 코드를 다음 링크의 코드로 바꿔준다(이전 버젼은 ROM 데이터를 merge하는 과정에 있어서 tmp 폴더를 공유해서 문제가 생겼는데 이부분을 해결함) <em>[import_sega_classics.py](https://github.com/openai/retro/blob/master/retro/scripts/import_sega_classics.py)</em>
+	아래 명령어를 통해 스팀에 연결하여 ROM 다운 및 설치
{% highlight python %}
python -m retro.import.sega_classics
{% endhighlight %}
+	스팀 아이디, 비밀번호, 스팀가드(해당 컴퓨터로 스팀에 로그인하면 메일로 전송됨) 입력


## Windows
+	cmake와 gym-retro 설치
{% highlight python %}
pip install cmake
pip install https://storage.googleapis.com/gym-retro/builds/gym_retro-0.5.2-cp36-cp36m-win_amd64.whl
{% endhighlight %}

+	리눅스 버젼에서와 마찬가지로 최신버젼에서 달라진 코드를 수정해준다.
+	pip로 설치된 retro의 lib 폴더를 찾아가서 retro/retro/scripts/import_sega_classics.py의 코드를 다음 링크의 코드로 바꿔준다(아마 설치된 버젼은 window platform을 지원하지 않는다) <em>[import_sega_classics.py](https://github.com/openai/retro/blob/master/retro/scripts/import_sega_classics.py)</em>

+	Steam 가입 후 설치 및 로그인 -> <em>[Link](https://store.steampowered.com/about/)</em>
+	다음 링크에서 소닉 구매(5,500원) <em>[Sonic1](https://store.steampowered.com/app/71113/Sonic_The_Hedgehog/)</em>
+	아래 명령어를 통해 스팀에 연결하여 ROM 다운 및 설치
{% highlight python %}
python -m retro.import.sega_classics
{% endhighlight %}
+	스팀 아이디, 비밀번호, 스팀가드(해당 컴퓨터로 스팀에 로그인하면 메일로 전송됨) 입력
+	위의 과정이 잘 되면 좋으나... 윈도우즈에서는 permission denied 등의 머리 아픈 일이 자주 생긴다.
+	그런 분들은 직접 윈도우에서 스팀 실행 -> Login -> Library -> Sonic Install
+	내 게임 -> 소닉 오른쪽 클릭 -> 속성 -> 로컬 파일 -> 로컬 콘텐츠 보기 -> 소닉 설치 폴더 이동 -> uncompressed ROMs 이동 -> 폴더 경로 복사

{% highlight python %}
D:\\Program Files (x86)\\Steam\\steamapps\\common\\Sega Classics\\uncompressed ROMs
{% endhighlight %}

+	직접 설치된 ROM 경로를 import 시킨다. 경로에 반드시 따옴표 추가(띄어쓰기 때문에 sys.argv를 정상적으로 주기 위해서)

{% highlight python %}
python -m retro.import "D:\\Program Files (x86)\\Steam\\steamapps\\common\\Sega Classics\\uncompressed ROMs"
{% endhighlight %}

+	Rom이 정상적으로 복사되었다고 뜨면 완료.

## Test
+	모든 설치과정을 무사히 마쳤다면 python에서 아래 코드를 실행해보자.

{% highlight python %}
import retro
env = retro.make(game='SonicTheHedgehog-Genesis', state='GreenHillZone.Act1')
env.reset()
for i in range(777):
	env.render()
	env.step(env.action_space.sample())
{% endhighlight %}

+	이제부터 시퍼런 고슴도치를 만끽해보자

![sonic-sample](https://user-images.githubusercontent.com/6456004/42731556-876e8928-884a-11e8-8613-2c45fbd063e8.JPG)

## References
+   <em>[정원석님 블로그](https://wonseokjung.github.io//openairetro/update/Retro-1/)</em>
+	<em>[openai retro details](https://contest.openai.com/details)</em>
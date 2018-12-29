---
layout: post
title:  "윈도우즈에서 TensorFlow 설치"
date:   2017-12-28 15:18:23 +0700
author: Jin
categories: TensorFlow
tags:	TensorFlow Python Anaconda
cover:  "/assets/instacode.png"
---

## 설치 목록
+	Anaconda(python3.6)
+	TensorFlow 1.4(CPU Version)


## Anaconda Install
+	[Anaconda_64bit-Download](https://repo.continuum.io/archive/Anaconda3-5.1.0-Windows-x86_64.exe)
+	[Anaconda_32bit-Download](https://repo.continuum.io/archive/Anaconda3-5.1.0-Windows-x86.exe)
+	혹시 본인 OS가 32bit라면 해당 버전을 다운받으면 된다.(일반적으로 64bit)
+	설치 시에는 Default 설정대로 모두 Next를 하면 추가적인 조치들이 필요할 수 있으므로 다른 환경의 파이썬을 동시에 사용하는게 아니라면, All Users 옵션 체크 및 Add Anaconda to my PATH environment variable 옵션 체크 권장
+	이 글은 Windows에서 처음 접하는 이들을 위해 최대한 간소화한 것이므로 다른 환경의 경우에는 구글에 검색해서 하길 권장함.


## Tensorflow Install(수정. 18.01.02)
+	Anaconda 설치가 끝나고나면 윈도우 시작 메뉴에서 cmd라고 검색한다.(혹은 윈도우키+R)
+	명령 프롬프트 실행(오른쪽 클릭 후 관리자 권한으로 실행)
{% highlight ruby %}
C:\Users\Jin> pip install --ignore-installed --upgrade tensorflow
{% endhighlight %}
+	되도록이면 네트워크가 느리지 않은 곳에서 하길 바란다. 실패할 가능성이 있음.
+	GPU버젼이 아닌 CPU버젼이 설치되는지 확인.
+	GPU버전을 위해서는 CUDA, cudnn 등 추가적인 조치가 필요함. 레퍼런스 참고. 추후 게시.
+	기존에 다른 Python이 설치되어 있을 경우, 미리 제거하거나 환경변수를 삭제하길 권장한다. 충돌이 일어날 수 있음.
+	다른 Python을 사용할 일이 없는 경우, anaconda environment 없이 텐서플로우 설치 명령어만 사용해도 무관하다.(공식 사이트에서는 tensorflow를 위한 conda environment를 만들어서 사용하기를 권장하고 있음)


## Test
+	TensorFlow 설치가 끝나면 다음과 같이 테스트를 진행한다.
{% highlight ruby %}
c:\Users\Jin> python
>>> import tensorflow as tf
>>> hello = tf.constant('Hello, TensorFlow!')
>>> sess = tf.Session()
>>> print(sess.run(hello))
{% endhighlight %}


## Jupyter Notebook
+	Jupyter Notebook을 사용하여 실습시간에 프로그래밍할 예정이므로 잘 작동하는지 확인.
{% highlight ruby %}
c:\Users\Jin> jupyter notebook
{% endhighlight %}
+	위 명령어 입력 후 브라우저에 뜨면 New > Python3 로 노트북파일 생성.
+	위의 Tensorflow test 다시 테스트.
![Screenshot Jupyter](https://raw.githubusercontent.com/yangyangii/yangyangii.github.io/master/assets/_posts/Jupyter-Notebook.JPG  "Screenshot Jupyter")
![Screenshot Jupyter](https://raw.githubusercontent.com/yangyangii/yangyangii.github.io/master/assets/_posts/Jupyter-test.JPG  "Screenshot Jupyter")


## References
+   <em>[https://www.tensorflow.org/install/install_windows#installing_with_anaconda](https://www.tensorflow.org/install/install_windows#installing_with_anaconda)</em>
+	<em>[https://www.tensorflow.org/install/install_mac#installing_with_anaconda](https://www.tensorflow.org/install/install_mac#installing_with_anaconda)</em>
+	<em>[https://www.anaconda.com/download/](https://www.anaconda.com/download/)</em>

## Trouble Shooting
+	맥 유저도 거의 동일하게 설치하며 단 아나콘다 버젼은 레퍼런스에서 맥버전으로 다운받아야함. 자세한 내용은 reference 참고. 맥과 리눅스에는 기존의 파이썬 3.5가 설치되어있으므로 환경변수에 대한 고려 필요.
+	공식사이트에서 권장하는 방법으로 가이드를 했더니 많은 분들께서 어려워하는 것 같아 가장 간단한 방법으로 수정하였습니다.(18. 01. 02.)
+	경고 및 에러의 경우 일단 댓글에 비슷한 내용의 문제에 대한 해결방법이 있는지 확인하고, 없으면 구글링을 통해 2차 해결을 시도하신 후에 안되면 댓글로 문의 부탁드립니다. 모든 예외 케이스를 커버하기는 저도 어렵습니다.
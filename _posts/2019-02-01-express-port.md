---
title: (본격 웹 개발기) Express 포트 80번으로 변경하기
layout: post
date: '2019-02-01 02:00:00'
author: 줌코딩
tags: express port변경 
cover: "/assets/instacode.png"
categories: web개발 node histime
---

## 배경

express로 처음에 3000번 포트로 자동으로 설정되어있다. 

유저가 우리 ip만 입력하고도 바로 접속이 가능하게 하려면 이를 80번 포트로바꿔주어야한다.

## Express 포트 80번으로 바꾸기

현재 우리 포트는 80으로 안되있어서 이거를 일단 80으로 바꿔줬다
**backend/bin/www**에 들어가면 80포트로 변경할 수 있다.

    //'3000'을 '80'으로 바꾸면 된다.
    var port = normalizePort(process.env.PORT || '80'); 


서버 피씨에 파일 전송하는 것은 그냥 git 대신 file ziller를 사용했다...

자꾸 conflict 생기는거 감당이 안됐다ㅠㅠ 

￼￼![그림](https://raw.githubusercontent.com/zoomKoding/zoomKoding.github.io/source/assets/_posts/express-port-1.png)

내 피씨에서는 바로 되는데 서버 피씨로 하니 다음과 같은 에러가 뜬다.

￼*Port 80 requires elevated privileges*

서버 피씨에 접속해서 80번 포트로 사용하려면 권한이 필요하단다.

관리자 모드로 진행하면 된다.

    sudo su
    npm start

그랬더니 내부에서는 다음과 같이 접속이 원활하게 된다.

￼![그림](https://raw.githubusercontent.com/zoomKoding/zoomKoding.github.io/source/assets/_posts/express-port-2.png)


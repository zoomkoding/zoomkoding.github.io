---
title: (web) Node.js 입문기(5) - 보안
layout: post
date: '2019-01-11 02:00:00'
author: 줌코딩
tags: Nodejs 노드js 보안 sanitize-html
cover: "/assets/instacode.png"
categories: web개발 nodejs
---

## 보안 이슈 2가지

보안은 매우 중요하다..

인강을 듣다보니 내가 예상하지 못한 해킹(?)의 가능성을 발견하였다.

### 1. 입력정보 보안

id 값으로 받아 오는 내용을 data 내에 있는 파일들 중에서 받아오는 줄로만 알았는데

만약 id 값에 '../(어떤정보)를 넣으면 data 밖에 있는 곳에서도 데이터를 쿼리하게 된다고 한다ㅠㅠㅠㅠ

절대 안됨...ㅠㅠㅠ

그래서 다른 유저로 부터 들어온 정보와 보내는 정보는 꼭 반드시 철저히 보호되어야 한다.



이 때 우리가 원하는 디렉토리 이상을 넘어가지 못하도록 하기 위해서는 

directory 정보중에서 최종 파일명만 가져올 필요가 있다.

path 정보는 base가 따로 나눠져있다.

그래서 가져온 유저가 url에 id에 입력하는 정보를 queryData.id로 가져오게 되는데

이 데이터의 basecode만 가져오도록 설정해주면 된다. 보낼 때도 마찬가지!!

    var filteredId = path.parse(queryData.id).base;

id를 필터해주는 방법으로 나름의 보안에 성공했다!!

### 2. 출력정보 보안

만약에 유저가 입력을 html형식으로 정보를 저장해서 그 내용이 열릴 때 우리가 원하지 않는 방식으로 작동한다면 이는 매우 위험한 버그이다

예를 들어 악의를 가지고 href를 이용해서 다른 링크로 가버리도록 한다면 이는 바이러스 천국이 될 가능성이 있다.

때문에 이러한 내용도 보안이 필요하다.

물론 < > 이것 자체를 건드리는 것도 방법이지만 다른 방법이 있다!

sanitize-html이라는 모듈을 가져오면 된다.

이떄 가져오는 명령어는 다음과 같다

    npm init
    npm install -S sanitize-html

이 명령어를 실행하면 파일을 가져올 수 있다.

그리고 해당 모듈의 설명서를 읽어보면 된다!
￼
![그림](https://raw.githubusercontent.com/zoomKoding/zoomKoding.github.io/source/assets/_posts/Node-introduction-9.png)

이외에도 해당 모듈에서는 다양한 sanitizing 방법을 소개하고 있다. 소개한 방법을 활용해보자

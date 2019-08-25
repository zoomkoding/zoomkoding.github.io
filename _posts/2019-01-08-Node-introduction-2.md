---
title: (web) Node.js 입문기(2) - Url을 통한 페이지 바꾸기
layout: post
date: '2019-01-08 02:00:00'
author: 줌코딩
tags: Nodejs 노드js url
cover: "/assets/instacode.png"
categories: web개발 nodejs
---

## Url이란..

먼저 Url이 뭔지 짚고 넘어가자..

Url의 정의는 다음과 같다.

#### 네트워크 상에서 자원이 어디 있는지를 알려주기 위한 규약 

즉, 아래 이미지와 같이 자원에 대한 정보를 담고 있는 것을 url이라고 보면 되겠다.

![사진](https://raw.githubusercontent.com/zoomKoding/zoomKoding.github.io/source/assets/_posts/Node-introduction-3.png)
￼
### 우리는 이 url에 id값을 담아서 동적으로 페이지를 바꿔보려고 한다!

id 값을 이용해 동적으로 페이지를 바꾸기

query string을 통해서 정적인 페이지를 구분할 수 있다.

id를 그럼 어떻게 받아올 수 있을까?

url을 받아온뒤에 

url.parse를 이용해서 

    var url = require('url');

url이라는 노드는 url이라는 변수를 통해서 사용할 것이다.

    var url = require('url');
    var app = http.createServer(function(request,response){
        var _url = request.url;
        var queryData = url.parse(_url, true).query;    
        console.log(queryData.id);
    }

url이라는 노드 변수를 사용해서 파싱을 진행해서 퀴리데이터를 받아오면 된다

``를 활용하면 ${name}을 변수로 넣어서 손쉽게 문자열 내부 내용을 처리 할 수 있다.

href ="/?id = HTML 로 해주게 되면 해당 클릭시 해당 주소가 
http://localhost:3000/?id=HTML로 바뀌는 것을 볼 수 있다

이와 같이 동적 할당이 가능하다.

### 본문만 따로 넣을 수 있을까?

방법은 다음과 같다.

1. separate한 파일을 생성하고 각 페이지 마다 들어갈 내용을 안에 명시한다
2. fs.fileOpen을 이용해서 열어서 description이라는 변수를 이용해서 클릭에 따라 해당 이름의 파일이 read 되도록 해주면 된다.

**해당 코드**

    fs.readFile(`data/${queryData.id}`, 'utf8', function(err, data){
        var description = data;
        var template  =  `
            <!doctype html>
            <html>
            <head>
            <title>WEB1 - ${queryData.id}</title>
            <meta charset="utf-8">
            </head>
            <body>
            <h1><a href="/">WEB</a></h1>
            <ol>
            <li><a href="/?id=HTML">HTML</a></li>
            <li><a href="/?id=CSS">CSS</a></li>
            <li><a href="/?id=JavaScript">JavaScript</a></li>
            </ol>
            <h2>${queryData.id}</h2>
            <p>${description}</p>
            </body>
            </html>
        `
        // console.log(__dirname + _url);
        response.end(template);
    }) 

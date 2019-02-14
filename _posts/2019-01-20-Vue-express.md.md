---
title: (본격 웹 개발기) Vue와 Express 연동하기
layout: post
date: '2019-01-20 02:00:00'
author: 줌코딩
tags: vue-express-연동 vue express 연동 
cover: "/assets/instacode.png"
categories: web개발 histime
---

Histime에 대한 기능과 디비 디자인과 UI 디자인을 받은 상태에서 본격적으로 막상 개발을 시작하려고 하니 너무 막막했다… 

Vue로 프론트엔드를 개발하고 Express를 이용하여서 데이터베이스와의 송신을 하기로 맘을 먹었지만 정작 어떻게 진행해야 할지 감이 오지 않았다ㅠㅠ

다행히 지현이가 좋은 자료를 찾아줘서 시작할 수 있었다ㅎㅎ

Vuejs 한국 사용자 커뮤니티에 너무너무 감사하다.

<http://vuejs.kr/2017/02/05/express-with-vue/>

개발환경 구성을 위한 정보가 궁금하다면 위에 있는 링크를 타고 가면 좀더 쉽게 볼 수 있다.

위의 내용을 이해하려면 API가 뭔지 일단 알아야되는데 이는 내 게시글에 있는 API에 대한 설명을 참고하길 바란다.

환경 구성이 완료되면 root directory에 **backend**와 **frontend**라는 디렉토리가 생성되게 된다.


# 그렇다면 어떻게 Vue(Frontend)와 Express(Backend) 간에 데이터를 주고 받을 수 있을까?


## 1. 데이터 가져올 수 있는 API를 생성한다!

#### a. backend directory에 있는 routes에 정보를 보내줄 javascript 파일을 생성한다.

내 경우 현재 **routes/users.js** 라는 파일을 만들어서 유저의 정보를 받아오는 API를 생성했다. 
기본 틀은 다음과 같다.


    var express = require('express');

    var router = express.Router();
    /* GET users listing. */
    router.get('/', function(req, res, next) {
        res.send('login attempted');
    });

    module.exports = router;


내 routes 다음과 같이 구성되어있다.

![Histime routes](https://raw.githubusercontent.com/zoomKoding/zoomKoding.github.io/source/assets/_posts/Vue-Express-1.png)


**너무 세분화 하지 않고 페이지별, 용도별로 큼지막하게 만들고**
**해당 자바스크립트 안에 url을 이용해서 더 많은 정보를 받을 수 있도록 하였다.** 

어떤 데이터를 전해주느냐에 따라 **post**와 **get** 으로 나눠서 데이터를 받도록 하였다.

그리고 backend에서 원하는 데이터를 res.send를 통해서 보내주게 된다.

#### b. 해당 routes를 backend에 있는 app.js에 저장해줘야 한다.



    …
    var users = require('./routes/users');
    app.use('/api/users', users);
    …


위 내용은 **‘/api/users’**라는 url을 받으면 users라는 routes로 이동한다는 의미이다.

그리고 위 사이트의 과정을 진행하면 현재 백엔드는 localhost의 3000번 포트에서 http 요청을 기다리게 된다.


## 2. Vue에서 데이터 보내고 수신하기

그렇다면 Vue에서 backend와 어떻게 통신할 수 있을까?

#### a. 일단 frontend/config에 있는 index.js를 보면 dev 속에 proxyTable을 설정해준다.


    proxyTable: {
        '/api': {
            target:  'http://localhost:3000/api',    
            changeOrigin: true,
            pathRewrite: {
                '^/api': ''
            }
        }
    }


위의 의미는 ‘/api’ 라는 url이 따라오면 target address를 
'**http://localhost:3000/api**' 로 바꿔주는 것을 의미한다.

#### b. main.js에 axios를 import 시켜주면 vue에서도 http 요청이 가능해진다.



    import axios from 'axios'
    Vue.prototype.$http = axios



#### c. 그렇다면 이제 vue 내부에 있는 method를 통해 실제 백엔드와 통신해보자. 


    login() {
        this.$http.post("/api/login", {
            student_id: this.student_id,
            password: this.password
        })
        .then(response => {
            if (response.status === 200) {
                console.log(response.data);
                }
            });
    },

위의 코드는 login 버튼이 클릭되면 호출되는 method이다. 


‘/api’ 가 포함되어 있기 때문에 자동으로 ‘http://localhost:3000/api/login’으로 http요청이 가게 된다.
이는 미리 기다리고 있던 backend가 요청을 받고 해당 login 요청에 대한 정보를 보내주게 된다.

**위와 같은 과정을 통해서 backend와 frontend 간에 통신이 가능하게 된다..!**




---
title: (web) 동기, 비동기
layout: post
date: '2019-01-10 02:00:00'
author: 줌코딩
tags: 동기 비동기 async sync javascript nodejs
cover: "/assets/instacode.png"
categories: web개발
---

## 동기와 비동기

웹에서 매우 중요한 개념이다.

한번에 확 이해가 되지 않아 정리를 해놓기로 했다. 

### 비동기와 동기의 차이

**동기란? 일을 순서대로 진행하는 것을 의미한다.**

그렇다면 **비동기란?**

**일을 시켜놓고 일이 끝날 때 나한테 얘기해 라고 말하고 다른 일을 하고 있는 것**

아래 그림과 같이 병렬적으로 일을 처리해보는 것을 의미한다.

![사진](https://raw.githubusercontent.com/zoomKoding/zoomKoding.github.io/source/assets/_posts/Sync-async-1.png)
￼
### sync와 async를 readFile로 비교해보자

    //readFileSync

    console.log('A');
    var result = fs.readFileSync('syntax/sample.txt', 'utf8');
    console.log(result);
    console.log('c');

이 코드는 sync를 맞추는 동기식 function이다. 

이코드를 진행하고 나면 다음과 같이 결과물이 나온다(sample.txt에는 B라는 값이 들어가 있다ㅎㅎ)

￼![사진](https://raw.githubusercontent.com/zoomKoding/zoomKoding.github.io/source/assets/_posts/Sync-async-2.png)

역시 순차적으로 진행된다

이번에는 async파일을 보자.

async인 readFile함수는 파라미터 마지막에 callback function을 생성하도록 되어있다

    //readFileAsync

    console.log('a');
    fs.readFile('syntax/sample.txt', 'utf8', function(err, result){
        console.log(result);
    });
    console.log('c');

이 fs.readFile은 변수 아니므로 변수로 받을 수 없고 콜백 function 내에서 사용해야 한다.

그래서 위와 같이 function을 설정해주고 진행해주면
￼
![사진](https://raw.githubusercontent.com/zoomKoding/zoomKoding.github.io/source/assets/_posts/Sync-async-3.png)

순서가 다음과 같이 바뀌는 것을 볼 수 있다.

이는 readFile function이 작업하는 동안 c를 출력하는 것이 먼저 진행됐기 때문이란다ㅎㅎ 신기방기하다.

### callback

어떤 작업이 끝난 후에 호출될 함수를 의미한다.

자바스크립트에서는 함수가 값이 될 수 있다.

따라서 파라미터로 함수가 전달될 수 있음을 의미한다. 

    function a(){
        console.log('a');
    }


    function slowfunc(callback){
        callback();
    }

    slowfunc(a);

위와 같이 어떤 천천히 진행되는 함수가 끝나면 a 라는 함수를 진행하도록 이를 파라미터로 전달이 가능하다.






'

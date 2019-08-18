---
title: (web) Node.js 입문기(1) - Nodejs란?
layout: post
date: '2019-01-07 02:00:00'
author: 줌코딩
tags: Nodejs 노드js
cover: "/assets/instacode.png"
categories: web nodejs
---

## 18년도 가장 핫한 FrameWork

Node.js... 말로는 많이 들어봤다. 웹에 누구보다 압도적인 점유율을 가지고 있는 어떠한 것(?)이고 들었다.
아래 사진에서 보듯이 Nodejs는 정말 많이 사용되고 있다고 한다.

![2018 Most Popular Technologies - StackOverFlow](https://raw.githubusercontent.com/zoomKoding/zoomKoding.github.io/source/assets/_posts/Node-introduction-1.png)


이렇게 핫하다면 한번 공부해볼만 하다..ㅎㅎ
Node.js란 무엇인가? 일단 얕은 이해라도 해보자 ㅎㅎ
**(정확하다기 보다 개인적인 이해를 기반으로 쓴거라 이해해주길 바란다.)**

## Nodejs란?

Node.js란 JavaScript를 Machine Code로 전해주는 플랫폼이라고 볼 수 있다.
아직 잘 감이 안온다.
JavaScript는 machine이 바로 이해할 수 없다.
그래서 이를 Machin이 이해할 수 있게 변환해줄 무언가가 필요하다.
이러한 역할을 해주는 것을 **JavaScript Engine** 이라고 한다.

![JavaScript - Nodejs(V8) - Machine](https://raw.githubusercontent.com/zoomKoding/zoomKoding.github.io/source/assets/_posts/Node-introduction-2.png)


Node.js는 c++로 구성되어 있는 **V8 자바스크립트 엔진(구글에서 만들었다)**을 통해서 보는 것과 같이 자바스크립트를 machine code로 변환해준다
그리고 이러한 엔진을 기반으로 additional feature을 제공해주기 때문에 굉장히 powerful하다고 볼 수 있다.

## Nodejs의 장점

무엇보다 가장 큰 장점은


1. 데이터 베이스와의 Communication이 잘됨
2. v8 engine을 통한 빠른 속도

으로 이야기한다고 한다.

차차 노드에 대해서 공부해보면서 직감해보도록 하자!!!


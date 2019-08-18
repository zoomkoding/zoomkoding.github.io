---
title: "(web) Vue 입문기(1)"
layout: post
date: '2019-01-04 01:13:56'
author: 줌코딩
tags: Vue vue-cli computed v-bind component
cover: "/assets/instacode.png"
categories: vue web
---

## 시작해보자 

이번 방학 동안에는 Vue와 Node JS를 활용해서 웹페이지를 개설해보고자 한다.

먼저 이 공부를 통해서 배우고자 하는 것은 다음과 같다.

1. 웹에 대한 기초 이해(css와 html)
2. Vue에 대한 이해
3. Node JS에 대한 이해
4. back End에 대한 이해

일단 생코를 통해서 웹 기초를 쌓아봤으니 이번에는 Vue를 공부한 내용을 정리해보고자 한다.
이것저것 건드려보다가 결국 영국분이신 Net Ninja 님의 유투브 인강을 통해서 아주 대강 이해할 수 있었다 ㅎㅎㅎㅎ

다음은 3일 동안 21강 까지 들으면서 정리한 내용들이다!

## 1. Vue의 틀

Vue는 사용자 인터페이스를 만들기 위한 프레임워크 라고 한다. 

즉 **웹의 시각적인 부분을 제작하는데 도움을 주는 유용한 도구**라고 보면 될 것 같다!

먼저 틀은 다음과 같다!

	<template>

	</template>

	<script>
	export default {
	 data () {
		return {

		}
	 },
	}
	</script>

	<style>

	</style>

		
**template**은 **html문**이 들어간다고 보면 되고,

**script**는 그 html문에서 사용하는 **데이터(변수, 함수 등)를 보관**하고 있는 곳이고,

**style**은 디자인을 담당하는 **css문**이 있는 곳이라고 보면 되겠다!

## 2. computed?

다른 친구들은 그나마 이해가 됐는데 computed는 뭔가 낯설었다.

생김새는 method와 비슷하나 뭔가 다른 듯했다.

다른 곳을 찾아보니 이는 **data를 업데이트해야 하는 상황에 반복적으로 recall하지 않고도** 알아서 update를 할 수 있도록 해준다.

매우 유용하다고 하니 나중에 짤 때 꼭 기억해두자!

## 3. v-bind

v-bind를 이용하면 어떤 해당태그에 어떤 클래스를 표현할지 정할 수 있다 예를 들어서

	v-bind:class="{active: isActive, 'text-danger' : hasError }"

과 같이 actrive와 text-danger이라는 class를 묶을 수 있고 bool변수에 따라 해당 태그의 클래스를 결정해준다. 


## 4. vue component(날것)

뷰를 컴포넌트 단위로 관리가 가능한데 이는 다음과 같다!


	Vue.component('greeting',{
	 template: '<p>Hey there, i am {{name}}. <button v- on:click="changeName">ChangeName</button></p>',
	 data: function(){
	  return {
		 data
		}
	 },
	 methods: {
	  changeName: function(){
	   this.name= 'Mario';
	  }
	 }
	});

### 여기서 유의할 점이 있다!!

**data도 function으로 해서 object를 return 해주도록한다!
그렇게 해야 component를 매번 새로 생성할 때 마다 카피가 만들어진다. 
이는 따로 업데이트가 가능하므로 fresh object로 데이터를 만들어줘야한다
나머지 function은 같다.**


## 5. referencing with refs

ref라는 친구 내부에는 value가 저장되어있다
그래서 $ref.(이름).value 하면 해당 값을 가져 올수있다.

## 6. CLI

이전에는 여기는 vue라는 파일을 이용해서 component를 생성한다

스크립트 태그 내에서 export 하는 내용은 전에 component로 data를 보내줬던 것과 같다.

스타일은 컴포넌트 내에 있는 디자인을 담당하는 친구이다.

## 7. Nesting Component (고급 버전?!)

![Alt text](https://raw.githubusercontent.com/zoomKoding/zoomKoding.github.io/source/assets/_posts/Vue-introduction-1.png) 

먼저 **root component**는 **하나의 태그**로 써라운드 되있어야 한다.

App.vue 는 root Component 이고 그 밑에 여러가지 컴포넌트가 존재한다.



다른 컴포넌트를 사용하려면

+ 글로벌리

    1. 일단 main.js에서 import하기

    2. Vue.component("원하는 이름", 해당 import이름을 사용

    3. 그리고 해당 파일에서 tag를 불러와서 사용하면 됨

+ 로컬리

    1. 원하는 곳의 스크립트에서 import 해

    2. export default 밑에 넣어 사용하면 됨
    
		![Alt text](https://raw.githubusercontent.com/zoomKoding/zoomKoding.github.io/source/assets/_posts/Vue-introduction-2.png) 
    
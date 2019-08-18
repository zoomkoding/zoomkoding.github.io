---
title: "(web) Vue 입문기(2) - Vue Component 활용 페이지 생성"
layout: post
date: '2019-01-04 02:13:00'
author: 줌코딩
tags: vue component firstpage
cover: "/assets/instacode.png"
categories: vue web
---

## 짜잔

배운 내용을 총동원해가지고 페이지를 생성해보았다!!

일단 vue의 component를 여럿 만들어주고

![Alt text](https://raw.githubusercontent.com/zoomKoding/zoomKoding.github.io/source/assets/_posts/Vue-introduction-3.png) 
    

각 vue component에 해당하는 내용을 저장했다.

그 후 App.vue에서 각 컴포넌트를 import!

## 코드

	<template>
		<div>
			<app-header></app-header>
			<app-ninjas></app-ninjas>
			<app-footer></app-footer>
		</div>
	</template>

	<script>
	import Header from './components/Header.vue';
	import Footer from './components/Footer.vue';
	import Ninjas from './components/Ninjas.vue';

	export default {
		components:{
			'app-header': Header,
			'app-footer': Footer,
			'app-ninjas': Ninjas,
		},

		name: 'app',
		data () {
			return {
				title: 'Ninja App'
			}
		},
	}
	</script>

	<style>

	</style>
	

## 결과물!

![Alt text](https://raw.githubusercontent.com/zoomKoding/zoomKoding.github.io/source/assets/_posts/Vue-introduction-4.png) 
	

일단 대충은 알겠는데 
CSS 어떡하지ㅠㅋㅋㅋㅋ
    

---
title: "(따라하기 쉬운) Github Page Jekyll 테마 설정 및 커스터마이즈하기[1] "
layout: post
date: '2018-12-30 04:00:00'
author: 줌코딩
categories: 깃헙_페이지_개설
tags: 'GithubPage 깃헙페이지 테마 jekyll theme customize 쉬운버전 centrarium '
cover: "/assets/instacode.png"
---

## 일단 숨고르고

후우 학기 내내 웹페이지 하나 개설해야지 해야지 하다가 올해가 가기 직전에 드디어 개설했다...

천신만고 끝에 어떻게 꾸역꾸역 웹을 개설하고 내 나름대로 디자인 해보았다. 

어떻게 디자인했는지는 이 페이지를 보면 알 수 있을 것이다ㅎㅎ

먼저 나는 깃헙 페이지를 개설하고 원하는 테마인 centrarium을 적용하였다.

## 1. 웹 개설하기 

깃헙에 들어가서 로그인 한 후에 **new Repository 생성**한다.

![Alt text](zoomKoding.github.io/assets/_posts/Github-Page-1.png) 



보는 것과 같이 자신의 이름을 기반으로 **[이름.github.io]** 라는 이름의 페이지를 만들면 된다.

**Initialize this repository with a README**에 체크하고 저장소를 생성한다.

이 과정을 거친 후에 방금 생성한 저장소 이름을 주소창에 입력하면 빈 페이지의 웹이 개설되게 된다!

## 2. 원하는 Jekyll 테마를 사용하는 Repository 따라하기

자 이제 원하는 Jekyll 테마를 적용해서 나만의 웹을 만들어보자.

**1. 자신이 원하는 테마 고르기**

먼저, 자신이 원하는 테마를 골라보자. 

[http://jekyllthemes.org](http://jekyllthemes.org “Jekyll Theme”)를 가보면 다양한 테마들이 리스트업 되있다.

원하는 테마를 고르면 되겠다.

**2. 해당하는 테마를 사용하는 레파지토리 찾고 git clone or download 하기**

이제 테마를 골랐다는데 막막하다면 해당 Theme을 사용하는 repository를 검색해서 git clone 해온다.

(나는 centrarium을 사용하고 싶어서 여러 방법에서 막히다가 이 테마를 사용하는 지인의 페이지를 clone하는 방법을 택해서 손쉽게 해결했다!!)

+ 원하신다면 내 github page를 클론해서 사용하는 것도 추천한다.
	
		git clone https://github.com/zoomKoding/zoomKoding.github.io
		

**3. 받아온 Repository의 내용을 전부 복사한 후  config.yml 파일 수정하기**

받아온 내용을 모두 내 local repository에 추가하고 commit을 진행한다.

받아온 파일 중 config.yml 파일을 수정해야 한다.

다음은 내 yml 파일의 내용이다. 여기서 수정할 것은 볼드 처리해놓았다.**(무엇보다 url을 바꾸는 것이 중요하다!!)**

		# Site settings
		title: 줌코딩의 코딩일기
		subtitle: "Zoom in Coding"
		email: gur5381@gmail.com
		name: Jinhyeok Jeong
		description: >
			Zoom in Coding from the Basic
		# Base URL of site (i.e. /blog). It should always start with a slash,
		# and never end with a slash. Set it to a blank value if hosting at the
		# root of your server.'
		baseurl: "" # the subpath of your site, e.g. /blog/
		url: https://zoomKoding.github.io" # the base hostname & protocol for your site
		cover: "/assets/header_image.jpeg"
		logo: "/assets/Crewcials.jpeg"

그 후 다시 commit을 진행하게 되면 내 깃헙 페이지의 내용이 **자신이 지정한 내용으로** 수정되게 될 것이다. 

![Alt text](zoomKoding.github.io/assets/_posts/Github-Page-2.png) 
 


자 이제 일차적인 과정을 완료해보았다. 그 후 **페이지 정리 및 커스터마이징 과정**은 다음 게시글을 읽어보도록 하자!

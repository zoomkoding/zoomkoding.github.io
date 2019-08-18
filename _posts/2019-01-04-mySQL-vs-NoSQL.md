---
title: "(web) 데이터베이스 결정장애(SQL vs noSQL)"
layout: post
date: '2019-01-04 02:42:00'
author: 줌코딩
tags: '데이터베이스 결정장애 db nosql-vs-sql sql nosql '
cover: "/assets/instacode.png"
categories: db web
---

우리 웹 서비스를 시작하는데 있어서 어떤 데이터 베이스를 쓰면 좋을지 하나를 딱 정하려고 하니 결정장애가 도졌다.

무슨 데이터베이스가 있는지도 모르고 우리가 뭐를 쓰는게 적합한지 고르려니까 더 그런거같다..

그래서 일단 조금은 공부를 하고 정리한 것을 올려보겠다!!ㅎㅎ

## SQL

SQL이 디비라고 착각하고 있었는데 알고보니까 이거는 laungage이다.

Structure Query Language라고 쿼리하는 언어를 의미한다.

예를 들어 SELECT, FROM 을 통한 검색에 사용되는 언어이다.

#### 그럼 이를 활용한 디비의 특징은 무엇인가??

###### Strict Schema & relations!

1. 틀이 정해져있다!!

먼저 mysql은 table을 활용해서 데이터를 정리한다.

그 테이블의 head를 Field라고 하고 각 필드에 해당하는 값을 record라고 하는데

이 때 각 필드 하위 record는 반드시 값을 가지고 있어야한다!


2. 각 테이블이 관계가 있다.

여기에는 3종류가 있는데 one-to-one, one-to-many, many-to-many가 그들이다.
	
![Alt text](https://raw.githubusercontent.com/zoomKoding/zoomKoding.github.io/source/assets/_posts/mySQL-vs-NoSQL-1.png) 

one to May의 예는 하나의 유저가 여러개의 item을 like했을때로 생각해 볼 수 있다!

![Alt text](https://raw.githubusercontent.com/zoomKoding/zoomKoding.github.io/source/assets/_posts/mySQL-vs-NoSQL-2.png) 
 
 
## NoSQL(MongoDB)
 
 요즘 가장 많이 쓰이는 디비는 MongoDB는 Humongous(거대한)이라는 단어에서 나온 것으로
 
 말 그대로 데이터를 엄청 많이 담을 수 있다고 한다.
 
 
### 이 디비의 특징
 
#### No Schema & No Relation!!
 
 이 DB는 Collection이 존재하고 그 컬렉션 하위에 Document를 보관하는 식으로 되어있다.
 
 우리가 **폴더를 정리하는 것**와 같다고 보면 될 것 같다!!
 
 
 ![Alt text](https://raw.githubusercontent.com/zoomKoding/zoomKoding.github.io/source/assets/_posts/mySQL-vs-NoSQL-3.png) 
 
 
### no Schema
 이 친구는 그렇기 때문에 하위에 들어가는 same schema, 즉 같은 틀을 쓰지 않아도 된다. 
 
![Alt text](https://raw.githubusercontent.com/zoomKoding/zoomKoding.github.io/source/assets/_posts/mySQL-vs-NoSQL-4.png) 

때문에 새로**운 정보를 수정하고 추가 삭제 하는 것이 매우 flexible**하다!!

### no relation

데이터를 쿼리가 편한대로 이곳저곳에 배치할 수 있다..

어떻게 보면 장점이지만 

데이터가 이곳저곳에 있어서 redunduncy issue가 있다. 

그리고 **업데이트할때 모두 업데이트 해줘야하기 떄문에 매우 위험**하기도 하다!!

![Alt text](https://raw.githubusercontent.com/zoomKoding/zoomKoding.github.io/source/assets/_posts/mySQL-vs-NoSQL-5.png) 

어떤 전문가 분이 쓰신 글 같은데... 참 뭔가 이 얘기 듣고 noSQL 쓰기 불안하다..!ㅋㅋㅋㅋㅋ

## 그렇다면 내가 써야하는 디비는..!?

내가 써야하는 디비는 아무래도 디비가 MySQL이 적합한 것 같다.

뭔가 변동 사항이 있을 때 일일이 변경을 해주는 데는 분명 한계가 있을 것이고

우리가 담으려는 데이터는 테이블에 들어가기에 적합한 형태를 띄고 있다는 판단 하에

##### mySQL을 써보려고 한다...!....!(아직 확신은 안서지만...)

**그리고 FireStore로 NoSQL 한번 써봤으니까 이번에는 mySQL 한번 써보자!!!**


---
title: (Web개발) Node.js 입문기(4) - Nodejs로 동적인 페이지 만들기(2)
layout: post
date: '2019-01-10 02:00:00'
author: 줌코딩
tags: Nodejs 노드js form post writeFile redirection update
cover: "/assets/instacode.png"
categories: web개발 nodejs
---

### HTML-form과 post를 활용하여 데이터 받기

html에는 form 이라는 타입이 있다.
이 form type을 이용하여 다음과 같은 구조를 만들었다.
form은 정보를 입력받아 전달할 수 있는 기능을 한다.

![그림](https://raw.githubusercontent.com/zoomKoding/zoomKoding.github.io/source/assets/_posts/Node-introduction-5.png)
￼
이 구조에 해당하는 정보는 다음과 같다.

    <form action="http://localhost:3000/create_process" method="post">
        <p><input type="text" placeholder="yes "name="title"></p>
        <p>
            <textarea placeholder="description" name="description " id="" cols="30" rows="10"></textarea>
        </p>
        <p>
            <input type="submit">
        </p>
    </form>


여기서 action 뒤에 address를 입력할 수 있는데 입력받은 값은 post라는 method를 이용해서 전달하게 된다.

나는 /create_process라는 url에 전송했다.

그렇다면 해당 주소에서 받은 정보는 어떻게 이용할 수 있을까
먼저 다음 module을 가져온다.

    var qs = require('querystring');

그후에 post 형식으로 받은 데이터를 다음과 같이 request.on을 이용하여 파씽이 가능하다

    var body = '';
    request.on('data', function(data){
        body += data;
    });
    
    request.on('end', function(){
        var post = qs.parse(body);
        console.log(post);
    });

여기서 request.on('data', ... ) 에서 데이터를 body에 추가하고 

request.on('end', ... ) 에서 데이터가 다 전송된 것을 확인하고 post에 해당 값을 parse해서 넣으면 된다!

다음은 create_process로 보내진 포스트 방식의 내용이다!

![그림](https://raw.githubusercontent.com/zoomKoding/zoomKoding.github.io/source/assets/_posts/Node-introduction-6.png)


### WriteFile and Redirection하기!

#### 파일 생성 방법

파일 생성시 다음과 같은 코드를 이용하면 된다ㅎㅎ
    
    fs.writeFile(파일이름, 내용, 'utf8', function(err){});

자 그럼 만약 파일을 생성하고 redirection을 하고 싶을 때는 어떻게 해야할까?

#### 여기서 redirection이란

어떤 처리를 한 다음에 사용자를 다른 곳으로 팅겨버리게 하는 것을 의미한다.

response.writeHead를 이용하여 유저의 location을 변경해주면 된다.

그것을 위한 코드는 다음과 같다!

    fs.writeFile(`data/${title}`, description, 'utf8', function(err){
        response.writeHead(302, {Location: `/?id=${title}`});
        response.end('success');
    });

### 내용 업데이트하기

내용을 업데이트 하면서 해당 내용을 바꿔줄 수 있는 페이지를 만들기 위해서는 어떻게 해야할까?

이전과 같이 '/update' 라는 주소를 가지는 페이지로 이동시키고 각 페이지마다 id를 달리주는 방법을 이용했다!

fileRead function을 이용했고

그리고 input과 textarea에 미리 값을 띄워주며 수정값을 업데이트할 수 있게 했다.

그렇게 얻게된 수정 페이지 모습!
￼
![그림](https://raw.githubusercontent.com/zoomKoding/zoomKoding.github.io/source/assets/_posts/Node-introduction-7.png)

근데 만약에 title이 수정되면 가는 돌아가는 링크 자체가 잘못되기 때문에 id값을 보내주는 방법이 필요하다

이를 위해서 input을 하나 만드는데 이 input은 데이터를 보내주는 용도이기 때문에 보여지면 안된다

따라서  아래와 같이 타입을 hidden으로 하면 안보여지게 된다.

    <input type="hidden" name="id" value = ${title}>

그리고

여기서 바로 수정이 끝나는 것이 아니라

/update_process라는 페이지로 이동시켜준다.

해당 페이지에서 post로 받은 정보를 파씽한 후에

fs.rename을 이용해서 id 에서 title로 이름을 수정해주고

fs.writeFile로 다시 description을 적어주면 끝!!


/update와 /update_process에 해당하는 코드는 다음과 같다 ㅎㅎ

    else if(pathname === '/update'){
        fs.readdir('./data', function(error, filelist){
            fs.readFile(`data/${queryData.id}`, 'utf8', function(err, data){
                var title = queryData.id;
                var description = data;
                console.log(description);
                var template  =  templateHTML(title, '', 
                `<form action="/update_process" method="post">
                <input type="hidden" name="id" value = ${title}>
                <p></p><input type="text" placeholder="title" name="title" value = ${title}></p>
                <p>
                    <textarea placeholder="description" name="description" id="" cols="30" rows="10">${description}</textarea>
                </p>
                <p>
                    <input type="submit">
                </p>
                </form>
                `, 
                `<a href="/create">create</a> <a href="/update?id=${title}">update</a>`);
                response.writeHead(200);
                response.end(template);

            }); 
        });
    }else if(pathname === '/update_process'){
        var body = '';
        request.on('data', function(data){
            body += data;
        });

        request.on('end', function(){
            var post = qs.parse(body);
            console.log(post);
            var title = post.title;
            var id = post.id;
            var description = post.description;
            fs.rename(`data/${id}`, `data/${title}`, function(err){
                fs.writeFile(`data/${title}`, description, 'utf8', function(err){
                    response.writeHead(302, {Location: `/?id=${title}`});
                    response.end('success');
                });
            });
        });
    }


### 파일 삭제하기

파일 삭제하는 버튼은 생코를 기반으로 직접 구현해보았다.

#### 1. 똑같은 방식으로 delete버튼을  생성하고 클릭시 post를 이용해서 데이터를 보내주고 


#### 2. home directory로 가도록 했다. 


#### 3. 포스트 형식으로 해주기 위해서 또 type이 hidden인 타입의 input을 만들었다.

    <form action="/delete_process" method="post">
        <input type="hidden" name="id" value =${title}>
        <input type="submit" value="delete">
    </form>


#### 4. delete_process에서 해당 id를 받아서 데이터를 파씽하고 파일을 삭제해줬다. (삭제 후에는 홈디렉토리로 가도록 했다.
    fs.unlink(`data/${title}`, function(error){
        response.writeHead(302, {Location: `/`});
        response.end('success');
    })
    
![그림](https://raw.githubusercontent.com/zoomKoding/zoomKoding.github.io/source/assets/_posts/Node-introduction-8.png)




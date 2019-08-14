---
title: (Web개발) Node.js 입문기(3) - Nodejs 동적인 페이지 만들기(1)
layout: post
date: '2019-01-09 02:00:00'
author: 줌코딩
tags: Nodejs nodejs동적페이지 dynamicpage
cover: "/assets/instacode.png"
categories: web개발 nodejs
---



### 주소값이 없는 곳으로 들어왔을때 not found 구현해보기

다음과 같이 pathname을 받아와서 'path가 '/'(홈) 이 아닐시 에는 에러메세지를 출력하게 해보았다.

    var pathname = url.parse(_url, true).pathname;
    if(pathname === '/'){
        fs.readFile(`data/${queryData.id}`, 'utf8', function(err, data){
            ... 
            response.writeHead(200);
            response.end(template);
        }); 
        }else{
            response.writeHead(404);
            response.end('Not found');
        }
    }

여기서 response.writeHead(404)는 에러가 떴다는걸 의미하는 통신 약속이라고 한다

그리고 이에 대한 결과로 Not found를 출력하도록 했다.

각 HTML, CSS, JAVASCRIPT를 클릭했을때도 잘 작동한다.

**그 이유는 id가 다를 뿐이지 여전히 path는 '/'이기 때문이다!!**

### Node.js에서 파일목록 알아내기

특정 디렉토리 리스트를 출력해주는 것이다

    var testFolder = './data/';
    var fs = require('fs');

    fs.readdir(testFolder, function(error, filelist){
        console.log(filelist);
    })

해당 코드를 실행하면 결과는 다음과 같다.

![사진](https://raw.githubusercontent.com/zoomKoding/zoomKoding.github.io/source/assets/_posts/Node-introduction-4.png)
￼

### 동적으로 글목록을 출력하기

fs.readdir을 이용해서 출력해볼 수 있다.

list를 ul 태그로 묶어주고 각각을 li 태그와 href 로 묶어주면 된다!

    fs.readdir(testFolder, function(error, filelist){
        var list = '<ul>';
        var i = 0;
        while(i< filelist.length){
            list = list +  `<li><a href="/?id=${filelist[i]}">${filelist[i]}</a></li>`
            i = i+1;
        }
        list = list+ '</ul>';
    })

### 코드 정리 정돈 하기

함수화 시키면 훨씬 간단해질 수 있다. 

샘플 코드 마무리 완성 코드이다!!

    var http = require('http');
    var fs = require('fs');
    var url = require('url');

    function templateHTML(title, list, body){
        return `
            <!doctype html>
                <html>
                <head>
                    <title>WEB1 - ${title}</title>
                    <meta charset="utf-8">
                </head>
                <body>
                    <h1><a href="/">WEB</a></h1>
                    ${list}
                    ${body}
                </body>
            </html>
        `;
    }

    function templateList(filelist){
        var list = '<ul>';
        var i = 0;
        while(i< filelist.length){
            list = list +  `<li><a href="/?id=${filelist[i]}">${filelist[i]}</a></li>`
            i = i+1;
        }
        list = list+ '</ul>';
        return list;
    }

    var app = http.createServer(function(request,response){
        var _url = request.url;
        var queryData = url.parse(_url, true).query;     
        var pathname = url.parse(_url, true).pathname;

        if(pathname === '/'){
            fs.readdir('./data', function(error, filelist){
                var title = 'Welcome';
                var description = 'hello, Node.js';
                var list = templateList(filelist);
                if(queryData.id === undefined){
                    var template  =  templateHTML(title, list, `<h2>${title}</h2>${description}`);
                }else{
                fs.readFile(`data/${queryData.id}`, 'utf8', function(err, data){
                    var title = queryData.id;
                    var description = data;
                    var template  =  templateHTML(title, list, `<h2>${title}</h2>${description}`);
                }); 
                }
            response.writeHead(200);
            response.end(template);
            }); 
        }else{
            response.writeHead(404);
            response.end('Not found');
        }
    });
    app.listen(3000);






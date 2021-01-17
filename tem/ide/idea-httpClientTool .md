---
title: IDEA RESTful WebServices
date: 2020-06-22
sidebar: 'auto'
categories:
 - IDEA
tags:
 - idea 
 - http 
 - webServices
---



>  官方文档地址 `https://www.jetbrains.com/help/idea/restful-webservices.html`

### 准备

#### 目录结构

> *不要使用默认的目录*
>
> 1. 在根目录下新建 `http-client` 
>
> 2. 在 `http-client` 下新建 `rest-api.http`
>
>    ```http
>    ### 这是多个请求之间的分隔符
>    GET http://localhost:89/commonApi/listDataDic?type=bool&data={{data}}
>    Accept: */*
>    Cache-Control: no-cache
>    # 可以与历史结果进行比对
>    <> 2020-06-22T102207.200.txt 
>    <> 2020-06-22T102023.200.txt
>    <> 2020-06-22T101401.200.txt
>    ```
>
> 3. 点击旁边的绿色箭头即可运行
>
> 4. 结果日志保存在 `.idea\httpRequests`

#### RESTFUL 风格说明

> `POST`: 新增数据
>
> `PUT`: 修改数据
>
> `GET`: 查询数据
>
> `DELETE`: 删除数据
>
> *上面是常用的请求, 注意使用该风格, 路径中不要包含 list/get/add/update/delete 等字眼*
>
> 如新增用户: POST userInfo

#### 变量

> 1. 内置变量: `uuid` `timestamp` `randomInt`
>
> 2. 内置变量使用方式: 
>
>    ```http
>    PUT userInfo/{{$uuid}}
>    ```
>
> 3. 自定义变量, 新建文件 `http-client.env.json` *特别注意, 该文件必须在项目中, 可以在根目录, 也可以在我们新建的 `http-client` 里面*
>
>    ```http
>    {
>      "dev": {
>        "host": "127.0.0.1:89",
>        "common": "127.0.0.1:89/commonApi"
>      }
>    }
>    ```
>
> 4. 自定义变量使用方式
>
>    ```http
>    GET {{common}}/listDataDic?type=bool
>    ```
>
> 5. 待补充 `http-client.private.env.json`

#### 脚本

> *该工具也支持脚本的方式, 脚本语言是 [ECMAScript 5.1](https://www.ecma-international.org/ecma-262/5.1/)*
>
> 格式: 
>
> ```http
> GET {{common}}/listDataDic?type=bool
>  > {% ... %}
> ```

#### 文件上传

> ```http
> ### 这样就可以测试文件上传了
> POST {{host}}/upload/addFile HTTP/1.1
> Content-Type: multipart/form-data; boundary=boundary
> --boundary
> Content-Disposition: form-data; name="files"; filename="input.txt"
> < ./input.txt
> ```

>  [client](https://www.jetbrains.com/help/idea/http-client-reference.html) 可以获取 session metadata
> 
>  | Method   | Parameters                              | Description                                                  |
>  | -------- | --------------------------------------- | ------------------------------------------------------------ |
>  | `test`   | `testName` (string)`func` (function)    | Creates a test with the name `testName` and body `func`. All tests are executed after the response handler script. |
>  | `assert` | `condition` (boolean)`message` (string) | Checks that the specified `condition` is `true`; throws an exception otherwise. The optional `message` parameter serves as an exception message. |
>  | `log`    | `text`                                  | Prints `text` to the response handler or test stdout and then terminates the line. |
> 
>  ``` js
>  // global methods
>  client.global.set(a, "a")
>  
>  // 可以存储请求的结果数据到一个变量中, 下一个请求可以用这个数据
>  client.global.set("auth_token", response.body.json.token);
>  
>  client.global.get(a)
>  client.global.isEmpty()
>  client.global.clear(a)
>  client.global.clearAll()
>  // methods
>  client.test()
>  client.assert()
>  clinet.log()
>  ```
> 
>  [response](https://www.jetbrains.com/help/idea/http-response-reference.html) 可以获取返回值
> 
>  | Property                                                     | Description                                                  |
>  | ------------------------------------------------------------ | ------------------------------------------------------------ |
>  | `body` (string\|object)                                      | Response content, which is a string or a JSON object if the response's *content-type* is *application/json*. |
>  | `headers` ([ResponseHeaders](https://www.jetbrains.com/help/idea/http-response-reference.html#headers-reference)) | The [response headers storage object](https://www.jetbrains.com/help/idea/http-response-reference.html#headers-reference). |
>  | `status` (int)                                               | Response status, for example, *200* or *404*.                |
>  | `contentType` ([ContentType](https://www.jetbrains.com/help/idea/http-response-reference.html#content-type-reference)) | The [contentType object](https://www.jetbrains.com/help/idea/http-response-reference.html#content-type-reference), which holds the data on the *Content-Type* response header value. |
> 
>  ```js
>  response.body.json // 获取 JSON 类型返回值
>  
>  response.status // 404.etc
>  
>  response.headers.valueOf(headerName)// get first value
>  response.headers.valuesOf(headerName)// get all values
>  
>  response.ContentType.mimeType //The MIME type of the response, for example, text/plain, text/xml, application/json.
>  
>  response.ContentType.charset //The string representation of the response charset, for example, utf-8.
>  
>  ```
> 
>  
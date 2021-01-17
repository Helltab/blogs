---
title: nginx 的 stream 模块
date: 2021-01-17
sidebar: 'auto'
categories:
 - nginx
tags:
 - nginx
---

<!-- more -->
> 利用 nginx 的 stream 模块转发 mysql, mstsc, mq, 玄武短信等流  
<!-- more -->

## windows 环境
> 版本 >= nginx-1.16.1, 暂时没测试更低版本  
> proxy_pass 不能为域名, 可以配置负载均衡  
> 注意 stream 与 http 同级
```conf 
stream {
  server {
     listen 8888;
     proxy_pass xxx:3389;    
  }
}
http {
}
```
## linux 环境
> 版本 >= 1.9.0
> linux 下默认是不带这个模块的, 如果没有安装好, 需要指定 stream 模块
```bash
./configure --prefix=/usr/local/nginx   --with-stream
# 编译安装
make
make install
```
>  如果已经安装好了, 需要按下面步骤进行添加 
```bash
# 进入源码目录
./configure --prefix=/usr/local/nginx   --with-stream
# 一定不要执行 `make install`
make
# 备份原有执行文件
cp /usr/local/nginx/sbin/nginx /usr/local/nginx/sbin/nginx-no-strem
# 复制新编译的文件
cp ./objs/nginx /usr/local/nginx/sbin/nginx

```

## mstsc 应用举例
> 场景: 有一台服务器 A 是互联网服务器, B C D E 分别是内网服务器  
> 以前的远程方式: 1.向日葵, 2.teamViewer 3.意念...
> 上述的远程方式都存在收费, 卡顿, 文件传输有障碍的问题, 因此可以通过 nginx 来组建远程访问  
```markdown
1. 先在 A 安装 nginx
2. 配置 stream 代理
stream {
  server {
     listen 8881;
     proxy_pass A:3389;    
  }
  server {
     listen 8882;
     proxy_pass B:3389;    
  }
  server {
     listen 8883;
     proxy_pass C:3389;    
  }
}
```
> 这样就可以愉快的远程了

## location

> 访问目录

```nginx
location  /down {
    rewrite "^/down(.*)$" /$1 break;
    root    html/tools;
    autoindex on;
    autoindex_exact_size off;
    autoindex_localtime on;
}
```


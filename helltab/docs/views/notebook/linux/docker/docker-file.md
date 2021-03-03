---
title: 使用 dockerfile, 以 nginx 举例
date: 2021-03-03
sidebar: 'auto'
categories:
 - docker
 - dockerfile
tags:
 - linux
 - docker
 - dockerfile
---

## 准备

> 制作镜像的 linux 必须要能够联网

```sh
mkdir -p /usr/local/docker/imgages/nginx
cd /usr/local/docker/imgages/nginx
wget http://nginx.org/download/nginx-1.18.0.tar.gz
vim Dockerfile
```



## Dockerfile

> 编写 Dockerfile

```sh
#基础镜像
FROM centos:centos7
#作者信息
MAINTAINER "helltab"
#Nginx 源码解包至容器
ADD nginx-1.18.0.tar.gz /opt
#切换工作目录
WORKDIR /opt/nginx-1.18.0
#容器内执行命令：安装编译依赖，创建用户和组，开始预编译，编译，安装
RUN yum -y install gcc pcre-devel openssl-devel make \
    && groupadd www-data && useradd -s /sbin/nologin -g www-data www-data \
    && ./configure \
    --prefix=/usr/local/nginx \
    --conf-path=/etc/nginx/nginx.conf \
    --user=www-data \
    --group=www-data \
    --with-pcre \
    --with-http_v2_module \
    --with-http_ssl_module \
    --with-http_realip_module \
    --with-http_addition_module \
    --with-http_sub_module \
    --with-http_dav_module \
    --with-http_flv_module \
    --with-http_mp4_module \
    --with-http_gunzip_module \
    --with-http_gzip_static_module \
    --with-http_random_index_module \
    --with-http_secure_link_module \
    --with-http_stub_status_module \
    --with-http_auth_request_module \
    --with-mail \
    --with-mail_ssl_module \
    --with-file-aio \
    --with-http_v2_module \
    --with-threads \
    --with-stream \
    --with-stream_ssl_module && make && make install
#设置要挂载到宿主机的目录
VOLUME  ["/usr/local/nginx/html"]
#设置nginx环境变量
ENV PATH /usr/local/nginx/sbin:$PATH 
#暴露80端口
EXPOSE 80
#容器启动时执行nginx命令
ENTRYPOINT ["nginx"]       
#nginx命令参数
CMD ["-g","daemon off;"]
```

## 构建镜像

> 构建过程可能会比较长

```sh
docker build  -t helltab/nginx:v1 -f Dockerfile .
```

## 使用镜像

```sh
# 查看镜像
docker images
# 添加本地目录
mkdir -p /usr/local/docker/dockwer-nginx/wwwroot
mkdir -p /usr/local/docker/dockwer-nginx/conf.d
echo "" > /usr/local/docker/dockwer-nginx/nginx.conf # 运行后记得在这里更改为实际的配置文件
echo "" > /usr/local/docker/dockwer-nginx/conf.d/default.conf
# 运行镜像容器
docker run --name nginx --net host \
 -v /usr/local/docker/docker-nginx/nginx.conf:/etc/nginx/nginx.conf \
 -v /usr/local/docker/docker-nginx/log:/var/log/nginx \
 -v /usr/local/docker/docker-nginx/conf.d/default.conf:/etc/nginx/conf.d/default.conf \
 -v /usr/local/docker/docker-nginx/wwwroot:/usr/local/nginx/html \
 -d helltab/nginx:v1

```

## 保存镜像

```sh
# 保存制作好的镜像
docker save -o helltab-nginx-v1.tar helltab/nginx:v1
# 加载制作好的镜像
docker load -i helltab-nginx-v1.tar
```


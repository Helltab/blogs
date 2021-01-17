---
title: linux-docker
date: 2021-01-04
sidebar: 'auto'
categories:
 - linux
 - docker
tags:
 - linux
 - docker
---

## 安装和自动启动

```sh
# 查看系统版本, 要求 ≥centos7 64 ≥3.10
lsb_release -a
uname -r

# 用yum源安装, 先查看是否已经安装
yum list installed | grep docker
# 安装
yum -y install docker
# 启动 docker
systemctl start docker
systemctl status docker
# 开机自启动
systemctl enable docker

```

## 国内镜像源

> Docker中国区官方镜像
> https://registry.docker-cn.com
>
> 网易
> http://hub-mirror.c.163.com
>
> ustc 
> https://docker.mirrors.ustc.edu.cn
>
> 中国科技大学
> https://docker.mirrors.ustc.edu.cn
>
> 阿里云容器服务 (首页点击“创建我的容器镜像” 得到一个专属的镜像加速地址)
> https://cr.console.aliyun.com/

```sh
# vi /etc/docker/daemon.json
{
    "registry-mirrors": ["https://registry.docker-cn.com"]
}
systemctl restart docker.service


```

## docker 命令

```sh
# 进入某个容器
docker exec -it [id] /bin/bash
# 更新配置
docker update --restart=always [id] 
# 查看日志 t: 时间戳 f: 实时更新
docker logs -tf [id]
```

## 镜像备份还原

```sh
# 容器保存为镜像
docker commit docker_mysql8
# 镜像备份
docker  save -o docker_mysql8.tar docker_mysql8
# 镜像恢复与迁移
docker load -i docker_mysql8.tar
# 运行镜像
docker run -d -p 3306:3306 --restart=always docker_mysql8
```





## mysql

```sh
# 查看 mysql 镜像
docker search mysql
# 拉取镜像
docker pull mysql  
# 查看
docker images
# 运行镜像, 映射到目录中
docker run -p 3306:3306 --name docker_mysql8 --restart=always  \
-e MYSQL_ROOT_PASSWORD=root \
-d mysql --lower_case_table_names=1
# 查看目前运行的容器
docker container ls
# 进入 mysql
docker exec -it zsdmysql bash
df -h
mysql -uroot -proot


```

## redis

```sh
# 拉取镜像
docker pull redis:latest
# 运行
docker run -itd --name docker_redis -p 6379:6379 redis

```

> 集群

```sh
docker network create redis-net
docker network inspect redis-net
vim /etc/sysctl.conf
=>
net.core.somaxconn = 2048
<=
sysctl -p
```

```templ
port ${PORT}
masterauth helltab
requirepass helltab
cluster-enabled yes
cluster-config-file nodes.conf
cluster-node-timeout 5000
cluster-announce-ip my_ip
cluster-announce-port ${PORT}
cluster-announce-bus-port 1${PORT}
appendonly yes
```



```sh
for port in `seq 7001 7006`; do \
  mkdir -p ./${port}/conf \
  && PORT=${port} envsubst < ./redis-cluster.tmpl > ./${port}/conf/redis.conf \
  && mkdir -p ./${port}/data; \
done

for port in `seq 7001 7006`; do
     docker run -d --net=host \
     -v /usr/local/helltab/docker/redis/${port}/conf/redis.conf:/etc/redis/redis.conf \
     -v /usr/local/helltab/docker/redis/${port}/data:/data \
     --restart always --name=redis-${port}  redis redis-server /etc/redis/redis.conf;
done

docker exec -it redis-7001 bash

redis-cli -a helltab --cluster create 192.168.2.11:7001 192.168.2.11:7002 192.168.2.11:7003 192.168.2.11:7004  192.168.2.11:7005  192.168.2.11:7006 --cluster-replicas 1

for port in `seq 7001 7006`; do
	docker restart redis-${port}
done
for port in `seq 7001 7006`; do
	docker stop redis-${port}
	docker rm redis-${port}
done
for port in `seq 7001 7006`; do
	sh openPort.sh ${port}
done
for port in `seq 7001 7006`; do
	rm -rf ./${port}/data/*
done

redis-cli -c -a helltab  -h 192.168.2.11  -p 7001
redis-cli -a helltab --cluster check 192.168.2.11:7001


docker run -d --net=host \
     -v /usr/local/westar/redis/7001/conf/redis.conf:/etc/redis/redis.conf \
     -v /usr/local/westar/redis/7001/data:/data \
     --restart always --name=redis-7001  redis redis-server /etc/redis/redis.conf;
```



## elasticsearch

```sh
docker pull elasticsearch:7.9.3
docker images
docker run -d --name docker_es01 -p 9200:9200 -p 9300:9300 -e "discovery.type=single-node"
```

> **集群**
>
> --network 用于多个服务通信与隔离，例如用kibana连接elasticsearch就需要他们在同一个网络下

```sh
# 如果需要安装kibana等其他，需要让他们在同一个网络，使得es和kibana通信
docker network create docker_es_net

--创建挂载目录[data:存放索引数据，plugins:存放es插件]
mkdir -p  /usr/local/westar/es
mkdir -p  /usr/local/westar/es/db/data1
mkdir -p  /usr/local/westar/es/db/data2
mkdir -p  /usr/local/westar/es/db/data3
mkdir -p  /usr/local/westar/es/config/plugins1
mkdir -p  /usr/local/westar/es/config/plugins2
mkdir -p  /usr/local/westar/es/config/plugins3
-- 设置执行权限
chmod 777 /usr/local/westar/es/db/data1 
chmod 777 /usr/local/westar/es/db/data2 
chmod 777 /usr/local/westar/es/db/data3
```

```yml
# ES01.yml
  cluster.name: es-cluster 
  cluster.initial_master_nodes : es-node1
  node.name: es-node1 
  network.bind_host: 0.0.0.0 
  network.publish_host: 192.168.1.196 
  http.port: 9201 
  transport.tcp.port: 9301
  http.cors.enabled: true 
  http.cors.allow-origin: "*" 
  node.master: true 
  node.data: true  
  discovery.zen.ping.unicast.hosts:  ["192.168.1.196:9301","192.168.1.196:9302","192.168.1.196:9303"] 
```

```sh
vim /etc/sysctl.conf
# vm.max_map_count=262144 
	
# 刷新配置
sysctl -p
```

```sh
docker run -e ES_JAVA_OPTS="-Xms256m -Xmx256m" \
        -d -p 9201:9201 -p 9301:9301 \
        -e ES_MIN_MEM=256m \
        -e ES_MAX_MEM=256m \
        -v /usr/local/westar/es/config/ES01.yml:/usr/share/elasticsearch/config/elasticsearch.yml \
        -v /usr/local/westar/es/db/data1/:/usr/share/elasticsearch/data/ \
        -v /usr/local/westar/es/config/plugins1/:/usr/share/elasticsearch/plugins  \
        --restart=always \
        --network=docker_es_net \
        --name ES01 1ab13f928dc8
        
        
docker run -e ES_JAVA_OPTS="-Xms256m -Xmx256m" \
        -d -p 9202:9202 -p 9302:9302 \
        -e ES_MIN_MEM=256m \
        -e ES_MAX_MEM=256m \
        -v /usr/local/westar/es/config/ES02.yml:/usr/share/elasticsearch/config/elasticsearch.yml \
        -v /usr/local/westar/es/db/data2/:/usr/share/elasticsearch/data/ \
        -v /usr/local/westar/es/config/plugins2/:/usr/share/elasticsearch/plugins  \
        --restart=always \
        --network=docker_es_net \
        --name ES02 1ab13f928dc8

docker run -e ES_JAVA_OPTS="-Xms256m -Xmx256m" \
        -d -p 9203:9203 -p 9303:9303 \
        -e ES_MIN_MEM=256m \
        -e ES_MAX_MEM=256m \
        -v /usr/local/westar/es/config/ES03.yml:/usr/share/elasticsearch/config/elasticsearch.yml \
        -v /usr/local/westar/es/db/data3/:/usr/share/elasticsearch/data/ \
        -v /usr/local/westar/es/config/plugins3/:/usr/share/elasticsearch/plugins  \
        --restart=always \
        --network=docker_es_net \
        --name ES03 1ab13f928dc8
        

```

> **es-head**

```sh
docker pull mobz/elasticsearch-head:5-alpine
docker run -d \
    --name=es-head \
    -p 9100:9100 \
    -m 512m \
    --memory-swap=1024m \
    mobz/elasticsearch-head:5-alpine
    
```

>  **nginx**

```ngi
worker_processes  1;
events {
    worker_connections  1024;
}

http {
    include       mime.types;
    default_type  application/octet-stream;

    sendfile        on;
    upstream es{
	    least_conn;    #把请求转发给连接数较少的后端服务器
		    server 192.168.1.196:9201; #ES对应的ip:port
		    server 192.168.1.196:9202;
	    server 192.168.1.196:9203;
    }
    server {
	    listen       9222;
	    server_name  localhost;
	    underscores_in_headers on;
	    location / {
		    proxy_set_header   Host $host:$server_port;
		    proxy_redirect off;
		    proxy_set_header X-Real-IP $remote_addr;
		    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
		    proxy_pass http://es;
	    }
    }
}

```

## MongoDB



```sh
docker search mongo

docker run -itd --name mongo -p 27017:27017 mongo --auth

docker exec -it mongo mongo admin

use nodejsdb
db.nodejsdb.insert({name:'helltab'})
db.createUser({ user:'nodejs',pwd:'nodejspwd',roles:[ { role:'readWrite', db: 'nodejsdb'}]});
db.auth('nodejs', 'nodejspwd')
```

```json

```





## docker-compose

> python-pip

```sh
yum -y install epel-release
yum -y install python-pip
# 换源
mkdir ~/.pip
cd ~/.pip
vi ~/.pip/pip.conf

[global] 
index-url = https://pypi.tuna.tsinghua.edu.cn/simple
[install]
trusted-host = https://pypi.tuna.tsinghua.edu.cn  # trusted-host 此参数是为了避免麻烦，否则使用的时候可能会提示不受信任


```

> 安装

```sh

pip install docker-compose

docker-compose --version
```

> RabbitMQ

```sh
docker pull rabbitmq：management

docker run -dit --name docker_rabbit -e RABBITMQ_DEFAULT_USER=admin -e RABBITMQ_DEFAULT_PASS=admin -p 15672:15672 -p 5672:5672 rabbitmq:management
```



## Error

> desc: docker error creating overlay mount to invalid argument
>
> ans:  由于docker的不同版本在centos上产生的mount问题，1.2.x没有出现这个问题，当使用yum install时，安装的最新版本(1.3.x)，会导致overlay2的错误。

```sh
vim /etc/sysconfig/docker-storage 
=>
DOCKER_STORAGE_OPTIONS="-s overlay"
<=
systemctl daemon-reload
systemctl restart docker
```


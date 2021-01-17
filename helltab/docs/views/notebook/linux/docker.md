---
title: docker
date: 2020-11-20
sidebar: 'auto'
categories:
 - 数据库
 - oracle
tags:
 - database
 - oracle
---

## 版本问题

```sh
yum remove docker  docker-common docker-selinux dockesr-engine -y

yum upgrade -y

sudo yum install -y yum-utils device-mapper-persistent-data lvm2

yum install docker -y
systemctl daemon-reload
systemctl restart docker
```

## 备份

```sh
# 将当前容器提交到镜像
docker commit [id] [name]

docker  save -o elasticsearch.tar 1ab13f928dc8

docker load -i elasticsearch.tar
```

## elasticsearch

> --network 用于多个服务通信与隔离，例如用kibana连接elasticsearch就需要他们在同一个网络下

```sh
# 如果需要安装kibana等其他，需要让他们在同一个网络，使得es和kibana通信
docker network create docker_es_net

docker run --name docker_es  -p 9200:9200 -p 9300:9300  --network docker_es_net -e "discovery.type=single-node" 1ab13f928dc8
```

> 修改配置文件

```sh
docker cp docker_es:/usr/share/elasticsearch/config/elasticsearch.yml es.yml

vim es.yml

docker es.yml cp docker_es:/usr/share/elasticsearch/config/elasticsearch.yml 
```

```yml
# es.yml
cluster.name: "elasticsearch"
network.host: 0.0.0.0
node.name: node-1
```

> 集群

```yml
cluster.name: elasticsearch-cluster
node.name: es-node1
network.bind_host: 0.0.0.0
network.publish_host: 192.168.1.196
http.port: 9200
transport.tcp.port: 9300
http.cors.enabled: true
http.cors.allow-origin: "*"
node.master: true
node.data: true
discovery.zen.ping.unicast.hosts: ["192.168.1.196:9300","192.168.1.196:9301","192.168.1.196:9302"]
discovery.zen.minimum_master_nodes: 2
```

```sh
docker run -e ES_JAVA_OPTS="-Xms256m -Xmx256m" -d -p 9200:9200 -p 9300:9300 -v /usr/local/westar/es/config/es1.yml:/usr/share/elasticsearch/config/elasticsearch.yml -v /usr/local/westar/es/data1:/usr/share/elasticsearch/data --name docker_es01 --network=docker_es_net 1ab13f928dc8

docker run -e ES_JAVA_OPTS="-Xms256m -Xmx256m" -d -p 9201:9201 -p 9301:9301 -v /usr/local/westar/es/config/es2.yml:/usr/share/elasticsearch/config/elasticsearch.yml -v /usr/local/westar/es/data2:/usr/share/elasticsearch/data --name docker_es02 --network=docker_es_net 1ab13f928dc8

docker run -e ES_JAVA_OPTS="-Xms256m -Xmx256m" -d -p 9202:9202 -p 9302:9302 -v /usr/local/westar/es/config/es3.yml:/usr/share/elasticsearch/config/elasticsearch.yml -v /usr/local/westar/es/data3:/usr/share/elasticsearch/data --name docker_es03 --network=docker_es_net 1ab13f928dc8

```

> error: oci runtime error: container_linux.go:235: starting container process caused "process_linux.go:258: applying cgroup configuration for process caused \"Cannot set property TasksAccounting, or unknown property.\"".

```sh
yum update
```


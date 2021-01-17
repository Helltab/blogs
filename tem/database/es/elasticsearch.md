---
title: elasticsearch
date: 2020-12-02
sidebar: 'auto'
categories:
 - elasticsearch
 - 全文检索 
tags:
 - elasticsearch 
 - 全文检索 
---

## 集群配置

```yml
#-------------------------cluster
# 节点1的配置信息：
cluster.name: es-cluster #集群名称，保证唯一

#-------------------------node
# Add custom attributes to the node:
# node.rack: r1
# 节点名称，必须不一样
node.name: node-1 
# 是否可以被选举为master节点
node.master: true
# 是否可以被选举为master节点
node.data: true

#-------------------------path
# 可以指定es的数据存储目录，默认存储在es_home/data目录下
path.data: /path/to/data
# 可以指定es的日志存储目录，默认存储在es_home/logs目录下
path.logs: /path/to/logs

#-------------------------memory
# 锁定物理内存地址，防止elasticsearch内存被交换出去,也就是避免es使用swap交换分区
bootstrap.memory_lock: true
# 确保ES_HEAP_SIZE参数设置为系统可用内存的一半左右
# 当系统进行内存交换的时候，es的性能很差

#-------------------------network
# 为es设置自定义端口，默认是9200
# 注意：在同一个服务器中启动多个es节点的话，默认监听的端口号会自动加1：例如：9200，9201，9202...
network.host: host1
http.port: 9200
transport.tcpport: 9300 

#-------------------------discovery
# 默认节点列表：
# 127.0.0.1，表示ipv4的回环地址。
# [::1]，表示ipv6的回环地址
# The default list of hosts is ["127.0.0.1", "[::1]"]
# 设置集群自动发现机器ip集合
discovery.zen.ping.unicast.hosts: ["host1", "host2"]
# 通过配置这个参数来防止集群脑裂现象 (集群总节点数量/2)+1
discovery.zen.minimum_master_nodes: 3

#-------------------------gateway
# 一个集群中的N个节点启动后,才允许进行数据恢复处理，默认是1
# gateway.recover_after_nodes: 3

#-------------------------various
# 在一台服务器上禁止启动多个es服务
# node.max_local_storage_nodes: 1
# 设置是否可以通过正则或者_all删除或者关闭索引库，默认true表示必须需要显式指定索引库名称
# 生产环境建议设置为true，删除索引库的时候必须显式指定，否则可能会误删索引库中的索引库。
# action.destructive_requires_name: true

```

## ES Restful API

> ES Restful API GET、POST、PUT、DELETE、HEAD含义：
>
> - GET：获取请求对象的当前状态。
>
> - POST：改变对象的当前状态
> - PUT：创建一个对象
> - DELETE：销毁对象
> - HEAD：请求获取对象的基础信息

### 索引和文档的操作

```http
###
#新建索引
PUT http://192.168.2.10:9201/blog
content-type: application/json; charset=UTF-8
{
  "mappings" : {
    "properties" : {
      "title" : {
        "type" : "text",
        "fields": {
          "keyword": {
            "type": "keyword",
            "ignore_above": 256
          }
        }
      },
      "content" : {
        "type" : "text"
      },
      "tags" : {
        "type" : "text"
      }
    }
  }
}
###
PUT http://192.168.2.10:9201/blog
###
PUT http://192.168.2.10:9201/del_index
### 删除索引
DELETE http://192.168.2.10:9201/del_index
###
#查看索引
GET http://192.168.2.10:9201/index01,blog/_settings
###
#打开关闭索引
POST http://192.168.2.10:9201/index01,blog/_close
###
POST http://192.168.2.10:9201/index01,blog/_open
###
# 新建文档(类似mysql insert插入操作)
PUT http://192.168.2.10:9201/blog/_doc/1
content-type: application/json; charset=UTF-8
{
"title":"天为什么这么蓝",
"content":"高空的散射光以紫、蓝、青光等为主，对下层空气分子散射来讲，主要是蓝色光线被散射出来。因此，我们看到的天空是蔚蓝色的，而且天气越晴朗，天空就越蓝。",
"tags":["天空","大气层","散射"]
}
###
# 删除文档
DELETE http://192.168.2.10:9201/blog/_doc/1
###
# 查询文档
GET http://192.168.2.10:9201/blog/_doc/1

```

### 查询

- 基本查询

  - #### term query

    ```http
    ### term
    GET http://192.168.2.10:9201/blog/_search
    content-type: application/json; charset=UTF-8
    {
      "query": {
        "term": {
          "_id": "2"
        }
      }
    }
    ```

  - #### match query

    ```http
    ### match, title 要排序, 必须要有 keyword 属性
    GET http://192.168.2.10:9201/blog/_search
    content-type: application/json; charset=UTF-8
    {
      "query": {
        "match": {
          "_type": "_doc"
        }
      },
      "sort": [
        {"title.keyword":{ "order" : "asc" }}
      ]
    }
    ```

    

- 通配符查询

- 正则表达式查询

- 前缀查询

- 聚合查询

```http request

# 新建文档(类似mysql insert插入操作)
PUT http://192.168.2.10:9201/blog/_doc/2
content-type: application/json; charset=UTF-8

{
"title":"天空为什么这么蓝2",
"content":"天空中有大气层, 对蓝色附近的波长的光有散射作用2",
"tags":["大气层2","天空2","散射2"]
}
###
# 删除文档
DELETE http://192.168.2.10:9201/blog/_doc/1
###
# 查询文档
GET http://192.168.2.10:9201/blog/_doc/2
###
#新建索引
PUT http://192.168.2.10:9201/index01
###
PUT http://192.168.2.10:9201/blog
###
PUT http://192.168.2.10:9201/blog
content-type: application/json; charset=UTF-8

{
  "mappings" : {
    "properties" : {
      "title" : {
        "type" : "text",
        "fields": {
          "keyword": {
            "type": "keyword",
            "ignore_above": 256
          }
        }
      },
      "content" : {
        "type" : "text"
      },
      "tags" : {
        "type" : "text"
      }
    }
  }
}
###
PUT http://192.168.2.10:9201/del_index
### 删除索引
DELETE http://192.168.2.10:9201/del_index
### 删除索引
DELETE http://192.168.2.10:9201/blog
###
#查看索引
GET http://192.168.2.10:9201/index01,blog/_settings
###
#查看索引
GET http://192.168.2.10:9201/index01,blog
###
#打开关闭索引
POST http://192.168.2.10:9201/index01,blog/_close
###
POST http://192.168.2.10:9201/index01,blog/_open
### term
GET http://192.168.2.10:9201/blog/_search
content-type: application/json; charset=UTF-8

{
  "query": {
    "term": {
      "_id": "2"
    }
  }
}
### match
GET http://192.168.2.10:9201/blog/_search
content-type: application/json; charset=UTF-8

{
  "query": {
    "match": {
      "_type": "_doc"
    }
  },
  "sort": [
    {"title.keyword":{ "order" : "asc" }}
  ]
}

```
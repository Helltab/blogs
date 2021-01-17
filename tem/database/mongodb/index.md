---
title: mongodb 创建数据库和用户
date: 2020-12-02
sidebar: 'auto'
categories:
 - mongodb
 - database 
tags:
 - mongodb 
 - database 
---

> 权限说明

```sh
# 1. 数据库用户角色：read、readWrite;  
# 2. 数据库管理角色：dbAdmin、dbOwner、userAdmin；       
# 3. 集群管理角色：clusterAdmin、clusterManager、clusterMonitor、hostManager；
# 4. 备份恢复角色：backup、restore；
# 5. 所有数据库角色：readAnyDatabase、readWriteAnyDatabase、userAdminAnyDatabase、dbAdminAnyDatabase
# 6.  超级用户角色：root  
# 7.  这里还有几个角色间接或直接提供了系统超级用户的访问（dbOwner 、userAdmin、userAdminAnyDatabase）
# 8.  内部角色：**__system**
   >read:允许用户读取指定数据库
   >readWrite:允许用户读写指定数据库
   >dbAdmin：允许用户在指定数据库中执行管理函数，如索引创建、删除，查看统计或访问system.profile
   >userAdmin：允许用户向system.users集合写入，可以找指定数据库里创建、删除和管理用户
   >clusterAdmin：只在admin数据库中可用，赋予用户所有分片和复制集相关函数的管理权限。
   >readAnyDatabase：只在admin数据库中可用，赋予用户所有数据库的读权限
   >readWriteAnyDatabase：只在admin数据库中可用，赋予用户所有数据库的读写权限
   >userAdminAnyDatabase：只在admin数据库中可用，赋予用户所有数据库的userAdmin权限
   >dbAdminAnyDatabase：只在admin数据库中可用，赋予用户所有数据库的dbAdmin权限。
   >root：只在admin数据库中可用。超级账号，超级权限
```

> **创建 root 账号**

```bash
use admin
db.createUser(
     {
       user:"myadmin",
       pwd:"secret",
       roles:[{role:"root",db:"admin"}]
     }
  )
  
show users

# 验证用户
use admin
# 有密码 show dbs 会报错
# 1 表示成功
db.auth('myadmin', 'secret')
```

> **创建数据库**

```bash
# 创建并切换
use mydb
# 查看当前数据库
db
# 查看所有, 新建的数据库因为没有数据, 这里是查不出来的
show dbs
# 创建一个 collection, 并插入一些数据就能查出来了
db.movie.insert({"name":"加勒比海盗"})
```

> 添加数据库管理用户

```bash
# 切换到目标数据库
use mydb
# 创建用户
db.createUser({
    user: 'test',
    pwd: 'test123',
    roles: [ { role: "readWrite", db: "mydb" } ]
})

show users
```


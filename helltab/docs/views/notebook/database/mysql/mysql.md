---
title: mysql
date: 2020-12-02
sidebar: 'auto'
categories:
 - mysql
 - database 
tags:
 - mysql 
 - database 
---

```sql
-- 建表, id 主键自增
create table TestTable (
	id int(4) primary key not null auto_increment,
	name varchar(80) not null,
	age int(3),
	sex varchar(2)
)
```

## 安装

> 准备工作

```sh
mkdir -p /usr/local/westar/mysql/mysql8/data

cd /usr/local/westar/mysql/mysql8

wget https://dev.mysql.com/get/Downloads/MySQL-8.0/mysql-8.0.11-linux-glibc2.12-x86_64.tar.gz

tar -zxvf mysql-8.0.11-linux-glibc2.12-x86_64.tar.gz

mv mysql-8.0.11-linux-glibc2.12-x86_64/* ./

cd bin

# 这一步要记下默认密码, 用于首次登录
mysqld --initialize --user=mysql --basedir=/usr/local/westar/mysql/mysql8 --datadir=/usr/local/westar/mysql/mysql8/data/ --lower-case-table-names=1

# 配置命令环境
export PATH=$PATH:/usr/local/westar/mysql/mysql8/bin
```

> 配置文件 /etc/my.cnf

```cnf
[mysqld]
basedir=/usr/local/westar/mysql/mysql8
datadir=/usr/local/westar/mysql/mysql8/data
socket=/tmp/mysql.sock
port=3306
default_authentication_plugin=mysql_native_password
lower-case-table-names=1
[client]
socket=/tmp/mysql.sock
port=3306
```

> 修改默认密码, 配置远程访问

```sh
alter user 'root'@'%' identified by 'ABCabc123!'
create user 'root'@'%' identified by 'ABCabc123!';
grant all privileges on *.*  to  'root'@'%';
```



> 设置启动

```sh
cp /usr/local/westar/mysql/mysql8/support-files/mysql.server /etc/init.d/mysql
 
chmod +x /etc/init.d/mysql #添加可执行权限。
 
chkconfig --add mysql # 注册启动服务
 
chkconfig --list #查看是否添加成功
```


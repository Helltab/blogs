---
title: firewalld
date: 2021-01-17
sidebar: 'auto'
categories:
 - linux
tags:
 - linux
 - firewalld
---

## 基本命令

```sh
firewall-cmd --zone=public --list-ports

firewall-cmd --state

# 查看端口
netstat -lnpt
# 查看某个服务的端口, 如 docker
netstat -nlp |grep docker-proxy|awk '{print $4}'|sort

# 端口开放脚本
vim openPort.sh
=>
firewall-cmd --zone=public --add-port=$1/tcp --permanent
firewall-cmd --reload
<=
```


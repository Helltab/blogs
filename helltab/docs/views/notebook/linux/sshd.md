---
title: sshd
date: 2021-01-17
sidebar: 'auto'
categories:
 - linux
tags:
 - linux
 - sshd
---



# sshd

> ssh 登录慢

```sh
vim /etc/ssh/sshd_config

=>
useDNS no
<=

ssh-copy-id -i id_rsa.pub root@master
ssh-copy-id -i id_rsa.pub root@slave
```

> 异常断开

```sh
vim /etc/ssh/sshd_config
=>
 ClientAliveInterval 60
 ClientAliveCountMax 3
<=
```


---
title: linux
date: 2021-01-17
sidebar: 'auto'
categories:
 - linux
tags:
 - linux
---



## systemctl

```sh
# 目录
cd /etc/systemd/system
# 重载
systemctl daemon-reload
# 开机自启
systemctl enable [service]

```



### nginx.service

```sh
[Unit]
Description=nginx
After=network.target

[Service]
Type=forking
ExecStartPre=/usr/local/nginx/sbin/nginx -t -c /usr/local/nginx/conf/nginx.conf
ExecStart=/usr/local/nginx/sbin/nginx
ExecReload=/usr/local/nginx/sbin/nginx -s reload
ExecStop=/usr/local/nginx/sbin/nginx -s stop
PrivateTmp=true

[Install]
WantedBy=multi-user.target
```



### tomcat.service

>  先设置 setenv.sh

1. setenv.sh

```sh

#如果服务器有多个jdk版本，需要指定使用的是哪个；只有一个的话，可以注释掉
JAVA_HOME=/usr/local/westar/env/jdk1.8.0_251
#add tomcat pid
CATALINA_PID="$CATALINA_BASE/tomcat.pid"
#add java opts
#JAVA_OPTS="-server -XX:PermSize=256M -XX:MaxPermSize=1024m -Xms1024M -Xmx1024M -XX:MaxNewSize=256m"
JAVA_OPTS="-Djava.awt.headless=true -Dfile.encoding=UTF-8 -server -Xms1024m -Xmx1024m -XX:NewSize=512m -XX:MaxNewSize=256m -XX:PermSize=512m -XX:MaxPermSize=512m"

```

2. tomcat.service

```sh
[Unit]
Description=Tomcat
After=network.target

[Service]
Type=forking
PIDFile=/usr/local/westar/server/tomcat/98_standard_tomcat/pid
ExecStart=/usr/local/westar/server/tomcat/98_standard_tomcat/bin/catalina.sh start  
ExecReload=/usr/local/westar/server/tomcat/98_standard_tomcat/bin/catalina.sh restart 
ExecStop=/usr/local/westar/server/tomcat/98_standard_tomcat/bin/catalina.sh stop 
[Install]
WantedBy=multi-user.target
```

## ssh 

> ssh 连接慢

```sh
vim /etc/ssh/sshd_config

=>
useDNS yes
```


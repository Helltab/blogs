---
title: JDK
date: 2021-01-17
sidebar: 'auto'
categories:
 - linux
tags:
 - linux
 - jdk
---



## 卸载自带 jdk

```sh
rpm -qa|grep java
>>> 
java-1.8.0-openjdk-headless-1.8.0.275.b01-0.el7_9.x86_64
java-1.8.0-openjdk-1.8.0.275.b01-0.el7_9.x86_64

rpm -e --nodeps java-1.8.0-openjdk-headless-1.8.0.275.b01-0.el7_9.x86_64
rpm -e --nodeps java-1.8.0-openjdk-1.8.0.275.b01-0.el7_9.x86_64
```




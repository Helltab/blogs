---
title: jvm 性能检测 / 故障处理工具
date: 2021-01-05
sidebar: 'auto'
categories:
 - jvm
tags:
 - jvm
---


> jdk5 需要开启 -Dcom.sun.management.jmxremote

> -X: 非标准参数
>
> -XX: 不稳定参数

## jps

> 查看 java 运行线程
>
> jps [ options ] [ hostid ]

![image-20210102215743229](./imgs/image-20210102215743229.png)

## jstat

> 虚拟机统计信息监视工具
>
> jstat [ option vmid [interval[s|ms] [count]] ]

![image-20210102220215168](./imgs/image-20210102220215168.png)

## jinfo

> Java配置信息工具
>
> jinfo [ option ] pid

## jmap

> 命令用于生成堆转储快照
>
> jmap [ option ] vmid

![image-20210102223030415](./imgs/image-20210102223030415.png)

## jhat

> 虚拟机堆转储快照分析工具
>
> 用于分析上述生成的 bin 文件, 但是这个服务比较耗内存, 一般要在另外的服务器上面去进行分析

## jstack

> Java堆栈跟踪工具
>
> jstack [ option ] vmid

![image-20210102235301836](./imgs/image-20210102235301836.png)

## 其他

![image-20210102235346478](./imgs/image-20210102235346478.png)



![image-20210102235334532](./imgs/image-20210102235334532.png)

![image-20210102235355908](./imgs/image-20210102235355908.png)

![image-20210102235513908](./imgs/image-20210102235513908.png)

![image-20210102235536789](./imgs/image-20210102235536789.png)

![image-20210102235542485](./imgs/image-20210102235542485.png)

![image-20210102235553564](./imgs/image-20210102235553564.png)

![image-20210102235623668](./imgs/image-20210102235623668.png)

![image-20210102235628950](./imgs/image-20210102235628950.png)

![image-20210102235637989](./imgs/image-20210102235637989.png)
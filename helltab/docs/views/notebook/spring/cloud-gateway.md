---
title: Cloud-Gateway 统一网关配置
date: 2021-01-17
sidebar: 'auto'
categories:
 - spring-cloud
 - 网关
tags:
 - spring-cloud
 - gateway
---

## Eureka

> 结合 eureka 的服务发现, 可以更好的做网关的负载均衡

## 配置

```yml
server:
  port: 8080
eureka:
  client:
    serviceUrl:
      defaultZone: http://v10-host:8088/eureka/
spring:
  application:
    name: service-gateway
  profiles:
    include: middleware
  cloud:
    gateway:
      routes:
        - id: url-proxy-oauth2
          uri: lb://service-smart-sso
          predicates:
            - Path=/oauth2/**
          filters:
            # 去掉前缀 /oauth2
            - StripPrefix=1
            # 用户模块
        - id: proxy-os-user
          uri: lb://os-user
          predicates:
            - Path=/useros/**
          filters:
            # 去掉前缀 /useros
            - StripPrefix=1
```

#### Predicate

> datetime
>
> ```yaml
> # ZonedDateTime.now() 与这个属性做比较
> - After= 2018-12-30T23:59:59.789+08:00[Asia/Shanghai]
> - Before= 2018-12-30T23:59:59.789+08:00[Asia/Shanghai]
> - Between= 2018-12-30T23:59:59.789+08:00[Asia/Shanghai],2019-12-30T23:59:59.789+08:00[Asia/Shanghai]
> ```
>
> ```
> AfterRoutePredicateFactory
> BeforeRoutePredicateFactory
> BetweenRoutePredicateFactory
> ```

> cookie
>
> ```yml
> # 正则匹配 CookieRoutePredicateFactory
> - Cookie=sessionId, regx
> ```
>
> 

> header
>
> ```yml
> # 正则匹配 HeaderRoutePredicateFactory
> - Header=X-Request-Id, \d+
> ```

> host
>
> ```yml
> # 将匹配 www.somehost.org 和 sub.somehost.org HostRoutePredicateFactory
> - Host=**.somehost.org
> ```

> method
>
> ```yml
> # MethodRoutePredicateFactory
> - Method=GET, POST
> ```

> path
>
> ```yml
> # PathRoutePredicateFactory
> - Path=/foo/{segment}
> ```

> queryParam
>
> ```yml
> # 第一个是必须的参数名, 第二个是可选的正则参数值 QueryRoutePredicateFactory
> - Query=foo, ba.
> ```

> readBody
>
> ```yml
> # ReadBodyRoutePredicateFactory
> - ReadBody=
> ```

> remoteAddr
>
> ```yml
> # CIDR 表示法, /24 代表子网掩码 RemoteAddrRoutePredicateFactory
> - RemoteAddr=192.168.1.1/24
> ```

>weight: 路由权重
>
>```yml
># 多个同组的会根据权重分配 WeightRoutePredicateFactory
>- Weight=groupName, weightValue
>```

### 说明

> **Eureka**
>
> 配置 eureka, 便于之后的负载均衡

 ```yml
 eureka:
   client:
     serviceUrl:
       defaultZone: http://v10-host:8088/eureka/
 spring:
   application:
     name: api-gateway
 ```

> **Oauth2.0**
>
> 统一认证服务入口, 申请 token 和验证 token

```yml
spring:
  cloud:
    gateway:
      routes:
        - id: url-proxy-oauth2
          uri: lb://service-smart-sso
          predicates:
            - Path=/oauth2/**
          filters:
            # 去掉前缀 /oauth2
            - StripPrefix=1
```

> **用户模块**
>
> 用户管理的统一入口

```yml
- id: proxy-os-user
     uri: lb://os-user
     predicates:
       	- Path=/useros/**
     filters:
     	# 去掉前缀 /useros
      	- StripPrefix=1
```


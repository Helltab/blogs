---
title: springBoot
date: 2020-11-15 
sidebar: 'auto'
categories:
 - springBoot
tags:
 - springBoot
---



## redis

> todo: 添加默认操作工具方法类

```xml
<dependency>
    <groupId>org.springframework.session</groupId>
    <artifactId>spring-session-data-redis</artifactId>
</dependency>
 <dependency>
     <groupId>redis.clients</groupId>
     <artifactId>jedis</artifactId>
     <version>3.3.0</version>
</dependency>
```

```yml
spring:
  session:
    store-type: redis
  #redis
  redis:
    host: 192.168.2.10
    port: 6379
    password:
    #超时一定要大于0
    timeout: 3000
    pool:
      max-idle: 8
      min-idle: 0
      max-active: 8
      max-wait: -1
```

```java
@Autowired
private RedisTemplate redisTemplate;
```

## spring-session

> todo: 添加权限控制

```xml
 <!--redis--> 
<dependency>
     <groupId>org.springframework.session</groupId>
     <artifactId>spring-session-data-redis</artifactId>
</dependency>
 <!--jdbc-->
<dependency>
    <groupId>org.springframework.session</groupId>
    <artifactId>spring-session-jdbc</artifactId>
</dependency>
```

```yml
spring:
  datasource:
    url: jdbc:mysql://192.168.2.10:3306/website_db?useUnicode=true&characterEncoding=utf8
    username: root
    password: root
    driver-class-name: com.mysql.cj.jdbc.Driver
  session:
   	# jdbc 的配置
    store-type: jdbc
    jdbc:
      initialize-schema: always
    # redis 的配置
    store-type: redis
```

```java
@Autowired
private StringRedisTemplate redisTemplate;
```



## 注册自定义 interceptor

```java
//拦截登录失效的请求
public class RedisSessionInterceptor implements HandlerInterceptor {}

@Configuration
public class WebSecurityConfig implements WebMvcConfigurer {
    @Bean
    public RedisSessionInterceptor getSessionInterceptor() {
        return new RedisSessionInterceptor();
    }
    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        //所有已 api 开头的访问都要进入 RedisSessionInterceptor 拦截器进行登录验证，
        //并排除 login 接口(全路径)。必须写成链式，分别设置的话会创建多个拦截器。
        //必须写成 getSessionInterceptor()，否则 SessionInterceptor 中的 @Autowired 会无效
        registry.addInterceptor(getSessionInterceptor()).addPathPatterns("/api/**").excludePathPatterns("/api/user/login");
    }
}
```


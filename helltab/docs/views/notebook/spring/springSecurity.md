---
title: springSecurity
date: 2020-11-15 
sidebar: 'auto'
categories:
 - springSecurity
tags:
 - springSecurity
---

> pom.xml

```xml
<!--安全机制-->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-security</artifactId>
</dependency>
```

> 配置

```yml
  security:
    user:
      name: admin
      password: 1
```

> SecurityConfig.java

```java
@Configuration
public class SecurityConfig extends WebSecurityConfigurerAdapter {
    @Autowired
    VerifyCodeFilter verifyCodeFilter;

    @Bean
    public BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
```


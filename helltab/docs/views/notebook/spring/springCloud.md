---
title: springCloud
date: 2020-11-15 
sidebar: 'auto'
categories:
 - springCloud
tags:
 - springCloud
---



## 版本兼容

> [版本兼容查看](https://start.spring.io/actuator/info)

## Eureka

> 说明: Eureka是spring cloud中的一个负责服务注册与发现的组件。


#### pom.xml

> 注意: spring cloud 和 spring boot 的版本兼容问题

```xml
<parent>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-parent</artifactId>
    <version>2.3.5.RELEASE</version>
</parent>
<dependencyManagement>
    <dependencies>
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-dependencies</artifactId>
            <version>Hoxton.SR9</version>
            <type>pom</type>
            <scope>import</scope>
        </dependency>
    </dependencies>
</dependencyManagement>
<dependencies>
    <dependency>
        <groupId>org.springframework.cloud</groupId>
        <artifactId>spring-cloud-starter-netflix-eureka-server</artifactId>
        <version>2.1.0.RELEASE</version>
    </dependency>
</dependencies>
```

#### application.yml

> 客户端要有自己的名字

```yml
# 服务器端
server:
  port: 8761
eureka:
  instance:
    hostname: localhost
  client:
    registerWithEureka: false
    fetchRegistry: false
    serviceUrl:
      defaultZone: http://${eureka.instance.hostname}:${server.port}/eureka/
# 客户端
eureka:
  client:
    serviceUrl:
      defaultZone: http://localhost:8761/eureka/
server:
  port: 8762
spring:
  application:
    name: service-hi
      
```

#### 启动类

> 服务器端 @EnableEurekaServer



```java
@EnableEurekaServer
@SpringBootApplication
public class EurekaServerApplication {
	public static void main(String[] args) {
		SpringApplication.run(EurekaServerApplication.class, args);
	}
}

```

#### 客户端

> 客户端 @EnableEurekaClient 

```java
@EnableEurekaClient 
@SpringBootApplication
@RestController
public class ServiceHiApplication {
	public static void main(String[] args) {
		SpringApplication.run(EurekaServerApplication.class, args);
	}
    @RequestMapping("/hi")
    public String home(@RequestParam String name) {
        return "hi " + name + ",i am from port:" + port;
    }
}
```



## Ribbon + Feign

> Spring Cloud Ribbon是一个基于HTTP和TCP的客户端负载均衡工具，它基于Netflix Ribbon实现


```xml
 <dependency>
     <groupId>org.springframework.cloud</groupId>
     <artifactId>spring-cloud-starter-feign</artifactId>
     <version>1.4.0.RELEASE</version>
</dependency>
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-ribbon</artifactId>
    <version>1.4.0.RELEASE</version>
</dependency>
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-netflix-eureka-server</artifactId>
    <version>2.1.0.RELEASE</version>
</dependency>
```

#### application.yml

```yml
eureka:
  client:
    serviceUrl:
      defaultZone: http://localhost:8761/eureka/
server:
  port: 8764
spring:
  application:
    name: service-ribbon
```

#### 启动类

> Discovery @EnableDiscoveryClient
>
> Feign @EnableFeignClients

```java
@SpringBootApplication
@EnableDiscoveryClient
@RestController
@EnableFeignClients
public class ServiceRibbonApplication {
	public static void main(String[] args) {
		SpringApplication.run(ServiceRibbonApplication.class, args);
	}
	@Bean
	@LoadBalanced
	RestTemplate restTemplate() {
		return new RestTemplate();
	}
    
    @Autowired
    private RestTemplate restTemplate;
    @Autowired
    private SchedualServiceHi schedualServiceHi;
    
    // 这个使用的是 ribbon
    @RequestMapping("/test")
    public String test(@RequestParam String name) {
        return restTemplate.getForObject("http://service-hi/hi?name=" + name, String.class);
    }
    // 这个使用的是 feign
    @RequestMapping("/test1")
    public String test1(@RequestParam String name) {
        return schedualServiceHi.sayHiFromClientOne(name);
    }
}
```

#### service

> 接口

```java
@FeignClient(value = "service-hi")
public interface SchedualServiceHi {
    @RequestMapping(value = "/hi", method = RequestMethod.GET)
    String sayHiFromClientOne(@RequestParam(value = "name") String name);
}
```

## Zuul

> zuul 是 netflix 开源的一个 API Gateway 服务器, 本质上是一个 web servlet 应用

![img](https://images2015.cnblogs.com/blog/486074/201702/486074-20170220185335288-1703224333.png)

```xml
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-zuul</artifactId>
    <version>1.4.0.RELEASE</version>
</dependency>
```

#### application.yml

```yml
eureka:
  client:
    serviceUrl:
      defaultZone: http://localhost:8761/eureka/
server:
  port: 8769
spring:
  application:
    name: service-zuul
zuul:
  routes:
    api-a:
      path: /api-a/**
      serviceId: service-ribbon
    api-b:
      path: /api-b/**
      serviceId: service-feign
```

#### zullFilter

```java
@Component
public class MyFilter extends ZuulFilter{

    private static Logger log = LoggerFactory.getLogger(MyFilter.class);
    @Override
    public String filterType() {
        return "pre";
    }
    @Override
    public int filterOrder() {
        return 0;
    }
    @Override
    public boolean shouldFilter() {
        return true;
    }
    @Override
    public Object run() {
        RequestContext ctx = RequestContext.getCurrentContext();
        HttpServletRequest request = ctx.getRequest();
        log.info(String.format("%s >>> %s", request.getMethod(), request.getRequestURL().toString()));
        Object accessToken = request.getParameter("token");
        if(accessToken == null) {
            log.warn("token is empty");
            ctx.setSendZuulResponse(false);
            ctx.setResponseStatusCode(401);
            try {
                ctx.getResponse().getWriter().write("token is empty");
            }catch (Exception e){}

            return null;
        }
        log.info("ok");
        return null;
    }
}
```

#### 启动类

> @EnableZuulProxy

```java
@EnableZuulProxy
@EnableEurekaClient
@SpringBootApplication
public class ServiceZuulApplication {
	public static void main(String[] args) {
		SpringApplication.run(ServiceZuulApplication.class, args);
	}
}
```

## config 配置中心

```xml
<!--客户端-->
<dependency>
     <groupId>org.springframework.cloud</groupId>
     <artifactId>spring-cloud-starter-config</artifactId>
</dependency>
<!--服务端-->
 <dependency>
     <groupId>org.springframework.cloud</groupId>
     <artifactId>spring-cloud-config-server</artifactId>
</dependency>


```

#### server.yml

> native 方式: 类似这个 classpath:/configs, 好像有命名要求, classpath:/config 就不行

```properties
spring.application.name=config-server
server.port=8888
#spring.cloud.config.server.git.uri=https://github.com/forezp/SpringcloudConfig/
#spring.cloud.config.server.git.searchPaths=respo
#spring.cloud.config.server.git.username=
#spring.cloud.config.server.git.password=
#spring.cloud.config.label=master
spring.profiles.active=native
spring.cloud.config.server.native.searchLocations=classpath:/configs
eureka.client.serviceUrl.defaultZone=http://localhost:8761/eureka/
```

#### client.yml

> 注意 git 的 label 要对应
>
> 命名方式 {applicationName}-{profile}.properties 

```properties
spring.application.name=config-client
spring.cloud.config.label=master
spring.cloud.config.profile=dev
spring.cloud.config.uri=http://localhost:8888/
server.port=8881
```

### server.java

> EnableConfigServer

```java
@SpringBootApplication
@EnableEurekaClient
@EnableConfigServer
public class ConfigServerApplication {
    public static void main(String[] args) {
        SpringApplication.run(ConfigServerApplication.class, args);
    }
}
```

#### client.java

> @EnableEurekaClient
>
> http请求地址和资源文件映射如下:
> \* /{application}/{profile}[/{label}]
> \* /{application}-{profile}.yml
> \* /{label}/{application}-{profile}.yml
> \* /{application}-{profile}.properties
> \* /{label}/{application}-{profile}.properties

```java
@SpringBootApplication
@EnableEurekaClient
@RestController
public class ConfigClientApplication {

    public static void main(String[] args) {
        SpringApplication.run(ConfigClientApplication.class, args);
    }
    @Value("${foo}")
    String foo;
    @RequestMapping(value = "/hi")
    public String hi() {
        return foo;
    }
}
```

## 链路追踪

> 1. zipkin
> 2. sleuth + zipkin
> 3. sleuth + zipkin + mysql
> 4. sleuth + zipkin + rabbitMQ
> 5. sleuth + zipkin + rabbitMQ + es
> 6. sleuth + zipkin + rabbitMQ + mysql

##  hystrix + turbine



## gateway

```yml
server:
  port: 8080
eureka:
  client:
    serviceUrl:
      defaultZone: http://localhost:8088/eureka/
spring:
  application:
    name: api-gateway
  cloud:
    gateway:
      routes:
        - id: url-proxy-data
        	# 通过微服务名称调用
          uri: lb://service-data-center 
          predicates:
            - Path=/data/**
          filters:
            # 不需要拼接 /data
            - StripPrefix=1
```

> pom.xml *注意不能和 web 包同时存在*

```xml
<dependencies>
    <dependency>
        <groupId>org.springframework.cloud</groupId>
        <artifactId>spring-cloud-starter-gateway</artifactId>
    </dependency>
    <dependency>
        <groupId>org.springframework.cloud</groupId>
        <artifactId>spring-cloud-starter-loadbalancer</artifactId>
    </dependency>
    <dependency>
        <groupId>org.springframework.cloud</groupId>
        <artifactId>spring-cloud-starter-openfeign</artifactId>
    </dependency>
</dependencies>
```

## jwt

```xml
<dependency>
      <groupId>com.auth0</groupId>
      <artifactId>java-jwt</artifactId>
      <version>3.11.0</version>
</dependency>
```




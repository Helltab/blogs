---
title: Oauth2.0 的认证和授权
date: 2020-11-15 
sidebar: 'auto'
categories:
 - spring
 - oauth2.0
tags:
 - spring
 - oauth2.0
---


> oauth2.0 配合 spring-security 可以做分布式认证和授权
>
> 1. 认证中心服务
> 2. 若干资源服务

![QQ截图20201228095050](D:\Data\Git\notebook\spring\img\Oauth2.0 方案.png)

## 认证服务

> 依赖 pom.xml

```xml
<!--核心包, 包含 oauth2 和 spring-security-->
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-oauth2</artifactId>
</dependency>
<!--必须包含 web 模块-->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-web</artifactId>
</dependency>
<!--监控端点等-->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-actuator</artifactId>
</dependency>
<!--redis 存储-->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-data-redis</artifactId>
</dependency>
<!--jedis 连接池-->
<dependency>
    <groupId>redis.clients</groupId>
    <artifactId>jedis</artifactId>
    <version>3.3.0</version>
</dependency>
```

> 核心配置 application.yml

```yml
# 端点监控
management:
  endpoint:
    health:
      enabled: true
spring:
  session:
    store-type: redis
  #redis 集群配置
  redis:
  	password: 123456
    cluster:
      nodes: 192.168.1.196:7001,192.168.1.196:7002,192.168.1.196:7003,192.168.1.196:7004,192.168.1.196:7005,192.168.1.196:7006
    jedis:
      pool:
        max-idle: 8
```

> **授权服务器配置 OAuth2Config.java**
>
> 1. 继承自 AuthorizationServerConfigurerAdapter
> 2. 认证端点配置 AuthorizationServerEndpointsConfigurer
>    - 配置认证端点的用户信息, token 存储方式 以及认证管理器
> 3. 认证端点安全配置 AuthorizationServerSecurityConfigurer
>    - 一般来说应该放开 access_token check_tocken 的访问权限, 并允许表单认证
> 4. 客户端配置 ClientDetailsServiceConfigurer
>    - 对客户端进行配置, 只有符合要求的客户端能申请认证

```java
/**
 * 授权服务的配置
 */
@Configuration
@EnableAuthorizationServer
public class OAuth2Config extends AuthorizationServerConfigurerAdapter {

    /**
     * 配置密码方式
     */
    @Autowired
    public PasswordEncoder passwordEncoder;

    /**
     * 用户授权信息
     */
    @Autowired
    public UserDetailsService westarUserDetailsService;

    /**
     * 认证管理器
     */
    @Autowired
    private AuthenticationManager authenticationManager;

    /**
     * 存储方式 redis
     */
    @Autowired
    private TokenStore redisTokenStore;


    /**
     * 认证端点配置
     *
     * @param endpoints
     * @throws Exception
     */
    @Override
    public void configure
        (final AuthorizationServerEndpointsConfigurer endpoints) throws Exception {
        /**
         * redis token 方式
         */
        endpoints.authenticationManager(authenticationManager) // 认证管理器
                .userDetailsService(westarUserDetailsService) // 用户信息
                .tokenStore(redisTokenStore); //令牌管理服务
    }

    /**
     * 认证端点安全约束
     *
     * @param security
     * @throws Exception
     */
    @Override
    public void configure
        (AuthorizationServerSecurityConfigurer security) throws Exception {
        security.allowFormAuthenticationForClients(); // 表单服务
        security.checkTokenAccess("permitAll()"); // 内网访问
        security.tokenKeyAccess("permitAll()"); // 内网访问
    }

    /**
     * 客户端详情服务
     *
     * @param clients
     * @throws Exception
     */
    @Override
    public void configure(ClientDetailsServiceConfigurer clients) throws Exception {
        clients.inMemory()// 内存存储
                .withClient("order-client") // 客户端
                .secret(passwordEncoder.encode("order-secret-8888"))
                .authorizedGrantTypes("refresh_token", "authorization_code", "password")
                .accessTokenValiditySeconds(3600)
                .resourceIds("sso-resource")
                .scopes("all")
                .and()
                .withClient("user-client")
                .secret(passwordEncoder.encode("user-secret-8888"))
                .resourceIds("sso-resource")
                .authorizedGrantTypes("refresh_token", "authorization_code", "password")
                .accessTokenValiditySeconds(3600)
                .scopes("all");
    }
}
```

> **redis 存储配置 RedisTokenStoreConfig.java**

```java
@Configuration
public class RedisTokenStoreConfig {

    @Bean
    public TokenStore redisTokenStore(RedisConnectionFactory factory) {
        return new RedisTokenStore(factory);
    }
}
```

> **WebSecurityConfig.java**

```java

@EnableWebSecurity
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    @Override
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }
}
```

## 资源服务

> **依赖 pom.xml**

```xml
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-oauth2</artifactId>
</dependency>
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-web</artifactId>
</dependency>
```

> **核心配置 application.yml**

```yml
resource:
  check-token: lb://sso/oauth/check_token
  client-id: user-client
  client-secret: user-secret-8888
eureka:
  client:
    serviceUrl:
      defaultZone: http://v10-host:8088/eureka/
```

> **资源访问配置 ResouceServerConfig.java**
>
>  -  认证 filter 
>     **org.springframework.security.oauth2.provider.authentication**
>     **.OAuth2AuthenticationProcessingFilter**
>
> 1. 继承 ResourceServerConfigurerAdapter
> 2. 配置远程 token 认证 tokenService
> 3. 配置资源安全 ResourceServerSecurityConfigurer
> 4. 配置安全约束 configure(HttpSecurity http)

```java

@Configuration
@EnableResourceServer
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class ResouceServerConfig extends ResourceServerConfigurerAdapter {
    public static final String RESOURCE_ID = "sso-resource";

     /**
     * 配置资源安全
     *
     * @param resources
     */
    @Override
    public void configure(ResourceServerSecurityConfigurer resources) {
        resources.resourceId(RESOURCE_ID).tokenServices(tokenService()).stateless(true);
    }

    @Override
    public void configure(HttpSecurity http) throws Exception {
        http.authorizeRequests()
                .antMatchers("/pass/**").authenticated()
                .and().csrf().disable()
            	.sessionManagement()
     			.sessionCreationPolicy(SessionCreationPolicy.STATELESS);
    }

    @Bean
    public ResourceServerTokenServices tokenService() {
        //使用远程服务请求授权服务器校验token,必须指定校验token 的url、client_id，client_secret
        RemoteTokenServices service = new RemoteTokenServices();
        service.setCheckTokenEndpointUrl("http://localhost:8882/oauth/check_token");
        service.setClientId("user-client");
        service.setClientSecret("user-secret-8888");
        return service;
    }
}
```


---
title: Cloud-Datasource 数据源配置
date: 2021-01-17
sidebar: 'auto'
categories:
 - spring-cloud
 - 数据源
tags:
 - spring-cloud
---

## 数据源以及连接池

> pom.xml

```xml
<dependency>
       <groupId>mysql</groupId>
       <artifactId>mysql-connector-java</artifactId>
       <scope>runtime</scope>
</dependency>
 <dependency>
     <groupId>com.alibaba</groupId>
     <artifactId>druid-spring-boot-starter</artifactId>
     <version>1.2.4</version>
</dependency>
```

> application.yml

```yml
spring:
  application:
    name: service-data-center
  datasource:
    type: com.alibaba.druid.pool.DruidDataSource
    driver-class-name: com.mysql.cj.jdbc.Driver
    platform: mysql
    url: jdbc:mysql://127.0.0.1:3306/sp_10_alpha?useUnicode=true&useJDBCCompliantTimezoneShift=true&useLegacyDatetimeCode=false&serverTimezone=UTC&verif
    username: root
    password: root
    druid:
      initialSize: 5
      minIdle: 5
      maxActive: 20
      maxWait: 60000
      timeBetweenEvictionRunsMillis: 60000
      minEvictableIdleTimeMillis: 300000
      validationQuery: SELECT 1
      testWhileIdle: true
      testOnBorrow: false
      testOnReturn: false
      filters: stat,wall
```

> DruidConfig.java

```java
/**
 * 线程池监控信息查看配置
 */
@Configuration
public class DruidConfig {
    @Bean
    public ServletRegistrationBean druidServlet() { // 主要实现WEB监控的配置处理
        ServletRegistrationBean servletRegistrationBean = new ServletRegistrationBean(
            new StatViewServlet(), "/druid/*"); // 现在要进行druid监控的配置处理操作
        servletRegistrationBean.addInitParameter("allow", "127.0.0.1"); // 白名单
        // servletRegistrationBean.addInitParameter("deny", "192.168.1.200"); // 黑名单
        servletRegistrationBean.addInitParameter("loginUsername", "admin"); // 用户名
        servletRegistrationBean.addInitParameter("loginPassword", "admin"); // 密码
        servletRegistrationBean.addInitParameter("resetEnable", "false"); // 是否可以重置数据源
        return servletRegistrationBean;
    }

    @Bean
    public FilterRegistrationBean filterRegistrationBean() {
        FilterRegistrationBean filterRegistrationBean = new FilterRegistrationBean();
        filterRegistrationBean.setFilter(new WebStatFilter());
        filterRegistrationBean.addUrlPatterns("/*"); // 所有请求进行监控处理
        filterRegistrationBean.addInitParameter("exclusions", "*.js,*.gif,*.jpg,*.css,/druid/*");
        return filterRegistrationBean;
    }

    @Bean
    @ConfigurationProperties(prefix = "spring.datasource")
    public DataSource druidDataSource() {
        return new DruidDataSource();
    }
}
```

> 访问地址: http://127.0.0.1:${port}/druid

## mybatis plus

> pom.xml

```xml
<dependency>
    <groupId>com.baomidou</groupId>
    <artifactId>mybatis-plus-boot-starter</artifactId>
    <version>${mybatis.plus.version}</version>
</dependency>
```

> 配置: MybatisPlusConfig.java

```java
/**
 * 配置事务/mapper/分页
 */
@EnableTransactionManagement
@Configuration
@MapperScan({"com.westar.cloud.data_center.mapper.auto"})
public class MybatisPlusConfig {

    /**
     * 分页插件
     */
    @Bean
    public MybatisPlusInterceptor paginationInterceptor() {
        MybatisPlusInterceptor interceptor = new MybatisPlusInterceptor();
        interceptor.addInnerInterceptor(new PaginationInnerInterceptor(DbType.MYSQL));
        return interceptor;
    }
}
```

> controller/ service/ mapper 举例

```java
/**
 * controller
**/
@RestController
@RequestMapping("/userinfo")
public class UserinfoController {
    @Autowired
    private IUserinfoService userService;
}

/**
 * service interface
**/
@Transactional(rollbackFor = Exception.class)
public interface IUserinfoService extends IService<Userinfo> {
}

/**
 * service
**/
@Service
@Transactional
public class UserinfoServiceImpl extends ServiceImpl<UserinfoMapper, Userinfo> implements IUserinfoService {
    @Autowired(required = false)
    private UserinfoMapper userinfoMapper;
}

/**
 * mapper
**/
public interface UserinfoMapper extends BaseMapper<Userinfo> {
    public List<Userinfo> findAllUser();
}
```


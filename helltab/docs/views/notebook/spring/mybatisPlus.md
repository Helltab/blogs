---
title: MyBatis plus
date: 2020-11-15 
sidebar: 'auto'
categories:
 - spring
tags:
 - spring
 - MyBatis
---

> 依赖

```xml
 <properties>
     <java.version>1.8</java.version>
     <mybatis.plus.version>3.4.1</mybatis.plus.version>
</properties>

<dependencies>
    <dependency>
        <groupId>com.baomidou</groupId>
        <artifactId>mybatis-plus-boot-starter</artifactId>
        <version>${mybatis.plus.version}</version>
    </dependency>
    <dependency>
        <groupId>com.baomidou</groupId>
        <artifactId>mybatis-plus-generator</artifactId>
        <version>${mybatis.plus.version}</version>
    </dependency>
</dependencies>
```

> ### MybatisPlusConfig

```java
/**
 * 配置事务/mapper/分页
 */
@EnableTransactionManagement
@Configuration
@MapperScan({"com.westar.cloud.model.mapper.auto"})
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


---
title: MAVEN
date: 2021-01-17
sidebar: 'auto'
categories:
 - MAVEN
tags:
 - MAVEN
---  


## 解决每次编译都导致项目编译版本变为 1.5 的问题

> 在 settings.xml 中添加

```xml
    <profile>
      <id>jdk-1.8</id>
      <activation>
        <activeByDefault>true</activeByDefault>
        <jdk>1.8</jdk>
      </activation>
      <properties>
        <maven.compiler.source>1.8</maven.compiler.source>
        <maven.compiler.target>1.8</maven.compiler.target>
        <maven.compiler.compilerVersion>1.8</maven.compiler.compilerVersion>
      </properties>
    </profile>
```


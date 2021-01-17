---
title: IDEA 插件服务器搭建
date: 2020-06-01
sidebar: 'auto'
categories:
 - IDEA
tags:
 - IDEA 
 - plugins
---

## 准备

1. https 域名下的服务器
2. 能访问静态资源的 web 服务器, nginx or tomcat

## 目录构建

1. 在 web 服务器中新建目录 ideaPluginServer

2. 新建 plugins 目录, 将插件存放在此处

3. 新建 updatePlugins.xml

   ```xml
   <?xml version="1.0" encoding="UTF-8"?>
   <plugins>
     <plugin id="ideaPlug" url="https://dev-htb.westarsoft.com/plugins/ideaPlug3.0.1.zip" version="3.0.1">
   	  <idea-version since-build="146.0"/>
     </plugin>
   </plugins>
   ```

   > 注意点: `plugin` 中的 id 在本文件中唯一
   >
   >  url 必须是 https地址, 可访问到插件本身
   >
   > version 必须和插件自身的 `plugin.xml` 相同
   >
   > `idea-version `必须和插件自身的 `plugin.xml` 相同

## idea 配置
1. `ctrl+alt+S` 打开设置, 定位到插件选项
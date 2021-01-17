---
title: gcc 升级
date: 2020-09-08
sidebar: 'auto'
categories:
 - linux
tags:
 - linux
 - gcc 升级
---



## 下载资源包并安装升级 (不推荐)

> [ gcc-9.1.0.tar.gz](http://ftp.gnu.org/gnu/gcc/gcc-9.1.0/gcc-9.1.0.tar.gz)
>
> ```sh
> tar -zvxf gcc-6.1.0.tar.gz --directory=/usr/local/
> ```
>
> 

> /contrib/**download_prerequisites**
>
> ```
> gmp='gmp-6.1.0.tar.bz2'
> mpfr='mpfr-3.1.4.tar.bz2'
> mpc='mpc-1.0.3.tar.gz'
> isl='isl-0.18.tar.bz2'
> ```
>
> ​       gmp下载链接：http://ftp.gnu.org/pub/gnu/gmp/
>
> ​       mpfr下载链接：http://mirror.hust.edu.cn/gnu/mpfr/
>
> ​       mpc下载链接：http://ftp.gnu.org/gnu/mpc/
>
> ​       isl 下载链接：http://www.mirrorservice.org/sites/sourceware.org/pub/gcc/infrastructure/
>
> 根目录下 tar -xf  上面的包
>
>  tar -xf gmp-6.1.0.tar.bz2
>
>    tar -xf mpfr-3.1.4.tar.bz2
>
>    tar -xf mpc-1.0.3.tar.gz
>
>    tar -xf isl-0.16.1.tar.bz2 
>
> 根目录下 ln -sf 上面的包名为
>
>  tar -xf gmp-6.1.0.tar.bz2
>
>    tar -xf mpfr-3.1.4.tar.bz2
>
>    tar -xf mpc-1.0.3.tar.gz
>
>    tar -xf isl-0.16.1.tar.bz2 
>
> ```sh
>  mkdir build && cd build
>  ../configure -enable-checking=release -enable-languages=c,c++ -disable-multilib
>  make && make install
> ```
>

## 推荐以下方式

> 下载下面的安装包

```sh

centos-release-scl 
centos-release-scl-rh 

devtoolset-9-runtime  
devtoolset-9-libstdc++-devel
devtoolset-9-binutils
devtoolset-9-gcc
devtoolset-9-gcc-c++ 
```

### 激活

```sh
scl enable devtoolset-9 bash
```

> 把下面的脚本放入/etc/init.d目录下 并给文件加上执行权限，开机启动

```sh

#/bin/bash
source /opt/rh/devtoolset-9/enable

```


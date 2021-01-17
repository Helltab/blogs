---
title: linux oracle
date: 2020-11-20
sidebar: 'auto'
categories:
 - 数据库
 - oracle
tags:
 - database
 - oracle
---

## 1. 下载Oracle12c

进入[搜索下载需要的版本](https://edelivery.oracle.com/osdc/faces/Home.jspx)
## 2. 配置主机名和IP的映射

> vi /etc/hosts，添加配置项192.168.1.196 westar
## 3. Oracle安装的先决条件

> 参见[Oracle Database 12c Release 2 (12.2) Installation On Oracle Linux 6 (OL6) and 7 (OL7)](https://oracle-base.com/articles/12c/oracle-db-12cr2-installation-on-oracle-linux-6-and-7)

### 3.1手动设置

#### 3.1.1配置内核参数
```sh
vi /etc/sysctl.conf 
```

> 添加如下

```conf
fs.file-max = 6815744
kernel.sem = 250 32000 100 128
kernel.shmmni = 4096
kernel.shmall = 1073741824
kernel.shmmax = 4398046511104
kernel.panic_on_oops = 1
net.core.rmem_default = 262144
net.core.rmem_max = 4194304
net.core.wmem_default = 262144
net.core.wmem_max = 1048576
net.ipv4.conf.all.rp_filter = 2
net.ipv4.conf.default.rp_filter = 2
fs.aio-max-nr = 1048576
net.ipv4.ip_local_port_range = 9000 65500
```

> 运行 sysctl -p

#### 3.1.2限制oracle用户资源使用

> *vi /etc/security/limits.conf* 
>
> 添加如下

```conf
oracle   soft   nofile    1024
oracle   hard   nofile    65536
oracle   soft   nproc    16384
oracle   hard   nproc    16384
oracle   soft   stack    10240
oracle   hard   stack    32768
oracle   hard   memlock    134217728
oracle   soft   memlock    134217728
```

#### 3.1.3安装依赖软件包

```sh
yum install binutils -y
yum install compat-libcap1 -y
yum install compat-libstdc++-33 -y
yum install compat-libstdc++-33.i686 -y
yum install glibc -y
yum install glibc.i686 -y
yum install glibc-devel -y
yum install glibc-devel.i686 -y
yum install ksh -y
yum install libaio -y
yum install libaio.i686 -y
yum install libaio-devel -y
yum install libaio-devel.i686 -y
yum install libX11 -y
yum install libX11.i686 -y
yum install libXau -y
yum install libXau.i686 -y
yum install libXi -y
yum install libXi.i686 -y
yum install libXtst -y
yum install libXtst.i686 -y
yum install libgcc -y
yum install libgcc.i686 -y
yum install libstdc++ -y
yum install libstdc++.i686 -y
yum install libstdc++-devel -y
yum install libstdc++-devel.i686 -y
yum install libxcb -y
yum install libxcb.i686 -y
yum install make -y
yum install nfs-utils -y
yum install net-tools -y
yum install smartmontools -y
yum install sysstat -y
yum install unixODBC -y
yum install unixODBC-devel -y
```

#### 3.1.4创建新组和新用户

```sh
groupadd -g 54321 oinstall
groupadd -g 54322 dba
groupadd -g 54323 oper

useradd -u 54321 -g oinstall -G dba,oper oracle
```

### 3.2附加设置

#### 3.2.1为oracle用户设置密码

> passwd oracle

#### 3.2.2修改设置SELINUX

```sh
# 将 `SELINUX `修改为 permissive SELINUX=permissive 
vi /etc/selinux/config 

setenforce Permissive
```



#### 3.2.3确保禁用防火墙

```sh
systemctl stop firewalld
systemctl disable firewalld
```

#### 3.2.4创建Oracle安装目录

```sh
mkdir -p /usr/local/products/oracle12c
chown -R oracle:oinstall /usr/local
chmod -R 775 /usr/local/
```

#### 3.2.5配置Oracle环境变量并验证

```sh
su oracle

vi .bash_profile

export TMP=/tmp
export TMPDIR=$TMP
export ORACLE_HOSTNAME=solang
export ORACLE_UNQNAME=cdb1
export ORACLE_BASE=/usr/local/products
export ORACLE_HOME=$ORACLE_BASE/oracle12c
export ORACLE_SID=cdb1
export PATH=/usr/sbin:/usr/local/bin:$PATH
export PATH=$ORACLE_HOME/bin:$PATH
export LD_LIBRARY_PATH=$ORACLE_HOME/lib:/lib:/usr/lib
export CLASSPATH=$ORACLE_HOME/jlib:$ORACLE_HOME/rdbms/jlib

source .bash_profile 
echo $ORACLE_HOME
```

## 4. Oracle安装

### 4.1上传解压

```sh
unzip database.zip
```

### 4.2修改响应文件

> 此数据库安装响应文件db_install.rsp修改的地方，参见[Oracle Universal Installer (OUI) Silent Installations](https://oracle-base.com/articles/misc/oui-silent-installations)中12cR2进行设置

```sh
cd database/response/

vi db_install.rsp

oracle.install.option=INSTALL_DB_SWONLY
UNIX_GROUP_NAME=oinstall
INVENTORY_LOCATION=/usr/local/oraInventory
ORACLE_HOME=/usr/local/products/oracle12c
ORACLE_BASE=/usr/local/products
oracle.install.db.InstallEdition=EE
oracle.install.db.OSDBA_GROUP=dba
oracle.install.db.OSBACKUPDBA_GROUP=dba
oracle.install.db.OSDGDBA_GROUP=dba
oracle.install.db.OSKMDBA_GROUP=dba
oracle.install.db.OSRACDBA_GROUP=dba
```

### 4.3静默安装Oracle

> 静默安装参见[Oracle Universal Installer (OUI) Silent Installations](https://oracle-base.com/articles/misc/oui-silent-installations)，找到12cR2的安装方式进行安装

#### 4.3.1 命令行方式安装

```sh
cd ./database # 注意是解压后的目录
./runInstaller -ignoreSysPrereqs -ignorePrereq -waitforcompletion \
-showProgress -silent -responseFile /home/oracle/database/response/db_install.rsp \
oracle.install.option=INSTALL_DB_SWONLY \
UNIX_GROUP_NAME=oinstall \
INVENTORY_LOCATION=/usr/local/products/oracle12c/oraInventory \
ORACLE_HOME=/usr/local/products/oracle12c \
ORACLE_BASE=/usr/local/products \
oracle.install.db.InstallEdition=EE \
oracle.install.db.OSDBA_GROUP=dba \
oracle.install.db.OSBACKUPDBA_GROUP=dba \
oracle.install.db.OSDGDBA_GROUP=dba \
oracle.install.db.OSKMDBA_GROUP=dba \
oracle.install.db.OSRACDBA_GROUP=dba
```

#### 4.3.2 响应文件方式安装

```sh
cd ./database # 注意是解压后的目录

./runInstaller -ignoreSysPrereqs -ignorePrereq -waitforcompletion \
-showProgress -silent -responseFile /home/oracle/database/response/db_install.rsp

su

/usr/local/products/oracle12c/oraInventory/orainstRoot.sh
/usr/local/products/oracle12c/root.sh
```

## 5. 数据库创建

> 参见[Database Configuration Assistant (DBCA) : Creating Databases in Silent Mode](https://oracle-base.com/articles/misc/database-configuration-assistant-dbca-silent-mode)，使用数据库配置助手DBCA静默模式下创建数据库，具体设置参见[Database Configuration Assistant Command Reference for Silent Mode](https://docs.oracle.com/database/121/ADMIN/create.htm#ADMIN14032)

```sh
dbca -silent -createDatabase \
 -templateName /usr/local/westar/products/oracle12c/assistants/dbca/templates/General_Purpose.dbc \
 -gdbname orclpdb -sid orclpdb -responseFile /usr/local/westar/database/oracle/database/response/dbca.rsp \
 -characterSet AL32UTF8 \
 -sysPassword westar11 \
 -systemPassword westar11 \
 -createAsContainerDatabase true \
 -numberOfPDBs 1 \
 -pdbName pdb1 \
 -pdbAdminPassword OraPasswd1 \
 -automaticMemoryManagement false \
 -ignorePreReqs
```

## 6. 数据库监听配置

```sh
netca -silent -responseFile /home/oracle/database/response/netca.rsp

lsnrctl start
lsnrctl stop
```

## 7. 自动启动和关闭数据库

> 参见[Automating Database Startup and Shutdown](https://docs.oracle.com/en/database/oracle/oracle-database/12.2/unxar/stopping-and-starting-oracle-software.html#GUID-CA969105-B62B-4F5B-B35C-8FB64EC93FAA)，以`root`用户登录

```sh
vi /etc/oratab

# 最后一行，将N修改为Y
cdb1:/usr/local/products/oracle12c:Y

 vi /etc/init.d/dbora
 
 
#! /bin/sh
# description: Oracle auto start-stop script.
#
# Set ORA_HOME to be equivalent to the $ORACLE_HOME
# from which you wish to execute dbstart and dbshut;
#
# Set ORA_OWNER to the user id of the owner of the
# Oracle database in ORACLE_HOME.

ORA_HOME=/usr/local/products/oracle12c
ORA_OWNER=oracle

case "$1" in
'start') 
    # Start the Oracle databases:
    # The following command assumes that the oracle login
    # will not prompt the user for any values
    # Remove "&" if you don't want startup as a background process.
    su - $ORA_OWNER -c "$ORA_HOME/bin/dbstart $ORA_HOME" &
    touch /var/lock/subsys/dbora
    ;;

'stop')
    # Stop the Oracle databases:
    # The following command assumes that the oracle login
    # will not prompt the user for any values
    su - $ORA_OWNER -c "$ORA_HOME/bin/dbshut $ORA_HOME" &
    rm -f /var/lock/subsys/dbora
    ;;
esac

chgrp dba /etc/init.d/dbora
chmod 750 /etc/init.d/dbora


```


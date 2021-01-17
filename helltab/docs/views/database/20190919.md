---
title: oracle12 常用操作
date: 2019-09-19
sidebar: 'auto'
categories:
 - 数据库
tags:
 - oracle
 - 数据库
---

# oracle 12c 常用操作

## 恢复某操作的数据
```sql
1、select * from V$SQL where SQL_TEXT like '%update MAP_OPTCBL_POINT_70 set shape%'--查出你需要恢复的时间点
2、
create table t_table_recove --新的表
as select * from MAP_OPTCBL_POINT_70 --你误操作的表
as of timestamp to_timestamp('2013-09-23 11:38:46','yyyy-mm-dd hh24:mi:ss');--时间点
--得到你想要的数据
3、delete MAP_OPTCBL_POINT_70;--将原表的数据全部删除
4、insert into MAP_OPTCBL_POINT_70 select * from t_table_recove;--恢复数据

```

## 神命令
```sql
execute dbms_stats.delete_schema_stats('SP_93_ZIYANGXIAN');
```

## 数据库恢复
```sql
创建临时表空间
 CREATE TEMPORARY TABLESPACE DB_TEMP

         TEMPFILE 'D:appAdministratororadataNewDBDB_TEMP.DBF'

         SIZE 32M

         AUTOEXTEND ON

         NEXT 32M MASIZE UNLIMITED

         EXTENT MANAGEMENT LOCAL;

创建永久表空间
CREATE TABLESPACE %x%
LOGGING
DATAFILE 'E:\Program\Oracle\root\admin\orcl2018\dpdump\%x%.DBF'
SIZE 32M
AUTOEXTEND ON
NEXT 32M MAXSIZE UNLIMITED
EXTENT MANAGEMENT LOCAL;

impdp system/westar DIRECTORY=DATA_PUMP_DIR DUMPFILE=%x%.dmp;


Alter user user_name default tablespace user_temp;
--修改 user 默认表空间

Alter user user_name temporary tablespace user_temp;
--修改 user 临时表空间

-- 单表转移表空间
alter table tab_name move tablespace new_space; commit;
-- 用户 QSS下的所有表都转移至表空间new_space下,但是表user被移动到表空间new_space后，表user上的索引是不会自动转移到表空间new_space
select 'alter table'||table_name||'move tablespace data_spa;commit;' from dba_tables where owner='QSS';


-- 单表下的索引转移表空间，例如，user表上的索引idx_user
alter index idx_user rebuild tablespace new_space 

-- 用户 QSS下的所有索引都转移至表空间new_space下
select 'alter index'||index_name||'rebuild tablespace new_space;commit;' from dba_indexes where owner='QSS'



-- 修改表空间名字
ALTER TABLEspace SP_98_FUGUXIAN_190308 RENAME to SP_98_STANDARD
-- 脱机表空间
ALTER TABLESPACE SP_98_STANDARD OFFLINE;

alter tablespace SP_98_STANDARD rename DATAFILE 'E:\Programs\Oracle\oradata\orclpdb\SP_98_FUGUXIAN_190308.DBF' TO 'E:\Programs\Oracle\oradata\orclpdb\SP_98_STANDARD.DBF';
ALTER TABLESPACE SP_98_STANDARD ONLINE;
```


## 创建目录
```sql
alter pluggable database orclpdb open;
alter session set container=orclpdb;
altert seesion set current_schema=userName;
create or replace directory DIRECTORY_NAME as 'PATH';
>  DIRECTORY_NAME = dump_dir 
>  PATH = E:\app\westar\virtual\oradata\dump_dir
```


## 数据库工具操作
```sql
 oracleUtil
1. 确认数据库版本，选择对应的工具（11g 和 12c 差别在于默认数据库名字orcl 和 orclpdb）；
2. 创建好目录： dump_idr
3. 更改 create.sql 中 dmf 文件路径为安装路径
4. 运行 jar 文件即可
```

## 数据库建表工具操作
```sql
 autoTable
1. 在 setting.xml 中配置数据库信息
2. 运行 autoTable2.0.exe
3. 密码 wozuipang%hhmm% hhmm为当前时间的时分
4. 在显示的数据库右键，选择操作

```

## pdb 连不上
```batch
sqlplus 
system = westar
connect sys/westar as sysdba;
alter pluggable database orclpdb open;
alter session set container=orclpdb;
```


## 递归统计1年12个月的考勤
```java
sql.append("select m checkdate, regId, sum(checked) checked, sum(unChecked) unChecked");
sql.append("\n from(");
sql.append("\n     Select TO_CHAR(sysdate,'yyyy-')  || lpad(level, 2, 0)  m,  " + regId + " regId, 0 checked, 0 unChecked");
sql.append("\n     from dual ");
sql.append("\n     connect by level < 13 ");
sql.append("\n     UNION All ");
sql.append("\n     SELECT  SUBSTR(checkdate,0,7) m, regId");
sql.append("\n     , (nvl(sum(CASE WHEN AMINSTATE=0 THEN 0 ELSE 1 end), 0)+");
sql.append("\n     nvl(sum(CASE WHEN amoutstate=0 THEN 0 ELSE 1 end), 0)+");
sql.append("\n     nvl(sum(CASE WHEN pminstate=0 THEN 0 ELSE 1 end), 0)+");
sql.append("\n     nvl(sum(CASE WHEN pmoutstate=0 THEN 0 ELSE 1 end), 0)) checked");
sql.append("\n     , (nvl(sum(CASE WHEN AMINSTATE=0 THEN 1 ELSE 0 end), 0)+");
sql.append("\n     nvl(sum(CASE WHEN amoutstate=0 THEN 1 ELSE 0 end), 0)+");
sql.append("\n     nvl(sum(CASE WHEN pminstate=0 THEN 1 ELSE 0 end), 0)+");
sql.append("\n     nvl(sum(CASE WHEN pmoutstate=0 THEN 1 ELSE 0 end), 0)) unChecked");
sql.append("\n     FROM (SELECT * FROM CHECKWORK WHERE regid=?)");
args.add(regId);
sql.append("\n     GROUP BY SUBSTR(CHECKDATE, 0, 7), regId)");
sql.append("\n WHERE 1=1");
sql.append("\n and SUBSTR(m,0,4) = TO_CHAR(sysdate,'yyyy')");
sql.append("\n GROUP BY m, regId");
sql.append("\n ORDER BY m ");

```

## 触发器自启可插拔数据库
```sql
使用SYS用户创建如下触发器即可：
CREATE TRIGGER open_all_pdbs
    AFTER STARTUP
    ON DATABASE
BEGIN
    EXECUTE IMMEDIATE 'alter pluggable database all open';
END open_all_pdbs;
/

原文：https://blog.csdn.net/lichangzai/article/details/51023357 

```

### 自动备份
```batch
1. 新建脚本 autoOracleBak.bat，内容如下
@echo off 
echo ================================================ 
echo  Windows环境下Oracle数据库的自动备份脚本
echo  1. 使用当前日期命名备份文件。
echo ================================================
::以“YYYYMMDD”格式取出当前时间。
set BACKUPDATE=%date:~0,4%%date:~5,2%%date:~8,2%
::设置用户名、密码和要备份的数据库。
set USER=SP_98_FUGUXIAN
set PASSWORD=SP_98_FUGUXIAN
set DATABASE=ORCLPDB
expdp '%USER%/%PASSWORD%@127.0.0.1/%DATABASE%' directory=dump_dir dumpfile=data_%BACKUPDATE%.dmp
pause
exit
2. 在“任务计划程序” 中新建一个定时任务即可
```
### 删除oracle用户

```sql
 (无法删除当前已连接的用户)
select username, sid, serial# from v$session where username=''
alter system kill session'**,**';
drop user * cascade;
```
### 修改oracle用户密码永不过期
1、查看用户的proifle是哪个，一般是`default`：

    >sql>SELECT username,PROFILE FROM dba_users;

2、查看指定概要文件（如default）的密码有效期设置：

    sql>SELECT * FROM dba_profiles s WHERE s.profile='DEFAULT' AND resource_name='PASSWORD_LIFE_TIME';

3、将密码有效期由默认的180天修改成“无限制”：

    sql>ALTER PROFILE DEFAULT LIMIT PASSWORD_LIFE_TIME UNLIMITED;

    修改之后不需要重启动数据库，会立即生效。

4、修改后，还没有被提示ORA-28002警告的帐户不会再碰到同样的提示；

已经被提示的帐户必须再改一次密码，举例如下：

    $sqlplus / as sysdba

    sql> alter user smsc identified by <原来的密码> ----不用换新密码
### 排序
```sql
#按照拼音顺序:
ORDER BY nlssort(NAME, 'NLS_SORT=SCHINESE_PINYIN_M')
#按照部首顺序:
ORDER BY nlssort(NAME, 'NLS_SORT=SCHINESE_RADICAL_M')

#按照笔画顺序:
ORDER BY nlssort(NAME, 'NLS_SORT=SCHINESE_STROKE_M')
```

### 更改用户名及密码
```sql
SELECT USER#, name FROM USER$ WHERE name = 'SP_98_STANDARD'
UPDATE user$ SET name = 'SP_98_STANDARD' WHERE USER# = 117
alter system checkpoint;
alter system flush shared_pool;
ALTER USER SP_98_STANDARD IDENTIFIED BY "SP_98_STANDARD"; 
COMMIT;
```



### 测试


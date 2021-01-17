---
title: 汇编基础
date: 2020-08-12
sidebar: 'auto'
categories:
 - 编程语言
 - 汇编
tags:
 - 汇编
 - 语言
---

### 汇编命令

> DB: define byte 定义操作数占用字节
>
> DD:
>
> DW:
>
> RESB: reserve byte 预约字节
>
> TAB=4: 设置 tab 宽度
>
> 启动区: 每 512 字节为一个扇区; 第一个扇区为启动区, 扇区最后两个字节: 0x55 AA, 如果不是这个就不能启动
>
> IPL: initial program loader
>
> CMP: compare 比较
>
> JE: jump if equal 如果相等则跳转
>
> INT: interrupt, 后面添加数字可以调用 bios 里面对应的函数
>
> fin: final 结束
>
> HLT: halt 停止

### 寄存器

> AX: accumulator 累加寄存器
>
> CX: counter 计数寄存器
>
> DX: data 数据寄存器
>
> BX: base 基址寄存器
>
> SP: stack pointer 栈指针寄存器
>
> BP: base pointer 基址指针寄存器
>
> SI: source index 源变址寄存器
>
> DI: destination index 目标变址寄存器
>
> ​	`8位寄存器`
>
> ​	寄存器低位 AL CL DL BL
>
> ​	寄存器高位 AH CH DH BH
>
> ​	`32位寄存器`
>
> ​	EAX ECX EDX EBX ESP EBP ESI EDI
>
> ​	`段寄存器`
>
> ES—附加段寄存器（ extra segment）
> CS—代码段寄存器（ code segment）
> SS—栈段寄存器（ stack segment）
> DS—数据段寄存器（ data segment）
> FS—没有名称（ segment part2）
> GS—没有名称（ segment part3）
>
> CH、CL、DH、DL
>
> 柱面号、扇区号、磁头号、驱动器号




---
title: 字节码指令分类介绍
date: 2021-01-05
sidebar: 'auto'
categories:
 - jvm
tags:
 - jvm
 - 字节码
---

[点击查看虚拟机字节码指令表](class-code-instructions.html)

## 加载和存储指令

> load aload 
>
> push
>
>  const
>
>  ldc ldc_w ldc2_w

## 运算指令

> add sub mul div
>
>  rem 
>
> neg
>
>  and or xor
>
>  shl shr nshl nshr
>
> cmp

## 类型转换指令

> - 宽化类型转换 :
>   - int类型到long、float或者double类型
>   - long类型到float、double类型
>   - float类型到double类型
> - 窄化类型转换 :
>   - i2b、i2c、i2s、l2i、f2i、f2l、d2i、d2l和d2f

## 对象创建与访问指令

> 创建类实例的指令：new
>
> 创建数组的指令: newarray、anewarray、multianewarray
>
> 访问类字段（static字段，或者称为类变量）和实例字段（非static字段，或者称为实例变量）的指令：getfield、putfield、getstatic、putstatic
>
> 把一个数组元素加载到操作数栈的指令：baload、caload、saload、iaload、laload、faload、daload、aaload
>
> 将一个操作数栈的值储存到数组元素中的指令：bastore、castore、sastore、iastore、fastore、dastore、aastore
>
> 取数组长度的指令：arraylength
>
> 检查类实例类型的指令：instanceof、checkcast

## 操作数栈管理指令

> 将操作数栈的栈顶一个或两个元素出栈：pop、pop2
>
> 复制栈顶一个或两个数值并将复制值或双份的复制值重新压入栈顶：dup、dup2、dup_x1、dup2_x1、dup_x2、dup2_x2
>
> 将栈最顶端的两个数值互换：swap

## 控制转移指令

> 条件分支：ifeq、iflt、ifle、ifne、ifgt、ifge、ifnull、ifnonnull、if_icmpeq、if_icmpne、if_icmplt、if_icmpgt、if_icmple、if_icmpge、if_acmpeq和if_acmpne
>
> 复合条件分支：tableswitch、lookupswitch
>
> 无条件分支：goto、goto_w、jsr、jsr_w、ret

## 方法调用和返回指令

> invokevirtual指令：用于调用对象的实例方法，根据对象的实际类型进行分派（虚方法分派），这也是Java语言中最常见的方法分派方式。
>
> invokeinterface指令：用于调用接口方法，它会在运行时搜索一个实现了这个接口方法的对象，找出适合的方法进行调用。
>
> invokespecial指令：用于调用一些需要特殊处理的实例方法，包括实例初始化方法、私有方法和父类方法。
>
> invokestatic指令：用于调用类静态方法（static方法）
>
> invokedynamic指令：用于在运行时动态解析出调用点限定符所引用的方法。并执行该方法。前面四条调用指令的分派逻辑都固化在Java虚拟机内部，用户无法改变，而invokedynamic指令的分派逻辑是由用户所设定的引导方法决定的
>
> 方法返回指令
>
> - 根据返回值的类型区分的，包括ireturn（当返回值是boolean、byte、char、short和int类型时使用）、lreturn、freturn、dreturn和areturn
> - 另外还有一条return指令供声明为void的方法、实例初始化方法、类和接口的类初始化方法使用

## 异常处理指令

> 已经不用指令来处理了, 而是用异常表来完成

## 同步指令

> 方法级的同步是隐式的，无须通过字节码指令来控制
>
> monitorenter + monitorexit 对标记了 synchronized 的方法线程进行管程 (Monitor，更常见的是直接将它称为“锁”) 操作
>

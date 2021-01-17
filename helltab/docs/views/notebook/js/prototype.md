---
title: JS 原型链
date: 2020-10-19
sidebar: 'auto'
categories:
 - js
 - 编程语言
 - 位运算 
tags:
 - 算法
 - 位运算
 - js
---


## 函数

```js
function Animal() {
    this.legs
    this.eat = function() {} // 该方法会在每个示例的内存空间中
}
Animal.prototype.eat = function(){} // 该方法只有一份内存, 类似于 static
Object.prototype.eat = function(){} // 错误的设计, 不要修改 Object 的原型
function Bird() {
    
}

// 原型关系, 函数原型的构造函数指向自己
Animal.prototype.constructor === Animal // true

// 继承, 先把原型指向父类原型, 在修改构造函数为自身
Bird.prototype = Object.create(Animal.prototype)
Bird.prototype.constructor = Bird
```


## 对象

```js
// 创建一个对象
let duck  = new Bird()
// 对象和函数的关系
duck instanceof Bird // true
// 上述的关系, 根源在于 
duck.__proto__ = Bird.prototype
// 因此
duck.__proto__.constructor = Bird

// **注意** 
// 对象没有原型, 实际上是获取的函数的原型, 通过这个原型可以继承原型链上的属性和方法
duck.__proto__ === Object.prototypeOf(duck) // true
```

## 原型链

```js
// 祖宗? Object:...
function P() {
    this.f0 = 'constructor 里面的属性不会被继承';
    this.fun0 = function() {
        console.log("constructor 里面的方法不会被继承");
    }
}
P.prototype.pf0 = 'prototype 里面的属性才会被继承'
P.prototype.pfun0 = function() {
    console.log("prototype 里面的方法才会被继承");
}
function P1() {
    this.f1 = 1;
    this.fun1 = function() {}
}
P1.prototype = Object.create(P.prototype)
P1.prototype.constructor = P

function P2() {
    this.f2 = 2;
    this.fun2 = function() {}
}
P2.prototype = Object.create(P1.prototype)
P2.prototype.constructor = P1

function P3() {
    this.f3 = 3;
    this.fun3 = function() {}
}
P3.prototype = Object.create(P2.prototype)
P3.prototype.constructor = P2

function P4() {
    this.f4 = 4;
    this.fun4 = function() {}
}
P4.prototype = Object.create(P3.prototype)
P4.prototype.constructor = P3

function P5() {
    this.f5 = 5;
    this.fun5 = function() {}
}
P5.prototype = Object.create(P4.prototype)
P5.prototype.constructor = P5
function C() {
	this.cf0 = '1'
    this.cfun0 = function() {}
}
C.prototype = Object.create(P5.prototype)
C.prototype.constructor = C

var child = new C()
console.log(child.f0); // 未定义
console.log(child.fun0); // 未定义
console.log(child.pf0); // 有值
console.log(child.pfun0); // 有值

// 看看一共有多少属性, true: constructor 里面定义的; false: 通过原型链继承的
for (let pp in child) {
    // pf0 false/pfun0 false/cf0 true/cfun0 true
    console.log(pp, child.hasOwnProperty(pp)); 
}
```


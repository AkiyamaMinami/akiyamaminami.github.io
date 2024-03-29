---
title: this
sidebar: 'auto'
date: 2022-08-01
categories:
 - JavaScript
tags:
 - This
---

## 前言
在面向对象的语言中，this指向当前对象实例。<br/>
在JavaScript中，this关键字比较灵活，在不同的执行环境下指向的值是不一样的。this的机制在某种程度上很像动态作用域。

## this是什么？
this是函数被执行时产生的一个绑定，指向的值取决于**函数被调用的方式**。
1. 当前执行上下文的一个属性。
2. 作为函数执行，this的值 => 非严格模式下总是个对象、严格模式下undefined。
3. 作为对象的方法执行，this值指向该对象。
:::tip
**this**是**执行上下文**的一个属性，**执行上下文创建**的时候会确定this的指向。
:::
### 为什么要有this？
:::tip
优雅、准确的指向当前代码运行时所处的上下文。
:::
**优雅**：
```js
let longlonglonglonglonglongVariableName = {
    name: "mobs",
    func1() {
      return longlonglonglonglonglongVariableName.name;
    },
    func2() {
      // 即使对象名字修改了，func2内部代码依旧不用改。
      return this.name;
    }
}
console.log(longlonglonglonglonglongVariableName.func1());
console.log(longlonglonglonglonglongVariableName.func2());
```
**准确**：this的出现为了实现准确地指向（某个对象）而不会产生歧义。JavaScript万物皆对象，所以函数也有属性，函数执行阶段（即执行上下文）会确定this属性的值，此时this就是一个变量，储存着调用该函数的对象的值。
### 三类执行上下文
1. **全局执行上下文**
2. **函数执行上下文**
3. ~~eval执行上下文~~（也没咋用过，暂未了解(⊙o⊙)…）

[MDN - this](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/this)

## 全局执行上下文中的this
* this指向 => 非严格模式 ? window对象 : undefined
* this和作用域链的一个交点 => 作用域链的最底端包含了window对象 === 全局执行上下文中的this

## 函数执行上下文中的this

### 默认情况指向window
```js
function foo(){
  // log window
  console.log(this)
}
foo()
```
**setInterval、setTimeout**传入的回调函数，this也是指向window对象。

### 对象调用方法
使用对象来调用其内部的一个方法，方法（函数）的this是指向对象本身。
```js
var obj = {
  name : "mobs", 
  logThis: function(){
    console.log(this)
  }
}
// log obj
myObj.logThis()
```
**对象属性引用链中只有最顶层会影响调用位置**，this指向最靠近被调用函数的对象，离得远的不是。
```js
function func() {
  console.log(this.a);
}

var obj2 = {
  a: "a2",
  func: func
};

var obj1 = {
  a: "a1",
  obj2: obj2
};

// 此时的 this 指向 obj2 对象，因为obj2离得近！
// log a2
console.log(obj1.obj2.func())
```

### 显示指定（call、apply、bind）
JavaScript内置函数对象的三个原型方法call、apply、bind
第一个参数是一个对象，会把这个对象绑定到this，接着在函数调用的时候让this指向这个对象。
```js
var a = "mobs";

function func() {
    console.log(this.a);
}
var obj = {
    a:"hi"
};

// 在调用func的时候强制把this指向到obj上
// log hi
func.call(obj);
```
**使用bind可以修正SetTimeout和SetInterval的this指向~**

### 构造函数（new操作符指向）
new关键字构造一个新对象，构造函数中的this指向的就是新对象。
```js
function CreateObj(){
  this.name = "test"
}
var myObj = new CreateObj()
```
上述new创建对象myObj，JavaScript引擎做的事情：
* 创建一个空对象tempObj
* 执行CreateObj.call(tempObj) => 显示指定构造函数执行的时候this指向这个新对象
* CreateObj()执行，CreateObj函数执行上下文中的this就指向了tempObj
* return tempObj对象

## this的一些奇奇怪怪的点？

### 嵌套函数中的this不会从外层函数继承
this是没有词法作用域的限制的（更像是动态作用域决定），所以只关心**被谁**、**在哪里**调用，才会决定this的指向。
这跟变量是不同的，所以这就导致了嵌套函数中this并不会继承外层函数的this。<br/>
一些解决思路：
* 把this保存为一个that普通变量，利用变量的作用域机制让嵌套函数可以拿到外层函数的this。
* 继续使用this，把函数改为箭头函数，箭头函数没有自己的执行上下文，基于变量词法作用域机制，箭头函数中的this是读的外层函数的this。

### 函数的this会有默认指向全局对象window的问题
默认调用一个函数，其执行上下文的this默认指向全局对象window。一般情况，我们并不想
this默认指向全局的对象，这很有可能导致一些数据的污染，最好一般通过call的方式显示的
去调用函数。另外还可以设置JavaScript的**严格模式**解决，this的默认值是undefined。

## 总结
使用this的时候注意点：
1. 一般正常调用函数，严格模式this是undefined，非严格是全局对象window。
2. 函数作为对象的方法调用，this指向该对象。
3. new操作符构造的对象this指向该新对象。
4. 箭头函数没有自己的执行上下文，箭头函数中的this实际上是外层函数的this。
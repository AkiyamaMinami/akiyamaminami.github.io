---
title: V8引擎如何执行JavaScript代码的？
date: 2022-08-05
sidebar: 'auto'
categories:
 - Browser
tags:
 - 编译器
 - 解析器
 - AST
 - 机器码
---

## 前言
关于V8：
* Google Chrome浏览器、Node.js的一部分。
* 负责去解析执行JavaScript代码。

JavaScript自身是轻量级**解释型语言**。从技术层面看，现代浏览器引擎都采用了**即时编译**（Just-In-Time Compiling）技术让源码执行的更快。<br/>
机器无法直接理解我们所写的代码，所以执行代码之前，需要先把代码”**翻译（编译器、解释器）**“成机器能理解的机器语言。一般可以把语言分为两类：**编译型、解释型**。上面说的**即时编译**，意思是编译 + 解释的结合体。[MDN - JavaScript](https://developer.mozilla.org/zh-CN/docs/Learn/JavaScript/First_steps/What_is_JavaScript)
:::tip
一切都是为了执行效率
:::
### 为何采用先编译后解释执行的方案呢？
JavaScript每次执行都要去先编译再去执行，为什么不能像Java一样，一次编译成可执行文件，“随处”运行呢？这样不就不用每次执行都要走一遍编译流程了嘛？<br/>
问题点：
* 无法统一客户用的浏览器版本（Java执行文件我们是可以指定运行环境和版本的）。
* ECMAScript本身规范也不断的更新（JavaScript这种语言面对文本展示的场景，更新频率比Java快）。
* 各家浏览器厂商对于JavaScript语言特性支持度不统一。

面对这些情况下，如果让JavaScript编译成“可执行”文件，很有可能出现某些浏览器运行不了，某些语言特性失效。所以让JavaScript编译成可执行文件这种提案目前来说比较难推进。
[二进制AST提案](https://github.com/tc39/proposal-binary-ast)

## 编译器、解释器

### 编译型语言执行流程
编译过程：源代码 => 词法分析、语法分析 => 生成抽象语法树（AST） => 优化代码 => 生成**机器码**。<br/>
若编译成功，生成一个可执行文件，若编译发生错误，编译器会抛出异常，停止编译。
### 解释型语言执行流程
解释过程：源代码 => 词法分析、语法分析 => 生成抽象语法树（AST） => 生成**字节码** => 执行程序。

### 字节码和机器码
字节码介于AST和机器码中间。需要通过解释器转成机器码才能执行。
**字节码所占用的内存比机器码要小**。

## V8执行流程
V8执行过程中，**同时有用到编译器（TurboFan）和解释器（Ignition）**。
> TurboFan：涡轮增压发动机 => 负责加速、优化代码执行效率<br/>
Ignition：点火器 => 负责启动、负责执行代码

### 总览
源代码 => 词法分析、语法分析 => **生成抽象语法树（AST）、执行上下文** => 生成字节码 => 执行代码（执行的过程中不断优化）

### 生成抽象语法树（AST）、执行上下文
我们能够理解的是高级语言，对于编译器、解释器能理解的是AST。有点类似于浏览器的渲染引擎能理解HTML文件生成的DOM树。<br/>
AST是一种比较重要的数据结构，我们平时碰到的Babel（JS转码）、ESLint（检查JavaScript编写规范）都有涉及。<br/>
> Babel：ES6转ES5 => ES6源码转成AST => 转成ES5的AST => 生成JavaScript源码。<br/>
ESLint：源码转AST => 分析AST检查代码规范。

生成AST的两个阶段：
1. **词法分析（tokenize）**<br/>
将源码一行行拆解为一个个的token（在语法上不可再分、最小的单个字符或字符串）。
2. **解析（parse）**<br/>
将生成的token，依据语法规则生成AST。代码若有语法错误，在这一步会中止，抛出语法错误
。

生成AST后，继续生成**执行上下文**。

### 生成字节码
此时需要解释器（Ignition）根据AST去生成字节码，并且执行。
> 在过去，V8并没有字节码的引入，直接是AST转成机器码，机器码的执行效率是很高的。但是随着时代的变迁，移动端的发展，浏览器在手机上运行，手机本身内存会小，V8需要消耗很多内存去保存转换的机器码，为了解决这个内存占用的问题，V8重构引入字节码。

### 执行代码
解释器（Ignition）逐条执行字节码，执行过程中若发现热点代码（HotSpot、经常需要重复执行的代码），通过编译器（TurboFan）将热点代码的字节码编译为高效的机器码，当代码再次执行，直接执行机器码，提高效率。**~~所以说JavaScript代码越执行越久越快哈哈哈~~**。<br/>
这种字节码配合解释器和编译器的技术，称之为**即时编译（JIT）**。

## 我们自身如何去优化JavaScript执行效率
* 提升单次脚本执行速度，避免JavaScript霸占主线程很久，让页面能快速响应交互。
* 避免内联脚本，解析JavaScript的过程中，解析、编译也是会占用主线程的。
* 减少JavaScript文件大小，文件越小，提高下载速度，减少内存占用。
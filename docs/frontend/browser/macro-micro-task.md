---
title: 宏任务、微任务让消息队列更好的统筹页面？
categories:
 - Browser
tags:
 - Macro Task
 - Micro Task
date: 2022-08-24
sidebar: 'auto'
---

## 前言
浏览器应用领域愈发广泛，消息队列中的任务（粗时间粒度）无法胜任部分领域需求，由此衍生出“微任务”，**微任务可以在实时性和效率之间做一个权衡**。

## 宏任务
### **消息队列中的任务可以称之为宏任务。**
浏览器页面引入**消息队列 + 事件循环**机制，来协调任务有条不紊的在页面中执行。<br/>
渲染进程内部维护多个消息队列：
* **一般消息队列** => 维护浏览器的大部分任务：
  * 渲染任务：DOM解析、布局计算、绘制
  * 用户交互：鼠标点击、页面缩放
  * 执行JavaScript
  * 网络请求、文件读写事件的完成...more
* **延迟消息队列** => 维护setTimeout、setInterval...more

**事件循环**：主线程for循环不断从上述消息队列中取出任务并且执行。<br/>
消息队列中宏任务的执行流程：
1. 从多个消息队列中找出最早进入队列的任务（oldest Task）。
2. 循环系统记录任务开始执行的事件，同时把oldest Task设置为当前正在执行的任务。
3. 当任务执行完毕，删除当前正在执行的任务，且从对应消息队列中删除该oldest Task。
4. 统计任务执行完成的时长等信息。

### 宏任务为何无法满足时间精度高的场景？
页面渲染、各种IO完成时间、执行JavaScript、用户交互等任务随时都可能添加到消息队列中，并且是**系统进行操作添加的**，所以JavaScript代码无法准确的把任务添加到队列的指定位置，**无法确定消息队列中任务的位置，就很难控制任务开始的时间**。<br/>
场景：比如使用setTimeout设置一个回调任务，并且按照给定的时间延迟执行。
实际上并不一定能按照我们所想的去执行，我们用setTimeout设置回调的间隙，**消息队列就很有可能被系统插入很多系统及的任务，如果中间插入的任务执行过久，那么就会影响setTimeout这个宏任务的执行**。所以宏任务的时间粒度较大，执行的时间间隔无法精准控制。

## 微任务
实现**异步回调**的两种方式：
1. 把异步回调函数封装成宏任务，添加到消息队列尾部，当系统循环到该任务，执行该回调函数（setTimeout、XMLHttpRequest的回调函数就是这种实现方式）。
2. 执行时机在**主函数执行结束之后、当前宏任务结束之前**执行回调函数，这种就是微任务的体现形式。
### 是什么？
微任务：**一个需要异步执行的函数，执行时机在主函数执行结束之后、当前宏任务结束之前。**
### 执行机制
JavaScript脚本执行的时候，V8首先会其创建一个**全局执行上下文**，与此同时还会创建一个微任务队列，因为在当前宏任务执行的过程中，会产生多个微任务，需要微任务队列进行维护。微任务队列是V8引擎内部使用的，无法使用JavaScript直接访问。
**每个宏任务都会关联一个微任务队列。**<br/>
如何产生微任务？
* 使用[MutationObserver](https://developer.mozilla.org/zh-CN/docs/Web/API/MutationObserver)监控DOM节点，每当JavaScript修改DOM节点发生变化，就会产生DOM变化记录的微任务。
* 使用Promise，调用Promise.resolve() or Promise.reject()也会产生微任务。
产生的微任务都会被JavaScript引擎按照顺序保存到微任务队列中。

如何执行微任务？
* 一般情况下，当前宏任务中的JavaScript即将执行完毕（JavaScript引擎即将退出全局执行上下文并且清空调用栈），JavaScript引擎会检查全局执行上下文中的微任务队列，按照顺序执行微任务队列的任务。
* 若在执行微任务的过程中，产生新的微任务，同样会将其添加到微任务队列，V8引擎一直循环执行微任务队列中的任务，直至队列为空。
* 执行微任务的过程中产生的新的微任务不会推迟到下个宏任务中执行，而是继续在当前宏任务中执行。
### 关键点
* 微任务和宏任务是绑定的，每个宏任务执行会创建自己的微任务队列。
* 微任务的执行时长影响到当前宏任务的时间
* 宏任务中，分别创建一个用于回调的宏任务和微任务，微任务都是比宏任务早执行的。

## 需求：监听DOM变化
### 早期方案
轮询检测：使用setTimeout、setInterval定时检测DOM是否改变。<br/>
缺陷：时间间隔过长，DOM变化响应不及时；时间间隔过短，浪费性能检查DOM。

### [Mutation Event（已废弃）](https://developer.mozilla.org/en-US/docs/Web/API/MutationEvent)
Mutation Event采用观察者模式，DOM发生变化立刻触发事件，这种属于同步回调。<br/>
好处：解决了实时性的问题，一旦DOM变化，立刻调用JavaScript接口。<br/>
缺陷：每次DOM变化，渲染引擎调用JavaScript，产生性能开销。比如JavaScript创建多个DOM节点，会触发多次回调，每次回调都需要一定的执行事件，若此时浏览器正在执行动画效果，会造成动画卡顿。因此Mutation Event已经从标准事件中被删除了。

### MutationObserver
解决同步回调调用JavaScript产生的性能问题，DOM4开始推荐使用MutationObserver，
MutationObserver API可以监听DOM变化。<br/>
好处：**将响应函数修改为异步调用**，可以不用每次DOM变化触发异步回调，而是等多次DOM变化之后，最后在一次触发异步回调，并且还会使用数据结构记录期间所有DOM的变化，即使频繁操纵DOM，也不会影响性能。<br/>
异步调用 + 减少触发次数缓解了性能问题，那如何保持任务通知回调的及时性？<br/>
如果用setTimeout创建宏任务触发回调，实时性就不太理想，所以借助微任务，**每次DOM节点发生变化，渲染引擎将变化记录封装成微任务**，V8引擎按照顺序执行。
* 异步解决同步操作的性能问题。
* 微任务解决实时性的问题。
## 总结
* 异步回调的两种形式：宏任务、微任务。
* JavaScript无法掌控宏任务在消息队列中的位置，就无法掌控任务的实时性，由此创建微任务队列，在当前宏任务之下去执行，确保任务的实时性。
* 宏任务内部维护一个微任务队列用于维护产生的微任务。
* 当前宏任务执行结束之前，会去执行微任务队列中的任务。

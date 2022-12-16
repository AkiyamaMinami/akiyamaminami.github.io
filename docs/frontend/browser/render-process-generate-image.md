---
title: 渲染引擎如何生成一帧图像？
categories:
 - Browser
tags:
 - 帧
 - 帧率
 - 分层
 - 合成
 - CSS动画
date: 2022-12-05
sidebar: 'auto'
---

## 前言
渲染引擎生成图片 => 显示器承载浏览器显示画面。<br/>

## 显示器显示图像
### 如何显示？
显示器都有固定的**刷新频率**，一般都是60HZ（**每秒读取60张图片 - 读取源为显卡的前缓冲区**）。
### 显卡
显卡负责合成新图像 => 将图像保存到**后缓冲区** => 系统将前/后缓冲区互换（确保显示器读取到显卡最新合成的图像）
### 动画效果
滚动鼠标/缩放页面的时候，渲染引擎经过一系列[渲染流水线](./render-process.md)生成新图像，发送至显卡后缓冲区，若想要保持动画流畅，渲染引擎需要每秒生成60张图片发送给显卡后缓冲区。
### 帧
渲染流水线生成一个新图像为一帧
### 帧率
渲染流水线每秒生成了多少帧为帧率（一秒60帧 === 60HZ/60FPS）

## 分层合成机制
大多数的屏幕更新频率是60次/s，所以正常流畅的动画效果就需要渲染引擎每秒更新60张图像到显卡后缓冲区。渲染引擎在生成某些帧时间过久，就会让用户观察到卡顿效果。**Chrome对渲染方式进行了优化，最有效的策略就是引入了分层/合成机制。**
### 生成一张图像（帧）
有三种方式生成任意一帧：
* 重排（渲染流水线所有阶段均执行）：JS + CSSOM/DOM => 计算布局树（Layout）=> 绘制（Paint） => 渲染层合成
* 重绘（不影响几何位置，无须布局直接绘制）：JS + CSSOM/DOM => 绘制（Paint） => 渲染层合成
* 合成（无需布局、绘制）：JS + CSSOM/DOM => 渲染层合成
这三种方式渲染流水线过程是不同的，渲染路径越长，生成一张图片时间越久。
### 为何需要分层？
如果从布局树直接生成目标图片，那么每发生一次很小的变化都会发生重排/重绘。
### 分层 + 合成
* 分层：将图像素材分解为多个图层再去进行操作。
* 合成：将多个图层合并到一起。

Chrome渲染流水线生成布局树之后：
1. 开始分层，渲染引擎根据布局树特征将其转换为层树Layer Tree（后续流水线的基础结构）。
2. 层树中每个节点对应一个图层。
3. 基于层树的节点 + 绘制指令 => 生成绘制表。
4. 光栅：基于绘制表中的指令 => 生成图片 => 一个图层对应一张图像。
5. 合成线程：将上述的图片合成为“一张图片” => 发送至后缓冲区。（不影响主线程，这就是为何主线程卡住了，但CSS动画还能执行）
### 合成线程分块
合成线程将每个图层分割为固定大小的图块，优先绘制**靠近视口的图块**，提高页面显示速度。<br/>
但是有时候只绘制优先级最高的图块也会耗时很久（纹理上传：计算机内存上传到GPU比较慢），所以Chrome另外还有一个策略，首次合成图块使用低分辨率图片先去展示，合成器继续绘制正常分辨率图片，绘制完成把当前低分辨率内容替换掉，避免用户一开始啥也看不到。
## 利用分层优化代码
对某些元素：几何变换、透明度变换、缩放，如果使用JS实现，会影响整个渲染流水线。
### 优化
```css
.box {
will-change: opacity、transform、top、left、bottom、right;
}
```
这段代码提前告诉渲染引擎将对box元素进行几何变换和透明度变换，此时渲染引擎会将该元素单独实现一帧，等变化发生的时候，**渲染引擎通过合成线程直接去处理变化，这些变化不涉及主线程**，提高了渲染效率，这就是为什么CSS动画比JS动画高效的原因。
:::tip
涉及到可以使用合成线程来处理CSS特效或动画的情况，尽量使用will-change提前告知渲染引擎，让它为该元素准备独立的层。但也不要滥用，每当渲染引擎为一个元素准备一个独立层的时候，它占用的内存也会大大增加，因为从层树开始，后续每个阶段都会多一个层结构，这些都需要额外的内存。
:::
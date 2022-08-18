---
title: Chrome打开一个页面，为何启动多个进程？
categories:
 - Browser
tags:
 - 进程
 - 线程
date: 2022-08-17
sidebar: 'auto'
---

## 前言
打开一个Tab页，查看Chrome任务管理器：
![chrome进程](https://s2.loli.net/2022/08/17/lYfbdTNitexgnRQ.jpg)

## 进程和线程
进程：**是一个程序的运行实例（操作系统的层面）**。每当启动一个程序，操作系统为该程序分配一块内存，用于存放代码、运行时数据、一个执行任务的主线程。<br/>
线程：线程是由进程进行管理，负责处理任务，进程中使用**多线程**可以实现**并行处理**提高效率。<br/>
关键点：
1. **线程依附于进程**，进程中使用多线程提高运算效率。
2. 多线程之间是可以**共享进程中的数据**。
3. 进程中任意某个线程执行出错，会导致整个进程崩溃。
4. **进程之间互相隔离**。进程只能访问各自的数据，避免了进程之间互相影响，这样就避免了如果一个进程崩溃，不会影响其他进程。
5. 进程（浏览器程序）关闭后，操作系统会回收该进程的内存。
![进程和线程](https://s3.bmp.ovh/imgs/2022/08/18/f51ea1d9af411f9a.png)

## 单进程浏览器
浏览器所有功能模块都运行在一个进程中，包含页面线程、网络线程等等。
![单进程浏览器](https://s3.bmp.ovh/imgs/2022/08/18/f62a786a79630381.png)
### 缺陷

## 多进程浏览器

## 总结
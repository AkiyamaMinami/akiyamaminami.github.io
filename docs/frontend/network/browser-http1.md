---
title: HTTP/1
categories:
 - Network
tags:
 - HTTP/0.9
 - HTTP/1.x
date: 2022-11-14
sidebar: 'auto'
---

## 前言
浏览器/服务器之间的通信重要的网络通讯协议 => HTTP（超文本传输协议）。

## HTTP/0.9
早期需求 => 网络之间传递HTML超文本内容 => 所以诞生超文本传输协议。整体实现也相对简单，基于请求/响应模式，客户端请求、服务端返回数据。<br/>
具体流程：
* **HTTP基于TCP协议**，客户端基于IP、端口和服务器建立TCP连接（TCP三次握手）。
* 建立连接完毕 => 发送GET请求行信息（GET /index.html） => 获取index.html资源文件。
* 服务器接受请求信息 => 读取响应HTML文件 => 以ASCII字符流形式返回客户端。
* HTML文件数据流传输完毕 => 断开连接。
特点：
* 早期需求简单 => 用于传输体积很小的HTML文件。
* **只需一个请求行，无HTTP请求头、请求体**（一个请求行足以完整表达客户端需求）。
* 服务器无返回头信息，只需返回数据。（服务端无需告诉客户端太多信息）。
* 因为是HTML格式文件 => 返回的文件内容以ASCII字符流传输。

## HTTP/1.0
HTTP/0.9虽然简单，但是可以满足当时的需求了。时代在发展（1994年拨号上网、网景浏览器），万维网不局限在学术交流（用户更多？），万维网联盟（W3C）、HTTP-WG负责推进HTML、HTTP发展。浏览器不单单只有HTML文件了，出现了JavaScript、CSS、图片、音频、视频more...，所以需要解决一个新需求：**协议支持多种类型文件下载**，文件类型不局限于ASCII编码。

### 实现多类型文件下载
多类文件面对的问题：
1. 浏览器需要知道服务器返回的数据类型，由此针对不同数据类型进行处理。
2. 浏览器需要知道服务器返回的文件类型编码，才能正确的读取文件。
3. 浏览器需要知道服务器压缩方式，万维网支持的应用更多，单个文件的数据体量愈发庞大，服务器会对数据进行压缩传输。
4. 浏览器需要告知服务器需要哪种语言版本的数据，因为万维网是全球的。
:::tip
基于请求头、响应头进行协商，发起HTTP请求，请求头告知服务器期待返回的文件类型、文件压缩的方式、语言版本、文件编码类型。
:::
浏览器、服务器之间基于HTTP通信，HTTP/0.9在建立连接后，发送类似GET /index.html的简单请求，没有别的方式告诉服务器更多信息（文件编码、类型），相应的服务器也是直接把数据返回给浏览器，也没有别的方式告知浏览器返回的数据更多详细的信息。所以为了让**客户端、服务器通信承载更多信息**，HTTP/1.0引入**请求头、响应头**，以Key-Value形式保存，当发送HTTP请求时，带上请求头信息、服务器返回数据，先返回响应头信息。<br/>
请求头：
```json
// 期望服务器返回html类型文件
accept: text/html
// 期望服务器可以采用gzip/deflate/br其中的一种压缩方式
accept-encoding: gzip, deflate, br
// 期望服务器返回的文件编码是ISO-8859-1/UTF-8 
accept-Charset: ISO-8859-1,utf-8
// 期望页面的优先语言是中文
accept-language: zh-CN,zh
```
响应头：
```json
// 告知浏览器最终的压缩类型
content-encoding: br
// 返回html文件、文件的编码类型UTF-8
content-type: text/html; charset=UTF-8
```
### 特性
* 对多文件提供良好的支持。
* 引入状态码，通过响应行的方式告知浏览器。（有些请求服务器可能无法处理/出错）。
* 提供Cache机制，缓存已下载过的数据，减轻服务器压力。
* 支持服务器统计客户端基础信息（Windows、macOS的用户数量），在请求头中加入了用户代理的字段。

## HTTP/1.1
### 增加持久连接
HTTP/1.0每次通信都需要经历 => **建立TCP连接、传输HTTP、断开TCP**。当初通信文件比较小，页面引用资源也不多，所以这种传输方式没啥问题，后期浏览器普及，页面中图片文件很多（几百个引用文件），如果下载每个文件都经历上述的三个步骤，开销很大。<br/>
HTTP/1.1增加了持久连接解决问题，其特性：
* **一个TCP连接可以传输多个HTTP请求**。只要浏览器服务器没有明确断开连接，该TCP连接会**一直保持**。有效减少了TCP建立、断开的次数，减轻服务器压力，提升整个HTTP请求时长。
* HTTP/1.1默认开启持久连接（无需额外设置请求头实现持久连接），若不需要请求头加上Connection: close
* 浏览器对于同域下，默认允许同时建立6个TCP连接。
  
### 客户端Cookie、安全机制
HTTP/1.1引入了客户端Cookie机制和安全机制。

### 对动态生成的内容的支持
HTTP/1.0需要在响应头中设置完整的数据大小（Content-Length: 233），浏览器根据设置的数据大小来接收数据。时代在发展，很多页面的内容都是动态生成的，在传输数据之前并不知道最终的数据大小，这就导致了浏览器无法知道何时会接收完所有的文件数据。<br/>
HTTP/1.1引入Chunk transfer机制来解决，服务器将数据分割成若干个任意大小的数据块，每个数据块发送时会附上上个数据块的长度，**最后使用一个零长度的块作为发送数据完成的标志**，这样就提供了对动态内容的支持。

### 虚拟主机的支持
HTTP/1.0每个域名绑定唯一的IP地址。所以一个服务器只支持一个域名。虚拟主机的发展需要实现一台物理主机绑定多个虚拟主机，每个虚拟主机有自己单独的域名，但是都公用同一个IP。<br/>
HTTP/1.1的请求头中增加了Host字段表示当前的域名地址，服务器可以根据不同的Host值做不同的处理。

### HTTP管线化（已废弃）
持久连接的问题：需要等待前面的请求返回，才能进行下一次的请求，如果TCP通道某个请求未及时返回，就会造成后续请求阻塞（对头阻塞）。<br/>
HTTP/1.1提出管线化去解决队头阻塞 => 将多个HTTP请求批量打包提交给服务器，不够这种方式虽然实现批量发送请求，但是服务器依然需要根据请求顺序来回复浏览器的请求。FireFox、Chrome都做过管线化的试验，不过最终都放弃了管线化技术。

## 总结
* 最初需求简单，0.9足以支持通信。
* 万维网发展，核心需求多文件类型下载，1.0引入请求头、响应头支持，额外的提供Cache、用户代理、状态码等基础信息通信。
* 继续发展，1.1增加持久连接提升连接效率，降低服务器开销，~~管线化尝试~~，额外的引入Cookie、虚拟机、动态内容支持等特性。
---
title: 网络安全协议HTTPS
categories:
 - Network
tags:
 - 中间人攻击
 - 安全层
 - 对称、非对称加密
 - 数字证书
date: 2022-10-22
sidebar: 'auto'
---

## 前言
HTTP协议目的时传输超文本文件，最初没有很强的加密传输需求，所以**HTTP是明文传输数据的特性**。这会出现一个问题：HTTP传输的过程的每一层明文的数据很可能被窃取并且篡改，浏览器和服务器通信之间可能存在中间人，存在被攻击的风险（**中间人攻击**）。提交HTTP数据经过的链路 => TCP层 => 客户端电脑 => WiFi路由器 => 运营商 => 目标服务器。<br/>
被中间人攻击风险：
* 用户电脑安装了恶意软件；
* 用户连接恶意WiFi路由器；

这些情况都会面临发出的HTTP请求被恶意抓取、篡改。

## HTTP协议栈引入安全层
在HTTP和TCP之间新增一个安全层，所有的数据经过安全层会被加密、解密。HTTPS先和安全层通信，安全层再和TCP层通信。<br/>
安全层核心工作：
1. 对发起HTTP请求的数据进行加密；
2. 对接收到的HTTP的内容进行解密操作；
![HTTPS](https://s2.loli.net/2022/10/22/vwZQEzVDrPmFLK9.png)

### 对称加密
关键点 => **加密、解密都使用相同的密钥**。<br/>
两端加解密同一个文件，需要知道加解密方式和密钥。所以发送HTTPS数据之前，浏览器和服务器需要协商加密方式和密钥。<br/>
HTTPS建立安全连接过程（协商加解密方式、服务器和客户端同时决定密钥）：
1. 浏览器发送自身支持的加密方式列表（指浏览器所能支持的加密方式种类列表） + 随机数（client-random）
2. 服务器从加密方式列表中选取一种加密方式、生成一个随机数（service-random）返回给浏览器
3. 浏览器返回确认消息。
4. 服务器返回确认消息。
5. 两端使用相同的加密方式将client-random、service-random混合生成一个密钥master secret。此时有了密钥master secret、加密方式，两端可以进行加密通信了。

弊端：
* 传输加密方式列表、client-random、service-random的过程是明文的。
* 黑客也可以拿到协商的加密方式列表和双端的随机数。
* 利用随机数合成密钥的算法是公开的。
* 所以黑客也能劫持到数据进行破解生成密钥进行攻击。
![对称加密.png](https://s2.loli.net/2022/10/23/es38LqnIcuvDk6b.png)

### 非对称加密
对称加密只有一个密钥，**非对称加密算法有A、B两把密钥**：
* 如果用A密钥加密，只能用B解密。
* 如果用B密钥加密，只能用A解密。

在HTTPS中，服务器会将其中的一个密钥通过明文的形式发送给浏览器（**公钥**），服务器自己留下的那个密钥称为**私钥**：
1. 浏览器发送加密方式列表给服务器。
2. 服务器选择一个加密方式，返回公钥（用于浏览器加密） + 加密方式给浏览器。
3. 浏览器和服务器返回确认信息。
4. 浏览器发送HTTP数据，使用公钥进行加密。（黑客拿到公钥、数据无法破解）
5. 服务器接收数据使用私钥解密。

弊端：
* 非对称加密的效率太低，影响到加解密数据的速度，从而影响到用户打开页面的速度。
* 无法保证服务器发送给浏览器数据的安全。服务器端只能采用私钥来加密，私钥加密只有公钥能解密，公钥是能被劫持的，所以服务端发送的数据无法保证安全。
![非对称加密.png](https://s2.loli.net/2022/10/23/dMzJNHu8prqeclE.png)
### 对称加密 + 非对称加密
核心：**在传输数据阶段使用对称加密，对称加密的密钥采用非对称加密传输**。
1. 浏览器发送加密方式列表、非对称加密方式列表、随机数client-random给服务器；
2. 服务器保存随机数client-random，选择对称加密方式、非对称加密方式方式，生成随机数service-random，返回加密方式、service-random、公钥；
3. 浏览器保存公钥，使用client-random + service-random生成pre-master；再次利用公钥对pre-master进行加密（确保无法被截获）；返回给服务器；
4. 服务器使用私钥解密pre-master数据，返回浏览器确认消息。
5. 两端拥有共同的client-random、service-random、pre-master，然后服务器和浏览器会使用这三组数据生成对称密钥master secret，因为服务器和浏览器使用同一套方法来生成密钥，所以最终生成的密钥也是相同的。
6. 有了对称加密的密钥之后，开始传输数据。
![非对称、对称混合加密.png](https://s2.loli.net/2022/10/23/YDOmNfs5yrRqH3S.png)
### 数字证书
对称非对称混合加密很好的实现了数据的加密传输，但还是有漏洞，黑客劫持服务端IP替换成黑客的IP，当我们浏览器去访问官网，实际访问的是黑客的IP地址，黑客可以在自己的服务器上实现公钥、私钥。浏览器无法知道当前访问的服务器是否是恶意的。所以需要一种方式向浏览器证明当前服务器不是恶意的服务器。所以引入了数字证书的概念。<br/>
对于浏览器数字证书的作用：
* 通过数字证书向浏览器证明服务器的身份。
* 数字证书里面包含了服务器公钥。

核心：服务器不直接返回公钥给浏览器，而是返回了数字证书，公钥包含在数字证书中。浏览器端多了一个证书验证的操作，验证了证书之后，才继续后续流程。通过引入数字证书，实现了服务器的身份认证功能，这样即便黑客伪造了服务器，但是由于证书是没有办法伪造的，所以依然无法欺骗用户。
![混合加密数字证书.png](https://s2.loli.net/2022/10/23/I1oyWEqpLbHzwMY.png)

签发数字证书过程：CA使用Hash函数技术处理明文信息进行摘要，然后CA使用私钥对信息摘要进行加密，加密后的秘文就是数字证书。<br/>
浏览器验证数字证书：读取证书明文信息，使用相同Hash函数计算得到信息摘要A，再利用CA的公钥解密签名得到B，对比A和B，如果一致，则确认证书合法；<br/>
申请使用证书注意点：
* 申请数字证书是不需要提供私钥的，要**确保私钥永远只能由服务器掌握**。
* 数字证书最核心的是CA使用它的私钥生成的数字签名。
* 内置CA对应的证书称为根证书，根证书是最权威的机构，它们自己为自己签名，我们把这称为自签名证书。

## 总结
* 对称加密：双方各自一个随机数、协商的加密算法生成密钥进行沟通。
* 非对称加密：服务端提供加密方法，浏览器加密传送数据，服务器自己解密。
* 对称非对称混合：依旧采用对称加密传输数据，生成的密钥使用非对称加密。
* 数字证书实现了对服务器身份认证。
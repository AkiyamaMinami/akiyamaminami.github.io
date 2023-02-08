(window.webpackJsonp=window.webpackJsonp||[]).push([[26],{438:function(t,a,s){"use strict";s.r(a);var r=s(2),v=Object(r.a)({},(function(){var t=this,a=t._self._c;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("h2",{attrs:{id:"前言"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#前言"}},[t._v("#")]),t._v(" 前言")]),t._v(" "),a("p",[t._v("渲染引擎生成图片 => 显示器承载浏览器显示画面。"),a("br")]),t._v(" "),a("h2",{attrs:{id:"显示器显示图像"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#显示器显示图像"}},[t._v("#")]),t._v(" 显示器显示图像")]),t._v(" "),a("h3",{attrs:{id:"如何显示"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#如何显示"}},[t._v("#")]),t._v(" 如何显示？")]),t._v(" "),a("p",[t._v("显示器都有固定的"),a("strong",[t._v("刷新频率")]),t._v("，一般都是60HZ（"),a("strong",[t._v("每秒读取60张图片 - 读取源为显卡的前缓冲区")]),t._v("）。")]),t._v(" "),a("h3",{attrs:{id:"显卡"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#显卡"}},[t._v("#")]),t._v(" 显卡")]),t._v(" "),a("p",[t._v("显卡负责合成新图像 => 将图像保存到"),a("strong",[t._v("后缓冲区")]),t._v(" => 系统将前/后缓冲区互换（确保显示器读取到显卡最新合成的图像）")]),t._v(" "),a("h3",{attrs:{id:"动画效果"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#动画效果"}},[t._v("#")]),t._v(" 动画效果")]),t._v(" "),a("p",[t._v("滚动鼠标/缩放页面的时候，渲染引擎经过一系列"),a("RouterLink",{attrs:{to:"/frontend/browser/render-process.html"}},[t._v("渲染流水线")]),t._v("生成新图像，发送至显卡后缓冲区，若想要保持动画流畅，渲染引擎需要每秒生成60张图片发送给显卡后缓冲区。")],1),t._v(" "),a("h3",{attrs:{id:"帧"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#帧"}},[t._v("#")]),t._v(" 帧")]),t._v(" "),a("p",[t._v("渲染流水线生成一个新图像为一帧")]),t._v(" "),a("h3",{attrs:{id:"帧率"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#帧率"}},[t._v("#")]),t._v(" 帧率")]),t._v(" "),a("p",[t._v("渲染流水线每秒生成了多少帧为帧率（一秒60帧 === 60HZ/60FPS）")]),t._v(" "),a("h2",{attrs:{id:"分层合成机制"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#分层合成机制"}},[t._v("#")]),t._v(" 分层合成机制")]),t._v(" "),a("p",[t._v("大多数的屏幕更新频率是60次/s，所以正常流畅的动画效果就需要渲染引擎每秒更新60张图像到显卡后缓冲区。渲染引擎在生成某些帧时间过久，就会让用户观察到卡顿效果。"),a("strong",[t._v("Chrome对渲染方式进行了优化，最有效的策略就是引入了分层/合成机制。")])]),t._v(" "),a("h3",{attrs:{id:"生成一张图像-帧"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#生成一张图像-帧"}},[t._v("#")]),t._v(" 生成一张图像（帧）")]),t._v(" "),a("p",[t._v("有三种方式生成任意一帧：")]),t._v(" "),a("ul",[a("li",[t._v("重排（渲染流水线所有阶段均执行）：JS + CSSOM/DOM => 计算布局树（Layout）=> 绘制（Paint） => 渲染层合成")]),t._v(" "),a("li",[t._v("重绘（不影响几何位置，无须布局直接绘制）：JS + CSSOM/DOM => 绘制（Paint） => 渲染层合成")]),t._v(" "),a("li",[t._v("合成（无需布局、绘制）：JS + CSSOM/DOM => 渲染层合成\n这三种方式渲染流水线过程是不同的，渲染路径越长，生成一张图片时间越久。")])]),t._v(" "),a("h3",{attrs:{id:"为何需要分层"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#为何需要分层"}},[t._v("#")]),t._v(" 为何需要分层？")]),t._v(" "),a("p",[t._v("如果从布局树直接生成目标图片，那么每发生一次很小的变化都会发生重排/重绘。")]),t._v(" "),a("h3",{attrs:{id:"分层-合成"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#分层-合成"}},[t._v("#")]),t._v(" 分层 + 合成")]),t._v(" "),a("ul",[a("li",[t._v("分层：将图像素材分解为多个图层再去进行操作。")]),t._v(" "),a("li",[t._v("合成：将多个图层合并到一起。")])]),t._v(" "),a("p",[t._v("Chrome渲染流水线生成布局树之后：")]),t._v(" "),a("ol",[a("li",[t._v("开始分层，渲染引擎根据布局树特征将其转换为层树Layer Tree（后续流水线的基础结构）。")]),t._v(" "),a("li",[t._v("层树中每个节点对应一个图层。")]),t._v(" "),a("li",[t._v("基于层树的节点 + 绘制指令 => 生成绘制表。")]),t._v(" "),a("li",[t._v("光栅：基于绘制表中的指令 => 生成图片 => 一个图层对应一张图像。")]),t._v(" "),a("li",[t._v("合成线程：将上述的图片合成为“一张图片” => 发送至后缓冲区。（不影响主线程，这就是为何主线程卡住了，但CSS动画还能执行）")])]),t._v(" "),a("h3",{attrs:{id:"合成线程分块"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#合成线程分块"}},[t._v("#")]),t._v(" 合成线程分块")]),t._v(" "),a("p",[t._v("合成线程将每个图层分割为固定大小的图块，优先绘制"),a("strong",[t._v("靠近视口的图块")]),t._v("，提高页面显示速度。"),a("br"),t._v("\n但是有时候只绘制优先级最高的图块也会耗时很久（纹理上传：计算机内存上传到GPU比较慢），所以Chrome另外还有一个策略，首次合成图块使用低分辨率图片先去展示，合成器继续绘制正常分辨率图片，绘制完成把当前低分辨率内容替换掉，避免用户一开始啥也看不到。")]),t._v(" "),a("h2",{attrs:{id:"利用分层优化代码"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#利用分层优化代码"}},[t._v("#")]),t._v(" 利用分层优化代码")]),t._v(" "),a("p",[t._v("对某些元素：几何变换、透明度变换、缩放，如果使用JS实现，会影响整个渲染流水线。")]),t._v(" "),a("h3",{attrs:{id:"优化"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#优化"}},[t._v("#")]),t._v(" 优化")]),t._v(" "),a("div",{staticClass:"language-css line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-css"}},[a("code",[a("span",{pre:!0,attrs:{class:"token selector"}},[t._v(".box")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token property"}},[t._v("will-change")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" opacity、transform、top、left、bottom、right"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])]),t._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[t._v("1")]),a("br"),a("span",{staticClass:"line-number"},[t._v("2")]),a("br"),a("span",{staticClass:"line-number"},[t._v("3")]),a("br")])]),a("p",[t._v("这段代码提前告诉渲染引擎将对box元素进行几何变换和透明度变换，此时渲染引擎会将该元素单独实现一帧，等变化发生的时候，"),a("strong",[t._v("渲染引擎通过合成线程直接去处理变化，这些变化不涉及主线程")]),t._v("，提高了渲染效率，这就是为什么CSS动画比JS动画高效的原因。")]),t._v(" "),a("div",{staticClass:"custom-block tip"},[a("p",{staticClass:"title"}),a("p",[t._v("涉及到可以使用合成线程来处理CSS特效或动画的情况，尽量使用will-change提前告知渲染引擎，让它为该元素准备独立的层。但也不要滥用，每当渲染引擎为一个元素准备一个独立层的时候，它占用的内存也会大大增加，因为从层树开始，后续每个阶段都会多一个层结构，这些都需要额外的内存。")])])])}),[],!1,null,null,null);a.default=v.exports}}]);
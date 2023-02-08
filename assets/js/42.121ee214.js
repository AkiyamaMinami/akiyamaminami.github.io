(window.webpackJsonp=window.webpackJsonp||[]).push([[42],{454:function(s,t,a){"use strict";a.r(t);var n=a(2),r=Object(n.a)({},(function(){var s=this,t=s._self._c;return t("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[t("h2",{attrs:{id:"前言"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#前言"}},[s._v("#")]),s._v(" 前言")]),s._v(" "),t("p",[s._v("JavaScript存在"),t("strong",[s._v("变量提升")]),s._v("的特性，导致了很多缺陷。"),t("br"),s._v("\nES6引入"),t("strong",[s._v("块级作用域 + let、const")]),s._v("来避免这种设计缺陷。")]),s._v(" "),t("h2",{attrs:{id:"作用域"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#作用域"}},[s._v("#")]),s._v(" 作用域")]),s._v(" "),t("p",[t("strong",[s._v("作用域是变量和函数的可见区域，控制变量和函数的可见性和生命周期。")]),t("br"),s._v("\nES6之前：")]),s._v(" "),t("ul",[t("li",[s._v("全局作用域 => 全局作用域中的变量和函数在任何地方都能访问，生命周期跟随页面的生命周期。")]),s._v(" "),t("li",[s._v("函数作用域 => 函数内部的变量和函数只能在函数内部被访问，当函数执行结束，函数作用域会被销毁。"),t("br")])]),s._v(" "),t("p",[s._v("ES6之后：")]),s._v(" "),t("ul",[t("li",[s._v("全局作用域 => 同上")]),s._v(" "),t("li",[s._v("函数作用域 => 同上")]),s._v(" "),t("li",[s._v("块级作用域 => 一对大括号包裹的一段代码可以看作是一个块级作用域，块内定义的变量在外部不可访问。"),t("br"),s._v("\n块级作用域示例：")])]),s._v(" "),t("div",{staticClass:"language-js line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-js"}},[t("code",[t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// block")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n\n"),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// if")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("if")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("1")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n\n"),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// while")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("while")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("1")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n\n"),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// function")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("function")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("foo")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n\n"),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// for loop")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("for")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("let")]),s._v(" i "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("0")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v(" i "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("<")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("100")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v(" i"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("++")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br"),t("span",{staticClass:"line-number"},[s._v("3")]),t("br"),t("span",{staticClass:"line-number"},[s._v("4")]),t("br"),t("span",{staticClass:"line-number"},[s._v("5")]),t("br"),t("span",{staticClass:"line-number"},[s._v("6")]),t("br"),t("span",{staticClass:"line-number"},[s._v("7")]),t("br"),t("span",{staticClass:"line-number"},[s._v("8")]),t("br"),t("span",{staticClass:"line-number"},[s._v("9")]),t("br"),t("span",{staticClass:"line-number"},[s._v("10")]),t("br"),t("span",{staticClass:"line-number"},[s._v("11")]),t("br"),t("span",{staticClass:"line-number"},[s._v("12")]),t("br"),t("span",{staticClass:"line-number"},[s._v("13")]),t("br"),t("span",{staticClass:"line-number"},[s._v("14")]),t("br")])]),t("h2",{attrs:{id:"变量提升的缺陷"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#变量提升的缺陷"}},[s._v("#")]),s._v(" 变量提升的缺陷")]),s._v(" "),t("p",[s._v("JavaScript当初没有块级作用域，设计成把作用域内部的变量统一进行提升。"),t("br"),s._v("\n那为何要变量提升？")]),s._v(" "),t("ul",[t("li",[s._v("提高JavaScript执行性能。\nJavaScript执行前会先进行编译（编译只进行一次），编译期间进行变量提升。这样避免了执行代码的过程中多次重新解析变量or函数，变量和函数的代码一般是不会改变的，编译一次即可。有一种"),t("strong",[s._v("预编译")]),s._v("的感觉，让代码执行起来更快。")]),s._v(" "),t("li",[s._v("增强容错性。\n可以说是一把双刃剑，如果写代码出现了先使用后定义，代码依旧能正常执行。")])]),s._v(" "),t("h3",{attrs:{id:"缺陷"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#缺陷"}},[s._v("#")]),s._v(" 缺陷")]),s._v(" "),t("ol",[t("li",[s._v("变量容易被覆盖。变量提升会把变量的值赋值为"),t("strong",[s._v("undefined")]),s._v("。")]),s._v(" "),t("li",[s._v("变量无法销毁。")])]),s._v(" "),t("div",{staticClass:"language-js line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-js"}},[t("code",[t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("function")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("foo")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n  "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("for")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("var")]),s._v(" i "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("0")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v(" i "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("<")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("3")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v(" i"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("++")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n  "),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// for循环结束，i变量按道理应该被销毁了，但是仍然可以读取到。")]),s._v("\n  "),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// 原因：foo创建执行上下文的时候，i变量已经被提升，就算循环结束，i并不会被销毁。")]),s._v("\n  console"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("log")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("i"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v(" \n"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("foo")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br"),t("span",{staticClass:"line-number"},[s._v("3")]),t("br"),t("span",{staticClass:"line-number"},[s._v("4")]),t("br"),t("span",{staticClass:"line-number"},[s._v("5")]),t("br"),t("span",{staticClass:"line-number"},[s._v("6")]),t("br"),t("span",{staticClass:"line-number"},[s._v("7")]),t("br")])]),t("h2",{attrs:{id:"es6块级作用域"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#es6块级作用域"}},[s._v("#")]),s._v(" ES6块级作用域")]),s._v(" "),t("p",[s._v("使用let、const关键字，可以实现块级作用域。\nJavaScript在编译阶段：")]),s._v(" "),t("ul",[t("li",[s._v("var声明存放到变量环境中。")]),s._v(" "),t("li",[s._v("let、const声明存放到词法环境（栈）中，不会被提升到变量环境中。")]),s._v(" "),t("li",[s._v("词法环境内部"),t("strong",[s._v("维护一个小型栈结构")]),s._v("，栈底部是函数内部最外层的let变量，每当遇到一个新的块级作用域，压入栈内；每当块级作用域执行完毕，会从栈顶弹出。")]),s._v(" "),t("li",[s._v("变量查找过程：词法环境内部块级作用域栈顶 => 栈顶向下 => 变量环境（对象）。")])]),s._v(" "),t("h3",{attrs:{id:"暂时性死区"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#暂时性死区"}},[s._v("#")]),s._v(" 暂时性死区")]),s._v(" "),t("div",{staticClass:"language-js line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-js"}},[t("code",[t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("let")]),s._v(" name "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v("'mobs'")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n  "),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// Uncaught ReferenceError: Cannot access 'name' before initialization")]),s._v("\n  console"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("log")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("name"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" \n  "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("let")]),s._v(" name "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v("'mobs'")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br"),t("span",{staticClass:"line-number"},[s._v("3")]),t("br"),t("span",{staticClass:"line-number"},[s._v("4")]),t("br"),t("span",{staticClass:"line-number"},[s._v("5")]),t("br"),t("span",{staticClass:"line-number"},[s._v("6")]),t("br")])]),t("p",[s._v("在块级作用域中，从开头 ~ let name = 'mobs'代码之间会形成一个暂时性死区，如果在这中间去访问变量name，会报初始化之前不能访问name的错误。")]),s._v(" "),t("h2",{attrs:{id:"总结"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#总结"}},[s._v("#")]),s._v(" 总结")]),s._v(" "),t("ul",[t("li",[s._v("var和let定义的变量分别存在于变量环境和词法环境，互不影响，变量提升仍然有效产生变量环境。")]),s._v(" "),t("li",[s._v("词法环境内部通过"),t("strong",[s._v("栈")]),s._v("去维护let定义变量的块级作用域。")]),s._v(" "),t("li",[s._v("变量查找规则，先从词法环境栈顶向下寻找，继续到变量环境中查找。")])])])}),[],!1,null,null,null);t.default=r.exports}}]);
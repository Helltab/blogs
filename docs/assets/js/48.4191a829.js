(window.webpackJsonp=window.webpackJsonp||[]).push([[48],{522:function(s,n,a){"use strict";a.r(n);var t=a(5),e=Object(t.a)({},(function(){var s=this,n=s.$createElement,a=s._self._c||n;return a("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[a("blockquote",[a("p",[s._v("利用 nginx 的 stream 模块转发 mysql, mstsc, mq, 玄武短信等流"),a("br")])]),s._v(" "),a("h2",{attrs:{id:"windows-环境"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#windows-环境"}},[s._v("#")]),s._v(" windows 环境")]),s._v(" "),a("blockquote",[a("p",[s._v("版本 >= nginx-1.16.1, 暂时没测试更低版本"),a("br"),s._v("\nproxy_pass 不能为域名, 可以配置负载均衡"),a("br"),s._v("\n注意 stream 与 http 同级")])]),s._v(" "),a("div",{staticClass:"language-conf line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[s._v("stream {\n  server {\n     listen 8888;\n     proxy_pass xxx:3389;    \n  }\n}\nhttp {\n}\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br"),a("span",{staticClass:"line-number"},[s._v("6")]),a("br"),a("span",{staticClass:"line-number"},[s._v("7")]),a("br"),a("span",{staticClass:"line-number"},[s._v("8")]),a("br")])]),a("h2",{attrs:{id:"linux-环境"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#linux-环境"}},[s._v("#")]),s._v(" linux 环境")]),s._v(" "),a("blockquote",[a("p",[s._v("版本 >= 1.9.0\nlinux 下默认是不带这个模块的, 如果没有安装好, 需要指定 stream 模块")])]),s._v(" "),a("div",{staticClass:"language-bash line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[s._v("./configure --prefix"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v("/usr/local/nginx   --with-stream\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 编译安装")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("make")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("make")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("install")]),s._v("\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br")])]),a("blockquote",[a("p",[s._v("如果已经安装好了, 需要按下面步骤进行添加")])]),s._v(" "),a("div",{staticClass:"language-bash line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 进入源码目录")]),s._v("\n./configure --prefix"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v("/usr/local/nginx   --with-stream\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 一定不要执行 `make install`")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("make")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 备份原有执行文件")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("cp")]),s._v(" /usr/local/nginx/sbin/nginx /usr/local/nginx/sbin/nginx-no-strem\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 复制新编译的文件")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("cp")]),s._v(" ./objs/nginx /usr/local/nginx/sbin/nginx\n\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br"),a("span",{staticClass:"line-number"},[s._v("6")]),a("br"),a("span",{staticClass:"line-number"},[s._v("7")]),a("br"),a("span",{staticClass:"line-number"},[s._v("8")]),a("br"),a("span",{staticClass:"line-number"},[s._v("9")]),a("br")])]),a("h2",{attrs:{id:"mstsc-应用举例"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#mstsc-应用举例"}},[s._v("#")]),s._v(" mstsc 应用举例")]),s._v(" "),a("blockquote",[a("p",[s._v("场景: 有一台服务器 A 是互联网服务器, B C D E 分别是内网服务器"),a("br"),s._v("\n以前的远程方式: 1.向日葵, 2.teamViewer 3.意念...\n上述的远程方式都存在收费, 卡顿, 文件传输有障碍的问题, 因此可以通过 nginx 来组建远程访问")])]),s._v(" "),a("div",{staticClass:"language-markdown line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-markdown"}},[a("code",[a("span",{pre:!0,attrs:{class:"token list punctuation"}},[s._v("1.")]),s._v(" 先在 A 安装 nginx\n"),a("span",{pre:!0,attrs:{class:"token list punctuation"}},[s._v("2.")]),s._v(" 配置 stream 代理\nstream {\n  server {\n     listen 8881;\n     proxy_pass A:3389;    \n  }\n  server {\n     listen 8882;\n     proxy_pass B:3389;    \n  }\n  server {\n     listen 8883;\n     proxy_pass C:3389;    \n  }\n}\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br"),a("span",{staticClass:"line-number"},[s._v("6")]),a("br"),a("span",{staticClass:"line-number"},[s._v("7")]),a("br"),a("span",{staticClass:"line-number"},[s._v("8")]),a("br"),a("span",{staticClass:"line-number"},[s._v("9")]),a("br"),a("span",{staticClass:"line-number"},[s._v("10")]),a("br"),a("span",{staticClass:"line-number"},[s._v("11")]),a("br"),a("span",{staticClass:"line-number"},[s._v("12")]),a("br"),a("span",{staticClass:"line-number"},[s._v("13")]),a("br"),a("span",{staticClass:"line-number"},[s._v("14")]),a("br"),a("span",{staticClass:"line-number"},[s._v("15")]),a("br"),a("span",{staticClass:"line-number"},[s._v("16")]),a("br")])]),a("blockquote",[a("p",[s._v("这样就可以愉快的远程了")])]),s._v(" "),a("h2",{attrs:{id:"location"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#location"}},[s._v("#")]),s._v(" location")]),s._v(" "),a("blockquote",[a("p",[s._v("访问目录")])]),s._v(" "),a("div",{staticClass:"language-nginx line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-nginx"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("location")]),s._v("  "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("/")]),s._v("down "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("rewrite")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"^/down(.*)$"')]),s._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("/")]),s._v("$"),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("1")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("break")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("root")]),s._v("    html"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("/")]),s._v("tools"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("autoindex")]),s._v(" on"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("autoindex_exact_size")]),s._v(" off"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("autoindex_localtime")]),s._v(" on"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br"),a("span",{staticClass:"line-number"},[s._v("6")]),a("br"),a("span",{staticClass:"line-number"},[s._v("7")]),a("br")])])])}),[],!1,null,null,null);n.default=e.exports}}]);
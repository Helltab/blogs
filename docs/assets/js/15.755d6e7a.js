(window.webpackJsonp=window.webpackJsonp||[]).push([[15],{449:function(s,t,e){"use strict";e.r(t);var a=e(5),n=Object(a.a)({},(function(){var s=this,t=s.$createElement,e=s._self._c||t;return e("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[e("h2",{attrs:{id:"模板配置"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#模板配置"}},[s._v("#")]),s._v(" 模板配置")]),s._v(" "),e("h3",{attrs:{id:"lld-自动发现配置示例"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#lld-自动发现配置示例"}},[s._v("#")]),s._v(" LLD 自动发现配置示例:")]),s._v(" "),e("blockquote",[e("ol",[e("li",[s._v("文件系统: "),e("code",[s._v("vfs.fs.discovery")])]),s._v(" "),e("li",[s._v("网络端口:"),e("code",[s._v("net.if.discovery")])]),s._v(" "),e("li",[s._v("服务发现:"),e("code",[s._v("service.discovery")])])])]),s._v(" "),e("h3",{attrs:{id:"监控项"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#监控项"}},[s._v("#")]),s._v(" 监控项")]),s._v(" "),e("blockquote",[e("ol",[e("li",[s._v("内存:"),e("code",[s._v("vm.memory.size[total]")]),s._v(" "),e("code",[s._v("vm.memory.size[free]")])]),s._v(" "),e("li",[s._v("文件系统: "),e("code",[s._v("perf_counter[\\2\\16]")]),s._v(" "),e("code",[s._v("perf_counter[\\2\\18]")])])])]),s._v(" "),e("ol",{attrs:{start:"3"}},[e("li")]),s._v(" "),e("h2",{attrs:{id:"监控h3c路由器"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#监控h3c路由器"}},[s._v("#")]),s._v(" 监控h3c路由器")]),s._v(" "),e("ol",[e("li",[s._v("登录路由器终端, 开启snmp功能, 版本选择 all")])]),s._v(" "),e("blockquote",[e("p",[s._v("yum install netcat, 用这个命令来测试路由器161端口是否正常\nnc -u 192.168.1.251 161")])]),s._v(" "),e("ol",{attrs:{start:"2"}},[e("li",[s._v("在zabbix 服务器上安装 snmp 服务:")])]),s._v(" "),e("div",{staticClass:"language-SHELL line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-shell"}},[e("code",[s._v("yum "),e("span",{pre:!0,attrs:{class:"token function"}},[s._v("install")]),s._v(" net-snmp* -y\n"),e("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 安装好后, 编辑配置")]),s._v("\n    "),e("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# vim /etc/snmp/snmpd.conf")]),s._v("\n    view systemview included .1.3.6.1.2.1.25.1.1 //找到这行,增加下面配置\n    view systemview included .1 // 这个是新增加的\n    proc mountd // 找到这些配置，把注释去掉\n    proc ntalkd "),e("span",{pre:!0,attrs:{class:"token number"}},[s._v("4")]),s._v("\n    proc "),e("span",{pre:!0,attrs:{class:"token function"}},[s._v("sendmail")]),s._v(" "),e("span",{pre:!0,attrs:{class:"token number"}},[s._v("10")]),s._v(" "),e("span",{pre:!0,attrs:{class:"token number"}},[s._v("1")]),s._v("\n    disk / "),e("span",{pre:!0,attrs:{class:"token number"}},[s._v("10000")]),s._v("\n    load "),e("span",{pre:!0,attrs:{class:"token number"}},[s._v("12")]),s._v(" "),e("span",{pre:!0,attrs:{class:"token number"}},[s._v("14")]),s._v(" "),e("span",{pre:!0,attrs:{class:"token number"}},[s._v("14")]),s._v("\n"),e("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 然后启动服务:")]),s._v("\nsystemctl start snpmd\n"),e("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 最好设置为开机自启")]),s._v("\n")])]),s._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[s._v("1")]),e("br"),e("span",{staticClass:"line-number"},[s._v("2")]),e("br"),e("span",{staticClass:"line-number"},[s._v("3")]),e("br"),e("span",{staticClass:"line-number"},[s._v("4")]),e("br"),e("span",{staticClass:"line-number"},[s._v("5")]),e("br"),e("span",{staticClass:"line-number"},[s._v("6")]),e("br"),e("span",{staticClass:"line-number"},[s._v("7")]),e("br"),e("span",{staticClass:"line-number"},[s._v("8")]),e("br"),e("span",{staticClass:"line-number"},[s._v("9")]),e("br"),e("span",{staticClass:"line-number"},[s._v("10")]),e("br"),e("span",{staticClass:"line-number"},[s._v("11")]),e("br"),e("span",{staticClass:"line-number"},[s._v("12")]),e("br"),e("span",{staticClass:"line-number"},[s._v("13")]),e("br")])]),e("ol",{attrs:{start:"3"}},[e("li",[s._v("配置主机和监控项")])]),s._v(" "),e("blockquote",[e("p",[s._v("模板: 选择模板名称 Template Module Interfaces SNMPv2")])]),s._v(" "),e("blockquote",[e("p",[s._v("监控: 需要oid,目前网上找到可用的有两个:\ncpu: .1.3.6.1.4.1.25506.2.6.1.1.1.1.6.3\n内存: .1.3.6.1.4.1.25506.2.6.1.1.1.1.8.3")])])])}),[],!1,null,null,null);t.default=n.exports}}]);
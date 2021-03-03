(window.webpackJsonp=window.webpackJsonp||[]).push([[26],{499:function(s,n,a){"use strict";a.r(n);var t=a(5),e=Object(t.a)({},(function(){var s=this,n=s.$createElement,a=s._self._c||n;return a("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[a("blockquote",[a("p",[s._v("权限说明")])]),s._v(" "),a("div",{staticClass:"language-sh line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-sh"}},[a("code",[a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 1. 数据库用户角色：read、readWrite;  ")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 2. 数据库管理角色：dbAdmin、dbOwner、userAdmin；       ")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 3. 集群管理角色：clusterAdmin、clusterManager、clusterMonitor、hostManager；")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 4. 备份恢复角色：backup、restore；")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 5. 所有数据库角色：readAnyDatabase、readWriteAnyDatabase、userAdminAnyDatabase、dbAdminAnyDatabase")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 6.  超级用户角色：root  ")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 7.  这里还有几个角色间接或直接提供了系统超级用户的访问（dbOwner 、userAdmin、userAdminAnyDatabase）")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 8.  内部角色：**__system**")]),s._v("\n   "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(">")]),s._v("read:允许用户读取指定数据库\n   "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(">")]),s._v("readWrite:允许用户读写指定数据库\n   "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(">")]),s._v("dbAdmin：允许用户在指定数据库中执行管理函数，如索引创建、删除，查看统计或访问system.profile\n   "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(">")]),s._v("userAdmin：允许用户向system.users集合写入，可以找指定数据库里创建、删除和管理用户\n   "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(">")]),s._v("clusterAdmin：只在admin数据库中可用，赋予用户所有分片和复制集相关函数的管理权限。\n   "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(">")]),s._v("readAnyDatabase：只在admin数据库中可用，赋予用户所有数据库的读权限\n   "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(">")]),s._v("readWriteAnyDatabase：只在admin数据库中可用，赋予用户所有数据库的读写权限\n   "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(">")]),s._v("userAdminAnyDatabase：只在admin数据库中可用，赋予用户所有数据库的userAdmin权限\n   "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(">")]),s._v("dbAdminAnyDatabase：只在admin数据库中可用，赋予用户所有数据库的dbAdmin权限。\n   "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(">")]),s._v("root：只在admin数据库中可用。超级账号，超级权限\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br"),a("span",{staticClass:"line-number"},[s._v("6")]),a("br"),a("span",{staticClass:"line-number"},[s._v("7")]),a("br"),a("span",{staticClass:"line-number"},[s._v("8")]),a("br"),a("span",{staticClass:"line-number"},[s._v("9")]),a("br"),a("span",{staticClass:"line-number"},[s._v("10")]),a("br"),a("span",{staticClass:"line-number"},[s._v("11")]),a("br"),a("span",{staticClass:"line-number"},[s._v("12")]),a("br"),a("span",{staticClass:"line-number"},[s._v("13")]),a("br"),a("span",{staticClass:"line-number"},[s._v("14")]),a("br"),a("span",{staticClass:"line-number"},[s._v("15")]),a("br"),a("span",{staticClass:"line-number"},[s._v("16")]),a("br"),a("span",{staticClass:"line-number"},[s._v("17")]),a("br"),a("span",{staticClass:"line-number"},[s._v("18")]),a("br")])]),a("blockquote",[a("p",[a("strong",[s._v("创建 root 账号")])])]),s._v(" "),a("div",{staticClass:"language-bash line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[s._v("use admin\ndb.createUser"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("\n     "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n       user:"),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"myadmin"')]),s._v(",\n       pwd:"),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"secret"')]),s._v(",\n       roles:"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("role:"),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"root"')]),s._v(",db:"),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"admin"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),s._v("\n     "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n  \nshow "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("users")]),s._v("\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 验证用户")]),s._v("\nuse admin\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 有密码 show dbs 会报错")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 1 表示成功")]),s._v("\ndb.auth"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'myadmin'")]),s._v(", "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'secret'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br"),a("span",{staticClass:"line-number"},[s._v("6")]),a("br"),a("span",{staticClass:"line-number"},[s._v("7")]),a("br"),a("span",{staticClass:"line-number"},[s._v("8")]),a("br"),a("span",{staticClass:"line-number"},[s._v("9")]),a("br"),a("span",{staticClass:"line-number"},[s._v("10")]),a("br"),a("span",{staticClass:"line-number"},[s._v("11")]),a("br"),a("span",{staticClass:"line-number"},[s._v("12")]),a("br"),a("span",{staticClass:"line-number"},[s._v("13")]),a("br"),a("span",{staticClass:"line-number"},[s._v("14")]),a("br"),a("span",{staticClass:"line-number"},[s._v("15")]),a("br"),a("span",{staticClass:"line-number"},[s._v("16")]),a("br")])]),a("blockquote",[a("p",[a("strong",[s._v("创建数据库")])])]),s._v(" "),a("div",{staticClass:"language-bash line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 创建并切换")]),s._v("\nuse mydb\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 查看当前数据库")]),s._v("\ndb\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 查看所有, 新建的数据库因为没有数据, 这里是查不出来的")]),s._v("\nshow dbs\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 创建一个 collection, 并插入一些数据就能查出来了")]),s._v("\ndb.movie.insert"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"name"')]),a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v(":")]),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"加勒比海盗"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br"),a("span",{staticClass:"line-number"},[s._v("6")]),a("br"),a("span",{staticClass:"line-number"},[s._v("7")]),a("br"),a("span",{staticClass:"line-number"},[s._v("8")]),a("br")])]),a("blockquote",[a("p",[s._v("添加数据库管理用户")])]),s._v(" "),a("div",{staticClass:"language-bash line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 切换到目标数据库")]),s._v("\nuse mydb\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 创建用户")]),s._v("\ndb.createUser"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n    user: "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'test'")]),s._v(",\n    pwd: "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'test123'")]),s._v(",\n    roles: "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v(" role: "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"readWrite"')]),s._v(", db: "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"mydb"')]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n\nshow "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("users")]),s._v("\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br"),a("span",{staticClass:"line-number"},[s._v("6")]),a("br"),a("span",{staticClass:"line-number"},[s._v("7")]),a("br"),a("span",{staticClass:"line-number"},[s._v("8")]),a("br"),a("span",{staticClass:"line-number"},[s._v("9")]),a("br"),a("span",{staticClass:"line-number"},[s._v("10")]),a("br")])])])}),[],!1,null,null,null);n.default=e.exports}}]);
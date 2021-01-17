---
title: VUE 编码规范
date: 2020-03-24
sidebar: 'auto'
categories:
 - vue
 - js 框架
tags:
 - vue
---

## vue 编码规范

### api

> 1. 请求方式
>
>    | type   | desc     | notes  |
>    | ------ | -------- | ------ |
>    | get    | 查询请求 | 幂等性 |
>    | post   | 新增请求 |        |
>    | put    | 修改请求 | 幂等性 |
>    | delete | 删除请求 | 幂等性 |
>
>    
>
> 2. 参数
>
>    1. api 方法定义要写注释, 并注明参数名, 如下 
>
>       ```js
>       /**
>        * 获取事项详情
>        * @param data {id}
>        * @return {AxiosPromise}
>        */
>       export function getItem(data) {
>           return request({url: item.get_item, method: dict.API.METHOD.GET, params: data})
>       }
>       ```
>
>    2. 表单验证以及提交: **统一用 elementUI 的表单验证**
>
>       ```vue
>       <el-form :model="ruleForm" :rules="rules" ref="loginForm">
>           <el-form-item label="" prop="loginName" label-width="20px">
>               <el-input autocomplete="on" maxlength="32" 
>                         v-model="ruleForm.loginName" placeholder="用户名">
>               </el-input>
>           </el-form-item>
>       </el-form>
>       ```
>
>       ```vue
>       <script>
>           data: function () {
>               return {
>                   ruleForm: {
>                       loginName: 'test',
>                   },
>                   rules: {
>                       loginName: [
>                           { required: true, message: '请输入用户名', trigger: 'blur'}
>                       ]
>                   },
>               }
>           }
>           method: {
>               submit() {
>                   // 对表单进行验证
>                   this.$refs['loginForm'].validate((valid) => {
>                       if (valid) {
>                          // do something
>                       } else {
>                           this.$message.error("您有字段未填写正确")
>                       }
>                   })
>               }
>           }
>                 
>       </script>
>       
>       ```
>
>    3. 命名规则
>
>       ```js
>       function getParams() {} // 获取表单验证之外的参数(装配额外参数)
>       const enums: {} // select/checkBox/radio 所用到的候选项
>       
>       ```
>
>       
>
>    4. 


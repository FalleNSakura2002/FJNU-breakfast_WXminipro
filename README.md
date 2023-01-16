# 福师大早餐推荐系统

[![GitHub license](https://img.shields.io/github/license/WeixinCloud/wxcloudrun-express)](https://github.com/WeixinCloud/wxcloudrun-express)
![GitHub package.json dependency version (prod)](https://img.shields.io/github/package-json/dependency-version/WeixinCloud/wxcloudrun-express/express)
![GitHub package.json dependency version (prod)](https://img.shields.io/github/package-json/dependency-version/WeixinCloud/wxcloudrun-express/sequelize)

本项目基于微信云托管 Node.js Express 框架模版二次修改。主要用于实现福师大早餐推荐系统后台管理面板和小程序的相关请求。

## 项目结构说明

```
.
├── Dockerfile
├── README.md
├── container.config.json
├── db.js
├── index.js
├── index.html
├── package.json
```

- `index.js`：项目入口，实现主要的读写 API
- `db.js`：数据库相关实现，使用 `sequelize` 作为 ORM
- `index.html`：首页代码
- `store_login.html`：登录页面代码
- `store_register.html`：注册页面代码
- `store_register_err.ejs`：页面报错渲染模板
- `store_register_ok.ejs`：注册成功渲染模板
- `store_main.ejs`：后台管理页面渲染模板
- `package.json`：Node.js 项目定义文件
- `container.config.json`：模板部署「服务设置」初始化配置（二开请忽略）
- `Dockerfile`：容器配置文件

## 网页端管理系统 API 文档

### `POST /creat_dining`

用于初始化数据库餐厅基础信息的接口，每次上线服务必须调用

#### 请求参数

无

#### 响应结果

- `数据库默认值设定成功`：数据库初始化完成

### `POST /store_register_post`

用于注册餐厅的接口

#### 请求参数

- `email`：商家注册邮箱
- `pswd`：商家输入密码
- `pswd2`：商家第二次输入的密码
- `address_dining`：商家所属餐厅
- `Storename`：商家店铺名称

#### 响应结果

- `有注册信息为空！`：有输入框未输入值
- `输入密码不一致！`：两次输入密码不一致
- `注册账号已存在！`：用户输入的注册邮箱已存在
- `注册成功！`：注册成功

### `POST /store_login_post`

用于餐厅管理登录的接口

#### 请求参数

- `email`：商家注册邮箱
- `pswd`：商家输入密码

#### 响应结果

- `该账号未注册！`：输入账号不存在于数据库
- `输入密码错误！`：输入密码与数据库记录不一致
- `重定向至管理页面`：登录成功

### `POST /food_update`

用于餐厅上架食物的接口

#### 请求参数

- `Cookie.user_store_id`：商家店铺 id
- `foodname`：食物名称
- `foodseries`：食物菜系
- `option`：食物风味
- `foodtype`：食物类型
- `price`：食物价格

#### 响应结果

- `重定向至管理面板`：更新食物信息

### `POST /food_change`

用于餐厅更改食物信息的接口

#### 请求参数

- `Cookie.user_store_id`：商家店铺 id
- `change_foodid`：要更改的食物的 id
- `foodname`：食物名称
- `foodseries`：食物菜系
- `option`：食物风味
- `foodtype`：食物类型
- `price`：食物价格

#### 响应结果

- `重定向至管理面板`：更新食物信息

### `POST /food_delete`

用于餐厅下架食物的接口

#### 请求参数

- `Cookie.user_store_id`：商家店铺 id
- `change_foodid`：要删除的食物的 id

#### 响应结果

- `重定向至管理面板`：删除食物信息

### `POST /quit`

用于退出登录的接口

#### 请求参数

- `Cookie.user_store_id`：商家店铺 id

#### 响应结果

- `重定向至管理面板`：删除食物信息

## 小程序端 API 文档

## License

[MIT](./LICENSE)

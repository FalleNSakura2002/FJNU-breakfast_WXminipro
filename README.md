# 福师大早餐推荐系统

[![GitHub license](https://img.shields.io/github/license/WeixinCloud/wxcloudrun-express)](https://github.com/WeixinCloud/wxcloudrun-express)
![GitHub package.json dependency version (prod)](https://img.shields.io/github/package-json/dependency-version/WeixinCloud/wxcloudrun-express/express)
![GitHub package.json dependency version (prod)](https://img.shields.io/github/package-json/dependency-version/WeixinCloud/wxcloudrun-express/sequelize)
![GitHub package.json dependency version (prod)](https://img.shields.io/badge/ejs-%5E3.1.8-blue)
![GitHub package.json dependency version (prod)](https://img.shields.io/badge/cookie--parser-%5E1.4.6-blue)

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

### `POST /api/register`

用于跳转注册或更新个人数据接口

#### 请求参数

- `x-wx-openid`：微信 OpenID
- `user_name`：用户名
- `user_dgof_salt`：用户偏爱风味
- `user_series`：用户偏爱菜系
- `user_bedroom`：用户居住宿舍楼

#### 响应结果

- `注册成功`：用户首次登录，创建完成
- `更新完成`：用户非首次登录，更新完成
- `请先登录`：未获取到微信 OpenID

### `POST /api/user_login`

检测用户是否是第一次登录的接口

#### 请求参数

- `x-wx-openid`：微信 OpenID

#### 响应结果

- `用户未注册`：用户首次登录
- `用户已注册`：用户非首次登录

### `GET /api/get_userinfo`

获取个人爱好页面的数据的接口

#### 请求参数

- `x-wx-openid`：微信 OpenID

#### 响应结果

- `userinfo`：一个储存有个人信息的键值对

#### 结果字段

- `user_name`：用户昵称
- `user_dgof_salt`：用户偏好风味
- `user_series`：用户偏好菜系
- `user_bedroom`：用户居住宿舍

### `GET /api/myfavorite`

获取个人收藏菜品的数据

#### 请求参数

- `x-wx-openid`：微信 OpenID

#### 响应结果

- `favorite_food_alldata`：一个储存有收藏菜品信息的二维键值对

#### 结果说明

结果为一个二维数组，需要通过 favorite_food_alldata[j][i]来读取

favorite_food_alldata[0][i]

- `food_name`：食物名称
- `food_id`：食物 id
- `food_degree`：食物评分
- `food_price`：食物价格

favorite_food_alldata[1][i]

- `store_name`：商铺名称
- `dining_name`：餐厅名称

### `POST /api/rand_orders`

下单盲盒订单组与推荐订单组的数据接口

#### 请求参数

- `x-wx-openid`：微信 OpenID
- `foodid[i]`：下单的三个食物 id

#### 响应结果

- `下单完成`：结果记录成功

### `POST /api/orders`

下单单个食物的数据接口

#### 请求参数

- `x-wx-openid`：微信 OpenID
- `foodid`：下单的食物

#### 响应结果

- `下单完成`：结果记录成功

### `GET /api/orderhistory`

查询个人的过去五次历史订单

#### 请求参数

- `x-wx-openid`：微信 OpenID

#### 响应结果

- `order_fivedays`：一个记录用户数据的二维数组键值对

#### 结果说明

结果为一个二维数组

- `order_fivedays[i]`：查询第 i 天的记录(倒序)
- `order_fivedays[i][j]`：第 i 天的记录中的第 j 个菜品

结果字段有

- `order_date`：订单日期
- `food_name`：食物名称
- `food_id`：食物 id

### `POST /api/setdegree`

上传用户对某食品的打分的接口

#### 请求参数

- `x-wx-openid`：微信 OpenID
- `foodid`：被打分的食物的 id
- `fooddegree`：对该食物的打分(0-100)

#### 响应结果

- `评分完成`：用户首次打分
- `更新完成`：用户再次打分

### `GET /api/getuserdegree`

获取用户对某食物的打分的接口

#### 请求参数

- `x-wx-openid`：微信 OpenID
- `foodid`：被打分的食物的 id

#### 响应结果

- `没有记录`：用户从未打分
- `userdegree`：一个包含打分的键值对

#### 结果说明

- `user_degree` 获取该食物的分数

### `GET /api/setfooddegree`

更新某个食物的平均评分的接口

#### 请求参数

- `x-wx-openid`：微信 OpenID
- `foodid`：被打分的食物的 id

#### 响应结果

- `degree`：一个包含平均分的键值对

#### 结果说明

- `avg_degree`：食物的平均分

### `GET /api/get_store_dining`

获取某店铺对应的信息的接口

#### 请求参数

- `storeid`：要查询店铺的 id

#### 响应结果

- `storeinfo`：一个包含店铺信息的键值对

#### 结果说明

- `id`：店铺 id
- `store_name`：店铺名称
- `diningroom_id`：店铺所在的餐厅的 id
- `dining_name`：店铺所在的餐厅的名称

### `GET /api/get_blindbox`

一个用于获取盲盒与推荐菜单的接口

#### 请求参数

- `x-wx-openid`：微信 OpenID

#### 响应结果

- `food_relate_randlist`：一个包含二十道推荐菜品组合的二维数组

#### 结果说明

结果为二维数组，可以通过

- `food_relate_randlist[i]`来调用第 i 个菜品组合

在第二维度上：

- `food_relate_randlist[i][0]`：代表该组合所属店铺
- `food_relate_randlist[i][1]`：组合内主食的 id
- `food_relate_randlist[i][2]`：组合内主食的名称
- `food_relate_randlist[i][3]`：组合内主食的价格
- `food_relate_randlist[i][4]`：组合内副食的 id
- `food_relate_randlist[i][5]`：组合内副食的名称
- `food_relate_randlist[i][6]`：组合内副食的价格
- `food_relate_randlist[i][7]`：组合内饮品的 id
- `food_relate_randlist[i][8]`：组合内饮品的名称
- `food_relate_randlist[i][9]`：组合内饮品的价格
- `food_relate_randlist[i][10]`：组合的综合打分

### `GET /api/get_food_degree`

一个用于获取菜品评分的接口

#### 请求参数

- `foodid`：要查询评分的食物的 id

#### 响应结果

- `fooddegree`：一个包含食物评分的键值对

#### 结果说明

- `food_degree`：食物的评分

### `GET /api/getfoodprice`

用于请求食物价格的接口

#### 请求参数

- `foodid`：要查询评分的食物的 id

#### 响应结果

- `find_price`：一个包含食物价格的键值对

#### 结果说明

- `food_price`：食物的价格

## License

[MIT](./LICENSE)

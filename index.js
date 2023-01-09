//进行包的请求
const path = require("path");
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const { init: initDB, user_flavor } = require("./db");
const sd = require("silly-datetime");

const logger = morgan("tiny");

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.use(logger);

// 首页
app.get("/", async (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// 小程序调用，获取微信 Open ID
app.get("/api/wx_openid", async (req, res) => {
  if (req.headers["x-wx-source"]) {
    res.send(req.headers["x-wx-openid"]);
  }
});

// 根据微信OpenID返回个人信息数据
app.get("/api/get_userinfo", async (req, res) => {
  userid = req.headers["x-wx-openid"];
  const userinfo = await user_flavor.findAll({
    where: {
      user_id: userid,
    },
  });
  console.log(userinfo);
  res.send("微信id为" + userinfo[0].dataValues.user_name);
});

// 根据

//用于测试插入数据的方法
app.get("/api/adduser", async (req, res) => {
  await user_flavor.create();
  res.send("用户添加成功");
});

//用于进行小程序登录的后端代码，待补充
app.get("https://api.weixin.qq.com/sns/jscode2session", async (req, res) => {});

//请求时间
app.get("/api/gettime", async (req, res) => {
  var update = sd.format(new Date(), "YYYY-MM-DD");
  res.send(update);
});

const port = process.env.PORT || 80;

async function bootstrap() {
  await initDB();
  app.listen(port, () => {
    console.log("启动成功", port);
  });
}

bootstrap();

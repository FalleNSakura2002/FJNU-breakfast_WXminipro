const { Sequelize, DataTypes } = require("sequelize");

// 从环境变量中读取数据库配置
const { MYSQL_USERNAME, MYSQL_PASSWORD, MYSQL_ADDRESS = "" } = process.env;

const [host, port] = MYSQL_ADDRESS.split(":");

const sequelize = new Sequelize("nodejs_demo", MYSQL_USERNAME, MYSQL_PASSWORD, {
  host,
  port,
  dialect: "mysql" /* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */,
});

//定义用户爱好
const user_flavor = sequelize.define("user_flavor", {
  //记录用户的wxid
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
    primaryKey: true,
  },
  //记录用户自定义的昵称
  user_name: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "",
  },
  //记录用户的口味咸淡
  user_dgof_salt: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "",
  },
  //记录用户喜欢菜系的地域
  user_series: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "",
  },
});

// 定义菜品数据
const foodlist = sequelize.define("foodlist", {
  //利用默认生成的id作为主键
  //用于记录食物名称
  food_name: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "",
  },
  //用于记录食物菜系
  food_series: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "",
  },
  //用于记录食物咸淡
  food_dgof_salt: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "",
  },
  //用于记录食物为主食还是辅食
  food_type: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "",
  },
  //用于记录食物价格
  food_price: {
    type: DataTypes.FLOAT(10, 2),
    allowNull: false,
    defaultValue: 0,
  },
  //用于记录食物的好评率
  food_degree: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
});

// 定义商铺数据
const store = sequelize.define("store", {
  //利用默认生成的id作为主键
  //用于记录商铺名称
  store_name: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "",
  },
  //用于记录商铺所属餐厅的id
  diningroom_id: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "",
  },
});

//定义每个商铺含有菜品的数据
const store_foodlist = sequelize.define("store_foodlist", {
  //用于记录商铺的id
  store_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
    primaryKey: true,
  },
  //用于记录商铺上架的食物的id
  food_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
    primaryKey: true,
  },
});

//定义餐厅数据
const diningroom = sequelize.define("diningroom", {
  //利用默认生成的id作为主键
  //用于记录餐厅所属的位置
  address: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "",
  },
  //用于记录餐厅的名称
  dining_name: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "",
  },
});

//定义用户订单，
const order = sequelize.define("order", {
  //用于记录订单id，同一个id会被某一份订单内的多个食物使用
  order_onlyid: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  //用于记录用户的id
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  //用于记录用户购买的食物的id
  food_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  //用于记录用户下订单的日期
  order_date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  //用于记录用户对某一订单某一食物的评级
  user_degree: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
});

// 数据库初始化方法
async function init() {
  await foodlist.sync({ alter: true });
  await user_flavor.sync({ alter: true });
  await store.sync({ alter: true });
  await store_foodlist.sync({ alter: true });
  await diningroom.sync({ alter: true });
  await order.sync({ alter: true });
}

// 导出初始化方法和模型
module.exports = {
  init,
  foodlist,
  user_flavor,
  store,
  store_foodlist,
  diningroom,
  order,
};

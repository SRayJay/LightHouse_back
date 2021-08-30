const mongoose = require("mongoose");
const db = "mongodb://127.0.0.1:27017/LightHouse";

exports.connect = () => {
  // 连接数据库
  mongoose.connect(db, {
    // useCreateIndex: true,
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
    // useFindAndModify: false,
    autoIndex: false,
    // reconnectTries: Number.MAX_VALUE,
    // poolSize: 10,
    // reconnectInterval: 500,
    // useMongoClient: true,
  });
  let maxConnectTimes = 0;

  return new Promise((resolve, reject) => {
    // 连接成功操作
    mongoose.connection.once("open", () => {
      console.log("Mongodb 数据库连接成功.");
      resolve();
    });
    // 连接断开操作
    mongoose.connection.on("disconnected", () => {
      console.log("*********** 数据库断开 ***********");
      if (maxConnectTimes < 3) {
        maxConnectTimes++;
        mongoose.connect(db);
      } else {
        reject(new Error("数据库连接失败"));
        throw new Error("数据库连接失败");
      }
    });
    // 连接失败操作
    mongoose.connection.on("error", (error) => {
      console.log("*********** 数据库错误 ***********");
      if (maxConnectTimes < 3) {
        maxConnectTimes++;
        mongoose.connect(db);
      } else {
        reject(error);
        throw new Error("数据库连接失败");
      }
    });
  });
};

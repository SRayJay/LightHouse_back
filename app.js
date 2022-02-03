const Koa = require('koa');

const onerror = require("koa-onerror");
const logger = require("koa-logger");
const cors = require('koa-cors');
const session = require("koa-session");
const Router = require('koa-router')
// const bodyparser = require("koa-bodyparser");

// 路由
const index = require("./routes/index");
const user = require("./routes/user");
const admin = require('./routes/admin')
const book = require('./routes/book')

const koaBody = require('koa-body')
const path = require('path')
// const friendly = require("./routes/friendly");
// const upload = require("./routes/upload");
// const group = require("./routes/group");

const { connect } = require("./utils/connect");
const app = new Koa();
const router = new Router();

app.proxy = true; // 设置一些 proxy header 参数会被加到信任列表中
app.keys = ["session secret"]; // 设置签名的 Cookie 密钥
// error handler
onerror(app);
// session 配置

const CONFIG = {
  key: "sessionId",
  maxAge: 600000, // cookie 的过期时间 60000ms => 60s => 1min
  overwrite: true, // 是否可以 overwrite (默认 default true)
  httpOnly: true, // true 表示只有服务器端可以获取 cookie
  signed: true, // 默认 签名
  rolling: false, // 在每次请求时强行设置 cookie，这将重置 cookie 过期时间（默认：false）
  renew: false, // 在每次请求时强行设置 session，这将重置 session 过期时间（默认：false）
};
app.use(session(CONFIG, app));

// 生成静态资源服务
app.use(require("koa-static")(__dirname + "/public")); 


app.use(koaBody({
  // 支持文件格式
  enableTypes: ['json', 'form', 'text'],
  multipart: true,
  formidable: {
    // 上传目录
    uploadDir: path.join(__dirname, 'public/uploads'),
    // 保留文件扩展名
    keepExtensions: true,
  }
}));
app.use(
  cors({
    origin: function (ctx) {
      return ctx.header.origin;
    }, // 允许发来请求的域名
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // 设置所允许的 HTTP请求方法
    credentials: true, // 标示该响应是合法的
  })
);

// middlewares
// app.use(
//   bodyparser({
//     enableTypes: ["json", "form", "text"],
//   })
// );
app.use(logger());

// logger
app.use(async (ctx, next) => {
  const start = new Date();
  await next();
  const ms = new Date() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});

// routes
router.use("", index.routes());
router.use("/user", user.routes()); // 用户相关
router.use("/admin",admin.routes()); // 管理员相关
router.use("/book",book.routes()); // 书籍相关
// router.use("/api/friendly", friendly.routes());
// router.use("/api/upload", upload.routes());
// router.use("/api/group", group.routes());


// 加载路由中间件
app.use(router.routes()).use(router.allowedMethods());

app.on("error", (err, ctx) => {
  console.error("server error", err, ctx);
});
// 立即执行函数
(async () => {
  await connect(); // 执行连接数据库任务
})();
module.exports = app;


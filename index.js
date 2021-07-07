/*
 * @Author: your name
 * @Date: 2021-07-02 11:19:13
 * @LastEditTime: 2021-07-07 16:20:07
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /todoListServer/index.js
 */
const http = require("http");
const server = http.createServer();
const db = require("./src/db");
server.on("request", async function (req, res) {
  res.writeHead(200, {
    "Access-Control-Allow-Origin": "*", // 允许跨域访问
    "Access-Control-Allow-Headers": "*", // 允许访问
  });
  var url = req.url;
  console.log("url: ", url);
  if (url === "/") {
    db.selectAll("select * from tasks", (err, result) => {
      if (err) {
        res.end(err);
      }
      if (result.length == 0) {
        res.end("账户不存在");
      } else {
        res.end(JSON.stringify(result));
      }
    });
    // try {
    //   const data = await db.selectAll;
    //   console.log("data: ", data);
    //   if (data) {
    //     res.end(JSON.stringify(data));
    //   } else {
    //     console.log("用户不存在");
    //   }
    // } catch (e) {
    //   console.log("error");
    // }
  } else if (url === "/insert") {
    var postdata = "";
    req.on("data", (chunk) => {
      postdata += chunk;
      postdata = JSON.parse(postdata);
    });

    req.on("end", () => {
      db.insertData(postdata, (err, result) => {
        if (err) {
          console.log("添加失败");
        }
        res.end(JSON.stringify(result));
      });

      // const data = await db.insertData(postdata);
      // console.log("data: ", data);
      // if (data) {
      //   res.end(JSON.stringify(data));
      // } else {
      //   console.log("添加失败");
      // }
    });
    // res.end("this is login page");
  } else {
    res.end("404 Not Found.");
  }
});

server.listen(3000, function () {
  console.log("server start 3000");
});

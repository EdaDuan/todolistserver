/*
 * @Author: your name
 * @Date: 2021-07-02 11:19:13
 * @LastEditTime: 2021-07-11 10:55:27
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /todoListServer/index.js
 */
const http = require("http");
const server = http.createServer();
var requestHandlers = require("./src/controllerdb");
server.on("request", async function (req, res) {
  res.writeHead(200, {
    "Access-Control-Allow-Origin": "*", // 允许跨域访问
    "Access-Control-Allow-Headers": "*", // 允许访问
    "Content-Type": "text/plain",
  });
  switch (req.url) {
    case "/getTodoList":
      requestHandlers.getTodoList(res);
      break;
    case "/insert":
      var postdata = [];
      req.on("data", (chunk) => {
        postdata += chunk;
        postdata = JSON.parse(postdata);
      });
      req.on("end", () => {
        requestHandlers.insetrTodoList(res, postdata);
      });
      break;
    case "/updateTodayStatus":
      var postdata = [];
      req.on("data", (chunk) => {
        postdata += chunk;
        postdata = JSON.parse(postdata);
      });
      req.on("end", () => {
        requestHandlers.updateTodayStatus(res, postdata);
      });
      break;
    case "/moveTodoList":
      var postdata = [];
      req.on("data", (chunk) => {
        postdata += chunk;
        postdata = JSON.parse(postdata);
      });
      req.on("end", () => {
        requestHandlers.moveTodoList(res, postdata);
      });
      break;
    case "/editTodoList":
      var postdata = [];
      req.on("data", (chunk) => {
        postdata += chunk;
        postdata = JSON.parse(postdata);
      });
      req.on("end", () => {
        requestHandlers.editTodoList(res, postdata);
      });
      break;
    case "/deleteTodoList":
      var postdata = [];
      req.on("data", (chunk) => {
        postdata += chunk;
        postdata = JSON.parse(postdata);
      });
      req.on("end", () => {
        requestHandlers.deleteTodoList(res, postdata);
      });
      break;
    default:
      res.end("404 Not Found.");
  }
});
server.listen(3000, function () {
  console.log("server start 3000");
});

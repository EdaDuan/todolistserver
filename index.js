/*
 * @Author: your name
 * @Date: 2021-07-02 11:19:13
 * @LastEditTime: 2021-07-18 23:56:26
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /todoListServer/index.js
 */
const http = require("http");
const server = http.createServer();
var controller = require("./src/controllerdb");
const jwt = require("jsonwebtoken");
server.on("request", async function (req, res) {
  let userToken = jwt.decode(req.headers.authorization);
  res.writeHead(200, {
    "Access-Control-Allow-Origin": "*", // 允许跨域访问
    "Access-Control-Allow-Headers": "*", // 允许访问
    "Content-Type": "text/plain",
  });
  switch (req.url) {
    case "/userLogin":
      var postdata = [];
      req.on("data", (chunk) => {
        postdata += chunk;
        postdata = JSON.parse(postdata);
      });
      req.on("end", () => {
        controller.userLogin(res, postdata);
      });
      break;
    case "/userRegister":
      var postdata = [];
      req.on("data", (chunk) => {
        postdata += chunk;
        postdata = JSON.parse(postdata);
      });
      req.on("end", () => {
        controller.userRegister(res, postdata);
      });
      break;
    case "/getTodoList":
      controller.getTodoList(res, userToken);
      break;
    case "/insert":
      var postdata = [];
      req.on("data", (chunk) => {
        postdata += chunk;
        postdata = JSON.parse(postdata);
      });
      req.on("end", () => {
        controller.insetrTodoList(res, postdata, userToken);
      });
      break;
    case "/updateTodayStatus":
      var postdata = [];
      req.on("data", (chunk) => {
        postdata += chunk;
        postdata = JSON.parse(postdata);
      });
      req.on("end", () => {
        controller.updateTodayStatus(res, postdata);
      });
      break;
    case "/moveTodoList":
      var postdata = [];
      req.on("data", (chunk) => {
        postdata += chunk;
        postdata = JSON.parse(postdata);
      });
      req.on("end", () => {
        controller.moveTodoList(res, postdata);
      });
      break;
    case "/editTodoList":
      var postdata = [];
      req.on("data", (chunk) => {
        postdata += chunk;
        postdata = JSON.parse(postdata);
      });
      req.on("end", () => {
        controller.editTodoList(res, postdata);
      });
      break;
    case "/deleteTodoList":
      var postdata = [];
      req.on("data", (chunk) => {
        postdata += chunk;
        postdata = JSON.parse(postdata);
      });
      req.on("end", () => {
        controller.deleteTodoList(res, postdata);
      });
      break;
    default:
      res.end("404 Not Found.");
  }
});
server.listen(3000, function () {
  console.log("server start 3000");
});

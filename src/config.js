/*
 * @Author: your name
 * @Date: 2021-07-06 16:25:32
 * @LastEditTime: 2021-07-14 17:53:22
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: / todoListServer/src/config.js
 */
const mysql = require("mysql");
const connectdb = () => {
  return mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "123456",
    database: "todoList_db",
  });
};
const jwt = {
  secret: "123456", //自定义 token 的加密条件字符串
};
exports.connectdb = connectdb;
exports.jwt = jwt;

/*
 * @Author: your name
 * @Date: 2021-07-06 16:25:32
 * @LastEditTime: 2021-07-07 14:50:22
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

module.exports = connectdb;

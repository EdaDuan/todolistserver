/*
 * @Author: your name
 * @Date: 2021-07-03 18:15:59
 * @LastEditTime: 2021-07-07 15:16:10
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: / todoListServer/src/db/db.js
 */
const conn = require("./config");
const connection = conn();
// 查询所有数据
let selectAll = (sql, callback) => {
  connection.query(sql, (err, result) => {
    if (err) {
      callback("查找失败", "");
      return;
    }
    var string = JSON.stringify(result);
    var data = JSON.parse(string);
    callback("", data);
  });
};
let insertData = (data, callback) => {
  console.log("data11111: ", data);
  let taskName = data.taskName;
  let createTime = data.createTime;
  let finishTime = data.finishTime;
  let isDel = 0,
    status = 0,
    userId = 1001;
  for (var k in data) {
    console.log("k: ", k);
  }
  let sql = `insert into tasks (taskName,createTime,finishTime,isDel,status,userId) values ("${taskName}", "${createTime}", "${finishTime}", "${isDel}", "${status}", "${userId}")`;
  connection.query(sql, callback);
};
exports.selectAll = selectAll;
exports.insertData = insertData;

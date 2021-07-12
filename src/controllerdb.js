/*
 * @Author: your name
 * @Date: 2021-07-08 10:06:09
 * @LastEditTime: 2021-07-11 10:54:44
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: / todoListServer/src/requestHandlers.js
 */
const db = require("./serverdb");
// 获取todoList
let getTodoList = async (res) => {
  let result = await db.getTodoList();
  res.end(JSON.stringify(result));
};
// 插入todoList
let insetrTodoList = async (res, data) => {
  let result = await db.insetrTodoList(data);
  res.end(JSON.stringify(result));
};
// 更新todaytodoList状态
let updateTodayStatus = async (res, data) => {
  let result = await db.updateTodayStatus(data);
  res.end(JSON.stringify(result));
};
// 假删除待待办项
let moveTodoList = async (res, data) => {
  let result = await db.moveTodoList(data);
  res.end(JSON.stringify(result));
};
// 编辑待办项
let editTodoList = async (res, data) => {
  let result = await db.editTodoList(data);
  res.end(JSON.stringify(result));
};
// 彻底待办项
let deleteTodoList = async (res, data) => {
  let result = await db.deleteTodoList(data);
  res.end(JSON.stringify(result));
};
exports.getTodoList = getTodoList;
exports.insetrTodoList = insetrTodoList;
exports.updateTodayStatus = updateTodayStatus;
exports.moveTodoList = moveTodoList;
exports.editTodoList = editTodoList;
exports.deleteTodoList = deleteTodoList;

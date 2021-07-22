/*
 * @Author: your name
 * @Date: 2021-07-08 10:06:09
 * @LastEditTime: 2021-07-21 16:59:08
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: / todoListServer/src/requestHandlers.js
 */
const db = require("./serverdb");
// 登陆
const userLogin = async (res, data) => {
  const result = await db.userLogin(data);
  res.end(JSON.stringify(result));
};
// 注册
const userRegister = async (res, data) => {
  const result = await db.userRegister(data);
  res.end(JSON.stringify(result));
};
// 获取todoList
const getTodoList = async (res, userToken) => {
  const result = await db.getTodoList(userToken);
  res.end(JSON.stringify(result));
};
// 插入todoList
const insetrTodoList = async (res, data, userToken) => {
  const result = await db.insetrTodoList(data, userToken);
  res.end(JSON.stringify(result));
};
// 更新todaytodoList状态
const updateTodoStatus = async (res, data) => {
  const result = await db.updateTodoStatus(data);
  res.end(JSON.stringify(result));
};
// 假删除待待办项
const moveTodoList = async (res, data) => {
  const result = await db.moveTodoList(data);
  res.end(JSON.stringify(result));
};
// 编辑待办项
const editTodoList = async (res, data) => {
  const result = await db.editTodoList(data);
  res.end(JSON.stringify(result));
};
// 彻底待办项
const deleteTodoList = async (res, data) => {
  const result = await db.deleteTodoList(data);
  res.end(JSON.stringify(result));
};
exports.userLogin = userLogin;
exports.userRegister = userRegister;
exports.getTodoList = getTodoList;
exports.insetrTodoList = insetrTodoList;
exports.updateTodoStatus = updateTodoStatus;
exports.moveTodoList = moveTodoList;
exports.editTodoList = editTodoList;
exports.deleteTodoList = deleteTodoList;

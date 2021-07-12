/*
 * @Author: your name
 * @Date: 2021-07-03 18:15:59
 * @LastEditTime: 2021-07-12 09:49:04
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: / todoListServer/src/db/db.js
 */
const formate = require("./util/formate");
const conn = require("./config");
const connection = conn();
// 查询所有数据
let getTodoList = async () => {
  let sql = "select * from tasks";
  const res = await new Promise((resolve) => {
    connection.query(sql, (err, result) => {
      if (err) {
        console.log("err: ", err);
        return resolve({ ok: false, error: "查找失败" });
      }
      return resolve({
        ok: true,
        data: result,
      });
    });
  });
  return res;
};
// // 新增待办项
let insetrTodoList = async (data) => {
  console.log("data新增: ", data);
  let { taskName, createTime, finishTime, isDel, status, userId } = data;
  let sql = `insert into tasks (taskName,createTime,finishTime,isDel,status,userId) values ("${taskName}", "${createTime}", "${finishTime}", "${isDel}", "${status}", "${userId}")`;
  const res = await new Promise((resolve) => {
    connection.query(sql, (err, result) => {
      if (err) {
        console.log("err: ", err);
        return resolve({ ok: false, error: "添加失败" });
      }
      return resolve({
        ok: true,
        data: result,
      });
    });
  });
  return res;
};
// 修改今日待办项的状态
let updateTodayStatus = async (data) => {
  const res = await new Promise((resolve) => {
    console.log("data今日待办项状态: ", data);
    for (let item of data) {
      console.log("taskId: ", item.taskId);
      let sql = `update tasks set status =ABS(status-1) where taskId = "${item.taskId}"`;
      connection.query(sql, (err, result) => {
        if (err) {
          console.log("err: ", err);
          return resolve({ ok: false, error: "修改失败" });
        }
        return resolve({
          ok: true,
          data: result,
        });
      });
    }
  });
  return res;
};
// 假删除待待办项
let moveTodoList = async (data) => {
  console.log("data假删除: ", data);
  let sql = `update tasks set isDel =ABS(isDel-1) where taskId = "${data.taskId}"`;
  console.log("sql: ", sql);
  const res = await new Promise((resolve) => {
    connection.query(sql, (err, result) => {
      console.log("result: ", result);
      if (err) {
        console.log("err: ", err);
        return resolve({ ok: false, error: "删除失败" });
      }
      return resolve({
        ok: true,
        data: result,
      });
    });
  });
  return res;
};
// 编辑待办项
let editTodoList = async (data) => {
  console.log("data编辑: ", data);
  let sql = `update tasks set taskName = "${data.taskName}",finishTime = "${data.finishTime}" where taskId = "${data.taskId}"`;
  console.log("sql: ", sql);
  const res = await new Promise((resolve) => {
    connection.query(sql, (err, result) => {
      console.log("result: ", result);
      if (err) {
        console.log("err: ", err);
        return resolve({ ok: false, error: "编辑失败" });
      }
      return resolve({
        ok: true,
        data: result,
      });
    });
  });
  return res;
};
// 彻底删除
let deleteTodoList = async (data) => {
  const res = await new Promise((resolve) => {
    console.log("data彻底删除 ", data);
    for (let item of data) {
      let sql = `delete from tasks where taskId = "${item.taskId}"`;
      console.log("sql: ", sql);
      connection.query(sql, (err, result) => {
        if (err) {
          console.log("err: ", err);
          return resolve({ ok: false, error: "删除失败" });
        }
        return resolve({
          ok: true,
          data: result,
        });
      });
    }
  });
  return res;
};
exports.getTodoList = getTodoList;
exports.insetrTodoList = insetrTodoList;
exports.updateTodayStatus = updateTodayStatus;
exports.moveTodoList = moveTodoList;
exports.editTodoList = editTodoList;
exports.deleteTodoList = deleteTodoList;

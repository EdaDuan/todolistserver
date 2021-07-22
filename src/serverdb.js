/*
 * @Author: your name
 * @Date: 2021-07-03 18:15:59
 * @LastEditTime: 2021-07-22 11:48:44
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: / todoListServer/src/db/db.js
 */
const config = require("./config");
const connection = config.connectdb();
const jwt = require("jsonwebtoken");
// 查询所有数据
const getTodoList = async (userToken) => {
  if (userToken) {
    const sql = `select * from todoTasks where account = "${userToken.account}"`;
    const res = await new Promise((resolve) => {
      connection.query(sql, (err, result) => {
        if (err) {
          return resolve({ ok: false, error: "查找失败" });
        }
        return resolve({
          ok: true,
          data: result,
        });
      });
    });
    return res;
  }
  return { ok: false, error: "查找失败" };
};
const updateAll = async (data) => {
  let resPromise;
  for (let item of data) {
    const sql = `update todoTasks set taskName = "${item.taskName}",finishTime = "${item.finishTime}",status = "${item.status}",isDel = "${item.isDel}",account = "${item.account}" where taskId = "${item.taskId}"`;
    resPromise = await new Promise((resolve) => {
      connection.query(sql, (err, result) => {
        if (err) {
          return resolve({ ok: false, error: "修改失败" });
        }
        return resolve({
          ok: true,
          data: result,
        });
      });
    });
  }
  return resPromise;
};
// 本地新增数据
const localAdd = (localTodoList, userToken) => {
  getTodoList(userToken).then((res) => {
    let data = JSON.parse(JSON.stringify(res.data));
    // 获取到data的所有id集合
    let arr1Ids = data.map((item) => item.taskId);
    // 过滤本地数据中不包含数据库数据相同的id数组。
    const result = localTodoList.filter(
      (item) => !arr1Ids.includes(item.taskId)
    );
    result.map((item) => {
      insetrTodoList(item, userToken);
    });
  });
};
// 本地编辑的数据更新
const localUpdate = (localTodoList, userToken) => {
  getTodoList(userToken).then((res) => {
    let data = JSON.parse(JSON.stringify(res.data));
    // 获取到data的所有id集合
    let arr1Ids = data.map((item) => item.taskId);
    // 过滤本地数据中包含数据库数据相同的id数组。
    const result = localTodoList.filter((item) =>
      arr1Ids.includes(item.taskId)
    );
    updateAll(result);
  });
};
// 本地删除数据
const localDel = (localTodoList, userToken) => {
  getTodoList(userToken).then((res) => {
    let data = JSON.parse(JSON.stringify(res.data));
    // 获取到本地的所有id集合
    let arr1Ids = localTodoList.map((item) => item.taskId);
    // 过滤本地数据中不包含数据库数据相同的id数组。
    const result = data.filter((item) => !arr1Ids.includes(item.taskId));
    deleteTodoList(result);
  });
};
// 登陆
const userLogin = async (data) => {
  let { account, pwd, localTodoList, tag } = data;
  const sql = `select * from todoUser where account = "${account}" and pwd = "${pwd}"`;
  const res = await new Promise((resolve) => {
    connection.query(sql, (err, result) => {
      if (err) {
        return resolve({ ok: false, error: "服务端出错" });
      } else if (!result[0]) {
        return resolve({ ok: false, error: "账号或密码错误" });
      } else {
        const ses_token = jwt.sign({ account: account }, config.jwt.secret, {
          expiresIn: 3600,
        });
        let temp = jwt.decode(ses_token);
        if (tag) {
          localAdd(localTodoList, temp);
          localUpdate(localTodoList, temp);
          localDel(localTodoList, temp);
        }
        return resolve({
          ok: true,
          data: result,
          ses_token,
        });
      }
    });
  });
  return res;
};
const finduser = async (account) => {
  const sql = `select * from todoUser where account="${account}"`;
  const res = await new Promise((resolve) => {
    connection.query(sql, (err, result) => {
      if (err) {
        return resolve({ ok: false, error: "服务端出错" });
      } else if (!result[0]) {
        return resolve({ ok: false, error: "" });
      } else {
        return resolve({
          ok: true,
          data: result,
        });
      }
    });
  });
  return res;
};
// 注册
const userRegister = async (data) => {
  let { userName, account, pwd } = data;
  const sql = `insert into todoUser (userName,account,pwd) values ("${userName}", "${account}", "${pwd}")`;
  let resfind = await finduser(account);
  const res = await new Promise((resolve) => {
    connection.query(sql, (err, result) => {
      if (err) {
        return resolve({ ok: false, error: "注册失败" });
      } else {
        if (resfind.ok && resfind.data) {
          return resolve({ ok: false, error: "该账号已被注册" });
        } else {
          return resolve({
            ok: true,
            data: result,
          });
        }
      }
    });
  });
  return res;
};
// // 新增待办项
const insetrTodoList = async (data, userToken) => {
  if (userToken) {
    let account = userToken.account;
    let { taskName, createTime, finishTime, isDel, status } = data;
    const sql = `insert into todoTasks (taskName,createTime,finishTime,isDel,status,account) values ("${taskName}", "${createTime}", "${finishTime}", "${isDel}", "${status}", "${account}")`;
    const res = await new Promise((resolve) => {
      connection.query(sql, (err, result) => {
        if (err) {
          return resolve({ ok: false, error: "添加失败" });
        }
        return resolve({
          ok: true,
          data: result,
        });
      });
    });
    return res;
  }
};
// 修改今日待办项的状态单条修改 和全选修改
const updateTodoStatus = async (data) => {
  let res;
  for (let item of data) {
    const sql = `update todoTasks set status =ABS(status-1) where taskId = "${item.taskId}"`;
    res = await new Promise((resolve) => {
      connection.query(sql, (err, result) => {
        if (err) {
          return resolve({ ok: false, error: "修改失败" });
        }
        return resolve({
          ok: true,
          data: result,
        });
      });
    });
  }
  return res;
};
// 假删除待待办项
const moveTodoList = async (data) => {
  const sql = `update todoTasks set isDel =ABS(isDel-1) where taskId = "${data.taskId}"`;
  const res = await new Promise((resolve) => {
    connection.query(sql, (err, result) => {
      if (err) {
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
const editTodoList = async (data) => {
  const sql = `update todoTasks set taskName = "${data.taskName}",finishTime = "${data.finishTime}" where taskId = "${data.taskId}"`;
  const res = await new Promise((resolve) => {
    connection.query(sql, (err, result) => {
      if (err) {
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
const deleteTodoList = async (data) => {
  let res;
  for (let item of data) {
    const sql = `delete from todoTasks where taskId = "${item.taskId}"`;
    res = await new Promise((resolve) => {
      connection.query(sql, (err, result) => {
        if (err) {
          return resolve({ ok: false, error: "回收站删除失败" });
        }
        return resolve({
          ok: true,
          data: result,
        });
      });
    });
  }
  return res;
};
exports.userLogin = userLogin;
exports.userRegister = userRegister;
exports.getTodoList = getTodoList;
exports.insetrTodoList = insetrTodoList;
exports.updateTodoStatus = updateTodoStatus;
exports.moveTodoList = moveTodoList;
exports.editTodoList = editTodoList;
exports.deleteTodoList = deleteTodoList;

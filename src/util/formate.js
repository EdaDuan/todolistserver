/*
 * @Author: your name
 * @Date: 2021-07-10 08:02:24
 * @LastEditTime: 2021-07-10 08:05:32
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: / todoListServer/src/util/formate.js
 */
const formateData = (date) => {
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();
  let curTime =
    year +
    "-" +
    month.toString().padStart(2, "0") +
    "-" +
    day.toString().padStart(2, "0");
  return curTime;
};

exports.formateData = formateData;

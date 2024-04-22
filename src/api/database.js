// JavaScript模块，用于处理数据库相关的HTTP请求
import http from "@/utils/http.js";
// getDatabaseI获取数据库信息
export const getDatabaseI = () => {
  return http.get("/database");
};
// addDatabaseI添加数据库
export const addDatabaseI = (databaseData) => {
  return http.post("/database", databaseData);
};
// updateDatabaseI更新数据库
export const updateDatabaseI = (databaseData) => {
  return http.put("/database", databaseData);
};
// deleteDatabaseI删除数据库
export const deleteDatabaseI = (name) => {
  console.log(name);
  return http.delete("/database/" + name);
};

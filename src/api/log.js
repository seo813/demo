// 用操作日志消息上传服务器
// 导入http函数
import http from "@/utils/http.js";


// getLogInfoI：根据参数获取日志信息
export const getLogInfoI = (params) => {
  return http.get("/log", { params: params });
};

// addLogInfoI：添加日志信息
export const addLogInfoI = (logInfoData) => {
  return http.post("/log", logInfoData);
};

// updateLogInfoI：更新日志信息
export const updateLogInfoI = (logInfoData) => {
  return http.put("/log", logInfoData);
};

// deleteLogInfoI：删除日志信息
export const deleteLogInfoI = (id) => {
  console.log(id);
  return http.delete("/log/" + id);
};

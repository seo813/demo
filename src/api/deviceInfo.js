// 处理设备信息的HTTP请求
import http from "@/utils/http.js";

// // userLoginService：用户登录服务（已注释掉）
// export const userLoginService = (loginData) => {
//   return http.post("/deviceinfo", loginData);
// };

// getDeviceInfoI：根据参数获取设备信息
export const getDeviceInfoI = (params) => {
    return http.get("/deviceinfo", {params:params});
};

// addDeviceInfoI：添加设备信息
export const addDeviceInfoI = (deviceInfoData) => {
  return http.post("/deviceinfo", deviceInfoData);
};

// updateDeviceInfoI：更新设备信息
export const updateDeviceInfoI = (deviceInfoData) => {
  return http.put("/deviceinfo", deviceInfoData);
};

// deleteDeviceInfoI：删除设备信息
export const deleteDeviceInfoI = (deviceid) => {
  console.log(deviceid);
  return http.delete("/deviceinfo/" + deviceid);
};

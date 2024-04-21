import http from "@/utils/http.js";

// export const userLoginService = (loginData) => {
//   return http.post("/deviceinfo", loginData);
// };

export const getDeviceInfoI = (params) => {

    return http.get("/deviceinfo", {params:params});
};

export const addDeviceInfoI = (deviceInfoData) => {
  return http.post("/deviceinfo", deviceInfoData);
};

export const updateDeviceInfoI = (deviceInfoData) => {
  return http.put("/deviceinfo", deviceInfoData);
};

export const deleteDeviceInfoI = (deviceid) => {

  console.log(deviceid);
  return http.delete("/deviceinfo/" + deviceid);
};

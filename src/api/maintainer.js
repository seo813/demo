// 处理维护人员信息
import http from "@/utils/http.js";

// export const userLoginService = (loginData) => {
//   return http.post("/login", loginData);
// };

// getMaintainerI：获取所有维护人员信息
export const getMaintainerI = () => {
  return http.get("/maintainer");
};

// addMaintainerI：添加一个维护人员
export const addMaintainerI = (maintainerData) => {
  return http.post("/maintainer", maintainerData);
};

// updateMaintainerI：更新一个维护人员的信息
export const updateMaintainerI = (maintainerData) => {
  return http.put("/maintainer", maintainerData);
};

// deleteMaintainerI：删除一个维护人员
export const deleteMaintainerI = (number) => {
  console.log(number);
  return http.delete("/maintainer/" + number);
};

// 根据参数获取主页信息
export const alertI = (params) => {
  return http.get("/alert", { params: params });
};
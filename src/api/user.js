import http from "@/utils/http.js";

// userLoginService：用户登录服务
export const userLoginService = (loginData) => {
//   const params = new URLSearchParams();
//   for (let key in loginData) {
//     params.append(key, loginData[key]);
//   }
  return http.post("/login", loginData);
};

// getUser：从服务器获取用户信息
export const getUser = () => {
  //   const params = new URLSearchParams();
  //   for (let key in loginData) {
  //     params.append(key, loginData[key]);
  //   }
  return http.get("/user");
};

// addUserI：添加用户
export const addUserI = (userData) => {
  //   const params = new URLSearchParams();
  //   for (let key in loginData) {
  //     params.append(key, loginData[key]);
  //   }
  return http.post("/user", userData);
};

// updateUserI：更新用户信息
export const updateUserI = (userData) => {
  //   const params = new URLSearchParams();
  //   for (let key in loginData) {
  //     params.append(key, loginData[key]);
  //   }
  return http.put("/user", userData);
};

// deleteUserI：删除用户
export const deleteUserI = (username) => {
  //   const params = new URLSearchParams();
  //   for (let key in loginData) {
  //     params.append(key, loginData[key]);
  //   }
  console.log(username);
  return http.delete("/user/" + username);
};
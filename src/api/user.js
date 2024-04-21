import http from "@/utils/http.js";

export const userLoginService = (loginData) => {
//   const params = new URLSearchParams();
//   for (let key in loginData) {
//     params.append(key, loginData[key]);
//   }
  return http.post("/login", loginData);
};


export const getUser = () => {
  //   const params = new URLSearchParams();
  //   for (let key in loginData) {
  //     params.append(key, loginData[key]);
  //   }
  return http.get("/user");
};

export const addUserI = (userData) => {
  //   const params = new URLSearchParams();
  //   for (let key in loginData) {
  //     params.append(key, loginData[key]);
  //   }
  return http.post("/user", userData);
};

export const updateUserI = (userData) => {
  //   const params = new URLSearchParams();
  //   for (let key in loginData) {
  //     params.append(key, loginData[key]);
  //   }
  return http.put("/user", userData);
};

export const deleteUserI = (username) => {
  //   const params = new URLSearchParams();
  //   for (let key in loginData) {
  //     params.append(key, loginData[key]);
  //   }
  console.log(username);
  return http.delete("/user/" + username);
};
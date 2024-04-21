import http from "@/utils/http.js";

// export const userLoginService = (loginData) => {
//   return http.post("/login", loginData);
// };


export const getMaintainerI = () => {
  return http.get("/maintainer");
};

export const addMaintainerI = (maintainerData) => {
  return http.post("/maintainer", maintainerData);
};

export const updateMaintainerI = (maintainerData) => {
  return http.put("/maintainer", maintainerData);
};

export const deleteMaintainerI = (number) => {
  console.log(number);
  return http.delete("/maintainer/" + number);
};

export const alertI = (params) => {
  return http.get("/alert", { params: params });
};
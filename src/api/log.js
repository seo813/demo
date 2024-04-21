import http from "@/utils/http.js";



export const getLogInfoI = (params) => {
  return http.get("/log", { params: params });
};

export const addLogInfoI = (logInfoData) => {
  return http.post("/log", logInfoData);
};

export const updateLogInfoI = (logInfoData) => {
  return http.put("/log", logInfoData);
};

export const deleteLogInfoI = (id) => {
  console.log(id);
  return http.delete("/log/" + id);
};

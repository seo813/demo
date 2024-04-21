import http from "@/utils/http.js";

export const getDatabaseI = () => {
  return http.get("/database");
};

export const addDatabaseI = (databaseData) => {
  return http.post("/database", databaseData);
};

export const updateDatabaseI = (databaseData) => {
  return http.put("/database", databaseData);
};

export const deleteDatabaseI = (name) => {
  console.log(name);
  return http.delete("/database/" + name);
};

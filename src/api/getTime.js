import http from "@/utils/http.js";

export const getTime = () => {
  return http({
    url: "/get",
  });
};

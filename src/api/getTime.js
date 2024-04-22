// 发送http请求,获取当前时间
import http from "@/utils/http.js";

export const getTime = () => {
  return http({
    url: "/get",
  });
};

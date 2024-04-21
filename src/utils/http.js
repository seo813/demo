// import axios from "axios";

// const service = axios.create({
//   baseURL: "http://192.168.31.190:8080",
//   timeout: 5000,
// });

// // 请求拦截器
// service.interceptors.request.use(
//   (config) => {
//     config.headers.icode = "input you icode";
//     return config; // 必须返回配置
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// // 响应拦截器
// service.interceptors.response.use((response) => {
//   const { success, message, data } = response.data;
//   //   要根据success的成功与否决定下面的操作
//   if (success) {
//     return data;
//   } else {
//     return Promise.reject(new Error(message));
//   }
// });

// export default service;



//定制请求的实例

//导入axios  npm install axios
import axios from 'axios';
import { ElMessage } from "element-plus";
//定义一个变量,记录公共的前缀  ,  baseURL
// const baseURL = "http://47.113.217.195:8000";
const baseURL = "http://localhost:8080";
const instance = axios.create({baseURL})


//添加响应拦截器
instance.interceptors.response.use(
  result => {
    if (result.data.code === 0){
      return result.data;
    }
    
    //alert(result.data.msg ? result.data.msg : '服务异常')
    ElMessage.error(result.data.msg ? result.data.msg : '服务异常');
    return Promise.reject(result.data);
  },
  
  
    err=>{
        ElMessage.error("服务异常");
        return Promise.reject(err);//异步的状态转化成失败的状态
    }
)

export default instance;
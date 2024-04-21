import { createApp } from "vue";
import App from "./App.vue";


import ElementPlus from "element-plus";

// import "./styles/preflight.css"
// import "./styles/index.scss"
import "./style.css";
import "./assets/main.scss";



import "element-plus/dist/index.css";
import elementIcon from "./plugins/icons";



import "@unocss/reset/tailwind-compat.css";




import axios from "axios";



import router from "./router";
import { createPinia} from "pinia";
import 'virtual:svg-icons-register'
import MyIcon from "./components/SvgIcon/index.vue";
import locale from "element-plus/dist/locale/zh-cn.js";

// import Vue from "vue";

//插件——异步请求 axios
// import "./utils/axios.js";



// this.$http.get("http://192.168.31.190:8080/get").then(res => {
//     this.users = res.data;
// })

// 后端服务器地址
// let url = "http://192.168.31.190:8080/get";

// module.exports = {
//   publicPath: "./", // 【必要】静态文件使用相对路径
//   outputDir: "./dist", //打包后的文件夹名字及路径
//   devServer: {
//     // 开发环境跨域情况的代理配置
//     proxy: {
//       // 【必要】访问自己搭建的后端服务器
//       "/myAPI": {
//         target: url,
//         changOrigin: true,
//         ws: true,
//         secure: false,
//         pathRewrite: {
//           "^/myAPI": "/",
//         },
//       },
//     },
//   },
// };

// this.$http.get("/myAPI").then((res) => {
//   console.log(res.data);
// });


const app = createApp(App);
const pinia = createPinia();
// app.config.globalProperties.$axios = axios;
app.use(pinia).use(router).component('MyIcon', MyIcon).use(ElementPlus, {locale}).use(elementIcon).mount("#app");

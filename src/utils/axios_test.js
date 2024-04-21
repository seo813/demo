// import axios from 'axios'
 
// // axios 全局默认值
// axios.defaults.baseURL = '/';
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
 
// // 添加请求拦截器
// axios.interceptors.request.use(function(config) {
 
//     // 无需带token的请求路径，正则校验（/public 和 /login 开头的api 无需token ）
//     let publicPath = [/^\/public/, /^\/login/]
//         // 是否是公开接口（公开接口无需token）
//     let isPublic = false
//         // 判断当前api是否是公开接口
//     publicPath.map((path) => {
//             isPublic = isPublic || path.test(config.url)
//         })
//         // 从sessionStorage中获取token
//     const token = sessionStorage.getItem('token')
//     if (!isPublic && token) {
//         // 若当前api不是公开接口，并且token存在，则向headers中添加token
//         config.headers.Authorization = 'Bearer ' + token
//     }
 
 
//     // 对get请求的参数全部进行URL编码
//     let url = config.url
 
//     if (config.method === 'get' && config.params) {
//         url += '?'
//         let keys = Object.keys(config.params)
//         for (let key of keys) {
//             url += `${key}=${encodeURIComponent(config.params[key])}&`
//         }
//         url = url.substring(0, url.length - 1)
//         config.params = {}
//     }
//     config.url = url
 
//     return config;
// }, function(error) {
//     // 对请求错误做些什么
//     return Promise.reject(error);
// });
 
// // 添加响应拦截器
// axios.interceptors.response.use(function(response) {
//     // 对响应数据做点什么
//     return response;
// }, function(error) {
//     // 对响应错误做点什么
//     return Promise.reject(error);
// });
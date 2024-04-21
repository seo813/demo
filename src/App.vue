<template>
<router-view></router-view> 
</template>

<script setup>

// import { ref } from "vue";
// import { getVisualization } from "@/api/visualization.js";
// import { getTime } from "@/api/getTime.js";

// const data = ref(null);
// const tmp = ref(null);
// const createtime = ref(null);
// const xaccrms = ref(null);
// const yaccrms = ref(null);
// const zaccrms = ref(null);
// const xspdrms = ref(null);
// const yspdrms = ref(null);
// const zspdrms = ref(null);
// const xacckur = ref(null);
// const yacckur = ref(null);
// const zacckur = ref(null);

// const data1 = ref(null);
// import axios from "axios";
// import { zrUtil } from "echarts";
// const localServerUrl = 'http://192.168.31.190:8080/get';

// const loadData = async () => {
//   data.value = await getVisualization();
//   console.log(data.value);
//   console.log(data.regionData);
// };

// const loadData1 = async () => {
//   data1 = await getTime();
//   console.log(data1)
// };

// export default {
//   // components: {
//   //   Temp,
//   // },
//   data() {
//     return {
//       tmp: null,
//     };
//   },
//   methods: {
//     async fetchData() {
//       // const response = await loadData2();
//       // this.data = response;
//       this.tmp = tmp;
//     },
//   },
// };

// const loadData2 = () => {
//   // axios.get("http://192.168.31.190:8080/get")
//   axios.get("http://127.0.0.1:8080/get").then((res) => {
//     console.log(res.data.data);
//     var res_data = res.data.data.slice().reverse();
//     // createtime.value = res.data.data.map(item => item.createtime);
//     createtime.value = res_data.map((item) => {
//       const [date, time] = item.createtime.split("T");
//       return time;
//     });
//     // data1.createtime = createtime;
//     tmp.value = res_data.map((item) => item.tmp / 100);
//     xaccrms.value = res_data.map((item) => item.xaccrms);
//     yaccrms.value = res_data.map((item) => item.yaccrms);
//     zaccrms.value = res_data.map((item) => item.zaccrms);

//     xspdrms.value = res_data.map((item) => item.xspdrms);
//     yspdrms.value = res_data.map((item) => item.yspdrms);
//     zspdrms.value = res_data.map((item) => item.zspdrms);
//     xacckur.value = res_data.map((item) => item.xacckur);
//     yacckur.value = res_data.map((item) => item.yacckur);
//     zacckur.value = res_data.map((item) => item.zacckur);
//     // data1.tmp = tmp;
//     // console.log(data1.createtime);
//     console.log(tmp.value);
//     // console.log(createtime.value);
//   });
// };

// loadData();
// loadData2();

// setInterval(() => {
//   axios.get(localServerUrl)
//   .then(response => {
//     console.log('请求成功:', response.data);
//   })
//   .catch(error => {
//     console.error('请求失败:', error);
//   });
// }, 500);
// setInterval(() => {
//   loadData();
// }, 2000);

// setInterval(() => {
//   loadData1();
// }, 2000);

// setInterval(loadData2, 125);

// import axios from "./axios
// Vue.prototype.$http = axios;

// import localAPI from './local';

// axios.get(localServerUrl)
//   .then(response => {
//     // Process the successful response
//     console.log('API response:', response.data);
//   })
//   .catch(error => {
//     // Handle API request errors
//     console.error('API error:', error);
//   });

// export default {
//   data() {
//     return {
//       message: ''
//     };
//   },
//   created() {
//     this.fetchData();
//   },
//   methods: {
//     fetchData() {
//       axios.get('http://192.168.31.190:8080/get')
//         .then(response => {
//           console.log(response.data);
//           this.data = response.data;
//         })
//         .catch(error => {
//           console.error('请求本地接口发生错误:', error);
//         });
//     }
//   }
// };

// export default {
//   // data() {
//   //   return {
//   //     message: "",
//   //   };
//   // },
//   // created() {
//   //   this.fetchData();
//   // },
//   mounted() {
//     // axios({
//     //   method: "get",
//     //   url: "https://api.imooc-web.lgdsunday.club/api/visualization",
//     // }).then((response) => {
//     //   console.log(response.data);
//     //   // this.data = response.data;
//     // });
//      axios.get("https://api.imooc-web.lgdsunday.club/api/visualization")
//       .then(res => {
//         console.log(res.data);
//       })
//   },
// };

//  axios.get("https://api.imooc-web.lgdsunday.club/api/visualization")
//       .then(res => {
//         console.log(res.data);
//       })

// export default {
//   data() {
//     return {
//       data: null
//     };
//   },
//   mounted() {
//     localAPI.getData().then(data => {
//       this.data = data;
//       console.log(data);
//     });
//   }
// };

// this.$axios(
//     {
//         method: "get",
//         url: "/get",
//     }
// ).then((res) => {
//     console.log(res.data);
// }).catch((err) => {
//     console.log(err);
// })
</script>

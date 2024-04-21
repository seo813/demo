<template>
  <!-- <div
    class="bg-[url('assets/imgs/bg.jpg')] bg-cover bg-center h-screen text-white p-2 flex overflow-hidden" 
    v-if="data"
  > -->

  <div
    class="bg-[#181424] bg-cover bg-center h-screen text-white p-2 flex overflow-hidden"
  >
    <div class="flex-1 mr-2 bg-opacity-50 bg-slate-800 p-3 flex flex-col">
      <HorizontalBar class="h-1/3 box-border pb-4"  />
      <!-- <RadarBar class="h-1/3 box-border pb-4" :data="data.riskData" /> -->
      <!-- <Temp class="h-1/3" :tmp="data1.tmp" :createtime="data1.createtime" /> -->
      <Displacement class="h-1/3 box-border pb-4" :xdisrms="xdisrms"
        :ydisrms="ydisrms"
        :zdisrms="zdisrms"
        :createtime="createtime" />
      <Temp class="h-1/3" :tmp="tmp" :createtime="createtime" />
    </div>
    <div class="w-1/2 mr-2 flex flex-col">
      <TotalData
        class="bg-opacity-50 bg-slate-800 p-3"
        :data="data.totalData"
      />
      <Giao
        class="bg-opacity-50 bg-slate-800 p-3"
        :data="data.totalData"
      />
      <Frequency
        class="bg-opacity-50 bg-slate-800 p-3 mt-2 flex-1"
        :data="data.mapData"
      />
    </div>
    <div class="flex-1 bg-opacity-50 bg-slate-800 p-3 flex flex-col">
      <Acceleration
        class="h-1/3 box-border pb-4"
        :xaccrms="xaccrms"
        :yaccrms="yaccrms"
        :zaccrms="zaccrms"
        :xaccmax="xaccmax"
        :yaccmax="yaccmax"
        :zaccmax="zaccmax"
        :createtime="createtime"
      />
      <Speed
        class="h-1/3 box-border pb-4"
        :xspdrms="xspdrms"
        :yspdrms="yspdrms"
        :zspdrms="zspdrms"
        :xspdmax="xspdmax"
        :yspdmax="yspdmax"
        :zspdmax="zspdmax"
        :createtime="createtime"
      />
      <Kurtosis
        class="h-1/3 box-border"
        :xacckur="xacckur"
        :yacckur="yacckur"
        :zacckur="zacckur"
        :xspdkur="xspdkur"
        :yspdkur="yspdkur"
        :zspdkur="zspdkur"
        :createtime="createtime"
      />

    </div>
  </div>
</template>

<script setup>
import HorizontalBar from "./data/HorizontalBar.vue";
import Temp from "./data/Temp.vue";
import TotalData from "./data/TotalData.vue";
import Frequency from "./data/Frequency.vue";
import Acceleration from "./data/Acceleration.vue";
import Speed from "./data/Speed.vue";
import Kurtosis from "./data/Kurtosis.vue";
import Displacement from "./data/Displacement.vue";
import Giao from "./data/Giao.vue";

import { ref } from "vue";
import { getVisualization } from "@/api/visualization.js";
import { getTime } from "@/api/getTime.js";

const data = ref(null);
const tmp = ref(null);
const createtime = ref(null);
const xaccrms = ref(null);
const yaccrms = ref(null);
const zaccrms = ref(null);
const xspdrms = ref(null);
const yspdrms = ref(null);
const zspdrms = ref(null);
const xacckur = ref(null);
const yacckur = ref(null);
const zacckur = ref(null);
const xdisrms = ref(null);
const ydisrms = ref(null);
const zdisrms = ref(null);

const xaccmax = ref(null);
const yaccmax = ref(null);
const zaccmax = ref(null);
const xspdmax = ref(null);
const yspdmax = ref(null);
const zspdmax = ref(null);
const xspdkur = ref(null);
const yspdkur = ref(null);
const zspdkur = ref(null);
// const data1 = ref(null);
import axios from "axios";
import { zrUtil } from "echarts";
// const localServerUrl = 'http://192.168.31.190:8080/get';

const loadData = async () => {
  data.value = await getVisualization();
  console.log(data.value);
  console.log(data.regionData);
};



const loadData2 = () => {
  // axios.get("http://192.168.31.190:8080/get")
  axios.get("http://127.0.0.1:8080/get").then((res) => {
    console.log(res.data.data);
    var res_data = res.data.data.slice().reverse();
    // createtime.value = res.data.data.map(item => item.createtime);
    createtime.value = res_data.map((item) => {
      const [date, time] = item.createtime.split("T");
      return time;
    });
    // data1.createtime = createtime;
    tmp.value = res_data.map((item) => item.tmp / 100);
    xaccrms.value = res_data.map((item) => item.xaccrms);
    yaccrms.value = res_data.map((item) => item.yaccrms);
    zaccrms.value = res_data.map((item) => item.zaccrms);

    xspdrms.value = res_data.map((item) => item.xspdrms);
    yspdrms.value = res_data.map((item) => item.yspdrms);
    zspdrms.value = res_data.map((item) => item.zspdrms);
    xacckur.value = res_data.map((item) => item.xacckur);
    yacckur.value = res_data.map((item) => item.yacckur);
    zacckur.value = res_data.map((item) => item.zacckur);

    xdisrms.value = res_data.map((item) => item.xdisrms);
    ydisrms.value = res_data.map((item) => item.ydisrms);
      zdisrms.value = res_data.map((item) => item.zdisrms);

    xaccmax.value = res_data.map((item) => item.xaccmax);
    yaccmax.value = res_data.map((item) => item.yaccmax);
    zaccmax.value = res_data.map((item) => item.zaccmax);
    xspdmax.value = res_data.map((item) => item.xspdmax);
    yspdmax.value = res_data.map((item) => item.yspdmax);
    zspdmax.value = res_data.map((item) => item.zspdmax);

    xspdkur.value = res_data.map((item) => item.xspdkur);
    yspdkur.value = res_data.map((item) => item.yspdkur);
    zspdkur.value = res_data.map((item) => item.zspdkur);

    // console.log(tmp.value);

  });
};

loadData();
loadData2();


// setInterval(() => {
//   loadData();
// }, 2000);


setInterval(loadData2, 500);


</script>

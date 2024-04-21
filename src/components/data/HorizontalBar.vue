<template>
  <div>
    <div>报警</div>
    <div ref="target" class="w-full h-full"></div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import * as echarts from "echarts";
// const props = defineProps({
//   data: {
//     type: Object,
//     required: true,
//   },
// });
// console.log(props.data);

let mChart = null;
const target = ref(null);
// onMounted(() => {
//   mChart = echarts.init(target.value);
//     // mCharts.showLoading();
//   //   mCharts.hideLoading();
//   renderChart();
// });

// const renderChart = () => {
//   const options = {
//     animation: true,
//     animationDuration: 100,
//     xAxis: {
//       type: "category",
//       data: props.data.regions.map((item) => item.name),
//       axisTick: {
//         show: false,
//       },
//       axisLabel: {
//         color: "#fff",
//         fontSize: 12,
//       },
//     },
//     yAxis: {
//       type: "value",
//       max: function (value) {
//         return parseInt(value.max * 1.2);
//       },
//       axisLine: {
//         show: false,
//       },
//       axisTick: {
//         show: false,
//       },
//       axisLabel: {
//         color: "#9EB1C8",
//       },
//     },
//     grid: {
//       top: 0,
//       left: 0,
//       right: 0,
//       bottom: 0,
//       containLabel: true,
//     },
//     series: [
//       {
//         name: "康师傅",
//         data: props.data.regions.map((item) => ({
//           name: item.name,
//           value: item.value,
//         })),
//         showBackground: true,
//         backgroundStyle: {
//           color: "rgba(180, 180, 180, 0.2)",
//         },
//         itemStyle: {
//           color: "#5D98CE",
//           barBorderRadius: 5,
//           shadowColor: "rgba(0,0,0,0.3)",
//           shadowBlur: 5,
//         },
//         barwidth: 12,
//         label: {
//           show: true,
//           position: "top",
//           textStyle: {
//             color: "#fff",
//           },
//         },
//         smooth: true,
//         type: "line", // 设置图表类型为 折线图
//       },
//     ],
//   };
//   mChart.setOption(options);
// };

// watch(
//   () => props.data,
//   () => {
//     //   mCharts.hideLoading();
//       renderChart();
//   }
// );

// window.onresize = function(){mChart.resize()}
</script>

<style lang="scss" scoped></style>
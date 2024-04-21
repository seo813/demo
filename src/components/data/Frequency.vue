<template>
  <div>
    <div ref="target" class="w-full h-full"></div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import * as echarts from "echarts";

const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
});

let res = {
  code: 0,
  msg: "执行成功",
  data: {
    x: [
      0, 14, 28, 42, 56, 70, 84, 98, 112, 126, 140, 154, 168, 182, 196, 210,
      224, 238, 252, 266, 280, 294, 308, 322, 336, 350, 364, 378, 392, 406, 420,
      434, 448, 462, 476, 490, 504, 518, 532, 546, 560, 574, 588, 602, 616, 630,
      644, 658, 672, 686, 700, 714, 728, 742, 756, 770, 784, 798, 812, 826, 840,
      854, 868, 882, 896, 910, 924, 938, 952, 966, 980, 994, 1008, 1022, 1036,
      1050, 1064, 1078, 1092, 1106, 1120, 1134, 1148, 1162, 1176, 1190, 1204,
      1218, 1232, 1246, 1260, 1274, 1288, 1302, 1316, 1330, 1344, 1358, 1372,
      1386, 1400, 1414, 1428, 1442, 1456, 1470, 1484, 1498, 1512, 1526, 1540,
      1554, 1568, 1582, 1596, 1610, 1624, 1638, 1652, 1666, 1680, 1694, 1708,
      1722, 1736, 1750, 1764, 1778, 1792, 1806, 1820, 1834, 1848, 1862, 1876,
      1890, 1904, 1918, 1932, 1946, 1960, 1974, 1988, 2002, 2016, 2030,
    ],
    y: [
      207, 212, 164, 248, 319, 416, 578, 642, 717, 892, 964, 235, 136, 1825,
      217, 211, 243, 231, 249, 274, 540, 139, 392, 271, 250, 283, 231, 223, 57,
      63, 27, 55, 53, 44, 55, 45, 78, 69, 62, 69, 94, 63, 101, 151, 125, 204, 1,
      89, 62, 93, 65, 48, 50, 73, 54, 39, 57, 64, 53, 44, 57, 2, 38, 53, 35, 34,
      51, 44, 58, 31, 39, 52, 43, 26, 27, 55, 20, 24, 33, 46, 57, 29, 57, 63,
      27, 55, 53, 44, 55, 45, 78, 69, 62, 69, 94, 63, 101, 151, 125, 204, 263,
      295, 149, 982, 182, 212, 208, 214, 176, 1451, 164, 148, 131, 170, 160,
      149, 147, 136, 129, 145, 140, 137, 160, 160, 151, 165, 153, 158, 146, 148,
      164, 168, 176, 209, 199, 195, 195, 186, 158, 196, 127, 117, 906, 858, 835,
      992, 919, 759, 930, 782, 781, 845, 954, 1155,
    ],
  },
};

let regularX = [
  7.8, 163.8, 319.8, 475.8, 631.8, 787.8, 943.8, 1099.8, 1255.8, 1411.8, 1567.8,
  1723.8, 1879.8,
];
let mChart = null;
const target = ref(null);
onMounted(() => {
  mChart = echarts.init(target.value);
  renderChart();
});

const renderChart = () => {
    const options = {
    title: {
          text: '▎频域',
          left: 20,
            top: 20,
            textStyle: {
                color: '#fff',
            }
      },
        dataZoom: [
      {
        type: "inside",
        xAxisIndex: 0,
      },
      {
        type: "inside",
        yAxisIndex: 0,
      },
    ],
    toolbox: {
     feature: {
          saveAsImage: {}, // 导出图片
          restore: {}, // 重置
          magicType: {
            type: ['bar', 'line']
          } // 动态图表类型的切换
        }
    },
    //   backgroundColor: "#000",
    color: ["#33E392"],
    xAxis: [
      {
        show: false,
        type: "category",
        position: "bottom",
        interval: 2,
            data: res.data.x,
       
      },
      {
        type: "category",
        position: "bottom",
        data: regularX,
        axisPointer: {
          show: false,
          },
          scale: true,
        axisLine: {
          lineStyle: {
            color: "#bbb",
          },
        },
      },
    ],
    tooltip: {
      trigger: "axis",
      backgroundColor: "#081429",
      textStyle: {
        color: "#fff",
      },
      axisPointer: {
        lineStyle: {
          color: "red",
        },
      },
    },
    yAxis: [
      {
            type: "value",
        axisLine: {
          lineStyle: {
            color: "#ccc",
          },
        },
        axisLabel: {
          show: true,
          color: "#ccc",
        },
      },
    ],
    series: [
      {
        type: "bar",
        data: res.data.y,
        // areaStyle: {
        //   opacity: 0.8,
        //   color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
        //     {
        //       offset: 0,
        //       color: "RGBA(51, 227, 146, 0.5)",
        //     },
        //     {
        //       offset: 1,
        //       color: "RGBA(51, 227, 146, 0)",
        //     },
        //   ]),
            // },
         color: {
              type: 'linear', // 线性渐变
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops:[
                {
                  offset: 0, color: 'red' // 0%处的颜色为红色
                },
                {
                  offset: 1, color: 'blue' // 100%处的颜色为蓝
                }
              ]
            },
        emphasis: {
          focus: "series",
        },
        backgroundStyle: {
          color: "rgba(180, 180, 180, 0.2)",
        },
      },
    ],
  };
  mChart.setOption(options);
};

// window.onresize = function(){mChart.resize()}
</script>

<style lang="scss" scoped>
</style>
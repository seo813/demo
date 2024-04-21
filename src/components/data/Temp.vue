<template>
  <div>
    <div ref="target" class="w-full h-full"></div>
    <!-- <div> {{tmp}} </div> -->
  </div>
</template>

<script setup>
import { onMounted, ref, watch} from "vue";
import * as echarts from "echarts";

const props = defineProps({
  tmp: {
    type: Array,
    // required: true,
    default: () => [],
  },
  createtime: {
    type: Array,
    // required: true,
    default: () => [],
  },
});


let regularX = [
  7.8, 163.8, 319.8, 475.8, 631.8, 787.8, 943.8, 1099.8, 1255.8, 1411.8, 1567.8,
  1723.8, 1879.8,
];


const target = ref(null);
let mChart = null;

onMounted(() => {
  mChart = echarts.init(target.value);
  renderChart();
});

const renderChart = () => {
  const options = {
    title: {
      text: "▎温度",
      left: 20,
      top: 20,
      textStyle: {
        color: "#fff",
      },
    },
    visualMap: [
      {
        show: false,
        type: "continuous",
        seriesIndex: 0,
        min: 0,
        max: 180,
        inRange: {
          color: ["#33E392",'yellow', "red"],
        },
      },
    ],

    dataZoom: [
      {
        type: "slider",
        xAxisIndex: 0,
        height: 18,
        brushSelect: false,
         borderColor: '#0000',
            handleStyle: {
              color: "#fff",
                opacity: 0.5,
        },
      },

      {
        type: "slider",
        yAxisIndex: 0,
        width: 18,
        showDataShadow: false,
      fillerColor: 'rgba(19,255,241)',
      borderRadius:50,
      moveHandleSize: 100,
        moveHandleStyle: {},
        brushSelect: false,
      handleSize: '95%',
      handleIcon:'path://M512,512m-448,0a448,448,0,1,0,896,0a448,448,0,1,0,-896,0Z',
      handleStyle: {
        borderWidth: 0,
        color: 'rgba(19,255,241,1)',
          // borderCap: 'round'
        },
      },

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
    // color: ["#33E392"],
    xAxis: [
      {
        type: "category",
        position: "bottom",
        data: props.createtime,
        scale: true,
        axisLine: {
          lineStyle: {
            color: "#ccc",
          },
        },
        boundaryGap: false,
        // axisLabel: {
        //   show: true,
        //   formatter: function (value) {
        //     // Find the index of the current value in regularX
        //     const index = regularX.findIndex((x) => ((x-value)<10));
        //     // Return the corresponding label from regularX
        //       return regularX[index]
        //   },
        // },
      },
    ],

    yAxis: [
      {
        type: "value",
        scale: false,

        axisLine: {
          lineStyle: {
            color: "#ccc",
          },
        },
        axisLabel: {
          show: true,
          color: "#ccc",
          formatter: function (value) {
            return value + "°";
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
    series: [
      {
        type: "line",
        data: props.tmp,
        // areaStyle: {
        //   opacity: 1,
        //   color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
        //     {
        //       offset: 0,
        //       color: "RGBA(51, 227, 146, 1)",
        //     },
        //     {
        //       offset: 1,
        //       color: "RGBA(51, 227, 146, 0.05)",
        //     },
        //   ]),
        // },

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


watch(
	() => props.tmp,
	() => {
		renderChart()
	}
)

// window.onresize = function(){mChart.resize()}
</script>

<style lang="scss" scoped>
</style>
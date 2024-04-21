<template>
  <div>
    <div ref="target" class="w-full h-full"></div>
  </div>
</template>

<script setup>
import { onMounted, ref, watch } from "vue";
import * as echarts from "echarts";

const props = defineProps({
  xdisrms: {
    type: Array,
    // required: true,
    default: () => [],
  },
  ydisrms: {
    type: Array,
    // required: true,
    default: () => [],
  },
  zdisrms: {
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
let mChart = null;
const target = ref(null);
onMounted(() => {
  mChart = echarts.init(target.value);
  renderChart();
});

const renderChart = () => {
  const options = {
    title: {
      text: "▎位移",
      left: 20,
      top: 20,
      textStyle: {
        color: "#fff",
      },
    },
    dataZoom: [
      // 控制区域缩放效果的实现
      {
        // type: 'slider', // 缩放的类型  slide代表滑块  inside代表依靠鼠标滚轮
        type: "inside",
        xAxisIndex: 0,
      },
      {
        type: "inside",
        yAxisIndex: 0,
        //   start: 0, // 渲染完成后, 数据筛选的初始值, 百分比
        //   end: 80 // 渲染完成后, 数据筛选的结束值, 百分比
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
    legend: {
      bottom:0,
      textStyle: {
        color: "#eee",
      }
    },
    
    //   grid: {
    //     show: true,
    // borderColor: 'red',
    //   },
    // visualMap: [
    //   {
    //     show: false,
    //     type: "continuous",
    //     // seriesIndex: 0,
    //     min: 0,
    //     max: 1000,
    //     inRange: {
    //       color: ["#33E392",'yellow', "red"],
    //     },
    //   },
    // ],

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
      },
    ],

    yAxis: [
      {
        type: "value",
        scale: true,

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
        name: "X轴位移RMS平均值",
        type: "line",
        data: props.xdisrms,
        areaStyle: {
          color: new echarts.graphic.LinearGradient(
            0,
            0,
            0,
            1,
            [
              {
                offset: 0,
                color: "rgba(19,255,241,.4)", // 渐变色的起始颜色
              },
              {
                offset: 0.9,
                color: "rgba(19,255,241,0)", // 渐变线的结束颜色
              },
            ],
            false
          ),
          shadowColor: "rgba(0, 0, 0, 0.1)",
        },
        // 开始不显示拐点， 鼠标经过显示
        showSymbol: false,
        symbolSize: 8,
        // 设置拐点颜色以及边框
        itemStyle: {
          color: "rgba(19,255,241,1)",
        },
        emphasis: {
          focus: "series",
        },
        backgroundStyle: {
          color: "rgba(180, 180, 180, 0.2)",
        },
      },
      {
        name: "Y轴位移RMS平均值",
        type: "line",
        data: props.ydisrms,
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: "#F02FC2",
            },
            {
              offset: 1,
              color: "rgba(180, 180, 180, 0.2)",
            },
          ]),
        },
        itemStyle: {
          color: "#F02FC2",
        },
        emphasis: {
          focus: "series",
        },
        backgroundStyle: {
          color: "rgba(180, 180, 180, 0.2)",
        },
      },
      {
        name: "Z轴位移RMS平均值",
        type: "line",
        data: props.zdisrms,
        areaStyle: {
          color: new echarts.graphic.LinearGradient(
            0,
            0,
            0,
            1,
            [
              {
                offset: 0,
                color: "rgba(241,162,42,.4)", // 渐变色的起始颜色
              },
              {
                offset: 0.9,
                color: "rgba(241,162,42,0)", // 渐变线的结束颜色
              },
            ],
            false
          ),
          shadowColor: "rgba(0, 0, 0, 0.1)",
        },
        // 开始不显示拐点， 鼠标经过显示
        showSymbol: false,
        symbolSize: 4,
        // 设置拐点颜色以及边框
        itemStyle: {
          color: "rgba(241,162,42,1)",
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


watch(
	() => props.createtime,
	() => {
		renderChart()
	}
)

</script>

<style lang="scss" scoped>
</style>
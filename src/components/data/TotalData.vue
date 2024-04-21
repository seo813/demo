<template>
  <div class="p-6">
    <div class="text-slate-300 text-center">
      <span
        ref="totalCountTarget"
        class="text-4xl text-center ml-2 mr-2 font-bold font-[Electronic] text-gradient"
      >
        海上风机齿轮箱智能物联网监控平台
      </span>
    </div>
    <div class="text-slate-300 text-center">
      数据总量：
      <span
        ref="totalCountTarget"
        class="text-7xl ml-2 mr-2 font-bold font-[Electronic] text-gradient"
      >
        679,473,929
      </span>
      条记录
    </div>

    <div class="header">
      <el-select v-model="value" placeholder="请选择" class="select" @change="viewChange">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option> 
        </el-select>
      <button type="button" class="button" @click="handleClick">
        <svg class="icon" style="width: 32px">
          <use xlink:href="#icon-backstage"></use>
        </svg>
      </button>
    </div>
  </div>
</template>



<script setup>
import { onMounted, ref } from "vue";
import { CountUp } from "countup.js";

import { useRouter } from "vue-router";
const router = useRouter();

const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
});

const value = ref(0);
const options = ref([
  { label: "时域", value: 0 },
  { label: "频域", value: 1 },
]);


const totalCountTarget = ref(null);

const handleClick = () => {
  router.push("/admin");
};

const viewChange = (val) => {
  console.log(val);
  if (val === 1) {
    router.push("/data/time");
  }
  else if (val === 0) {
    router.push("/data/frequency");
  }
}

onMounted(() => {
  new CountUp(totalCountTarget.value, props.data.total).start();
});
</script>



<style lang="scss" scoped>
.button {
  background: transparent;
}

.select {
  width: 150px;
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>

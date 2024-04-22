<script setup>

// 导入Edit和Delete图标
import { Edit, Delete } from "@element-plus/icons-vue";

// 导入ElMessage和ElMessageBox消息提示组件
import { ElMessage, ElMessageBox } from "element-plus";

// 导入useDeviceStore函数，用于获取设备信息的状态管理
import { useDeviceStore } from "@/stores/device.js";

// 导入ref函数，用于创建响应式引用
import { ref } from "vue";
import {
  getDeviceInfoI,
  addDeviceInfoI,
  updateDeviceInfoI,
  deleteDeviceInfoI,
} from "@/api/deviceInfo.js";
import { data } from "autoprefixer";


const num = ref(123);

// 定义deviceStore,用于获取设备信息的状态管理
const deviceStore = useDeviceStore();

// 用于处理表格点击事件
const handleRowClick = (row) => {
  deviceStore.device.deviceid = row.deviceid;
  dialogVisible.value = false;
};

// 定义一个空的handleChange方法
const handleChange = () => {};

//设备信息列表
const deviceInfoList = ref();


//用户搜索时选中的分类id
const windfarmid = ref("");

//用户搜索时选中的发布状态
const state = ref("");


//控制添加分类弹窗
const dialogVisible = ref(false);

const title = ref("");
//分页条数据模型
const page = ref(1); //当前页
const total = ref(20); //总条数
const pageSize = ref(10); //每页条数

//当每页条数发生了变化，调用此函数
const onSizeChange = (size) => {
  pageSize.value = size;
  getDeviceInfo();
};
//当前页码发生变化，调用此函数
const onCurrentChange = (num) => {
  page.value = num;
  getDeviceInfo();
};

// 对获取到的设备信息进行格式化处理
const formatDate = (data) => {
  // 用于将传入的数据中的updatetime和createtime字段的"T"替换为" "
  return data.map((item) => {
    return {
      // 将item对象的所有属性都解构出来
      ...item,
      updatetime: item.updatetime ? item.updatetime.replace("T", " ") : null,
      createtime: item.createtime.replace("T", " "),
    };
  });
};

// 定义getDeviceInfo异步函数,用于获取设备信息
const getDeviceInfo = async () => {
  let params = {
    page: page.value,
    pageSize: pageSize.value,
    windfarmid: windfarmid.value ? windfarmid.value : null,
    state: state.value ? state.value : null,
  };
  let result = await getDeviceInfoI(params);

  const formatdata = formatDate(result.data.rows);
  deviceInfoList.value = formatdata;
  total.value = result.data.total;
  console.log(deviceInfoList.updatetime);
};

// 获取设备信息
getDeviceInfo();
</script>

<template>
  <!-- 使用 el-card 组件创建一个卡片容器 -->
  <el-card class="page-container">
    <!-- 定义一个名为 header 的插槽 -->
    <template #header>
      <!-- 创建一个 div 元素，用于显示标题栏内容 -->
      <div class="header">
        <strong>设备参数设置</strong>
        <!-- 用于显示当前选择的设备信息 -->
        <div class="header">
          <div style="margin-right: 20px">
            <span>当前选择设备为: </span>
            <span>{{ displayedDeviceId }}</span>
            <el-tag type="primary" size="large"  style="font-size: 15px">{{ deviceStore.device.deviceid }}</el-tag>
          </div>
          <el-button type="primary" @click="dialogVisible = true"
            >更换设备</el-button
          >
        </div>
      </div>
    </template>
    <!-- 文章列表 -->
    <!-- <el-table :data="articles" style="width: 100%">
            <el-table-column label="文章标题" width="400" prop="title"></el-table-column>
            <el-table-column label="分类" prop="categoryId"></el-table-column>
            <el-table-column label="发表时间" prop="createTime"> </el-table-column>
            <el-table-column label="状态" prop="state"></el-table-column>
            <el-table-column label="操作" width="100">
                <template #default="{ row }">
                    <el-button :icon="Edit" circle plain type="primary"></el-button>
                    <el-button :icon="Delete" circle plain type="danger"></el-button>
                </template>
            </el-table-column>
            <template #empty>
                <el-empty description="没有数据" />
            </template>
        </el-table> -->
    <!-- 使用 Element UI 的表单组件（el-form） -->
    <el-form
      :inline="true"
      class="demo-form-inline"
      label-width="290px"
      size="default"
    >
      <el-form-item label="振动速度高通截止频率">
        <!-- 输入框组件（el-input-number） -->
        <el-input-number
          v-model="num"
          :min="0"
          :max="65535"
          @change="handleChange"
        />
      </el-form-item>
      <el-form-item label="振动速度低通截止频率">
        <el-input-number
          v-model="num"
          :min="0"
          :max="65535"
          @change="handleChange"
        />
        <!-- @change:事件监听器,当输入框的值发生改变是调用handleChange函数 -->
      </el-form-item>
      <el-form-item label="振动加速度高通截止频率">
        <el-input-number
          v-model="num"
          :min="0"
          :max="65535"
          @change="handleChange"
        />
      </el-form-item>
      <el-form-item label="振动加速度低通截止频率">
        <el-input-number
          v-model="num"
          :min="0"
          :max="65535"
          @change="handleChange"
        />
      </el-form-item>
      <el-form-item label="转速值">
        <el-input-number
          v-model="num"
          :min="0"
          :max="65535"
          @change="handleChange"
        />
      </el-form-item>
      <el-form-item label="传动比">
        <el-input-number
          v-model="num"
          :min="0"
          :max="65535"
          @change="handleChange"
        />
      </el-form-item>
      <el-form-item label="关注点1转频倍数（x100）">
        <el-input-number
          v-model="num"
          :min="0"
          :max="65535"
          @change="handleChange"
        />
      </el-form-item>
      <el-form-item label="关注点2转频倍数（x100）">
        <el-input-number
          v-model="num"
          :min="0"
          :max="65535"
          @change="handleChange"
        />
      </el-form-item>
      <el-form-item label="关注点3转频倍数（x100）">
        <el-input-number
          v-model="num"
          :min="0"
          :max="65535"
          @change="handleChange"
        />
      </el-form-item>
      <el-form-item label="关注点4转频倍数（x100）">
        <el-input-number
          v-model="num"
          :min="0"
          :max="65535"
          @change="handleChange"
        />
      </el-form-item>
      <el-form-item label="关注点5转频倍数（x100）">
        <el-input-number
          v-model="num"
          :min="0"
          :max="65535"
          @change="handleChange"
        />
      </el-form-item>
      <el-form-item label="关注点6转频倍数（x100）">
        <el-input-number
          v-model="num"
          :min="0"
          :max="65535"
          @change="handleChange"
        />
      </el-form-item>
      <el-form-item label="关注点7转频倍数（x100）">
        <el-input-number
          v-model="num"
          :min="0"
          :max="65535"
          @change="handleChange"
        />
      </el-form-item>
      <el-form-item label="关注点8转频倍数（x100）">
        <el-input-number
          v-model="num"
          :min="0"
          :max="65535"
          @change="handleChange"
        />
      </el-form-item>
      <el-form-item label="关注带1起始点转频倍数（x100）">
        <el-input-number
          v-model="num"
          :min="0"
          :max="65535"
          @change="handleChange"
        />
      </el-form-item>
      <el-form-item label="关注带1结束点转频倍数（x100）">
        <el-input-number
          v-model="num"
          :min="0"
          :max="65535"
          @change="handleChange"
        />
      </el-form-item>
      <el-form-item label="关注带2起始点转频倍数（x100）">
        <el-input-number
          v-model="num"
          :min="0"
          :max="65535"
          @change="handleChange"
        />
      </el-form-item>
      <el-form-item label="关注带2结束点转频倍数（x100）">
        <el-input-number
          v-model="num"
          :min="0"
          :max="65535"
          @change="handleChange"
        />
      </el-form-item>
      <el-form-item label="关注带3起始点转频倍数（x100）">
        <el-input-number
          v-model="num"
          :min="0"
          :max="65535"
          @change="handleChange"
        />
      </el-form-item>
      <el-form-item label="关注带3结束点转频倍数（x100）">
        <el-input-number
          v-model="num"
          :min="0"
          :max="65535"
          @change="handleChange"
        />
      </el-form-item>
      <el-form-item label="关注带4起始点转频倍数（x100）">
        <el-input-number
          v-model="num"
          :min="0"
          :max="65535"
          @change="handleChange"
        />
      </el-form-item>
      <el-form-item label="关注带4结束点转频倍数（x100）">
        <el-input-number
          v-model="num"
          :min="0"
          :max="65535"
          @change="handleChange"
        />
      </el-form-item>
      <el-form-item label="关注带5起始点转频倍数（x100）">
        <el-input-number
          v-model="num"
          :min="0"
          :max="65535"
          @change="handleChange"
        />
      </el-form-item>
      <el-form-item label="关注带5结束点转频倍数（x100）">
        <el-input-number
          v-model="num"
          :min="0"
          :max="65535"
          @change="handleChange"
        />
      </el-form-item>
      <el-form-item label="滚子数（x1）">
        <el-input-number
          v-model="num"
          :min="0"
          :max="65535"
          @change="handleChange"
        />
      </el-form-item>
      <el-form-item label="滚动体直径（x100cm）">
        <el-input-number
          v-model="num"
          :min="0"
          :max="65535"
          @change="handleChange"
        />
      </el-form-item>
      <el-form-item label="轴承节径（x100cm）">
        <el-input-number
          v-model="num"
          :min="0"
          :max="65535"
          @change="handleChange"
        />
      </el-form-item>
      <el-form-item label="α接触角（x100度）">
        <el-input-number
          v-model="num"
          :min="0"
          :max="65535"
          @change="handleChange"
        />
      </el-form-item>
      <el-form-item label="叶片数/叶轮数/输入侧齿数（x1）">
        <el-input-number
          v-model="num"
          :min="0"
          :max="65535"
          @change="handleChange"
        />
      </el-form-item>
      <el-form-item label="诊断场景（1-电机+风机，2-电机+水泵；3-电机+齿轮箱）">
        <el-input-number
          v-model="num"
          :min="0"
          :max="65535"
          @change="handleChange"
        />
      </el-form-item>
      <el-form-item label="诊断类型（1-电机，2-电机驱动设备）">
        <el-input-number
          v-model="num"
          :min="0"
          :max="65535"
          @change="handleChange"
        />
      </el-form-item>
      <el-form-item label="X轴振动加速度预警门限（x100m/S^2）">
        <el-input-number
          v-model="num"
          :min="0"
          :max="65535"
          @change="handleChange"
        />
      </el-form-item>
      <el-form-item label="X轴振动加速度报警门限（x100m/S^2）">
        <el-input-number
          v-model="num"
          :min="0"
          :max="65535"
          @change="handleChange"
        />
      </el-form-item>
      <el-form-item label="Y轴振动加速度预警门限（x100m/S^2）">
        <el-input-number
          v-model="num"
          :min="0"
          :max="65535"
          @change="handleChange"
        />
      </el-form-item>
      <el-form-item label="关注带5起始点转频倍数（x100）">
        <el-input-number
          v-model="num"
          :min="0"
          :max="65535"
          @change="handleChange"
        />
      </el-form-item>
      <el-form-item label="Y轴振动加速度报警门限（x100m/S^2）">
        <el-input-number
          v-model="num"
          :min="0"
          :max="65535"
          @change="handleChange"
        />
      </el-form-item>
      <el-form-item label="Z轴振动加速度预警门限（x100m/S^2）">
        <el-input-number
          v-model="num"
          :min="0"
          :max="65535"
          @change="handleChange"
        />
      </el-form-item>
      <el-form-item label="Z轴振动加速度报警门限（x100m/S^2）">
        <el-input-number
          v-model="num"
          :min="0"
          :max="65535"
          @change="handleChange"
        />
      </el-form-item>
      <el-form-item label="X轴振动速度预警门限（x100mm/S）">
        <el-input-number
          v-model="num"
          :min="0"
          :max="65535"
          @change="handleChange"
        />
      </el-form-item>
      <el-form-item label="X轴振动速度报警门限（x100mm/S）">
        <el-input-number
          v-model="num"
          :min="0"
          :max="65535"
          @change="handleChange"
        />
      </el-form-item>
      <el-form-item label="Y轴振动速度预警门限（x100mm/S）">
        <el-input-number
          v-model="num"
          :min="0"
          :max="65535"
          @change="handleChange"
        />
      </el-form-item>
      <el-form-item label="关注带5起始点转频倍数（x100）">
        <el-input-number
          v-model="num"
          :min="0"
          :max="65535"
          @change="handleChange"
        />
      </el-form-item>
      <el-form-item label="Y轴振动速度报警门限（x100mm/S）">
        <el-input-number
          v-model="num"
          :min="0"
          :max="65535"
          @change="handleChange"
        />
      </el-form-item>
      <el-form-item label="Z轴振动速度预警门限（x100mm/S）">
        <el-input-number
          v-model="num"
          :min="0"
          :max="65535"
          @change="handleChange"
        />
      </el-form-item>
      <el-form-item label="Z轴振动速度报警门限（x100mm/S）">
        <el-input-number
          v-model="num"
          :min="0"
          :max="65535"
          @change="handleChange"
        />
      </el-form-item>
      <el-form-item label="温度预警门限(x100℃)">
        <el-input-number
          v-model="num"
          :min="0"
          :max="65535"
          @change="handleChange"
        />
      </el-form-item>
      <el-form-item label="温度报警门限(x100℃)">
        <el-input-number
          v-model="num"
          :min="0"
          :max="65535"
          @change="handleChange"
        />
      </el-form-item>
      <el-form-item label="X轴振动位移预警门限（x100um）">
        <el-input-number
          v-model="num"
          :min="0"
          :max="65535"
          @change="handleChange"
        />
      </el-form-item>
      <el-form-item label="X轴振动位移报警门限（x100um）">
        <el-input-number
          v-model="num"
          :min="0"
          :max="65535"
          @change="handleChange"
        />
      </el-form-item>
      <el-form-item label="Y轴振动位移预警门限（x100um）">
        <el-input-number
          v-model="num"
          :min="0"
          :max="65535"
          @change="handleChange"
        />
      </el-form-item>
      <el-form-item label="Y轴振动位移报警门限（x100um）">
        <el-input-number
          v-model="num"
          :min="0"
          :max="65535"
          @change="handleChange"
        />
      </el-form-item>
      <el-form-item label="Z轴振动位移预警门限（x100um）">
        <el-input-number
          v-model="num"
          :min="0"
          :max="65535"
          @change="handleChange"
        />
      </el-form-item>
      <el-form-item label="Z轴振动位移报警门限（x100um）">
        <el-input-number
          v-model="num"
          :min="0"
          :max="65535"
          @change="handleChange"
        />
      </el-form-item>
      <el-form-item label="振动位移高通截止频率">
        <el-input-number
          v-model="num"
          :min="0"
          :max="65535"
          @change="handleChange"
        />
      </el-form-item>
      <el-form-item label="振动位移低通截止频率">
        <el-input-number
          v-model="num"
          :min="0"
          :max="65535"
          @change="handleChange"
        />
      </el-form-item>
      <el-form-item label="时域数据计算周期">
        <el-input-number
          v-model="num"
          :min="0"
          :max="65535"
          @change="handleChange"
        />
      </el-form-item>
      <el-form-item label="波特率">
        <el-select v-model="value" placeholder="Activity zone" clearable>
          <el-option label="Zone one" value="shanghai" />
          <el-option label="Zone two" value="beijing" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">设置</el-button>
      </el-form-item>
    </el-form>


    <!-- 更换设备弹窗 -->
    <el-drawer
      v-model="dialogVisible"
      :title="title"
      size="50%"
      :with-header="false"
    >
      <el-form inline>
        <el-form-item label="所属风电场：">
          <el-select v-model="value" placeholder="请选择">
            <el-option label="01" value="01"></el-option>
            <el-option label="02" value="02"></el-option>
            <el-option label="03" value="03"></el-option>
            <el-option label="04" value="04"></el-option>
            <el-option label="05" value="05"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="设备状态：" width="800">
          <el-select placeholder="请选择" v-model="state">
            <option>{{label}}</option>
            <el-option label="运行中" value="0"></el-option>
            <el-option label="维修中" value="1"></el-option>
            <el-option label="预警中" value="2"></el-option>
            <el-option label="报警中" value="3"></el-option>
            <el-option label="离线中" value="4"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="getDeviceInfo">搜索</el-button>
          <el-button @click="(windfarmid = ''), (state = '')">重置</el-button>
        </el-form-item>
      </el-form>
      <el-table
        :data="deviceInfoList"
        style="width: 100%"
        stripe="true"
        @row-click="handleRowClick"
      >
        <el-table-column
          label="设备编号"
          width="100"
          prop="deviceid"
        ></el-table-column>
        <el-table-column
          label="风电场编号"
          prop="windfarmid"
          width="150"
          align="center"
        ></el-table-column>
        <el-table-column label="运行状态" prop="state" width="120">
          <template #default="{ row }">
            <el-tag type="success" v-if="row.state == '0'">运行中</el-tag>
            <el-tag type="danger" v-else-if="row.state == '1'">维修中</el-tag>
            <el-tag type="warning" v-else-if="row.state == '2'">预警中</el-tag>
            <el-tag type="danger" v-else-if="row.state == '3'">报警中</el-tag>
            <el-tag type="info" v-else-if="row.state == '4'">离线中</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="投入时间" prop="createtime"> </el-table-column>
        <el-table-column label="维修时间" prop="updatetime"> </el-table-column>

        <template #empty>
          <el-empty description="没有数据" />
        </template>
      </el-table>
      <!-- 分页条 -->
      <el-pagination
        v-model:current-page="pageNum"
        v-model:page-size="pageSize"
        :page-sizes="[3, 5, 10, 15]"
        layout="jumper, total, sizes, prev, pager, next"
        background
        :total="total"
        @size-change="onSizeChange"
        @current-change="onCurrentChange"
        style="margin-top: 20px; justify-content: flex-end"
      />
    </el-drawer>
  </el-card>
</template>


<style lang="scss" scoped>
.page-container {
  min-height: 100%;
  box-sizing: border-box;
  border-radius: 15px;

  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
}

.font-size {
  font-size: 16px; /* 初始字体大小为16像素 */
}

.el-input-number {
  width: 130px; /* Set width to 200px */
}
</style>

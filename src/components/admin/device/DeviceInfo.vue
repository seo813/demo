<script setup>
import { Edit, Delete } from "@element-plus/icons-vue";

import { ElMessage, ElMessageBox } from "element-plus";

import { ref } from "vue";
import {
  getDeviceInfoI,
  addDeviceInfoI,
  updateDeviceInfoI,
  deleteDeviceInfoI,
} from "@/api/deviceInfo.js";
import { alertI } from "@/api/maintainer.js";

const deviceInfoList = ref();

const deviceInfoData = ref({
  deviceid: "",
  windfarmid: "",
  state: "",
  createtime: "",
  updatetime: "",
});

const alertData = ref({
  deviceid: "",
  number: "",
  name: "",
  phone: "",
  email: "",
  state: "预警",
  warnning: "",
});

const options = ref([
  { label: "运行中", value: 0 },
  { label: "维修中", value: 1 },
  { label: "预警中", value: 2 },
  { label: "报警中", value: 3 },
  { label: "离线中", value: 4 },
]);

const alert_options = ref([
  { label: " 预警 ", value: " 预警 " },
  { label: " 报警 ", value: " 报警 " },
]);

const showAlert = (row) => {
  alertVisible.value = true;
  title.value = "短信报警";

  alertData.value = {
    deviceid: row.deviceid,
    number: "2021106143038",
    name: "潘黄楠",
    phone: "13119620569",
    email: "1689505428@qq.com",
    state: " 报警 ",
    warnning: "",
  };
};

const alert = async () => {
  let result = await alertI(alertData.value);
  console.log(result);
  console.log("dadadadad");
  ElMessage.success("报警成功");
  getDeviceInfo();
  alertVisible.value = false;
};

//用户搜索时选中的分类id
const windfarmid = ref("");

//用户搜索时选中的发布状态
const state = ref("");

//控制添加分类弹窗
const dialogVisible = ref(false);
const alertVisible = ref(false);
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

const showDialog = (row) => {
  dialogVisible.value = true;
  title.value = "编辑设备";

  deviceInfoData.value = {
    deviceid: row.deviceid,
    windfarmid: row.windfarmid,
    state: row.state,
    createtime: row.createtime,
    updatetime: row.updatetime,
  };
};

const clearData = () => {
  deviceInfoData.value = {
    deviceid: "",
    windfarmid: "",
    state: "",
    createtime: "",
    updatetime: "",
  };
};
// const formatDate = (data)=> {
//   return data.map(item => {
//     const Time = new Date(item.createtime);
//     const year = Time.getFullYear();
//     const month = Time.getMonth() + 1; // 月份从0开始
//     const day = Time.getDate();
//     const hours = Time.getHours();
//     const minutes = Time.getMinutes();
//     const seconds = Time.getSeconds();
//     return {
//       ...item,
//       createtime: `${year}/${month}/${day}          ${hours}:${minutes}:${seconds}`
//     };
//   });
// }

const formatDate = (data) => {
  return data.map((item) => {
    //     const [date, time] = item.createtime.split("T");
    // const[y,m,d] = date.split("-");
    // const[h,min,s] = time.split(":");
    // const formattedTime = `${y}-${m}-${d} ${h}:${min}:${s}`;
    // // const formattedTime = `${y}年${m}月${d}日 ${h}:${min}:${s}`;
    // // const formattedTime = `${y}年${m}月${d}日 ${h}时${min}分${s}秒`;
    // return {
    //   ...item,
    //   createtime: formattedTime
    // };
    return {
      ...item,
      updatetime: item.updatetime ? item.updatetime.replace("T", " ") : null,
      createtime: item.createtime.replace("T", " "),
    };
  });
};

const getDeviceInfo = async () => {
  let params = {
    page: page.value,
    pageSize: pageSize.value,
    windfarmid: windfarmid.value ? windfarmid.value : null,
    state: state.value ? state.value : null,
  };
  let result = await getDeviceInfoI(params);

  const formatdata = formatDate(result.data.rows);
  // deviceInfo.value.createtime = res_data.map((item) => {
  //   const [date, time] = item.createtime.replace('T', ' ');
  //   return time;
  // });
  deviceInfoList.value = formatdata;
  total.value = result.data.total;
  console.log(deviceInfoList.updatetime);
};

const formatDatetime = () => {
  if (typeof deviceInfoData.value.createtime === "string") {
    const givenDateString = deviceInfoData.value.createtime;
    const givenDate = new Date(givenDateString);
    deviceInfoData.value.createtime = givenDate;
  }
  if (typeof deviceInfoData.value.updatetime === "string") {
    const givenDateString = deviceInfoData.value.updatetime;
    const givenDate = new Date(givenDateString);
    deviceInfoData.value.updatetime = givenDate;
  }

  const givenDate = deviceInfoData.value.createtime;
  const timezoneOffset = givenDate.getTimezoneOffset() / 60;
  const gmt0Date = new Date(givenDate.getTime() - timezoneOffset * 3600000);
  deviceInfoData.value.createtime = gmt0Date;

  if (deviceInfoData.value.updatetime != null) {
    const givenDate = deviceInfoData.value.updatetime;
    const timezoneOffset = givenDate.getTimezoneOffset() / 60;
    const gmt0Date = new Date(givenDate.getTime() - timezoneOffset * 3600000);
    deviceInfoData.value.updatetime = gmt0Date;
  }
};

const addDeviceInfo = async () => {
  formatDatetime();
  let result = await addDeviceInfoI(deviceInfoData.value);
  console.log(result);
  ElMessage.success("添加成功");
  getDeviceInfo();
  dialogVisible.value = false;
};

const updateDeviceInfo = async () => {
  formatDatetime();

  let result = await updateDeviceInfoI(deviceInfoData.value);
  console.log(result);
  ElMessage.success("修改成功");
  getDeviceInfo();
  dialogVisible.value = false;
};

const deleteDeviceInfo = (row) => {
  ElMessageBox.confirm("您确定要删除该设备吗?", "温馨提示", {
    confirmButtonText: "确认",
    cancelButtonText: "取消",
    type: "warning",
  }).then(async () => {
    let result = await deleteDeviceInfoI(row.deviceid);
    ElMessage({
      type: "success",
      message: "删除成功",
    });
    getDeviceInfo();
  });
};

getDeviceInfo();
</script>

<template>
  <el-card class="page-container">
    <template #header>
      <div class="header">
        <strong>设备信息管理</strong>
        <div class="extra">
          <el-button
            type="primary"
            @click="
              dialogVisible = true;
              title = '添加账号';
              clearData();
            "
            >添加设备</el-button
          >
        </div>
      </div>
    </template>
    <!-- 搜索表单 -->
    <el-form inline>
      <el-form-item label="所属风电场：" width="800">
        <el-select placeholder="请选择" v-model="windfarmid">
          <el-option label="01" value="01"></el-option>
          <el-option label="02" value="02"></el-option>
          <el-option label="03" value="03"></el-option>
          <el-option label="04" value="04"></el-option>
          <el-option label="05" value="05"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="设备状态：" width="800">
        <el-select placeholder="请选择" v-model="state">
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
    <!-- 文章列表 -->
    <el-table :data="deviceInfoList" style="width: 100%">
      <el-table-column
        label="设备编号"
        width="200"
        prop="deviceid"
      ></el-table-column>
      <el-table-column label="风电场编号" prop="windfarmid"></el-table-column>
      <el-table-column label="运行状态" prop="state">
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
      <el-table-column label="操作" width="200">
        <template #default="{ row }">
          <el-button
            type="danger"
            size="default"
            circle
            plain
            @click="showAlert(row)"
            ><el-icon size="20"><WarnTriangleFilled /></el-icon
          ></el-button>
          <el-button
            :icon="Edit"
            circle
            plain
            type="primary"
            @click="showDialog(row)"
          ></el-button>
          <el-button
            :icon="Delete"
            circle
            plain
            type="danger"
            @click="deleteDeviceInfo(row)"
          ></el-button>
        </template>
      </el-table-column>
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

    <!-- 添加分类弹窗 -->
    <el-dialog v-model="dialogVisible" :title="title" width="30%">
      <el-form
        :model="deviceInfoData"
        :rules="rules"
        label-width="100px"
        style="padding-right: 30px"
      >
        <el-form-item label="设备编号" prop="deviceid">
          <el-input
            v-model="deviceInfoData.deviceid"
            minlength="1"
            maxlength="10"
          ></el-input>
        </el-form-item>
        <el-form-item label="风电场编号" prop="windfarmid">
          <el-input
            v-model="deviceInfoData.windfarmid"
            minlength="1"
            maxlength="15"
          ></el-input>
        </el-form-item>
        <el-form-item label="运行状态" prop="state">
          <el-select
            placeholder="请选择"
            v-model="deviceInfoData.state"
            :value-key="label"
          >
            <el-option
              v-for="option in options"
              :key="option.value"
              :label="option.label"
              :value="option.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="投入时间" prop="createtime">
          <el-date-picker
            v-model="deviceInfoData.createtime"
            type="datetime"
            value-format="YYYY-MM-DDTHH:mm:ss"
            placeholder="选择时间和日期"
          />
        </el-form-item>
        <el-form-item label="维修时间" prop="updatetime">
          <el-date-picker
            v-model="deviceInfoData.updatetime"
            type="datetime"
            value-format="YYYY-MM-DD HH:mm:ss"
            placeholder="选择时间和日期"
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button
            type="primary"
            @click="title == '添加账号' ? addDeviceInfo() : updateDeviceInfo()"
          >
            确认
          </el-button>
        </span>
      </template>
    </el-dialog>

    <!-- 报警短信弹窗 -->
    <el-dialog v-model="alertVisible" :title="title" width="30%">
      <el-form
        :model="alertData"
        :rules="rules"
        label-width="100px"
        style="padding-right: 30px"
      >
        <el-form-item label="工号" prop="number">
          <el-input
            v-model="alertData.number"
            minlength="1"
            maxlength="10"
          ></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="name">
          <el-input
            v-model="alertData.name"
            minlength="1"
            maxlength="15"
          ></el-input>
        </el-form-item>
        <el-form-item label="电话号码" prop="phone">
          <el-input
            v-model="alertData.phone"
            minlength="1"
            maxlength="15"
          ></el-input>
        </el-form-item>
        <el-form-item label="电子邮箱" prop="email">
          <el-input
            v-model="alertData.email"
            minlength="1"
            maxlength="30"
          ></el-input>
        </el-form-item>
        <el-form-item label="设备编号" prop="deviceid">
          <el-input
            v-model="alertData.deviceid"
            minlength="1"
            maxlength="10"
          ></el-input>
        </el-form-item>
        <el-form-item label="运行状态" prop="state">
          <el-select
            placeholder="请选择"
            v-model="alertData.state"
            :value-key="label"
          >
            <el-option
              v-for="option in alert_options"
              :key="option.value"
              :label="option.label"
              :value="option.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="状况" prop="warnning">
          <el-input
            v-model="alertData.warnning"
            minlength="1"
            maxlength="15"
          ></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="alertVisible = false">取消</el-button>
          <el-button type="primary" @click="alert"> 确认 </el-button>
        </span>
      </template>
    </el-dialog>
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
</style>

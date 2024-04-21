<script setup>
import { Edit, Delete } from "@element-plus/icons-vue";
import { ElMessage, ElMessageBox } from "element-plus";
import { ref } from "vue";
import {
  getMaintainerI,
  addMaintainerI,
  updateMaintainerI,
  deleteMaintainerI,
  alertI,
} from "@/api/maintainer.js";
import { useDeviceStore } from "@/stores/device.js";

const deviceStore = useDeviceStore();

//分页条数据模型
const pageNum = ref(1); //当前页
const total = ref(5); //总条数
const pageSize = ref(10); //每页条数

//用户搜索时选中的发布状态
const state = ref("");

//控制添加分类弹窗
const dialogVisible = ref(false);
const alertVisible = ref(false);
const title = ref("");

const maintainerList = ref();

const maintainerData = ref({
  number: "",
  name: "",
  phone: "",
  email: "",
  state: "",
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
  { label: "空闲中", value: 0 },
  { label: "维修中", value: 1 },
  { label: "休息中", value: 2 },
]);

const alert_options = ref([
  { label: " 预警 ", value: " 预警 " },
  { label: " 报警 ", value: " 报警 " },
]);

//当每页条数发生了变化，调用此函数
const onSizeChange = (size) => {
  pageSize.value = size;
};
//当前页码发生变化，调用此函数
const onCurrentChange = (num) => {
  pageNum.value = num;
};

const showDialog = (row) => {
  dialogVisible.value = true;
  title.value = "编辑维修人员";

  maintainerData.value = {
    number: row.number,
    name: row.name,
    phone: row.phone,
    email: row.email,
    state: row.state,
  };
};

const showAlert = (row) => {
  alertVisible.value = true;
  title.value = "短信报警";

  alertData.value = {
    deviceid: deviceStore.device.deviceid,
    number: row.number,
    name: row.name,
    phone: row.phone,
    email: row.email,
    state: " 报警 ",
    warnning: "",
  };
};

const clearData = () => {
  maintainerData.value = {
    number: "",
    name: "",
    phone: "",
    email: "",
    state: "",
  };
};

const getMaintainer = async () => {
  let result = await getMaintainerI();
  maintainerList.value = result.data;
  console.log(maintainerList.value);
  console.log("dadadadad");
  //   total.value = result.data.total;
};

const addMaintainer = async () => {
  let result = await addMaintainerI(maintainerData.value);
  console.log(result);
  console.log("dadadadad");
  ElMessage.success("添加成功");
  getMaintainer();
  dialogVisible.value = false;
};

const updateMaintainer = async () => {
  let result = await updateMaintainerI(maintainerData.value);
  console.log(result);
  ElMessage.success("修改成功");
  getMaintainer();
  dialogVisible.value = false;
};

const deleteMaintainer = (row) => {
  ElMessageBox.confirm("您确定要删除该维修人员吗?", "温馨提示", {
    confirmButtonText: "确认",
    cancelButtonText: "取消",
    type: "warning",
  }).then(async () => {
    let result = await deleteMaintainerI(row.number);
    ElMessage({
      type: "success",
      message: "删除成功",
    });
    getMaintainer();
  });
};

const alert = async () => {
  let result = await alertI(alertData.value);
  console.log(result);
  console.log("dadadadad");
  ElMessage.success("报警成功");
  getMaintainer();
  alertVisible.value = false;
};

getMaintainer();
</script>

<template>
  <el-card class="page-container">
    <template #header>
      <div class="header">
        <strong>维修人员管理</strong>
        <div class="extra">
          <el-button
            type="primary"
            @click="
              dialogVisible = true;
              title = '添加维修人员';
              clearData();
            "
            >添加维修人员</el-button
          >
        </div>
      </div>
    </template>
    <!-- 搜索表单 -->
    <el-form inline>
      <el-form-item label="工作状态：">
        <el-select placeholder="请选择" v-model="state">
          <el-option label="空闲中" value="0"></el-option>
          <el-option label="维修中" value="1"></el-option>
          <el-option label="休息中" value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary">搜索</el-button>
        <el-button @click="state = ''">重置</el-button>
      </el-form-item>
    </el-form>
    <!-- 文章列表 -->
    <el-table :data="maintainerList" style="width: 100%">
      <el-table-column label="工号" width="250" prop="number"></el-table-column>
      <el-table-column
        label="维修人员姓名"
        width="250"
        prop="name"
      ></el-table-column>
      <el-table-column label="电话号码" prop="phone"> </el-table-column>
      <el-table-column label="电子邮箱" prop="email"> </el-table-column>
      <el-table-column label="工作状态" prop="state"
        ><template #default="{ row }">
          <el-tag type="success" v-if="row.state == '0'">空闲中</el-tag>
          <el-tag type="danger" v-else-if="row.state == '1'">维修中</el-tag>
          <el-tag type="info" v-else-if="row.state == '2'">休息中</el-tag>
        </template></el-table-column
      >
      <el-table-column label="操作" width="200">
        <template #default="{ row }">
          <el-button
            type="danger"
            size="default"
            circle
            plain
            @click="showAlert(row)"
            ><el-icon size="20"><ChatLineSquare /></el-icon
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
            @click="deleteMaintainer(row)"
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
        :model="maintainerData"
        :rules="rules"
        label-width="100px"
        style="padding-right: 30px"
      >
        <el-form-item label="工号" prop="number">
          <el-input
            v-model="maintainerData.number"
            minlength="1"
            maxlength="10"
          ></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="name">
          <el-input
            v-model="maintainerData.name"
            minlength="1"
            maxlength="15"
          ></el-input>
        </el-form-item>
        <el-form-item label="电话号码" prop="phone">
          <el-input
            v-model="maintainerData.phone"
            minlength="1"
            maxlength="15"
          ></el-input>
        </el-form-item>
        <el-form-item label="电子邮箱" prop="email">
          <el-input
            v-model="maintainerData.email"
            minlength="1"
            maxlength="30"
          ></el-input>
        </el-form-item>
        <el-form-item label="运行状态" prop="state">
          <el-select
            placeholder="请选择"
            v-model="maintainerData.state"
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
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button
            type="primary"
            @click="
              title == '添加维修人员' ? addMaintainer() : updateMaintainer()
            "
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

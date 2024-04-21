<script setup>
import { Edit, Delete } from "@element-plus/icons-vue";

import { ElMessage, ElMessageBox } from "element-plus";
import moment from "moment";
import { ref } from "vue";
import {
  getLogInfoI,
  addLogInfoI,
  updateLogInfoI,
  deleteLogInfoI,
} from "@/api/log.js";

//用户搜索时选中的分类id
const deviceid = ref("");

//用户搜索时选中的发布状态
const warnning = ref("");
const begin = ref("");
const end = ref("");

const logInfoList = ref();

const logInfoData = ref({
  id: "",
  deviceid: "",
  state: "",
  warnning: "",
  note: "",
  createtime: "",
});

const options = ref([
  { label: "预警", value: 0 },
  { label: "报警", value: 1 },
]);

const time_scope = ref();
const defaultTime = ref([
  new Date(2000, 1, 1, 0, 0, 0),
  new Date(2000, 2, 1, 0, 0, 0),
]);

//分页条数据模型
const page = ref(1); //当前页
const total = ref(20); //总条数
const pageSize = ref(15); //每页条数

//控制添加分类弹窗
const dialogVisible = ref(false);
const title = ref("");

//当每页条数发生了变化，调用此函数
const onSizeChange = (size) => {
  pageSize.value = size;
  getLogInfo();
};
//当前页码发生变化，调用此函数
const onCurrentChange = (num) => {
  page.value = num;
  getLogInfo();
};

const showDialog = (row) => {
  dialogVisible.value = true;
  title.value = "编辑日志";

  logInfoData.value = {
    id: row.id,
    deviceid: row.deviceid,
    warnning: row.warnning,
    state: row.state,
    note: row.note,
    createtime: row.createtime,
  };
};

const clearData = () => {
  logInfoData.value = {
    id: "",
    deviceid: "",
    state: "",
    warnning: "",
    note: "",
    createtime: "",
  };
};

const formatDate = (data) => {
  return data.map((item) => {
    return {
      ...item,
      createtime: item.createtime ? item.createtime.replace("T", " ") : null,
    };
  });
};

const getLogInfo = async () => {
    if (time_scope.value) {
        const parsedDate1 = moment(time_scope.value[0]);
        const parsedDate2 = moment(time_scope.value[1]);
        begin.value = parsedDate1.format('YYYY-MM-DD HH:mm:ss');
        end.value = parsedDate2.format('YYYY-MM-DD HH:mm:ss');
    }
  let params = {
    page: page.value,
    pageSize: pageSize.value,
    deviceid: deviceid.value ? deviceid.value : null,
    warnning: warnning.value ? warnning.value : null,
    begin: begin.value ? begin.value : null,
    end: end.value ? end.value : null,
  };
  let result = await getLogInfoI(params);
  const formatdata = formatDate(result.data.rows);
  logInfoList.value = formatdata;
  total.value = result.data.total;
  console.log(logInfoList.value);
};

const formatDatetime = () => {
  if (typeof logInfoData.value.createtime === "string") {
    const givenDateString = logInfoData.value.createtime;
    const givenDate = new Date(givenDateString);
    logInfoData.value.createtime = givenDate;
  }

  const givenDate = logInfoData.value.createtime;
  const timezoneOffset = givenDate.getTimezoneOffset() / 60;
  const gmt0Date = new Date(givenDate.getTime() - timezoneOffset * 3600000);
  logInfoData.value.createtime = gmt0Date;
};

const addLogInfo = async () => {
  formatDatetime();
  let result = await addLogInfoI(logInfoData.value);
  console.log(result);
  ElMessage.success("添加成功");
  getLogInfo();
  dialogVisible.value = false;
};

const updateLogInfo = async () => {
  formatDatetime();

  let result = await updateLogInfoI(logInfoData.value);
  console.log(result);
  ElMessage.success("修改成功");
  getLogInfo();
  dialogVisible.value = false;
};

const deleteLogInfo = (row) => {
  ElMessageBox.confirm("您确定要删除该设备吗?", "温馨提示", {
    confirmButtonText: "确认",
    cancelButtonText: "取消",
    type: "warning",
  }).then(async () => {
    let result = await deleteLogInfoI(row.id);
    ElMessage({
      type: "success",
      message: "删除成功",
    });
    getLogInfo();
  });
};

getLogInfo();
</script>

<template>
  <el-card class="page-container">
    <template #header>
      <div class="header">
        <strong>日志管理</strong>
        <div class="extra">
          <el-button
            type="primary"
            @click="
              dialogVisible = true;
              title = '添加日志';
              clearData();
            "
            >添加日志</el-button
          >
        </div>
      </div>
    </template>
    <!-- 搜索表单 -->
    <el-form inline>
      <el-form-item label="设备编号：">
        <el-input
          v-model="deviceid"
          minlength="1"
          maxlength="20"
          style="width: 100px"
        ></el-input>
      </el-form-item>

      <el-form-item label="状况：">
        <el-input v-model="warnning" minlength="1" maxlength="20"></el-input>
      </el-form-item>
      <el-form-item>
        <div class="block">
          <el-date-picker
            v-model="time_scope"
            type="datetimerange"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :default-time="defaultTime"
          >
          </el-date-picker>
        </div>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="getLogInfo">搜索</el-button>
        <el-button @click="(deviceid = ''), (warnning = '')">重置</el-button>
      </el-form-item>
    </el-form>
    <!-- 日志列表 -->
    <el-table :data="logInfoList" style="width: 100%">
      <el-table-column label="序号" width="100" prop="id"></el-table-column>
      <el-table-column label="设备编号" prop="deviceid"></el-table-column>
      <el-table-column label="程度" prop="state">
        <template #default="{ row }">
          <el-tag type="warning" v-if="row.state == '0'">预警</el-tag>
          <el-tag type="danger" v-else-if="row.state == '1'">报警</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="状况" prop="warnning"></el-table-column>
      <el-table-column label="备注" prop="note"> </el-table-column
      ><el-table-column label="创建时间" prop="createtime"> </el-table-column>
      <el-table-column label="操作" width="100">
        <template #default="{ row }">
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
            @click="deleteLogInfo(row)"
          ></el-button>
        </template>
      </el-table-column>
      <template #empty>
        <el-empty description="没有数据" />
      </template>
    </el-table>
    <!-- 分页条 -->
    <el-pagination
      v-model:current-page="page"
      v-model:page-size="pageSize"
      :page-sizes="[3, 5, 10, 15]"
      layout="jumper, total, sizes, prev, pager, next"
      background
      :total="total"
      @size-change="onSizeChange"
      @current-change="onCurrentChange"
      style="margin-top: 20px; justify-content: flex-end"
    />

    <!-- 添加日志弹窗 -->
    <el-dialog v-model="dialogVisible" :title="title" width="30%">
      <el-form
        :model="logInfoData"
        :rules="rules"
        label-width="100px"
        style="padding-right: 30px"
      >
        <el-form-item label="序号" prop="id">
          <el-input
            v-model="logInfoData.id"
            minlength="1"
            maxlength="10"
          ></el-input>
        </el-form-item>
        <el-form-item label="设备编号" prop="deviceid">
          <el-input
            v-model="logInfoData.deviceid"
            minlength="1"
            maxlength="10"
          ></el-input>
        </el-form-item>
        <el-form-item label="程度" prop="state">
          <el-select
            placeholder="请选择"
            v-model="logInfoData.state"
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
        <el-form-item label="状况" prop="warnning">
          <el-input
            v-model="logInfoData.warnning"
            minlength="1"
            maxlength="15"
          ></el-input>
        </el-form-item>
        <el-form-item label="备注" prop="note">
          <el-input
            v-model="logInfoData.note"
            minlength="1"
            maxlength="15"
          ></el-input>
        </el-form-item>
        <el-form-item label="投入时间" prop="createtime">
          <el-date-picker
            v-model="logInfoData.createtime"
            type="datetime"
            value-format="YYYY-MM-DDTHH:mm:ss"
            placeholder="选择时间和日期"
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button
            type="primary"
            @click="title == '添加日志' ? addLogInfo() : updateLogInfo()"
          >
            确认
          </el-button>
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

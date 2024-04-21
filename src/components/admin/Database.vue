<script setup>
import {
    Edit,
    Delete
} from '@element-plus/icons-vue'

import { ref } from 'vue'
import {
  getDatabaseI,
  addDatabaseI,
  updateDatabaseI,
  deleteDatabaseI,
} from "@/api/database.js";

//分页条数据模型
const pageNum = ref(1)//当前页
const total = ref(9)//总条数
const pageSize = ref(10)//每页条数

const databaseList = ref();

const databaseData = ref({
  name: "",
  total: "",
  comment: "",
  state: "",
});

const options = ref([
  { label: "运行中", value: 0 },
  { label: "离线中", value: 1 },
]);

//当每页条数发生了变化，调用此函数
const onSizeChange = (size) => {
    pageSize.value = size
}
//当前页码发生变化，调用此函数
const onCurrentChange = (num) => {
    pageNum.value = num
}

const getDatabase = async () => {
  let result = await getDatabaseI();
  databaseList.value = result.data;
  //   total.value = result.data.total;
};

getDatabase();
</script>



<template>
    <el-card class="page-container">
        <template #header>
            <div class="header">
                <strong>数据库管理</strong>
                <div class="extra">
                    <el-button type="primary">添加数据库</el-button>
                </div>
            </div>
        </template>
        <!-- 搜索表单 -->
        <!-- <el-form inline>
            <el-form-item label="数据库分类：">
                <el-select placeholder="请选择" v-model="categoryId">
                    <el-option 
                        v-for="c in categorys" 
                        :key="c.id" 
                        :label="c.categoryName"
                        :value="c.id">
                    </el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="发布状态：">
                <el-select placeholder="请选择" v-model="state">
                    <el-option label="已发布" value="已发布"></el-option>
                    <el-option label="草稿" value="草稿"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary">搜索</el-button>
                <el-button>重置</el-button>
            </el-form-item>
        </el-form> -->
        <!-- 数据库列表 -->
        <el-table :data="databaseList" style="width: 100%">
            <el-table-column label="数据库标题" width="400" prop="name"></el-table-column>
            <el-table-column label="数据总量" prop="total"></el-table-column>
            <el-table-column label="用途" prop="comment"> </el-table-column>
            <el-table-column label="状态" prop="state"><template #default="{ row }">
          <el-tag type="success" v-if="row.state == '0'">运行中</el-tag>
          <el-tag type="info" v-else-if="row.state == '1'">离线中</el-tag>
        </template></el-table-column>
            <el-table-column label="操作" width="100">
                <template #default="{ row }">
                    <el-button :icon="Edit" circle plain type="primary"></el-button>
                    <el-button :icon="Delete" circle plain type="danger"></el-button>
                </template>
            </el-table-column>
            <template #empty>
                <el-empty description="没有数据" />
            </template>
        </el-table>
        <!-- 分页条 -->
        <el-pagination v-model:current-page="pageNum" v-model:page-size="pageSize" :page-sizes="[3, 5 ,10, 15]"
            layout="jumper, total, sizes, prev, pager, next" background :total="total" @size-change="onSizeChange"
            @current-change="onCurrentChange" style="margin-top: 20px; justify-content: flex-end" />
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
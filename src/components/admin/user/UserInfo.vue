<script setup>
import { Edit, Delete } from "@element-plus/icons-vue";
import { ref } from "vue";
import { getUser, addUserI, updateUserI,deleteUserI } from "@/api/user.js";
import { ElMessage,ElMessageBox } from "element-plus";

const userlist = ref();

const getUserList = async () => {
  let result = await getUser();
  console.log(result.data);
  userlist.value = result.data;
};

const addUser = async () => {
  let result = await addUserI(registerData.value);
  console.log(result);
  ElMessage.success("添加成功");
  getUserList();
  dialogVisible.value = false;
};

const updateUser = async () => {
  let result = await updateUserI(registerData.value);
  console.log(result);
  ElMessage.success("修改成功");
  getUserList();
  dialogVisible.value = false;
};
//控制添加分类弹窗
const dialogVisible = ref(false);

//定义数据模型
const registerData = ref({
  username: "",
  password: "",
  rePassword: "",
});

//校验密码函数
const checkPassword = (rule, value, callback) => {
  if (value === "") {
    callback(new Error("请再次输入密码"));
  } else if (value !== registerData.value.password) {
    callback(new Error("两次输入密码不一致!"));
  } else {
    callback();
  }
};
//定义校验规则
const rules = {
  username: [
    { required: true, message: "请输入用户名", trigger: "blur" },
    { min: 3, max: 10, message: "长度在 3 到 10 个字符", trigger: "blur" },
  ],
  password: [
    { required: true, message: "请输入密码", trigger: "blur" },
    { min: 5, max: 15, message: "长度在 5 到 15 个字符", trigger: "blur" },
  ],
  rePassword: [
    { required: true, message: "请再次输入密码", trigger: "blur" },
    { validator: checkPassword, trigger: "blur" },
  ],
};

getUserList();

const title = ref("");

const showDialog = (row) => {
  dialogVisible.value = true;
  title.value = "编辑分类";

  registerData.value = {
    username: row.username,
    password: row.password,
  };
};

const clearData = () => {
  registerData.value = {
    username: "",
    password: "",
    rePassword: "",
  };
};

const deleteUser = (row) => {
  ElMessageBox.confirm(
    "您确定要删除该账号吗?",
    "温馨提示",
    {
      confirmButtonText: "确认",
      cancelButtonText: "取消",
      type: "warning",
    }
  )
    .then(async() => {
      let result = await deleteUserI(row.username);
      ElMessage({
        type: "success",
        message: "删除成功",
      });
      getUserList();
    })
    // .catch(() => {
    //   ElMessage({
    //     type: "info",
    //     message: "Delete canceled",
    //   });
    // });
};
</script>

<template>
  <el-card class="page-container">
    <template #header>
      <div class="header">
        <strong>账号信息管理</strong>
        <div class="extra">
          <el-button
            type="primary"
            @click="
              dialogVisible = true;
              title = '添加账号';
              clearData();
            "
            >添加账号</el-button
          >
        </div>
      </div>
    </template>
    <el-table :data="userlist" style="width: 100%">
      <el-table-column label="序号" width="100" type="index"> </el-table-column>
      <el-table-column label="用户名" prop="username"></el-table-column>
      <el-table-column label="密码" prop="password"></el-table-column>
      <el-table-column label="操作" width="100">
        <template #default="{ row }">
          <el-button
            :icon="Edit"
            circle
            plain
            type="primary"
            @click="showDialog(row)"
          ></el-button>
          <el-button :icon="Delete" circle plain type="danger" @click="deleteUser(row)"></el-button>
        </template>
      </el-table-column>
      <template #empty>
        <el-empty description="没有数据" />
      </template>
    </el-table>

    <!-- 添加分类弹窗 -->
    <el-dialog v-model="dialogVisible" :title="title" width="30%">
      <el-form
        :model="registerData"
        :rules="rules"
        label-width="100px"
        style="padding-right: 30px"
      >
        <el-form-item label="用户名" prop="username">
          <el-input
            v-model="registerData.username"
            minlength="1"
            maxlength="10"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            v-model="registerData.password"
            minlength="1"
            maxlength="15"
          ></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="rePassword">
          <el-input
            v-model="registerData.rePassword"
            minlength="1"
            maxlength="15"
          ></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button
            type="primary"
            @click="title == '添加账号' ? addUser() : updateUser()"
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

<template>
  <el-row class="login-page">
    <el-col :span="14" class="bg"></el-col>
    <el-col :span="6" :offset="2" class="form">
      <!-- 注册表单 -->
      <el-form
        ref="form"
        size="large"
        autocomplete="off"
        v-if="isRegister"
        :model="registerData"
        :rules="rules"
      >
        <el-form-item>
          <h1 class="title">注册</h1>
        </el-form-item>
        <el-form-item prop="username">
          <el-input
            :prefix-icon="User"
            placeholder="请输入用户名"
            v-model="registerData.username"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            :prefix-icon="Lock"
            type="password"
            placeholder="请输入密码"
            v-model="registerData.password"
          ></el-input>
        </el-form-item>
        <el-form-item prop="rePassword">
          <el-input
            :prefix-icon="Lock"
            type="password"
            placeholder="请输入再次密码"
            v-model="registerData.rePassword"
          ></el-input>
        </el-form-item>
        <!-- 注册按钮 -->
        <el-form-item>
          <el-button class="button" type="primary" auto-insert-space>
            注册
          </el-button>
        </el-form-item>
        <el-form-item class="flex">
          <el-link type="info" :underline="false" @click="isRegister = false;clearRegisterData()">
            ← 返回
          </el-link>
        </el-form-item>
      </el-form>
      <!-- 登录表单 -->
      <el-form ref="form" size="large" autocomplete="off" v-else :model="registerData" :rules="rules">
        <el-form-item>
          <h1 class="title">登录</h1>
        </el-form-item>
        <el-form-item prop="username">
          <el-input :prefix-icon="User" placeholder="请输入用户名" v-model="registerData.username"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            name="password"
            :prefix-icon="Lock"
            type="password"
            placeholder="请输入密码" v-model="registerData.password"
          ></el-input>
        </el-form-item>
        <el-form-item class="flex">
          <div class="flex">
            <el-checkbox>记住我</el-checkbox>
            <el-link type="primary" :underline="false">忘记密码？</el-link>
          </div>
        </el-form-item>
        <!-- 登录按钮 -->
        <el-form-item>
          <el-button class="button" type="primary" auto-insert-space @click="login"
            >登录</el-button
          >
        </el-form-item>
        <el-form-item class="flex">
          <el-link type="info" :underline="false" @click="isRegister = true;clearRegisterData()">
            注册 →
          </el-link>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<script setup>
import { User, Lock } from "@element-plus/icons-vue";
import { ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import { getTime } from "@/api/getTime.js";
import { userLoginService } from "@/api/user.js";
import { ElMessage } from "element-plus";
const router = useRouter();
// import { userLoginService } from "@/api/user.js";
//控制注册与登录表单的显示， 默认显示注册
const isRegister = ref(false);

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

//登录函数
const login = async () => {
    let result = await userLoginService(registerData.value);
    console.log(result);
    ElMessage.success("登陆成功")
    router.push('/data')
//     axios.post("http://127.0.0.1:8080/login",registerData.value).then((res) => {
//     // console.log(registerData.value.password);
//         // console.log(registerData.value.username);
//         console.log(res.data);
//         console.log(res.data.code);
//     if (res.data.code === 0) {
//         alert('登录成功');
//       router.push('/data')
//     }
//     }).catch(err => {
//       console.log(err);
//     });
}

//定义函数，清空数据模型的数据
const clearRegisterData = () => {
    registerData.value = {
      username: "",
      password: "",
      rePassword: "",
    }
}
</script>

<style lang="scss" scoped>
/* 样式 */
.login-page {
  height: 100vh;
  background-color: #fff;

  .bg {
    background: 
      url("@/assets/微信图片_20240416124644.jpg") no-repeat right / cover;
    border-radius: 0 20px 20px 0;
  }

  .form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    user-select: none;

    .title {
      font-size: 24px;
      font-weight: bold;
      color: #333;
    }

    .button {
      width: 100%;
    }

    .flex {
      width: 100%;
      display: flex;
      justify-content: space-between;
    }
  }
}
</style>

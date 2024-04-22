<template>
  <el-container class="layout-container">
    <!-- 左侧菜单 -->
    <el-aside width="200px">
      <div class="el-aside__logo"></div>
      <el-menu
        class="menu_vertical"
        router
      >
        <el-sub-menu>
          <template #title>
            <el-icon><Cpu /></el-icon>
            <span>设备管理</span>
          </template>
          <el-menu-item index="/device/info">
            <el-icon>
              <User />
            </el-icon>
            <span>设备信息管理</span>
          </el-menu-item>
          <el-menu-item index="/device/param">
            <el-icon><SetUp /></el-icon>
            <span>设备参数设置</span>
          </el-menu-item>
          <el-menu-item index="/device/DFU">
            <el-icon><UploadFilled /></el-icon>
            <span>设备固件升级</span>
          </el-menu-item>
        </el-sub-menu>
        <el-menu-item index="/maintainer">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-weixiu"></use>
          </svg>
          <span>维修人员管理</span>
        </el-menu-item>
        <el-menu-item index="/database">
          <el-icon><Coin /></el-icon>
          <span>数据库管理</span>
        </el-menu-item>
        <el-menu-item index="/log">
          <el-icon><List /></el-icon>
          <span>日志管理</span>
        </el-menu-item>
        <el-sub-menu>
          <template #title>
            <el-icon>
              <UserFilled />
            </el-icon>
            <span>账号管理</span>
          </template>
          <el-menu-item index="/user/info">
            <el-icon>
              <User />
            </el-icon>
            <span>账号信息管理</span>
          </el-menu-item>
          <el-menu-item index="/user/switch">
            <el-icon>
              <Crop />
            </el-icon>
            <span>切换账号</span>
          </el-menu-item>
          <el-menu-item index="/user/exit">
            <el-icon>
              <EditPen />
            </el-icon>
            <span>重置密码</span>
          </el-menu-item>
        </el-sub-menu>
      </el-menu>
    </el-aside>
    <!-- 右侧主区域 -->
    <el-container>
      <!-- 头部区域 -->
      <el-header>
        
        
        <div><el-button
            type="primary"
            size="default"
            class="btn1"
            style="width: 40px;margin-right: 20px;"
            plain
            @click="toData"
            ><svg class="icon" aria-hidden="true" style="margin: auto;">
            <use xlink:href="#icon-return"></use>
          </svg></el-button>登录账号：<strong>admin</strong></div>
        <el-dropdown placement="bottom-end" @command="handleCommand">
          <span class="el-dropdown__box">
            <el-avatar :src="avatar" />
            <el-icon>
              <CaretBottom />
            </el-icon>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item command="switch" :icon="Crop"
                >切换账号</el-dropdown-item
              >
              <el-dropdown-item command="logout" :icon="SwitchButton"
                >退出登录</el-dropdown-item
              >
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </el-header>
      <!-- 中间区域 -->
      <el-main>
        <router-view></router-view>
      </el-main>
      <!-- 底部区域 -->
      <el-footer height="40px">©2024 Created by 洗胃攻城狮</el-footer>
    </el-container>
  </el-container>
</template>

<script setup>
import {
  Management,
  Promotion,
  UserFilled,
  User,
  Crop,
  EditPen,
  SwitchButton,
  CaretBottom,
} from "@element-plus/icons-vue";
import avatar from "@/assets/admin.png";
import { defineProps } from 'vue';

import { useRouter } from 'vue-router'
const router = useRouter()

const handleCommand = (command) => {
  if (command === "logout") {
    // 退出登录逻辑
    router.push('/login')
  } else if (command === "switch") {
    // 切换账号逻辑
    router.push('/login')
  }
};

const toData = () => {
  router.push('/data')
}
</script>



<style lang="scss" scoped>
.layout-container {
  height: 100vh;

  .el-aside {
    background-color: #fff;
    box-shadow:
  0.6px 0.8px 1.6px -15px rgba(0, 0, 0, 0.015),
  1.5px 1.8px 3.8px -15px rgba(0, 0, 0, 0.022),
  2.6px 3.2px 6.8px -15px rgba(0, 0, 0, 0.028),
  4.3px 5.3px 11.2px -15px rgba(0, 0, 0, 0.032),
  7.1px 8.7px 18.5px -15px rgba(0, 0, 0, 0.038),
  12.5px 15.3px 32.4px -15px rgba(0, 0, 0, 0.045),
  27px 33px 70px -15px rgba(0, 0, 0, 0.06)
;
  border-radius: 0px 0px 15px 0px;

    &__logo {
      height: 120px;
      background: url("@/assets/能源智造.svg") no-repeat center / 120px auto;
    }

    .el-menu {
      border-right: none;
    }
  }

  .el-header {
    background-color: #fff;
    display: flex;
    align-items: center;
    justify-content: space-between;
    box-shadow:
  0.6px 0.8px 1.6px -15px rgba(0, 0, 0, 0.015),
  1.5px 1.8px 3.8px -15px rgba(0, 0, 0, 0.022),
  2.6px 3.2px 6.8px -15px rgba(0, 0, 0, 0.028),
  4.3px 5.3px 11.2px -15px rgba(0, 0, 0, 0.032),
  7.1px 8.7px 18.5px -15px rgba(0, 0, 0, 0.038),
  12.5px 15.3px 32.4px -15px rgba(0, 0, 0, 0.045),
  27px 33px 70px -15px rgba(0, 0, 0, 0.06)
;

    .el-dropdown__box {
      display: flex;
      align-items: center;

      .el-icon {
        color: #999;
        margin-left: 10px;
      }

      &:active,
      &:focus {
        outline: none;
      }
    }
  }

  .icon {
    width:24px;
      height: 20px;
    //   vertical-align: -2px;
    //   padding: 0px,0px,0px,10px;
    margin-right: 4px;
    //   horizontal: -2px;
    // fill:currentColor;
    // overflow: hidden;;
    //   background: url("@/assets/维修人员22222.png");
    fill:#fff;
    }

  .el-footer {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    color: #666;
    background: transparent;
  }
}


.el-button{
padding: 1.3em 2em;
  font-size: 12px;
  letter-spacing: 2.5px;
  font-weight: 500;
  color: #000;
  background-color: #fff;
  border: none;
  border-radius: 8px;
  box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease 0s;
  cursor: pointer;
  outline: none;
}

button:hover {
  background-color: #4b4d4c;
  box-shadow: 0px 15px 20px rgba(100, 102, 101, 0.4);
  color: #a09a9a;
  transform: translateY(-4px);
}

button:active {
  transform: translateY(-1px);
}

.btn1{
background: rgb(2,0,36);
background: linear-gradient(90deg, rgb(66, 110, 214) 0%, rgb(47, 82, 207) 0%, rgb(13, 49, 230) 100%);
color: #fff;
}


</style>

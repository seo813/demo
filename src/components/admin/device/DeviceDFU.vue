<script setup>
import { Edit, Delete } from "@element-plus/icons-vue";
import http from "@/utils/http.js";
import { ref } from "vue";
import { getDeviceInfoI } from "@/api/deviceInfo.js";
// import { UploadInstance, UploadProps, UploadRawFile } from 'element-plus'

const deviceInfo = ref();

//用户搜索时选中的分类id
const windfarmid = ref("");

//用户搜索时选中的发布状态
const state = ref("");

// const upload = ref<UploadInstance>(null);
// const upload = ref<UploadInstance>()
// const submitUpload = () => {
//   upload.value!.submit()
// }
// const upload = ref(null);


//接收上传的文件
const fileList = ref([])
//上传文件
const submitUpload = () => {
    if (fileList.value.length > 0) {
        // 封装为FromData对象
        const fromData = new FormData()
        fileList.value.forEach((val) => {
            console.log('val.raw :>> ', val.raw);
            fromData.append('hexfiles', val.raw)
        })
        // 发送ajax请求，上传文件
        if (fromData != null) {
            http.post('/uploads', fromData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            })
        }
    }
}

// const submitUpload = () => {
//     // console.log(upload.value)
//     //   upload.submit();
//  $refs.upload.submit();
// };
// const handleRemove = (file, fileList) => {
//   console.log(file, fileList);
// };
// const handlePreview = (file) => {
//   console.log(file);
// };



// export default {
//     methods: {
//         submitUpload() {
//             console.log("hello");
//             console.log(this.$refs.upload);
//             this.$refs.upload.submit();
//         },
//     }
// };


//分页条数据模型
const page = ref(1); //当前页
const total = ref(20); //总条数
const pageSize = ref(5); //每页条数

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
  deviceInfo.value = formatdata;
  total.value = result.data.total;
  console.log(deviceInfo.updatetime);
};

getDeviceInfo();
</script>
<template>
  <el-card class="page-container">
    <template #header>
      <div class="header">
        <strong>设备固件升级</strong>
        <div class="extra">
          <el-button type="primary" class="btn1">一键烧录</el-button>
        </div>
      </div>
    </template>

    <el-upload
      class="upload-demo"
      v-model:file-list="fileList"
      :auto-upload="false"
    >
      <template #trigger>
        <el-button type="primary" class="btn1">选取文件</el-button>
      </template>
      <el-button
        style="margin-left: 10px"
        type="success"
        @click="submitUpload"
        >上传至服务器</el-button
      >
      <template #tip>
        <div class="el-upload__tip">请上传.hex文件</div>
      </template>
    </el-upload>

    <el-upload
      class="upload-demo"
      drag
      action="http://192.168.3.135:8080/upload"
      multiple
      name="hexfile"
    >
      <el-icon class="el-icon--upload"><upload-filled /></el-icon>
      <div class="el-upload__text">
        拖曳.hex文件至此自动上传 或<em>点击自动上传</em>
      </div>
    </el-upload>
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
        <el-button type="primary" @click="getDeviceInfo" class="btn1">搜索</el-button>
        <el-button @click="(windfarmid = ''), (state = '')">重置</el-button>
      </el-form-item>
    </el-form>

    <!-- 文章列表 -->
    <el-table :data="deviceInfo" style="width: 100%">
      <el-table-column type="selection" width="50" /><el-table-column
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

.el-button{
padding: 1.3em 3em;
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 2.5px;
  font-weight: 500;
  color: #000;
  background-color: #fff;
  border: none;
  border-radius: 45px;
  box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease 0s;
  cursor: pointer;
  outline: none;
}

button:hover {
  background-color: #23c483;
  box-shadow: 0px 15px 20px rgba(46, 229, 157, 0.4);
  color: #fff;
  transform: translateY(-4px);
}

button:active {
  transform: translateY(-1px);
}

.btn1{
background: rgb(2,0,36);
background: linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(21,195,196,1) 0%, rgba(0,212,255,1) 100%);
}
</style>

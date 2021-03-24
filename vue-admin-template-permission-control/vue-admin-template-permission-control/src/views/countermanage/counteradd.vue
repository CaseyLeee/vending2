<template>
  <div class="containbd">
    <el-form
      :model="form"
      ref="form"
      :rules="rules"
      label-width="150px"
      :inline="false"
      size="normal"
    >
      <el-form-item label="sn号(唯一识别码)" prop="identifyId">
        <el-input v-model="form.identifyId"></el-input>
      </el-form-item>
      <el-form-item label="货柜名称" prop="name">
        <el-input v-model="form.name"></el-input>
      </el-form-item>

      <el-form-item label="备注">
        <el-input v-model="form.remrak"></el-input>
      </el-form-item>
      <el-form-item label="归属账号" v-if="type == 1">
        <!-- <el-input v-model="form.userId"></el-input> -->
        <span class="el-input__inner">{{ form.username }}</span>
        <el-button type="text" @click="dialogTableVisible = true"
          >选择账号</el-button
        >
      </el-form-item>
      <el-form-item label="地址(','号分隔)" prop="position">
        <el-input v-model="form.position"></el-input
        ><a
          target="_blank"
          style="color: #409eff"
          href="https://lbs.qq.com/tool/getpoint/"
          >经纬度拾取</a
        >
      </el-form-item>
      <el-form-item label="货柜类型" prop="type" v-if="type == 1">
        <el-select v-model="form.type" placeholder="请选择">
          <el-option
            v-for="item in deviceTypelist"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="设备存货情况" v-if="type == 1">
        <!-- <el-input v-model="form.containerState"></el-input> -->
        <div class="containerState">
          <span
            :key="index"
            :ref="item"
            class="containerStateitem"
            :style="{ background: arr[index] == 1 ? 'green' : '' }"
            v-for="(item, index) in 8"
            @click="containerStatechange(index)"
          >
            {{ item }}
          </span>
        </div>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit('form')">{{
          oper
        }}</el-button>
      </el-form-item>
    </el-form>

    <el-dialog title="账号" :visible.sync="dialogTableVisible" center>
      <el-table
        :data="
          userlist.filter(
            (data) =>
              !search || data.name.toLowerCase().includes(search.toLowerCase())
          )
        "
        style="width: 100%"
      >
        <el-table-column label="userid" prop="userId"> </el-table-column>
        <el-table-column label="名称" prop="name"> </el-table-column>

        <el-table-column label="账号" prop="account"> </el-table-column>

        <el-table-column label="绑定邮箱" prop="phone"> </el-table-column>

        <el-table-column align="center" fixed="right" width="200">
          <!-- eslint-disable-next-line -->
          <template slot="header" slot-scope="scope">
            <el-input
              prefix-icon="el-icon-search"
              v-model="search"
              size="mini"
              placeholder="输入关键字搜索"
            />
          </template>
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              @click="chooseuserid(scope.row.userId, scope.row.name)"
              >选择</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
import {
  deviceTypelist,
  deviceadd,
  deviceupdate,
  userquery,
  foredeviceadd,
  foredeviceupdate,
} from "@/api/table";
import { getUserinfo } from "@/utils/auth";
export default {
  data() {
    const validatepos = (rule, value, callback) => {
     
      if (value.length < 1) {
        callback(new Error("请输入经纬度(','号分割,经度在前,纬度在后)"));
      } else if (value.indexOf(',') < 0) {
       // 113.934528,22.5405030000000011
        callback(new Error("经纬度不合法"));
      } else {
        callback();
      }
    };
    return {
      type: 0,
      arr: [0, 0, 0, 0, 0, 0, 0, 0],
      isActive: true,
      name: "",
      search: "",
      userlist: [],
      dialogTableVisible: false,

      deviceTypelist: [],
      oper: "立即添加",
      imageUrl: "",
      form: {
        deviceId: "",
        identifyId: "",
        name: "",
        remrak: "",
        userId: "",
        position: "",
        type: "",
        containerState: "",
      },
      rules: {
        identifyId: [
          {
            required: true,
            message: "请输入SN号",
            trigger: "blur",
          },
        ],
        name: [
          {
            required: true,
            message: "请输入名称",
            trigger: "blur",
          },
        ],
        type: [
          {
            required: true,
            message: "请选择设备类型",
            trigger: "change",
          },
        ],
        position: [
          {
            required: true,
            trigger: "blur",
            validator: validatepos,
          },
        ],
      },
    };
  },
  mounted() {
    let { name, userId, type } = JSON.parse(getUserinfo());

    this.type = type;
    if (type == 1) {
      deviceTypelist()
        .then((response) => {
          this.deviceTypelist = response.data;
        })
        .catch((err) => {});
    }

    this.queryList();
    let row = this.$route.params.row;
    if (row != undefined) {
      this.oper = "立即修改";
      if (row.containerState != null) {
        this.arr = row.containerState.split("");
      }

      // this.name=row.username
      this.form = Object.assign({}, this.form, row);
    } else {
      this.form.userId = userId;
      this.form.username = name;
    }
  },
  methods: {
    containerStatechange(index) {
      if (this.arr[index] == 0) {
        this.arr.splice(index, 1, 1); //不能直接赋值 不会重新渲染
      } else {
        this.arr.splice(index, 1, 0); //不能直接赋值 不会重新渲染
      }
    },
    chooseuserid(userid, name) {
      this.dialogTableVisible = false;
      this.form.userId = userid;
      this.form.username = name;
    },
    queryList() {
      userquery({})
        .then((response) => {
          this.userlist = response.data;
        })
        .catch((err) => {});
    },
    onSubmit(formName) {
      this.form.containerState = this.arr.toString().replaceAll(",", "");

      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          if (this.oper != "立即修改") {
            this.form.deviceId = this.guid();
            if (this.type == 1) {
              deviceadd(this.form)
                .then((response) => {
                  this.$message.success("添加设备成功");
                })
                .catch((err) => {});
            } else {
              foredeviceadd(this.form)
                .then((response) => {
                  this.$message.success("添加设备成功");
                })
                .catch((err) => {});
            }
          } else {
            if (this.type == 1) {
              deviceupdate(this.form)
                .then((response) => {
                  this.$message.success("修改设备成功");
                })
                .catch((err) => {});
            } else {
              foredeviceupdate(this.form)
                .then((response) => {
                  this.$message.success("修改设备成功");
                })
                .catch((err) => {});
            }
          }
        } else {
        }
      });
    },
    guid() {
      function S4() {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
      }
      return S4() + S4() + S4() + S4() + S4() + S4() + S4() + S4();
    },
  },
};
</script>

<style>
.active {
  background: green;
}
.containerState {
  display: flex;
  flex-wrap: wrap;
  width: 200px;
  height: 100px;
  box-sizing: border-box;
}
.containerStateitem {
  border: 5px solid white;
  box-sizing: border-box;
  background: #909399;
  width: 25%;
  height: 50%;
  display: block;
  border-radius: 50%;
  text-align: center;
  color: white;
  font-size: 12px;
  font-weight: 800;
}
.containbd {
  width: 50%;
  margin-left: 25%;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.el-upload-dragger {
  width: 178px;
}
</style>
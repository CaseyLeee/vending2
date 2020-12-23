<template>
  <div>
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
      <el-form-item label="归属账号(userid)">
        <el-input v-model="form.userId"></el-input>
        <!-- <el-button type="text" @click="dialogTableVisible = true"
          >选择账号</el-button
        > -->
      </el-form-item>
      <el-form-item label="二维地理位置" v-if="oper == '立即添加'">
        <el-input v-model="form.position"></el-input>
      </el-form-item>
      <el-form-item label="货柜类型" prop="type" >
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
      <el-form-item
        label="设备存货情况"
        v-if="oper == '立即添加'"
        prop="containerState"
      >
        <el-input v-model="form.containerState"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit('form')">{{
          oper
        }}</el-button>
      </el-form-item>
    </el-form>

    <el-dialog title="账号" :visible.sync="dialogTableVisible">
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
            <el-button size="mini" type="danger" @click="del(scope.row.userId)"
              >删除</el-button
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
} from "@/api/table";
export default {
  data() {
    return {
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
        containerState: [
          {
            required: true,
            message: "请输入设备存货情况 eg:00000000",
            trigger: "change",
          },
        ],
      },
    };
  },
  mounted() {
    deviceTypelist()
      .then((response) => {
        this.deviceTypelist = response.data;
      })
      .catch((err) => {});
    this.queryList()
    let row = this.$route.params.row;
    if (row != undefined) {
      this.oper = "立即修改";
      this.form = Object.assign({}, this.form, row);
    }
  },
  methods: {
    queryList() {
      userquery({})
        .then((response) => {
          this.userlist = response.data;
        })
        .catch((err) => {});
    },
    onSubmit(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          if (this.oper != "立即修改") {
            this.form.deviceId = this.guid();
            deviceadd(this.form)
              .then((response) => {
                this.$message.success("添加设备成功");
              })
              .catch((err) => {});
          } else {
            deviceupdate(this.form)
              .then((response) => {
                this.$message.success("修改设备成功");
              })
              .catch((err) => {});
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
<template>
  <div class="containbd">
    <el-form
      :model="form"
      ref="form"
      :rules="rules"
      label-width="130px"
      :inline="false"
      size="normal"
    >
      <el-form-item label="商家名称" prop="name">
        <el-input v-model="form.name"></el-input>
      </el-form-item>

      <el-form-item label="账号" prop="account" v-if="add">
        <el-input v-model="form.account"></el-input>
      </el-form-item>

      <el-form-item label="密码" prop="password">
        <el-input v-model="form.password"></el-input>
      </el-form-item>
      <el-form-item label="绑定邮箱" prop="phone" v-if="add">
        <el-input v-model="form.phone"></el-input>
      </el-form-item>
      <!-- 
    <el-form-item label="账户父id" prop="userPid">
      <el-input v-model="form.userPid"></el-input>
    </el-form-item> -->

      <el-form-item label="logo图片地址" prop="logo">
        <el-upload
          class="avatar-uploader"
          :action="uploadurl"
          :show-file-list="false"
          :limit="1"
          drag
          accept=".png,.jpg"
          :on-success="uploadFile"
        >
          <img v-if="form.logo" :src="getAvator(form.logo)" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="地址" prop="address">
        <el-input v-model="form.address"></el-input>
      </el-form-item>

      <el-form-item label="开箱码" prop="devicePassord">
        <el-input v-model="form.devicePassord"></el-input>
      </el-form-item>

      <el-form-item label="账户类型" prop="type" v-if="add">
        <el-select
          v-model="form.type"
          value-key=""
          placeholder=""
          clearable
          filterable
        >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="微信id" prop="weixin" v-if="add">
        <el-input v-model="form.weixin"></el-input>
      </el-form-item>
      <el-form-item label="费率" prop="feeRate">
        <el-input v-model="form.feeRate"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit('form')">{{
          oper
        }}</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { userregist, userquery,userupdate } from "@/api/table";
import { getUserinfo } from "@/utils/auth";
export default {
  data() {
    var checkEmail = (rule, value, callback) => {
      const mailReg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
      if (value) {
        if (mailReg.test(value)) {
          callback();
        } else {
          callback(new Error("请输入正确的邮箱格式"));
        }
      } else {
        callback();
      }
    };
    return {
      add: true,
      uploadurl: `${process.env.VUE_APP_BASE_API}/file/upload`,
      options: [
        { label: "普通商户", value: "0" },
        { label: "机器运维", value: "1" },
      ],
      form2: {},
      oper: "立即添加",
      imageUrl: "",
      passwordori:"",
      form: {
        userId: "",
        name: "",
        account: "",
        password: "",
        phone: "",
        userPid: "",
        logo: "",
        address: "",
        devicePassord: "",
        type: "",
        weixin: "",
        feeRate: "",
      },
      rules: {
        name: [
          {
            required: true,
            message: "请输入商家名称",
            trigger: "blur",
          },
        ],

        devicePassord: [
          {
            required: true,
            message: "请输入开箱码",
            trigger: "blur",
          },
        ],
        account: [
          {
            required: true,
            message: "请输入商家账户",
            trigger: "blur",
          },
        ],
        password: [
          {
            required: true,
            message: "请输入商家密码",
            trigger: "blur",
          },
        ],
        type: [
          {
            required: true,
            message: "请选择账户类型",
            trigger: "change",
          },
        ],
        phone: [
          {
            required: false,
            validator: checkEmail,
            trigger: "blur",
          },
        ],
      },
    };
  },
  async mounted() {
    let id = this.$route.query.id;

    if (id) {
      this.add = false;
      this.form2.name = id;

      let row = await userquery(this.form2)
        .then((response) => {
          console.log("res", response.data);
          let res = response.data[0];
          if (res.account) {
            
            res.password = "******";
           
          }
          return res;
        })
        .catch((err) => {});

      // let row = this.$route.params.row;

      this.oper = "立即修改";

      this.form = Object.assign({}, this.form, row);
    } else {
      this.form.userPid = JSON.parse(getUserinfo()).userId; //得到父id

      console.log("id", this.userPid);
    }
  },
  methods: {
    getAvator(picturePath) {
      return `${process.env.VUE_APP_PIC_API}/${picturePath}`;
    },
    uploadFile(res) {
      if (res.code == 1) {
        this.form.logo = res.message;
      } else {
        this.$message.error("图片上传失败");
      }
    },
    async onSubmit(formName) {
      // this.$refs.upload.submit()
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          if (this.oper == "立即修改") {
            if(this.form.password=="******"){
              delete this.form.password
            }
             userupdate(this.form)
              .then((response) => {
                this.$message.success("修改账户成功");
              })
              .catch((error) => {
                this.$message.error(error);
              });
          } else {
            this.form.userId = this.guid();
            console.log(this.form);
            userregist(this.form)
              .then((response) => {
                this.$message.success("添加账户成功");
              })
              .catch((error) => {
                this.$message.error(error);
              });
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
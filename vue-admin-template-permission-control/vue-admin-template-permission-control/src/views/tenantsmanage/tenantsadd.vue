<template>
  <el-form
    :model="form"
    ref="form"
    :rules="rules"
    label-width="80px"
    :inline="false"
    size="normal"
  >
 

    <el-form-item label="商家名称" prop="name">
      <el-input v-model="form.name"></el-input>
    </el-form-item>

    <el-form-item label="商家地址" prop="area">
      <el-input v-model="form.area"></el-input>
    </el-form-item>
    
    <el-form-item label="商家账号" prop="account">
      <el-input v-model="form.name"></el-input>
    </el-form-item>

    <el-form-item label="商家密码" prop="password">
      <el-input v-model="form.area"></el-input>
    </el-form-item>
     <el-form-item label="开箱码" prop="openpw">
      <el-input v-model="form.area"></el-input>
    </el-form-item>

    <el-form-item label="商家logo" prop="file" ref="file">
      <el-upload
        class="avatar-uploader"
        action=""
        :show-file-list="false"
        :limit="1"
        :auto-upload="false"
        drag
        accept=".png,.jpg"
        :on-change="onchange"
        ref="upload"
      >
        <img v-if="imageUrl" :src="imageUrl" class="avatar" />
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit('form')">{{ oper }}</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  data() {
    return {
      options:[{"label":"八号柜","value":"8"}],
      oper: "立即添加",
      imageUrl: "",
      form: {
        name: "",
        area: "",
        account:"",
        password:"",
        openpw:"",
        filebinary: "",
      },
      rules: {
        name: [
          {
            required: true,
            message: "请输入商家名称",
            trigger: "blur",
          },
        ],
       
        area: [
          {
            required: true,
            message: "请输入商家地址",
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
         openpw: [
          {
            required: true,
            message: "请输入开箱码",
            trigger: "blur",
          },
        ],
        file: [
          {
            required: true,
            validator: (rule, value, callback) => {
              if (this.form.filebinary === "") {
                console.log("form", this.form);
                callback(new Error("请上传图片"));
              } else {
                callback();
              }
            },
            trigger: "change",
          },
        ],
      },
    };
  },
  mounted() {
    let id = this.$route.params.id;
    if (id != null) {
      this.oper = "立即修改";
    }
    //通过id获取货柜参数
    console.log("id", id);
  },
  methods: {
    onchange(file, fileList) {
      this.imageUrl = URL.createObjectURL(file.raw);

      this.form.filebinary = file.raw;

      this.$refs.file.clearValidate();
    },
    // uploadFile(param) {
    //   console.log("param", param);
    //   let fileObj = param.file; // 相当于input里取得的files
    //   this.form.filebinary = fileObj;
    // },
    async onSubmit(formName) {
      // this.$refs.upload.submit()
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
        } else {
        }
      });
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
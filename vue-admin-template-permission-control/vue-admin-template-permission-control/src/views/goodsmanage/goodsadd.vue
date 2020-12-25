<template>
  <div class="containbd">
    <el-form
      :model="form"
      ref="form"
      :rules="rules"
      label-width="80px"
      :inline="false"
      size="normal"
    >
      <el-form-item label="商品名称" prop="name">
        <el-input v-model="form.name" maxLength="7"></el-input>
      </el-form-item>

      <el-form-item label="产品描述" prop="details">
        <el-input v-model="form.details" maxLength="20"></el-input>
      </el-form-item>

      <el-form-item label="价格" prop="price">
        <el-input
          v-model.number="form.priceyuan"
          type="number"
          oninput="if(value.length>7)value=value.slice(0,7)"
        ></el-input>
      </el-form-item>
      <el-form-item label="单位" prop="unit">
        <el-input v-model.number="form.unit" maxLength="3"></el-input>
      </el-form-item>

      <el-form-item label="产品图片" prop="file" ref="file">
        <el-upload
          class="avatar-uploader"
          :action="uploadurl"
          :show-file-list="false"
          :limit="1"
          drag
          accept=".png,.jpg"
          :on-success="uploadFile"
        >
          <img
            v-if="form.pircture"
            :src="getAvator(form.pircture)"
            class="avatar"
          />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
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
import { addGoods, commodifyupdate } from "@/api/table";

export default {
  data() {
    return {
      uploadurl: `${process.env.VUE_APP_BASE_API}/file/upload`,
      oper: "立即添加",

      form: {
        commodifyId: "",
        name: "",
        price: "",
        pircture: "",
        details: "",
        unit: "",
      },

      rules: {
        name: [
          {
            required: true,
            message: "请输入名称",
            trigger: "blur",
          },
        ],
        details: [
          {
            required: true,
            message: "请输入描述",
            trigger: "blur",
          },
        ],
        priceyuan: [
          {
            required: true,
            message: "请输入价格",
            trigger: "blur",
          },
        ],
        unit: [
          {
            required: true,
            message: "请输入商品单位(份/小时...)",
            trigger: "blur",
          },
        ],
        file: [
          {
            required: true,
            validator: (rule, value, callback) => {
              if (this.form.pircture === "") {
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
    let row = this.$route.params.row;
    if (row != undefined) {
      this.oper = "立即修改";
      row.priceyuan = row.price / 100;
      this.form = Object.assign({}, this.form, row);
    }

    //通过id获取商品参数
    console.log("row", row);
  },

  methods: {
    getAvator(picturePath) {
      return `${process.env.VUE_APP_PIC_API}/${picturePath}`;
    },

    uploadFile(res) {
      if (res.code == 1) {
        this.form.pircture = res.message;
        this.$refs.file.clearValidate();
      } else {
        this.$message.error("图片上传失败");
      }
    },
    async onSubmit(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          if (this.oper == "立即修改") {
            this.form.price = this.form.priceyuan * 100;
            commodifyupdate(this.form)
              .then((response) => {
                this.$message.success("修改商品成功");
              })
              .catch((error) => {
                this.$message.error(error);
              });
          } else {
            this.form.commodifyId = this.guid();
            this.form.price = this.form.priceyuan * 100;
            addGoods(this.form)
              .then((response) => {
                this.$message.success("添加商品成功");
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
  width: 180px;
}
</style>
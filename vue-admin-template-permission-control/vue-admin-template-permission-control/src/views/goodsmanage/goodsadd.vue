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

      <el-form-item label="描述图" prop="filelist" ref="filelist">
        <el-upload
          accept=".png,.jpg"
          :action="uploadurl"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
          :file-list="fileListpic"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
      </el-form-item>

      <el-form-item label="价格" prop="priceyuan">
        <el-input-number
          :min="0"
          v-model.number="form.priceyuan"
          type="number"
        ></el-input-number>
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
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="" />
    </el-dialog>
  </div>
</template>

<script>
import { getGoods, addGoods, commodifyupdate } from "@/api/table";

export default {
  data() {
    return {
      fileListpic: [],
      fileList: [],
      uploadurl: `${process.env.VUE_APP_BASE_API}/file/upload`,
      oper: "立即添加",
      dialogImageUrl: "",
      dialogVisible: false,
      form: {
        commodifyId: "",
        name: "",
        price: "",
        pircture: "",
        details: "",
        unit: "",
        detailsPic: "",
      },
      form2: {
        pageNum: 1,
        pageSize: 20,

        status: "1",
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
        filelist: [
          {
            required: true,
            validator: (rule, value, callback) => {
              if (this.form.detailsPic === "") {
                callback(new Error("请上传详情图片"));
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

  async mounted() {
    if (this.$route.query.commodifyId) {
      this.form2.commodifyId = this.$route.query.commodifyId;

      let row = await getGoods(this.form2)
        .then((response) => {
          console.log("res", response.data);
          return response.data[0];
        })
        .catch((err) => {});

      // let row = this.$route.params.row;

      if (row != undefined) {
        this.oper = "立即修改";
        row.priceyuan = row.price / 100;
        if (row.detailsPic) {
          row.detailsPic.split(",").map((item) => {
            if (item != "") {
              this.fileListpic.push({
                url: `${process.env.VUE_APP_PIC_API}${item}`,
                urlori: item,
              });
            }
          });
        }

        this.form = Object.assign({}, this.form, row);
      }
    }
  },

  methods: {
    handleRemove(file, fileList) {
      fileList.map((index, item) => {
        if (item.uid == file.uid) {
          fileList.splice(index, 1);
        }
      });
      this.fileListpic = fileList;
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleAvatarSuccess(res, file, fileList) {
      if (res.code == 1) {
        fileList.map((item, index) => {
          //直接得到最后一个数组不能直接添加元素 urlori

          if (index === fileList.length - 1) {
            item.urlori = res.message;
            item.url = `${process.env.VUE_APP_PIC_API}${res.message}`;
          }
        });
        this.fileListpic = fileList;
        this.$refs.filelist.clearValidate();
        console.log(this.fileListpic);
      } else {
        this.$message.error("图片上传失败");
      }
    },
    beforeAvatarUpload(file) {
      console.log(file.type);
      const isJPG = file.type.indexOf("image") > -1;
      // const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("请上传图片!");
      }
      // if (!isLt2M) {
      //   this.$message.error("上传头像图片大小不能超过 2MB!");
      // }
      return isJPG;
    },

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
      this.form.detailsPic = "";
      this.fileListpic.map((item) => {
        this.form.detailsPic = this.form.detailsPic + "," + item.urlori;
      });
      console.log(this.form.detailsPic);
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
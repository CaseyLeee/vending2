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
      <el-form-item label="设备类型名称" prop="name" label-width="120px">
        <el-input v-model="form.name"></el-input>
      </el-form-item>

      <el-form-item label="说明" label-width="120px">
        <el-input v-model="form.remark"></el-input>
      </el-form-item>
      <el-form-item label="描述图" prop="filelist" ref="filelist" label-width="120px">
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

      <el-form-item label-width="120px">
        <el-button type="primary" @click="onSubmit('form')">{{
          oper
        }}</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { deviceTypeadd ,deviceTypeupdate} from "@/api/table";

export default {
  data() {
    return {
      fileListpic: [],
      fileList: [],
      dialogImageUrl: "",
      dialogVisible: false,
      uploadurl: `${process.env.VUE_APP_BASE_API}/file/upload`,
      oper: "立即添加",
      form: {
        id: "",
        name: "",
        remark: "",
        pictures: "",
      },
      filebinary: "",
      rules: {
        name: [
          {
            required: true,
            message: "请输入名称",
            trigger: "blur",
          },
        ],
      },
    };
  },
  mounted() {
  
    if (this.$route.params.row) {
      let row = this.$route.params.row;

      if (this.$route.params.row != undefined) {
        this.oper = "立即修改";

        if (row.pictures) {
          row.pictures.split(",").map((item) => {
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
          //直接得到最后一个数组不能直接添加元素 urlori   组件上传一个图片 list是blob  需要替换下

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

    onSubmit(formName) {
      this.form.pictures = "";
      this.fileListpic.map((item) => {
        this.form.pictures = this.form.pictures + "," + item.urlori;
      });
      console.log(this.form.pictures);

      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.oper == "立即添加") {
            this.form.id = Math.round(Math.random() * 9999) + 1000;
            console.log(this.form);
            deviceTypeadd(this.form)
              .then((response) => {
                this.$message.success("添加设备成功");
              })
              .catch((error) => {
                this.$message.error(error);
              });
          } else {
          
            console.log(this.form);
            deviceTypeupdate(this.form)
              .then((response) => {
                this.$message.success("修改设备成功");
              })
              .catch((error) => {
                this.$message.error(error);
              });
          }
        } else {
        }
      });
    },
  },
};
</script>

<style>
.containbd {
  width: 50%;
  margin-left: 25%;
}
</style>
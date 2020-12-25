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
    <el-form-item label="设备类型名称" prop="name"  label-width="120px">
      <el-input v-model="form.name"></el-input>
    </el-form-item>

    <el-form-item label="说明"   label-width="120px">
      <el-input v-model="form.remark"></el-input>
    </el-form-item>

  
    <el-form-item   label-width="120px">
      <el-button type="primary" @click="onSubmit('form')">{{ oper }}</el-button>
    </el-form-item>
  </el-form>
</div>
  
</template>

<script>
import { deviceTypeadd } from "@/api/table";

export default {
  data() {
    return {
     
      oper: "立即添加",
      form: {
        id: "",
        name: "",
        remark:""
      
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
  
  },
  methods: {
   
  
     onSubmit(formName) {
      this.$refs[formName].validate( (valid) => {
        if (valid) {
          this.form.id= Math.round(Math.random()*9999)+1000
          console.log(this.form)
          deviceTypeadd(this.form)
            .then((response) => {
               this.$message.success('添加设备成功');
            })
            .catch((error) => {
              this.$message.error(error);
            });
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
<template>
  <div>
    <div class="ondition">
      <el-input
        v-model="form.orderId"
        placeholder=""
        size="normal"
        clearable
        style="width:300px"
      ></el-input>
      <!-- eslint-disable-next-line -->
      <el-button type="primary" size="default" @click="query" style="margin-left:20px">查询</el-button>
    </div>
    <el-form
      v-if="flag"
      :model="data"
      ref="form"
      label-width="80px"
      :inline="false"
      size="normal"
    >
      <el-form-item label="退款号"  >
        <el-input v-model="data.refundId"></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { refundquery } from "@/api/table";
export default {
  data() {
    return {
      flag:false,
      orderId: "",
      form: {
        orderId: "",
      },
      data: {},
    };
  },
  created() {},
  methods: {
    query() {
      this.queryList();
    },
    queryList() {
      refundquery(this.form)
        .then((response) => {
          this.form = response.data;
          if(this.form.length>0){
            this.flag=true
          }
        })
        .catch((err) => {});
    },
  },
};
</script>

<style>
.ondition {
  display: flex;
}
</style>
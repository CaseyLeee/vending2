<template>
  <div class="cont">
    <div class="ondition">
      <el-input
        v-model="form.orderId"
        placeholder=""
        size="normal"
        clearable
        style="width: 300px"
      ></el-input>
      <!-- eslint-disable-next-line -->
      <el-button
        type="primary"
        size="default"
        @click="query"
        style="margin-left: 20px"
        >查询</el-button
      >
    </div>
    <div class="items">
      <el-form
        v-if="flag"
        :model="data"
        ref="form"
        label-width="80px"
        :inline="false"
        size="normal"
      >
        <el-form-item label="退款号">
          <el-input v-model="data.refundId"></el-input>
        </el-form-item>
        <el-form-item label="订单号">
          <el-input v-model="data.orderId"></el-input>
        </el-form-item>
        <el-form-item label="退款金额">
          <el-input v-model="data.money"></el-input>
        </el-form-item>
        <el-form-item label="退款理由">
          <el-input v-model="data.reason"></el-input>
        </el-form-item>
        <el-form-item label="账号Id">
          <el-input v-model="data.userId"></el-input>
        </el-form-item>
        <el-form-item label="更新时间">
          <el-input v-model="data.pdateTime"></el-input>
        </el-form-item>
        <el-form-item label="创建时间">
          <el-input v-model="data.createTime"></el-input>
        </el-form-item>
        <el-form-item label="退款状态">
          <el-input v-model="data.status"></el-input>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { refundquery } from "@/api/table";
export default {
  data() {
    return {
      flag: false,
      orderId: "",
      form: {
        orderId: "",
      },
      data: {},
    };
  },
  created() {},
  mounted() {
    if (this.$route.params.orderId) {
      this.form.orderId = this.$route.params.orderId;
      this.query();
    }
  },
  methods: {
    query() {
      this.queryList();
    },
    queryList() {
      refundquery(this.form)
        .then((response) => {
          this.data = response.data;
      
          if (this.data.refundId) {
            this.flag = true;
          }
          
        })
        .catch((err) => {});
    },
  },
};
</script>

<style   lang='scss' >
.ondition {
  display: flex;
  margin-bottom: 20px;
}
.cont {
  width: 80%;
  margin-left: 10%;
  margin-top: 20px;
}
.items{
  .el-input__inner{
    border: 0 !important;
  }
}
</style>
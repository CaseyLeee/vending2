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
           <span>{{ data.refundId}}</span>
         
        </el-form-item>
        <el-form-item label="订单号">
          <span>{{ data.orderId}}</span>
         
        </el-form-item>
        <el-form-item label="退款金额">
   <span>{{ data.money/100}}</span>
         
        </el-form-item>
        <el-form-item label="退款理由">
          <span>{{ data.reason}}</span>
      
        </el-form-item>
        <el-form-item label="账号Id">
            <span>{{ data.userId}}</span>
         
        </el-form-item>
        <el-form-item label="更新时间">
           <span>{{ data.pdateTime| formatDate}}</span>
       
        </el-form-item>
        <el-form-item label="创建时间">
          <span>{{ data.createTime | formatDate }}</span>
       
        </el-form-item>
        <el-form-item label="退款状态">
          <span>{{
            data.status == 0
              ? "关闭"
              : data.status == 1
              ? "退款中"
              : data.status == 2
              ? "成功"
              : data.status == 3
              ? "异常"
              : ""
          }}</span>
          
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
        .catch((err) => {
          this.data={}
        });
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
.items {
  .el-input__inner {
    border: 0 !important;
  }
}
</style>
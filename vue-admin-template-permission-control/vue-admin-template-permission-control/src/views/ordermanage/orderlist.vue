<template>
  <div>
    <el-table
      :data="
        goodslist.filter(
          (data) =>
            !search || data.orderId.toLowerCase().includes(search.toLowerCase())
        )
      "
      style="width: 100%"
    >
      <el-table-column label="orderId" prop="orderId"> </el-table-column>
      <el-table-column label="商品名称" prop="commodifyName"> </el-table-column>

      <el-table-column label="单价">
        <template slot-scope="scope"> {{ scope.row.price / 100 }} </template>
      </el-table-column>

      <el-table-column label="数量" prop="number"> </el-table-column>
      <el-table-column label="单位" prop="unit"> </el-table-column>
      <el-table-column label="总价">
        <template slot-scope="scope">
          {{ scope.row.totalPrice / 100 }}
        </template>
      </el-table-column>
      <el-table-column label="消费者id" prop="cosumerId"> </el-table-column>
      <el-table-column label="状态" prop="status">
        <template slot-scope="scope">
          {{ scope.row.status | formatStatus }}
        </template>
      </el-table-column>
      <el-table-column label="更新时间" prop="updateTime">
        <template slot-scope="scope">
          {{ scope.row.updateTime | formatDate }}
        </template>
      </el-table-column>
      <el-table-column label="创建时间" prop="createTime">
        <template slot-scope="scope">
          {{ scope.row.createTime | formatDate }}
        </template>
      </el-table-column>
      <!-- <el-table-column label="设备id" prop="deviceId"> </el-table-column> -->
      <!-- <el-table-column label="客户订单状态" prop="statusCosumer">
        <template slot-scope="scope">
          {{ scope.row.statusCosumer == 0 ? "删除" : "正常" }}
        </template>
      </el-table-column> -->

      <el-table-column align="center" fixed="right" width="200">
        <!-- eslint-disable-next-line -->
        <template slot="header" slot-scope="scope">
          <el-input
            prefix-icon="el-icon-search"
            v-model="search"
            size="mini"
            placeholder="输入订单关键字搜索"
          />
        </template>
        <template slot-scope="scope" v-if="type == 1">
          <el-button
            size="mini"
            type="danger"
            @click="refundadd(scope.row.orderId, scope.row.totalPrice)"
            >退款</el-button
          >
          <el-button
            v-if="scope.row.status == 5"
            size="mini"
            type="primary"
            @click="refundquery(scope.row.orderId)"
            >查询退款</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @current-change="handleCurrentChange"
      style="text-align: center; margin: 20px 0"
      :page-size="form.pageSize"
      :page-sizes="pager.sizes"
      :total="pager.total"
      layout="total, sizes, prev, pager, next, jumper"
    >
    </el-pagination>

    <el-dialog
      title="退款"
      :visible.sync="dialogFormVisible"
     
      
    >
      <el-form :model="formpost" ref="ruleForm"  :rules="rules">
        <el-form-item
          label="退款金额"
          :label-width="formLabelWidth"
          prop="moneyori"
        >
          <el-input v-model="formpost.moneyori" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
          label="退款原因"
          :label-width="formLabelWidth"
          prop="reason"
        >
          <el-input v-model="formpost.reason" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="refundsubmit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  refund,
  orderquery,
  refundadd,
  backGroundorderquery,
} from "@/api/table";
import { getUserinfo } from "@/utils/auth";
export default {
  data() {
    return {
      rules: {
        reason: [
          { required: true, message: "请输入退款原因", trigger: "blur" },
          {
            min: 1,
            max: 100,
            message: "长度在 1 到 100 个字符",
            trigger: "blur",
          },
        ],
        moneyori: [
          { required: true, message: "请输入退款金额", trigger: "blur" },
        ],
      },
      type: "",
      formLabelWidth: "120px",
      dialogFormVisible: false,
      search: "",
      bind: false,
      goodslist: [],

      form: {
        pageNum: 1,
        pageSize: 20,
      },
      pager: {
        total: 0,
        sizes: [20],
      },
      formpost: {
        orderId: "",
        money: "",
        moneyori: "",
        reason: "",
      },
    };
  },
  filters: {
    formatStatus: function (value) {
      return value == 0
        ? "删除"
        : value == 1
        ? "未支付"
        : value == 2
        ? "已支付"
        : value == 3
        ? "支付异常"
        : value == 4
        ? "已撤销"
        : value == 5
        ? "退款"
        : "其他";
    },
  },
  created() {},
  computed: {},
  mounted() {
    let { type } = JSON.parse(getUserinfo());
    this.type = type;

    this.queryList();
  },
  methods: {
    // submit() {
    //   this.dialogFormVisible = false;
    //   refund(this.formpost)
    //     .then((response) => {})
    //     .catch((err) => {});
    // },
    refundquery(orderId) {
      this.$router.push({
        name: "queryrefund",
        path: "/ordermanage/queryrefund",
        params: {
          orderId,
        },
      });
    },
    getAvator(picturePath) {
      return `${process.env.VUE_APP_PIC_API}/${picturePath}`;
    },
    handleSizeChange(val) {
      this.form.pageNum = val;
      this.queryList();
    },
    handleCurrentChange(val) {
      this.form.pageNum = val;
      this.queryList();
    },

    refundadd(orderId, total) {
      this.formpost.orderId = orderId;
      this.formpost.moneyori = total / 100;

      this.dialogFormVisible = true;
    },
    refundsubmit() {
      let that = this;
      that.$refs['ruleForm'].validate((valid) => {
        if (valid) {
          this.formpost.money = this.formpost.moneyori * 100;
          refundadd(this.formpost)
            .then((response) => {
              // that.formpost.money=''
              //   that.formpost.reason=''
              this.$message.success("退款成功");
            })
            .catch((err) => {});
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    queryList() {
      if (this.type == 0) {
        orderquery(this.form)
          .then((response) => {
            this.goodslist = response.data;
            this.pager.total = response.totalNum;
          })
          .catch((err) => {});
      } else {
        backGroundorderquery(this.form)
          .then((response) => {
            this.goodslist = response.data;
            this.pager.total = response.totalNum;
          })
          .catch((err) => {});
      }
    },
  },
};
</script>

<style  lang='scss' scoped>
img {
  width: 50px;
}
</style>
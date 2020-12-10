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

      <el-table-column label="单价" prop="price"> </el-table-column>

      <el-table-column label="数量" prop="number"> </el-table-column>
      <el-table-column label="单位" prop="unit"> </el-table-column>
      <el-table-column label="总价" prop="totalPrice"> </el-table-column>
      <el-table-column label="消费者id" prop="comumerId"> </el-table-column>
      <el-table-column label="状态" prop="status"> </el-table-column>
      <el-table-column label="更新时间" prop="updateTime"> </el-table-column>
      <el-table-column label="创建时间" prop="createTime"> </el-table-column>
      <el-table-column label="设备id" prop="deviceId"> </el-table-column>
      <el-table-column label="客户订单状态" prop="tatusCosumer">
      </el-table-column>

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
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="danger"
            @click="refundadd(scope.row.orderId)"
            >退款</el-button
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

    <el-dialog title="退款" :visible.sync="dialogFormVisible">
      <el-form :model="formpost">
        <el-form-item label="退款金额" :label-width="formLabelWidth">
          <el-input v-model="formpost.money" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="退款原因" :label-width="formLabelWidth">
          <el-input v-model="formpost.reason" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { refund,orderquery } from "@/api/table";
export default {
  data() {
    return {
      formLabelWidth: "120px",
      dialogFormVisible: false,
      search: "",
      bind: false,
      goodslist: [],
      picurl: require("../../assets/image/rice.png"),
      form: {
        pageNum: 1,
        pageSize: 20,
      },
      pager: {
        total: 0,
        sizes: [20],
      },
      formpost: {
        money:"",
        reason:""
      },
    };
  },
  created() {
    this.queryList();
  },
  computed: {},
  mounted() {},
  methods: {
    submit() {
      this.dialogFormVisible = false;
      refund(this.formpost)
        .then((response) => {})
        .catch((err) => {});
    },
    getAvator(picturePath) {
      return `${process.env.VUE_APP_PIC_API}/${picturePath}`;
    },
    handleSizeChange(val) {
      alert(val);
    },
    handleCurrentChange(val) {
      alert(val);
    },

    refundadd(orderId) {
        this.formpost.orderId=orderId
      this.dialogFormVisible = true;
      
    },
    queryList() {
    
      orderquery(this.form)
        .then((response) => {
          this.goodslist = response.data;
          this.pager.total = response.totalNum;
        })
        .catch((err) => {});
    },
  },
};
</script>

<style  lang='scss' scoped>
img {
  width: 50px;
}
</style>
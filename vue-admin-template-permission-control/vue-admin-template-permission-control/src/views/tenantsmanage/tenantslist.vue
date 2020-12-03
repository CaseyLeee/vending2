<template>
  <div>
    <el-table
      :data="
        goodslist.filter(
          (data) =>
            !search || data.name.toLowerCase().includes(search.toLowerCase())
        )
      "
      style="width: 100%"
    >
      <el-table-column label="名称" prop="name"> </el-table-column>

      <el-table-column label="账号" prop="account"> </el-table-column>

      <el-table-column label="绑定邮箱" prop="phone"> </el-table-column>
      <el-table-column label="账户父id" prop="userPid"> </el-table-column>
      <el-table-column label="logo" prop="logo">
        <template slot-scope="scope">
          <img :src="getAvator(scope.row.logo)" />
        </template>
      </el-table-column>
      <el-table-column label="地址" prop="address"> </el-table-column>
      <el-table-column label="开箱码" prop="devicePassord"> </el-table-column>
      <el-table-column label="状态" prop="status"> </el-table-column>
      <el-table-column label="账户类型" prop="type"> </el-table-column>
      <el-table-column label="微信id" prop="weixin"> </el-table-column>
      <el-table-column label="费率" prop="feeRate"> </el-table-column>
      <el-table-column label="余额" prop="money"> </el-table-column>
      <el-table-column align="center" fixed="right" width="200">
        <!-- eslint-disable-next-line -->
        <template slot="header" slot-scope="scope">
          <el-input
            prefix-icon="el-icon-search"
            v-model="search"
            size="mini"
            placeholder="输入关键字搜索"
          />
        </template>
        <template slot-scope="scope">
      
          <el-button size="mini" type="danger" @click="del(scope.row.userId)"
            >删除</el-button
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
  </div>
</template>

<script>
import { userquery, userdelete } from "@/api/table";
export default {
  data() {
    return {
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
        typeId: "",
        number: "",
        commodifyId: "",
        containerId: "",
      },
    };
  },
  created() {
    this.queryList();
  },
  computed: {},
  mounted() {},
  methods: {
    getAvator(picturePath) {
      return `${process.env.VUE_APP_PIC_API}/${picturePath}`;
    },
    handleSizeChange(val) {
      alert(val);
    },
    handleCurrentChange(val) {
      alert(val);
    },
 
    del(userId) {
      this.$confirm("确定删除此账户吗, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          userdelete(this.$qs.stringify({"userId":userId}))
            .then((response) => {
              this.$message({
                type: "success",
                message: "删除成功!",
              });
              this.queryList()
            })
            .catch((err) => {});
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    queryList() {
      userquery(this.form)
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
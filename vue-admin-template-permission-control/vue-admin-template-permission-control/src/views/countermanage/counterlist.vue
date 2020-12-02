<template>
  <div>
    <el-table
      :data="
        counterlist.filter(
          (data) =>
            !search || data.title.toLowerCase().includes(search.toLowerCase())
        )
      "
      style="width: 100%"
    >
      <el-table-column label="序号" prop="title"> </el-table-column>
      <el-table-column label="货柜" prop="title"> </el-table-column>
  <el-table-column label="货柜类型" prop="title"> </el-table-column>
    <el-table-column label="货柜ID" prop="title"> </el-table-column>
     <el-table-column label="货柜状态" prop="title"> </el-table-column>
     <el-table-column label="货柜名称" prop="title"> </el-table-column>
     <el-table-column label="订单数" prop="title"> </el-table-column>
       <el-table-column label="所属" prop="title"> </el-table-column>
      <el-table-column align="center"  fixed="right" width="200">>
        <!-- eslint-disable-next-line -->
        <template slot="header" slot-scope="scope">
          <el-input  prefix-icon="el-icon-search"  v-model="search" size="mini" placeholder="输入关键字搜索" />
        </template>
        <template slot-scope="scope">
          <el-button size="mini" @click="edit(scope.row.id)">编辑</el-button>
          <el-button size="mini" type="danger" @click="del(scope.row.id)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getGoods } from "@/api/table";
export default {
  data() {
    return {
      search: "",
      counterlist: [],
      picurl: require("../../assets/image/rice.png"),
    };
  },
  created() {
    this.queryList();
  },
  methods: {
    edit(id) {
      this.$router.push({
        name: "goodslist",
        path: "/goodsmanage/goodslist",
        params: {
          id,
        },
      });
    },
    del(id) {
      this.$confirm("确定删除此货柜吗, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "删除成功!" + id,
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除" + id,
          });
        });
    },
    queryList() {
      getGoods()
        .then((response) => {
          this.counterlist = response.data.items;
        })
        .catch((err) => {});
    },
  },
};
</script>

<style  lang='scss' scoped>
.listitem {
  background: #ffffff;
  box-shadow: 0px 3px 22px 2px #dfdfdf;
  border-radius: 10px;
  padding: 10px 10px 10px 0;
  margin: 20px;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;

  div {
    display: flex;
    justify-content: center;
    align-content: center;
  }
  div:nth-child(1) {
    flex: 3;
    span {
      display: inline-block;
      border: solid 1px #cccccc;
      width: 25px;
      height: 25px;
      border-radius: 2px;
      color: #999999;
      text-align: center;
      line-height: 25px;
    }
  }
  div:nth-child(2) {
    height: 100%;
    flex: 3;
    img {
      object-fit: fill;
      width: 70%;
      height: 100%;
    }
  }
  div:nth-child(3) {
    flex: 3;
  }
  div:nth-child(4) {
    flex: 6;

    border-left: 1px solid #cccccc;

    height: 100%;
    line-height: 80px;
  }
  div:nth-child(5) {
    flex: 6;
  }
  div:nth-child(6) {
    font-size: 12px;
    font-weight: 400;
    color: #ef7070;
    flex: 1;
  }
  div:nth-child(7) {
    flex: 1;
    font-size: 12px;
    font-weight: 400;
    color: #878686;
  }
}
</style>
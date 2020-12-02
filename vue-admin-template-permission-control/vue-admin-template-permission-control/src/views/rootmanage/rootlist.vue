<template>
  <div>
    <el-table
      :data="
        deviceTypelist.filter(
          (data) =>
            !search || data.title.toLowerCase().includes(search.toLowerCase())
        )
      "
      style="width: 100%"
    >
      <el-table-column label="设备类型 id" prop="id"> </el-table-column>
      <el-table-column label="设备类型名称" prop="name"> </el-table-column>
  <el-table-column label="说明" prop="remark"> </el-table-column>
    
      <el-table-column align="center"  fixed="right" width="200">>
        <!-- eslint-disable-next-line -->
        <template slot="header" slot-scope="scope">
          <el-input  prefix-icon="el-icon-search"  v-model="search" size="mini" placeholder="输入关键字搜索" />
        </template>
        <template slot-scope="scope">
        
          <el-button size="mini" type="danger" @click="del(scope.row.id)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { deviceTypelist } from "@/api/table";
export default {
  data() {
    return {
      search: "",
      deviceTypelist: [],
     
    };
  },
  created() {
    this.queryList();
  },
  methods: {
   
    
    del(id) {
      this.$confirm("确定删除此类型吗, 是否继续?", "提示", {
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
      deviceTypelist()
        .then((response) => {
          this.deviceTypelist = response.data;
        })
        .catch((err) => {});
    },
  },
};
</script>

<style  lang='scss' scoped>

</style>
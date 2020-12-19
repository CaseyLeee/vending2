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
      <el-table-column label="商品名称" prop="name"> </el-table-column>
      <el-table-column label="价格" prop="price">
        <template slot-scope="scope">
         {{scope.row.price/100}} </template
      ></el-table-column>
      <el-table-column label="图片">
        <!-- eslint-disable-next-line -->
        <template slot-scope="scope">
          <img :src="getAvator(scope.row.pircture)" />
        </template>
      </el-table-column>
      <el-table-column label="详情" prop="details"> </el-table-column>
      <el-table-column label="单位" prop="unit"> </el-table-column>
      <el-table-column label="状态" prop="status"> </el-table-column>

      <el-table-column
        align="center"
        fixed="right"
        width="200"
        v-if="!bind"
        key="1"
      >
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
          <el-button size="mini" @click="edit(scope.row)">编辑</el-button>
        </template>
      </el-table-column>
      <el-table-column align="center" fixed="right" width="200" key="2" v-else>
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
          <el-button
            type="primary"
            size="mini"
            @click="bindfun(scope.row.commodifyId)"
            >绑定</el-button
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
import { getGoods, containeradd } from "@/api/table";
export default {
  data() {
    return {
      search: "",
      bind: false,
      goodslist: [],

      form: {
        pageNum: 1,
        pageSize: 20,

        status: "1",
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
    let typeId = this.$route.params.typeId;
    if (typeId != undefined) {
      this.bind = true;
    }
    this.formpost.typeId = typeId;
    this.formpost.number = this.$route.params.number;
    //通过id获取商品参数
    console.log("typeId", typeId);

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
    edit(row) {
      this.$router.push({
        name: "goodsedit",
        path: "/goodsmanage/goodsedit",
        params: {
          row,
        },
      });
    },

    queryList() {
      getGoods(this.form)
        .then((response) => {
          this.goodslist = response.data;
          this.pager.total = response.totalNum;
        })
        .catch((err) => {});
    },
    bindfun(id) {
      this.formpost.containerId = this.guid();
      this.formpost.commodifyId = id;
      containeradd(this.formpost)
        .then((response) => {
          this.$message({
            type: "success",
            message: "绑定成功!",
          });
          this.$router.push({
            name: "rootbind",
            path: "/rootmanage/rootbind",
            params: {
              id,
            },
          });
        })
        .catch((err) => {
          this.$message({
            type: "success",
            message: "绑定失败",
          });
        });
    },
    guid() {
      function S4() {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
      }
      return S4() + S4() + S4() + S4() + S4() + S4() + S4() + S4();
    },
  },
};
</script>

<style  lang='scss' scoped>
img {
  width: 50px;
}
</style>
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
      <el-table-column label="设备ID" prop="deviceId"> </el-table-column>
      <el-table-column label="sn号" prop="identifyId"> </el-table-column>
      <el-table-column label="设备名称" prop="name"> </el-table-column>

      <el-table-column label="备注" prop="remrak"> </el-table-column>
      <el-table-column label="归属账号" prop="userId">
        <!-- eslint-disable-next-line -->
        <template slot-scope="scope">
          <span> {{ scope.row.username }}</span>
        </template>
      </el-table-column>
      <el-table-column label="地址" prop="position"> </el-table-column>
      <el-table-column label="设备类型" prop="type"> </el-table-column>
      <el-table-column
        label="设备存货情况"
        prop="containerState"
        width="170"
        align="center"
      >
        <!-- eslint-disable-next-line -->
        <template slot-scope="scope">
          <div class="containerState">
            <span
              :key="index"
              :ref="item"
              class="containerStateitem"
              :style="{ background: scope.row.arr[index] == 1 ? 'green' : '' }"
              v-for="(item, index) in scope.row.arr"
            >
              {{ item }}
            </span>
          </div>
        </template>
      </el-table-column>
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
          <el-button size="mini" @click="edit(scope.row)">编辑</el-button>
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
import { deviceQuery, devicelist, userquery } from "@/api/table";
import { getUserinfo } from "@/utils/auth";
export default {
  data() {
    return {
      userlistmap: {},
      type: "",
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
    };
  },
  created() {},
  computed: {},
  async mounted() {
    let { type } = JSON.parse(getUserinfo());
    this.type = type;
    let userlist = await userquery({});
    let that = this;
    userlist.data.map(function (item) {
      that.userlistmap[item.userId] = item;
    });
    this.queryList();
  },
  methods: {
    handleSizeChange(val) {
      this.form.pageNum = val;
      this.queryList();
    },
    handleCurrentChange(val) {
      this.form.pageNum = val;
      this.queryList();
    },
    edit(row) {
      this.$router.push({
        name: "counteredit",
        path: "/countermanage/counteredit",
        params: {
          row,
        },
      });
    },

    queryList() {
      let that = this;
      if (this.type == 1) {
        //运维人员
        //usertype不同  走不同的接口
        deviceQuery(this.form)
          .then((response) => {
            this.goodslist = response.data;

            this.goodslist.map(function (item) {
              item.username =
                that.userlistmap[item.userId] != undefined
                  ? that.userlistmap[item.userId].name
                  : "";
              item.arr =
                item.containerState != undefined
                  ? item.containerState.split("")
                  : [];
            });
            // this.pager.total = response.totalNum;

            this.$set(this.pager, "total", response.totalNum);
          })
          .catch((err) => {});
      } else {
        devicelist(this.form)
          .then((response) => {
            this.goodslist = response.data;

            this.$set(this.pager, "total", response.totalNum);
            this.goodslist.map(function (item) {
              item.username =
                that.userlistmap[item.userId] != undefined
                  ? that.userlistmap[item.userId].name
                  : "";
              item.arr =
                item.containerState != undefined
                  ? item.containerState.split("")
                  : [];
            });
          })
          .catch((err) => {});
      }
    },
  },
};
</script>

<style  lang='scss' scoped>
.containerState {
  display: flex;
  flex-wrap: wrap;
  width: 150px;
  height: 75px;
  box-sizing: border-box;
}
.containerStateitem {
  border: 5px solid white;
  box-sizing: border-box;
  background: #909399;
  width: 25%;
  height: 50%;
  display: block;
  border-radius: 50%;
  text-align: center;
  color: white;
  font-size: 12px;
  font-weight: 800;
}
</style>
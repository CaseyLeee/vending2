<template>
  <div>
    <!-- <div class="searchcon">
      <el-input
        prefix-icon="el-icon-search"
        v-model="search"
        size="mini"
        placeholder="输入关键字搜索"
      />
    </div>

    <div class="listitem" v-for="(item, index) in goodslistcp" :key="item.id">
      <div>
        <span>{{ +index + 1 }}</span>
      </div>
      <div><img :src="picurl" /></div>
      <div>{{ item.name }}</div>
      <div>{{ item.details }}</div>
      <div>{{ item.unit }}</div>
      <div>{{ item.status }}</div>
       <div>{{ item.prize }}</div>
      <div v-if="!bind" @click="del(item.id)">删除</div>
      <div v-if="!bind" @click="edit(item.id)">编辑</div>

      <el-button type="primary" size="mini" v-if="bind" @click="bindfun(item.id)"
        >绑定</el-button
      >
    </div>
    <div>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        style="text-align: center; margin: 20px 0"
        :page-size="form.pageSize"
        :page-sizes="pager.sizes"
        :total="pager.total"
        layout="total, sizes, prev, pager, next, jumper"
      >
      </el-pagination>
    </div> -->




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
      <el-table-column label="价格" prop="prize"> </el-table-column>
  <el-table-column label="图片" prop="pircture">
      <!-- eslint-disable-next-line -->
      <template slot="header" slot-scope="scope">
        <img :src="`${process.env.VUE_APP_PIC_API}${scope.row.pircture}`" />
        </template>
         </el-table-column>
    <el-table-column label="详情" prop="details"> </el-table-column>
     <el-table-column label="单位" prop="unit"> </el-table-column>
     <el-table-column label="状态" prop="status"> </el-table-column>
    
      <el-table-column align="center"  fixed="right" width="200">>
        <!-- eslint-disable-next-line -->
        <template slot="header" slot-scope="scope">
          <el-input  prefix-icon="el-icon-search"  v-model="search" size="mini" placeholder="输入关键字搜索" />
        </template>
        <template slot-scope="scope" v-if="!bind">
          <el-button size="mini" @click="edit(scope.row.commodifyId)">编辑</el-button>
          <el-button size="mini" type="danger" @click="del(scope.row.commodifyId)"
            >删除</el-button
          >
        </template>
          <!-- eslint-disable-next-line -->
         <template slot-scope="scope" v-if="bind">
              <el-button type="primary" size="mini" v-if="bind" @click="bindfun(scope.row.commodifyId)"
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
import { getGoods ,containeradd} from "@/api/table";
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
       
        status: "1",
      },
      pager: {
        total: 0,
        sizes: [20],
      },
      formpost:{
        typeId:"",
        number:"",
        commodifyId:"",
        containerId:""
      }
    };
  },
  created() {
    this.queryList();
  },
  computed: {
    goodslistcp() {
      return this.goodslist.filter(
        (data) =>
          !this.search || data.title.toLowerCase().includes(this.search.toLowerCase())
      );
    },
  },
  mounted() {
    let typeId = this.$route.params.typeId;
    if (typeId != null) {
      this.bind = true;
    }
    this.formpost.typeId=typeId;
    this.formpost.number=this.$route.params.number;
    //通过id获取商品参数
    console.log("typeId", typeId);
  },
  methods: {
    handleSizeChange(val) {
      alert(val);
    },
    handleCurrentChange(val) {
      alert(val);
    },
    edit(id) {
      this.$router.push({
        name: "goodsedit",
        path: "/goodsmanage/goodsedit",
        params: {
          id,
        },
      });
    },
    del(id) {
      this.$confirm("确定删除此商品吗, 是否继续?", "提示", {
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
      getGoods(this.form)
        .then((response) => {
          this.goodslist = response.data;
          this.pager.total=response.totalNum
        })
        .catch((err) => {});
    },
    bindfun(id) {
      this.formpost.containerId=this.guid();
      this.formpost.commodifyId=id
       containeradd(this.formpost)
        .then((response) => {
         
        })
        .catch((err) => {});

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
// .searchcon {
//   width: 30%;
//   margin-left: 20px;
// }
// .listitem {
//   background: #ffffff;
//   box-shadow: 0px 3px 22px 2px #dfdfdf;
//   border-radius: 10px;
//   padding: 10px 10px 10px 0;
//   margin: 20px;
//   height: 100px;
//   display: flex;
//   justify-content: center;
//   align-items: center;

//   div {
//     display: flex;
//     justify-content: center;
//     align-content: center;
//   }
//   div:nth-child(1) {
//     flex: 3;
//     span {
//       display: inline-block;
//       border: solid 1px #cccccc;
//       width: 25px;
//       height: 25px;
//       border-radius: 2px;
//       color: #999999;
//       text-align: center;
//       line-height: 25px;
//     }
//   }
//   div:nth-child(2) {
//     height: 100%;
//     flex: 3;
//     img {
//       object-fit: fill;
//       width: 70%;
//       height: 100%;
//     }
//   }
//   div:nth-child(3) {
//     flex: 3;
//   }
//   div:nth-child(4) {
//     flex: 3;

//     border-left: 1px solid #cccccc;

//     height: 100%;
//     line-height: 80px;
//   }
//   div:nth-child(5) {
//     flex: 3;
//   }
//   div:nth-child(6) {
//     flex: 3;
//   }
//   div:nth-child(7) {
//     flex: 3;
//   }
//   div:nth-child(8) {
//     font-size: 12px;
//     font-weight: 400;
//     color: #ef7070;
//     flex: 1;
//   }
//   div:nth-child(9) {
//     flex: 1;
//     font-size: 12px;
//     font-weight: 400;
//     color: #878686;
//   }
// }
</style>
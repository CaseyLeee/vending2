<template>
  <div>
    <el-select
      v-model="deviceTypeId"
      value-key=""
      placeholder=""
      clearable
      filterable
      @change="change"
    >
      <el-option
        v-for="item in deviceTypelist"
        :key="item.id"
        :label="item.name"
        :value="item.id"
      >
      </el-option>
    </el-select>

    <div class="chequer">
      <div class="chequeritem" @click="to(7)">
        <div>固定</div>
        <img
          v-if="containerlistfixed7.commodifyId"
          :src="getAvator(containerlistfixed7.commodify.pircture)"
          alt=""
        />
        <i v-else class="el-icon-plus avatar-uploader-icon upload"></i>
        <div class="words" v-if="containerlistfixed7.commodifyId">
          <span>{{ containerlistfixed7.commodify.name }}</span>
          <span
            >{{ containerlistfixed7.commodify.price
            }}/{{ containerlistfixed7.commodify.unit }}</span
          >
        </div>
      </div>
      <div class="chequeritem" @click="to(8)">
        <div>固定</div>
        <img
          v-if="containerlistfixed8.commodifyId"
          :src="getAvator(containerlistfixed8.commodify.pircture)"
          alt=""
        />
        <i v-else class="el-icon-plus avatar-uploader-icon upload"></i>
        <div class="words" v-if="containerlistfixed8.commodifyId">
          <span>{{ containerlistfixed8.commodify.name }}</span>
          <span
            >{{ containerlistfixed8.commodify.price
            }}/{{ containerlistfixed8.commodify.unit }}</span
          >
        </div>
      </div>
    </div>

    <div class="chequer">
      <div
        class="chequeritem"
        v-for="item in containerlistnofix"
        :key="item.id"
      >
        <i class="el-icon-close close" @click="deletecon(item.containerId)"></i>
        <div class="number">{{ item.number }}</div>
        <img :src="getAvator(item.commodify.pircture)" alt="" />
        <div>
          <span>{{ item.commodify.name }}</span>
          <span>{{ item.commodify.price }}/{{ item.commodify.unit }}</span>
        </div>
      </div>
      <div class="chequeritem add" @click="to()">
        <i class="el-icon-plus"></i>
      </div>
    </div>
  </div>
</template>

<script>
import {
  querycontainerlist,
  deviceTypelist,
  containerdelete,
} from "@/api/table";
export default {
  data() {
    return {
     
      containerlist: [],
      containerlistfixed7: {},
      containerlistfixed8: {},
      containerlistnofix: [],
      deviceTypeId: "",
      deviceTypelist: [],
    };
  },
  mounted() {
    deviceTypelist()
      .then((response) => {
        this.deviceTypelist = response.data;
      })
      .catch((err) => {});
  },

  computed: {},
  methods: {
    getAvator(picturePath) {
      return `${process.env.VUE_APP_PIC_API}/${picturePath}`;
    },
    change(val) {
      console.log(val);
      this.containerlistfixed7 = {};
      this.containerlistfixed8 = {};
      this.containerlistnofix = [];
      this.queryList(val);
    },
    to(number) {
      this.$router.push({
        name: "goodslist",
        path: "/goodsmanage/goodslist",
        params: {
          typeId: this.deviceTypeId,
          number: number ? number : this.containerlistnofix.length + 1,
        },
      });
    },
    deletecon(containerId) {
      containerdelete(this.$qs.stringify({ containerId: containerId }))
        .then((response) => {
          this.queryList();
          this.$message({
            type: "success",
            message: "删除成功!",
          });
        })
        .catch((err) => {});
    },
    queryList(deviceTypeId) {
      querycontainerlist({ deviceTypeId: deviceTypeId })
        .then((response) => {
          this.containerlist = response.data;

          let arr = this.containerlist.filter((data) => data.number == 7);
          if (arr.length > 0) {
            this.containerlistfixed7 = arr[0];
          }
          arr = this.containerlist.filter((data) => data.number ==8);
          if (arr.length > 0) {
            this.containerlistfixed8 = arr[0];
          }

          this.containerlistnofix = this.containerlist.filter(
            (data) => data.number !=7 && data.number != 8
          );
        })
        .catch((err) => {});
    },
  },
};
</script>

<style  lang='scss' scoped>
.chequer {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-bottom: 20px;
  align-items: center;
  > div {
    margin-right: 20px;
  }
  .chequeritem {
    position: relative;
    background: #97a8be;
    height: 260px;
    width: 200px;
    border: solid #97a8be;
    border-radius: 10px;
    display: flex;
    margin-bottom: 20px;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .close {
      position: absolute;
      right: 0;
      top: 0;
    }

    .number {
      border-radius: 50%;
      background-color: rgb(64, 158, 255);
      width: 20px;
      height: 20px;
      text-align: center;
      color: white;
      line-height: 20px;
    }
    * {
      margin: 5px;
    }
    img {
      width: 80%;
      height: 150px;
    }
    .words {
      height: 20px;
    }
    .upload {
      width: 80%;
      height: 150px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
  .add {
    height: 260px;
  }
}
</style>
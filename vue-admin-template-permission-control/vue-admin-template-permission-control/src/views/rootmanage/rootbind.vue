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
      <div class="chequeritem" @click="to(1, containerlistfixed1.containerId)">
        <div>固定</div>
        <img
          v-if="containerlistfixed1.commodifyId"
          :src="getAvator(containerlistfixed1.commodify.pircture)"
          alt=""
        />
        <i v-else class="el-icon-plus avatar-uploader-icon upload"></i>
        <div class="words" v-if="containerlistfixed1.commodifyId">
          <span>{{ containerlistfixed1.commodify.name }}</span>
          <span
            >{{ containerlistfixed1.commodify.price / 100 }}/{{
              containerlistfixed1.commodify.unit
            }}</span
          >
        </div>
      </div>
      <div class="chequeritem" @click="to(2, containerlistfixed2.containerId)">
        <div>固定</div>
        <img
          v-if="containerlistfixed2.commodifyId"
          :src="getAvator(containerlistfixed2.commodify.pircture)"
          alt=""
        />
        <i v-else class="el-icon-plus avatar-uploader-icon upload"></i>
        <div class="words" v-if="containerlistfixed2.commodifyId">
          <span>{{ containerlistfixed2.commodify.name }}</span>
          <span
            >{{ containerlistfixed2.commodify.price / 100 }}/{{
              containerlistfixed2.commodify.unit
            }}</span
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
          <span
            >{{ item.commodify.price / 100 }}/{{ item.commodify.unit }}</span
          >
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
      containerlistfixed1: {},
      containerlistfixed2: {},
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
      this.containerlistfixed1 = {};
      this.containerlistfixed2 = {};
      this.containerlistnofix = [];
      this.queryList(val);
    },
    to(number, containerId) {
      if (containerId) {
        if (number == 1 || number == 2) {
          this.deletecon(containerId);
        }
      }

      this.$router.push({
        name: "goodslist",
        path: "/goodsmanage/goodslist",
        params: {
          typeId: this.deviceTypeId,
          number: number ? number : this.containerlistnofix.length + 1 + 2, //因为固定有2 所以从3开始
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

          let arr = this.containerlist.filter((data) => data.number == 1);
          if (arr.length > 0) {
            this.containerlistfixed1 = arr[0];
          }
          arr = this.containerlist.filter((data) => data.number == 2);
          if (arr.length > 0) {
            this.containerlistfixed2 = arr[0];
          }

          this.containerlistnofix = this.containerlist.filter(
            (data) => data.number != 1 && data.number != 2
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
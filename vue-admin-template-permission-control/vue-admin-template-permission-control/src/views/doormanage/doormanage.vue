<template>
  <div class="conbody">
    <div v-for="item in listreplen" :key="item.deviceId" class="contain">
      <span>{{ item.name }}</span>
      <div class="circlecon">
        <div
          v-for="con in item.containerlist.filter(function (data) {
            return data.number != 7 && data.number != 8;
          })"
          :key="con.containerId"
          :class="[
            'circle',
            item.containerState[con.number] == 0 ? 'need' : '',
          ]"
        >
          <img
            v-if="con.commodify.pircture"
            :src="getAvator(con.commodify.pircture)"
            class="avatar"
            @click="centerDialogVisible = true"
          />
          <i class="number">{{ con.number }}</i>
        </div>
      </div>
    </div>
    <el-dialog
      title="请选择操作"
      :visible.sync="centerDialogVisible"
      width="80%"
      center
    >
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false" type="success"
          >已补货</el-button
        >
        <el-button type="primary" @click="centerDialogVisible = false"
          >开门</el-button
        >
        <el-button @click="centerDialogVisible = false" type="danger"
          >无货</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { devicelist, querycontainerlist } from "@/api/table";
export default {
  data() {
    return {
      centerDialogVisible: false,
      show: false,
      listreplen: [],
      listnoreplen: [],
      form1: {
        pageNum: 1,
        pageSize: 999,
      },
      form2: {
        deviceTypeId: "",
      },
    };
  },
  created() {
    this.queryList();
  },

  methods: {
    showPopup() {
      this.show = true;
    },
    getAvator(picturePath) {
      return `${process.env.VUE_APP_PIC_API}/${picturePath}`;
    },

    async queryList() {
      let devicemap = {};
      const res = await devicelist(this.form1);
      if (res.code == 1) {
        res.data.forEach(async (element) => {
          let type = element.type;
          if (devicemap[type] == undefined) {
            this.form2.deviceTypeId = type;
            const res = await querycontainerlist(this.form2);
            if (res.code == 1) {
              devicemap[type] = res.data;
              element.containerlist = devicemap[type];
            }
          } else {
            element.containerlist = devicemap[type];
          }
          if (element.containerState.indexOf("0") != -1) {
            this.listreplen.push(element);
          } else {
            this.listnoreplen.push(element);
          }
        });
      }

      console.log(res);
    },
  },
};
</script>

<style  lang='scss' scoped>
@media screen and (max-width: 992px) {
  .contain {
    width: 100%;
  }
}
/*pad: w >= 768  && w< 992*/
@media screen and (min-width: 992px) {
  .contain {
    width: 500px;
  }
}
.conbody {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
.el-dialog__body {
  display: none !important;
}
.circlecon {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
.contain {
  border: solid 2px #409eff;

  border-radius: 10px;
  .number {
    background-color: azure;
    color: #409eff;
    width: 20px;
    height: 20px;
    border-radius: 10px;
    position: absolute;
    top: 5px;
    left: 5px;
    line-height: 20px;
    text-align: center;
  }
  margin: 10px;

  background-color: azure;
  span {
    width: 100%;
    text-align: center;
    display: inline-block;
    padding-top: 10px;
  }
  .circle {
    width: 25%;
    height: 25%;
    margin: 10px;
    position: relative;
    img {
      width: 100px;
      height: 100px;
      border-radius: 20px;
      object-fit: fill;
    }
  }
  .need {
    filter: grayscale(1);
  }
}
</style>
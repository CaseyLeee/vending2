<template>
  <div class="conbody">
    <div v-for="item in listreplen" :key="item.deviceId" class="contain">
      <span>{{ item.name }}</span>
      <div class="circlecon">
        <div
          v-for="con in item.containerlist.filter(function (data) {
            return data.number !=1 && data.number !=2;
          })"
          :key="con.containerId"
          :class="[
            'circle',
            item.containerState[con.number - 1] == 0 ? 'need' : '',
          ]"
        >
          <el-image
            v-if="con.commodify.pircture"
            :src="getAvator(con.commodify.pircture)"
            @click="dialogopen(item.deviceId, con.number)"
            lazy
          ></el-image>
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
        <el-button @click="openconfirm()" type="success" size="mini"
          >已补货</el-button
        >
        <el-button type="primary" @click="deviceopen()" size="mini"
          >全部开门</el-button
        >
        <el-button type="primary" @click="devicecomand()" size="mini"
          >开此仓门</el-button
        >
        <!-- <el-button @click="centerDialogVisible = false" type="danger"
          >无货</el-button
        > -->
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  devicelist,
  querycontainerlist,
  deviceopen,
  openconfirm,
  devicecomand,
} from "@/api/table";
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
      deviceId: "",
      number: "",
    };
  },
  created() {
    this.queryList();
  },

  methods: {
    dialogopen(deviceId, number) {
      this.centerDialogVisible = true;
      this.deviceId = deviceId;

      this.number = number;
    },
    async deviceopen() {
      this.centerDialogVisible = false;
      const res = await deviceopen({ deviceId: this.deviceId });
      if(res.code==1){
           this.$message.success("开门成功");
      }
      else{
        this.$message.success(res.message);
      }
    },
    async openconfirm() {
      this.centerDialogVisible = false;
      const res = await openconfirm({ deviceId: this.deviceId });
      this.centerDialogVisible = false;
       if(res.code==1){
           this.$message.success("全部补货成功");
      }
      else{
        this.$message.success(res.message);
      }
    },
    async devicecomand() {
      // this.centerDialogVisible = false;
      // let array = [0, 0, 0, 0, 0, 0, 0, 0];
      // alert(this.number);
      // array[this.number - 1] = 1;
      // let str = array.toString().replaceAll(",", "");
      this.centerDialogVisible = false;
      const res = await devicecomand({ deviceId: this.deviceId, number:this.number });
       if(res.code==1){
           this.$message.success("开此仓门成功");
      }
      else{
        this.$message.success(res.message);
      }
    },
    showPopup() {
      this.show = true;
    },
    getAvator(picturePath) {
      return `${process.env.VUE_APP_PIC_API}/${picturePath}`;
    },

    async queryList() {
      let devicemap = {};
     
      const res = await devicelist(this.form1); //先查设备  再查设备类型
    
      if (res.code == 1) {
        res.data.forEach(async (element) => {
          let type = element.type;
          console.log(element)
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
          
            this.listreplen.push(element);
          
        });
      }

      
    },
  },
};
</script>

<style  lang='scss' scoped>
.el-image{
  height: 100%;
}
.el-dialog__body {
 padding:0px !important
}
.el-dialog__footer {
  span {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    button {
      margin: 10px;
    }
  }
}
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
  border: solid 6px #409eff;

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
    // height: 25%;
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
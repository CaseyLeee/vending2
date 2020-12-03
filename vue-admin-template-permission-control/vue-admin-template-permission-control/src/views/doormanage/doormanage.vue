<template>
  <div></div>
</template>

<script>
import { devicelist, querycontainerlist } from "@/api/table";
export default {
  data() {
    return {
      list: [],
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
    async queryList() {
     
      const res = await devicelist(this.form1);
      if (res.code == 1) {
        res.data.forEach((element) => {
          
        });
      }

   
    },
  },
};
</script>

<style>
</style>
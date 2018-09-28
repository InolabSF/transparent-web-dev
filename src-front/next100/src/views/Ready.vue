<template>
  <a @click="onClickStart">start</a>
</template>

<script>
import api from "@/core/ApiClient";
import moment from "moment";

export default {
  name: "Ready",
  methods: {
    async onClickStart() {
      const res = await this.createWall();
      const wall = res.data;
      this.$router.push(`/walls/${wall.id}/meeting`);
    },
    createWall() {
      const formatedDatetime = moment().format("MMDDHHm");
      const params = {
        name: `NEXT100-${formatedDatetime}`,
        default_langcode: 0,
        version: "next100"
      };
      return api.post("/walls", params);
    }
  }
};
</script>

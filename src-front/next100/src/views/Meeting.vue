<template>
  <div>
    <p>meeting now</p>
    <button id="rec">REC</button>
  </div>
</template>

<script>
export default {
  name: "Meeting",
  // created() {
  //   // startRecognizer();
  // },
  data() {
    return {
      isShowContentDetailModal: false,
      currentContentDetailModalFloor: false,
      contextModalStatuses: []
    }
  }
};
</script>

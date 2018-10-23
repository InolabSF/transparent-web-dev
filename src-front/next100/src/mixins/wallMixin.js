export default {
  methods: {
    $_wallMixin_getWallLogUrl(userId) {
      const url = location.origin + `/next100/walls/${this.$route.params.wallId}/logs?key=${this.$route.query.key}&eventUserId=${userId}`;
      return url;
    }
  }
}

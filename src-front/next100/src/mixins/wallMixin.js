export default {
  methods: {
    $_wallMixin_getWallLogUrl() {
      const url = location.origin + `/next100/walls/${this.$route.params.wallId}/logs?key=${this.$route.query.key}`;
      return url;
    }
  }
}

export default {
  methods: {
    $_wallMixin_getWallLogUrl() {
      const url = location.origin + `/next100/walls/${this.$route.query.key}/logs`
      return url;
    }
  }
}

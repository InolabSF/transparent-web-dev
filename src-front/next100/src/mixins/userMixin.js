const USER_LIMIT = 4;
export default {
  methods: {
    login() {
      // TODO ID識別
      // TODO 名前連番
      const floorId = this.$store.state.loginUsers.length + 1;
      const user = {
        floorId,
        name: `randomName${1000}`,
        pins: [],
      };

      if (this.$store.state.loginUsers.length < USER_LIMIT) {
        this.$store.commit('addLoginUser', user);
      } else {
        throw "参加人数は4名まで";
      }
    },
    getStyleByFloorId(floorId) {
      const styleMap = {
        1: {bottom: 0, left: 'auto', right: 'auto'},
        2: {bottom: 'auto', left: 0, top: 'auto'},
        3: {top: 0, left: 'auto', right: 'auto'},
        4: {bottom: 'auto', right: 0, top: 'auto'},
      }
      return styleMap[floorId];
    }
  }
}

import api from '@/core/ApiClient';
import moment from 'moment';

export default {
  methods: {
    $_wallMixin_getWallLogUrl(userId) {
      const url = location.origin + `/next100/walls/${this.$route.params.wallId}/logs?key=${this.$route.query.key}&eventUserId=${userId}`;
      return url;
    },
    async $_wallMixin_startMeeting() {
      const res = await this.$_wallMixin_createWall();
      // window.removeEventListener('CUSTOM_TOUCH_START', removeHandler);
      const wall = res.data;
      this.$router.push(`/walls/${wall.id}/meeting?key=${res.data.key}`);
      this.$store.commit('setState', {isSmallHue: false});
      this.$store.commit('setState', {
        loginUsers: this.$store.state.loginUsers.map(u => {
          u.isStartTalkModal = false;
          return u;
        })
      });
    },
    $_wallMixin_createWall() {
      const formatedDatetime = moment().format("MMDDHHm");
      const params = {
        name: `NEXT100-${formatedDatetime}`,
        default_langcode: 0,
        version: "next100"
      };
      return api.post("/walls", params);
    }
  }
}

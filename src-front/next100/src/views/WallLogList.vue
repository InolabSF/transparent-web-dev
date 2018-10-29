<template>
  <div id="wrapper">
    <header id="header">
      <p class="talk-date">{{ talkDate }}</p>
      <h1 class="talk-title">{{ talkTitle }}</h1>
      <!--<div id="user-list">-->
        <!--<div v-for="(name, i) in memberNames" :key="i" class="user-list-item" :data-color="getColorMap()[i + 1]">-->
          <!--<div class="user-avatar"></div>-->
          <!--<div class="user-name">{{ name }}</div>-->
        <!--</div>-->
      <!--</div>-->
      <div class="sns-button-list">
        <!--<div class="fb-like" data-href="http://syncer.jp" data-layout="button_count" data-action="like" data-show-faces="true" data-share="false"></div>-->
        <div class="sns-button">
          <div class="fb-share-button" data-layout="button" data-size="small" data-mobile-iframe="true"></div>
        </div>
        <div class="sns-button">
          <a class="twitter-share-button" href="https://twitter.com/share" data-dnt="true">Tweet</a>
        </div>
      </div>
    </header>
    <div id="main">
      <div class="tab-menu">
        <div
          :class="{ 'tab-menu-btn': true,  'menu-active': currentTabIndex === 0 }"
        >
          <a @touchstart="currentTabIndex = 0">
            <p class="menu-title">全てのアイテム</p>
          </a>
        </div>
        <div
          :class="{ 'tab-menu-btn': true,  'menu-active': currentTabIndex === 1 }"
        >
          <a @touchstart="currentTabIndex = 1">
            <p class="menu-title">あなたのピン</p>
          </a>
        </div>
      </div>
      <div v-if="!aggregatedAllContents.length || !aggregatedMyPinnedContents.length">
        Loading....
      </div>
      <template v-else>
        <div id="media-list" v-if="currentTabIndex === 0">
          <div class="post" v-for="(search, i) in this.aggregatedAllContents.slice(0, contentsLimitNum)" :key="i">
            <div class="item">
              <div class="keyword">
                <div class="keyword-text"><span>{{ search.words.join(' + ') }}</span></div>
              </div>
            </div>
            <div class="media-container" v-masonry origin-left="false" transition-duration="1s" item-selector=".item">
              <div v-masonry-tile class="item" v-for="(content, j) in search.related_contents_all">
                <div class="media-photo">
                  <img :src="content.img_url" class="img" @touchstart="() => { onClickImage(content) }">
                  <!--<ul class="pin-list" v-if="content.pins">-->
                    <!--<li v-for="(pin, k) in content.pins" :key="k" :data-color="getColorMap()[k+1]"></li>-->
                  <!--</ul>-->
                </div>
              </div>
            </div>
          </div>
        </div>

        <div id="media-list" v-if="currentTabIndex === 1">
          <div class="post" v-for="(search, i) in this.aggregatedMyPinnedContents" :key="i">
            <div class="item">
              <div class="keyword">
                <div class="keyword-text"><span>{{ search.words.join(' + ') }}</span></div>
              </div>
            </div>
            <div class="media-container">
              <div class="item" v-for="(content, j) in search.related_contents_mypinned">
                <div class="media-photo">
                  <img :src="content.img_url" class="img"  @touchstart="() => { onClickImage(content) }">
                  <!--<ul class="pin-list" v-if="content.pins">-->
                    <!--<li v-for="(pin, k) in content.pins" :key="k" :data-color="getColorMap()[k+1]"></li>-->
                  <!--</ul>-->
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>
    </div>
    <footer id="footer">
      <p id="copyright"><small>© 2018 Panasonic Corporation</small></p>
    </footer>

    <transition enter-active-class="animated fadeIn" enter-leave-class="animated fadeOut">
      <div class="modal-mask" v-if="isShowModal">
        <div class="modal-wrapper" @touchstart.stop="onClickCloseModal">
          <div class="modal-close">
            <img src="/next100/static/img/btn_close01.svg">
          </div>
          <div class="modal-container">
            <div class="modal-body">
              <div>
                <a :href="modalContent.url" target="_blank"><img :src="modalContent.img_url"></a>
              </div>
              <div class="modal-title">
                <a :href="modalContent.url" target="_blank">{{ modalContent.title }}</a>
              </div>
              <div class="modal-description">
                <a :href="modalContent.url" target="_blank">{{ modalContent.desc }}</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import Vue from 'vue';
import client from "@/core/ApiClient";
import moment from "moment";
import { VueMasonryPlugin } from 'vue-masonry';
import $ from 'jquery';

Vue.use(VueMasonryPlugin);

export default {
  name: "WallLogList",
  data() {
    return {
      moment,
      currentTabIndex: 0,
      allContents: [],
      pinnedContents: [],
      searches: [],
      contentsLimitNum: 4,
      isShowModal: false,
      modalContent: null,
    };
  },
  mounted() {
    this.fetchAll();
    this.startScrollEvent();
    this.reloadSNSButton();
  },
  created() {
    this.addStyle();
    this.initMasonly();
  },
  computed: {
    talkTitle() {
      if (!this.allContents.length) {
        return '';
      }
      const stamp = moment(this.allContents[0].created_at).format('DDHHmm');
      return `NEXT100トーク${stamp}`;
    },
    talkDate() {
      if (!this.allContents.length) {
        return '';
      }

      return moment(this.allContents[0].created_at).format('YYYY.MM.DD');
    },
    memberNames() {
      let memberNames = [];
      this.pinnedContents.forEach(c => {
        c.pins.forEach(p => {
          if (!memberNames.find(name => name === p.eventuser_id)) {
            memberNames.push(p.eventuser_id);
          }
        });
      });
      return memberNames;
    },
    myPinnedContents() {
      const myUserId = this.$route.query.eventUserId;
      const myPinnedContents = this.pinnedContents.filter(c => {
        return c.pins.some(p => p.eventuser_id === myUserId);
      });
      return myPinnedContents;
    },
    aggregatedAllContents() {
      if (!this.searches.length || !this.allContents.length) {
        return [];
      }
      let aggregated = this.searches.map(s => {
        s.related_contents = this.allContents.filter(c => ( c.search_id === s.id ));
        s.related_contents_all = this.allContents.filter(c => ( c.search_id === s.id ));
        return s;
      });

      aggregated = aggregated.filter(d => ( d.related_contents_all.length > 0 ));

      return aggregated;

      // let aggregated = [];
      // this.searches.forEach(s => {
      //   const cnt = s;
      // })
    },
    aggregatedPinnedContents() {
      if (!this.searches.length || !this.pinnedContents.length) {
        return [];
      }
      let aggregated = this.searches.map(s => {
        s.related_contents = this.pinnedContents.filter(c => ( c.search_id === s.id ));
        s.related_contents_pinned = this.allContents.filter(c => ( c.search_id === s.id ));
        return s;
      });

      aggregated = aggregated.filter(d => ( d.add_related_contents.length > 0 ));

      return aggregated;
    },
    aggregatedMyPinnedContents() {
      if (!this.searches.length || !this.pinnedContents.length) {
        return [];
      }

      let aggregated = this.searches.map(s => {
        s.related_contents = this.myPinnedContents.filter(c => ( c.search_id === s.id ));
        s.related_contents_mypinned = this.myPinnedContents.filter(c => ( c.search_id === s.id ));
        return s;
      });

      aggregated = aggregated.filter(d => {
        return d.related_contents_mypinned.length > 0
      });

      return aggregated;
    }
  },
  // watch: {
  //   currentTabIndedex() {
  //     this.$nextTick(() => {
  //       this.$redrawVueMasonry();
  //     });
  //   }
  // },
  methods: {
    reloadSNSButton() {
      setTimeout(() => {
        FB.XFBML.parse();
        twttr.widgets.load();
      });
    },
    onClickImage(content) {
      this.isShowModal = true;
      this.modalContent = content;
    },
    onClickCloseModal() {
      this.isShowModal = false;
    },
    startScrollEvent() {
      window.addEventListener('scroll', (evt) => {
        const bodyHeight = $('body').height();
        const isBottom = $(window).scrollTop() >= bodyHeight - $(window).height() - 1000;

        const isMainTab = this.currentTabIndex === 0;
        if (isBottom && isMainTab) {
          this.contentsLimitNum += 4;
        }
      });
    },
    addStyle() {
      const mobileStyle = '<link id="mobileStyle" rel="stylesheet" href="/next100/static/css/mobile.css">';
      $("head").append(mobileStyle);
    },
    initMasonly() {
      if (typeof this.$redrawVueMasonry === 'function') {
        this.$redrawVueMasonry()
      }
    },
    async fetchAll() {
      await this.fetchContents();
      await this.fetchSearchs();
      await this.fetchPinnedContents();
    },
    async fetchSearchs() {
      const url = `/next100/contents?wall_id=${this.$route.params.wallId}`
      const res = await client.get(url);
      this.searches = res.data.searches;
    },
    async fetchContents() {
      const url = `/next100/wall/${this.$route.query.key}`;
      const res = await client.get(url);
      this.allContents = res.data;
    },
    async fetchPinnedContents() {
      const url = `/next100/wall/${this.$route.query.key}/pinned`;
      const res = await client.get(url);
      this.pinnedContents = res.data;
    },
  }
};
</script>

<style lang="scss" scoped>
.sns-button-list {
  display: flex;
  justify-content: center;
  align-items: flex-end;
}

.sns-button {
  display: flex;
  align-items: baseline;
  &:first-child {
    margin-left: 0;
  }
  margin-left: 14px;
}

.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, .5);
  display: table;
  transition: opacity .3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 100%;
  max-width: 640px;
  margin: 0px auto;
  padding: 20px 30px;
  /*background-color: #fff;*/
  color: #fff;
  border-radius: 2px;
  /*box-shadow: 0 2px 8px rgba(0, 0, 0, .33);*/
  transition: all .3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-close {
  position: absolute;
  top: 20px;
  left: 20px;
  width: 20px;
  height: 20px;
  img {
    width: 100%;
    height: 100%;
  }
}

.modal-title {
  margin-top: 1em;
  font-weight: bold;
  a {
    color: #fff;
  }
}

.modal-description {
  margin-top: 1em;
  a {
    color: #fff;
  }
}
</style>

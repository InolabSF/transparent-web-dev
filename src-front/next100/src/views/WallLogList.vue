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
    </header>
    <div id="main">
      <div class="tab-menu">
        <div
          :class="{ 'tab-menu-btn': true,  'menu-active': currentTabIndex === 0 }"
        >
          <a @click="currentTabIndex = 0">
            <p class="menu-title">全てのアイテム</p>
          </a>
        </div>
        <div
          :class="{ 'tab-menu-btn': true,  'menu-active': currentTabIndex === 1 }"
        >
          <a @click="currentTabIndex = 1">
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
                  <img :src="content.img_url" class="img">
                  <ul class="pin-list" v-if="content.pins">
                    <li v-for="(pin, k) in content.pins" :key="k" :data-color="getColorMap()[k+1]"></li>
                  </ul>
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
                  <img :src="content.img_url" class="img">
                  <ul class="pin-list" v-if="content.pins">
                    <li v-for="(pin, k) in content.pins" :key="k" :data-color="getColorMap()[k+1]"></li>
                  </ul>
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
  </div>
</template>

<script>
import Vue from 'vue';
import client from "@/core/ApiClient";
import moment from "moment";
import { VueMasonryPlugin } from 'vue-masonry';

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
    };
  },
  mounted() {
    this.fetchAll();
    this.startScrollEvent();
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
    startScrollEvent() {
      window.addEventListener('scroll', (evt) => {
        const bodyHeight = document.body.getBoundingClientRect().height;
        const isBottom = document.documentElement.scrollTop >= bodyHeight - window.innerHeight - 500;
        const isMainTab = this.currentTabIndex === 0;
        if (isBottom && isMainTab) {
          this.contentsLimitNum += 10;
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

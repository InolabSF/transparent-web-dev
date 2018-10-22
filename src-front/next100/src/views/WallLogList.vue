<template>
  <div id="wrapper">
    <header id="header">
      <p class="talk-date">{{ talkDate }}</p>
      <h1 class="talk-title">{{ talkTitle }}</h1>
      <div id="user-list">
        <div v-for="(name, i) in memberNames" :key="i" class="user-list-item" :data-color="getColorMap()[i + 1]">
          <div class="user-avatar"></div>
          <div class="user-name">{{ name }}</div>
        </div>
      </div>
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
            <p class="menu-title">ピンされたアイテム</p>
          </a>
        </div>
      </div>
      <div id="media-list" v-if="currentTabIndex === 0">
        <div class="post" v-for="(search, i) in this.aggregatedAllContents" :key="i">
          <div class="item">
            <div class="keyword">
              <div class="keyword-text"><span>{{ search.words[0] }}</span></div>
            </div>
          </div>
          <div class="media-container" v-masonry origin-left="false" transition-duration="1s" item-selector=".item">
            <div v-masonry-tile class="item" v-for="(content, j) in search.related_contents">
              <div class="media-photo">
                <img :src="content.img_url" class="img">
                <ul class="pin-list" v-if="content.pins">
                  <li v-for="(pin, k) in content.pins" :key="k" data-color="green"></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div id="media-list" v-if="currentTabIndex === 1">
        <div class="post" v-for="(search, i) in this.aggregatedPinnedContents" :key="i">
          <div class="item">
            <div class="keyword">
              <div class="keyword-text"><span>{{ search.words[0] }}</span></div>
            </div>
          </div>
          <div class="media-container">
            <div class="item" v-for="(content, j) in search.related_contents">
              <div class="media-photo">
                <img :src="content.img_url" class="img">
                <ul class="pin-list" v-if="content.pins">
                  <li v-for="(pin, k) in content.pins" :key="k" data-color="green"></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
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
    };
  },
  mounted() {
    this.fetchAll();
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
    aggregatedAllContents() {
      if (!this.searches.length || !this.allContents.length) {
        return [];
      }
      let aggregated = this.searches.map(s => {
        s.related_contents = this.allContents.filter(c => ( c.search_id === s.id ));
        return s;
      });

      aggregated = aggregated.filter(d => ( d.related_contents.length > 0 ));

      return aggregated;
    },
    aggregatedPinnedContents() {
      if (!this.searches.length || !this.pinnedContents.length) {
        return [];
      }
      let aggregated = this.searches.map(s => {
        s.related_contents = this.pinnedContents.filter(c => ( c.search_id === s.id ));
        return s;
      });

      aggregated = aggregated.filter(d => ( d.related_contents.length > 0 ));

      return aggregated;
    }
  },
  methods: {
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
      this.fetchContents();
      this.fetchPinnedContents();
      this.fetchSearchs();
    },
    async fetchSearchs() {
      const url = `/next100/contents?wall_id=${wallId}`
      const res = await client.get(url);
      this.searches = res.data.searches;
    },
    async fetchContents() {
      const url = `/next100/wall/${this.$route.params.wallId}`;
      const res = await client.get(url);
      this.allContents = res.data;
    },
    async fetchPinnedContents() {
      const url = `/next100/wall/${this.$route.params.wallId}/pinned`;
      const res = await client.get(url);
      this.pinnedContents = res.data;
    },
  }
};
</script>

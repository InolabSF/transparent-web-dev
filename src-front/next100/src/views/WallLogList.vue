<template>
  <div id="wrapper">
    <header id="header">
      <p class="talk-date">2018.00.00</p>
      <h1 class="talk-title">トークタイトル</h1>
      <div id="user-list">
        <div v-for="(name, i) in memberNames" :key="i" class="user-list-item" :data-color="getColorMap()[i + 1]">
          <div class="user-avatar"></div>
          <div class="user-name">{{ name }}</div>
        </div>
        <!--<div class="user-list-item" data-color="yellow">-->
          <!--<div class="user-avatar"></div>-->
          <!--<div class="user-name">ゲスト1002</div>-->
        <!--</div>-->
        <!--<div class="user-list-item" data-color="red">-->
          <!--<div class="user-avatar"></div>-->
          <!--<div class="user-name">ゲスト1003</div>-->
        <!--</div>-->
        <!--<div class="user-list-item" data-color="blue">-->
          <!--<div class="user-avatar"></div>-->
          <!--<div class="user-name">ゲスト1004</div>-->
        <!--</div>-->
      </div>
    </header>
    <div id="main">
      <div class="tab-menu">
        <div
          :class="{ 'tab-menu-btn': true,  'menu-active': currentTabIndex === 0 }"
        >
          <a @click="currentTabIndex = 0">
            <p class="menu-title">ピンされたアイテム</p>
          </a>
        </div>
        <div
          :class="{ 'tab-menu-btn': true,  'menu-active': currentTabIndex === 1 }"
        >
          <a @click="currentTabIndex = 1">
            <p class="menu-title">全てアイテム</p>
          </a>
        </div>
      </div>
      <div id="media-list">
        <div class="post">
          <div class="item">
            <div class="keyword">
              <div class="keyword-text"><span>レモネード</span></div>
            </div>
          </div>
          <div class="media-container" style="position: relative; height: 519.25px;">
            <div class="item" style="position: absolute; left: 0%; top: 0px;">
              <div class="media-photo" data-title="おやつレシピスクラップ: 柚子レモネード" data-desc="The result by MS Bing Search Image with &quot; レモネード &quot;" data-id="67514" data-searchid="27093" data-relatedcontentid="509554">
                <img src="https://tse2.mm.bing.net/th?id=OIP.2fJmO6GNhmhIfa8RC_X9ZwHaLL&amp;pid=Api" class="img">
                <ul class="pin-list">
                  <li data-color="green"></li>
                </ul>
              </div>
            </div>
            <div class="item" style="position: absolute; left: 33.3326%; top: 0px;">
              <div class="media-photo" data-title="冷レモネード【E・レシピ】料理のプロが作る簡単レシピ/2006.07 ..." data-desc="The result by MS Bing Search Image with &quot; レモネード &quot;" data-id="67514" data-searchid="27093" data-relatedcontentid="509556">
                <img src="https://tse1.mm.bing.net/th?id=OIP.dU1WpivTN_LZJ9UHX43mwgHaE5&amp;pid=Api" class="img">
                <ul class="pin-list">
                  <li data-color="green"></li>
                </ul>
              </div>
            </div>
            <div class="item" style="position: absolute; left: 66.6652%; top: 0px;">
              <div class="media-photo" data-title="「ザ・ヨーロピアン ジャスミンレモネード」新発売 2011.6.28 ..." data-desc="The result by MS Bing Search Image with &quot; レモネード &quot;" data-id="67514" data-searchid="27093" data-relatedcontentid="509553">
                <img src="https://tse1.mm.bing.net/th?id=OIP.dB84IEaW4fcFlercrxo6VgHaLH&amp;pid=Api" class="img">
                <ul class="pin-list">
                  <li data-color="green"></li>
                </ul>
              </div>
            </div>
            <div class="item" style="position: absolute; left: 33.3326%; top: 154.125px;">
              <div class="media-photo" data-title="レモネード - JapaneseClass.jp" data-desc="The result by MS Bing Search Image with &quot; レモネード &quot;" data-id="67514" data-searchid="27093" data-relatedcontentid="509555">
                <img src="https://tse4.mm.bing.net/th?id=OIP.qTC3iDKGGxB0jyFDxwHMZgHaIp&amp;pid=Api" class="img">
                <ul class="pin-list">
                  <li data-color="green"></li>
                  <li data-color="yellow"></li>
                </ul>
              </div>
            </div>
            <div class="item" style="position: absolute; left: 66.6652%; top: 328.125px;">
              <div class="media-photo" data-title="カークランド オーガニックレモネード | コストコ通 コストコ ..." data-desc="The result by MS Bing Search Image with &quot; レモネード &quot;" data-id="67514" data-searchid="27093" data-relatedcontentid="509557">
                <img src="https://tse1.mm.bing.net/th?id=OIP.BQ0ZEOe1kuiwzjzApmdcbgHaGO&amp;pid=Api" class="img">
                <ul class="pin-list">
                  <li data-color="green"></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div class="post">
          <div class="item">
            <div class="keyword">
              <div class="keyword-text"><span>チワワ</span></div>
            </div>
          </div>
          <div class="media-container" style="position: relative; height: 349.25px;">
            <div class="item" style="position: absolute; left: 0%; top: 0px;">
              <div class="media-photo" data-title="価格.com - チワワ ペット情報" data-desc="The result by MS Bing Search Image with &quot; チワワ &quot;" data-id="67509" data-searchid="27091" data-relatedcontentid="509545">
                <img src="https://tse1.mm.bing.net/th?id=OIP.Ci4vkRazDQVyvlS45h1mZgHaFj&amp;pid=Api" class="img">
                <ul class="pin-list">
                  <li data-color="green"></li>
                </ul>
              </div>
            </div>
            <div class="item" style="position: absolute; left: 33.3326%; top: 0px;">
              <div class="media-photo" data-title="犬(チワワ)カワイイの見つけました : ストレス解消！チワワを見 ..." data-desc="The result by MS Bing Search Image with &quot; チワワ &quot;" data-id="67509" data-searchid="27091" data-relatedcontentid="509547">
                <img src="https://tse4.mm.bing.net/th?id=OIP.TTof3WrY1woprKdEKIqHMAHaFj&amp;pid=Api" class="img">
                <ul class="pin-list">
                  <li data-color="green"></li>
                </ul>
              </div>
            </div>
            <div class="item" style="position: absolute; left: 66.6652%; top: 0px;">
              <div class="media-photo" data-title="チワワって臭いがあるの？ 気になるチワワの体臭事情とは | PECO ..." data-desc="The result by MS Bing Search Image with &quot; チワワ &quot;" data-id="67509" data-searchid="27091" data-relatedcontentid="509543">
                <img src="https://tse3.mm.bing.net/th?id=OIP.pSuB1inpK58IKuuBwGiAtQHaFj&amp;pid=Api" class="img">
                <ul class="pin-list">
                  <li data-color="green"></li>
                </ul>
              </div>
            </div>
            <div class="item" style="position: absolute; left: 0%; top: 172.125px;">
              <div class="media-photo" data-title="最小の犬 チワワ" data-desc="The result by MS Bing Search Image with &quot; チワワ &quot;" data-id="67509" data-searchid="27091" data-relatedcontentid="509546">
                <img src="https://tse4.mm.bing.net/th?id=OIP.O2wI4VLpZjYN00-ZAU7TbAHaFu&amp;pid=Api" class="img">
                <ul class="pin-list">
                  <li data-color="green"></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div class="post">
          <div class="item">
            <div class="keyword">
              <div class="keyword-text"><span>羽田空港</span></div>
            </div>
          </div>
          <div class="media-container" style="position: relative; height: 344.25px;">
            <div class="item" style="position: absolute; left: 0%; top: 0px;">
              <div class="media-photo" data-title="羽田空港 飛行機の写真 夜景無料壁紙 東京の夜景写真壁紙を ..." data-desc="The result by MS Bing Search Image with &quot; 羽田空港 &quot;" data-id="67503" data-searchid="27089" data-relatedcontentid="509534">
                <img src="https://tse1.mm.bing.net/th?id=OIP.M5ytn-R_uh62VuqbIKWRmwHaFj&amp;pid=Api" class="img">
                <ul class="pin-list">
                  <li data-color="green"></li>
                </ul>
              </div>
            </div>
            <div class="item" style="position: absolute; left: 33.3326%; top: 0px;">
              <div class="media-photo" data-title="ANAのB787、新千歳空港でスタンバイ－羽田路線に臨時便運航も ..." data-desc="The result by MS Bing Search Image with &quot; 羽田空港 &quot;" data-id="67503" data-searchid="27089" data-relatedcontentid="509533">
                <img src="https://tse3.mm.bing.net/th?id=OIP.eCWUN9drll7EqUvlGmPHOgHaFj&amp;pid=Api" class="img">
                <ul class="pin-list">
                  <li data-color="green"></li>
                </ul>
              </div>
            </div>
            <div class="item" style="position: absolute; left: 66.6652%; top: 0px;">
              <div class="media-photo" data-title="東京国際（羽田）空港 | 国土交通省東京航空局" data-desc="The result by MS Bing Search Image with &quot; 羽田空港 &quot;" data-id="67503" data-searchid="27089">
                <img src="https://tse2.mm.bing.net/th?id=OIP.uFbaFoJDIFUAJRD4V_k8UQHaDp&amp;pid=Api" class="img">
                <ul class="pin-list">
                  <li data-color="green"></li>
                </ul>
              </div>
            </div>
            <div class="item" style="position: absolute; left: 66.6652%; top: 119.125px;">
              <div class="media-photo" data-title="空港 | 建物 | 無料(フリー)写真素材 by 電広堂" data-desc="The result by MS Bing Search Image with &quot; 羽田空港 &quot;" data-id="67503" data-searchid="27089" data-relatedcontentid="509536">
                <img src="https://tse1.mm.bing.net/th?id=OIP.FUuL3xw5NCYgZR97amGMcAHaE8&amp;pid=Api" class="img">
                <ul class="pin-list">
                  <li data-color="green"></li>
                </ul>
              </div>
            </div>
            <div class="item" style="position: absolute; left: 0%; top: 172.125px;">
              <div class="media-photo" data-title="羽田空港 おすすめスポット/飛行機が見えるレストラン | 空港を ..." data-desc="The result by MS Bing Search Image with &quot; 羽田空港 &quot;" data-id="67503" data-searchid="27089" data-relatedcontentid="509535">
                <img src="https://tse3.mm.bing.net/th?id=OIP.qNyVZyxgioQ9WoDelgX-5wHaFj&amp;pid=Api" class="img">
                <ul class="pin-list">
                  <li data-color="green"></li>
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
import client from "@/core/ApiClient";

export default {
  name: "WallLogList",
  data() {
    return {
      currentTabIndex: 0,
      allContents: [],
      pinnedContents: [],
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
    }
  },
  methods: {
    addStyle() {
      const mobileStyle = '<link id="mobileStyle" rel="stylesheet" href="/next100/static/css/mobile.css">';
      $("head").append(mobileStyle);
    },
    initMasonly() {
      $(function($){
        $('.media-container').masonry({
          itemSelector: '.item',
          percentPosition: true
        });
      });
    },
    fetchAll() {
      this.fetchContents();
      this.fetchPinnedContents();
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

(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-5caae1f2"],{"8d29":function(t,o,e){"use strict";var n=4;o["a"]={methods:{login:function(t){var o={floorId:t,name:"randomName".concat(1e3),pins:[]};if(!(this.$store.state.loginUsers.length<n))throw"参加人数は4名まで";this.$store.commit("addLoginUser",o)},getStyleByFloorId:function(t){var o={1:{bottom:0,left:"auto",right:"auto"},2:{bottom:"auto",left:0,top:"auto"},3:{top:0,left:"auto",right:"auto"},4:{bottom:"auto",right:0,top:"auto"}};return o[t]}}}},bb51:function(t,o,e){"use strict";e.r(o);var n=function(){var t=this,o=t.$createElement;t._self._c;return t._m(0)},a=[function(){var t=this,o=t.$createElement,e=t._self._c||o;return e("div",{staticClass:"fill"},[e("div",{staticClass:"fill",attrs:{id:"homeTarget"}},[e("h1",[t._v("TOUCH"),e("br"),t._v("AND"),e("br"),t._v("TALK")])])])}],r=(e("cadf"),e("551c"),e("097d"),e("8d29")),i=e("f633"),s={name:"home",mixins:[r["a"],i["a"]],created:function(){var t=this;this.$nextTick(function(){var o=document.querySelector("#homeTarget");o.addEventListener("click",t.onTouchStart)})},methods:{onCustomTouchStart:function(t){this.$router.push("/welcome")},onTouchStart:function(){this.$router.push("/welcome")}}},u=s,c=e("2877"),l=Object(c["a"])(u,n,a,!1,null,null,null);l.options.__file="Home.vue";o["default"]=l.exports}}]);
//# sourceMappingURL=chunk-5caae1f2.56ec83c9.js.map
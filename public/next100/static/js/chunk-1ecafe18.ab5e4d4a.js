(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-1ecafe18"],{"1c7e":function(t,e,n){},"2f21":function(t,e,n){"use strict";var r=n("79e5");t.exports=function(t,e){return!!t&&r(function(){e?t.call(null,function(){},1):t.call(null)})}},"55dd":function(t,e,n){"use strict";var r=n("5ca1"),o=n("d8e8"),a=n("4bf8"),i=n("79e5"),s=[].sort,c=[1,2,3];r(r.P+r.F*(i(function(){c.sort(void 0)})||!i(function(){c.sort(null)})||!n("2f21")(s)),"Array",{sort:function(t){return void 0===t?s.call(a(this)):s.call(a(this),o(t))}})},"5ab3":function(t,e,n){"use strict";var r=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"user-layer"}},t._l(t.loginUsers,function(t){return n("user-profile",{key:t.floorId,attrs:{user:t}})}))},o=[],a=n("c93e"),i=n("2f62"),s=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{class:t.userClass(),attrs:{"data-color":t.userColor()}},[n("div",{staticClass:"touch-state-box"},[t.user.isStartTalkModal?[n("p",{staticClass:"state-text"},[t._v("START!")]),t._m(0),n("div",{staticClass:"btn return",on:{click:t.onClickReturn}},[t._m(1)])]:t.isWelcome?[n("p",{staticClass:"state-text"},[t._v("WELCOME!")])]:"welcome"===t.$route.name?[n("p",{staticClass:"state-text"},[t._v("TOUCH!")]),t._m(2)]:t._e()],2),n("div",{staticClass:"user-avatar"}),n("div",{staticClass:"user-name"},[t._v(t._s(t.user.name))])])},c=[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("figure",{staticClass:"icon-touch"},[n("img",{attrs:{src:"/next100/static/img/icon-touch01.svg",alt:"TOUCH"}})])},function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("a",{attrs:{href:"#"}},[n("img",{attrs:{src:"/next100/static/img/btn_return01.svg",alt:"RETURN"}})])},function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("figure",{staticClass:"icon-touch"},[n("img",{attrs:{src:"/next100/static/img/icon-touch01.svg",alt:"TOUCH"}})])}],l=n("a322"),u={name:"UserProfile",props:{user:{type:Object,required:!0}},data:function(){return{isWelcome:!0}},created:function(){var t=this;setTimeout(function(){t.isWelcome=!1},1e3)},methods:{userClass:function(){var t,e=this.getDirectionClassByFloorId(this.user.floorId),n=(t={},Object(l["a"])(t,"user-".concat(e),!0),Object(l["a"])(t,"user-box",!0),t);return n},getDirectionClassByFloorId:function(){var t={1:"bottom",2:"left",3:"top",4:"right"};return t[this.user.floorId]},onClickReturn:function(){this.$store.commit("updateLoginUser",{floorId:this.user.floorId,params:{isStartTalkModal:!1}})},userColor:function(){var t=this.getColorMap();return t[this.user.floorId]}}},f=u,d=(n("9e51"),n("2877")),h=Object(d["a"])(f,s,c,!1,null,"544788c4",null);h.options.__file="UserProfile.vue";var p=h.exports,g={name:"UserLayer",components:{UserProfile:p},data:function(){return{isWelcome:!0}},methods:{},computed:Object(a["a"])({},Object(i["b"])(["loginUsers"]))},m=g,v=(n("7020"),Object(d["a"])(m,r,o,!1,null,"844c669a",null));v.options.__file="UserLayer.vue";e["a"]=v.exports},"6fba":function(t,e,n){"use strict";n.r(e);var r=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",t._l(t.layers,function(e,r){return n("div",{key:r},[n("div",[t._v("------------------------------------------------------")]),n("div",[t._v("id: "+t._s(e.id))]),n("div",[t._v("created_at: "+t._s(e.created_at))]),n("div",[t._v("画像:")]),n("div",{staticClass:"flexbox"},t._l(e.related_contents,function(e,r){return n("img",{key:e.id,staticClass:"image",attrs:{src:e.img_url},on:{click:function(n){t.onClickImage(e)}}})})),n("div",[t._v("キーワード "+t._s(e.words.join(", ")))])])}))},o=[],a=(n("c5f6"),n("55dd"),n("ac6a"),n("7514"),n("96cf"),n("3040")),i=(n("cadf"),n("551c"),n("097d"),n("a5bc")),s=n("2ef0"),c=n.n(s),l=n("f633"),u=n("c8b5"),f=n.n(u),d=n("1157"),h=n.n(d),p=n("5ab3"),g=50,m=10,v=10,y={name:"Meeting",mixins:[l["a"]],components:{UserLayer:p["a"]},created:function(){var t=Object(a["a"])(regeneratorRuntime.mark(function t(){var e;return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:e={wallId:this.$route.params.wallId},startRecognizeSpeachSDK(e),this.fetchTranscripts(),this.listenTranscriptsUpdate(),h()("body").css({overflow:"auto"});case 5:case"end":return t.stop()}},t,this)}));return function(){return t.apply(this,arguments)}}(),data:function(){var t=this;return{layers:[],isShowContentDetailModal:!1,currentContentDetailModalFloor:!1,currentDetailModalContent:null,currentDetailModalStyle:{},contextMenuStatuses:[],layerStyles:c.a.range(10).map(function(e){return t.getComputedStyleForLayer(e)}),keywordStyles:c.a.range(10).map(function(){return t.getRandomStyleForKeyWord()}),imageStyles:c.a.range(10).map(function(){return t.getRandomStyleForImage()}),positionMap:[]}},computed:{},methods:{onClickTest:function(){alert("test")},listenPersonalTouch:function(){window.addEventListener("CUSTOM_TOUCH_START",this.onClickTable)},fetchTranscripts:function(){var t=Object(a["a"])(regeneratorRuntime.mark(function t(){var e,n,r,o,a,s,c;return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return e=this.$route.params.wallId,n="/next100/contents?wall_id=".concat(e),t.next=4,i["a"].get(n);case 4:r=t.sent,o=r.data,a=o.searches,o.search_first_index,o.search_last_index,s=o.related_contents,o.related_content_last_index,c=a.map(function(t){return t.related_contents=s.filter(function(e){return e.transcript_id===t.transcript_id}),t}),c=c.filter(function(t){return t.related_contents&&t.related_contents.length>0}),this.layers=c.slice(0,10);case 9:case"end":return t.stop()}},t,this)}));return function(){return t.apply(this,arguments)}}(),onClickImage:function(t){var e=t.floorId,n=t.contentId;this.openContentDetailModal({floorId:e,contentId:n})},openContentDetailModal:function(t){var e=t.floorId,n=t.contentId;if(!this.isShowContentDetailModal){var r=this.layers.find(function(t){return t.related_contents.find(function(t){return t.id===n})});if(!r)return!1;var o=r.related_contents.find(function(t){return t.id===n});this.currentDetailModalStyle=this.getModalStyleByFloorId(e),this.currentDetailModalContent=o,this.isShowContentDetailModal=!0,this.contentDetailOpenTime=(new Date).getTime()}},closeContentDetailModal:function(){var t=1e3,e=(new Date).getTime()-this.contentDetailOpenTime;if(e<=t)return!1;this.isShowContentDetailModal=!1},onClickTable:function(t){var e=this,n=t.detail[0],r=!1,o=[];if(this.$refs.images.forEach(function(t){var a=t.getBoundingClientRect();if(e.isTouchObjectByRect(n,a))return r=!0,o.push(t),!1}),r){o.sort(function(t,e){var n=Number(t.getAttribute("data-content-id")),r=Number(e.getAttribute("data-content-id"));return n<r?-1:1});var a=o[0],i=n.floorId,s=Number(a.getAttribute("data-content-id"));return this.onClickImage({floorId:i,contentId:s}),!1}var c=this.$refs["context-menu-".concat(n.floorId)];c&&c.length>0&&!this.isTouchObjectByRect(n,c[0].getBoundingClientRect())?this.closeContextMenu(n):0===this.contextMenuStatuses.filter(function(t){return t.floorId===n.floorId}).length&&this.openContextMenu(n)},openContextMenu:function(t){var e=this.getTransformDegByFloorId(t.floorId),n={left:"".concat(t.x,"px"),top:"".concat(t.y,"px"),transform:"rotate(".concat(e,"deg)")},r="context-menu-".concat(t.floorId),o={floorId:t.floorId,style:n,refName:r};this.contextMenuStatuses.push(o)},closeContextMenu:function(t){var e=t.floorId;this.contextMenuStatuses=this.contextMenuStatuses.filter(function(t){return t.floorId!==e})},getStyleByContextMenuPosition:function(){},openPinList:function(){},createPin:function(){},removePin:function(){},offRecord:function(){},leave:function(){},exitWall:function(){},removeContent:function(){},removeWord:function(){},getRandomStyleForImage:function(){var t=c.a.random(window.innerWidth),e=c.a.random(window.innerHeight),n={left:"".concat(t,"px"),top:"".concat(e,"px")};return n},getRandomStyleForKeyWord:function(){var t=800,e=600,n=c.a.random(t,window.innerWidth-t),r=c.a.random(e,window.innerHeight-e),o={left:"".concat(n,"px"),top:"".concat(r,"px")};return o},getComputedStyleForLayer:function(t){var e=g-t*m,n=1-.08*t,r=v-t,o={transform:"translate3D(0px, 0px, ".concat(e,"px)"),opacity:n,zIndex:r};return o},getModalStyleByFloorId:function(t){var e=this.getTransformDegByFloorId(t);return{transform:"rotate(".concat(e,"deg)")}},getTransformDegByFloorId:function(t){var e={1:0,2:90,3:180,4:270};return e[t]},initializePinchEvent:function(){var t=this,e=document.querySelector("#app"),n=new f.a(e);n.get("pinch").set({enable:!0}),n.on("pinchout",function(e){t.logType("pinchout"),t.logEvent(e)}),n.on("pinchin",function(e){t.logType("pinchin"),t.logEvent(e)}),n.on("pinchmove",function(e){t.logType("pinchmove"),t.logEvent(e)})},logType:function(t){console.log(t)},logEvent:function(t){this.pinchScale=t.scale,console.log(t.scale)},randNum:function(t,e){return Math.floor(Math.random()*(t-e+1)+e)},arreyShuffle:function(t){for(var e=t.length-1;e>0;e--){var n=Math.floor(Math.random()*(e+1)),r=t[e];t[e]=t[n],t[n]=r}},calcSendPosition:function(){var t=[];h()("#media-send-leyer .send-area").each(function(e){var n=parseInt(h()(this).offset().left),r=parseInt(h()(this).offset().top),o=parseInt(n+h()(this).width()),a=parseInt(r+h()(this).height());console.log("x:"+n),console.log("y:"+r),console.log("x_max:"+o),console.log("y_max:"+a);var i={};i.x=n,i.y=r,i.x_max=o,i.y_max=a,t[e]=i}),this.arreyShuffle(t),this.positionMap=t},getLayerStyle:function(t){var e=["1deg","-0deg","-1deg","-2deg","-3deg","-4deg","-3deg","-2deg","-1deg","0deg"],n={transform:"translate3d(0,0,"+(500*t-4500)+"px) rotate("+e[t]+")",filter:"blur("+(90-10*t)+"px)",opacity:.1+.1*t};return n},getImageStyle:function(t){var e=this.positionMap,n=["0deg","90deg","180deg","270deg"],r=c.a.random(e[t].y_max,e[t].y),o=c.a.random(e[t].x_max,e[t].x),a=parseInt(window.innerWidth/4/2),i=parseInt(window.innerHeight/5/2);this.arreyShuffle(n);var s={top:r-i+"px",left:o-a+"px",transform:"rotate("+n[0]+")"};return s},getKeywordColor:function(t){var e=["red","blue","green","yellow","purple","vermilion","yellowgreen","orange","lightblue","gold","pink","bluegreen","white"];return e[t]},updateLayer:function(){i["a"].get("")},listenTranscriptsUpdate:function(){var t=this;setInterval(function(){t.fetchTranscripts()},1e3)}}},_=y,x=(n("7f1a"),n("2877")),C=Object(x["a"])(_,r,o,!1,null,null,null);C.options.__file="TestTranscripts.vue";e["default"]=C.exports},7020:function(t,e,n){"use strict";var r=n("1c7e"),o=n.n(r);o.a},"7f1a":function(t,e,n){"use strict";var r=n("a1fb"),o=n.n(r);o.a},"9e51":function(t,e,n){"use strict";var r=n("cd43"),o=n.n(r);o.a},a1fb:function(t,e,n){},cd43:function(t,e,n){}}]);
//# sourceMappingURL=chunk-1ecafe18.ab5e4d4a.js.map
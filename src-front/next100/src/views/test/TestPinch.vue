<template>
  <div>
    <div class="wrapper" :style="wrapperStyle">
      <div class="child" :style="childStyle">
        <template v-for="(layer, i) in layers">
          <div class="layer" :data-layer-id="i" :style="layerStyles[i]">
            <img :src="`http://placehold.it/600x600?text=${layer.name}`">
          </div>
        </template>
      </div>
    </div>
    <div class="control">
      params: {{ debugParams }} <br>
      translateZ: <input type="number" v-model.number="translateZ" @input="onInputTranslateZ">px<br>
      perspective: <input type="number" value="100" @input="onInputPerspective">px<br>
      <button @click="onClickAddLayer">add layer</button><br>
    </div>
  </div>
</template>

<script>
import $ from "jquery";
import _ from "lodash";
import Hammer from "hammerjs";

export default {
  name: "MeetingTest",
  created() {
    this.initializePinchEvent();
  },
  data() {
    return {
      translateZ: 0,
      debugParams: '',
      layers: [
        {name: 'layer-5'},
        {name: 'layer-4'},
        {name: 'layer-3'},
        {name: 'layer-2'},
        {name: 'layer-1'},
        {name: 'layer-0'},
      ],
      wrapperStyle: {},
      childStyle: {},
    };
  },
  computed: {
    layerStyles() {
      const diff = 50;
      const styles = this.layers.map((layer, i) => {
        return {
          transform: `translate3D(0px, 0px, ${0 - i * diff}px)`
        }
      });
      return styles;
    }
  },
  methods: {
    throttleLog: _.debounce((type) => {
      console.error(type);
    }, 200),
    initializePinchEvent() {
      const square = document.querySelector('#app');
      const hammer = new Hammer(square);
      hammer.get('pinch').set({ enable: true });
      hammer.on('pinchout', (e) => {
        // this.logType('pinchout');
        this.throttleLog('[mabiki] pinch out');
        this.logEvent(e);
      });
      hammer.on('pinchin', (e) => {
        this.logType('pinchin');
        this.logEvent(e);
        this.throttleLog('[mabiki] pinch in');
      });
      hammer.on('pinchmove', (e) => {
        this.logType('pinchmove');
        this.logEvent(e);
      });
    },
    logType(type) {
      console.log(type);
    },
    logEvent(e) {
      const debugParams = {
        type: e.type,
        scale: e.scale,
        rotation: e.rotation,
        velocity: e.velocity,
      };
      this.debugParams = JSON.stringify(debugParams)
      console.log(debugParams);
    },
    convertTranslateZ(scale) {
      this.translateZ
    },
    stopWindowPinchAction() {
      // window.addEventListener('touchmove', (evt) => {
      //   alert("move");
      //   evt.preventDefault();
      // });
      // document.addEventListener('touchstart', event => {
      //   if (event.touches.length > 1) {
      //     event.preventDefault();
      //   }
      // }, true);
    },
    onInputTranslateZ(evt) {
      const val = evt.target.value;
      this.childStyle = {
        transform: `translate3D(0px, 0px, ${val}px)`,
      };
    },
    onInputPerspective(evt) {
      const val = evt.target.value;
      this.wrapperStyle = {
        perspective: `${val}px`
      };
    },
    onInputLayer(evt) {
      const val = evt.target.value;
      const id = evt.target.getAttribute('data-layer-id');
      this.layerStyles[id] = {
        transform: `translate3D(0px, 0px, ${val}px)`,
      }
    },
    onClickAddLayer() {
      const newLayer = {name: `layer-${this.layers.length}`};
      this.layers.unshift(newLayer);
    },
  }
}
</script>

<style scoped>
  .wrapper {
    display: flex;
    justify-content: center;
    perspective: 100px;
    perspective-origin: center center;

    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  .child {
    transform-origin: center center;
    transform-style: preserve-3D;
    position: relative;
    width: 100%;
    height: 100%;
  }

  input {
    width: 100px;
  }

  .layer {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0.5;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all 0.5s;
  }

  .control {
    position: absolute;
    display: block;
    bottom: 0;
    right: 0;
  }
</style>

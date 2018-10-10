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
      translateZ: <input type="number" value="0" @input="onInputTranslateZ">px<br>
      perspective: <input type="number" value="100" @input="onInputPerspective">px<br>
      <button @click="onClickAddLayer">add layer</button><br>
      -<br>
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
    const square = document.querySelector('#app');
    const hammer = new Hammer(square);
    hammer.get('pinch').set({ enable: true });
    hammer.on('pinchout', function(e) {
      alert("pinchout");
    });
    hammer.on('pinchin', function(e) {
      alert("pinchin");
    });
  },
  data() {
    return {
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

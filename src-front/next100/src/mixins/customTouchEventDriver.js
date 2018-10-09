import axios from "axios";
import io from "socket.io-client";
import _ from "lodash";

const client = axios.create({
  baseURL: process.env.VUE_APP_CUSTOM_TOUCH_EVENT_DRIVER_BASE_URL
});

const VIRTUAL_MAX_LENGTH = 32768;

export default {
  methods: {
    startObserver() {
      const mode = this.$store.state.customTouchMode;
      if (mode === 'developer' || mode === 'preview') {
        this.observeBrowserTouchEvent();
      }

      if (mode !== 'preview') {
        this.observeEventFromDriver();
      }
    },
    /**
     * (developer用) ブラウザタッチイベントを専用ドライバに送信
     */
    observeBrowserTouchEvent() {
      window.addEventListener('touchstart', this.handleNativeTouchEvent('touchstart', 'CUSTOM_TOUCH_START'));
      window.addEventListener('touchend', this.handleNativeTouchEvent('touchend', 'CUSTOM_TOUCH_END'));
      window.addEventListener('touchmove', this.handleNativeTouchEvent('touchmove', 'CUSTOM_TOUCH_MOVE'));
    },
    handleNativeTouchEvent(listenEventName, dispatchEventName) {
      return (evt) => {
        const floorId = this.$store.state.debugParams.currentFloorId;
        const queue = [];
        for (let i = 0; i < evt.changedTouches.length; i++) {
          const touch = evt.changedTouches[i];
          const pos = this.getConvertedPosition(touch);
          const params = {
            type: listenEventName,
            identify: i + 1,
            floorId,
            x: pos.x,
            y: pos.y
          };
          queue.push(params);
        };

        const mode = this.$store.state.customTouchMode;
        if (mode === 'developer') {
          this.sendDriver(queue);
        } else if (mode === 'preview') {
          const filterdData = this.filterData(queue);
          const option = {
            detail: filterdData
          };
          const customTouchStartEvent = new CustomEvent(dispatchEventName, option);
          window.dispatchEvent(customTouchStartEvent);
        }
      };
    },
    getConvertedPosition(touch) {
      const x = touch.clientX;
      const y = touch.clientY;
      const max = VIRTUAL_MAX_LENGTH;
      return {
        x: _.round(max * x / window.innerWidth),
        y: _.round(max * y / window.innerHeight)
      }
    },
    /**
     * 専用ドライバからのイベントを受信してカスタムイベントを発火
     */
    observeEventFromDriver() {
      const socket = io(process.env.VUE_APP_CUSTOM_TOUCH_EVENT_DRIVER_BASE_URL);
      socket.on('emit_from_server', function(data) {
        console.log('receive from websocket: ' + data);
        const filteredData = this.filterData(data);
        const option = {
          detail: JSON.parse(filteredData)
        };
        const customTouchStartEvent = new CustomEvent('CUSTOM_TOUCH_START', option);
        window.dispatchEvent(customTouchStartEvent);
      });
    },
    filterData(data) {
      let filteredData = data.map(d => {
        let r = d;
        r.x = (d.x / VIRTUAL_MAX_LENGTH) * window.innerWidth;
        r.y = (d.y / VIRTUAL_MAX_LENGTH) * window.innerHeight;
        return d;
      });
      return filteredData;
    },
    listenOnceCustomTouchStart(callback) {
      const listener = window.addEventListener('CUSTOM_TOUCH_START', (evt) => {
        window.removeEventListener('CUSTOM_TOUCH_START', listener);
        callback(evt);
      });
    },
    sendDriver(data) {
      client.get(`/?_= ${JSON.stringify(data)}`);
    }
  },
};

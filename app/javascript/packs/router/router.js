import Vue from 'vue/dist/vue.esm.js'
import VueRouter from 'vue-router'
import Index from '../components/index.vue'
import Workshop from '../components/workshop.vue'

Vue.use(VueRouter)

export default new VueRouter({
  mode: 'history',
  routes: [
    { path: '/dev', component: Index },
    { path: '/dev/en', component: Index },
    { path: '/dev/ja', component: Workshop },
  ],
})

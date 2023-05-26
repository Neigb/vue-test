import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
// import ElementUI from '../node_modules/element-ui/lib';

import 'element-ui/lib/theme-chalk/index.css';
import TooltipColumn from './components/TooltipColumn';
import VirtualList from './directives/virtual-list';
import LazySelect from './directives/lazy-select';
import VueRouter from 'vue-router'
import router from './router';
import RadioSelect from './components/RadioSelect.vue';
import BaseDateBtnSingle from './components/BaseDateBtnSingle';

Vue.use(VueRouter)
Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.directive('virtual-list', VirtualList)
Vue.directive('lazy-select', LazySelect)
// Vue.use(Button)
// Vue.use(TableColumn)
// Vue.use(Popover)
Vue.component('base-date-btn-single', BaseDateBtnSingle)
Vue.component('tooltip-column', TooltipColumn)
Vue.component('radio-select', RadioSelect)

new Vue({
  render: h => h(App),
  router: router
}).$mount('#app')



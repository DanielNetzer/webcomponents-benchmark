import Vue from 'vue';
import wrap from '@vue/web-component-wrapper';
import VwcwImg from './components/VueWebComponentImg.vue';

Vue.config.productionTip = false;

const CustomElement = wrap(Vue, VwcwImg);

window.customElements.define('vwcw-img', CustomElement);
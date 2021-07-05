import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VMask from "v-mask"
// import { validate } from 'vee-validate'
import 'bootstrap/dist/css/bootstrap.css'
import * as VeeValidate from 'vee-validate';
import msg from './pt_BR';

Vue.use(VMask)
// Vue.use(validate)

Vue.use(VeeValidate, {
  locale: 'pt_BR',
  dictionary: {
    pt_BR: {
      messages: msg
    }
  }
});

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

import Vue from 'vue';
import App from './App.vue';
// import Swal from 'sweetalert2'
// import router from './services/routes.js'

// window.swal = Swal;
// Vue.use(Swal);

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  // router,
}).$mount('#app')

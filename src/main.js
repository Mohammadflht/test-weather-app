import Vue from 'vue';
import App from './App.vue';
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
// import Swal from 'sweetalert2'
// import router from './services/routes.js'

Vue.use(Vuetify)

const vuetify = new Vuetify({
  theme: {
    themes: {
      light: {
        primary: '#0c3245',
        secondary: '#b0bec5',
      },
    },
  },
})

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  vuetify,
  // router,
}).$mount('#app')

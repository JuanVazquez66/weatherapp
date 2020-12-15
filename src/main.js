/*      Current Weather Final Project
        Name: Juan Vazquez
        Teacher: Kirsten Markley
        Class: cis-131-w01
        Date: 12/12/20
*/
import Vue from 'vue'
import App from './App.vue'
//imported boostrap
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')

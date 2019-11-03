 import Vue from 'vue'
import './plugins/axios'
import store from './state/store'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify';
import VueTextareaAutosize from "vue-textarea-autosize";
import firebase from "firebase/app";
import "firebase/firestore";

Vue.use(VueTextareaAutosize);
Vue.config.productionTip = false
firebase.initializeApp({
  apiKey: "AIzaSyCi1YB74TrzrHesqaz7dMfh2v5d3oEuBGE",
  authDomain: "rguevents-c4844.firebaseapp.com",
  databaseURL: "https://rguevents-c4844.firebaseio.com",
  projectId: "rguevents-c4844",
  storageBucket: "rguevents-c4844.appspot.com",
  messagingSenderId: "944070025508",
  appId: "1:944070025508:web:20358e27c7c85e105313b1"
});

export const db = firebase.firestore();

new Vue({
  router,
  vuetify,
  store,
  render: h => h(App)
}).$mount('#app')

import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify';
import store from './store'
import VueTextareaAutosize from "vue-textarea-autosize";
import firebase from "firebase/app";
import "firebase/firestore";

Vue.use(VueTextareaAutosize);
Vue.config.productionTip = false
firebase.initializeApp({
  apiKey: "AIzaSyCzWpUb1m6GC4gew_mMWInqsUIx0Byx7h8",
  authDomain: "rguevents.firebaseapp.com",
  databaseURL: "https://rguevents.firebaseio.com",
  projectId: "rguevents",
  storageBucket: "rguevents.appspot.com",
  messagingSenderId: "225833524224",
  appId: "1:225833524224:web:949e3075e500ab29084ce5"
});

export const db = firebase.firestore();

new Vue({
  router,
  vuetify,
  store,
  render: h => h(App)
}).$mount('#app')

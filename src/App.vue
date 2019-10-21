<template>
  <v-app>
    <rgu-navbar />
    <v-content>
      <router-view />
    </v-content>
    <rgu-footer />
  </v-app>
</template>

<script>
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Welcome from "./views/Welcome";
import Home from "./views/Home";
import { mapActions } from "vuex";

export default {
  name: "App",
  components: {
    "rgu-navbar": Navbar,
    "rgu-footer": Footer
  },
  data: () => ({
    //
  }),
  methods: {
    ...mapActions(["fetchAccessToken"])
  },
  created() {
    this.fetchAccessToken();
  }
};
</script>
<style>
@import "~vuetify/dist/vuetify.min.css";
@import "http://fonts.googleapis.com/css?family=Roboto:400,500,700,400italic|Material+Icons";
</style>

<template>
  <v-app>
    <Navbar />
    <v-content>
      <router-view />
    </v-content>
  </v-app>
</template>

<script>
import Navbar from "./components/Navbar";
import { mapActions } from "vuex";

export default {
  name: "App",
  components: {
    Navbar
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

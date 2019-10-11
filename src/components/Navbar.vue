<template>
  <v-app-bar app>
    <v-toolbar-title class="headline text-uppercase">
      <span>RGU</span>
      <span class="font-weight-light">EVENTS</span>
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn>log-out</v-btn>
    <loginDialog />
  </v-app-bar>
</template>

<script>
import LoginDialog from "./LoginDialog";

export default {
  components: {
    LoginDialog
  }
};
</script>
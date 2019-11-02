<template>
  <div>
    <v-navigation-drawer
      v-if="isLoggedIn"
      v-model="drawer"
      app
      :clipped="$vuetify.breakpoint.lgAndUp"
    >
      <v-list dense>
        <v-list-item v-for="item in items" :key="item.text" :to="item.route">
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{item.text}}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar :clipped-left="$vuetify.breakpoint.lgAndUp" app color="#712177" dark>
      <v-toolbar-title style="width: 300px" class="ml-0 pl-4">
        <v-app-bar-nav-icon v-if="isLoggedIn" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
        <span class="hidden-sm-and-down">RGUEvents</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <loginDialog />
    </v-app-bar>
  </div>
</template>

<script>
import LoginDialog from "./LoginDialog";
import RegisterDialog from "./RegisterDialog";

export default {
  props: {
    source: String
  },
  data() {
    return {
      dialog: false,
      drawer: null,
      items: [
        { icon: "home", text: "Home", route: "/home" },
        { icon: "account_box", text: "Profile", route: "/profile" },
        { icon: "calendar_today", text: "Calendar", route: "/calendar" },
        { icon: "note", text: "Events", route: "/events" },
        { icon: "note", text: "Events List View", route: "/events-list-view" },
        { icon: "people", text: "Staff", route: "/staff" },
        { icon: "help", text: "Help", route: "/help" }
      ],
      isLoggedIn: false
    };
  },
  created() {
    if (this.$route.path === "/") {
      this.isLoggedIn = false;
    }
    if (this.$route.path === "/home") {
      this.isLoggedIn = true;
    }
    if (this.$route.path === "/profile") {
      this.isLoggedIn = true;
    }
    if (this.$route.path === "/events") {
      this.isLoggedIn = true;
    }
    if (this.$route.path === "/events-list-view") {
      this.isLoggedIn = true;
    }
    if (this.$route.path === "/staff") {
      this.isLoggedIn = true;
    }
  },
  components: {
    LoginDialog,
    RegisterDialog
  }
};
</script>
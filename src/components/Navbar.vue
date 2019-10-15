<template>
  <div>
    <v-navigation-drawer
            v-if="isLoggedIn"
            v-model="drawer"
            app
            :clipped="$vuetify.breakpoint.lgAndUp"
    >
      <v-list dense>
        <template v-for="item in items">
          <v-row
                  v-if="item.heading"
                  :key="item.heading"
                  align="center"
          >
            <v-col cols="6">
              <v-subheader v-if="item.heading">
                {{ item.heading }}
              </v-subheader>
            </v-col>
            <v-col
                    cols="6"
                    class="text-center"
            >
              <a
                      href="#!"
                      class="body-2 black--text"
              >EDIT</a>
            </v-col>
          </v-row>
          <v-list-group
                  v-else-if="item.children"
                  :key="item.text"
                  v-model="item.model"
                  :prepend-icon="item.model ? item.icon : item['icon-alt']"
                  append-icon=""
          >
            <template v-slot:activator>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>
                    {{ item.text }}
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </template>
            <v-list-item
                    v-for="(child, i) in item.children"
                    :key="i"
                    @click=""
            >
              <v-list-item-action v-if="child.icon">
                <v-icon>{{ child.icon }}</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>
                  {{ child.text }}
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-group>
          <v-list-item
                  v-else
                  :key="item.text"
                  @click=""
          >
            <v-list-item-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>
                {{ item.text }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar
            :clipped-left="$vuetify.breakpoint.lgAndUp"
            app
            color="#712177"
            dark
    >
      <v-toolbar-title
              style="width: 300px"
              class="ml-0 pl-4"
      >
        <v-app-bar-nav-icon v-if="isLoggedIn" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
        <span class="hidden-sm-and-down">RGUEvents</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <loginDialog />
        <RegisterDialog/>
    </v-app-bar>
  </div>
</template>

<script>
import LoginDialog from "./LoginDialog";
import RegisterDialog from "./RegisterDialog";

export default {
  props: {
    source: String,
  },
  data() {
      return {
          dialog: false,
          drawer: null,
          items: [
              { icon: 'home', text: 'Home' },
              { icon: 'note', text: 'Events' },
              { icon: 'people', text: 'Staff' },
              { icon: 'help', text: 'Help' },
          ],
          isLoggedIn: false,
      };
  },
  created(){
    if(this.$route.path === "/"){
      this.isLoggedIn = false;
    }
    if(this.$route.path === "/home"){
      this.isLoggedIn = true;
    }
  },
  components: {
      LoginDialog,
      RegisterDialog

  }
};
</script>
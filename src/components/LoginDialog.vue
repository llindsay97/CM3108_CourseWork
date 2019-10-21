<template>
  <v-dialog v-model="dialog" overlay-color="green" max-width="600px">
    <template v-slot:activator="{ on }">
      <v-btn v-if="!isLoggedIn" color="white" class="font-weight-bold" text v-on="on">Log in</v-btn>
      <v-btn v-if="isLoggedIn" v-on:click="logOut" color="white" class="font-weight-bold" text >Log out</v-btn>
    </template>
    <v-card>
      <v-card-title>
        <span class="headline" color="primary">Login</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-form ref="form">
            <v-text-field
              label="E-mail*"
              name="username"
              type="text"
              prepend-inner-icon="person"
              required
              v-model="email"
              :rules="emailRules"
            ></v-text-field>
            <v-text-field
              label="Password*"
              name="password"
              type="password"
              prepend-inner-icon="mdi-lock"
              required
              v-model="password"
              :rules="passwordRules"
            ></v-text-field>
            <v-checkbox v-model="rememberMe" color="primary" label="Remember me"></v-checkbox>
          </v-form>
        </v-container>
        <small>*indicates required field</small>
      </v-card-text>
      <v-card-actions>
        <div class="flex-grow-1"></div>
        <v-btn color="error" text v-on:click="dialog = false">cancel</v-btn>
        <v-btn color="primary" :loading="this.loggingIn" v-on:click="loginSubmit">Login</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  data: () => ({
    //Component data
      dialog: false,
      email: "",
      password: "",
      rememberMe: false,
      isLoggedIn: false,

    //Form rules
    emailRules: [
      v => !!v || "E-mail is required",
      v => /.+@.+\..+/.test(v) || "E-mail must be valid"
    ],
    passwordRules: [v => !!v || "Password is required"]
  }),
  computed: {
    //Vuex state variables
    ...mapState(["loggingIn", "loginError", "loginSuccessful"])
  },
    created(){
        if(this.$route.path === "/"){
            this.isLoggedIn = false;
        } else {
            this.isLoggedIn = true;
        }
    },
  methods: {
    //Vuex state actions
    ...mapActions(["doLogin", "doLoginSaveAccess", "getLoginStatus"]),
    loginSubmit() {
      if (this.$refs.form.validate() && this.rememberMe) {
        let logginPromise = new Promise((resolve, reject) => {
          this.doLoginSaveAccess({
            email: this.email,
            password: this.password
          });
          if (this.getLoginStatus()) {
            resolve("Login successful");
            this.$router.push({path: "/home"});
          } else {
            reject("Login failed");
          }
        }).then(message => {
          console.log(message);
          this.checkLoginStatus(this.getLoginStatus());
        });
      } else if (this.$refs.form.validate() && !this.rememberMe) {
        let logginPromise = new Promise((resolve, reject) => {
          this.doLogin({
            email: this.email,
            password: this.password
          });
          if (this.getLoginStatus()) {
            resolve("Login successful");
          } else {
            reject("Login failed");
          }
        }).then(message => {
          console.log(message);
          this.checkLoginStatus(this.getLoginStatus());
        });
      }
    },
    checkLoginStatus(status) {
      if (status) {
        console.log("loggin worked! also hello!");
        this.dialog = false;
        this.$router.push({path: "/home"});
        this.$router.go({path: this.$router.path});
      }
    },
    logOut(){
        this.$router.push({path: "/"});
        this.$router.go({path: this.$router.path});
    }
  }
};
</script>
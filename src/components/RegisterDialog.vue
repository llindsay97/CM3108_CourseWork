<template>
    <v-dialog v-model="dialog" overlay-color="green" max-width="600px">
        <template v-slot:activator="{ on }">
            <v-btn v-if="!isRegister" color="white" class="font-weight-bold" text v-on="on">Register</v-btn>
        </template>
        <v-card>
            <v-card-title>
                <span class="headline" color="primary">Register</span>
            </v-card-title>
            <v-card-text>
                <v-container>
                    <v-form ref="form">
                        <v-text-field
                                label="First Name"
                                name="first_name"
                                type="text"
                                prepend-inner-icon="person"
                                required
                                v-model="name"
                        ></v-text-field>
                        <v-text-field
                                label="Last Name"
                                name="last_name"
                                type="text"
                                prepend-inner-icon="person"
                                required
                                v-model="name"
                        ></v-text-field>
                        <v-text-field
                                label="E-mail*"
                                name="username"
                                type="text"
                                prepend-inner-icon="email"
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
                        <v-text-field
                                label="Confirm Password*"
                                name="password"
                                type="password"
                                prepend-inner-icon="mdi-lock"
                                required
                                v-model="password"
                                :rules="passwordRules"
                        ></v-text-field>
                        <v-text-field
                                label="Job Title"
                                name="job_title"
                                type="text"
                                prepend-inner-icon="work"
                                required
                                v-model="name"
                        ></v-text-field>
                    </v-form>
                </v-container>
                <small>*indicates required field</small>
            </v-card-text>
            <v-card-actions>
                <div class="flex-grow-1"></div>
                <v-btn color="error" text v-on:click="dialog = false">cancel</v-btn>
                <v-btn color="primary" :loading="this.loggingIn" v-on:click="loginSubmit">Register</v-btn>
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
            isRegister: false,

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
                this.isRegister = false;
            } else {
                this.isRegister = true;
            }
        },
        methods: {
            register(){

            }
        }
    };
</script>
<template>
    <div>
        <v-content>
            <v-container >
                <v-layout align-center justify-center>
                    <v-flex class="pl-10" lg8>
                        <header class="purple--text">Welcome to RGU event manager,
                                please select one of the icons to carry out your task.<br><br>
                        </header>
                    </v-flex>
                </v-layout>
                <v-layout align-center justify-center>
                    <v-flex xs12>          
                        <h2 class="purple--text">Control Tools:</h2> 
                    </v-flex>
                </v-layout>   
                
                <!--- vertical and horizontal alignment -->
                <v-layout align-center justify-center>
                    <v-flex xs2>
                <!--- v-flex is centered now, but we need to center button inside v-flex -->
                        <span class="purple--text">Add Event</span>
                             <div class="text-xs-center">
                                <v-btn color="purple" fab x-large dark>
                                    <v-icon>add</v-icon>
                                </v-btn>
                            </div>
                    </v-flex>
                    <v-flex xs1>
                        <span class="pl-4 purple--text">User Info</span>
                        <!--- v-flex is centered now, but we need to center button inside v-flex -->
                            <div class="pl-3 text-xs-center">
                                <v-btn color="purple" fab x-large dark>
                                    <v-icon>emoji_people</v-icon>
                                </v-btn>
                            </div>
                    </v-flex>
                </v-layout>
                <v-layout align-center justify-center>
                    <v-flex xs12>
                        <h2 class="purple--text">Search Tool:</h2> 
                    </v-flex>
                </v-layout>
                <v-layout align-center justify-center>
                    <v-flex xs1>
                    <!--- v-flex is centered now, but we need to center button inside v-flex -->
                        <span class="ml-5 purple--text">Search</span>
                        <div class="pl-2 text-xs-center">
                            <v-btn color="purple" fab x-large dark>
                                <v-icon>search</v-icon>
                            </v-btn>
                        </div>
                    </v-flex>
                </v-layout>
             </v-container> 
        </v-content>
    </div>
</template>

<script>
    export default {
        name: "Home",
        components: {

        }
    }

</script>

<style>

</style>
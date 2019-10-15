<template>
    <v-footer id="rgu-footer" app absolute class="font-weight-medium">
        <v-col class="text-center" cols="12">
            <span class="white--text">&copy; {{copyright}}</span>
        </v-col>
    </v-footer>
</template>

<script>
    export default {
        name: "Footer",
        data(){
            return {
                copyright: "2019 Robert Gordon University. All rights reserved."
            }
        }
    }

</script>

<style scoped>
    #rgu-footer{
        height: 8%;
        background: #712177;
    }
</style>
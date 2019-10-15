<template>
    <v-container fluid>
        <v-layout>
            <h1>Events</h1>
            <AddEvent/>
        </v-layout>
    </v-container>
</template>

<script>
    import AddEvent from "../components/AddEvent";
    export default {
        name: "Events",
        components: {
            AddEvent
        }
    }
</script>

<style scoped>

</style>
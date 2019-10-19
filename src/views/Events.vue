<template>
    <v-container fluid>
        <v-layout>
            <EventsTable/>
        </v-layout>
        <br>
    </v-container>
</template>

<script>
    import EventsTable from "../components/EventsTable";

    export default {
        name: "Events",
        components: {
            EventsTable
        }
    }
</script>

<style scoped>

</style>
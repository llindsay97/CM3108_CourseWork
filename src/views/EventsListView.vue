<template>
  <div>
    <rgu-events-list/>
  </div>
</template>

<script>
  import EventsListView from "../components/EventsListView";

  export default {
    name: "EventsListView",
    components: {
      "rgu-events-list": EventsListView
    }
  }
</script>

<style scoped>

</style>
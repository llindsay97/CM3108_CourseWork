<template>
  <v-container fluid>
    <v-layout>
      <StaffTable />
    </v-layout>
    <br />
  </v-container>
</template>

<script>
import StaffTable from "../components/StaffTable";

export default {
  name: "Staff",
  components: {
    StaffTable
  }
};
</script>

<style scoped>
</style>
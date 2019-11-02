<!--- Basic Student Profile front end, will need to update
      when fetching user information from the database -->


<template>
  <v-container fill-height fluid grid-list-xl justify-center>
    <v-layout justify-center wrap>
      
      <v-flex xs12 md4>
        <material-card class="v-card-profile purple--text">
          <h1 class="purple--text text-center">Your Profile</h1>
          <v-avatar slot="offset" class="mx-auto d-block pt-5 mt-5" size="120">
            <img src="https://cdn.pixabay.com/photo/2017/02/23/13/05/profile-2092113_960_720.png">
          </v-avatar>
          <v-card-text class="text-center">
            <h2 class="card-title text-gray font-weight-bold mb-1 mt-2">Name & Student ID</h2>
            <h3 class="category text-gray font-weight-light mb-1">Lee Lindsay - 1607094</h3> <!-- {{ profile.name }} , {{ profile.studentid }} -->
            <h2 class="card-title text-gray font-weight-bold mb-1 mt-2">Course & Year</h2>
            <h3 class="category text-gray font-weight-light mb-1">Computer Science Bsc - Year 3</h3> <!-- {{profile.course}} , {{profile.courseyear}} -->
            <h2 class="card-title text-gray font-weight-bold mb-1 mt-2">Student Information</h2>
            <p class="card-description text-gray font-weight-light">
              Phone Number - 07712858212 <br> <!-- {{profile.phone}} -->
              Email - 1607094@rgu.ac.uk <br> <!-- {{profile.email}} -->
              Sex - Male <!-- {{profile.gender }} -->
            </p>
          </v-card-text>
        </material-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: "Profile",
  components: {}
};
</script>

<style scoped>
</style>

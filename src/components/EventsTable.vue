<template>
  <v-card style="width: 100%;">
    <v-card-title>
      <span
        class="pr-3"
        style="min-width: 26%;"
      >Events for {{ months[currentMonth].name }} - {{ currentYear }}</span>
      <v-btn text icon class="pr-2" v-on:click="goToMonth(-1)">
        <v-icon>keyboard_arrow_left</v-icon>
      </v-btn>
      <v-btn text icon class="pr-1" v-on:click="goToCurrentMonth">
        <v-icon>today</v-icon>
      </v-btn>
      <v-btn text icon v-on:click="goToMonth(1)">
        <v-icon>keyboard_arrow_right</v-icon>
      </v-btn>
      <v-spacer></v-spacer>
      <v-text-field append-icon="search" label="Search" single-line hide-details v-model="search"></v-text-field>
    </v-card-title>
    <v-data-table
      :height="300"
      v-bind:headers="headers"
      v-bind:items="items"
      v-bind:search="search"
      :items-per-page="5"
      item-key="_id"
    >
      <template v-slot:top>
        <v-dialog v-model="dialog" max-width="800px">
          <template v-slot:activator="{ on }">
            <v-btn color="pink" dark fab fixed right class="rgu-add-btn" v-on="on">
              <v-icon>mdi-plus</v-icon>
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col class="align-center justify-space-between" cols="12">
                    <v-text-field v-model="editedItem.name" prepend-icon="event" placeholder="Name"></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      v-model="editedItem.location"
                      prepend-icon="place"
                      placeholder="Location"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="6">
                    <v-text-field v-model="editedItem.date" prepend-icon="today" placeholder="Date"></v-text-field>
                  </v-col>
                  <v-col cols="6">
                    <v-text-field v-model="editedItem.time" prepend-icon="watch" placeholder="Time"></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      v-model="editedItem.staff"
                      prepend-icon="people"
                      placeholder="Staff"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      v-model="editedItem.notes"
                      prepend-icon="notes"
                      placeholder="Notes"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
              <v-btn color="blue darken-1" text @click="save">Save</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </template>
      <template v-slot:item.action="{ item }">
        <v-icon small class="mr-2" @click="editItem(item)">edit</v-icon>
        <v-icon small @click="deleteItem(item)">delete</v-icon>
      </template>

      <template
        slot="pageText"
        slot-scope="{ pageStart, pageStop}"
      >from {{pageStart}} to {{pageStop}}</template>
    </v-data-table>
  </v-card>
</template>

<script>
export default {
  name: "EventsTable",
  data() {
    return {
      dialog: false,
      months: [
        { name: "Zero", abrev: "ZZZ", index: 0 },
        { name: "January", abrev: "Jan", index: 1 },
        { name: "February", abrev: "Feb", index: 2 },
        { name: "March", abrev: "Mar", index: 3 },
        { name: "April", abrev: "Apr", index: 4 },
        { name: "May", abrev: "May", index: 5 },
        { name: "June", abrev: "Jun", index: 6 },
        { name: "July", abrev: "Jul", index: 7 },
        { name: "August", abrev: "Aug", index: 8 },
        { name: "September", abrev: "Sep", index: 9 },
        { name: "October", abrev: "Oct", index: 10 },
        { name: "November", abrev: "Nov", index: 11 },
        { name: "December", abrev: "Dec", index: 12 }
      ],
      currentMonth: 10,
      currentYear: 2019,
      search: "",
      snack: false,
      snackColor: "",
      snackText: "",
      max25chars: v => v.length <= 25 || "Input too long!",
      pagination: {},
      headers: [
        { text: "Name", align: "center", sortable: false, value: "name" },
        {
          text: "Location",
          align: "center",
          sortable: false,
          value: "location"
        },
        { text: "Date", align: "center", sortable: false, value: "date" },
        { text: "Time", align: "center", sortable: false, value: "time" },
        { text: "Staff", align: "center", sortable: false, value: "staff" },
        { text: "Actions", sortable: false, value: "action" }
      ],
      items: [
        {
          _id: "1",
          userId: "AB11",
          name: "Project Management Lecture",
          location: "room N117",
          date: "October-21",
          time: "2:00PM",
          staff: "Tiffany Young",
          notes: ""
        },
        {
          _id: "2",
          userId: "AB11",
          name: "Project Management Laboratory",
          location: "room N533",
          date: "October-21",
          time: "3:00PM",
          staff: "Tiffany Young",
          notes: ""
        },
        {
          _id: "3",
          userId: "AB11",
          name: "Project Management Lecture",
          location: "room N117",
          date: "October-21",
          time: "2:00PM",
          staff: "Tiffany Young",
          notes: ""
        },
        {
          _id: "4",
          userId: "AB11",
          name: "Project Management Laboratory",
          location: "room N533",
          date: "October-21",
          time: "3:00PM",
          staff: "Tiffany Young",
          notes: ""
        },
        {
          _id: "5",
          userId: "AB11",
          name: "Project Management Lecture",
          location: "room N117",
          date: "October-21",
          time: "2:00PM",
          staff: "Tiffany Young",
          notes: ""
        },
        {
          _id: "6",
          userId: "AB11",
          name: "Project Management Laboratory",
          location: "room N533",
          date: "October-21",
          time: "3:00PM",
          staff: "Tiffany Young",
          notes: ""
        },
        {
          _id: "7",
          userId: "AB11",
          name: "Project Management Lecture",
          location: "room N117",
          date: "October-21",
          time: "2:00PM",
          staff: "Tiffany Young",
          notes: ""
        },
        {
          _id: "8",
          userId: "AB11",
          name: "Project Management Laboratory",
          location: "room N533",
          date: "October-21",
          time: "3:00PM",
          staff: "Tiffany Young",
          notes: ""
        },
        {
          _id: "9",
          userId: "AB11",
          name: "Project Management Lecture",
          location: "room N117",
          date: "October-21",
          time: "2:00PM",
          staff: "Tiffany Young",
          notes: ""
        },
        {
          _id: "10",
          userId: "AB11",
          name: "Project Management Laboratory",
          location: "room N533",
          date: "October-21",
          time: "3:00PM",
          staff: "Tiffany Young",
          notes: ""
        }
      ],
      editedIndex: -1,
      editedItem: {
        name: "",
        location: "",
        time: "",
        staff: "",
        notes: ""
      },
      defaultItem: {
        name: "",
        location: "",
        time: "",
        staff: "",
        notes: ""
      }
    };
  },
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Event" : "Edit Event";
    }
  },
  watch: {
    dialog(val) {
      val || this.close();
    }
  },
  methods: {
    goToMonth: function(increment) {
      let newMonth = (this.currentMonth += increment);
      // Sanity checks now...
      if (newMonth > 12) {
        newMonth = 1;
        this.currentYear += 1;
      } else if (newMonth < 1) {
        newMonth = 12;
        this.currentYear -= 1;
      }

      this.currentMonth = newMonth;
    },
    goToCurrentMonth: function() {
      let dt = new Date(Date.now());
      this.currentMonth = dt.getUTCMonth() + 1;
      this.currentYear = dt.getUTCFullYear();
    },
    editItem(item) {
      this.editedIndex = this.items.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
      console.log(this.dialog);
    },
    deleteItem(item) {
      const index = this.items.indexOf(item);
      confirm("Are you sure you want to delete this item?") &&
        this.items.splice(index, 1);
    },
    close() {
      this.dialog = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
    },
    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.items[this.editedIndex], this.editedItem);
      } else {
        this.items.push(this.editedItem);
      }
      this.close();
    }
  }
};
</script>

<style scoped>
.rgu-add-btn {
  top: 80%;
  left: 95%;
}
</style>
<template>
  <v-card style="width: 100%;">
    <v-card-title>
      <span
        class="pr-3"
        style="min-width: 10%;
               font-family: 'Times New Roman', serif;
               font-size: 32px; margin-top: -10px;"
      >Events for:</span>
      <v-select :items="days" placeholder="Day" dense item-text="name" style="max-width: 15%;"></v-select>
      <v-select :items="months" placeholder="Month" dense item-text="name" style="max-width: 15%;"></v-select>
      <v-select :items="years" placeholder="Year" dense item-text="name" style="max-width: 15%;"></v-select>
      <v-btn class="primary" style="margin-top: -15px; margin-left: 10px; margin-right: 10px;">APPLY</v-btn>
      <v-btn class="primary" style="margin-top: -15px;">RESET</v-btn>
      <v-spacer></v-spacer>
      <v-text-field append-icon="search" label="Search" dense single-line v-model="search"></v-text-field>
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
            <v-btn color="primary" dark fixed right class="rgu-add-btn" v-on="on">
              <v-icon>add_event</v-icon>
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col class="align-center justify-space-between" cols="6">
                    <v-text-field
                      v-model="editedItem.name"
                      prepend-icon="date_range"
                      placeholder="Name"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="6">
                    <v-text-field
                      v-model="editedItem.location"
                      prepend-icon="place"
                      placeholder="Location"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="6">
                    <v-menu
                      ref="date_menu"
                      v-model="date_menu"
                      :close-on-content-click="false"
                      :return-value.sync="editedItem.date"
                      transition="scale-transition"
                      offset-y
                      min-width="290px"
                    >
                      <template v-slot:activator="{ on }">
                        <v-text-field
                          v-model="editedItem.date"
                          label="Start Date"
                          prepend-icon="event"
                          readonly
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker v-model="editedItem.date" no-title scrollable>
                        <v-spacer></v-spacer>
                        <v-btn text color="primary" @click="date_menu = false">Cancel</v-btn>
                        <v-btn
                          text
                          color="primary"
                          @click="$refs.date_menu.save(editedItem.date)"
                        >OK</v-btn>
                      </v-date-picker>
                    </v-menu>
                  </v-col>
                  <v-col cols="6">
                    <v-menu
                      ref="time_menu"
                      v-model="time_menu"
                      :close-on-content-click="false"
                      :nudge-right="40"
                      :return-value.sync="editedItem.time"
                      transition="scale-transition"
                      offset-y
                      max-width="290px"
                      min-width="290px"
                    >
                      <template v-slot:activator="{ on }">
                        <v-text-field
                          v-model="editedItem.time"
                          label="Start Time"
                          prepend-icon="access_time"
                          readonly
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-time-picker v-if="time_menu" v-model="editedItem.time" full-width>
                        <v-spacer></v-spacer>
                        <v-btn text color="primary" @click="time_menu = false">Cancel</v-btn>
                        <v-btn
                          text
                          color="primary"
                          @click="$refs.time_menu.save(editedItem.time)"
                        >OK</v-btn>
                      </v-time-picker>
                    </v-menu>
                  </v-col>
                  <v-col cols="6">
                    <v-menu
                      ref="end_date_menu"
                      v-model="end_date_menu"
                      :close-on-content-click="false"
                      :return-value.sync="editedItem.end_date"
                      transition="scale-transition"
                      offset-y
                      min-width="290px"
                    >
                      <template v-slot:activator="{ on }">
                        <v-text-field
                          v-model="editedItem.end_date"
                          label="End Date"
                          prepend-icon="event"
                          readonly
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker v-model="editedItem.end_date" no-title scrollable>
                        <v-spacer></v-spacer>
                        <v-btn text color="primary" @click="end_date_menu = false">Cancel</v-btn>
                        <v-btn
                          text
                          color="primary"
                          @click="$refs.end_date_menu.save(editedItem.end_date)"
                        >OK</v-btn>
                      </v-date-picker>
                    </v-menu>
                  </v-col>
                  <v-col cols="6">
                    <v-menu
                      ref="end_time_menu"
                      v-model="end_time_menu"
                      :close-on-content-click="false"
                      :nudge-right="40"
                      :return-value.sync="editedItem.end_time"
                      transition="scale-transition"
                      offset-y
                      max-width="290px"
                      min-width="290px"
                    >
                      <template v-slot:activator="{ on }">
                        <v-text-field
                          v-model="editedItem.end_time"
                          label="End Time"
                          prepend-icon="access_time"
                          readonly
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-time-picker v-if="end_time_menu" v-model="editedItem.end_time" full-width>
                        <v-spacer></v-spacer>
                        <v-btn text color="primary" @click="end_time_menu = false">Cancel</v-btn>
                        <v-btn
                          text
                          color="primary"
                          @click="$refs.end_time_menu.save(editedItem.end_time)"
                        >OK</v-btn>
                      </v-time-picker>
                    </v-menu>
                  </v-col>
                  <v-col cols="6">
                    <v-text-field
                      v-model="editedItem.staff"
                      prepend-icon="people"
                      placeholder="Staff"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="6">
                    <v-text-field
                      v-model="editedItem.tasks"
                      prepend-icon="work"
                      placeholder="Tasks"
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
import { mapGetters } from "vuex";

export default {
  name: "EventsTable",
  data() {
    return {
      dialog: false,
      date_menu: false,
      time_menu: false,
      end_date_menu: false,
      end_time_menu: false,
      days: [],
      months: [
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
      years: this.createYearModel(),
      tasks: "",
      currentMonth: 10,
      currentYear: 2019,
      search: "",
      snack: false,
      snackColor: "",
      snackText: "",
      pagination: {},
      headers: [
        { text: "Name", align: "center", sortable: false, value: "name" },
        {
          text: "Location",
          align: "center",
          sortable: false,
          value: "location"
        },
        { text: "Start Date", align: "center", sortable: false, value: "start" },
        { text: "Start Time", align: "center", sortable: false, value: "start_time" },
        {
          text: "End Date",
          align: "center",
          sortable: false,
          value: "end"
        },
        {
          text: "End Time",
          align: "center",
          sortable: false,
          value: "end_time"
        },
        { text: "Staff", align: "center", sortable: false, value: "staff" },
        { text: "Tasks", align: "center", sortable: false, value: "tasks" },
        { text: "Actions", sortable: false, value: "action" }
      ],
      editedIndex: -1,
      editedItem: {
        name: "",
        location: "",
        date: "",
        time: "",
        end_date: "",
        end_time: "",
        staff: "",
        notes: ""
      },
      defaultItem: {
        name: "",
        location: "",
        date: "",
        time: "",
        end_date: "",
        end_time: "",
        staff: "",
        notes: ""
      }
    };
  },
  mounted() {
    this.days = this.createDaysModel();
  },
  computed: {
    ...mapGetters({ items: "getEvents" }),
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
    createDaysModel() {
      let model = [];
      for (let i = 1; i < 32; i++) {
        let day = {
          name: i,
          value: i
        };
        model.push(day);
      }
      return model;
    },
    createYearModel() {
      let year = 2019;
      let model = [];
      for (let i = 1; i < 50; i++) {
        let year_model = {
          name: year,
          value: year
        };
        year++;
        model.push(year_model);
      }
      return model;
    },
    createTasksModel() {
      let model = [];
      for (let i = 1; i < 10; i++) {
        let task_model = {
          name: "Task " + String(i),
          value: i
        };
        model.push(task_model);
      }
      return model;
    },
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
  left: 92%;
}
</style>
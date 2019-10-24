<template>
  <v-row class="fill-height">
    <v-col>
      <v-sheet height="64">
        <v-toolbar flat color="white">
          <v-btn outlined class="mr-4" @click="setToday">
            Today
          </v-btn>
          <v-btn fab text small @click="prev">
            <v-icon small>mdi-chevron-left</v-icon>
          </v-btn>
          <v-btn fab text small @click="next" class="mr-4">
            <v-icon small>mdi-chevron-right</v-icon>
          </v-btn>
          <v-toolbar-title>{{ title }}</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-menu bottom right>
            <template v-slot:activator="{ on }">
              <v-btn
                outlined
                v-on="on"
              >
                <span>{{ typeToLabel[type] }}</span>
                <v-icon right>mdi-menu-down</v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item @click="type = 'day'">
                <v-list-item-title>Day</v-list-item-title>
              </v-list-item>
              <v-list-item @click="type = 'week'">
                <v-list-item-title>Week</v-list-item-title>
              </v-list-item>
              <v-list-item @click="type = 'month'">
                <v-list-item-title>Month</v-list-item-title>
              </v-list-item>
              <v-list-item @click="type = '4day'">
                <v-list-item-title>4 days</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-toolbar>
      </v-sheet>
      <v-sheet height="500">
        <v-calendar
          ref="calendar"
          v-model="focus"
          color="primary"
          :events="events"
          :event-color="getEventColor"
          :event-margin-bottom="3"
          :now="today"
          :type="type"
          @click:event="showEvent"
          @click:more="viewDay"
          @click:date="viewDay"
          @change="updateRange"
        ></v-calendar>
        <v-menu
          v-model="selectedOpen"
          :close-on-content-click="false"
          :activator="selectedElement"
          offset-x
        >
          <v-card
            color="grey lighten-4"
            min-width="350px"
            flat
          >
            <v-toolbar
              :color="selectedEvent.color"
              dark
            >
              <v-toolbar-title v-html="selectedEvent.name"></v-toolbar-title>
              <v-spacer></v-spacer>
            </v-toolbar>
            <v-card-text>
              <v-row>
                <v-col cols="4">
                  Location:
                </v-col>
                <v-col cols="8">
                  {{selectedEvent.location}}
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="4">
                  Start Date:
                </v-col>
                <v-col cols="8">
                  {{selectedEvent.start}} {{selectedEvent.start_time}}
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="4">
                  End Date:
                </v-col>
                <v-col cols="8">
                  {{selectedEvent.end}} {{selectedEvent.end_time}}
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="4">
                  Staff:
                </v-col>
                <v-col cols="8">
                  {{selectedEvent.staff}}
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="4">
                  Tasks:
                </v-col>
                <v-col cols="8">
                  {{selectedEvent.tasks}}
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="4">
                  Notes:
                </v-col>
                <v-col cols="8">
                  {{selectedEvent.notes}}
                </v-col>
              </v-row>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                text
                color="primary"
                @click="selectedOpen = false"
              >
                Cancel
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-menu>
      </v-sheet>
    </v-col>
  </v-row>
</template>

<script>
  import { db } from "../main.js";

  export default {
    name: "Calendar",
    data(){
      return {
        today: new Date().toISOString().substr(0, 10),
        focus: new Date().toISOString().substr(0, 10),
        type: 'month',
        typeToLabel: {
          month: 'Month',
          week: 'Week',
          day: 'Day',
          '4day': '4 Days',
        },
        name: null,
        location: null,
        start: null,
        start_time: null,
        end: null,
        end_time: null,
        staff: null,
        tasks: null,
        notes: null,
        color: "#1a1a1a",
        currentlyEditing: null,
        selectedEvent: {},
        selectedElement: null,
        selectedOpen: false,
        events: [],
      }
    },
    computed: {
      title () {
        const { start, end } = this;
        if (!start || !end) {
          return ''
        }
        const startMonth = this.monthFormatter(start);
        const endMonth = this.monthFormatter(end);
        const suffixMonth = startMonth === endMonth ? '' : endMonth;
        const startYear = start.year;
        const endYear = end.year;
        const suffixYear = startYear === endYear ? '' : endYear;
        const startDay = start.day + this.nth(start.day);
        const endDay = end.day + this.nth(end.day);
        switch (this.type) {
          case 'month':
            return `${startMonth} ${startYear}`;
          case 'week':
          case '4day':
            return `${startMonth} ${startDay} ${startYear} - ${suffixMonth} ${endDay} ${suffixYear}`;
          case 'day':
            return `${startMonth} ${startDay} ${startYear}`;
        }
        return '';
      },
      monthFormatter () {
        return this.$refs.calendar.getFormatter({
          timeZone: 'UTC', month: 'long',
        });
      },
    },
    mounted () {
      this.getEvents();
    },
    methods: {
      async getEvents(){
        let snapshot = await db.collection("events").get();
        let events = [];
        snapshot.forEach(doc => {
          let appData = doc.data();
          appData.id = doc.id;
          events.push(appData);
          console.log(appData)
        });
        this.events = events;
      },
      viewDay ({ date }) {
        this.focus = date
        this.type = 'day'
      },
      getEventColor (event) {
        return event.color
      },
      setToday () {
        this.focus = this.today
      },
      prev () {
        this.$refs.calendar.prev()
      },
      next () {
        this.$refs.calendar.next()
      },
      showEvent ({ nativeEvent, event }) {
        const open = () => {
          this.selectedEvent = event
          this.selectedElement = nativeEvent.target
          setTimeout(() => this.selectedOpen = true, 10)
        }
        if (this.selectedOpen) {
          this.selectedOpen = false
          setTimeout(open, 10)
        } else {
          open()
        }
        nativeEvent.stopPropagation()
      },
      updateRange ({ start, end }) {
        this.start = start;
        this.end = end;
      },
      nth (d) {
        return d > 3 && d < 21
            ? 'th'
            : ['th', 'st', 'nd', 'rd', 'th', 'th', 'th', 'th', 'th', 'th'][d % 10]
      },
    }
  }
</script>

<style scoped>

</style>
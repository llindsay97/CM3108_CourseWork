<template>
  <v-card style="width: 100%;">
    <v-card-title>
      <span class="pr-3"
            style="min-width: 26%;
                   font-family: 'Times New Roman', serif;
                   font-size: 32px;
                   margin-top: -10px;"
      >
        Staff
      </span>
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
            <v-btn
              color="primary"
              dark
              fixed
              right
              class="rgu-add-btn"
              v-on="on">
              <v-icon>add_person</v-icon>
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
                      v-model="editedItem.first_name"
                      prepend-icon="person"
                      placeholder="First Name"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="6">
                    <v-text-field
                      v-model="editedItem.last_name"
                      prepend-icon="person"
                      placeholder="Last Name"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      v-model="editedItem.email"
                      prepend-icon="email"
                      placeholder="Email"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      v-model="editedItem.job"
                      prepend-icon="work"
                      placeholder="Job Title"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-select
                      v-model="editedItem.permission_level"
                      :items="permission_levels"
                      prepend-icon="security"
                      placeholder="Permission Level"
                    ></v-select>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
              <v-btn color="blue darken-1" text @click="save(item)">Save</v-btn>
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
  import { db } from "../main.js"

export default {
  name: "EventsTable",
  data() {
    return {
      dialog: false,
      search: "",
      snack: false,
      snackColor: "",
      snackText: "",
      pagination: {},
      headers: [
        {
          text: "First Name",
          align: "center",
          sortable: false,
          value: "first_name"
        },
        {
          text: "Last Name",
          align: "center",
          sortable: false,
          value: "last_name"
        },
        { text: "Email", align: "center", sortable: false, value: "email" },
        { text: "Job Title", align: "center", sortable: false, value: "job" },
        {
          text: "Permission Level",
          sortable: false,
          value: "permission_level"
        },
        { text: "Actions", sortable: false, value: "action" }
      ],
      items: [],
      permission_levels: ["System Operator", "Administrator"],
      editedIndex: -1,
      editedItem: {
        first_name: "",
        last_name: "",
        email: "",
        job: "",
        permission_level: ""
      },
      defaultItem: {
        first_name: "",
        last_name: "",
        email: "",
        job: "",
        permission_level: ""
      }
    };
  },
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Staff" : "Edit Staff";
    }
  },
  watch: {
    dialog(val) {
      val || this.close();
    }
  },
  mounted(){
    this.getStaff();
  },
  methods: {
    async getStaff(){
      let snapshot = await db.collection("staff").where("is_deleted", "==", false).get();
      let staff = [];
      snapshot.forEach(doc => {
        let appData = doc.data();
        appData.id = doc.id;
        if(appData.permission_level === 1){
          appData.permission_level = "Administrator";
        }
        if(appData.permission_level === 2){
          appData.permission_level = "System Operator";
        }
        staff.push(appData);
        console.log(appData)
      });
      this.items = staff;
    },
    async addStaff(){
      if(this.editedItem.permission_level === "System Operator"){
        this.editedItem.permission_level = 2;
      }
      if(this.editedItem.permission_level === "Administrator"){
        this.editedItem.permission_level = 1;
      }
      await db.collection("staff").add({
        first_name: this.editedItem.first_name,
        last_name: this.editedItem.last_name,
        email: this.editedItem.email,
        job: this.editedItem.job,
        permission_level: this.editedItem.permission_level,
        is_deleted: false
      });
      this.getStaff();
    },
    async updateStaff(item){
      await db.collection("staff").doc(this.editedItem.id).update({
        first_name: this.editedItem.first_name,
        last_name: this.editedItem.last_name,
        email: this.editedItem.email,
        job: this.editedItem.job,
        permission_level: this.editedItem.permission_level,
      });
      this.getStaff();
      this.close();

    },
    async deleteStaff(item){
      await db.collection("staff").doc(this.editedItem.id).update({
        is_deleted: true,
      });
      this.getStaff();
    },
    editItem(item) {
      this.editedIndex = this.items.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
      console.log(this.dialog);
    },
    deleteItem(item) {
      this.editedIndex = this.items.indexOf(item);
      this.editedItem = Object.assign({}, item);
      let response = confirm("Are you sure you want to delete this item?");
      if(response){
        this.deleteStaff(item);
      }
      this.editedItem.first_name = "";
      this.editedItem.last_name = "";
      this.editedItem.email_name = "";
      this.editedItem.job = "";
      this.editedItem.permission_level = "";
    },
    close() {
      this.dialog = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
    },
    save(item) {
      if(this.editedIndex > -1){
        this.updateStaff(item);
      } else {
        this.addStaff();
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
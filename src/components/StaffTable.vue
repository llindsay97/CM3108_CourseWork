<template>
    <v-card style="width: 100%;">
        <v-card-title>
            <span class="pr-3" style="min-width: 26%;">
                Staff
            </span>
            <v-spacer></v-spacer>
            <v-text-field
                    append-icon="search"
                    label="Search"
                    single-line
                    hide-details
                    v-model="search"
            ></v-text-field>
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
                                color="pink"
                                dark
                                fab
                                fixed
                                right
                                class="rgu-add-btn"
                                v-on="on"
                        >
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
                                    <v-col
                                            class="align-center justify-space-between"
                                            cols="6"
                                    >
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
                                        <v-text-field
                                                v-model="editedItem.permission_level"
                                                prepend-icon="security"
                                                placeholder="Permission Level"
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
                <v-icon
                        small
                        class="mr-2"
                        @click="editItem(item)"
                >
                    edit
                </v-icon>
                <v-icon
                        small
                        @click="deleteItem(item)"
                >
                    delete
                </v-icon>
            </template>

            <template slot="pageText" slot-scope="{ pageStart, pageStop}">
                from {{pageStart}} to {{pageStop}}
            </template>
        </v-data-table>
    </v-card>
</template>

<script>
    export default {
        name: "EventsTable",
        data(){
            return {
                dialog: false,
                search: "",
                snack: false,
                snackColor: '',
                snackText: '',
                pagination: {},
                headers: [
                    { text: "First Name", align: "center", sortable: false, value: "first_name" },
                    { text: "Last Name", align: "center", sortable: false, value: "last_name" },
                    { text: "Email", align: "center", sortable: false, value: "email" },
                    { text: "Job Title", align: "center", sortable: false, value: "job" },
                    { text: 'Permission Level', sortable: false, value: 'permission_level' },
                    { text: 'Actions', sortable: false, value: 'action' }
                ],
                items: [
                    {
                        "_id": "1",
                        "first_name": "Tiffany",
                        "last_name": "Young",
                        "email": "t.young@rgu.ac.uk",
                        "job": "Lecturer",
                        "permission_level": "System Operator"
                    },
                    {
                        "_id": "2",
                        "first_name": "Mark",
                        "last_name": "Zarb",
                        "email": "m.zarb@rgu.ac.uk",
                        "job": "Lecturer",
                        "permission_level": "System Operator"
                    },
                    {
                        "_id": "3",
                        "first_name": "Tiffany",
                        "last_name": "Young",
                        "email": "t.young@rgu.ac.uk",
                        "job": "Lecturer",
                        "permission_level": "System Operator"
                    },
                    {
                        "_id": "4",
                        "first_name": "Mark",
                        "last_name": "Zarb",
                        "email": "m.zarb@rgu.ac.uk",
                        "job": "Lecturer",
                        "permission_level": "System Operator"
                    },
                    {
                        "_id": "5",
                        "first_name": "Tiffany",
                        "last_name": "Young",
                        "email": "t.young@rgu.ac.uk",
                        "job": "Lecturer",
                        "permission_level": "System Operator"
                    },
                    {
                        "_id": "6",
                        "first_name": "Mark",
                        "last_name": "Zarb",
                        "email": "m.zarb@rgu.ac.uk",
                        "job": "Lecturer",
                        "permission_level": "System Operator"
                    },
                    {
                        "_id": "7",
                        "first_name": "Tiffany",
                        "last_name": "Young",
                        "email": "t.young@rgu.ac.uk",
                        "job": "Lecturer",
                        "permission_level": "System Operator"
                    },
                    {
                        "_id": "8",
                        "first_name": "Mark",
                        "last_name": "Zarb",
                        "email": "m.zarb@rgu.ac.uk",
                        "job": "Lecturer",
                        "permission_level": "System Operator"
                    },
                    {
                        "_id": "9",
                        "first_name": "Tiffany",
                        "last_name": "Young",
                        "email": "t.young@rgu.ac.uk",
                        "job": "Lecturer",
                        "permission_level": "System Operator"
                    },
                    {
                        "_id": "10",
                        "first_name": "Mark",
                        "last_name": "Zarb",
                        "email": "m.zarb@rgu.ac.uk",
                        "job": "Lecturer",
                        "permission_level": "System Operator"
                    },
                ],
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
                },
            }
        },
        computed: {
            formTitle () {
                return this.editedIndex === -1 ? 'New Staff' : 'Edit Staff'
            },
        },
        watch: {
            dialog (val) {
                val || this.close()
            },
        },
        methods: {
            editItem (item) {
                this.editedIndex = this.items.indexOf(item)
                this.editedItem = Object.assign({}, item)
                this.dialog = true
                console.log(this.dialog);
            },
            deleteItem (item) {
                const index = this.items.indexOf(item)
                confirm('Are you sure you want to delete this item?') && this.items.splice(index, 1)
            },
            close () {
                this.dialog = false
                setTimeout(() => {
                    this.editedItem = Object.assign({}, this.defaultItem)
                    this.editedIndex = -1
                }, 300)
            },
            save () {
                if (this.editedIndex > -1) {
                    Object.assign(this.items[this.editedIndex], this.editedItem)
                } else {
                    this.items.push(this.editedItem)
                }
                this.close()
            },
        }
    }
</script>

<style scoped>
    .rgu-add-btn{
        top: 80%;
        left: 95%;
    }

</style>
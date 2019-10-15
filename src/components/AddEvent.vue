<template>
    <div>
        <v-btn
                color="pink"
                dark
                fab
                fixed
                right
                @click="dialog = !dialog"
        >
            <v-icon>mdi-plus</v-icon>
        </v-btn>
        <v-dialog
                v-model="dialog"
                width="800px"
        >
            <v-card>
                <v-card-title class="purple darken-1">
                    Add Event
                </v-card-title>
                <v-container>
                    <v-row>
                        <v-col
                                class="align-center justify-space-between"
                                cols="12"
                        >
                            <v-text-field
                                    prepend-icon="event"
                                    placeholder="Name"
                            ></v-text-field>
                        </v-col>
                        <v-col cols="12">
                            <v-text-field
                                    prepend-icon="place"
                                    placeholder="Location"
                            ></v-text-field>
                        </v-col>
                        <v-col cols="12">
                            <v-text-field
                                    prepend-icon="watch"
                                    placeholder="Time"
                            ></v-text-field>
                        </v-col>
                        <v-col cols="12">
                            <v-text-field
                                    prepend-icon="people"
                                    placeholder="Staff"
                            ></v-text-field>
                        </v-col>
                        <v-col cols="12">
                            <v-text-field
                                    prepend-icon="notes"
                                    placeholder="Notes"
                            ></v-text-field>
                        </v-col>
                    </v-row>
                </v-container>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                            text
                            color="primary"
                            @click="dialog = false"
                    >Cancel</v-btn>
                    <v-btn
                            text
                            @click="dialog = false"
                    >Add</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
    export default {
        name: "AddEvent",
        data(){
            return {
                dialog: false,
            }
        },
    }
</script>

<style scoped>

</style>
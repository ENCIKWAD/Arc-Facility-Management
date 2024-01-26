<template>
    <div>
        <!-- Dialog -->
        <v-dialog v-model="dialog" max-width="500px">
            <v-card>
                <v-card-title class="headline">Delete Facility</v-card-title>
                <v-card-text>
                    Are you sure you want to delete this facility?
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" :to="{name: 'manageFacility'}" text @click="dialog = false">Cancel</v-btn>
                    <v-btn color="error" text @click="deleteFacility">Delete</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
import OwnerAPI from '../API/ownerAPI';
export default {
    data() {
        return {
            dialog: true
        };
    },
    methods: {
        deleteFacility() {
            OwnerAPI.deleteFacility(this.$route.params.id)
                .then(() => {
                    this.$router.push({ name: 'manageFacility', query: { message: 'Facility deleted successfully' } });
                })
                .catch(err => {
                    console.log(err);
                });
        }
    }
};
</script>

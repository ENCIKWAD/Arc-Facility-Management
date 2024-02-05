<template>
    <div>
        <!-- Dialog -->
        <v-dialog v-model="dialog" max-width="500px">
            <v-card>
                <v-card-title class="headline">Delete Announcement</v-card-title>
                <v-card-text>
                    Are you sure you want to delete this announcement?
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" :to="{name: 'manageAnnouncement'}" text @click="dialog = false">Cancel</v-btn>
                    <v-btn color="error" text @click="deleteAnnouncement">Delete</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
import AdminAPI from '../API/adminAPI';
export default {
    data() {
        return {
            dialog: true
        };
    },
    methods: {
        deleteAnnouncement() {
            AdminAPI.deleteAnnouncement(this.$route.params.id)
                .then(() => {
                    this.$router.push({ name: 'manageAnnouncement', query: { message: 'Announcement deleted successfully' } });
                })
                .catch(err => {
                    console.log(err);
                });
        }
    }
};
</script>
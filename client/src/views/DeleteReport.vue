<template>
    <div>
        <!-- Dialog -->
        <v-dialog v-model="dialog" max-width="500px">
            <v-card>
                <v-card-title class="headline">Delete Report</v-card-title>
                <v-card-text>
                    Are you sure you want to delete this report?
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" :to="{name: 'inbox'}" text @click="dialog = false">Cancel</v-btn>
                    <v-btn color="error" text @click="deleteReport">Delete</v-btn>
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
        async deleteReport() {
            AdminAPI.deleteReport(this.$route.params.id)
                .then(() => {
                    this.$router.push({ name: 'inbox', query: { message: 'Report deleted successfully' } });
                })

        }
    }
};
</script>

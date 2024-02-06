<template>
    <v-card height="450" rounded="l" class="mb-6">
        <v-card-title>{{ announcement.title }}</v-card-title>
        <p  class="ml-4 mb-3 bold-text">publish at: {{ formatDate(announcement.publishDate) }}</p>
        <v-divider></v-divider>
        <v-card-text class="ml-4">{{ announcement.message }}</v-card-text>
    </v-card>
</template>

<script>
export default{
    name: "AnnouncementBox",
    props: {
        announcement: Object
    },
    methods: {
        formatDate(dateString) {
            const options = { year: 'numeric', month: 'long', day: 'numeric' };
            return new Date(dateString).toLocaleDateString(undefined, options);
        }
    }
}

</script>

<style scoped>
.bold-text {
    font-weight: bold;
}
</style>
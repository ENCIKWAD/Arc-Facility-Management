<template>
    <v-list-item link @click="emitData">
        <div class="avatar-inbox">

            <v-avatar>
                <v-img cover :src="user.image"></v-img>
            </v-avatar>
            <div>
                <p>{{ user.email }}</p>
                <p style="color: #d4d40f" v-if="inbox.type !== 'Emergency'">{{ inbox.type }}</p>
                <p style="color: #d10a35;" v-if="inbox.type === 'Emergency'">{{ inbox.type }}</p>
                <p style="color: #f89900" v-if="inbox.status === 'Pending'">Lease Request</p>
                <p style="color: #d10a35" v-if="inbox.status === 'Rejected'">Lease Rejected</p>
                <p style="color: green" v-if="inbox.status === 'Accepted'">Lease Accepted</p>
            </div>
        </div>
    </v-list-item>
</template>

<script>
export default {
    name: "inbox-list",
    props: {
        user: Object,
        inbox: Object    },
    methods: {
        emitData() {
            this.$emit("data", { user: this.user, inbox: this.inbox });
        }
    }
}
</script>

<style>
.avatar-inbox {
    display: flex;
    flex-direction: row;
    gap: 10px;
}
</style>
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
                <p style="color: #d4d40f" v-if="inbox.status === 'pending'">Lease Request</p>
                <p style="color: #d10a35" v-if="inbox.status === 'rejected'">Lease Rejected</p>
                <p style="color: green" v-if="inbox.status === 'accepted'">Lease Accepted</p>
            </div>
        </div>
    </v-list-item>
</template>

<script>
export default {
    name: "inbox-list",
    props: {
        user: Object,
        inbox: Object
    },
    methods: {
        emitData() {
            console.log(this.inbox)
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
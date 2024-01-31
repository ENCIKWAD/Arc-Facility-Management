<template>
    <v-list-item link @click="emitData">
        <div class="avatar-inbox">

            <v-avatar>
                <v-img :src="user.image"></v-img>
            </v-avatar>
            <div>
                <p>{{ user.email }}</p>
                <p>{{ inbox.type }}</p>
            </div>
        </div>
    </v-list-item>
</template>

<script>
export default{
    name: "inbox-list",
    props: {
        user: Object,
        inbox: Object
    },
    methods:{
        emitData(){
            this.$emit("data", { user: this.user, inbox: this.inbox });
        }
    }
}
</script>

<style>

.avatar-inbox{
    display: flex;
    flex-direction: row;
    gap: 10px;
}

</style>
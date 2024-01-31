<template>
    <div class="background-1 pa-4">
        <navBar
      :userName="user.fName"
      :userImage="user.image"
      :userRole="user.role"
    ></navBar>
        <v-container class="d-flex justify-center align-center inbox-container">
            <div class="inbox-title">
                <v-icon class="mr-3" size="35">mdi-email</v-icon>
                <h3 style="font-size: 35px;">Inbox</h3>

            </div>
            <div class="main-container d-flex">

                <div class="left-container">
                    <v-card style="width: 400px; height: 500px; overflow-y: auto; background-color: #F2EEEE;">
                    <div v-for="(user, index) in userInbox" :key="user._id">
                        <InboxList @data="emitData" class="inbox-item" :user="user" :inbox="inboxes[index]"></InboxList>
                        <v-divider></v-divider>
                    </div>

                </v-card>
                </div>
                <div v-if="selectedUser" class="right-container">
                    <div class="avatar-container avatar-flex">
                        <v-avatar class="mr-4" size="60" color="surface-variant"></v-avatar>
                        <div><p style="font-size: 25px; text-align: end;">{{ this.selectedUser.fName + " " + this.selectedUser.lName }}</p>
                        <p style="font-size: 17px; text-align: center;">{{ this.selectedUser.email }}</p></div>
                    </div>
                </div>
            </div>
        </v-container>
    </div>
</template>

<script>
import AdminAPI from "@/API/adminAPI";
import navBar from "../components/navBar.vue";
import InboxList from "@/components/InboxList.vue";
export default{
    name: "inbox",
    data(){
        return{
            user: null,
            inboxes: [],
            userInbox: [],
            selectedInbox: null,
            selectedUser: null
        }
    },
    components: {
        navBar,
        InboxList
    },
    async created(){
        this.user = JSON.parse(sessionStorage.getItem("user"));
        this.inboxes = await AdminAPI.getReports();
        this.inboxes.sort((a, b) => new Date(b.date) - new Date(a.date));
        for(let i = 0; i < this.inboxes.length; i++){
            let user = await AdminAPI.getUserById(this.inboxes[i].userId);
            this.userInbox.push(user);
        }
    },
    methods:{
        emitData(data){
            this.selectedUser = data.user;
            this.selectedInbox = data.inbox;
        }
    
    },
    computed: {
    }

}
</script>

<style>

.inbox-container{
    background-color: white;
    flex-direction: column;
    border-radius: 19px;
}

.inbox-title{
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-bottom: 10px;
    
}

.left-container{
    flex: 1 0 30%;
    border: black solid 1px;
}

.right-container{
    flex: 2 0 60%;
    border: black solid 1px;
    margin-left: 20px;
}

.main-container{
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: flex-start;
    width: 100%;
}

.inbox-item{
    width: 100%;
    background-color: #A5A5A5;
    height: 70px;
}

.avatar-flex{
    display: flex;
    flex-direction: row;
    padding: 12px;
    gap: 5px;
    align-content: center;
    background-color: #B5B5B5;
}



</style>
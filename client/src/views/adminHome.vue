<template>
  <div class="background-2">
    <navBar :userName="user.fName" :userImage="user.image" :userRole="user.role" :userLName="user.lName" :userId="user._id"></navBar>
    <v-card class="mx-auto" max-width="1000" rounded>
      <v-card-title>
        <div class="overline mb-4"></div>
      </v-card-title>
      <v-card-title class="title">
        Dashboard
      </v-card-title>
      <v-card-actions>
        <v-layout row wrap>
          <v-flex xs4>
            <div class="button-container">
              <v-btn
                :to="{ name: 'manageAnnouncement' }"
                block
                class="text-center"
                variant="elevated"
                rounded="xl"
                color="#5F3DAC"
              >
                <v-stack>
                  <v-icon color="black" size="70">mdi-bullhorn</v-icon>
                  <div>Manage Announcement</div>
                </v-stack>
              </v-btn>
            </div>
          </v-flex>
          <v-flex xs4>
            <div class="button-container">
              <v-btn
                :to="{ name: 'viewRequest' }"
                block
                class="text-center"
                variant="elevated"
                rounded="xl" 
                color="#5F3DAC"
              >
                <v-stack>
                  <v-icon color="black" size="70">mdi-eye</v-icon>
                  <div>View Lease Request</div>
                </v-stack>
              </v-btn>
            </div>
          </v-flex>
          <v-flex xs4>
            <div class="button-container">
              <v-btn
                :to="{ name: 'manageTenant' }"
                block
                class="text-center"
                variant="elevated"
                rounded="xl" 
                color="#5F3DAC"
              >
                <v-stack>
                  <v-icon color="black" size="70">mdi-account-group</v-icon>
                  <div>Manage Tenant</div>
                </v-stack>
              </v-btn>
            </div>
          </v-flex>
        </v-layout>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import UserAPI from "@/API/userAPI";
import navBar from "../components/navBar.vue";
export default{
  name: 'adminHome',
  data(){
    return{
      user: null,
      authorized: false,
    }
  },
  components: {
    navBar
  },
  computed: {
    user() {
      return JSON.parse(sessionStorage.getItem('user'));
    }
  
  },
  async created(){
    const userAuth = await UserAPI.checkAuth();
    if(userAuth.status === 200 && !this.authorized && userAuth.data.user.role === 'admin'){
      this.authorized = true;
      this.user = userAuth.data.user;
      sessionStorage.setItem('user', JSON.stringify(this.user));
      console.log(this.user);
    }
    else{
      this.$router.push({name: 'unauthorized'});
    }
  }
}

</script>

<style>
.background-2 {
  background-color: #f1ebe8;
  min-height: 100vh;
  padding: 2rem;
}

.title {
  font-size: 2em;
  text-align: center;
  width: 100%;
}

.button-container {
  margin: 60px;
  height: 200px;
  width: 200px;
}

.button-container > .v-btn {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>
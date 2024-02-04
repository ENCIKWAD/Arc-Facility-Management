<template>
    <div class="background-1">
        <navBar :userName="user.fName" :userImage="user.image" :userRole="user.role" :userLName="user.lName"></navBar>
        <h1 class="title">Facilities</h1>

        <v-container>
            <v-row no-gutters>
                <v-col sm="4" class="pa-3" v-for="facility in facilities" :key="facility._id">
                    <Facility :facility="facility"></Facility>
                </v-col>
            </v-row>
        </v-container>
        <v-alert
    @click:close="closeAlert"
      class="alert"
      border="left"
      closable
      close-text="Close Alert"
      color="green accent-4"
      dark
      dismissible
      v-if="this.$route.query.message"
    >
      {{ this.$route.query.message }}
    </v-alert>
    </div>
</template>

<script>
import navBar from '../components/navBar.vue';
import TenantAPI from '../API/tenantAPI.js';
import Facility from '../components/FacilityBox.vue';
export default{
    name: 'tenantHome',
    data(){
        return{
            user: null,
            facilities: []
        }
    },
    components: {
        navBar,
        Facility
    },
    
    async created(){
        this.user = JSON.parse(sessionStorage.getItem('user'));
        try{
            this.facilities = await TenantAPI.fetchFacilities();
        }
        catch(err){
            console.log(err)
        }
        
    },
    methods:{
        closeAlert(){
      this.$router.push({ query: {} });
    }
    }
}
</script>

<style scoped>
.background-1{
    background-color: #F1EBE8;
    min-height: 100vh;
}

.title{
    padding-top: 30px;
    padding-left: 30px;
    font-size: 35px;
    font-weight: bold;
}

.alert {
    position: fixed;
    top: 100px;
    left: 0;
    right: 0;
    z-index: 1000;
  }


</style>
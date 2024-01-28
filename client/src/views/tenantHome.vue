<template>
    <div class="background-1">
        <navBar :userName="user.fName" :userImage="user.image" :userRole="user.role"></navBar>
        <h1 class="title">Facilities</h1>

        <v-container>
            <v-row no-gutters>
                <v-col sm="4" class="pa-3" v-for="facility in facilities" :key="facility._id">
                    <Facility :facility="facility"></Facility>
                </v-col>
            </v-row>
        </v-container>
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


</style>
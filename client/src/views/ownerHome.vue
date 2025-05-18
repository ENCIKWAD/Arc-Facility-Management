<template>
  <div v-if="isAuthorized && userData" class="background-1">
    <navBar 
      :userName="userData.fName" 
      :userImage="userData.image" 
      :userRole="userData.role" 
      :userLName="userData.lName" 
      :userId="userData._id"
    ></navBar>
    <div :class="{'margin' : $route.query.message}" class="btnFlex">
      <h1 class="title">Facilities</h1>
      <v-btn
        :to="{ name: 'manageFacility' }"
        class="icon-button"
        style="margin-top: 40px"
        rounded="xl"
        height="50"
        color="green"
      >
        <v-icon style="margin-right: 7px" size="30">mdi-cogs</v-icon>
        Manage Facility
      </v-btn>
    </div>
    
    <v-container>
      <div v-if="loading" class="text-center py-5">
        <v-progress-circular indeterminate color="primary"></v-progress-circular>
        <p>Loading facilities...</p>
      </div>
      <p v-else-if="facilities.length === 0" class="title">There are no facilities at the moment.</p>
      <v-row v-else :class="{'margin' : $route.query.message}" no-gutters>
        <v-col
          sm="4"
          class="pa-3"
          v-for="facility in facilities"
          :key="facility._id"
        >
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
      v-if="$route.query.message"
    >
      {{ $route.query.message }}
    </v-alert>
  </div>
  <div v-else-if="!isAuthorized && !authCheckComplete" class="loading-container">
    <v-progress-circular indeterminate color="primary"></v-progress-circular>
    <p>Checking authorization...</p>
  </div>
</template>

<script>
import navBar from "../components/navBar.vue";
import OwnerAPI from "../API/ownerAPI.js";
import UserAPI from "../API/userAPI.js";
import Facility from "../components/FacilityBox.vue";

export default {
  name: "ownerHome",
  data() {
    return {
      userData: null,
      isAuthorized: false,
      authCheckComplete: false,
      facilities: [],
      loading: true
    };
  },
  components: {
    navBar,
    Facility,
  },
  
  async created() {
    try {
      // Check authorization first
      const response = await UserAPI.checkAuth();
      
      if (response.status === 200 && response.data.user && response.data.user.role === 'owner') {
        this.isAuthorized = true;
        this.userData = response.data.user;
        sessionStorage.setItem('user', JSON.stringify(this.userData));
        
        // Now fetch facilities
        try {
          this.facilities = await OwnerAPI.fetchFacilities();
        } catch (err) {
          console.error("Error fetching facilities:", err);
        } finally {
          this.loading = false;
        }
        
        if (this.$route.query.message) {
          this.$nextTick(() => {
            setTimeout(this.closeAlert, 5000);
          });
        }
      } else {
        this.$router.push({ name: 'unauthorized' });
      }
    } catch (error) {
      console.error('Authorization check failed:', error);
      this.$router.push({ name: 'unauthorized' });
    } finally {
      this.authCheckComplete = true;
    }
  },
  
  methods: {
    closeAlert() {
      this.$router.push({ query: {} });
    }
  }
};
</script>

<style scoped>
.background-1 {
  background-color: #f1ebe8;
  min-height: 100vh;
}

.title {
  padding-top: 30px;
  padding-left: 30px;
  font-size: 35px;
  font-weight: bold;
}

.btnFlex {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0 30px;
}

.margin {
  margin-top: 50px;
}

.alert {
  position: fixed;
  top: 100px;
  left: 0;
  right: 0;
  z-index: 1000;
}

.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f1ebe8;
}
</style>
<template>
  <div v-if="isAuthorized && userData" class="background-1">
    <navBar
      :userName="userData.fName"
      :userImage="userData.image"
      :userRole="userData.role"
      :userLName="userData.lName"
      :userId="userData._id"
    ></navBar>
    <h1 class="title">Facilities</h1>

    <v-container>
      <div v-if="loading" class="text-center py-5">
        <v-progress-circular indeterminate color="primary"></v-progress-circular>
        <p>Loading facilities...</p>
      </div>
      <v-row v-else no-gutters>
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
import TenantAPI from "../API/tenantAPI.js";
import UserAPI from "../API/userAPI.js";
import Facility from "../components/FacilityBox.vue";

export default {
  name: "tenantHome",
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
      
      if (response.status === 200 && response.data.user && response.data.user.role === 'tenant') {
        this.isAuthorized = true;
        this.userData = response.data.user;
        sessionStorage.setItem('user', JSON.stringify(this.userData));
        
        // Now fetch facilities
        try {
          this.facilities = await TenantAPI.fetchFacilities();
        } catch (err) {
          console.error("Error fetching facilities:", err);
        } finally {
          this.loading = false;
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
    },
  },
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
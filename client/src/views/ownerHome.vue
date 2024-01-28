<template>
  <div class="background-1">
    <navBar :userName="user.fName" :userImage="user.image" :userRole="user.role"></navBar>
    <div :class="{'margin' : this.$route.query.message}" class="btnFlex">
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
      <v-row :class="{'margin' : this.$route.query.message}" no-gutters>
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
      v-if="this.$route.query.message"
    >
      {{ this.$route.query.message }}
    </v-alert>
  </div>
</template>

<script>
import navBar from "../components/navBar.vue";
import OwnerAPI from "../API/ownerAPI.js";
import Facility from "../components/FacilityBox.vue";
export default {
  name: "ownerHome",
  data() {
    return {
      user: null,
      facilities: [],
    };
  },
  components: {
    navBar,
    Facility,
  },
  async created() {
    this.user = JSON.parse(sessionStorage.getItem("user"));
    try {
      this.facilities = await OwnerAPI.fetchFacilities();
    } catch (err) {
      console.log(err);
    }
    if(this.$route.query.message){
      this.$nextTick(() => {
        this.closeAlert();
      })
    }
  },
  methods: {
    closeAlert(){
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

.margin
{
  margin-top: 50px;
}
.alert {
  position: fixed;
  top: 100px;
  left: 0;
  right: 0;
  z-index: 1000;
}
</style>
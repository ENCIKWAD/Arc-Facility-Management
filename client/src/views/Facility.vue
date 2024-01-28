<template>
  <div class="background-1 pa-8">
    <navBar :userName="user.fName" :userImage="user.image" :userRole="user.role"></navBar>
    <h1 v-if="loading">Loading...</h1>
    <v-card v-else class="pa-8 flex-card">
      <div>
        <v-img
          cover
          class="bordered"
          height="500"
          width="600"
          :src="facility.image"
        ></v-img>
      </div>
      <div class="ml-15 full">
        <div class="flex-text">
          <v-card-title style="font-size: 30px" class="mt-1">{{
            facility.title
          }}</v-card-title>
          <v-card-title class="mt-1">{{ facility.type }}</v-card-title>
        </div>
        <v-card-title class="mt-1">Description</v-card-title>
        <div class="description-width">
          <v-card-text color="#474545">{{ facility.description }}</v-card-text>
        </div>
        <v-card-title>Location</v-card-title>
        <v-card-text color="#474545">{{ facility.location }}</v-card-text>
        <div class="flex-text">
          <v-card-title style="color: green"
            >{{ formatCurrency(facility.price) }}/hr</v-card-title
          >
          <div>
            <v-icon size="45">mdi-account</v-icon>
            <p>Min: {{ facility.minCap }}</p>
          </div>
        </div>
        <v-card-title v-if="!facility.available" style="color: red">{{
          formatAvailability(facility.available)
        }}</v-card-title>
        <v-card-title v-if="facility.available" style="color: green">{{
          formatAvailability(facility.available)
        }}</v-card-title>
        <div class="flex-btn">
          <v-btn
            v-if="user.role != 'owner'"
            :disabled="!facility.available"
            color="#5F3DAC"
            width="350"
            height="50"
            ><v-icon class="mr-2" size="30">mdi-book</v-icon>Lease
            Facility</v-btn
          >
          <v-btn
            @click="$router.go(-1)"
            color="#514D5A"
            width="350"
            height="50"
            ><v-icon class="mr-2" size="30">mdi-arrow-left-circle</v-icon>Go
            Back</v-btn
          >
        </div>
      </div>
    </v-card>
  </div>
</template>

<script>
import navBar from "@/components/navBar.vue";
import OwnerAPI from "../API/ownerAPI";

export default {
  name: "Facility",
  components: {
    navBar,
  },
  mounted() {
    window.scrollTo(0, 0);
  },
  data() {
    return {
      user: {
        fName: "",
        lName: "",
        email: "",
        password: "",
        image: "",
        role: "",
      },
      facility: {
        title: "",
        image: "",
        description: "",
        location: "",
        minCap: null,
        price: null,
        type: "",
        available: false,
      },
      loading: true,
    };
  },
  watch:{
    '$route.params.id': {
      immediate: true,
      handler(newId) {
        this.fetchFacility(newId);
      }
    }
  },
  methods: {
    formatCurrency(value) {
      if(value === undefined){
        return 'MYR 0'
      }
      return value.toLocaleString("en-US", {
        style: "currency",
        currency: "MYR",
      });
    },
    async fetchFacility(id){
      const response = await OwnerAPI.getFacilityById(id);
      this.facility = response;
      this.loading = false;
    },
    formatAvailability(value) {
      if (value) {
        return "Available";
      } else {
        return "Not Available";
      }
    },
  },
  async created() {
    this.user = JSON.parse(sessionStorage.getItem("user"));
    const response = await OwnerAPI.getFacilityById(this.$route.params.id);
    this.facility = response;
    this.loading = false; // Add this line
  },
};
</script>

<style>
.flex-card {
  display: flex;
  flex-direction: row;
}

.bordered {
  border: 2px solid black;
}

.flex-text {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.flex-btn {
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.description-width {
  width: 30vw;
}

.full {
  width: 100%;
}
</style>
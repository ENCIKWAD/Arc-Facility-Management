<template>
  <div class="background-2">
    <div>
      <v-btn :to="{ name: 'ownerHome' }" :ripple="false" variant="plain">
        <v-icon size="90">mdi-arrow-left-circle</v-icon>
      </v-btn>
      <h1 style="margin-top: 50px">Manage Facilities</h1>
    </div>

    <div class="container">
      <p>Search For</p>
      <v-text-field
        variant="solo"
        class="no-underline"
        rounded
        placeholder="Search for facility name"
        prepend-inner-icon="mdi-magnify"
        hide-details
        color="primary"
        bg-color="white"
      ></v-text-field>
      <p>Sort By</p>
      <v-select
        v-model="select"
        rounded="xl"
        variant="solo"
        :items="items"
        item-title="title"
        item-value="value"
        label="Select"
        single-line
        hide-details
      ></v-select>
    </div>
    <v-btn
      :to="{ name: 'addFacility' }"
      style="margin-bottom: 20px"
      rounded="l"
      color="green"
      >Add New Facility</v-btn
    >

    <div>
      <v-table>
        <thead>
          <tr>
            <th class="text-left">#</th>
            <th class="text-center">Facility Name</th>
            <th class="text-center">Type</th>
            <th class="text-center">Price</th>
            <th class="text-center">Availability</th>
            <th class="text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(facility, index) in facilities" :key="facility._id">
            <td>{{ index + 1 }}</td>
            <td class="text-center" >{{ facility.title }}</td>
            <td class="text-center">{{ facility.type }}</td>
            <td class="text-center">{{ formatCurrency(facility.price )}}</td>
            <td class="text-center"><p v-if="facility.available" class="green" >{{ formatAvailability(facility.available) }}</p>
              <p v-if="!facility.available" class="red" >{{ formatAvailability(facility.available) }}</p></td>
            <td class="text-center">
              <v-btn
                :to="{ name: 'editFacility', params: { id: facility._id } }"
                variant="plain"
                ><v-icon size="30">mdi-pencil</v-icon></v-btn
              >
              <v-btn
              :to="{ name: 'deleteFacility', params: { id: facility._id } }"
                color="red"
                variant="plain"
                ><v-icon size="30">mdi-delete</v-icon></v-btn
              >
              <v-btn :to="{name: 'ownerFacility', params: {id: facility._id}}" color="green" variant="plain"
                ><v-icon size="30">mdi-eye</v-icon></v-btn
              >
            </td>
          </tr>
        </tbody>
      </v-table>
    </div>
    <v-alert
      class="alert"
      border="left"
      closable
      close-text="Close Alert"
      color="green accent-4"
      dark
      dismissible
      @click:close="this.$router.push({ name: 'manageFacility' })"
      v-if="this.$route.query.message"
    >
      {{ this.$route.query.message }}
    </v-alert>
  </div>
</template>

<script>
import OwnerAPI from "../API/ownerAPI.js";
export default {
  name: "ManageFacility",
  data() {
    return {
      dialog: false,
      selectFacility: null,
      select: { title: "None" },
      items: [
        { title: "Facility Name", value: "FN" },
        { title: "Facility Type", value: "FT" },
        { title: "Facility Price", value: "FP" },
        { title: "None", value: "N" },
      ],
      facilities: [],
      user: null,
    };
  },
  async created() {
    this.user = JSON.parse(sessionStorage.getItem("user"));
    try {
      this.facilities = await OwnerAPI.fetchFacilities();
    } catch (err) {
      console.log(err);
    }
  },
  methods:{
    formatCurrency(value){
        return value.toLocaleString('en-US', { style: 'currency', currency: 'MYR' })
    },
    formatAvailability(value){
        if(value){
            return "Available"
        }
        else{
            return "Not Available"
        }
    }
  }
};
</script>


<style>
.background-2 {
  background-color: #f1ebe8;
  min-height: 100vh;
  padding: 2rem;
}

.container {
  width: 50vw;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 15px;
  margin-bottom: 20px;
  margin-top: 70px;
}

.data-container {
  width: 50vw;
}

.text-left {
  text-align: left;
}

.text-center {
  text-align: center;
}
</style>

<style scoped>
.alert {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
}
</style>
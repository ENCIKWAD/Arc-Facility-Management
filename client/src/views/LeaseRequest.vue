<template>
  <div class="background-1 pa-8">
    <navBar :userName="user.fName" :userImage="user.image" :userRole="user.role" :userLName="user.lName" :userId="user._id"></navBar>
    <h1 v-if="loading">Loading...</h1>

    <v-form @submit.prevent="submitForm">
      <v-card class="pa-8 flex-card">
        <div>
          <v-img cover class="bordered" height="500" width="600" :src="facility.image"></v-img>
        </div>
        <div class="ml-15 full">
          <div class="flex-text">
            <v-card-title style="font-size: 30px" class="mt-1">{{
              facility.title
            }}</v-card-title>
            <v-card-title class="mt-1">{{ facility.type }}</v-card-title>
          </div>
          <div class="date">
            <v-card-title>Date</v-card-title>
            <v-text-field @click="clickDate" :readonly="true" v-model="formatDate" class="form-text-field"
              variant="outlined" label="Date" color="primary" bg-color="#5F3DAC"></v-text-field>
            <v-date-picker v-if="dateClicked" v-model="lease.date" :allowed-dates="allowedDates" min="2024-2-8"
              max="2025-03-20"></v-date-picker>
            <!-- need to make the date up to date 
make a max capacity update-->
          </div>
          <div class="flex-Duration">
            <div class="Duration">
              <v-card-title>Duration</v-card-title>
              <v-select label="Select" v-model="lease.duration" :rules="rules" :items="[1, 2]"
                bg-color="#5F3DAC"></v-select>
            </div>
            <div class="Time">
              <v-card-title>Time</v-card-title>
              <v-select v-if="lease.duration === 2" label="Select" v-model="lease.time" :rules="rules" :items="twoHrs"
                bg-color="#5F3DAC"></v-select>

              <v-select v-else label="Select" v-model="lease.time" :rules="rules" :items="oneHr"
                bg-color="#5F3DAC"></v-select>
            </div>
          </div>

          <v-card-title>Capacity</v-card-title>
          <v-text-field id="Capacity" v-model="lease.capacity" :rules="rules" type="number" class="form-text-field"
            variant="outlined" color="primary" bg-color="#5F3DAC"
            oninput="if(Number(this.value) < Number(this.min)) this.value = this.min;" :min="this.min"></v-text-field>
          <v-card-title>Location</v-card-title>
          <v-card-title>{{ facility.location }}/hr</v-card-title>
          <div class="flex-text">
            <v-card-title style="color: green">{{ facility.price }}/hr</v-card-title>
            <div>
              <v-icon size="45">mdi-account</v-icon>
              <p>Min: {{ facility.minCap }}</p>
            </div>
          </div>
          <div class="flex-btn">
            <v-btn type="submit" color="#5F3DAC" width="350" height="50"><v-icon class="mr-2"
                size="30">mdi-book</v-icon>Request
              Lease</v-btn>
            <v-btn @click="$router.go(-1)" color="#514D5A" width="350" height="50"><v-icon class="mr-2"
                size="30">mdi-arrow-left-circle</v-icon>Go
              Back</v-btn>
          </div>
        </div>
      </v-card>
    </v-form>
  </div>
</template>
<script>
import navBar from "@/components/navBar.vue";
import TenantAPI from "../API/tenantAPI.js";
import OwnerAPI from "@/API/ownerAPI";

export default {
  name: "tenantHome",
  components: {},
  data() {
    return {
      rules: [(v) => !!v || "This is required"],
      facility: {},
      lease: {
        time: null,
        duration: 2,
        capacity: null,
        date: null,
      },
      oneHr: [
        "8:00 am - 9:00 am",
        "9:00 am - 10:00 am",
        "10:00 am - 11:00 am",
        "11:00 am - 12:00 pm",
        "12:00 pm - 1:00 pm",
        "1:00 pm - 2:00 pm",
        "2:00 pm - 3:00 pm",
        "3:00 pm - 4:00 pm",
        "4:00 pm - 5:00 pm",
        "5:00 pm - 6:00 pm",
        "6:00 pm - 7:00 pm",
        "7:00 pm - 8:00 pm",
      ],
      twoHrs: [
        "8:00 am - 10:00 am",
        "10:00 am - 12:00 pm",
        "12:00 pm - 2:00 pm",
        "2:00 pm - 4:00 pm",
        "4:00 pm - 6:00 pm",
        "6:00 pm - 8:00 pm",
      ],
      timeOptions: [
        { label: "8:00 am - 10:00 am", value: { startTime: 8, endTime: 10 } },
        { label: "10:00 am - 12:00 pm", value: { startTime: 10, endTime: 12 } },
        { label: "12:00 pm - 2:00 pm", value: { startTime: 12, endTime: 14 } },
        { label: "2:00 pm - 4:00 pm", value: { startTime: 14, endTime: 16 } },
        { label: "4:00 pm - 6:00 pm", value: { startTime: 16, endTime: 18 } },
        { label: "6:00 pm - 8:00 pm", value: { startTime: 18, endTime: 20 } },
        // Add more time slots as needed
        { label: "8:00 am - 9:00 am", value: { startTime: 8, endTime: 9 } },
        { label: "9:00 am - 10:00 am", value: { startTime: 9, endTime: 10 } },
        { label: "10:00 am - 11:00 am", value: { startTime: 10, endTime: 11 } },
        { label: "11:00 am - 12:00 pm", value: { startTime: 11, endTime: 12 } },
        { label: "12:00 pm - 1:00 pm", value: { startTime: 12, endTime: 13 } },
        { label: "1:00 pm - 2:00 pm", value: { startTime: 13, endTime: 14 } },
        { label: "2:00 pm - 3:00 pm", value: { startTime: 14, endTime: 15 } },
        { label: "3:00 pm - 4:00 pm", value: { startTime: 15, endTime: 16 } },
        { label: "4:00 pm - 5:00 pm", value: { startTime: 16, endTime: 17 } },
        { label: "5:00 pm - 6:00 pm", value: { startTime: 17, endTime: 18 } },
        { label: "6:00 pm - 7:00 pm", value: { startTime: 18, endTime: 19 } },
        { label: "7:00 pm - 8:00 pm", value: { startTime: 19, endTime: 20 } }
      ],
      dateClicked: false,
      min: null,
    };
  },
  computed: {
    formIsValid() {
      return (
        this.lease.date != "" &&
        this.lease.time != "" &&
        this.lease.capacity != ""
      );
    },
    selectedValue() {
      this.selectedOption = this.timeOptions.find(timeOption => timeOption.label === this.lease.time);
      return selectedOption ? selectedOption.value : null;
    },

    formatDate() {
      if (this.lease.date == null) return;
      return (
        this.lease.date.getFullYear() +
        "-" +
        ("0" + (this.lease.date.getMonth() + 1)).slice(-2) +
        "-" +
        ("0" + this.lease.date.getDate()).slice(-2)
      );
    },
  },

  components: {
    navBar,
  },
  methods: {
    clickDate() {
      this.dateClicked = !this.dateClicked;
    },
    handleCapacity() {
      const min = this.facility.minCap;
    },
    formatCurrency(value){
      return value.toLocaleString('en-US', { style: 'currency', currency: 'MYR' })
    },

    async submitForm() {
      let lease = {
        time: this.lease.time,
        startTime: new Date(this.lease.date.setHours(this.timeOptions.find(timeOption => timeOption.label === this.lease.time).value.startTime)),
        endTime: new Date(this.lease.date.setHours(this.timeOptions.find(timeOption => timeOption.label === this.lease.time).value.endTime)),
        tenantId: this.user._id,
        facilityId: this.facility._id,
        duration: this.lease.duration,
        capacity: this.lease.capacity,
        date: this.lease.date,
        price: this.facility.price,
        location: this.facility.location,
        status: "Pending",
        title: "Lease Request"
      };
      console.log(this.startTime + "" + this.endTime + "" + lease);
      try {
        const response = await TenantAPI.createRequest(
          this.facility._id,
          lease
        );
        this.$router.push({
          name: "tenantHome",
          query: { message: response.message },
        });
      } catch (err) {
        this.toggleAlert = true;
        this.message = err.response.data.message;
        this.$nextTick(() => {
          setTimeout(() => {
            this.toggleAlert = false;
          }, 5000);
        });
      }
    },
  },
  async created() {
    this.user = JSON.parse(sessionStorage.getItem("user"));
    const response = await OwnerAPI.getFacilityById(this.$route.params.id);
    this.facility = response;
    this.loading = false; // Add this line
    this.currentDate = new Date();
    if (this.facility.minCap !== null) this.min = this.facility.minCap;
  },
};
</script>

<style></style>

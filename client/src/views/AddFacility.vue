<template>
  <div class="background-2">
    <v-btn :to="{ name: 'manageFacility' }" :ripple="false" variant="plain">
      <v-icon size="90">mdi-arrow-left-circle</v-icon>
    </v-btn>
    <div class="flex pa-8">
      <v-form ref="form" @submit.prevent="submitForm">
        <v-card class="pa-7" height="1150" width="500">
          <v-card-title class="text-center">Add Facility</v-card-title>
          <v-img height="250" width="500" :src="imageSrc"></v-img>
          <v-file-input
            :rules="rules"
            @change="selectFile"
            class="mt-4 mb-8"
            prepend-icon="mdi-camera"
            variant="outlined"
            color="primary"
            bg-color="#DCDCDC"
            label="Your Image"
          ></v-file-input>
          <v-text-field
            :rules="rules"
            prepend-icon="mdi-note"
            v-model="facility.title"
            class="form-text-field"
            variant="outlined"
            label="Title"
            color="primary"
            bg-color="#DCDCDC"
          ></v-text-field>
          <v-textarea
            :rules="rules"
            prepend-icon="mdi-note-outline"
            v-model="facility.description"
            color="primary"
            bg-color="#DCDCDC"
            variant="outlined"
            label="Description"
          ></v-textarea>
          <v-text-field
            :rules="rules"
            prepend-icon="mdi-crosshairs-gps"
            v-model="facility.location"
            class="form-text-field"
            variant="outlined"
            label="Location"
            color="primary"
            bg-color="#DCDCDC"
          ></v-text-field>
          <div class="small-field">
            <v-text-field
              :rules="rule"
              prepend-icon="mdi-account"
              v-model="facility.minCap"
              type="number"
              class="form-text-field"
              variant="outlined"
              label="Minimum capacity"
              color="primary"
              bg-color="#DCDCDC"
            ></v-text-field>
            <v-text-field
              prepend-icon="mdi-cash-usd-outline"
              :rules="rules"
              v-model="facility.price"
              type="number"
              class="form-text-field"
              variant="outlined"
              label="Pay per Hour"
              color="primary"
              bg-color="#DCDCDC"
            ></v-text-field>
          </div>

          <v-select
            prepend-icon="mdi-format-list-bulleted-type"
            :rules="selectedRules"
            color="primary"
            variant="outlined"
            bg-color="#DCDCDC"
            @update:model-value="handleSelect"
            v-model="selected"
            :items="facilityTypes"
          ></v-select>
          <div class="av-flex">
            <v-btn color="#5F3DAC" @click="setAvailability"
              >Set Availability</v-btn
            >
            <p v-if="!facility.available" class="red">Unavailable</p>
            <p v-if="facility.available" class="green">Available</p>
          </div>
          <div class="center-btn">
            <v-btn type="submit" class="mt-10" color="green"
              >Add Facility</v-btn
            >
          </div>
        </v-card>
      </v-form>
    </div>
    <v-alert
      class="alert"
      border="left"
      closable
      close-text="Close Alert"
      color="red"
      dark
      dismissible
      v-if="this.toggleAlert"
    >
      {{ this.message }}
    </v-alert>
  </div>
</template>

<script>
import { FacilityType } from "@/FacilityType";
import OwnerAPI from "../API/ownerAPI.js";
export default {
  name: "AddFacility",
  data() {
    return {
      rules: [(value) => !!value || "This field is Required."],
      selectedRules: [
        (value) =>
          value !== "Select a facility type" || "This field is Required.",
      ],
      selected: "Select a facility type",
      message: "",
      toggleAlert: false,
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
      image: "",
    };
  },
  computed: {
    facilityTypes() {
      return Object.values(FacilityType);
    },
    imageSrc() {
      return this.image
        ? URL.createObjectURL(this.image)
        : "/imgs/no-image.png";
    },
  },
  methods: {
    async submitForm() {
      try {
        let formData = new FormData();
        formData.append("title", this.facility.title);
        formData.append("image", this.image);
        formData.append("description", this.facility.description);
        formData.append("location", this.facility.location);
        formData.append("minCap", this.facility.minCap);
        formData.append("price", this.facility.price);
        formData.append("type", this.facility.type);
        formData.append("available", this.facility.available);

        if (this.$refs.form.validate()) {
          const response = await OwnerAPI.addFacility(formData);
          this.$router.push({
            name: "ownerHome",
            query: { message: response.message },
          });
        }
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
    selectFile(file) {
      this.image = file.target.files[0];
    },
    setAvailability() {
      this.facility.available = !this.facility.available;
    },
    handleSelect(selected) {
      this.selected = selected;
      this.facility.type = this.selected;
    },
  },
};
</script>

<style>
.background-1 {
  background-color: #f1ebe8;
  min-height: 100vh;
}

.flex {
  display: flex;
  justify-content: center;
  align-items: center;
}

.text-center {
  text-align: center;
}

.av-flex {
  display: flex;
  align-items: center;
  gap: 20px;
}

.small-field {
  width: 20vw;
}

.center-btn {
  display: flex;
  justify-content: center;
}

.red {
  color: red;
}

.green {
  color: green;
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

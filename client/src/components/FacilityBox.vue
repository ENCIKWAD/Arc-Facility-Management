<template>
  <v-card class="pa-4" min-height="450" min-width="300" hover max-width="380" height="550" max-height="550">
    <v-img max-height="400" max-width="380" :src="facility.image" ></v-img>
    <v-card-title>{{ facility.title }}</v-card-title>
    <v-container class="textFlex">
      <v-card-text class="location no-margin">{{ facility.location }}</v-card-text>
      <v-card-text class="price no-margin">{{ formatCurrency(facility.price)}}/hr</v-card-text>
    </v-container >
    <v-card-text class="type no-margin">Type: {{ facility.type }}</v-card-text>
    <v-card-text class="available no-margin">{{ formatAvailability(facility.available) }}</v-card-text>
    <v-container class="textFlex">
      <v-card-text class="location"></v-card-text>
      <div>
        <v-icon size="45">mdi-account</v-icon>
        <p>Min: {{ facility.minCap }}</p>
      </div>
    </v-container>
    <v-spacer></v-spacer>
    <v-btn style="margin-top: 70px;" block color="#5F3DAC">View Facility</v-btn>
  </v-card>
</template>

<script>
export default {
  name: "Facility",
  props: {
    facility: Object
  },
  methods: {
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
.textFlex{
    display: flex;
    flex-direction: row;
    margin:0;
    padding:0;
    }

    .location{
        display: flex;
        justify-content: flex-start;
        color: #505050
    }

    .price{
        display: flex;
        justify-content: flex-end;
    }

    .available{
        color: #65C056;
    }

    .no-margin{
        margin: 0;
        padding:0;
        padding-left: 1rem;
        padding-bottom: 10px;
    }

</style>
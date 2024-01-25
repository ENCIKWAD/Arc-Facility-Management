<template>
  <div class="background-2">
    <div>
      <v-btn :to="{name: 'ownerHome'}" :ripple="false" variant="plain">
        <v-icon  size="90">mdi-arrow-left-circle</v-icon>
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
    <v-btn :to="{name: 'addFacility'}" style="margin-bottom: 20px" rounded="l" color="green">Add New Facility</v-btn>
    
    <div>

        <v-table>
            <thead>
                <tr>
                    <th class="text-left">
                        #
                    </th>
                    <th class="text-center">
                        Facility Name
                    </th>
                    <th class="text-center">
                        Facility Type
                    </th>
                    <th class="text-center">
                        Action
                    </th>
                    
                </tr>
            </thead>
            <tbody>
                <tr v-for="(facility, index) in facilities" :key="facility._id" >
                <td>{{ index + 1 }}</td>
                <td>{{ facility.title }}</td>
                <td class="text-center" >{{ facility.type }}</td>
                <td class="text-center" >
                    <v-btn variant="plain" ><v-icon size="30">mdi-pencil</v-icon></v-btn>
                    <v-btn color="red" variant="plain" ><v-icon size="30">mdi-delete</v-icon></v-btn>
                    <v-btn color="green" variant="plain" ><v-icon size="30">mdi-eye</v-icon></v-btn>
                </td>
                </tr>
            </tbody>
        </v-table>
    </div>
  </div>
</template>

<script>
import OwnerAPI from "../API/ownerAPI.js";
export default {
  name: "ManageFacility",
  data() {
    return {
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

.data-container{
    width: 50vw;
}

.text-left{
    text-align: left;
}

.text-center{
    text-align: center;
}
</style>
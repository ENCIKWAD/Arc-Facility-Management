<template>
  <v-app-bar color="#A5A5A5" :elevation="2" height="100"   :class="{ 'app-bar-with-results': !state.noSearch && state.searchResults.length > 0 }"
>
<v-btn variant="plain" :to="{name: `${userRole}Home`}" :ripple="false" class="image-button">
  <v-img
    src="/imgs/arc-icon.png"
    alt="Arc Icon"
    height="150"
    width="150"
  ></v-img>
</v-btn>
    <div class="searchBar" :class="{'searchBar-results' : !state.noSearch && state.searchResults.length > 0}">
      <v-text-field
      @keyup="search"
      v-model="searchBar"
      height="60"
        variant="solo"
        class="no-underline"
        rounded
        placeholder="What facilities are you looking for?"
        prepend-inner-icon="mdi-magnify"
        hide-details
        color="primary"
        bg-color="white"
      ></v-text-field>
      <template v-if="!state.noSearch && state.searchResults.length > 0">
      <div class="search-item" v-for="(facility, index) in state.searchResults" :key="index" >
      <hr v-if="index > 0" >
      <v-btn @click="searched" :to="{name: `${userRole}Facility`, params: {id: facility._id}}" :ripple="false" variant="plain" >{{ facility.title }}</v-btn>
      </div>
      </template>
      <template v-else-if="!state.noSearch" >
        <div class="search-item">
          <p>There are no results. Sorry!</p>
        </div>
      </template>
    </div>
    <v-btn :to="{name: 'announcement'}" :ripple="false" variant="plain" color="black" >Announcement</v-btn>
    <v-btn :to="{name: 'report'}" :ripple="false" variant="plain" color="black" >Report</v-btn>
    <v-btn :ripple="false" variant="plain" color="black">
    <v-icon size="35">mdi-email</v-icon>
</v-btn>
    <div class="userDiv" >
        <img :src="userImage" class="profile-image">
        <p class="userName" >{{ userName }}</p>
    </div>
  </v-app-bar>
</template>

<script>
import OwnerAPI from '../API/ownerAPI';
import TenantAPI from '../API/tenantAPI';
import {reactive} from 'vue'
export default {
  
  name: "navBar",
  data(){
    return{
      searchBar: ''
    }
  },
  methods: {
    searched(){
      this.state.noSearch = true;
      this.state.searchResults = [];
      this.searchBar = '';

    }
  },
  props: ["userName", "userImage", "userRole"],
  setup(props){

    const state = reactive({
      searchResults: [],
      noSearch: true
    })

    async function search(e){
      let search = e.target.value
      if(props.userRole === 'owner'){
        const res = await OwnerAPI.search(search)
        if(search === ''){
          state.noSearch = true;
          return;
        }
        state.noSearch = false
        state.searchResults = res;
      }
      else{
        const res = await TenantAPI.search(search)
        if(search === ''){
          state.noSearch = true;
          return;
        }
        state.noSearch = false
        state.searchResults = res;
      }
    }

    return {search, state}
  }
};
</script>


<style scoped>
.searchBar {
  width: 55vw;
}

.profile-image{
    width: 70px;
    height: 70px;
    border-radius: 50%;

}

.image-button {
  padding: 0;
  margin-bottom: 110px;
  border: none;
  outline: none;
}

.userDiv{
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-left: 20px;
    margin-right: 60px;
    justify-content: center;
    gap: 10px;
}

.userName{
    font-size: 17px;
    font-weight: bold;
    color: black;
}

.app-bar-with-results {
  height: 220px !important; /* adjust as needed */
}

.searchBar-results{
  margin-top: 120px !important; /* adjust as needed */
}
</style>
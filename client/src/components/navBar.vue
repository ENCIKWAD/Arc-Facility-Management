<template>
  <v-app-bar color="#A5A5A5" :elevation="2" height="100">
    <v-img
      src="/imgs/arc-icon.png"
      alt="Arc Icon"
      height="90"
      width="90"
    ></v-img>
    <div class="searchBar">
      <v-text-field
        variant="solo"
        class="no-underline"
        rounded
        placeholder="What facilities are you looking for?"
        prepend-inner-icon="mdi-magnify"
        hide-details
        color="primary"
        bg-color="white"
      ></v-text-field>
    </div>
    <v-btn :ripple="false" variant="plain" color="black" >Announcement</v-btn>
    <v-btn :ripple="false" variant="plain" color="black" >Report</v-btn>
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
export default {
  name: "navBar",
  props: ["userName", "userImage"]
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
</style>
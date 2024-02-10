<template>
  <div class="background-1 pa-6">
    <navBar
      :userName="user.fName"
      :userImage="user.image"
      :userRole="user.role"
      :userLName="user.lName"
    ></navBar>

    <v-container>
      <p v-if="!this.announcements.length > 0" class="title">There are no announcements at this moment</p>
      <AnnouncementBox
        v-for="announcement in announcements"
        :key="announcement"
        :announcement="announcement"
      ></AnnouncementBox>
    </v-container>
  </div>
</template>

<script>
import navBar from "../components/navBar.vue";
import AnnouncementBox from "@/components/AnnouncementBox.vue";
import UserAPI from '../API/userAPI';
export default {
  name: "Announcement",
  components: {
    navBar,
    AnnouncementBox,
  },
  mounted() {
    window.scrollTo(0, 0);
  },
  data() {
    return {
      user: null,
      announcements: [],
    };
  },
  async created() {
    this.user = JSON.parse(sessionStorage.getItem("user"));
    try{
      const response = await UserAPI.fetchAnnouncements();
      this.announcements = response;
    }
    catch(err){
      console.log(err.message)
    }
    },
};
</script>
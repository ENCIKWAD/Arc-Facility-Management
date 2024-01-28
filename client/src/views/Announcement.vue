<template>
  <div class="background-1 pa-6">
    <navBar
      :userName="user.fName"
      :userImage="user.image"
      :userRole="user.role"
    ></navBar>

    <v-container>
        <AnnouncementBox v-for="announcement in announcements" :key="announcement" :announcement="announcement" ></AnnouncementBox>
    </v-container>
  </div>
</template>

<script>
import navBar from "../components/navBar.vue";
import AnnouncementBox from "@/components/AnnouncementBox.vue";
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
      announcements: [
        {
          title: "Announcement 1",
          message: "This is the first announcement",
          date: "2021-04-01",
        },
        {
          title: "Announcement 2",
          message: "This is the second announcement",
          date: "2021-04-02",
        },
        {
          title: "Announcement 3",
          message: "This is the third announcement",
          date: "2021-04-03",
        }
      ],
    };
  },
  async created() {
    this.user = JSON.parse(sessionStorage.getItem("user"));
  },
};
</script>
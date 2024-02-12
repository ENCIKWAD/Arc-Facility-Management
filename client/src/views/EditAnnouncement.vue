<template>
    <div class="background-2">

        <div>
            <v-btn :to="{ name: 'manageAnnouncement' }" :ripple="false" variant="plain" class="margin">
                <v-icon size="90">mdi-arrow-left-circle</v-icon>
                <h2>manage announcement</h2>
            </v-btn>
        </div>

        <h1>Edit Announcement</h1>

        <v-card class="pa-4 card" rounded="xl">
            <v-form ref="form">
                <v-alert v-model="toggleAlert" type="error">
                    {{ errorMessage }} <!-- Use errorMessage here -->
                </v-alert>
                <v-card-title>Announcement Title</v-card-title>
                <v-card-text>
                    <v-text-field
                    :rules="rules"
                    variant="outlined"
                    label="Title"
                    v-model="announcement.title"
                    bg-color="#D9D9D9"
                    rounded="xl"
                    required
                    ></v-text-field>

                    <v-card-title>Announcement Message</v-card-title>
                    <v-textarea
                    :rules="rules"
                    variant="outlined"
                        label="Message"
                        v-model="announcement.message"
                        bg-color="#D9D9D9"
                        rounded="xl"
                        :counter="400"
                        required
                        ></v-textarea>
                    </v-card-text>
                <v-card-actions>
        
                        <v-btn 
                            color="#5F3DAC"
                            variant="elevated"
                            rounded="xl"
                            @click="submitForm"
                        >Publish</v-btn>
                    
                </v-card-actions>
            </v-form>
        </v-card>
    </div>
  </template>
  
  <script>
  import NavBar from "../components/navBar.vue";
  import AdminAPI from "@/API/adminAPI";
  export default {
    name: "editAnnouncement",
    async created(){
        try{
            const response = await AdminAPI.getAnnouncementById(this.$route.params.id);
            console.log("response: " + JSON.stringify(response));
            this.announcement = response;
            this.announcement.title = response.title;
            this.announcement.message = response.message;
            // this.scheduleLater = response.data.scheduleLater;
            // this.scheduledDate = response.data.scheduledDate;
        } catch(err){
            console.log(err);
        }
    },
    data() {
      return {
        rules: [(value) => !!value || "This field is Required."],
        announcement: {
            title: "",
            message: "",
        },
        toggleAlert: false,
        errorMessage: "",

        };
    },
    methods: {
      async submitForm() {
        try{
            let formData = {
                title: this.announcement.title,
                message: this.announcement.message,
                
            }
            if(this.$refs.form.validate()){
                const response = await AdminAPI.editAnnouncement(this.announcement._id, formData);
                this.$router.push({ name: 'manageAnnouncement' });
            }
        
        } catch(err){
            this.toggleAlert = true;
            this.errorMessage = err.response && err.response.data ? err.response.data.message : 'An error occurred';
                this.$nextTick(() => {
                    setTimeout(() => {
                        this.toggleAlert = false;
                    }, 5000)
            })
            }
      },
    },
  };
  </script>
  
  <style scoped>

.background-2 {
  background-color: #f1ebe8;
  min-height: 100vh;
  padding: 2rem;
}

.margin {
    margin-bottom: 80px; /* Adjust as needed */
}

.card {
  margin-left: 20px;
}


</style>
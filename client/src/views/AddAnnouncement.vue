<template>
    <div class="background-2">
      <v-btn @click="$router.go(-1)" :ripple="false" variant="plain">
        <v-icon  size="90">mdi-arrow-left-circle</v-icon>
      </v-btn>
        <h1 class="margin-top">Create Announcement</h1>
        <v-card class="pa-4 card margin-top" rounded="xl">
            <v-form ref="form">
                <v-alert v-model="toggleAlert" type="error">
                    {{ errorMessage }} <!-- Use errorMessage here -->
                </v-alert>
                <v-card-title>Announcement Title</v-card-title>
                <v-card-text>
                    <v-text-field
                    :rules="rules"
                    label="Title"
                    v-model="title"
                    bg-color="#D9D9D9"
                    rounded="xl"
                    required
                    variant="outlined"
                    ></v-text-field>

                    <v-card-title>Announcement Message</v-card-title>
                    <v-textarea
                    :rules="rules"
                        label="Message"
                        v-model="message"
                        bg-color="#D9D9D9"
                        rounded="xl"
                        :counter="400"
                        required
                        variant="outlined"
                        ></v-textarea>
                    </v-card-text>
                <v-card-actions>

                        <v-checkbox label="Schedule for later"></v-checkbox>
        
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
    name: "AddAnnouncement",
    data() {
      return {
        rules: [(value) => !!value || "This field is Required."],
        title: '',
        message: '',
        toggleAlert: false,
        scheduleLater: false,
        menu: false,
        scheduledDate: null,
        };
    },
    methods: {
      async submitForm() {
        try{
        if(this.$refs.form.validate()){
            let formData = {
                title: this.title,
                message: this.message,
                scheduleLater: this.scheduleLater,
                scheduledDate: this.scheduledDate,
            }

            const response = await AdminAPI.createAnnouncement(formData);
            console.log("response: " + JSON.stringify(response));
        }
        
    } catch(err){
            this.toggleAlert = true;
            this.errorMessage = err.response.data.message;
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

.card {
  margin-left: 20px;
}

.margin-top{
  margin-top: 50px;
}


</style>
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
                    :maxlength="400"
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

                        <v-checkbox label="Schedule for later" v-model="scheduleLater"></v-checkbox>

                        <v-btn 
                            color="#5F3DAC"
                            variant="elevated"
                            rounded="xl"
                            @click="submitForm"
                        >Publish</v-btn>
                    
                </v-card-actions>
            </v-form>
        </v-card>
          <!-- New v-card that shows up when scheduleLater is true -->
          <v-card v-if="scheduleLater" class="pa-4 card margin-top" rounded="xl">
              <v-card-title>Schedule Date</v-card-title>
              <v-card-text>
                <v-row>
            <v-col cols="6">
              <v-date-picker v-model="scheduledDate" :min="minDate"></v-date-picker>
            </v-col>
            <v-col cols="6">
              <v-select
                v-model="scheduledTime"
                :items="hours"
                label="Select hour"
              ></v-select>
            </v-col>
          </v-row>
          <v-row justify="space-between" align="center">
            <v-col cols="auto">
              <v-chip v-if="scheduledDate && scheduledTime">
                Scheduled for {{ formattedDate }} at {{ scheduledTime }}
              </v-chip>
            </v-col>
            <v-col cols="auto">
              <v-btn 
                color="#5F3DAC"
                variant="elevated"
                rounded="xl"
                @click="submitForm"
              >Schedule</v-btn>
            </v-col>
          </v-row>
              </v-card-text>
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
        scheduledTime: null,
        hours: [
            '8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
            '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM',
            '6:00 PM', '7:00 PM', '8:00 PM'
          ],
        minDate: new Date().toISOString().substr(0, 10)
        };
    },
    computed: {
      formattedDate() {
        if (this.scheduledDate) {
          const date = new Date(this.scheduledDate);
          return date.toLocaleDateString('en-US', { weekday: 'short', day: 'numeric', month: 'numeric', year: 'numeric' });
        }
        return null;
      },
    },
    methods: {
      async submitForm() {
        try {
          if(this.$refs.form.validate()){
            let scheduledDateTime = null;
            if (this.scheduleLater && this.scheduledDate && this.scheduledTime) {
              // Combine the scheduled date and time into a single Date object
              const [hours, period] = this.scheduledTime.split(' ');
              const hour = period === 'PM' && hours < 12 ? parseInt(hours) + 12 : parseInt(hours);
              scheduledDateTime = new Date(this.scheduledDate);
              scheduledDateTime.setHours(hour);
              scheduledDateTime.setMinutes(0);

              scheduledDateTime = new Date(scheduledDateTime.getTime() - scheduledDateTime.getTimezoneOffset() * 60000);
            }

            let formData = {
              title: this.title,
              message: this.message,
              scheduleLater: this.scheduleLater,
              scheduledDate: scheduledDateTime,
            }

            // Send the form data to the server immediately
            const response = await AdminAPI.createAnnouncement(formData);
            console.log("response: " + JSON.stringify(response));
          }
        } catch(err) {
          this.toggleAlert = true;
          this.errorMessage = err.response.data.message;
          this.$nextTick(() => {
            setTimeout(() => {
              this.toggleAlert = false;
            }, 5000)
          })
        }
      }
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
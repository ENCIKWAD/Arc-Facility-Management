<template>
  <div class="background-2">
    <v-btn @click="$router.go(-1)" :ripple="false" variant="plain">
      <v-icon size="90">mdi-arrow-left-circle</v-icon>
    </v-btn>
    <v-container class="flex pa-8">
      <v-form ref="form" @submit.prevent="submitForm">
        <v-card class="pa-7 manage-container" height="880" width="800">
          <v-card-title class="text-center">Manage Account</v-card-title>
          <v-avatar class="border-avatar" size="200">
            <v-img :src="imageSrc"></v-img>
          </v-avatar>
          <div class="file-input">
            <v-file-input
              :rules="rules"
              @change="selectFile"
              prepend-icon="mdi-camera"
              variant="outlined"
              color="primary"
              bg-color="#DCDCDC"
              label="Your Profile Picture"
            ></v-file-input>
          </div>
          <div class="name-flex">
            <div class="name-item">
              <v-text-field
                :rules="rules"
                variant="outlined"
                label="First Name"
                v-model="this.user.fName"
                color="primary"
                bg-color="#DCDCDC"
              ></v-text-field>
            </div>
            <div class="name-item">
              <v-text-field
                v-model="this.user.lName"
                :rules="rules"
                variant="outlined"
                label="Last Name"
                color="primary"
                bg-color="#DCDCDC"
              ></v-text-field>
            </div>
          </div>
          <div class="email">
            <v-text-field
              :rules="rules"
              variant="outlined"
              v-model="this.user.email"
              label="Email Address"
              color="primary"
              bg-color="#DCDCDC"
            ></v-text-field>
          </div>
          <v-btn
            v-if="!this.togglePassword"
            @click="this.togglePassword = true"
            color="#5F3DAC"
            >Change Password</v-btn
          >
          <div class="password">
            <v-text-field
              v-if="this.togglePassword"
              :rules="rules"
              v-model="this.new_password"
              variant="outlined"
              label="New Password"
              color="primary"
              bg-color="#DCDCDC"
            ></v-text-field>
          </div>
          <div class="manageBtn">
            <v-btn @click="$router.go(-1)" width="100" color="#D9D9D9"
              >Cancel</v-btn
            >
            <v-btn type="submit" width="100" color="#5F3DAC">Save</v-btn>
          </div>
        </v-card>
      </v-form>
    </v-container>
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
import UserAPI from "../API/userAPI";
export default {
  name: "manageAccount",
  data() {
    return {
      rules: [(value) => !!value || "This field is Required."],
      user: {
        _id: "",
        fName: "",
        lName: "",
        email: "",
        image: "",
      },
      old_image: "",
      new_password: "",
      togglePassword: false,
        toggleAlert: false,
        message: "",
    };
  },
  async created() {
    try {
      this.user = JSON.parse(sessionStorage.getItem("user"));
      this.old_image = this.user.image;
    } catch (err) {
      console.log(err);
    }
  },
  computed: {
    imageSrc() {
      if (this.user.image instanceof File) {
        return URL.createObjectURL(this.user.image);
      } else if (this.user.image) {
        return this.user.image;
      } else {
        return "/imgs/default.png";
      }
    },
  },
  methods: {
    selectFile(file) {
      this.user.image = file.target.files[0];
    },
    closeAlert() {
      this.$router.push({ query: {} });
    },
    async submitForm() {
      try {
        let formData = new FormData();
        formData.append("_id", this.user._id);
        formData.append("fName", this.user.fName);
        formData.append("lName", this.user.lName);
        formData.append("email", this.user.email);
        formData.append("old_image", this.old_image);
        formData.append("image", this.user.image);
        formData.append("new_password", this.new_password);

        if (this.$refs.form.validate()) {
          const response = await UserAPI.manageAccount(formData);
          sessionStorage.removeItem("user"); // This line deletes the previous "user" session
          sessionStorage.setItem("user", JSON.stringify(response.user));

          this.$router.push({
            name: `${this.user.role}Home`,
            query: { message: response.message },
          });
        }
      } catch (err) {
        this.toggleAlert = true;
          this.message = err.response.data.message;
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

<style>
.manage-container {
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 100%;
}

.file-input {
  margin-top: 40px;
  width: 70%;
}

.name-flex {
  display: flex;
  margin-top: 20px;
  justify-content: space-between;
  width: 90%;
}

.name-item {
  width: 40%;
}

.password {
  margin-top: 20px;
  width: 40%;
}

.email {
  margin-top: 20px;
  width: 40%;
}

.manageBtn {
  display: flex;
  justify-content: space-between;
  width: 40%;
  margin-top: 20px;
}

.border-avatar {
  border: 1px solid black;
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
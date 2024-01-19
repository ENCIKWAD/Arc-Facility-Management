<template>
  <div class="background">
    <div class="loginFlex">
      <div>
        <p id="loginh2">Login</p>
        <v-form @submit.prevent="submitForm">
          <v-text-field
            class="textFields"
            v-model="user.email"
            variant="outlined"
            label="Email Address"
            color="primary"
            bg-color="#FFFFFF"
            :rules="rules"
          ></v-text-field>
          <v-text-field
            class="textFields"
            v-model="user.password"
            variant="outlined"
            label="Password"
            color="primary"
            bg-color="#FFFFFF"
            :rules="rules"
          ></v-text-field>
          <v-btn
            type="submit"
            append-icon="mdi-login"
            class="loginBtn"
            size="x-large"
            rounded="l"
            color="primary"
            width="200"
            >Login</v-btn
          >
          <p class="loginP">
            Don't have an account? <a href="/signUp">Sign up!</a>
          </p>
        </v-form>
      </div>
    </div>
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
import UserAPI from "../userAPI.js";
export default {
  name: "login",
  data() {
    return {
      user: {
        email: "",
        password: "",
      },
      toggleAlert: false,
      message: "",
      rules: [
        (v) => !!v || "This is required",
      ]
    };
  },
  methods: {
    async submitForm() {
      let user = {
        email: this.user.email,
        password: this.user.password,
      };

      try {
        let response = await UserAPI.login(user);
        this.message = "";
        this.toggleAlert = false;
        this.$router.push(`/${response.user.role}`);
      } catch (err) {
        this.toggleAlert = true;
        this.message = err.response.data.message;
        this.$nextTick(() => {
            setTimeout(() => {
                this.toggleAlert = false;
            }, 5000)
        })
        this.user.email = "";
        this.user.password = "";
      }
    },
  },
};
</script>


<style>
.background {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #a5a5a5;
  height: 100vh;
  width: 100vw;
}

a {
  margin-left: 5px;
  text-decoration: none;
}

.loginFlex {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  background-color: #f1e5de;
  height: 70vh;
  width: 25vw;
  border-radius: 12px;
}

#loginh2 {
  display: flex;
  justify-content: center;
  margin: auto;
  margin-top: 40px;
  margin-bottom: 50px;
  font-size: 30px;
}

.loginP {
  display: flex;
  justify-content: center;
  margin: auto;
  margin-top: 30px;
  font-size: 15px;
}

.loginBtn {
  display: flex;
  justify-content: center;
  margin: auto;
  margin-top: 30px;
}
.textFields {
  width: 20vw;
  margin-top: 20px;
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


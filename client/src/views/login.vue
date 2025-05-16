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
            type="password"
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
            color="#0B3667"
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
      :color="alertColor"
      dark
      dismissible
      v-if="toggleAlert"
    >
      {{ message }}
    </v-alert>
    <v-alert
      class="alert"
      border="left"
      closable
      close-text="Close Alert"
      color="green accent-4"
      dark
      dismissible
      v-if="$route.query.message"
    >
      {{ $route.query.message }}
    </v-alert>
  </div>
</template>

<script>
import UserAPI from "../API/userAPI.js";
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
      alertColor: "red",
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
        // Use axios directly to get the status code
        let res = await UserAPI.login(user);
        // If status is 200, proceed
        if (res && res.user) {
          sessionStorage.setItem('user', JSON.stringify(res.user));
          this.message = "";
          this.toggleAlert = false;
          this.$router.push(`/${res.user.role}`, { params: { user: res.user } });
        } else {
          // fallback, should not happen
          this.toggleAlert = true;
          this.message = "Invalid credentials";
        }
      } catch (err) {
        this.toggleAlert = true;
        this.alertColor = "red";
        this.message = "Invalid credentials";
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
  color: #0000FF;
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
<template>
  <div class="container">
    <h1>Login Page</h1>
    <br />
    <br />
    <div class="row">
      <div class="col-md-3"></div>
      <div class="col-md-6">
        <form>
          <div class="mb-3">
            <label for="email" class="form-label">Entre ton email</label>
            <input
              type="email"
              class="form-control"
              id="email"
              v-model="datalogin.email"
              required
            />
          </div>
          <div class="mb-3">
            <label for="password" class="form-label">Password</label>
            <input
              type="password"
              class="form-control"
              id="password"
              v-model="datalogin.password"
              required
            />
          </div>

          <button @click.prevent="login" class="btn btn-primary">Login</button>
        </form>
      </div>
      <div class="col-md-3"></div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "login",
  data() {
    return {
      datalogin: {
        pseudo: "",
        email: "",
        password: "",
      },
    };
  },
  computed: {},
  methods: {
    login() {
      if (this.datalogin.email !== null || this.datalogin.password !== null) {
        axios
          .post("http://localhost:3000/api/users/login", this.datalogin)
          .then((response) => {
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("userId", response.data.user.id);
            localStorage.setItem("isAdmin", response.data.user.isAdmin);

            window.location.href = "/wall";
          })
          .catch((error) => console.log(error));
      }
    },
  },
};
</script>

<style scoped>
</style>
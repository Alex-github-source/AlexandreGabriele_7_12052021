<template>
     <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container-fluid">
        <a class="navbar-brand" href="#"><img class="logo" src="../assets/icon.png" alt="icone de l'entreprise"/></a>


          <router-link class="nav-link" to="/">Home</router-link>
          <router-link class="nav-link" to="/about">About</router-link>
          <router-link v-if="isLoggedIn" class="nav-link" to="/wall">The Wall</router-link>
          <router-link v-if="isLoggedIn" class="nav-link" to="/me">Profile</router-link>

   
        <div class="d-flex">
          <button v-if="isLoggedIn" class="btn btn-danger" 
          v-on:click="logout"> Logout</button>
          <router-link v-else   class="nav-link" to="/login">Login</router-link>
         
          <router-link v-if="!isLoggedIn" id="btnRegister"  to="/signup" class="btn btn-outline-primary" visible:>Register</router-link>
        </div>
    
      </div>
    </nav>
</template>

<script>


export default {

      computed:{
          isLoggedIn(){
              return window.localStorage.getItem("token");
          }  
    },
    methods:{
        logout(){
            window.localStorage.clear();
            window.location.href="/";
        }
        
    }
  
}
</script>

<style lang='scss'>
nav {
  position: fixed;
  top: 0;
}
</style>
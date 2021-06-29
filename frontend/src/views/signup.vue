<template>
   <div class="container">
    <h1>Register Page</h1>
    <br/>
    <br/>
    <div class="row">
      <div class="col-md-3"></div>
      <div class="col-md-6">
        <form>
             <div class="mb-3">
            <label for="pseudo" class="form-label"
              >Pseudo</label
            >
            <input
              type="text"
              class="form-control"
              v-model="datasignup.pseudo"
              id="pseudo"
              required
            />
            </div>
          <div class="mb-3">
            <label for="email" class="form-label"
              >Email address</label
            >
            <input
              type="email"
              class="form-control"
              id="email"
              v-model="datasignup.email"
              required
              aria-describedby="emailHelp"
            />
            <div id="emailHelp" class="form-text">
              We'll never share your email with anyone else.
            </div>
          </div>
          <div class="mb3">
            <label for="password" class="form-label"
              >Password</label
            >
            <input
              type="password"
              class="form-control"
              id="password"
              v-model="datasignup.password"
              required
            />
          </div>
         
          <br/>
          <button @click.prevent="postSignup" class="btn btn-primary">Register</button>
        </form>
      </div>
      <div class="col-md-3"></div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

 export default {
      name:"signup",
    data(){
        return{
          datasignup:{
            pseudo:"",
            email:"",
            password:""
            }
        }
    },
    methods:{
           postSignup(){
              if ( this.datasignup.pseudo !==null || this.datasignup.email !==null  || this.datasignup.password !==null ){
                axios.post("http://localhost:3000/api/users/signup",this.datasignup)
                      .then(response=>{
                        console.log(response);
                        window.location.href="/about";
                      })
                      .catch(error => console.log(error));
              }   
            }
    }
};

</script>

<style scoped>

</style>
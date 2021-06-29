<template>
   <div class="bloc-modale" v-if="revele">
    <div class="overlay" v-on:click="toggleModale"></div>
    <div class="modale">
      <div v-on:click="toggleModale" class="btn-modale btn btn-danger">X</div>
      <div class="col-md-6">

        <form>
            <div class="mb-3">
            <label for="pseudo" class="form-label"
              >Pseudo</label
            >
            <input
              type="text"
              class="form-control"
              v-model="pseudo"
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
              v-model="email"
              required
              aria-describedby="emailHelp"
            />
          
            </div>
           
         
            <br/>
            <div class="card-body mx-auto">
                <div class="btn-danger rounded p-3" style="cursor:default"><button @click.prevent="updateMyAccount(userId)" class="rounded p-2"><span class="m-3 font-weight-bold">Modifier</span></button></div>
            </div>
        </form>
      </div>
    </div>
    </div>
</template>

<script>
import axios from "axios";

 export default {
      name:"ModaleUser",
      props: ["revele", "toggleModale","userId"],

    data(){
        return{
        
            pseudo:"",
            email:"",
            password:"",
        }
    },
    methods:{
           updateMyAccount(n){

              let FD = new FormData();
            FD.append('email', this.email);
            FD.append('pseudo', this.pseudo);
                  FD.append("userId",localStorage.getItem('userId'));

               const body=Object.fromEntries(FD.entries());

        const postData = JSON.stringify(body);
           axios.put("http://localhost:3000/api/users/"+n,postData,{ headers: {'Content-type' : 'application/json',"Authorization":"Bearer " + localStorage.getItem("token")}})
        .then(response=>{
          console.log(response);

        })

            }
    }
};

</script>

<style scoped>
.overlay {
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}
.modale {
  background: #f1f1f1;
  color: #333;
  padding: 50px;
  position: absolute;
  top: 30%;
}

.btn-modale {
  position: absolute;
  top: 10px;
  right: 10px;
}
</style>
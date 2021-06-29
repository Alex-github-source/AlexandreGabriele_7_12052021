<template>
    <main class="container">    
        <div class="row justify-content-center">
            <div class="col-10">
                 <!-- div contenant le titre -->
                <div class="col-12">
                    <h1 class="my-2 btn btn-block btn-info font-weight-bold" style="cursor:default">Vous consultez vote compte</h1>
                </div>
                <section id="filPrincipal" class="row">
                    <div class="col-12">
                         <!-- bloc utilisateur -->
                        <div class="card bg-light my-3 class=center-block" style="float:none;">
                            <div class="card-header">
                                <div class="row justify-content-around">
                                    <p class="m-1"> Bonjour {{ nameCurrentUser }} ! </p>
                                </div>
                            </div>
                            <div class="card-body text-center">
                                <div class="dropdown text-center">
                                    <p>Membre depuis le {{ creation }}</p>
                                    <p>Ton email de connexion: {{ email }}</p>
                                </div>
                            </div>
                          <div >
                            <modale :userId=userId  v-bind:revele="revele" v-bind:toggleModale="toggleModale"></modale>
                            <div
                            class=" btn btn-primary"
                            v-on:click="toggleModale"
          
                            >Modifier le profile</div>
                            <div class="btn  btn-danger"
                            v-on:click="deleteMyAccount(userId)"
                            >Supprimer le compte</div>
                            </div>
                        </div> 
                    </div>  
                </section>
            </div>
        </div>
    </main>
</template>


<script>
import axios from "axios";
import ModaleUser from "../components/ModifyProfile";
import { mapState } from "vuex";


export default {
    name: "Profile",
    components: {
      'modale':ModaleUser
    },
    data() {
        return {
            isAdmin: false,
            revele:false,
            nameCurrentUser: "",
            creation: "",
            id: "",
            email:'',
            userId:localStorage.getItem('userId')
        }
    },
    created: function() {        
        let id          = localStorage.getItem('userId');
        let self        = this;
        axios.get("http://localhost:3000/api/users/" + id, { headers: {"Authorization": "Bearer " + localStorage.getItem("token")} })
        .then(res => {  
            self.creation           = res.data.createdAt.slice(0,10).split("-").reverse().join(".");
            self.isAdmin            = res.data.isAdmin;
            self.nameCurrentUser    = res.data.pseudo.charAt(0).toUpperCase() + res.data.pseudo.slice(1);
            self.id                 = res.data.id;
            self.email              = res.data.email;     
        })
        .catch((error)=> { console.log(error) 
        });    
    },
    computed:{
   ...mapState(["user"])

    },
    methods: {
     
      toggleModale(){
       this.revele = !this.revele
     },
        deleteMyAccount(n) {
              n=this.userId;
            let confirmUserDeletion = confirm("voulez-vous vraiment supprimer votre compte ?");
            if (confirmUserDeletion == true) {
                axios.delete("http://localhost:3000/api/users/" + n, {headers: { "Authorization": "Bearer " + localStorage.getItem("token") },})
                .then((res)=> {
                    console.log(res);
                    alert('Cliquez sur ok et l\'utilisateur sera supprimé');
                })
                .catch((error) => { 
                    console.log(error)
                })
            } else {
                return 
            }
        },
     
     
    }
}
</script>
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
                                </div>
                            </div>
                          
                            <div class="card-body mx-auto">
                                <div class="btn-danger rounded p-3" style="cursor:default"><button @click="deleteMyAccount(id)" class="rounded p-2"><span class="m-3 font-weight-bold">SUPPRIMER VOTRE COMPTE</span></button></div>
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
export default {
    name: "Profile",
    components: {
      
    },
    data() {
        return {
            isAdmin: false,
            nameCurrentUser: "",
            creation: "",
            id: ""
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
            self.id                 = res.data.id     
        })
        .catch((error)=> { console.log(error) 
        });    
    },
    methods: {
      
        deleteMyAccount(n) {
            let id = n;
            let confirmUserDeletion = confirm("voulez-vous vraiment supprimer votre compte ?");
            if (confirmUserDeletion == true) {
                axios.delete("http://localhost:3000/api/users/" + id, {headers: { "Authorization": "Bearer " + localStorage.getItem("token") },})
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
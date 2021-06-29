<template>
<div>
  <div>
    <form class="comment">
      <div class="comment-zone">
        <textarea v-model="newComment.message" aria-label="Zone d'un commentaire" placeholder="Écrire votre commentaire ici" class="text-comment">
        </textarea>
      </div>
      <div>
        <button v-on:click="submitComment(postId)" type="submit" aria-label="Publication d'un commentaire" class="btn-comments btn btn-primary">Publier</button>
      </div>
    </form>
  </div>
</div>
</template>
                
            
            

   <script>         
import axios from "axios";



export default {
  name: "Comment",
    props: ["postId"],

components:{
  },
    data() {
    return {
       post: {
                userId: "",
                createdAt: "",
                message: "",
                id: "",
            },

     comment: {
                message: '',
                UserId: ''
            },
    newComment: {
                message: ''
            },
    
    };
  },
  
     
  computed: {
  },
  methods: {
   
  
        submitComment(postId) {
            const comment = this.newComment;
            console.log(comment);
            axios
                .post('http://localhost:3000/api/posts/' + postId + '/comments', 
                comment, {
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("token") }
                })
                .then(response => {
                    console.log(response);
                })
                .catch(error => console.log(error))
        },
       
    }
  
  
};
</script>

<style>
.btn-comments{
 display:flex;
        text-align: end;
        width: 200px;
        justify-content: center;
        align-items: center;
        padding: 0 5px 5px 0;
        }
 .comment {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin: 30px 0;
        padding-bottom: 30px;
    }
     .comment-zone {
        text-align: center;
        display: flex;
        align-content: center;
        align-items: center;
    }
     .text-comment {
        width: 300px;
        height: 80px;
        padding-top: 3px;
        text-align: center;
        border-radius: 10px;
    }
    
</style>

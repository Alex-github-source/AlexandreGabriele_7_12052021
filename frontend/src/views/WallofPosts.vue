<template>
     <div id="wall" class="wall">
        <CreatePost />
             <Post v-for="post in allPosts" v-bind:key="post.id" :post="post" :postImage="post.imageUrl" @infosPost="setInfos" />
     </div>
</template>
<script>
import axios from "axios";
import Post from "../components/Post";
import CreatePost from "../components/CreatePost";


export default {
      name:"WallofPosts",
      components :{
          CreatePost,
          Post,

      },
    data(){
        return{
          post:{
            id:"",
            message:"",
            },
            allPosts:[]
        }
    },
    computed:{
   
    },
  
    
    
    methods: {
    setInfos(payload) {
      this.post = payload.post;
    },
   
  },
    
        mounted(){
           
             axios.get("http://localhost:3000/api/posts/",{
                  headers: {
                    Authorization: "Bearer " + localStorage.getItem("token")
                        }
             })
                  .then(response =>{
                     console.log("post", response.data);
                     this.allPosts = response.data;
                        })
                  .catch(error =>console.log(error))
                }
              
 }

</script>

<style scoped>
</style>
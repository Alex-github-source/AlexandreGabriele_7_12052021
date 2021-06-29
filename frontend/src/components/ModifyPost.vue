<template>
  <div class="bloc-modale" v-if="revele">

    <div class="modale card">
      <div v-on:click="toggleModale" class="btn-modale btn btn-danger">X</div>
      <h2>Modifie ton histoire</h2>
      <form>
       <div>
        <input v-model="message" class="input-text" id="message" type="textarea" />
          <br/>
          <br/>
          <label for="message">Mettez nous votre lien:</label>
          <br />
          <input v-model="link" class="input-text" id="message" type="text" />
          <button type="submit" class="btn btn-primary"  @click.prevent="modifyPost(postId)"  > Poster </button>

       </div>
    </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: "Modale",
  props: ["revele", "toggleModale","postId"],
  data(){
      return{
         message: null,
        link: null
      }
  },
 
 methods:{
      modifyPost(n) {
      const FD = new FormData();
      console.log('n',n);
      FD.append("message", this.message);
      if (this.link !== null) {
        FD.append("link", this.link);
      }
      FD.append("userId",localStorage.getItem('userId'));
              const body=Object.fromEntries(FD.entries());

        const postData = JSON.stringify(body);

      axios.put("http://localhost:3000/api/posts/"+n,postData,{ headers: {'Content-type' : 'application/json',"Authorization":"Bearer " + localStorage.getItem("token")}})
        .then(response=>{
          console.log(response);
          window.location.reload();

        })

     
     
     
    }
 }

};
</script>
<style scoped>
.bloc-modale {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
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
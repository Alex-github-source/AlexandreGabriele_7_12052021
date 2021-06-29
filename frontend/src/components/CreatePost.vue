<template>
  <div>
    <div class="block-post">
      <h3>Créer un post</h3>
      <form>
        <div class="input-group mb-3">
          <label for="message">Racontez nous quelquechose:</label>
          <br />
          <input v-model="message" class="input-text" id="message" type="textarea" />
          <br/>
          <br/>
          <label for="message">Mettez nous votre lien:</label>
          <br />
          <input v-model="link" class="input-link" id="message" type="text" />
          </div>

        

        
        <button type="submit" class="btn btn-primary" @click.prevent="submitForm" > Poster </button>
      </form>
    </div>
  </div>
</template>

<script>


import axios from "axios";
export default {
  name: "CreatePost",
  data() {
    return {
        message: null,
        link: null
    ,
      msgError: ""
    };
  },
  computed: {
  },
  methods: {
    submitForm() {
      const FD = new FormData();
      FD.append("message", this.message);
      if (this.link !== null) {
        FD.append("link", this.link);
      }
      FD.append("userId",localStorage.getItem('userId'));
              const body=Object.fromEntries(FD.entries());

        const postData = JSON.stringify(body);


      axios.post("http://localhost:3000/api/posts/create",postData,{ headers: {'Content-type' : 'application/json',"Authorization":"Bearer " + localStorage.getItem("token")}})
        .then(response=>{
          console.log(response);
          window.location.reload();

        })

     
     
     
    }
  }
  
  
};
</script>

<style>
.input-text {
height: 200px;
  width: 500px;
}
.input-link{
  width: 350px;
  height: 20px;
}
.block-post{
  display:flex;
  flex-direction: column;
}
.input-group{
  display:flex;
  flex-direction:column;
  justify-content:center;
}
</style>
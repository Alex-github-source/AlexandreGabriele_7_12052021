<template>
  <div>
    <div class="block-post">
      <h3>Créer un post</h3>
      <form>
        <div class="input-group mb-3">
          <label for="message">Racontez nous quelquechose:</label>
          <br />
          <input
            v-model="message"
            class="input-text"
            id="message"
            type="textarea"
            name="message"
          />
          <br />
          <br />
          <label for="link">Mettez nous votre lien:</label>
          <br />
          <input
            type="text"
            v-model="link"
            class="upload"
            id="link"
            name="link"
          />

          <label for="image" class="pr-3">Image</label>

          <input
            @change="uploadImage"
            type="file"
            aria-label="image input"
            accept="image/png, image/jpeg,image/bmp, image/gif"
            ref="file"
            name="image"
          />
        </div>
        <div v-if="picture" class="create-post__picture">
          <el-image :src="picture"></el-image>
        </div>

        <button
          type="submit"
          class="btn btn-primary"
          @click.prevent="submitForm"
        >
          Poster
        </button>
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
      message: "",
      link: "",
      file: "",
      picture: "",

      msgError: "",
    };
  },
  computed: {},
  methods: {
    uploadImage() {
      this.file = this.$refs.file.files[0];
    },

    submitForm() {
      const FD = new FormData();
      FD.append("message", this.message);
      if (this.link !== null) {
        FD.append("link", this.link);
      }
      if (this.file !== null) {
        FD.append("image", this.file);
      }
      FD.append("userId", localStorage.getItem("userId"));

      axios
        .post("http://localhost:3000/api/posts/create", FD, {
          headers: {
            "Content-type": "mutlipart/form-data",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((response) => {
          console.log(response);
           window.location.reload();
        });
    },
  },
};
</script>

<style>
.input-text {
  height: 200px;
  width: 100%;
}
.input-link {
  width: 350px;
  height: 20px;
}
.block-post {
  display: flex;
  flex-direction: column;
}
.input-group {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
</style>
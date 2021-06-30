<template>
  <div class="card mb-4 w-75 mx-auto">
    <div class="card-header d-flex justify-content-between">
      <div>
        Post by <em class="text-secondary">{{ post.User.pseudo }}</em>
        <span> {{ post.createdAt | moment("from", "now") }}</span>
      </div>

      <div v-if="this.isAdmin === 'true' || userId == post.User.id">
        <modale
          :postId="post.id"
          v-bind:revele="revele"
          v-bind:toggleModale="toggleModale"
        ></modale>
        <div class="btn btn-primary" v-on:click="toggleModale">
          Modifier le post
        </div>
        <div class="btn btn-danger" v-on:click="deletePost(postId)">
          Supprimer le post
        </div>
      </div>
    </div>
    <div class="card-img-top">
      <img
        v-if="post.imageUrl"
        :src="post.imageUrl"
        alt="image postée"
        :max-height="100"
        :max-width="100"
      />
    </div>
    <div class="card-body">
      <div class="card-text" v-if="post.message !== 'null'">
        <p class="mb-0 message">{{ post.message }}</p>
        <a :href="'http://' + postLink" class="mb-0">{{ postLink }}</a>
      </div>

      <div class="block-comment">
        <div>
          <h3>Commentaires:</h3>
        </div>
        <div
          class="last-comment"
          v-for="comment in post.Comments"
          v-bind:key="comment.id"
        >
          <div class="user-comment">
            <p class="name">{{ comment.User.pseudo }}:</p>
            <p class="comment-content">{{ comment.message }}</p>
          </div>
          <div
            v-if="isAdmin === 'true' || userId == comment.UserId"
            class="delete btn btn-danger"
            v-on:click="
              deleteComment(postId, comment.id, user.id, comment.UserId)
            "
          >
            Supprimer le commentaire
          </div>
        </div>
      </div>
    </div>
    <Comment :postId="post.id"></Comment>
  </div>
</template>
<script>
import axios from "axios";
import { mapState } from "vuex";
import Modale from "./ModifyPost";
import Comment from "./Comment";
export default {
  name: "Post",
  components: {
    modale: Modale,
    Comment,
  },
  data() {
    return {
      postId: "",
      revele: false,
      isAdmin: localStorage.getItem("isAdmin"),
      userId: localStorage.getItem("userId"),
      postLink: "",
    };
  },
  created: function () {
    let id = this.post.id;
    let self = this;
    axios
      .get("http://localhost:3000/api/posts/" + id, {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      })
      .then((res) => {
        self.postLink = res.data.link;
        self.postId = res.data.id;
      })
      .catch((error) => {
        console.log(error);
      });
  },
  computed: {
    ...mapState(["user"]),
  },
  props: {
    post: {
      type: Object,
      required: true,
    },
  },
  methods: {
    toggleModale() {
      this.revele = !this.revele;
    },
    deleteComment(postId, commentId) {
      axios
        .delete(
          "http://localhost:3000/api/posts/" +
            postId +
            "/comments/" +
            commentId,
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        )
        .then((response) => {
          console.log(response);
          window.location.reload();
        })
        .catch((error) => {
          window.alert(error);
        });
    },

    deletePost(n) {
      n = this.postId;
      let confirmUserDeletion = confirm(
        "voulez-vous vraiment supprimer ce post?"
      );
      if (confirmUserDeletion == true) {
        axios
          .delete("http://localhost:3000/api/posts/" + n, {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          })
          .then((res) => {
            console.log(res);
            alert("Cliquez sur ok et le post sera supprimé");
            window.location.reload();
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        return;
      }
    },
  },
};
</script>

<style scoped>
.message {
  font-size: 1.3rem;
}
img {
  width: 200px;
}
.comment-content {
  text-align: center;
  width: 450px;
}
#last-comment {
  display: flex;
  flex-direction: column;
  width: 90%;
  margin: 0 0 20px 28px;
  background-color: #b1a7a6;
  border-radius: 10px;
}
#last-comment {
  background-color: #ffffff;
}
.delete {
  display: flex;
  text-align: end;
  justify-content: center;
  align-items: center;
  padding: 0 5px 5px 0;
}
.last-comment {
  display: flex;
  flex-direction: column;
}
.user-comment {
  display: flex;
  justify-content: center;
  align-items: center;
}
.name {
  font-size: 1.2rem;
}
</style>
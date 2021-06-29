<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.svg">
    <Title msg="Viens partager du fun avec tes collègues !!"/>
  </div>
</template>

<script>
// @ is an alias to /src
import Title from '@/components/Title.vue'

export default {
  name: 'Home',
  components: {
    Title
  }
}
</script>

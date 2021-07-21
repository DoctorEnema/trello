<template>
  <section class="home">
    <div class="background"></div>
    <div class="home-logo">
      <img src="@/assets/img/yuumi-head3.png" />
      <h1>Yuulo</h1>
    </div>
      <div class="yuumi-container">
        <yuumi></yuumi>
      </div>
    <div class="hero">
      <h2>Yuulo helps you stay organized and be productive.</h2>
      <br>
      <h3>"You and me? We got this!"</h3>
      <button>Try it as a guest</button>
      <h3>or</h3>
    <login-user></login-user>
    </div>
  </section>
</template>

<script>
// @ is an alias to /src
import loginUser from "../cmps/login-user.vue";
import yuumi from "../cmps/yuumi.vue";
export default {
  name: "home",
  components: {
    loginUser,
    yuumi,
  },
  created(){
    this.$store.commit({type:'clearBaord'})
  },
  mounted() {
    document.title = `Yuulo - Home`;
  },
};
</script>

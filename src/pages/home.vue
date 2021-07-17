<template>
  <section>
    <h2>Home</h2>
    <login-user></login-user>
  </section>
</template>

<script>
// @ is an alias to /src
import loginUser from "../cmps/login-user.vue";

export default {
  name: "home",
  components: {
    loginUser
  },
};
</script>

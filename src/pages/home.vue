<template>
  <section class="home">
    <header class="home-header">
      <div class="home-logo">
        <img src="@/assets/img/yuumi-head3.png" />
        <h1>Yuulo</h1>
      </div>
      <div class="home-header-user" v-if="loggedinUser">
        <h3>Hello, {{ loggedinUser.fullname }}</h3>
        <button @click="logout">Logout</button>
      </div>
      <div v-else class="home-header-btns">
        <button @click="loginPage">Log in</button>
        <button @click="signupPage">Sign up</button>
      </div>
    </header>
    <div class="background"></div>
    <div class="yuumi-container">
      <yuumi></yuumi>
    </div>
    <div v-if="userOrModal" class="hero">
      <h2>Yuulo helps you stay organized and be productive.</h2>
      <h3>"You and me? We got this!"</h3>
      <button @click="loginAsGuest">Try it as a guest</button>
    </div>
      <login-user @closeModal="displayModal=false" v-if="displayModal" :isSignup="isSignup"></login-user>
      <div v-if="loggedinUser">
        <div class="board-display" v-for="board in boards" :key="board._id">
          <button >
            <img v-if="board.style.backgroundImg" :src="board.style.backgroundImg">
            <div v-else :style="{backgroundColor:board.style.backgroundColor}"></div>
          </button>
        </div>
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
  data() {
    return {
      displayModal: false,
      isSignup: false,
    };
  },
  computed: {
    loggedinUser() {
      return this.$store.getters.loggedinUser;
    },
    userOrModal(){
      if (this.loggedinUser || this.displayModal) return false
      else return true
    },
    boards(){
      return this.$store.getters.boards
    }
  },
  methods: {
    loginPage() {
      this.displayModal = true;
      this.isSignup = false;
    },
    signupPage() {
      this.displayModal = true;
      this.isSignup = true;
    },
    async loginAsGuest() {
      try {
        const user = await this.$store.dispatch({
          type: "login",
          userCred: { username: "Guest", password: "1234" },
        });
        this.$store.dispatch({ type: "loadUserCardWatch", userId: user._id });
      } catch (err) {
        console.log("cannot login", err);
      }
    },
    logout() {
      this.$store.dispatch({ type: "logout" });
    },
  },
  created() {
    this.$store.commit({ type: "clearBaord" });
    this.$store.dispatch('loadBoards')
  },
  mounted() {
    document.title = `Yuulo - Home`;
  },
};
</script>

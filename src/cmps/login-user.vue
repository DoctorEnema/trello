<template>
  <div class="login">
    <section v-if="loggedInUser">
      Hello {{ loggedInUser.fullname }}
      <button @click="logout">Logout</button>
    </section>
    <section v-else>
      <form @submit.prevent="signup">
        <h2>Signup</h2>
        <input
          type="text"
          placeholder="Your full name"
          v-model="credentials.fullname"
        />
        <input
          type="text"
          placeholder="username"
          v-model="credentials.username"
        />
        <input
          type="password"
          placeholder="password"
          v-model="credentials.password"
        />
        <button>Signup</button>
      </form>
      <form @submit.prevent="login">
        <h2>Login</h2>
        <input
          type="text"
          placeholder="username"
          v-model="credentials.username"
        />
        <input
          type="password"
          placeholder="password"
          v-model="credentials.password"
        />
        <button>Login</button>
      </form>
    </section>
  </div>
</template>

<script>
// @ is an alias to /src
import { socketService } from "../services/socket-service";
import { userService } from "../services/user-service";

export default {
  components: {},
  data() {
    return {
      credentials: {
        username: "Mosh@Mosh.com",
        password: "mosh123",
        fullname: "Mosho mosho",
        imgUrl: "",
        mentions: [{}],
      },
      // loggedInUser: this.$store.getters.loggedinUser
    };
  },
  async created() {
    //loggs in a user automatically
    try {
      const user = await this.$store.dispatch({
        type: "login",
        userCred: this.credentials,
      });
      // socketService.emit("user-watch", user._id);
      this.$store.dispatch({type: 'loadUserCardWatch', userId: user._id})
    } catch (err) {
      console.log("cannot login", err);
    }
  },
  computed: {
    loggedInUser() {
      return this.$store.getters.loggedinUser;
    },
  },
  methods: {
    async login() {
      try {
        const user = await this.$store.dispatch({
          type: "login",
          userCred: this.credentials,
        });
        // socketService.emit("user-watch", user._id);
        this.$store.dispatch({type: 'loadUserCardWatch', userId: user._id})
      } catch (err) {
        console.log("cannot login", err);
      }
    },
    async signup() {
      try {
        const user = await this.$store.dispatch({
          type: "signup",
          userCred: this.credentials,
        });
        // socketService.emit("user-watch", user._id);
        this.$store.dispatch({type: 'loadUserCardWatch', userId: user._id})
      } catch (err) {
        console.log("cannot signup", err);
      }
    },
    logout() {
      this.$store.dispatch({ type: "logout" });
    },
  },
};
</script>

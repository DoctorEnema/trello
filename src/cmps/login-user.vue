<template>
  <div class="login">
    <section v-if="loggedInUser">
      Hello {{ loggedInUser.fullname }}
      <button @click="logout">Logout</button>
    </section>
    <section v-else>
      <form @submit.prevent="signup">
        <h2>Signup</h2>
        <label>
          Full name: 
        <input
          type="text"
          placeholder="Enter full name"
          v-model="signupCred.fullname"
        /> 
        <label>
        </label>
          Username: 
        <input
          type="text"
          placeholder="Enter username"
          v-model="signupCred.username"
        />
          </label> 
        <label>
          Email: 
        <input
          type="email"
          placeholder="Enter email"
          v-model="signupCred.email"
        />
        </label>
        <label>
          Password: 
        <input
          type="text"
          placeholder="Enter password"
          v-model="signupCred.password"
        />
        </label>
        <button>Signup</button>
      </form>
      <form @submit.prevent="login">
        <h2>Login</h2>
        <label>
          Username: 
        <input
          type="text"
          placeholder="Enter username"
          v-model="credentials.username"
        />
        </label>
        <label>
          Password: 
        <input
          type="text"
          placeholder="Enter password"
          v-model="credentials.password"
        />
        </label>
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
        username: "Guest",
        password: "1234",
      },
      signupCred: {
        username: "shimi",
        password: "1234",
        fullname: "Shimi Balili",
        email:"shimi@balili.com",
      }
      // loggedInUser: this.$store.getters.loggedinUser
    };
  },
  async created() {
    //loggs in a user automatically
    // try {
      // const user = await this.$store.dispatch({
      //   type: "login",
      //   userCred: this.credentials,
      // });
      // socketService.emit("user-watch", user._id);
      // this.$store.dispatch({type: 'loadUserCardWatch', userId: user._id})
    // } catch (err) {
    //   console.log("cannot login", err);
    // }
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
        this.$store.dispatch({type: 'loadUserCardWatch', userId: user._id})
      } catch (err) {
        console.log("cannot login", err);
      }
    },
    async signup() {
      try {
        const user = await this.$store.dispatch({
          type: "signup",
          userCred: this.signupCred,
        });
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

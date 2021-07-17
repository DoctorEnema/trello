<template>
  <div class="login">
         <section v-if="loggedInUser">
            Hello {{loggedInUser.fullname}}
            <button @click="logout">Logout</button>
        </section>
    <section v-else >
     <form @submit.prevent="signup">
            <h2>Signup</h2>
            <input type="text" placeholder="Your full name" v-model="credentials.fullname" />
            <input type="text" placeholder="username" v-model="credentials.username" />
            <input type="password" placeholder="password" v-model="credentials.password" />
            <button>Signup</button>
        </form>
        <form  @submit.prevent="login">
          <h2>Login</h2>
            <input type="text" placeholder="username" v-model="credentials.username" />
            <input type="password" placeholder="password" v-model="credentials.password" />
            <button>Login</button>
        </form>
    </section>
  </div>
</template>

<script>
// @ is an alias to /src


export default {
  components: {
    
  },
  data() {
        return {
            credentials: { 
              username: 'Mosho@ababmi.com',
               password: 'Mosho123',
               fullname: 'Mosho mosho',
               imgUrl:'',
               mentions:[{}]

                },
            // loggedInUser: this.$store.getters.loggedinUser
        }
    },
    computed:{
      loggedInUser(){
        return this.$store.getters.loggedinUser
      }
    },
methods:{
    login(){
      this.$store.dispatch({type:"login", userCred:this.credentials})
    },
    signup(){
      this.$store.dispatch({type:"signup", userCred:this.credentials})
    },
    logout(){
      this.$store.dispatch({type:"logout"})
    }
}
}

</script>

<template>
  <section class="add-to-card">
    <section class="add-member">
      <header class="header-add-member">
    <h4>Members</h4>
    <button @click="closeModal">X</button>
      </header>
    <input ref="searchInput"  type="text" placeholder="Search members">
    <ul>
      <h4>BOARD MEMBERS</h4>
      <li class="user-member" v-for="user in users" :key="user._id">
        <button @click="addUser(user)">
        <img :src="user.imgUrl">
        {{user.fullname}}({{user.username}})
        </button>
      </li>
    </ul>
    </section>
  </section>
</template>

<script>
export default {
  data() {
    return {};
  },
  created() {
    this.$store.dispatch({ type: "loadUsers" });
  },
  mounted() {
    this.$refs.searchInput.focus();
  },
  methods: {
    closeModal() {
      this.$emit("closeModal");
    },
    addUser(user){
      this.$emit("addUser", user)
    }
  },
  computed: {
    users() {
      return this.$store.getters.users;
    },
  },
};
</script>

<style>
</style>
<template>
  <section class="add-to-card">
    <section class="add-checklist">
      <header class="add-label-header">
        <span class="add-label-title">Add checklist</span>
        <button @click="closeModal">X</button>
      </header>
      <hr />
      <div>
        <form @submit.prevent="setList(), closeModal()" >
          <label for="checklist">Title</label>
          <input ref="check" id="checklist" v-model="listname" type="text" />
          <button>Add</button>
        </form>
      </div>
    </section>
  </section>
</template>

<script>
export default {
  created() {},
  mounted() {
    this.$refs.check.focus();
  },
  data() {
    return {
      listname: "Checklist",
    };
  },
  methods: {
    setList() {
      // console.log('listAdded')
      this.$emit("listAdded", this.listname);
    },
    closeModal() {
      this.$emit("closeModal");
    },
  },
};
</script>

<style>
</style>
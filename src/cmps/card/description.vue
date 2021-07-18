<template>
  <section class="description">
    <div class="description-header">
      <h4>Description</h4>
      <button class="control-btn" v-if="card.description">Edit</button>
    </div>
    <textarea
      oninput='this.style.height = "";this.style.height = this.scrollHeight + "px"'
      :style="isTyped"
      spellcheck="false"
      v-model="desc"
      @focus="isActive = true"
      @blur="setDesc"
      placeholder="Add a more detailed description..."
    ></textarea>
    <div v-if="this.isActive" class="description-controls">
      <button @click.stop="setDesc">Save</button>
      <button @focus="isActive = false"></button>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    card: Object,
  },
  data() {
    return {
      isActive: false,
      desc: this.card.description || "",
    };
  },
  computed: {
    isTyped() {
      if (this.desc !== "" && !this.isActive)
        return "backgroundColor:transparent";
    },
  },
  methods: {
    setDesc() {
      this.isActive = false;
      this.$emit("setDesc", this.desc);
    },
  },
};
</script>

<style>
</style>
<template>
  <section class="add-to-card">
    <section class="add-label">
      <h1>Hello Lable</h1>
      <header class="add-label-header">
        <span class="add-label-title"></span>
        <button @click="resetModals">X</button>
      </header>
      <ul>
        <li class="card-label" v-for="label in labels" :key="label" >
          <span class="label" :style="'background-color:'+ label"><span class="label-name"></span><span class="icon"></span></span>
          <a href="#">edit icon</a>
        </li>
      </ul>
    </section>
  </section>
</template>

<script>
export default {
  data() {
    return {
      labels:['#61bd4f', '#ff9f1a', '#eb5a46', '#c377e0', '#0079bf', '#00c2e0'],
      editLabels:['#61bd4f', '#ff9f1a', '#eb5a46', '#c377e0', '#0079bf', '#00c2e0']
    };
  },
  methods: {
    resetModals() {
      this.$emit("closeModals");
    },
  },
};
</script>

<style>
ul {
  list-style: none;
}

.card-label {
  display: inline-block;
  width: 100px;
  height: 30px;
  list-style: none;
}

.label {
  display: inline-block;
  width: 80px;
  height: 30px;
}

</style>
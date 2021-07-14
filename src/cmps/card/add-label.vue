<template>
  <section ref="page" tabindex="0" class="add-to-card">
    <section class="add-label">
      <header class="add-label-header">
        <span class="add-label-title">Labels</span>
        <button @click="resetModals">X</button>
      </header>
      <div class="actions-container"></div>
      <div class="choose-label">
        <input ref="searchInput" type="text" placeholder="Search labels..." />
        <h4>LABELS</h4>
        <ul>
          <li class="card-label" v-for="label in labels" :key="label">
            <span class="label" :style="'background-color:' + label"
              ><span class="label-name"></span><span class="icon"></span
            ></span>
            <!-- <button tabIndex="0" @click="setLabel(label)">edit icon</button> -->
            <a href="#">edit icon</a>
          </li>
        </ul>
        <button>Create new label</button>
      </div>
      <div class="create-label">
        
      </div>
    </section>
  </section>
</template>

<script>
export default {
  created() {},
  mounted() {
    this.$refs.searchInput.focus();
  },
  data() {
    return {
      labels: [
        "#61bd4f",
        "#ff9f1a",
        "#eb5a46",
        "#c377e0",
        "#0079bf",
        "#00c2e0",
      ],
      editLabels: [
        "#61bd4f",
        "#ff9f1a",
        "#eb5a46",
        "#c377e0",
        "#0079bf",
        "#00c2e0",
      ],
    };
  },
  methods: {
    resetModals() {
      console.log(this.$refs.page);
      this.$emit("closeModals");
    },
    setLabel(label) {
      this.$emit("labelClicked", label);
    },
  },
};
</script>

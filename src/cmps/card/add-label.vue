<template>
  <section ref="page" tabindex="0" class="add-to-card">
    <section class="add-label">
      <header class="add-label-header">
        <span class="add-label-title">Labels</span>
        <button @click="resetModals">X</button>
      </header>
      <div class="actions-container"></div>
      <div v-if="!isCreate" class="choose-label">
        <input ref="searchInput" type="text" placeholder="Search labels..." />
        <h4>LABELS</h4>
        <ul>
          <li
            class="card-label"
            v-for="(label, idx) in labels"
            :key="idx"
            @click="setLabel(label.color)"
          >
            <span class="label" :style="'background-color:' + label.color"
              ><span class="label-name">{{ label.name }}</span
              ><span class="icon"></span
            ></span>
            <!-- <button tabIndex="0" @click="setLabel(label)">edit icon</button> -->
            <a href="#">edit icon</a>
          </li>
        </ul>
        <button @click="createLabel">Create new label</button>
      </div>
      <div v-else class="create-label">
        <form @submit.prevent="setLabel(), createLabel()">
          <label for="name">Name</label>
          <input id="name" ref="name" type="text" v-model="pickedLabel.name" />
          <ul>
            <li
              class="card-label-color"
              v-for="(label, idx) in editLabels"
              :key="idx"
              :style="'background-color:' + label"
            @click="pickedLabel.color = label">
              <span class="icon"></span>
            </li>
          </ul>
          <div>
            <button>Create</button>
          </div>
        </form>
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
        {
          name: null,
          color: "#61bd4f",
        },
        {
          name: null,
          color: "#ff9f1a",
        },
        {
          name: null,
          color: "#eb5a46",
        },
        {
          name: null,
          color: "#c377e0",
        },
        {
          name: null,
          color: "#0079bf",
        },
        {
          name: null,
          color: "#00c2e0",
        },
      ],
      editLabels: [
        "#61bd4f",
        "#f2d600",
        "#ff9f1a",
        "#eb5a46",
        "#c377e0",
        "#0079bf",
        "#00c2e0",
        "#51e898",
        "#ff78cb",
        "#344563",
      ],
      isCreate: false,

      pickedLabel: {
        name: null,
        color: "#344563",
      },
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
    createLabel() {
      if (this.isCreate) {
        this.labels.push({...this.pickedLabel});
        // return
      }
        this.isCreate = !this.isCreate;
      if (!this.isCreate) return;
      this.$nextTick(() => {
        this.$refs.name.focus();
      });
    },
  },
};
</script>

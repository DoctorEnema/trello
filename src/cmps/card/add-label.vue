<template>
  <section ref="page" tabindex="0" class="add-to-card">
    <section class="add-label">
      <header class="add-label-header">
        <button v-if="isCreate" @click="onClickBack">Back</button>
        <span class="add-label-title">Labels</span>
        <button @click="closeModal">X</button>
      </header>
      <div class="actions-container"></div>
      <div v-if="!isCreate" class="choose-label">
        <input ref="searchInput" type="text" placeholder="Search labels..." />
        <h4>LABELS</h4>
        <ul>
          <li
            class="card-label"
            v-for="(label, idx) in selectedBoard.labels"
            :key="idx"
          >
            <span
              class="label"
              :style="'background-color:' + label.color"
              @click="setLabel(label.id)"
              ><span class="label-name">{{ label.name }}</span
              ><span class="icon"></span
            ></span>
            <!-- <button tabIndex="0" @click="setLabel(label)">edit icon</button> -->
            <!-- <button @click="openEditor"></button> -->
            <a href="#" @click="editLabel(label)">Edit label</a>
          </li>
        </ul>
        <button class="button" @click.stop="createLabel" type="button">
          Create new label
        </button>
      </div>
      <div v-else class="create-label">
        <form @submit.prevent="createLabel()">
          <div v-if="!isEdit">
            <label for="name">Name</label>
            <input
              id="name"
              ref="name"
              type="text"
              v-model="pickedLabel.name"
            />
          </div>
          <div v-else>
            <label for="name">Name</label>
            <input
              id="name"
              ref="nameEdit"
              type="text"
              v-model="labelToEdit.name"
            />
          </div>
          <ul>
            <li
              class="card-label-color"
              v-for="(label, idx) in editLabels"
              :key="idx"
              :style="'background-color:' + label"
              @click="pickedLabel.color = label"
            >
              <span class="icon"></span>
            </li>
          </ul>
          <div v-if="isEdit">
            <button @click.prevent="saveEditedLabel">Save</button>
            <button @click.prevent>Delete</button>
          </div>
          <div v-else>
            <button>Create</button>
          </div>
        </form>
      </div>
    </section>
  </section>
</template>

<script>
import { utilService } from "../../services/util-service";
export default {
  components: {
    utilService,
  },
  created() {},
  mounted() {
    //  this.$refs.page.focus();
    this.$refs.searchInput.focus();
  },
  data() {
    return {
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
      isEdit: false,
      pickedLabel: {
        id: null,
        name: null,
        color: "#344563",
        isPicked: true,
      },
      labelToEdit: null,
    };
  },
  computed: {
    selectedBoard() {
      // return this.$store.getters.selectedBoard;
      return JSON.parse(JSON.stringify(this.$store.getters.selectedBoard));
    },
  },
  methods: {
    closeModal() {
      this.$emit("closeModal");
    },
    setLabel(label) {
      this.$emit("setLabel", label);
    },
    createLabel() {
      if (this.isCreate) {
        this.pickedLabel.id = utilService.makeId();
        const pickedLabelCopy = JSON.parse(JSON.stringify(this.pickedLabel));
        this.$emit("createLabel", pickedLabelCopy);
        this.setPickedLabelEmpty();

        //  this.setLabel(this.pickedLabel.id)
        // this.labels.push({...this.pickedLabel});
        // return
      }
      this.isCreate = !this.isCreate;
      if (!this.isCreate) return;
      this.$nextTick(() => {
        this.$refs.name.focus();
      });
    },
    editLabel(label) {
      this.isCreate = !this.isCreate;
      this.isEdit = !this.isEdit;
      this.labelToEdit = label;
      console.log(this.labelToEdit);
      this.$nextTick(() => {
        this.$refs.nameEdit.focus();
        this.$refs.nameEdit.select();
      });
    },
    saveEditedLabel() {
      const label = this.labelToEdit;
      console.log(label);
    },
    setPickedLabelEmpty() {
      (this.pickedLabel.id = null),
        (this.pickedLabel.name = null),
        (this.pickedLabel.color = "#344563"),
        (this.pickedLabel.isPicked = true);
    },
    onClickBack() {
      this.isCreate = false;
      this.isEdit = false;
    },
  },
};
</script>

<template>
  <section class="checklist">
    <h3>{{ checklist.title }}</h3>
    <ul>
      <li v-for="(todo, idx) in checklist.todos" :key="idx">
        <input
          type="checkbox"
          @click="checkTodo(todo)"
          :checked="todo.isDone"
        />
        <div>
          <span>{{ todo.title }}</span>
        </div>
      </li>
    <div>
      <button v-if="!addMode" @click="setAddMode">Add an item</button>
    </div>
    </ul>
    <section v-if="addMode">
      <textarea v-model="todo.title" placeholder="Add an item"></textarea>
      <button class="add-btn" @click="addTodo">Add</button>
      <button @click="setAddMode">X</button>
    </section>
  </section>
</template>

<script>
import { boardService } from "../../services/board-service.js";
export default {
  props: {
    checklist: Object,
  },
  data() {
    return {
      todo: boardService.getEmptyTodo(),
      addMode: false,
    };
  },
  methods: {
    checkTodo(todo) {
      todo.isDone = !todo.isDone;
      this.$emit("addTodo", this.checklist);
    },
    setAddMode() {
      // this.$emit("isAddModeOn");
      if (this.isChecklistAddOpen) {
        this.addMode = false
      }
      this.$store.commit({ type: "setTextarea" });
      this.addMode = !this.addMode;
    },
    addTodo() {
      if (!this.todo.title) return;
      this.checklist.todos.push({ ...this.todo });
      this.$emit("addTodo", this.checklist);
      this.todo = boardService.getEmptyTodo();
    },
  },
  computed: {
    isChecklistAddOpen() {
      this.$store.getters.isTextareaOpen;
    },
  },
};
</script>

<style>
</style>
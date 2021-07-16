<template>
  <section class="checklist">
    <h3>{{ checklist.title }}</h3> 
    <button @click="removeList">Delete</button>
    <ul>
      <li v-for="todo in checklist.todos" :key="todo.id">
        <todo-preview @editTodo="editTodo" :todo="todo"></todo-preview>
      </li>
    </ul>
    <div>
      <button v-if="!addMode" @click="openTextarea">Add an item</button>
    </div>
    <section class="todo-add" v-if="addMode">
      <textarea v-model="todo.title" placeholder="Add an item"></textarea>
      <button class="add-btn" @click="addTodo">Add</button>
      <button @click="closeTextarea">X</button>
    </section>
  </section>
</template>

<script>
import { boardService } from "../../services/board-service.js";
import todoPreview from "./todo-preview";

export default {
  props: {
    checklist: Object,
  },
  components: {
    todoPreview,
  },
  mounted() {
    this.$root.$on("checklistTextClose", () => {
      this.addMode = false;
    });
  },
  destroyed() {
    this.$root.$off("checklistTextClose");
  },
  data() {
    return {
      todo: boardService.getEmptyTodo(),
      addMode: false,
    };
  },
  methods: {
    openTextarea() {
      this.$root.$emit("checklistTextClose");
      this.addMode = true;
    },
    closeTextarea() {
      this.addMode = false;
    },
    addTodo() {
      if (!this.todo.title) return;
      this.checklist.todos.push({ ...this.todo });
      this.$emit("addTodo", this.checklist);
      this.todo = boardService.getEmptyTodo();
      console.log("check added", this.checklist);
    },
    editTodo(todo) {
      const idx = this.checklist.todos.findIndex((t) => t.id === todo.id);
      this.checklist.todos.splice(idx, 1, todo);
      this.$emit("addTodo", this.checklist);
    },
    removeList() {
      this.$emit('removeList', this.checklist.id)
    }
  },
};
</script>

<style>
</style>
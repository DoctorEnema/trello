<template>
  <section class="checklist">
    <h3>{{ checklist.title }}</h3>
    <button @click="removeList">Delete</button>
    <div>
      <div class="progress-bar">
        <div class="bar" :style="'width:' + complete">
          <div class="precentage">{{ complete }}</div>
        </div>
      </div>
    </div>
    <ul>
      <li v-for="todo in checklist.todos" :key="todo.id">
        <todo-preview @editTodo="editTodo" :todo="todo">
          <template v-slot:edit>
            <button>...</button>
          </template>
        </todo-preview>
        
      </li>
    </ul>
    <div>
      <button v-if="!addMode" @click="openTextarea">Add an item</button>
    </div>
    <section class="todo-add" v-if="addMode">
      <textarea
        ref="textarea"
        v-model="todo.title"
        placeholder="Add an item"
      ></textarea>
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
      this.$nextTick(() => {
        this.$refs.textarea.focus();
        this.$refs.textarea.select();
      });
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
      this.$emit("removeList", this.checklist.id);
    },
  },
  computed: {
    complete() {
      var todosLength = this.checklist.todos.length;
      var complete = this.checklist.todos.filter((todo) => todo.isDone);
      if (!complete.length) return "0%";
      return parseInt((complete.length / todosLength) * 100) + "%";
    },
  },
};
</script>

<style>
</style>
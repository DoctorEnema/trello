<template>
  <section class="checklist">
    <h3>{{ checklist.title }}</h3>
    <ul>
      <li v-for="todo in checklist.todos" :key="todo.id">
        <!-- {{todo.id}} -->
        <!-- <div v-if="currTodo"> -->
        <div v-if="!todo.isEdit" class="todo">
          <input
            type="checkbox"
            @click="checkTodo(todo)"
            :checked="todo.isDone"
          />
          <span @click="setCurrTodo(todo)">{{ todo.title }}</span>
        </div>
        <!-- </div> -->
        <div v-if="currTodo" class="todo-edit">
          <div v-if="currTodo.id === todo.id">
            <textarea v-model="currTodo.title"></textarea>
            <button @click="editTodo">Save</button>
            <button>X</button>
          </div>
        </div>
      </li>
      <div>
        <button v-if="!addMode" @click="openTextarea">Add an item</button>
      </div>
      <!-- <todo-preview></todo-preview> -->
    </ul>
    <section class="todo-add" v-if="addMode">
      <textarea v-model="todo.title" placeholder="Add an item"></textarea>
      <button class="add-btn" @click="addTodo">Add</button>
      <button @click="closeTextarea">X</button>
    </section>
  </section>
</template>

<script>
import { boardService } from "../../services/board-service.js";
// import todoPreview from './card/todo-preview.js';

export default {
  props: {
    checklist: Object,
  },
  components: {
    // todoPreview
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
      currTodo: null,
      addMode: false,
      editMode: false,
    };
  },
  methods: {
    checkTodo(todo) {
      todo.isDone = !todo.isDone;
    },
    openTextarea() {
      this.$root.$emit("checklistTextClose");
      this.addMode = true;
    },
    closeTextarea() {
      this.addMode = false;
    },
    setCurrTodo(todo) {
      if (this.currTodo) this.currTodo.isEdit = false;
      todo.isEdit = true;
      this.currTodo = todo;
    },
    // openEditarea() {
    //   this.$root.$emit("checklistTextClose");
    //   this.addMode = true;
    // },
    // closeEditarea() {
    //   this.addMode = false;
    // },
    addTodo() {
      if (!this.todo.title) return;
      this.checklist.todos.push({ ...this.todo });
      this.$emit("addTodo", this.checklist);
      this.todo = boardService.getEmptyTodo();
      console.log('check added', this.checklist);
    },
    editTodo() {
      const todo = this.currTodo;
      if (!todo.title) return;
      const idx = this.checklist.todos.findIndex((t) => t.id === todo.id);
      this.checklist.todos.splice(idx, 1, todo);
      this.$emit("addTodo", this.checklist);
    },
  },
  computed: {
    isChecklistAddOpen() {
      this.$store.getters.isTextareaOpen;
    },
    card(){
      return this.$store.getters.selectedCard
    }
  },
};
</script>

<style>
</style>
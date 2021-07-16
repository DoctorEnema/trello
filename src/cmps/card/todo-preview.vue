<template>
  <section class="todo-preview-cmp">
        <div v-if="!editMode" class="todo">
          <input
            type="checkbox"
            @click="checkTodo(todo)"
            :checked="todo.isDone"
          />
          <span @click="setCurrTodo(todo)">{{ todo.title }}</span>
        </div>
        <div v-else class="todo-edit">
            <textarea v-model="currTodo.title"></textarea>
            <button @click="editTodo">Save</button>
            <button>X</button>
        </div>
  </section>
</template>

<script>
export default {
props: {
  todo: Object
},
mounted() {
this.$root.$on("isEditMode", () => {
      this.editMode = false
    });
},
destroyed() {
    this.$root.$off("isEditMode");
},
data() {
  return {
     currTodo: null,
     editMode: false,
  }
},
methods: {
  setCurrTodo(todo) {
      this.$root.$emit("isEditMode");
      this.currTodo = {...todo};
      this.editMode = !this.editMode
    },
    editTodo() {
      this.editMode = !this.editMode
      if (!this.currTodo.title) return;
      const todo = this.currTodo;
      this.$emit("editTodo", {...todo});
      this.currTodo = null;
    },
    checkTodo(todo) {
      todo.isDone = !todo.isDone;
      this.$emit('editTodo', todo)
    }
}
}
</script>

<style>

</style>
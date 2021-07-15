<template>
  <section class="checklist">
    {{checklist.title}}
    {{checklist}}
    <ul>
      <li v-for="(todo, idx) in checklist.todos" :key="idx">
        <input type="checkbox" @click="checkTodo(todo)" :checked="todo.isDone">
        {{todo.title}}
        <section>
          <textarea name="" id="" cols="30" rows="10"></textarea>
        </section>
      </li>
    </ul>
  </section>
</template>

<script>
import { boardService} from "../../services/board-service.js"
export default {
  props: {
    checklist: Object,
  },
  data(){
    return {
      todo: boardService.getEmptyTodo()
    }
  },
  methods:{
    checkTodo(todo) {
      todo.isDone= !todo.isDone
    }
  }
};
</script>

<style>
</style>
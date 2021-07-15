<template>
  <section v-if="card.labelIds" class="label-cmp">
     <h1>Label</h1>
     <ul class="label-container">
       <li  v-for="(label,idx) in card.labelIds" :key="idx">
         <span class="card-lable" :style="'background-color:' +  '#61bd4f'"  >a</span>
       </li>
     </ul>
  </section>
</template>

<script>
export default {
props: {
    card: Object
  },
}
</script>

<style>

</style>

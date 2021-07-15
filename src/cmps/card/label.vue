<template>
  <section v-if="card.labelIds" class="label-cmp">
     <h1>Label</h1>
     <ul class="label-container">
       <li  v-for="(label,idx) in card.labelIds" :key="idx">
         {{card.labelIds}}
         <span class="card-lable" :style="'background-color:' +  card.labelIds.color"  >a</span>
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

<template>
  <section v-if="card.labelIds" class="label-cmp">
       <button  v-for="(label,idx) in card.labelIds" :key="idx">
         {{card.labelIds}}
         <span class="card-label" :style="'background-color:'+card.labelIds.color"></span>
       </button>
     <button class="add-new-label"></button>
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

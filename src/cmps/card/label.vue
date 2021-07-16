<template>
  <section v-if="card.labelIds" class="label-cmp">
       <button  v-for="(label,idx) in card.labelIds" :key="idx" :style="{backgroundColor:label}">
        
         <!-- {{card.labelIds.name}} -->
         <span class="card-label"  > {{label}}</span>
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

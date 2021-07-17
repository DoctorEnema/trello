<template>
  <section>
      {{showTime}}
  </section>
</template>

<script>
export default {
props:{
    time:Number
},
computed:{
        showTime() {
            var actionLogged = this.time
            var now = Date.now()
            var time = now - actionLogged 
            if (time < 10000) return 'just now'
            if (time < 60000) return 'a few seconds ago'
            if (time < 3600000) return new Date(time).getMinutes() + ' minutes ago'
            if (time > 3600000 && time < 86400000) return new Date(time).getHours() + ' hours ago'
            else return 'a while ago'
        }
    }
}
</script>

<style>

</style>
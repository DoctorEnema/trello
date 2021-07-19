<template>
  <section>
    {{ showTime }}
  </section>
</template>

<script>
export default {
  props: {
    time: Number,
  },
  computed: {
    showTime() {
      var actionLogged = this.time;
      var now = Date.now();
      var time = now - actionLogged;
      var exactTime = `${new Date(actionLogged).getDate()}/${new Date(actionLogged).getMonth() + 1}/${new Date(actionLogged).getFullYear()} ${new Date(actionLogged).getHours()}:${new Date(actionLogged).getMinutes()}`
      if (time < 10000) return "just now";
      if (time < 60000) return "a few seconds ago";
      if (time < 3600000) return new Date(time).getMinutes() + " minutes ago";
      if (time > 3600000 && time < 86400000)
        return new Date(time).getHours() + " hours ago";
      else return exactTime;
    },
  },
};
</script>

<style>
</style>
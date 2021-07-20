
<template>
  <section class="notifications">
    Notifications
    <button @click="toggleNotifModal">X</button>
    <section v-if="!loggedinUser.notifications.length">
      No notifications to show
    </section>
    <section v-else class="activities">
      <button @click="clearNotifications">Clear</button>
      <div v-for="(notification, idx) in loggedinUser.notifications" :key="idx">
        <div class="activity">
          <div>
            <img
              v-if="notification.byMember.imgUrl"
              :src="notification.byMember.imgUrl"
            />
            <div v-else class="to-user activity-user">
              {{ notification.byMember.fullname }}
            </div>
          </div>
          <span class="member-name">{{ notification.byMember.fullname }}</span>
          <span><span> </span> {{ notification.txt }}</span>
          <show-time
            v-if="notification"
            class="activity-time"
            :time="notification.creatAt"
          ></show-time>
        </div>
      </div>
    </section>
  </section>
</template>

<script>
import showTime from "./card/show-time.vue";

export default {
  components: {
    showTime,
  },
  data() {
    return {
      isActive: false,
      activity: "",
    };
  },
  computed: {
    // selectedBoard() {
    //   return this.$store.getters.selectedBoard;
    // },
    // card() {
    //   return this.$store.getters.selectedCard;
    // },
    loggedinUser() {
      return this.$store.getters.loggedinUser;
    },
    // user() {
    //   return this.$store.getters.user;
    // },
  },
  methods: {
    clearNotifications() {
      this.$emit("clearNotifications", this.loggedinUser._id);
    },
    toggleNotifModal() {
      this.$emit('toggleNotifModal')
    }
  },
};
</script>

<style>
</style>
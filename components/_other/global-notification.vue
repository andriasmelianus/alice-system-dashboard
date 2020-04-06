<template>
  <v-snackbar v-model="show" bottom right :color="color">{{ message }}</v-snackbar>
</template>

<script>
export default {
  computed: {
    show: {
      get() {
        return this.$store.state.globalNotification.isShown;
      },
      set(isShown) {
        this.$store.commit("globalNotification/hide");
      }
    },

    color() {
      return this.$store.state.globalNotification.color;
    },

    message() {
      return this.$store.state.globalNotification.message;
    }
  }
};
</script>

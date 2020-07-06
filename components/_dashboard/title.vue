<template>
  <div class="d-flex flex-wrap align-center mt-2 mx-2">
    <dashboard-small-link v-if="dashboardLink"></dashboard-small-link>

    <slot name="buttons"></slot>

    <div class="mt-2 mx-2 text-h4 text-center">
      <slot name="default"></slot>
    </div>
  </div>
</template>

<script>
import DashboardSmallLink from "./widget/link-small-one";
export default {
  props: {
    dashboardLink: {
      type: Boolean,
      default: true
    }
  },

  components: {
    DashboardSmallLink
  }
};
</script>

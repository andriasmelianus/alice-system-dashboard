<template>
  <div class="font-weight-thin">
    <!-- <v-list-item>
      <v-list-item-avatar>
        <v-icon dense x-large>mdi-account-circle</v-icon>
      </v-list-item-avatar>

      <v-list-item-content>
        <v-list-item-title>{{ $auth.user.name }}</v-list-item-title>
        <v-list-item-subtitle>Selamat datang!</v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>-->
    Selamat datang {{ $auth.user.name }}!
  </div>
</template>

<script>
export default {};
</script>

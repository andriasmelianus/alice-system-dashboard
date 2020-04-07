<template>
  <v-menu offset-y close-on-click close-on-content-click :value="false">
    <template v-slot:activator="{ on }">
      <v-btn v-on="on" icon large>
        <v-avatar size="32px" item>
          <v-img src="https://cdn.vuetifyjs.com/images/logos/logo.svg" alt="Vuetify" />
        </v-avatar>
      </v-btn>
    </template>

    <v-list>
      <v-list-item>
        <v-list-item-avatar>
          <img v-if="$auth.user.id == 1" src="/avatar/system.png" alt="System" />
          <img v-else src="/avatar/empty.png" alt="Avatar" />
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title>{{ $auth.user.name }}</v-list-item-title>
          <v-list-item-subtitle>{{ $auth.user.username }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-list-item v-for="(item, index) in userMenu" :key="index" nuxt :to="item.url">
        <v-list-item-icon>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-icon>
        <v-list-item-title>{{ item.title }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
import { userMenuData } from "./bar-data";
export default {
  data: () => ({
    userMenu: userMenuData
  })
};
</script>

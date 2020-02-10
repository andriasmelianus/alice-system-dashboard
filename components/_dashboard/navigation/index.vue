<template>
  <v-list dense shaped>
    <template v-for="item in items">
      <v-list-group
        v-if="item.children"
        :key="item.text"
        v-model="item.expanded"
        :prepend-icon="item.icon"
        no-action
      >
        <template v-slot:activator>
          <v-list-item-content>
            <v-list-item-title v-text="item.title"></v-list-item-title>
          </v-list-item-content>
        </template>

        <v-list-item v-for="item in item.children" :key="item.title" nuxt :to="item.url">
          <v-list-item-content>
            <v-list-item-title v-text="item.title"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-group>

      <v-list-item v-else :key="item.title" nuxt :to="item.url" color="primary">
        <v-list-item-action>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </template>
  </v-list>
</template>

<script>
import { navigationData } from "./navigation-data";
export default {
  data: () => ({
    drawer: null,
    items: navigationData
  })
};
</script>

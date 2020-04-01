<template>
  <v-card>
    <v-form @submit.prevent="submitForm" class="pa-4">
      <v-text-field label="Nama" v-model="record.name" :error-messages="recordError.name"></v-text-field>

      <v-text-field label="Slug" v-model="record.slug" :error-messages="recordError.name"></v-text-field>

      <v-autocomplete
        label="Spesial"
        v-model="record.special"
        :error-messages="recordError.special"
        :items="specialOption"
        clearable
      ></v-autocomplete>

      <v-btn color="success" type="submit">Simpan</v-btn>
      <slot name="cancel"></slot>
    </v-form>
  </v-card>
</template>

<script>
import { roleForm } from "~/components/role/_mixin/form";
export default {
  mixins: [roleForm]
};
</script>

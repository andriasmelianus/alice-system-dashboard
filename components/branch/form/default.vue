<template>
  <v-card>
    <v-form @submit.prevent="submitForm" class="pa-4">
      <v-text-field label="Nama Cabang" v-model="record.name" :error-messages="recordError.name"></v-text-field>
      <v-text-field label="Kode" v-model="record.code" :error-messages="recordError.code"></v-text-field>
      <v-text-field label="Telepon" v-model="record.phone" :error-messages="recordError.phone"></v-text-field>
      <v-text-field label="Alamat" v-model="record.address" :error-messages="recordError.address"></v-text-field>
      <v-text-field label="Kota" v-model="record.city" :error-messages="recordError.city"></v-text-field>
      <v-text-field label="Propinsi" v-model="record.region" :error-messages="recordError.region"></v-text-field>
      <v-text-field label="Negara" v-model="record.country" :error-messages="recordError.country"></v-text-field>

      <v-textarea label="Catatan" v-model="record.note" rows="2"></v-textarea>

      <v-btn color="success" type="submit">Simpan</v-btn>
      <slot name="cancel"></slot>
    </v-form>
  </v-card>
</template>

<script>
import { branchForm } from "~/components/branch/_mixin/form";
export default {
  mixins: [branchForm],
  components: {}
};
</script>

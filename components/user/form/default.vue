<template>
  <v-card>
    <v-form @submit.prevent="submitForm" class="pa-4">
      <v-text-field label="Nama" v-model="record.name" :error-messages="recordError.name"></v-text-field>
      <v-text-field
        label="Username"
        v-model="record.username"
        :error-messages="recordError.username"
      ></v-text-field>
      <v-text-field
        label="Password"
        v-model="record.password"
        :error-messages="recordError.password"
        type="password"
      ></v-text-field>
      <v-checkbox
        v-model="record.is_active"
        :label="record.is_active ? 'Aktif' : 'Tidak aktif'"
        color="success"
      ></v-checkbox>
      <v-text-field
        label="No.Identitas"
        v-model="record.id_number"
        :error-messages="recordError.id_number"
      ></v-text-field>
      <v-text-field label="Telepon" v-model="record.phone" :error-messages="recordError.phone"></v-text-field>
      <v-text-field label="Alamat" v-model="record.address" :error-messages="recordError.address"></v-text-field>
      <v-text-field label="Kota" v-model="record.city" :error-messages="recordError.city"></v-text-field>
      <v-text-field label="Propinsi" v-model="record.region" :error-messages="recordError.region"></v-text-field>
      <v-text-field label="Negara" v-model="record.country" :error-messages="recordError.country"></v-text-field>

      <v-btn color="success" type="submit">Simpan</v-btn>
      <slot name="cancel"></slot>
    </v-form>
  </v-card>
</template>

<script>
import { userForm } from "~/components/user/_mixin/form";
export default {
  mixins: [userForm]
};
</script>

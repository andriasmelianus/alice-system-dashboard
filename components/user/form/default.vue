<template>
  <v-card>
    <v-form @submit.prevent="submitForm" class="pa-4">
      <v-text-field label="Nama" v-model="editedRecord.name" :error-messages="recordError.name"></v-text-field>
      <v-text-field
        label="Username"
        v-model="editedRecord.username"
        :error-messages="recordError.username"
      ></v-text-field>
      <v-text-field
        label="Password"
        v-model="editedRecord.password"
        :error-messages="recordError.password"
        type="password"
      ></v-text-field>
      <v-checkbox
        v-model="editedRecord.is_active"
        :label="editedRecord.is_active ? 'Aktif' : 'Tidak aktif'"
        color="success"
      ></v-checkbox>
      <v-text-field
        label="No.Identitas"
        v-model="editedRecord.id_number"
        :error-messages="recordError.id_number"
      ></v-text-field>
      <v-text-field
        label="Telepon"
        v-model="editedRecord.phone"
        :error-messages="recordError.phone"
      ></v-text-field>
      <v-text-field
        label="Alamat"
        v-model="editedRecord.address"
        :error-messages="recordError.address"
      ></v-text-field>
      <v-text-field label="Kota" v-model="editedRecord.city" :error-messages="recordError.city"></v-text-field>
      <v-text-field
        label="Propinsi"
        v-model="editedRecord.region"
        :error-messages="recordError.region"
      ></v-text-field>
      <v-text-field
        label="Negara"
        v-model="editedRecord.country"
        :error-messages="recordError.country"
      ></v-text-field>

      <v-btn color="success" type="submit">Simpan</v-btn>
      <slot name="cancel"></slot>
    </v-form>
  </v-card>
</template>

<script>
import { globalForm } from "~/components/_mixin/global-form";
import { userForm } from "~/components/user/_mixin/form";
export default {
  mixins: [globalForm, userForm]
};
</script>

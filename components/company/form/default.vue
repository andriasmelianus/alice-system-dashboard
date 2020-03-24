<template>
  <v-card>
    <v-form @submit.prevent="submitForm" class="pa-4">
      <v-text-field label="Nama" v-model="record.name" :error-messages="recordError.name"></v-text-field>

      <v-textarea
        label="Deskripsi"
        v-model="record.description"
        :error-messages="recordError.description"
        rows="2"
      ></v-textarea>

      <v-text-field label="Nomor NPWP" v-model="record.tax_id" :error-messages="recordError.tax_id"></v-text-field>
      <business-combobox v-model="record.business" :error-messages="recordError.business"></business-combobox>
      <industry-combobox v-model="record.industry" :error-messages="recordError.industry"></industry-combobox>

      <v-textarea label="Catatan" v-model="record.note" :error-messages="recordError.note" rows="2"></v-textarea>

      <v-btn color="success" type="submit">Simpan</v-btn>
      <slot name="cancel"></slot>
    </v-form>
  </v-card>
</template>

<script>
import { companyForm } from "~/components/company/_mixin/form";
import BusinessCombobox from "~/components/company/combobox/business";
import IndustryCombobox from "~/components/company/combobox/industry";
export default {
  mixins: [companyForm],
  components: {
    BusinessCombobox,
    IndustryCombobox
  }
};
</script>

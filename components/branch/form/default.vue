<template>
  <v-form @submit.prevent="submitForm" class="pa-4">
    <v-text-field label="Nama Cabang" v-model="record.name" :error-messages="recordError.name"></v-text-field>
    <v-text-field label="Kode" v-model="record.code" :error-messages="recordError.code"></v-text-field>
    <v-text-field label="Telepon" v-model="record.phone" :error-messages="recordError.phone"></v-text-field>
    <address-input v-model="record.address" :error-messages="recordError.address"></address-input>
    <city-input v-model="record.city" :error-messages="recordError.city"></city-input>
    <region-input v-model="record.region" :error-messages="recordError.region"></region-input>
    <country-input v-model="record.country" :error-messages="recordError.country"></country-input>

    <v-textarea label="Catatan" v-model="record.note" rows="2"></v-textarea>

    <v-btn color="success" type="submit">Simpan</v-btn>
    <slot name="cancel"></slot>
  </v-form>
</template>

<script>
import { branchForm } from "~/components/branch/_mixin/form";
import AddressInput from "~/components/contact/combobox/address";
import CityInput from "~/components/contact/combobox/city";
import RegionInput from "~/components/contact/combobox/region";
import CountryInput from "~/components/contact/combobox/country";
export default {
  mixins: [branchForm],
  components: {
    AddressInput,
    CityInput,
    RegionInput,
    CountryInput
  }
};
</script>

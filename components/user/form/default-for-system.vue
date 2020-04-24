<template>
  <v-form @submit.prevent="submitForm" class="pa-4">
    <company-autocomplete v-model="record.company_id" :error-messages="recordError.company_id"></company-autocomplete>
    <v-text-field label="Nama" v-model="record.name" :error-messages="recordError.name"></v-text-field>
    <v-text-field
      label="Username"
      v-model="record.username"
      :error-messages="recordError.username"
      :disabled="editMode"
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
    <address-input v-model="record.address" :error-messages="recordError.address"></address-input>
    <city-input v-model="record.city" :error-messages="recordError.city"></city-input>
    <region-input v-model="record.region" :error-messages="recordError.region"></region-input>
    <country-input v-model="record.country" :error-messages="recordError.country"></country-input>

    <v-btn color="success" type="submit">Simpan</v-btn>
    <slot name="cancel"></slot>
  </v-form>
</template>

<script>
import { userForm } from "~/components/user/_mixin/form";
import CompanyAutocomplete from "~/components/company/autocomplete/company";
import AddressInput from "~/components/contact/combobox/address";
import CityInput from "~/components/contact/combobox/city";
import RegionInput from "~/components/contact/combobox/region";
import CountryInput from "~/components/contact/combobox/country";
export default {
  mixins: [userForm],

  components: {
    CompanyAutocomplete,
    AddressInput,
    CityInput,
    RegionInput,
    CountryInput
  }
};
</script>

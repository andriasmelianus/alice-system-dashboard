<template>
  <v-autocomplete
    label="Perusahaan"
    item-text="name"
    item-value="id"
    @change="handleChange"
    :value="value"
    :search-input.sync="search"
    :items="records"
    :error-messages="errorMessages"
    :no-data-text="noDataText"
    :loading="isLoading"
    no-filter
    append-icon
    auto-select-first
    hide-no-data
    clearable
  ></v-autocomplete>
</template>

<script>
import { globalAutocomplete } from "~/components/_mixin/global-autocomplete";
export default {
  mixins: [globalAutocomplete],

  data: () => ({
    apiUrl: "/company"
  })
};
</script>

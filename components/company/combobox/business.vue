<template>
  <v-combobox
    label="Bisnis"
    item-text="name"
    item-value="name"
    @update:search-input="handleInput"
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
  ></v-combobox>
</template>

<script>
import { globalComboboxAutocomplete } from "~/components/_mixin/global-combobox-autocomplete";
export default {
  mixins: [globalComboboxAutocomplete],

  data: () => ({
    apiUrl: "/company-business"
  })
};
</script>

<template>
  <v-combobox
    label="Negara"
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
import { globalCombobox } from "~/components/_mixin/global-combobox";
export default {
  mixins: [globalCombobox],

  data: () => ({
    apiUrl: "/contact/country"
  })
};
</script>

<template>
  <v-combobox
    @update:search-input="handleInput"
    label="Industri"
    item-text="name"
    item-value="name"
    :items="records"
    :search-input.sync="search"
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
    apiUrl: "/company-industry"
  })
};
</script>

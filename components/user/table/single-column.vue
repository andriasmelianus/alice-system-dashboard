<template>
  <v-data-table
    :headers="singleColumnTableHeader"
    :items="tableRecords"
    show-select
    single-select
    v-model="selectedRecords"
  >
    <template v-slot:header.data-table-select>
      <v-menu offset-y open-on-hover>
        <template v-slot:activator="{ on }">
          <v-btn small icon v-on="on">
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item @click="showUpdateForm" :disabled="!selectedRecordExists">
            <v-list-item-title>Ubah</v-list-item-title>
          </v-list-item>

          <v-list-item @click="deleteSingleRecord" :disabled="!selectedRecordExists">
            <v-list-item-title>Hapus</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </template>
  </v-data-table>
</template>

<script>
import { globalTable } from "~/components/_mixin/global-table";
import { userTable } from "~/components/user/_mixin/table";
export default {
  mixins: [globalTable, userTable],

  mounted() {
    this.readRecords();
  },

  methods: {
    showUpdateForm() {
      alert("Show update form!");
    }
  }
};
</script>

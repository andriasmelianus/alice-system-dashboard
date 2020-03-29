<!-- Komponen ini menampilkan data perusahaan di mana user tersebut terdaftar -->
<template>
  <v-data-table
    :headers="defaultTableHeaders"
    :items="records"
    show-select
    single-select
    v-model="selectedRecords"
    :search="search"
    @item-selected="handleRecordSelected"
  >
    <template v-slot:top>
      <v-toolbar short flat>
        <v-btn @click="showForm(false)" color="success">Baru</v-btn>&nbsp;
        <v-btn @click="showForm(true)" color="warning" v-if="selectedRecordExists">Ubah</v-btn>&nbsp;
        <v-btn @click="deleteSingleRecord" color="error" outlined v-if="selectedRecordExists">
          <v-icon>mdi-delete-outline</v-icon>
        </v-btn>&nbsp;
        <v-dialog v-model="formShown" max-width="500px" ref="formDialog">
          <company-form
            :record="editedRecord"
            :edit-mode="formEditMode"
            @recordCreated="handleRecordCreated($event)"
            @recordUpdated="handleRecordUpdated($event)"
          ></company-form>
        </v-dialog>&nbsp;
        <v-text-field
          label="Cari"
          v-model="search"
          append-icon="mdi-magnify"
          single-line
          hide-details
        ></v-text-field>
        <v-spacer></v-spacer>
        <v-toolbar-title class="headline">Data Perusahaan</v-toolbar-title>
      </v-toolbar>
    </template>
  </v-data-table>
</template>

<script>
import { companyTable } from "~/components/company/_mixin/table";
import CompanyForm from "~/components/company/form/default";
export default {
  mixins: [companyTable],

  components: {
    CompanyForm
  },

  data: () => ({
    apiUrl: "/company-by-me"
  }),

  mounted() {
    this.readRecords();
  }
};
</script>

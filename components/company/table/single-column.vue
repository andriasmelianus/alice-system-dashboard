<template>
  <v-data-table
    :headers="singleColumnTableHeader"
    :items="records"
    show-select
    single-select
    v-model="selectedRecords"
    @item-selected="handleRecordSelected"
  >
    <!-- Modifikasi kolom nama, sehingga dalam satu kolom dapat menampilkan nama dan deskripsi -->
    <template v-slot:item.name="{ item }">
      <div>{{ item.name }}</div>
      <div class="caption font-weight-light">{{ item.description }}</div>
    </template>

    <template v-slot:header.data-table-select>
      <v-menu offset-y open-on-hover>
        <template v-slot:activator="{ on }">
          <v-btn small icon v-on="on">
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item @click="showForm(false)">
            <v-list-item-title>Baru</v-list-item-title>
          </v-list-item>

          <v-list-item @click="showForm(true)" :disabled="!selectedRecordExists">
            <v-list-item-title>Ubah</v-list-item-title>
          </v-list-item>

          <v-list-item @click="deleteSingleRecord" :disabled="!selectedRecordExists">
            <v-list-item-title>Hapus</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>

      <v-dialog v-model="formShown" max-width="500px" ref="formDialog">
        <company-form
          :record="editedRecord"
          :edit-mode="formEditMode"
          @recordCreated="handleRecordCreated($event)"
          @recordUpdated="handleRecordUpdated($event)"
        ></company-form>
      </v-dialog>
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

  mounted() {
    this.readRecords();
  }
};
</script>

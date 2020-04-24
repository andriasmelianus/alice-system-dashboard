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
      <div>
        {{ item.name }}
        <span class="font-weight-light">{{ item.code }}</span>
      </div>
      <div class="caption font-weight-light">Telepon {{ item.phone }}</div>
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
        <v-card>
          <branch-form
            :record="editedRecord"
            :edit-mode="formEditMode"
            @recordCreated="handleRecordCreated($event)"
            @recordUpdated="handleRecordUpdated($event)"
          ></branch-form>
        </v-card>
      </v-dialog>
    </template>
  </v-data-table>
</template>

<script>
import { branchTable } from "~/components/branch/_mixin/table";
import BranchForm from "~/components/branch/form/default";
export default {
  mixins: [branchTable],
  components: {
    BranchForm
  },

  mounted() {
    this.readRecords();
  }
};
</script>

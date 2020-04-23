<!--
  Komponen ini menampilkan data user yang terdaftar pada perusahaan yang sedang dipilih (filterDetails)
  Semenjak many-to-many antara tabel user dan company tidak didukung, maka komponen ini tidak berfungsi.
-->
<template>
  <v-data-table
    :headers="singleColumnTableHeader"
    :items="records"
    show-select
    single-select
    v-model="selectedRecords"
    @item-selected="handleRecordSelected"
  >
    <template v-slot:item.user="{ item }">
      <div>
        {{ item.user }} &nbsp;
        <v-chip color="success" v-if="item.is_active" x-small>Aktif</v-chip>
        <v-chip color="error" v-else x-small>Tidak aktif</v-chip>
      </div>

      <div class="caption font-weight-light">
        Username:
        <b>{{ item.username }}</b>
        | Jabatan: {{ item.title }}
      </div>
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
            <v-list-item-title>Tambah</v-list-item-title>
          </v-list-item>

          <v-list-item @click="deleteSingleRecord" :disabled="!selectedRecordExists">
            <v-list-item-title>Hapus</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>

      <v-dialog v-model="formShown" max-width="500px" ref="formDialog">
        <user-form
          :company-id="filterDetails.value"
          :record="editedRecord"
          :edit-mode="formEditMode"
          @recordCreated="handleRecordCreated($event)"
          @recordUpdated="handleRecordUpdated($event)"
        ></user-form>
      </v-dialog>
    </template>
  </v-data-table>
</template>

<script>
import { userTable } from "~/components/user/_mixin/table-company-user";
import UserForm from "~/components/user/form/company-user";
export default {
  mixins: [userTable],
  components: {
    UserForm
  },

  watch: {
    filterDetails(newFilterDetails, oldFilterDetails) {
      this.editedRecord.company_id = newFilterDetails.value;
    }
  },

  mounted() {
    this.readRecords();
  }
};
</script>

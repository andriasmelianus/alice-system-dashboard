<template>
  <v-data-table
    :headers="defaultTableHeaders"
    :items="records"
    show-select
    v-model="selectedRecords"
    :search="search"
    @item-selected="handleRecordSelected"
  >
    <template v-slot:top>
      <v-toolbar short flat>
        <v-btn @click="showForm(false)" color="success">Tambah</v-btn>&nbsp;&nbsp;
        <v-btn @click="deleteMultipleRecords" v-if="selectedRecordExists" color="error">Hapus</v-btn>&nbsp;&nbsp;
        <v-dialog v-model="formShown" max-width="700px" ref="formDialog">
          <permission-select :role-id="roleId" @recordAdded="handleRecordAdded"></permission-select>
        </v-dialog>

        <v-text-field
          label="Cari"
          v-model="search"
          append-icon="mdi-magnify"
          single-line
          hide-details
        ></v-text-field>
        <v-spacer></v-spacer>
        <v-toolbar-title class="headline">Data Permission</v-toolbar-title>
      </v-toolbar>
    </template>
  </v-data-table>
</template>

<script>
import { permissionTable } from "~/components/permission/_mixin/table";
import PermissionSelect from "./select";
export default {
  mixins: [permissionTable],
  components: {
    PermissionSelect
  },

  data: () => ({
    // Karena data diambil dari tabel/view intermediate (v_permission_role)
    defaultTableHeaders: [
      { text: "Layanan", value: "service", align: "left" },
      { text: "Nama", value: "permission", align: "left" }, // Letak perbedaannya hanya di kolom ini
      { text: "Slug", value: "slug" },
      { text: "Diinput", value: "created_at" },
      { text: "Diupdate", value: "updated_at" }
    ],

    apiUrl: "/auth/role-permission",

    roleId: undefined
  }),
  watch: {
    // Tangkap perubahan nilai pada filterDetails yang dikirimkan dari tabel role.
    filterDetails(newFilterDetails, oldFilterDetails) {
      this.selectedRecords = [];
      this.roleId = newFilterDetails.value;
    }
  },

  mounted() {
    this.readRecords();
  },

  methods: {
    /**
     * Menangkap event yang dihasilkan ketika tabel intermediate (permission_role) terisi.
     *
     * @param {Object} Context
     */
    handleRecordAdded(context) {
      this.readRecords();
      this.closeForm();
    },

    /**
     * Menghapus banyak record sekaligus
     * Function akan mengirimkan ID-ID yang akan dihapus dengan nama parameter IDs.
     */
    deleteMultipleRecords() {
      if (confirm("Anda yakin akan menghapus data tersebut?")) {
        let vm = this,
          selectedIds = vm.selectedRecords.map(function(selectedRecords) {
            return selectedRecords["id"];
          });

        vm.$axios
          .$delete(vm.$store.getters.apiUrl(vm.apiUrl), {
            params: {
              role_id: vm.roleId,
              ids: selectedIds
            }
          })
          .then(function(result) {
            vm.readRecords();

            vm.$emit("recordSelected", []);
          })
          .catch(function(error) {
            vm.$store.commit("globalNotification/show", {
              color: "error",
              message: error
            });
          });
      }
    }
  }
};
</script>

<!-- Menampilkan role yang dimiliki seorang user (sesuai dengan filterDetails) -->
<template>
  <v-data-table
    :headers="smallTableHeaders"
    :items="records"
    show-select
    single-select
    v-model="selectedRecords"
    @item-selected="handleRecordSelected"
  >
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

      <v-dialog v-model="formShown" max-width="800px" ref="formDialog">
        <role-select :user-id="userId" @recordAdded="handleRecordAdded"></role-select>
      </v-dialog>
    </template>
  </v-data-table>
</template>

<script>
import { roleTable } from "~/components/role/_mixin/table";
import RoleSelect from "~/components/role/table/select";
export default {
  mixins: [roleTable],
  components: {
    RoleSelect
  },
  data: () => ({
    smallTableHeaders: [
      { text: "Nama", value: "role", align: "left" },
      { text: "Special", value: "special" }
    ],

    userId: undefined,

    apiUrl: "/auth/user-role"
  }),
  watch: {
    filterDetails(newFilterDetails, oldFilterDetails) {
      this.selectedRecords = [];
      this.userId = newFilterDetails.value;
    }
  },

  mounted() {
    this.readRecords();
  },

  methods: {
    /**
     * Menangkap event yang dihasilkan ketika tabel intermediate (role_user) terisi.
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
          selectedIds = vm.selectedRecords.map(function(selectedRecord) {
            return selectedRecord["id"];
          });

        vm.$axios
          .$delete(vm.$store.getters.apiUrl(vm.apiUrl), {
            params: {
              user_id: vm.userId,
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

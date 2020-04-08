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
        <v-btn @click="addPermission" color="success">Pilih</v-btn>&nbsp;&nbsp;
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
export default {
  mixins: [permissionTable],
  props: {
    roleId: {
      required: true
    }
  },
  data: () => ({
    apiUrl: "/auth/permission"
  }),
  watch: {
    // Menangkap perubahan nilai pada roleId yang dikirimkan dari tabel permission-role.
    roleId(newRoleId, oldRoleId) {
      this.selectedRecords = [];
    }
  },

  mounted() {
    this.readRecords();
  },
  methods: {
    addPermission() {
      let vm = this,
        dataToSend = {
          role_id: vm.roleId,
          permissionIds: vm.selectedRecords.map(function(selectedRecord) {
            return selectedRecord["id"];
          })
        };
      vm.$axios
        .$post(vm.$store.getters.apiUrl("/auth/role-permission"), dataToSend)
        .then(function(result) {
          vm.selectedRecords = [];

          vm.$emit("recordAdded", result);
        })
        .catch(function(error) {
          vm.$store.commit("globalNotification/show", {
            color: "error",
            message: error
          });
        });
    }
  }
};
</script>

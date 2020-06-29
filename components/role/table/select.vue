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
        <v-btn @click="addRole" color="success">Pilih</v-btn>&nbsp;&nbsp;
        <v-text-field
          label="Cari"
          v-model="search"
          append-icon="mdi-magnify"
          single-line
          hide-details
        ></v-text-field>
        <v-spacer></v-spacer>
        <v-toolbar-title class="text-h6">Data Role</v-toolbar-title>
      </v-toolbar>
    </template>
  </v-data-table>
</template>

<script>
import { roleTable } from "~/components/role/_mixin/table";
export default {
  mixins: [roleTable],
  props: {
    userId: {
      type: Number,
      required: true,
      default: 0
    }
  },
  data: () => ({
    apiUrl: "/auth/role"
  }),
  watch: {
    // Menangkap perubahan nilai pada userId yang dikirimkan dari tabel role-user.
    userId(newUserId, oldUserId) {
      this.selectedRecords = [];
    }
  },

  mounted() {
    this.readRecords();
  },
  methods: {
    addRole() {
      let vm = this,
        dataToSend = {
          user_id: vm.userId,
          roleIds: vm.selectedRecords.map(function(selectedRecord) {
            return selectedRecord["id"];
          })
        };
      vm.$axios
        .$post(vm.$store.getters.apiUrl("/auth/user-role"), dataToSend)
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

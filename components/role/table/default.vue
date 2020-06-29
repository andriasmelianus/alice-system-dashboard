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
          <v-card>
            <role-form
              :record="editedRecord"
              :edit-mode="formEditMode"
              @recordCreated="handleRecordCreated($event)"
              @recordUpdated="handleRecordUpdated($event)"
            ></role-form>
          </v-card>
        </v-dialog>&nbsp;
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
import RoleForm from "~/components/role/form/default";
export default {
  mixins: [roleTable],

  components: {
    RoleForm
  },

  mounted() {
    this.readRecords();
  }
};
</script>

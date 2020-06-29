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
    <template v-slot:item.is_active="{ item }">
      <div>
        <v-chip color="success" v-if="item.is_active" small></v-chip>
        <v-chip color="error" v-else small></v-chip>
      </div>
    </template>

    <template v-slot:top>
      <v-toolbar short flat>
        <v-btn @click="showForm(false)" color="success">Baru</v-btn>&nbsp;
        <v-btn @click="showForm(true)" color="warning" v-if="selectedRecordExists">Ubah</v-btn>&nbsp;
        <v-btn @click="deleteSingleRecord" color="error" outlined v-if="selectedRecordExists">
          <v-icon>mdi-delete-outline</v-icon>
        </v-btn>&nbsp;
        <v-dialog v-model="formShown" max-width="500px" ref="formDialog">
          <v-card>
            <user-form
              :record="editedRecord"
              :edit-mode="formEditMode"
              @recordCreated="handleRecordCreated($event)"
              @recordUpdated="handleRecordUpdated($event)"
            ></user-form>
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
        <v-toolbar-title class="text-h6">Data Pengguna</v-toolbar-title>
      </v-toolbar>
    </template>
  </v-data-table>
</template>

<script>
import { userTable } from "~/components/user/_mixin/table-for-system";
import UserForm from "~/components/user/form/default-for-system";
export default {
  mixins: [userTable],

  components: {
    UserForm
  },

  data: () => ({
    reloadAfterModification: true
  }),

  mounted() {
    this.readRecords();
  }
};
</script>

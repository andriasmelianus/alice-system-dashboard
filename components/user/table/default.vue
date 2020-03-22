<template>
  <v-data-table
    :headers="defaultTableHeaders"
    :items="records"
    show-select
    single-select
    v-model="selectedRecords"
  >
    <template v-slot:top>
      <v-toolbar short flat>
        <!-- Create New Record -->
        <!-- <v-dialog max-width="400px">
          <template v-slot:activator="{ on }">
            <v-btn @click="showUserForm(false)" v-on="on" color="success">Buat</v-btn>
          </template>

          <user-form></user-form>
        </v-dialog>&nbsp;-->
        <!-- Update Record -->
        <!-- <v-dialog max-width="400px" v-if="selectedRecordExists">
          <template v-slot:activator="{ on }">
            <v-btn @click="showUserForm(true)" v-on="on" color="warning">Ubah</v-btn>
          </template>

          <user-form></user-form>
        </v-dialog>&nbsp;-->
        <!-- Delete record -->

        <v-btn @click="showForm(false)" color="success">Baru</v-btn>&nbsp;
        <v-btn @click="showForm(true)" color="warning" v-if="selectedRecordExists">Ubah</v-btn>&nbsp;
        <v-btn @click="deleteSingleRecord" color="error" outlined v-if="selectedRecordExists">
          <v-icon>mdi-delete-outline</v-icon>
        </v-btn>&nbsp;
        <v-dialog v-model="formShown" max-width="500px" ref="formDialog">
          <user-form
            :record="editedRecord"
            :edit-mode="formEditMode"
            @recordCreated="handleRecordCreated($event)"
            @recordUpdated="handleRecordUpdated($event)"
          ></user-form>
        </v-dialog>

        <v-spacer></v-spacer>
        <v-toolbar-title class="headline">Data Pengguna</v-toolbar-title>
      </v-toolbar>
    </template>
  </v-data-table>
</template>

<script>
import { userTable } from "~/components/user/_mixin/table";
import UserForm from "~/components/user/form/default";
export default {
  mixins: [userTable],

  components: {
    UserForm
  },

  mounted() {
    this.readRecords();
  }
};
</script>

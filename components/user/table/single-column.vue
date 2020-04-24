<template>
  <v-data-table
    :headers="singleColumnTableHeader"
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
          <user-form
            :record="editedRecord"
            :edit-mode="formEditMode"
            @recordCreated="handleRecordCreated($event)"
            @recordUpdated="handleRecordUpdated($event)"
          ></user-form>
        </v-card>
      </v-dialog>
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

<template>
  <div>
    <div class="mt-4 mx-9">
      <div class="text-h4 text-center">Manajemen Data Role</div>
    </div>

    <div class="d-flex flex-wrap justify-center">
      <v-card max-width="700px" :class="componentClass">
        <v-card-title>Role</v-card-title>
        <v-card-subtitle>Role adalah kumpulan permission yang menentukan peran seorang pengguna. Setiap role dapat menyimpan beberapa permission sekaligus. Pengguna dapat memiliki role lebih dari satu.</v-card-subtitle>

        <role-table @recordSelected="roleRecordSelected"></role-table>
      </v-card>

      <v-card max-width="800px" :class="componentClass" :disabled="!permissionTableEnabled">
        <v-card-title>Permission</v-card-title>
        <v-card-subtitle>Permission adalah satuan akses yang mendeskripsikan hak yang dapat dimiliki oleh pengguna melalui role.</v-card-subtitle>

        <permission-table :filter-details="permissionFilterDetails"></permission-table>
      </v-card>
    </div>
  </div>
</template>

<script>
import { permissionCheck } from "~/components/_mixin/permission-check";
import RoleTable from "~/components/role/table/default";
import PermissionTable from "~/components/permission/table/permission-role";
export default {
  middleware: "auth",
  layout: "dashboard",
  mixins: [permissionCheck],
  head() {
    return {
      title: "Data Role"
    };
  },
  components: {
    RoleTable,
    PermissionTable
  },
  data: () => ({
    permissionRequired: "manage-system",

    componentClass: "my-2 mx-1 align-self-start",

    permissionTableEnabled: false,

    permissionFilterDetails: {}
  }),

  methods: {
    roleRecordSelected(context) {
      let vm = this;
      if (context.value) {
        vm.permissionFilterDetails = Object.assign(
          {},
          vm.permissionFilterDetails,
          {
            column: "role_id",
            value: context.item.id
          }
        );
        vm.permissionTableEnabled = true;
        return;
      }
      vm.permissionFilterDetails = {};
      vm.permissionTableEnabled = false;
    }
  }
};
</script>

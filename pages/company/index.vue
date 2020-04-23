<template>
  <div>
    <div class="mt-4 mx-9">
      <div class="display-1 text-center">Manajemen Data Perusahaan</div>
      <!-- <div
        class="caption"
      >Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam odio modi hic sit sapiente eum magnam similique iusto unde doloribus nihil omnis rerum voluptatem, facilis deleniti quam aliquam maiores totam?</div>-->
    </div>

    <div class="d-flex flex-wrap justify-center">
      <v-card max-width="700px" :class="componentClass">
        <v-card-title>Perusahaan</v-card-title>
        <v-card-subtitle>Tabel di bawah ini memungkinkan Anda untuk menambah, mengubah dan menghapus data perusahaan.</v-card-subtitle>

        <company-table @recordSelected="companyRecordSelected"></company-table>
      </v-card>

      <v-card max-width="400px" :class="componentClass" :disabled="!branchTableEnabled">
        <v-card-title>Cabang</v-card-title>
        <v-card-subtitle>Daftar cabang-cabang yang berada di bawah perusahaan terpilih.</v-card-subtitle>

        <branch-table :filter-details="branchFilterDetails"></branch-table>
      </v-card>
    </div>
  </div>
</template>

<script>
import { permissionCheck } from "~/components/_mixin/permission-check";
import CompanyTable from "~/components/company/table/default";
import BranchTable from "~/components/branch/table/single-column";
export default {
  middleware: "auth",
  mixins: [permissionCheck],
  layout: "dashboard",
  head() {
    return {
      title: "Data Perusahaan"
    };
  },

  components: {
    CompanyTable,
    BranchTable
  },

  data: () => ({
    permissionRequired: "read-company",
    componentClass: "my-2 mx-1 align-self-start",
    branchTableEnabled: false,

    branchFilterDetails: {}
  }),

  methods: {
    companyRecordSelected(context) {
      let vm = this;
      if (context.value) {
        vm.branchFilterDetails = Object.assign({}, vm.branchFilterDetails, {
          column: "company_id",
          value: context.item.id
        });

        vm.branchTableEnabled = true;

        return;
      }
      vm.branchTableEnabled = false;

      vm.branchFilterDetails = {};
    }
  }
};
</script>

<template>
  <div>
    <div class="mt-4 mx-9">
      <div class="text-h4 text-center">Data Perusahaan</div>
    </div>

    <div class="d-flex flex-wrap justify-center">
      <v-card max-width="400px" :class="componentClass">
        <!-- JUDUL CARD -->
        <v-card-title>Perusahaan</v-card-title>
        <!-- SUB-JUDUL CARD -->
        <v-card-subtitle>Melalui halaman ini Anda dapat mengubah data perusahaan dan mengelola cabang-cabang yang ada di bawahnya.</v-card-subtitle>

        <company-form :record="editedCompany" :editMode="true" @recordUpdated="companyUpdated"></company-form>
      </v-card>

      <v-card max-width="800px" :class="componentClass">
        <v-card-title>Cabang</v-card-title>
        <v-card-subtitle>Data cabang di bawah ini dapat dikelola oleh pengguna yang memiliki role mengelola perusahaan.</v-card-subtitle>

        <branch-table :filter-details="branchFilterDetails"></branch-table>
      </v-card>
    </div>
  </div>
</template>

<script>
import { permissionCheck } from "~/components/_mixin/permission-check";
import CompanyForm from "~/components/company/form/default";
import BranchTable from "~/components/branch/table/default";
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
    CompanyForm,
    BranchTable
  },

  data: () => ({
    permissionRequired: "read-company",
    componentClass: "my-2 mx-1 align-self-start",

    editedCompany: {},
    branchFilterDetails: {}
  }),

  mounted() {
    let vm = this,
      companyId = this.$auth.user.company_id;

    vm.$axios
      .$get(vm.$store.getters.apiUrl("/company"), {
        params: {
          id: companyId
        }
      })
      .then(function(result) {
        vm.editedCompany = Object.assign({}, vm.editedCompany, result[0]);

        vm.branchFilterDetails = Object.assign({}, vm.branchFilterDetails, {
          column: "company_id",
          value: companyId
        });
      })
      .catch(function(error) {
        console.log(error);
      });
  },
  methods: {
    companyUpdated() {
      this.$store.commit("globalNotification/show", {
        message: "Data perusahaan telah disimpan"
      });
    }
  }
};
</script>

/**
 * Mixin Global Server-Side Table
 *
 * Mixin ini adalah kumpulan properties, method, sebagainya untuk mendukung server-side pagination & sorting
 * pada control v-data-table. Mixin ini merupakan turunan dari Mixin Global Table.
 */
import { globalTable } from "./global-table";
export const globalServersideTable = {
  mixins: [globalTable],

  props: {
    params: Object
  },

  data: () => ({
    // Table data
    totalRecords: undefined,

    // Pagination, sorting, and other search parameters
    serverParams: {},
    otherServerParams: {},
    _timerId: undefined,
    isLoading: false
  }),

  watch: {
    /**
     * Memantau perubahan props params
     *
     * @param Object newFilterDetails
     * @return void
     */

    params(newFilterDetails, oldFilterDetails) {
      let vm = this;
      vm.otherServerParams = Object.assign({}, newFilterDetails);

      vm.readRecords();
    },

    // Memantau perubahan options. Setiap kali user melakukan sort atau pindah halaman, maka kode dijalankan.
    serverParams: {
      handler() {
        this.readRecords();
      },
      deep: true
    },

    search(newSearchText, oldSearchText) {
      let vm = this;

      // Memberikan jeda setelah teks pencarian diketik.
      clearTimeout(vm._timerId);
      vm._timerId = setTimeout(function() {
        /**
         * TODO
         *
         * Teks pencarian dapat berupa format untuk mencari berdasarkan kolom yang ditentukan.
         * Contoh:
         * merk(lenovo) thinkpad t430
         *
         * maka parameter yang dikirimkan adalah: {merk: "lenovo", keyword: "thinkpad t430"}
         */

        vm.otherServerParams = Object.assign({}, vm.otherServerParams, {
          keyword: newSearchText
        });

        vm.readRecords();
      }, 300);
    }
  },

  methods: {
    /**
     * Membaca data dari proses server-side pagination & sorting
     */
    readRecords() {
      let vm = this,
        allParameters = Object.assign(
          {},
          this.serverParams,
          this.otherServerParams
        );
      vm.isLoading = true;

      vm.$axios
        .$get(vm.$store.getters.apiUrl(vm.apiUrl), {
          params: allParameters
        })
        .then(function(result) {
          vm.records = result.data;
          vm.totalRecords = result.total;
          vm.isLoading = false;
        })
        .catch(function(error) {
          vm.$store.commit("globalNotification/show", {
            color: "error",
            message: error
          });
        });
    },

    /**
     * Menangani event recordCreated yang dihasilkan dari form
     *
     * @param {Object} createdRecord
     */
    handleRecordCreated(createdRecord) {
      // Tambahkan createdRecord pada records
      let recordsCount = this.records.length;
      this.readRecords();
      this.closeForm();
    },

    /**
     * Menanagani event recordUpdated yang hasilkan dari form
     * @param {Object} updatedRecord
     */
    handleRecordUpdated(updatedRecord) {
      this.selectedRecord = Object.assign(
        {},
        this.selectedRecord,
        updatedRecord
      );
      this.readRecords();
      this.closeForm();
    },

    /**
     * Function ini menghapus data pertama dari data yang diselect pada table
     */
    deleteSingleRecord() {
      if (confirm("Anda yakin akan menghapus data tersebut?")) {
        let vm = this;
        vm.$axios
          .$delete(vm.$store.getters.apiUrl(vm.apiUrl), {
            params: {
              id: vm.selectedRecord.id
            }
          })
          .then(function(result) {
            vm.readRecords();
            vm.selectedRecords = [];

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

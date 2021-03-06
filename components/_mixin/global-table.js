/**
 * Mixin global-table merupakan kumpulan data, computed, watch dan methods yang digunakan pada semua v-data-table.
 * Dengan mengikutsertakan mixin ini, anda akan mendapatkan:
 *
 * props:
 *  filterDetails
 *
 * data:
 *  defaultTableHeaders
 *  smallTableHeaders
 *  singleColumnTableHeader
 *  records
 *  selectedRecords
 *  selectedRecord
 *  selectedRecordIndex
 *  defaultRecord
 *  editedRecord
 *  search
 *  apiUrl
 *  formShown
 *  formEditMode
 *  reloadAfterModification
 *
 * computed:
 *  selectedRecordExists
 *
 * watch:
 *  filterDetails
 *  selectedRecords
 *  formShown
 *
 * methods:
 *  readRecords
 *  setEditedRecord
 *  handleRecordSelected
 *  handleRecordCreated
 *  handleRecordUpdated
 *  deleteSingleRecord
 *  deleteMultipleRecords
 *  showForm
 *  closeForm
 */
export const globalTable = {
  props: {
    filterDetails: Object
  },
  data: () => ({
    // Table headers
    defaultTableHeaders: [],
    smallTableHeaders: [],
    singleColumnTableHeader: [],

    // Table data
    records: undefined,
    selectedRecords: [],
    selectedRecord: {},
    selectedRecordIndex: undefined,
    defaultRecord: {},
    editedRecord: {},
    search: "",

    // Axios URL
    apiUrl: "",

    // Khusus untuk form
    formShown: false,
    formEditMode: false,

    reloadAfterModification: false
  }),
  computed: {
    selectedRecordExists() {
      return this.selectedRecords.length > 0;
    }
  },

  watch: {
    /**
     * Melakukan pengambilan data ke server setiap kali filterDetails berubah
     * @param {Object} newFilterDetails
     * @param {Object} oldFilterDetails
     */
    filterDetails(newFilterDetails, oldFilterDetails) {
      this.readRecords();
    },

    selectedRecords(newSelectedRecords, oldSelectedRecords) {
      //Masukkan record pertama yang terpililh
      this.selectedRecord = Object.assign(
        {},
        this.selectedRecord,
        newSelectedRecords[0]
      );
      this.selectedRecordIndex = this.records.indexOf(newSelectedRecords[0]);
    },

    formShown(newStatus, oldStatus) {
      if (!newStatus) {
        this.closeForm();
      }
    }
  },
  methods: {
    /**
     * Membaca data dari dalam database
     */
    readRecords() {
      let vm = this;

      vm.$axios
        .$get(vm.$store.getters.apiUrl(vm.apiUrl), {
          params: vm.filterDetails
        })
        .then(function(result) {
          vm.records = result;
        })
        .catch(function(error) {
          vm.$store.commit("globalNotification/show", {
            color: "error",
            message: error
          });
        });
    },

    /**
     * Menset editedRecord
     *
     * @param {Object} editedRecord
     */
    setEditedRecord(editedRecord) {
      this.editedRecord = Object.assign({}, this.editedRecord, editedRecord);
    },

    /**
     * Menangkap event item-selected dari v-data-table
     * kemudian menembakkannya kembali ke parent component.
     *
     * @param {Object} context
     */
    handleRecordSelected(context) {
      this.$emit("recordSelected", context);
    },

    /**
     * Menangani event recordCreated yang dihasilkan dari form
     *
     * @param {Object} createdRecord
     */
    handleRecordCreated(createdRecord) {
      // Tambahkan createdRecord pada records
      let recordsCount = this.records.length;
      this.records.splice(recordsCount, 0, createdRecord);
      this.closeForm();

      if (this.reloadAfterModification) {
        this.readRecords();
      }
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
      this.records.splice(this.selectedRecordIndex, 1, updatedRecord);
      this.closeForm();

      if (this.reloadAfterModification) {
        this.readRecords();
      }
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
            vm.records.splice(vm.selectedRecordIndex, 1);
            vm.selectedRecords = [];

            vm.$emit("recordSelected", []);
          })
          .catch(function(error) {
            vm.$store.commit("globalNotification/show", {
              color: "error",
              message: error
            });
          });

        if (this.reloadAfterModification) {
          this.readRecords();
        }
      }
    },

    /**
     * Menghapus banyak record sekaligus
     * Function akan mengirimkan ID-ID yang akan dihapus dengan nama parameter IDs.
     */
    deleteMultipleRecords() {
      if (confirm("Anda yakin akan menghapus data tersebut?")) {
        let vm = this,
          selectedIds = vm.selectedRecords.map(function(selectedRecords) {
            return selectedRecords["id"];
          });

        vm.$axios
          .$delete(vm.$store.getters.apiUrl(vm.apiUrl), {
            params: {
              ids: selectedIds
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

        if (this.reloadAfterModification) {
          this.readRecords();
        }
      }
    },

    showForm(editMode) {
      if (editMode) {
        this.setEditedRecord(this.selectedRecord);
      } else {
        this.setEditedRecord(this.defaultRecord);
      }
      this.formEditMode = editMode;
      this.formShown = true;
    },
    closeForm() {
      this.formEditMode = false;
      this.formShown = false;
    }
  }
};

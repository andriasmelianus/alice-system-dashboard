/**
 * Mixin global-table merupakan kumpulan data, computed, watch dan methods yang digunakan pada semua v-data-table.
 * Dengan mengikutsertakan mixin ini, anda akan mendapatkan:
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
 *
 * computed:
 *  selectedRecordExists
 *
 * watch:
 *  selectedRecords
 *  formShown
 *
 * methods:
 *  readRecords
 *  setEditedRecord
 *  handleRecordCreated
 *  handleRecordUpdated
 *  deleteSingleRecord
 *  showForm
 *  closeForm
 */
export const globalTable = {
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
    formEditMode: false
  }),
  computed: {
    selectedRecordExists() {
      return this.selectedRecords.length > 0;
    }
  },

  watch: {
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
     * Membaca data dari dalam database kemudian dimasukkan ke dalam Vuex
     */
    readRecords() {
      let vm = this;
      vm.$axios
        .$get(vm.$store.getters.apiUrl(vm.apiUrl))
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
            // vm.$store.dispatch(vm.vuexActionPathForDeleteRecord);
            vm.records.splice(vm.selectedRecordIndex, 1);
          })
          .catch(function(error) {
            vm.$store.commit("globalNotification/show", {
              color: "error",
              message: error
            });
          });
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

/**
 *
 */
export const globalTable = {
  data: () => ({
    /**
     *
     */
    apiUrl: "",
    vuexActionPathForReadRecords: "",
    vuexActionPathForCreateRecord: "",
    vuexActionPathForUpdateRecord: "",
    vuexActionPathForDeleteRecord: "",
    vuexCommitPathForSelectedRecords: "",
    vuexCommitPathForSetEditMode: "",

    /**
     * Data di bawah ini untuk form
     */
    formShown: false,
    formEditMode: false
  }),
  computed: {
    /**
     * storeStateModule berfungsi untuk menentukan path Vuex State.
     * Item ini SANGAT DISARANKAN di-override pada Mixin table!
     */
    storeStateModule() {
      return this.$store.state;
    },

    defaultTableHeaders() {
      return this.storeStateModule.defaultTableHeaders;
    },
    smallTableHeaders() {
      return this.storeStateModule.smallTableHeaders;
    },
    singleColumnTableHeader() {
      return this.storeStateModule.singleColumnTableHeader;
    },
    tableRecords() {
      return this.storeStateModule.records;
    },
    selectedRecords: {
      get() {
        return this.storeStateModule.selectedRecords;
      },
      set(value) {
        this.$store.commit(this.vuexCommitPathForSelectedRecords, value);
      }
    },
    selectedRecord() {
      return this.storeStateModule.selectedRecord;
    },
    selectedRecordExists() {
      return this.selectedRecords.length > 0;
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
          vm.$store.dispatch(vm.vuexActionPathForReadRecords, result);
        })
        .catch(function(error) {
          vm.$store.commit("globalNotification/show", {
            color: "error",
            message: error
          });
        });
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
              id: vm.selectedRecords[0].id
            }
          })
          .then(function(result) {
            vm.$store.dispatch(vm.vuexActionPathForDeleteRecord);
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
      this.$store.commit(this.vuexCommitPathForSetEditMode, editMode);
      this.formShown = true;
    },
    closeForm() {
      this.formShown = false;
    }
  }
};

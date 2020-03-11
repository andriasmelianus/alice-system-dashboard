export const globalForm = {
  data: () => ({
    recordError: {} //Must be assigned to a proper object
  }),
  computed: {
    storeStateModule() {
      return this.$store.state; //Need to override
    },

    editedRecord() {
      return this.storeStateModule.editedRecord;
    }
  },

  mounted() {
    this.prepareForm();
  },

  methods: {
    prepareForm() {
      //Reset pesan error pada form
      Object.assign(this.recordError, this.storeStateModule.defaultRecordError);
    },

    /**
     * Method untuk men-submit form
     */
    submitForm() {
      Object.assign(this.recordError, this.storeStateModule.defaultRecordError);
      if (!this.editMode) {
        this.createRecord(this.editedRecord);
      } else {
        this.updateRecord(this.editedRecord);
      }
    },

    /**
     * Mengirimkan data record yang baru ke server
     * dengan method POST
     * @param {Object} newRecord
     */
    createRecord(newRecord) {
      let vm = this;
      vm.$axios
        .$post(vm.$store.getters.apiUrl(vm.apiUrl), newRecord)
        .then(function(result) {
          // vm.$store.dispatch(vm.vuexActionPathForCreateRecord, result);

          //Picu event recordCreated, kirimkan data ke parent component
          vm.$emit("recordCreated", result);
        })
        .catch(function(error) {
          Object.assign(vm.recordError, error.response.data.error);
          vm.$store.commit("globalNotification/show", {
            color: "error",
            message: error
          });
        });
    },

    /**
     * Mengirimkan data record yang telah diupdate ke server
     * dengan method PUT
     * @param {Object} updatedRecord
     */
    updateRecord(updatedRecord) {
      let vm = this;
      vm.$axios
        .$put(vm.$store.getters.apiUrl(vm.apiUrl), updatedRecord)
        .then(function(result) {
          // vm.$store.dispatch(vm.vuexActionPathForUpdateRecord, result);

          //Picu event recordUpdated dan kirimkan data ke parent component
          vm.$emit("recordUpdated", result);
        })
        .catch(function(error) {
          Object.assign(vm.recordError, error.response.data.error);
          vm.$store.commit("globalNotification/show", {
            color: "error",
            message: error
          });
        });
    }
  }
};

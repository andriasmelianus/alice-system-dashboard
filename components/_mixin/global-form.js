export const globalForm = {
  props: {
    record: {
      type: Object,
      default: function() {
        return {};
      }
    },
    editMode: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    defaultRecordError: {},
    recordError: {}, //Must be assigned to a proper object

    apiUrl: ""
  }),

  watch: {
    record(newRecord) {
      this.recordError = Object.assign(
        {},
        this.recordError,
        this.defaultRecordError
      );
    }
  },
  methods: {
    /**
     * Method untuk men-submit form
     */
    submitForm() {
      this.recordError = Object.assign(
        {},
        this.recordError,
        this.defaultRecordError
      );
      if (!this.editMode) {
        this.createRecord(this.record);
      } else {
        this.updateRecord(this.record);
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
          //Picu event recordCreated, kirimkan data ke parent component
          vm.$emit("recordCreated", result);
        })
        .catch(function(error) {
          vm.recordError = Object.assign(
            {},
            vm.recordError,
            error.response.data.error
          );
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
          //Picu event recordUpdated dan kirimkan data ke parent component
          vm.$emit("recordUpdated", result);
        })
        .catch(function(error) {
          vm.recordError = Object.assign(
            {},
            vm.recordError,
            error.response.data.error
          );
          vm.$store.commit("globalNotification/show", {
            color: "error",
            message: error
          });
        });
    }
  }
};

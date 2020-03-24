/**
 * Mixin Global Auto Complete
 *
 */
export const globalCombobox = {
  props: {
    value: String,
    errorMessages: Array
  },
  data: () => ({
    records: [],
    search: null,

    apiUrl: "",

    noDataText: "Tidak ada data",
    isLoading: false,
    _timerId: null
  }),

  watch: {
    search(value) {
      value && value !== this.selectedRecord && this.querySelection(value);
    }
  },
  methods: {
    querySelection(value) {
      let vm = this;
      vm.loadingStatus = true;

      // Request ke server dilakukan 300 miliseconds setelah keyup yang terakhir
      clearTimeout(vm._timerId);
      vm._timerId = setTimeout(function() {
        vm.$axios
          .$get(vm.$store.getters.apiUrl(vm.apiUrl), {
            params: {
              keyword: value
            }
          })
          .then(function(result) {
            vm.records = result;
            vm.loadingStatus = false;
          })
          .catch(function(error) {
            console.log(error);
            vm.loadingStatus = false;
          });
      }, 300);
    },

    /**
     * Mendukung fasilitas v-model
     */
    handleInput(value) {
      this.$emit("input", value);
    }
  }
};

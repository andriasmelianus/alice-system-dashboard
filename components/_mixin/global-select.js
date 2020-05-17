/**
 * Mixin Global Select
 * Mixin untuk select/combobox dengan item statis yang didapatkan dari database.
 * Biasanya item tersebut jumlahnya hanya sedikit.
 *
 * Props:
 *  value
 *  errorMessages
 */
export const globalSelect = {
  props: {
    value: Number,
    errorMessages: Array
  },

  data: function() {
    return {
      records: [],

      apiUrl: "",

      noDataText: "Tidak ada data"
    };
  },

  mounted() {
    let vm = this;
    vm.$axios
      .$get(vm.$store.getters.apiUrl(vm.apiUrl))
      .then(function(result) {
        vm.records = result;
      })
      .catch(function(error) {
        console.log(error);
      });
  },

  methods: {
    /**
     * Untuk mendukung fungsi v-model pada kontrol yang mengimplementasikan
     * @param {Number} value
     */
    handleChange(value) {
      this.$emit("input", value);
    }
  }
};

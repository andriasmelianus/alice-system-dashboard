/**
 * Mixin Global Autocomplete
 * Tipe data yang dikembalikan berupa Number.
 * Nilai yang dikembalikan biasanya merupakan ID data tersebut.
 * Menggunakan mixin ini, user TIDAK DAPAT menambahkan data baru.
 *
 * Props:
 *  value
 *  errorMessages
 *
 * Data:
 *  records
 *  search
 *  apiUrl
 *  noDataText
 *  isLoading
 *  _timerId
 *
 * Methods:
 *  querySelection
 *  handleChange
 */
export const globalAutocomplete = {
  props: {
    value: {
      type: Number,
      default: undefined
    },
    errorMessages: Array
  },
  data: function() {
    return {
      records: [],
      search: "",

      apiUrl: "",

      noDataText: "Tidak ada data",
      isLoading: false,
      _timerId: null
    };
  },
  watch: {
    value(value) {
      this.setInitialValue(value);
    },
    search(value) {
      value && value !== this.querySelection(value);
    }
  },

  mounted() {
    this.setInitialValue(this.value);
  },

  methods: {
    /**
     * Membantu kontrol untuk menampilkan nilai awal ketika ditampilkan pertama kali dalam mode edit.
     * Karena pemberian nilai awal pada props value, tidak mentrigger method pada watch.
     * Maka dari itu, method ini dipanggil baik pada mounted dan watch.
     * @param {Number} value
     */
    setInitialValue(value) {
      let vm = this;
      if (value != undefined) {
        vm.$axios
          .$get(vm.$store.getters.apiUrl(vm.apiUrl), {
            params: {
              id: value
            }
          })
          .then(function(result) {
            vm.records = result;
          })
          .catch(function(error) {
            console.log(error);
            vm.loadingStatus = false;
          });
      }
    },

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
    handleChange(value) {
      this.$emit("input", value);
    }
  }
};

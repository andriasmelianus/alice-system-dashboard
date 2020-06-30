/**
 * Mixin Global Server-Side Data Iterator
 *
 * Mixin ini menyederhanakan pembuatan data iterator yang memanfaatkan server-side pagination.
 */
export const globalServersideDataIterator = {
  props: {
    params: Object
  },

  data: () => ({
    // Table data
    records: [],
    totalRecords: undefined,

    // Pagination, sorting & other search parameter
    serverParams: {},
    otherServerParams: {},
    search: "",
    _timerId: undefined,
    isLoading: false,
    sortBy: undefined,
    sortingItems: [],
    isDescending: false,

    // Axios URL
    apiUrl: ""
  }),

  watch: {
    /**
     * Memantau perubahan props params
     * @param {Object} newParams
     * @param {Object} oldParams
     */
    params(newParams, oldParams) {
      let vm = this;
      vm.otherServerParams = Object.assign({}, newParams);

      vm.readRecords();
    },

    /**
     * Memantau perubahan pada items-per-page, sort dan sebagainya
     */
    serverParams: {
      handler() {
        this.readRecords();
      },
      deep: true
    },

    /**
     * Memantau perubahan pada data search
     * @param {String} newSearch Keyword pencarian baru
     * @param {String} oldSearch Keyword pencarian sebelumnya
     */
    search(newSearch, oldSearch) {
      let vm = this;
      clearTimeout(vm._timerId);

      vm._timerId = setTimeout(function() {
        vm.otherServerParams = Object.assign({}, vm.otherServerParams, {
          keyword: newSearch
        });

        vm.readRecords();
      }, 300);
    },

    /**
     * Memantau perubahan nilai urut berdasarkan
     * @param {String} newSortBy Nilai yang baru urutan
     * @param {String} oldSortBy Nilai yang lama urutan
     */
    sortBy(newSortBy, oldSortBy) {
      let vm = this;
      vm.otherServerParams = Object.assign({}, vm.otherServerParams, {
        sortBy: [newSortBy],
        sortDesc: [vm.isDescending]
      });

      vm.readRecords();
    },

    /**
     * Memantau perubahan nilai apakah diurutkan secara descending
     * @param {Boolean} newIsDescending Nilai baru apakah diurutkan secara descending
     * @param {Boolean} oldIsDescending Nilai lama apakah diurutkan secara descending
     */
    isDescending(newIsDescending, oldIsDescending) {
      let vm = this;
      vm.otherServerParams = Object.assign({}, vm.otherServerParams, {
        sortBy: [vm.sortBy],
        sortDesc: [newIsDescending]
      });

      vm.readRecords();
    }
  },

  methods: {
    /**
     * Membaca data dari proses server-side pagination & sorting
     */
    readRecords: function() {
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
    }
  }
};

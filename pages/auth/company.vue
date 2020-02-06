<template>
  <v-container fluid>
    <v-row>
      <v-col cols="8">
        <v-card shaped>
          <v-card-title>Data Perusahaan</v-card-title>
          <v-card-subtitle>Daftar perusahaan yang terdaftar pada sistem. Klik untuk melihat data pengguna dan data cabang yang ada di bawahnya.</v-card-subtitle>

          <v-card-text>
            <v-btn @click="companyDataFormShown = true" color="success">Tambah</v-btn>
            <v-btn
              @click="updateCompanyData"
              color="warning"
              v-if="companyDataSelected.length > 0"
            >Ubah</v-btn>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <!-- <v-btn color="error" v-if="companyDataSelected.length > 0">Hapus</v-btn> -->
          </v-card-text>

          <v-data-table
            show-select
            single-select
            :items="companyData"
            :headers="companyDataHeaders"
            v-model="companyDataSelected"
            @item-selected="companyDataSelect"
          >
            <template v-slot:top>
              <v-dialog v-model="companyDataFormShown" max-width="500px">
                <v-card>
                  <v-card-title>Data Perusahaan</v-card-title>

                  <v-card-text>
                    <v-container>
                      <v-row no-gutters>
                        <v-col cols="12">
                          <v-text-field
                            dense
                            label="Nama Perusahaan"
                            :error-messages="companyDataError.name[0]"
                            v-model="companyDataEdited.name"
                          ></v-text-field>
                        </v-col>
                      </v-row>

                      <v-row no-gutters>
                        <v-col cols="12">
                          <v-textarea
                            dense
                            label="Deskripsi"
                            :error-messages="companyDataError.description[0]"
                            v-model="companyDataEdited.description"
                            auto-grow
                            rows="2"
                          ></v-textarea>
                        </v-col>
                      </v-row>

                      <v-row no-gutters>
                        <v-col cols="12">
                          <v-text-field
                            dense
                            label="NPWP"
                            :error-messages="companyDataError.tax_id[0]"
                            v-model="companyDataEdited.tax_id"
                          ></v-text-field>
                        </v-col>
                      </v-row>

                      <v-row no-gutters>
                        <v-col cols="12">
                          <v-autocomplete
                            dense
                            label="Jenis Bisnis"
                            :items="companyBusinesses"
                            item-value="name"
                            item-text="name"
                            :error-messages="companyDataError.business[0]"
                            v-model="companyDataEdited.business"
                          ></v-autocomplete>
                        </v-col>
                      </v-row>

                      <v-row no-gutters>
                        <v-col cols="12">
                          <v-autocomplete
                            dense
                            label="Jenis Industri"
                            :items="companyIndustries"
                            item-value="name"
                            item-text="name"
                            :error-messages="companyDataError.industry[0]"
                            v-model="companyDataEdited.industry"
                          ></v-autocomplete>
                        </v-col>
                      </v-row>

                      <v-row no-gutters>
                        <v-col cols="12">
                          <v-text-field
                            dense
                            label="Alamat Website"
                            :error-messages="companyDataError.website[0]"
                            v-model="companyDataEdited.website"
                          ></v-text-field>
                        </v-col>
                      </v-row>

                      <v-row no-gutters>
                        <v-col cols="12">
                          <v-textarea
                            dense
                            label="Catatan"
                            :error-messages="companyDataError.note[0]"
                            v-model="companyDataEdited.note"
                            rows="2"
                            auto-grow
                          ></v-textarea>
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-card-text>

                  <v-card-actions>
                    <v-btn @click="sendData" color="success">Simpan</v-btn>
                    <v-btn @click="closeCompanyDataForm" color="default">Batal</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </template>
          </v-data-table>
        </v-card>
      </v-col>

      <v-col cols="4">
        <v-row dense>
          <v-col cols="12">
            <v-card>
              <v-card-title>Pengguna</v-card-title>
              <v-card-subtitle>Data pengguna yang terdaftar pada perusahaan terpilih.</v-card-subtitle>

              <v-data-table
                v-if="companyDataSelected.length > 0"
                :headers="companyUserDataHeaders"
                :items="companyUserData"
                items-per-page="5"
              >
                <template v-slot:item.is_active="{ item }">
                  <v-chip color="success" small v-if="item.is_active">Aktif</v-chip>
                  <v-chip color="default" small v-else>Tidak Aktif</v-chip>
                </template>
              </v-data-table>

              <v-card-text v-else>Pilih data perusahaan terlebih dahulu.</v-card-text>
            </v-card>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12">
            <v-card>
              <v-card-title>Cabang</v-card-title>
              <v-card-subtitle>Data cabang yang dimiliki oleh perusahaan.</v-card-subtitle>

              <v-data-table
                v-if="companyDataSelected.length > 0"
                :headers="branchDataHeaders"
                :items="branchData"
              ></v-data-table>

              <v-card-text v-else>Pilih data perusahaan terlebih dahulu</v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  middleware: "auth",
  layout: "dashboard",
  head() {
    return {
      title: "Perusahaan Terdaftar dalam Sistem"
    };
  },

  data: () => ({
    companyDataHeaders: [
      { text: "Perusahaan", value: "name", align: "left" },
      { text: "Deskripsi", value: "description" },
      { text: "NPWP", value: "tax_id" },
      { text: "Jenis Bisnis", value: "business" },
      { text: "Industri", value: "industry" },
      { text: "Web", value: "website" },
      { text: "Catatan", value: "note" }
    ],
    companyData: undefined,
    companyDataEdited: {
      name: "",
      description: "",
      tax_id: "",
      business: "",
      industry: "",
      website: "",
      note: ""
    },
    companyDataDefault: {
      name: "",
      description: "",
      tax_id: "",
      business: "",
      industry: "",
      website: "",
      note: ""
    },
    companyDataSelected: [],
    companyBusinesses: [],
    companyIndustries: [],
    companyDataIndex: -1,
    companyDataFormShown: false,
    companyDataError: {
      name: [],
      description: [],
      tax_id: [],
      business: [],
      industry: [],
      website: [],
      note: []
    },
    companyDataErrorDefault: {
      name: [],
      description: [],
      tax_id: [],
      business: [],
      industry: [],
      website: [],
      note: []
    },

    companyUserDataHeaders: [
      { text: "User", value: "user" },
      { text: "Jabatan", value: "title" },
      { text: "Aktif", value: "is_active" }
    ],
    companyUserData: undefined,

    branchDataHeaders: [
      { text: "Cabang", value: "name" },
      { text: "Kode", value: "code" },
      { text: "Catatan", value: "note" }
    ],
    branchData: undefined
  }),

  mounted() {
    let vm = this;
    vm.$axios
      .$get(vm.$store.getters.apiUrl("/company"))
      .then(function(result) {
        vm.companyData = result;
      })
      .catch(function(error) {
        vm.$store.commit("globalNotification/show", {
          color: "error",
          message: error
        });
      });
  },

  watch: {
    companyDataFormShown(isShown) {
      let vm = this;

      if (!isShown) {
        vm.closeCompanyDataForm();
      } else {
        vm.$axios
          .$get(vm.$store.getters.apiUrl("/company-businesses"))
          .then(function(result) {
            vm.companyBusinesses = result;
          })
          .catch(function(error) {
            vm.$store.commit("globalNotification/show", {
              color: "error",
              message: error
            });
          });

        vm.$axios
          .$get(vm.$store.getters.apiUrl("/company-industries"))
          .then(function(result) {
            vm.companyIndustries = result;
          })
          .catch(function(error) {
            vm.$store.commit("globalNotification/show", {
              color: "error",
              message: error
            });
          });
      }
    }
  },

  methods: {
    companyDataSelect(item) {
      let vm = this;
      if (item.value) {
        vm.$axios
          .$get(vm.$store.getters.apiUrl("/auth/user-by-company"), {
            params: {
              company_id: item.item.id
            }
          })
          .then(function(result) {
            vm.companyUserData = result;
          })
          .catch(function(error) {
            vm.$store.commit("globalNotification/show", {
              color: "error",
              message: error
            });
          });

        vm.$axios
          .$get(vm.$store.getters.apiUrl("/branch-by-company"), {
            params: {
              company_id: item.item.id
            }
          })
          .then(function(result) {
            vm.branchData = result;
          })
          .catch(function(error) {
            vm.$store.commit("globalNotification/show", {
              color: "error",
              message: error
            });
          });
      }
    },

    /**
     * Menampilkan form update data company
     *
     * @return void
     * @param (tidak ada)
     */
    updateCompanyData() {
      let vm = this;

      Object.assign(vm.companyDataEdited, vm.companyDataSelected[0]);
      vm.companyDataIndex = vm.companyData.indexOf(vm.companyDataSelected[0]);
      vm.companyDataFormShown = true;
    },

    /**
     * Mengirimkan data yang telah diedit ke server untuk disimpan
     *
     * @return void
     * @param (tidak ada)
     */
    sendData() {
      let vm = this;
      Object.assign(vm.companyDataError, vm.companyDataErrorDefault);
      if (vm.companyDataIndex == -1) {
        vm.$axios
          .$post(vm.$store.getters.apiUrl("/company"), vm.companyDataEdited)
          .then(function(result) {
            vm.companyData.push(result);
            vm.closeCompanyDataForm();
            vm.$store.commit("globalNotification/show", {
              message: "Data berhasil disimpan"
            });
          })
          .catch(function(error) {
            Object.assign(vm.companyDataError, error.response.data.error);
            vm.$store.commit("globalNotification/show", {
              color: "error",
              message: error
            });
          });
      } else {
        vm.$axios
          .$put(vm.$store.getters.apiUrl("/company"), vm.companyDataEdited)
          .then(function(result) {
            Object.assign(vm.companyDataSelected[0], result);
            vm.closeCompanyDataForm();
            vm.$store.commit("globalNotification/show", {
              message: "Data berhasil diubah"
            });
          })
          .catch(function(error) {
            Object.assign(vm.companyDataError, error.response.data.error);
            vm.$store.commit("globalNotification/show", {
              color: "error",
              message: error
            });
          });
      }
    },

    closeCompanyDataForm() {
      let vm = this;
      Object.assign(vm.companyDataEdited, vm.companyDataDefault);
      vm.companyDataFormShown = false;
      vm.companyDataIndex = -1;
    }
  }
};
</script>

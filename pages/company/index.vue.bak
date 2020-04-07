<template>
  <v-container fluid>
    <v-row>
      <v-col cols="4">
        <v-card>
          <v-card-title>Daftar Perusahaan</v-card-title>
          <v-card-subtitle>Berikut ini adalah daftar perusahaan di mana akun Anda terdaftar. Perusahaan-perusahaan yang Anda kelola akan ditampilkan pada tabel di bawah ini.</v-card-subtitle>

          <v-data-table
            show-select
            single-select
            :headers="companyDataHeaders"
            :items="companyData"
            :items-per-page="5"
            v-model="companyDataSelected"
            @item-selected="companyDataSelect"
          ></v-data-table>
        </v-card>
      </v-col>

      <v-col cols="4">
        <v-card :disabled="companyDataSelected.length == 0">
          <v-card-title>Data Perusahaan</v-card-title>
          <v-card-subtitle>Anda dapat mengubah data perusahaan melalui halaman ini.</v-card-subtitle>

          <v-card-text>
            <v-form>
              <v-text-field
                v-model="companyDataEdited.name"
                :error-messages="companyDataError.name[0]"
                label="Nama Perusahaan"
              ></v-text-field>
              <v-textarea
                v-model="companyDataEdited.description"
                :error-messages="companyDataError.description[0]"
                label="Deskripsi"
                rows="2"
                auto-grow
              ></v-textarea>
              <v-text-field
                v-model="companyDataEdited.tax_id"
                :error-messages="companyDataError.tax_id[0]"
                label="NPWP"
              ></v-text-field>
              <v-autocomplete
                v-model="companyDataEdited.business"
                :error-messages="companyDataError.business[0]"
                label="Jenis Bisnis"
                :items="companyBusinesses"
                item-text="name"
                item-value="name"
              ></v-autocomplete>
              <v-autocomplete
                v-model="companyDataEdited.industry"
                :error-messages="companyDataError.industry[0]"
                label="Jenis Industri"
                :items="companyIndustries"
                item-text="name"
                item-value="text"
              ></v-autocomplete>
              <v-text-field
                v-model="companyDataEdited.website"
                :error-messages="companyDataError.website[0]"
                label="Alamat Website"
              ></v-text-field>
              <v-textarea
                v-model="companyDataEdited.note"
                :error-messages="companyDataError.note[0]"
                label="Catatan"
                rows="2"
                auto-grow
              ></v-textarea>
            </v-form>
          </v-card-text>

          <v-card-actions>
            <v-btn @click="updateCompanyData" color="success">Simpan</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>

      <v-col cols="4">
        <v-row>
          <v-col cols="12">
            <v-card>
              <v-card-title>Data Cabang</v-card-title>
              <v-card-subtitle>Data cabang yang ada di bawah perusahaan yang dipilih.</v-card-subtitle>

              <v-card-text v-if="companyDataSelected.length > 0">
                <v-btn @click="branchDataFormShown = true" color="success">Tambah</v-btn>
                <v-btn
                  @click="branchDataUpdate"
                  color="warning"
                  v-if="branchDataSelected.length > 0"
                >Ubah</v-btn>
                <v-btn
                  @click="branchDataDelete"
                  color="error"
                  v-if="branchDataSelected.length > 0"
                >Hapus</v-btn>
              </v-card-text>

              <v-data-table
                show-select
                single-select
                v-if="companyDataSelected.length > 0"
                :headers="branchDataHeaders"
                :items="branchData"
                :items-per-page="5"
                v-model="branchDataSelected"
              >
                <template v-slot:top>
                  <v-dialog v-model="branchDataFormShown" max-width="500px">
                    <v-card>
                      <v-card-title>Data Cabang</v-card-title>

                      <v-card-text>
                        <v-form>
                          <v-text-field
                            :error-messages="branchDataError.name[0]"
                            v-model="branchDataEdited.name"
                            label="Nama Cabang"
                            dense
                          ></v-text-field>
                          <v-text-field
                            :error-messages="branchDataError.code[0]"
                            v-model="branchDataEdited.code"
                            label="Kode Cabang"
                            dense
                          ></v-text-field>
                          <v-checkbox
                            :error-messages="branchDataError.is_main_office[0]"
                            v-model="branchDataEdited.is_main_office"
                            label="Kantor Pusat"
                            dense
                          ></v-checkbox>
                          <v-text-field
                            :error-messages="branchDataError.phone[0]"
                            v-model="branchDataEdited.phone"
                            label="Telepon"
                            dense
                          ></v-text-field>
                          <v-text-field
                            :error-messages="branchDataError.address[0]"
                            v-model="branchDataEdited.address"
                            label="Alamat"
                            dense
                          ></v-text-field>
                          <v-text-field
                            :error-messages="branchDataError.city[0]"
                            v-model="branchDataEdited.city"
                            label="Kota"
                            dense
                          ></v-text-field>
                          <v-text-field
                            :error-messages="branchDataError.region[0]"
                            v-model="branchDataEdited.region"
                            label="Propinsi"
                            dense
                          ></v-text-field>
                          <v-text-field
                            :error-messages="branchDataError.country[0]"
                            v-model="branchDataEdited.country"
                            label="Negara"
                            dense
                          ></v-text-field>
                          <v-textarea
                            :error-messages="branchDataError.note[0]"
                            v-model="branchDataEdited.note"
                            label="Catatan"
                            rows="2"
                            dense
                            auto-grow
                          ></v-textarea>
                        </v-form>
                      </v-card-text>

                      <v-card-actions>
                        <v-btn @click="sendBranchData" color="success">Simpan</v-btn>
                        <v-btn @click="closeBranchDataForm" color="default">Batal</v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
                </template>
              </v-data-table>

              <v-card-text v-else>Pilih dulu data perusahaan.</v-card-text>
            </v-card>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12">
            <v-card>
              <v-card-title>Data Pengguna</v-card-title>
              <v-card-subtitle>Data pengguna yang dapat mengakses data perusahan yang dipilih.</v-card-subtitle>

              <v-card-text v-if="companyDataSelected.length > 0">
                <v-btn @click="companyUserDataFormShown = true" color="success">Tambah</v-btn>
                <v-btn
                  @click="removeCompanyUserData"
                  color="error"
                  v-if="companyUserDataSelected.length > 0"
                >Hapus</v-btn>
              </v-card-text>

              <v-data-table
                v-if="companyDataSelected.length > 0"
                :headers="companyUserDataHeaders"
                :items="companyUserData"
                show-select
                single-select
                v-model="companyUserDataSelected"
              >
                <template v-slot:top>
                  <v-dialog v-model="companyUserDataFormShown" max-width="400px">
                    <v-card>
                      <v-card-title>Tambah Pengguna Baru</v-card-title>
                      <v-card-subtitle>Pengguna yang anda tambahkan akan dapat mengakses menu-menu yang ada sesuai dengan role dan permission yang dimilikinya.</v-card-subtitle>

                      <v-card-text>
                        <v-form>
                          <v-text-field
                            v-model="companyUserDataUsername"
                            :error-messages="companyUserDataError.username"
                            @change="getUserNameByUsername"
                            label="Username"
                          ></v-text-field>

                          <v-text-field
                            v-model="companyUserDataToAdd.name"
                            disabled
                            label="Nama Pengguna"
                          ></v-text-field>

                          <v-text-field
                            v-model="companyUserDataTitle"
                            label="Jabatan"
                            :error-messages="companyUserDataError.title"
                          ></v-text-field>
                        </v-form>
                      </v-card-text>

                      <v-card-actions>
                        <v-btn @click="addCompanyUserData" color="success">Tambahkan</v-btn>
                        <v-btn @click="closeCompanyUserDataForm" color="default">Batal</v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
                </template>
              </v-data-table>

              <v-card-text v-else>Pilih dulu data perusahaan</v-card-text>
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
      title: "Data Perusahaan"
    };
  },

  data: () => ({
    /**
     * DATA PERUSAHAAN
     * COMPANY DATA
     */
    companyDataHeaders: [{ text: "Perusahaan", value: "name" }],
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
    companyBusinesses: [],
    companyIndustries: [],

    /**
     * DATA CABANG
     * BRANCH DATA
     */
    branchDataHeaders: [
      { text: "Cabang", value: "name" },
      { text: "Kode", value: "code" }
    ],
    branchData: undefined,
    branchDataEdited: {
      company_id: null,
      name: "",
      code: "",
      is_main_office: false,
      phone: "",
      address: "",
      city: "",
      region: "",
      country: "",
      note: ""
    },
    branchDataDefault: {
      company_id: null,
      name: "",
      code: "",
      is_main_office: false,
      phone: "",
      address: "",
      city: "",
      region: "",
      country: "",
      note: ""
    },
    branchDataError: {
      name: [],
      code: [],
      is_main_office: [],
      phone: [],
      address: [],
      city: [],
      region: [],
      country: [],
      note: []
    },
    branchDataErrorDefault: {
      name: [],
      code: [],
      is_main_office: [],
      phone: [],
      address: [],
      city: [],
      region: [],
      country: [],
      note: []
    },
    branchDataSelected: [],
    branchDataIndex: -1,
    branchDataFormShown: false,

    /**
     * DATA USER PADA PERUSAHAAN
     * COMPANY USER DATA
     */
    companyUserDataHeaders: [
      { text: "Nama", value: "user" },
      { text: "Username", value: "username" },
      { text: "Jabatan", value: "title" }
    ],
    companyUserData: undefined,
    companyUserDataSelected: [],
    companyUserDataFormShown: false,
    companyUserDataUsername: "",
    companyUserDataToAdd: { name: "" },
    companyUserDataToAddDefault: { name: "" },
    companyUserDataTitle: "",
    companyUserDataError: { username: [], title: [] },
    companyUserDataErrorDefault: { username: [], title: [] }
  }),

  mounted() {
    let vm = this;
    vm.$axios
      .$get(vm.$store.getters.apiUrl("/company-by-me"))
      .then(function(result) {
        vm.companyData = result;
      })
      .catch(function(error) {
        vm.$store.commit("globalNotification/show", {
          color: "error",
          message: error
        });
      });

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
  },

  watch: {
    branchDataFormShown(isShown) {
      if (!isShown) {
        this.closeBranchDataForm();
      }
    },

    companyUserDataFormShown(isShown) {
      if (!isShown) {
        this.closeCompanyUserDataForm();
      }
    }
  },

  methods: {
    /**
     * Tampilkan data pada form edit pada saat data perusahaan diselect
     *
     * @param SelectedItem item
     * @return void
     */
    companyDataSelect(item) {
      let vm = this;
      vm.branchDataSelected = [];
      vm.companyUserDataSelected = [];
      Object.assign(vm.companyDataError, vm.companyDataErrorDefault);
      if (item.value) {
        Object.assign(vm.companyDataEdited, item.item);

        //Proses mendapatkan cabang di bawah company tersebut
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

        //Proses mendapatkan data user yang terdaftar pada company yang dipilih
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
      } else {
        Object.assign(vm.companyDataEdited, vm.companyDataDefault);
      }
    },

    /**
     * Kirim data perusahaan ke server
     *
     * @param (tidak ada)
     * @return void
     */
    updateCompanyData() {
      let vm = this;
      vm.$axios
        .$put(vm.$store.getters.apiUrl("/company"), vm.companyDataEdited)
        .then(function(result) {
          Object.assign(vm.companyDataSelected[0], result);
          Object.assign(vm.companyDataError, vm.companyDataErrorDefault);
          vm.$store.commit("globalNotification/show", {
            message: "Data telah disimpan"
          });
        })
        .catch(function(error) {
          Object.assign(vm.companyDataError, error.response.data.error);
          vm.$store.commit("globalNotification/show", {
            color: "error",
            message: error
          });
        });
    },

    branchDataUpdate() {
      let vm = this;
      vm.branchDataFormShown = true;
      vm.branchDataIndex = vm.branchData.indexOf(vm.branchDataSelected[0]);
      Object.assign(vm.branchDataEdited, vm.branchDataSelected[0]);
    },

    sendBranchData() {
      let vm = this;
      vm.branchDataEdited.company_id = vm.companyDataSelected[0].id;
      if (vm.branchDataIndex == -1) {
        vm.$axios
          .$post(vm.$store.getters.apiUrl("/branch"), vm.branchDataEdited)
          .then(function(result) {
            vm.branchData.push(result);
            vm.closeBranchDataForm();
          })
          .catch(function(error) {
            Object.assign(vm.branchDataError, error.response.data.error);
            vm.$store.commit("globalNotification/show", {
              color: "error",
              message: error
            });
          });
      } else {
        vm.$axios
          .$put(vm.$store.getters.apiUrl("/branch"), vm.branchDataEdited)
          .then(function(result) {
            Object.assign(vm.branchDataSelected[0], result);
            vm.closeBranchDataForm();
            vm.$store.commit("globalNotification/show", {
              message: "Data cabang berhasil disimpan"
            });
          })
          .catch(function(error) {
            vm.$store.commit("globalNotification/show", {
              color: "error",
              message: error
            });
          });
      }
    },

    branchDataDelete() {
      if (confirm("Anda yakin akan menghapus data tersebut?")) {
        let vm = this,
          branchToDelete = vm.branchDataSelected[0];
        vm.$axios
          .$delete(vm.$store.getters.apiUrl("/branch"), {
            params: {
              id: branchToDelete.id
            }
          })
          .then(function(result) {
            vm.branchData.splice(vm.branchData.indexOf(branchToDelete), 1);
            vm.$store.commit("globalNotification/show", {
              message: "Data cabang telah dihapus"
            });
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
     * Mendapatkan data user berdasarkan username.
     * Data user dibutuhkan untuk ditambahkan pada tabel company_user.
     *
     * @param (tidak ada)
     * @return void
     */
    getUserNameByUsername() {
      let vm = this;
      vm.$axios
        .$get(vm.$store.getters.apiUrl("/auth/user-by-username"), {
          params: {
            username: vm.companyUserDataUsername
          }
        })
        .then(function(result) {
          Object.assign(
            vm.companyUserDataError,
            vm.companyUserDataErrorDefault
          );
          vm.companyUserDataToAdd = result;
        })
        .catch(function(error) {
          Object.assign(
            vm.companyUserDataToAdd,
            vm.companyUserDataToAddDefault
          );
          Object.assign(vm.companyUserDataError, error.response.data.error);
          vm.$store.commit("globalNotification/show", {
            color: "error",
            message: error
          });
        });
    },

    /**
     * Menambahkan data pada tabel company_user
     *
     * @param (tidak ada)
     * @return void
     */
    addCompanyUserData() {
      let vm = this;
      if (vm.companyUserDataToAdd.name != "") {
        vm.$axios
          .$post(vm.$store.getters.apiUrl("/company-user"), {
            company_id: vm.companyDataSelected[0].id,
            user_id: vm.companyUserDataToAdd.id,
            title: vm.companyUserDataTitle
          })
          .then(function(result) {
            vm.companyUserData.push(result);
            vm.closeCompanyUserDataForm();
          })
          .catch(function(error) {
            vm.$store.commit("globalNotification/show", {
              color: "error",
              message: error
            });
          });
      } else {
        vm.$store.commit("globalNotification/show", {
          color: "error",
          message:
            "Tidak dapat menyimpan pengguna karena masih ada inputan yang salah."
        });
      }
    },

    /**
     * Menghapus user dari perusahaan yang dipilih
     *
     * @param (tidak ada)
     * @return void
     */
    removeCompanyUserData() {
      let vm = this;
      vm.$axios
        .$delete(vm.$store.getters.apiUrl("/company-user"), {
          params: {
            // company_id: vm.companyDataSelected[0].id,
            // user_id: vm.companyUserDataSelected[0].user_id
            company_user_id: vm.companyUserDataSelected[0].id
          }
        })
        .then(function(result) {
          let companyUserIndexToRemove = vm.companyUserData.indexOf(
            vm.companyUserDataSelected[0]
          );
          vm.companyUserData.splice(companyUserIndexToRemove, 1);
        })
        .catch(function(error) {
          vm.$store.commit("globalNotification/show", {
            color: "error",
            message: error
          });
        });
    },

    closeBranchDataForm() {
      let vm = this;
      vm.branchDataFormShown = false;
      vm.branchDataIndex = -1;
      Object.assign(vm.branchDataEdited, vm.branchDataDefault);
    },

    closeCompanyUserDataForm() {
      let vm = this;
      vm.companyUserDataUsername = "";
      vm.companyUserDataTitle = "";
      Object.assign(vm.companyUserDataToAdd, vm.companyUserDataToAddDefault);
      Object.assign(vm.companyUserDataError, vm.companyUserDataErrorDefault);
      vm.companyUserDataFormShown = false;
    }
  }
};
</script>

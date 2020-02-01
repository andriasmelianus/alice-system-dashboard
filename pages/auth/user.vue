<template>
  <v-container fluid>
    <v-row justify="center">
      <v-col cols="9">
        <v-card shaped>
          <v-card-title>Pengguna</v-card-title>
          <v-card-subtitle>Daftar pengguna yang dapat mengakses sistem. Anda dapat mengelola role yang melekat pada seorang user.</v-card-subtitle>

          <v-data-table
            :headers="userDataHeaders"
            :items="userData"
            show-select
            single-select
            v-model="userDataSelected"
          >
            <template v-slot:top>
              <v-dialog v-model="userDataFormShown" max-width="500px">
                <v-card>
                  <v-card-title>Data Pengguna</v-card-title>

                  <v-card-text>
                    <v-container>
                      <v-row no-gutters>
                        <v-col cols="12">
                          <v-text-field
                            dense
                            label="Nama Pengguna"
                            v-model="userDataEdited.name"
                            :error-messages="userDataError.name[0]"
                            ref="namaPengguna"
                          ></v-text-field>
                        </v-col>
                      </v-row>

                      <v-row no-gutters>
                        <v-col cols="12">
                          <v-text-field
                            dense
                            label="Username"
                            v-model="userDataEdited.username"
                            :error-messages="userDataError.username[0]"
                          ></v-text-field>
                        </v-col>
                      </v-row>

                      <v-row no-gutters>
                        <v-col cols="12">
                          <v-text-field
                            dense
                            label="Password"
                            v-model="userDataEdited.password"
                            type="password"
                            :error-messages="userDataError.password[0]"
                          ></v-text-field>
                        </v-col>
                      </v-row>

                      <v-row no-gutters>
                        <v-col cols="12">
                          <v-checkbox
                            dense
                            :label="userDataEdited.is_active ? 'Aktif' : 'Tidak aktif'"
                            v-model="userDataEdited.is_active"
                            :error-messages="userDataError.is_active[0]"
                            color="success"
                          ></v-checkbox>
                        </v-col>
                      </v-row>

                      <v-row no-gutters>
                        <v-col cols="12">
                          <v-text-field
                            dense
                            label="Nomor Identitas (KTP/SIM)"
                            v-model="userDataEdited.id_number"
                            :error-messages="userDataError.id_number[0]"
                          ></v-text-field>
                        </v-col>
                      </v-row>

                      <v-row no-gutters>
                        <v-col cols="12">
                          <v-text-field
                            dense
                            label="Nomor Telepon"
                            v-model="userDataEdited.phone"
                            :error-messages="userDataError.phone[0]"
                          ></v-text-field>
                        </v-col>
                      </v-row>

                      <v-row no-gutters>
                        <v-col cols="12">
                          <v-text-field
                            dense
                            label="Alamat"
                            v-model="userDataEdited.address"
                            :error-messages="userDataError.address[0]"
                          ></v-text-field>
                        </v-col>
                      </v-row>

                      <v-row no-gutters>
                        <v-col cols="12">
                          <v-text-field
                            dense
                            label="Kota"
                            v-model="userDataEdited.city"
                            :error-messages="userDataError.city[0]"
                          ></v-text-field>
                        </v-col>
                      </v-row>

                      <v-row no-gutters>
                        <v-col cols="12">
                          <v-text-field
                            dense
                            label="Propinsi"
                            v-model="userDataEdited.region"
                            :error-messages="userDataError.region[0]"
                          ></v-text-field>
                        </v-col>
                      </v-row>

                      <v-row no-gutters>
                        <v-col cols="12">
                          <v-text-field
                            dense
                            label="Negara"
                            v-model="userDataEdited.country"
                            :error-messages="userDataError.country[0]"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-card-text>

                  <v-card-actions>
                    <v-btn @click="sendData" color="success">Simpan</v-btn>
                    <v-btn @click="closeUserForm" color="default">Batal</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </template>

            <template v-slot:item.name="{ item }">
              <v-tooltip left>
                <template v-slot:activator="{ on }">
                  <v-chip :color="item.is_active ? 'success' : 'default'" v-on="on">{{ item.name }}</v-chip>
                </template>

                <span>{{ item.is_active ? 'Pengguna aktif' : 'Pengguna tidak aktif' }}</span>
              </v-tooltip>
            </template>
          </v-data-table>

          <v-card-actions>
            <v-btn @click="userDataFormShown = true" color="success">Tambah</v-btn>
            <v-btn @click="updateUser" color="warning" v-if="userDataSelected.length > 0">Ubah</v-btn>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <v-btn @click="deleteData" color="error" v-if="userDataSelected.length > 0">Hapus</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col cols="3">
        <v-card>
          <v-card-title>Role</v-card-title>
          <v-card-subtitle>Role di bawah ini merupakan role yang dimiliki pengguna yang sedang dipilih pada tabel di samping.</v-card-subtitle>

          <v-card-text></v-card-text>

          <v-card-actions>
            <v-btn color="success">Tambah</v-btn>
            <v-btn color="error">Hapus</v-btn>
          </v-card-actions>
        </v-card>
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
      title: "Data Pengguna Sistem"
    };
  },

  mounted() {
    let vm = this;
    vm.$axios
      .$get(vm.$store.getters.apiUrl("/auth/user"))
      .then(function(result) {
        vm.userData = result;
      })
      .catch(function(error) {
        vm.$store.commit("globalNotification/show", {
          color: "error",
          message: error
        });
      });
  },

  data: () => ({
    userDataHeaders: [
      { text: "Nama", value: "name", align: "left" },
      { text: "Username", value: "username" },
      { text: "No.Identitas", value: "id_number" },
      { text: "Telepon", value: "phone" },
      { text: "Alamat", value: "address" },
      { text: "Kota", value: "city" },
      { text: "Propinsi", value: "region" },
      { text: "Negara", value: "country" },
      { text: "Dibuat", value: "created_at" },
      { text: "Diubah", value: "updated_at" }
    ],
    userData: undefined,
    userDataDefault: {
      name: "",
      username: "",
      password: "",
      is_active: true,
      id_number: "",
      phone: "",
      address: "",
      city: "",
      region: "",
      country: ""
    },
    userDataEdited: {
      name: "",
      username: "",
      password: "",
      is_active: true,
      id_number: "",
      phone: "",
      address: "",
      city: "",
      region: "",
      country: ""
    },
    userDataError: {
      name: [],
      username: [],
      password: [],
      is_active: [],
      id_number: [],
      phone: [],
      address: [],
      city: [],
      region: [],
      country: []
    },
    userDataErrorDefault: {
      name: [],
      username: [],
      password: [],
      is_active: [],
      id_number: [],
      phone: [],
      address: [],
      city: [],
      region: [],
      country: []
    },
    userDataSelected: [],
    userDataIndex: -1,
    userDataFormShown: false
  }),

  watch: {
    userDataFormShown(isShown) {
      if (!isShown) {
        this.closeUserForm();
      }
    }
  },

  methods: {
    updateUser() {
      let vm = this;
      Object.assign(vm.userDataEdited, vm.userDataSelected[0]);
      vm.userDataIndex = vm.userData.indexOf(vm.userDataSelected[0]);
      vm.userDataFormShown = true;
    },

    sendData() {
      let vm = this;
      Object.assign(vm.userDataError, vm.userDataErrorDefault);
      if (vm.userDataIndex == -1) {
        vm.$axios
          .$post(vm.$store.getters.apiUrl("/auth/user"), vm.userDataEdited)
          .then(function(result) {
            vm.userData.push(result);
            vm.closeUserForm();
            vm.$store.commit("globalNotification/show", {
              message: "Data berhasil disimpan"
            });
          })
          .catch(function(error) {
            Object.assign(vm.userDataError, error.response.data.error);
            vm.$store.commit("globalNotification/show", {
              color: "error",
              message: error
            });
          });
      } else {
        vm.$axios
          .$put(vm.$store.getters.apiUrl("/auth/user"), vm.userDataEdited)
          .then(function(result) {
            Object.assign(vm.userDataSelected[0], result);
            vm.closeUserForm();
            vm.$store.commit("globalNotification/show", {
              message: "Data berhasil disimpan"
            });
          })
          .catch(function(error) {
            Object.assign(vm.userDataError, error.response.data.error);
            vm.$store.commit("globalNotification/show", {
              color: "error",
              message: error
            });
          });
      }
    },
    deleteData() {
      if (confirm("Anda yakin akan menghapus data ini?")) {
        let vm = this;
        vm.$axios
          .$delete(vm.$store.getters.apiUrl("/auth/user"), {
            params: {
              id: vm.userDataSelected[0].id
            }
          })
          .then(function(result) {
            let deletedIndex = vm.userData.indexOf(vm.userDataSelected[0]);
            vm.userData.splice(deletedIndex, 1);
            vm.$store.commit("globalNotification/show", {
              message: "Data user berhasil dihapus"
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

    closeUserForm() {
      let vm = this;
      Object.assign(vm.userDataEdited, vm.userDataDefault);
      Object.assign(vm.userDataError, vm.userDataErrorDefault);
      vm.userDataFormShown = false;
      vm.userDataIndex = -1;
    }
  }
};
</script>

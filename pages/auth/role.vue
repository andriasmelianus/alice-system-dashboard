<template>
  <v-container fluid>
    <v-row justify="center">
      <v-col cols="5">
        <v-card>
          <v-card-title>Role</v-card-title>
          <v-card-subtitle>Role adalah kumpulan permission yang menentukan peran seorang pengguna. Setiap role dapat menyimpan beberapa permission sekaligus. Pengguna dapat memiliki role lebih dari satu.</v-card-subtitle>

          <v-card-text>
            <v-btn @click="roleFormShown = true" color="success">Tambah</v-btn>
            <v-btn @click="updateRole" color="warning" v-if="selectedRole.length > 0">Ubah</v-btn>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <v-btn @click="deleteRole" color="error" v-if="selectedRole.length > 0">Hapus</v-btn>
          </v-card-text>

          <v-data-table
            show-select
            single-select
            :headers="roleHeaders"
            :items="roles"
            @item-selected="roleSelected"
            v-model="selectedRole"
          >
            <template v-slot:top>
              <v-dialog v-model="roleFormShown" max-width="500px">
                <v-card>
                  <v-card-title>Data Role</v-card-title>

                  <v-card-text>
                    <v-container>
                      <v-row>
                        <v-col cols="12">
                          <v-text-field label="Nama Role" v-model="editedRole.name" ref="roleName"></v-text-field>
                        </v-col>
                      </v-row>

                      <v-row>
                        <v-col cols="12">
                          <v-text-field label="Slug" v-model="editedRole.slug"></v-text-field>
                        </v-col>
                      </v-row>

                      <v-row>
                        <v-col cols="12">
                          <v-select
                            label="Spesial"
                            :items="['', 'everything', 'nothing']"
                            v-model="editedRole.special"
                          ></v-select>
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-card-text>

                  <v-card-actions>
                    <v-btn @click="saveRole" color="success">Simpan</v-btn>
                    <v-btn @click="closeRoleForm" color="default">Batal</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </template>
          </v-data-table>
        </v-card>
      </v-col>

      <v-col cols="7">
        <v-card>
          <v-card-title>Permission</v-card-title>
          <v-card-subtitle>Permission adalah satuan akses yang mendeskripsikan hak yang dapat dimiliki oleh pengguna melalui role.</v-card-subtitle>

          <v-card-text v-if="selectedRole.length > 0">
            <v-btn @click="permissionFormShown = true" color="success">Tambah</v-btn>
            <v-btn
              @click="removePermission"
              v-if="permissionsToRemove.length > 0"
              color="error"
            >Hapus</v-btn>
          </v-card-text>
          <v-data-table
            v-if="selectedRole.length > 0"
            show-select
            :headers="permissionHeaders"
            :items="permissions"
            v-model="permissionsToRemove"
          >
            <template v-slot:top>
              <v-dialog v-model="permissionFormShown" max-width="650px">
                <v-card>
                  <v-card-title>Data Permission</v-card-title>

                  <v-data-table
                    show-select
                    :headers="permissionHeaders"
                    :items="permissionsSelect"
                    v-model="permissionsSelected"
                  ></v-data-table>

                  <v-card-actions>
                    <v-btn @click="addPermission" color="info">Pilih</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </template>
          </v-data-table>

          <v-card-text v-else class="caption">Pilih role terlebih dahulu</v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import AliceTable from "~/components/table/alice-table";
export default {
  middleware: "auth",
  layout: "dashboard",
  head() {
    return {
      title: "Data Role dan Permission"
    };
  },
  components: {
    AliceTable
  },

  data: () => ({
    roleFormShown: false,
    roleHeaders: [
      { text: "Nama", value: "name", align: "left" },
      { text: "Slug", value: "slug" },
      { text: "Spesial", value: "special" }
    ],
    roles: undefined,
    defaultRole: {
      name: "",
      slug: "",
      special: "",
      base_url: ""
    },
    editedRole: {
      name: "",
      slug: "",
      special: "",
      base_url: ""
    },
    editedRoleIndex: -1,
    selectedRole: [],

    permissionFormShown: false,
    permissionHeaders: [
      { text: "Layanan", value: "service" },
      { text: "Nama", value: "permission", align: "left" },
      { text: "slug", value: "slug" }
    ],
    permissions: undefined,
    permissionsSelect: undefined,
    permissionsSelected: [],
    permissionsToRemove: []
  }),

  mounted() {
    let vm = this;
    this.$axios
      .$get(this.$store.getters.apiUrl("/auth/role"))
      .then(result => {
        vm.roles = result;
      })
      .catch(err => {
        vm.$store.commit("globalNotification/show", {
          color: "error",
          message: err
        });
      });
  },

  watch: {
    roleFormShown(shown) {
      shown || this.closeRoleForm();
    },

    permissionFormShown(shown) {
      if (shown) {
        let vm = this;
        vm.$axios
          .$get(vm.$store.getters.apiUrl("/auth/permission"))
          .then(function(result) {
            vm.permissionsSelect = result;
          })
          .catch(function(error) {
            vm.$store.commit("globalNotification/show", {
              color: "error",
              message: error
            });
          });
      } else {
        this.closePermissionForm();
      }
    }
  },

  methods: {
    roleSelected(item) {
      /**
       * Event item-selected terpanggil 2 kali ketika opsi single-select diset.
       * Karena terdapat 2 proses, pemberian tick & penghapusan tick
       */
      let vm = this;
      vm.permissionsToRemove = [];

      if (item.value) {
        let selectedRoleId = item.item.id;
        vm.$axios
          .$get(vm.$store.getters.apiUrl("/auth/permission-by-role"), {
            params: {
              role_id: selectedRoleId
            }
          })
          .then(function(result) {
            vm.permissions = result;
          })
          .catch(err => {
            vm.$store.commit("globalNotification/show", {
              color: "error",
              message: err
            });
          });
      } else {
        vm.permissions = undefined;
      }
    },

    saveRole(e) {
      let vm = this;
      if (vm.editedRole.special == "") {
        vm.editedRole.special = undefined;
      }

      if (this.editedRoleIndex == -1) {
        //Buat role baru
        vm.$axios
          .$post(vm.$store.getters.apiUrl("/auth/role"), vm.editedRole)
          .then(function(result) {
            vm.roles.push(result);
            vm.closeRoleForm();
          })
          .catch(function(error) {
            vm.$store.commit("globalNotification/show", {
              color: "error",
              message: error
            });
          });
      } else {
        //Update data role
        vm.$axios
          .$put(vm.$store.getters.apiUrl("/auth/role"), vm.editedRole)
          .then(function(result) {
            Object.assign(vm.roles[vm.editedRoleIndex], result);
            vm.closeRoleForm();
          })
          .catch(function(error) {
            vm.$store.commit("globalNotification/show", {
              color: "error",
              message: error
            });
          });
      }
    },

    updateRole(e) {
      this.editedRoleIndex = this.roles.indexOf(this.selectedRole[0]);
      this.editedRole = Object.assign({}, this.selectedRole[0]);
      this.roleFormShown = true;
    },

    closeRoleForm() {
      this.roleFormShown = false;
      this.editedRole = Object.assign({}, this.defaultRole);
      this.editedRoleIndex = -1;
    },

    deleteRole(e) {
      if (confirm("Anda yakin akan menghapus data ini?")) {
        let vm = this;
        vm.$axios
          .$delete(vm.$store.getters.apiUrl("/auth/role"), {
            params: { id: vm.selectedRole[0].id }
          })
          .then(function(result) {
            let deletedIndex = vm.roles.indexOf(vm.selectedRole[0]);
            vm.roles.splice(deletedIndex, 1);
          });
      }
    },

    addPermission() {
      let vm = this,
        roleId = vm.selectedRole[0].id,
        permissionsToAdd = vm.permissionsSelected;

      vm.$axios
        .$post(vm.$store.getters.apiUrl("/auth/role-add-permission"), {
          role_id: roleId,
          permissions: permissionsToAdd
        })
        .then(function(result) {
          vm.permissions.push(...result);
          vm.closePermissionForm();
        })
        .catch(function(error) {
          vm.$store.commit("globalNotification/show", {
            color: "error",
            message: error
          });
        });
    },
    removePermission() {
      let vm = this,
        roleId = vm.selectedRole[0].id,
        permissionsToRemove = vm.permissionsToRemove,
        permissionIdsToRemove = Object.keys(permissionsToRemove).map(function(
          key
        ) {
          return permissionsToRemove[key].permission_id;
        });

      vm.$axios
        .$delete(vm.$store.getters.apiUrl("/auth/role-remove-permission"), {
          params: {
            role_id: roleId,
            permissions: permissionIdsToRemove
          }
        })
        .then(function(result) {
          for (let index = 0; index < permissionsToRemove.length; index++) {
            const element = permissionsToRemove[index];
            vm.permissions.splice(vm.permissions.indexOf(element), 1);
            vm.permissionsToRemove = [];
          }
        })
        .catch(function(error) {
          vm.$store.commit("globalNotification/show", {
            color: "error",
            message: error
          });
        });
    },
    closePermissionForm() {
      this.permissionFormShown = false;
      this.permissionsSelected = [];
    }
  }
};
</script>

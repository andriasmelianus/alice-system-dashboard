<template>
  <v-container fluid>
    <!-- <v-row align="center" justify="center">
      <v-col cols="12">
        <span class="headline">Daftar Layanan</span>
      </v-col>
    </v-row>-->

    <v-row justify="center">
      <v-col cols="4">
        <v-card>
          <v-toolbar color="blue" dark>
            <v-toolbar-title>Daftar Layanan</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn icon @click="create">
              <v-icon>mdi-plus</v-icon>
            </v-btn>
          </v-toolbar>

          <v-list>
            <v-list-item-group color="primary" v-model="selectedIndex">
              <v-list-item v-for="(item, i) in rawData" :key="i">
                <v-list-item-content>
                  <v-list-item-title v-text="item.name"></v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-card>
      </v-col>

      <v-col cols="8">
        <v-card>
          <v-card-title>Detil Layanan</v-card-title>

          <v-card-text>
            <v-container v-if="selectedIndex != null">
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    label="Nama Layanan"
                    v-model="rawData[selectedIndex].name"
                    :error-messages="errorMessages.name"
                  ></v-text-field>
                </v-col>
              </v-row>

              <v-row>
                <v-col cols="12">
                  <v-textarea
                    label="Keterangan"
                    v-model="rawData[selectedIndex].description"
                    rows="3"
                  ></v-textarea>
                </v-col>
              </v-row>

              <v-row>
                <v-col cols="12">
                  <v-text-field
                    label="Base URL"
                    v-model="rawData[selectedIndex].base_url"
                    :error-messages="errorMessages.base_url"
                  ></v-text-field>
                </v-col>
              </v-row>

              <v-row>
                <v-col cols="12">
                  <v-text-field
                    label="Secret"
                    v-model="rawData[selectedIndex].secret"
                    :error-messages="errorMessages.secret"
                  ></v-text-field>
                </v-col>
              </v-row>

              <!-- Bagian untuk menampilkan error pada form -->
              <v-row v-if="typeof(errorMessages) == 'string'">
                <v-col cols="12">
                  <v-chip label color="error">{{ errorMessages }}</v-chip>
                </v-col>
              </v-row>
            </v-container>

            <v-container v-else>
              <v-row>
                <v-col cols="12">Pilih salah satu layanan.</v-col>
              </v-row>
            </v-container>
          </v-card-text>

          <v-card-actions v-if="selectedIndex != null">
            <v-btn color="warning" @click="update">
              <v-icon>mdi-pencil</v-icon>Ubah
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn color="error" @click="destroy">
              <v-icon>mdi-delete</v-icon>
            </v-btn>
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
  components: {},

  head() {
    return {
      title: "Data Service (Microservice)"
    };
  },

  mounted() {
    this.fetchRawData();
  },

  data: () => ({
    rawData: null,
    selectedIndex: undefined,

    newData: {
      name: "Layanan Baru",
      description: "",
      base_url: "http://localhost",
      secret: ""
    },
    errorMessages: {}
  }),

  methods: {
    fetchRawData() {
      let vm = this;
      vm.$axios
        .$get(vm.$store.getters.apiUrl("/auth/service"))
        .then(function(result) {
          vm.rawData = result;
        })
        .catch(function(error) {
          vm.$store.commit("globalNotification/show", {
            color: "error",
            message: error
          });
        });
    },

    create: function() {
      let vm = this,
        dataCount = this.rawData.length;

      vm.$axios
        .$post(vm.$store.getters.apiUrl("/auth/service"), vm.newData)
        .then(function(result) {
          for (let index = 0; index < vm.rawData.length; index++) {
            const element = vm.rawData[index];
            if (element.id == result.id) {
              vm.selectedIndex = index;
              return;
            }
          }
          vm.rawData.splice(dataCount, 0, result);
          vm.selectedIndex = dataCount;
        })
        .catch(function(error) {
          vm.$store.commit("globalNotification/show", {
            color: "error",
            message: error
          });
        });
    },

    update: function() {
      let vm = this,
        selectedData = this.rawData[this.selectedIndex];

      vm.$axios
        .$put(vm.$store.getters.apiUrl("/auth/service"), selectedData)
        .then(function(result) {
          vm.$store.commit("globalNotification/show", {
            message: "Data berhasil diubah"
          });
          vm.errorMessages = {};
        })
        .catch(function(error) {
          vm.$store.commit("globalNotification/show", {
            color: "error",
            message: error
          });
          vm.errorMessages = error.response.data.error;

          console.log(error.response);
        });
    },

    destroy: function() {
      if (confirm("Anda yakin akan menghapus data ini?")) {
        let vm = this,
          selectedId = this.rawData[this.selectedIndex].id;
        const selectedIndexTmp = vm.selectedIndex;

        vm.$axios
          .$delete(vm.$store.getters.apiUrl("/auth/service"), {
            params: { id: selectedId }
          })
          .then(function(result) {
            vm.selectedIndex = undefined;
            vm.rawData.splice(selectedIndexTmp, 1);

            vm.$store.commit("globalNotification/show", {
              message: "Data berhasil dihapus"
            });
          })
          .catch(function(error) {
            vm.$store.commit("globalNotification/show", {
              color: "error",
              message: error
            });
          });
      }
    }
  }
};
</script>

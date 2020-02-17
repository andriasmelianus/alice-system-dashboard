<template>
  <div>
    <v-card class="ma-2" max-width="800px">
      <super-component></super-component>
    </v-card>

    <v-card class="ma-2" max-width="600px">
      <single-column-user-table></single-column-user-table>
    </v-card>

    <v-card class="ma-2" max-width="400px">
      <user-form></user-form>
    </v-card>

    <v-card class="ma-2" max-width="400px">
      <address-text-field label="Andrias"></address-text-field>
    </v-card>
  </div>
</template>

<script>
import SuperComponent from "~/components/user/table/default";
import SingleColumnUserTable from "~/components/user/table/single-column";
import UserForm from "~/components/user/form/default";
import AddressTextField from "~/components/contact/address/control/text";
export default {
  layout: "dashboard",

  mounted() {},

  components: {
    SuperComponent,
    SingleColumnUserTable,
    UserForm,

    AddressTextField
  },

  data: () => ({
    userData: {}
  })
};
</script>

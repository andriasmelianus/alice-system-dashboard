<template>
  <v-app>
    <v-content>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="4">
            <v-card class="elevation-12">
              <v-toolbar color="primary" dark flat>
                <v-toolbar-title> Login - {{ this.appName }} </v-toolbar-title>
                <v-spacer></v-spacer>
              </v-toolbar>

              <v-form @submit.prevent="submitLogin">
                <v-card-text>
                    <v-text-field v-model="username" :error-messages="invalidUsernameMessage" label="Username" name="username" prepend-icon="mdi-account-lock" type="text"></v-text-field>

                    <v-text-field v-model="password" :error-messages="invalidPasswordMessage" label="Password" name="password" prepend-icon="mdi-lock" type="password"></v-text-field>

                    <v-checkbox :checked="remember" label="Ingat saya" color="primary"></v-checkbox>
                </v-card-text>

                <v-card-actions>
                  <v-btn color="primary" type="submit">Masuk</v-btn>
                  <v-spacer></v-spacer>
                  <v-btn color="default" v-show="false"><v-icon>mdi-account-circle</v-icon>&nbsp; Daftar...</v-btn>
                </v-card-actions>
              </v-form>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>

    <v-snackbar v-model="loginFail" color="error" :top="true">
      Login gagal
    </v-snackbar>
  </v-app>
</template>

<script>
export default {
  head(){
    return {
      title: 'Login'
    }
  },

  data: () => ({
    appName: process.env.appName,
    username: '',
    password: '',

    remember: false,

    loginFail: false,
    invalidUsernameMessage: '',
    invalidPasswordMessage: '',
  }),

  beforeMount(){
    this.$auth.logout();
  },

  methods: {
    submitLogin: function(){
      this.$auth.loginWith('local', {
        data: {
          username: this.username,
          password: this.password,
          remember: this.remember
        }
      }).then((result) => {

      }).catch((err) => {
        console.log(err.response.data)

        this.loginFail = true
        this.invalidUsernameMessage = err.response.data.error.username
        this.invalidPasswordMessage = err.response.data.error.password
      });
    }
  }
}
</script>

<style>

</style>

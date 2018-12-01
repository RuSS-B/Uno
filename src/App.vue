<template>
  <v-app>
    <v-toolbar app>
      <v-toolbar-title class="headline text-uppercase">
        <span>UNO</span>
        <span class="font-weight-light">Fun project by RuSS</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn
        flat
        href="https://github.com/vuetifyjs/vuetify/releases/latest"
        target="_blank"
      >
        <span class="mr-2">Latest Release</span>
      </v-btn>
    </v-toolbar>

    <v-content>
      <v-layout align-center justify-center row mt-4 mb-4>
        <v-flex xs2>
          <img width="100%" height="100%" src='./assets/logo.png'/>
        </v-flex>
      </v-layout>

      <v-layout align-center justify-center row>
        <v-flex xs11>
          <router-view></router-view>
        </v-flex>
      </v-layout>
    </v-content>
  </v-app>
</template>

<script>

export default {
  name: 'App',
  components: {
  },
  data () {
    return {
      //
    }
  }
}
</script>

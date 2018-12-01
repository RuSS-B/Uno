<template>
  <div>
    <v-layout row justify-space-between mb-3>
      <v-flex xs6 sm4>
        <v-btn :to="{name: 'home'}" block round color="primary" dark>
          <v-icon>arrow_back</v-icon>
          Main menu
        </v-btn>
      </v-flex>
      <v-flex xs6 sm4>
        <v-btn @click="dialog = true" block round color="primary" dark>
          <v-icon>add_location</v-icon>
          Add round results
        </v-btn>
      </v-flex>
    </v-layout>

    <v-data-table
        :headers="headers"
        :items="rounds"
        :loading="!loaded"
        class="elevation-1"
    >
      <v-progress-linear slot="progress" color="blue" indeterminate></v-progress-linear>
      <template slot="items" slot-scope="props">
        <td>{{ props.item.round }}</td>
        <td v-for="(item, idx) in props.item.data" :key="idx" class="text-xs-center">
          {{ item.value }}
          <v-icon v-if="item.isWinner" color="yellow">star</v-icon>
        </td>
      </template>
    </v-data-table>

    <round-values :dialog.sync="dialog"></round-values>
  </div>
</template>

<script>
import RoundValues from '../components/RoundValues.vue'

export default {
  data () {
    return {
      dialog: false,
      loaded: true
    }
  },
  components: {
    RoundValues
  },
  computed: {
    headers () {
      const players = this.$store.state.players
      const headers = [
        {
          text: 'Name',
          align: 'left',
          sortable: false,
          value: 'name'
        }
      ]

      players.forEach((player, i) => {
        headers.push({
          text: player.name,
          align: 'center',
          sortable: false,
          value: 'u' + i
        })
      })

      return headers
    },
    rounds () {
      return this.$store.getters.tableData
    }
  },
  mounted () {
    if (!this.$store.state.newGame) {
      this.$router.push({ name: 'home' })
    }
  }
}
</script>


<style>
  div.btn__content {
    padding: 0;
  }

  div.card__actions .btn {
    min-width: 0;
  }
</style>

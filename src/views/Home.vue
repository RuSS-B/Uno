<template>
  <v-layout align-center justify-center column fill-height>
    <v-flex>
      <v-btn @click="dialog=true" color="green" block large dark>New game</v-btn>
      <v-btn to="game" color="primary" block large dark>Continue existing game</v-btn>
    </v-flex>

    <template>
      <v-layout row justify-center>
        <v-dialog v-model="dialog" persistent max-width="590">
          <v-card>
            <v-card-title class="headline">Lets collect some data about the new game!</v-card-title>
            <v-card-text>
              <v-flex v-for="(player, idx) in players" :key="idx">
                <v-text-field
                    :label="'Player #' + (idx+1)"
                    box
                    v-model="player.name"
                    append-outer-icon="clear"
                    @click:append-outer="removePlayer(idx)"
                ></v-text-field>
              </v-flex>
              <v-flex xs12 sm6>
              <v-btn block @click="addPlayer">Add more players</v-btn>
              </v-flex>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="green darken-1" flat @click="dialog = false">Disagree</v-btn>
              <v-btn :disabled="players.length < 2" color="green darken-1" flat @click="newGame">Agree</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-layout>
    </template>
  </v-layout>
</template>

<script>

export default {
  data () {
    return {
      dialog: false,
      players: [
        { name: '', total: 0 },
        { name: '', total: 0 }
      ]
    }
  },
  components: {
  },
  methods: {
    addPlayer () {
      this.players.push({ name: '', total: 0 })
    },
    removePlayer (index) {
      this.players.splice(index, 1)
    },
    newGame () {
      this.dialog = false

      this.$store.commit('newGame', this.players)
      this.$router.push({ name: 'game' })
    }
  }
}
</script>

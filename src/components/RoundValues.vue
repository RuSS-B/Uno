<template>
  <v-dialog v-model="dialog" persistent>
    <v-card>
      <v-card-title class="headline">Round values</v-card-title>
      <v-card-text>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-flex v-for="(playerData, idx) in roundData" :key="idx">
            <v-text-field
                :rules="rules"
                :label="playerData.player"
                v-model="playerData.value"
            ></v-text-field>
          </v-flex>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="green darken-1" flat @click="submit">Submit</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: ['dialog'],
  data () {
    return {
      players: [],
      valid: true,
      rules: [
        v => !!v || 'The value is required',
        v => /^\d+$/.test(v) || 'The value should be integer',
        v => (v && v <= 999 && v >= 0) || 'The value should be between 0 and 999'
      ],
      roundData: []
    }
  },
  methods: {
    submit () {
      if (this.$refs.form.validate()) {
        this.$store.commit('addRound', this.roundData)
        this.clearRoundData()

        this.$emit('update:dialog', false)
        this.valid = true
      }
    },
    clearRoundData () {
      this.roundData = []

      this.players.forEach((player) => {
        this.roundData.push({
          player: player.name,
          value: null
        })
      })
    }
  },
  mounted () {
    this.players = this.$store.state.players

    this.clearRoundData()
  }
}
</script>

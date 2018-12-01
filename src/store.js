import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    newGame: false,
    players: [],
    rounds: []
  },
  mutations: {
    newGame (state, payload) {
      state.newGame = true
      state.players = payload
    },
    addRound (state, payload) {
      const roundNumber = state.rounds.length + 1
      const data = payload.map((player) => {
        const value = Number(player.value)

        return {
          value,
          isWinner: value === 0
        }
      })

      state.rounds.push({ round: 'Round #' + roundNumber, data })

      payload.forEach((player, idx) => {
        state.players[idx].total += Number(player.value)
      })
    }
  },
  actions: {

  },
  getters: {
    tableData (state) {
      if (!state.rounds.length) {
        return []
      }

      const tableData = state.rounds.slice()
      const min = Math.min(...state.players.map(({ total }) => Number(total)))

      const data = state.players.map((player) => {
        return {
          value: player.total,
          isWinner: player.total <= min
        }
      })

      tableData.push({
        round: 'Total',
        data
      })

      return tableData
    }
  }
})

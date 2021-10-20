import { createStore } from 'vuex'

export default createStore({
  state: {
    characters: [], //almacenar todos los personajes
    charactersFilter: [] //Para hacer las consultas y los filtros del proyecto para no repetir peticiones a la API
  },
  mutations: { //para modificar el STATE -> Se hacen mediante las acciones 'actions'
    setCharacters(state, payload) { //Recibe dos argumentos el STATE ('el de encima') y el payload con las peticiones
      state.characters = payload
    },
    setCharactersFilter(state, payload) {
      state.charactersFilter = payload
    }
  },
  actions: {
    async getCharacters({commit}) {//para obtener todos los personajes de la API, este recibirá el commitpara acceder a las mutations
      try {
        //Lógica para obtener los personajes de la API
        const response = await fetch('https://rickandmortyapi.com/api/character')
        const data = await response.json()
        commit('setCharacters', data.results)
        commit('setCharactersFilter', data.results)
      } catch (error) {
        console.error(error)
      }
    },
    filterByStatus({commit, state}, status) {
      const results = state.characters.filter((characters) => {
        return characters.status.includes(status)
      })
      commit('setCharactersFilter', results)
    },
    filterByName({commit, state}, name) {
      const formatName = name.toLowerCase()
      const results = state.characters.filter((character) => {
        const characterName = character.name.toLowerCase()

        if(characterName.includes(formatName)) {
          return character
        }
      })
      commit('setCharactersFilter', results)
    }
  },
  modules: {
  }
})

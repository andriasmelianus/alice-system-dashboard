export const state = () => ({
  apiUrl: 'http://gateway.local'
})

export const getters = {
  apiUrl(state,getters,rootState){
    return function(uri=''){
      return state.apiUrl + uri
    }
  }
}

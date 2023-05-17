import allUsers from '@/api/allUsers'

const getDefaultState = () => {
  return {
    isLoading: false,
    isLoadingEmails:false,
    successMessage: "",
    errorMessage: "",
    all: [],
    single: {},
    errors: {}
  };
};

// initial state
const state = getDefaultState();

// getters
const getters = {}

// actions
const actions = {
  fetch({ commit }) {
    // commit('RESET_STATE');
    commit('SET_IS_LOADING', true);
    return new Promise((resolve, reject) => {
      allUsers.fetch().then(({ data }) => {
        if(data.status == true){
          console.log("h");
          commit('SET_SUCCESS_MESSAGE', data.message);
          commit('SET_ALL', data.data)
          resolve()
        } else {
          commit('SET_ERROR_MESSAGE', data.message);
          reject()
        }
      }).catch(({ response }) => {
        commit('SET_ERROR_MESSAGE', response.data.message);
        reject()
      }).finally(() => commit('SET_IS_LOADING', false))
    })
  },
  fetch_emails({ commit }, payload) {
    // commit('RESET_STATE');
    commit('SET_IS_LOADING_EMAILS', true);
    return new Promise((resolve, reject) => {
      allUsers.fetch_emails(payload).then(({ data }) => {
        if(data.status == true){
          console.log("h");
          commit('SET_SUCCESS_MESSAGE', data.message);
          // commit('SET_ALL', data.data)
          resolve()
        } else {
          commit('SET_ERROR_MESSAGE', data.message);
          reject()
        }
      }).catch(({ response }) => {
        commit('SET_ERROR_MESSAGE', response.data.message);
        reject()
      }).finally(() => commit('SET_IS_LOADING_EMAILS', false))
    })
  },
}
  const mutations = {
    RESET_STATE(state) {
      Object.assign(state, getDefaultState());
    },
    
    SET_SUCCESS_MESSAGE(state, message) {
      state.successMessage = message
    },
    SET_IS_LOADING(state, status) {
      state.isLoading = status
    },
    SET_IS_LOADING_EMAILS(state, status) {
      state.isLoadingEmails = status
    },
    SET_ERROR_MESSAGE(state, message) {
      state.errorMessage = message
    },
   
    SET_ALL(state, payload) {
      state.all = payload
    },
  }
  
  export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
  }

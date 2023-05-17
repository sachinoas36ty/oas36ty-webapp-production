import status from '@/api/statusMaster'

const getDefaultState = () => {
  return {
    isLoading: false,
    isLoadingMaster:false,
    successMessage: "",
    sidebarLoading:false,
    errorMessage: "",
    all: [],
    all_master: [],
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
      status.fetch().then(({ data }) => {
        if(data.status == true){
          commit('SET_SUCCESS_MESSAGE', data.message);
          commit('SET_ALL', data.data)
         setTimeout(() => resolve(), 1000);
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
  fetchAllMaster({ commit }) {
    // commit('RESET_STATE');
    commit('SET_IS_LOADING_MASTER', true);
    return new Promise((resolve, reject) => {
      status.fetchAllMaster().then(({ data }) => {
        if(data.status == true){
          commit('SET_SUCCESS_MESSAGE', data.message);
          commit('SET_ALL_MASTER', data.data)
         setTimeout(() => resolve(), 1000);
        } else {
          commit('SET_ERROR_MESSAGE', data.message);
          reject()
        }
      }).catch(({ response }) => {
        commit('SET_ERROR_MESSAGE', response.data.message);
        reject()
      }).finally(() => commit('SET_IS_LOADING_MASTER', false))
    })
  },
  // store({ commit }, payload) {
  //   commit('RESET_MESSAGES');
  //   commit('SET_SIDEBAR_LOADING', true);
  //   return new Promise((resolve, reject) => {
  //     status.store(payload).then(({ data }) => {
  //       if(data.status == true){
  //         commit('SET_SUCCESS_MESSAGE', data.message);
  //         resolve()
  //       } else {
  //         commit('SET_ERROR_MESSAGE', data.message);
  //         reject()
  //       }
  //     }).catch(({ response }) => {
  //       if(response.data.code == 'INVALID') commit('SET_ERRORS', response.data.errors);
  //       else commit('SET_ERROR_MESSAGE', response.data.message);
  //       reject()
  //     }).finally(() => commit('SET_IS_LOADING', false))
  //   })
  // },
  // update({ commit }, {payload, id}) {
  //   commit('RESET_MESSAGES');
  //   commit('SET_SIDEBAR_LOADING', true);
  //   return new Promise((resolve, reject) => {
  //     status.update({payload, id}).then(({ data }) => {
  //       if(data.status == true){
  //         commit('SET_SUCCESS_MESSAGE', data.message);
  //         resolve()
  //       } else {
  //         commit('SET_ERROR_MESSAGE', data.message);
  //         reject()
  //       }
  //     }).catch(({ response }) => {
  //       if(response.data.code == 'INVALID') commit('SET_ERRORS', response.data.errors);
  //       else commit('SET_ERROR_MESSAGE', response.data.message);
  //       reject()
  //     }).finally(() => commit('SET_IS_LOADING', false))
  //   })
  // },
  // destroy({ commit }, id) {
  //   commit('RESET_MESSAGES');
  //   commit('SET_IS_LOADING', true);
  //   return new Promise((resolve, reject) => {
  //     status.destroy(id).then(({ data }) => {
  //       if(data.status == true){
  //         commit('SET_SUCCESS_MESSAGE', data.message);
  //         resolve()
  //       } else {
  //         commit('SET_ERROR_MESSAGE', data.message);
  //         reject()
  //       }
  //     }).catch(({ response }) => {
  //       commit('SET_ERROR_MESSAGE', response.data.message);
  //       reject()
  //     }).finally(() => commit('SET_IS_LOADING', false))
  //   })
  // }
}

// mutations
const mutations = {
  RESET_STATE(state) {
    Object.assign(state, getDefaultState());
  },
  RESET_MESSAGES(state) {
    state.successMessage = ""
    state.errorMessage = ""
  },
  SET_IS_LOADING_MASTER(state,status){
    state.isLoadingMaster = status
  },
  SET_ALL_MASTER(state,payload){
    state.all_master= payload
  },
  SET_SUCCESS_MESSAGE(state, message) {
    state.successMessage = message
  },
  SET_IS_LOADING(state, status) {
    state.isLoading = status
  },
  SET_SIDEBAR_LOADING(state, status){
    state.sidebarLoading = status
  },
  SET_ERROR_MESSAGE(state, message) {
    state.errorMessage = message
  },
  SET_ERRORS(state, payload) {
    state.errors = payload
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
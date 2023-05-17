import categories from '@/api/categories'

const getDefaultState = () => {
  return {
    isLoading: false,
    isLoadingDelete: false,
    isSidebarLoading:false,
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
    commit('RESET_STATE');
    commit('SET_IS_LOADING', true);
    return new Promise((resolve, reject) => {
      categories.fetch().then(({ data }) => {
        if(data.status === true){
          commit('SET_SUCCESS_MESSAGE', data.message);
          commit('SET_ALL', data.data)
          resolve()
        } else {
          commit('SET_ERROR_MESSAGE', data.message);
          reject()
        }
      }).catch(({ response }) => {
        console.log(response);
        commit('SET_ERROR_MESSAGE', response.data.message);
        reject()
      }).finally(() => commit('SET_IS_LOADING', false))
    })
  },
  store({ commit }, payload) {
    commit('RESET_MESSAGES');
    commit('SET_SIDEBAR_LOADING', true);
    return new Promise((resolve, reject) => {
      categories.store(payload).then(({ data }) => {
        if(data.status == true){
          commit('SET_SUCCESS_MESSAGE', data.message);
          resolve()
        } else {
          commit('SET_ERROR_MESSAGE', data.message);
          reject()
        }
      }).catch(({ response }) => {
        if(response.data.code == 'INVALID') commit('SET_ERRORS', response.data.errors);
        else commit('SET_ERROR_MESSAGE', response.data.message);
        reject()
      }).finally(() => commit('SET_SIDEBAR_LOADING', false))
    })
  },
  update({ commit }, payload) {
    commit('RESET_MESSAGES');
    commit('SET_SIDEBAR_LOADING', true);
    return new Promise((resolve, reject) => {
      categories.update(payload).then(({ data }) => {
        if(data.status == true){
          commit('SET_SUCCESS_MESSAGE', data.message);
          resolve()
        } else {
          commit('SET_ERROR_MESSAGE', data.message);
          reject()
        }
      }).catch(({ response }) => {
        if(response.data.code == 'INVALID') commit('SET_ERRORS', response.data.errors);
        else commit('SET_ERROR_MESSAGE', response.data.message);
        reject()
      }).finally(() => commit('SET_IS_LOADING', false))
    })
  },
  destroy({ commit }, id) {
    commit('RESET_MESSAGES');
    commit('SET_IS_LOADING_DELETE', true);
    return new Promise((resolve, reject) => {
      categories.destroy(id).then(({ data }) => {
        if(data.status == true){
          commit('SET_SUCCESS_MESSAGE', data.message);
          resolve()
        } else {
          commit('SET_ERROR_MESSAGE', data.message);
          reject()
        }
      }).catch(({ response }) => {
        commit('SET_ERROR_MESSAGE', response.data.message);
        reject()
      }).finally(() => commit('SET_IS_LOADING_DELETE', false))
    })
  }
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
  SET_SUCCESS_MESSAGE(state, message) {
    state.successMessage = message
  },
  SET_IS_LOADING(state, status) {
    state.isLoading = status
  },
  SET_IS_LOADING_DELETE(state,status){
    state.isLoadingDelete = status
  },
  SET_SIDEBAR_LOADING(state, status){
    state.isSidebarLoading = status
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
import branches from '@/api/branches'

const getDefaultState = () => {
  return {
    isLoading: false,
    isLoadingDelete: false,

    successMessage: "",
    errorMessage: "",
    isSidebarLoading: false,
    all: [],
    businessTypes: [],
    states: [],
    logo: [],
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
    state.all= []
    commit('SET_IS_LOADING', true);
    return new Promise((resolve, reject) => {
      branches.fetch().then(({ data }) => {
        if(data.status == true){
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
  states({ commit }) {
    // commit('RESET_STATE');
    // commit('SET_IS_LOADING', true);
    return new Promise((resolve, reject) => {
      branches.states().then(({ data }) => {
        if(data.status == true){
          commit('SET_SUCCESS_MESSAGE', data.message);
          commit('SET_STATES', data.data)
          resolve()
        } else {
          commit('SET_ERROR_MESSAGE', data.message);
          reject()
        }
      }).catch(({ response }) => {
        commit('SET_ERROR_MESSAGE', response.data.message);
        reject()
      })
    })
  },
  business({ commit }) {
    // commit('RESET_STATE');
    // commit('SET_IS_LOADING', true);
    return new Promise((resolve, reject) => {
      branches.business().then(({ data }) => {
        if(data.status == true){
          commit('SET_SUCCESS_MESSAGE', data.message);
          commit('SET_BUSINESS_TYPES', data.data)
          resolve()
        } else {
          commit('SET_ERROR_MESSAGE', data.message);
          reject()
        }
      }).catch(({ response }) => {
        commit('SET_ERROR_MESSAGE', response.data.message);
        reject()
      })
    })
  },
  store({ commit }, payload) {
    commit('RESET_MESSAGES');
    commit('SET_IS_SIDEBAR_LOADING', true);
    return new Promise((resolve, reject) => {
      branches.store(payload).then(({ data }) => {
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
      }).finally(() => commit('SET_IS_SIDEBAR_LOADING', false))
    })
  },
  logo({ commit }, payload) {
    // commit('RESET_MESSAGES');
    // commit('SET_IS_SIDEBAR_LOADING', true);
    return new Promise((resolve, reject) => {
      branches.logo(payload).then(({ data }) => {
        if(data.status == true){
          // commit('SET_SUCCESS_MESSAGE', data.message);
          commit('SET_LOGO', data.data);
          resolve()
        } else {
          commit('SET_ERROR_MESSAGE', data.message);
          reject()
        }
      }).catch(({ response }) => {
        if(response.data.code == 'INVALID') commit('SET_ERRORS', response.data.errors);
        else commit('SET_ERROR_MESSAGE', response.data.message);
        reject()
      })
    })
  },
  update({ commit }, {payload, id}) {
    commit('RESET_MESSAGES');
    commit('SET_IS_SIDEBAR_LOADING', true);
    return new Promise((resolve, reject) => {
      branches.update({payload, id}).then(({ data }) => {
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
      }).finally(() => commit('SET_IS_SIDEBAR_LOADING', false))
    })
  },
  destroy({ commit }, id) {
    commit('RESET_MESSAGES');
    commit('SET_IS_LOADING_DELETE', true);
    return new Promise((resolve, reject) => {
      branches.destroy(id).then(({ data }) => {
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
  SET_IS_LOADING_DELETE(state, status) {
    state.isLoadingDelete = status
  },
  SET_IS_SIDEBAR_LOADING(state, status){
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
  SET_STATES(state, payload) {
    state.states = payload
  },
  SET_BUSINESS_TYPES(state, payload) {
    state.businessTypes = payload
  },
  SET_LOGO(state, payload) {
    state.logo = payload
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
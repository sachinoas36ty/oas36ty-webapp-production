import appTodo from '@/api/appTodo'
import auth from '@/api/auth'
import useJwt from '@/auth/jwt/useJwt'

const getDefaultState = () => ({
  isLoading: false,
  isLoadingUpdate: false,
  isL:false,
  successMessage: '',
  all: [],
  allTodo:[],
  page_info:{},
  errorMessage: '',
//   declineLoading: false,
  errors: {},
//   passwordNotRequired: false,
})
const state = getDefaultState()

const getters = {}

// actions
const actions = {
  paginate({ commit },url) {
    // commit('RESET_STATE');
    commit('SET_IS_LOADING', true);
    return new Promise((resolve, reject) => {
      appTodo.paginate(url).then(({ data }) => {
        if(data.status == true){
          console.log("h");
          commit('SET_SUCCESS_MESSAGE', data.message);
          commit('SET_ALL', data.data.data)
          commit('SET_PAGE_INFO', data.data)

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
  getAll({ commit }) {
    // commit('RESET_STATE');
    commit('SET_IS_LOADING', true);
    return new Promise((resolve, reject) => {
      appTodo.getAll().then(({ data }) => {
        if(data.status == true){
          console.log("h");
          commit('SET_SUCCESS_MESSAGE', data.message);
          commit('SET_ALL_TODO', data.data.data)
          commit('SET_PAGE_INFO', data.data)

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
  fetch({ commit }, id) {
    // commit('RESET_STATE');
    commit('SET_IS_LOADING', true);
    return new Promise((resolve, reject) => {
      appTodo.fetch(id).then(({ data }) => {
        if(data.status == true){
          console.log("h");
          commit('SET_SUCCESS_MESSAGE', data.message);
          commit('SET_ALL', data.data.data)
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
  store({ commit }, payload) {
    // commit('RESET_MESSAGES');
    // commit('SET_IS_LOADING', true);
    return new Promise((resolve, reject) => {
      appTodo.store(payload).then(({ data }) => {
        if(data.status == true){
          commit('SET_SUCCESS_MESSAGE', data.message);
          resolve()
        } else {
          commit('SET_ERROR_MESSAGE', data.message);
          reject()
        }
      }).catch(({ response }) => {
        // if(response.data.code == 'INVALID') commit('SET_ERRORS', response.data.errors);
        // else 
        commit('SET_ERROR_MESSAGE', response.data.message);
        reject()
      }).finally(() => commit('SET_IS_LOADING', false))
    })
  },
  update({ commit }, {payload, id}) {
    // commit('RESET_MESSAGES');
    commit('SET_IS_LOADING_UPDATE', true);
    return new Promise((resolve, reject) => {
      appTodo.update({payload, id}).then(({ data }) => {
        if(data.status == true){
          commit('SET_SUCCESS_MESSAGE', data.message);
          resolve()
        } else {
          commit('SET_ERROR_MESSAGE', data.message);
          reject()
        }
      }).catch(({ response }) => {
        // if(response.data.code == 'INVALID') commit('SET_ERRORS', response.data.errors);
        // else 
        commit('SET_ERROR_MESSAGE', response.data.message);
        reject()
      }).finally(() => commit('SET_IS_LOADING_UPDATE', false)
      )
    })
  },
  destroy({ commit }, id) {
    // commit('RESET_MESSAGES');
    // commit('SET_IS_LOADING', true);
    return new Promise((resolve, reject) => {
      appTodo.destroy(id).then(({ data }) => {
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
      }).finally(() => commit('SET_IS_LOADING', false))
    })
  }
}

const mutations = {
    RESET_STATE(state) {
      Object.assign(state, getDefaultState());
    },
    
    SET_SUCCESS_MESSAGE(state, message) {
      state.successMessage = message
    },
    SET_IS_LOADING(state, status) {
      // state.isLoading = status
      state.isL = status

    },
    SET_IS_LOADING_UPDATE(state, status) {
      state.isLoadingUpdate = status
    },
    SET_ERROR_MESSAGE(state, message) {
      state.errorMessage = message
    },
   
    SET_ALL(state, payload) {
      state.all = payload
    },
    SET_ALL_TODO(state,payload){
      state.allTodo = payload
    },
    SET_PAGE_INFO(state,payload){
      state.page_info = payload
    }
  }
  
  export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
  }

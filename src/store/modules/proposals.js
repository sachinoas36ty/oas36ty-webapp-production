import proposals from '@/api/proposals'

const getDefaultState = () => {
  return {
    isLoading: false,
    isLoadingBank: false,

   
    successMessage: "",
    errorMessage: "",
  
    all: [],
    allBank:[],
    allProposals: [],
 
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
    // commit('SET_IS_LOADING_LEADS', true);
    commit('SET_IS_LOADING', true);

    return new Promise((resolve, reject) => {
      proposals.fetch().then(({ data }) => {
        if(data.status === true){
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
      }).finally(() => {
        // commit('SET_IS_LOADING_LEADS', false)
        commit('SET_IS_LOADING', false)
      })
    })
  },
  bank_fetch({ commit }) {
    // commit('RESET_STATE');
    // commit('SET_IS_LOADING_LEADS', true);
    commit('SET_IS_LOADING', true);

    return new Promise((resolve, reject) => {
      proposals.bank_fetch().then(({ data }) => {
        if(data.status === true){
          commit('SET_SUCCESS_MESSAGE', data.message);
          commit('SET_ALL_BANK', data.data)
          resolve()
        } else {
          commit('SET_ERROR_MESSAGE', data.message);
          reject()
        }
      }).catch(({ response }) => {
        commit('SET_ERROR_MESSAGE', response.data.message);
        reject()
      }).finally(() => {
        // commit('SET_IS_LOADING_LEADS', false)
        commit('SET_IS_LOADING', false)
      })
    })
  },

  
  store({ commit }, payload) {
    commit('RESET_MESSAGES');
    commit('SET_IS_LOADING', true);
    return new Promise((resolve, reject) => {
      proposals.store(payload).then(({ data }) => {
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
      }).finally(() =>{
    commit('SET_IS_LOADING', false);

        //  commit('SET_IS_SIDEBAR_LOADING', false)
        })
    })
  },
  bank_create({ commit }, payload) {
    // commit('RESET_MESSAGES');
    commit('SET_IS_LOADING_BANK', true);
    return new Promise((resolve, reject) => {
      proposals.bank_create(payload).then(({ data }) => {
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
      }).finally(() =>{
        //  commit('SET_IS_SIDEBAR_LOADING', false)
        })
    })
  },
  get({ commit }, id) {
    state.allProposals = []
    // commit('RESET_STATE');
    // commit('SET_IS_LOADING_LEADS', true);
    commit('SET_IS_LOADING', true);

    return new Promise((resolve, reject) => {
      proposals.get(id).then(({ data }) => {
        if(data.status === true){
          commit('SET_SUCCESS_MESSAGE', data.message);
          commit('SET_ALL_PROPOSALS', data.data)
          resolve()
        } else {
          commit('SET_ERROR_MESSAGE', data.message);
          reject()
        }
      }).catch(({ response }) => {
        commit('SET_ERROR_MESSAGE', response.data.message);
        reject()
      }).finally(() => {
        // commit('SET_IS_LOADING_LEADS', false)
        commit('SET_IS_LOADING', false)
      })
    })
  },
  getAll({ commit }) {
    // commit('RESET_STATE');
    // commit('SET_IS_LOADING_LEADS', true);
    commit('SET_IS_LOADING', true);

    return new Promise((resolve, reject) => {
      proposals.getAll().then(({ data }) => {
        if(data.status === true){
          commit('SET_SUCCESS_MESSAGE', data.message);
          commit('SET_ALL_PROPOSALS', data.data)
          resolve()
        } else {
          commit('SET_ERROR_MESSAGE', data.message);
          reject()
        }
      }).catch(({ response }) => {
        commit('SET_ERROR_MESSAGE', response.data.message);
        reject()
      }).finally(() => {
        // commit('SET_IS_LOADING_LEADS', false)
        commit('SET_IS_LOADING', false)
      })
    })
  },
  
  create({ commit }, payload) {
    commit('RESET_MESSAGES');
    commit('SET_IS_LOADING', true);
    return new Promise((resolve, reject) => {
      proposals.create(payload).then(({ data }) => {
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
      }).finally(() => {
        // commit('SET_IS_SIDEBAR_LOADING', false)
      })
    })
  },
//   get({ commit }, id) {
//     commit('RESET_STATE');
//     commit('SET_IS_LOADING_LEADS', true);

//     commit('SET_IS_LOADING', true);
//     return new Promise((resolve, reject) => {
//       tasks.get(id).then(({ data }) => {
//         if(data.status == true){
//           commit('SET_SUCCESS_MESSAGE', data.message);
//           commit('SET_SINGLE_RECORD', data.data);
//           commit('SET_ALL_SINGLE', data.data);

//           resolve()
//         } else {
//           commit('SET_ERROR_MESSAGE', data.message);
//           reject()
//         }
//       }).catch(({ response }) => {
//         if(response.data.code == 'INVALID') commit('SET_ERRORS', response.data.errors);
//         else commit('SET_ERROR_MESSAGE', response.data.message);
//         reject()
//       }).finally(() => 
//       {
//         commit('SET_IS_LOADING', false)
//     commit('SET_IS_LOADING_LEADS', false);
//     // commit('SET_ALL_SINGLE', data.data);

//       }
//       )
//     })
//   },
  update({ commit }, {payload, id}) {
    // commit('RESET_MESSAGES');
    commit('SET_IS_LOADING', true);
    return new Promise((resolve, reject) => {
      proposals.update({payload, id}).then(({ data }) => {
        if(data.status == true){
          commit('SET_SUCCESS_MESSAGE', data.message);
          // commit('SET_SINGLE_RECORD', data.data)
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
  proposal_update({ commit }, {payload, id}) {
    // commit('RESET_MESSAGES');
    commit('SET_IS_LOADING', true);
    return new Promise((resolve, reject) => {
      proposals.proposal_update({payload, id}).then(({ data }) => {
        if(data.status == true){
          commit('SET_SUCCESS_MESSAGE', data.message);
          // commit('SET_SINGLE_RECORD', data.data)
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
  bank_update({ commit }, {payload, id}) {
    // commit('RESET_MESSAGES');
    commit('SET_IS_LOADING_BANK', true);
    return new Promise((resolve, reject) => {
      proposals.bank_update({payload, id}).then(({ data }) => {
        if(data.status == true){
          commit('SET_SUCCESS_MESSAGE', data.message);
          // commit('SET_SINGLE_RECORD', data.data)
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
    // commit('RESET_MESSAGES');
    commit('SET_IS_LOADING', true);
    return new Promise((resolve, reject) => {
      proposals.destroy(id).then(({ data }) => {
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
  },
  bank_delete({ commit }, id) {
    // commit('RESET_MESSAGES');
    commit('SET_IS_LOADING_BANK', true);
    return new Promise((resolve, reject) => {
      proposals.bank_delete(id).then(({ data }) => {
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
      }).finally(() => commit('SET_IS_LOADING_BANK', false))
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
  SET_IS_LOADING_BANK(state, status) {
    state.isLoadingBank = status
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
  SET_ALL_BANK(state, payload) {
    state.allBank = payload
  },
  SET_ALL_PROPOSALS(state, payload) {
    state.allProposals = payload
  },
  SET_ALL_SINGLE(state, payload){
    state.all = [payload]
  },
 
  SET_SINGLE_RECORD(state, payload){
    state.single = payload
  }
  
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
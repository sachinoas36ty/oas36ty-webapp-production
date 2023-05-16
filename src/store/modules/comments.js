import comments from '@/api/comments'

const getDefaultState = () => {
  return {
    isLoading: false,
    successMessage: "",
    errorMessage: "",
    assignedUsers: [],
    extraComment:[],
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
  fetch({ commit }, id) {
    // commit('RESET_STATE');
    commit('SET_IS_LOADING', true);
    return new Promise((resolve, reject) => {
      comments.fetch(id).then(({ data }) => {
        if(data.status === true){
          console.log("comments:",data)
          commit('SET_SUCCESS_MESSAGE', data.message);
          commit('SET_ALL', data.data)
          commit('SET_USERS', data.assigned_users)

          resolve()
        } else {
          commit('SET_ERROR_MESSAGE', data.message);
          reject()
        }
      }).catch(({ response }) => {
        console.log("response Comment:",response);
        commit('SET_ERROR_MESSAGE', response.data.message);
        reject()
      }).finally(() => commit('SET_IS_LOADING', false))
    })
  },
  fetch_assigned_user({ commit }) {
    commit('RESET_STATE');
    commit('SET_IS_LOADING', true);
    return new Promise((resolve, reject) => {
      comments.fetch_assigned_user().then(({ data }) => {
        if(data.status === true){
          console.log("comments:",data)
          commit('SET_SUCCESS_MESSAGE', data.message);
          commit('SET_ALL', data.data)
          commit('SET_USERS', data.assigned_users)

          resolve()
        } else {
          commit('SET_ERROR_MESSAGE', data.message);
          reject()
        }
      }).catch(({ response }) => {
        console.log("response Comment:",response);
        commit('SET_ERROR_MESSAGE', response.data.message);
        reject()
      }).finally(() => commit('SET_IS_LOADING', false))
    })
  },
  store({ commit }, {payload,id}) {
    // commit('RESET_MESSAGES');
    commit('SET_IS_LOADING', true);
    return new Promise((resolve, reject) => {
      comments.store({payload,id}).then(({ data }) => {
        if(data.status == true){
          commit('SET_SUCCESS_MESSAGE', data.message);
          commit('SET_SINGLE', data.data)

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

  
  mailToComment({ commit }, {payload,id}) {
    // commit('RESET_MESSAGES');
    // commit('SET_IS_LOADING', true);
    return new Promise((resolve, reject) => {
      comments.mailToComment({payload,id}).then(({ data }) => {
        if(data.status == true){
          commit('SET_SUCCESS_MESSAGE', data.message);
          // commit('SET_SINGLE', data.data)

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
  getMailComment({ commit }, id) {
    // state.allProposals = []
    // commit('RESET_STATE');
    // commit('SET_IS_LOADING_LEADS', true);
    commit('SET_IS_LOADING', true);

    return new Promise((resolve, reject) => {
      comments.getMailComment(id).then(({ data }) => {
        if(data.status === true){
          commit('SET_SUCCESS_MESSAGE', data.message);
          commit('SET_EXTRA_COMMENTS', data.data)
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
  update({ commit }, {payload, id}) {
    commit('RESET_MESSAGES');
    commit('SET_IS_LOADING', true);
    return new Promise((resolve, reject) => {
      comments.update({payload, id}).then(({ data }) => {
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
    commit('SET_IS_LOADING', true);
    return new Promise((resolve, reject) => {
      comments.destroy(id).then(({ data }) => {
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
  SET_ERROR_MESSAGE(state, message) {
    state.errorMessage = message
  },
  SET_ERRORS(state, payload) {
    state.errors = payload
  },
  SET_ALL(state, payload) {
    state.all = payload
  },
  SET_EXTRA_COMMENTS(state, payload) {
    payload.forEach((e) =>{
      if(e.childs){
        state.extraComment.push(e.parent)
        e.childs.forEach(cb => {
          state.extraComment.push(cb)
        });

      }else{
      // if(!e.childs){
        state.extraComment.push(e.parent)
      }
    });
    // state.extraComment = payload
  },
  SET_SINGLE(state,payload){
    state.single = payload
  },
  SET_USERS(state, users){
    state.assignedUsers = users
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
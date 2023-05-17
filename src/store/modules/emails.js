import emails from '@/api/emails'

const getDefaultState = () => {
  return {
     email_folders : [
      { title: 'Inbox', icon: 'MailIcon', route: { name: 'apps-email' } },
      { title: 'Sent', icon: 'SendIcon', route: { name: 'apps-email-folder', params: { folder: 'sent' } } },
      { title: 'Draft', icon: 'Edit2Icon', route: { name: 'apps-email-folder', params: { folder: 'draft' } } },
      { title: 'Starred', icon: 'StarIcon', route: { name: 'apps-email-folder', params: { folder: 'starred' } } },
      { title: 'Spam', icon: 'InfoIcon', route: { name: 'apps-email-folder', params: { folder: 'spam' } } },
      { title: 'Trash', icon: 'TrashIcon', route: { name: 'apps-email-folder', params: { folder: 'trash' } } },
    ],
    isLoading: false,
    isLoadingReply: false,
    isLoadingUrl:false,
    s3_url: [],
    in_bound_loading: false,
    out_bound_loading: false,
    isLoadingStore: false,
    isLoadingEmail: false,
    successMessage: "",
    isLoadingSpamTrash:false,
    errorMessage: "",
    all: [],
    all_emails: [],
    all_outbound_emails: [],
    single_outbound_emails: {},
    single_inbound_emails: {},
    single_emails: {},

    all_emails_meta:{},
    single: {},
    id: {},
    errors: {}
  };
};

// initial state
const state = getDefaultState();

// getters
const getters = {
  getId: (state)  => {
    return state.id;
  }
}

// actions
const actions = {
  fetch({ commit }) {
    commit('RESET_STATE');
    commit('SET_IS_LOADING', true);
    return new Promise((resolve, reject) => {
      emails.fetch().then(({ data }) => {
        if(data.status == true){
          commit('SET_SUCCESS_MESSAGE', data.message);
          commit('SET_ALL', data.data)
          // commit('SET_ID', data.data)
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
  google_connect({ commit }) {
    // commit('RESET_STATE');
    commit('SET_IS_LOADING', true);
    return new Promise((resolve, reject) => {
      emails.google_connect().then(({ data }) => {
        if(data.status == true){
          // commit('SET_SUCCESS_MESSAGE', data.message);
          // commit('SET_ALL_OUTBOUND_EMAILS', data.data)
          // commit('SET_ID', data.data)
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
  
  fetch_all_out_mails({ commit }) {
    commit('RESET_STATE');
    commit('SET_IS_LOADING', true);
    return new Promise((resolve, reject) => {
      emails.fetch_all_out_mails().then(({ data }) => {
        if(data.status == true){
          commit('SET_SUCCESS_MESSAGE', data.message);
          commit('SET_ALL_OUTBOUND_EMAILS', data.data)
          // commit('SET_ID', data.data)
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
  fetch_emails({ commit },payload) {
    // commit('RESET_STATE');
    commit('SET_IS_LOADING', true);
    return new Promise((resolve, reject) => {
      emails.fetch_emails(payload).then(({ data }) => {
        if(data.status == true){
          commit('SET_SUCCESS_MESSAGE', data.message);
          commit('SET_ALL_EMAILS', data.data)
          commit('SET_ALL_META', data.meta)
          // commit('SET_ID', data.data)
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
  get({ commit }, id) {
    commit('RESET_MESSAGES');
    commit('RESET_STATE');
    commit('SET_IS_LOADING', true);
    return new Promise((resolve, reject) => {
      emails.get(id).then(({ data }) => {
        if(data.status == true){
          // commit('SET_SUCCESS_MESSAGE', data.message);
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
  store({ commit }, payload) {
    commit('RESET_MESSAGES');
    commit('SET_IS_LOADING_STORE', true);
    return new Promise((resolve, reject) => {
      emails.store(payload).then(({ data }) => {
        // state.id = data.data
        if(data.status == true){
          commit('SET_SUCCESS_MESSAGE', data.message);
          commit("SET_ID", data.data)
          // console.log(state.id);

          
          resolve()
        } else {
          commit('SET_ERROR_MESSAGE', data.message);
          reject()
        }
      }).catch(({ response }) => {
        if(response.data.code == 'INVALID') commit('SET_ERRORS', response.data.errors);
        else commit('SET_ERROR_MESSAGE', response.data.message);
        reject()
      }).finally(() => commit('SET_IS_LOADING_STORE', false))
    })
  },
  storeEmailInbound({ commit }, payload) {
    commit('RESET_MESSAGES');
    commit('SET_INBOUND_LOADING', true);
    return new Promise((resolve, reject) => {
      emails.storeEmailInbound(payload).then(({ data }) => {
        if(data.status == true){
          commit('SET_SUCCESS_MESSAGE', data.message);
          resolve()
        } else {
          commit('SET_ERROR_MESSAGE', data.message);
          reject()
        }
      }).catch(({ response }) => {
        // if(response.data.code == 'INVALID') commit('SET_ERRORS', response.data.errors);
        //else
         commit('SET_ERROR_MESSAGE', response.data.message);
        reject()
      }).finally(() => commit('SET_INBOUND_LOADING', false))
    })
  },

  sendEmail({ commit }, payload) {
    // commit('RESET_MESSAGES');
    commit('SET_INBOUND_LOADING', true);
    return new Promise((resolve, reject) => {
      emails.sendEmail(payload).then(({ data }) => {
        if(data.status == true){
          console.log(data);
          if(data.status_code === 200){

            commit('SET_SUCCESS_MESSAGE', data.message);
            resolve()
          } else {
            commit('SET_ERROR_MESSAGE', data.message);
            reject()
          }
        }
      }).catch(({ response }) => {
        // if(response.data.code == 'INVALID') commit('SET_ERRORS', response.data.errors);
        //else
         commit('SET_ERROR_MESSAGE', response.data.message);
        reject()
      }).finally(() => commit('SET_INBOUND_LOADING', false))
    })
  },
  update_email_inbound({ commit }, {payload, id}) {
    commit('RESET_MESSAGES');
    commit('SET_INBOUND_LOADING', true);
    return new Promise((resolve, reject) => {
      emails.update_email_inbound({payload, id}).then(({ data }) => {
        if(data.status == true){
          commit('SET_SUCCESS_MESSAGE', data.message);
          commit('SET_SINGLE_IN_BOUND', data.data)

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
      }).finally(() => commit('SET_INBOUND_LOADING', false))
    })
  },
  storeEmailOutbound({ commit }, payload) {
    commit('RESET_MESSAGES');
    commit('SET_OUTBOUND_LOADING', true);
    return new Promise((resolve, reject) => {
      emails.storeEmailOutbound(payload).then(({ data }) => {
        if(data.status == true){
          commit('SET_SUCCESS_MESSAGE', data.message);
          resolve()
        } else {
          commit('SET_ERROR_MESSAGE', data.message);
          reject()
        }
      }).catch(({ response }) => {
        //if(response.data.code == 'INVALID') commit('SET_ERRORS', response.data.errors);
        //else 
        commit('SET_ERROR_MESSAGE', response.data.message);
        reject()
      }).finally(() => commit('SET_OUTBOUND_LOADING', false))
    })
  },
  update_email_outbound({ commit }, {payload, id}) {
    commit('RESET_MESSAGES');
    commit('SET_OUTBOUND_LOADING', true);
    return new Promise((resolve, reject) => {
      emails.update_email_outbound({payload, id}).then(({ data }) => {
        if(data.status == true){
          commit('SET_SUCCESS_MESSAGE', data.message);
          commit('SET_SINGLE_OUT_BOUND', data.data)
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
      }).finally(() => commit('SET_OUTBOUND_LOADING', false))
    })
  },
  update({ commit }, {payload, id}) {
    commit('RESET_MESSAGES');
    commit('SET_IS_LOADING_EMAIL', true);
    return new Promise((resolve, reject) => {
      emails.update({payload, id}).then(({ data }) => {
        if(data.status == true){
          commit('SET_SUCCESS_MESSAGE', data.message);
          commit('SET_SINGLE_EMAIL', data.data)
          resolve()
        } else {
          commit('SET_ERROR_MESSAGE', data.message);
          reject()
        }
      }).catch(({ response }) => {
        if(response.data.code == 'INVALID') commit('SET_ERRORS', response.data.errors);
        else commit('SET_ERROR_MESSAGE', response.data.message);
        reject()
      }).finally(() => commit('SET_IS_LOADING_EMAIL', false))
    })
  },
  reply_all({ commit }, payload) {
    commit('RESET_MESSAGES');
    commit('SET_IS_LOADING_REPLY', true);
    return new Promise((resolve, reject) => {
      emails.reply_all(payload).then(({ data }) => {
        // state.id = data.data
        if(data.status == true){
          commit('SET_SUCCESS_MESSAGE', data.message);
          // commit("SET_ID", data.data)
          // console.log(state.id);

          
          resolve()
        } else {
          commit('SET_ERROR_MESSAGE', data.message);
          reject()
        }
      }).catch(({ response }) => {
        if(response.data.code == 'INVALID') commit('SET_ERRORS', response.data.errors);
        else commit('SET_ERROR_MESSAGE', response.data.message);
        reject()
      }).finally(() => commit('SET_IS_LOADING_REPLY', false))
    })
  },
  toggleStarred({ commit }, payload) {
    // commit('RESET_MESSAGES');
    // commit('SET_IS_LOADING_STARRED', true);
    return new Promise((resolve, reject) => {
      emails.toggleStarred(payload).then(({ data }) => {
        // state.id = data.data
        if(data.status == true){
          commit('SET_SUCCESS_MESSAGE', data.message);
          // commit("SET_ID", data.data)
          // console.log(state.id);

          commit("SET_ALL_EMAILS", data.data)
          commit('SET_ALL_META', data.meta)

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
        //commit('SET_IS_LOADING_STARRED', false)
      })

    })
  },
  markSpamTrash({ commit }, payload) {
    // commit('RESET_MESSAGES');
    commit('SET_IS_LOADING_SPAM_TRASH', true);
    return new Promise((resolve, reject) => {
      emails.markSpamTrash(payload).then(({ data }) => {
        // state.id = data.data
        if(data.status == true){
          commit('SET_SUCCESS_MESSAGE', data.message);
          // commit("SET_ID", data.data)
          // console.log(state.id);

          commit("SET_ALL_EMAILS", data.data)
          commit('SET_ALL_META', data.meta)

          resolve()
        } else {
          commit('SET_ERROR_MESSAGE', data.message);
          reject()
        }
      }).catch(({ response }) => {
        if(response.data.code == 'INVALID') commit('SET_ERRORS', response.data.errors);
        else commit('SET_ERROR_MESSAGE', response.data.message);
        reject()
      }).finally(() => commit('SET_IS_LOADING_SPAM_TRASH', false))
    })
  },
  destroy({ commit }, id) {
    commit('RESET_MESSAGES');
    commit('SET_IS_LOADING', true);
    return new Promise((resolve, reject) => {
      emails.destroy(id).then(({ data }) => {
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
  SET_IS_LOADING_URL(state, status) {
    state.isLoadingUrl = status
    
    
  },
  SET_SINGLE_EMAIL(state, payload){
    state.single_emails = payload
  },
  SET_IS_LOADING_EMAIL(state, status) {
    state.isLoadingEmail = status
    
    
  },
  SET_IS_LOADING_SPAM_TRASH(state, status){
    state.isLoadingSpamTrash = status
  },
  SET_IS_LOADING_STORE(state, status) {
    state.isLoadingStore = status
    
    
  },
  SET_IS_LOADING_REPLY(state, status) {
    state.isLoadingReply = status
    
    
  },
  SET_INBOUND_LOADING(state, status){
    state.in_bound_loading = status

  },
  SET_OUTBOUND_LOADING(state, status){
    state.out_bound_loading = status

  },
  SET_ALL_OUTBOUND_EMAILS(state, payload){
    state.all_outbound_emails = payload
  },
  SET_SINGLE_OUT_BOUND(state, payload){
    state.single_outbound_emails = payload
  },
  SET_SINGLE_IN_BOUND(state, payload){
    state.single_inbound_emails = payload
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
  SET_URL(state, payload) {
    state.s3_url = payload
  },
  SET_ALL_EMAILS(state, payload){
    state.all_emails = payload
  },
  SET_ALL_META(state, payload){
    state.all_emails_meta = payload
  },
  SET_ID(state, data){
    state.id = data
  }
 
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
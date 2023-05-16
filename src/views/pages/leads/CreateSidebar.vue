<template>
  <div>
    <!-- <snackbar ref="snackbar" style="z-index: 2000!important;" position="bottom-left"   :multiple="true"/> -->


    <b-sidebar id="leads-create-sidebar" :visible="isCreateSidebarActive" bg-variant="white" sidebar-class="sidebar-lg"
      shadow backdrop no-header right @hidden="resetForm"
      @change="(val) => $emit('update:is-create-sidebar-active', val)">
      <template #default="{ hide }">
        <!-- Header -->
        <div class="d-flex justify-content-between align-items-center content-sidebar-header px-2 py-1">
          <h5 class="mb-0">
            Add New Leads
          </h5>

          <feather-icon class="ml-1 cursor-pointer" icon="XIcon" size="16" @click="hide" />
        </div>

        <!-- BODY -->
        <validation-observer #default="{ handleSubmit }" ref="refFormObserver">
          <b-form class="p-2" @submit.prevent="handleSubmit(onSubmit)" @reset.prevent="resetForm">
            <validation-provider #default="{ errors }" name="Subject" vid="subject" rules="required">
              <b-form-group label="Subject *" label-for="subject">
                <b-form-input id="subject" v-model="formData.subject" autofocus
                  :state="errors.length > 0 ? false : null" required trim placeholder="" />
                <b-form-invalid-feedback>
                  {{ errors[0] }}
                </b-form-invalid-feedback>
              </b-form-group>
            </validation-provider>
            <validation-provider #default="{ errors }" name="Description" vid="description" rules="required">
              <b-form-group label="Description" label-for="description">
                <quill-editor v-model="formData.description" :options="editorOption">

                  <div id="toolbar" slot="toolbar">
                    <!-- Add a bold button -->

                  </div>
                </quill-editor>
                <!-- <b-form-input id="description" v-model="formData.description" autofocus
                :state="errors.length > 0 ? false : null" required trim placeholder="" /> -->
                <b-form-invalid-feedback>
                  {{ errors[0] }}
                </b-form-invalid-feedback>
              </b-form-group>

            </validation-provider>
            <div>
              <!-- <b-form-input hidden
              v-if="categories.length === 1"
              id="category"
              :value="categories[0].id"
            /> -->
              <b-form-input v-if="branches.length === 1 " id="branches" hidden :value="branches[0].id" />
              <b-form-input v-if="branches.length === 0 " id="branches" hidden :value="0" />


              <!-- <b-form-input
              v-if="clients.length === 1"
              id="client"
              hidden
              :value="clients[0].id"
            />
            <b-form-input
              v-if="contactPeople.length === 1"
              id="contactPeople"
              hidden
              :value="contactPeople[0].id"
            /> -->


            </div>
            <validation-provider #default="{ errors }" v-if="branches.length > 1" name="branch_id" vid="branch" rules="required">
            <b-form-group  label="Branches *" label-for="branch">
              <v-select id="branch" v-model="formData.branch_id" placeholder="Select an option" label="name"
                :options="branches" />
                <b-form-invalid-feedback class="d-flex">
                    {{ errors[0] }}
                  </b-form-invalid-feedback>
            </b-form-group>
            </validation-provider>
            <b-form-group label="Category" label-for="category">
              <v-select v-model="formData.category_id" placeholder="Select an option" label="name"
                :options="categories" @input="categoryUser" />

            </b-form-group>

            <b-form-group label="Company" label-for="company">
              <v-select v-model="formData.company_id" placeholder="Select an option" label="name" :options="clients">

              </v-select>

            </b-form-group>

            <b-form-group label="Contact-Person" label-for="contact-person">
              <v-select v-model="formData.contact_person_id" placeholder="Select an option" label="name"
                :options="contactPeople" >
                <template #option="{item}">
                  {{item.substring(0,8)+'...'}}
                </template>
                <template #selected-option="{item}">
                  {{item}}
                </template>
                </v-select>

            </b-form-group>

            <b-form-group label="Assignee" label-for="assignee">
              <v-select v-model="formData.users" input-id="assignee" multiple placeholder="Select an option"
                label="name" :options="allUsers" />

            </b-form-group>
            <validation-provider #default="{ errors }" name="priority" vid="priority" rules="required">

            <b-form-group label="Priority *" label-for="priority">
              <v-select id="priority" v-model="formData.priority" placeholder="Select an option" label="star" :options="importance">
                <template #option="{ star, icon }">
                  <div v-if="star === '*'">

                    <feather-icon icon="StarIcon" size="16" class="align-middle mr-50" />
                  </div>
                  <div v-if="star === '* *'">

                    <feather-icon icon="StarIcon" size="16" class="align-middle mr-50" />
                    <feather-icon icon="StarIcon" size="16" class="align-middle mr-50" />
                  </div>
                  <div v-if="star === '* * *'">

                    <feather-icon icon="StarIcon" size="16" class="align-middle mr-50" />
                    <feather-icon icon="StarIcon" size="16" class="align-middle mr-50" />

                    <feather-icon icon="StarIcon" size="16" class="align-middle mr-50" />
                  </div>

                  <div v-if="star === '* * * *'">

                    <feather-icon icon="StarIcon" size="16" class="align-middle mr-50" />
                    <feather-icon icon="StarIcon" size="16" class="align-middle mr-50" />

                    <feather-icon icon="StarIcon" size="16" class="align-middle mr-50" />
                    <feather-icon icon="StarIcon" size="16" class="align-middle mr-50" />
                  </div>
                  <div v-if="star === '* * * * *'">

                    <feather-icon icon="StarIcon" size="16" class="align-middle mr-50" />
                    <feather-icon icon="StarIcon" size="16" class="align-middle mr-50" />

                    <feather-icon icon="StarIcon" size="16" class="align-middle mr-50" />
                    <feather-icon icon="StarIcon" size="16" class="align-middle mr-50" />
                    <feather-icon icon="StarIcon" size="16" class="align-middle mr-50" />

                  </div>
                  <!-- <feather-icon v-if="star === '* * *'"

                  icon="StarIcon"
                  size="16"
                  class="align-middle mr-50"
                /> -->
                  <!-- <span> {{ title }}</span> -->
                </template>

                <template #selected-option="{ star, icon }">
                  <div v-if="star === '*'">

                    <feather-icon icon="StarIcon" size="16" class="align-middle mr-50" />
                  </div>
                  <div v-if="star === '* *'">

                    <feather-icon icon="StarIcon" size="16" class="align-middle mr-50" />
                    <feather-icon icon="StarIcon" size="16" class="align-middle mr-50" />
                  </div>
                  <div v-if="star === '* * *'">

                    <feather-icon icon="StarIcon" size="16" class="align-middle mr-50" />
                    <feather-icon icon="StarIcon" size="16" class="align-middle mr-50" />

                    <feather-icon icon="StarIcon" size="16" class="align-middle mr-50" />
                  </div>

                  <div v-if="star === '* * * *'">

                    <feather-icon icon="StarIcon" size="16" class="align-middle mr-50" />
                    <feather-icon icon="StarIcon" size="16" class="align-middle mr-50" />

                    <feather-icon icon="StarIcon" size="16" class="align-middle mr-50" />
                    <feather-icon icon="StarIcon" size="16" class="align-middle mr-50" />
                  </div>
                  <div v-if="star === '* * * * *'">

                    <feather-icon icon="StarIcon" size="16" class="align-middle mr-50" />
                    <feather-icon icon="StarIcon" size="16" class="align-middle mr-50" />

                    <feather-icon icon="StarIcon" size="16" class="align-middle mr-50" />
                    <feather-icon icon="StarIcon" size="16" class="align-middle mr-50" />
                    <feather-icon icon="StarIcon" size="16" class="align-middle mr-50" />

                  </div>
                  <!-- <feather-icon v-if="star === '* * *'"

                  icon="StarIcon"
                  size="16"
                  class="align-middle mr-50"
                /> -->
                  <!-- <span> {{ title }}</span> -->
                </template>

              </v-select>
              <b-form-invalid-feedback class="d-flex">
                    {{ errors[0] }}
                  </b-form-invalid-feedback>
            </b-form-group>
            </validation-provider>
            <validation-provider #default="{ errors }" name="due_date" vid="due_date" rules="required">
              <b-form-group label="Due Date *" label-for="Due Date">
                <flat-pickr id="due_date" :state="errors.length > 0 ? false : null" autofocus
                  v-model="formData.due_date" class="form-control" trim />
                <b-form-invalid-feedback class="d-flex">
                  {{ errors[0] }}
                </b-form-invalid-feedback>
              </b-form-group>
            </validation-provider>

            <!-- <b-form-group label="Status" label-for="status">
                 <b-form-select  v-model="formData.status">

                 </b-form-select>
            </b-form-group> -->
            <!-- <b-form-group label="Users" label-for="users">
                 <b-form-select  v-model="hshs">

                 </b-form-select>
            </b-form-group> -->

            <!-- Form Actions -->
            <div class="d-flex mt-2">
               <b-button size="sm" v-ripple.400="'rgba(255, 255, 255, 0.15)'" variant="primary" class="mr-2" type="submit"
                :disabled="isLoading">

                Add
                <b-spinner small class="ml-1" v-if="isLoading" />
              </b-button>
               <b-button size="sm" v-ripple.400="'rgba(186, 191, 199, 0.15)'" type="button" variant="outline-secondary"
                @click="hide">
                Cancel
              </b-button>
            </div>
          </b-form>
        </validation-observer>
      </template>
    </b-sidebar>
  </div>
</template>

<script>
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import { ref, computed } from '@vue/composition-api'
import 'quill/dist/quill.core.css'
// import { mapGetters } from 'vuex'

// eslint-disable-next-line
import 'quill/dist/quill.snow.css'
// eslint-disable-next-line
import 'quill/dist/quill.bubble.css'
import flatPickr from 'vue-flatpickr-component'

import { quillEditor } from 'vue-quill-editor'

import { required, email } from '@validations'
import vSelect from 'vue-select'
import formValidation from '@core/comp-functions/forms/form-validation'
// import vueStarRate from 'vue-js-star-rating';

import {
  BSidebar,
  BButton,
  // BModal,
  // BFormRating,
  BForm,
  BFormDatepicker,
  BFormInput,
  BSpinner,
  BFormInvalidFeedback,
  BFormGroup,
  // BCardText,
  // BFormSelect,
} from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'
// import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import store from '@/store'
import { emit } from 'process'
import branches from '@/api/branches'
import Snackbar from 'vuejs-snackbar';
import { useToast } from 'vue-toastification/composition'


export default {
  components: {
    // vueStarRate,
    BSidebar, Snackbar,
    BButton,
    // BModal,
    vSelect,
    flatPickr,
    BSpinner,
    BForm,
    BFormDatepicker,
    // BFormRating,
    BFormInput,
    BFormInvalidFeedback,
    // BCardText,
    quillEditor,
    BFormGroup,
    // BFormSelect,
    ValidationProvider,
    ValidationObserver,
  },
  directives: {
    Ripple,
  },
  model: {
    prop: 'isCreateSidebarActive',
    event: 'update:is-create-sidebar-active',
  },
  props: {
    isCreateSidebarActive: {
      type: Boolean,
      required: true,
    },
  },
  //   mounted(){
  //     //  console.log(this.computed.length());
  //     if(this.categories === 1){
  //       this.formData.category_id = document.getElementById('category').value;
  //     }
  //     if(this.branches === 1){
  //       this.formData.branch_id = document.getElementById('branches').value;

  //     }
  //     if(this.clients === 1){
  //       this.formData.company_id = document.getElementById('client').value;

  //     }
  //     if(this.contactPeople === 1){
  //       this.formData.contact_person_id = document.getElementById('contactPeople').value;

  //     }
  // },

  data() {
    return {
      array: [],
      importance: [{ id: 1, star: '*' }, { id: 2, star: '* *' }, { id: 3, star: '* * *' }, { id: 4, star: '* * * *' }, { id: 5, star: '* * * * *' }],
      editorOption: {
        modules: {
          toolbar: false,
        },
      },
      subject: '',
      description: '',
      // importance: [],
      priority: [],
      users: [],
      type: 'lead',
      category_id: null,
      branch_id: null,
      company_id: null,
      contact_person_id: null,
      due_date: null,
      // validation rules'
      required,
      // value_of_branches:null,
      // formData: {
      //   subject: '',
      //   description: '',
      //   importance: 3,
      //   type: 'lead',
      //   category_id: null,
      //   branch_id: null,
      //   company_id: null,
      //   contact_person_id: null,
      //   due_date: null,
      //   // status:'open'
      // }
    }
  },
  computed: {

    isLoading() {
      return this.$store.state.leads.isSidebarLoading
    },
    successMessage() {
      return this.$store.state.leads.successMessage
    },
    errorMessage() {
      return this.$store.state.leads.errorMessage
    },
    // errors() {
    //   return JSON.parse(JSON.stringify(this.$store.state.leads.errors))
    // },
    categoryLength() {
      return this.categories.length
    },
    categories() {
      return this.$store.state.categories.all
    },
    branches() {
      console.log('Branches:', this.$store.state.branches.all)
      // this.value_of_branches =  this.$store.state.branches.all[0].id
      return this.$store.state.branches.all
    },
    clients() {
      return this.$store.state.clients.all
    },
    contactPeople() {
      return this.$store.state.contactPeople.allForLeads
    },
    allUsers() {
      return this.$store.state.users.all.filter(e => e.status === 'active')
    },

  },

  mounted() {
    //   this.formData.contact_person_id = document.getElementById('contactPeople').value
    const root = ref(null)
    console.log('root:', root)
    // this.fetch()
    // this.fetchBranches()
    // // console.log(this);
    // this.fetchCategories()
    // this.fetchClients()
    // this.fetchContactPeople()
    // this.fetchAllUsers()
    console.log('mounted')
  },
  updated() {

    // console.log('hello branches:', this.value_of_branches)
   
  },

  methods: {
    categoryUser(data){
      var d = new Date();
      d.setDate(d.getDate() + data.due_date)
      this.formData.users = data.users;
      this.formData.due_date = d;
    },
    onSubmit(){
   
      if (this.$store.state.branches.all.length === 1) {
        // console.log(formData);
        this.formData.branch_id = { b_id: document.getElementById('branches').value };
      }
      var leadsData = {
        branch_id: this.formData.branch_id,
        category_id: this.formData.category_id,
        contact_person_id: this.formData.contact_person_id,
        company_id: this.formData.company_id,
        subject: this.formData.subject,
        description: this.formData.description,
        type: 'lead',
        priority: this.formData.priority,
        due_date: this.formData.due_date,
        users: this.formData.users
      
      }
      // e.preventDefault();
      // console.log(formData.value)
      this.$store
        .dispatch('leads/store', leadsData)
        .then(() => {
      
          this.$emit('refetch-data')
          this.$emit('update:is-create-sidebar-active', false)
          // this._props.isCreateSidebarActive = false;
          this.fetch();
          if(this.$store.state.leads.successMessage){

this.$toast.success(this.$store.state.leads.successMessage, {
  position: "bottom-left",
timeout: 5000,
closeOnClick: true,
pauseOnFocusLoss: true,
pauseOnHover: true,
draggable: true,
draggablePercent: 0.6,
showCloseButtonOnHover: false,
hideProgressBar: true,
closeButton: "button",
icon: true,
rtl: false
})
} 

          var t = 'info';
          // toast('hello')
        })
        .catch(() => {
          // refFormObserver.value.setErrors(errors.value)
          if(this.$store.state.leads.errors.branch_id){

            this.$toast.error('Branch is required.', {
              position: "bottom-left",
          timeout: 5000,
          closeOnClick: true,
          pauseOnFocusLoss: true,
          pauseOnHover: true,
          draggable: true,
          draggablePercent: 0.6,
          showCloseButtonOnHover: false,
          hideProgressBar: true,
          closeButton: "button",
          icon: true,
          rtl: false
        })
      }
      })
    },
    fetch() {
      this.$store.dispatch('leads/fetch')
    },
    fetchBranches() {
      this.$store.dispatch('branches/fetch')
    },
    fetchCategories() {
      this.$store.dispatch('categories/fetch')
    },
    fetchClients() {
      this.$store.dispatch('clients/fetch')
    },
    fetchContactPeople() {
      this.$store.dispatch('contactPeople/fetchForLeads')
    },
    fetchAllUsers() {
      this.$store.dispatch('allUsers/fetch')
    },

  },
  // eslint-disable-next-line no-shadow
  setup(props, { emit }) {
    const blankFormData = {
      subject: '',
      description: '',

      priority: [],
      users: [],
      type: 'lead',
      category_id: null,
      // b_id: document.getElementById('branches').value ?? null,
      branch_id: null,
      company_id: null,
      contact_person_id: null,
      due_date: null,

      // branch_id: document.getElementById('branch').value,
      // category_id: document.getElementById('category').value,
      // company_id: document.getElementById('client').value,
    }

    console.log(blankFormData);
    const formData = ref(JSON.parse(JSON.stringify(blankFormData)))
    const resetFormData = () => {
      formData.value = JSON.parse(JSON.stringify(blankFormData))
    }

    const errors = computed(() => store.state.leads.errors.branch_id ? store.state.leads.errors.branch_id[0] : '')

    const { refFormObserver, getValidationState, resetForm } = formValidation(resetFormData)
    console.log()

      // const onSubmit = e => {
      // if (store.state.branches.all.length === 1) {
      //   console.log(formData);
      //   formData.value.branch_id = { b_id: document.getElementById('branches').value };
      // }
      // e.preventDefault();
      // console.log(formData.value)
      // store
      //   .dispatch('leads/store', formData.value)
      //   .then(() => {
      //     emit('refetch-data')
      //     emit('update:is-create-sidebar-active', false)
      //     var t = 'info';
      //     // toast('hello')
      //   })
      //   .catch(() => {
      //     refFormObserver.value.setErrors(errors.value)
      //   })
    // }

    return {
      formData,
      // onSubmit,
      errors,

      refFormObserver,
      getValidationState,
      resetForm,
    }
  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';
@import '@core/scss/vue/libs/vue-flatpicker.scss';
</style>

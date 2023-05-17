<template>
  <b-container id="categories-edit" bg-variant="white" shadow backdrop no-header right>
    <!--  :visible="isEditSidebarActive"  @hidden="resetForm"
      @change="(val) => $emit('update:is-edit-sidebar-active', val)"    sidebar-class="sidebar-lg"-->
    <template>
      <!-- Header
        <div
          class="d-flex justify-content-between align-items-center content-sidebar-header px-2 py-1"
        >
          <h5 class="mb-0">
            Edit Lead
          </h5>
  
          <feather-icon
            class="ml-1 cursor-pointer"
            icon="XIcon"
            size="16"
            @click="hide"
          />
        </div> -->

      <!-- BODY -->
      <validation-observer #default="{ handleSubmit }" ref="refFormObserver">
        <b-form class="p-2" style="width: 75%;" @submit.prevent="handleSubmit(onSubmit)" @reset.prevent="resetForm">
          <validation-provider #default="{ errors }" name="Subject" vid="subject" rules="required">
            <b-form-group label="Subject" label-for="subject">
              <b-form-input id="subject" v-model="formData.subject" autofocus :state="errors.length > 0 ? false : null"
                required trim placeholder="" />
              <b-form-invalid-feedback>
                {{ errors[0] }}
              </b-form-invalid-feedback>
            </b-form-group>
          </validation-provider>
          <validation-provider #default="{ errors }" name="Description" vid="description" rules="required">
            <b-form-group label="Description" label-for="description">
              <quill-editor  v-model="formData.description" :options="editorOption">

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
          <!--
            <b-form-input hidden v-if="categories.length === 1" :value="categories[0].id"
             id="category" /> -->
          <b-form-input v-if="branches.length === 1" id="branch" hidden :value="branches[0].id" />
          <!-- <b-form-input hidden v-if="clients.length === 1"  :value="clients[0].id"
              id="client" />
                     <b-form-input hidden v-if="contactPeople.length === 1"  :value="contactPeople[0].id"
              id="contactPeople" /> -->
          <validation-provider v-if="branches.length > 1" #default="{ errors }" name="branch_id" vid="branchesss"
            rules="required">
            <b-form-group label="Branches">
              <v-select id="branchesss" v-model="formData.branch_id" placeholder="Select an option" label="name"
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
            <v-select v-model="formData.company_id" placeholder="Select an option" label="name" :options="clients" />

          </b-form-group>

          <b-form-group label="Contact-Person" label-for="contact-person">
            <v-select v-model="formData.contact_person_id" placeholder="Select an option" label="name"
              :options="contactPeople" />

          </b-form-group>

          <b-form-group label="Assignee" label-for="assignee">
            <v-select v-model="formData.users" multiple placeholder="Select an option" label="name"
              :options="allUsers" />

          </b-form-group>
          <validation-provider #default="{ errors }" name="priority" vid="priority" rules="required">
            <b-form-group label="Priority" label-for="priority">
              <v-select id="priority" v-model="formData.priority" placeholder="Select an option" label="id"
                :options="importance.slice().reverse()">
                <template #option="{ id, icon }">
                  <div v-if="(id === 1)">

                    <feather-icon fill="#9e9e9e" style="color:#9e9e9e;" icon="StarIcon" size="16"
                      class="align-middle mr-50" />Lowest
                  </div>
                  <div v-if="(id === 2)">

                    <feather-icon fill="#607d8b" style="color:#607d8b;" icon="StarIcon" size="16"
                      class="align-middle mr-50" />Low
                    <!-- <feather-icon icon="StarIcon" size="16" class="align-middle mr-50" /> -->
                  </div>
                  <div v-if="(id === 3)">

                    <feather-icon fill="#ffe821" style="color:#ffe821;" icon="StarIcon" size="16"
                      class="align-middle mr-50" />Medium
                    <!-- <feather-icon icon="StarIcon" size="16" class="align-middle mr-50" /> -->

                    <!-- <feather-icon icon="StarIcon" size="16" class="align-middle mr-50" /> -->
                  </div>

                  <div v-if="(id === 4)">

                    <feather-icon fill="#ff9800" style="color:#ff9800;" icon="StarIcon" size="16"
                      class="align-middle mr-50" />High
                    <!-- <feather-icon icon="StarIcon" size="16" class="align-middle mr-50" /> -->

                    <!-- <feather-icon icon="StarIcon" size="16" class="align-middle mr-50" /> -->
                    <!-- <feather-icon icon="StarIcon" size="16" class="align-middle mr-50" /> -->
                  </div>
                  <div v-if="(id === 5)">

                    <feather-icon fill="#e91e63" style="color:#e91e63;" icon="StarIcon" size="16"
                      class="align-middle mr-50" />Highest
                    <!-- <feather-icon icon="StarIcon" size="16" class="align-middle mr-50" /> -->

                    <!-- <feather-icon icon="StarIcon" size="16" class="align-middle mr-50" /> -->
                    <!-- <feather-icon icon="StarIcon" size="16" class="align-middle mr-50" /> -->
                    <!-- <feather-icon icon="StarIcon" size="16" class="align-middle mr-50" /> -->

                  </div>
                  <!-- <feather-icon v-if="star === '* * *'"
  
                    icon="StarIcon"
                    size="16"
                    class="align-middle mr-50"
                  /> -->
                  <!-- <span> {{ title }}</span> -->
                </template>
                <template #selected-option="{ id, icon }">
                  <div v-if="(formData.priority.id === id && id === 1)">

                    <feather-icon fill="#9e9e9e" style="color:#9e9e9e;" icon="StarIcon" size="16"
                      class="align-middle mr-50" />Lowest
                  </div>
                  <div v-if="(formData.priority.id === 2 && id == 2)">

                    <feather-icon fill="#607d8b" style="color:#607d8b;" icon="StarIcon" size="16"
                      class="align-middle mr-50" />Low
                    <!-- <feather-icon icon="StarIcon" size="16" class="align-middle mr-50" /> -->
                  </div>
                  <div v-if="(id === 3)">

                    <feather-icon fill="#ffe821" style="color:#ffe821;" icon="StarIcon" size="16"
                      class="align-middle mr-50" />Medium
                    <!-- <feather-icon icon="StarIcon" size="16" class="align-middle mr-50" /> -->

                    <!-- <feather-icon icon="StarIcon" size="16" class="align-middle mr-50" /> -->
                  </div>

                  <div v-if="(formData.priority.id === id && id === 4)">

                    <feather-icon fill="#ff9800" style="color:#ff9800;" icon="StarIcon" size="16"
                      class="align-middle mr-50" />High
                    <!-- <feather-icon icon="StarIcon" size="16" class="align-middle mr-50" /> -->

                    <!-- <feather-icon icon="StarIcon" size="16" class="align-middle mr-50" /> -->
                    <!-- <feather-icon icon="StarIcon" size="16" class="align-middle mr-50" /> -->
                  </div>
                  <div v-if="(formData.priority.id === id && id === 5)">

                    <feather-icon fill="#e91e63" style="color:#e91e63;" icon="StarIcon" size="16"
                      class="align-middle mr-50" />Highest
                    <!-- <feather-icon icon="StarIcon" size="16" class="align-middle mr-50" /> -->

                    <!-- <feather-icon icon="StarIcon" size="16" class="align-middle mr-50" /> -->
                    <!-- <feather-icon icon="StarIcon" size="16" class="align-middle mr-50" /> -->
                    <!-- <feather-icon icon="StarIcon" size="16" class="align-middle mr-50" /> -->

                  </div>
                </template>
              </v-select>
              <b-form-invalid-feedback class="d-flex">
                {{ errors[0] }}
              </b-form-invalid-feedback>
            </b-form-group>
          </validation-provider>

          <validation-provider #default="{ errors }" name="due_date" vid="example-datepicker" rules="required">
            <b-form-group label="Due Date" label-for="Due Date">
              <b-form-datepicker id="example-datepicker" v-model="formData.due_date" :min="editItem.created_at"
                class="form-control" />
              <b-form-invalid-feedback class="d-flex">
                {{ errors[0] }}
              </b-form-invalid-feedback>
            </b-form-group>
          </validation-provider>
          <b-form-group label="Status">
            <v-select v-model="formData.status" placeholder="Select an option" label="type" :options="statusMaster" />
          </b-form-group>
          <!-- Form Actions -->
          <div class="d-flex mt-2">
             <b-button size="sm" v-ripple.400="'rgba(255, 255, 255, 0.15)'" variant="primary" class="mr-2" type="submit"
              :disabled="isLoading">
              Update

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
  </b-container>
</template>
  
<script>
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import { ref, computed, watch } from '@vue/composition-api'
import { required } from '@validations'

import formValidation from '@core/comp-functions/forms/form-validation'
import {
  BContainer,
  BButton,
  BModal,
  BFormDatepicker,
  BFormRating,
  BSpinner,
  BForm,
  BFormInput,
  BFormInvalidFeedback,
  BFormGroup,
  // BCardText,
  // BFormSelect,
} from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'
// import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import store from '@/store'
import vSelect from 'vue-select'
// eslint-disable-next-line import/no-extraneous-dependencies
import 'quill/dist/quill.core.css'
import flatPickr from 'vue-flatpickr-component'

// eslint-disable-next-line import/no-extraneous-dependencies
import 'quill/dist/quill.snow.css'
// eslint-disable-next-line
import 'quill/dist/quill.bubble.css'

import { quillEditor } from 'vue-quill-editor'
import { stat } from 'fs'

export default {
  components: {
    BContainer,
    BSpinner,
    BButton,
    vSelect,
    // eslint-disable-next-line vue/no-unused-components
    BModal,
    BFormDatepicker,
    quillEditor,
    BFormRating,
    BForm,
    BFormInput,
    BFormInvalidFeedback,
    // BCardText,
    BFormGroup,
    // BFormSelect,
    ValidationProvider,
    flatPickr,
    ValidationObserver,
  },
  directives: {
    Ripple,
  },
  model: {
    // prop: 'isEditSidebarActive',
    //event: 'update:is-edit-sidebar-active',
  },
  props: {
    /*isEditSidebarActive: {
      type: Boolean,
      required: true,
    },*/
    editItem: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      action: [{ status: 'open' }, { status: 'completed' }, { status: 'invoiced' }, { status: 'closed' }],
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
      category_id: 1,
      priority: {},
      company_id: {},
      contact_person_id: {},
      due_date: null,
      status: {},
      // validation rules'
      required,
      //  formData: {
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
      // },
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
    errors() {
      return JSON.parse(JSON.stringify(this.$store.state.leads.errors))
    },
    categories() {
      return this.$store.state.categories.all
    },
    branches() {
      return this.$store.state.branches.all
    },
    clients() {
      return this.$store.state.clients.all
    },
    contactPeople() {
      return this.$store.state.contactPeople.allForLeads
    },
    // leads() {
    //   return this.$store.state.leads.all.filter(e => e.type === 'lead')
    // },
    allUsers() {

      return this.$store.state.users.all.filter(e => e.status === 'active')
    },
    statusMaster() {
      var items = this.$store.state.status.all;
      var status = []
      for (let index = 0; index < items.length; index++) {
        status[index] = {
          id: items[index].id,
          type: items[index].type

        }

      }
      return status;
    }

  },
  created() {
    this.$store.dispatch('allUsers/fetch')
    this.$store.dispatch('branches/fetch')
    this.$store.dispatch('clients/fetch')
    this.$store.dispatch('contactPeople/fetchForLeads')
    this.$store.dispatch('categories/fetch')
    this.$store.dispatch('status/fetch')


  },
  methods:{
    categoryUser(data){
        // console.log(data);
      
      var d = new Date();
      var date = data.due_date;
        if(date != null){

            d.setDate(d.getDate() + date)
            this.formData.due_date = d;
        }
      if(data.users.length > 0){

          this.formData.users = data.users;
        }
    },
  },
  setup(props, { emit }) {
    const editID = ref(props.editItem.id)
    const obj = props.editItem.users
    console.log(obj)
    const blankFormData = {
      subject: props.editItem.subject,
      description: props.editItem.description,
      branch_id: props.editItem.branch,
      category_id: props.editItem.category,
      company_id: props.editItem.company,
      contact_person_id: props.editItem.contact_person,
      type: props.editItem.type,
      priority: {id:props.editItem.priority},
      users: obj,
      due_date: props.editItem.due_date,
      status: props.editItem.status_master,

    }

    const formData = ref(JSON.parse(JSON.stringify(blankFormData)))
    const resetFormData = () => {
      formData.value = JSON.parse(JSON.stringify(blankFormData))
    }

    const errors = computed(() => JSON.parse(JSON.stringify(store.state.categories.errors)))

    const { refFormObserver, getValidationState, resetForm } = formValidation(resetFormData)

    watch(props, newValue => {
      editID.value = newValue.editItem.id
      formData.value.subject = newValue.editItem.subject
      formData.value.description = newValue.editItem.description
      formData.value.branch_id = newValue.editItem.branch
      formData.value.category_id = newValue.editItem.category
      formData.value.company_id = newValue.editItem.company
      formData.value.contact_person_id = newValue.editItem.contact_person
      formData.value.type = newValue.editItem.type

      formData.value.priority = { id: newValue.editItem.priority }
      // eslint-disable-next-line prefer-destructuring
      formData.value.users = newValue.editItem.users
      formData.value.due_date = newValue.editItem.due_date

      formData.value.status = newValue.editItem.status_master
    })

    const onSubmit = () => {
      if (store.state.branches.all.length === 1) {
        formData.value.branch_id = { id: store.state.branches.all[0].id }
      }
      alert('hello')
      store
        .dispatch('leads/update', {
          payload: formData.value,
          id: editID.value,
        })
        .then(() => {
          emit('refetch-data')
          emit('update:is-edit-sidebar-active', false)

        })
        .catch(() => {
          refFormObserver.value.setErrors(errors.value)
        })
    }

    return {
      formData,
      onSubmit,

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

// @import url('https://pro.fontawesome.com/releases/v5.10.0/css/all.css');
vue-select {
  font-family: 'FontAwesome';
}
</style>
  

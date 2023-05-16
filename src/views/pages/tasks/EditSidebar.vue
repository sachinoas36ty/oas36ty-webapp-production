<template>
  <b-modal id="categories-edit-modal" :visible="isEditSidebarActive" size="lg" no-close-on-backdrop hide-footer
    ref="leads-edit-modal"  @hidden="resetForm"
    @change="(val) => $emit('update:is-edit-sidebar-active', val)">
    <template #modal-title>
          <span v-if="$router.currentRoute.name == 'leads'">
            edit lead
          </span>
          <span v-if="$router.currentRoute.name == 'tasks'">
            edit task hey
          </span>
        </template>
    <validation-observer #default="{ handleSubmit }" ref="refFormObserver">

      <b-form @submit.prevent="handleSubmit(onSubmit())">

        <b-row>
          <b-col :md="setMd(branches.length)">
            <b-form-group label="Contact Person">
              <v-select v-model="formData.contact_person_id" :options="contactPeople" label="name"
                placeholder="Search Contact">
                <template #list-header class="add_contacts">
                  <div class=" ml-2 mb-1 mt-1" v-b-modal.modal-contact>
                    <!--  <b-button size="sm" variant="primary"   v-b-modal.modal-1>

          <feather-icon size="14" style="margin-right: 0.5rem;"  icon="SearchIcon" /> Add Contacts</b-button> -->
                    <a href="#">
                      <feather-icon size="14" style="margin-right: 0.5rem;" icon="PlusIcon" /> New Contact
                    </a>


                  </div>
                </template>
                <template #option="item">
                    <span v-b-tooltip.hover.top="item.name">

                      {{
    item.name.substring(0, 28)
}}
                      <span v-if="item.name.length >= 32">...</span>
                    </span>
                  </template>
                  <template #selected-option="item">
                    <span v-b-tooltip.hover.top="item.name">

                      {{
    item.name.substring(0, 28)
}}
                      <span v-if="item.name.length >= 32">...</span>
                    </span>
                  </template>
              </v-select>
              <!-- <create-contact/> -->

            </b-form-group>
          </b-col>

          <b-col :md="setMd(branches.length)">
            <b-form-group label="Client">
              <v-select :options="clients" label="name" v-model="formData.company_id" placeholder="Search Client">
                <template #list-header class="add_clients">
                  <div class=" ml-2 mb-1 mt-1" v-b-modal.modal-clients>
                    <!--  <b-button size="sm" variant="primary"   v-b-modal.modal-1>

          <feather-icon size="14" style="margin-right: 0.5rem;"  icon="SearchIcon" /> Add Contacts</b-button> -->
                    <a href="#">
                      <feather-icon size="14" style="margin-right: 0.5rem;" icon="PlusIcon" /> New Client</a>
                  </div>
                </template>
                <template #option="item">
                    <span v-b-tooltip.hover.top="item.name">

                      {{
    item.name.substring(0, 28)
}}
                      <span v-if="item.name.length >= 32">...</span>
                    </span>
                  </template>
                  <template #selected-option="item">
                    <span v-b-tooltip.hover.top="item.name">

                      {{
    item.name.substring(0, 28)
}}
                      <span v-if="item.name.length >= 32">...</span>
                    </span>
                  </template>
              </v-select>
              <!-- <create-clients /> -->
            </b-form-group>
          </b-col>
          <b-col :md="setMd(branches.length)">
            <b-form-group label="Category">
              <v-select placeholder="Search Category" v-model="formData.category_id" label="name" :options="categories"
                @input="categoryUser" >
                <template #option="item">
                    <span v-b-tooltip.hover.top="item.name">

                      {{
    item.name.substring(0, 28)
}}
                      <span v-if="item.name.length >= 32">...</span>
                    </span>
                  </template>
                  <template #selected-option="item">
                    <span v-b-tooltip.hover.top="item.name">

                      {{
    item.name.substring(0, 28)
}}
                      <span v-if="item.name.length >= 32">...</span>
                    </span>
                  </template>
                </v-select>

            </b-form-group>
          </b-col>
          <b-col :md="setMd(branches.length)" v-if="(branches.length > 1)">
            <validation-provider #default="validationContext" name="branch_id" vid="branch" rules="required">

              <b-form-group label="Branch">
                <v-select   id="branch" placeholder="Search Branch"
                  v-model="formData.branch_id" label="name" :options="branches" >
                  <template #option="item">
                    <span v-b-tooltip.hover.top="item.name">

                      {{
    item.name.substring(0, 28)
}}
                      <span v-if="item.name.length >= 32">...</span>
                    </span>
                  </template>
                  <template #selected-option="item">
                    <span v-b-tooltip.hover.top="item.name">

                      {{
    item.name.substring(0, 28)
}}
                      <span v-if="item.name.length >= 32">...</span>
                    </span>
                  </template>
                  </v-select>
                <b-form-invalid-feedback class="d-block">
                  {{ validationContext.errors[0] }}
                </b-form-invalid-feedback>
              </b-form-group>
            </validation-provider>
          </b-col>
        </b-row>




        <validation-provider #default="validationContext" name="subject" vid="subject" rules="required">
          <b-row>
            <b-col md="12 ">
              <b-form-group label="Subject" label-for="contact">
                <b-form-input placeholder="Enter Subject" id="subject" v-model="formData.subject">

                </b-form-input>
                <b-form-invalid-feedback class="d-block">
                  {{ validationContext.errors[0] }}
                </b-form-invalid-feedback>
              </b-form-group>
            </b-col>

          </b-row>
        </validation-provider>
        <b-row>
          <b-col md="12 ">
            <b-form-group label="Description" label-for="contact">
              <quill-editor  v-model="formData.description" :options="editorOption">

                <div id="toolbar" slot="toolbar">
                  <!-- Add a bold button -->

                </div>
              </quill-editor>
              <!-- <b-form-invalid-feedback class="d-block">
          {{ validationContext.errors[0] }}
        </b-form-invalid-feedback> -->
            </b-form-group>
          </b-col>

        </b-row>

        <b-row>
          <b-col md="3">
            <b-form-group label="Assigned To">
              <v-select multiple placeholder="Search Employee" label="name" v-model="formData.users"
                :options="allUsers">
                <template #list-header class="add_users">
                  <div class=" ml-2 mb-1 mt-1" v-b-modal.modal-user>
                    <!--  <b-button size="sm" variant="primary"   v-b-modal.modal-1>

                <feather-icon size="14" style="margin-right: 0.5rem;"  icon="SearchIcon" /> Add Contacts</b-button> -->
                    <a href="#">
                      <feather-icon size="14" style="margin-right: 0.5rem;" icon="PlusIcon" /> New Employee</a>
                  </div>
                </template>
                <template #option="item">
                    <span v-b-tooltip.hover.top="item.name">

                      {{
    item.name.substring(0, 28)
}}
                      <span v-if="item.name.length >= 32">...</span>
                    </span>
                  </template>
                  <template #selected-option="item">
                    <span v-b-tooltip.hover.top="item.name">

                      {{
    item.name.substring(0, 28)
}}
                      <span v-if="item.name.length >= 32">...</span>
                    </span>
                  </template>
              </v-select>

            </b-form-group>
          </b-col>
          <!-- <InviteUser /> -->
          <b-col md="3">
            <validation-provider #default="validationContext" name="due_date" vid="due_date" rules="required">

              <b-form-group label="Due Date">
                <flat-pickr id="due_date"   v-model="formData.due_date"
                  class="form-control" trim />
                <!-- <b-form-datepicker placeholder="Due Date" id="due_date"   
            v-model="formData.due_date"  /> -->
                <b-form-invalid-feedback class="d-block">
                  {{ validationContext.errors[0] }}
                </b-form-invalid-feedback>
              </b-form-group>
            </validation-provider>
          </b-col>

          <b-col md="3">
            <validation-provider #default="validationContext" name="priority" vid="priority" rules="required">

              <b-form-group label="Priority">
                <v-select   autofocus v-model="formData.priority"
                  label="id" :options="importance.slice().reverse()" input-id="priority" placeholder="Search Priority">
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
                    <div v-if="(formData.priority.id === id && id === 2)">

                      <feather-icon fill="#607d8b" style="color:#607d8b;" icon="StarIcon" size="16"
                        class="align-middle mr-50" />Low
                      <!-- <feather-icon icon="StarIcon" size="16" class="align-middle mr-50" /> -->
                    </div>
                    <div v-if="(formData.priority.id === id && id === 3)">

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
                    <!-- <feather-icon v-if="star === '* * *'"

            icon="StarIcon"
            size="16"
            class="align-middle mr-50"
          /> -->
                    <!-- <span> {{ title }}</span> -->
                  </template>
                </v-select>
                <b-form-invalid-feedback class="d-block">
                  {{ validationContext.errors[0] }}
                </b-form-invalid-feedback>
              </b-form-group>
            </validation-provider>

          </b-col>
          <b-col md="3">
            <b-form-group label="Status">
              <v-select v-model="formData.status" placeholder="Select an option" label="type" :options="statusMaster" />
            </b-form-group>
          </b-col>
        </b-row>
        <div class="text-right ">
           <b-button size="sm" variant="primary" @click="closeModal()">
            Cancel
          </b-button>&emsp;
           <b-button size="sm" :disabled="$store.state.leads.isSidebarLoading" variant="primary" type="submit">
            Update
            <b-spinner small class="ml-1" v-if="$store.state.leads.isSidebarLoading" />
          </b-button>
        </div>
      </b-form>
    </validation-observer>
  </b-modal>
</template>

<script>
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import { ref, computed, watch } from '@vue/composition-api'
import { required } from '@validations'

import formValidation from '@core/comp-functions/forms/form-validation'
import CreateContact from './CreateContactLead.vue';
import CreateClients from './CreateClientLead.vue';
import {
  BSidebar,
  // CreateContact,
  BButton,
  BModal,
  BFormDatepicker,
  BFormRating,
  BSpinner,
  BRow,
  BCol,VBTooltip,
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
// import InviteUser from '../users/InviteUser.vue';

export default {
  components: {
    BSidebar,
    BSpinner,
    CreateClients,
    CreateContact,
    BButton,
    vSelect,
    BRow,
    BCol,
    // eslint-disable-next-line vue/no-unused-components
    BModal,
    BFormDatepicker,
    quillEditor,
    BFormRating,
    BForm,VBTooltip,
    BFormInput,
    BFormInvalidFeedback,
    // BCardText,
    BFormGroup,
    // BFormSelect,
    ValidationProvider,
    flatPickr,
    ValidationObserver,
    // InviteUser
  },
  directives: {
    Ripple,
    'b-tooltip':VBTooltip
  },
  model: {
    prop: 'isEditSidebarActive',
    event: 'update:is-edit-sidebar-active',
  },
  props: {
    isEditSidebarActive: {
      type: Boolean,
      required: true,
    },
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

      return this.$store.state.users.all
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
  methods: {
    resetFormData() {
      this.formData.subject = ''
      this.formData.description = ''
      this.formData.branch_id = ''
      this.formData.category_id = ''
      this.formData.company_id = ''
      this.formData.contact_person_id = ''
      this.formData.priority = ''
      this.formData.users = []
      this.formData.due_date = ''



    },
    closeModal() {
      this.resetFormData()
      this.$refs['leads-edit-modal'].hide()
    },
    onSubmit() {
      alert('heelo')
      this.$store
        .dispatch('leads/update', {
          payload: this.formData,
          id: this.editItem.id,
        })
        .then(() => {
          this.$emit('refetch-data')
          this.$emit('update:is-edit-sidebar-active', false)
          this.$refs['leads-edit-modal'].hide()
        })
        .catch(() => {
          // refFormObserver.value.setErrors(errors.value)
        })
    },
    setMd(length) {
      if (length === 1 || length === 0) {
        return '4';
      } else {
        return '3'
      }
    },
    categoryUser(data) {
      // console.log(data);

      var d = new Date();
      var date = data.due_date;
      if (date != null) {

        d.setDate(d.getDate() + date)
        this.formData.due_date = d;
      }
      if (data.users.length > 0) {

        this.formData.users = data.users;
      }
    },
  },
  created() {
    // this.$store.dispatch('allUsers/fetch')
    // this.$store.dispatch('branches/fetch')
    // this.$store.dispatch('clients/fetch')
    // this.$store.dispatch('contactPeople/fetchForLeads')
    // this.$store.dispatch('categories/fetch')
    // this.$store.dispatch('status/fetch')


  },
  setup(props, { emit }) {
    const editID = ref(props.editItem.id)
    const obj = props.editItem.users
    console.log(obj)
    const blankFormData = {
      subject: props.editItem.subject,
      description: props.editItem.description,
      branch_id: String(props.editItem.branch),
      category_id: String(props.editItem.category),
      company_id: String(props.editItem.company),
      contact_person_id: String(props.editItem.contact_person),
      type: props.editItem.type,
      priority: String(props.editItem.priority),
      users: String(obj),
      due_date: props.editItem.due_date,
      status: String(props.editItem.status_master),

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

    // const onSubmit = () => {
    //   store
    //     .dispatch('leads/update', {
    //       payload: formData.value,
    //       id: editID.value,
    //     })
    //     .then(() => {
    //       emit('refetch-data')
    //       emit('update:is-edit-sidebar-active', false)

    //     })
    //     .catch(() => {
    //       refFormObserver.value.setErrors(errors.value)
    //     })
    // }

    return {
      formData,
      // onSubmit,

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
<style>
/* @media (min-width:992px){
   #categories-edit-modal .modal-lg{
        max-width: 1300px;
    }
} */
</style>

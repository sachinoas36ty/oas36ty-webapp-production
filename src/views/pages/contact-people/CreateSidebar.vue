<template>
  <b-sidebar
    id="contact-people-create-sidebar"
    :visible="isCreateSidebarActive"
    bg-variant="white"
    sidebar-class="sidebar-lg"
    shadow
    backdrop
    no-header
    right
    @hidden="resetForm"
    @change="(val) => $emit('update:is-create-sidebar-active', val)"
  >
    <template #default="{ hide }">
      <!-- Header -->
      <div class="d-flex justify-content-between align-items-center content-sidebar-header px-2 py-1">
        <h5 class="mb-0">
          Add New Contact Person
        </h5>

        <feather-icon
          class="ml-1 cursor-pointer"
          icon="XIcon"
          size="16"
          @click="hide"
        />
      </div>

      <!-- BODY -->
      <validation-observer
        #default="{ handleSubmit }"
        ref="refFormObserver"
      >
        <b-form
          class="p-2"
          @submit.prevent="handleSubmit(onSubmit)"
          @reset.prevent="resetForm"
        >
          <validation-provider
            #default="validationContext"
            name="Name"
            vid="name"
            rules="required"
          >

            <b-form-group
              label="Name *"
              label-for="name"
            >
              <b-form-input
                id="name"
                v-model="formData.name"
                autofocus
                 
                trim
                placeholder="Enter Contact Person"
              />
              <b-form-invalid-feedback>
                {{ validationContext.errors[0] }}
              </b-form-invalid-feedback>
            </b-form-group>
          </validation-provider>

          <b-form-group
            label="Email *"
            class=" "
            label-for="Email"
          >
          <validation-provider
            #default="validationContext"
            name="email"
            :vid="'Email'"
            rules="required|email"
          >
            <div class="d-flex">
              <b-form-input
                id="Email"

                v-model="formData.email[0]"
                type="email"
                autofocus
                trim
                placeholder="Enter Email"
              />

              <b-button
                v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                variant="primary"
                @click="repeateAgain"
              >
                <feather-icon
                  icon="PlusIcon"
                  class="mr-25"
                />
              </b-button>
            </div>
            <b-form-invalid-feedback class="d-flex">
                {{ validationContext.errors[0] }}
              </b-form-invalid-feedback>
            </validation-provider>
          </b-form-group>
          <div>
            <!--
              -->
            <b-row
              v-for="(item, index) in items"
              :id="item.id"
              :key="item.id"
              ref="row"
            >

              <!-- Email-->
              <b-col md="12">
                <b-form
                  label="Additional Email"
                  label-for="Additional Email"
                >
                <validation-provider
            #default="validationContext"
            name="email"
            :vid="'email' + item.id"
            rules="required|email"
          >
                  <div class="d-flex">
                    <b-form-input
                      :id="'email' + item.id"
                      v-model="formData.additional_email[index]"
                      type="email"
                      placeholder="Enter Email"
                    />
                    <b-button
                      variant="outline-danger"
                      @click="removeItem(index)"
                    >
                      <feather-icon
                        icon="XIcon"
                        class="mr-25"
                      />
                    </b-button>
                  </div>
                  <b-form-invalid-feedback class="d-flex">
                {{ validationContext.errors[0] }}
              </b-form-invalid-feedback>
                </validation-provider>
                </b-form>
              </b-col>
                <b-col cols="12">
                <!-- <hr> -->
                <br>
              </b-col>
              <!-- </div> -->

            
            </b-row>
          </div>
          <!-- <hr> -->

          <b-form-group
            label="Phone *"
            class=" "
            label-for="Phone"
          >
          <validation-provider
            #default="validationContext"
            name="phone"
            :vid="'Phone'"
            rules="required|digits:10"
          >
            <div class="d-flex">
              <b-form-input
                id="Phone"
                v-model="formData.phone[0]"
                type="number"
                @keypress="isNumber($event)"
                autofocus
                trim
                placeholder="Enter Phone"
              />

              <b-button
                id="addNumber"
                v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                variant="primary"
                @click="repeateAgain2"
              >
                <feather-icon
                  icon="PlusIcon"
                  class="mr-25"
                />
              </b-button>
            </div>
            <b-form-invalid-feedback class="d-flex">
                {{ validationContext.errors[0] }}
              </b-form-invalid-feedback>
            </validation-provider>
          </b-form-group>
          <div>
            <!-- Row Loop -->

            <b-row
              v-for="(item, index) in items2"
              :id="item.id"
              :key="item.id"
              ref="row"
            >

              <b-col md="12">
                <b-form
                  label=" Additional Phone"
                  label-for="Additional Phone"
                >
                <validation-provider
            #default="validationContext"
            name="phone"
            :vid="'phone'+item.id"
            rules="required|digits:10"
          >
                  <div class="d-flex">

                    <b-form-input
                      :id="'phone' + item.id"
                      v-model="formData.additional_phone[index]"
                      type="number"
                      @keypress="isNumber($event)"
                      placeholder="Enter Phone"
                    />
                    <b-button
                      variant="outline-danger"
                      @click="removeItem2(index)"
                    >
                      <feather-icon
                        icon="XIcon"
                        class="mr-25"
                      />
                    </b-button>
                  </div>
                  <b-form-invalid-feedback class="d-flex">
                {{ validationContext.errors[0] }}
              </b-form-invalid-feedback>
                  </validation-provider>
                </b-form>
              </b-col>
              <b-col cols="12">
                <!-- <hr> -->
                <br>
              </b-col>
              <!-- </div> -->
             
            </b-row>
          </div>

          <!-- Remove Button -->
          <!-- <b-col
            lg="2"
            md="3"
            class="mb-50"
          >

          </b-col> -->

          <!-- <b-button
      v-ripple.400="'rgba(255, 255, 255, 0.15)'"
      variant="primary"
      @click="repeateAgain"
    >
      <feather-icon
        icon="PlusIcon"
        class="mr-25"
      />
    </b-button>
   &emsp13;
    <b-button

              variant="outline-danger"

              @click="removeItem(index)"
            >
              <feather-icon
                icon="XIcon"
                class="mr-25"
              />
            </b-button> -->
          <!-- <span>Delete</span> -->
          <!-- <template #code>
      {{ codeBasic }}
    </template> -->

          <!-- Form Actions -->
          <div class="d-flex mt-2">
            <b-button
              v-ripple.400="'rgba(255, 255, 255, 0.15)'"
              variant="primary"
              class="mr-2"
              type="submit"
              :disabled="isLoading"
            >
              Add
      
      <b-spinner small class="ml-1"  v-if="isLoading" />
            </b-button>
            <b-button
              v-ripple.400="'rgba(186, 191, 199, 0.15)'"
              type="button"
              variant="outline-secondary"
              @click="hide"
            >
              Cancel
            </b-button>
          </div>
        </b-form>
      </validation-observer>
    </template>
  </b-sidebar>
</template>

<script>
// import BCardCode from '@core/components/b-card-code'
import { heightTransition } from '@core/mixins/ui/transition'
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import { ref, computed } from '@vue/composition-api'
// import { required, email } from '@validations'
import formValidation from '@core/comp-functions/forms/form-validation'
import {
  BSidebar,
  BButton,
  // BModal,
  BForm,
  BRow,
  BFormInput,
  BFormInvalidFeedback,
  BFormGroup,
  // BCardText,
  BSpinner,
  // BFormSelect,
  // BBadge,
  BCol,
} from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'
// import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import store from '@/store'
// import { codeBasic } from './code'

export default {
  components: {
    // BCardCode,
    BSidebar,
    BButton,
    BRow,
    // BModal,
    BCol,
    BSpinner,
    BForm,
    BFormInput,
    BFormInvalidFeedback,
    // BCardText,
    BFormGroup,
    // BFormSelect,
    // BBadge,
    ValidationProvider,
    ValidationObserver,
  },
  directives: {
    Ripple,
  },
  mixins: [heightTransition],
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
  data() {
    return {
      // formData:{
      addEmail: false,
      addNumber: false,
      name: '',
      additional_email: [],
      email:[],
      additional_phone: [],
      phone: [],
      // },
      //   tempEmail:"",
      // emails:[

      // ],
      // tempContact:"",
      // contactNumbers:[],
      /* validation rules'
      required,
    tempEmail:"",
    emails:[],
    tempContact:"",
    contactNumbers:[] */
      items: [/* {
        /*id: 1,
        selected: 'male',
        selected1: 'designer',
        prevHeight: 0,
      } */],
      nextTodoId: 2,

      items2: [/* {
        /*id2: 1,
        selected2: 'male',
        selected12: 'designer',
        prevHeight2: 0,
      } */],
      nextTodoId2: 2,
      // codeBasic,
    }
  },
  computed: {
    isLoading() {
      return this.$store.state.contactPeople.sidebarLoading
    },
    successMessage() {
      return this.$store.state.contactPeople.successMessage
    },
    errorMessage() {
      return this.$store.state.contactPeople.errorMessage
    },
    errors() {
      return JSON.parse(JSON.stringify(this.$store.state.contactPeople.errors))
    },
  },
  mounted() {
    this.initTrHeight()
    // this.initTrHeight2()
  },
  created() {
    window.addEventListener('resize', this.initTrHeight)
    // window.addEventListener('resize2', this.initTrHeight2)
  },
  destroyed() {
    window.removeEventListener('resize', this.initTrHeight)
    // window.removeEventListener('resize2', this.initTrHeight2)
  },
  methods: {
    isNumber(ev){
      const keysAllowed= ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.'];
    const keyPressed = ev.key;
    
    if (!keysAllowed.includes(keyPressed)) {
           ev.preventDefault()
    }
    },
    repeateAgain() {
      // if(document.getElementById('AddMoreEmail').style.display = 'none'){
      //   console.log("hh");
      //   document.getElementById('AddMoreEmail').style.display = "block";
      // }
      this.addEmail = true
      this.items.push({
        id: this.nextTodoId += this.nextTodoId,
      })

      this.$nextTick(() => {
        this.trAddHeight(this.$refs.row[0].offsetHeight)
      })
    },
    removeItem(index) {
      this.items.splice(index, 1)
      this.formData.additional_email.splice(index, 1)

      this.trTrimHeight(this.$refs.row[0].offsetHeight)
    },
    initTrHeight() {
      // this.trSetHeight(null)
      this.$nextTick(() => {
        // this.trSetHeight(this.$refs.form.scrollHeight)
      })
    },

    repeateAgain2() {
      console.log(this.$refs.row)
      this.addNumber = true
      this.items2.push({
        id2: this.nextTodoId2 += this.nextTodoId2,
      })

      this.$nextTick(() => {
        this.trAddHeight(this.$refs.row[0].offsetHeight)
      })
    },
    removeItem2(index) {
      this.items2.splice(index, 1)
      this.formData.additional_phone.splice(index, 1)

      this.trTrimHeight(this.$refs.row[0].offsetHeight)
    },
    initTrHeight2() {
      // this.trSetHeight(null)
      this.$nextTick(() => {
        // this.trSetHeight(this.$refs.form.scrollHeight)
      })
    },
  },
  setup(props, { emit }) {
    const blankFormData = {

      name: '',
      additional_email: [],
      email:[],
      additional_phone:[],
      phone: [],
    }

    const formData = ref(JSON.parse(JSON.stringify(blankFormData)))
    console.log('formData:', formData.value)
    const resetFormData = () => {
      formData.value = JSON.parse(JSON.stringify(blankFormData))
    }

    const errors = computed(() => JSON.parse(JSON.stringify(store.state.contactPeople.errors)))

    const { refFormObserver, getValidationState, resetForm } = formValidation(resetFormData)

    const onSubmit = () => {
      store
        .dispatch('contactPeople/store', formData.value)
        .then(() => {
          emit('refetch-data')
          emit('update:is-create-sidebar-active', false)
        })
        .catch(() => {
          refFormObserver.value.setErrors(errors.value)
        })
    }
    const newEmail = () => {
      formData.value.emails.push(formData.value.tempEmail)
      formData.value.tempEmail = ''
    }
    const newPhone = () => {
      formData.value.contactNumbers.push(formData.value.tempContact)
      formData.value.tempContact = ''
    }

    return {
      // blankFormData,
      formData,
      onSubmit,
      newEmail,
      newPhone,
      refFormObserver,
      getValidationState,
      resetForm,

    }
  },
}
</script>

<style lang="scss" scoped>
.repeater-form {
  overflow: hidden;
  transition: .35s height;
}
</style>
<!--

   id="email"
                v-model="formData.email"
                autofocus

                trim
                placeholder="Email"

                    <b-button

                  role="presentation"
                   v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                   variant="primary"
                  class="float-right w-20"
                  @click="newPhone"
                  >
                   <b>Add +</b>
                 </b-button>
                    <b-button
                  role="presentation"
                   v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                   variant="primary"
                  class="float-right w-20"
                  @click="newEmail"
                  >
                   <b>Add +</b>
                 </b-button>
                 <br/>

                 for Email TextField
            <validation-provider
            #default="validationContext"
            name="Name"
            vid="name"
            rules="enter valid email"
          >
            <b-form-group label="Email" label-for="email">
              <b-form-input
               v-model="formData.tempEmail"
                autofocus
                 
                trim
               placeholder="Enter Email => Press Enter"
               @keyup.enter="newEmail"
              />
              </b-form-group>
               <b-form-invalid-feedback>
                {{ validationContext.errors[1] }}
              </b-form-invalid-feedback>
              </validation-provider>
              For Showing Entered Email here using Pill
              <div v-for="(value,index) in formData.emails"
               :key="index">
              <b-badge  v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                   variant="primary">{{value}} <b-badge
                v-ripple.400="'rgba(255, 255, 255, 0.15)'"
              variant="primary">x</b-badge> </b-badge>
               <br/><br/>
              </div>

            for Phone TextField
              <ValidationProvider rules="digits:10" v-slot="{ errors }">
                <b-form-group label="Contact Number" label-for="contactNumber">

               <b-form-input
               v-model="formData.tempContact"
                @keyup.enter="newPhone"
               placeholder="Enter Contact Number => Press Enter"
              />
             </b-form-group>
               <span text-variant="danger">{{ errors[0] }}</span>
              </ValidationProvider>

               <b-badge
                v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                variant="primary"
               v-for="(value,index) in formData.contactNumbers"
               :key="index"
              >{{value}}
              <b-badge  v-ripple.400="'rgba(255, 255, 255, 0.15)'"
              variant="primary">x</b-badge> </b-badge>

              //
               v-for="(item, index) in items"
          :id="item.id"
          :key="item.id"
             -->

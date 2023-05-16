<template>
  <b-modal
    id="edit-modal-contact"
    no-close-on-backdrop


ref="edit-modal-contact"
size="md"
title="edit Contact person"
hide-footer
    :visible="isEditSidebarActive"
   
    
    @change="(val) => $emit('update:is-edit-sidebar-active', val)"
  >
 
      <!-- Header -->
     

      <!-- BODY -->
      <validation-observer
        #default="{ handleSubmit }"
        ref="refFormObserver"
      >
        <b-form
          class=""
          @submit.prevent="handleSubmit(onSubmit)"
          @reset.prevent="resetForm"
        >
          <validation-provider
            #default="validationContext"
            name="Name"
            vid="name"
            rules="required"
          >
          <b-row>
            <b-col md="12">

            <b-form-group
              label="Name *"
              label-for="name"
            >
              <b-form-input
                id="name"
                v-model="formData.name"
                autofocus
                 
                trim
                placeholder="Main Contact Person"
              />
              <b-form-invalid-feedback>
                {{ validationContext.errors[0] }}
              </b-form-invalid-feedback>
            </b-form-group>
          </b-col>

          </b-row>

          </validation-provider>

          <input type="text" :value="old_emails" style="display:none;">
          <!-- <b-form-group  
            label="Email"
            class=" "
            label-for="Email"
          >  -->
          <label for="">Email *</label>
          <!-- <div> -->
           
           <b-row
             v-for="(item, index) in formData.email"
             
             :key="index"
             ref="row"
           >

             <b-col md="12">
               <b-form
                 label="Additional Email"
                 label-for="Additional Email"
               >
               <validation-provider
               #default="validationContext"
               name="email"
               :vid="'email'+index"
               rules="required|email"
               >
               <div class="d-flex">
                
                   <b-form-input
                     :id="'email' + index"
                     v-model="formData.email[index]"
                     type="email"
                      
                     placeholder="Enter Email"
                   />
                 
                    <b-button size="sm" v-show="index == 0"
                   v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                   variant="primary"
                   @click="repeateAgain"
                   >
                   <feather-icon
                   icon="PlusIcon"
                   class="mr-25"
                   />
                  </b-button>
                   <b-button size="sm" v-show="index != 0"
                  variant="outline-danger"
                  @click="remove_old_emails(index)"
                  >
                  <feather-icon
                  icon="XIcon"
                  class="mr-25"
                  />
                </b-button>
                <!-- <div> -->
                  <!-- </div> -->
                </div>
                <b-form-invalid-feedback class="d-flex">
              {{ validationContext.errors[0] }}
            </b-form-invalid-feedback>

            </validation-provider>
            
               </b-form>
             </b-col>

             <b-col cols="12">
            
               <br>
             </b-col>
           

           </b-row>
         <!-- </div> -->

            <!-- <div class="d-flex">
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
            </div> -->
          <!-- </b-form-group> -->
       
          <div>
           
            <b-row
              v-for="(item, index) in items"
              :id="item.id"
              :key="item.id"
              ref="row"
              
            >
            <b-col md="12">
              <b-form
              label="Additional Email"
              label-for="Additional Email"
              >
              <validation-provider
                 #default="validationContext"
                 name="new_email"
                 :vid="'new_email'+index"
                 rules="required|email"
                 >

                  <div class="d-flex" >
                    <b-form-input
                      :id="'new_email' + index"
                      v-model="formData.new_email[index]"
                       
                      type="email"
                      placeholder="Enter Email"
                    />
                    <b-button size="sm"
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
             
                <br>
              </b-col>
            

            </b-row>
          </div>
         
          <input type="text" :value="old_phones" style="display:none;">

          <!-- <b-form-group v-for="(phone, index) in formData.phone" :key="phone"
            label="Phone"
            class=" "
            label-for="Phone"
          >
            <div class="d-flex">
              <b-form-input
                id="Phone"
                v-model="formData.phone[index]"
                type="number"
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
          </b-form-group>
          <div>
           

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
                  <div class="d-flex">

                    <b-form-input
                      :id="'phone' + item.id"
                      v-model="formData.new_phone[index]"
                      type="number"
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
                </b-form>
              </b-col>
              <b-col cols="12">
             
                <br>
              </b-col>
       

            </b-row>
          </div> -->
          
          <label for="">Phone *</label>
          <div>
           
           <b-row
             v-for="(item, index) in formData.phone"
             
             :key="index"
             ref="row"
           >

             <b-col md="12">
               <b-form
                 label="Additional Phone"
                 label-for="Additional Phone"
               >
               <validation-provider
               #default="validationContext"
               name="phone"
               :vid="'phones'+index"
               rules="required|digits:10"
               >

                 <div class="d-flex">
                   <b-form-input
                     :id="'phones' + index"
                     v-model="formData.phone[index]"
                      
                     @keypress="isNumber($event)"
                     type="number"
                     class="your_class"
                     placeholder="Enter Phone"
                   />
                    <b-button size="sm" v-show="index == 0"
                v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                variant="primary"
                @click="repeateAgain2"
              >
                <feather-icon
                  icon="PlusIcon"
                  class="mr-25"
                />
              </b-button>
                    <b-button size="sm" v-show="index != 0"
                     variant="outline-danger"
                     @click="remove_old_phones(index)"
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
            
               <br>
             </b-col>
           

           </b-row>
         </div>

            <!-- <div class="d-flex">
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
            </div> -->
          <!-- </b-form-group> -->
       
          <div>
           
            <b-row
              v-for="(item, index) in items2"
              :id="item.id"
              :key="item.id"
              ref="row"
            >

              <b-col md="12">
                <b-form
                  label="Additional Phone"
                  label-for="Additional Phone"
                >
                <validation-provider
               #default="validationContext"
               name="new_phone"
               :vid="'new_phones'+index"
               rules="required|digits:10"
               >
                  <div class="d-flex">
                    <b-form-input
                      :id="'new_phones' + index"
                      v-model="formData.new_phone[index]"
                       
                     @keypress="isNumber($event)"
                      type="number"
                      placeholder="Enter Phone"
                    />
                     <b-button size="sm" 
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
             
                <br>
              </b-col>
            

            </b-row>
          </div>
          <div class="text-right">
           
            <b-button size="sm"
              v-ripple.400="'rgba(186, 191, 199, 0.15)'"
              type="button"
              class="mr-2"
              variant="primary"
              @click="$refs['edit-modal-contact'].hide()"
            >
              Cancel
            </b-button>
            <b-button size="sm"
              v-ripple.400="'rgba(255, 255, 255, 0.15)'"
              variant="primary"
              
              type="submit"
              :disabled="$store.state.contactPeople.isSidebarLoading"
            >
              Update
              <b-spinner small class="ml-1" v-if="$store.state.contactPeople.isSidebarLoading" />
            </b-button>
          </div>
        </b-form>
      </validation-observer>
    
  </b-modal>
</template>

<script>
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import { ref, computed, watch } from '@vue/composition-api'
import { required, email } from '@validations'
import formValidation from '@core/comp-functions/forms/form-validation'
import {
  BSidebar,
  BButton,BRow,BCol,
  BModal,
  BForm,
  BFormInput,
  BFormInvalidFeedback,
  BFormGroup,
  BCardText,
  BSpinner,
  BFormSelect,
} from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import store from '@/store'

export default {
  components: {
    BSidebar,
    BButton,
    BSpinner,BRow,BCol,
    BModal,
    BForm,
    BFormInput,
    BFormInvalidFeedback,
    BCardText,
    BFormGroup,
    BFormSelect,
    ValidationProvider,
    ValidationObserver,
  },
  directives: {
    Ripple,
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
      addEmail: false,
      addNumber: false,
      name: '',
      email: [],
      new_email:[],
      new_phone: [],
      phone: [],
      items: [
        ],
        nextTodoId: 2,
      items2: [
        ],
        nextTodoId2: 2,
      // validation rules'
      required,
      emails:[],
      phones:[]
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
    old_emails(){
      var emails =  this.editItem.email;
      var old_emails = [];
      for (let index = 0; index < emails.length; index++) {
         old_emails[index]= emails[index].email;
        
      }
      this.formData.email = old_emails;
      return old_emails;
    },
    old_phones(){
      var phone =  this.editItem.phone;
      var old_phone = [""];
      for (let index = 0; index < phone.length; index++) {
         old_phone[index]= phone[index].phone;
        
      }
      this.formData.phone = old_phone;
      return old_phone;
    }
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
  beforeUpdate(){
    // this.formData.phone.push("000")
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
    remove_old_emails(index){
      this.items.splice(index, 1)
      
      this.formData.new_email.splice(index,1)
      if(this.formData.email.length > 1){

        this.formData.email.splice(index, 1)
      }

      this.trTrimHeight(this.$refs.row[0].offsetHeight)
    },
    removeItem(index) {
      this.items.splice(index, 1)
      
      this.formData.new_email.splice(index,1)
      // if(this.formData.email.length > 1){

      //   this.formData.email.splice(index, 1)
      // }

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
    remove_old_phones(index) {
      this.items2.splice(index, 1)
      this.formData.new_phone.splice(index,1)
      if(this.formData.phone.length > 1){

        this.formData.phone.splice(index, 1)
      }
      this.trTrimHeight(this.$refs.row[0].offsetHeight)
    },
    removeItem2(index) {
      this.items2.splice(index, 1)
      this.formData.new_phone.splice(index,1)
      // if(this.formData.phone.length > 1){

      //   this.formData.phone.splice(index, 1)
      // }
      this.trTrimHeight(this.$refs.row[0].offsetHeight)
    },
    initTrHeight2() {
      // this.trSetHeight(null)
      this.$nextTick(() => {
        // this.trSetHeight(this.$refs.form.scrollHeight)
      })
    },
  },
  updated(){
    for (let index = 0; index < this.items.length; index++) {
      this.items.splice(this.items.indexOf(this.items[index]), this.items.length);
      
    }
    for (let index = 0; index < this.formData.new_email.length; index++) {
      this.formData.new_email.splice(this.formData.new_email.indexOf(this.formData.new_email[index]), this.formData.new_email.length);
      
    }

    for (let index = 0; index < this.items2.length; index++) {
      this.items2.splice(this.items2.indexOf(this.items2[index]), this.items2.length);
      
    }
    for (let index = 0; index < this.formData.new_phone.length; index++) {
      this.formData.new_phone.splice(this.formData.new_phone.indexOf(this.formData.new_phone[index]), this.formData.new_phone.length);
      
    }
  },
  setup(props, { emit }) {
    const editID = ref(props.editItem.id)
    // const items_email = ref(props.editItem);

    const blankFormData = {
      name: props.editItem.name,
      email: [],
      phone: [],
      new_email:[],
      new_phone:[],
      // total:[email, ...new_email]
      // emails: [],
      // phones: [],
    }

    var formData = ref(JSON.parse(JSON.stringify(blankFormData)))
    const resetFormData = () => {
      formData.value = JSON.parse(JSON.stringify(blankFormData))
    }

    const errors = computed(() => JSON.parse(JSON.stringify(store.state.contactPeople.errors)))

    const { refFormObserver, getValidationState, resetForm } = formValidation(resetFormData)
    // const items_email2 = props.editItem;
    
    
    // var old_emails = [];
    watch(props, newValue => {
      // console.log(items_email2);
      editID.value = newValue.editItem.data.id
      formData.value.name = newValue.editItem.data.name
      // formData.value.phone = [""]
      // items_email = newValue.editItem.email;
      // console.log(items_email.length);
  
      // console.log(formData.value.email);
      // formData.value.email = newValue.editItem.email
      // formData.value.phone = newValue.editItem.phone
    })
    // for (let index = 0; index < items_email.length; index++) {
    //     // const element = array[index];
        
    //     old_emails[index] = [items_email[index].email]
    //     formData.value.phone = [items_email[index].phone]

    //   }
    // formData.value.email = old_emails
    const onSubmit = () => {
      // formData.value.email = formData.value.email.concat(formData.value.new_email)
      // formData.value.phones = formData.value.phones.concat(formData.value.phone, formData.value.new_phone)
      
      // formData.value.push()
     
        
      console.log(formData.value.email);
      store
        .dispatch('contactPeople/update', {
          payload: formData.value,
          id: editID.value,
        })
        .then(() => {
          
          emit('refetch-data')
        store.dispatch('contactPeople/showAll')
        
          
          emit('update:is-edit-sidebar-active', false)
          this.$toast.success("Proposal Template Created Successfully!", {
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
        rtl: false,
      });
         
        })
        .catch(() => {
          refFormObserver.value.setErrors(errors.value)
        })
    }

    return {
      blankFormData,
      formData,//old_emails,
      onSubmit,editID,
      // items_email2,
      // items_email,
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
<style>
@media (min-width:576px){
  #edit-modal-contact .modal-dialog{
    max-width: 600px;
  }
}
.modal-md{
  margin-top: 6.5rem;
}
.modal-title{
    text-transform: uppercase;
}
</style>
<style lang="scss">
.plus_field{
  margin-right: -2rem;
}
.plus_icon{
  margin-left: -1.5rem;
}
.x_icon{
  margin-left: -1.5rem;
}
.x_field{
  margin-right: -2rem;
}
.field_name{
  margin-right: -2rem;
}
@media(max-width: 450px){

  .plus_icon{
    margin-top: -2rem;
    margin-left: -2.5rem
  }
  .x_icon{
    margin-left: -2.5rem;
  }
  .plus_field{
  margin-right: 0rem;
}
.x_field{
  margin-right: 0rem;
}
.field_name{
  margin-right: 0rem;
}
}

</style>

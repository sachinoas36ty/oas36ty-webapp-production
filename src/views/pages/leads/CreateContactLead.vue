<template>
    <div>
        <!-- <a href="#"  v-b-modal.modal-contact>
              <span class="text-nowrap">Create</span>
        </a> -->
            <b-modal
            no-close-on-backdrop

      id="modal-contact"
      ref="modal-contact"
      size="md"
      title="Add Contact person"
      hide-footer
    >
    <!-- <b-card-body> -->
      <validation-observer #default="{handleSubmit}" ref="refFormObserver">

      <b-form @submit.prevent="handleSubmit(onSubmit)">
     
        <validation-provider
        #default="validationContext"
        name="name"
        vid="name"
        rules="required"
      >
        <b-row>
          <b-col md="12 ">
            <b-form-group  label="Name" label-for="contact">
              <b-form-input    
              placeholder="Enter Name"
              id="name" v-model="formData.name">

              </b-form-input>
              <b-form-invalid-feedback class="d-block">
                {{ validationContext.errors[0] }}
              </b-form-invalid-feedback>
            </b-form-group>
          </b-col>
          
        </b-row>

      </validation-provider>
     
      <validation-provider
        #default="validationContext"
        name="default_email"
        vid="default_email"
        rules="required|email"
      >
      <b-row >
              <b-col md="10">

                <b-form-group label="Email" class="plus_field" col="10">
                  <b-form-input id="default_email"   type="email"  v-model="default_email[0]" placeholder="Enter Email">

                  </b-form-input>
                  
                  <b-form-invalid-feedback class="d-block">
                  {{ validationContext.errors[0] }}
                </b-form-invalid-feedback>
                </b-form-group>
              </b-col>
              <b-col md="2" class="plus_icon">

              <b-form-group class="plus_icon" style="margin-top:2rem; margin-left: 2.5rem;" col="2">
                 <b-button size="sm" variant="primary"  @click="repeateAgain">
                  <feather-icon icon="PlusIcon">

                  </feather-icon>
                </b-button>
            </b-form-group>
              </b-col>
            
            </b-row>

            </validation-provider>

            <div
            v-for="(item, index) in email_field"
              :id="item.id"
              :key="item.id"
              ref="row" >
              <validation-provider
        #default="validationContext"
        name="additional_email"
        :vid="'additional_email' + item.id "
        rules="required|email"
      >
              <b-row>

              <b-col md="10">

                <b-form-group  col="10" class="x_field">
                  <b-form-input   :id="('additional_email' + item.id)" type="email" id="hh" v-model="additional_email[index]" placeholder="Enter Email">

                  </b-form-input>
                  <b-form-invalid-feedback class="d-block">
                  {{ validationContext.errors[0] }}
                </b-form-invalid-feedback>
                </b-form-group>
              </b-col>
              <b-col md="2" class="x_icon">

              <b-form-group  col="2" class="x_icon" style="margin-left: 2.5rem;">
                 <b-button size="sm" variant="outline-primary"  @click="removeItem(index)">
                  <feather-icon icon="XIcon">

                  </feather-icon>
                </b-button>
                
              </b-form-group>
              </b-col>
            </b-row>
            </validation-provider>
            </div>

            <!-- Add Phone Field  -->
            <validation-provider
        #default="validationContext"
        name="default_phone"
        vid="default_phone"
        rules="required|digits:10"
      >
            <b-row >
              <b-col md="10">

                <b-form-group label="Phone" col="10" class="plus_field">
                  <b-form-input     id="default_phone"  @keypress="isNumber($event)" type="number" v-model="default_phone[0]" placeholder="Enter Phone">

                  </b-form-input>
                  <b-form-invalid-feedback class="d-block">
                  {{ validationContext.errors[0] }}
                </b-form-invalid-feedback>
                </b-form-group>
              </b-col>
              <b-col md="2" class="plus_icon">

              <b-form-group style="margin-top:2rem; margin-left: 2.5rem;" col="2">
                 <b-button size="sm" variant="primary"  @click="repeatPhone">
                  <feather-icon icon="PlusIcon">

                  </feather-icon>
                </b-button>
                
              </b-form-group>
              </b-col>
            
            </b-row>
            </validation-provider>

            <div
            v-for="(item, index) in phone_field"
            :id="item.id"
            :key="item.id"
            ref="phone_row" >
            
            <validation-provider
            #default="validationContext"
            name="additional_phone"
            :vid="'additional_phone'+item.id"
            rules="required|digits:10" cols="10"
          >
          <b-row>

            <b-col md="10">

                <b-form-group  col="10" class="x_field">
                  <b-form-input   type="number" :id="('additional_phone' + item.id)"     @keypress="isNumber($event)" v-model="additional_phone[index]" placeholder="Enter Phone">

                  </b-form-input>
                     <b-form-invalid-feedback class="d-block">
                  {{ validationContext.errors[0] }}
                </b-form-invalid-feedback>
                </b-form-group>
            </b-col>
             
              <b-col md="2" class="x_icon">

              <b-form-group  col="2" style="margin-left: 2.5rem;">
                 <b-button size="sm" variant="outline-primary"  @click="removePhone(index)">
                  <feather-icon icon="XIcon">

                  </feather-icon>
                </b-button>
                
              </b-form-group>
              </b-col>
          </b-row>
            
            </validation-provider>
        </div>
        <div class="text-right ">
           <b-button size="sm" variant="primary" @click="closeModal()">
            Cancel
          </b-button>&emsp;
 <b-button size="sm"  :disabled="$store.state.contactPeople.isSidebarLoading"  variant="primary" type="submit" >
  Save    
  <b-spinner small class="ml-1" v-if="$store.state.contactPeople.isSidebarLoading"/>
</b-button >
</div>
      </b-form>
      </validation-observer>
    <!-- </b-card-body> -->
    </b-modal>
    </div>
</template>
<script>
import { ValidationProvider, ValidationObserver } from 'vee-validate'

import {BModal,
  BFormInvalidFeedback,
  // BSpinner,
  BForm,VBModal, BFormInput,BFormGroup, BCard, BContainer, BRow, BCol, BPagination, BTable, BButton, BDropdown, BDropdownItem, BSpinner  } from 'bootstrap-vue';
import store from '@/store';
import formValidation from '@/@core/comp-functions/forms/form-validation';
import { ref, computed } from "@vue/composition-api";
import { required, email } from "@validations";
export default {
  components:{
    BForm,BFormGroup,BButton,BModal,BFormInvalidFeedback,
    BFormInput,BRow,BCol, ValidationObserver,ValidationProvider,
    BSpinner,
  },
  data(){
    return { 
        addEmail: false,
      addNumber: false,
      email_field:[
        ],
        phone_field:[
        ],  
        nextTodoId: 2,
        nextTodoId2: 2,
        default_email:[],
        additional_email: [],
        default_phone:[],
        additional_phone: [],
      name:'',
      required,
    }
  },
  directives:{
    'b-modal': VBModal,
  },
  methods:{
    resetFormData(){
      this.formData.name = '';
      this.default_email = [];
      this.additional_email = [];
      this.default_phone = [];
      this.additional_phone = [];

      // this.formData.due_date = 2;
      // this.formData.users = [];

    },
    closeModal(){
      this.resetFormData()
      this.$refs['modal-contact'].hide()
    },
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
      this.email_field.push({
        id: this.nextTodoId += this.nextTodoId,
      })

      this.$nextTick(() => {
        this.trAddHeight(this.$refs.row[0].offsetHeight)
      })
    },
    repeatPhone(){
      this.addNumber = true
      this.phone_field.push({
        id: this.nextTodoId2 += this.nextTodoId2,
      })

      this.$nextTick(() => {
        this.trAddHeight(this.$refs.phone_row[0].offsetHeight)
      })
    },
    removeItem(index) {
      this.email_field.splice(index, 1)
      this.additional_email.splice(index, 1)

      this.trTrimHeight(this.$refs.row[0].offsetHeight)
    },
    removePhone(index){
      this.phone_field.splice(index, 1)
      this.additional_phone.splice(index, 1)

      this.trTrimHeight(this.$refs.phone_row[0].offsetHeight)
    },
    onSubmit(){
        var contacts = {
        email: this.default_email,
        additional_email : this.additional_email,
        phone: this.default_phone,
        additional_phone : this.additional_phone,
        name: this.formData.name
      };
      // console.log(formData);
    this.$store
      .dispatch("contactPeople/store", contacts)
      .then(() => {
        this.$emit("refetch-data");
        // ref('modal-branches').hide();
        // emit("update:is-create-sidebar-active", false);
        this.$refs['modal-contact'].hide()
        this.$store.dispatch('contactPeople/fetchForLeads')

        this.$store.dispatch('contactPeople/showAll')
      })
      .catch(() => {
        // refFormObserver.value.setErrors(errors.value);
      });

  }
  },
  setup(){
    const blankFormData = {
      name: "",
    };

    const formData = ref(JSON.parse(JSON.stringify(blankFormData)));
    const resetFormData = () => {
      formData.value = JSON.parse(JSON.stringify(blankFormData));
    };

    const errors = computed(() => {
      return JSON.parse(JSON.stringify(store.state.clients.errors));
    });

    const { refFormObserver, getValidationState, resetForm } =
      formValidation(resetFormData);
    //    const onSubmit = () => {
    //     console.log(formData);
    //   store
    //     .dispatch("clients/store", formData.value)
    //     .then(() => {
    //       emit("refetch-data");
    //       // ref('modal-branches').hide();
    //       // emit("update:is-create-sidebar-active", false);
    //     })
    //     .catch(() => {
    //       refFormObserver.value.setErrors(errors.value);
    //     });
    //     store.dispatch('clients/fetch')
    //   };
    return {
      formData,
    //   onSubmit,

      refFormObserver,
      getValidationState,
      resetForm,
    }
  }
}
</script>
<style>
@media (min-width:576px){
  #modal-contact .modal-dialog{
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
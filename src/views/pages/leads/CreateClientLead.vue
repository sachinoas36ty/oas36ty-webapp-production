<template>
    <div>
        <!--  <b-button size="sm" variant="primary"  v-b-modal.modal-clients>
              <span class="text-nowrap">Create</span>
            </b-button> -->
            <b-modal
            no-close-on-backdrop
      id="modal-clients"
      ref="modal-clients"
      size="md"
      title="Add client"
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
            <b-form-group  label="Client" label-for="contact">
              <b-form-input    
              
              id="name" v-model="formData.name">

              </b-form-input>
              <b-form-invalid-feedback class="d-block">
                {{ validationContext.errors[0] }}
              </b-form-invalid-feedback>
            </b-form-group>
          </b-col>
          
        </b-row>
      </validation-provider>
     
        <div class="text-right ">
           <b-button size="sm" variant="primary" @click="closeModal()">
            Cancel
          </b-button>&emsp;
 <b-button size="sm"  :disabled="$store.state.clients.isSidebarLoading"  variant="primary" type="submit" >
  Save    
  <b-spinner small class="ml-1" v-if="$store.state.clients.isSidebarLoading"/>
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
      // this.formData.due_date = 2;
      // this.formData.users = [];

    },
    closeModal(){
      this.resetFormData()
      this.$refs['modal-clients'].hide()
    },
    onSubmit(){
      
      // console.log(formData);
    this.$store
      .dispatch("clients/store", this.formData)
      .then(() => {
        this.$emit("refetch-data");
        // ref('modal-branches').hide();
        // emit("update:is-create-sidebar-active", false);
        this.$refs['modal-clients'].hide()
        this.$store.dispatch('clients/fetch')
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
.modal-lg{
  margin-top: 6.5rem;
}
.modal-title{
    text-transform: uppercase;
}
</style>
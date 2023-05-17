<template>
    <b-container 
     bg-variant="white"
          backdrop
          no-header
          right
        >
        <!-- <b-row
           >
         class="sidebar-lg" :visible="isEditSidebarActive"  @hidden="resetForm"   @change="(val) => $emit('update:is-edit-sidebar-active', val)" shadow-->
          <template >
            <!-- Header -->
           
      
            <!-- BODY -->
            <validation-observer #default="{handleSubmit}" ref="refFormObserver">

<b-form @submit.prevent="handleSubmit(createBranch)">

  <b-row>
    <b-col md="3">
      <validation-provider
  #default="validationContext"
  name="name"
  vid="branch name"
  rules="required"
>
      <b-form-group  label="Branch Name" label-for="contact">
        <b-form-input   
      
        id="branch name" v-model="formData.name">

        </b-form-input>
        <b-form-invalid-feedback class="d-block">
          {{ validationContext.errors[0] }}
        </b-form-invalid-feedback>
      </b-form-group>
    </validation-provider>
    </b-col>
    <b-col md="3">
      <validation-provider
  #default="validationContext"
  name="business name"
  vid="business name"
  rules="required"
>
      <b-form-group  label="Business Name" label-for="contact">
        <b-form-input    
        
        id="name" v-model="formData.bussiness_name">

        </b-form-input>
        <b-form-invalid-feedback class="d-block">
          {{ validationContext.errors[0] }}
        </b-form-invalid-feedback>
      </b-form-group>
    </validation-provider>
    </b-col>
    <b-col md="3">
      <b-form-group  label="Business Type" label-for="contact">
        <v-select @input="businessTypeID" v-model="selectedBusinessType" placeholder="Search Business Types" class="select-size-md" label="name" :options="allBusinessTypes">

</v-select>
      </b-form-group>
    </b-col>
    <b-col md="3">
      <b-form-group  label="Primary Phone" label-for="contact">
        <b-form-input    
        
        id="name" v-model="formData.mobile">

        </b-form-input>
      </b-form-group>
    </b-col>
    
  </b-row>
  <b-row>
    <b-col md="3">
      <b-form-group  label="GST No." label-for="contact">
        <b-form-input v-bind:class="(formData.gst_number.length>0 && formData.gst_number.length!==15) || (formData.gst_number.length===15 && gsterr===true) ? 'is-invalid' : ''"  @input="pan"  
        
        id="name" v-model="formData.gst_number">

        </b-form-input>
        <span v-if="(formData.gst_number.length>0 && formData.gst_number.length!==15) || (formData.gst_number.length===15 && gsterr===true)" class="d-block invalid-feedback" id="errmsg">Invalid gst number</span>
      </b-form-group>
    </b-col>
    <b-col md="3">
      <b-form-group  label="PAN Card" label-for="contact">
        <b-form-input    
        
        id="name" v-model="formData.pan_number">

        </b-form-input>
      </b-form-group>
    </b-col>
    <b-col md="3">
      <b-form-group  label="State" label-for="contact">
        <v-select @input="stateCode" v-model="selectedState" placeholder="Search States" class="select-size-md" label="name" :options="allStates">

</v-select>
      </b-form-group>
    </b-col>
    <b-col md="3">
      <b-form-group  label="Bank" label-for="contact">
        <v-select @input="bankID" v-model="selectedBank" placeholder="Search Banks" class="select-size-md" label="name" :options="allBankDetails">

</v-select>
      </b-form-group>
    </b-col>
    
  </b-row>
  <b-row>
    <b-col md="12">
      <b-form-group  label="Address" label-for="contact">
        <b-form-textarea v-model="formData.address"   id="address" placeholder="Enter Address" />
      </b-form-group>
    </b-col>          
  </b-row>
          <b-row>
    <b-col md="6">
      <b-form-group  label="Website" label-for="contact">
        <b-form-input    
        
        id="name" v-model="formData.website">

        </b-form-input>
      </b-form-group>
    </b-col>    
    <b-col md="6">
      <!-- <b-form-group  label="Logo" label-for="contact">
        <b-form-file v-model="file" @input="handleUpload()" accept="image/*"></b-form-file>
      </b-form-group> -->
      <div class="mx-1 border-light">
<div class="d-flex flex-column">
  <div class="d-flex justify-content-between align-items-center p-1 border-bottom-light bg-light">
    <div>Logo</div>
    <div>
      <input type="file" ref="file" @change="handleUpload" style="display: none" />
       <b-button size="sm" variant="primary" @click="$refs.file.click()">Choose File(s)</b-button>
    </div>
  </div>
  <!-- </b-form> -->
</div>
<div class="d-flex justify-content-center align-items-center p-1">
  <div v-if="file_name.length > 0">{{ file_name }}</div>
  <div v-else>No file(s) selected</div>
</div>
</div>
    </b-col>       
  </b-row>

  <div class="d-flex mt-2">
                        <b-button
                          v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                          variant="primary"
                          class="mr-2"
                          type="submit"
                          :disabled="isLoading"
                          @click="showSnack"
                        >
                          Update
                  <!--  -->
                  <b-spinner  small class="ml-1" v-if="isLoading" />
            
                        </b-button>
                        <b-button
                          v-ripple.400="'rgba(186, 191, 199, 0.15)'"
                          type="button"
                          variant="outline-secondary"
                         
                          @click.prevent="hide"
                        >
                          Cancel
                        </b-button>
                        <!--   -->
                      </div>
</b-form>
</validation-observer>
          </template>
        <!--</b-row>-->
    </b-container>
      </template>

      <script>
      import { ValidationProvider, ValidationObserver } from "vee-validate";
      import { ref, computed, watch } from "@vue/composition-api";
      import { required, email } from "@validations";
      import formValidation from "@core/comp-functions/forms/form-validation";
      import {
        BRow,
      BContainer,
        BButton,
        BModal,
        BForm,
        BFormInput,
        BSpinner,
        BFormInvalidFeedback,
        BFormGroup,
        BCardText,
        BFormSelect,
      } from "bootstrap-vue";
      import Ripple from "vue-ripple-directive";
      import ToastificationContent from "@core/components/toastification/ToastificationContent.vue";
      import store from "@/store";
      
      export default {
        components: {
            BRow,
            BContainer,
          BButton,
          BModal,
          BSpinner,
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
         // prop: "isEditSidebarActive",
         // event: "update:is-edit-sidebar-active",
        },
        props: {
         /* isEditSidebarActive: {
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
            name: "",
            // validation rules'
            required,
          };
        },
        methods: {
          handleUpload(e) {
      this.file=e.target.files[0]
      this.fileData = [];
        const reader = new FileReader();
        reader.onload = (event) => {
          this.fileData.push({
            file: event.target.result,
            name: this.file.name
          })
          this.logoURL(this.fileData)
        };
        reader.readAsDataURL(this.file);
        e.target.value = ''

    },
    logoURL(files) {
      var data = {
        attach: files ? files : "null", 
      };
      console.log(data)
      this.$store.dispatch("branches/logo", { data: data }).then(() => {
        let data = this.$store.state.branches.logo;
        this.formData.logo=data[0].url;
        console.log(this.formData)
      })
    },
        },
        computed: {
          isLoading() {
            return this.$store.state.branches.isSidebarLoading;
          },
          successMessage() {
            return this.$store.state.branches.successMessage;
          },
          errorMessage() {
            return this.$store.state.branches.errorMessage;
          },
          showSnack(){
            // this.$refs.snackbar['info']('dev')
          },  
          errors() {
            return JSON.parse(JSON.stringify(this.$store.state.branches.errors));
          },
        },
        setup(props, { emit }) {
          const editID = ref(props.editItem.id);
      
          const blankFormData = {
            name: props.editItem.name,
            bussiness_name: props.editItem.bussiness_name,
      bussiness_type: props.editItem.bussiness_type,
      mobile: props.editItem.mobile,
      gst_number: props.editItem.gst_number,
      pan_number: props.editItem.pan_number,
      state_code: props.editItem.state_code,
      bank_id: props.editItem.bank_id,
      address: props.editItem.address,
      website: props.editItem.website,
      logo: props.editItem.logo
          };
      
          const formData = ref(JSON.parse(JSON.stringify(blankFormData)));
          const resetFormData = () => {
            formData.value = JSON.parse(JSON.stringify(blankFormData));
          };
      
          const errors = computed(() => {
            return JSON.parse(JSON.stringify(store.state.branches.errors));
          });
      
          const { refFormObserver, getValidationState, resetForm } =
            formValidation(resetFormData);
      
          watch(props, (newValue) => {
            editID.value = newValue.editItem.id;
            formData.value.bussiness_name = newValue.editItem.bussiness_name;
            formData.value.bussiness_type = newValue.editItem.bussiness_type;
            formData.value.gst_number = newValue.editItem.gst_number;
            formData.value.pan_number = newValue.editItem.pan_number;
            formData.value.mobile = newValue.editItem.mobile;
            formData.value.state_code = newValue.editItem.state_code;
            formData.value.bank_id = newValue.editItem.bank_id;
            formData.value.website = newValue.editItem.website;
            formData.value.logo = newValue.editItem.logo;
          });
      
          const onSubmit = () => {
            store
              .dispatch("branches/update", {
                payload: formData.value,
                id: editID.value,
                
              })
              .then(() => {
                emit("refetch-data");
               // emit("update:is-edit-sidebar-active", false);
                console.log("updateBranch:",payload,id)
                store.dispatch("branches/business")
              })
              .catch(() => {
                refFormObserver.value.setErrors(errors.value);
              });
                // ref('snackbar').info('dev')
          };
      
          return {
            formData,
            onSubmit,
      
            refFormObserver,
            getValidationState,
            resetForm,
          };
        },
      };
      </script>
      
      <style></style>
      

<template>
    <b-container id="allUsers-edit" bg-variant="white" 
      shadow backdrop no-header right  >
      
      <!--  :visible="isEditSidebarActive" sidebar-class="sidebar-lg" @hidden="resetForm" @change="(val) => $emit('update:is-edit-sidebar-active', val)"-->
      <template >
        <!-- Header 
        <div class="d-flex justify-content-between align-items-center content-sidebar-header px-2 py-1">
          <h5 class="mb-0">Edit User</h5>
  
          <feather-icon class="ml-1 cursor-pointer" icon="XIcon" size="16" @click="hide" />
        </div>-->
  <!-- enctype="multipart/formdata"-->
        <!-- BODY -->
        <validation-observer #default="{ handleSubmit }" ref="refFormObserver">
          formDAta:{{formData}}
          <b-form class="p-2" @submit.prevent="handleSubmit(onSubmit)"  @reset.prevent="resetForm">
            <b-form-group label="Profile Picture">
  
           <!--   <b-media
                no-body
                vertical-align="center"
                class="flex-column flex-md-row"
              >
                <b-media-aside >
                  <b-img v-if="userFile !== null && previewImage != null" id="ref_image_base_64"
                    ref="refPreviewEl"
                    v-model="image"
                    :src="previewImage "
                    height="40"
                    width="40"
                    
                    rounded="circle"
                    
                    
                    class=" border border-light"
                  />
  
                  <b-img v-if=" previewImage == null" 
                    
                    v-model="image"
                    :src="image"
                    height="40"
                    width="40"
                    
                    rounded="circle"
                    
                    
                    class=" border border-light"
                  />
  
                </b-media-aside>
              
                <b-media-body>-->
                 <!--  <div
        class="imagePreviewWrapper"
        :style="{ 'background-image': `url(${previewImage})` }"
        @click="selectImage">
      </div> -->
                <!--  <div class="d-inline-block">
                    
                    <b-form-file
                      ref="refInputEl"
                      v-model="userFile"
                      
                      autofocus
                      accept=".jpg, .png, .gif"
                      placeholder="Choose file"
                      @input="inputImageRenderer"
                      @change="getFilename"
                    />
                  </div>
                </b-media-body>
              </b-media>-->
              </b-form-group>
            <validation-provider #default="validationContext" name="Name" vid="name" rules="required">
              <b-form-group label="Name" label-for="name">
                <b-form-input id="name" v-model="formData.name" autofocus  
                  trim placeholder="Enter User Name" />
                <b-form-invalid-feedback>
                  {{ validationContext.errors[0] }}
                </b-form-invalid-feedback>
              </b-form-group>
            </validation-provider>
            <b-form-group
              label="Assigned Emails"
              label-for="Assigned Emails"
            >
              <v-select
                v-model="formData.emails"
                multiple
                placeholder="Select an option"
                label="email"
                :options="allEmails"
              >
             
              </v-select>
  
            </b-form-group>
            <!-- <b-form-group
              label="Email"
              class=" "
              label-for="Email"
            >
              <div class="d-flex">
                <b-form-input
                  id="Email"
                  v-model="formData.email"
                  type="email"
                  autofocus
                  trim
                  placeholder="Enter Email"
                />    
                  
              </div>
            </b-form-group> -->
            <!-- Form Actions -->
            <div class="d-flex mt-2">
               <b-button size="sm" v-ripple.400="'rgba(255, 255, 255, 0.15)'" variant="primary" class="mr-2" type="submit" :disabled="isLoading">
                Update
        
        <b-spinner  small class="ml-1" v-if="isLoading" />
  
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
  import { ValidationProvider, ValidationObserver } from "vee-validate";
  import { ref, computed, watch } from "@vue/composition-api";
  import { required, email } from "@validations";
  import vSelect from 'vue-select'
  
  import formValidation from "@core/comp-functions/forms/form-validation";
  import {
    
    BContainer,
    BButton,
    BFormFile,
    BModal,
    BForm,
    BMediaBody,
    BFormInput,
    BFormInvalidFeedback,
    BFormGroup,
    BCardText,
    BMedia,
    BFormSelect,
    BSpinner,
    BMediaAside,
    BImg,
  } from "bootstrap-vue";
  import { useInputImageRenderer } from '@core/comp-functions/forms/form-utils'
  
  import Ripple from "vue-ripple-directive";
  import ToastificationContent from "@core/components/toastification/ToastificationContent.vue";
  import store from "@/store";
  
  export default {
    components: {
      
      BContainer,
      BImg,
      BSpinner,
      BButton,
      vSelect,
      BMediaBody,
      BMedia,
      BModal,
      BMediaAside,
      BForm,
      BFormInput,
      BFormInvalidFeedback,
      BFormFile,
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
      //event: "update:is-edit-sidebar-active",
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
        // email: "",
        emails:[],
        image:'',
        userEdit:{},
        userFile: null,
        previewImage:null,
      };
    },
    computed: {
    
      isLoading() {
        return this.$store.state.users.sidebarLoading;
      },
      user_emails(){
        return this.$store.state.users.user_emails;

      },
      successMessage() {
        return this.$store.state.users.successMessage;
      },
      errorMessage() {
        return this.$store.state.users.errorMessage;
      },
      errors() {
        return JSON.parse(JSON.stringify(this.$store.state.users.errors));
      },
      allEmails() {
      //  var length_of_null = []
  
      //   for (let index = 0; index < this.$store.state.users.user_emails.length; index++) {
         
      //     // console.log(this.$store.state.users.user_emails[index]);
      //     for (let i = 0; i < this.$store.state.users.user_emails[index].emails_setting.length; i++) {
      //       if(this.$store.state.users.user_emails[index].user_id === this.editItem.id){
      //       // const element = array[i];
              
      //         this.formData.emails[index] = this.$store.state.users.user_emails[index].emails_setting[i] 
      //       }else{
      //         length_of_null[index] = null
      //       }
          
  
      //       }
      //  }
      //  for (let j = 0; j < this.formData.emails.length; j++) {
      //   // const element = array[j];
      //   if(this.formData.emails[j] == null){
      //     // length_of_null[j] = this.formData.emails[j]
      //     this.formData.emails.splice(this.formData.emails[j], length_of_null.length)
      //   }
        
      //  }
      //  if(this.isEditSidebarActive == false){
      //   for (let j = 0; j < this.formData.emails.length; j++) {
      //   // const element = array[j];
  
  
      //     this.formData.emails.splice(this.formData.emails[j], this.formData.emails.length)
        
        
      //  }
      //  }
  
      
        return this.$store.state.users.emails
        
        
      },
    },
    mounted(){
  this.fetchEmails()
  this.userFile = null
  },
  beforeUpdate(){
      this.image = this._props.editItem.avatar
  
    },
    updated(){
      this.previewImage = null
      // this.$refs['refPreviewEl'].width= ''
      // this.$refs['refPreviewEl'].height= ''
      // this.$refs['refPreviewEl'].class= ''
      this.userFile = null
  
    },
    methods:{
      selectImage () {
            this.$refs.refInputEl.click()
        },
      fetchEmails() {
        this.$store.dispatch('users/assign_emails')
      },
      getFilename(e){
         const image = e.target.files[0];
         this.formData.type = image.type
        const reader = new FileReader();
        reader.onload = (e) => {
          // this.image = e.target.result
          this.previewImage = e.target.result
        this.$refs['refPreviewEl'].src = e.target.result
        this.$refs['refPreviewEl'].value = e.target.result
  
  }
    // const element = array[index];
    
  
        var base = reader.readAsDataURL(image)
        console.log(base);
        // this.$refs['refPreviewEl'].src = image 
              // this.previewImage = base.result
            
            // reader.readAsDataURL(image[0])
        // console.log(this.formData.image);
      },
  /*    showEditSidebar(data){
        console.log("show:",data)
        //this.isEditSidebarActive = status;
        var emails = [];
        var length_null = [];
        var count = 0;
        for (let index = 0; index < this.user_emails.length; index++) {
          for (let j = 0; j < this.user_emails[index].emails_setting.length; j++) {

            
            if(this.user_emails[index].user_id == data.id){
              
              emails[index] = this.user_emails[index].emails_setting[j]
              
            }else{
              length_null[index] = null
            }       
          }
        }
        for (let i = 0; i < emails.length; i++) {
          // const element = array[i];
          if(emails[i] == null){
            emails.splice(emails[i], length_null.length)
          }
          
        }

        console.log(emails);
        var em = {
          avatar: data.avatar,
          id: data.id,
          email: data.email,
          name: data.name,
          status: data.status,
          _showDetails: data._showDetails,
          emails_setting: emails
        }
        this.editItem = em
      }*/
    },
    setup(props, { emit }) {
      console.log("hello am i calling ?")
      const editID = ref(props.editItem.id);
      const refInputEl = ref(null)
      const refPreviewEl = ref(null)
      // let image = '';
      var image = null;
     console.log("propsEditUser:",props)
     const blankFormData = {
          name: props.editItem.name,
          // email: props.editItem.email,
          emails:[],
          image: null,
          type: ''
        };
   
  
      const formData = ref(JSON.parse(JSON.stringify(blankFormData)));
      const resetFormData = () => {
        formData.value = JSON.parse(JSON.stringify(blankFormData));
      };
  
      const errors = computed(() => {
        return JSON.parse(JSON.stringify(store.state.users.errors));
      });
  
      const { refFormObserver, getValidationState, resetForm } =
        formValidation(resetFormData);
  
      watch(props, (newValue) => {
        editID.value = newValue.editItem.id;
        formData.value.name = newValue.editItem.name;
        
        formData.value.emails = newValue.editItem.emails_setting;
        // formData.value.image = newValue.editItem.avatar
        // for (let index = 0; index < store.state.users.user_emails.length; index++) {
         
        //   if(newValue.editItem.id === store.state.users.user_emails[index].user_id){
  
        //     formData.value.emails = store.state.users.user_emails[index].emails_setting
        //   }
        // }
        // formData.value.image =    refPreviewEl.value.src;
  
        // formData.value.email = newValue.editItem.email;
      });
      const { inputImageRenderer } = useInputImageRenderer(refInputEl, base64 => { 
        
        // refPreviewEl.value.src = base64
        formData.value.image = base64
        // console.log(blankform);
        // image = refPreviewEl.value.src
        // image =  refPreviewEl.value.src
        
      })
      const onSubmit = () => {
        
        store
          .dispatch("users/update", {
            payload: formData.value,
            id: editID.value,
          })
          .then(() => {
            
            emit("refetch-data");
            store.dispatch('users/assign_emails');
           // emit("update:is-edit-sidebar-active", false);
          })
          .catch(() => {
            refFormObserver.value.setErrors(errors.value);
          });
      };
  
      return {
        formData,
        onSubmit,
  
        refFormObserver,
        getValidationState,
        resetForm,
        inputImageRenderer,
        refInputEl,
        // getFilename,
        refPreviewEl,
      };
    },
  };
  </script>
    
  <style lang="scss">
  @import '@core/scss/vue/libs/vue-select.scss';
  
  </style>
  
  <style>
  .vs__open-indicator{
    fill: darkgray!important;
  }
  </style>
    
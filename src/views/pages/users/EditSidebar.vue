 <template>
  <div>

  <b-modal id="users-edit-modal" :visible="isEditSidebarActive" size="md" 
  no-close-on-backdrop
    hide-footer
  ref = "users-edit-modal"
    title="edit users"
  @hidden="resetForm" @change="(val) => $emit('update:is-edit-sidebar-active', val)">
    

      <!-- BODY -->
      <validation-observer #default="{ handleSubmit }" ref="refFormObserver">
        <b-form class="" @submit.prevent="handleSubmit(onSubmit)" enctype="multipart/formdata" @reset.prevent="resetForm">
          <b-form-group label="Profile Picture">

            <b-media
              no-body
              vertical-align="center"
              class="flex-column flex-md-row justify-content-center"
            >
            <b-media-body>
               
               <!-- <div class="">
                 
                 <b-form-file
                   ref="refInputEl"
                   v-model="userFile"
                   
                   autofocus
                   accept=".jpg, .png, .gif"
                   placeholder="Choose file"
                   @input="inputImageRenderer"
                   @change="getFilename"
                 />
               </div> -->
               <div class="border-l">
<div class="d-flex flex-column">
  <div class="d-flex justify-content-between align-items-center p-1 border-bottom-light bg-light">
    <div>Attachment(s)</div>
    <div>
      <input type="file" ref="refInputEl" @change="getFilename" style="display: none" />
       <b-button size="sm" variant="primary" @click="$refs.refInputEl.click()">Choose File(s)</b-button>
    </div>
  </div>
  <!-- </b-form> -->
</div>
<div class="d-flex justify-content-between align-items-center p-1">
  <div v-if="file_name.length > 0">{{ file_name }}</div>
  <div v-else>No file(s) selected</div>
  <b-media-aside class="mr-0">
                <b-img v-if="userFile !== null && previewImage != null" id="ref_image_base_64"
                  ref="refPreviewEl"
                  v-model="image"
                  :src="previewImage"
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
</div>
</div>
             </b-media-body>
             &emsp13;
              <!-- <div
      class="imagePreviewWrapper"
      :style="{ 'background-image': `url(${previewImage})` }"
      @click="selectImage">
    </div> -->
          
            </b-media>
            </b-form-group>
          <validation-provider #default="validationContext" name="Name" vid="name" rules="required">
            <b-form-group label="Name *" label-for="name" class="my-custom-input">
              <b-form-input id="name" v-model="formData.name" autofocus 
                trim placeholder="Enter User Name" />
              <b-form-invalid-feedback>
                {{ validationContext.errors[0] }}
              </b-form-invalid-feedback>
            </b-form-group>
          </validation-provider>
          <!-- <b-row>
          <b-col md="12 "> -->
            <!--  <b-button size="sm" variant="primary"   v-b-modal.modal-1>
              <feather-icon size="14" style="margin-right: 0.5rem;"  icon="SearchIcon" /> Add Contacts</b-button> -->
            <!-- <b-form-group  label="Category" label-for="contact">
              <v-select v-model="formData.category" multiple placeholder="Choose Category" :options="categories" label="name">

                <template #list-header class="add_categories">
            <div class=" ml-2 mb-1 mt-1"  v-b-modal.modal-categories>

                <a href="#">
                <feather-icon size="14" style="margin-right: 0.5rem;"  icon="PlusIcon" /> New Category</a>
            </div>
            </template>
              </v-select>
            
            </b-form-group> -->
          <!-- </b-col>
          
        </b-row> -->
        <!-- <CreateCategory /> -->
        <validation-provider
        #default="validationContext"
        name="desig_id"
        vid="desig_id"
        rules="required"
      >
      <b-row>
          <b-col md="12 ">
            <b-form-group  label="Assign Designation *"   class="my-custom-input">
              <v-select id="desig_id" v-model="formData.desig_id" placeholder="Choose Designations" :options="$store.state.designation.all" label="designation_name">
                <template #list-header class="add_categories">
            <div class=" ml-2 mb-1 mt-1"  v-b-modal.designation-modal>
              <!--  <b-button size="sm" variant="primary"   v-b-modal.modal-1>

                <feather-icon size="14" style="margin-right: 0.5rem;"  icon="SearchIcon" /> Add Contacts</b-button> -->
                <a href="#">
                <feather-icon size="14" style="margin-right: 0.5rem;"  icon="PlusIcon" /> New Designation</a>
            </div>
            </template>
               
              </v-select>
              <b-form-invalid-feedback class="d-block">
                {{ validationContext.errors[0] }}
              </b-form-invalid-feedback>
            </b-form-group>
          </b-col>
          
        </b-row>
        </validation-provider>
          <b-form-group
            label="Assigned Emails"
            label-for="Assigned Emails"
            class="my-custom-input"
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
          <validation-provider
        #default="validationContext"
        name="branch_id"
        vid="branch_id"
        rules="required"
      >
          <b-form-group
            label="Assigned Branches *"
            class="my-custom-input"
          >
            <v-select
              v-model="formData.branch_id"
              class="my-custom-input"
              placeholder="Select an option"
              label="name"
              :options="branches"
            >
            <template #list-header >
            <div class=" ml-2 mb-1 mt-1"  v-b-modal.modal-branches>
              <!--  <b-button size="sm" variant="primary"   v-b-modal.modal-1>

                <feather-icon size="14" style="margin-right: 0.5rem;"  icon="SearchIcon" /> Add Contacts</b-button> -->
                <a href="#">
                <feather-icon size="14" style="margin-right: 0.5rem;"  icon="PlusIcon" /> New Branch</a>
            </div>
            </template>
            </v-select>
            <b-form-invalid-feedback class="d-block">
                {{ validationContext.errors[0] }}
              </b-form-invalid-feedback>
          </b-form-group>
          </validation-provider>
          <b-row>
          <b-col md="12 ">
            <validation-provider
        #default="validationContext"
        name="monthly_cost"
        vid="monthly_cost"
        rules="required"
      >
            <b-form-group  label="Monthly Cost *"  class="my-custom-input">
              <b-form-input id="monthly_cost" type="number" step="any" placeholder="Enter Monthly Cost" v-model="formData.monthly_cost" @keypress="isNumber($event)">

              </b-form-input>
              <b-form-invalid-feedback class="d-block">
                {{ validationContext.errors[0] }}
              </b-form-invalid-feedback>
            </b-form-group>
            </validation-provider>
          </b-col>
          
        </b-row>
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
          <div class="text-right">
          
             <b-button size="sm" class="mr-1" v-ripple.400="'rgba(186, 191, 199, 0.15)'" type="button" variant="primary"
              @click="$refs['users-edit-modal'].hide()">
              Cancel
            </b-button>
             <b-button size="sm" v-ripple.400="'rgba(255, 255, 255, 0.15)'" variant="primary" class="" type="submit" :disabled="isLoading">
              Update
      
      <b-spinner  small class="ml-1" v-if="isLoading" />

            </b-button>
          </div>
        </b-form>
      </validation-observer>
    
  </b-modal>

  </div>

</template>
  
<script>
import { ValidationProvider, ValidationObserver } from "vee-validate";
import { ref, computed, watch } from "@vue/composition-api";
import { required, email } from "@validations";
import vSelect from 'vue-select'
// import createDesig from '../'
import formValidation from "@core/comp-functions/forms/form-validation";
import {
  BSidebar,
  BButton,
  BFormFile,BRow,BCol,
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
import CreateCategory from "../categories/CreateCategory.vue";

export default {
  components: {
    BSidebar,
    BImg,
    BSpinner,
    BButton,
    vSelect,BRow,BCol,
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
    CreateCategory
},
  directives: {
    Ripple,
  },
  model: {
    prop: "isEditSidebarActive",
    event: "update:is-edit-sidebar-active",
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
      name: "",
      // validation rules'
      required,
      // email: "",
      emails:[],
      image:'',
      userEdit:{},
      branch_id:null,
      userFile: null,
      desig_id:null,
      previewImage:null,
      file_name: '',
      toggleArr:[],
      design_name:''
    };
  },
  computed: {
    all_masters() {
      this.toggleArr = []

            var arr = this.$store.state.status.all_master.reverse()
            arr.forEach(element => {
                this.toggleArr.push({

                    id: element.id, switchOption: false, text: 'ToggleLeftIcon', type: element.name, show_all_privileges: element.privileges, privileges: []

                })

            });
        },
    isLoading() {
      return this.$store.state.users.sidebarLoading;
    },
    successMessage() {
      return this.$store.state.users.successMessage;
    },
    errorMessage() {
      return this.$store.state.users.errorMessage;
    },
    branches(){
      return this.$store.state.branches.all;
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
    categories(){
      return this.$store.state.categories.all;
    },
  },
  mounted(){
    // this.$store.dispatch('categories/fetch')

this.fetchEmails()
this.userFile = null
},
beforeUpdate(){
    this.image = this._props.editItem.avatar
    this.file_name = this._props.editItem.avatar.split('email-files/')[1] ?? ''

    // this.$store.dispatch('users/assign_emails')
  },
  updated(){
    this.setLocalStoragePrivilege()
    // this.$store.dispatch('users/assign_emails')
    this.previewImage = null
    // this.$refs['refPreviewEl'].width= ''
    // this.$refs['refPreviewEl'].height= ''
    // this.$refs['refPreviewEl'].class= ''
    this.userFile = null

  },
  beforeDestroy() {
    this.setLocalStoragePrivilege()
    
  },
  methods:{
    onSubmit(){
      this.$store
        .dispatch("users/update", {
          payload: {
            branch_id: this.formData.branch_id.id,
            emails:this.formData.emails,
            image:this.formData.image,
            desig_id:this.formData.desig_id,
            name: this.formData.name,
            type: this.formData.type,
            user_role_id: this.formData.desig_id.id,
            monthly_cost:this.formData.monthly_cost
          },
          id: this.editItem.id,
        })
        .then(() => {
          // this.setLocalStoragePrivilege()
          
          this.$store.dispatch('status/fetchAllMaster').then(() => {
            this.$toast.success('Updated Successfully!', {
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
            this.$store.dispatch('designation/fetch').then(() => {
              this.setLocalStoragePrivilege()
              
            })
          })
          this.$emit("refetch-data");
          this.$store.dispatch('users/assign_emails');
          
          this.$emit("update:is-edit-sidebar-active", false);
      
        })
        .catch(() => {
          // refFormObserver.value.setErrors(errors.value);
        });
    },
    setLocalStoragePrivilege(){
            this.$store.state.designation.all.forEach(element => {
                        element.users.forEach(x => {
                            if(x.email === JSON.parse(localStorage.getItem('userData')).email){
                                const data = {id:element.id,designation_name :element.designation_name, masters:element.masters}
                                // localStorage.removeItem('privileges')
                                localStorage.setItem('privileges', JSON.stringify(data))


                            }else{
                                // localStorage.removeItem('privileges')

                            }
                        });
                    });
        },
    isNumber(ev){
      const keysAllowed= ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.'];
    const keyPressed = ev.key;
    
    if (!keysAllowed.includes(keyPressed)) {
           ev.preventDefault()
    }
    },
    selectImage () {
          this.$refs.refInputEl.click()
      },
    fetchEmails() {
      this.$store.dispatch('users/assign_emails')
    },
    getFilename(e){
       const image = e.target.files[0];
       this.userFile = image;
       this.file_name = image.name;
       this.formData.type = image.type
      const reader = new FileReader();
      reader.onload = (e) => {
        // this.image = e.target.result
        this.previewImage = e.target.result
        this.formData.image = this.previewImage
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
    }
  },
  setup(props, { emit }) {
    const editID = ref(props.editItem.id);
    const refInputEl = ref(null)
    const refPreviewEl = ref(null)
    // let image = '';
    var image = null;
   
   const blankFormData = {
        name: props.editItem.name,
        // email: props.editItem.email,
        emails:[],
        branch_id: String(props.editItem.branches),
        // category:[],
        monthly_cost:props.editItem.monthly_cost,
        // monthly_cost:props.editItem.monthly_cost,
        image: null,
        desig_id:String(props.editItem.user_role_id != null ?store.state.designation.all.find(e => e.id === props.editItem.user_role_id) : ''),
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
      // formData.value.branch_id = null
    watch(props, (newValue) => {
      editID.value = newValue.editItem.id;
      formData.value.name = newValue.editItem.name;
      // formData.value.image = newValue.editItem.image;

      formData.value.monthly_cost = newValue.editItem.monthly_cost
      formData.value.emails = newValue.editItem.emails_setting;
      formData.value.branch_id = newValue.editItem.branches;
      formData.value.desig_id = store.state.designation.all.find(e => e.id === newValue.editItem.user_role_id);


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

    // const onSubmit = () => {
      // formData.value.image = image
      // formData.value.branch_id = formData.value.branch_id.id
      // formData.value.user_role_id = formData.value.desig_id.id
      // store
      //   .dispatch("users/update", {
      //     payload: {
      //       branch_id: formData.value.branch_id.id,
      //       emails:formData.value.emails,
      //       image:formData.value.image,
      //       desig_id:formData.value.desig_id,
      //       name: formData.value.name,
      //       type: formData.value.type,
      //       user_role_id: formData.value.desig_id.id,
      //       monthly_cost:formData.value.monthly_cost
      //     },
      //     id: editID.value,
      //   })
      //   .then(() => {
      //     // setLocalStoragePrivilege()
          


      //     emit("refetch-data");
      //     store.dispatch('users/assign_emails');
       
      //     emit("update:is-edit-sidebar-active", false);
      
      //   })
      //   .catch(() => {
      //     refFormObserver.value.setErrors(errors.value);
      //   });
    // };

    return {
      formData,
      // onSubmit,

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
.my-custom-select ::placeholder {
  font-size: 1rem;
/* color: rgba(128, 128, 128, 0.442) !important; */
color: rgb(85, 81, 81)!important;

}
.border-l {
  border: 1px solid rgb(212, 212, 212);
}
</style>
  
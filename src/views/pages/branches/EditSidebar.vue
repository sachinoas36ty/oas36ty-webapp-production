 <template>
  <div>
  <b-modal
    id="branches-edit-modal"
    ref="branches-edit-modal"
    no-close-on-backdrop
    :visible="isEditSidebarActive"
    size="lg"
    title="edit branch"
    hide-footer
   
    @change="(val) => $emit('update:is-edit-sidebar-active', val)"
  >
  <validation-observer #default="{handleSubmit}" ref="refFormObserver">
    {{ assignLogo }}

<b-form @submit.prevent="handleSubmit(createBranch)">

  <b-row>
    <b-col md="3">
      <validation-provider
  #default="validationContext"
  name="name"
  vid="branch name"
  rules="required"
>
      <b-form-group  label="Branch Name *" label-for="contact">
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
      <b-form-group  label="Business Name *" label-for="contact">
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
      <!-- <validation-provider
  #default="validationContext"
  name="business type"
  vid="business type"
  rules="required"
> -->
      <b-form-group  label="Business Type " label-for="contact">
        <v-select @input="businessTypeID" v-model="selectedBusinessType" placeholder="Search Business Types" class="select-size-md" label="name" :options="allBusinessTypes">

</v-select>
        <!-- <b-form-invalid-feedback class="d-block">
          {{ validationContext.errors[0] }}
        </b-form-invalid-feedback> -->
      </b-form-group>
    <!-- </validation-provider> -->
    </b-col>
    <b-col md="3">
      <!-- <validation-provider
  #default="validationContext"
  name="phone"
  vid="phone"
  rules="required"
> -->
<validation-provider
  #default="validationContext"
  name="mobile"
  vid="phone"
  rules="required"
>
      <b-form-group  label="Primary Phone *" label-for="contact">
        <b-form-input   
        
        id="phone" v-model="formData.mobile">

        </b-form-input>
        <b-form-invalid-feedback class="d-block">
          {{ validationContext.errors[0] }}
        </b-form-invalid-feedback>
        <!-- <b-form-invalid-feedback class="d-block">
          {{ validationContext.errors[0] }}
        </b-form-invalid-feedback> -->
      </b-form-group>
      </validation-provider>
    <!-- </validation-provider> -->
    </b-col>
    
  </b-row>
  <b-row>
    <b-col md="3">
      <!-- <validation-provider
  #default="validationContext"
  name="gst"
  vid="gst"
  rules="required"
> -->
      <b-form-group  label="GST No." label-for="contact">
        <b-form-input v-bind:class="(formData.gst_number.length>0 && formData.gst_number.length!==15) || (formData.gst_number.length===15 && gsterr===true) ? 'is-invalid' : ''"  @input="pan" aria-invalid="true" 
        
        id="name" v-model="formData.gst_number">

        </b-form-input>
        <span v-if="(String(formData.gst_number).length>0 && String(formData.gst_number).length!==15) || (String(formData.gst_number).length===15 && gsterr===true)" class="d-block invalid-feedback" id="errmsg">Invalid gst number</span>
        <!-- <b-form-invalid-feedback class="d-block">
          {{ validationContext.errors[0] }}
        </b-form-invalid-feedback> -->
      </b-form-group>
    <!-- </validation-provider> -->
    </b-col>
    <b-col md="3">
      <!-- <validation-provider
  #default="validationContext"
  name="pan"
  vid="pan"
  rules="required"
> -->
      <b-form-group  label="PAN Card" label-for="contact">
        <b-form-input   
        
        id="name" v-model="formData.pan_number">

        </b-form-input>
        <!-- <b-form-invalid-feedback class="d-block">
          {{ validationContext.errors[0] }}
        </b-form-invalid-feedback> -->
      </b-form-group>
    <!-- </validation-provider> -->
    </b-col>
    <b-col md="3">
      <validation-provider
  #default="validationContext"
  name="state"
  vid="state"
  rules="required"
>

      <b-form-group  label="State *" label-for="contact">
        <v-select id="state" @input="stateCode" v-model="selectedState" placeholder="Search States" class="select-size-md" label="name" :options="allStates">

</v-select>
        <b-form-invalid-feedback class="d-block">
          {{ validationContext.errors[0] }}
        </b-form-invalid-feedback>
      </b-form-group>
    </validation-provider>
    </b-col>
    <b-col md="3">
      <validation-provider
  #default="validationContext"
  name="bank_id"
  vid="bank"
>
      <b-form-group  label="Bank *" label-for="contact">
        <v-select id="bank" @input="bankID" v-model="selectedBank" placeholder="Search Banks" class="select-size-md" label="name" :options="allBankDetails">
          <template #list-header class="add_contacts" >
                    <div class=" ml-2 mb-1 mt-1" @click="openModal()" >
                      <!--  <b-button size="sm" variant="primary"   v-b-modal.modal-1>

                <feather-icon size="14" style="margin-right: 0.5rem;"  icon="SearchIcon" /> Add Contacts</b-button> -->
                      <a href="#">
                        <feather-icon size="14" style="margin-right: 0.5rem;" icon="PlusIcon" /> New Bank A/C
                      </a>


                    </div>
                  </template>
</v-select>
        <b-form-invalid-feedback class="d-block">
          {{ validationContext.errors[0] }}
        </b-form-invalid-feedback>
      </b-form-group>
    </validation-provider>
    </b-col>
    
  </b-row>
  <b-row>
    <b-col md="12">
      <!-- <validation-provider
  #default="validationContext"
  name="address"
  vid="address"
  rules="required"
> -->
      <b-form-group  label="Address" label-for="contact">
        <b-form-textarea v-model="formData.address"  id="address" placeholder="Enter Address" />
        <!-- <b-form-invalid-feedback class="d-block">
          {{ validationContext.errors[0] }}
        </b-form-invalid-feedback> -->
      </b-form-group>
    <!-- </validation-provider> -->
    </b-col>          
  </b-row>
          <b-row>
    <b-col md="6">
      <!-- <validation-provider
  #default="validationContext"
  name="website"
  vid="website"
  rules=""
> -->
      <b-form-group  label="Website" label-for="contact">
        <b-form-input   
        
        id="name" v-model="formData.website">

        </b-form-input>
        <!-- <b-form-invalid-feedback class="d-block">
          {{ validationContext.errors[0] }}
        </b-form-invalid-feedback> -->
      </b-form-group>
    <!-- </validation-provider> -->
    </b-col>    
    <b-col md="6">
      <!-- <validation-provider
  #default="validationContext"
  name="logo"
  vid="logo"
  rules="required"
> -->
      <!-- <b-form-group  label="Logo" label-for="contact">
        <b-form-file v-model="file" @input="handleUpload()" accept="image/*"></b-form-file>
        <b-form-invalid-feedback class="d-block">
          {{ validationContext.errors[0] }}
        </b-form-invalid-feedback>
      </b-form-group> -->
      <validation-provider #default="validationContext" name="logo" vid="file_name" rules="required">
                <!-- <b-form-group  label="Logo" label-for="contact">
              <b-form-file v-model="file" @input="handleUpload()" accept="image/*"></b-form-file>
            </b-form-group> -->
                <b-form-group label="Logo *">
                  <b-form-input hidden v-model="formData.logo"></b-form-input>
                  <div class="border-l" id="file_name">
                    <div class="d-flex flex-column">
                      <div class="d-flex justify-content-between align-items-center p-1 border-bottom-light bg-light">
                        <div>Logo</div> 
                        <div>
                          <input type="file" id="fileAttach" @change="handleUpload"  style="display: none" />
                           <b-button size="sm" variant="primary" @click="file_upload()">Choose File(s)</b-button>
                        </div>
                      </div>
                      <!-- </b-form> -->
                    </div>
                    <div class="d-flex justify-content-between align-items-center p-1">
                      
                      <div v-if="fileData.length > 0" class="limit-logo cursor-pointer" v-b-tooltip.hover="realFileName">

                        {{ realFileName}}
                        
                      </div>
                      <div v-else>No file(s) selected</div>
                      <b-media-aside class="mr-0">
                        <b-img v-if="formData.logo !== null && formData.logo != ''" id="ref_image_base_64" ref="refPreviewEl"
                          v-model="formData.logo" :src="formData.logo" height="40" width="40" rounded="circle"
                          class=" border border-l" />

                      </b-media-aside>
                    </div>
                  </div>
                  <b-form-invalid-feedback class="d-block">
                    {{ validationContext.errors[0] }}
                  </b-form-invalid-feedback>
                </b-form-group>
              </validation-provider>

    <!-- </validation-provider> -->
    </b-col>       
  </b-row>

  <div class="text-right ">

     <b-button size="sm" variant="primary" type="reset" @click="formData.name = '', $refs['branches-edit-modal'].hide()">
      Cancel
    </b-button>&emsp;
 <b-button size="sm"  :disabled="$store.state.branches.isSidebarLoading"   variant="primary" type="submit" >
Update
<b-spinner small class="ml-1" v-if="$store.state.branches.isSidebarLoading"/>
</b-button >
</div>
</b-form>
</validation-observer>
  </b-modal>
   <b-modal no-close-on-backdrop id="add-bank" ref="add-bank" size="lg" :title="titleBank" hide-footer>
        <template #modal-header>
                <h5 class="modal-title">{{ titleBank }}</h5>
                <!-- <button type="button" aria-label="Close" class="close">x</button> -->
                <feather-icon icon="XIcon" size="24" class="cursor-pointer" @click="() => {
                    remove_all_fields()
                    $refs['add-bank'].hide()
                }" />

            </template>
            <validation-observer #default="{ handleSubmit }" ref="refFormObserver">

        <b-form class="mt-1" @submit.prevent="
            handleSubmit(
                titleBank == 'add bank details'? addBank: update
                )">

        <b-row>
            <b-col md="3">
                <validation-provider #default="validationContext" name="acc_name" vid="acc_name" rules="required">

                <b-form-group label="Account Name">

                    <b-form-input   id="acc_name" v-model="acc_name" placeholder="Account Name">
                        
                    </b-form-input>
                    <b-form-invalid-feedback>
                {{ validationContext.errors[0] }}
              </b-form-invalid-feedback>
                </b-form-group>
                </validation-provider>
            </b-col>
          
            <b-col md="3">
                <validation-provider #default="validationContext" name="acc_number" vid="acc_number" rules="required">

                <b-form-group label="Account Number">

                    <b-form-input   id="acc_number" type="number" v-model="acc_number" placeholder="Account Number">
                        
                    </b-form-input>
                    <b-form-invalid-feedback>
                {{ validationContext.errors[0] }}
              </b-form-invalid-feedback>
                </b-form-group>
                </validation-provider>
            </b-col>
            <b-col md="3">
                <validation-provider #default="validationContext" name="ifsc_code" vid="ifsc_code" rules="required">

                <b-form-group label="IFSC Code">

                    <b-form-input   id="ifsc_code" v-model="ifsc_code" placeholder="IFSC Code">
                        
                    </b-form-input>
                    <b-form-invalid-feedback>
                {{ validationContext.errors[0] }}
              </b-form-invalid-feedback>
                </b-form-group>
                </validation-provider>
            </b-col>
            <b-col md="3">
                <b-form-group label="Swift Code">

                    <b-form-input v-model="swift_code" placeholder="Swift Code">
                        
                    </b-form-input>
                </b-form-group>
            </b-col>
        </b-row>
        <b-row>
            <b-col md="3">
                <b-form-group label="MICR">

                    <b-form-input type="number" v-model="micr" placeholder="MICR">
                        
                    </b-form-input>
                </b-form-group>
            </b-col>
          
            <b-col md="3">
                <validation-provider #default="validationContext" name="bank_name" vid="bank_name" rules="required">

                <b-form-group label="Bank Name">

                    <b-form-input   id="bank_name" v-model="bank_name" placeholder="Bank Name">
                    </b-form-input>
                        <b-form-invalid-feedback>
                {{ validationContext.errors[0] }}
              </b-form-invalid-feedback>
                </b-form-group>
                </validation-provider>
            </b-col>
            <b-col md="3">
                <validation-provider #default="validationContext" name="bank_branch" vid="bank_branch" rules="required">

                <b-form-group label="Bank Branch">

                    <b-form-input   id="bank_branch" v-model="bank_branch" placeholder="Bank Branch">
                        
                    </b-form-input>
                    <b-form-invalid-feedback>
                {{ validationContext.errors[0] }}
              </b-form-invalid-feedback>
                </b-form-group>
                </validation-provider>
            </b-col>
            <b-col md="3">
                <validation-provider #default="validationContext" name="acc_type" vid="acc_type" rules="required">

                <b-form-group label="Account Type">

                   <v-select    id="acc_type" v-model="acc_type" placeholder="Select an Option" :options="accountTypes" label="name" />
                   <b-form-invalid-feedback  class="d-block">
                {{ validationContext.errors[0] }}
              </b-form-invalid-feedback>
                </b-form-group>
                </validation-provider>
            </b-col>
        </b-row>
        <div class="text-right mt-1">
             <b-button size="sm" @click="() => {
                remove_all_fields()
                $refs['add-bank'].hide()

            }" class="mr-1" type="reset" variant="primary">
                Cancel
            </b-button>
             <b-button size="sm" type="submit" variant="primary">
                {{titleBank == 'add bank details' ? 'Create' : 'Update'}}
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
import formValidation from "@core/comp-functions/forms/form-validation";

import {
  BSidebar,
  BButton,
  BModal,VBModal,
  BForm,
  VBTooltip,
  BFormInput,
  BRow,BCol,BFormFile,BFormTextarea,
  BSpinner,
  BFormInvalidFeedback,
  BFormGroup,
  BCardText,
  BFormSelect,
  BImg,
  BMediaAside
} from "bootstrap-vue";
import Ripple from "vue-ripple-directive";
import ToastificationContent from "@core/components/toastification/ToastificationContent.vue";
import store from "@/store";
import vSelect from 'vue-select'
import proposals from "@/api/proposals";
import { isUserLoggedIn } from "@/auth/utils";

export default {
  components: {
    BSidebar,
    BButton,BRow,BCol,BFormFile,BFormTextarea,
    BModal,
    VBTooltip,
    BSpinner,vSelect,
    BForm,
    BFormInput,
    BFormInvalidFeedback,
    BCardText,
    BFormGroup,
    BFormSelect,VBModal,
    ValidationProvider,
    ValidationObserver,
    BImg,
    BMediaAside
  },
  directives: {
    Ripple,
    'b-modal': VBModal,
    'b-tooltip':VBTooltip,

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
  data(){
    return { 
      realFileName:null,
      titleBank: 'add bank details',
      acc_name: '',
            acc_number: '',
            ifsc_code: '',
            // titleBank: '',
            swift_code: '',
            // bankID:0,
            micr: '',
            accountTypes:[{id:1,name:'Current Account'},{id:2,name:'Savings Account'},{id:3,name:'Recurring Deposit Account'},{id:4,name:'Fixed Deposit Account'}],
            bank_name: '',
            bank_branch: '',
            acc_type:null,
      formData:{
      name: '',
      bussiness_name: '',
      bussiness_type: '',
      mobile: '',
      gst_number: '',
      pan_number: '',
      state_code: '',
      bank_id: '',
      address: '',
      website: '',
      logo: ''
      },
      required,
      file: null,
      fileData: [],
      gsterr: true,
      selectedState: '',
      selectedBusinessType: '',
      selectedBank: '',
      file_name: '',
      previewImage: null,
      image: null
    }
  },
 
  methods:{
    file_upload(){
      document.getElementById("fileAttach").click();
    },
    addBank(){
      // alert('hello')
      const data = {
                account_name:this.acc_name,
                bank_name:this.bank_name,
                account_number: this.acc_number,
                ifsc_code:this.ifsc_code,
                swift_code:this.swift_code,
                micr_code:this.micr,
                branch_name:this.bank_branch,
                account_type: this.acc_type.name
            }
            this.$store.dispatch('proposals/bank_create', data).then(() => {
                this.$store.dispatch('proposals/bank_fetch')
                this.$refs['add-bank'].hide()
            })
    },
    remove_all_fields(){
            this.acc_name = null
            this.acc_type = null
            this.acc_number = null
            this.acc_branch = null
            this.bank_name = null
            this.bank_branch = null

            this.ifsc_code = null
            this.swift_code = null
            this.micr = null



        },
    openModal(){
      this.$refs['add-bank'].show()
    },
    createBranch() {
      console.log(this.formData)
      this.$store.state.proposals.allBank.forEach(element => {
        if(element.account_name == this.formData.bank_id){
          this.formData.bank_id = element.id
        }
      });
      if(this.formData.bank_id.id){

        this.formData.bank_id = this.formData.bank_id.id
      }
      this.formData.state_code = this.$store.state.branches.states.filter(e => e.name === this.selectedState)[0].fips_code
      this.$store.dispatch("branches/update", {payload:this.formData,id:this.editItem.id},).then(() => {
        this.$store.dispatch("branches/fetch")
        // this.$store.dispatch("branches/business")
        this.$refs['branches-edit-modal'].hide()
        this.$toast.success("Branch Updated Successfully!", {
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
    },
    stateCode() { 
      let stateCode=this.$store.state.branches.states.filter((x) => {
        return x.name===this.selectedState;
      })
      this.formData.state_code=stateCode[0].fips_code;
    },
    businessTypeID() { 
      let businessTypeID=this.$store.state.branches.businessTypes.filter((x) => {
        return x.bussiness_type===this.selectedBusinessType
      })
      this.formData.bussiness_type=businessTypeID[0].id;
    },
    bankID() { 
      let bankID=this.$store.state.proposals.allBank.filter((x) => {
        return x.account_name===this.selectedBank
      })
      this.formData.bank_id=bankID[0].id;
      console.log(this.formData)
    },
    pan() {
      if(this.formData.gst_number.length===15) {
        if(isNaN(this.formData.gst_number.slice(0,2)+this.formData.gst_number.slice(7,10)+this.formData.gst_number.slice(14,15))===false && isNaN(this.formData.gst_number.slice(2,7)+this.formData.gst_number.slice(11,12)+this.formData.gst_number.slice(13,14)) && (9>+this.formData.gst_number.slice(12,13)>0 || isNaN(this.formData.gst_number.slice(12,13)))) {
        this.formData.pan_number=this.formData.gst_number.slice(2,12);
        let states = this.$store.state.branches.states;
        let stateFilter = states.filter((x) => {
          return x.fips_code===this.formData.gst_number.slice(0,2)
        });
        console.log(stateFilter, 'sssss')
        this.selectedState=stateFilter[0].name;
        this.gsterr=false;
        console.log('noerr')
      }
      }
            else {
        this.formData.pan_number=''
        this.formData.state=''
      }
    },
    handleUpload(e) {
      this.file=e.target.files[0]
      // var file_name = this.file.name
      // this.file_name = file_name
      this.fileData = [];
        const reader = new FileReader();
        reader.onload = (event) => {
          this.previewImage=event.target.result;
          this.fileData.push({
            file: event.target.result,
            name: this.file.name
          });
          let array = [];
          array.push(this.fileData[this.fileData.length-1]);
          let obj1 = this.fileData[this.fileData.length-1];
          this.fileData = [];
          this.fileData.push(obj1);
          this.realFileName = this.fileData[this.fileData.length-1].name
          console.log("handle upload func", this.fileData);
          this.logoURL(array);
        };
        reader.readAsDataURL(this.file);
        e.target.value = ''

    },
    logoURL(files) {
      var data = {
        attach: files ? files : "null", 
      };
      console.log(data , "this is data");
      this.$store.dispatch("branches/logo", { data: data }).then(() => {
        let data = this.$store.state.branches.logo;
      
        this.formData.logo=data[0].url;
        console.log(this.formData , "this is form data");
      })
    },
    onSubmit(){
      
        // console.log(formData);
      this.$store
        .dispatch("branches/store", this.formData)
        .then(() => {
          this.$emit("refetch-data");
          // ref('modal-branches').hide();
          // emit("update:is-create-sidebar-active", false);
          this.$refs['modal-branches'].hide()
          this.$store.dispatch('branches/fetch')
          this.$store.dispatch("branches/business")
        })
        .catch(() => {
          // refFormObserver.value.setErrors(errors.value);
        });

    }
  },
  created(){
    if(this.$store.state.branches.logo.length === 0){
        
        this.$store.dispatch("branches/logo")
      }
  },
  mounted() {
    let loggedIn = isUserLoggedIn();
    if(loggedIn){

      if(this.$store.state.branches.states.length === 0){
        
        this.$store.dispatch("branches/states")
      }
      if(this.$store.state.branches.businessTypes.length === 0){
        
        // this.$store.dispatch("branches/states")
        // this.$store.dispatch("branches/states")
        // this.$store.dispatch("branches/business")
      }
      this.$store.dispatch("proposals/bank_fetch")
    }
  },
  beforeUpdate(){
    this.realFileName =this.editItem.logo.split('branch-logos/')[1]
    

    if(this.editItem.bank_details != null)
    {
      this.selectedBank = this.editItem.bank_details.account_name
      
      this.formData.bank_id = this.editItem.bank_details.id
    }else{
      this.formData.bank_id = null
    }
    this.formData.address = this.editItem.address
    this.formData.website = this.editItem.website
    this.formData.logo = this.editItem.logo
    let businessTypeID=this.$store.state.branches.businessTypes.filter((x) => {
        return x.bussiness_type===this.editItem.bussiness_type
      })
      // let stateID=this.$store.state.branches.states.filter((x) => {
      //   return Number(x.fips_code)===Number(this.editItem.state_code)
      // })
      this.selectedState = this.editItem.state_code
    this.image = this.editItem.logo;
    this.formData.name = this.editItem.name
    this.formData.bussiness_name = this.editItem.bussiness_name
    this.selectedBusinessType = this.editItem.bussiness_type//businessTypeID[0].bussiness_type
    this.formData.bussiness_type = businessTypeID[0].id
    this.formData.mobile = this.editItem.mobile
    this.formData.gst_number = this.editItem.gst_number ?? ''
    if(this.editItem.gst_number){

      this.pan()
    }
    this.formData.pan_number = this.editItem.pan_number ?? ''
    
    // this.formData.state_code = stateID[0].fips_code
   
   
  },
  computed: {
    assignLogo(){
      this.fileData = []
    this.fileData.push({name: this.editItem.logo.split('branch-logos/')[1]})
return;
    },
    allStates() {
      let data = this.$store.state.branches.states;
      let allStates = []
      data.forEach(y => {
        allStates.push(y.name)
      })
      return allStates;
    },
    allBusinessTypes() {
      let data = this.$store.state.branches.businessTypes;
      let allBusinessTypes = []
      data.forEach(y => {
        allBusinessTypes.push(y.bussiness_type)
      })
      return allBusinessTypes;
    },
    allBankDetails() {
      let data = this.$store.state.proposals.allBank;
      let allBankDetails = []
      data.forEach(y => {
        allBankDetails.push(y.account_name)
      })
      return allBankDetails;
    },
    allBranches() {
      let data = this.$store.state.branches.all;
      let allBranches = []
      data.forEach(y => {
        allBranches.push(y)
      })
      return allBranches;
    }
  },
  setup(props){
    // const blankFormData = {
   
    // };

    // const formData = ref(JSON.parse(JSON.stringify(blankFormData)));
    // const resetFormData = () => {
    //   formData.value = JSON.parse(JSON.stringify(blankFormData));
    // };

    // const errors = computed(() => {
    //   return JSON.parse(JSON.stringify(store.state.branches.errors));
    // });

    const { refFormObserver, getValidationState } =
      formValidation();
    
    return {
      // formData,
      // onSubmit,

      refFormObserver,
      getValidationState,
      // resetForm,
    }
  },

}
</script>
<style>
.modal-lg{
  margin-top: 6.5rem;
}
.modal-title{
    text-transform: uppercase;
}
.border-l {
  border: 1px solid rgb(212, 212, 212);
}
</style>
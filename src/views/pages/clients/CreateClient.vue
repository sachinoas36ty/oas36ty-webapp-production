<template>


    <b-modal no-close-on-backdrop id="modal-clients" ref="modal-clients" size="lg" class="b-overlay position-relative" title="Add client" hide-footer>
      <!-- <b-card-body> -->
      <validation-observer #default="{ handleSubmit }" ref="refFormObserver">

        <b-form @submit.prevent="handleSubmit(onSubmit)">

          <b-row>
            <b-col md="6">
              <validation-provider #default="validationContext" name="name" vid="name" rules="required" class="my-custom-select">
                <b-form-group label="Client *" label-for="contact">
                  <b-form-input  id="name" v-model="formData.name" placeholder="Client Name">

                  </b-form-input>
                  <b-form-invalid-feedback class="d-block">
                    {{ validationContext.errors[0] }}
                    <span v-if="$store.state.clients.errors.name">
                      {{ $store.state.clients.errors.name[0] }}
                    </span>
                  </b-form-invalid-feedback>
                </b-form-group>
              </validation-provider>
            </b-col>
            <b-col md="6">
              <validation-provider #default="validationContext" name="location" vid="location" rules="required">
                <b-form-group label="Location *" label-for="location" class="my-custom-select">
                  <b-form-input id="location" placeholder="Location"
                    v-model="formData.location">

                  </b-form-input>
                  <b-form-invalid-feedback class="d-block">
                    {{ validationContext.errors[0] }}
                  </b-form-invalid-feedback>
                </b-form-group>
              </validation-provider>
            </b-col>
          </b-row>
          <div v-if="showMore === true">
            <b-row>
              <b-col md="12">
                <b-form-group label="Client Address" label-for="address" class="my-custom-select">
                  <b-form-input id="address" placeholder="Address" v-model="formData.address">

                  </b-form-input>
                </b-form-group>
              </b-col>
            </b-row>
            <div class="d-flex justify-content-between mt-1" style="text-transform: uppercase;">
              More Details
            </div>
            <hr style="border-color:#F75949">
            <b-row>
              <b-col md="6">
                <b-form-group label="GST Number" label-for="gst" class="my-custom-select">
                  <b-form-input id="gst" v-model="formData.gst_number" @input="pan" placeholder="GST Number">

                  </b-form-input>
                </b-form-group>
              </b-col>
              <b-col md="6">
                <b-form-group label="State" label-for="state" class="my-custom-select">
                  <v-select @input="stateCode" v-model="selectedState" placeholder="Search States"
                    class="select-size-md" label="name" :options="allStates">

                  </v-select>
                </b-form-group>
              </b-col>
            </b-row>
            <b-row>
              <b-col md="6">
                <b-form-group label="PAN" label-for="pan" class="my-custom-select">
                  <b-form-input id="pan" v-model="formData.pan" placeholder="PAN">

                  </b-form-input>
                </b-form-group>
              </b-col>
              <b-col md="6">
                <b-form-group label="TAN" label-for="tan" class="my-custom-select">
                  <b-form-input id="tan" v-model="formData.tan" placeholder="TAN">

                  </b-form-input>
                </b-form-group>
              </b-col>
            </b-row>
            <b-row>
              <b-col md="6">
                <b-form-group label="Client Type" label-for="client_type" class="my-custom-select">
                  <v-select placeholder="Search Client Types" class="select-size-md" label="name"
                    :options="allClientTypes" v-model="selectedClientType" >

                  </v-select>
                </b-form-group>
              </b-col>
              <b-col md="6">
                <b-form-group label="Annual Turnover" label-for="turnover" class="my-custom-select">
                  <b-form-input type="number" id="turnover" v-model="formData.annual_turn_over" placeholder="Annual Turnover">

                  </b-form-input>
                </b-form-group>
              </b-col>
            </b-row>
            <b-row>
              <b-col md="6">
                <b-form-group label="Opening Balance" label-for="opening_balance" class="my-custom-select">
                  <b-form-input type="number" id="opening_balance" v-model="formData.opening_balance" placeholder="Opening Balance">

                  </b-form-input>
                </b-form-group>
              </b-col>
              <b-col md="6">
                <b-form-group label="Opening Balance Date" label-for="opening_balance_date">

                  <VueDatePicker format="DD-MM-YYYY" style="border:1px solid #d8d6de;border-radius: 0.357rem;" :minDate="currentDate" id="proposalDate" v-model="formData.opening_bal_date" />

                </b-form-group>
              </b-col>
            </b-row>
            <div class="d-flex justify-content-between mt-1" style="text-transform: uppercase;">
              Passwords
            </div>
            <hr style="border-color:#F75949">
            <b-row v-for="(pass, index) in passFields" :key="index">
              <b-col md="3">
                <b-form-group label="Compliance" label-for="compliance" class="my-custom-select">
                  <v-select placeholder="Search Compliance" class="select-size-md" label="name"
                    v-model="pass.compliance">

                  </v-select>
                </b-form-group>
              </b-col>
              <b-col md="3">
                <b-form-group label="Username" label-for="username" class="my-custom-select">
                  <b-form-input id="username" v-model="pass.username" placeholder="Username">

                  </b-form-input>
                </b-form-group>
              </b-col>
              <b-col md="3">
                <b-form-group label="Password" label-for="password" class="my-custom-select">
                  <b-form-input id="password" v-model="pass.password" placeholder="Password">

                  </b-form-input>
                </b-form-group>
              </b-col>
              <b-col md="3">
                <b-form-group label="Remarks" label-for="remarks" class="my-custom-select">
                  <b-form-input id="remarks" v-model="pass.remarks" placeholder="Remarks">

                  </b-form-input>
                </b-form-group>
                <div class="text-right">

                   <b-button size="sm" v-show="passFields.length > 1"   @click="removePass(index)"
                    variant="outline-primary">
                    Remove
                  </b-button>
                   <b-button size="sm" v-show="index === passFields.length - 1" class="ml-1"   @click="addPass()"
                    variant="primary">
                    Add more
                  </b-button>
                </div>
              </b-col>
            </b-row>
            <b-dropdown id="file_drop" class="" size="sm" variant="primary">
              <template #button-content>
                <span class="text-capitalize">

                  Attachment
                </span>
              </template>
              <div class="mx-1 border-l">

                <!-- <b-form @submit.prevent="handleSubmit(UpdateProfile)"> -->

                <div class="d-flex flex-column">
                  <div class="d-flex justify-content-between align-items-center p-1 border-bottom-light bg-light">
                    <div>Attachment</div>
                    <div>
                      <input type="file" ref="file" style="display: none" @change="onFileChange" />
                       <b-button size="sm" variant="primary" @click="$refs.file.click()">Choose File</b-button>
                    </div>
                  </div>
                  <!-- </b-form> -->
                </div>
                <div class="d-flex justify-content-center align-items-center p-1">
                  <div v-if="file_name2">
                    <div v-for="(file, index) in fileLinks" :key="index"
                                class="d-flex justify-content-between">


                                  {{ file.fileName }}
                                  
                                  <feather-icon icon="XIcon"
                                  class="cursor-pointer" @click="removes3(file.url, index)" />
                                 
                            
                           
                          </div>
                  </div>
                  <div v-else>No file(s) selected</div>
                </div>
              </div>

              <!-- <b-dropdown-item>

        </b-dropdown-item> -->
            </b-dropdown>
          </div>

          <div class="text-right ">
             <b-button size="sm" v-if="showMore === false" variant="primary" @click="moreDetails()">
              More Details
            </b-button>
             <b-button size="sm" v-else-if="showMore === true" variant="primary" @click="lessDetails()">
              Less Details
            </b-button>&emsp;
             <b-button size="sm" variant="primary" @click="closeModal()">
              Cancel
            </b-button>&emsp;
             <b-button size="sm" :disabled="$store.state.clients.isSidebarLoading" variant="primary" type="submit">
              Save
              <b-spinner small class="ml-1" v-if="$store.state.clients.isSidebarLoading" />
            </b-button>
          </div>
        </b-form>
      </validation-observer>
      <!-- </b-card-body> -->
      <div v-if="$store.state.clients.isSidebarLoading" class="b-overlay position-absolute"
            style="inset: 0px;z-index: 10;/* display: none; */">
            <div class="position-absolute bg-white rounded-sm"
              style="inset: 0px; opacity: 0.75; backdrop-filter: blur(0px);"></div>
            <div class="position-absolute d-flex align-items-center flex-column" style="top: 50%; left: 50%; transform: translateX(-50%) translateY(-50%);">
              <span aria-hidden="true" class="spinner-border text-primary"> <!----></span>
              <br><span>Adding New Client..</span>
            </div>
          </div>
    </b-modal>
 
</template>
<script>
import { VueDatePicker } from '@mathieustan/vue-datepicker';

import { ValidationProvider, ValidationObserver } from 'vee-validate'
import vSelect from 'vue-select'
import {
  BModal,
  BFormInvalidFeedback,
  // BSpinner,
  BForm, VBModal, BFormInput, BFormGroup, BCard, BFormDatepicker, BContainer, BRow, BCol, BPagination, BTable, BButton, BDropdown, BDropdownItem, BSpinner
} from 'bootstrap-vue';
import store from '@/store';
import formValidation from '@/@core/comp-functions/forms/form-validation';
import { ref, computed } from "@vue/composition-api";
import { required, email } from "@validations";
import { isUserLoggedIn } from '@/auth/utils';

export default {
  components: {
    VueDatePicker,

    BForm, BFormGroup, BButton, BModal, BFormInvalidFeedback,
    BFormInput, BRow, BCol, ValidationObserver, ValidationProvider,
    BSpinner, vSelect, BDropdown, BFormDatepicker
  },
  data() {
    return {
      currentDate: new Date().toISOString().substr(0, 10),
      name: '',
      required,
      showMore: false,
      selectedState: '',
      selectedClientType: '',
      file_name: '',
      file_name2:null,

      passFields: [{
        compliance: "",
        username: "",
        password: "",
        remarks: ""
      }]
    }
  },
  directives: {
    'b-modal': VBModal,
  },
  computed: {
    fileLinks() {
      let data = this.$store.state.attachments.links;
      return data
    },
    allStates() {
      let data = this.$store.state.branches.states;
      let allStates = []
      data.forEach(y => {
        allStates.push(y.name)
      })
      return allStates;
    },
    allClientTypes() {
      let data = this.$store.state.branches.businessTypes;
      let allClientTypes = []
      data.forEach(y => {
        allClientTypes.push(y.bussiness_type)
      })
      return allClientTypes;
    },
  },
  mounted() {
    let loggedIn = isUserLoggedIn();
    if(loggedIn){

      if(this.$store.state.branches.states.length === 0){
        
        // this.$store.dispatch("branches/states")
      }
      if(this.$store.state.branches.businessTypes.length === 0)
      {
        
        // this.$store.dispatch("branches/business")
      }
    }
  },
  methods: {
    async onFileChange(e) {
      // alert('hh');
      console.log("hllo1 : onfileChange2")


      let image = e.target.files;
      let image_name = []
      const filePathsPromises = [];
    image.forEach(file => {
      filePathsPromises.push(this.base64(file));
      image_name.push(file.name)
      // filePathsPromises.push(file.name)
    });
    const filePaths = await Promise.all(filePathsPromises,image_name);
    const mappedFiles = filePaths.map((base64File,image_name) => ({
       file: base64File,
       name:image[image_name].name,
      // type:'subTaskType',
       }));
       if(this.file_name2){
        let index = this.fileLinks.findIndex((e)=>e.fileName === this.file_name2.name);
        this.fileLinks.splice(index,1);
       }
    this.file_name2 = mappedFiles[0]
    
      //  this.file_name2 = this.file_name2.concat(this.file_name3);

    // tempFile.forEach((obj2)=>{
    //   const exists = this.file_name.some(obj1=>obj1.name === obj2.name);
    //   if(!exists){
    //     console.log("not duplicate")
    //     this.file_name.push(obj2);
    //   }
    // })
    // var c = []
    // image_name.forEach(element => {
    //   mappedFiles.forEach(x => {
    //     c.push({
    //       file: x.file,
    //       name: element
    //     })
    //   });
    // });
    console.log(mappedFiles);
    this.uploadFileS3(mappedFiles)
    e.target.value = ''

//       console.log("e:", image);
// let data = [];
//       image.forEach(x => {
//        data.push({
//         file:this.base64(x),
//         name:x.name
//        })
       
//       })
      // console.log(data);
      // console.log('hell33')
      // var file44 = this.file_name2;

      // console.log(file44['length'].length);
      // console.log(this.file_name2);

      // this.uploadFileS3(data)

      // var data;
      // for(var i=0; i<image.length; i++){
      //   console.log(image[i].name)
      //   const reader = new FileReader();
      //   // console.log("reader:", reader)
      //   reader.onload = (e) => {
      //      data = {
      //       file: e.target.result,
      //       name: image[i].name
      //     }
      //   }
      //   console.log('robin1'+data)
      //  var result4= reader.readAsDataURL(image[i])
      //  console.log("aflskdfjasldkfjaskdfjalskfjaslkdfjaslkdfjalskdfj")
      //  console.log(result4)

      // // console.log("inside onload after the loop:", this.file_name2)

      // }
      //--------------------------------------------------------------------------------------
      //  // try to tackle problem of file too large
      
      //  const filteredFiles = this.file_name2.filter((file) => {
      //   return this.$store.state.tasks.s3_url.some((s3File) => s3File.fileName === file.name);
      // });
      // this.file_name2= filteredFiles;

    },
    base64(file) {
      return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
      // let data = null
      //  const reader = new FileReader();

      //   console.log("reader:", reader)
      //   reader.onload = (e) => {
      //     //  data = {
      //     //   file: e.target.result,
      //     //   name: x.name
      //     // }
      //     data = e.target.result

          
          
      //   }
      //   reader.readAsDataURL(file)
      //   // this.file_name2.push(data)
      //   return data;
        
    },
    removes3(file, i) {
      console.log('bbbb')
      var data = {
        attach_url: file ?? "null",
      };
      this.$store.dispatch('attachments/remove', { data: data }).then(() => {

        this.$store.state.attachments.links.splice(i, 1)
        this.file_name2 = null;
        // this.linkWithUrl.splice(i,1);


      })
      // try to fix the testcase where if we upload file greater than 800kb and then if we add more files the file will store in this.file_name2 but not in s3_url

      // updating the this.file_name2 with s3_url
      // const filteredFiles = this.file_name2.filter((file) => {

      // return this.$store.state.attachments.links.some((s3File) => {
      //   console.log(s3File.fileName, file.name, "consoling the statement")
      //   return  s3File.fileName === file.name
      // });
// });
// this.file_name2= filteredFiles;
    },
    uploadFileS3(file) {
      let data = {
        attach: file ? file : "null",
      };
      // if(file){

      //   this.data2.attach = file
      // }
      this.$store.dispatch('attachments/add', { data: data }).then(() => {

        //  this.linkWithUrl = this.$store.state.attachments.links;
        // resolve();
        // console.log("file.type: ", this.data2);
        console.log("file.type:",file)

        // this.linkWithUrl = this.linkWithUrl.filter(item1 => file.filter(item2=> item1.fileName === item2.name).map(item2=>{
        //   console.log("checing", item1.fileName, item2.name)
        //   return {type:item2.type}}))
        // console.log(file[0].name);
        // console.log(this.linkWithUrl);

        // this.linkWithUrl.forEach(i)
        // let result = [];
        // this.linkWithUrl.forEach((obj1)=> {
        //   const obj2 = file.find((obj)=> obj.name === obj1.fileName);

        //   if(obj2){
        //     const newObj = { ...obj1, type:obj2.type};
        //     result.push(newObj);
        //   }
        // })
        // this.linkWithUrl = result;
        // console.log(this.linkWithUrl);

      }).catch(() => {


      })
    },
    removePass(index) {
      this.passFields.splice(index, 1)
    },
    addPass() {
      this.passFields.push({
        compliance: "",
        username: "",
        password: "",
        remarks: ""
      })
    },
    pan() {
      if (this.formData.gst_number.length === 15) {
        if (isNaN(this.formData.gst_number.slice(0, 2) + this.formData.gst_number.slice(7, 10) + this.formData.gst_number.slice(14, 15)) === false && isNaN(this.formData.gst_number.slice(2, 7) + this.formData.gst_number.slice(11, 12) + this.formData.gst_number.slice(13, 14)) && (9 > +this.formData.gst_number.slice(12, 13) > 0 || isNaN(this.formData.gst_number.slice(12, 13)))) {
          this.formData.pan = this.formData.gst_number.slice(2, 12);
          let states = this.$store.state.branches.states;
          let stateFilter = states.filter((x) => {
            return x.fips_code === this.formData.gst_number.slice(0, 2)
          });
          console.log(stateFilter, 'sssss')
          this.selectedState = stateFilter[0].name;
          this.gsterr = false;
        }
      }
      else {
        this.formData.pan = ''
        this.formData.state = ''
      }
    },
    stateCode() {
      let stateCode = this.$store.state.branches.states.filter((x) => {
        return x.name === this.selectedState;
      })
      this.formData.state_code = stateCode[0].fips_code;
    },
    businessTypeID() {
      let clientTypeID = this.$store.state.branches.businessTypes.filter((x) => {
        return x.bussiness_type === this.selectedClientType
      })
      this.formData.client_types = clientTypeID[0].id;
    },
    moreDetails() {
      this.showMore = true;
    },
    lessDetails() {
      this.showMore = false;
    },
    resetForm() {
      this.$store.state.clients.errors = {}
      this.formData.name = '';
      this.formData.location = '';
      this.formData.address = '';
      this.formData.gst_number = '';
      this.formData.state_code = '';
      this.selectedState = '';
      this.formData.pan = '';
      this.formData.tan = '';
      this.formData.client_types = '';
      this.selectedClientType = '';
      this.formData.annual_turn_over = '';
      this.formData.opening_balance = '';
      this.formData.opening_bal_date = '';
      this.formData.password = [];
      this.passFields = [{
        compliance: "",
        username: "",
        password: "",
        remarks: ""
      }];
      this.showMore = false;
      // this.formData.due_date = 2;
      // this.formData.users = [];

    },
    closeModal() {
      this.resetForm()
      this.$refs['modal-clients'].hide()
      this.file_name2 =null;
      // this.file_name3 = null;
      this.$store.state.attachments.links = [];
    },
    onSubmit() {

      // console.log(formData);
      this.$store
        .dispatch("clients/store", this.formData)
        .then(() => {
          // this.$emit("refetch-data");
          // ref('modal-branches').hide();
          // emit("update:is-create-sidebar-active", false);
          this.$refs['modal-clients'].hide()
          this.$toast.success("Client Created Successfully!", {
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
          // this.$store.dispatch('clients/fetch')
          this.resetForm()
        })
        .catch(() => {
          // refFormObserver.value.setErrors(errors.value);
        });

    }
  },
  setup() {
    const blankFormData = {
      name: "",
      location: "",
      address: "",
      gst_number: "",
      state_code: null,
      pan: "",
      tan: "",
      client_types: null,
      annual_turn_over: null,
      opening_balance: null,
      opening_bal_date: new Date().toISOString().slice(0, 10),
      password: []

    };

    const formData = ref(JSON.parse(JSON.stringify(blankFormData)));
    const resetFormData = () => {
      formData.value = JSON.parse(JSON.stringify(blankFormData));
    };

    const errors = computed(() => {
      return JSON.parse(JSON.stringify(store.state.clients.errors));
    });

    const { refFormObserver, getValidationState } =
      formValidation();
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
      // resetForm,
    }
  }
}
</script>
<style>
.modal-lg {
  margin-top: 6.5rem;
}
.my-custom-select ::placeholder {
  font-size: 1rem;
/* color: rgba(128, 128, 128, 0.442) !important; */
color: rgb(85, 81, 81)!important;

}
.modal-title {
  text-transform: uppercase;
}
</style>
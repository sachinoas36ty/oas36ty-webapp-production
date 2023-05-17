<template>
  <b-modal hide-footer ref="compose-modal" id="compose-mail" :visible="shallShowEmailComposeModal" title="Compose Email"
    modal-class="modal-sticky" footer-class="d-flex justify-content-between" body-class="p-0" size="lg" no-fade @hidden="onModalHidden"
    hide-backdrop static @change="(val) => $emit('update:shall-show-email-compose-modal', val)"
    
    >

    <template #modal-footer>
      <div>

        <!-- Dropdown: More Actions -->
        <b-dropdown variant="link" no-caret toggle-class="p-0" right>
          <template #button-content>
            <feather-icon icon="MoreVerticalIcon" size="17" class="text-body" />
          </template>

          <b-dropdown-item>
            Add Label
          </b-dropdown-item>

          <b-dropdown-item>
            Plain Text Mode
          </b-dropdown-item>

          <b-dropdown-divider />

          <b-dropdown-item>
            Print
          </b-dropdown-item>
          <b-dropdown-item>
            Check Spelling
          </b-dropdown-item>
        </b-dropdown>

        <!-- Discard Compose -->
        <feather-icon icon="TrashIcon" size="17" class="ml-75 cursor-pointer" @click="discardEmail" />
      </div>
    </template>
    <!-- Modal Header -->

    <template #modal-header>
      <h5 class="modal-title">
        Compose Mail
      </h5>
      <div class="modal-actions">
        <feather-icon icon="MinusIcon" class="cursor-pointer"
          @click="$emit('update:shall-show-email-compose-modal', false)" />
        <feather-icon icon="Maximize2Icon" class="ml-1 cursor-pointer" />
        <feather-icon icon="XIcon" class="ml-1 cursor-pointer" @click="discardEmail" />
      </div>
    </template>

    <!-- Modal Footer -->


    <!-- Modal: Body -->
    {{ assignfrom() }}
    <validation-observer #default="{ handleSubmit }" ref="refFormObserver">

      <b-form @submit.prevent="handleSubmit(sendEmail(composeData, file_name2))">
        <!-- {{file}} -->
        <ValidationProvider #default="validationContext" name="from" vid="from" rules="required">

          <div class="compose-mail-form-field">
            <label for="email-from" class="form-label">From: </label>
            <v-select @input="checkValid" v-model="composeData.from" :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'" label="email"
              class="flex-grow-1 email-form-selector" :options="outBoundEmails" input-id="email-from">
              <!-- <template #option="{ email }">
           
            <span class="ml-50"> {{ email }}</span>
          </template> -->
          <template v-if="!showIntegration" #list-header class="add_email">
                <div class=" ml-2 mb-1 mt-1" @click="integrationPage()" >
                  <!--  <b-button size="sm" variant="primary"   v-b-modal.modal-contact>

                <feather-icon size="14" style="margin-right: 0.5rem;"  icon="SearchIcon" /> Add Contacts</b-button> -->
                Please Integrate your Email!
                  <a href="#"   style="color: #0000EE;">
                   <!-- <feather-icon size="14" style="margin-right: 0.5rem;" icon="ArrowRightCircleIcon" />  -->
                   <u>

                     click here
                    </u>
                    </a> 
                </div>
              </template>

            </v-select>
            <!-- <span
          class="cursor-pointer"
          @click="showCcField=!showCcField"
        >Cc</span>
        <span
          class="ml-1 cursor-pointer"
          @click="showBccField=!showBccField"
        >Bcc</span> -->
          </div>
          <b-form-invalid-feedback class="ml-2 d-block">
            <!-- {{ validationContext.errors[0] }} -->
            {{ errors.from }}
          </b-form-invalid-feedback>
        </ValidationProvider>
        <!-- Field: To -->
        <ValidationProvider #default="validationContext" name="to" vid="to" rules="required">

          <div class="compose-mail-form-field">
            <label>To: </label>
            <v-select @input="checkValid" id="to" v-model="composeData.to" taggable push-tags multiple :filterable="false"
              class="flex-grow-1 email-to-selector" @search="onSearch" :options="paginated_contactPerson">

              <template #list-header class="add_contacts">
                <div class=" ml-2 mb-1 mt-1" v-b-modal.modal-contact>
                  <!--  <b-button size="sm" variant="primary"   v-b-modal.modal-contact>

                <feather-icon size="14" style="margin-right: 0.5rem;"  icon="SearchIcon" /> Add Contacts</b-button> -->
                  <a href="#">
                    <feather-icon size="14" style="margin-right: 0.5rem;" icon="PlusIcon" /> New Contact</a>
                </div>
              </template>
              <!-- <li slot="list-footer" class="pagination">
       <b-button size="sm" :disabled="!contactPerson_hasPrevPage" @click="offset -= limit">Prev</b-button>
       <b-button size="sm" :disabled="!contactPerson_hasNextPage" @click="offset += limit">Next</b-button>
    </li> -->
              <!-- <template #option="{ name }">
            
            <span class="ml-50"> {{ name }}</span>
          </template>

          <template #selected-option="{  name }">
           
            <span class="ml-50"> {{ name }}</span>
          </template> -->
            </v-select>
            <div>
              <!--  <b-button size="sm" v-ripple.400="'rgba(113, 102, 240, 0.15)'" v-b-modal.modal-xl   class="cursor-pointer">
            Add Contacts
          </b-button>&emsp; -->

              <span class="cursor-pointer" @click="showCcField = !showCcField">Cc</span>
              <span class="ml-1 cursor-pointer" @click="showBccField = !showBccField">Bcc</span>
            </div>
          </div>
          <b-form-invalid-feedback class="ml-2 d-block">
            {{ errors.to }}
          </b-form-invalid-feedback>
        </ValidationProvider>
        
        <!-- Field: Cc (Hidden Initially) -->
        <div v-show="showCcField" class="compose-mail-form-field">
          <label for="email-cc">CC: </label>
          <v-select v-model="composeData.cc" taggable push-tags multiple :filterable="false"
            class="flex-grow-1 email-to-selector" @search="onSearch" :options="paginated_contactPerson">
            <!-- <li slot="list-footer" class="pagination">
       <b-button size="sm" :disabled="!contactPerson_hasPrevPage" @click="offset -= limit">Prev</b-button>
       <b-button size="sm" :disabled="!contactPerson_hasNextPage" @click="offset += limit">Next</b-button>
    </li> -->
            <template #list-header>
              <div class="add_contacts ml-2 mb-1 mt-1" v-b-modal.modal-contact>
                <a href="#">
                  <feather-icon size="14" style="margin-right: 0.5rem;" icon="PlusIcon" /> New Contact</a>
              </div>
            </template>
          </v-select>
        </div>

        <!-- Field: Bcc (Hidden Initially) -->
        <div v-show="showBccField" class="compose-mail-form-field">
          <label for="email-bcc">Bcc </label>
          <v-select v-model="composeData.bcc" taggable push-tags multiple :filterable="false"
            class="flex-grow-1 email-to-selector" @search="onSearch" :options="paginated_contactPerson">
            <!-- <li slot="list-footer" class="pagination">
       <b-button size="sm" :disabled="!contactPerson_hasPrevPage" @click="offset -= limit">Prev</b-button>
       <b-button size="sm" :disabled="!contactPerson_hasNextPage" @click="offset += limit">Next</b-button>
    </li> -->
            <template #list-header>
              <div class="add_contacts ml-2 mb-1 mt-1" v-b-modal.modal-contact>
                <a href="#">
                  <feather-icon size="14" style="margin-right: 0.5rem;" icon="PlusIcon" /> New Contact</a>
              </div>
            </template>
          </v-select>
        </div>

        <!-- Field: Subject -->
        <ValidationProvider #default="validationContext" name="subject" vid="email-subject" rules="required">

          <div class="compose-mail-form-field">
            <label for="email-subject">Subject: </label>
            <b-form-input @input="checkValid" id="email-subject" v-model="composeData.subject" />
          </div>
          <b-form-invalid-feedback class="ml-2 d-block">
            {{ errors.subject }}
          </b-form-invalid-feedback>
        </ValidationProvider>
        <!-- Field: Message - Quill Editor -->
        <div class="message-editor">
          <quill-editor id="quil-content" v-model="composeData.message" :options="editorOption" />
          <!-- <b-form-textarea>

       </b-form-textarea> -->

          <!-- <b class="ml-1 d-flex justify-content-between" v-if="(file_name2.length>0)" v-for="(i,index) in file_name2  "> -->
          <b class="ml-1 d-flex justify-content-between"
            v-if="(file_name2.length > 0 && !$store.state.emails.isLoadingUrl)"
            v-for="(name, index) in $store.state.tasks.s3_url">

            <!-- {{ i.name }} -->
            {{ name.fileName }}

            <br>

            <!--  <b-button size="sm"   class="mr-1 mb-1" variant="outline-primary"> -->
            <span v-b-tooltip.hover.top="'Remove Attachment'">

              <feather-icon class="mr-1 cursor-pointer" @click="removeFileS3(name.url, index)"
                v-if="(file_name2.length > 0 && !$store.state.emails.isLoadingUrl)" icon="XIcon" />

              <!-- <feather-icon  class="mr-1 cursor-pointer" @click="removeFile_name2(i.name)" icon="XIcon" /> -->
              <!-- </b-button> -->
            </span>
          </b>
          <div class="text-center">

            <b-spinner small v-if="$store.state.tasks.isLoadingUrl" />
          </div>


        </div>
        <div id="reply_actions" class="d-flex mb-1 ml-1">
          <b-button size="sm" variant="primary" type="submit">
            <span>Send</span>
            <!-- <b-spinner small class="ml-1" v-if="isLoading" /> -->

          </b-button>
          <div id="quill-toolbar1" class=" border-bottom-0">
            <!-- Add a bold button -->

            <b-form-file id="fileUpload2" plain v-model="composeData.file2" class="d-none" multiple
              @change="onFileChange2" />
            <!-- </div> -->
            <!-- {{composeData.file2}} -->&emsp;

            <button class="ql-bold" />
            <button class="ql-italic" />
            <button class="ql-underline" />
            <button class="ql-align" />
            <button class="ql-link" />
            <!--  @click="file_upload"-->
            <feather-icon @click="file_upload" ref="fileName" icon="PaperclipIcon" size="20" class=" cursor-pointer" />
            <!--  <a  @click="uploadFileS3(file_name2)">
            Upload
          </a>-->
            <feather-icon icon="TrashIcon" size="17" class="ml-75 cursor-pointer" @click="discardEmail" />


          </div>
        </div>
      </b-form>
    </validation-observer>

  </b-modal>
</template>

<script>
var cd = []
// function css(){

// }


// css();
// console.log(this);
import {
  VBTooltip, BFormInvalidFeedback, VBToggle, BDropdown, BModal, VBModal, BMediaAside, BImg, BRow, BCol, BDropdownItem, BSpinner, BBadge, BForm, BFormFile, BButton, BFormInput, BFormTextarea, BFormTag, BAvatar, BDropdownDivider, BFormTags, BDropdownItemButton, BIcon, BDropdownForm, BFormGroup,
} from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'
import { computed, ref } from '@vue/composition-api'
import { quillEditor } from 'vue-quill-editor'
import vSelect from 'vue-select'
import store from '@/store'
import TagsInput from '@voerro/vue-tagsinput';
import VueTagsInput from '@johmun/vue-tags-input';
// import VueTagsInput from './vue-tags-input-package/vue-tags-input/tags'
// import Tagify from 'tagify-vue'
// import 'vue-select/dist/vue-select.css';

import ToastificationContentVue from '@/@core/components/toastification/ToastificationContent.vue'
import "vue-toastification/dist/index.css";
import router from '@/router'
import formValidation from '@/@core/comp-functions/forms/form-validation'
import { ValidationObserver, ValidationProvider } from 'vee-validate'
// import { $themeBreakpoints } from 'themeConfig'

export default {
  directives: {
    Ripple,
    'b-modal': VBModal
  },

  components: {
    BDropdownItemButton,
    BButton, BFormInvalidFeedback,
    BModal,
    BRow,
    BCol,
    BDropdownForm,
    BMediaAside,
    BImg,
    BFormGroup,
    BFormFile,
    BBadge,
    BFormTag,
    BFormTags,
    VBTooltip,
    BIcon,
    BFormTextarea,
    BSpinner,
    // Tagify,
    // BSV
    BDropdown,
    TagsInput,
    VueTagsInput,
    BDropdownItem,
    BForm,
    BFormInput,
    BAvatar,
    BDropdownDivider,
    // 3rd Party
    quillEditor,
    vSelect,
    ValidationObserver,
    ValidationProvider
  },
  directives: {
    'b-tooltip': VBTooltip,
    'b-toggle': VBToggle,
  },
  model: {
    prop: 'shallShowEmailComposeModal',
    event: 'update:shall-show-email-compose-modal',
  },
  props: {
    shallShowEmailComposeModal: {
      type: Boolean,
      required: true,
    },
    emailViewData: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      // readyToUpload:[],
      errors:{
        from:"",
        to:"",
        subject:""
      },
      showIntegration:false,
      filter: [
        { text: 'No Results' }
      ],
      toggle: false,
      task: { name: 'hello' },
      tag_email: [],
      editMode: false,
      offset: 0,
      limit: 8,
      search: '',
      file: [],
      file_name2: [],

      addEmail: false,
      addNumber: false,
      email_field: [
      ],
      phone_field: [
      ],
      nextTodoId: 2,
      nextTodoId2: 2,
      default_email: [],
      additional_email: [],
      default_phone: [],
      additional_phone: [],
      contact_name: '',
      // name_to_display: [],
      // autocompleteItems:[]
    }
  },
  computed: {

    isLoading() {
      return this.$store.state.emails.in_bound_loading;
    },
    contactIsLoading() {
      return this.$store.state.contactPeople.sidebarLoading;
    },
    successMessage() {
      return this.$store.state.emails.successMessage;
    },
    contactsErrorMessage() {
      return this.$store.state.contactPeople.errorMessage;
    },
    contactPerson() {

      // return this.$store.state.contactPeople.allForLeads
      var data = [];
      // var index2 = [];
      // for (let index = 0; index < this.$store.state.contactPeople.all.length; index++) {
      // index2[index] = [index];
      for (let i = 0; i < this.$store.state.contactPeople.emails.length; i++) {

        data[i] = this.$store.state.contactPeople.emails[i];
      }
      // }
      // return index2;


      return data;
      return data.filter((country) => country.includes(this.search))
    },

    items() {

      var obj = [];
      for (let index = 0; index < this.emailToOptions.length; index++) {
        // const element = array[index];
        console.log(this.emailToOptions);
        // for (let i = 0; i < this.emailToOptions[index].email.length; i++) {

        // this.autocompleteItems.push( `${this.emailToOptions[index].email}` )
        obj[index] = {
          // email: this.emailToOptions[index].email[i].email,
          //  value: this.emailToOptions[index].email[i].id,
          // value:,
          name: this.emailToOptions[index].data.name,
          avatar: null
        };
        // }
      }
      return obj;
      // if(this.emailToOptions.length > 0){

      //   for (let index = 0; index < this.emailToOptions.length; index++) {
      //     // const element = array[index];
      //     console.log(this.emailToOptions);
      //     this.autocompleteItems.push( `${this.emailToOptions[index].email}` )
      //   }
      // }

    },
    paginated_contactPerson() {
      return this.contactPerson.slice(this.offset, this.limit + this.offset)
    },
    contactPerson_hasNextPage() {
      const nextOffset = this.offset + this.limit
      return Boolean(
        this.contactPerson.slice(nextOffset, this.limit + nextOffset).length
      )
    },
    contactPerson_hasPrevPage() {
      const prevOffset = this.offset - this.limit
      return Boolean(
        this.contactPerson.slice(prevOffset, this.limit + prevOffset).length
      )
    },

    // outBoundEmails(){
    //   // return this.$store.state.emails.all_outbound_emails;
    //   return [
    //    { avatar: require('@/assets/images/avatars/1-small.png'), name: 'Dev Sindhwani' , email: 'devoas36ty@gmail.com' },
    //   { avatar: require('@/assets/images/avatars/3-small.png'), name: 'Robin' , email: 'robin@yopmail.com' },
    //   ]

    // },
    // emailToOptions(){
    //   // return this.$store.state.users.all;
    //   return [
    //    { avatar: require('@/assets/images/avatars/1-small.png'), name: 'Dev Sindhwani' , email: 'devoas36ty@gmail.com' },
    //   { avatar: require('@/assets/images/avatars/3-small.png'), name: 'Robin' , email: 'robin@yopmail.com' },
    //   ]
    // }
  },

  created() {
    // if(this.$route.params.folder === 'draft'){
    //   this.composeData.subject = this.emailViewData.parent.subject

    //   this.composeData.message = this.emailViewData.parent.message
    // }else{

      if (this.$store.state.users.signAll.length > 0) {
        this.composeData.message = this.$store.state.users.signAll.signature
      }else{
        this.composeData.message = this.$store.state.users.signAll.signature
        
      // }
    }
    
    // let index = -1;
    // if(this.$store.state.emails.all_outbound_emails.length > 0){
    //   index = this.$store.state.emails.all_outbound_emails.length - 1;
    // }else{
    //   index = this.$store.state.emails.all_outbound_emails.length
    // }
    // if(index !== -1){

    //   this.composeData.from = {
    //     email:this.$store.state.emails.all_outbound_emails[index].email,
    //     id:this.$store.state.emails.all_outbound_emails[index].id,

    //   }
    // }
    // this.$store.dispatch('contactPeople/fetchForLeads')
  },


  methods: {
    onModalHidden(){
      // this.composeData.to=null
      // this.$store.state.tasks.s3_url = [];
      // this.file_name2 = [];
    },
    checkValid(){
      if(this.composeData.from != null){
        this.errors.from = ""
      }
      if(this.composeData.to){
        if(this.composeData.to.length > 0){
          this.errors.to = ""
        }
      }
      if(this.composeData.subject != ""){
        this.errors.subject = ""
      }
    },
    integrationPage(){

this.$router.push({name:'settings',
params:{
  integration: 'true'
}
})
},
    assignfrom() {
      if (this.outBoundEmails.length > 0) {

        this.composeData.from = {
          email: this.outBoundEmails[0].email,
          id: this.outBoundEmails[0].id
        }
      }

    },
    isNumber(ev) {
      const keysAllowed = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.'];
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
    repeatPhone() {
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
    removePhone(index) {
      this.phone_field.splice(index, 1)
      this.additional_phone.splice(index, 1)

      this.trTrimHeight(this.$refs.phone_row[0].offsetHeight)
    },
    store_contacts() {
      var contacts = {
        email: this.default_email,
        additional_email: this.additional_email,
        phone: this.default_phone,
        additional_phone: this.additional_phone,
        name: this.contact_name
      };
      this.$store.dispatch('contactPeople/store', contacts).then(() => {
        this.$refs['contacts-modal'].hide();
        if (this.$store.state.contactPeople.successMessage) {
          this.$toast.success(this.$store.state.contactPeople.successMessage, {
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
            rtl: false
          })
        }
        this.$store.dispatch('contactPeople/fetch')


      }).catch(() => {
        // this.$refs['contacts-modal'].hide();
        if (this.contactsErrorMessage) {
          this.$toast.error(this.contactsErrorMessage, {
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
            rtl: false
          })
        }

        if (this.$store.state.contactPeople.errors.name[0]) {
          this.$toast.error(this.$store.state.contactPeople.errors.name[0], {
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
            rtl: false
          })
        }

      })

    },
    sendEmail(data2, file_name2) {
      //     let image = this.file_name2;

      //     this.file_name2.forEach(x=>{
      //       const reader = new FileReader();


      //     })
      this.errors = {
        from:"",
        to:"",
        subject:"",


      }
        if(this.composeData.from == null ){
          this.errors.from = "This field is required"
          return;
        }else if(!this.composeData.to || this.composeData.to.length === 0){
          this.errors.to = "This field is required"
          return;
        }else if(!this.composeData.subject ||this.composeData.subject == ""){
          this.errors.subject = "This field is required"
          return;

        }
      //  this.uploadFileS3(this.file_name2)

      console.log(data2);
      var bcc_email = [];
      var cc_email = [];

      var s3_url = null;
      var s3_urls = [];
      if (this.$store.state.tasks.s3_url.length > 0) {
        s3_url = this.$store.state.tasks.s3_url;
      }
      if (s3_url != null) {
        for (let index = 0; index < s3_url.length; index++) {
          s3_urls[index] = s3_url[index].url
        }
      }
      if (!data2.from || !data2.message || !data2.to || !data2.subject) {
        return;
      } else {
        this.$refs['compose-modal'].hide()

      }
      if (data2.bcc) {

        data2.bcc.forEach(function (email, index) {
          // console.log(email.email);
          bcc_email[index] = email.email
        });
      }
      if (data2.cc) {

        data2.cc.forEach(function (email, index) {
          // console.log(email.email);
          cc_email[index] = email.email
        });
      }
      var data = {};
      if (data2.bcc || data2.cc) {

        data = {
          "to": data2.to,
          "bcc": data2.bcc,
          "cc": data2.cc,
          'attach_url': s3_urls,
          "message": data2.message,
          "plain_text": data2.message.replace(/(<([^>]+)>)/gi, ''),
          "subject": data2.subject,
          "from": data2.from
        };
      } else {
        data = {
          "to": data2.to,
          // "bcc" : bcc_email,
          // "cc" : cc_email,
          'attach_url': s3_urls,
          "plain_text": data2.message.replace(/(<([^>]+)>)/gi, ''),
          "message": data2.message,
          "subject": data2.subject,
          "from": data2.from
        };
      }
      this.$toast.success('Sending', {
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
        rtl: false
      })
      console.log(data);

      store.dispatch('emails/sendEmail', { data }).then(() => {
        // console.log(res);
        if (this.successMessage) {

          this.$toast.success(this.successMessage, {
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
            rtl: false
          })
        }
        // this.$refs['compose-modal'].hide()
        this.composeData.to = ''
        // this.composeData.from = ''
         this.assignfrom()
        this.composeData.cc = ''
        this.composeData.bcc = ''
        this.composeData.subject = ''
        // this.composeData.message = ''
        if (this.$store.state.users.signAll.length > 0) {
      this.composeData.message = this.$store.state.users.signAll.signature
    }else{
      this.composeData.message = this.$store.state.users.signAll.signature
    
    }
        this.$store.state.tasks.s3_url = []
        while (this.file_name2.length > 0) {
          this.file_name2.pop();
        }

        // while (this.name_to_display.length > 0) {
        //   this.name_to_display.pop();
        // }
        // for (let index = 0; index < this.file_name2.length; index++) {


        //   this.file_name2.splice(this.file_name2.indexOf(this.file_name2[index]), this.file_name2.length)
        // }
        // for (let index = 0; index < this.name_to_display.length; index++) {
        //   // const element = array[index];

        //   this.name_to_display.splice(this.name_to_display.indexOf(this.name_to_display[index]), this.name_to_display.length)
        // }

        // this.$emit('update:shall-show-email-compose-modal', false)
      })
      // this.success = this.$toast();
      this.$store.state.tasks.s3_url =[]
      this.file_name2 = []
    },
    file_upload() {
      console.log("hloo2:file_upload")
      document.getElementById('fileUpload2').click()
      console.log("click on file_upload2")



    },
    async onFileChange2(e) {
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
    const mappedFiles = filePaths.map((base64File,image_name) => ({ file: base64File,name:image[image_name].name }));
    let tempFile = mappedFiles

    let readyUpload = [];

    tempFile.forEach((obj2)=>{
      const exists = this.file_name2.some(obj1=>obj1.name === obj2.name);
      if(!exists){
        console.log("not duplicate")
        // this.readyToUpload.push(obj2);
        this.file_name2.push(obj2);
        readyUpload.push(obj2);

      }
    }) 
    

    console.log("this is file_name2", this.file_name2);
    // console.log("this is ready to upload",this.readyToUpload)
    this.uploadFileS3(readyUpload);
    // this.file_name2.push(this.readyToUpload);
    e.target.value = ''

    },
    base64(file) {
      return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
      
        
},
    removeFileS3(url, index) {
      var data = {
        attach_url: url ?? "null",
      };
      this.$store.state.tasks.s3_url.splice(index, 1)
      this.$store.dispatch('tasks/remove_file_s3', { data: data }).then(() => {
        console.log(this.$store.state.tasks.s3_url)
        console.log('removed')
        // if(this.$store.state.tasks.s3_url.includes(filename)){
        //   this.$store.state.tasks.s3_url.splice(this.$store.state.tasks.s3_url[this.$store.state.tasks.s3_url.findIndex(e => e.fileName.includes(filename))],1)
        // }

      }).catch(() => {
        
        console.log('error')
      })
      this.file_name2.splice(index, 1);
      // try to fix the testcase where if we upload file greater than 800kb and then if we add more files the file will store in this.file_name2 but not in s3_url

      // updating the this.file_name2 with s3_url
        const filteredFiles = this.file_name2.filter((file) => {

        return this.$store.state.tasks.s3_url.some((s3File) => {
          console.log(s3File.fileName, file.name, "consoling the statement")
          return  s3File.fileName === file.name
        });
      });
      this.file_name2= filteredFiles;
    },
    removeFile_name2(name) {
      console.log(name)
      this.file_name2.filter((i) => i.name !== name);
      return file_name2;
    },

    uploadFileS3(file) {
      console.log("filelength:", file.length);  
      console.log("file:", file);
      var data = {
        attach: file ? file : "null",
      };
      this.$store.dispatch('tasks/upload_file_s3', { data: data })
    },
    onSearch(query) {
      this.search = query
      this.offset = 0
    },
    checkTag(tagify) {
      this.composeData.to = null;
      this.composeData.to = tagify.value;
      // document.querySelector('.ti-input').style.border = '1px';
      // document.querySelector('.ti-input').style.padding = '1px';
      // document.querySelector('.ti-autocomplete').style.border = '1px';
      // document.querySelector('.ti-autocomplete').style.width = '95%';

      // document.querySelector('.ti-selected-item').style.backgroundColor = 'red';
      // document.querySelector('.ti-tag').style.borderRadius = '25px'
      // console.log(document.getElementsByClassName('ti-tag'));
    },


    // fetch_all_outbound(){
    //   this.$store.dispatch('emails/fetch_all_out_mails');
    // },
    // fetch_all_users(){
    //   this.$store.dispatch('allUsers/fetch');
    // }
    //   // this.success = this.$toast();
    //   // this.$store.dispatch('emails/sendEmail', {data}).then((res) => {
    //   //   console.log(res);

    //   // })
    //   // emit('update:shall-show-email-compose-modal', false)

    //   // ? Send your Email


  },
  beforeUpdate() {
    // if(this.$route.params.folder === 'draft'){
    //   this.composeData.subject = this.emailViewData.parent.subject

    //   this.composeData.message = this.emailViewData.parent.message
    // }else{
    if (this.$store.state.users.signAll.length > 0) {
      this.composeData.message = this.$store.state.users.signAll.signature
    }else{
      this.composeData.message = this.$store.state.users.signAll.signature
    
    // }
  }
    //  var signAll = [this.$store.state.users.signAll];
    if(this.$store.state.users.user_emails.length > 0){
      this.$store.state.users.user_emails.forEach(x => {
        if(x.user_id === JSON.parse(localStorage.getItem('userData')).id){
          if(x.emails_setting.length > 0){
            this.showIntegration = true
          }else{
            this.showIntegration = false
          }
        }
      });
    } 
    
    // var signAll = []
    // if (this.$store.state.users.signAll != null) {
    //   signAll.push(this.$store.state.users.signAll)
    // }
   
  },

  updated() {



  },

  setup(_, { emit }) {
    const composeData = ref({})
    const showCcField = ref(false)
    const showBccField = ref(false)

    const editorOption = {
      modules: {
        toolbar: '#quill-toolbar1',
      },
      placeholder: 'Message',
    }
    // const all = computed(() => {
    //   return JSON.parse(JSON.stringify(store.state.emails.all_outbound_emails));
    // });
    // console.log(all.value);

    store.dispatch('contactPeople/fetch');
    store.dispatch('emails/fetch_all_out_mails');
    /* eslint-disable global-require */

    const emailToOptions = computed(() => {
      return JSON.parse(JSON.stringify(store.state.contactPeople.all))
    })
    const length_emailToOptions = computed(() => {
      return JSON.parse(JSON.stringify(store.state.users.all.length))
    })

    const outBoundEmails = computed(() => {
      return JSON.parse(JSON.stringify(store.state.emails.all_outbound_emails))
    })
    // var index = store.state.emails.all_outbound_emails.length > 0 ? store.state.emails.all_outbound_emails.length - 1 : store.state.emails.all_outbound_emails.length;
    // if(index !== -1){

    // composeData.value.from  = {email:store.state.emails.all_outbound_emails[0].email,id:store.state.emails.all_outbound_emails[0].id }
    // }
    var autocompleteItems = [];
    const sizes = ['Small', 'Medium', 'Large', 'Extra Large'];
    // console.log((length_emailToOptions));
    const { refFormObserver, getValidationState, resetForm } =
      formValidation(resetForm);


    //[
    // { avatar: require('@/assets/images/avatars/1-small.png'), name: 'Dev Sindhwani' , email: 'devoas36ty@gmail.com' },
    // { avatar: require('@/assets/images/avatars/3-small.png'), name: 'Robin' , email: 'robin@yopmail.com' },
    // { avatar: require('@/assets/images/avatars/5-small.png'), name: 'Gabrielle Robertson' },
    // { avatar: require('@/assets/images/avatars/7-small.png'), name: 'Lori Spears' },
    // { avatar: require('@/assets/images/avatars/9-small.png'), name: 'Sandy Vega' },
    // { avatar: require('@/assets/images/avatars/11-small.png'), name: 'Cheryl May' },
    //]

    /* eslint-enable global-require */

    // const sendEmail = data2 => {

    //   // composeData.value = {}

    //   // store.dispatch('emails/sendEmail', {data}).then((res) => {
    //   //   console.log(res);
    //   //   toast({
    //   //       component: ToastificationContentVue,
    //   //       props: {
    //   //         title: 'Sent Successfully',
    //   //         icon: 'UserIcon',
    //   //         variant: 'success',
    //   //       },
    //   //     })
    //   // })

    //   // ? Send your Email
    // }

    const discardEmail = () => {
      composeData.value = {}
      emit('update:shall-show-email-compose-modal', false)
    }

    return {
      refFormObserver,
      getValidationState,
      formValidation, resetForm,
      composeData,
      editorOption,
      emailToOptions,
      showCcField,
      showBccField,
      outBoundEmails,
      autocompleteItems,
      sizes,
      // Email actions
      // sendEmail,
      discardEmail,
    }
  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';
@import '@core/scss/vue/libs/quill.scss';
</style>
<style></style>

<style lang="scss" scoped>
.plus_field {
  margin-right: -2rem;
}

.x_field {
  margin-right: -2rem;
}

.field_name {
  margin-right: -2rem;
}

@media(max-width: 450px) {

  .plus_icon {
    margin-top: -2rem;
    margin-left: -2.5rem
  }

  .x_icon {
    margin-left: -2.5rem;
  }

  .plus_field {
    margin-right: 0rem;
  }

  .x_field {
    margin-right: 0rem;
  }

  .field_name {
    margin-right: 0rem;
  }
}


// .add_contacts:hover{
//   background-color: black!important;
//   a{

//     // color: white;
//   }
// }
/* To change background color */
.e-toast-container .e-toast {
  background-color: navy;
}

.pagination {
  display: flex;
  margin: 0.25rem 0.25rem 0;
}

.pagination button {
  flex-grow: 1;
}

.pagination button:hover {
  cursor: pointer;
}

// .tags-input-wrapper-default{
//   padding: 0.25rem!important;
// }
// .ti-tag{
//   background-color: red;
// }

// .customLook{
//   --tags-focus-border-color: #fff;
//   padding: 1.5rem 1.5rem;
// }
// .tagify__dropdown{
//   border:1px;
// }
form ::v-deep {

  // Mail To vue-select style
  .v-select {
    .vs__dropdown-toggle {
      border: 0;
      box-shadow: none;
    }

    .vs__open-indicator {
      display: none;
    }
  }

  // Quill Editor Style
  .quill-editor {
    .ql-container.ql-snow {
      border-bottom: 0 !important;
    }
  }
}
</style>

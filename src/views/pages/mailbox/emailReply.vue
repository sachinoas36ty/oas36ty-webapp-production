<template>
  <b-card id="compose-mail" class="compose-reply" modal-class="modal-sticky"
    footer-class="d-flex justify-content-between" body-class="p-0 " size="xl" centered no-fade hide-backdrop static>

    <!-- Modal Header :visible="shallShowEmailReplyModal"  @change="(val) => $emit('update:shall-show-email-reply-modal', val)" -->



    <!-- <b-card-body> -->
      {{ assignfrom() }}
    <validation-observer #default="{ handleSubmit }" ref="refFormObserver">

      <b-form @submit.prevent="handleSubmit(reply(file_name))">
        <validation-provider #default="validationContext" name="from" vid="from" rules="required">

          <div class="to_email_res compose-mail-form-field p-0">
            <label for="email-from" class="form-label">From: </label>
            <v-select id="from" v-model="composeData.from" :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
              label="email" class="flex-grow-1 email-form-selector" :options="outBoundEmails">

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
    <b-form-invalid-feedback class="mb-1 d-block">
      {{ validationContext.errors[0] }}
    </b-form-invalid-feedback>
        </validation-provider>
        <!-- Field: To -->
        <div id="" class="to_email_res compose-mail-form-field p-0">
          <!-- <div> -->

            <label for="email-to" class="form-label">To: </label>
          <!-- </div> -->
          <v-select  v-model="toName" taggable push-tags multiple :filterable="false"
            class="flex-grow-1 email-to-selector" :options="paginated_contactPerson">

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

            <span v-show="!showCcField" class="cursor-pointer" @click="showCcField = !showCcField">Cc</span>
            <span v-show="!showBccField" class="ml-1 cursor-pointer" @click="showBccField = !showBccField">Bcc</span>
          </div>
        </div>

        <!-- Field: Cc (Hidden Initially) -->
        <div :style="{'display':setDisplay(showCcField)}" class="to_email_res compose-mail-form-field p-0 mb-1">
          <label for="email-cc">CC: </label>
          <v-select v-model="ccName" taggable push-tags multiple :filterable="false"
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
        <div :style="{'display':setDisplay(showBccField)}" class="to_email_res compose-mail-form-field p-0 mb-1">
          <label for="email-bcc">Bcc </label>
          <v-select :v-model="null" taggable push-tags multiple :filterable="false"
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
        <!-- <div class="compose-mail-form-field">
  <label for="email-subject">Subject: </label>
  <b-form-input id="email-subject" v-model="composeData.subject" />
</div> -->

        <!-- Field: Message - Quill Editor -->
        <div @click="if(showCcField){(showCcField = !showCcField)}if(showBccField){( showBccField = !showBccField)}" class=" pb-0 mt-0 mb-0 pt-0" style="margin-left:-1rem;">
          <!-- <div    > -->



          <quill-editor id="quill-content2" v-model="composeData.message" :options="editorOption" />
          <!-- <feather-icon class="ml-2 cursor-pointer" id="reply-content-button" @click="hide_parent_message()" icon="MoreHorizontalIcon" size="20" style="display:none"></feather-icon> -->

          <feather-icon class="ml-2 cursor-pointer" id="reply-content" @click="show_parent_message()"
            icon="MoreHorizontalIcon" size="20"></feather-icon>

          <!-- </div> -->
          <div id="parent-message" v-if="emailViewData.childs" class="text-left pl-1" style="display: none;">
            <div class="text-right">

              <feather-icon class=" cursor-pointer" @click="hide_parent_message()" icon="TrashIcon" size="18" />
            </div>
            <iframe src="" :srcdoc="emailViewData.childs ? emailViewData.childs[emailViewData.childs.length - 1].message: ''"
              style="width:100%; height:auto;" frameborder="0"></iframe>

          </div>
          <div id="parent-message" v-if="!emailViewData.childs" class="text-left pl-1" style="display: none;">
            <iframe src="" :srcdoc="emailViewData.parent ? emailViewData.parent.message : ''" style="width:100%; height:auto;"
              frameborder="0"></iframe>
          </div>
        </div>
        <!-- <b class="ml-1" v-if="name_to_display.length > 0" v-for="name in name_to_display">{{ name }}<br></b> -->
        <b class="ml-1 d-flex justify-content-between" v-if="(file_name.length > 0 && !$store.state.emails.isLoadingUrl)"
          v-for="name in $store.state.tasks.s3_url">{{ name.fileName }}<br>
          <!--  <b-button size="sm"   class="mr-1 mb-1" variant="outline-primary"> -->
            <span v-b-tooltip.hover.top="'Remove Attachment'">
              
              <feather-icon  class="mr-1 cursor-pointer" @click="removeFileS3(name.url)" v-if="(file_name.length > 0 && !$store.state.emails.isLoadingUrl)" icon="XIcon" />
                <!-- </b-button> -->
              </span>
            </b>
            <div class="text-center">

              <b-spinner small v-if="$store.state.tasks.isLoadingUrl" />
            </div>
        <div id="reply_actions" style="display: flex;">

           <b-button size="sm"  type="submit" variant="primary">
            Send
            <!-- <b-spinner small class="ml-1" v-if="$store.state.emails.isLoadingReply" /> -->

          </b-button>
          <div id="quill-toolbar2" class="d-flex border-bottom-0">
            <b-form-file id="fileUpload" v-model="composeData.file" class="d-none" multiple @change="onFileChange" />
            <button class="ql-bold" />
            <button class="ql-italic" />
            <button class="ql-underline" />
            <button class="ql-align" />
            <button class="ql-link" />

            <feather-icon @click="file_upload" icon="PaperclipIcon" size="20" class="ml-1 cursor-pointer" />
            <!-- &emsp13;<a href="#" class="text-decoration-none " style="color: #202126;" @click="uploadFileS3(file_name)">Upload</a> -->
              <div class="text-center">

                <feather-icon icon="TrashIcon" size="20" class="ml-1 cursor-pointer  " right @click="hidereply()" />
              </div>

          </div>
        </div>
      </b-form>
    </validation-observer>

    <!-- <b-form-textarea>

</b-form-textarea> -->
    <!-- Add a bold button -->

    <!-- </b-card-body> -->
    <!-- Modal Footer -->

    <!-- Footer: Left Content -->
    <!-- <b class="ml-1" v-if="name_to_display.length > 0" v-for="name in name_to_display">{{name}}<br></b> -->
    <!-- <b-card-footer style="padding: 1rem 0rem;">
      <div class="d-flex">
        <b-dropdown v-ripple.400="'rgba(255, 255, 255, 0.15)'" split variant="primary" right
        @click="reply(file_name)">
        <template  #button-content >
          <span class="d-flex" > Send
            <b-spinner small class="ml-1" v-if="$store.state.emails.isLoadingReply" />
          </span>
        </template>
        <b-dropdown-item>
          Schedule Send
        </b-dropdown-item>
      </b-dropdown>
      <div id="quill-toolbar2" class="d-flex border-bottom-0">
        <b-form-file id="fileUpload" v-model="composeData.file" class="d-none" multiple @change="onFileChange" />
          <button class="ql-bold" />
          <button class="ql-italic" />
          <button class="ql-underline" />
          <button class="ql-align" />
          <button class="ql-link" />

          <feather-icon @click="file_upload" icon="PaperclipIcon" size="20" class="ml-1 cursor-pointer" />

          <feather-icon icon="TrashIcon" size="20" class="ml-1 cursor-pointer  " right @click="hidereply()"/>
          
        </div>
        
        
      </div>
      <div>
      </div>
</b-card-footer> -->
    <!--  <feather-icon icon="TrashIcon" size="17" class="ml-75 cursor-pointer d-flex-right" @click="discardEmails()" />-->

    <!-- Dropdown: More Actions -->
    <!-- <b-dropdown variant="link" no-caret toggle-class="p-0" right>
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
</b-dropdown> -->

    <!-- Discard Compose
  <feather-icon icon="TrashIcon" size="17" class="ml-75 cursor-pointer" @click="discardEmails()" /> -->



    <!-- Footer: Right Content -->

    <b-modal id="modal-1" hide-footer size="lg" ref="contacts-modal" title="Add Contact">
      <b-card-body>

        <b-form>
          <b-row>
            <b-col md="10">

              <b-form-group label="Name" class="field_name" col="10">

                <b-form-input type="text" v-model="contact_name" placeholder="Enter Name">

                </b-form-input>
              </b-form-group>
            </b-col>

          </b-row>
          <!--  Add Email field  -->
          <b-row>
            <b-col md="10">

              <b-form-group label="Email" class="plus_field" col="10">
                <b-form-input type="email" v-model="default_email[0]" placeholder="Enter Email">

                </b-form-input>

              </b-form-group>
            </b-col>
            <b-col md="2" class="plus_icon">

              <b-form-group class="plus_icon" style="margin-top:2rem; margin-left: 2.5rem;" col="2">
                 <b-button size="sm" variant="primary" @click="repeateAgain">
                  <feather-icon icon="PlusIcon">

                  </feather-icon>
                </b-button>

              </b-form-group>
            </b-col>

          </b-row>



          <b-row v-for="(item, index) in email_field" :id="item.id" :key="item.id" ref="row">
            <b-col md="10">

              <b-form-group col="10" class="x_field">
                <b-form-input type="email" id="hh" v-model="additional_email[index]" placeholder="Enter Email">

                </b-form-input>

              </b-form-group>
            </b-col>
            <b-col md="2" class="x_icon">

              <b-form-group col="2" class="x_icon" style="margin-left: 2.5rem;">
                 <b-button size="sm" variant="outline-primary" @click="removeItem(index)">
                  <feather-icon icon="XIcon">

                  </feather-icon>
                </b-button>

              </b-form-group>
            </b-col>

          </b-row>

          <!-- Add Phone Field  -->

          <b-row>
            <b-col md="10">

              <b-form-group label="Phone" col="10" class="plus_field">
                <b-form-input @keypress="isNumber($event)" type="number" v-model="default_phone[0]"
                  placeholder="Enter Phone">

                </b-form-input>

              </b-form-group>
            </b-col>
            <b-col md="2" class="plus_icon">

              <b-form-group style="margin-top:2rem; margin-left: 2.5rem;" col="2">
                 <b-button size="sm" variant="primary" @click="repeatPhone">
                  <feather-icon icon="PlusIcon">

                  </feather-icon>
                </b-button>

              </b-form-group>
            </b-col>

          </b-row>



          <b-row v-for="(item, index) in phone_field" :id="item.id" :key="item.id" ref="phone_row">
            <b-col md="10">

              <b-form-group col="10" class="x_field">
                <b-form-input type="number" @keypress="isNumber($event)" v-model="additional_phone[index]"
                  placeholder="Enter Phone">

                </b-form-input>

              </b-form-group>
            </b-col>
            <b-col md="2" class="x_icon">

              <b-form-group col="2" style="margin-left: 2.5rem;">
                 <b-button size="sm" variant="outline-primary" @click="removePhone(index)">
                  <feather-icon icon="XIcon">

                  </feather-icon>
                </b-button>

              </b-form-group>
            </b-col>

          </b-row>

          <div class="text-right ">

             <b-button size="sm" :disabled="contactIsLoading" variant="primary" @click="store_contacts()">
              Save <b-spinner small class="ml-1" v-if="contactIsLoading" />
            </b-button>
          </div>
        </b-form>

      </b-card-body>
    </b-modal>


    <!-- Modal: Body -->


  </b-card>
</template>

<script>

// function css(){

// }
// css();
// console.log(this);
import {
  VBTooltip,
  BCardHeader, BFormInvalidFeedback,
  BCardFooter, BCardBody,
  BDropdown, BModal, VBModal, BMediaAside, BImg, BRow, BCol, BDropdownItem, BSpinner, BBadge, BForm, BFormFile, BButton, BFormInput, BFormTextarea, BFormTag, BAvatar, BCard, BDropdownDivider, BFormTags, BDropdownItemButton, BIcon, BDropdownForm, BFormGroup,
} from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'
import { computed, ref } from '@vue/composition-api'
import { quillEditor } from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
// eslint-disable-next-line
import 'quill/dist/quill.snow.css'
// eslint-disable-next-line
import 'quill/dist/quill.bubble.css'

// import { quillEditor } from 'vue-quill-editor'
import vSelect from 'vue-select'
import store from '@/store'
import TagsInput from '@voerro/vue-tagsinput';
import VueTagsInput from '@johmun/vue-tags-input';
// import VueTagsInput from './vue-tags-input-package/vue-tags-input/tags'
// import Tagify from 'tagify-vue'
// import 'vue-select/dist/vue-select.css';

import ToastificationContentVue from '@/@core/components/toastification/ToastificationContent.vue'
import "vue-toastification/dist/index.css";
import { watch } from 'fs'
import formValidation from '@/@core/comp-functions/forms/form-validation'
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import { concat } from 'postcss-rtl/lib/affected-props'

export default {
  directives: {
    'b-tooltip': VBTooltip,
    Ripple,
    'b-modal': VBModal
  },

  components: {
    ValidationObserver, ValidationProvider, BFormInvalidFeedback,
    BDropdownItemButton, BButton, BModal, BRow, BCol,
    BDropdownForm, BMediaAside, BImg,
    BFormGroup, BFormFile, BBadge,
    BFormTag, BCardBody,
    BFormTags, BCardHeader,
    BIcon, BCardFooter,
    BFormTextarea, BSpinner,
    // Tagify,
    // BSV
    BDropdown,
    VBTooltip,
    TagsInput, BCard,
    VueTagsInput,
    BDropdownItem,
    BForm,
    BFormInput,
    BAvatar,
    BDropdownDivider,


    // 3rd Party
    quillEditor,
    vSelect,
  },
  // model: {
  //   prop: 'shallShowEmailReplyModal',
  //   event: 'update:shall-show-email-reply-modal',
  // },
  props: {
    // shallShowEmailReplyModal: {
    //   type: Boolean,
    //   required: true,
    // },

    emailViewData: {
      type: Object,
      required: true,
    },
    // reply_email:{
    //   type: Array,
    //   required: true
    // }
  },
  data() {
    return {
      email_setting_email:'',
      giveCC: [],
      ccName: [],
      composeData: {
        message: '',
        to: [],
        from: '',
        cc: [],
        bcc: '',
        subject: '',
      },
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
      file: '',
      file_name: [],
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
      name_to_display: [],
      deleted_index: -1,
      empty_index: -1,
      original_cc:[],
      check_cc:[],
      latest:[],
      original_toReply:[],
      check_toReply:[],
      toName: []

      // autocompleteItems:[]
    }
  },
  computed: {

    isLoading() {


      //     var exclude_index=  this.ccName.findIndex(e => e === this.emailViewData.to_email);
      //  this.ccName.splice(this.ccName[exclude_index], 1);


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

      // if(deleted_index != -1){ 

      // }

      // for (let index = 0; index < this.composeData.to.length; index++) {
      //   // const element = array[index];
      //   if(this.composeData.to[index] == null){
      //     this.composeData.to.splice(this.composeData.to[index], 1)
      //   }

      // }
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
      // if(this.emailToOptions.length > 0){

      //   for (let index = 0; index < this.emailToOptions.length; index++) {
      //     // const element = array[index];
      //     console.log(this.emailToOptions);
      //     this.autocompleteItems.push( `${this.emailToOptions[index].email}` )
      //   }
      // }

    },
    outBoundEmails() {
      console.log(this.$store.state.emails.all_outbound_emails);
      return this.$store.state.emails.all_outbound_emails
    },
    paginated_contactPerson() {
      // this.data

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
    // this.ccName = []
    // this.isLoading
    // this.updateData();

    // this.$store.dispatch('contactPeople/fetchForLeads')
    // this.$store.dispatch('emails/fetch_all_out_mails')

    // this._props.emailViewData.to_email = []
    // this.composeData.message = this._props.emailViewData.message
    // this.composeData.subject = this._props.emailViewData.subject
    // for (let index = 0; index < this.paginated_contactPerson.length; index++) {
    //   // const element = array[index];
    //   if(this._props.emailViewData.parent.to_email == this.paginated_contactPerson[index]){

    //     this.composeData.to[index] = String(this.paginated_contactPerson[index]) 
    //   }
    // }
    // if(this.reply_to_email){

    //   this.composeData.to = this.reply_to_email
    // }
    // for (let index = 0; index < this.paginated_contactPerson.length; index++) {
    //   // const element = array[index];
    //   if( this.paginated_contactPerson[index].email == this._props.emailViewData.parent.to_email){

    //     this.composeData.to[index] = 
    //     {
    //       email:String(this.paginated_contactPerson[index].email) 
    //     }

    //   }
    //   if(this.paginated_contactPerson[index].email != this._props.emailViewData.parent.to_email){
    //     this.composeData.to[index] = null
    //   }

    // }
    // for (let index = 0; index < this.composeData.to.length; index++) {
    //   // const element = array[index];
    //   if(this.composeData.to[index] == null){
    //     this.composeData.to.splice(this.composeData.to[index], this.composeData.to.length)
    //   }

    // }

  },
  beforeUpdate(){
    // this.composeData.from = {email:this.outBoundEmails[0].email,id:this.outBoundEmails[0].id}
  },
  updated(){
    // this.updateData()
    // this.toName = []
        // this.ccName = []
        this.giveCC = []
        this.check_cc = []
  },


  methods: {
    assignfrom(){
      if(this.outBoundEmails.length > 0){

        this.composeData.from = {
          email:this.outBoundEmails[0].email,
          id:this.outBoundEmails[0].id
        }
      }
      var signAll = []
      if(this.$store.state.users.signAll != null){
        signAll.push(this.$store.state.users.signAll)
      }
   if(signAll.length > 0){
    this.composeData.message = '<br><br>' + signAll[0].signature
   }
    },
    setDisplay(show){
      if(show){
        // return 'block';
      }
      if(!show)
      {
        return 'none!important';
      }
    },
   
    reply(file) {
      if (this.composeData.from == '' || this.composeData.from == null) {
        return;
      }
      var s3_url = null;
      var s3_urls = [];
      if(this.$store.state.tasks.s3_url.length > 0){
        s3_url = this.$store.state.tasks.s3_url;
      }
      if(s3_url != null){
        for (let index = 0; index < s3_url.length; index++) {
          s3_urls[index] = s3_url[index].url
        }
      }
      var latest_element = [];
      if (this._props.emailViewData.childs) {
        latest_element = this._props.emailViewData.childs[this._props.emailViewData.childs.length - 1]
      }
      if (!this._props.emailViewData.childs) {
        latest_element = this._props.emailViewData.parent
      }
      var to_email = []
      if (latest_element.folder == 'INBOX') {

        to_email.push(latest_element.from_email)
      } else {
        to_email.push(latest_element.to_email)

      }
      const data = {
        message_id: latest_element.message_id,
        references: latest_element.references,
        // in_reply_to: latest_element.in_reply_to,
        subject: latest_element.subject,
        message: this.composeData.message + latest_element.message,
        // reply: this.composeData.message,
        from: this.composeData.from,
        email_replyTo: latest_element.folder == 'INBOX' ? [{email:latest_element.to_email}] : [{ email: this.composeData.from.email }],
        to: this.toName,
        plain_text:(this.composeData.message + latest_element.message).replace(/(<([^>]+)>)/gi, ''),
        cc: this.ccName,
        bcc: latest_element.bccaddress,
        attach_url: s3_urls
      }
      this.hidereply();

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
      this.$store.dispatch('emails/reply_all', { data: data }).then(() => {

        // this.hidereply();
        if(this.$store.state.emails.successMessage.includes('wrong')){

        
        this.$toast.error(this.$store.state.emails.successMessage, {
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
        }else{
          this.$toast.success(this.$store.state.emails.successMessage, {
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
      }

      ).catch();
      console.log(data);
    },
    hidereply() {

      this.discardEmails()
      if (document.getElementById('reply-div').style.display == 'block') {

        document.getElementById('reply-div').style.display = 'none';
      }
      if (document.getElementById('reply-button-card').style.display == 'none') {

        document.getElementById('reply-button-card').style.display = 'block';
      }

    },
    show_parent_message() {
      // this.composeData.message = this._props.emailViewData.message;

      // if(document.getElementById('reply-content').style.display == 'block'){
      // document.getElementById('reply-content-button').style.display = 'none';

      document.getElementById('reply-content').style.display = 'none';
      // }
      if (document.getElementById('parent-message').style.display == 'none') {

        document.getElementById('parent-message').style.display = 'block';
      }



    },
    hide_parent_message() {
      // this.composeData.message = this._props.emailViewData.message;

      // if(document.getElementById('reply-content').style.display == 'none'){

      document.getElementById('reply-content').style.display = 'block';
      // }
      if (document.getElementById('parent-message').style.display == 'block') {

        document.getElementById('parent-message').style.display = 'none';
      }



    },
    discardEmails() {
      // this.composeData.message = ''
      this.composeData.subject = ''
      this.composeData.to = ''
      // this.composeData.from = ''
      this.composeData.cc = ''
      this.composeData.bcc = ''

      document.getElementById('reply-content').style.display = 'block';
      document.getElementById('parent-message').style.display = 'none';

      // this.$emit('update:shall-show-email-reply-modal', false)
      if (this.file_name.length > 0) {

        while (this.file_name.length > 0) {
          this.file_name.pop();
        }
      }
      if (this.name_to_display.length > 0) {

        while (this.name_to_display.length > 0) {
          this.name_to_display.pop();
        }
      }
      if (this.composeData.file) {

        if (this.composeData.file.length > 0) {

          while (this.composeData.file.length > 0) {
            this.composeData.file.pop();
          }
        }
      }

      // this.$emit('update:shall-show-email-compose-modal', false)

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
    sendEmail(data2, file_name) {
      console.log(data2);
      var bcc_email = [];
      var cc_email = [];
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
          'attach': file_name,
          "message": data2.message,
          "subject": data2.subject,
          "from": data2.from
        };
      } else {
        data = {
          "to": data2.to,
          // "bcc" : bcc_email,
          // "cc" : cc_email,
          'attach': file_name,

          "message": data2.message,
          "subject": data2.subject,
          "from": data2.from
        };
      }

      console.log(data);
      // this.success = this.$toast();
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
        this.composeData.to = ''
        this.composeData.from = ''
        this.composeData.cc = ''
        this.composeData.bcc = ''
        this.composeData.subject = ''
        this.composeData.message = ''
        while (this.file_name.length > 0) {
          this.file_name.pop();
        }
        while (this.name_to_display.length > 0) {
          this.name_to_display.pop();
        }

        this.$emit('update:shall-show-email-compose-modal', false)
      })
    },
    file_upload() {
      document.getElementById('fileUpload').click()
      // const image = e.target.files[0];
      // const reader = new FileReader();
      // var base = reader.readAsDataURL(image)
      // console.log(base);
      // console.log(e);
    },
    onFileChange(e) {
      console.log(e.target.files[0]);
      let image = e.target.files;
      console.log(image.length);
      this.file_name = []
image.forEach((x, index) => {
        this.name_to_display[index] = x.name

        const reader = new FileReader();
        //       let rawImg;
        // reader.onloadend = () => {
        //    rawImg = reader.result;
        //   //  console.log(rawImg);
        // }
        reader.onload = (e) => {

          this.file_name.push({
            file: e.target.result,
            name: x.name
          })
          this.uploadFileS3(this.file_name)
        }
        // const element = array[index];
        reader.readAsDataURL(x)


      })
      // console.log(this.file_name);

      // var base = reader.readAsDataURL(image)
      //   console.log(reader);
      // this.file_name = 
      //   image.name
      // type: image.type
      e.target.value = ''

    },
    removeFileS3(url){
      var data = {
        attach_url: url ?? "null", 
      };
      this.$store.dispatch('tasks/remove_file_s3', { data: data }).then(() => {
      
   
      }).catch(() => {
        
     
      })
    },
    uploadFileS3(file) {
      var data = {
        attach: file.length > 0 ? file : "null", 
      };
      this.$store.dispatch('tasks/upload_file_s3', { data: data }).then(() => {
      
   
      }).catch(() => {
        
     
      })
    //   var emails_data = {
    //   folder: router.currentRoute.params.folder,
    //   currrent : JSON.parse(localStorage.getItem('userData'))
    // };
    // this.$store.dispatch('emails/fetch_emails', emails_data)
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
  watch: {
    emailViewData:{
      
      immediate : true,
      handler(){
        this.toName = []
        this.ccName = []
        this.giveCC = []
        this.check_cc = []
        var latest_data = '';
        var latest_element = '';
        latest_element = latest_element.trim()
        var matched_email = '';
    matched_email.trim();
        if (this.emailViewData.parent) {
          
        if (this.emailViewData.parent.folder == 'INBOX') {
          latest_data = this.emailViewData.parent.from_email;
          matched_email = this.emailViewData.parent.to_email;
          this.toName.push(this.emailViewData.parent.from_email)
        }
        if (this.emailViewData.parent.folder == 'Sent Mail') {
          latest_data = this.emailViewData.parent.to_email;
          
          matched_email = this.emailViewData.parent.to_email;
          
          this.toName.push(this.emailViewData.parent.to_email)
        }
        var ccaddress = null;
        // ccaddress.trim()
        
        
        // var 
        // if(!this.emailViewData.parent.to_email.includes(this.emailViewData.parent.ccaddress)){
          
          // ccaddress = this.emailViewData.parent.ccaddress != null ? this.emailViewData.parent.ccaddress : null
          // }
          
      // var check_cc = [];
      if(this.emailViewData.parent){

      if(this.emailViewData.parent.ccaddress == null){
      }else{
      if( this.emailViewData.parent.ccaddress.includes(',') ){
        // if()
        // check_cc = 
        this.original_cc.push(this.emailViewData.parent.ccaddress.split(',')) 
        
      }else{

         this.original_cc = [this.emailViewData.parent.ccaddress]
      }
    }
      

    }
      if(this.emailViewData.parent.to_replyEmails.includes(',') ){

        // check_cc = 
        this.original_toReply.push(this.emailViewData.parent.to_replyEmails.split(',')) 
        }else{

        this.original_toReply.push(this.emailViewData.parent.to_replyEmails)
        }
      //  var original_cc = [];
      if(this.emailViewData.parent.ccaddress != null){

        if( this.emailViewData.parent.ccaddress.includes(',')){
          
          this.original_cc = this.original_cc[0]
        }
      }
       
      //  if(this.emailViewData.parent.ccaddress.includes(',') ){

       
       for (let i = 0; i < this.original_cc.length; i++) {
         // const element = array[index];
         var index1 = -1;
         var index2 = -1;

         if(this.original_cc[i].includes('<')){

           index1 = this.original_cc[i].indexOf('<')
          }
          if( this.original_cc[i].includes('>')){

          // index1 = this.original_cc[i].indexOf('<')
          index2 = this.original_cc[i].indexOf('>')
          }

         var index3 = index2 - index1
         // this.ccName.push(index2)
          // this.check_cc[i] = [index1,index2, index3]
         // if(this)
         if (( this.original_cc[i].includes('<')) && !(this.check_cc.includes(this.original_cc[i]))) {
          //  alert('jj')
          console.log(String(this.original_cc[i]));
           this.check_cc.push(String(this.original_cc[i].substr(index1 + 1, index3 - 1)) );
         } else {
           if (this.original_cc[i] != matched_email ) {
          console.log(String(this.original_cc[i]));
             
             this.check_cc.push(String(this.original_cc[i]));
           }
     
            }

      }
    // }

    if(this.emailViewData.parent.to_replyEmails.includes(',') ){

       
      for (let i = 0; i < this.original_toReply.length; i++) {
        // const element = array[index];
        var index1 = this.original_toReply[i].indexOf('<')
        var index2 = this.original_toReply[i].indexOf('>')
        var index3 = index2 - index1
        // this.ccName.push(index2)
        // this.check_cc[i] = [index1,index2, index3]
        // if(this)
        if (this.original_toReply[i].includes('<') && !(this.check_toReply.includes(this.original_toReply[i]))) {
        //  alert('jj')
          this.check_toReply.push(String(this.original_toReply[i].substr(index1 + 1, index3 - 1)) );
        } else {
          // if (this.original_toReply[i] != matched_email ) {
            
            this.check_toReply.push(String(this.original_toReply[i]));
          // }

          }

      }
      }

      var cc1 = this.emailViewData.parent.ccaddress;
      var to_reply1 = this.emailViewData.parent.to_replyEmails;

      if(this.emailViewData.parent.folder == 'INBOX'){
        // console.log('cc');
        if(cc1 || to_reply1){
          
          
          if(this.original_toReply.find(e => e != this.emailViewData.parent.to_email) && this.check_cc.find(e => e != this.emailViewData.parent.to_email) ){
            if(this.emailViewData.parent.ccaddress || this.emailViewData.parent.to_replyEmails){
              // latest_element = this.emailViewData.parent.to_replyEmails.trim()
              // if(this.emailViewData.parent.to_replyEmails){
                
                for (let index = 0; index < this.original_toReply.length; index++) {
                  // const element = array[index];
                    this.check_cc.push(this.original_toReply[index]);
                }
                // latest_element = latest_element.concat([ccaddress, this.emailViewData.parent.to_replyEmails])
                // latest_element = this.emailViewData.ccaddress + this.emailViewData.parent.to_replyEmails
                // this.latest = [latest_element]
                
                // }
              }else if(this.emailViewData.parent.ccaddress){
                latest_element = this.emailViewData.parent.ccaddress
              }else if(this.emailViewData.parent.to_replyEmails){
                latest_element = this.emailViewData.parent.to_replyEmails
              }else{
                latest_element = ''
              }
              
              // }
              
            }
            else {
              
              if(this.check_cc.find(e => e == this.emailViewData.parent.to_email)){ // == exists
                // ccaddress = ccaddress-to_email;


               var index =  this.check_cc.findIndex(e => e == this.emailViewData.parent.to_email)
               this.check_cc.splice(this.check_cc[index], 1)

              }
              if(this.original_toReply.find(e => e == this.emailViewData.parent.to_email)){
                this.latest = ['hh']
               var index =  this.original_toReply.findIndex(e => e == this.emailViewData.parent.to_email)

                this.original_toReply.splice(this.original_toReply[index], 1)
                // to_reply_all = to_reply_all-to_email;
              }
              if(this.emailViewData.parent.ccaddress && this.emailViewData.parent.to_replyEmails){
                // cc = this.emailViewData.parent.ccaddress+ this.emailViewData.parent.to_reply_all;
                for (let index = 0; index < this.original_toReply.length; index++) {
                  // const element = array[index];
                  this.check_cc.push(this.original_toReply[index]);
                  
                }
            }else if(this.emailViewData.parent.ccaddress){
              // cc = this.emailViewData.parent.ccaddress;
              latest_element = this.emailViewData.parent.ccaddress

            }
            else if(this.emailViewData.parent.to_replyEmails){
              // cc = this.emailViewData.parent.to_reply_all;
              latest_element = this.emailViewData.parent.to_replyEmails

            }else{
                // cc = '';
                latest_element = ''
            }
          }
    }
      // console.log(parent_cc);
    }
  }
  if(this.emailViewData.parent){
    if(this.emailViewData.parent.folder == 'INBOX'){
      var to = this.emailViewData.parent.to_email;
      var user = this.$store.state.users.user_emails.find(e => e.user_id === JSON.parse(localStorage.getItem('userData')).id)
      // console.log();
      this.email_setting_email = user.emails_setting.find(j => j.id === user.emails_setting_id).email

      // if(this.original_cc.find(e => e == user.emails_setting.find(j => j.id === user.emails_setting_id).email)){

      // }
      if(to == user.emails_setting.find(j => j.id === user.emails_setting_id).email){
        this.ccName = []
        this.ccName = this.check_cc.filter(e => e != to)
      }
    }
  }
  this.giveCC = matched_email.trim().split(',');
    if (this.emailViewData.childs) {
      if (this.emailViewData.childs[this.emailViewData.childs.length - 1].folder == 'INBOX') {
        latest_data = this.emailViewData.childs[this.emailViewData.childs.length - 1].from_email;

        matched_email = this.emailViewData.childs[this.emailViewData.childs.length - 1].to_email;

        this.toName.push(String(this.emailViewData.childs[this.emailViewData.childs.length - 1].from_email) )
    
      }
  if (this.emailViewData.childs[this.emailViewData.childs.length - 1].folder == 'Sent Mail') {
    latest_data = this.emailViewData.childs[this.emailViewData.childs.length - 1].to_email;

    matched_email = this.emailViewData.childs[this.emailViewData.childs.length - 1].from_email;

    this.toName.push(String(this.emailViewData.childs[this.emailViewData.childs.length - 1].to_email) )
  }
  // if(this._props.emailViewData.childs[this._props.emailViewData.childs.length - 1].ccaddress){

  // var childs_cc = ''
  if(this.emailViewData.childs[this.emailViewData.childs.length - 1].ccaddress == null){
        latest_element = this.emailViewData.childs[this.emailViewData.childs.length - 1].to_replyEmails
      }else{

        // latest_element = latest_element.concat([ccaddress, this.emailViewData.parent.to_replyEmails])
        latest_element = latest_element.concat([this.emailViewData.childs[this.emailViewData.childs.length - 1].ccaddress, this.emailViewData.childs[this.emailViewData.childs.length - 1].to_replyEmails])
      }
  // console.log(parent_cc);
  this.giveCC = latest_element.split(',');
  // }

}

if (this.giveCC) {

  for (let index = 0; index < this.giveCC.length; index++) {
    var index1 = this.giveCC[index].indexOf('<')
    var index2 = this.giveCC[index].indexOf('>')
    var index3 = index2 - index1
    // this.ccName.push(index2)
    
    // if(this)
    if (this.giveCC[index].includes('<') && !(this.ccName.includes(this.giveCC[index]))) {

      this.ccName.push(String(this.giveCC[index].substr(index1 + 1, index3 - 1)) );
    } else {
      // if (this.giveCC[index] != matched_email ) {
        // if(this.check_cc.find(e => e != this.giveCC[index])){

        // this.ccName.push(String(this.giveCC[index].trim()));
      // }

    }

  }

}
// if(this.emailViewData.parent){
//     if(this.emailViewData.parent.folder == 'INBOX'){
//       // var cc = this.emailViewData.parent.ccaddress;
//       // if(cc != null){

//         var user = this.$store.state.users.user_emails.find(e => e.user_id === JSON.parse(localStorage.getItem('userData')).id)
//         this.email_setting_email = user.emails_setting.find(j => j.id === user.emails_setting_id).email
//         // console.log();
//         // if(this.original_cc.find(e => e == user.emails_setting.find(j => j.id === user.emails_setting_id).email)){
          
//           // }
//           this.ccName = []
//           if(this.giveCC.find(e => e != user.emails_setting.find(j => j.id === user.emails_setting_id).email)){
//             // if(this.emailViewData.parent.ccaddress.includes('cc')){

//             // }
//             // this.ccName = this.giveCC
//           }
//           // if(this.ccName.find())
//           // var cccName = []
//           // this.ccName.forEach(element => {
//           //   if(element != this.email_setting_email){

//           //     cccName.push(element)
//           //   }
//           // });
//           // alert(cccName.length)
//           // this.ccName = cccName;

//           // this.ccName.splice(this.ccName[this.ccName.findIndex(e => e == user.emails_setting.find(j => j.id === user.emails_setting_id).email)],1)
//         // }
//     }
//   }

        }
  }

    // '$route.params.folder': {
    // handler: function ( ) {
    //   // this.com = folder
    //   for (let index = 0; index < this.paginated_contactPerson.length; index++) {
    //   // const element = array[index];
    //   if(this._props.emailViewData.parent.to_email == this.paginated_contactPerson[index]){

    //     this.composeData.to[index] = String(this.paginated_contactPerson[index]) 
    //   }
    // }
    //   // console.log(folder)
    // },
 

    // }
  },
  setup(props, { emit }) {

    const composeData = ref({})
    const showCcField = ref(false)
    const showBccField = ref(false)

    const message = ref(props);
    composeData.value = {
      message: '',
      cc: '',
      bcc: '',
      subject: '',
      from: '',
      to: []
    };
    console.log(message);
    composeData.value.message = message
    // composeData.value.to = props.emailViewData.to_email
    // composeData.value.subject = props.emailViewData.subject
    // composeData.value.cc = props.emailViewData.cc_email
    // composeData.value.bcc = props.emailViewData.bcc_email
    // composeData.value.to = props.emailViewData.to_email



    const editorOption = {
      modules: {
        toolbar: '#quill-toolbar2',
      },
      placeholder: 'Message',
    }
    // const all = computed(() => {
    //   return JSON.parse(JSON.stringify(store.state.emails.all_outbound_emails));
    // });
    // console.log(all.value);

    // store.dispatch('contactPeople/fetch');
    // store.dispatch('emails/fetch_all_out_mails');
    /* eslint-disable global-require */

    const emailToOptions = computed(() => {
      return JSON.parse(JSON.stringify(store.state.contactPeople.all))
    })
    const length_emailToOptions = computed(() => {
      return JSON.parse(JSON.stringify(store.state.users.all.length))
    })
    const { refFormObserver, getValidationState, resetForm } =
      formValidation(resetForm);
    // const outBoundEmails = computed(() => {
    //   return JSON.parse(JSON.stringify(store.state.emails.all_outbound_emails))
    // })
    var autocompleteItems = [];
    const sizes = ['Small', 'Medium', 'Large', 'Extra Large'];
    // console.log((length_emailToOptions));



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
      emit('update:shall-show-email-reply-modal', false)
    }

    return {

      refFormObserver,
      getValidationState,
      resetForm,
      formValidation,
      composeData,
      editorOption,
      emailToOptions,
      showCcField,
      showBccField,
      message,
      // outBoundEmails,
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
<style>
.vs__open-indicator {
  fill: darkgray !important;
}

#compose-mail {
  /* padding-left: 39px; */
  margin-bottom: 0rem;
}

@media (max-width:576px) {
  #reply_actions{
    display: block!important;
  }
  .to_email_res{
    display: block!important;
  }
  #compose-mail {
    padding-left: 0rem;
  }
}

.email-application .compose-reply .ql-editor {
  min-height: 0rem !important;
}

.v-select .vs__open-indicator {
  display: block !important;
}

.vs__open-indicator {
  fill: darkgray;
}
</style>


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


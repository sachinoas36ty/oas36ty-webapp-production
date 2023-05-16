


<template >
  <div>

    <validation-observer #default="{ handleSubmit }" ref="refFormObserver">
      <b-form class="d-block chat-app-form" style="" @submit.prevent="handleSubmit(sendMessage)">
        <!-- <textarea id="message" v-model="text" @input="handleInput"></textarea>
    <div v-if="showDropdown">
      <ul>
        <li v-for="user in matchingUsers" @click="selectUser(user)">
          {{ user }}
        </li>
      </ul>
      
    </div> -->
    <!-- <div id="commentsMention" placeholder = "Type @ and tag user"></div> -->
                        <!-- <ejs-mention :target='commenttarget' :dataSource='commentsData' :fields='commentsfields'></ejs-mention> -->

   <!-- <input ref="input" v-model="newMessage" @input="handleInput" />  -->
    <Mentionable ref="mention" style="width: 100%;" :keys="['@', '#']" :items="users_to_assign" offset="6" insert-space
          @open="onOpen" @apply="onApply" :highlight-class="'mention'"
          @selected="onMentionSelected" @removed="onRemove"   @keydown="onKeyDown"
          >

          <!-- <validation-provider #default="validationContext" name="newMessage" vid="comment" rules="required"> -->
            <div class="input-group-merge my-custom-select" @input="checkValid2" style="margin-left: -1rem;" >
              <!-- <textarea style="padding-bottom:2px;" class="form-control" v-model="newMessage" >{{ newMessage }}</textarea> -->
              <!-- <highlightable-input  id="input-node"
              style="border:1px solid;max-height: 4rem;overflow-y: auto;width:51rem;padding-top: 2px;"
  :highlight-enabled="true" 
  :highlight="users_to_assign" 
  v-model="newMessage"
  
/> -->
              <b-form-input  id="comment"  v-model="newMessage" 
                :placeholder="'Enter your message'" />
                
              </div>
              <b-form-invalid-feedback  class="d-block " >
                {{ errors.comment != "" ? errors.comment : '' }}
              </b-form-invalid-feedback>
          <!-- </validation-provider> -->
          <template #no-result>
            <div class="dim">
              No result
            </div>
          </template>

          <template #item-@="{ item }">
            <div class="user">
              <b-avatar :src="item.avatar">

              </b-avatar>
              <span class="ml-1">
                {{ item.value }}
              </span>
              <!-- ({{ item.name }}) -->
            </div>
          </template>

          <!-- <template #item-#="{ item }">
      <div class="issue">
        <span class="number">
          #{{ item.value }}
        </span>
        <span class="dim">
          {{ item.name }}
        </span>
      </div>
    </template> -->
        </Mentionable>	
  
        <div class="d-flex justify-content-between pt-1">

          <div class="text-left " style="margin-left:-1rem;"   >
            <!-- <div class="custom-backdrop" @click="closeDropdown"></div> -->
            <b-dropdown id="dropdown-1" size="sm" variant="primary" >
              <template #button-content>
                Attachments
              </template>
              <!-- <b-dropdown-form > -->
              <div style="padding:0.5rem">

                <div class="border-l " style="">
                  <div class="d-flex flex-column ">
                    <div class="d-flex justify-content-between align-items-center p-1 border-bottom-light bg-light">
                      <div >Attachment(s)</div>
                      <div v-if="$store.state.tasks.isAttachment || spinnerYT" class="b-overlay position-absolute"
              style="inset: 0px;z-index: 10;/* display: none; */">
              <div class="position-absolute bg-white rounded-sm"
                style="inset: 0px; opacity: 0.75; backdrop-filter: blur(0px);"></div>
              <div class="position-absolute" style="top: 50%; left: 50%; transform: translateX(-50%) translateY(-50%);">
                <span aria-hidden="true" class="spinner-border text-primary"> <!----></span>
                <br><span style="margin-left:-2rem;">Processing..</span>
              </div>
            </div>
                      <div class="pl-3">
                        <input type="file" ref="file_task" @change="uploadFile" multiple style="display: none" />
                        <b-dropdown id="dropdown-2" @click="handleHide($event)"  size="sm"  variant="primary" >
                          <template #button-content>
                            <span class="text-capitalize">
                              
                              Choose File(s)
                            </span>
                            
                          </template>

                          <b-dropdown-item @click="$refs.file_task.click()"><img class="mr-1"
                              :src="browseIcon"
                              width="25px">Browse</b-dropdown-item>
                              <b-dropdown-item><img class="mr-1"
                                :src="excelIcon"
                                width="25px" data-type="1">Google Sheets</b-dropdown-item>
                                <b-dropdown-item><img class="mr-1"
                                  :src="wordIcon"
                                  width="25px" data-type="2">Google Docs</b-dropdown-item>
                                  
                            </b-dropdown>
                          <!-- </div> -->

                      </div>
                    </div>
                  </div>
                  <div class="p-1">
                    <!-- {{ fileLinks }} -->
                    <div class="d-flex justify-content-center" v-if=" attachmentLoading ">
                                <b-spinner variant="primary" />
                              </div>
                    <div v-if="fileLinks.filter(e => e.type === 'comments').length > 0">
                      <div v-for="(file, index) in fileLinks.filter(e => e.type === 'comments')" :key="index" class="d-flex justify-content-between">
                        {{ file.fileName.length > 35 ? file.fileName.substr(0, 25) : file.fileName }}
                      <feather-icon icon="XIcon" class="cursor-pointer"
                          @click="removes3(file.url, index)" /></div>
                    </div>
                    <div v-else class="d-flex justify-content-center align-items-center">No file(s) selected
                    </div>
                    <div class="d-flex justify-content-end">
                                <b-button size="sm" v-if=" fileLinks.filter(e => e.type === 'comments').length > 0 " variant="primary"   @click="
                                  uploadAttach(
                                    
                                    // company_id,
                                    fileLinks.filter(e => e.type === 'comments'),
                                    'task'
                                  )
                                ">Upload</b-button>
                              </div>
                  </div>
                </div>
                <!-- </b-dropdown-form> -->
              </div>

            </b-dropdown>
          </div>

          <div class="text-right">
             <b-button size="sm" class="mr-1 "   @click="closeTask()" variant="primary">
              Close
            </b-button>
            
             <b-button size="sm" v-show="setPrivileges.conversion===true" v-if="$router.currentRoute.name == 'leads' " @click="takeAction()" class="mr-1" variant="primary">
                Convert to task
            </b-button>
            
             <b-button size="sm" v-if="$router.currentRoute.name == 'tasks' || $router.currentRoute.name == 'clients' || $router.currentRoute.name == 'users'"  @click="takeAction()" class="mr-1" variant="primary">
              <span v-if="client.status_master.type == 'completed'">
                Reopen
              </span>
              <span v-if="client.status_master.type != 'completed'">
                Mark as Complete
              </span>
            </b-button>

             <!-- <b-button size="sm" v-if="client.status_master.type != 'completed'" @click="takeAction()" class="mr-1" variant="primary">
              <span >
                Mark as Complete
              </span>
            </b-button> -->

             <b-button size="sm" variant="primary" type="submit">
              Send
            </b-button>
          </div>
        </div>

      </b-form>
    </validation-observer>
    <b-modal no-close-on-backdrop id="second-proposal-modal" ref="second-proposal-modal" size="md"
      title="convert to task" hide-footer>
      <ValidationObserver #default="{ handleSubmit }" ref="refFormObserver">
        <b-form @submit.prevent="handleSubmit(convert_proposal)">

          <b-row>
            <b-col md="12">
              <validation-provider #default="validationContext" name="pclient" vid="client" rules="required">

                <b-form-group label="Client Name">
                  <v-select id="client" v-model="pclient" :options="$store.state.clients.all" label="name"
                    placeholder="Select Client" />
                  <b-form-invalid-feedback v-if="validationContext.errors.length > 0" class="d-flex">
                    <!-- {{ validationContext.errors[0] }} -->
                    The Client field is required
                  </b-form-invalid-feedback>
                </b-form-group>
              </validation-provider>
            </b-col>
          </b-row>

          <b-row>
            <b-col md="12">
              <validation-provider #default="validationContext" name="proposal_amt" vid="value" rules="required">
                <b-form-group label="Value">
                  <!-- <v-select :options="$store.state.clients.all" label="name" placeholder="Select Client" /> -->
                  <b-form-input id="value" v-model="proposal_amt" />
                  <b-form-invalid-feedback class="d-block">
                    {{ validationContext.errors[0] }}
                  </b-form-invalid-feedback>
                </b-form-group>
              </validation-provider>
            </b-col>
          </b-row>
          <div>
             <b-button size="sm" type="submit" variant="primary">
              Convert
            </b-button>
          </div>
        </b-form>
      </ValidationObserver>
    </b-modal>
  </div>
</template>
<!-- <script src="./mention.js"></script> -->
<script>
// var myMention = new Mention({
//     selector: 'textarea',
//     options: ['CSS', 'Script', '.Com']
// })
import HighlightableInput from "vue-highlightable-input"

import { quillEditor } from 'vue-quill-editor'
import 'quill/dist/quill.snow.css'
// eslint-disable-next-line
import 'quill/dist/quill.bubble.css'
import wordIcon from '../../../assets/images/logo/word-icon.png'
import excelIcon from '../../../assets/images/logo/excel-icon.png'
import slideIcon from '../../../assets/images/logo/slide-icon.png'
import browseIcon from '../../../assets/images/logo/browse-icon.png'

import { ValidationProvider, ValidationObserver } from 'vee-validate'
import VueMention from 'vue-mention'
import Vue from 'vue';

Vue.component('vue-mention', VueMention);

import { BDropdownForm, BImg, BMediaAside, BDropdown, BDropdownItem, BRow, BCol, BFormGroup, BModal, BFormInvalidFeedback, BAvatar, BForm, BInputGroup, BFormInput, BButton } from 'bootstrap-vue'
import { Mentionable } from 'vue-mention'
// import Mention from './mention.js'
const users = [
  {
    value: 'akryum',
    firstName: 'Guillaume',
  },
  {
    value: 'posva',
    firstName: 'Eduardo',
  },
  {
    value: 'atinux',
    firstName: 'Sébastien',
  },
]

const issues = [
  {
    value: 123,
    label: 'Error with foo bar',
    searchText: 'foo bar'
  },
  {
    value: 42,
    label: 'Cannot read line',
    searchText: 'foo bar line'
  },
  {
    value: 77,
    label: 'I have a feature suggestion',
    searchText: 'feature'
  }
]
// import 'floating-vue/dist/style.css'
import 'floating-vue/dist/style.css'
import vSelect from 'vue-select'
// import { MentionPlugin } from "@syncfusion/ej2-vue-dropdowns";
// Vue.use(MentionPlugin)
// import * as data from './';

import Pusher from 'pusher-js'
import formValidation from '@/@core/comp-functions/forms/form-validation'

export default {
  components: {
    BForm, ValidationObserver, ValidationProvider, BImg, BMediaAside, BDropdownForm,
    Mentionable, BModal, BRow, BCol, BFormGroup,
    BInputGroup, BFormInvalidFeedback,HighlightableInput,
    BFormInput, vSelect, BDropdown, BDropdownItem,
    BAvatar,VueMention, quillEditor,
    BButton
  },
  props: {
    user: {
      type: String,
      required: true,
    },
    client: {
      type: Object,
      required: true,
    },
    reply:{
      type:String,
      required:true
    },
    setPrivileges: {
      type: Object,
      required: true,
    }
  },
  data() {
    return {
      spinnerYT:false,
      isCloseable: false,

      commenttarget : '#commentsMention',
          commentsfields : { text: 'Name' },
          commentsData : [
          { Name: "Selma Rose", "Eimg": "styles/images/Employees/3.png", "EmailId": "selma@gmail.com" }, 
        { Name: "Russo Kay", "Eimg": "styles/images/Employees/8.png", "EmailId": "russo@gmail.com" },
        { Name: "Camden Kate", "Eimg": "styles/images/Employees/9.png", "EmailId": "camden@gmail.com" },
        { Name: "Mary Kate", "Eimg": "styles/images/Employees/4.png", "EmailId": "marry@gmail.com" }, 
        { Name: "Ursula Ann", "Eimg": "styles/images/Employees/2.png", "EmailId": "ursula@gmail.com" },
        { Name: "Margaret", "Eimg": "styles/images/Employees/5.png", "EmailId": "margaret@gmail.com" }, 
        { Name: "Laura Grace", "Eimg": "styles/images/Employees/6.png", "EmailId": "laura@gmail.com" },
        { Name: "Robert", "Eimg": "styles/images/Employees/8.png", "EmailId": "robert@gmail.com" }, 
        { Name: "Albert", "Eimg": "styles/images/Employees/9.png", "EmailId": "albert@gmail.com" },
        { Name: "Michale", "Eimg": "styles/images/Employees/10.png", "EmailId": "michale@gmail.com" }, 
        { Name: "Andrew James", "Eimg": "styles/images/Employees/7.png", "EmailId": "james@gmail.com" },
        { Name: "Rosalie", "Eimg": "styles/images/Employees/4.png", "EmailId": "rosalie@gmail.com" }, 
        { Name: "Stella Ruth", "Eimg": "styles/images/Employees/2.png", "EmailId": "stella@gmail.com" },
        { Name: "Richard Rose", "Eimg": "styles/images/Employees/10.png", "EmailId": "richard@gmail.com" }, 
        { Name: "Gabrielle", "Eimg": "styles/images/Employees/3.png", "EmailId": "gabrielle@gmail.com" },
        { Name: "Thomas", "Eimg": "styles/images/Employees/7.png", "EmailId": "thomas@gmail.com" }, 
        { Name: "Charles Danny", "Eimg": "styles/images/Employees/8.png", "EmailId": "charles@gmail.com" },
        { Name: "Daniel", "Eimg": "styles/images/Employees/10.png", "EmailId": "daniel@gmail.com" }, 
        { Name: "Matthew", "Eimg": "styles/images/Employees/7.png", "EmailId": "matthew@gmail.com" },
        { Name: "Donald Krish", "Eimg": "styles/images/Employees/9.png", "EmailId": "donald@gmail.com" },
        { Name: "Yohana", "Eimg": "styles/images/Employees/1.png", "EmailId": "yohana@gmail.com" },
        { Name: "Kevin Paul", "Eimg": "styles/images/Employees/10.png", "EmailId": "kevin@gmail.com" }
 
          ],
      highlight: [
        {text:'chicken', style:"background-color:#f37373"},
        {text:'noodle', style:"background-color:#fca88f"},
        {text:'soup', style:"background-color:#bbe4cb"},
        {text:'so', style:"background-color:#fff05e"},
        "whatever",
        {start: 2, end: 5, style:"background-color:#f330ff"}
      ],
      text: '',
      
      highlightWord:'example',
      showDropdown: false,
      suggestions: ['Alice', 'Bob', 'Charlie'],
      selected:null,
      users: ['Alice', 'Bob', 'Charlie'],
      matchingUsers: [],
      isCloseable: false,
      errors:{
        comment:""
      },
      error:"",
      wordIcon:wordIcon,
      magic_flag:false,
      slideIcon:slideIcon,
      excelIcon:excelIcon,
      browseIcon:browseIcon,
      isDropdown2Visible: false,
      attach: false,
      proposal_amt: 0,
      file_name: [],
      file: null,
      previewImage: null,
      pclient: this.client.company != null ? this.client.company : '',
      mentions: [{
        dataSource: [],
        searchExpr: 'text',
        displayExpr: 'text',
        valueExpr: 'text',
      }],
      pusher: null,
      channel: null,
      newMessage: '',
      search: '',
      limit_users: 4,
      offset_users: 0,
      items: [],
      comment_mentions: [],
      fileArray: []
    }
  },
  computed: {
    attachmentLoading() {
      let data = this.$store.state.attachments.isLoading;
      return data;
    },
    abc(){
     return this.$store.state.expandedTaskId; 
    },
    fileLinks() {
      return  this.$store.state.attachments.links;
      // return data
    },
    users_to_assign() {
      var items = this.$store.state.users.all.filter(e => e.email !== JSON.parse(localStorage.getItem('userData')).email);
      var data = [];
      var leads = this.$store.state.leads.all.filter(e => e.type === 'lead');
      var user_assigned = []


      // return user_assigned;
      for (let index = 0; index < items.length; index++) {
        // for (let i = 0; i < leads.length; i++) {
        // for (let j = 0; j < leads[i].users.length; j++) {
        //  user_assigned[j] = {
        //     id: leads[i].users[j].id,
        //     name: leads[i].users[j].name,
        //     avatar: leads[i].users[j].avatar,

        //  }
        // user_assigned = leads[i]
        // }

        data[index] = {
          id: items[index].id,
          value: items[index].name,
          email:items[index].email,
          name: items[index].name,
          style: "background-color:#f75949",
          text:items[index].name,
          avatar: items[index].avatar
        }
        // if(leads[i].users[j].id === items[index].id){
        //   console.log('already assigned');
        // }


        // }
        // }
      }
      this.items = data
      console.log(this.items);
      return data.filter((country) => country.name.toLocaleLowerCase().includes(this.search.toLocaleLowerCase()));
    },
    paginated_users_to_assign() {
      // this.users_to_assign.slice(this.offset_users, this.limit_users + this.offset_users)

      return this.users_to_assign.slice(this.offset_users, this.limit_users + this.offset_users)
    },
  },
  created() {
//     $('.my-textarea').highlightWithinTextarea({
//     highlight: 'whatever' // string, regexp, array, function, or custom object
// });
// $('.my-textarea').highlightWithinTextarea('update');
    // const inputNode=  document.getElementById('input-node')
    // inputNode.addEventListener("keydown", this.onKeyDown);


    // this.$refs['mention']['mentionInput'].addEventListener('keydown', this.onKeyDown);

    this.$root.$on('bv::dropdown::show', bvEvent => {
      if (bvEvent.componentId === 'dropdown-1') {
        this.isDropdown2Visible = true;
      }
    })
    this.$root.$on('bv::dropdown::hide', bvEvent => {
      if (bvEvent.componentId === 'dropdown-2') {
        this.isDropdown2Visible = false;
      }
      if (this.isDropdown2Visible) {
        bvEvent.preventDefault()
      }
    })
  },
  beforeUpdate() {
   
  },
  watch: {
    newMessage(newValue) {
      this.highlightText(newValue);
    },
    onKeyDown(event){
      if(event.shiftKey && event.keyCode === 13){
        event.preventDefault();
        // this.$refs['mention'].hide();

        // document.querySelector(".v-popper__popper").classList.add("d-none")
      }
    },
  },
  methods: {
    

    onKeyDown(event){
      if(event.shiftKey && event.keyCode === 13){
        event.preventDefault();
        // this.$refs['mention'].hide();

        // document.querySelector(".v-popper__popper").classList.add("d-none")
      }
    },
    onRemove(value){
      alert(value)
    },
    handleInput() {
      // this.highlightText();
      this.$emit('input', this.newMessage);
      return;

      const regex = /@(\w+)/g;
      const matches = this.text.match(regex);
      if (matches) {
        const name = matches[matches.length - 1].slice(1);
        this.matchingUsers = this.users.filter(user => user.toLowerCase().startsWith(name.toLowerCase()));
        this.showDropdown = true;
      } else {
        this.matchingUsers = [];
        this.showDropdown = false;
      }
    },
    highlightText(value) {
      value = value.replace(/(<([^>]+)>)/gi, "")
      // alert()
      const quill = document.getElementById('input-message')//this.$refs['quillEditor']['quill'];
      const index = value.lastIndexOf(this.highlightWord);
      
      if (index !== -1) {
        quill.setSelection(index, index + this.highlightWord.length);
        quill.format('background', 'yellow');
        setTimeout(() => {
          quill.format('background', false);
        }, 1000);
      }
        return;
      // const input = this.$refs['input'];
      // const selectionStart = input.selectionStart;
      // const selectionEnd = input.selectionEnd;
      // const highlightedText = this.newMessage.slice(selectionStart, selectionEnd);
      // input.style.background = 'yellow';
      // setTimeout(() => {
      //   input.style.background = '';
      // }, 1000);
    },
    selectUser(user) {
      const regex = /@(\w+)/g;
      const matches = this.text.match(regex);
      if (matches) {
        const name = matches[matches.length - 1];
        this.text = this.text.replace(name, `<span class="highlight">@${user}</span>`);
      }
      this.matchingUsers = [];
      this.showDropdown = false;
    },
    uploadAttach( links,type) {
      this.spinnerY = true
      let id = this.$store.state.leads.expandedTaskId;
      let data = {
        attachment: [],
        type: type,
        // company_id: c_id,
        task_id: id,
      };
      links.forEach((x) => {
        data.attachment.push({
          attachment_url: x.url,
          file_name: x.fileName
        });
      });
      console.log(data);
      this.dropTask = false;
      this.dropClient = false;
      this.$store.dispatch("attachments/store", data).then(() => {
        this.$store.dispatch('tasks/getAttachments', id)
        this.spinnerY = false
        
        this.file_name = [];
        this.$store.state.attachments.links = [];
        this.$toast.success(' Successfully Uploaded!', {
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
        console.log(data);
      });
    },
    onMentionSelected(user){
      if (!this.comment_mentions.some(u => u.id === user.id)) {
        // this.selectedUsers.push(user)
        this.comment_mentions.push({ name: user.name, id: user.id })
      }
    },
    closeDropdown() {
      this.$refs.dropdown.hide();
    },
    onClickOutside(event) {
      const dropdown = this.$refs.dropdown.$el;
      const target = event.target;
      if (!dropdown.contains(target)) {
        this.$refs.dropdown.hide();
      }
    },
    uploadFile(event) {
      // implementation
    },
    removes3(url, index) {
      // implementation
    },
  
    checkValid2(){
      if(this.newMessage != ""){
        this.errors.comment  = ""
      }
    },


    
    removes3(file, i) {
      console.log('bbbb')
      let index = this.$store.state.attachments.links.findIndex(e => e.url === file);
      var data = {
        attach_url: file ?? "null",
      };
      this.$store.dispatch('attachments/remove', { data: data }).then(() => {

        this.$store.state.attachments.links.splice(index, 1)
        this.file_name.splice(i, 1)

      })
    },
    async uploadFile(e) {
      this.spinnerYT = true
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
       type:'comments'
       }));

       let tempFile = mappedFiles
       let readyUpload = []

tempFile.forEach((obj2)=>{
  const exists = this.file_name.some(obj1=>obj1.name === obj2.name);
  if(!exists){
    console.log("not duplicate")
    // obj2.type ='attachmentsType';
    this.file_name.push(obj2);
    readyUpload.push(obj2);
  }
})

    console.log(mappedFiles); 
    this.uploadFileS3(readyUpload)
    this.spinnerYT = false

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

    uploadFileS3(file) {
      let data = {
        attach: file ? file : "null",
      };
      this.$store.dispatch('attachments/add', { data: data }).then(() => {

        resolve();

      }).catch(() => {


      })
    },
    convert_proposal() {
      const date = new Date();

      let day = date.getDate();
      let month = date.getMonth() + 1;
      let year = date.getFullYear();
      const data = {
        task_id: this.client.id,
        proposal_date: `${year}-${month}-${day}`,
        client_name: this.pclient.name,//this.client.company != null ? this.client.company.name : this.pclient.name,
        concerned_person: this.client.contact_person.name,
        address: this.client.branch.name,
        subject: this.client.subject,
        prephase: "As per discussion, please find below the brief proposal",
        footer_title: "Thanking you,",
        footer_description: JSON.parse(localStorage.getItem('userData')).name + "<br/>For, " + JSON.parse(localStorage.getItem('userData')).tenant.organization.name + "<br/><br/>P:<br/>GSTIN:<br/>(Authorised Representative)",
        internal_notes: "Thanking you",
        proposalSection: [],
        proposalFees: [{
          description: this.client.subject,
          amount: this.proposal_amt
        }],
        type: 'task',
        company_id: this.pclient ? this.pclient.id:null//this.client.company != null ? this.client.company.id : this.pclient.id
      }
      console.log(data);
      this.$store.dispatch('proposals/create', data).then(() => {
        this.sendMessage();
        console.log("inside the create");
        this.$store.dispatch('leads/fetch');
        this.$toast.success("Converted Successfully", {
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

      })
    },
    closeTask() {
      if(this.newMessage == "" || this.newMessage == null){
        this.errors.comment = "This field is required"
        return;
      
      } else {
        // alert('close task');
        const data = {
          task_id: this.client.id,
          status: {
            id: 4,
            type: 'closed'
          }
        };
        this.$store.dispatch('leads/markTask', data).then(() => {
          this.sendMessage()
          this.$store.dispatch('leads/fetch')

        })
      }
    },
    takeAction() {
      if(this.newMessage == "" || this.newMessage == null){
        this.errors.comment = "This field is required"
        return;
      }
      if (this.client.status_master.type == 'completed') {
        
        const data = {
          task_id: this.client.id,
          status: {
            id: 1,
            type: 'open'
          }
        };
        this.$store.dispatch('leads/markTask', data).then(() => {
          this.sendMessage()
          this.$store.dispatch('leads/fetch')
         

        })
        return;
      }
      // if (!this.newMessage) {

      //   console.log(this.refFormObserver['fields'],"jjjjjjjjjjjjjj")
      //   this.refFormObserver['errors'].comment.push('the newmessage field is required')
      //   this.refFormObserver['fields']['comment'].failed = true
      //   this.refFormObserver['fields']['comment'].failedRules.required = 'the newmessage field is required'
      //   this.refFormObserver['fields']['comment'].validated = true
      //   return;
      // }
     

      
      else {

        if (this.$router.currentRoute.name == 'leads') {
          // open modal to create proposal
          this.$refs['second-proposal-modal'].show()
        } else {
          // open modal to mark as complete task
          if (this.client.status_master.type != 'completed') {


            const data = {
              task_id: this.client.id,
              status: {
                id: 2,
                type: 'completed'
              }
            };
            this.$store.dispatch('leads/markTask', data).then(() => {
              this.sendMessage()
              this.$store.dispatch('leads/fetch')
              

            })
          }
        }
      }

    },
    onOpen(key) {
      // this.items = key === '@' ? this.mentions[0].dataSource : ""
    },

    onApply(item, key, replacedWith) {
      let count = 0
      this.comment_mentions.forEach(element => {
        if(element.id === item.id){
          count++
        }
      });
      if(count === 0){
        this.comment_mentions.push({ name: item.name, id: item.id })
      }else{

        let index = this.comment_mentions.findIndex(e => e.id === item.id)
        if(index !=-1){
          
          this.comment_mentions.splice(index,count)
        }
        
      }

      console.log(item, `has been replaced with ${replacedWith}`)
    },
    assignMention(user) {
      console.log(user);
      this.newMessage = '@' + user.name
    },
    SearchChange(assignee) {
      // alert(assignee)
      // console.log();
      // console.log(this.search.split('@'));
      if (assignee.includes('@')) {

        this.search = assignee.split('@')[1]
      }
      else if (!assignee.includes('@')) {
        this.search = null
      }
      else {
        this.search = ""
      }
    },
    subscribe_pusher() {
      // this.pusher = new Pusher('2c89bc9e9569378716c0', {
      //   cluster: 'ap2'
      // });
      // this.pusher.connect()
      // this.pusher.connection.bind('connected', (data) => {
      //   console.log('connected');
      // })
      // var that = this;
      // this.channel = this.pusher.subscribe('chat')
      // this.channel.bind('MessageSent', (data) => {
      //   console.log(data);
      //   // that.chatData.push(data[0])
      // })
      // this.pusher.connection.bind('disconnected', (data) => {
      //   console.error('disconneccted');
      // })
      // Pusher.logToConsole = true;
      // var options = new PusherOptions().setMaxReconnectionAttempts(1000000);
      //   var pusher = new Pusher('2c89bc9e9569378716c0', {
      //     cluster: 'ap2',
      //   });
      //   // pusher.signin()
      //   // console.log(pusher);
      //   pusher.connect()
      //  console.log(pusher.connection.state)
      //   pusher.subscribe('chat');
      //   pusher.bind('MessageSent', data => {

      //     console.log(data[0]);


      //     this.chatData.push(data[0])
      //   //   // console.log;
      //   });s
      // console.log(pusher);
    },
    sendMessage() {
      if(this.newMessage == "" || this.newMessage == null){
        this.errors.comment = "This field is required"
        return;
      }
      if (this.attach === true) {
        let msg = this.newMessage
        this.newMessage = `<p>${msg}</p>`
        this.fileArray.forEach(x => {
          // this.newMessage = this.newMessage + `<a href="${x.url}" target="_blank" class="ml-1" style="text-transform:none;">${x.fileName}</a>`
        })
      }
      // let mentions = this.newMessage.split('@')[1];
      // let index = this.comment_mentions.findIndex(e => e.name !==  mentions.trim());
      // if(this.comment_mentions.length > 1){

      //   this.comment_mentions.splice(index,1)
      // }
      // let new_arr = []
    Pusher.logToConsole = true
      
      const pusher = new Pusher('2c89bc9e9569378716c0 ',{
  cluster:'ap2',
  // activity_timeout: 300000,
  // encrypted:true

});
      // this.subscribe_pusher()
      const channel = pusher.subscribe('chat')
    channel.bind('MessageSent', (data) => {
      console.log(data);
      // this.chatData.push(data[0])
    })
    // pusher.connect()
      this.$emit('messagesent', {
        user: this.user,
        comment: this.newMessage,//.replace(/@([a-z\d_]+)/ig,''),
        mentions: this.comment_mentions
      });
      this.comment_mentions = []
      this.fileArray = [];
      this.newMessage = ""
      this.attach = false
      this.file_name = [];
      this.$store.state.attachments.links = [];
      // this.newMessage = this.newMessage
  
      //this.$store.state.comments.all.push({comment:this.chatInputMessage})
      //   this.$store.dispatch("comments/store",{comment:this.chatInputMessage})
      //   then(()=>{

      //   });
      // this.items();

      // this.$store.dispatch('comments/fetch', 19)
      /* this.chatData.chat.chat.push({
        message: this.chatInputMessage,
        time: new Date(),
        senderId: 11,
      })*/
      //   this.chatInputMessage = ''

      // Update scroll position
      // Scroll to bottom
      //   this.$nextTick(() => {
      //     this.psToBottom()
      //   })
    },
  },
  setup() {
    const { refFormObserver, getValidationState } =
      formValidation();
    return {
      refFormObserver,
      getValidationState,
      formValidation,
    }
  }
}
</script>
<style scoped>
 #mention-controls .default-size{
        font-size: 15px;
        font-weight: 600;
    }
    #mention-controls #commentsMention {
        min-height: 100px;
        border: 1px solid #D7D7D7;
        border-radius: 4px;
        padding: 8px;
        font-size: 14px;
        width:600px;
    }
    #mention-controls {
        margin: 0 auto;
        width: 600px;
    }
    div#commentsMention[placeholder]:empty:before {
        content: attr(placeholder);
        color: #555;
    }
    #mention-controls .e-input-group, #mention-controls .e-input-group.e-control-wrapper{
        margin-bottom:20px;
    }
    @media screen and (max-width: 1010px) {
        #mention-controls, #mention-controls table{
            width: 100%;
        }
    }
</style>
<style>
.custom-backdrop {
  position: fixed;
  top: 0;
}
.dropdown-menu {
  width: 12rem !important;
}
.mention-item {
  padding: 4px 10px;
  border-radius: 4px;
}

#second-proposal-modal .modal-dialog {
  /* max-width: 630px; */
}

.mention-selected {
  background: rgb(192, 250, 153);
}
.highlight {
  background-color: yellow;
}
.blue {
      background-color: #a3daff;
    }
    
    .pink {
      background-color: #fcc2d7;
    }
</style>
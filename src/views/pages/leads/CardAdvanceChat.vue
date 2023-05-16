<template>
  <div>
    <!-- <search-messages :is-search-messages-active.sync="isSearchMessagesActive" :edit-item.sync="leads" @refetch-data="fetchAll" /> -->

    <div class="b-overlay-wrap position-relative">

    <b-card class="chat-widget" no-body>


      <!-- <b-avatar
      size="34"
      :src="require('@/assets/images/avatars/1.png')"
      class="mr-50 badge-minimal"
      badge
      badge-variant="success"
    />
   <h5 class="mb-0">
      Carrie Hawkins
    </h5>-->
      <div class="d-flex justify-content-between align-items-center">
          <span>
             
          </span>
        <div style="float: right;
              border: 1px solid #e0e0e0;
      border-radius: 5px;
      margin-top: -12px;" class=" actions-box"><span v-b-modal.attachment-modal @click="() => {
        title = 'New Google Document'
      }" title="New Google Document" class="waves-effect action"><img :src="wordIcon" width="25px" data-type="2"></span>
          <span v-b-modal.attachment-excel-modal @click="() => {
            title = 'New Google Spreadsheet'
          }" title="New Google Spreadsheet" class="waves-effect action"><img
              :src="excelIcon"
              width="25px" data-type="1"></span> <span title="Browse" class="waves-effect action"><img
              :src="browseIcon"
              width="25px"></span>  <span v-b-modal.comment-compose-modal @click="setTaskComments()"
            title="Email" class="waves-effect action" style="width: 35px; height: 35px;"><img
              :src="gmailIcon"
              width="25px"></span> </div>
      </div>

      <!-- <b-card-header style="border-bottom: 2px solid #ebe9f1;">
        <div class="d-flex align-items-center">
          <b-avatar-group size="32px">
            <b-avatar v-for="user in assignedUsers.users"
            :key="user.name"
        v-b-tooltip.hover
        class="pull-up"
        :title="user.name"
        :src="user.avatar"
      />

          </b-avatar-group>
        </div>
        <div class="d-flex align-items-center justify-content-end">
        
        <feather-icon
          id="iconSearch"
          icon="SearchIcon"
          @click="$emit('update:is-search-messages-active', true);"
          size="18"
          class="cursor-pointer mr-1"
        />
        

      
        
        
        
      </div>
      
    </b-card-header> -->


      <!-- <b-form-input id="searchBar" class="d-none"> -->

      <!-- </b-form-input> -->

      <section class="chat-app-window">
        <!-- User Chat Area -->
        <vue-perfect-scrollbar id="chat-app" ref="refChatLogPS" :settings="perfectScrollbarSettings"
          class="user-chats scroll-area" style="padding-top: 2rem;background-color: #fff!important;">

          <chat-log :reply="message_reply" @update:value="updateValue" :chat-data="comments"
            :profile-user-avatar="require('@/assets/images/avatars/10.png')" />
        </vue-perfect-scrollbar>

        <!-- Message Input -->
        <chat-form-vue v-if="client.status_master.type != 'closed'" :setPrivileges="setPrivileges" :reply="message_reply" :client="client"
          v-on:messagesent="sendMessage" :user="user" />
      </section>
      <!-- <portal to="content-renderer-sidebar-left">
        <todo-left-sidebar
          :task-tags="leads"
          :is-edit-sidebar-active.sync="isEditSidebarActive"
          :class="{'show': mqShallShowLeftSidebar}"
          @close-left-sidebar="mqShallShowLeftSidebar = false"
        />
      </portal>
       -->
    </b-card>
    <div v-if="$store.state.comments.isLoading" class="b-overlay position-absolute"
              style="inset: 0px;z-index: 10;/* display: none; */">
              <div class="position-absolute bg-white rounded-sm"
                style="inset: 0px; opacity: 0.75; backdrop-filter: blur(0px);"></div>
              <div class="position-absolute" style="top: 50%; left: 50%; transform: translateX(-50%) translateY(-50%);">
                <span aria-hidden="true" class="spinner-border text-primary"> <!----></span>
                <br><span style="margin-left:-2rem;">Processing..</span>
              </div>
            </div>
            </div>
    <b-modal no-close-on-backdrop id="comment-compose-modal" ref="comment-compose-modal" size="lg" hide-footer>
      <template #modal-title>
        Compose Email
      </template>
      <!-- <b-form> -->

      <b-row v-if="commentCompose.task_desc.text">
        <b-col md="12">
          <div data-v-22d84313="" class="list-group">
            <div data-v-22d84313="" class="list-group-item bg-shaded-grey">
              Task Description
            </div>
            <div data-v-22d84313="" class="list-group-item">
              <div data-v-22d84313="" class="demo-checkbox d-flex align-items-baseline"><input data-v-22d84313=""
                  type="checkbox" id="md_checkbox_task_description" v-model="commentCompose.task_desc.check"
                  class="filled-in chk-col-theme" :value="commentCompose.task_desc.text">
                <label data-v-22d84313="" for="md_checkbox_task_description" class="ml-1"
                  style="overflow:hidden;color: #777!important;">{{ commentCompose.task_desc.text != null?commentCompose.task_desc.text.replace(/(<([^>]+)>)/gi, '') : '' }}</label>
              </div>
            </div>
          </div>
        </b-col>
      </b-row>
      <b-row :class="{'mt-4':commentCompose.task_desc.text}">
        <b-col md="12">
          <div data-v-22d84313="" class="list-group">
            <div data-v-22d84313="" class="list-group-item bg-shaded-grey">
              Task Comment(s)
            </div>
            <!-- <chat-log :chat-data="comments" :profile-user-avatar="require('@/assets/images/avatars/10.png')"  /> -->
            <div data-v-22d84313="" class="text-center list-group-item chat-history">
              <div style="max-height: 260px;
      overflow-y: auto;
      overflow-x: hidden;">
                <b-row v-for="(c, index) in commentCompose.task_comments" :id="String(index + 1)" :key="c.comment">
                  <b-col md="1">
                    <input type="checkbox" v-model="c.checked" name="" id="">
                  </b-col>
                  <b-col md="11">
                    <div :class="{ 'float-right': c.user_id == user_id, 'float-left': c.user_id != user_id }">
                      <div :class="{ 'text-left': c.user_id != user_id, 'text-right': c.user_id == user_id }"
                        class=" message-data">
                        <span>
                          <b v-if="c.user_id == user_id">
                            <small style="margin-right: 0.5rem;">{{ timeFormat(c.created_at) }}</small>
                            Me
                            <feather-icon icon="CircleIcon" fill="#2ab27b" stroke="#2ab27b" />
                          </b>
                          <b v-else>
                            <feather-icon icon="CircleIcon" fill="#2ab27b" stroke="#2ab27b" />
                            {{ c.user.email }}
                            <small style="margin-right: 0.5rem;">{{ timeFormat(c.created_at) }}</small>

                          </b>
                        </span>
                      </div>
                      <div :class="{ 'bg-me': c.user_id == user_id, 'bg-other': c.user_id != user_id }" style=";font-size:13px;
                      padding: 5px 15px;
      min-width: 25%;border-radius: 7px;
      /* max-width: -webkit-max-content!important; */
      /* max-width: -moz-max-content!important; */
      max-width: max-content!important;
      margin-bottom: 10px;
      overflow:auto;
      width: auto!important;" class="message my-message text-left">
                        <div style="max-width: 400px;" v-html="showComment(c)">

                        </div>
                        <!-- {{ }} -->
                        <span style="color:red;" v-if="textLength == 'false' && c.comment.length > 100"
                          @click="textLength = 'true'" class="cursor-pointer"> ... Read
                          more</span>
                        <span class="cursor-pointer mt-1" style="color:red;"
                          v-if="textLength == 'true' && c.comment.length > 100" @click="textLength = 'false'"> ... Read
                          less</span>
                      </div>
                    </div>
                  </b-col>
                </b-row>

              </div>
            </div>
          </div>
        </b-col>
      </b-row>
      <b-row class="mt-4">
        <b-col md="6">
          <div data-v-22d84313="" class="list-group">
            <div  data-v-22d84313="" class="list-group-item bg-shaded-grey">
              Task Attachment(s)
            </div>
            <div v-if="taskAttachments.filter(e => e.type === 'task').length > 0" data-v-22d84313="" class="list-group-item text-center col-grey">
              <b-row v-for="p in taskAttachments.filter(e => e.type === 'task')" :key="String(Number(p.id+1))">
                <b-col md="12">
                  <div class="float-left">
                    <input type="checkbox" @click="setEmailAttach()" v-model="p.checked" name="" id="">
                    <label style="margin-left:0.5rem;" for="
                      ">
                      {{ p.original_name }}


                    </label>
                  </div>
                </b-col>
              </b-row>
            </div>
            <div v-if="taskAttachments.filter(e => e.type === 'task').length === 0" data-v-22d84313="" class="list-group-item text-center col-grey">
              No Attachment(s) available
            </div>
          </div>
        </b-col>
        <b-col md="6">
          <div data-v-22d84313="" class="list-group">
            <div data-v-22d84313="" class="list-group-item bg-shaded-grey">
              Client Attachment(s)
            </div>
            <div v-if="taskAttachments.filter(e => e.type === 'company').length === 0" data-v-22d84313="" class="list-group-item text-center col-grey">
              No Attachment(s) available
            </div>
            <div v-if="taskAttachments.filter(e => e.type === 'company').length > 0" data-v-22d84313="" class="list-group-item text-center col-grey">

            <b-row v-for="p in taskAttachments.filter(e => e.type === 'company')" :key="String(Number(p.id+1))">
                <b-col md="12">
                  <div class="float-left">
                    <input type="checkbox" @click="setEmailAttach()" v-model="p.checked" name="" id="">
                    <label style="margin-left:0.5rem;" for="
                      ">
                      {{ p.original_name }}


                    </label>
                  </div>
                </b-col>
              </b-row>
</div>
          </div>
        </b-col>
      </b-row>
      <b-row class=" mt-4">
        <b-col md="6" class="d-none">
          <div data-v-22d84313="" class="list-group">
            <div data-v-22d84313="" class="list-group-item bg-shaded-grey">
              Task Proposals(s)
            </div>
            <div v-if="$store.state.proposals.allProposals.length === 0" data-v-22d84313="" class="list-group-item bg-shaded-grey">
              No Proposal(s) available
            </div>
            <div data-v-22d84313="" v-if="$store.state.proposals.allProposals.length > 0" class="list-group-item text-center col-grey" style="    max-height: 160px;
      overflow: hidden auto;">
              <!-- No proposal(s) available -->
              <b-row v-for="p in $store.state.proposals.allProposals" :key="String(p.id)">
                <b-col md="12">
                  <div class="float-left">
                    <input type="checkbox" name="" id="">
                    <label style="margin-left:0.5rem;" for="
                      ">
                      {{ getPL(p.created_at, p.id) }}


                    </label>
                  </div>
                </b-col>
              </b-row>

            </div>
          
          </div>
        </b-col>
        <b-col md="6" class="d-none">
          <div data-v-22d84313="" class="list-group">
            <div data-v-22d84313="" class="list-group-item bg-shaded-grey">
              Task Invoice(s)
            </div>
            <div data-v-22d84313="" v-if="$store.state.invoice.all.length > 0" class="list-group-item text-center col-grey" style="    max-height: 160px;
      overflow: hidden auto;">
              <!-- No proposal(s) available -->
              <b-row v-for="i in $store.state.invoice.all" :key="String(i.id)">
                <b-col md="12">
                  <div class="float-left">
                    <input type="checkbox" name="" id="">
                    <label style="display:inline-grid;margin-left:0.5rem;" for="
                      ">
                      <!-- {{ getPL(p.created_at,p.id) }} -->
                      <span class="text-left">
                        {{ i.invoice_number }}
                      </span>
                      <!-- <br>  -->
                      <span>Due(
                        <font-awesome-icon icon="indian-rupee-sign" class="icon cursor-pointer" />
                        ): {{ i.total_amt }}
                        <b-badge variant="primary">
                          Due({{ DaysLeft(i.created_at, i.due_date) }})
                        </b-badge>
                      </span>


                    </label>
                    <!-- <br> -->

                  </div>
                </b-col>
              </b-row>
            </div>
            <div data-v-22d84313="" v-if="$store.state.invoice.all.length === 0" class="list-group-item text-center col-grey" style="    max-height: 160px;
      overflow: hidden auto;">
      No Invoice(s) available
      </div>
          </div>
        </b-col>
      </b-row>
      <b-row class="mt-4">
        <b-col md="6" class="d-none">
          <div data-v-22d84313="" class="list-group">
            <div data-v-22d84313="" class="list-group-item bg-shaded-grey">
              Task Payment(s)
            </div>
            <div data-v-22d84313="" class="list-group-item text-center col-grey">
              <span v-if="$store.state.recordPayment.all.length === 0">
                No Payment(s) available

              </span>
              <b-row v-for="payment in $store.state.recordPayment.all" :key="String(payment.id)">
                <b-col md="12">
                  <div class="float-left">
                    <input type="checkbox" name="" id="" />
                    <label style="margin-left:0.5rem;" for="
                      ">
                      Payment Number - {{ payment.id }}
                    </label>
                  </div>
                </b-col>
              </b-row>
            </div>
          </div>
        </b-col>
      </b-row>
      <div class="text-right">
         <b-button size="sm" class="mr-1" @click="$refs['comment-compose-modal'].hide()" variant="primary">Cancel</b-button>
         <b-button size="sm" @click="() => {
          $refs['comment-compose-modal'].hide()
          replyModal()
        }" variant="primary">Next</b-button>
      </div>
      <!-- </b-form> -->
    </b-modal>
    <b-modal no-close-on-backdrop id="reply-comment-modal" ref="reply-comment-modal" size="lg" :title="replySubject"
      hide-footer>
      <b-form @submit.prevent="sendEmail()">

      <b-row>
        <b-col md="3">
          <b-form-group label="From">

            <v-select v-model="composeData.from" :options="outBoundEmails" label="email"
              placeholder="Select From">
              <template #option="item">
                {{ item.email }}
              </template>
              <template #selected-option="item">
                <span v-b-tooltip.bottom="item.email">

                  {{ item.email.substr(0,35) }}
                </span>
              </template></v-select>
          </b-form-group>

        </b-col>
        <b-col md="3">
          <b-form-group label="To">

            <v-select multiple v-model="composeData.to" :options="emails_contact" placeholder="Select To">
              <template #option="item">
                {{ item.label }}
              </template>
              <template #selected-option="item">
                <span v-b-tooltip.bottom="item.label">

                  {{ item.label.substr(0,35) }}
                </span>
              </template>
            </v-select>
          </b-form-group>

        </b-col>
        <b-col md="3">
          <b-form-group label="Cc">

            <v-select multiple v-model="composeData.cc" :options="emails_contact" placeholder="Select Cc">
              <template #option="item">
                {{ item.label }}
              </template>
              <template #selected-option="item">
                <span v-b-tooltip.bottom="item.label">

                  {{ item.label.substr(0,35) }}
                </span>
              </template></v-select>
          </b-form-group>

        </b-col>
        <b-col md="3">
          <b-form-group label="Bcc">

            <v-select multiple v-model="composeData.bcc" :options="emails_contact" placeholder="Select Bcc">
              <template #option="item">
                {{ item.label }}
              </template>
              <template #selected-option="item">
                <span v-b-tooltip.bottom="item.label">

                  {{ item.label.substr(0,35) }}
                </span>
              </template></v-select>
          </b-form-group>

        </b-col>
      </b-row>
      <b-row>
        <b-col md="12">
          <b-form-group label="Body">
            <quill-editor v-model="composeData.message" :options="editorOption"></quill-editor>

          </b-form-group>
        </b-col>
      </b-row>
      <b-row>
        <b-col md="6">
          <div class="border-l">
            <div class="d-flex flex-column">
              <div class="d-flex justify-content-between align-items-center p-1 border-bottom-light bg-light">
                <div>Attachment(s)</div>
                <div>
                  <input type="file" id="file-comment" @change="handleUpload" style="display: none" />
                   <b-button size="sm" variant="primary" @click="showFile()" >Choose File(s)</b-button>
                </div>
              </div>
            </div>
            <div class="d-flex justify-content-between align-items-center p-1">
              <div v-if="$store.state.tasks.s3_url.length > 0">
                <div v-for="file,index in $store.state.tasks.s3_url" :key="index" :id="String(Number(index+1))">
                  <!-- <span v-if="file.checked === true"> -->
                    {{ file.fileName }}
                    <feather-icon icon="XCircleIcon" size="20" class="text-right cursor-pointer" @click="removeAttach(index)" />
                  <!-- </span> -->
                  </div>
              </div>
              <div v-else>No file(s) selected</div>
              <b-media-aside class="mr-0">
                <b-img v-if="file !== null && previewImage != null" id="ref_image_base_64" ref="refPreviewEl"
                  v-model="image" :src="previewImage" height="40" width="40" rounded="circle" class=" border border-l" />

              </b-media-aside>
            </div>
          </div>
        </b-col>
        <!-- <b-col md="6">
          <b-form-group label="Proposal">
            <div title="click to view" class="cursor-pointer border-l p-1">
              {{ proposalPdf }}
            </div>
          </b-form-group>
        </b-col> -->
        <b-col md="6">
          <div class="border-l">
            <div class="d-flex flex-column">
              <div class="d-flex justify-content-between align-items-center p-1 border-bottom-light bg-light">
                <div>Task Attachment(s)</div>
                
              </div>
            </div>
            <div class="d-flex justify-content-between align-items-center p-1">
              <div v-if="taskAttachments.filter(e => e.checked === true && e.type==='task').length > 0">
                <span v-for="file,index in taskAttachments.filter(e => e.checked === true && e.type==='task')" :key="file.id" :id="String(Number(file.id+1))">
                  <span v-if="file.checked === true">
                    {{ file.original_name }}
                    <feather-icon icon="XCircleIcon" size="20" class="cursor-pointer" @click="removeAttach2(index)" />
                  </span><br>
                </span>
              </div>
              <div v-else>No file(s) selected</div>
              <b-media-aside class="mr-0">
                <b-img v-if="file !== null && previewImage != null" id="ref_image_base_64" ref="refPreviewEl"
                  v-model="image" :src="previewImage" height="40" width="40" rounded="circle" class=" border border-l" />

              </b-media-aside>
            </div>
          </div>
        </b-col>

      </b-row>
      <b-row class="mt-1">
        <b-col md="6">
          <div class="border-l">
            <div class="d-flex flex-column">
              <div class="d-flex justify-content-between align-items-center p-1 border-bottom-light bg-light">
                <div>Client Attachment(s)</div>
                
              </div>
            </div>
            <div class="d-flex justify-content-between align-items-center p-1">
              <div v-if="taskAttachments.filter(e => e.checked === true && e.type==='company').length > 0">
                <span v-for="file,index in taskAttachments.filter(e => e.checked === true && e.type==='company')" :key="file.id" :id="String(Number(file.id+1))">
                  <span v-if="file.checked === true && file.type=== 'company'">
                    {{ file.original_name }}
                    <feather-icon icon="XCircleIcon" size="20" class="cursor-pointer" @click="removeAttach2(index)" />
                  </span><br>
                </span>
              </div>
              <div v-else>No file(s) selected</div>
              <b-media-aside class="mr-0">
                <b-img v-if="file !== null && previewImage != null" id="ref_image_base_64" ref="refPreviewEl"
                  v-model="image" :src="previewImage" height="40" width="40" rounded="circle" class=" border border-l" />

              </b-media-aside>
            </div>
          </div>
        </b-col>
      </b-row>
      <div class="text-right">
         <b-button size="sm" @click="$refs['reply-comment-modal'].hide()" variant="primary" class="mr-1">
          Cancel
        </b-button>
         <b-button size="sm" type="submit" variant="primary">
          Send
        </b-button>
      </div>
    </b-form>

    </b-modal>
  </div>
</template>

<script>
// document.body.addEventListener('click', fn, true); 

//     $('body').click(function(){
//   console.log('clicked');
// });
import wordIcon from '../../../assets/images/logo/word-icon.png'
import excelIcon from '../../../assets/images/logo/excel-icon.png'
import slideIcon from '../../../assets/images/logo/slide-icon.png'
import browseIcon from '../../../assets/images/logo/browse-icon.png'
import gmailIcon from '../../../assets/images/logo/gmail-icon.png'




import {
  BRow, BFormGroup, BCol, BImg, BMedia, BMediaAside, BModal, BBadge,
  BCard, BCardHeader, BAvatar, BForm, BFormInput, BInputGroup, BButton, BAvatarGroup, VBTooltip
} from 'bootstrap-vue'
import VuePerfectScrollbar from 'vue-perfect-scrollbar'
import ChatLog from './ChatLog.vue'
import SearchMessages from './SearchMessages.vue'
import Echo from 'laravel-echo'
import ChatFormVue from './ChatForm.vue'
import FeatherIcon from '@/@core/components/feather-icon/FeatherIcon.vue'
import TodoLeftSidebar from './TodoLeftSidebar.vue'
import { quillEditor } from 'vue-quill-editor'
import vSelect from 'vue-select'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from "@fortawesome/fontawesome-svg-core";
import { faIndianRupee } from "@fortawesome/free-solid-svg-icons";
library.add(faIndianRupee);



//import ChatLog from '/ChatLog.vue'
//import Vue from 'vue';
import axios from 'axios';
import { ref } from 'vue-demi'
// import e from 'express'
//import VueAxios from 'vue-axios'
//Vue.use(VueAxios,axios)
export default {
  components: {
    BAvatarGroup, BBadge,
    VBTooltip, BModal,
    SearchMessages,
    vSelect,
    BCard,
    BCardHeader,
    BAvatar,
    BRow, BFormGroup, BCol, BImg, BMedia, BMediaAside,
    quillEditor,
    TodoLeftSidebar,
    BForm,
    BFormInput, FontAwesomeIcon,
    BInputGroup,
    BButton,
    // SFC
    ChatLog,
    ChatFormVue,
    // 3rd party
    VuePerfectScrollbar,
    FeatherIcon
  },
  directives: {
    'b-tooltip': VBTooltip,
  },
  // model: {
  //   prop: 'isSearchMessagesActive',
  //   event: 'update:is-search-messages-active',
  // },
  props: {

    replySubject: {
      type: String,
      required: true,
    },
    task_id: {
      type: Number,
      required: true,
    },
    client: {
      type: Object,
      required: true,
    },
    extraComments: {
      type: Array,
      required: true
    },
    setPrivileges: {
      type: Object,
      required: true,
    }
  },
  name: 'leads-comments-card',
  data() {
    return {
      text: '',
      showDropdown: false,
      users: ['Alice', 'Bob', 'Charlie'],
      matchingUsers: [],
      taskAttachments:[],
      emailAttachments:[],
      wordIcon:wordIcon,
      excelIcon:excelIcon,
      browseIcon:browseIcon,
      slideIcon:slideIcon,
      gmailIcon:gmailIcon,
      message_reply: 'hey',
      textLength: 'false',
      user_id: JSON.parse(localStorage.getItem('userData')).id,
      commentCompose: {
        task_desc: { text: '', check: false },
        task_comments: [],
        task_attachments: [],
        client_attachments: [],
        task_proposals: [],
        task_invoices: [],
        invoice_payments: [],

      },
      title: '',
      // replySubject:this.replySubject,
      threadedMail: [],
      perfectScrollbarSettings: {
        maxScrollbarLength: 150,
        wheelPropagation: false,
      },
      chatInputMessage: '',
      chatData: {
        senderId: this.sender ?? 0,
        userId: JSON.parse(localStorage.getItem('userData')).id
        // chat: {
        //   id: 2, userId: 1, unseenMsgs: 0,
        //    chat:
        //    [
        //     { message: "How can we help? We're here for you!", time: 'Mon Dec 10 2018 07:45:00 GMT+0000 (GMT)', senderId: 11 }, { message: 'Hey John, I am looking for the best admin template. Could you please help me to find it out?', time: 'Mon Dec 10 2018 07:45:23 GMT+0000 (GMT)', senderId: 1 }, { message: 'It should be Bootstrap 4 compatible.', time: 'Mon Dec 10 2018 07:45:55 GMT+0000 (GMT)', senderId: 1 }, { message: 'Absolutely!', time: 'Mon Dec 10 2018 07:46:00 GMT+0000 (GMT)', senderId: 11 }, { message: 'Modern admin is the responsive bootstrap 4 admin template.!', time: 'Mon Dec 10 2018 07:46:05 GMT+0000 (GMT)', senderId: 11 }, { message: 'Looks clean and fresh UI.', time: 'Mon Dec 10 2018 07:46:23 GMT+0000 (GMT)', senderId: 1 }, { message: "It's perfect for my next project.", time: 'Mon Dec 10 2018 07:46:33 GMT+0000 (GMT)', senderId: 1 }, { message: 'How can I purchase it?', time: 'Mon Dec 10 2018 07:46:43 GMT+0000 (GMT)', senderId: 1 }, { message: 'Thanks, from ThemeForest.', time: 'Mon Dec 10 2018 07:46:53 GMT+0000 (GMT)', senderId: 11 }, { message: 'I will purchase it for sure. 👍', time: '2020-12-08T13:52:38.013Z', senderId: 1 }],
        // },
        // contact: {
        //   id: 1,
        //   fullName: 'Felecia Rower',
        //   // eslint-disable-next-line global-require
        //   avatar: [require('@/assets/images/avatars/1.png'),
        //   require('@/assets/images/portrait/small/avatar-s-5.jpg'),require('@/assets/images/portrait/small/avatar-s-7.jpg'),require('@/assets/images/portrait/small/avatar-s-20.jpg')],
        //   status: 'away',
        // },
      },
      items: [],
      editorOption: {
        modules: {
          toolbar: [['bold', 'italic', 'underline', 'strike', { 'script': 'sub' }, { 'script': 'super' }], ['clean'], [{ 'color': [] }, { 'background': [] }], [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'align': [] }], ['image'], [{ 'header': [] }, { 'font': [] }, { 'size': [] }], ['link']],
        },
        placeholder: 'Message',
      },
      composeData: {
        message: '',
        to: [],
        cc: [],
        bcc: [],
        from: null
      },
      proposalPdf: 'PL-0009.pdf',
      file_name: [],
      previewImage: null,
      file: null,
      image: null,
      audit_users: null,
    }
  },
  mounted() {


    this.psToBottom()
  },
  // conecting api
  computed: {
    outBoundEmails() {
      return this.$store.state.emails.all_outbound_emails
    },
    emails_contact() {

      // return this.$store.state.contactPeople.allForLeads
      var data = [];
      this.taskAttachments = []
      this.$store.state.tasks.allAttachments.forEach(element => {
        this.taskAttachments.push(element)
      });
      this.taskAttachments.forEach(element => {
        element.checked = false
      });
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
    isLoading() {


      //  this.threadedMail = this.threadedMail[0]
      // this.threadedMail.push({id:message_id})
      return this.$store.state.comments.isLoading;
    },
    successMessage() {
      return this.$store.state.comments.successMessage;
    },
    errorMessage() {
      return this.$store.state.comments.errorMessage;
    },
    errors() {
      return JSON.parse(JSON.stringify(this.$store.state.comments.errors));
    },
    comments() {
      console.log("chatsLog:", this.$store.state.comments.all)

      var arr = this.$store.state.comments.all;
      var all = []
      if (arr.length > 0) {

        var latest_id = arr[arr.length - 1].id + 1;
      }
      var user = null;
      var user_email= null
      var audit_user = null;
      // 
      this.extraComments.forEach(element => {
        this.$store.state.users.all.forEach(e => {

          if (element.from_email == e.email) {

            user = e
          } else {
            user = {
              email: element.from_email,
              name: element.from_name,
              avatar: element.avatar,
              id: latest_id
            }
          }
        });
      });
      this.$store.state.comments.extraComment.forEach(element => {
        this.$store.state.users.all.forEach(e => {

          if (element.from_email == e.email) {

            user_email = e
          } else {
            user_email = {
              email: element.from_email,
              name: element.from_name,
              avatar: element.avatar,
              id: latest_id
            }
          }
        });
      });
      

      var user_id = null;
      console.log(user);
      // if(user.id){
      //   user_id = user.id
      // }
      if (arr.length > 0) {

        arr.forEach(element => {
          if (!element.mail) {

            all.push(element)
          }
        });
      }
      this.extraComments.forEach(element => {
        all.push({

          comment: element.message,
          created_at: element.created_at,
          id: latest_id,
          user: user,
          user_id: user.id

        });
      });
      this.$store.state.comments.extraComment.forEach(element => {
        all.push({

          comment: element.message,
          created_at: element.created_at,
          id: latest_id,
          user: user_email,
          user_id: user_email.id

        });
      });

      var audits = []
      var proposal_audits = []
      var invoice_audits = []
      var subtask_audits = []
      var followUp_audits = []
      var total_audits = []
      audits = this.client.audits;
      this.$store.state.proposals.allProposals.forEach(element => {
        if(element.audits){

          element.audits.forEach(a => {
            proposal_audits.push(a)
            
          });
        }
      });
      this.$store.state.invoice.all.forEach(element => {
        if(element.audits){

        element.audits.forEach(a => {
          invoice_audits.push(a)

        });
      }
      });
      this.$store.state.appTodo.all.forEach(element => {
        if(element.audits){

        element.audits.forEach(a => {
          subtask_audits.push(a)

        });
      }
      });
      this.$store.state.followUp.all.forEach(element => {
        if(element.audits){

        element.audits.forEach(a => {
          followUp_audits.push(a)

        });
      }
      });
      total_audits = audits.concat(proposal_audits, invoice_audits, subtask_audits,followUp_audits)
      console.log(total_audits);
      // audits = 
      total_audits.forEach(element => {

        // this.client.audits.forEach(element => {
        this.$store.state.users.all.forEach(er => {

          if (element.user_id === er.id) {

            // audit_user = JSON.parse(localStorage.getItem('userData'))
            // this.audit_user(element.user_id)
            // this.audit_user = e
            audit_user = er
            // console.log(er);
            // (element.user_id);
          }
          // console.log('helo',element,er);
        });
        // });
        var message = ''
        var type = element.auditable_type
        var desc = ''
        if (element.new_values.subject && element.old_values.subject) {
          desc = desc + '<div><b>Subject: </b>' + element.old_values.subject + ' <b>Changed to </b>' + element.new_values.subject + '</div> <br>'
        }
        if (element.new_values.branch_id && element.old_values.branch_id) {
          desc = desc + '<div><b>Branch: </b>' + this.$store.state.branches.all.filter(e => e.id === element.old_values.branch_id)[0].name + '<b> Changed to </b>' + this.$store.state.branches.all.filter(e => e.id === element.new_values.branch_id)[0].name + '</div> <br>'
        }
        if (element.event != 'created') {
          if(element.old_values.category_id !== null && element.new_values.category_id === null){
            desc=desc + '<div><b>Category Removed</b></div>';
          }
          if ((element.new_values.category_id && element.old_values.category_id) || (element.new_values.category_id && element.old_values.category_id == null)) {

            if (element.old_values.category_id == null) {
              desc = desc + '<div><b>Category: </b> <b>Changed to </b>' + this.$store.state.categories.all.filter(e => e.id === element.new_values.category_id)[0].name + '</div> <br>'

            } else {

              desc = desc + '<div><b>Category: </b>' + this.$store.state.categories.all.filter(e => e.id === element.old_values.category_id)[0].name + ' <b>Changed to </b>' + this.$store.state.categories.all.filter(e => e.id === element.new_values.category_id)[0].name + '</div> <br>'
            }
          }
        }
        if (element.event != 'created') {

          if ((element.new_values.company_id && element.old_values.company_id) || (element.new_values.company_id && element.old_values.company_id == null)) {
            if (element.old_values.company_id == null) {
              desc = desc + '<div><b>Client: </b> <b>Changed to </b>' + this.$store.state.clients.all.filter(e => e.id === element.new_values.company_id)[0].name + ' </div><br>'

            } else {

              desc = desc + '<div><b>Client: </b>' + this.$store.state.clients.all.filter(e => e.id === element.old_values.company_id)[0].name + ' <b>Changed to </b>' + this.$store.state.clients.all.filter(e => e.id === element.new_values.company_id)[0].name + '</div> <br>'
            }
          }
        }
        if (element.event != 'created') {

          if ((element.new_values.contact_person_id && element.old_values.contact_person_id) || (element.new_values.contact_person_id && element.old_values.contact_person_id == null)) {
            if (element.old_values.contact_person_id == null) {
              desc = desc + '<div><b>Contact Person: </b> <b>Changed to </b>' + this.$store.state.contactPeople.all.filter(e => e.data.id === element.new_values.contact_person_id)[0].data.name + '</div>'

            } else {

              desc = desc + '<div><b>Contact Person: </b>' + this.$store.state.contactPeople.all.filter(e => e.data.id === element.old_values.contact_person_id)[0].data.name + ' <b>Changed to </b>' + this.$store.state.contactPeople.all.filter(e => e.data.id === element.new_values.contact_person_id)[0].data.name + '</div> '
            }
          }
        }
        if (element.old_values.description && element.new_values.description) {
          desc = desc + '<div><b>Description: </b></div><div>' + element.old_values.description + '</div><div><b> Changed to </b></div><div>' + element.new_values.description + '</div> <br>'
        }
        if ((element.new_values.due_date && !element.new_values.category_id) && (element.old_values.due_date && !element.old_values.category_id)) {
          // if(this.$router.currentRoute.name == 'tasks'){

          desc = desc + '<div><b>Due Date: </b>' + element.old_values.due_date + ' <b>Changed to </b>' + element.new_values.due_date + '</div> <br>'
          // }else{
          //   desc = desc + '<br> <b>Due Date: </b>'+ element.old_values.due_date+ ' <b>Changed to </b>'+ this.$store.state.leads.all.filter(e => e.type === 'lead').filter(e => e.due_date == element.new_values.due_date)[0].due_date

          // }
        }
        if ((element.new_values.due_date && element.new_values.category_id) && (element.old_values.due_date && element.old_values.category_id)) {
          // if(this.$router.currentRoute.name == 'tasks'){

          desc = desc + '<div><b>Due Date: </b>' + element.old_values.due_date + ' <b>Changed to </b>' + element.new_values.due_date + '</div> <br>'
          // }else{
          //   desc = desc + '<br> <b>Due Date: </b>'+ element.old_values.due_date+ ' <b>Changed to </b>'+ this.$store.state.leads.all.filter(e => e.type === 'lead').filter(e => e.due_date == element.new_values.due_date)[0].due_date

          // }
        }
        if (element.new_values.due_date_reason){//(element.new_values.due_date && element.new_values.due_date_reason) && (element.old_values.due_date && element.old_values.due_date_reason)) {
          // if(this.$router.currentRoute.name == 'tasks'){

          desc = desc + '<div><b>Due Date Reason: </b>' + element.new_values.due_date_reason + '</div><br>'//' <b>Changed to </b>' + element.new_values.due_date + '</div> <br>'
          // }else{
          //   desc = desc + '<br> <b>Due Date: </b>'+ element.old_values.due_date+ ' <b>Changed to </b>'+ this.$store.state.leads.all.filter(e => e.type === 'lead').filter(e => e.due_date == element.new_values.due_date)[0].due_date

          // }
        }
        // if ((element.new_values.invoice_date) && (element.old_values.invoice_date)) {
        //   // if(this.$router.currentRoute.name == 'tasks'){

        //   desc = desc + '<div><b>Invoice Date: </b>' + element.old_values.invoice_date + ' <b>Changed to </b>' + element.new_values.invoice_date + '</div> <br>'
        //   // }else{
        //   //   desc = desc + '<br> <b>Due Date: </b>'+ element.old_values.due_date+ ' <b>Changed to </b>'+ this.$store.state.leads.all.filter(e => e.type === 'lead').filter(e => e.due_date == element.new_values.due_date)[0].due_date

        //   // }
        // }
        if ((element.new_values.invoice_date ) && (element.old_values.invoice_date )) {
          // if(this.$router.currentRoute.name == 'tasks'){

          desc = desc + '<div><b>Invoice Date: </b>' + element.old_values.invoice_date + ' <b>Changed to </b>' + element.new_values.invoice_date + '</div> <br>'
     
        }
        if ((element.new_values.invoice_number ) && (element.old_values.invoice_number )) {
          // if(this.$router.currentRoute.name == 'tasks'){

          desc = desc + '<div><b>Invoice Number: </b>' + element.old_values.invoice_number + ' <b>Changed to </b>' + element.new_values.invoice_number + '</div> <br>'
     
        }
        if (element.new_values.proposal_date && element.old_values.proposal_date) {
          // if(this.$router.currentRoute.name == 'tasks'){

          desc = desc + '<div><b>Proposal Date: </b>' + element.old_values.proposal_date + ' <b>Changed to </b>' + element.new_values.proposal_date + '</div> <br>'
          // }else{
          //   desc = desc + '<br> <b>Due Date: </b>'+ element.old_values.due_date+ ' <b>Changed to </b>'+ this.$store.state.leads.all.filter(e => e.type === 'lead').filter(e => e.due_date == element.new_values.due_date)[0].due_date

          // }
        }

        if (element.new_values.priority && element.old_values.priority) {
          if (element.new_values.priority === 5) {
            desc = desc + 'Changed Priority to Highest' + ' <br>'
          } else if (element.new_values.priority === 4) {
            desc = desc + 'Changed Priority to High' + ' <br>'
          } else if (element.new_values.priority === 3) {
            desc = desc + 'Changed Priority to Medium' + ' <br>'
          } else if (element.new_values.priority === 2) {
            desc = desc + 'Changed Priority to Low' + ' <br>'
          } else {
            desc = desc + 'Changed Priority to Lowest' + ' <br>'

          }
        }
      
        if (element.new_values.to_do && element.old_values.length === 0) {
          desc = desc + element.new_values.to_do + ' <br>'
        }
        if (element.new_values.to_do && element.old_values.to_do) {
          desc = desc +'<div>'+ element.old_values.to_do + ' <b>Changed to</b> ' + element.new_values.to_do + '</div> <br>'
        }
        if (element.old_values.status && element.new_values.status && element.auditable_type.includes('Task')) {
          desc = desc + '<div><b> Status: </b>' + element.old_values.status + ' <b>Changed to </b> ' + element.new_values.status + '</div> <br>'
        }
        if (element.event != 'created') {

          if ((element.new_values.status_master_id && element.old_values.status_master_id) || (element.new_values.status_master_id && element.old_values.status_master_id == null)) {
            // if(element.new_values.status_master_id === 1){
            // if(this.$store.state.status.all.filter(e => e.id === element.old_values.status_master_id).length >0){
            if (element.old_values.status_master_id == null && element.new_values.status_master_id != null) {

              desc = desc + '<b>Status: </b> <b>Changed to </b>' + this.$store.state.status.all.filter(e => e.id === element.new_values.status_master_id)[0].type + ' <br>'
            }
            if (element.old_values.status_master_id != null && element.new_values.status_master_id != null) {

            desc = desc + '<div><b>Status: </b>'+this.$store.state.status.all.filter(e => e.id === element.old_values.status_master_id)[0].type+' <b>Changed to </b>' + this.$store.state.status.all.filter(e => e.id === element.new_values.status_master_id)[0].type + '</div> <br>'
            }
            
            
            //else {
              //console.log('status-master: ',element);
              //desc = desc + '<br><b>Status: </b>'//+this.$store.state.status.all.filter(e => e.id === element.old_values.status_master_id)[0].type//+' <b>Changed to </b>'+ this.$store.state.status.all.filter(e => e.id === element.new_values.status_master_id)[0].type+ ' '

            //}
          }
          // }
          //             }else if(element.new_values.status_master_id === 2){
          //               if(this.$store.state.status.all.filter(e => e.id === element.old_values.status_master_id).length >0){

          // desc = desc + 'Status: '+this.$store.state.status.all.filter(e => e.id === element.old_values.status_master_id)[0].type+' Changed to '+ this.$store.state.status.all.filter(e => e.id === element.new_values.status_master_id)[0].type
          // }
          //               // desc = 'Changed Priority to High'
          //             }else if(element.new_values.status_master_id === 3){
          //               if(this.$store.state.status.all.filter(e => e.id === element.old_values.status_master_id).length >0){

          // desc = desc + 'Status: '+this.$store.state.status.all.filter(e => e.id === element.old_values.status_master_id)[0].type+' Changed to '+ this.$store.state.status.all.filter(e => e.id === element.new_values.status_master_id)[0].type
          // }
          //               // desc = 'Changed Priority to Medium'

          //             }else if(element.new_values.status_master === 4){
          //               if(this.$store.state.status.all.filter(e => e.id === element.old_values.status_master_id).length >0){

          // desc = desc + 'Status: '+this.$store.state.status.all.filter(e => e.id === element.old_values.status_master_id)[0].type+' Changed to '+ this.$store.state.status.all.filter(e => e.id === element.new_values.status_master_id)[0].type
          // }
          //               // desc = 'Changed Priority to Lowest'

          //             }else{

          //             }
        }
        // if(element.auditable_type.includes('TaskFollowUp')){
        //   if(!element.old_values.description && element.new_values.description){

        //     desc = desc + element.new_values.description + ' <br>'
        //   }
        // }
        // if(element.auditable_type.includes('Invoice') && element.event == 'updated'){
        //   // alert('invoice')
        //   // desc = desc + '<b>Invoice: </b>'+ element.old_values.invoice_date + ' <b>Changed to </b> ' + element.new_values.invoice_date
        //   desc = desc + 'jjj'
        // }
        if (element.event == 'created') {
          if (element.auditable_type.includes('Invoice')) {
            message = 'Raised'
          } else if (element.auditable_type.includes('ToDo') ) {
            message = 'Added'
          }
          else {

            message = 'Created'
          }

        } else if (element.event == 'updated') {
          message = 'Updated'
        } else if (element.event == 'deleted') {
          message = 'Deleted'
        } else {
          message = 'Restored'
        }
        // console.log();
        if(desc || (message ==='Created' || message === 'Added')){

        
        all.push({
          comment: '<p>' + message + ' ' + (!element.auditable_type.includes('ToDo') ? type.split('Models\\')[1] : 'sub-task') + '</p>' + ((element.event != 'created' && element.event != 'deleted') || (element.auditable_type.includes('ToDo')) ? '<hr style="border:1px solid #71ccf7;"/>' : '' )
          // || (element.auditable_type.includes('TaskFollowUp')) ? '<hr style="border:1px solid #71ccf7;"/>' : '') 
          +
           '<i>' + (element.event == 'created' && element.auditable_type.includes('Task') ? '' : desc) + '</i>',
          created_at: element.created_at,
          id: latest_id,
          user: audit_user,
          user_id: audit_user ? audit_user.id : null
        })
      }
      });
      // console.log(
      //   audits
      // );

      return all;
    },
    user() {
      return localStorage.getItem('userData');
    },
    sender() {
      return this.$store.state.comments.single.id
    },
    assignedUsers() {
      return this.$store.state.comments.assignedUsers

    }
    // leads(){
    //   return this.$store.state.leads.single
    // }

  },
  beforeUpdate() {
    // document.getElementById('chat-app')
    var objDiv = document.getElementById("chat-app");
    objDiv.scrollTop = objDiv.scrollHeight + 10;
    // console.log(objDiv.sc);
    this.commentCompose.task_desc.text = this.client.description


    // console.log(this.threadedMail);
  },
  created() {
    // this.$store.dispatch("comments/store", { comment })
    // then(() => {
    var message_id = ''

    // });
    this.psToBottom()
    this.fetchAll()
    //   let vm = this
    //   window.Echo.private('chat')
    // .listen('.MessageSent', (e) => {
    //   console.log('vb'+e);
    // });
    // console.log();
  },
  methods: {
    sendEmail(){
      const s3 = []
      let data2 = this.composeData
      this.$store.state.tasks.s3_url.forEach(element => {
        s3.push(element.url)
      });
      this.taskAttachments.forEach(element => {
        if(element.checked === true){

          if(element.drive_url){
            
            s3.push(element.drive_url)
          }else{
            s3.push(element.attachment)
            
          }
        }
      });

      const data = {
  "to": data2.to,
          "bcc": data2.bcc,
          "cc": data2.cc,
          'attach_url': s3,
          "message": data2.message,
          "plain_text": data2.message.replace(/(<([^>]+)>)/gi, ''),
          "subject": this.replySubject,
          "from": data2.from
      };
      this.$refs['reply-comment-modal'].hide()
      this.$toast.success('Sending!', {
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
      this.$store.dispatch('emails/sendEmail', { data }).then(() => {
        // console.log(res);
        // if (this.successMessage) {

          this.$toast.success('Email Sent Successfully', {
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
        // }
        // this.$refs['compose-modal'].hide()
        this.composeData.to = ''
        this.composeData.from = ''
        this.composeData.cc = ''
        this.composeData.bcc = ''
        this.composeData.subject = ''
        this.composeData.message = ''
        this.taskAttachments = []
        this.$store.state.tasks.s3_url = []
        // while (this.file_name2.length > 0) {
        //   this.file_name2.pop();
        // }

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
    },
    showFile(){
      document.getElementById('file-comment').click()
    },
    removeAttach(index){
      this.$store.state.tasks.s3_url.splice(index,1)
    },
    removeAttach2(index){
      this.taskAttachments.splice(index,1)
    },
    setEmailAttach(){
      this.taskAttachments.forEach(element => {
        if(element.checked === true){

          this.emailAttachments.push(element)
        }
      });
    },
    updateValue(newValue) {
      this.message_reply = newValue
    },
    setTaskComments() {
      this.commentCompose.task_comments = this.getSortedComments();

    },
    getSortedComments() {
      this.comments.sort(function (a, b) {
        return a.created_at.localeCompare(b.created_at)
      })
      return this.comments
    },
    audit_user(id) {
      if (JSON.parse(localStorage.getItem('userData')).id === id) {

        this.audit_users = JSON.parse(localStorage.getItem('userData'))
      }

    },
    DaysLeft(start, end) {
      // const startDate = start
      const endDate = end
      const diffInMs = new Date(endDate) - new Date()
      var diffInDays = diffInMs / (1000 * 60 * 60 * 24)
      diffInDays = Math.round(diffInDays);
      // eslint-disable-next-line no-bitwise
      return diffInDays | 0
    },
    getPL(date, id) {
      var dates = new Date(date);
      if (id < 10) {

        var p_date = 'PL-0' + id + '-' + dates.getFullYear()
      } else {
        var p_date = 'PL-' + id + '-' + dates.getFullYear()

      }
      return p_date;
    },
    timeFormat(date) {
      var hours = new Date(date).getHours();
      var minutes = new Date(date).getMinutes();
      var noon = hours >= 12 ? ' PM' : ' AM';
      hours = hours % 12;
      hours = hours ? hours : 12; // the hour '0' should be '12'
      minutes = minutes < 10 ? '0' + minutes : minutes;

      var maketime = hours + ':' + minutes + noon;
      var date = new Date(date).toDateString();
      var fullyear = new Date(date).getFullYear();

      return date.split(fullyear)[0] + ',' + maketime;
    },
    showComment(comment) {
      // this.text = comment.msg
      // console.log(comment.msg);
      if (this.textLength == "true") {
        let newText = comment.comment.substring(0);
        console.log('hshs');
        return newText;
      } else {
        /*let newText = this.lorem.substring(0,50) + `...`;*/
        let newText = comment.comment.substring(0, 200);
        var objDiv = document.getElementById("chat-app");
        objDiv.scrollTop = objDiv.scrollHeight + 10;
        return newText;
      }

      // if(comment.length > 200){
      //   return comment.substring(0,200)
      // }else{
      //   return comment;
      // }
    },
    handleUpload(e) {
      // alert('hello')
      let file = e.target.files[0];
      let fileData = [];
      // const reader = new FileReader();
      // this.file.forEach((x) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        let data = {
          file: e.target.result,
          name: file.name
        };
        // fileData.push(data);
        this.uploadFileS3([data]);
      };
      reader.readAsDataURL(file);
      e.target.value = ''

    },
    uploadFileS3(file) {
      console.log("filelength:", file.length);  
      console.log("file:", file);
      var data = {
        attach: file ? file : "null",
      };
      this.$store.dispatch('tasks/upload_file_s3', { data: data }).then(() => {
        this.$store.state.tasks.s3_url.forEach(element => {
          
          this.taskAttachments.push({
            original_name:element.fileName,
            drive_url:element.element.url,
            attachment:element.element.url,
            checked: true
          });
        });
      })
    },
    replyModal() {
      // alert(this.client.contact_person.emails[0].email)
      this.composeData.to = []
      this.composeData.to.push(this.client.contact_person.emails[0].email)
      this.composeData.from = this.outBoundEmails[0]

      this.$refs['reply-comment-modal'].show()
      var signAll = []
      if (this.$store.state.users.signAll != null) {
        signAll.push(this.$store.state.users.signAll)
      }
      var message = ''
      if (this.commentCompose.task_desc.check == true) {
        message = message + this.commentCompose.task_desc.text + '<br><br>'
      } else {
        message = message + ''
      }
      var thread = ''
      if (this.extraComments.length > 0) {
        thread = thread + '<br><br><br>' + this.extraComments[this.extraComments.length - 1].message
      } else {
        thread = thread + ''
      }
      if (this.$store.state.comments.extraComment.length > 0) {
        thread = thread + '<br><br><br>' + this.$store.state.comments.extraComment[this.$store.state.comments.extraComment.length - 1].message
      } else {
        thread = thread + ''
      }
      // console.log();
      var header = ''
      if (this.$router.currentRoute.name == 'leads') {
        header = header + '<p style="margin-left:2rem;">Hi ' + this.$store.state.leads.all.filter(e => e.type === 'lead').filter(e => e.id === this.task_id)[0].contact_person.name + ', Greeting from ' + JSON.parse(localStorage.getItem('userData')).tenant.id + '</p><br><br>'
      } else {
        header = header + '<p style="margin-left:2rem;">Hi ' + this.$store.state.tasks.all.filter(e => e.type === 'task').filter(e => e.id === this.task_id)[0].contact_person.name + ', Greeting from ' + JSON.parse(localStorage.getItem('userData')).tenant.id + '</p><br><br>'

      }
      let comment_arr = this.commentCompose.task_comments.filter(e => e.checked===true)
      let comment_content = ''
      if(comment_arr.length > 0){
        comment_content += '<h2 style="color: black;background: white;">Comments</h2><br>'
        comment_arr.forEach(element => {
          
          comment_content = comment_content + '<p style="color: black;background: white;"><b>'+element.user.name+': </b><br>'+element.comment +'</p> ' ;
          });
        }
        comment_content = comment_content + '<br>'
      if (signAll.length > 0) {
        this.composeData.message = header +comment_content+ message + signAll[0].signature + thread
      }
      this.composeData.from = this.outBoundEmails[0]
      // this.composeData.to = []
      this.composeData.cc = []

      this.emails_contact.forEach(element => {
        if (this.client.mailbox != null) {

          if (element == this.client.mailbox.from_email && this.client.mailbox.folder == 'INBOX') {

            this.composeData.cc.push(element)
          }
        }
        // alert(this.client.contact_person.emails[0])
        // .forEach(e => {

        //   if (element == e.email) {
        //     this.composeData.to.push(element)
        //   }
        // });
      });
    },
    showSearch() {
      if (document.querySelector("input[id=searchBar]").style.display = 'none') {
        // console.log(document.querySelector("input[id=searchBar]").style.display = 'block');

        document.querySelector("input[id=searchBar]").style.display = 'block';
        document.getElementById('iconSearch').style.display = 'none';
      }

    },
    fetchAll() {
      const pusher = new Pusher('2c89bc9e9569378716c0 ',{
  cluster:'ap2',
  // activity_timeout: 300000,
  encrypted:true

});
      // this.subscribe_pusher()
      const channel = pusher.subscribe('chat')
    channel.bind('MessageSent', (data) => {
      console.log(data);
      // this.chatData.push(data[0])
    })
      this.$store.dispatch("comments/fetch", this.task_id).then(() => {
        this.items = this.$store.state.comments.all
      });
      // console.log("fetchChat:", this.$store.dispatch("comments/fetch"))

    },
    sendMessage(message) {
      //this.$store.state.comments.all.push({comment:this.chatInputMessage})
      // message.comment.
      // message.comment = message.comment.
      this.items.push(message);
      var comment = {
        comment: message.comment,
        task_id: this.task_id,
        user_ids: message.mentions
      };

      this.$store.dispatch("comments/store", { payload: comment, id: this.task_id }).
        then(() => {
          this.fetchAll()
          
       
        });

      // this.items();


      /* this.chatData.chat.chat.push({
        message: this.chatInputMessage,
        time: new Date(),
        senderId: 11,
      })*/
      this.chatInputMessage = ''

      // Update scroll position
      // Scroll to bottom
      this.$nextTick(() => {
        this.psToBottom()
      })
    },
    psToBottom() {
      const scrollEl = this.$refs['refChatLogPS']//.$el || this.$refs['refChatLogPS']
      if (scrollEl) {
        console.log(scrollEl);
        scrollEl.scrollTop = scrollEl.scrollHeight
      }
    },
  },
  setup() {

    const isEditSidebarActive = ref(false);
    // const isSearchMessagesActive = ref(false);

    return {
      isEditSidebarActive,//isSearchMessagesActive,
    }


  }
}
</script>

<style lang="scss">
// @import "~@core/scss/base/pages/app-todo.scss";

@import "@core/scss/base/pages/app-chat-list.scss";
@import "~@core/scss/base/pages/app-chat.scss";
// @import "~@core/scss/base/pages/app-chat-list.scss";
</style>
<style lang="scss" scoped>
@import "@core/scss/vue/libs/vue-select.scss";
</style>
<style>
.vs__open-indicator {
  fill: darkgray;
}
.highlight {
  background-color: yellow;
}
</style>

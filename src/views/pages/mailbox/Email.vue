<template>
  <!-- Need to add height inherit because Vue 2 don't support multiple root ele -->
  <div v-cloak id="start-mail" style="height: inherit">
    <!-- <create-sidebar :is-create-sidebar-active.sync="isCreateSidebarActive" @refetch-data="fetchAll" /> -->

    <div class="body-content-overlay" :class="{ 'show': mqShallShowLeftSidebar }"
      @click="mqShallShowLeftSidebar = false" />

    <!-- Email List -->
    <div class="email-app-list">

      <!-- App Searchbar Header -->
      <div class="app-fixed-search d-flex align-items-center">

        <!-- Toggler -->
        <div class="sidebar-toggle d-block d-lg-none ml-1">
          <feather-icon icon="MenuIcon" size="21" class="cursor-pointer" @click="mqShallShowLeftSidebar = true" />
        </div>

        <!-- Searchbar -->
        <div class="d-flex align-content-center justify-content-between w-100">
          <b-input-group class="input-group-merge">
            <b-input-group-prepend is-text>
              <feather-icon icon="SearchIcon" class="text-muted" />
            </b-input-group-prepend>
            <b-form-input :value="searchQuery" placeholder="Search email" @input="updateRouteQuery" />
            <!-- <b-form-input v-model.trim="search" placeholder="Search email" @input="fetchEmails" /> -->

          </b-input-group>

        </div>
      </div>

      <!-- App Action Bar -->
      <div class="app-action">
        <div class="action-left d-flex">
          <b-form-checkbox :checked="selectAllEmailCheckbox" :indeterminate="isSelectAllEmailCheckboxIndeterminate"
            @change="selectAllCheckboxUpdate">

          </b-form-checkbox>
          <feather-icon v-if="!(isTransition && !selectedEmails.length)" v-show="!selectedEmails.length"
            icon="RotateCwIcon" class="rotate ml-1" size="21" style="cursor:pointer;" @click="fetch_emails()" /> &emsp;
          <b-spinner type="grow" style="width: 1.8rem; height: 1.8rem;" v-if="isTransition && !selectedEmails.length" />
          <div v-show="selectedEmails.length" class="align-items-center" :class="{ 'd-flex': selectedEmails.length }">

            <!-- Update Mail Folder Dropdown -->



            <!-- Update Mail Folder Dropdown -->
            <!-- <b-dropdown variant="link" no-caret toggle-class="p-0" class="ml-1" right>
  <template #button-content>
    <feather-icon icon="TagIcon" size="17" class="align-middle text-body" />
  </template>
  <b-dropdown-item @click="updateSelectedEmailsLabel('personal')">
    <span class="mr-50 bullet bullet-success bullet-sm" />
    <span>Personal</span>
  </b-dropdown-item>
  <b-dropdown-item @click="updateSelectedEmailsLabel('company')">
    <span class="mr-50 bullet bullet-primary bullet-sm" />
    <span>Company</span>
  </b-dropdown-item>
  <b-dropdown-item @click="updateSelectedEmailsLabel('important')">
    <span class="mr-50 bullet bullet-warning bullet-sm" />
    <span>Important</span>
  </b-dropdown-item>
  <b-dropdown-item @click="updateSelectedEmailsLabel('private')">
    <span class="mr-50 bullet bullet-danger bullet-sm" />
    <span>Private</span>
  </b-dropdown-item>
</b-dropdown> -->

            <!-- <feather-icon icon="EnvelopeOpenIcon" size="21" class="cursor-pointer" @click="markSelectedEmailsAsUnread" /> -->
            <!-- <font-awesome-icon icon="envelope" class="icon" size="lg" /> -->

            <font-awesome-icon icon="envelope-open" class="icon cursor-pointer" @click="markSelectedEmailsAsRead"
              size="lg" />
            <feather-icon v-show="$route.params.folder !== 'trash'" icon="TrashIcon" size="21" class="cursor-pointer ml-1"
              @click="moveSelectedEmailsToFolder('trash')" />
            <feather-icon v-show="$route.params.folder !== 'spam'" icon="InfoIcon" size="21" class="cursor-pointer ml-1"
              @click="moveSelectedEmailsToFolder('spam')" />
            <span @click="moveSelectedEmailsToFolder('un-spam')" style="margin-left: 0.5rem;" class="cursor-pointer"
              v-show="$route.params.folder == 'spam'">
              Not Spam
            </span>

            <b-dropdown variant="link" no-caret toggle-class="p-0 " right style="margin-left: 0.5rem">
              <template #button-content>
                <feather-icon icon="MoreVerticalIcon" size="21" class="align-middle" style="color: black;" />
              </template>

              <!-- <b-dropdown-item @click="moveSelectedEmailsToFolder('draft')">
    <feather-icon icon="Edit2Icon" />
    <span class="align-middle ml-50">Draft</span>
  </b-dropdown-item> -->

              <!-- <b-dropdown-item @click="moveSelectedEmailsToFolder('spam')">
    <feather-icon icon="InfoIcon" />
    <span class="align-middle ml-50">Spam</span>
  </b-dropdown-item> -->
              <b-dropdown-item @click="markSelectedEmailsAsRead">
                <!-- <feather-icon icon="InfoIcon" /> -->
                <font-awesome-icon icon="envelope-open" class="icon cursor-pointer" />

                <span class="align-middle ml-50">Mark as read</span>
              </b-dropdown-item>
              <b-dropdown-item @click="markSelectedEmailsAsUnread">
                <!-- <feather-icon icon="InfoIcon" /> -->
                <font-awesome-icon icon="envelope" class="icon cursor-pointer" />

                <span class="align-middle ml-50">Mark as unread</span>
              </b-dropdown-item>

              <!-- <b-dropdown-item v-show="$route.params.folder !== 'trash'" @click="moveSelectedEmailsToFolder('trash')">
    <feather-icon icon="TrashIcon" />
    <span class="align-middle ml-50">Trash</span>
  </b-dropdown-item> -->
              <b-dropdown-item v-if="msg_stared == 'not all stared'" @click="toggle_starred(selectedEmails, 'add')">
                <feather-icon icon="StarIcon" />
                <span class="align-middle ml-50">Add Star</span>
                <!-- <span v-if="msg_stared == 'all stared'" class="align-middle ml-50">Remove Star</span> -->

              </b-dropdown-item>
              <b-dropdown-item v-if="msg_stared == 'all stared'" @click="toggle_starred(selectedEmails, 'remove')">
                <feather-icon icon="StarIcon" />
                <span class="align-middle ml-50">Remove Star</span>
                <!-- <span v-if="msg_stared == 'all stared'" class="align-middle ml-50">Remove Star</span> -->

              </b-dropdown-item>
            </b-dropdown>
          </div>
        </div>
        <div class="action-left">
          <!-- <b-pagination v-model="currentPage" :total-rows="totalCount" :per-page="perPage" first-number last-number
              class="mb-0 mt-1 mt-sm-0" prev-class="prev-item" next-class="next-item">
              <template #prev-text>
                <feather-icon icon="ChevronLeftIcon" size="18" />
              </template>
              <template #next-text>
                <feather-icon icon="ChevronRightIcon" size="18" />
              </template>
            </b-pagination> -->
          <b v-if="new_page === 1">1 - </b>
          <b v-else>{{ (new_page - 1) * 20 + 1 }} - </b>

          {{ $store.state.emails.all_emails_meta.emailsMeta }} of {{ $store.state.emails.all_emails_meta.email_count }}
          <feather-icon icon="ChevronLeftIcon" size="21" :class="{ 'text-muted': new_page === 1 }"
            @click="fetch_previous_emails()" />
          <feather-icon icon="ChevronRightIcon" size="21" class="cursor-pointer" @click="paginate_next_emails()" />

        </div>

      </div>

      <!-- Emails List -->
      <vue-perfect-scrollbar :settings="perfectScrollbarSettings" class="email-user-list scroll-area">
        <ul class="email-media-list">
          <!-- <b-media  v-for="email in items" :key="email.parent.id" tag="li" no-body
            :class="{ 'mail-read': email.isRead }" @click="updateEmailViewData(email)" style="padding: 0.5rem;">

            <b-media-aside class="d-flex flex-row-reverse mr-50" v-if="!email.parent">
              <b-avatar style="margin-left: 0.5rem;" v-if="email.avatar != null" class="avatar" size="35" variant="primary" :src="email.avatar" />
              <b-avatar style="margin-left: 0.5rem;" v-if="email.avatar === null" class="avatar" size="35" variant="primary"
                :src="'https://ui-avatars.com/api/?name='+filterTags(parse_from_name(email.from_name))" />

              <div class="user-action" style="margin-top: 0.5rem;">
                <b-form-checkbox :checked="selectedEmails.includes(email.id)" @change="toggleSelectedMail(email.id)"
                  @click.native.stop />
                <div class="email-favorite">
                  <feather-icon icon="StarIcon" size="17"
                    :class="{ 'text-warning fill-current': email.parent.isStarred == true }"
                    @click.stop="toggleStarred(email.parent)" />
                </div>
              </div>
            </b-media-aside>


            <b-media-aside class="d-flex flex-row-reverse mr-50" style="margin-left: 1rem;" v-if="email.parent">
              <b-avatar style="margin-left: 0.5rem;" v-if="email.parent.avatar != null" class="avatar" size="35" variant="primary" :src="email.parent.avatar" />
            
              <b-avatar style="margin-left: 0.5rem;" v-if="email.parent.avatar === null" class="avatar" size="35" variant="primary"
                :src="'https://ui-avatars.com/api/?name='+filterTags(parse_from_name(email.parent.from_name))" />

              <div class="user-action" style="margin-top: 0.5rem;">
                <b-form-checkbox :checked="selectedEmails.includes(email.parent.id)" @change="toggleSelectedMail(email.parent.id)"
                  @click.native.stop />
                <div class="email-favorite">
                  <feather-icon icon="StarIcon" size="17"
                    :class="{ 'text-warning fill-current': email.parent.isStarred == true }"
                    @click.stop="toggleStarred(email.parent)" />
                </div>
              </div>
            </b-media-aside>

            <b-media-body v-if="!email.parent">
              <div class="mail-details" style="margin-left: 0.5rem;">
                <div class="mail-items">
                  <h5 class="mb-25">
                    {{ filterTags(parse_from_name(email.from_name)) }}
                  </h5>
                  <span class="text-truncate">{{ email.subject }}</span>
                </div>
                <div class="mail-meta-item">
               
                </div>
              </div>

              <div class="mail-message">
                <p class="text-truncate mb-0 " :class="{'text-red' : email.message == ''}" >
                  

                  {{email.message != '' ? parse(email.message) : 'No Message Found' }}
                </p>
              </div>
            </b-media-body>
            <b-media-body v-if="email.parent">
              <div class="mail-details" style="margin-left: 0.5rem;">
                <div class="mail-items d-flex" style="margin-top:0.5rem;">
                  <h5 class="mb-25">
                    {{ filterTags(parse_from_name(email.parent.from_name)) }}
                    
                    <span v-if="email.childs" class="text-muted" style=" margin-top:0.5rem;">{{(email.childs.length + 1)}}</span>
                  </h5>&emsp;
                  <span class="text-truncate">{{ email.parent.subject }}</span>

                </div>
                <div class="mail-meta-item">
                  
                </div>
              </div>

             
            </b-media-body>
          </b-media> -->


          <b-media v-for="email in items" :key="email.id" tag="li" no-body
            :class="{ 'mail-read': email.parent.user_mailbox != null }" @click="updateEmailViewData(email)">

            <b-media-aside class="media-left mr-50" v-if="!email.parent">
              <b-avatar v-if="email.avatar != null" class="avatar" size="40" variant="primary" :src="email.avatar" />
              <b-avatar v-if="email.avatar === null" class="avatar" size="40" variant="primary"
                :src="'https://ui-avatars.com/api/?name=' + filterTags(parse_from_name(email.from_name))" />

              <div class="user-action">
                <b-form-checkbox :checked="selectedEmails.includes(email.id)"
                  @change="toggleSelectedMail(email.id, email.message_id)" @click.native.stop />
                <div class="email-favorite">
                  <feather-icon icon="StarIcon" size="17"
                    :class="{ 'text-warning fill-current': email.isStarred == true }"
                    @click.stop="toggleStarred(email)" />
                </div>
              </div>
            </b-media-aside>


            <b-media-aside class="media-left mr-50" v-if="email.parent">
              <b-avatar v-if="email.parent.avatar != null" class="avatar" size="40" variant="primary"
                :src="email.parent.avatar" />

              <b-avatar v-if="email.parent.avatar === null" class="avatar" size="40" variant="primary"
                :src="'https://ui-avatars.com/api/?name=' + filterTags(parse_from_name(email.parent.from_name))" />

              <div class="user-action">
                <b-form-checkbox :checked="selectedEmails.includes(email.parent.id)"
                  @change="toggleSelectedMail(email.parent.id, email.parent.message_id)" @click.native.stop />
                <div class="email-favorite">
                  <feather-icon icon="StarIcon" size="17"
                    :class="{ 'text-warning fill-current': email.parent.isStarred == true }"
                    @click.stop="toggleStarred(email)" />
                </div>
              </div>
            </b-media-aside>

            <b-media-body v-if="!email.parent">
              <div class="mail-details">
                <div class="mail-items">
                  <h5 class="mb-25">
                    {{ filterTags(parse_from_name(email.from_name)) }}
                  </h5>
                  <span v-b-tooltip.hover="email.subject" class="text-truncate">{{ email.subject.substr(0, 150) + '...'
                  }}</span>
                </div>
                <div class="mail-meta-item">
                </div>
              </div>

              <div class="mail-message">
                <p class="text-truncate mb-0 " :class="{ 'text-red': email.message == '' }">


                  {{ email.message != '' ? parse(email.message) : 'No Message Found' }}
                </p>
              </div>
            </b-media-body>
            <b-media-body v-if="email.parent">
              <div class="mail-details">



                <div
                  v-if="(email.parent.user_mailbox == null || email.parent.user_mailbox.is_read === 0) && email.parent.folder == 'INBOX'"
                  class="mail-items" style="color:#202124;font-weight:700">

                  <h5 class="mb-25" style="color:#202124;font-weight:700">
                    {{ filterTags(parse_from_name(email.parent.from_name)) }}
                    <b class="text-muted" v-if="email.parent.attachments > 0">

                      <feather-icon icon="PaperclipIcon"></feather-icon>
                    </b>
                  </h5>
                  <b-badge @click="goTo_lead(email.parent.task_status)" v-if="email.parent.task_status != null"
                    :variant="changeStatus(email.parent.task_status)">
                    <!-- {{ '# '+ email.parent.task_lead_id.split('_')[1] }} -->
                    {{ '#' + email.parent.task_status.id }}
                  </b-badge>
                  <span v-if="email.parent.task_lead_id != null">
                    &emsp13;
                  </span>
                  <span v-b-tooltip.hover="email.parent.subject" class="text-truncate">{{
                    email.parent.subject.substr(0, 150) + (email.parent.subject.length > 150 ? '...' : '') }}</span>
                  <span v-if="email.childs" class="text-muted" style="margin-left: 0.5rem; margin-top:0.5rem;">{{
                    (email.childs.length + 1) }}</span>

                </div>
                <div v-else class="mail-items">

                  <h5 class="mb-25">
                    {{ filterTags(parse_from_name(email.parent.from_name)) }}
                    <b class="text-muted" v-if="email.parent.attachments > 0">

                      <feather-icon icon="PaperclipIcon"></feather-icon>
                    </b>
                  </h5>
                  <b-badge @click="goTo_lead(email.parent.task_status)" v-if="email.parent.task_status != null"
                    :variant="changeStatus(email.parent.task_status)">
                    <!-- {{ '# '+ email.parent.task_lead_id.split('_')[1] }} -->
                    {{ '# ' + email.parent.task_status.id }}

                  </b-badge>
                  <span v-if="email.parent.task_lead_id != null">
                    &emsp13;
                  </span>
                  <span class="text-truncate">{{ email.parent.subject }}</span>
                  <span v-if="email.childs" class="text-muted" style="margin-left: 0.5rem; margin-top:0.5rem;">{{
                    (email.childs.length + 1) }}</span>

                </div>
                <div class="mail-meta-item " :class="{ 'text-bolder': email.parent.user_mailbox == null }">
                  {{ date_time(email.parent.date) }}

                </div>
              </div>

              <div class="mail-message">
                <p class="text-truncate mb-0 " :class="{ 'text-red': email.parent.message == '' }">


                  {{ email.parent.message != '' ? parse(email.parent.message) : 'No Message Found' }}
                </p>
              </div>
            </b-media-body>
          </b-media>





          <!-- <b-avatar
            v-if="email.avatar === null"
            class="avatar"
            size="40"
            variant="primary"
            :src="require('@/assets/images/portrait/small/avatar-s-8.jpg')"
          /> -->
          <!-- <b-avatar
                v-if="email.avatar === null"
                class="avatar"
                size="40"
                variant="primary"
                :src="require('@/assets/images/portrait/small/avatar-s-8.jpg')"
              /> -->
          <!-- <feather-icon v-if="email.attachments" icon="PaperclipIcon" /> -->
          <!-- <span
                    v-for="label in email.labels"
                    :key="label"
                    class="mx-50 bullet bullet-sm"
                    :class="`bullet-${resolveLabelColor(label)}`"
                  /> -->
          <!-- <span class="mx-50 bullet bullet-sm" :class="`bullet-${resolveLabelColor(email.label)}`" /> -->
          <!-- <span class="mail-date">{{ formatDateToMonthShort(email.time, { hour: 'numeric', minute: 'numeric', }) }}</span> -->
          <!-- <iframe :srcdoc="email.message"></iframe> -->
          <!-- <feather-icon v-if="email.attachments" icon="PaperclipIcon" /> -->
          <!-- <span
                    v-for="label in email.labels"
                    :key="label"
                    class="mx-50 bullet bullet-sm"
                    :class="`bullet-${resolveLabelColor(label)}`"
                  /> -->
          <!-- <span class="mx-50 bullet bullet-sm" :class="`bullet-${resolveLabelColor(email.label)}`" /> -->
          <!-- <span class="mail-date">{{ formatDateToMonthShort(email.time, { hour: 'numeric', minute: 'numeric', }) }}</span> -->
          <!-- <iframe :srcdoc="email.message"></iframe> -->




        </ul>
        <div class="text-center mt-1">


          <b-spinner v-if="isLoading" />
        </div>
        <div class="no-results" :class="{ 'show': isLoading === false && items.length === 0 }">
          <h5 v-if="showIntegration.length > 0">No Items Found</h5>

        </div>
        <div class="no-results" :class="{'show': isLoading === false}">
          <span v-if="showIntegration.length === 0">


Please Integrate your email!
<b-link style="color: #0000EE;" @click="integrationPage()">
  <br>
  <u>

    click here
  </u>
</b-link>

</span>
          </div>
      </vue-perfect-scrollbar>
    </div>
    <div class="b-overlay-wrap position-relative">
      <!-- <div v-if="isLoading && items.length === 0" class="b-overlay position-absolute"
        style="inset: 0px;z-index: 10;/* display: none; */">
        <div class="position-absolute bg-white rounded-sm" style="inset: 0px; opacity: 0.75; backdrop-filter: blur(0px);">
        </div>
        <div class="position-absolute" style="top: 50%; left: 50%; transform: translateX(-50%) translateY(-50%);">
          <span aria-hidden="true" class="spinner-border text-primary"> </span>
          <br><span style="margin-left:-2rem;">Processing..</span>
        </div>
      </div> -->
    </div>
    <!-- Email View/Detail :shallShowemailReplyModal.sync="shallShowemailReplyModal"-->
    <email-view :class="{ 'show': showEmailDetails }" :showThread="false" :perfectScrollbar="perfectScrollbarSettings"
      :email-view-data="emailViewData" :opended-email-meta="opendedEmailMeta" @close-email-view="showEmailDetails = false"
      @move-email-to-folder="moveOpenEmailToFolder" @toggle-email-starred="toggleStarred(emailViewData)"
      @update-email-label="updateOpenEmailLabel" @mark-email-unread="markOpenEmailAsUnread"
      @change-opened-email="changeOpenedEmail" :shallShowEmailReplyModal.sync="shallShowEmailReplyModal" :c_id="0"
      :c_name="''" :status="false" :isCreateSidebarActive="isCreateSidebarActive" />

    <!-- Sidebar -->
    <portal to="content-renderer-sidebar-left">
      <email-left-sidebar @close-email-view="showEmailDetails = false"
        :shall-show-email-compose-modal.sync="shallShowEmailComposeModal" :emails-meta="emailsMeta"
        :class="{ 'show': mqShallShowLeftSidebar }" @close-left-sidebar="mqShallShowLeftSidebar = false" />
    </portal>

    <!-- Compose Email Modal -->
    <email-compose :email-view-data="emailViewData" v-model="shallShowEmailComposeModal" />
    <!-- <email-reply  :email-view-data="emailViewData" /> -->
    <!-- <email-forward  :email-view-data="emailViewData" /> -->


    <!-- v-model="shallShowEmailReplyModal"  v-modal="shallShowemailReplyModal"-->
  </div>
</template>

<script type="text/javascript">

import store from '@/store'
import {
  ref, onUnmounted, computed, watch,
  // ref, watch, computed, onUnmounted,
} from '@vue/composition-api'
import {
  VBTooltip, BTooltip,
  BFormInput, BInputGroup, BInputGroupPrepend, BDropdown, BDropdownItem,
  BFormCheckbox, BMedia, BMediaAside, BMediaBody, BAvatar, BPagination, BBadge,
  BSpinner, BLink,
  BButton,
} from 'bootstrap-vue'
import VuePerfectScrollbar from 'vue-perfect-scrollbar'
import { filterTags, formatDateToMonthShort, formatDate } from '@core/utils/filter'
import { useRouter } from '@core/utils/utils'
import { useResponsiveAppLeftSidebarVisibility } from '@core/comp-functions/ui/app'
import EmailLeftSidebar from './EmailLeftSidebar.vue'
import EmailView from './EmailView.vue'
import emailStoreModule from './mail_api'
import useEmail from './useEmail'
import emailReply from './emailReply.vue'
import emailForward from './emailForward.vue'

import EmailCompose from './EmailCompose.vue'
import Ripple from 'vue-ripple-directive'
import router from '@/router'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from "@fortawesome/fontawesome-svg-core";
import { faBars, faEnvelopeOpen, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import 'bootstrap-vue/dist/bootstrap-vue-icons.min.css'
import "vue-toastification/dist/index.css";

import {
  faTwitter,

  faFacebook,
  faStackOverflow,

  faGithub
} from "@fortawesome/free-brands-svg-icons";
// library.add()
library.add(faBars, faTwitter, faEnvelopeOpen, faEnvelope, faFacebook, faStackOverflow, faGithub);
// import { filterTags, formatDate } from '@core/utils/filter'

// import {Mai} from 'vue-feather-icons';
// import CreateSidebar from '../leads/CreateSidebar.vue'

export default {
  components: {
    BFormInput, BPagination,//CreateSidebar,
    BInputGroup, FontAwesomeIcon,
    BInputGroupPrepend, BBadge, emailForward,
    BDropdown,
    BButton,
    BSpinner,
    emailReply, BLink,
    BDropdownItem,
    BFormCheckbox,
    BMedia,
    BMediaAside,
    BMediaBody,
    BAvatar,
    VBTooltip,
    // 3rd Party
    VuePerfectScrollbar,

    // App SFC
    EmailLeftSidebar,
    EmailView,
    EmailCompose,
  },
  directives: {
    Ripple,
    'b-tooltip': VBTooltip,
  },
  data() {
    return {
      // showIntegration:false,
      page: 1,
      new_page: 1,
      status: 'not all stared',
      pusher: null,
      channel: null,

      // isTransition:'false',
    }
  },
  computed: {
    loggedInId() {
      return JSON.parse(localStorage.getItem('userData')).id
    },
    isLoading() {
      return this.$store.state.emails.isLoading;
    },
    isTransition() {
      return this.$store.state.allUsers.isLoadingEmails;

    },
    totalCount() {
      return this.$store.state.emails.all_emails.length;

    },
    items() {
      var emails = this.$store.state.emails.all_emails;

      return emails;
    },
    msg_stared() {

      return this.$store.state.emails.all_emails_meta.msg_stared;

    }
    // filter(){
    //   var items = this.$store.state.emails.all_emails;
    //   var data = []
    //   for (let index = 0; index < items.length; index++) {
    //     data[index] = {
    //       id: items[index].id,
    //       isStarred: items[index].isStarred,
    //       avatar: items[index].avatar,
    //       from_name: filterTags(this.parse_from_name(items[index].from_name)),
    //       subject: items[index].subject,
    //       message: items[index].message,
    //     }

    //   }
    //  return data//.filter((e) => e.from_name.toLocaleLowerCase().includes(this.search.toLocaleLowerCase())) 
    // }
  },
  beforeUpdate() {
    // if(this.showIntegration.length === 0 ){
    //   this.$swal('Please integrate your email!', '','info').then(() => {
    //     this.integrationPage()
    //   })
    // }
    console.log(this.$router.currentRoute.params.folder);

  },
  created() {
    if (this.$store.state.users.signAll.length === 0) {

      this.$store.dispatch('users/fetchUserSignature', JSON.parse(localStorage.getItem('userData')).id).then(() => {

      })
    }
    // this.pusher = new Pusher('2c89bc9e9569378716c0',{
    //   cluster:'ap2'
    // });
    // this.pusher.connect()
    // this.pusher.connection.bind('connected', (data) => {
    //   console.log('connected');
    // })

    // var that = this;
    // this.channel = this.pusher.subscribe('mailbox-emails')
    // this.channel.bind('MailboxEmails', (data) => {
    //   console.log(data);
    //   that.$store.state.emails.all_emails=data[0];//.push(data[0])
    // })
    // this.pusher.connection.bind('disconnected', (data) => {
    //   console.log('disconnected');
    // })
    // this.fetchAll();

    this.$store.dispatch('clients/fetch');
    this.$store.dispatch('categories/fetch');
    // this.$store.dispatch('users/fetch').then(() => {
    //   if(this.$store.state.users.user_emails.length > 0){
    //   this.$store.state.users.user_emails.forEach(x => {
    //     if(x.user_id === JSON.parse(localStorage.getItem('userData')).id){
    //       if(x.emails_setting.length > 0){
    //         this.showIntegration = true
    //       }else{
    //         this.showIntegration = false
    //       }
    //     }
    //   });
    // } 
    // });

    this.$store.dispatch('branches/fetch');
    this.$store.dispatch('contactPeople/fetchForLeads');


  },
  methods: {
    integrationPage() {

      this.$router.push({
        name: 'settings',
        params: {
          integration: 'true'
        }
      })
    },
    changeStatus(task) {
      if (task.status_master_id === 1) {
        return 'primary';
      } else if (task.status_master_id === 2) {
        return 'success';
      } else if (task.status_master_id === 3) {
        return 'warning';
      }
      else if (task.status_master_id === 4) {
        return 'secondary';
      } else {
        return 'warning';
      }
    },
    date_time(time) {
      var date = new Date(time)
      const monthNames = ["Jan", "Feb", "March", "April", "May", "June",
        "July", "August", "Sep", "Oct", "Nov", "Dec"
      ];
      var display_date = monthNames[date.getMonth()] + ' ' + date.getDate();
      var today_ini = new Date()
      var today = monthNames[today_ini.getMonth()] + ' ' + today_ini.getDate();
      if (display_date == today) {
        return date.getHours() + ':' + date.getMinutes() + (date.getHours() >= 12 ? ' PM' : ' AM');
      } else {
        return display_date;
      }
      //var actual_date = formatDate(time)
      // var actual_time = date.toLocaleTimeString();
      // return ;

    },
    buttonVariant(type, id) {
      var status = '';
      // this.$store.dispatch('tasks/get', id)
      return 'secondary';
      // alert(type);
      // if(type == 'task'){

      //   status = this.$store.state.tasks.all.filter(e => e.type === 'task')[0].status_master.type
      // }

      // else{
      //   this.$store.dispatch('lead/get', id)

      //   status = this.$store.state.leads.all.filter(e => e.type === 'lead')[0].status_master.type

      // }


      if (status == 'open') {
        return 'primary'
      }
      if (status == 'completed') {
        return 'success'
      }
      if (status == 'invoiced') {
        return 'warning'
      }
      if (status == 'closed') {
        return 'secondary'
      }
    },
    goTo_lead(task) {
      // alert(id);
      // var data = id.split('_');
      // var type = data[0]
      // var ids = data[1]
      if (task.type == 'lead') {

        this.$router.push({

          name: 'leads',
          params: {
            status: 'true',
            lead_id: task.id
          }
        }
        )
      }
      if (task.type == 'task') {

        this.$router.push({

          name: 'tasks',
          params: {
            status: 'true',
            lead_id: task.id
          }
        }
        )
      }
      // router.push('/leads?status=true&lead_id='+id+'');
      console.log(router);
      // this.$store.dispatch('leads/get', id)
    },
    toggle_starred(array, status) {
      console.log(array);
      this.$store.dispatch('emails/toggleStarred', {
        emailIds: array,
        currrent: JSON.parse(localStorage.getItem('userData')),
        status: status,
        folder: router.currentRoute.params.folder || '',


        // dataToUpdate: { isStarred: !email.isStarred, isRead: false },
      }).then(() => {

        // eslint-disable-next-line no-param-reassign
        // console.log('2nd'+email.isStarred);
        // email.isStarred = !email.isStarred
        // fetchEmails();
      })

      // if(this.status == 'all stared'){
      //   this.status = 'not all stared';
      // }
    },
    paginate_next_emails() {
      this.$store.dispatch('emails/fetch_emails', {
        // page: this.new_page,
        page: this.new_page,
        currrent: JSON.parse(localStorage.getItem('userData')),

      })
    },
    fetchAll() {


      // this.$store.dispatch('emails/fetch_emails', {
      //   // page: this.new_page,
      //   folder: routeParams.value.folder,
      //   currrent: JSON.parse(localStorage.getItem('userData')),

      // })

    },
    fetch_emails() {

      this.$store.dispatch('allUsers/fetch_emails', {
        page: this.page,
        currrent: JSON.parse(localStorage.getItem('userData')),
        // folder: router.currentRoute.params.folder
      }).then(() => {
        // console.log("success")
        this.$toast.success("Emails Fetched!", {
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
        });
        this.$store.dispatch('emails/fetch_emails', {
          page: this.page,
          currrent: JSON.parse(localStorage.getItem('userData')),
          folder: router.currentRoute.params.folder
        })
      });

      // this.isTransition = 'false'

      // this.fetchAll();
      // btn.style.transform = ''
      // page++;
    },
    fetch_new_emails() {

      this.new_page++;
      this.$store.dispatch('allUsers/fetch_emails', {
        page: this.new_page + 1,
        currrent: JSON.parse(localStorage.getItem('userData')),
      }).then(() => {
        console.log("success");

      });
      this.$store.dispatch('emails/fetch_emails', {
        page: this.new_page,
        currrent: JSON.parse(localStorage.getItem('userData')),

      }).then(() => {
        console.log("success");
      });
    },
    fetch_previous_emails() {
      this.new_page--;
      this.$store.dispatch('emails/fetch_emails', {
        page: this.new_page,
        currrent: JSON.parse(localStorage.getItem('userData')),

      }).then(() => {
        console.log("success");
      });
    },
    parse(html) {
      const { htmlToText } = require('html-to-text');
      const text = htmlToText(html, {

      });
      return text.replace(/ *\[[^\]]*] */g, '');
      // return text.replace(/[[\]]/g,'');

      // return tempDivElement.textContent || tempDivElement.innerText || "";
      // return html.replace(/<[^>]+>/g, '');
    },
    parse_from_name(name) {
      return name.replace(/ *\([^)]*\) */g, "");
    }
  },

  setup() {
    const EMAIL_APP_STORE_MODULE_NAME = 'app-email'

    // Register module
    if (!store.hasModule(EMAIL_APP_STORE_MODULE_NAME)) store.registerModule(EMAIL_APP_STORE_MODULE_NAME, emailStoreModule)

    // UnRegister on leave
    onUnmounted(() => {
      if (store.hasModule(EMAIL_APP_STORE_MODULE_NAME)) store.unregisterModule(EMAIL_APP_STORE_MODULE_NAME)
    })

    const { route, router } = useRouter()
    const { resolveLabelColor } = useEmail()

    // Route Params
    const routeParams = computed(() => route.value.params)
    watch(routeParams, () => {
      // eslint-disable-next-line no-use-before-define
      fetchEmails()
    })
    const isCreateSidebarActive = ref(false);
    // Emails & EmailsMeta
    const emails = ref([])
    const emailsMeta = ref({})
    const total_count = ref({})
    var page = 1;
    var new_page = 1;


    const perfectScrollbarSettings = {
      maxScrollbarLength: 150,
    }

    // Search Query
    const routeQuery = computed(() => route.value.query.q)
    const searchQuery = ref(routeQuery.value)
    watch(routeQuery, val => {
      searchQuery.value = val
    })
    var search = '';
    // eslint-disable-next-line no-use-before-define
    watch(searchQuery, () => fetchEmails())
    const updateRouteQuery = val => {
      const currentRouteQuery = JSON.parse(JSON.stringify(route.value.query))

      if (val) currentRouteQuery.q = val
      else delete currentRouteQuery.q

      router.replace({ name: route.name, query: currentRouteQuery })
    }

    console.log(router.currentRoute.params.folder);
    var showIntegration = [];
    const check = () => {



      store.dispatch('users/fetch').then(() => {

        if (store.state.users.user_emails.length > 0) {
          store.state.users.user_emails.forEach(x => {
            x.users.forEach(cb => {

              if (cb.id === 1) {
                showIntegration.push(cb)
                // if(x.emails_setting.length > 0){
                //   showIntegration = true
                // }else{
                //   showIntegration = false
                // }
              }

            });
          });
        }
      })
    }

    // if(store.state.emails.all_emails.length === 0){
    check();
    const fetchEmails = () => {

      store.dispatch('emails/fetch_emails', {
        folder: router.currentRoute.params.folder,
        q: searchQuery.value,
        // q: search,
        // folder: router.currentRoute.params.folder || 'inbox',
        // label: router.currentRoute.params.label,
        currrent: JSON.parse(localStorage.getItem('userData')),

      })
      // .then(response => {
      // console.log(response.data.data.emails);
      // emails.value = response.data.data
      // // const meta2 = response.data.meta.emailsMeta;
      // emailsMeta.value = {'inbox': response.data.meta.emailsMeta}
      // total_count.value = {'total': response.data.meta.email_count}
      // console.log(response.data.meta);
      // })
    }

    fetchEmails()

    // }
    // const fetch_emails = () => {
    //   store.dispatch('allUsers/fetch_emails', {
    //     page: page
    //   }).then(() => {
    //     // fetchEmails()
    //   })
    // };
    // const fetch_new_emails = () => {
    //   new_page = new_page + 1;
    //   console.log(new_page);
    //   store.dispatch('allUsers/fetch_emails', {
    //     page: new_page
    //   }).then(() => {
    //     fetchEmails()
    //   })
    // };

    // ------------------------------------------------
    // Mail Selection
    // ------------------------------------------------
    const selectedEmails = ref([])
    const selectEmails = ref([])
    const toggleSelectedMail = (mailId, message_id) => {
      // selectEmails.value = []
      const mailIndex = selectedEmails.value.indexOf(mailId)
      const selectmailIndex = selectEmails.value.indexOf(mailId)

      if (mailIndex === -1) {

        selectedEmails.value.push(mailId)
        selectEmails.value.push({ id: mailId, message_id: message_id })
      }
      else {
        selectedEmails.value.splice(mailIndex, 1)
        selectEmails.value = []

      }
    }
    const selectAllEmailCheckbox = computed(() => store.state.emails.all_emails.length && (store.state.emails.all_emails.length === selectedEmails.value.length))
    const isSelectAllEmailCheckboxIndeterminate = computed(() => Boolean(selectedEmails.value.length) && store.state.emails.all_emails.length !== selectedEmails.value.length)
    const selectAllCheckboxUpdate = val => {
      if (val) {
        selectedEmails.value = store.state.emails.all_emails.map(mail => mail.parent.id)
        // selectEmails.value.push({id:1})
        selectEmails.value = []
        store.state.emails.all_emails.forEach(element => {
          selectedEmails.value.forEach(e => {
            if (e === element.parent.id) {

              selectEmails.value.push({ id: element.parent.id, message_id: element.parent.message_id })
            }
          });
        });
      } else {
        selectedEmails.value = []
        selectEmails.value = []
      }
      // selectedEmails.value = val ? store.state.emails.all_emails.map(mail => mail.parent.id) : []
      // selectedEmails.value.findIndex(e => e)

      // selectEmails.value = val ? store.state.emails.all_emails.map(mail => mail.parent.id ) : []
    }
    // ? Watcher to reset selectedEmails is somewhere below due to watch dependecy fullfilment

    // ------------------------------------------------
    // Mail Actions
    // ------------------------------------------------
    const toggleStarred = email => {

      console.log('1st' + email.isStarred);
      store.dispatch('app-email/updateEmail', {
        emailIds: email.parent.id,
        dataToUpdate: { isStarred: !email.parent.isStarred, isRead: false },
      }).then(() => {
        // eslint-disable-next-line no-param-reassign
        console.log('2nd' + email.isStarred);
        email.parent.isStarred = !email.parent.isStarred
        fetchEmails()
        showEmailDetails.value = false

        // fetchEmails();
      })
    }
    // fetchEmails();

    const moveSelectedEmailsToFolder = folder => {
      if (folder == 'spam') {


        store.dispatch('app-email/updateEmail', {
          emailIds: selectEmails.value,
          dataToUpdate: {
            isSpam: true, isStarred: false
          },
          folder: folder,
          currrent: JSON.parse(localStorage.getItem('userData'))
        })
          .then(() => { fetchEmails() })
          .finally(() => {
            selectedEmails.value = []
            selectEmails.value = []
          })
      }
      if (folder == 'trash') {
        store.dispatch('app-email/updateEmail', {
          emailIds: selectEmails.value,
          dataToUpdate: { isTrash: true, isStarred: false },
          folder: folder,
          currrent: JSON.parse(localStorage.getItem('userData'))
        })
          .then(() => { fetchEmails() })
          .finally(() => {
            selectedEmails.value = []
            selectEmails.value = []

          })
      }
      if (folder == 'un-spam') {


        store.dispatch('app-email/updateEmail', {
          emailIds: selectEmails.value,
          dataToUpdate: {
            isSpam: "false", isStarred: false
          },
          folder: 'spam',
          currrent: JSON.parse(localStorage.getItem('userData'))
        })
          .then(() => { fetchEmails() })
          .finally(() => {
            selectedEmails.value = []
            selectEmails.value = []

          })
      }
    }

    const updateSelectedEmailsLabel = label => {
      store.dispatch('app-email/updateEmailLabels', {
        emailIds: selectedEmails.value,
        label,
      })
        .then(() => { fetchEmails() })
        .finally(() => { selectedEmails.value = [] })
    }

    const markSelectedEmailsAsUnread = () => {
      store.dispatch('app-email/updateEmail', {
        emailIds: selectedEmails.value,
        dataToUpdate: { isRead: "false", isStarred: false },
        folder: router.currentRoute.params.folder || 'inbox',
        currrent: JSON.parse(localStorage.getItem('userData'))

      })
        .then(() => { fetchEmails() })
        .finally(() => { selectedEmails.value = [] })
    }
    const markSelectedEmailsAsRead = () => {
      store.dispatch('app-email/updateEmail', {
        emailIds: selectedEmails.value,
        dataToUpdate: { isRead: true, isStarred: false },
        folder: router.currentRoute.params.folder || 'inbox',
        currrent: JSON.parse(localStorage.getItem('userData'))
      })
        .then(() => { fetchEmails() })
        .finally(() => { selectedEmails.value = [] })
    }

    // ------------------------------------------------
    // Email Details
    // ------------------------------------------------
    const showEmailDetails = ref(false)
    var emailViewData = ref({})

    const opendedEmailMeta = computed(() => {
      // const openedEmailIndex = emails.value.findIndex(e => e.id === emailViewData.value.id)
      var openedEmailIndex = -1;
      if (emailViewData.value.parent) {

        openedEmailIndex = store.state.emails.all_emails.findIndex((e) => e.parent.id === emailViewData.value.parent.id)
        console.log('index ' + openedEmailIndex);
      }
      return {
        hasNextEmail: Boolean(store.state.emails.all_emails[openedEmailIndex + 1]),
        hasPreviousEmail: Boolean(store.state.emails.all_emails[openedEmailIndex - 1]),
        index: openedEmailIndex
      }
    })
    const updateEmailViewData = email => {
      // Mark email is read
      // if(router.currentRoute.params.folder === 'draft'){

      //   store.dispatch('app-email/updateEmail', {
      //     emailIds: email.id,
      //     folder: router.currentRoute.params.folder || 'inbox',
          
      //   dataToUpdate: { isRead: true, user_id: JSON.parse(localStorage.getItem('userData')).id, mailbox_id: email.parent.id },
      // })
      //   .then(() => {
      //     // If opened email is unread then decrease badge count for email meta based on email folder
      //     if (!email.isRead && (email.folder === 'inbox' || email.folder === 'spam')) {
      //       emailsMeta.value[email.folder] -= 1
      //     }

      //     // eslint-disable-next-line no-param-reassign
      //     // email.isRead = true
      //     if (!router.currentRoute.params.folder || router.currentRoute.params.folder == 'starred') {

      //       fetchEmails()
      //     }
      //   })
      //   .finally(() => {
      //     emailViewData.value = email

      //     showEmailDetails.value = true
      //   })
      // }else{
   if(router.currentRoute.params.folder === 'draft'){
    emailViewData.value = email

        shallShowEmailComposeModal.value = true

          }else{
      
        store.dispatch('app-email/updateEmail', {
          emailIds: email.id,
          folder: router.currentRoute.params.folder || 'inbox',
          
        dataToUpdate: { isRead: true, user_id: JSON.parse(localStorage.getItem('userData')).id, mailbox_id: email.parent.id },
      })
        .then(() => {
          // If opened email is unread then decrease badge count for email meta based on email folder
          if (!email.isRead && (email.folder === 'inbox' || email.folder === 'spam')) {
            emailsMeta.value[email.folder] -= 1
          }

          // eslint-disable-next-line no-param-reassign
          // email.isRead = true
          if (!router.currentRoute.params.folder || router.currentRoute.params.folder == 'starred') {

            fetchEmails()
          }
        })
        .finally(() => {

       
            emailViewData.value = email
          showEmailDetails.value = true
        })
      }
    }
    const moveOpenEmailToFolder = folder => {
      selectedEmails.value = [emailViewData.value.id]
      // moveSelectedEmailsToFolder(folder)
      selectedEmails.value = []
      showEmailDetails.value = false
    }
    const updateOpenEmailLabel = label => {
      selectedEmails.value = [emailViewData.value.id]
      updateSelectedEmailsLabel(label)

      // Update label in opened email
      const labelIndex = emailViewData.value.labels.indexOf(label)
      if (labelIndex === -1) emailViewData.value.labels.push(label)
      else emailViewData.value.labels.splice(labelIndex, 1)

      selectedEmails.value = []
    }

    const markOpenEmailAsUnread = () => {
      selectedEmails.value = [emailViewData.value]
      markSelectedEmailsAsUnread()

      selectedEmails.value = []
      showEmailDetails.value = false
    }

    const changeOpenedEmail = dir => {
      var openedEmailIndex = -1;
      if (emailViewData.value.parent) {

        openedEmailIndex = store.state.emails.all_emails.findIndex((e) => e.parent.id === emailViewData.value.parent.id)
      }
      const newEmailIndex = dir === 'previous' ? openedEmailIndex - 1 : openedEmailIndex + 1
      emailViewData.value = store.state.emails.all_emails[newEmailIndex]
    }

    // * If someone clicks on filter while viewing detail => Close the email detail view
    watch(routeParams, () => {
      showEmailDetails.value = false
    })

    // * Watcher to reset selectedEmails
    // ? You can also use showEmailDetails (instead of `emailViewData`) but it will trigger execution twice in this case
    // eslint-disable-next-line no-use-before-define
    watch([emailViewData, routeParams], () => {
      selectedEmails.value = []
    })
    const perPage = ref(10)
    // const totalCount = ref(store.state.emails.all.length)
    const currentPage = ref(1)
    // Compose
    var shallShowEmailComposeModal = ref(false)
    const shallShowEmailReplyModal = ref(false)


    // Left Sidebar Responsiveness
    const { mqShallShowLeftSidebar } = useResponsiveAppLeftSidebarVisibility()
    // store.dispatch('emails/fetch_all_out_mails')

    return {
      // UI
      perfectScrollbarSettings,
      perPage, currentPage,
      // Emails & EmailsMeta
      emails,
      emailsMeta,
      total_count,
      page,
      new_page,
      fetchEmails,
      check,
      selectEmails,
      search,
      // fetch_emails,
      // fetch_new_emails,
      // Mail Selection
      selectAllEmailCheckbox,
      isSelectAllEmailCheckboxIndeterminate,
      selectedEmails,
      toggleSelectedMail,
      selectAllCheckboxUpdate,

      // Mail Actions
      toggleStarred,
      moveSelectedEmailsToFolder,
      updateSelectedEmailsLabel,
      markSelectedEmailsAsUnread,
      markSelectedEmailsAsRead,
      // Email Details
      showEmailDetails,
      emailViewData,
      opendedEmailMeta,
      showIntegration,
      updateEmailViewData,
      moveOpenEmailToFolder,
      updateOpenEmailLabel,
      markOpenEmailAsUnread,
      changeOpenedEmail,

      // Search Query
      searchQuery,
      updateRouteQuery,

      // UI Filters
      filterTags,
      formatDateToMonthShort,

      // useEmail
      resolveLabelColor,
      isCreateSidebarActive,
      // Compose
      shallShowEmailComposeModal,
      shallShowEmailReplyModal,

      // Left Sidebar Responsiveness
      mqShallShowLeftSidebar,


    }
  },
}
</script>

<style lang="scss" scoped>
#start-email[v-cloak] {
  display: none;
}
</style>

<style lang="scss">
@import "~@core/scss/base/pages/app-email.scss";

// .clicked {
//   transform: rotate(360deg);
//   transition: transform 0.5s ease-in-out;
// }

// #app{
//   visibility:visible!important;
// }
</style>
<style></style>
<style lang="scss" scoped>
.text-red {
  color: red !important;
}

// .rotate{
//     -moz-transition: all 2s linear;
//     -webkit-transition: all 2s linear;
//     transition: all 2s linear!important;
// }

// .rotate.down{
//     -ms-transform: rotate(180deg);
//     -moz-transform: rotate(180deg);
//     -webkit-transform: rotate(180deg);
//     transform: rotate(180deg);
// }
</style>

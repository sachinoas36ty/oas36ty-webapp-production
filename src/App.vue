<template>
  <div id="app" class="h-100" :class="[skinClasses]">
    <!-- <snackbar ref="snackbar" class="hello" position="bottom-left" :multiple="false" style="z-index: 2000;" /> -->
    <invite-user-vue />
    <create-branch-vue />
    <create-category-vue />
    <create-designation-vue />
    <create-client-vue />
    <create-contact-vue />
    <create-lead />
    <ProfileModal />
    <addExpense />
    <google-drive />
    <excel-drive />
    <SendEmail />
    <todo-template />
    <comment-modal />
    <files-modal/>
    <!-- <PaymentsModal /> -->
    <LeadsModal />
    <!-- <CategoryModal/> -->
    <ProposalTemplateModal />
    <FollowUp />
    <officeTimings />
    <BankDetailsModal />
    <subtaskGlobal />
    <InvoiceModal />
    <TaskModal />
    <DueDateModal />
    <ProposalModal />
    <TimsheetModal />

    <!-- <EmailSendModal/> -->
    <component :is="layout">
      <router-view />
    </component>
    <b-modal
      no-close-on-esc
      hide-header-close
      no-close-on-backdrop
      id="timesheet-alert"
      ref="timesheet-alert"
      size="md"
      title="timesheet alert"
      hide-footer
    >
      You have Pending Time Sheet Entry !
      <div class="text-right mt-1">
        <b-button class="mr-1" size="sm" variant="primary" @click="logout">
          Sign Out!
        </b-button>
        <b-button
          class=""
          size="sm"
          variant="primary"
          @click="$refs['timesheet-alert'].hide()"
          v-b-modal.timesheet-modal
        >
          Update Timesheet
        </b-button>
      </div>
    </b-modal>
  </div>
</template>

<script>
import DueDateModal from "./views/pages/tasks/DueDateModal.vue"
// console.log(document.getElementsByClassName('modal-header'))
import "./index.css"
// This will be populated in `beforeCreate` hook
import { $themeColors, $themeBreakpoints, $themeConfig } from "@themeConfig"
import "@mathieustan/vue-datepicker/dist/vue-datepicker.min.css"
import subtaskGlobal from "./views/pages/templates/subtaskGlobal.vue"
import { provideToast } from "vue-toastification/composition"
import { watch } from "@vue/composition-api"
import useAppConfig from "@core/app-config/useAppConfig"
import officeTimings from "./views/pages/settings/officeTimings.vue"
import InviteUserVue from "./views/pages/users/InviteUser.vue"
import TimsheetModal from "./views/pages/settings/TimsheetModal.vue"
import CreateCategoryVue from "./views/pages/categories/CreateCategory.vue"
import SendEmail from "./views/pages/Accounts/SendEmail.vue"
import CreateBranchVue from "./views/pages/branches/CreateBranch.vue"
import CreateClientVue from "./views/pages/clients/CreateClient.vue"
import CreateDesignationVue from "./views/pages/settings/createDesignation.vue"
import CreateLead from "./views/pages/leads/CreateLead.vue"
import FollowUp from "./views/pages/leads/FollowUpModal.vue"

import addExpense from "./views/pages/Accounts/addExpense.vue"
import PaymentsModal from "./views/pages/Accounts/PaymentsModal.vue"
import CreateContactVue from "./views/pages/contact-people/CreateContact.vue"
import { BButton } from "bootstrap-vue"
// import EmailSendModal from '/./views/pages/EmailSendModal.vue'
import { useWindowSize, useCssVar } from "@vueuse/core"
import Snackbar from "vuejs-snackbar"
import store from "@/store"
import ProfileModal from "./layouts/components/ProfileModal.vue"
import LeadsModal from "./views/pages/leads/LeadsModal.vue"
import GoogleDrive from "./views/pages/leads/GoogleDriveModal.vue"
import ExcelDrive from "./views/pages/leads/GoogleDriveExcel.vue"

import CategoryModal from "./views/pages/categories/CategoryModal.vue"
import ProposalTemplateModal from "./views/pages/templates/ProposalTemplateModal.vue"
import TodoTemplate from "./views/pages/templates/todoTemplate.vue"
import CommentModal from "./views/pages/leads/CommentModal.vue"
import FilesModal from './views/pages/leads/FilesModal.vue'

import BankDetailsModal from "./views/pages/bank_details/BankDetailsModal.vue"
// import RecordPaymentModal from './views/pages/tasks/RecordPaymentModal.vue'
import InvoiceModal from "./views/pages/Accounts/InvoiceModal.vue"
import TaskModal from "./views/pages/tasks/TaskModal.vue"
import ProposalModal from "./views/pages/Accounts/ProposalModal.vue"
import pages from "./router/routes/pages"
import { toHex } from "zrender/lib/tool/color"
import { isUserLoggedIn } from "./auth/utils"
const LayoutVertical = () => import("@/layouts/vertical/LayoutVertical.vue")
const LayoutHorizontal = () =>
  import("@/layouts/horizontal/LayoutHorizontal.vue")
const LayoutFull = () => import("@/layouts/full/LayoutFull.vue")
// import {routes}
export default {
  components: {
    DueDateModal,
    CreateCategoryVue,
    CreateBranchVue,
    CreateDesignationVue,
    TimsheetModal,
    CreateClientVue,
    ProposalTemplateModal,
    BButton,
    ExcelDrive,
    BankDetailsModal,
    // RecordPaymentModal,
    FollowUp,
    InvoiceModal,
    TodoTemplate,
    CommentModal,
    FilesModal,
    TaskModal,
    ProposalModal,
    officeTimings,
    PaymentsModal,

    CategoryModal,
    LeadsModal,

    CreateContactVue,
    addExpense,
    subtaskGlobal,
    GoogleDrive,
    SendEmail,
    CreateLead,
    LayoutHorizontal,
    Snackbar,
    LayoutVertical,
    LayoutFull,
    InviteUserVue,
    ProfileModal,
  },
  data() {
    return {
      reloaded: false,
    }
  },
  updated() {
    this.setLocalStoragePrivilege()
  },
  beforeUpdate() {
    let loggedIn = isUserLoggedIn()
    // if(!loggedIn || this.$router.currentRoute.name === 'auth-login'){
    //   this.$refs['timesheet-alert'].hide()
    // }
    let route = this.$router.currentRoute.name
    if (loggedIn && route !== "auth-login") {
      let data = JSON.parse(localStorage.getItem("userTimesheet"))
      if (data === null) {
        this.$refs["timesheet-alert"].show()
      } else if (data.latest_date) {
        let date = new Date(data.latest_date)
        let original = `${date.getFullYear()}-${
          date.getMonth() < 10 ? "0" + date.getMonth() : date.getMonth()
        }-${date.getDate() < 10 ? "0" + date.getDate() : date.getDate()}`
        let curentDate = new Date()
        let original_curr = `${curentDate.getFullYear()}-${
          curentDate.getMonth() < 10
            ? "0" + curentDate.getMonth()
            : curentDate.getMonth()
        }-${
          curentDate.getDate() < 10
            ? "0" + curentDate.getDate()
            : curentDate.getDate()
        }`

        let hour = new Date("2023-04-13 " + data.total_worked_hour)
        // if(date.getDate() !== curentDate.getDate() && hour.getHours() < 7){
        if (original !== original_curr && hour.getHours() < 7) {
          this.$refs["timesheet-alert"].show()
        }
      }
    } else {
      this.$refs["timesheet-alert"].hide()
    }
    this.setLocalStoragePrivilege()
  },
  updated() {
    this.setLocalStoragePrivilege()
  },
  // ! We can move this computed: layout & contentLayoutType once we get to use Vue 3
  // Currently, router.currentRoute is not reactive and doesn't trigger any change
  computed: {
    layout() {
      if (this.$route.meta.layout === "full") return "layout-full"
      return `layout-${this.contentLayoutType}`
    },
    contentLayoutType() {
      return this.$store.state.appConfig.layout.type
    },
  },
  methods: {
    reset_store_variables() {
      let stor = this.$store.state
      stor.expenses.all = []
      stor.expenses.single = []
      stor.expenses.errors = {}

      stor.categories.all = []
      stor.categories.single = []
      stor.categories.errors = {}

      stor.designation.all = []
      stor.designation.single = []
      stor.designation.errors = {}

      stor.status.all = []
      stor.status.all_master = []
      stor.status.single = []
      stor.status.errors = {}

      stor.clients.all = []
      stor.clients.single = []
      stor.clients.errors = {}

      stor.users.all = []
      stor.allUsers.single = []
      stor.allUsers.errors = {}

      stor.attachments.all = []
      stor.attachments.links = []

      stor.attachments.single = []
      stor.attachments.errors = {}

      stor.users.all = []
      stor.users.user_emails = []
      stor.users.emails = []

      stor.users.single = []
      stor.users.errors = {}

      stor.contactPeople.all = []
      stor.contactPeople.single = []
      stor.contactPeople.emails = []
      stor.contactPeople.phones = []
      stor.contactPeople.allForLeads = []
      stor.contactPeople.errors = {}

      stor.invoice.all = []
      stor.invoice.allData = []
      stor.invoice.single = []
      stor.invoice.errors = {}

      stor.recordPayment.all = []
      stor.recordPayment.allData = []
      stor.recordPayment.single = []
      stor.recordPayment.errors = {}

      stor.proposals.all = []
      stor.proposals.allBank = []
      stor.proposals.allProposals = []

      stor.proposals.single = []
      stor.proposals.errors = {}

      stor.leads.all = []
      stor.leads.filter = []
      stor.leads.single = []
      stor.leads.errors = {}

      stor.tasks.all = []
      stor.tasks.filter = []
      stor.tasks.s3_url = []

      stor.tasks.single = []
      stor.tasks.errors = {}

      stor.subtaskTemplate.all = []
      stor.subtaskTemplate.single = []
      stor.subtaskTemplate.errors = {}

      stor.emailTemplate.all = []
      stor.emailTemplate.single = []
      stor.emailTemplate.errors = {}

      stor.branches.all = []
      stor.branches.single = []
      stor.branches.businessTypes = []
      stor.branches.states = []
      stor.branches.logo = []

      stor.branches.errors = {}
    },

    logout() {
      // var t = 'info';
      // this.$refs.snackbar[t](this.$store.state.auth.successMessage)

      this.$store.dispatch("auth/logout").then(() => {
        this.$toast.success("Logged Out Successfully!", {
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
        })
        this.$router.push({ name: "auth-login" })
        // storeAll.commit('branches','RESET_STATE')
        //         let state = this.$store.state;
        // let newState = {};
        localStorage.clear()
        this.reset_store_variables()
        // Object.keys(state).forEach(key => {
        //   newState[key] = null; // or = initialState[key]
        // });

        // this.$store.replaceState({});
      })
      // var t = 'info';
      //   this.$refs.snackbar[t]('You have successfully logged out!')
      // if(this.isLogout == true){
      //   var t = 'info';
      //   this.$refs.snackbar[t](this.$store.state.auth.successMessage)
      //   this.isLogout = false;
      // }
    },
    setLocalStoragePrivilege() {
      this.$store.state.designation.all.forEach((element) => {
        element.users.forEach((x) => {
          if (x.email === JSON.parse(localStorage.getItem("userData")).email) {
            const data = {
              id: element.id,
              designation_name: element.designation_name,
              masters: element.masters,
            }
            // localStorage.removeItem('privileges')
            localStorage.setItem("privileges", JSON.stringify(data))
          } else {
            // localStorage.removeItem('privileges')
          }
        })
      })
    },
    async accept() {
      this.showUpgradeUI = false
      await this.$workbox.messageSW({ type: "SKIP_WAITING" })
    },
  },
  created() {
    console.log()
    if (this.$workbox) {
      this.$workbox.addEventListener("waiting", () => {
        this.showUpgradeUI = true
      })
    }
    //     setTimeout(() => {
    //   for (let i in routes[0].children ){
    //     routes[0].children[i].component();
    //   }
    // }, 1000)
    // if (localStorage.getItem('reloaded')) {
    //     // The page was just reloaded. Clear the value from local storage
    //     // so that it will reload the next time this page is visited.
    //     localStorage.removeItem('reloaded');
    // } else {
    //     // Set a flag so that we know not to reload the page twice.
    //     localStorage.setItem('reloaded', '1');
    //     location.reload();
    // }
  },
  beforeCreate() {
    // Set colors in theme
    const colors = [
      "primary",
      "secondary",
      "success",
      "info",
      "warning",
      "danger",
      "light",
      "dark",
    ]

    // eslint-disable-next-line no-plusplus
    for (let i = 0, len = colors.length; i < len; i++) {
      $themeColors[colors[i]] = useCssVar(
        `--${colors[i]}`,
        document.documentElement
      ).value.trim()
    }

    // Set Theme Breakpoints
    const breakpoints = ["xs", "sm", "md", "lg", "xl"]

    // eslint-disable-next-line no-plusplus
    for (let i = 0, len = breakpoints.length; i < len; i++) {
      $themeBreakpoints[breakpoints[i]] = Number(
        useCssVar(
          `--breakpoint-${breakpoints[i]}`,
          document.documentElement
        ).value.slice(0, -2)
      )
    }

    // Set RTL
    const { isRTL } = $themeConfig.layout
    document.documentElement.setAttribute("dir", isRTL ? "rtl" : "ltr")
  },
  setup() {
    const { skin, skinClasses } = useAppConfig()

    // If skin is dark when initialized => Add class to body
    if (skin.value === "dark") document.body.classList.add("dark-layout")

    // Provide toast for Composition API usage
    // This for those apps/components which uses composition API
    // Demos will still use Options API for ease
    provideToast({
      hideProgressBar: true,
      closeOnClick: false,
      closeButton: false,
      icon: false,
      timeout: 3000,
      transition: "Vue-Toastification__fade",
    })

    // Set Window Width in store
    store.commit("app/UPDATE_WINDOW_WIDTH", window.innerWidth)
    const { width: windowWidth } = useWindowSize()
    watch(windowWidth, (val) => {
      store.commit("app/UPDATE_WINDOW_WIDTH", val)
    })

    return {
      skinClasses,
    }
  },
}
</script>

<template>
  <div>
    <b-modal
      no-close-on-backdrop
      id="proposal-new-modal"
      ref="proposal-new-modal"
      size="lg"
      title="Add proposal"
      hide-footer
      class="b-overlay position-relative"
    >
      <!-- <b-card-body> -->
      <ValidationObserver #default="{ handleSubmit }" ref="refFormObserver">
        <b-form @submit.prevent="handleSubmit(addProposal)">
          <b-row>
            <b-col md="6">
              <ValidationProvider
                #default="validationContext"
                name="pclient"
                vid="clients"
                rules="required"
              >
                <b-form-group>
                  <template #label>
                    Client *
                    <feather-icon
                      icon="EditIcon"
                      class="cursor-pointer"
                      @click="
                        () => {
                          ;(ClientisEditSidebarActive = true),
                            (editItemClient = pclient)
                        }
                      "
                    />
                  </template>
                  <v-select
                    id="clients"
                    v-on:input="autofillClient"
                    label="name"
                    v-model="pclient"
                    placeholder="Search Client"
                    class="select-size-md my-custom-select"
                    :options="show_companys"
                  >
                    <template #list-header>
                      <div class="ml-2 mb-1 mt-1" v-b-modal.modal-clients>
                        <!--  <b-button size="sm" variant="primary"   v-b-modal.modal-1>

                  <feather-icon size="14" style="margin-right: 0.5rem;"  icon="SearchIcon" /> Add Contacts</b-button> -->
                        <a href="#">
                          <feather-icon
                            size="14"
                            style="margin-right: 0.5rem;"
                            icon="PlusIcon"
                          />
                          New Client</a
                        >
                      </div>
                    </template>
                  </v-select>
                  <b-form-invalid-feedback class="d-block">
                    {{ validationContext.errors[0] }}
                  </b-form-invalid-feedback>
                </b-form-group>
              </ValidationProvider>
            </b-col>
            <b-col md="6">
              <b-form-group label="Contact">
                <v-select
                  v-on:input="autofillContact"
                  v-model="pcontact"
                  placeholder="Search Contact"
                  class="select-size-md my-custom-select"
                  label="name"
                  :options="show_contactPerson"
                >
                  <template #list-header>
                    <div class="ml-2 mb-1 mt-1" v-b-modal.modal-contact>
                      <!--  <b-button size="sm" variant="primary"   v-b-modal.modal-1>

                  <feather-icon size="14" style="margin-right: 0.5rem;"  icon="SearchIcon" /> Add Contacts</b-button> -->
                      <a href="#">
                        <feather-icon
                          size="14"
                          style="margin-right: 0.5rem;"
                          icon="PlusIcon"
                        />
                        New Contact</a
                      >
                    </div>
                  </template>
                </v-select>
              </b-form-group>
            </b-col>
            <!-- </b-card-body> -->
          </b-row>
          <b-row>
            <b-col md="6">
              <b-form-group label="Client Name">
                <b-form-input
                  v-model="pname"
                  placeholder="Enter Client Name"
                  class="my-custom-select"
                />

                <!-- </b-form-input> -->
              </b-form-group>
            </b-col>
            <b-col md="6">
              <b-form-group label="Concerned Person">
                <b-form-input
                  v-model="pperson"
                  placeholder="Enter Concerned Person"
                  class="my-custom-select"
                />

                <!-- </b-form-input> -->
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col md="6">
              <b-form-group label="Proposal Date">
                <!-- <b-form-input v-model="pdate" placeholder="Enter Date" /> -->
                <VueDatePicker
                  format="DD-MM-YYYY"
                  :minDate="currentDate"
                  style="border: 1px solid #d8d6de; border-radius: 0.357rem;"
                  id="proposalDate"
                  v-model="pdate"
                />
                <!-- </b-form-input> -->
              </b-form-group>
            </b-col>
            <b-col md="6">
              <ValidationProvider
                #default="validationContext"
                name="paddress"
                vid="address"
                rules="required"
              >
                <b-form-group label="Address *">
                  <b-form-textarea
                    id="address"
                    v-model="paddress"
                    placeholder="Enter Address"
                    class="my-custom-select"
                  />
                  <b-form-invalid-feedback class="d-block">
                    {{ validationContext.errors[0] }}
                  </b-form-invalid-feedback>
                  <!-- </b-form-textarea> -->
                </b-form-group>
              </ValidationProvider>
            </b-col>
          </b-row>
          <b-row>
            <b-col md="12">
              <b-form-group label="Subject">
                <b-form-input
                  v-model="psubject"
                  placeholder="Enter Subject"
                  class="my-custom-select"
                >
                </b-form-input>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col md="12">
              <b-form-group label="Prephase">
                <b-form-input
                  v-model="pphrase"
                  placeholder="Enter Prephase"
                  class="my-custom-select"
                >
                </b-form-input>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row v-for="(items, index) in proposalFields" :key="items.proposal">
            <b-col md="12">
              <b-form-group label="Title">
                <b-form-input
                  v-model="items.title"
                  placeholder="Enter Title"
                  class="my-custom-select"
                >
                </b-form-input>
              </b-form-group>
            </b-col>
            <b-col md="12">
              <b-form-group label="Description">
                <quill-editor
                  v-model="items.desc"
                  :options="editorOption"
                ></quill-editor>
              </b-form-group>
              <div class="text-right">
                <b-button
                  size="sm"
                  @click="removeProposal(index)"
                  variant="outline-primary"
                >
                  Remove
                </b-button>
              </div>
            </b-col>
          </b-row>
          <b-row>
            <b-col class="px-1" md="12">
              <div
                class="actions-proposal my-1 p-2 d-flex justify-content-center bg-light"
              >
                <b-button
                  size="sm"
                  variant="primary"
                  @click="addProposalField()"
                >
                  <span class="text-nowrap"> Add Proposal Section</span>
                </b-button>
                <b-button
                  @click="
                    () => {
                      openModal('list-templates-modal')
                    }
                  "
                  v-show="proposalFields.length === 0"
                  size="sm"
                  class="ml-1"
                  variant="primary"
                >
                  <span class="text-nowrap"> Choose From Templates</span>
                </b-button>
              </div>
            </b-col>
          </b-row>
          <b-row
            style="
              border-bottom: inset;
              border-color: #f75949;
              margin-left: 0rem;
              margin-bottom: 1rem;
              margin-right: 0.5rem;
            "
          >
            <span style="margin-bottom: 0.5rem;" class="text-uppercase">
              fees details
            </span>
          </b-row>
          <!-- <hr style="color:#f75949"> -->
          <b-row v-for="(amount, index) in amountField" :key="index">
            <b-col md="8">
              <b-form-group label="Description">
                <b-form-input
                  v-model="amount.description"
                  placeholder="Enter Description"
                  class="my-custom-select"
                />
              </b-form-group>
            </b-col>
            <b-col class="d-flex flex-column" md="4">
              <ValidationProvider
                #default="validationContext"
                name="amount"
                vid="amount"
                rules="required"
              >
                <b-form-group label="Amount *">
                  <b-form-input
                    type="number"
                    id="amount"
                    v-model="amount.amount"
                    placeholder="Enter Amount"
                    class="my-custom-select"
                  />

                  <!-- </b-form-input> -->
                  <b-form-invalid-feedback class="d-block">
                    {{ validationContext.errors[0] }}
                  </b-form-invalid-feedback>
                </b-form-group>
              </ValidationProvider>
              <div class="text-right">
                <b-button
                  size="sm"
                  v-show="amountField.length > 1"
                  @click="removeAmount(index)"
                  variant="outline-primary"
                >
                  Remove
                </b-button>
                <b-button
                  size="sm"
                  v-show="index === amountField.length - 1"
                  class="ml-1"
                  @click="addAmount()"
                  variant="primary"
                >
                  Add more
                </b-button>
              </div>
            </b-col>
          </b-row>
          <b-row v-show="amountField.length > 1" class="my-1">
            <b-col md="8">
              <div class="bg-light text-right p-1">Total</div>
            </b-col>
            <b-col md="4">
              <div class="bg-light p-1">
                {{ totalAmount }}
              </div>
            </b-col>
          </b-row>
          <b-row>
            <b-col md="12">
              <b-form-group label="Footer Title">
                <b-form-input
                  v-model="pfootertitle"
                  placeholder="Enter Footer Title"
                  class="my-custom-select"
                >
                </b-form-input>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col md="12">
              <b-form-group label="Footer Description">
                <quill-editor
                  v-model="pfooterdesc"
                  :options="editorOption"
                ></quill-editor>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col md="12">
              <!-- <ValidationProvider #default="validationContext" name="pnotes" vid="pnotes" rules="required"> -->

              <b-form-group label="Internal Notes (Not visible for clients)">
                <b-form-input
                  id="pnotes"
                  v-model="pnotes"
                  placeholder="Enter Notes"
                  class="my-custom-select"
                >
                </b-form-input>
                <!-- <b-form-invalid-feedback class="d-block">
                    {{ validationContext.errors[0] }}
                  </b-form-invalid-feedback> -->
              </b-form-group>
              <!-- </ValidationProvider> -->
            </b-col>
          </b-row>
          <b-row>
            <b-col class="py-1 d-flex justify-content-end" md="12">
              <div>
                <b-button
                  size="sm"
                  class="mr-1"
                  variant="primary"
                  @click="$refs['proposal-new-modal'].hide()"
                >
                  <span class="text-nowrap"> Cancel</span>
                </b-button>
                <b-button size="sm" variant="primary" type="submit">
                  <span class="text-nowrap"> Create</span>
                </b-button>
              </div>
            </b-col>
          </b-row>
        </b-form>
      </ValidationObserver>
      <div
        v-if="$store.state.proposals.isLoading"
        class="b-overlay position-absolute"
        style="inset: 0px; z-index: 10; /* display: none; */"
      >
        <div
          class="position-absolute bg-white rounded-sm"
          style="inset: 0px; opacity: 0.75; backdrop-filter: blur(0px);"
        ></div>
        <div
          class="position-absolute d-flex align-items-center flex-column"
          style="
            top: 50%;
            left: 50%;
            transform: translateX(-50%) translateY(-50%);
          "
        >
          <span aria-hidden="true" class="spinner-border text-primary">
            <!----></span
          >
          <br /><span>Adding New Proposals..</span>
        </div>
      </div>
    </b-modal>
  </div>
</template>
<script>
import { VueDatePicker } from "@mathieustan/vue-datepicker"

import imgLogo from "../../../assets/images/logo/centrik-logo.png"
import wordIcon from "../../../assets/images/logo/word-icon.png"
import excelIcon from "../../../assets/images/logo/excel-icon.png"
import slideIcon from "../../../assets/images/logo/slide-icon.png"
import browseIcon from "../../../assets/images/logo/browse-icon.png"
import VueHtml2pdf from "vue-html2pdf"
import EmailSendModal from "../EmailSendModal.vue"
import { quillEditor } from "vue-quill-editor"
import CardAdvanceChat from "./CardAdvanceChat.vue"
import SearchMessages from "./SearchMessages.vue"
import Todo from "./todo.vue"
import EditClient from "../clients/EditSidebar.vue"
import CreateClient from "../clients/CreateClient.vue"
import {
  BFormInvalidFeedback,
  BTooltip,
  BCollapse,
  BForm,
  BFormCheckbox,
  BFormTextarea,
  BModal,
  BTabs,
  BTab,
  BCardHeader,
  BCardBody,
  BCardText,
  VBToggle,
  BCard,
  BRow,
  BCol,
  BLink,
  BFormFile,
  BCalendar,
  BBadge,
  BTable,
  BPagination,
  BDropdownForm,
  BButton,
  BFormDatepicker,
  BFormInput,
  BSpinner,
  BDropdown,
  BContainer,
  BDropdownItem,
  VBTooltip,
  BAvatarGroup,
  BAvatar,
  BFormGroup,
  BIconStarFill,
  VBPopover,
} from "bootstrap-vue"
import { Mentionable } from "vue-mention"
import { required, email } from "@validations"

import { ref } from "@vue/composition-api"
import ToastificationContent from "@core/components/toastification/ToastificationContent.vue"
import Ripple from "vue-ripple-directive"
// import parse from 'html-dom-parser'
// import { required } from 'vee-validate/dist/rules'
import "bootstrap-vue/dist/bootstrap-vue-icons.min.css"
import CreateSidebar from "./CreateSidebar.vue"
import EditSidebar from "./EditSidebar.vue"
import flatPickr from "vue-flatpickr-component"
import draggable from "vuedraggable"

import DropdownDatepicker from "vue-dropdown-datepicker"
import vSelect from "vue-select"
import axios from "axios"
import store from "@/store"
// import { useRouter } from '@core/utils/utils'
import Fuse from "fuse.js"
import Snackbar from "vuejs-snackbar"
import { useToast } from "vue-toastification"
import "vue-toastification/dist/index.css"

import FeatherIcon from "@/@core/components/feather-icon/FeatherIcon.vue"
// import InnerPage from "./InnerPage.vue";
import { useRouter } from "@/@core/utils/utils"
import router from "@/router"
import { includes } from "postcss-rtl/lib/affected-props"
import CreateLead from "./CreateLead.vue"
import EditLeads from "./EditLeads.vue"
import VuePerfectScrollbar from "vue-perfect-scrollbar"
import { ValidationProvider, ValidationObserver } from "vee-validate"
import formValidation from "@/@core/comp-functions/forms/form-validation"
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome"
import { library } from "@fortawesome/fontawesome-svg-core"
import {
  faBars,
  faEnvelopeOpen,
  faEnvelope,
  faComments,
  faComment,
  faCommentDots,
  faCommentDollar,
  faIndianRupee,
} from "@fortawesome/free-solid-svg-icons"
import {
  faTwitter,
  faFacebook,
  faStackOverflow,
  faGithub,
} from "@fortawesome/free-brands-svg-icons"
// library.add()
library.add(
  faBars,
  faComments,
  faComment,
  faCommentDollar,
  faCommentDots,
  faTwitter,
  faEnvelopeOpen,
  faEnvelope,
  faFacebook,
  faStackOverflow,
  faGithub,
  faIndianRupee
)
import html2pdf from "html2pdf.js"
import jspdf from "jspdf"
import html2canvas from "html2canvas"
import jsPDF from "jspdf"
import { isUserLoggedIn } from "@/auth/utils"
// import logo from '../../../../public/centrik-logo.png'

// import
export default {
  components: {
    BFormInvalidFeedback,
    FontAwesomeIcon,
    BTooltip,
    EditClient,
    EmailSendModal,
    BContainer,
    BDropdownForm,
    BFormGroup,
    BTabs,
    BFormFile,
    BTab,
    BForm,
    VueHtml2pdf,
    BCard,
    BCardHeader,
    BCardBody,
    BCardText,
    ValidationObserver,
    ValidationProvider,
    BSpinner,
    BPagination,
    BCalendar,
    CreateLead,
    VueDatePicker,
    Mentionable,
    Todo,
    VuePerfectScrollbar,
    CreateClient,
    BFormInput,
    BCollapse,
    BModal,
    BFormTextarea,
    // InnerPage,
    DropdownDatepicker,
    BRow,
    BBadge,
    CardAdvanceChat,
    SearchMessages,
    Snackbar,
    BFormDatepicker,
    BFormCheckbox,
    BCol,
    draggable,
    BFormGroup,
    BLink,
    BIconStarFill,
    flatPickr,
    BTable,
    BButton,
    BDropdown,
    // eslint-disable-next-line vue/no-unused-components
    VBTooltip,
    BAvatarGroup,
    BAvatar,
    BDropdownItem,
    vSelect,
    CreateSidebar,
    EditSidebar,
    FeatherIcon,
    EditLeads,
    quillEditor,
  },
  directives: {
    "b-tooltip": VBTooltip,
    "b-toggle": VBToggle,
    Ripple,
    required,
  },
  name: "Tasks",

  data() {
    const date = new Date()

    let day = date.getDate()
    let month = date.getMonth() + 1
    let year = date.getFullYear()

    return {
      file_name2: [],
      currentDate: `${year}-${month}-${day}`,
      filetask: null,
      receivedItem: [],
      totalLength: "",
      importantLength: "",
      overDueLength: "",
      dueTodayLength: "",
      dueTomorrowLength: "",
      dueThisWeekLength: "",
      activeTab: 0,
      priority: "",
      id: "",

      client: "",
      subject: "",
      comments: "",
      postDate: "",
      daysLeft: "",
      employees: "",
      priority: "",
      leadStatus: "",
      previleges: {
        edit: false,
        onRowEdit: false,
        viewAll: false,
        conversion: false,
        clientDetails: false,
        timeSheet: false,
        checklist: false,
        delete: false,
        download: false,
      },

      taskNum: 0,
      wordIcon: wordIcon,
      slideIcon: slideIcon,
      browseIcon: browseIcon,
      excelIcon: excelIcon,
      clientNum: 0,
      loader_proposal: false,
      loader_invoice: false,
      loader_payment: false,
      dropTask: false,
      dropClient: false,
      file_name: [],
      arr_comment: [],
      replySubject: "",
      paid_payment: [],
      payment: {
        edit_id: 0,
        title: "add",
        client: null,
        mode: null,
        tax: false,
        branch: null,
        amount: 0,
        date: `${year}-${month}-${day}`,
        reference_id: "",
        notes: "",
        payment: [],
        tds: [],
      },
      invoiceTitle: "add",
      gsterr: true,
      previousPrice: null,
      taskIconName: "ChevronRightIcon",
      clientIconName: "ChevronRightIcon",
      upcomingIconName: "ChevronRightIcon",
      pendingIconName: "ChevronRightIcon",
      historyIconName: "ChevronRightIcon",
      textLength: false,
      prefixPlusid: "",
      invoice: {
        prefix: "",

        client_name: "",
        editId: 0,
        state_code: 0,
        client: null,
        gstNumber: "",
        item_details: "",
        state: null,
        id: "",
        pdate: `${year}-${month}-${day}`,
        due_date: `${year}-${month}-${day}`,
        billing_address: "delhi jangpura",
        notes: "Thank you for your business.",
        amount: null,
        discount: null,
        taxble_amt: null,
        igst: null,
        igst_amt: null,
        cgst: null,
        cgst_amt: null,
        sgst: null,
        sgst_amt: null,
        utgst: null,
        utgst_amt: null,
        total_amt: 0,
        sub_total: 0,
        pocket_expense: null,
        expense_details: "",
        adjustments: 0,
        total: 0,
      },

      totalAmt: 0,
      detailsRowProposal: null,
      proposal_edit_id: 0,
      task_id_subtask: 0,
      todo_subtask: "",
      todo_id_subtask: 0,
      add_todo: false,
      todo_field: [],
      nextTodoId: 2,
      default_todo: [],
      additional_todo: [],
      // inputs: [

      //   { subtask_assignee: null },
      // ],
      // fields: ["subject", "description","actions"],
      filter_active: false,
      option: [{ title: "open" }, { title: "closed" }, { title: "overdue" }],
      selected: { title: "open" },
      importance: [
        { id: 1, star: "StarIcon" },
        { id: 2, star: "StarIcon" },
        { id: 3, star: "StarIcon" },
        { id: 4, star: "StarIcon" },
        { id: 5, star: "StarIcon" },
      ],
      importance2: [
        { id: 1, star: "*" },
        { id: 2, star: "* *" },
        { id: 3, star: "* * *" },
        { id: 4, star: "* * * *" },
        { id: 5, star: "* * * * *" },
      ],

      fields: [
        {
          key: "priority",
          label: "priority",
          tdClass: "width-0",
          thStyle: { width: "0%" },
        },
        {
          key: "iconAttach",
          label: "",
          thClass: "width-0 pl-0",
          tdClass: "width-0 pl-0",
          thStyle: { width: "0%" },
        },
        {
          key: "id",
          label: "#",
          tdClass: "text-left width-0 pl-0 pr-0",
          thClass: "text-left pl-0 pr-0",
          thStyle: { width: "0%" },
        },
        {
          key: "client",
          label: "client",
          tdClass: "width-0",
          thStyle: { width: "17%" },
        },
        {
          key: "subject",
          label: "subject",
          thStyle: { paddingLeft: "0rem", width: "28%" },
          tdClass: "pl-0",
          html: true,
        },
        {
          key: "commentCount",
          label: "commentCount",
          tdClass: "width-0",
          thStyle: { paddingLeft: "0rem", width: "5%" },
          tdClass: "pl-0",
        },
        {
          key: "postDate",
          label: "postDate",
          tdClass: "width-3",
          thStyle: { paddingLeft: "0rem", width: "10%" },
          tdClass: "pl-0",
        },
        {
          key: "daysLeft",
          tdClass: "width-0",
          thClass: "text-center",
          thStyle: { paddingLeft: "0rem", width: "10%" },
          tdClass: "pl-0",
        },
        {
          key: "employees",
          label: "employees",
          tdClass: "text-left width-0",
          thClass: "text-left ",
          thStyle: { paddingLeft: "0rem", width: "10%" },
          tdClass: "pl-0",
        },
        {
          key: "status",
          tdClass: "text-capitalize width-0",
          thStyle: { paddingLeft: "0rem", width: "10%" },
          tdClass: "pl-0",
        },
      ],
      proposalTable: [
        {
          key: "activity",
          label: "activity",
          tdClass: "text-center",
          thClass: "text-center th-color",
        },
        {
          key: "date",
          label: "date",
          tdClass: "text-center",
          thClass: "text-center th-color",
        },
        {
          key: "id",
          label: "no.",
          tdClass: "text-center",
          thClass: "text-center th-color",
        },
        {
          key: "notes",
          label: "internal notes",
          tdClass: "text-center",
          thClass: "text-center th-color",
        },
        {
          key: "amount",
          label: "amount (₹)",
          tdClass: "text-center",
          thClass: "text-center th-color",
        },
        {
          key: "status",
          tdClass: "text-center",
          thClass: "text-center th-color",
        },
      ],
      employees: [
        {
          avatar: require("@/assets/images/avatars/1-small.png"),
          title: "Jane Foster",
        },
        {
          avatar: require("@/assets/images/avatars/3-small.png"),
          title: "Donna Frank",
        },
        {
          avatar: require("@/assets/images/avatars/5-small.png"),
          title: "Gabrielle Robertson",
        },
        {
          avatar: require("@/assets/images/avatars/7-small.png"),
          title: "Lori Spears",
        },
      ],
      selected_item: [],
      selected: 1,
      filterStatus: null,
      filtercompany: null,
      filterCategory: null,
      filterContact: null,
      filterSearch: null,
      FilterPriority: null,
      filterUsers: null,
      filterBranch: null,
      observer: null,
      limit: 8,
      offset: 0,
      limit_users: 4,
      offset_users: 0,
      searchable: "hh",
      search: "",
      changePrioirty: {},
      isCloseable: false,
      selectVal: {
        priority: undefined,
        status_master_id: undefined,
        company_id: undefined,
        contact_person_id: undefined,
        branch_id: undefined,
        category_id: undefined,
      },
      startDate2: `${year}-${month}-${day}`,
      subtask_mentions: [],
      todos: [],
      proposals: [],
      userData: JSON.parse(localStorage.getItem("userData")),
      taskId: null,
      currentDate: `${year}-${month}-${day}`,
      pdate: `${year}-${month}-${day}`,
      pamount: null,
      pclient: "",
      pcontact: "",
      pname: "",
      paddress: "",
      pperson: "",
      pfeesdesc: "",
      pfootertitle: "Thanking you,",
      pfooterdesc: `${
        JSON.parse(localStorage.getItem("userData")).name
      }<br/>For, ${
        JSON.parse(localStorage.getItem("userData")).tenant.organization.name
      }<br/><br/>P:<br/>GSTIN:<br/>(Authorised Representative)`,
      pNotes: "Thanking you",
      psubject: "",
      pphrase: "As per discussion, please find below the brief proposal",
      editIndex: null,
      pnotes: "",
      proposalFields: [],
      editorOption: {
        modules: {
          toolbar: [
            [
              "bold",
              "italic",
              "underline",
              "strike",
              { script: "sub" },
              { script: "super" },
            ],
            ["clean"],
            [{ color: [] }, { background: [] }],
            [{ list: "ordered" }, { list: "bullet" }, { align: [] }],
            ["image"],
            [{ header: [] }, { font: [] }, { size: [] }],
            ["link"],
          ],
        },
        placeholder: "Message",
      },
      amountField: [{ amount: null, description: "" }],
      base64data: "",
      text: "",
      // editorOption: {
      //   modules: {
      //     toolbar: [['bold', 'italic', 'underline', 'strike', { 'script': 'sub' }, { 'script': 'super' }], ['clean'], [{ 'color': [] }, { 'background': [] }], [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'align': [] }], ['image'], [{ 'header': [] }, { 'font': [] }, { 'size': [] }], ['link']],
      //   },
      //   placeholder: 'Message',
      // },
      composeData: {
        message: "",
        to: [],
        cc: [],
        bcc: [],
        from: null,
        file2: null,
      },
      proposalPdf: "PL-0009.pdf",
      file_name: [],
      previewImage: null,
      file: null,
      image: null,
    }
  },

  computed: {
    leads() {
      return this.$store.state.leads.all
        .filter((e) => e.type === "lead")
        .filter((e) => e.type === "lead")
    },
    // leadItems(){
    // let data=this.$store.state.leads.all.filter(e => e.type === 'lead').filter(e => e.type === 'lead');

    // } ,

    Allusers() {
      return this.$store.state.users.all
    },
    allLeads() {
      let arr2 = []
      let arr = this.$store.state.leads.all
        .filter((e) => e.type === "lead")
        .filter((e) => e.type === "lead")
      arr.forEach((element) => {
        this.receivedData.push({
          id: element.branch_id,
          client: element.company_id,
          subject: element.subject,
          //daysLeft:due_date,
          employees: element.users,
          priority: element.priority,
        })
      })
    },
    setPrivileges() {
      let priveleges = []
      let data = this.previleges
      if (this.$store.state.users.all.length > 0) {
        let roles = this.$store.state.users.all
        let currUser = [JSON.parse(localStorage.getItem("userData"))] //.user_role_id

        let designations = this.$store.state.designation.all

        let d2 = designations.filter((x) => {
          for (let i = 0; i < x.users.length; i++) {
            if (x.users[i].user_role_id === currUser[0].user_role_id) {
              return true
            }
          }
          return false
        })

        d2.forEach((x) => {
          x.privileges.forEach((y) => {
            priveleges.push(y)
          })
        })

        let arr = []

        this.$store.state.status.all_master.forEach((x) => {
          if (x.name === "Leads") {
            x.privileges.forEach((y) => {
              priveleges.forEach((z) => {
                if (y.id === z.privilege_id) {
                  arr.push({
                    name: y.name,
                    status: z.status,
                  })
                }
              })
            })
          }
        })

        // console.log(arr, "ppppppppppp");

        arr.forEach((x) => {
          // console.log(x.name === "Leads Editing", "nnnnnnnnnn");
          if (x.name === "Leads Editing") {
            if (x.status === "active") {
              data.edit = true
            }
          } else if (x.name === "View All Leads") {
            if (x.status === "active") {
              data.viewAll = true
            }
          } else if (x.name === "Leads On Row Editing") {
            if (x.status === "active") {
              data.onRowEdit = true
            }
          } else if (x.name === "Leads Conversion") {
            if (x.status === "active") {
              data.conversion = true
            }
          } else if (x.name === "Client Contact Details") {
            if (x.status === "active") {
              data.clientDetails = true
            }
          } else if (x.name === "Timesheet") {
            if (x.status === "active") {
              data.timeSheet = true
            }
          } else if (x.name === "Checklist") {
            if (x.status === "active") {
              data.checklist = true
            }
          } else if (x.name === "Leads Delete") {
            if (x.status === "active") {
              data.delete = true
            }
          } else if (x.name === "Leads Download") {
            if (x.status === "active") {
              data.download = true
            }
          }
        })
      }
      // console.log(data, "dddddddddd");
      return data
    },
    attachmentLoading() {
      let data = this.$store.state.attachments.isLoading
      return data
    },
    showFilesTask() {
      let data = this.$store.state.tasks.allAttachments
      let filter = []
      let num = 0
      data.forEach((element) => {
        if (element.type === "task") {
          let split = element.attachment.split("/")
          element.name = split[split.length - 1]
          filter.push(element)
          num++
        }
      })
      this.taskNum = num
      return filter
      // if (this.$store.state.attachments.all.length > 0) {
      //   let data = this.$store.state.attachments.all;
      //   let filter = [];
      //   let num = 0;
      //   data.forEach((x) => {
      //     if(x.type === 'task'){

      //       let split = x.attachment.split("/");
      //       x.name = split[split.length - 1];
      //       filter.push(x);
      //       num++;
      //     }
      //     });
      //     this.taskNum = num;
      //   // console.log(filter, "ffffffffffff");
      //   return filter;
      // } else {
      //   let data = [];
      //   if (this.$router.currentRoute.name == "tasks") {
      //     data = this.$store.state.tasks.all.filter(e => e.type === 'task');
      //   } else {
      //     data = this.$store.state.leads.all.filter(e => e.type === 'lead').filter(e => e.type === 'lead');
      //   }
      //   let filter = [];
      //   let num = 0;
      //   data.forEach((x) => {
      //     if (x.id === this.taskId) {
      //       x.attachments.forEach((y) => {
      //         if (y.type === "task") {
      //           let split = y.attachment.split("/");
      //           y.name = split[split.length - 1];
      //           filter.push(y);
      //           num++;
      //         }
      //       });
      //     }
      //   });
      //   this.taskNum = num;
      //   // console.log(filter, "ffffffffffff");
      //   return filter;
      // }
    },
    showFilesClient() {
      let data = this.$store.state.tasks.allAttachments
      let filter = []
      let num = 0
      data.forEach((element) => {
        if (element.type === "company") {
          let split = element.attachment.split("/")
          element.name = split[split.length - 1]
          filter.push(element)
          num++
        }
      })
      this.clientNum = num
      return filter
      // if (this.$store.state.attachments.all.length > 0) {
      //   let data = this.$store.state.attachments.all;
      //   let filter = [];
      //   let num = 0;
      //   data.forEach((x) => {
      //     if (y.type === "company") {
      //     let split = x.attachment.split("/");
      //     x.name = split[split.length - 1];
      //     filter.push(x);
      //     num++;
      //     }
      //   });
      //   this.clientNum = num;
      //   return filter;
      // } else {
      //   let data = [];
      //   if (this.$router.currentRoute.name == "tasks") {
      //     data = this.$store.state.tasks.all.filter(e => e.type === 'task');
      //   } else {
      //     data = this.$store.state.leads.all.filter(e => e.type === 'lead').filter(e => e.type === 'lead');
      //   }
      //   let filter = [];
      //   let num = 0;
      //   data.forEach((x) => {
      //     if (x.id === this.taskId) {
      //       x.attachments.forEach((y) => {
      //         if (y.type === "company") {
      //           let split = y.attachment.split("/");
      //           y.name = split[split.length - 1];
      //           filter.push(y);
      //           num++;
      //         }
      //       });
      //     }
      //   });
      //   this.clientNum = num;
      //   console.log(filter.length, "lllllllllllllllll");
      //   return filter;
      // }
    },
    fileLinks() {
      let data = this.$store.state.attachments.links
      return data
    },
    mail_comment() {
      // return this.threadedMail();
    },
    payment_modes() {
      return [
        { id: 1, name: "Cash" },
        { id: 2, name: "Cheque" },
        { id: 3, name: "Bank Transfer" },
      ]
    },
    allStates() {
      return this.$store.state.branches.states
    },
    allProposals() {
      let payment = this.$store.state.recordPayment.all
      let d1 = this.$store.state.invoice.all
      this.payment.payment = []
      for (let index = 0; index < d1.length; index++) {
        // const element = array[index];
        this.payment.payment.push({
          id: index + 1,
          tds: 0,
          amount: 0,
          invoice_id: d1[index].id,
        })
        // this.payment.tds.push({id:index+1,amount:0});
      }
      let d2 = this.$store.state.proposals.allProposals
      let d3 = []
      d1.forEach((element) => {
        element.title = "invoice"
        d3.push(element)
      })
      d2.forEach((element) => {
        element.title = "proposal"
        d3.push(element)
      })
      d1.forEach((e) => {
        payment.forEach((element) => {
          element.invoice.forEach((i) => {
            if (e.id === i.id && element.id === this.payment.edit_id) {
              this.paid_payment.push(e)
            }
          })
        })
      })
      payment.forEach((element) => {
        element.title = "payment"
        d3.push(element)
      })
      // let data = this.$store.state.proposals.allProposals;
      let data = d3
      // let total = 0
      // var amount = [];
      // this.proposals = []

      // for (let index = 0; index < data.length; index++) {
      //   // const element = array[index];
      //   for (let i = 0; i < data[index].proposal_fees.length; i++) {
      //     total = total+data[index].proposal_fees[i].amount

      //       // amount = []
      //       if(data[index].id === data[index].proposal_fees[i].proposal_id){

      //       amount.push({
      //         id:data[index].proposal_fees[i].proposal_id,
      //         amount:data[index].proposal_fees[i].amount,
      //         description: data[index].proposal_fees[i].description
      //       })
      //     }

      //   }
      //   for (let j = 0; j < amount.length; j++) {

      //     if(amount[j].id === 1){

      //   this.proposals.push({activity: 'Proposal',task_id:data[index].task_id,proposal_template_section:data[index].proposal_section,id:data[index].id,pnotes:data[index].internal_notes,total:total, date: data[index].proposal_date, amount: amount

      // , name: data[index].client_name, address: data[index].address, subject: data[index].subject, pphrase: data[index].prephase, pperson: data[index].concerned_person, pfootertitle: data[index].footer_title, pfooterdesc: data[index].footer_description});
      //     }
      //   }

      // }

      // console.log(amount);

      return data
    },
    show_companys() {
      return this.$store.state.clients.all
    },
    show_contactPerson() {
      return this.$store.state.contactPeople.allForLeads
    },
    todo_status() {
      return this.$store.state.appTodo.isLoadingUpdate
    },
    totalAmount() {
      this.pamount = +this.amountField[0].amount
      if (this.amountField.length > 0) {
        for (let i = 1; i < this.amountField.length; i++) {
          this.pamount = this.pamount + +this.amountField[i].amount
        }
      }
      return this.pamount
    },
    filterLeads(val) {
      return this.items.filter((item) => {
        let keep = true

        // This is a basic equality filter. What I did in the actual code was to have an object with filter functions for each key. If a key was missing, it defaulted to straight equality.
        this.fieldKeys.forEach((key) => {
          keep =
            keep &&
            (this.selectVal[key] === undefined ||
              item[key] === this.selectVal[key])
        })

        return keep
      })

      // return this.$store.state.leads.all.filter(e => e.type === 'lead').filter(e => e.type === 'lead').filter(item => {
      //   if(this.FilterPriority != null){

      //     item.priority === this.FilterPriority.id
      //   }
      // });
    },
    fieldKeys() {
      return Object.keys(this.items[0])
    },

    isLoading() {
      this.todos = this.$store.state.appTodo.all
      if (this.$router.currentRoute.name == "tasks") {
        return this.$store.state.tasks.isLoadingLeads
      } else {
        return this.$store.state.leads.isLoadingLeads
      }
    },
    successMessage() {
      return this.$store.state.leads.successMessage
    },
    errorMessage() {
      return this.$store.state.leads.errorMessage
    },
    errors() {
      return this.$store.state.leads.errors.branch_id
        ? this.$store.state.leads.errors.branch_id[0]
        : ""
    },
    totalCount() {
      if (this.$router.currentRoute.name == "tasks") {
        var items = this.$store.state.tasks.all.filter((e) => e.type === "task")
        var count = 0
        if (this.activeTab === 1) {
          count = items.filter((e) => e.priority === 5 || e.priority === 4)
            .length
          //this.importantLength=items.length
        } else if (this.activeTab === 0) {
          count = items.filter(
            (e) =>
              e.priority === 1 ||
              e.priority === 2 ||
              e.priority === 3 ||
              e.priority === 4 ||
              e.priority === 5
          ).length
          //this.totalLength=items.length
        } else if (this.activeTab === 2) {
          count = items.filter(
            (e) => this.DaysLeft(e.created_at, e.due_date) < 0
          ).length
          // this.overDueLength=items.length
        } else if (this.activeTab === 5) {
          // count=items.filter(e => this.dueThisWeek(e.due_date,e.created_at)<=6 && this.dueThisWeek(e.due_date,e.created_at)>0).length
          count = items.filter(
            (e) =>
              this.DaysLeft(e.due_date, e.created_at) <= 6 &&
              this.DaysLeft(e.due_date, e.created_at) > 0
          ).length
        }
        return count
      } else {
        var items = this.$store.state.leads.all
          .filter((e) => e.type === "lead")
          .filter((e) => e.type === "lead")
        var count = 0
        if (this.activeTab === 1) {
          count = items.filter((e) => e.priority === 5 || e.priority === 4)
            .length
          //this.importantLength=items.length
        } else if (this.activeTab === 0) {
          count = items.filter(
            (e) =>
              e.priority === 1 ||
              e.priority === 2 ||
              e.priority === 3 ||
              e.priority === 4 ||
              e.priority === 5
          ).length
          //this.totalLength=items.length
        } else if (this.activeTab === 2) {
          count = items.filter(
            (e) => this.DaysLeft(e.created_at, e.due_date) < 0
          ).length
          // this.overDueLength=items.length
        } else if (this.activeTab === 5) {
          // let today= new Date()
          // let firstDay=new Date(today.setDate(today.getDate() - today.getDay()));
          // let lastDay=new Date(today.setDate(today.getDate() - today.getDay() + 6));
          // console.log(firstDay)
          // console.log(lastDay)
          // let differenceInMilliseconds=lastDay.getTime()-firstDay.getTime()
          // let differenceInDays = differenceInMilliseconds / (24 * 60 * 60 * 1000);
          // console.log(differenceInDays)

          //  let day = date.getDate();
          //  console.log('this is dayyyyyyyyyy',day)
          count = items.filter(
            (e) =>
              this.DaysLeft(e.created_at, e.due_date) <= 6 &&
              this.DaysLeft(e.created_at, e.due_date) >= 0
          ).length
        }
        return count
      }
    },
    items() {
      if (this.setPrivileges.viewAll === true) {
        var items = []
        if (this.$router.currentRoute.name == "tasks") {
          // check if the user is owner or not
          if (
            this.$store.state.users.all.filter(
              (e) =>
                e.email === JSON.parse(localStorage.getItem("userData")).email
            )[0].user_role_id === 1
          ) {
            items = this.$store.state.tasks.all
              .filter((e) => e.type === "task")
              .filter((e) => e.type === "task")
            // items = this
          } else {
            this.$store.state.tasks.all
              .filter((e) => e.type === "task")
              .filter((e) => e.type === "task")
              .forEach((a) => {
                if (
                  a.users.filter(
                    (e) =>
                      e.email ===
                      JSON.parse(localStorage.getItem("userData")).email
                  ).length > 0
                ) {
                  items.push(a)
                }
              })
          }
        } else {
          // items = this.$store.state.leads.all.filter(e => e.type === 'lead').filter(e => e.type === 'lead');
          if (
            this.$store.state.users.all.filter(
              (e) =>
                e.email === JSON.parse(localStorage.getItem("userData")).email
            )[0].user_role_id === 1
          ) {
            items = this.$store.state.leads.all
              .filter((e) => e.type === "lead")
              .filter((e) => e.type === "lead")
              .filter((e) => e.type === "lead")
            // items = this
          } else {
            this.$store.state.leads.all
              .filter((e) => e.type === "lead")
              .filter((e) => e.type === "lead")
              .filter((e) => e.type === "lead")
              .forEach((a) => {
                if (
                  a.users.filter(
                    (e) =>
                      e.email ===
                      JSON.parse(localStorage.getItem("userData")).email
                  ).length > 0
                ) {
                  items.push(a)
                }
              })
          }
          if (this.activeTab === 0) {
            // items=items.filter(e =>e.priority === 1 || e.priority===2||e.priority === 3 || e.priority===4|| e.priority===5)
          } else if (this.activeTab === 1) {
            items = items.filter((e) => e.priority === 5 || e.priority === 4)
          } else if (this.activeTab === 2) {
            items = items.filter(
              (e) => this.DaysLeft(e.created_at, e.due_date) < 0
            )
          } else if (this.activeTab === 3) {
            items = items.filter(
              (e) =>
                this.DaysLeft(e.created_at, e.due_date) >= 0 &&
                this.DaysLeft(e.created_at, e.due_date) < 1
            )
          } else if (this.activeTab === 4) {
            items = items.filter(
              (e) =>
                this.DaysLeft(e.created_at, e.due_date) > 0 &&
                this.DaysLeft(e.created_at, e.due_date) <= 1
            )
          } else if (this.activeTab === 5) {
            // let today= new Date()
            // let firstDay=new Date(today.setDate(today.getDate() - today.getDay()));
            // let lastDay=new Date(today.setDate(today.getDate() - today.getDay() + 6));
            // console.log(firstDay)
            // console.log(lastDay)
            // let differenceInMilliseconds=lastDay.getTime()-firstDay.getTime()
            // let differenceInDays = differenceInMilliseconds / (24 * 60 * 60 * 1000);
            // console.log(differenceInDays)

            //  let day = date.getDate();
            //  console.log('this is dayyyyyyyyyy',day)
            items = items.filter(
              (e) =>
                this.DaysLeft(e.created_at, e.due_date) <= 6 &&
                this.DaysLeft(e.created_at, e.due_date) > 0
            )
          }
        }

        //{

        //    const date1 = new Date(e.created_at);
        //    const date2 = new Date(e.due_date);
        //    const diffInMilliseconds = date2.getTime() - date1.getTime();
        //    const diffInDays = diffInMilliseconds / (1000 * 60 * 60 * 24);
        //    e.diffInDays<0
        //   }

        //)

        // var users= items.map(item => item.users.length > 0 ? item : null)
        // var users= items.map(item => item.users.length > 0 ?? item.id)
        // items.splice(users)
        var element = []
        var element2 = ""
        for (let index = 0; index < items.length; index++) {
          element[index] = items[index]

          if (
            (items[index].users.length === 0 && this.filterUsers != null) ||
            (items[index].status_master == null && this.filterStatus != null)
          ) {
            // if(this.filterUsers != null){
            element.splice(element.indexOf(element[index]), 1)

            // }
            // if(this.filterUsers == null){
            //   element[index] = items[index]
            // }
          }
        }

        return element.sort(
          (a, b) => new Date(b.updated_at) - new Date(a.updated_at)
        )
      } else {
        var items = []
        // if (this.$router.currentRoute.name == "tasks") {
        //   items = this.$store.state.tasks.all.filter(e => e.type === 'task');
        // } else {
        //   items = this.$store.state.leads.all.filter(e => e.type === 'lead').filter(e => e.type === 'lead');
        // }
        // var users= items.map(item => item.users.length > 0 ? item : null)
        // var users= items.map(item => item.users.length > 0 ?? item.id)
        // items.splice(users)
        var element = []
        var element2 = ""
        for (let index = 0; index < items.length; index++) {
          element[index] = items[index]

          if (
            (items[index].users.length === 0 && this.filterUsers != null) ||
            (items[index].status_master == null && this.filterStatus != null)
          ) {
            // if(this.filterUsers != null){
            element.splice(element.indexOf(element[index]), 1)

            // }
            // if(this.filterUsers == null){
            //   element[index] = items[index]
            // }
          }
        }
        let arr = element.sort(
          (a, b) => new Date(b.updated_at) - new Date(a.updated_at)
        )

        // let result = [arr[0]];

        return items
      }
    },
    updateTab() {},
    companys() {
      // return this.$store.state.clients.all
      var data = []
      for (
        let index = 0;
        index < this.$store.state.clients.all.length;
        index++
      ) {
        data[index] = this.$store.state.clients.all[index].name
      }

      // return data;
      return data.filter((country) =>
        country.toLocaleLowerCase().includes(this.search.toLocaleLowerCase())
      )
    },
    paginated_companys() {
      return this.companys.slice(this.offset, this.limit + this.offset)
    },
    companys_hasNextPage() {
      const nextOffset = this.offset + this.limit
      return Boolean(
        this.companys.slice(nextOffset, this.limit + nextOffset).length
      )
    },
    companys_hasPrevPage() {
      const prevOffset = this.offset - this.limit
      return Boolean(
        this.companys.slice(prevOffset, this.limit + prevOffset).length
      )
    },
    category() {
      // return this.$store.state.categories.all
      var data = []
      for (
        let index = 0;
        index < this.$store.state.categories.all.length;
        index++
      ) {
        data[index] = this.$store.state.categories.all[index].name
      }

      // return data;
      return data.filter((country) =>
        country.toLocaleLowerCase().includes(this.search.toLocaleLowerCase())
      )
    },
    paginated_category() {
      return this.category.slice(this.offset, this.limit + this.offset)
    },
    category_hasNextPage() {
      const nextOffset = this.offset + this.limit
      return Boolean(
        this.category.slice(nextOffset, this.limit + nextOffset).length
      )
    },
    category_hasPrevPage() {
      const prevOffset = this.offset - this.limit
      return Boolean(
        this.category.slice(prevOffset, this.limit + prevOffset).length
      )
    },
    branches() {
      var data = []
      for (
        let index = 0;
        index < this.$store.state.branches.all.length;
        index++
      ) {
        data[index] = this.$store.state.branches.all[index].name
      }

      // return data;
      return data.filter((country) =>
        country.toLocaleLowerCase().includes(this.search.toLocaleLowerCase())
      )
      var name = []
      var id = []
      for (let index = 0; index < data.length; index++) {
        name[index] = data[index].name
        id[index] = data[index].id
      }
      // return name;
      // return
      // var obj = {
      //   name: name.filter((b) => b.includes(this.filterBranch)),
      //   // id : id.filter((b) => b.includes(this.filterBranch)),
      // }
      return obj
    },
    paginated_branch() {
      return this.branches.slice(this.offset, this.limit + this.offset)
    },
    hasNextPage() {
      const nextOffset = this.offset + this.limit
      return Boolean(
        this.branches.slice(nextOffset, this.limit + nextOffset).length
      )
    },
    hasPrevPage() {
      const prevOffset = this.offset - this.limit
      return Boolean(
        this.branches.slice(prevOffset, this.limit + prevOffset).length
      )
    },
    users_to_assign() {
      var items = this.$store.state.users.all.filter(
        (e) => e.email !== JSON.parse(localStorage.getItem("userData")).email
      )
      var data = []
      var leads = this.$store.state.leads.all
        .filter((e) => e.type === "lead")
        .filter((e) => e.type === "lead")
        .filter((e) => e.type === "lead")
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

          name: items[index].name,
          avatar: items[index].avatar,
        }
        // if(leads[i].users[j].id === items[index].id){
        //   console.log('already assigned');
        // }

        // }
        // }
      }
      return data.filter((country) =>
        country.name
          .toLocaleLowerCase()
          .includes(this.search.toLocaleLowerCase())
      )
    },
    paginated_users_to_assign() {
      return this.users_to_assign.slice(
        this.offset_users,
        this.limit_users + this.offset_users
      )
    },
    users() {
      // return this.$store.state.users.all
      var data = []
      for (let index = 0; index < this.$store.state.users.all.length; index++) {
        data[index] = this.$store.state.users.all[index].name
      }

      // return data;
      if (this.search.includes("@")) {
        // this.subtask_assignee = this.search.('@')
        // this.search.replace('@', ' ')

        return data.filter((country) =>
          country.toLocaleLowerCase().includes(this.search.toLocaleLowerCase())
        )
      } else {
        return data.filter((country) =>
          country.toLocaleLowerCase().includes(this.search.toLocaleLowerCase())
        )
      }
    },
    paginated_users() {
      return this.users.slice(this.offset, this.limit + this.offset)
    },
    users_hasNextPage() {
      const nextOffset = this.offset + this.limit
      return Boolean(
        this.users.slice(nextOffset, this.limit + nextOffset).length
      )
    },
    users_hasPrevPage() {
      const prevOffset = this.offset - this.limit
      return Boolean(
        this.users.slice(prevOffset, this.limit + prevOffset).length
      )
    },
    contactPerson() {
      // return this.$store.state.contactPeople.allForLeads
      var data = []
      for (
        let index = 0;
        index < this.$store.state.contactPeople.allForLeads.length;
        index++
      ) {
        data[index] = this.$store.state.contactPeople.allForLeads[index].name
      }

      // return data;
      return data.filter((country) =>
        country.toLocaleLowerCase().includes(this.search.toLocaleLowerCase())
      )
    },
    outBoundEmails() {
      return this.$store.state.emails.all_outbound_emails
    },
    emails_contact() {
      // return this.$store.state.contactPeople.allForLeads
      var data = []
      // var index2 = [];
      // for (let index = 0; index < this.$store.state.contactPeople.all.length; index++) {
      // index2[index] = [index];
      for (let i = 0; i < this.$store.state.contactPeople.emails.length; i++) {
        data[i] = this.$store.state.contactPeople.emails[i]
      }
      // }
      // return index2;

      return data
      return data.filter((country) => country.includes(this.search))
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
    assignedUsers() {
      var items = this.$store.state.comments.assignedUsers
      const element = []
      for (let index = 0; index < items.length; index++) {
        element[index] = {
          id: items[index].id,
          users: items[index].users,
        }
      }
      return element
    },
    todo() {
      this.todos = this.$store.state.appTodo.all

      return this.$store.state.appTodo.all
    },
    // proposal(){
    //   this.proposal = this.$store.state.appTodo.all
    //   return this.$store.state.appTodo.all;
    // }
  },
  created() {
    let loggedIn = isUserLoggedIn()

    //console.log('helllllloooooooooo',this.$store.state.leads.all.filter(e => e.type === 'lead').filter(e => e.type === 'lead'))

    if (loggedIn) {
      this.fetchAll()
      if (this.outBoundEmails.length === 0) {
        this.$store.dispatch("emails/fetch_all_out_mails")
      }
      this.$store.dispatch("proposals/fetch")
      this.$store.dispatch("invoice/fetch")

      if (this.$store.state.branches.states.length === 0) {
        // this.$store.dispatch('branches/states')
      }
      // this.$store.dispatch("leads/fetch");
      this.$store.dispatch("branches/fetch")
      this.$store.dispatch("clients/fetch")
      this.$store.dispatch("contactPeople/fetchForLeads")
      this.$store.dispatch("contactPeople/fetch")

      this.$store.dispatch("categories/fetch")
      this.$store.dispatch("status/fetch")
    }
    // this.$store.dispatch('comments/fetch');
    this.observer = new IntersectionObserver(this.infiniteScroll)
    // const toast = useToast();
    // toast.success('you did it');
  },
  beforeUpdate() {
    if (this.$router.currentRoute.params.important_status === true) {
      this.activeTab = 1
      // alert(this.activeTab)
    }
    if (this.$router.currentRoute.params.overdue_status === true) {
      this.activeTab = 2
      // alert(this.activeTab)
    }
    if (this.$router.currentRoute.params.dueToday_status === true) {
      this.activeTab = 3
      // alert(this.activeTab)
    }
    if (this.$router.currentRoute.params.dueTomorrow_status === true) {
      this.activeTab = 4
      // alert(this.activeTab)
    }
    if (this.$router.currentRoute.params.dueThisWeek_status === true) {
      this.activeTab = 5
      // alert(this.activeTab)
    }
    var signAll = []
    if (this.$store.state.users.signAll != null) {
      signAll.push(this.$store.state.users.signAll)
    }
    if (signAll.length > 0) {
      this.composeData.message = signAll[0].signature
    }
    // var signAll = [this.$store.state.users.signAll];
    // this.threadedMail()
    this.totalBadgeCounts()
    this.importantBadgeCounts()
    this.overdueBadgeCounts()
    this.dueTodayBadgeCounts()
    this.dueTomorrowBadgeCounts()
    this.dueThisWeekBadgeCounts()
    var invoice = this.$store.state.invoice.all
    // invoice.forEach(element => {
    //   this.payment.payment.push({amount:null})
    // });
    if (invoice.length > 0) {
    }
    this.prefixPlusid = this.invoice.prefix + this.invoice.id
    // document.getElementById('flatpickr-date').removeAttribute('readonly')
    // var invoice = this.$store.state.invoice.all;
    // if (invoice.length > 0) {
    //   this.invoice.id = invoice[invoice.length - 1].id + 1
    // } else {
    //   this.invoice.id = 1
    // }
    if (this.successMessage) {
      if (this.$store.state.leads.isLoadingLeads == true) {
        // this.$toast.info({component: ToastificationContent,props:{text:'Info '}}, {position: POSITION.BOTTOM_LEFT})
        // const toast = useToast;
        // toast.success('hee')
        // this.$toast.success(this.successMessage, {
        //   position: "bottom-left",
        //   timeout: 5000,
        //   closeOnClick: true,
        //   pauseOnFocusLoss: true,
        //   pauseOnHover: true,
        //   draggable: true,
        //   draggablePercent: 0.6,
        //   showCloseButtonOnHover: false,
        //   hideProgressBar: true,
        //   closeButton: "button",
        //   icon: true,
        //   rtl: false
        // })
        // this.$refs.snackbar[t](this.successMessage)
        // this.$toast(
        // {
        //   component: ToastificationContent,
        //   props: {
        //     title: this.successMessage,
        //     icon: "CheckIcon",
        //     variant: "dark",
        //   },
        // },{
        //   position: "bottom-left",
        //   timeout: 8000
        // }
        // )
      }
    }
  },

  updated() {
    this.autofillClient()
    // this.getTaxbleAmt()
    var t = "info"
    // if(this.errors != ''){
    //   console.log('hhh');
    //   this.$toast.error('this.errors.branch_id[0]', {
    //     position: "bottom-left",
    //     timeout: 5000,
    //       closeOnClick: true,
    //       pauseOnFocusLoss: true,
    //       pauseOnHover: true,
    //       draggable: true,
    //       draggablePercent: 0.6,
    //       showCloseButtonOnHover: false,
    //       hideProgressBar: true,
    //       closeButton: "button",
    //       icon: true,
    //       rtl: false
    //     })
    //   }
  },

  methods: {
    file_upload() {
      console.log("hloo2:file_upload")
      document.getElementById("file_attachment").click()
      //  this.uploadFileS3(this.file_name2)
      // const image = e.target.files[0];
      // const reader = new FileReader();
      // var base = reader.readAsDataURL(image)
      // console.log(base);
      // console.log(e);
    },
    onFileChange2(e) {
      // alert('hh');
      console.log("hllo1 : onfileChange2")

      let image = e.target.files
      console.log("e:", e)
      this.file_name2 = []
      console.log("inside onload before2:", this.file_name2)
      // console.log(image.length);
      image.forEach((x) => {
        const reader = new FileReader()

        console.log("reader:", reader)
        reader.onload = (e) => {
          let data = {
            file: e.target.result,
            name: x.name,
          }
          console.log("data:", data)
          console.log("inside onload before:", this.file_name2)
          this.file_name2.push(data)
          console.log("inside onload:", this.file_name2)
          console.log("inside onload:", this.file_name2.length)
          //  var data1 =  {
          this.uploadFileS3Task(this.file_name2)
          //attach:this.file_name2.length>0 ? this.file_name2 : "null"};

          //console.log("data-in-upload:",data1)

          //  console.log()
          //this.$store.dispatch('tasks/upload_file_s3', { data: data1}).then(() => {

          //  }).catch(() => {

          //   })

          // url[index] = data;
        }

        // const element = array[index];

        reader.readAsDataURL(x)
        // reader.readAsDataURL(this.file_name2[index])
        // console.log(cd);

        // real_url[index] = url;
        //  console.log(this.file_name2);
      })

      // alert(this.file_name2);

      // if(this.file_name2.length > 0){
      console.log("inside onload after the loop:", this.file_name2)
      //   if(this.file_name2.length > 0){
      // this.uploadFileS3(this.file_name2)

      //   }
      // }
      // console.log(cd);
      // var base = reader.readAsDataURL(image)
      //   console.log(reader);
      // this.file_name2 =
      //   image.name
      // type: image.type

      // console.log(e.target.files[0]);

      /* var data =  {
        attach:this.file_name2.length>0 ? this.file_name2 : "null"};

      console.log("data-in-upload:",data)

      console.log()
      this.$store.dispatch('tasks/upload_file_s3', { data: data}).then(() => {



      }).catch(() => {


      })*/
    },
    uploadFileS3Task(file) {
      // document.getElementById('fileUpload2').click()
      console.log("filelength:", file.length)
      console.log("file:", file)
      var data = {
        attach: file ? file : "null",
      }
      this.$store.dispatch("tasks/upload_file_s3", { data: data })
      // .then(() => {
      //   // resolve();
      // })
      // .catch(() => {});
      //   var emails_data = {
      //   folder: router.currentRoute.params.folder,
      //   currrent : JSON.parse(localStorage.getItem('userData'))
      // };
      // this.$store.dispatch('emails/fetch_emails', emails_data)
    },

    sendEmail2(data2, file_name2) {
      // alert('he')
      data2.subject = this.replySubject
      console.log("sending emails...")
      console.log(data2, "data2")
      var bcc_email = []
      var cc_email = []

      var s3_url = null
      var s3_urls = []
      if (this.$store.state.tasks.s3_url.length > 0) {
        s3_url = this.$store.state.tasks.s3_url
      }
      if (s3_url != null) {
        for (let index = 0; index < s3_url.length; index++) {
          s3_urls[index] = s3_url[index].url
        }
      }
      if (!data2.from || !data2.message || !data2.to || !data2.subject) {
        return
      } else {
        this.$refs["reply-modal"].hide()
      }
      if (data2.bcc) {
        data2.bcc.forEach(function (email, index) {
          // console.log(email.email);
          bcc_email[index] = email.email
        })
      }
      if (data2.cc) {
        data2.cc.forEach(function (email, index) {
          // console.log(email.email);
          cc_email[index] = email.email
        })
      }
      var data = {}
      if (data2.bcc || data2.cc) {
        data = {
          to: data2.to,
          bcc: data2.bcc,
          cc: data2.cc,
          attach_url: s3_urls,
          message: data2.message,
          plain_text: data2.message.replace(/(<([^>]+)>)/gi, ""),
          subject: data2.subject,
          from: data2.from,
        }
      } else {
        data = {
          to: data2.to,
          // "bcc" : bcc_email,
          // "cc" : cc_email,
          attach_url: s3_urls,
          plain_text: data2.message.replace(/(<([^>]+)>)/gi, ""),
          message: data2.message,
          subject: data2.subject,
          from: data2.from,
        }
      }
      this.$toast.success("Sending", {
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
      console.log(data)
      // this.success = this.$toast();
      this.$store.dispatch("emails/sendEmail", { data }).then(() => {
        // console.log(res);
        if (this.successMessage) {
          this.$toast.success("Email Sent Succesfully!", {
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
        }
        // this.$refs['compose-modal'].hide()
        this.composeData.to = ""
        this.composeData.from = ""
        this.composeData.cc = ""
        this.composeData.bcc = ""
        this.composeData.subject = ""
        this.composeData.message = ""
        while (this.file_name2.length > 0) {
          this.file_name2.pop()
        }
      })
    },
    openCalendar(id) {
      document.getElementById("vue-date-pickr" + id).click()
    },
    chooseFileTask() {
      document.getElementById("file_task").click()
    },
    // onTabChange(tab){
    //   console.log(this.activeTab, "this is active tab")
    //   if(this.activeTab==0){
    //    console.log('hello this is avtive tab')
    //   }
    // },
    //  async totalBadgeCounts(){
    //     let data=[];
    //     if(this.$store.state.users.all.filter(e => e.email === JSON.parse(localStorage.getItem('userData')).email)[0].user_role_id === 1){
    //           data = this.$store.state.leads.all.filter(e => e.type === 'lead').filter(e => e.type === 'lead');
    //           // items = this
    //         }else{
    //       this.$store.state.leads.all.filter(e => e.type === 'lead').filter(e => e.type === 'lead').forEach(a => {
    //           if(a.users.filter(e => e.email === JSON.parse(localStorage.getItem('userData')).email).length > 0){
    //             data.push(a)
    //           }

    //         });
    //       }
    //     data=data.filter(e  =>e.priority === 1 || e.priority===2||e.priority === 3 || e.priority===4|| e.priority===5)
    //     this.totalLength=data.length
    //   },
    // async importantBadgeCounts(){
    //   // let data=this.$store.state.leads.all.filter(e => e.type === 'lead').filter(e => e.type === 'lead');
    //   let data=[];
    //   if(this.$store.state.users.all.filter(e => e.email === JSON.parse(localStorage.getItem('userData')).email)[0].user_role_id === 1){
    //         data = this.$store.state.leads.all.filter(e => e.type === 'lead').filter(e => e.type === 'lead');
    //         // items = this
    //       }else{
    //     this.$store.state.leads.all.filter(e => e.type === 'lead').filter(e => e.type === 'lead').forEach(a => {
    //         if(a.users.filter(e => e.email === JSON.parse(localStorage.getItem('userData')).email).length > 0){
    //           data.push(a)
    //         }

    //       });
    //     }
    //   data=data.filter(e  => e.priority === 5 || e.priority===4)
    //   this.importantLength=data.length
    // },
    // async  overdueBadgeCounts(){
    //   // let data=this.$store.state.leads.all.filter(e => e.type === 'lead').filter(e => e.type === 'lead');
    //   let data=[];
    //   if(this.$store.state.users.all.filter(e => e.email === JSON.parse(localStorage.getItem('userData')).email)[0].user_role_id === 1){
    //         data = this.$store.state.leads.all.filter(e => e.type === 'lead').filter(e => e.type === 'lead');
    //         // items = this
    //       }else{
    //     this.$store.state.leads.all.filter(e => e.type === 'lead').filter(e => e.type === 'lead').forEach(a => {
    //         if(a.users.filter(e => e.email === JSON.parse(localStorage.getItem('userData')).email).length > 0){
    //           data.push(a)
    //         }

    //       });
    //     }
    //   data=data.filter(e  => this.DaysLeft(e.created_at, e.due_date) < 0)
    //   this.overDueLength=data.length
    // },
    // async dueTomorrowBadgeCounts(){
    //   // let data=this.$store.state.leads.all.filter(e => e.type === 'lead').filter(e => e.type === 'lead');
    //   let data=[];
    //   if(this.$store.state.users.all.filter(e => e.email === JSON.parse(localStorage.getItem('userData')).email)[0].user_role_id === 1){
    //         data = this.$store.state.leads.all.filter(e => e.type === 'lead').filter(e => e.type === 'lead');
    //         // items = this
    //       }else{
    //     this.$store.state.leads.all.filter(e => e.type === 'lead').filter(e => e.type === 'lead').forEach(a => {
    //         if(a.users.filter(e => e.email === JSON.parse(localStorage.getItem('userData')).email).length > 0){
    //           data.push(a)
    //         }

    //       });
    //     }
    //   data=data.filter(e =>this.DaysLeft(e.created_at, e.due_date)>0 && this.DaysLeft(e.created_at, e.due_date)<=1)
    //   this.dueTomorrowLength=data.length

    // },
    // async  dueTodayBadgeCounts(){
    //   // let data=this.$store.state.leads.all.filter(e => e.type === 'lead').filter(e => e.type === 'lead');
    //   let data=[];
    //   if(this.$store.state.users.all.filter(e => e.email === JSON.parse(localStorage.getItem('userData')).email)[0].user_role_id === 1){
    //         data = this.$store.state.leads.all.filter(e => e.type === 'lead').filter(e => e.type === 'lead');
    //         // items = this
    //       }else{
    //     this.$store.state.leads.all.filter(e => e.type === 'lead').filter(e => e.type === 'lead').forEach(a => {
    //         if(a.users.filter(e => e.email === JSON.parse(localStorage.getItem('userData')).email).length > 0){
    //           data.push(a)
    //         }

    //       });
    //     }
    //   data=data.filter(e =>this.DaysLeft(e.created_at, e.due_date)>=0 && this.DaysLeft(e.created_at, e.due_date)<1 )
    //   this.dueTodayLength=data.length
    // },
    // async dueThisWeekBadgeCounts(){
    //   // let data=this.$store.state.leads.all.filter(e => e.type === 'lead').filter(e => e.type === 'lead');
    //   let data=[];
    //   if(this.$store.state.users.all.filter(e => e.email === JSON.parse(localStorage.getItem('userData')).email)[0].user_role_id === 1){
    //         data = this.$store.state.leads.all.filter(e => e.type === 'lead').filter(e => e.type === 'lead');
    //         // items = this
    //       }else{
    //     this.$store.state.leads.all.filter(e => e.type === 'lead').filter(e => e.type === 'lead').forEach(a => {
    //         if(a.users.filter(e => e.email === JSON.parse(localStorage.getItem('userData')).email).length > 0){
    //           data.push(a)
    //         }

    //       });
    //     }
    //   data=data.filter(e  => this.DaysLeft(e.created_at,e.due_date)<=6 && this.DaysLeft(e.created_at,e.due_date)>0)
    //   this.dueThisWeekLength=data.length
    // },
    // async dueTodayBadgeCounts(){
    //   let data=this.$store.state.leads.all.filter(e => e.type === 'lead').filter(e => e.type === 'lead');
    //   data=data.filter(e =>)
    // },
    //     dueThisWeek(due,created){

    // const dueDate = new Date(due);
    // const createdDate = new Date(created);

    // // calculate the difference in days
    // const differenceInMilliseconds = dueDate.getTime() - createdDate.getTime();
    //   const differenceInDays = Math.round( differenceInMilliseconds / (24 * 60 * 60 * 1000));
    // //console.log(differenceInDays)
    // // console.log(differenceInMilliseconds)
    // return differenceInDays

    //     }
    //   ,

    // async exportToPDF(i) {
    //   // console.log(urlBase64);
    //   this.loader_proposal = true;
    //   setTimeout(() => {
    //     this.loader_proposal = false;
    //   }, 2000);
    //   // console.log(urlb);
    //   // var iframe = document.createElement('iframe');
    //   // iframe.srcdoc= document.getElementById('pdfContent').innerHTML
    //   let pdfContent = "";
    //   // lo
    //   // pdfContent += '<img crossorigin="*" src="' + im  gLogo + '" width="100" ><hr/><br>';
    //   // pdfContent += "<div><div><header><img src='https://via.placeholder.com/150' />header</header></div><div>Body</div><div><footer>footer</footer></div></div>"
    //   // pdfContent = document.querySelector('#pdfContent')
    //   pdfContent += document.getElementById("pdfContent").innerHTML;
    //   // pdfContent += "<h3> End of test </h3>";
    //   // html2pdf(pdfContent, {
    //   //   margin: 1,
    //   //   filename: "document.pdf",
    //   //   image: { type: "jpeg", quality: 0.98 },
    //   //   html2canvas: { dpi: 192, letterRendering: true },
    //   //   jsPDF: { unit: "in", format: "letter", orientation: "landscape" },
    //   // });

    //   // console.log(document.getElementById('pdfContent').innerHTML);
    //   // var doc = new jspdf()
    //   // doc.addPage(document.getElementById('pdfContent'))
    //   //  var canvasElement = document.createElement('canvas');
    //   //     html2canvas(document.getElementById('pdfContent'), { canvas: canvasElement }).then(function (canvas) {
    //   //       // const img = canvas.toDataURL("image/jpeg", 0.8);
    //   //       // doc.addImage(img,'JPEG',20,20);
    //   //       // doc.save("sample.pdf");
    //   //       const img = canvas.toDataURL("image/jpeg", 0.8);
    //   //       doc.addImage(img,'JPEG',20,20);
    //   //       doc.save("sample.pdf");
    //   //       // window.open(doc.output('bloburl'))
    //   //     });
    //   // var total = doc.internal.getNumberOfPages();
    //   //       for (let index = 0; index < total.length; index++) {
    //   //         doc.setPage(i)
    //   //         doc.setFontSize(12)
    //   //         doc.text('page',10,10)

    //   //       }

    //   // pdfDoc.text("<div>hello</div>")
    //   // html2canvas(options.component)

    //   // margin: [20, 10, 20, 10],
    //   //   filename: 'document.pdf',
    //   //   image: { type: 'jpeg', quality: 0.98 },
    //   //   html2canvas: { dpi: 192, letterRendering: true },
    //   //   jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },

    //   // margin: 0.5,
    //   //   filename: 'time_sheet_report.pdf',
    //   //   // image: { type: 'png', quality: 0.20 },
    //   //   html2canvas: { scale: 2 },
    //   //   jsPDF: { unit: 'in', format: 'letter', orientation: 'p' },
    //   //   pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
    //   var v = this;
    //   // this.loader_proposal = true
    //   html2pdf()
    //     .from(pdfContent)
    //     .set({
    //       margin: [2.2, 0.5, 0.8, 1],

    //       filename: "document.pdf",
    //       image: { type: "jpeg", quality: 0.98 },
    //       html2canvas: { scale: 2 },
    //       // html2canvas: { dpi: 192, letterRendering: true },
    //       jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
    //       pagebreak: { mode: ["avoid-all", "css", "legacy"] },

    //       // pagebreak: { before: '.page-break' }

    //       // before: function(pdf) {
    //       //   pdf.setFontSize(10)
    //       //   pdf.text(75, 285, 'Footer content goes here')
    //       // }
    //     })
    //     .outputPdf()
    //     .get("pdf")
    //     .then(function (pdf) {
    //       // v.loader_proposal = false
    //       const totalPages = pdf.internal.getNumberOfPages();
    //       for (let i = 1; i <= totalPages; i++) {
    //         pdf.setPage(i);
    //         // pdf.
    //         // pdf.writeHTML("<hr>", true, false, false, false, '');

    //         pdf.setFontSize(10);
    //         pdf.setTextColor(50);
    //         pdf.setLineCap(0);
    //         // pdf.line(0,pdf.internal.pageSize.getHeight() - 1.4, 315 , 8);
    //         // pdf.fromHTML('<div>hello</div>',1,0)
    //         // pdf.from('<div>hello</div>')
    //         // pdf.line(0,pdf.internal.pageSize.getHeight() - 9, 315,8);
    //         pdf.addImage(imgLogo, 0.5, 0);
    //         // pdf.text(
    //         //    'Page ' + i + ' of ' + totalPages,
    //         //     (pdf.internal.pageSize.getWidth() * 0.88),
    //         //     (pdf.internal.pageSize.getHeight() - 0.3)
    //         // )

    //         // pdf.text('This is the header text', (pdf.internal.pageSize.getWidth() / 2.40), (pdf.internal.pageSize.getHeight() - 10));
    //         pdf.text(
    //           "For all expertise solutions and knowledge,",
    //           pdf.internal.pageSize.getWidth() / 16,
    //           pdf.internal.pageSize.getHeight() - 0.8
    //         );
    //         pdf.text(
    //           "Reach at us - Email -",
    //           pdf.internal.pageSize.getWidth() / 16,
    //           pdf.internal.pageSize.getHeight() - 0.5
    //         );

    //         // pdf.text('Footer content goes here',75, 285)
    //       }
    //       // pdf.text('my header', 10, 10)
    //       //           var totalPages = pdf.internal.getNumberOfPages();

    //       // for (i = 1; i <= totalPages; i++) {
    //       //   pdf.setPage(i);
    //       //   pdf.setFontSize(10);
    //       //   pdf.setTextColor(150);
    //       //   pdf.text('Page ' + i + ' of ' + totalPages, pdf.internal.pageSize.getWidth() - 100, pdf.internal.pageSize.getHeight() - 30);
    //       // }
    //       // pdf.addImage(imgLogo, 'PNG', 0, pdf.internal.pageSize.height - 20, 600, 20)

    //       window.open(pdf.output("bloburl"), "F");
    //       // this.loader_proposal = false
    //     });
    //   // pdfDoc.html(document.getElementById('pdfContent'), {
    //   // callback: function () {
    //   //     window.open(pdfDoc.output('bloburl'));
    //   // }
    //   // });
    //   // }).then(() =>{
    //   // window.open(pdfDoc.output('bloburl'));

    //   // exportDataGrid(options).then(() => {

    //   // })
    // },
    // async exportToPDFInvoice(i) {
    //   this.loader_invoice = true;
    //   setTimeout(() => {
    //     this.loader_invoice = false;
    //   }, 2000);
    //   // const toDataUrl = await function (url, callback) {
    //   //   //Convert to base64
    //   //   return new Promise((resolve, reject) => {
    //   //     var xhr = new XMLHttpRequest();
    //   //     xhr.onload = function () {
    //   //       var reader = new FileReader();
    //   //       reader.onloadend = function () {
    //   //         resolve(reader.result);
    //   //       };
    //   //       reader.readAsDataURL(xhr.response);
    //   //     };
    //   //     xhr.onerror = () => {
    //   //       reject({
    //   //         status: this.status,
    //   //         statusText: xhr.statusText,
    //   //       });
    //   //     };
    //   //     xhr.open("GET", url);
    //   //     xhr.responseType = "blob";
    //   //     xhr.send();
    //   //   });
    //   // };

    //   // // var pdfContent = "<div style='margin-left:2rem;'><img style='width:50%' src='"+ toDataUrl(logo) +"'/><p class='font-weight-bolder'>"+this.userData.tenant.organization.name+"</p><p class='my-3 font-weight-bolder'>"+i.item.proposal_date +"</p><p class='mb-2'>" + i.item.client_name  +",</p></div>";
    //   // const getBase64FromUrl = async (url) => {
    //   //   const data = await fetch(url);
    //   //   const blob = await data.blob()
    //   //   return new Promise((resolve) => {
    //   //     const reader = new FileReader();

    //   //     reader.readAsDataURL(blob);
    //   //     reader.onloadend = () => {
    //   //       const base64data = reader.result;
    //   //       this.base64data = base64data
    //   //       resolve(base64data);
    //   //     }
    //   //   });

    //   // }

    //   // let imagesUrls = [

    //   //   "https://jmi-aero.com/media/cxmmngdb/centrik-logo-final.jpg",
    //   //   // "https://img-19.commentcamarche.net/cI8qqj-finfDcmx6jMK6Vr-krEw=/1500x/smart/b829396acc244fd484c5ddcdcb2b08f3/ccmcms-commentcamarche/20494859.jpg",
    //   // ];
    //   let pdfContent = "";
    //   // fetch('https://img-19.commentcamarche.net/cI8qqj-finfDcmx6jMK6Vr-krEw=/1500x/smart/b829396acc244fd484c5ddcdcb2b08f3/ccmcms-commentcamarche/20494859.jpg')
    //   //   //                         vvvv
    //   //   .then(response => response.blob())
    //   //   .then(imageBlob => {
    //   //     // Then create a local URL for that image and print it
    //   //     const imageObjectURL = URL.createObjectURL(imageBlob);
    //   //     console.log(imageObjectURL);
    //   //   });

    //   // let urlBase64 = await getBase64FromUrl('https://img-19.commentcamarche.net/cI8qqj-finfDcmx6jMK6Vr-krEw=/1500x/smart/b829396acc244fd484c5ddcdcb2b08f3/ccmcms-commentcamarche/20494859.jpg');
    //   // console.log(urlBase64);
    //   // console.log(urlb);

    //   // dco
    //   // // lo
    //   // var iframe = document.createElement('iframe');
    //   // 	iframe.setAttribute('style', 'position:absolute;top:0;right:0;height:100%; width:600px');
    //   // 	document.body.appendChild(iframe);
    //   //   iframe.src= '<img crossorigin="*" src="' + urlBase64 + '" width="100" ><hr/><br>'
    //   // iframe.src = pdf.output('datauristring');
    //   document.getElementById("InvoicepdfContent2").style.fontSize = "12px";
    //   // pdfContent += '<img crossorigin="*" src="' + urlBase64 + '" width="100" ><hr/><br>';
    //   pdfContent += document.getElementById("InvoicepdfContent2").innerHTML;

    //   // pdfContent += "<h3> End of test </h3>";
    //   // html2pdf(pdfContent, {
    //   //   margin: 1,
    //   //   filename: "document.pdf",
    //   //   image: { type: "jpeg", quality: 0.98 },
    //   //   html2canvas: { dpi: 192, letterRendering: true },
    //   //   jsPDF: { unit: "in", format: "letter", orientation: "landscape" },
    //   // });

    //   console.log(document.getElementById("InvoicepdfContent2").innerHTML);
    //   // var doc = new jspdf()
    //   // doc.addPage(document.getElementById('pdfContent'))
    //   //  var canvasElement = document.createElement('canvas');
    //   //     html2canvas(document.getElementById('pdfContent'), { canvas: canvasElement }).then(function (canvas) {
    //   //       // const img = canvas.toDataURL("image/jpeg", 0.8);
    //   //       // doc.addImage(img,'JPEG',20,20);
    //   //       // doc.save("sample.pdf");
    //   //       const img = canvas.toDataURL("image/jpeg", 0.8);
    //   //       doc.addImage(img,'JPEG',20,20);
    //   //       doc.save("sample.pdf");
    //   //       // window.open(doc.output('bloburl'))
    //   //     });
    //   // var total = doc.internal.getNumberOfPages();
    //   //       for (let index = 0; index < total.length; index++) {
    //   //         doc.setPage(i)
    //   //         doc.setFontSize(12)
    //   //         doc.text('page',10,10)

    //   //       }

    //   // pdfDoc.text("<div>hello</div>")
    //   // html2canvas(options.component)
    //   html2pdf()
    //     .from(pdfContent)
    //     .set({
    //       margin: 0.5,
    //       filename: "document.pdf",
    //       image: { type: "jpeg", quality: 0.98 },
    //       html2canvas: { scale: 2 },
    //       // html2canvas: { dpi: 192, letterRendering: true },
    //       jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
    //       pagebreak: { mode: ["avoid-all", "css", "legacy"] },
    //       // before: function(pdf) {
    //       //   pdf.setFontSize(10)
    //       //   pdf.text(75, 285, 'Footer content goes here')
    //       // }
    //     })
    //     // .header(() => {
    //     //   return `<h1>Header</h1>`
    //     // }).footer(() => {
    //     //   return `<p>Footer</p>`
    //     // })
    //     .outputPdf()
    //     .get("pdf")
    //     .then(function (pdf) {
    //       // pdf.text('my header', 10, 10)
    //       //           var totalPages = pdf.internal.getNumberOfPages();

    //       // for (i = 1; i <= totalPages; i++) {
    //       //   pdf.setPage(i);
    //       //   pdf.setFontSize(10);
    //       //   pdf.setTextColor(150);
    //       //   pdf.text('Page ' + i + ' of ' + totalPages, pdf.internal.pageSize.getWidth() - 100, pdf.internal.pageSize.getHeight() - 30);
    //       // }
    //       // pdf.addImage(imgLogo, 'PNG', 0, pdf.internal.pageSize.height - 20, 600, 20)

    //       window.open(pdf.output("bloburl"), "F");
    //     });

    //   // pdfDoc.html(document.getElementById('pdfContent'), {
    //   // callback: function () {
    //   //     window.open(pdfDoc.output('bloburl'));
    //   // }
    //   // });
    //   // }).then(() =>{
    //   // window.open(pdfDoc.output('bloburl'));

    //   // exportDataGrid(options).then(() => {

    //   // })
    // },
    // async exportToPDFPayment(i) {
    //   this.loader_payment = true;
    //   setTimeout(() => {
    //     this.loader_payment = false;
    //   }, 2000);
    //   // const toDataUrl = await function (url, callback) {
    //   //   //Convert to base64
    //   //   return new Promise((resolve, reject) => {
    //   //     var xhr = new XMLHttpRequest();
    //   //     xhr.onload = function () {
    //   //       var reader = new FileReader();
    //   //       reader.onloadend = function () {
    //   //         resolve(reader.result);
    //   //       };
    //   //       reader.readAsDataURL(xhr.response);
    //   //     };
    //   //     xhr.onerror = () => {
    //   //       reject({
    //   //         status: this.status,
    //   //         statusText: xhr.statusText,
    //   //       });
    //   //     };
    //   //     xhr.open("GET", url);
    //   //     xhr.responseType = "blob";
    //   //     xhr.send();
    //   //   });
    //   // };

    //   // // var pdfContent = "<div style='margin-left:2rem;'><img style='width:50%' src='"+ toDataUrl(logo) +"'/><p class='font-weight-bolder'>"+this.userData.tenant.organization.name+"</p><p class='my-3 font-weight-bolder'>"+i.item.proposal_date +"</p><p class='mb-2'>" + i.item.client_name  +",</p></div>";
    //   // const getBase64FromUrl = async (url) => {
    //   //   const data = await fetch(url);
    //   //   const blob = await data.blob()
    //   //   return new Promise((resolve) => {
    //   //     const reader = new FileReader();

    //   //     reader.readAsDataURL(blob);
    //   //     reader.onloadend = () => {
    //   //       const base64data = reader.result;
    //   //       this.base64data = base64data
    //   //       resolve(base64data);
    //   //     }
    //   //   });

    //   // }

    //   // <p class="mb-2">{{ i.item.address }}</p>
    //   // <p class="mb-2 font-weight-bolder">Subject: {{ i.item.subject }}</p>
    //   // <p class="mb-2">{{ i.item.prephase }}</p>
    //   // <p class="mb-2">Dear {{ i.item.concerned_person }}</p>
    //   // <div v-for="(proposal, index) in i.item.proposal_section" :key="proposal.id">
    //   //   <p class="mb-2 font-weight-bolder">{{proposal.title}}</p>
    //   //   <p class="mb-3" v-html="proposal.description"></p>
    //   // </div>
    //   // <p class="font-weight-bolder">Fee Details</p>
    //   // <table class="mb-3">
    //   //   <thead>
    //   //     <th>SI No</th>
    //   //     <th>Description</th>
    //   //     <th>Amount</th>
    //   //   </thead>
    //   //   <tbody>
    //   //     <tr v-for="(amount, index) in i.item.proposal_fees" :key="amount.id">
    //   //       <td>{{ index+1 }}</td>
    //   //       <td>{{ amount.description }}</td>
    //   //       <td>{{ amount.amount }}</td>

    //   //     </tr>
    //   //     <tr v-if="i.item.proposal_fees.length > 1">
    //   //       <td style="font-weight: bolder;">total (<font-awesome-icon  icon="indian-rupee-sign" class="icon cursor-pointer"   />)

    //   //       </td>
    //   //       <td> </td>
    //   //       <td>

    //   //        {{getTotalAmt(i.item.proposal_fees)}}
    //   //       </td>
    //   //     </tr>
    //   //   </tbody>
    //   // </table>
    //   // <p class="font-weight-bolder">{{ i.item.footer_title }}</p>
    //   // <p v-html="i.item.footer_description"></p>"
    //   // pdfContent += '</div>'
    //   // html2pdf('<div>hello</div>', {
    //   //   margin:1,
    //   //   filename:"html.pdf"
    //   // })
    //   // let imagesUrls = [

    //   //   "https://jmi-aero.com/media/cxmmngdb/centrik-logo-final.jpg",
    //   //   // "https://img-19.commentcamarche.net/cI8qqj-finfDcmx6jMK6Vr-krEw=/1500x/smart/b829396acc244fd484c5ddcdcb2b08f3/ccmcms-commentcamarche/20494859.jpg",
    //   // ];
    //   let pdfContent = "";
    //   // fetch('https://img-19.commentcamarche.net/cI8qqj-finfDcmx6jMK6Vr-krEw=/1500x/smart/b829396acc244fd484c5ddcdcb2b08f3/ccmcms-commentcamarche/20494859.jpg')
    //   //   //                         vvvv
    //   //   .then(response => response.blob())
    //   //   .then(imageBlob => {
    //   //     // Then create a local URL for that image and print it
    //   //     const imageObjectURL = URL.createObjectURL(imageBlob);
    //   //     console.log(imageObjectURL);
    //   //   });

    //   // let urlBase64 = await getBase64FromUrl('https://img-19.commentcamarche.net/cI8qqj-finfDcmx6jMK6Vr-krEw=/1500x/smart/b829396acc244fd484c5ddcdcb2b08f3/ccmcms-commentcamarche/20494859.jpg');
    //   // console.log(urlBase64);
    //   // console.log(urlb);

    //   // dco
    //   // lo
    //   document.getElementById("PaymentpdfContent").style.fontSize = "12px";
    //   // pdfContent += '<img crossorigin="*" src="' + urlBase64 + '" width="100" ><hr/><br>';
    //   pdfContent += document.getElementById("PaymentpdfContent").innerHTML;

    //   // pdfContent += "<h3> End of test </h3>";
    //   // html2pdf(pdfContent, {
    //   //   margin: 1,
    //   //   filename: "document.pdf",
    //   //   image: { type: "jpeg", quality: 0.98 },
    //   //   html2canvas: { dpi: 192, letterRendering: true },
    //   //   jsPDF: { unit: "in", format: "letter", orientation: "landscape" },
    //   // });

    //   console.log(document.getElementById("PaymentpdfContent").innerHTML);
    //   // var doc = new jspdf()
    //   // doc.addPage(document.getElementById('pdfContent'))
    //   //  var canvasElement = document.createElement('canvas');
    //   //     html2canvas(document.getElementById('pdfContent'), { canvas: canvasElement }).then(function (canvas) {
    //   //       // const img = canvas.toDataURL("image/jpeg", 0.8);
    //   //       // doc.addImage(img,'JPEG',20,20);
    //   //       // doc.save("sample.pdf");
    //   //       const img = canvas.toDataURL("image/jpeg", 0.8);
    //   //       doc.addImage(img,'JPEG',20,20);
    //   //       doc.save("sample.pdf");
    //   //       // window.open(doc.output('bloburl'))
    //   //     });
    //   // var total = doc.internal.getNumberOfPages();
    //   //       for (let index = 0; index < total.length; index++) {
    //   //         doc.setPage(i)
    //   //         doc.setFontSize(12)
    //   //         doc.text('page',10,10)

    //   //       }

    //   // pdfDoc.text("<div>hello</div>")
    //   // html2canvas(options.component)
    //   html2pdf()
    //     .from(pdfContent)
    //     .set({
    //       margin: 0.5,
    //       filename: "document.pdf",
    //       image: { type: "jpeg", quality: 0.98 },
    //       html2canvas: { scale: 2 },
    //       // html2canvas: { dpi: 192, letterRendering: true },
    //       jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
    //       pagebreak: { mode: ["avoid-all", "css", "legacy"] },
    //       // before: function(pdf) {
    //       //   pdf.setFontSize(10)
    //       //   pdf.text(75, 285, 'Footer content goes here')
    //       // }
    //     })
    //     // .header(() => {
    //     //   return `<h1>Header</h1>`
    //     // }).footer(() => {
    //     //   return `<p>Footer</p>`
    //     // })
    //     .outputPdf()
    //     .get("pdf")
    //     .then(function (pdf) {
    //       // pdf.text('my header', 10, 10)
    //       //           var totalPages = pdf.internal.getNumberOfPages();

    //       // for (i = 1; i <= totalPages; i++) {
    //       //   pdf.setPage(i);
    //       //   pdf.setFontSize(10);
    //       //   pdf.setTextColor(150);
    //       //   pdf.text('Page ' + i + ' of ' + totalPages, pdf.internal.pageSize.getWidth() - 100, pdf.internal.pageSize.getHeight() - 30);
    //       // }
    //       // pdf.addImage(imgLogo, 'PNG', 0, pdf.internal.pageSize.height - 20, 600, 20)

    //       window.open(pdf.output("bloburl"), "F");
    //     });

    //   // pdfDoc.html(document.getElementById('pdfContent'), {
    //   // callback: function () {
    //   //     window.open(pdfDoc.output('bloburl'));
    //   // }
    //   // });
    //   // }).then(() =>{
    //   // window.open(pdfDoc.output('bloburl'));

    //   // exportDataGrid(options).then(() => {

    //   // })
    // },

    // uploadAttach(id, c_id, links, type) {
    //   let data = {
    //     attachment: [],
    //     type: type,
    //     company_id: c_id,
    //     task_id: id,
    //   };
    //   links.forEach((x) => {
    //     data.attachment.push({
    //       attachment_url: x.url,
    //       file_name: x.fileName
    //     });
    //   });
    //   console.log(data);
    //   this.dropTask = false;
    //   this.dropClient = false;
    //   this.$store.dispatch("attachments/store", data).then(() => {
    //     this.$store.dispatch('tasks/getAttachments',id)
    //     this.file_name = [];
    //     // this.$store.state.attachments.links = [];
    //     console.log(data);
    //   });
    // },
    // removeFileS3Task(url, index) {
    //   console.log("url of attachment", url);
    //   var data = {
    //     attach_url: url ?? "null",
    //   };
    //   this.$store.state.tasks.s3_url.splice(
    //     this.$store.state.tasks.s3_url[index],
    //     1
    //   );
    //   this.$store
    //     .dispatch("tasks/remove_file_s3", { data: data })
    //     .then(() => {
    //       console.log(this.$store.state.tasks.s3_url);
    //       console.log("removed");
    //       // if(this.$store.state.tasks.s3_url.includes(filename)){
    //       //   this.$store.state.tasks.s3_url.splice(this.$store.state.tasks.s3_url[this.$store.state.tasks.s3_url.findIndex(e => e.fileName.includes(filename))],1)
    //       // }
    //     })
    //     .catch(() => {
    //       console.log("error");
    //     });
    // },
    // removes3(file, i) {
    //   console.log("bbbb");
    //   var data = {
    //     attach_url: file ?? "null",
    //   };
    //   this.$store.dispatch("attachments/remove", { data: data }).then(() => {
    //     this.$store.state.attachments.links.splice(i, 1);
    //     this.file_name.splice(i, 1);
    //   });
    // },

    //     async uploadFile(e) {
    //       let image = e.target.files;
    //       let image_name = []
    //       const filePathsPromises = [];
    //     image.forEach(file => {
    //       filePathsPromises.push(this.base64(file));
    //       image_name.push(file.name)
    //       // filePathsPromises.push(file.name)
    //     });
    //     const filePaths = await Promise.all(filePathsPromises,image_name);
    //     const mappedFiles = filePaths.map((base64File,image_name) => ({
    //        file: base64File,
    //        name:image[image_name].name,
    //        type:'attachmentsType'
    //        }));

    //        let tempFile = mappedFiles

    // tempFile.forEach((obj2)=>{
    //   const exists = this.file_name.some(obj1=>obj1.name === obj2.name);
    //   if(!exists){
    //     console.log("not duplicate")
    //     // obj2.type ='attachmentsType';
    //     this.file_name.push(obj2);
    //   }
    // })

    //     console.log(mappedFiles);
    //     this.uploadFileS3(this.file_name)

    //     },
    //     base64(file) {
    //         return new Promise((resolve, reject) => {
    //         const reader = new FileReader();
    //         reader.readAsDataURL(file);
    //         reader.onload = () => resolve(reader.result);
    //         reader.onerror = error => reject(error);
    //       });
    //     },

    //     uploadFileS3(file) {
    //       let data = {
    //         attach: file ? file : "null",
    //       };
    //       this.$store
    //         .dispatch("attachments/add", { data: data })
    //         .then(() => {
    //           resolve();
    //         })
    //         .catch(() => { });
    //     },
    //     clientAttachmentDropdown(e) {
    //       if (this.dropClient === false) {
    //         this.dropClient = true;
    //         setTimeout(() => {
    //           document.body.addEventListener("click", this.clickEventClient);
    //         }, 1);
    //       }
    //     },
    clickEventClient(ev) {
      console.log(ev.target, "evevevevevevev")
      console.log(this.$refs.clientDrop.contains(ev.target), "eeeeeeeeeee")
      if (
        ev.target != this.$refs.clientDrop &&
        !this.$refs.clientDrop.contains(ev.target)
      ) {
        this.dropClient = false
      }
    },
    // taskAttachmentDropdown(e) {
    //   if (this.dropTask === false) {
    //     this.dropTask = true;
    //     setTimeout(() => {
    //       document.body.addEventListener("click", this.clickEventTask);
    //     }, 1);
    //   }
    // },
    clickEventTask(ev) {
      console.log(ev.target, "evevevevevevev")
      console.log(this.$refs.taskDrop.contains(ev.target), "eeeeeeeeeee")
      if (
        ev.target != this.$refs.taskDrop &&
        !this.$refs.taskDrop.contains(ev.target)
      ) {
        this.dropTask = false
      }
    },
    // onProgress(e) {
    //   console.log(e);
    // },
    // hasStartedGeneration() {
    //   console.log("started");
    // },
    // hasGenerated(e) {
    //   console.log(e);
    // },
    // generateReport() {
    //   this.$refs.html2Pdf.generatePdf();
    // },
    // threadedMail() {
    //   var arr = [];
    //   // if(this.$store.state.emails.all_emails.length === 0){

    //   // }
    //   this.$store.state.comments.extraComment.forEach((element) => {
    //     // if(this.taskId)
    //     // if(element.parent.task_id === id){
    //     // this.threadedMail = element.childs
    //     // message_id = element.parent.message_id
    //     if (element.childs) {
    //       if (element.childs.length > 0) {
    //         element.childs.forEach((c) => {
    //           arr.push(c);
    //         });
    //       }
    //       // }
    //     }
    //   });
    //   // this.arr_comment = []
    //   // this.arr_comment = arr;
    //   return arr;
    // },
    sendTask() {
      var tasks = this.$store.state.tasks.all.filter((e) => e.type === "task")
      var leads = this.$store.state.leads.all
        .filter((e) => e.type === "lead")
        .filter((e) => e.type === "lead")
      var combine = []
      var details = null
      leads.forEach((element) => {
        combine.push(element)
      })
      tasks.forEach((element) => {
        combine.push(element)
      })
      combine.forEach((element) => {
        // combine.push(element)
        if (this.taskId != 0 || this.taskId != null) {
          if (element.id === this.taskId) {
            details = element
          }
        }
      })
      return details || {}
    },
    // replyModal() {
    //   this.$refs["reply-modal"].show();

    //   this.composeData.from = this.outBoundEmails[0];
    //   var tasks = this.$store.state.tasks.all.filter(e => e.type === 'task');
    //   var leads = this.$store.state.leads.all.filter(e => e.type === 'lead').filter(e => e.type === 'lead');
    //   var details = null;
    //   if (this.$router.currentRoute.name == "leads") {
    //     leads.forEach((element) => {
    //       // combine.push(element)
    //       if (this.taskId != 0 || this.taskId != null) {
    //         if (element.id === this.taskId) {
    //           details = element;
    //         }
    //       }
    //     });
    //   } else {
    //     tasks.forEach((element) => {
    //       // combine.push(element)
    //       if (this.taskId != 0 || this.taskId != null) {
    //         if (element.id === this.taskId) {
    //           details = element;
    //         }
    //       }
    //     });
    //   }
    //   this.composeData.to = [];
    //   this.emails_contact.forEach((element) => {
    //     if (details.mailbox != null) {
    //       if (
    //         element == details.mailbox.from_email &&
    //         details.mailbox.folder == "INBOX"
    //       ) {
    //         this.composeData.to.push(element);
    //       }
    //     }
    //   });
    //   var signAll = [];
    //   if (this.$store.state.users.signAll != null) {
    //     signAll.push(this.$store.state.users.signAll);
    //   }
    //   var header = "";
    //   if (this.$router.currentRoute.name == "leads") {
    //     header =
    //       header +
    //       '<p style="margin-left:2rem;">Hi ' +
    //       this.$store.state.leads.all.filter(e => e.type === 'lead').filter(e => e.type === 'lead').filter((e) => e.id === this.taskId)[0]
    //         .contact_person.name +
    //       ", Greeting from " +
    //       JSON.parse(localStorage.getItem("userData")).tenant.id +
    //       "</p><br><br>";
    //   } else {
    //     header =
    //       header +
    //       '<p style="margin-left:2rem;">Hi ' +
    //       this.$store.state.tasks.all.filter(e => e.type === 'task').filter((e) => e.id === this.taskId)[0]
    //         .contact_person.name +
    //       ", Greeting from " +
    //       JSON.parse(localStorage.getItem("userData")).tenant.id +
    //       "</p><br><br>";
    //   }
    //   if (signAll.length > 0) {
    //     this.composeData.message = header + signAll[0].signature;

    //     return signAll[0].signature || "";
    //   }
    // },
    getStatusColor(percent) {
      console.log("state" + percent.split("%")[0])
      if (Number(percent.split("%")[0]) >= 100) {
        return "success"
      } else {
        return "danger"
      }
    },
    // getStatusForInvoice(data) {
    //   console.log("status");
    //   var percent = 0;
    //   var total = 0;
    //   var state = false;
    //   var status = 0;
    //   this.allProposals.forEach((element) => {
    //     if (element.title == "payment") {
    //       element.record_pay_invoice.forEach((e) => {
    //         if (e.invoice_id === data.id) {
    //           // total = element
    //           state = true;
    //           status = status + e.paid_amount;
    //         }
    //       });
    //       element.invoice.forEach((i) => {
    //         if (i.id === data.id) {
    //           total = i.total_amt;
    //         }
    //       });
    //     }
    //   });
    //   percent = (status / total) * 100;
    //   console.log(percent);
    //   if (state) {
    //     return percent.toFixed(2) + "% paid";
    //   }
    // },
    getStatusForProposal(data) {
      console.log("status")
      var percent = 0
      var total = 0
      var status = 0
      var state = false
      this.$store.state.invoice.all.forEach((element) => {
        // if(element.title == 'invoice'){

        element.proposal.forEach((e) => {
          if (e.proposal_id === Number(data.id)) {
            // total = element
            // status = status + e.paid_amount
            // total = e.amount
            state = true
            total = element.amount
            status = status + e.amount
          }
        })

        // element.invoice.forEach(i => {
        //   if(i.id === data.id){
        //     total = i.total_amt
        //   }
        // });
        // }
      })
      percent = (total / status) * 100
      console.log("status: ", status)
      console.log("total: ", total)
      console.log(data)
      if (state) {
        return percent.toFixed(1) + "% invoiced"
      }
    },
    // convert(str) {
    //   var ones = [
    //     "",
    //     "one",
    //     "two",
    //     "three",
    //     "four",
    //     "five",
    //     "six",
    //     "seven",
    //     "eight",
    //     "nine",
    //   ];

    //   var tens = [""];

    //   tens[1] = [
    //     "ten",
    //     "eleven",
    //     "twelve",
    //     "thirteen",
    //     "fourteen",
    //     "fifteen",
    //     "sixteen",
    //     "seventeen",
    //     "eighteen",
    //     "nineteen",
    //   ];

    //   tens = tens.concat([
    //     "twenty",
    //     "thirty",
    //     "forty",
    //     "fifty",
    //     "sixty",
    //     "seventy",
    //     "eighty",
    //     "ninety",
    //   ]);

    //   var getHundreds = function (value) {
    //     return value > 0 ? ones[value] + " hundred" : "";
    //   };

    //   var getTens = function (value, next, words, index, pos) {
    //     if (value == 1) {
    //       words.push(tens[1][next]);

    //       if (pos == 5) {
    //         words.push(" thousand");
    //       }
    //       if (pos == 8) {
    //         words.push(" million");
    //       }
    //       return index + 1;
    //     }

    //     words.push(tens[value]);
    //     return index;
    //   };

    //   var num, pos;
    //   var words = [];

    //   for (var i = 0; i < str.length; i++) {
    //     // if(window.CP.shouldStopExecution(1)){break;}
    //     //to stop infinite loop

    //     num = str[i];
    //     pos = str.length - i;

    //     switch (pos) {
    //       //millions
    //       case 7:
    //         words.push(ones[num] + " million");
    //         break;
    //       // For Thousands
    //       case 4:
    //         words.push(ones[num] + " thousand");
    //         break;
    //       // For Hundreds
    //       case 9:
    //       case 6:
    //       case 3:
    //         words.push(getHundreds(num));
    //         break;
    //       // For Tens and Teens
    //       case 8:
    //       case 5:
    //       case 2:
    //         i = getTens(num, str[i + 1], words, i, pos);
    //         break;
    //       case 1:
    //         words.push(ones[num]);
    //         break;
    //     }
    //   }
    //   return words.join(" ");
    // },
    // updatePayment() {
    //   var invoice_tds = [];
    //   for (let index = 0; index < this.payment.payment.length; index++) {
    //     // const element = array[index];
    //     invoice_tds.push({
    //       invoice_id: this.payment.payment[index].invoice_id,
    //       tds_deducted: this.payment.payment[index].tds,
    //       paid_amount: this.payment.payment[index].amount,
    //     });
    //   }
    //   var branch_id = 0;
    //   this.$store.state.branches.all.forEach((element) => {
    //     if (element.name == this.payment.branch) {
    //       branch_id = element.id;
    //     }
    //   });
    //   const data = {
    //     task_id: this.taskId,
    //     client_id: this.payment.client.id,
    //     branch_id: branch_id,
    //     pay_date: this.payment.date,
    //     payment_mode: this.payment.mode.name,
    //     amount: this.payment.amount,
    //     reference_id: this.payment.reference_id,
    //     notes: this.payment.notes,
    //     invoice: invoice_tds,
    //   };
    //   console.log(data, this.payment.edit_id);
    // },
    // seteditPayment(index) {
    //   var amount = 0;
    //   this.payment.payment.forEach((element) => {
    //     if (element.invoice_id === index) {
    //       amount = element.amount;
    //     }
    //   });
    //   return amount;
    //   // return this.payment.payment[index].amount
    // },
    // setedittds(index) {
    //   var tds = 0;
    //   this.payment.payment.forEach((element) => {
    //     if (element.invoice_id === index) {
    //       tds = element.tds;
    //     }
    //   });
    //   // return this.payment.payment[index].tds
    //   return tds;
    // },
    // getFinalPayment(invoice_id, record_pay_invoice) {
    //   var amount = 0;
    //   record_pay_invoice.forEach((element) => {
    //     if (element.invoice_id === invoice_id) {
    //       amount = element.paid_amount;
    //     }
    //   });
    //   return amount;
    // },
    // getTdsForPayment(invoice_id, record_pay_invoice) {
    //   var tds = 0;
    //   record_pay_invoice.forEach((element) => {
    //     if (element.invoice_id === invoice_id) {
    //       tds = element.tds_deducted;
    //     }
    //   });
    //   return tds;
    // },
    // getPaymentClient(client_id) {
    //   var name = "";
    //   if (client_id) {
    //     this.show_companys.forEach((element) => {
    //       if (element.id === client_id) {
    //         name = element.name;
    //       }
    //     });
    //     return name;
    //   }
    // },
    // getPaymentAmt(amount) {
    //   if (amount) {
    //     return amount.reduce((a, b) => a + b.paid_amount, 0);
    //   }
    // },
    // recordPayment() {
    //   var invoice_tds = [];
    //   for (let index = 0; index < this.payment.payment.length; index++) {
    //     // const element = array[index];
    //     if (this.payment.payment[index].amount != 0) {
    //       invoice_tds.push({
    //         invoice_id: this.payment.payment[index].invoice_id,
    //         tds_deducted: this.payment.payment[index].tds,
    //         paid_amount: this.payment.payment[index].amount,
    //       });
    //     }
    //   }
    //   var branch_id = 0;
    //   this.$store.state.branches.all.forEach((element) => {
    //     if (element.name == this.payment.branch) {
    //       branch_id = element.id;
    //     }
    //   });
    //   const data = {
    //     task_id: this.taskId,
    //     client_id: this.payment.client.id,
    //     branch_id: branch_id,
    //     pay_date: this.payment.date,
    //     payment_mode: this.payment.mode.name,
    //     amount: this.payment.amount,
    //     reference_id: this.payment.reference_id,
    //     notes: this.payment.notes,
    //     invoice: invoice_tds,
    //   };
    //   console.log(data);
    //   this.$store.dispatch("recordPayment/store", data).then(() => {
    //     this.$store.dispatch("recordPayment/get", this.taskId);
    //     this.$refs["payment-modal"].hide();
    //   });
    // },
    getExcess() {
      // if(this.payment.amount > Number(this.getTotalAmt(this.payment.payment) ))// ?  payment.amount - Number(getTotalAmt(this.payment.payment) )  : 0}}
      //             {
      //               return this.payment.amount - Number(this.getTotalAmt(this.payment.payment) )
      //             }else
      // if(this.payment.amount < Number(this.getTotalAmt(this.payment.payment) ))
      // if(this.payment.amount != 0)

      // {
      return (
        this.payment.amount - Number(this.getTotalAmt(this.payment.payment))
      )

      // }else{
      //   return 0
      // }
    },
    // addPayment(){
    setPayment(index, e) {
      console.log([index, e])
      this.payment.payment.forEach((element) => {
        if (element.invoice_id == index) {
          element.amount = Number(e)
        }
      })
      // this.payment.payment[index].amount = Number(e)
    },
    setTds(index, e) {
      console.log([index, e])
      this.payment.payment.forEach((element) => {
        if (element.invoice_id === index) {
          element.tds = Number(e)
          if (element.tds != 0) {
            element.amount = element.amount - element.tds
          }
        }
      })
      // this.payment.payment[index].tds = Number(e)
      // this.payment.payment[index].amount = this.payment.payment[index].amount - this.payment.payment[index].tds
    },
    // },
    getinvoiceBranch(task_id) {
      var task = []
      var name = ""
      if (this.$router.currentRoute.name == "tasks") {
        task = this.$store.state.tasks.all.filter((e) => e.type === "task")
      } else {
        task = this.$store.state.leads.all
          .filter((e) => e.type === "lead")
          .filter((e) => e.type === "lead")
      }
      task.forEach((element) => {
        if (element.id === task_id) {
          name = element.branch.name
        }
      })
      return name
    },
    getinvoiceDate(date) {
      var d = new Date(date)
      const ms = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ]

      var date_no = d.getDate()
      var month = ms[d.getMonth()]
      var year = d.getFullYear()
      return date_no + " " + month + " " + year
    },
    getLargestId() {
      var invoice = this.$store.state.invoice.allData
      var array = []
      if (invoice.length > 0) {
        invoice.forEach((element) => {
          array.push(element.id)
        })
        this.invoice.id = Math.max(...array)
        // let prefix = invoice.filter(e => e.id = this.invoice.id).invoice_number
        // this.invoice.id = prefix+'/'+this.invoice.id
        // return Math.max(...array) + 1
        let prefix = invoice.filter((e) => (e.id = this.invoice.id))[0]
          .invoice_number
        this.invoice.id = this.invoice.id + 1
        this.invoice.id = prefix //+ "/" + this.invoice.id;
        // this.invoice.id = this.invoice.id;
      } else {
        // return 1;
        this.invoice.id = 1
      }
      console.log(this.invoice.id)
    },
    getSubTotal(invoice) {
      let total = invoice.sub_total - invoice.pocket_expenses
      let t = 0
      if (invoice.adjustment_amt > 0) {
        t = total - invoice.adjustment_amt
        console.log("positive")
      } else {
        t = total + invoice.adjustment_amt
        console.log("negative")
      }
      return t
    },
    getTotalInvoice() {
      var data = this.$store.state.invoice.all
      var total = 0
      data.forEach((element) => {
        total = total + element.total_amt
      })
      return total
    },
    validNumber(e) {
      let stringValue = e.target.value.toString()
      let regex = /^\d*(\.\d{1,2})?$/
      if (!stringValue.match(regex) && this.price !== "") {
        this.invoice.total_amt = this.previousPrice
      }
      this.previousPrice = this.invoice.total_amt
    },
    getStateCode(data) {
      console.log(data)
      this.invoice.state_code = Number(data.fips_code)
    },

    shortText() {
      if (this.textLength) {
        let newText = this.text.substring(0)
        return newText
      } else {
        /*let newText = this.lorem.substring(0,50) + `...`;*/
        let newText = this.text.substring(0, 400)
        return newText
      }
    },
    addAllProposalAmt() {
      var all = this.$store.state.proposals.allProposals
      var total = 0
      all.forEach((element) => {
        element.proposal_fees.forEach((e) => {
          total = total + e.amount
        })
      })
      this.invoice.amount = total
    },
    showHidePendingFollowups() {
      var y = document.getElementById("desc_pending_followups")
      if (y.style.display === "none") {
        this.pendingIconName = "ChevronDownIcon"
        y.style.display = "block"
      } else {
        this.pendingIconName = "ChevronRightIcon"

        y.style.display = "none"
      }
    },
    showHideHistoryFollowups() {
      var z = document.getElementById("desc_history_followups")
      if (z.style.display === "none") {
        this.historyIconName = "ChevronDownIcon"
        z.style.display = "block"
      } else {
        this.historyIconName = "ChevronRightIcon"

        z.style.display = "none"
      }
    },
    showHideUpcomingFollowups() {
      var x = document.getElementById("desc_upcoming_followups")

      if (x.style.display === "none") {
        this.upcomingIconName = "ChevronDownIcon"
        x.style.display = "block"
      } else {
        this.upcomingIconName = "ChevronRightIcon"

        x.style.display = "none"
      }
    },
    showOrHideTaskAttach() {
      var x = document.getElementById("desc_task_attach")
      if (x.style.display === "none") {
        this.taskIconName = "ChevronDownIcon"
        x.style.display = "block"
      } else {
        this.taskIconName = "ChevronRightIcon"

        x.style.display = "none"
      }
    },
    showOrHideClientAttach() {
      var x = document.getElementById("desc_client_attach")
      if (x.style.display === "none") {
        this.clientIconName = "ChevronDownIcon"
        x.style.display = "block"
      } else {
        this.clientIconName = "ChevronRightIcon"

        x.style.display = "none"
      }
    },
    pan() {
      if (this.invoice.gstNumber.length === 15) {
        if (
          isNaN(
            this.invoice.gstNumber.slice(0, 2) +
              this.invoice.gstNumber.slice(7, 10) +
              this.invoice.gstNumber.slice(14, 15)
          ) === false &&
          isNaN(
            this.invoice.gstNumber.slice(2, 7) +
              this.invoice.gstNumber.slice(11, 12) +
              this.invoice.gstNumber.slice(13, 14)
          ) &&
          (9 > +this.invoice.gstNumber.slice(12, 13) > 0 ||
            isNaN(this.invoice.gstNumber.slice(12, 13)))
        ) {
          // this.invoice.pan_number=this.invoice.gstNumber.slice(2,12);
          let states = this.$store.state.branches.states
          let stateFilter = states.filter((x) => {
            return x.fips_code === this.invoice.gstNumber.slice(0, 2)
          })
          console.log(stateFilter, "sssss")
          console.log(stateFilter)
          this.invoice.state = stateFilter
          // this.selectedState=stateFilter[0].name;
          this.gsterr = false
          console.log("noerr")
        }
      } else {
        // this.formData.pan_number=''
        this.invoice.state = null
      }
    },
    addInvoice() {
      // console.log(this.invoice);
      const data = {
        id:
          this.$store.state.invoice.allData.length > 0
            ? Number(
                this.$store.state.invoice.allData[
                  this.$store.state.invoice.allData.length - 1
                ].id
              ) + 1
            : 1,
        proposal_id: this.proposal_edit_id,
        client_id: this.invoice.client.id,
        client_gst_number: this.invoice.gstNumber,
        task_id: this.taskId,
        state_code: this.invoice.state_code,
        invoice_number: this.prefixPlusid,
        invoice_date: this.invoice.pdate,
        due_date: this.invoice.due_date,
        billing_address: this.invoice.billing_address,
        notes: this.invoice.notes,
        item_details: this.invoice.item_details,
        amount: this.invoice.amount,
        discount: this.invoice.discount,
        taxable_amt: this.invoice.taxble_amt,
        igst: this.invoice.igst,
        sgst: this.invoice.sgst,
        cgst: this.invoice.cgst,
        utgst: this.invoice.utgst,
        igst_amt: this.invoice.igst_amt,
        sgst_amt: this.invoice.sgst_amt,
        cgst_amt: this.invoice.cgst_amt,
        utgst_amt: this.invoice.utgst_amt,

        sub_total: this.invoice.total_amt,
        pocket_expenses: this.invoice.pocket_expense,
        expenses_details: this.invoice.expense_details,
        adjustment_amt: this.invoice.adjustments,
        total_amt: this.invoice.total,
        // total:this.invoice.total
      }
      console.log(data)
      this.$store.dispatch("invoice/store", data).then(() => {
        this.$store.dispatch("invoice/get", this.taskId)
        this.$store.dispatch("invoice/fetch")
        this.$refs["invoice-modal"].hide()
      })
    },
    updateInvoice() {
      const data = {
        client_id: this.invoice.client.id,
        client_gst_number: this.invoice.gstNumber,
        task_id: this.taskId,
        state_code: this.invoice.state_code,
        invoice_number: this.invoice.id,
        invoice_date: this.invoice.pdate,
        due_date: this.invoice.due_date,
        billing_address: this.invoice.billing_address,
        notes: this.invoice.notes,
        item_details: this.invoice.item_details,
        amount: this.invoice.amount,
        discount: this.invoice.discount,
        taxable_amt: this.invoice.taxble_amt,
        igst: this.invoice.igst,
        sgst: this.invoice.sgst,
        cgst: this.invoice.cgst,
        utgst: this.invoice.utgst,
        igst_amt: this.invoice.igst_amt,
        sgst_amt: this.invoice.sgst_amt,
        cgst_amt: this.invoice.cgst_amt,
        utgst_amt: this.invoice.utgst_amt,

        sub_total: this.invoice.total_amt,
        pocket_expenses: this.invoice.pocket_expense,
        expenses_details: this.invoice.expense_details,
        adjustment_amt: this.invoice.adjustments,
        total_amt: this.invoice.total,
        // total:this.invoice.total
      }
      console.log(data)
      this.$store
        .dispatch("invoice/update", { payload: data, id: this.invoice.editId })
        .then(() => {
          this.$store.dispatch("invoice/get", this.taskId)
          this.$store.dispatch("invoice/fetch")
          this.$refs["invoice-modal"].hide()
        })
    },
    // getGST(){
    //   if(this.invoice.igst != 0 ){
    //     this.invoice.igst_amt = this.invoice.taxble_amt * this.invoice.igst / 100
    //   }
    // },
    getAmt() {
      // this.invoice.amount = Number(this.invoice.amount)
      // if(this.invoice.discount != '0'){
      // if(this.invoice.taxable_amt != null && this.invoice.amount != null && this.invoice.discount != null )
      // {
      // this.invoice.taxable_amt = 0
      this.invoice.taxble_amt = this.invoice.amount - this.invoice.discount
      // if(this.invoice.amount != null){

      //   this.invoice.taxble_amt = this.invoice.amount;
      // }else if(this.invoice.discount != null){
      //   this.invoice.taxble_amt = this.invoice.amount - this.invoice.discount;

      // }
      // }else{

      // }
      // this.invoice.taxble_amt = this.invoice.amount
      this.invoice.igst_amt =
        (Number(this.invoice.taxble_amt ?? 0) / 100) *
        Number(this.invoice.igst ?? 0)
      this.invoice.sgst_amt =
        (Number(this.invoice.taxble_amt ?? 0) / 100) *
        Number(this.invoice.sgst ?? 0)
      this.invoice.cgst_amt =
        (Number(this.invoice.taxble_amt ?? 0) / 100) *
        Number(this.invoice.cgst ?? 0)
      this.invoice.utgst_amt =
        (Number(this.invoice.taxble_amt ?? 0) / 100) *
        Number(this.invoice.utgst ?? 0)

      this.invoice.total_amt =
        Number(this.invoice.taxble_amt ?? 0) +
        Number(
          Number(this.invoice.igst_amt ?? 0) +
            Number(this.invoice.sgst_amt ?? 0) +
            Number(this.invoice.cgst_amt ?? 0) +
            Number(this.invoice.utgst_amt ?? 0)
        )
      this.invoice.sub_total = Number(this.invoice.total_amt ?? 0)
      var adjust = 0
      if (this.invoice.adjustments != 0) {
        if (this.invoice.adjustments.includes("-")) {
          adjust = Number(this.invoice.adjustments.split("-")[1])
        }
      }
      if (adjust != 0) {
        this.invoice.total =
          Number(this.invoice.sub_total ?? 0) +
          Number(Number(this.invoice.pocket_expense ?? 0)) -
          Number(adjust)
      } else {
        this.invoice.total =
          Number(this.invoice.sub_total ?? 0) +
          Number(this.invoice.pocket_expense ?? 0) +
          Number(this.invoice.adjustments)
      }
      // }
      // this.invoice.taxble_amt = this.invoice.amount - Number(this.invoice.discount)
      // return this.invoice.taxble_amt
    },
    destroyProposal(id) {
      if (confirm("Are you sure do you want to delete this item?")) {
        this.$store.dispatch("proposals/destroy", id).then(() => {
          this.$store.dispatch("proposals/get", this.taskId)
        })
      }
    },
    destroyInvoice(id) {
      if (confirm("Are you sure do you want to delete this item?")) {
        this.$store.dispatch("invoice/destroy", id).then(() => {
          this.$store.dispatch("invoice/get", this.taskId)
        })
      }
    },

    getPL(date, id) {
      var dates = new Date(date)
      if (id < 10) {
        var p_date = "PL-0" + id + "-" + dates.getFullYear()
      } else {
        var p_date = "PL-" + id + "-" + dates.getFullYear()
      }
      return p_date
    },
    getTotalAmt(amount) {
      if (amount) {
        return amount.reduce((a, b) => a + b.amount, 0)
      }
    },
    getTotalTds(tds) {
      return tds.reduce((a, b) => a + b.tds, 0)
    },
    timeFormat(date) {
      var hours = new Date(date).getHours()
      var minutes = new Date(date).getMinutes()
      var noon = hours >= 12 ? " PM" : " AM"
      hours = hours % 12
      hours = hours ? hours : 12 // the hour '0' should be '12'
      minutes = minutes < 10 ? "0" + minutes : minutes

      var maketime = hours + ":" + minutes + noon
      var date = new Date(date).toDateString()
      var fullyear = new Date(date).getFullYear()
      var today = new Date().toDateString()
      console.log(today)
      if (date == today) {
        return "today ," + maketime
      } else {
        return date //.split(fullyear)[0] //+ ','+ maketime;
        // return date + ','+ maketime;
      }
    },
    getCommentUser(comments, users) {
      let latest_index = comments.length - 1
      var string = ""
      if (latest_index !== -1) {
        // console.log(comments[latest_index]);
        var user_id = comments[latest_index].user_id
        var username = "~ "
        users.forEach((element) => {
          if (element.id === user_id) {
            username = username + element.name
          }
        })
        username =
          username + ", " + this.timeFormat(comments[latest_index].created_at)
        // string = comment

        // console.log(latest_index);
        return username //.substring(0,22)
      }
    },
    getLatestCommentLength(comments, length) {
      var arr = comments

      return arr.length
    },
    getLatestComment(comments, length) {
      // var arr = comments

      // var extra = this.$store.state.comments.extraComments
      // var all =arr
      //     if(arr.length > 0){

      //       var latest_id= arr[arr.length - 1].id + 1;
      //     }
      //     var user= null
      //     extra.forEach(element => {
      //       this.$store.state.users.all.forEach(e => {

      //         if(element.from_email == e.email){

      //           user = e
      //         }else{
      //           user={
      //             email: element.from_email,
      //             name:element.from_name,
      //             avatar:element.avatar,
      //             id:latest_id
      //           }
      //         }
      //       });
      //     });

      //       extra.forEach(element => {
      //       all.push({

      //         comment:element.message,
      //         created_at:element.created_at,
      //         id:latest_id,
      //         user:user,
      //         user_id:user.id

      //     });
      //     });

      let latest_index = comments.length - 1
      var string = ""

      if (latest_index !== -1) {
        var comment = comments[latest_index].comment
        string = comment

        // console.log(latest_index);
        return string
      }
    },
    getAssigneeString(users) {
      var user = []
      users.forEach((element) => {
        user.push(element.name)
      })
      return user.join() //.substring(0,28);
    },
    // autofillClient() {
    //   var data = [];
    //   for (let index = 0; index < this.$store.state.clients.all.length; index++) {
    //     data[index] = this.$store.state.clients.all[index].name;
    //   };
    //   var filtered = data.filter((data) => data===this.pclient.name)
    //   this.pname=filtered[0].replace(/['"]+/g, '');
    // },

    addProposal() {
      // var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
      // const now = new Date(this.pdate);
      // this.pdate=now.getDate() + ' ' + months[now.getMonth()] + ' ' +  + now.getFullYear();
      // this.proposals.push({activity: 'Proposal', date: this.pdate, amount: this.pamount, name: this.pname, address: this.paddress, subject: this.psubject, pphrase: this.pphrase, pperson: this.pperson, pfootertitle: this.pfootertitle, pfooterdesc: this.pfooterdesc});
      this.$refs["proposal-new-modal"].hide()
      let arr = []
      this.proposalFields.forEach((data) => {
        arr.push({
          title: data.title,
          description: data.desc,
        })
      })
      // this.pdate=this.currentDate;
      let data = {
        task_id: this.taskId,
        proposal_date: this.pdate,
        client_name: this.pname,
        concerned_person: this.pperson,
        address: this.paddress,
        subject: this.psubject,
        prephase: this.pphrase,
        footer_title: this.pfootertitle,
        footer_description: this.pfooterdesc,
        internal_notes: this.pnotes,
        proposalSection: arr,
        proposalFees: this.amountField,
      }
      this.$store.dispatch("proposals/create", data).then(() => {
        this.$store.dispatch("proposals/get", this.taskId).then(() => {
          console.log(this.allProposals)
        })
      })
      //     axios.post("https://api-office36ty.protracked.in/v1/proposal", {
      //       task_id: this.taskId,
      //       proposal_date: this.pdate,
      // client_name: this.pname,
      // concerned_person: this.pperson,
      // address: this.paddress,
      // subject: this.psubject,
      // prephase: this.pphrase,
      // footer_title: this.pfootertitle,
      // footer_description: this.pfooterdesc,
      // internal_notes: this.pnotes,
      // proposalSection: this.proposalFields,
      // proposalFees: this.amountField
      //     },
      //     {
      //       headers: {
      //       'X-Tenant': 'sarthak',
      //       currrent: localStorage.getItem('userData'),
      //       'Content-Type': 'application/json',
      //       'Access-Control-Allow-Origin': '*',
      //   'Access-Control-Allow-Methods': '*',
      //   'Access-Control-Allow-Headers': '*',}
      //     }).then((res) => {
      //       console.log(res);
      //     })
    },
    editProposal() {
      var arr = []
      this.proposalFields.forEach((element) => {
        arr.push({
          title: element.title,
          description: element.desc,
        })
      })
      // this.proposals.splice(this.editIndex, 1, {notes:this.pnotes,activity: 'Proposal', date: this.pdate, amount: this.pamount, pclientName: this.pclientName, address: this.paddress, subject: this.psubject, pphrase: this.pphrase,clientName:this.pclient, contactPerson:this.pcontact,pperson: this.pperson, pfootertitle: this.pfootertitle, pfooterdesc: this.pfooterdesc});
      const data = {
        task_id: this.taskId,
        proposal_date: this.pdate,
        client_name: this.pname,
        concerned_person: this.pperson,
        address: this.paddress,
        subject: this.psubject,
        prephase: this.pphrase,
        footer_title: this.pfootertitle,
        footer_description: this.pfooterdesc ?? null,
        internal_notes: this.pnotes,
        proposalSection: arr,
        proposalFees: this.amountField,
      }
      console.log(data)
      this.$store
        .dispatch("proposals/proposal_update", {
          payload: data,
          id: this.proposal_edit_id,
        })
        .then(() => {
          this.$refs["proposal-edit-modal"].hide()
          this.$store.dispatch("proposals/get", this.taskId).then(() => {})
          console.log(this.proposals.map((e) => e.total))
        })
    },
    onRowClickedProposal(i) {
      const { detailsRowProposal } = this
      if (detailsRowProposal && detailsRowProposal !== i) {
        detailsRowProposal._showDetails = false
      }

      this.$set(i, "_showDetails", !i._showDetails)
      console.log(i)
      if (i.title == "invoice") {
        this.invoice.editId = i.id
      } else if (i.title == "payment") {
        this.payment.edit_id = i.id
      } else {
        this.proposal_edit_id = i.id
      }
      this.detailsRowProposal = i
    },
    onRowClicked(item) {
      const { detailsRow } = this
      if (detailsRow && detailsRow !== item) {
        detailsRow._showDetails = false
      }

      this.$set(item, "_showDetails", !item._showDetails)
      if (item._showDetails) {
        this.detailsRow = item

        this.taskId = item.id
        if (item.subject.includes("Re:")) {
          this.replySubject = item.subject
        }
        if (!item.subject.includes("Re:")) {
          this.replySubject = "re: " + item.subject
        }
        this.$store.dispatch("proposals/get", item.id).then(() => {
          console.log(this.allProposals)
        })
        this.$store.dispatch("comments/getMailComment", item.id).then(() => {})
        this.$store.dispatch("invoice/get", item.id).then(() => {
          // console.log(this.allProposals)
        })
        this.$store.dispatch("recordPayment/get", item.id)

        if (item.description) {
          this.text = item.description.replace(/(<([^>]+)>)/gi, "")
        }
        this.$store.dispatch("tasks/getAttachments", item.id)
      }
      // this.parseHtml(item.description)
    },
    addTodo(id) {
      if (this.default_todo.length === 0) {
        return
      }
      // });
      var c_todo = []
      if (this.default_todo.length > 0) {
        this.default_todo.forEach((element) => {
          c_todo.push(element)
        })
      }
      if (this.additional_todo.length > 0) {
        this.additional_todo.forEach((element) => {
          c_todo.push(element)
        })
      }
      const data = {
        to_do: c_todo,
        task_id: id,
        user_ids: this.subtask_mentions,
      }
      this.$store.dispatch("appTodo/store", data).then(() => {
        this.$store.dispatch("appTodo/fetch")
      })
      if (this.additional_todo.length > 1) {
        while (this.additional_todo.length > 0) {
          this.additional_todo.pop()
        }
      }
    },
    onOpen(key) {
      // this.items = key === '@' ? this.mentions[0].dataSource : ""
    },

    onApply(item, key, replacedWith) {
      let count = 0
      this.subtask_mentions.forEach((element) => {
        if (element.id === item.id) {
          count++
        }
      })
      if (count === 0) {
        this.subtask_mentions.push({ name: item.name, id: item.id })
      } else {
        let index = this.subtask_mentions.findIndex((e) => e.id === item.id)
        if (index != -1) {
          this.subtask_mentions.splice(index, count)
        }
      }

      console.log(item, `has been replaced with ${replacedWith}`)
    },

    parseHtml(item) {
      // return item;
      var text = item.replace(/(<([^>]+)>)/gi, "")
      this.text = text
      this.text = this.text.substr(0, 400)
      // function extractContent(s) {

      // };
      // this.text = text;
      // if(String(this.text).length > 50){
      // }
      // this.text.substr(0 ,20)
      // extractContent(item.item.description)
      // this.$store.dispatch('leads/strip', {description:item.item.description});
      // return this.text//.replace(/{}/g, '')
      // return this.$store.state.leads.description;
    },
    add() {
      this.inputs.push({
        subtask_assignee: null,
      })
      // console.log(this.inputs)
    },
    addAmount() {
      this.amountField.push({
        description: "",
        amount: null,
      })
      // console.log(this.inputs)
    },
    addProposalField() {
      this.proposalFields.push({
        title: "",
        description: "",
      })
      // console.log(this.inputs)
    },
    remove(index) {
      this.inputs.splice(index, 1)
    },
    removeAmount(index) {
      this.amountField.splice(index, 1)
    },
    removeProposal(index) {
      this.proposalFields.splice(index, 1)
    },
    SearchChange(assignee) {
      // alert(assignee)
      // console.log();
      // console.log(this.search.split('@'));
      if (assignee.includes("@")) {
        this.search = assignee.split("@")[1]
      } else if (!assignee.includes("@")) {
      } else {
        this.search = ""
      }
    },
    openModal(modal, task) {
      // if(mod)

      if (modal.includes("_")) {
        this.$refs[modal.split("_")[0]].show()
        // this.task
        this.proposal_edit_id = modal.split("_")[2]
      } else {
        this.$refs[modal].show()
      }
      if (task) {
        this.todo_subtask = task.to_do
        this.todo_id_subtask = task.id
        this.task_id_subtask = task.task_id
        // if(document.getElementById('subtask_todo'))
        // document.getElementById('subtask_todo').value = task.to_do
      }
    },
    autofillClient() {
      var data = []
      for (
        let index = 0;
        index < this.$store.state.clients.all.length;
        index++
      ) {
        data[index] = this.$store.state.clients.all[index].name
      }

      var filtered = ""
      if (this.pclient != null) {
        filtered = data.filter((data) => data === this.pclient.name)
      }
      if (filtered.length > 0) {
        console.log(filtered)
        //this.pclientName='Centrik'//filtered2[0].replace(/['"]+/g, '');
        this.pname = filtered[0].replace(/['"]+/g, "")
      }
    },
    autofillContact() {
      var data = []
      for (
        let index = 0;
        index < this.$store.state.contactPeople.allForLeads.length;
        index++
      ) {
        data[index] = this.$store.state.contactPeople.allForLeads[index].name
      }
      var filtered = []
      if (this.pcontact != null) {
        filtered = data.filter((data) => data === this.pcontact.name)
      }
      if (filtered.length > 0) {
        this.pperson = filtered[0].replace(/['"]+/g, "")
      }
    },
    SetColor(id) {
      if (id === 1) {
        return "#9e9e9e"
      } else if (id === 2) {
        return "#607d8b"
      } else if (id === 3) {
        return "#ffe821"
      } else if (id === 4) {
        return "#ff9800"
      } else if (id === 5) {
        return "#e91e63"
      } else {
        return "#fff"
      }
    },
    SetText(id) {
      if (id === 1) {
        return "  Lowest"
      } else if (id === 2) {
        return "  Low"
      } else if (id === 3) {
        return "  Medium"
      } else if (id === 4) {
        return "  High"
      } else if (id === 5) {
        return "  Highest"
      } else {
        return "-"
      }
    },
    SelectItem(item) {
      // item.toggleDetails
      this.selected_item = item
      this.$set(this.selected_item)
    },
    open_datepicker() {
      if (document.getElementById("open_datepicker2").click) {
        document.getElementById("open_datepicker2").style.display = "block"
      }
      // console.log(document.getElementById('open_datepicker2'))
    },

    inline_due_date(due_date, task_id) {
      var t = "info"
      if (due_date == "") {
        this.closed()
      }
      if (due_date != "") {
        var date = {
          due_date: due_date,
          task_id: task_id,
        }
        if (this.$router.currentRoute.name == "leads") {
          this.$store.dispatch("leads/inline_update", { date }).then(() => {
            this.startDate2 = this.currentDate
            this.$store.dispatch("leads/fetch")

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
                rtl: false,
              })
            }
          })
        } else {
          this.$store.dispatch("tasks/inline_update", { date }).then(() => {
            this.$store.dispatch("tasks/fetch")
            this.startDate2 = this.currentDate

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
                rtl: false,
              })
            }
          })
        }
      }

      this.startDate2 = null
    },
    inline_user_update(user_id, task_id) {
      var t = "info"

      var user_data = {
        user_id: user_id,
        task_id: task_id,
      }
      if (this.$router.currentRoute.name == "leads") {
        this.$store.dispatch("leads/inline_update", { user_data }).then(() => {
          this.$store.dispatch("leads/fetch")

          if (this.successMessage) {
            // this.$refs.snackbar[t](this.successMessage)
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
              rtl: false,
            })
          }
        })
      } else {
        this.$store.dispatch("tasks/inline_update", { user_data }).then(() => {
          this.$store.dispatch("tasks/fetch")

          if (this.successMessage) {
            // this.$refs.snackbar[t](this.successMessage)
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
              rtl: false,
            })
          }
        })
      }
    },
    handleHide(bvEvent) {
      if (!this.isCloseable) {
        bvEvent.preventDefault()
      } else {
        this.$refs.dropdown.hide()
      }
    },
    closeMe(due_date, task_id) {
      this.isCloseable = true

      this.$refs.dropdown.hide()
      if (due_date != null) {
        this.inline_due_date(due_date, task_id)
      }
      this.startDate2 = ""
    },
    closed() {
      this.isCloseable = true

      this.$refs.dropdown.hide()
    },
    inlineUpdate(ev, type, index, priority, task_id) {
      // console.log(444);
      var t = "info"
      priority = index
      var data = {
        id: index,
        task_id: task_id,
      }
      if (this.$router.currentRoute.name == "leads") {
        this.$store.dispatch("leads/inline_update", { data }).then(() => {
          this.$store.dispatch("leads/fetch")

          // if (this.$store.state.leads.isLoadingLeads == true) {
          // this.$refs.snackbar[t](this.successMessage)
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
            rtl: false,
          })
          // }
        })
      } else {
        this.$store.dispatch("tasks/inline_update", { data }).then(() => {
          this.$store.dispatch("tasks/fetch")

          // if (this.$store.state.leads.isLoadingLeads == true) {
          // this.$refs.snackbar[t](this.successMessage)
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
            rtl: false,
          })
          // }
        })
      }

      // console.log(type);
    },
    dropdownShouldOpen(search, VueSelect) {
      // console.log(VueSelect);
      return VueSelect.closed
      // if (search.length) {
      //   return VueSelect.open
      // }

      // return VueSelect.search.length !== 0 && VueSelect.open
    },

    onSearch(query) {
      this.search = query
      this.offset = 0
    },
    editLead(index) {
      // this.a = index;
      // editLead = index
      router.push("leads/" + index)
      // router.router.push('leads/'+ index[0].id)
      // window.location.href = 'leads/'+ index[0].id
      // console.log(this.a[0]);/
    },
    // dropdownShouldOpen(VueSelect) {
    //   if (this.filterBranch !== null) {
    //     return VueSelect.open
    //   }

    //   return VueSelect.search.length !== 0 && VueSelect.open
    // },

    clearField() {
      this.filterCategory = ""
      this.filterContact = ""
      this.filterSearch = ""
      this.filterStatus = ""
      this.filterUsers = ""
      this.filtercompany = ""
      this.FilterPriority = ""
      this.filterBranch = ""
      this.fetchAll()
    },
    async onOpen() {
      if (this.hasNextPage) {
        await this.$nextTick()
        this.observer.observe(this.$refs.load)
      }
    },
    onClose() {
      this.observer.disconnect()
    },
    async infiniteScroll([{ isIntersecting, target }]) {
      if (isIntersecting) {
        const ul = target.offsetParent
        const scrollTop = target.offsetParent.scrollTop
        this.limit += 10
        await this.$nextTick()
        ul.scrollTop = scrollTop
      }
    },

    filter(event) {
      console.log(this.filterStatus)
      if (this.$router.currentRoute.name == "leads") {
        this.$store
          .dispatch("leads/filter", {
            status: this.filterStatus,
            branch: this.filterBranch,
            company: this.filtercompany,
            category: this.filterCategory,
            search: this.filterSearch,
            priority: this.FilterPriority,
            user: this.filterUsers,
            contact: this.filterContact,
          })
          .then(() => {
            console.log(this.successMessage)
          })
          .catch(() => {
            console.log(this.errorMessage)
          })
      } else {
        this.$store
          .dispatch("tasks/filter", {
            status: this.filterStatus,
            branch: this.filterBranch,
            company: this.filtercompany,
            category: this.filterCategory,
            search: this.filterSearch,
            priority: this.FilterPriority,
            user: this.filterUsers,
            contact: this.filterContact,
          })
          .then(() => {
            console.log(this.successMessage)
          })
          .catch(() => {
            console.log(this.errorMessage)
          })
      }
    },

    openFilter() {
      this.isFilterActive = !this.isFilterActive
    },

    fetchAll() {
      //console.log(this.$router.currentRoute.params.status);
      if (this.$router.currentRoute.params.status) {
        if (this.$router.currentRoute.name == "tasks") {
          this.$store.dispatch(
            "tasks/get",
            this.$router.currentRoute.params.lead_id
          )
        } else {
          this.$store.dispatch(
            "leads/get",
            this.$router.currentRoute.params.lead_id
          )
        }
      }
      if (!this.$router.currentRoute.params.status) {
        if (this.$router.currentRoute.name == "tasks") {
          this.$store.dispatch("tasks/fetch")
        } else {
          this.$store.dispatch("leads/fetch")
        }
      }
    },
    formatDate(date) {
      const dates = new Date(date)

      const ms = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ]
      return `${dates.getDate()} ${ms[dates.getMonth()]} ${dates.getFullYear()}`
    },
    DaysLeft(start, end) {
      // const startDate = start
      const endDate = end
      if (new Date(endDate).getDate() === new Date().getDate()) {
        var diffInMs = new Date(endDate) - new Date()
        diffInMs = Math.round(diffInDays)
        // eslint-disable-next-line no-bitwise
        return diffInMs | 0
      } else {
        var diffInMs = new Date(endDate) - new Date()

        var diffInDays = diffInMs / (1000 * 60 * 60 * 24)
        diffInDays = Math.round(diffInDays)
        // eslint-disable-next-line no-bitwise
        return diffInDays | 0
      }
      // const diffInMs = new Date(endDate) - new Date();
      // var diffInDays = diffInMs / (1000 * 60 * 60 * 24);
      // diffInDays = Math.round(diffInDays);
      // // eslint-disable-next-line no-bitwise
      // return diffInDays | 0;
    },

    // convertToTask() {
    //   const task = {
    //     type: 'task',
    //   }
    //   console.log(task)
    // },
    destroyItem(id) {
      // eslint-disable-next-line no-restricted-globals
      if (confirm("Are you sure do you want to delete this item?")) {
        if (this.$router.currentRoute.name == "leads") {
          this.$store.dispatch("leads/destroy", id).then(() => {
            this.fetchAll()
          })
        } else {
          this.$store.dispatch("tasks/destroy", id).then(() => {
            this.fetchAll()
          })
        }
      }
    },
    buttonVariant(status) {
      if (status == "open") {
        return "primary"
      } else if (status == "completed") {
        return "success"
      } else if (status == "invoiced") {
        return "warning"
      } else if (status == "closed") {
        return "secondary"
      } else {
        return "warning"
      }
    },
    priorityVariant(priority) {
      if (priority === 1) {
        return "secondary"
      }
      if (priority === 2) {
        return "warning"
      }
      if (priority === 3) {
        return "info"
      }
      if (priority === 4) {
        return "danger"
      }
      if (priority === 5) {
        return "success"
      }
      return ""

      // return priority === 1 ? 'secondary'
      //   // eslint-disable-next-line no-nested-ternary
      //   : priority === 2 ? 'warning'
      //     // eslint-disable-next-line no-nested-ternary
      //     : priority === 3 ? 'info'
      //       : priority === 4 ? 'danger' : ''
    },
    // eslint-disable-next-line consistent-return
    // AddEmployee(employee) {
    //   const findEmp = this.employee(employ => employ.title === employee.title)
    //   if (findEmp === undefined) { return findEmp }
    // },
  },
  watch: {
    dropClient(oldClient, newClient) {
      if (newClient === false) {
        document.body.removeEventListener("click", this.clickEventClient)
      }
    },
    dropTask(oldTask, newTask) {
      if (newTask === false) {
        document.body.removeEventListener("click", this.clickEventTask)
      }
    },
  },
  watch: {
    dropClient(oldClient, newClient) {
      if (newClient === false) {
        document.body.removeEventListener("click", this.clickEventClient)
      }
    },
    dropTask(oldTask, newTask) {
      if (newTask === false) {
        document.body.removeEventListener("click", this.clickEventTask)
      }
    },
  },
  beforeDestroy() {
    window.removeEventListener("click", this.closed())
  },
  setup() {
    const isCreateSidebarActive = ref(false)
    const isEditSidebarActive = ref(false)
    const ClientisEditSidebarActive = ref(false)
    const editItem = ref({})
    const editItemClient = ref({})
    const isFilterActive = ref(false)
    const isSearchMessagesActive = ref(false)

    let statusOptions = ["Open", "Completed", "Invoiced", "Closed"]

    const { refFormObserver, getValidationState, resetForm } = formValidation(
      resetForm
    )
    // const editLead = ref({})
    const perPage = ref(10)
    // const totalCount = ref(store.state.emails.all.length)
    const currentPage = ref(1)
    const perPageOptions = [10, 25, 50, 100]
    // const toast = useToast();
    const perfectScrollbarSettings = {
      maxScrollbarLength: 150,
    }
    const updateTaskIsCompleted = (taskData) => {
      // eslint-disable-next-line no-param-reassign
      taskData.isCompleted = !taskData.isCompleted
      updateTask(taskData)
    }
    const updateTask = (taskData) => {
      store
        .dispatch("appTodo/update", { payload: taskData, id: taskData.id })
        .then(() => {
          // eslint-disable-next-line no-use-before-define
          store.dispatch("appTodo/fetch")
        })
    }

    return {
      // Sidebar
      isCreateSidebarActive,
      isEditSidebarActive,
      perPage,
      currentPage,
      perPageOptions,
      editItem,
      editItemClient,
      ClientisEditSidebarActive,
      perfectScrollbarSettings,
      updateTaskIsCompleted,
      updateTask,
      refFormObserver,
      formValidation,
      getValidationState,
      // toast,
      // editLead,
      isSearchMessagesActive,
      isFilterActive,
      statusOptions,
    }
  },
}
</script>

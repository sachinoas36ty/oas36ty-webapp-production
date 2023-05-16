<template>
    <div>
        <b-modal
          no-close-on-backdrop
          id="Modal-proposal"
          ref="Modal-proposal"
          size="lg"
          hide-footer
          v-model="CreateProposalModal"
          title="Create Proposals"
        >
          <ValidationObserver #default="{ handleSubmit }" ref="refFormObserver">
            <b-form @submit.prevent="handleSubmit(handleSubmitCreateProposal)">
              <b-row>
                <b-col md="6"
                  ><span>Client *</span>
                  <ValidationProvider
                    #default="validationContext"
                    name="Client"
                    vid="Client"
                    rules="required"
                  >
                    <v-select
                      v-model="proposalFormData.client"
                      :options="clientArrayComputed"
                    />
                    <b-form-invalid-feedback class="d-block">
                      {{ validationContext.errors[0] }}
                    </b-form-invalid-feedback>
                  </ValidationProvider>
                </b-col>
                <b-col md="6">
                  <span>Branch</span>
                  <v-select
                    v-model="proposalFormData.branch"
                    placeholder="Branches"
                    :options="branchArrayComputed"
                  ></v-select>
                </b-col>
              </b-row>

              <b-row>
                <b-col md="12">
                  <span>Task/Lead *</span>
                  <ValidationProvider
                    #default="validationContext"
                    name="Task/Lead"
                    vid="Task/Lead"
                    rules="required"
                  >
                    <v-select
                      v-model="proposalFormData.task"
                      placeholder="Tasks/Leads"
                      :options="tasksArrayComputed"
                      label="subject"
                      @input="prefillProposal"
                    >
                      <!-- <template #list-header="tasks" >
                <h1 v-if="tasks.type==='task'">Leads</h1>
              </template> -->
                      <!-- <template #header=groupLabel>
                
                <div v-if="groupLabel.label === 'Tasks'">Tasks</div>
                <div v-else-if="groupLabel.label === 'Leads'">Leads</div>
              </template> -->

                      <template #option="option">
                        <div class="d-flex justify-content-between">
                          <div>#{{ option.id }} - {{ option.subject }}</div>
                          <div>
                            <b-badge
                              :variant="buttonVariant(option.self_user.status)"
                            >
                              {{ option.self_user.status }}
                            </b-badge>
                          </div>
                        </div>
                        <!-- <div v-if="option.label === 'Tasks'">
                      <div v-for="i in option.options" :key="i.subject">

                        <div>#{{ i.id }} - {{ i.subject }}</div>
                        <div>
                          <b-badge :variant="buttonVariant(i.self_user.status)">
                            {{ i.self_user.status }}
                          </b-badge>
                        </div>
                      </div>

                    </div>
                    <div v-if="option.label === 'Leads'">


                      <div v-for="i in option.options" :key="i.subject">

                        <div>#{{ i.id }} - {{ i.subject }}</div>
                        <div>
                          <b-badge :variant="buttonVariant(i.self_user.status)">
                            {{ i.self_user.status }}
                          </b-badge>
                        </div>
                      </div>

                    </div> -->
                      </template>

                      <template #selected-option="option">
                        <div class="d-flex justify-content-between">
                          <div>#{{ option.id }} - {{ option.subject }}</div>
                          <div>
                            <b-badge
                              :variant="buttonVariant(option.self_user.status)"
                            >
                              {{ option.self_user.status }}
                            </b-badge>
                          </div>
                        </div>
                      </template>
                    </v-select>
                    <b-form-invalid-feedback class="d-block">
                      {{ validationContext.errors[0] }}
                    </b-form-invalid-feedback>
                  </ValidationProvider>
                </b-col>
              </b-row>
              <br />
              <br />
              <b-row>
                <b-col md="8"></b-col>
                <b-col class="text-right">
                  <b-button
                    size="sm"
                    class="mr-1"
                    variant="primary"
                    @click="
                      $refs['Modal-proposal'].hide();
                      resetFormProposals();
                    "
                  >
                    <span class="text-nowrap"> Cancel</span>
                  </b-button>
                  <b-button
                    size="sm"
                    variant="primary"
                    type="submit"
                    :disabled="$store.state.proposals.isLoading"
                  >
                    <span class="text-nowrap"> Create</span>
                    <b-spinner
                      small
                      class="ml-1"
                      v-if="$store.state.proposals.isLoading"
                    />
                  </b-button>
                </b-col>
              </b-row>
            </b-form>
          </ValidationObserver>
        </b-modal>
    </div>
</template>

<script>
import { ref } from "@vue/composition-api";
import "vue-toastification/dist/index.css";

import imgLogo from "../../../assets/images/logo/centrik-logo.png";
// import imgLogo from "../../../assets/images/logo/";
import { ValidationProvider, ValidationObserver } from "vee-validate";
import vSelect from "vue-select";
import html2pdf from "html2pdf.js";
import formValidation from "@/@core/comp-functions/forms/form-validation";
import { quillEditor } from "vue-quill-editor";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faBars,
  faEnvelopeOpen,
  faEnvelope,
  faComments,
  faComment,
  faCommentDots,
  faCommentDollar,
  faIndianRupee,
} from "@fortawesome/free-solid-svg-icons";
import {
  faTwitter,
  faFacebook,
  faStackOverflow,
  faGithub,
} from "@fortawesome/free-brands-svg-icons";

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
);

import {
  VBTooltip,
  BTabs,
  BTab,
  BTable,
  BCard,
  BBadge,
  BButton,
  BContainer,
  BRow,
  BCol,
  VBToggle,
  BCollapse,
  BSpinner,
  BFormInput,
  BFormGroup,
  BFormDatepicker,
  BForm,
  BMediaAside,
  BFormInvalidFeedback,
  BModal,
  BFormTextarea,
  BFormFile,
  // BSelect,
} from "bootstrap-vue";

export default {
  components: {
    VBTooltip,
    BFormFile,
    BFormTextarea,
    BFormInvalidFeedback,
    ValidationProvider,
    FontAwesomeIcon,
    quillEditor,

    BFormDatepicker,
    // BSelect,
    ValidationObserver,
    BModal,
    BSpinner,
    BTabs,
    BTab,
    BTable,
    BCard,
    BBadge,
    BTab,
    BTable,
    BCard,
    BBadge,
    BButton,
    BContainer,
    BRow,
    BCol,
    VBToggle,
    BCollapse,
    BFormInput,
    BFormGroup,
    vSelect,
    BForm,
    BMediaAside,
  },
  directives: {
    "b-tooltip": VBTooltip,
    "b-toggle": VBToggle,
  },
  data() {
    const date = new Date();

    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    return {
      lastInvoiceId: null,
      showExpensesModal: false,
      paymentInvoiceArray: [],
      tds_deductedArray: [],
      paymentInvoice: {
        task_id: null,
        invoice_id: null,
        tds_deducted: 0,
        paid_amount: null,
      },
      greaterAmountSingle: false,
      greaterAmount: [],
      paymentTotalAmount: 0,
      paymentTotalArray: [],

      paymentPrefillAmount: "12",
      file_name2: [],
      composeData: {
        to: [],
        bcc: [],
        message: "",
        subject: "",
        from: null,
        file2: null,
      },

      prefixPlusid: null,
      proposalFields: [],
      loader_invoice: false,
      invoiceTitle: "add",

      taskId: null,
      amountField: [{ amount: null, description: "" }],
      proposal_edit_id: 0,

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
      // pfooterdesc: `${
      //   JSON.parse(localStorage.getItem("userData")).name
      // }<br/>For, ${
      //   JSON.parse(localStorage.getItem("userData")).tenant.organization.name
      // }<br/><br/>P:<br/>GSTIN:<br/>(Authorised Representative)`,
      pNotes: "",
      psubject: "",
      pphrase: "As per discussion, please find below the brief proposal",
      editIndex: null,
      pnotes: "",
      invoices: false,

      // invoice: {
      //   prefix: "yr 22-23/",

      //   client_name: "",
      //   editId: 0,
      //   state_code: 0,
      //   client: null,
      //   gstNumber: "",
      //   item_details: "",
      //   state: null,
      //   id: "",
      //   pdate: `${year}-${month}-${day}`,
      //   due_date: `${year}-${month}-${day}`,
      //   billing_address: "delhi jangpura",
      //   notes: "Thank you for your business.",
      //   amount: null,
      //   discount: null,
      //   taxble_amt: null,
      //   igst: null,
      //   igst_amt: null,
      //   cgst: null,
      //   cgst_amt: null,
      //   sgst: null,
      //   sgst_amt: null,
      //   utgst: null,
      //   utgst_amt: null,
      //   total_amt: 0,
      //   sub_total: 0,
      //   pocket_expense: null,
      //   expense_details: "",
      //   adjustments: 0,
      //   total: 0,
      // },

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
        prefill: {
          total_amt: 2333,
        },
      },

      groups: [
        {
          label: "Tasks",
          options: this.$store.state.tasks.all,
        },
        {
          label: "Leads",
          options: this.$store.state.leads.all,
        },
      ],
      proposalFormData: {
        client: null,
        branch: null,
        task: null,
      },
      invoiceFormData: {
        client: null,
        branch: null,
        task: [],
      },
      paymentFormData: {
        client: null,
        branch: null,
        task: null,
      },
      loader_proposal: false,
      userData: JSON.parse(localStorage.getItem("userData")),
      selectedTask: null,
      filterStatus: null,
      fromDate: null,
      invoiceFromDate: null,
      invoiceToDate: null,
      paymentFromDate: null,
      paymentToDate: null,
      toDate: null,
      selectedCompany: null,
      selectedClient: null,
      clientArray: [],
      branchArray: [],
      tasksArray: [],
      pamount: null,
      pclient: "",
      pcontact: "",
      pname: "",
      paddress: "",
      pperson: "",
      pfeesdesc: "",
      activeTab: 0,
      showProposalModal: true,
      showInvoicesModal: false,
      showPaymentModal: false,
      CreateProposalModal: false,
      CreatePaymentModal: false,
      CreateInvoicesModal: false,
      filterProposalModal: false,
      filterPaymentModal: false,
      filterInvoicesModal: false,
      img: this.imgLogo,
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
      selectVal: {
        priority: undefined,
        status_master_id: undefined,
        company_id: undefined,
        contact_person_id: undefined,
        branch_id: undefined,
        category_id: undefined,
      },
      proposalPdf: "PL-0009.pdf",
      previewImage: null,
      file: null,
      image: null,
      // file_name: [],
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
      replySubject: "",
      // composeData: {
      //   message: "",
      //   to: [],
      //   cc: [],
      //   bcc: [],
      //   from: null,
      // },

      loader_payment: false,
      invoice: {
        prefix: "yr 22-23/",

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

      // creating for testing purpose
      invoicesDetailFields: [
        {
          key: "Sl.No",
          thClass: "bg-dark text-white text-left ",
          tdClass: "text-center",
        },
        {
          key: "Description",
          thClass: "bg-dark text-white text-left",
          tdClass: "text-left",
        },
        {
          key: "Amount",
          thClass: "bg-dark text-white text-center",
          tdClass: "text-center",
        },
        {
          key: "TotalAmount",
          thClass: "bg-dark text-white text-right",
          tdClass: "text-right",
        },
      ],
      invoicesDetailsItems: [
        {
          "Sl.No": 1,
          Description: "Contempt against RERA Order- Advance fees",
          Amount: 75000,
          TotalAmount: 75000.0,
        },
      ],

      proposalField: [
        {
          key: "no",
          label: "# ",
          tdClass: "no-padding text-center width-0   ",
          thClass: "extra-space-header  text-center width-0  ",
        },
        {
          key: "task_id",
          label: "Task #",
          tdClass: "text-center width-0 no-padding",
          thClass: "text-center no-padding-header widht-0",
        },
        {
          key: "client_name",
          label: "Client Name",
          thClass: "width-0 no-padding-header text-center",
          tdClass: "width-0 text-center no-padding",
        },
        {
          key: "concerned_person",
          label: "Concerned Person",
          tdClass: "width-0 text-center",
          thClass: "width-0 text-center no-padding-header ",
          // width:'50px',
        },
        {
          key: "proposal_date",
          label: "Date",
          tdClass: "width-0 text-center",
          thClass: "width-0 text-center extra-space-header ",
        },
        {
          key: "amount",
          label: "Amount",
          tdClass: "width-0 text-center",
          thClass: "width-0 text-center no-padding-header ",
        },
        {
          key: "subject",
          label: "Subject",
          tdClass: "width-0 truncate-description text-center",
          thClass: "text-center width-0 no-padding-header ",
        },
        {
          key: "internal_notes",
          label: "Notes",
          tdClass: "text-center width-0 ",
          thClass: "text-center width-0 no-padding-header ",
        },
        {
          key: "status",
          tdClass: "text-capitalize width-0 text-center",
          thClass: "width-0 text-center no-padding-header ",
        },
      ],

      invoiceFields: [
        {
          key: "invoice_number",
          label: "#",
          tdClass: "width-0 text-center no-padding",
          thClass: "text-center width-0 extra-space-header ",
        },
        {
          key: "task_id",
          label: "Task #",
          tdClass: "text-center width-0",
          thClass: "text-center",
        },
        {
          key: "client_name",
          label: "Client Name",
          tdClass: "width-0 text-center",
          thClass: " width-0 text-center",
        },
        {
          key: "invoice_date",
          label: "Date",
          tdClass: "width-0 text-center no-padding",
          thClass: " width-0 text-center extra-space-header",
        },
        {
          key: "amount",
          label: "Amount",
          tdClass: "width-0 text-center",
          thClass: "width-0 text-center",
        },
        {
          key: "recieved",
          label: "Total Recieved(₹)",
          tdClass: "width-0 text-center",
          thClass: " width-0 text-center",
        },
        {
          key: "due",
          label: "Due(₹)",
          tdClass: "text-center width-0",
          thClass: "text-center width-0",
        },
        {
          key: "status",
          tdClass: "text-capitalize width-0 text-center",
          thClass: "width-0 text-center",
        },
      ],
      paymentFields: [
        {
          key: "id",
          label: "#",
          tdClass: "width-0 text-center no-padding",
          thClass: "text-center extra-space-header",
        },
        {
          key: "client_name",
          label: "Client Name",
          tdClass: "width-0 text-center",
          thClass: "text-center",
        },
        {
          key: "pay_date",
          label: "Date",
          tdClass: "width-0 text-center no-padding",
          thClass: "text-center extra-space-header",
        },
        {
          key: "invoice_id",
          label: "Invoice #",
          tdClass: "width-0 text-center",
          thClass: "text-center",
        },
        {
          key: "payment_mode",
          label: "Mode",
          tdClass: "width-0 text-center",
          thClass: "text-center",
        },
        {
          key: "amount",
          label: "Amount(₹)",
          tdClass: "text-center width-0",
          thClass: "text-center",
        },
        {
          key: "unused_amount",
          label: "Unused Amount(₹)",
          tdClass: "text-capitalize width-0 text-center ",
          thClass: "text-center",
        },
      ],
      expenseFields: [
        {
          key: "id",
          label: "Task #",
          tdClass: "text-left width-0",
          thClass: "text-left",
        },
        { key: "client", label: "Client Name", tdClass: "width-0" },
        { key: "date", label: "Date", tdClass: "width-0" },
        { key: "description", label: "Description", tdClass: "width-0" },
        {
          key: "member",
          label: "Member",
          tdClass: "width-0",
          thClass: "text-left",
        },
        {
          key: "expense",
          label: "Expense(₹)",
          tdClass: "text-left width-0",
          thClass: "text-left ",
        },
        { key: "status", tdClass: "text-capitalize width-0" },
      ],
    };
  },
  beforeUpdate() {
    var signAll = [];
    if (this.$store.state.users.signAll != null) {
      signAll.push(this.$store.state.users.signAll);
    }
    if (signAll.length > 0) {
      this.composeData.message = signAll[0].signature;
    }
    const invoicesAllData = this.$store.state.invoice.allData;
    this.lastInvoiceId = invoicesAllData[invoicesAllData.length - 1].id;
    this.prefixPlusid = this.invoice.prefix + this.lastInvoiceId;
  },
  setup() {
    const isCreateSidebarActive = ref(false);
    const isEditSidebarActive = ref(false);
    const ClientisEditSidebarActive = ref(false);
    const editItem = ref({});
    const editItemClient = ref({});
    const isFilterActive = ref(false);
    const isSearchMessagesActive = ref(false);

    let statusOptions = ["open", "completed", "invoiced", "closed"];

    const { refFormObserver, getValidationState, resetForm } = formValidation(
      resetForm
    );
    // const editLead = ref({})
    const perPage = ref(10);
    // const totalCount = ref(store.state.emails.all.length)
    const currentPage = ref(1);
    const perPageOptions = [10, 25, 50, 100];
    // const toast = useToast();
    const perfectScrollbarSettings = {
      maxScrollbarLength: 150,
    };
    const updateTaskIsCompleted = (taskData) => {
      // eslint-disable-next-line no-param-reassign
      taskData.isCompleted = !taskData.isCompleted;
      updateTask(taskData);
    };
    const updateTask = (taskData) => {
      store
        .dispatch("appTodo/update", { payload: taskData, id: taskData.id })
        .then(() => {
          // eslint-disable-next-line no-use-before-define
          store.dispatch("appTodo/fetch");
        });
    };

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
    };
  },

  computed: {
    isLoadingProposal(){
      return this.$store.state.proposals.isLoading;
    },
    isLoadingInvoices(){
      return this.$store.state.invoice.isLoading;

    },
    isLoadingPayment(){
      return this.$store.state.recordPayment.isLoading;

    },
    getTotalTdsAmt() {
      return this.tds_deductedArray.reduce((total, amt) => {
        if (amt === "") amt = 0;
        return total + amt;
      }, 0);
    },
    getTotalAmtPayment() {
      return this.paymentTotalArray.reduce((total, amt) => {
        if (amt === "") amt = 0;
        return total + amt;
      }, 0);
    },

    filteredInvoiceClient() {
      console.log(this.payment.client.name, "this is filtered invoices");
      return this.$store.state.invoice.allData.filter((invoice) => {
        return invoice.client.name === this.payment.client.name;
      });
    },

    paginated_contactPerson() {
      return this.contactPerson.slice(this.offset, this.limit + this.offset);
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
      return data.filter((country) => country.includes(this.search));
    },

    tasksAndLeadsCombine() {
      let arr = this.$store.state.leads.all;
      arr = arr.concat(this.$store.state.tasks.all);
      let data = {
        tasksHeader: "Tasks",
        leadsHeader: "Leads",
        data: arr,
        // tasks :  this.$store.state.tasks.all,
        // leads  : this.$store.state.leads.all,
      };

      return data;
    },
    selectedTaskDisplay() {
      if (this.selectedTask) {
        return `#${this.selectedTask.id} - ${this.selectedTask.subject}`;
      }
      return "";
    },

    filteredProposalItems() {
      const { fromDate, toDate } = this;
      let filteredItems = this.proposalItems;

      if (this.selectedCompany) {
        filteredItems = filteredItems.filter(
          (item) => item.client_name === this.selectedCompany
        );
      }

      if (this.filterStatus) {
        console.log("inside the filter status");
        const allTasks = this.$store.state.tasks.all;
        filteredItems = filteredItems.filter((item) => {
          const task = allTasks.find((task) => task.id === item.task_id);
          console.log("task.status_master.type:", task.status_master.type);
          if (
            task &&
            task.status_master &&
            task.status_master.type === this.filterStatus
          ) {
            return true;
          }
          return false;
        });
      }

      if (fromDate && toDate) {
        filteredItems = filteredItems.filter((item) => {
          const proposalDate = item.proposal_date;
          if (!proposalDate) {
            return false;
          }
          const date = new Date(proposalDate);
          const formattedDate = date.toISOString().substr(0, 10);
          return formattedDate >= fromDate && formattedDate <= toDate;
        });
      }

      return filteredItems;
    },
    filteredInvoiceItems() {
      const { invoiceFromDate, invoiceToDate, selectedCompany } = this;
      let filteredItems = this.invoicesItems;
      if (selectedCompany) {
        filteredItems = filteredItems.filter(
          (item) => item.client.name === selectedCompany
        );
      }
      if (invoiceFromDate && invoiceToDate) {
        filteredItems = filteredItems.filter((item) => {
          const invoiceDate = item.invoice_date;
          if (!invoiceDate) {
            return false;
          }
          const date = new Date(invoiceDate);
          const formattedDate = date.toISOString().substr(0, 10);
          return (
            formattedDate >= invoiceFromDate && formattedDate <= invoiceToDate
          );
        });
      }
      return filteredItems;
    },
    filteredPaymentItems() {
      const { paymentFromDate, paymentToDate, selectedCompany } = this;
      let filteredItems = this.paymentItems;
      if (selectedCompany) {
        filteredItems = filteredItems.filter(
          (item) => item.client_name === selectedCompany
        );
      }
      if (paymentFromDate && paymentToDate) {
        filteredItems = filteredItems.filter((item) => {
          const payDate = item.pay_date;
          if (!payDate) {
            return false;
          }
          const date = new Date(payDate);
          const formattedDate = date.toISOString().substr(0, 10);
          return (
            formattedDate >= paymentFromDate && formattedDate <= paymentToDate
          );
        });
      }
      return filteredItems;
    },

    clientArrayComputed() {
      return this.$store.state.clients.all.map((client) => client.name);
    },
    branchArrayComputed() {
      return this.$store.state.branches.all.map((branch) => branch.name);
    },

    tasksArrayOnlyProposal() {
      let allProposals = this.$store.state.proposals.allProposals;
      const filterProposalId = allProposals.map((item) => item.task_id);
      let allTasks = this.$store.state.tasks.all;
      const filterTask = allTasks.filter((task) =>
        filterProposalId.includes(task.id)
      );
      return filterTask;
    },
    tasksArrayComputed() {
      return this.$store.state.tasks.all;
    },
    leadsArrayComputed() {
      return this.$store.state.leads.all;
    },
    taskOptions() {
      return this.tasksArrayComputed.map((task) => task.id);
    },
    expenses() {
      let arr = this.$store.state.expenses.all;
      let ar = [];
      let client = "";
      arr.forEach((element) => {
        this.$store.state.leads.all.forEach((x) => {
          if (x.id === element.task_id) {
            client = x.company != null ? x.company.name : x.contact_person.name;
          }
        });
        ar.push({
          id: element.task_id,
          client: client,
          date: element.date,
          description: element.description,
          member:
            element.users.length > 0
              ? element.users[element.users.length - 1].name
              : "",
          expense: element.expense,
          status: "active",
        });
      });
      return ar;
    },
    branches() {
      var data = [];
      for (
        let index = 0;
        index < this.$store.state.branches.all.length;
        index++
      ) {
        data[index] = this.$store.state.branches.all[index].name;
      }

      // return data;
      return data.filter((country) =>
        country.toLocaleLowerCase().includes(this.search.toLocaleLowerCase())
      );
      var name = [];
      var id = [];
      for (let index = 0; index < data.length; index++) {
        name[index] = data[index].name;
        id[index] = data[index].id;
      }
      // return name;
      // return
      // var obj = {
      //   name: name.filter((b) => b.includes(this.filterBranch)),
      //   // id : id.filter((b) => b.includes(this.filterBranch)),
      // }
      return obj;
    },
    paginated_branch() {
      return this.branches.slice(this.offset, this.limit + this.offset);
    },
    emails_contact() {
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
      return data.filter((country) => country.includes(this.search));
    },
    outBoundEmails() {
      return this.$store.state.emails.all_outbound_emails;
    },

    proposalItems() {
      let data = this.$store.state.proposals.allProposals;
      data.forEach((x) => {
        if (x.subject.length > 20) {
          x.subject = x.subject.substr(0, 20);
        }
        let amount = 0;
        let paid = 0;
        this.$store.state.invoice.allData.forEach((z) => {
          if (z.proposal_id === x.id) {
            console.log(z, x, "zxzxzzzxzx");
            paid = z.amount;
          }
        });
        x.proposal_fees.forEach((y) => {
          amount = amount + y.amount;
        });
        x.amount = amount;
        console.log(amount, paid, "apapapap");
        if (paid > 0) {
          // console.log(amount / paid, "pppppppppp");
          x.status = (paid / amount) * 100;
          x.status = x.status.toFixed(2);
        }
        console.log(x.id.length, "lllllllllllllllllllllllll");
        x.no = `PL-${("0" + x.id).slice(-2)}-${new Date().getFullYear()}`;
      });

      return data;
    },
    invoicesItems() {
      let data = this.$store.state.invoice.allData;
      data.forEach((x) => {
        let amount = 0;
        this.$store.state.recordPayment.allData.forEach((y) => {
          if (y.record_pay_invoice.length > 0) {
            if (x.id === y.record_pay_invoice[0].invoice_id) {
              y.record_pay_invoice.forEach((z) => {
                amount = amount + z.paid_amount;
              });
            }
          }
        });
        x.recieved = amount;
        x.due = x.amount - x.recieved;
        x.client_name = x.client.name;
      });
      console.log(data, "dddddddddddd");
      return data;
      // const data = [
      //   {
      //     id: 0,
      //     adjustment_amt: 0,
      //     amount: 165000,
      //     audits: Array[2],
      //     billing_address: 'Centrik',
      //     cgst: 10,
      //     cgst_amt: 6500,
      //     client: Object,
      //     client_gst_number: null,
      //     client_id: 1,
      //     client_name: 'Centrik',
      //     created_at: '2023-01-25T08:52:33.000000Z',
      //     deleted_at: null,
      //     due: 63700,
      //     due_date: '2023-01-25',
      //     expenses_details: null,
      //     igst: 10,
      //     igst_amt: 6500,
      //     invoices_date: '2023-01-25',
      //     invoice_date: '2023-01-25',
      //     invoice_number: 'testing-invoice/8',
      //     item_details: 'hello test',
      //     notes: 'Thank you for the business',
      //     pocket_expenses: null,
      //     proposal_id: 9,
      //     recieved: 1300,
      //     sgst: 10,
      //     sgst_amt: 6500,
      //     state_code: 0,
      //     sub_total: 91000,
      //     task_id: 21,
      //     taxable_amt: 65000,
      //     total_amt: 91000,
      //     updated_at: '2023-01-25T09:54:03.00000z',
      //     utgst: 10,
      //     utgst_amt: 6500,
      //   },
      //   {
      //     id: 1,
      //     adjustment_amt: 100,
      //     amount: 265000,
      //     audits: Array[2],
      //     billing_address: 'Centrik',
      //     cgst: 10,
      //     cgst_amt: 6500,
      //     client: Object,
      //     client_gst_number: null,
      //     client_id: 1,
      //     client_name: 'Sahil',
      //     created_at: '2023-01-25T08:52:33.000000Z',
      //     deleted_at: null,
      //     due: 63700,
      //     due_date: '2023-01-25',
      //     expenses_details: null,
      //     igst: 10,
      //     igst_amt: 6500,
      //     invoices_date: '2023-01-25',
      //     invoice_date: '2023-01-25',
      //     invoice_number: 'testing-invoice/9',
      //     item_details: 'hello test',
      //     notes: 'Thank you for the business',
      //     pocket_expenses: null,
      //     proposal_id: 9,
      //     recieved: 1300,
      //     sgst: 10,
      //     sgst_amt: 6500,
      //     state_code: 0,
      //     sub_total: 91000,
      //     task_id: 21,
      //     taxable_amt: 65000,
      //     total_amt: 91000,
      //     updated_at: '2023-01-25T09:54:03.00000z',
      //     utgst: 10,
      //     utgst_amt: 6500,
      //   },
      //   {
      //     id: 1,
      //     adjustment_amt: 100,
      //     amount: 265000,
      //     audits: Array[2],
      //     billing_address: 'Centrik',
      //     cgst: 10,
      //     cgst_amt: 6500,
      //     client: Object,
      //     client_gst_number: null,
      //     client_id: 1,
      //     client_name: 'Sahil',
      //     created_at: '2023-01-25T08:52:33.000000Z',
      //     deleted_at: null,
      //     due: 63700,
      //     due_date: '2023-01-25',
      //     expenses_details: null,
      //     igst: 10,
      //     igst_amt: 6500,
      //     invoices_date: '2023-01-25',
      //     invoice_date: '2023-01-29',
      //     invoice_number: 'testing-invoice/9',
      //     item_details: 'hello test',
      //     notes: 'Thank you for the business',
      //     pocket_expenses: null,
      //     proposal_id: 9,
      //     recieved: 1300,
      //     sgst: 10,
      //     sgst_amt: 6500,
      //     state_code: 0,
      //     sub_total: 91000,
      //     task_id: 21,
      //     taxable_amt: 65000,
      //     total_amt: 91000,
      //     updated_at: '2023-01-25T09:54:03.00000z',
      //     utgst: 10,
      //     utgst_amt: 6500,
      //   },
      // ]
      // return data
    },
    invoicesItemsDetails() {
      let data = this.$store.state.invoice.allData;
      data.forEach((x) => {
        let amount = 0;
        this.$store.state.recordPayment.allData.forEach((y) => {
          if (y.record_pay_invoice.length > 0) {
            if (x.id === y.record_pay_invoice[0].invoice_id) {
              y.record_pay_invoice.forEach((z) => {
                amount = amount + z.paid_amount;
              });
            }
          }
        });
        x.recieved = amount;
        x.due = x.amount - x.recieved;
        x.client_name = x.client.name;
      });
      console.log(data, "dddddddddddd");
      return data;
    },
    // sahil
    paymentItems() {
      let data = this.$store.state.recordPayment.allData;
      let d1 = this.$store.state.invoice.allData;
      this.payment.payment = [];
      for (let index = 0; index < d1.length; index++) {
        // const element = array[index];
        this.payment.payment.push({
          id: index + 1,
          tds: 0,
          amount: 0,
          invoice_id: d1[index].id,
        });
        // this.payment.tds.push({id:index+1,amount:0});
      }
      console.log(this.$store.state.clients.all, "ccccccccccc");
      console.log(data, "record payment data");
      data.forEach((x) => {
        x.unused_amount = 0;
        let amount = 0;
        x.record_pay_invoice.forEach((y) => {
          amount = amount + y.paid_amount;
        });
        x.invoice_id = x.invoice.length > 0 ? x.invoice[0].id : null;
        x.amount = amount;
        let client = this.$store.state.clients.all.filter((z) => {
          return z.id === x.client_id;
        });
        x.client_name = client.length > 0 ? client[0].name : null;
        // if (x.amount > x.invoice[0].total_amt) {
        //   x.unused_amount = x.amount - x.invoice[0].total_amt;
        // }
        console.log("unsused amount ", x.unused_amount, x.amount, x);
      });
      console.log(data, "ppppp");
      return data;

      // const data = [
      //   {
      //     client_name: "Ajnara Balvedere Association",
      //     address: "Noida",
      //     amount: 5000,
      //     audits: [{}],
      //     branch_id: 1,
      //     client_id: 1,
      //     created_at: "2023-03-07t07:51:41.000000Z",
      //     deleted_at: null,
      //     id: 1,
      //     invoice: [
      //       {
      //         amount: 5000,
      //         id: 1,
      //         invoice_number: "1",
      //         pivot: {},
      //         total_amt: 5000,
      //       },
      //     ],
      //     notes: null,
      //     pay_date: "2023-03-07",
      //     payment_mode: "Cash",
      //     record_pay_invoice: [
      //       {
      //         created_at: "2023-03-07T07:51:41.000000Z",
      //         deleted_at: null,
      //         id: 1,
      //         invoice_id: "1",
      //         paid_amount: 5000,
      //         record_payment_id: 1,
      //         tds_deducted: 0,
      //         updated_at: "2023-03-07T07:51:41.000000Z",
      //       },
      //     ],
      //     reference_id: null,
      //     task_id: 1,
      //     title: "payment",
      //     updated_at: "2023-03-07T07:51:41.000000Z",
      //   },
      // ];
      // return data;
    },
    setPrivileges() {
      let priveleges = [];
      let data = this.previleges;
      if (this.$store.state.users.all.length > 0) {
        let roles = this.$store.state.users.all;
           let currUser = [JSON.parse(localStorage.getItem('userData'))]//.user_role_id

        let designations = this.$store.state.designation.all;

        let d2 = designations.filter((x) => {
          for (let i = 0; i < x.users.length; i++) {
            if (x.users[i].user_role_id === currUser[0].user_role_id) {
              return true;
            }
          }
          return false;
        });

        d2.forEach((x) => {
          x.privileges.forEach((y) => {
            priveleges.push(y);
          });
        });

        let arr = [];

        this.$store.state.status.all_master.forEach((x) => {
          if (x.name === "Accounts") {
            x.privileges.forEach((y) => {
              priveleges.forEach((z) => {
                if (y.id === z.privilege_id) {
                  arr.push({
                    name: y.name,
                    status: z.status,
                  });
                }
              });
            });
          }
        });

        // console.log(arr, "ppppppppppp");

        arr.forEach((x) => {
          console.log(x);
          if (x.name === "Estimates & Invoices") {
            if (x.status === "active") {
              data.invoice = true;
              data.expenses = true;
            }
          } else if (x.name === "Record Payment" || x.name === "Payments") {
            if (x.status === "active") {
              data.payment = true;
            }
          } else if (x.name === "Estimates & Invoices Creation and Edit") {
            if (x.status === "active") {
              data.invoice_create_edit = true;
            }
          } else if (x.name === "Payments Add & Edit") {
            if (x.status === "active") {
              data.payment_add_edit = true;
            }
          } else if (x.name === "Payments Delete") {
            if (x.status === "active") {
              data.payment_delete = true;
            }
          }
        });
      }
      console.log(data, "dddddddddd");
      return data;
    },
    attachmentLoading() {
      let data = this.$store.state.attachments.isLoading;
      return data;
    },
    showFilesTask() {
      if (this.$store.state.attachments.all.length > 0) {
        let data = this.$store.state.attachments.all;
        let filter = [];
        let num = 0;
        data.forEach((x) => {
          let split = x.attachment.split("/");
          x.name = split[split.length - 1];
          filter.push(x);
          num++;
        });
        this.taskNum = num;
        console.log(filter, "ffffffffffff");
        return filter;
      } else {
        let data = [];
        if (this.$router.currentRoute.name == "tasks") {
          data = this.$store.state.tasks.all.filter((e) => e.type === "task");
        } else {
          data = this.$store.state.leads.all.filter((e) => e.type === "lead");
        }
        let filter = [];
        let num = 0;
        data.forEach((x) => {
          if (x.id === this.taskId) {
            x.attachments.forEach((y) => {
              if (y.type === "task") {
                let split = y.attachment.split("/");
                y.name = split[split.length - 1];
                filter.push(y);
                num++;
              }
            });
          }
        });
        this.taskNum = num;
        console.log(filter, "ffffffffffff");
        return filter;
      }
    },
    showFilesClient() {
      if (this.$store.state.attachments.all.length > 0) {
        let data = this.$store.state.attachments.all;
        let filter = [];
        let num = 0;
        data.forEach((x) => {
          let split = x.attachment.split("/");
          x.name = split[split.length - 1];
          filter.push(x);
          num++;
        });
        this.clientNum = num;
        return filter;
      } else {
        let data = [];
        if (this.$router.currentRoute.name == "tasks") {
          data = this.$store.state.tasks.all.filter((e) => e.type === "task");
        } else {
          data = this.$store.state.leads.all.filter((e) => e.type === "lead");
        }
        let filter = [];
        let num = 0;
        data.forEach((x) => {
          if (x.id === this.taskId) {
            x.attachments.forEach((y) => {
              if (y.type === "company") {
                let split = y.attachment.split("/");
                y.name = split[split.length - 1];
                filter.push(y);
                num++;
              }
            });
          }
        });
        this.clientNum = num;
        console.log(filter.length, "lllllllllllllllll");
        return filter;
      }
    },
    fileLinks() {
      let data = this.$store.state.attachments.links;
      return data;
    },
    mail_comment() {
      // return this.threadedMail();
    },
    payment_modes() {
      return [
        { id: 1, name: "Cash" },
        { id: 2, name: "Cheque" },
        { id: 3, name: "Bank Transfer" },
      ];
    },
    allStates() {
      return this.$store.state.branches.states;
    },
    // sahil
    allProposals() {
      let payment = this.$store.state.recordPayment.all;
      let d1 = this.$store.state.invoice.all;
      this.payment.payment = [];
      for (let index = 0; index < d1.length; index++) {
        // const element = array[index];
        this.payment.payment.push({
          id: index + 1,
          tds: 0,
          amount: 0,
          invoice_id: d1[index].id,
        });
        // this.payment.tds.push({id:index+1,amount:0});
      }
      let d2 = this.$store.state.proposals.allProposals;
      let d3 = [];
      d1.forEach((element) => {
        element.title = "invoice";
        d3.push(element);
      });
      d2.forEach((element) => {
        element.title = "proposal";
        d3.push(element);
      });
      d1.forEach((e) => {
        payment.forEach((element) => {
          element.invoice.forEach((i) => {
            if (e.id === i.id && element.id === this.payment.edit_id) {
              this.paid_payment.push(e);
            }
          });
        });
      });
      payment.forEach((element) => {
        element.title = "payment";
        d3.push(element);
      });
      // let data = this.$store.state.proposals.allProposals;
      let data = d3;
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

      return data;
    },
    show_companys() {
      return this.$store.state.clients.all;
    },
    show_contactPerson() {
      return this.$store.state.contactPeople.allForLeads;
    },
    todo_status() {
      return this.$store.state.appTodo.isLoadingUpdate;
    },
    totalAmount() {
      this.pamount = +this.amountField[0].amount;
      if (this.amountField.length > 0) {
        for (let i = 1; i < this.amountField.length; i++) {
          this.pamount = this.pamount + +this.amountField[i].amount;
        }
      }
      return this.pamount;
    },
    filterLeads(val) {
      return this.items.filter((item) => {
        let keep = true;

        // This is a basic equality filter. What I did in the actual code was to have an object with filter functions for each key. If a key was missing, it defaulted to straight equality.
        this.fieldKeys.forEach((key) => {
          keep =
            keep &&
            (this.selectVal[key] === undefined ||
              item[key] === this.selectVal[key]);
        });

        return keep;
      });

      // return this.$store.state.leads.all.filter(e => e.type === 'lead').filter(item => {
      //   if(this.FilterPriority != null){

      //     item.priority === this.FilterPriority.id
      //   }
      // });
    },
    fieldKeys() {
      return Object.keys(this.items[0]);
    },

    isLoading() {
      this.todos = this.$store.state.appTodo.all;
      if (this.$router.currentRoute.name == "tasks") {
        return this.$store.state.tasks.isLoadingLeads;
      } else {
        return this.$store.state.leads.isLoadingLeads;
      }
    },
    successMessage() {
      return this.$store.state.leads.successMessage;
    },
    errorMessage() {
      return this.$store.state.leads.errorMessage;
    },
    errors() {
      return this.$store.state.leads.errors.branch_id
        ? this.$store.state.leads.errors.branch_id[0]
        : "";
    },
    totalCount() {
      return this.$store.state.leads.all.filter((e) => e.type === "lead")
        .length;
    },
    items() {
      var items = [];
      if (this.$router.currentRoute.name == "tasks") {
        items = this.$store.state.tasks.all.filter((e) => e.type === "task");
      } else {
        items = this.$store.state.leads.all.filter((e) => e.type === "lead");
      }
      // var users= items.map(item => item.users.length > 0 ? item : null)
      // var users= items.map(item => item.users.length > 0 ?? item.id)
      // items.splice(users)
      var element = [];
      var element2 = "";
      for (let index = 0; index < items.length; index++) {
        element[index] = items[index];

        if (
          (items[index].users.length === 0 && this.filterUsers != null) ||
          (items[index].status_master == null && this.filterStatus != null)
        ) {
          // if(this.filterUsers != null){
          element.splice(element.indexOf(element[index]), 1);

          // }
          // if(this.filterUsers == null){
          //   element[index] = items[index]
          // }
        }
      }

      return element.sort(
        (a, b) => new Date(b.updated_at) - new Date(a.updated_at)
      );
      // return element;

      return items;
    },
    companys() {
      // return this.$store.state.clients.all
      var data = [];
      for (
        let index = 0;
        index < this.$store.state.clients.all.length;
        index++
      ) {
        data[index] = this.$store.state.clients.all[index].name;
      }

      // return data;
      return data.filter((country) =>
        country.toLocaleLowerCase().includes(this.search.toLocaleLowerCase())
      );
    },
    paginated_companys() {
      return this.companys.slice(this.offset, this.limit + this.offset);
    },
    companys_hasNextPage() {
      const nextOffset = this.offset + this.limit;
      return Boolean(
        this.companys.slice(nextOffset, this.limit + nextOffset).length
      );
    },
    companys_hasPrevPage() {
      const prevOffset = this.offset - this.limit;
      return Boolean(
        this.companys.slice(prevOffset, this.limit + prevOffset).length
      );
    },
    category() {
      // return this.$store.state.categories.all
      var data = [];
      for (
        let index = 0;
        index < this.$store.state.categories.all.length;
        index++
      ) {
        data[index] = this.$store.state.categories.all[index].name;
      }

      // return data;
      return data.filter((country) =>
        country.toLocaleLowerCase().includes(this.search.toLocaleLowerCase())
      );
    },
  },
  methods: {
    resetFormInvoice() {
      this.invoiceFormData = {
        client: null,
        branch: null,
        task: null,
      };
    },

    resetFormProposals() {
      this.proposalFormData = {
        client: null,
        branch: null,
        task: null,
      };
    },

    resetPaymentSectionModalDetails() {
      console.log("inside the reset ");
      this.payment.payment.map((item) => (item.amount = 0));
      this.payment.amount = 0;
      this.payment.client = null;
      this.payment.mode = null;
      this.payment.branch = null;
    },
    fun(index) {
      return this.paymentTotalArray[index];
    },
    editTds(index) {
      const updated = this.paymentTotalArray;
      this.paymentTotalArray[index] = 0;
      this.paymentTotalArray[index] = updated[index];
    },
    prefillInvoice() {
      this.invoiceFormData.client = this.invoiceFormData.task.company.name;
      this.invoiceFormData.branch = this.invoiceFormData.task.branch.name;
    },

    prefillProposal() {
      this.proposalFormData.client = this.proposalFormData.task.company.name;
      this.proposalFormData.branch = this.proposalFormData.task.branch.name;
    },

    checkGreaterAmount(index) {
      console.log(
        "calling............ ",
        this.getTotalAmtPayment,
        this.payment.amount
      );

      if (this.getTotalAmtPayment > this.payment.amount) {
        let totalAmountTemp = this.getTotalAmtPayment;
        console.log(
          "call cancel",
          this.paymentTotalArray[index],
          totalAmountTemp
        );
        totalAmountTemp = totalAmountTemp - this.paymentTotalArray[index];
        console.log("call cancel", totalAmountTemp);

        this.paymentTotalArray[index] = this.payment.amount - totalAmountTemp;
        console.log(
          "paymentTotalarray",
          this.paymentTotalArray[index],
          totalAmountTemp
        );
      }
    },
    excessPaymentAmount() {
      return (
        this.payment.amount - this.getTotalAmtPayment - this.getTotalTdsAmt
      );
    },
    putValuePaymentTotalArray() {
      console.log("calling............ ");
      this.paymentInvoiceArray = this.filteredInvoiceClient.map((item) => {
        this.paymentInvoice.invoice_id = item.id;
        this.paymentInvoice.task_id = item.task_id;
        this.paymentInvoice.paid_amount = this.payment.amount;
        return this.paymentInvoice;
      });
      this.payment.payment.map((item) => {
        return (item.amount = 0);
      });
      this.paymentTotalArray = this.filteredInvoiceClient.map((item) => {
        return 0;
      });
      this.greaterAmount = this.paymentTotalArray.map((item) => {
        return false;
      });
      this.tds_deductedArray = this.filteredInvoiceClient.map((item) => {
        return 0;
      });
      // this.paymentTotalArray[1] = 100;
      // this.paymentTotalAmount = 100;
      console.log(this.paymentTotalArray);
    },

    file_upload() {
      console.log("hloo2:file_upload");
      document.getElementById("fileUpload2").click();
      //  this.uploadFileS3(this.file_name2)
      // const image = e.target.files[0];
      // const reader = new FileReader();
      // var base = reader.readAsDataURL(image)
      // console.log(base);
      // console.log(e);
    },
    async onFileChange2(e) {
      // alert('hh');
      console.log("hllo1 : onfileChange2");

      let image = e.target.files;
      let image_name = [];
      const filePathsPromises = [];
      image.forEach((file) => {
        filePathsPromises.push(this.base64(file));
        image_name.push(file.name);
        // filePathsPromises.push(file.name)
      });
      const filePaths = await Promise.all(filePathsPromises, image_name);
      const mappedFiles = filePaths.map((base64File, image_name) => ({
        file: base64File,
        name: image[image_name].name,
      }));
      let tempFile = mappedFiles;

      tempFile.forEach((obj2) => {
        const exists = this.file_name2.some((obj1) => obj1.name === obj2.name);
        if (!exists) {
          console.log("not duplicate");
          this.file_name2.push(obj2);
        }
      });
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
      this.uploadFileS3(this.file_name2);
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
        reader.onerror = (error) => reject(error);
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
    removeFileS3(url, index) {
      console.log("url of attachment", url);
      var data = {
        attach_url: url ?? "null",
      };
      this.$store.state.tasks.s3_url.splice(
        this.$store.state.tasks.s3_url[index],
        1
      );
      this.$store
        .dispatch("tasks/remove_file_s3", { data: data })
        .then(() => {
          console.log(this.$store.state.tasks.s3_url);
          console.log("removed");
          // if(this.$store.state.tasks.s3_url.includes(filename)){
          //   this.$store.state.tasks.s3_url.splice(this.$store.state.tasks.s3_url[this.$store.state.tasks.s3_url.findIndex(e => e.fileName.includes(filename))],1)
          // }
        })
        .catch(() => {
          console.log("error");
        });
    },
    uploadFileS3(file) {
      // document.getElementById('fileUpload2').click()
      console.log("filelength:", file.length);
      console.log("file:", file);
      var data = {
        attach: file ? file : "null",
      };
      this.$store.dispatch("tasks/upload_file_s3", { data: data });
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

    sendEmail(data2, file_name2) {
      data2.subject = this.$store.state.leads.all.filter(
        (e) => e.id === this.taskId
      )[0].subject;
      console.log("sending emails...");
      console.log(data2, "data2");
      var bcc_email = [];
      var cc_email = [];

      var s3_url = null;
      var s3_urls = [];
      if (this.$store.state.tasks.s3_url.length > 0) {
        s3_url = this.$store.state.tasks.s3_url;
      }
      if (s3_url != null) {
        for (let index = 0; index < s3_url.length; index++) {
          s3_urls[index] = s3_url[index].url;
        }
      }
      if (!data2.from || !data2.message || !data2.to || !data2.subject) {
        return;
      } else {
        this.$refs["reply-modal"].hide();
      }
      if (data2.bcc) {
        data2.bcc.forEach(function (email, index) {
          // console.log(email.email);
          bcc_email[index] = email.email;
        });
      }
      if (data2.cc) {
        data2.cc.forEach(function (email, index) {
          // console.log(email.email);
          cc_email[index] = email.email;
        });
      }
      var data = {};
      if (data2.bcc || data2.cc) {
        data = {
          to: data2.to,
          bcc: data2.bcc,
          cc: data2.cc,
          attach_url: s3_urls,
          message: data2.message,
          plain_text: data2.message.replace(/(<([^>]+)>)/gi, ""),
          subject: data2.subject
            ? data2.subject
            : this.$store.state.leads.all.filter((e) => e.id === this.taskId)[0]
                .subject,
          from: data2.from,
        };
      } else {
        data = {
          to: data2.to,
          // "bcc" : bcc_email,
          // "cc" : cc_email,
          attach_url: s3_urls,
          plain_text: data2.message.replace(/(<([^>]+)>)/gi, ""),
          message: data2.message,
          subject: data2.subject
            ? data2.subject
            : this.$store.state.leads.all.filter((e) => e.id === this.taskId)[0]
                .subject,
          from: data2.from,
        };
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
      });
      console.log(data);
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
          });
        }
        // this.$refs['compose-modal'].hide()
        this.composeData.to = "";
        this.composeData.from = "";
        this.composeData.cc = "";
        this.composeData.bcc = "";
        this.composeData.subject = "";
        this.composeData.message = "";
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
      });
    },
    handleSubmitCreatePayment() {
      var invoice_tds = [];
      // for (let index = 0; index < this.payment.payment.length; index++) {
      //   // const element = array[index];
      //   if (this.payment.payment[index].amount != 0) {
      //     invoice_tds.push({
      //       invoice_id: this.payment.payment[index].invoice_id,
      //       tds_deducted: this.payment.payment[index].tds,
      //       paid_amount: this.payment.payment[index].amount,
      //     });
      //   }
      // }
      console.log(invoice_tds);

      var branch_id = 0;
      this.$store.state.branches.all.forEach((element) => {
        if (element.name == this.payment.branch) {
          branch_id = element.id;
        }
      });
      const data = {
        // task_id: this.taskId,
        client_id: this.payment.client.id,
        branch_id: branch_id,
        pay_date: this.payment.date,
        payment_mode: this.payment.mode.name,
        amount: this.payment.amount,
        reference_id: this.payment.reference_id,
        notes: this.payment.notes,
        invoice: this.paymentInvoiceArray,
      };
      console.log(data);
      this.$store.dispatch("recordPayment/store", data).then(() => {
        this.$refs["PaymentSectionModal"].hide();
        this.$store.dispatch("recordPayment/fetch");
      });
    },

    handleSubmitCreateInvoice() {
      const invoicesAllData = this.$store.state.invoice.allData;
      this.lastInvoiceId = invoicesAllData[invoicesAllData.length - 1].id;
      console.log(this.invoiceFormData, "invoice form data");
      const currentDate = new Date().toISOString().slice(0, 10);
      // proposalForInvoice[0].task_id;
      //proposalForInvoice.[proposalForInvoice.length-1]
      let proposalForInvoice = this.$store.state.proposals.allProposals;
      const filteredProposalForInvoice = proposalForInvoice.filter(
        (proposal) => {
          return proposal.task_id === this.invoiceFormData.task.id;
        }
      );
      proposalForInvoice = filteredProposalForInvoice;
      console.log("this is proposalForInvoice", proposalForInvoice);
      let proposalFind = proposalForInvoice[proposalForInvoice.length - 1];

      console.log(proposalFind, "finding");
      const data = {
        proposal_id: proposalFind.id,
        client_id: this.invoiceFormData.task.company.id,
        task_id: this.invoiceFormData.task.id,
        client_gst_number: "",
        state_code: 7,
        invoice_number: this.invoice.prefix + (this.lastInvoiceId + 1),
        invoice_date: "2023-01-06",
        due_date: currentDate,
        billing_address: this.invoiceFormData.branch,
        notes: "This invoice generate against proposal number 01",
        item_details: "Legal purposes",
        amount: 0,
        discount: 0,
        taxable_amt: 0,
        igst: 0,
        igst_amt: 0,
        sgst: 9,
        sgst_amt: 0,
        cgst: 5,
        cgst_amt: 0,
        utgst: 5,
        utgst_amt: 0,
        sub_total: 0,
        pocket_expenses: 0,
        expenses_details: "This is the personal expenses",
        adjustment_amt: 0,
        total_amt: 0,
      };
      this.$store.dispatch("invoice/store", data).then(() => {
        this.$refs["InvoiceSectionModal"].hide();
        this.$store.dispatch("invoice/fetch");
        this.resetFormInvoice();
      });
    },

    handleSubmitCreateProposal() {
      console.log(this.proposalFormData, "proposal form data");
      const data = {
        task_id: this.proposalFormData.task.id,
        proposal_date: this.proposalFormData.task.due_date,
        client_name: this.proposalFormData.client,
        concerned_person: this.proposalFormData.task.contact_person.name,
        address: this.proposalFormData.task.branch.name,
        subject: this.proposalFormData.task.subject,
        prephase: "As per discussion, please find below the brief proposal",
        footer_title: "Thanking you",
        footer_description: this.proposalFormData.task.description,
        footer_description: this.proposalFormData.task.description
          ? this.proposalFormData.task.description
          : "Thanking you",
        internal_notes: "Thanking you",
        proposalSection: [],
        proposalFees: [
          {
            description: this.proposalFormData.task.subject,
            amount: 0,
          },
        ],
      };
      this.$store.dispatch("proposals/create", data).then(() => {
        this.$refs["Modal-proposal"].hide();
        this.$store.dispatch("proposals/getAll");
        this.resetFormProposals();
      });
    },
    onTaskSelect(task) {
      this.selectedTask = task;
    },

    showitem(i) {
      console.log(i, "show item");
    },
    onTabChange(tab) {
      console.log(this.active, "this is active tab");
      if (this.activeTab == 2) {
        //modal
        this.showPaymentModal = true;
        this.showInvoicesModal = false;
        this.showProposalModal = false;
        this.showExpensesModal = false;

        // filter
        this.filterProposalModal = false;
        this.filterPaymentModal = false;
        this.filterInvoicesModal = false;
      } else if (this.activeTab === 1) {
        this.showExpensesModal = false;

        //modal
        this.showInvoicesModal = true;
        this.showPaymentModal = false;
        this.showProposalModal = false;

        //filter
        this.filterProposalModal = false;
        this.filterPaymentModal = false;
        this.filterInvoicesModal = false;
      } else if (this.activeTab === 3) {
        this.showProposalModal = false;
        this.showInvoicesModal = false;
        this.showPaymentModal = false;
        this.showExpensesModal = true;

        //filter
        this.filterProposalModal = false;
        this.filterPaymentModal = false;
        this.filterInvoicesModal = false;
      } else if (this.activeTab === 0) {
        this.showExpensesModal = false;

        //modal
        this.showProposalModal = true;
        this.showInvoicesModal = false;
        this.showPaymentModal = false;

        //filter
        this.filterProposalModal = false;
        this.filterPaymentModal = false;
        this.filterInvoicesModal = false;
      }
    },
    showCreateProposalModal() {
      this.CreateProposalModal = true;
    },
    showCreatePaymentModal() {
      this.CreatePaymentModal = true;
    },
    showCreateInvoicesModal() {
      this.CreateInvoicesModal = true;
    },
    showFilterInvoicesModal() {
      this.filterInvoicesModal = !this.filterInvoicesModal;
      this.filterProposalModal = false;
      this.filterPaymentModal = false;
    },
    showFilterPaymentModal() {
      this.filterPaymentModal = !this.filterPaymentModal;
      this.filterInvoicesModal = false;
      this.filterProposalModal = false;
    },
    showFilterProposalModal() {
      this.filterProposalModal = !this.filterProposalModal;
      this.filterPaymentModal = false;
      this.filterInvoicesModal = false;
    },
    convert(str) {
      var ones = [
        "",
        "one",
        "two",
        "three",
        "four",
        "five",
        "six",
        "seven",
        "eight",
        "nine",
      ];

      var tens = [""];

      tens[1] = [
        "ten",
        "eleven",
        "twelve",
        "thirteen",
        "fourteen",
        "fifteen",
        "sixteen",
        "seventeen",
        "eighteen",
        "nineteen",
      ];

      tens = tens.concat([
        "twenty",
        "thirty",
        "forty",
        "fifty",
        "sixty",
        "seventy",
        "eighty",
        "ninety",
      ]);

      var getHundreds = function (value) {
        return value > 0 ? ones[value] + " hundred" : "";
      };

      var getTens = function (value, next, words, index, pos) {
        if (value == 1) {
          words.push(tens[1][next]);

          if (pos == 5) {
            words.push(" thousand");
          }
          if (pos == 8) {
            words.push(" million");
          }
          return index + 1;
        }

        words.push(tens[value]);
        return index;
      };

      var num, pos;
      var words = [];

      for (var i = 0; i < str.length; i++) {
        // if(window.CP.shouldStopExecution(1)){break;}
        //to stop infinite loop

        num = str[i];
        pos = str.length - i;

        switch (pos) {
          //millions
          case 7:
            words.push(ones[num] + " million");
            break;
          // For Thousands
          case 4:
            words.push(ones[num] + " thousand");
            break;
          // For Hundreds
          case 9:
          case 6:
          case 3:
            words.push(getHundreds(num));
            break;
          // For Tens and Teens
          case 8:
          case 5:
          case 2:
            i = getTens(num, str[i + 1], words, i, pos);
            break;
          case 1:
            words.push(ones[num]);
            break;
        }
      }
      return words.join(" ");
    },

    async exportToPDF(i) {
      // console.log(urlBase64);
      this.loader_proposal = true;
      setTimeout(() => {
        this.loader_proposal = false;
      }, 2000);
      // console.log(urlb);
      // var iframe = document.createElement('iframe');
      // iframe.srcdoc= document.getElementById('pdfContent').innerHTML
      let pdfContent = "";
      // lo
      // pdfContent += '<img crossorigin="*" src="' + im  gLogo + '" width="100" ><hr/><br>';
      // pdfContent += "<div><div><header><img src='https://via.placeholder.com/150' />header</header></div><div>Body</div><div><footer>footer</footer></div></div>"
      // pdfContent = document.querySelector('#pdfContent')
      pdfContent += document.getElementById("pdfContent").innerHTML;
      // pdfContent += "<h3> End of test </h3>";
      // html2pdf(pdfContent, {
      //   margin: 1,
      //   filename: "document.pdf",
      //   image: { type: "jpeg", quality: 0.98 },
      //   html2canvas: { dpi: 192, letterRendering: true },
      //   jsPDF: { unit: "in", format: "letter", orientation: "landscape" },
      // });

      // console.log(document.getElementById('pdfContent').innerHTML);
      // var doc = new jspdf()
      // doc.addPage(document.getElementById('pdfContent'))
      //  var canvasElement = document.createElement('canvas');
      //     html2canvas(document.getElementById('pdfContent'), { canvas: canvasElement }).then(function (canvas) {
      //       // const img = canvas.toDataURL("image/jpeg", 0.8);
      //       // doc.addImage(img,'JPEG',20,20);
      //       // doc.save("sample.pdf");
      //       const img = canvas.toDataURL("image/jpeg", 0.8);
      //       doc.addImage(img,'JPEG',20,20);
      //       doc.save("sample.pdf");
      //       // window.open(doc.output('bloburl'))
      //     });
      // var total = doc.internal.getNumberOfPages();
      //       for (let index = 0; index < total.length; index++) {
      //         doc.setPage(i)
      //         doc.setFontSize(12)
      //         doc.text('page',10,10)

      //       }

      // pdfDoc.text("<div>hello</div>")
      // html2canvas(options.component)

      // margin: [20, 10, 20, 10],
      //   filename: 'document.pdf',
      //   image: { type: 'jpeg', quality: 0.98 },
      //   html2canvas: { dpi: 192, letterRendering: true },
      //   jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },

      // margin: 0.5,
      //   filename: 'time_sheet_report.pdf',
      //   // image: { type: 'png', quality: 0.20 },
      //   html2canvas: { scale: 2 },
      //   jsPDF: { unit: 'in', format: 'letter', orientation: 'p' },
      //   pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
      var v = this;
      // this.loader_proposal = true
      html2pdf()
        .from(pdfContent)
        .set({
          margin: [2.2, 0.5, 0.8, 1],

          filename: "document.pdf",
          image: { type: "jpeg", quality: 0.98 },
          html2canvas: { scale: 2 },
          // html2canvas: { dpi: 192, letterRendering: true },
          jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
          pagebreak: { mode: ["avoid-all", "css", "legacy"] },

          // pagebreak: { before: '.page-break' }

          // before: function(pdf) {
          //   pdf.setFontSize(10)
          //   pdf.text(75, 285, 'Footer content goes here')
          // }
        })
        .outputPdf()
        .get("pdf")
        .then(function (pdf) {
          // v.loader_proposal = false
          const totalPages = pdf.internal.getNumberOfPages();
          for (let i = 1; i <= totalPages; i++) {
            pdf.setPage(i);
            // pdf.
            // pdf.writeHTML("<hr>", true, false, false, false, '');

            pdf.setFontSize(10);
            pdf.setTextColor(50);
            pdf.setLineCap(0);
            // pdf.line(0,pdf.internal.pageSize.getHeight() - 1.4, 315 , 8);
            // pdf.fromHTML('<div>hello</div>',1,0)
            // pdf.from('<div>hello</div>')
            // pdf.line(0,pdf.internal.pageSize.getHeight() - 9, 315,8);
            pdf.addImage(imgLogo, 0.5, 0);
            // pdf.text(
            //    'Page ' + i + ' of ' + totalPages,
            //     (pdf.internal.pageSize.getWidth() * 0.88),
            //     (pdf.internal.pageSize.getHeight() - 0.3)
            // )

            // pdf.text('This is the header text', (pdf.internal.pageSize.getWidth() / 2.40), (pdf.internal.pageSize.getHeight() - 10));
            pdf.text(
              "For all expertise solutions and knowledge,",
              pdf.internal.pageSize.getWidth() / 16,
              pdf.internal.pageSize.getHeight() - 0.8
            );
            pdf.text(
              "Reach at us - Email -",
              pdf.internal.pageSize.getWidth() / 16,
              pdf.internal.pageSize.getHeight() - 0.5
            );

            // pdf.text('Footer content goes here',75, 285)
          }
          // pdf.text('my header', 10, 10)
          //           var totalPages = pdf.internal.getNumberOfPages();

          // for (i = 1; i <= totalPages; i++) {
          //   pdf.setPage(i);
          //   pdf.setFontSize(10);
          //   pdf.setTextColor(150);
          //   pdf.text('Page ' + i + ' of ' + totalPages, pdf.internal.pageSize.getWidth() - 100, pdf.internal.pageSize.getHeight() - 30);
          // }
          // pdf.addImage(imgLogo, 'PNG', 0, pdf.internal.pageSize.height - 20, 600, 20)

          window.open(pdf.output("bloburl"), "F");
          // this.loader_proposal = false
        });
      // pdfDoc.html(document.getElementById('pdfContent'), {
      // callback: function () {
      //     window.open(pdfDoc.output('bloburl'));
      // }
      // });
      // }).then(() =>{
      // window.open(pdfDoc.output('bloburl'));

      // exportDataGrid(options).then(() => {

      // })
    },
    async exportToPDFInvoice(i) {
      this.loader_invoice = true;
      setTimeout(() => {
        this.loader_invoice = false;
      }, 2000);
      // const toDataUrl = await function (url, callback) {
      //   //Convert to base64
      //   return new Promise((resolve, reject) => {
      //     var xhr = new XMLHttpRequest();
      //     xhr.onload = function () {
      //       var reader = new FileReader();
      //       reader.onloadend = function () {
      //         resolve(reader.result);
      //       };
      //       reader.readAsDataURL(xhr.response);
      //     };
      //     xhr.onerror = () => {
      //       reject({
      //         status: this.status,
      //         statusText: xhr.statusText,
      //       });
      //     };
      //     xhr.open("GET", url);
      //     xhr.responseType = "blob";
      //     xhr.send();
      //   });
      // };

      // // var pdfContent = "<div style='margin-left:2rem;'><img style='width:50%' src='"+ toDataUrl(logo) +"'/><p class='font-weight-bolder'>"+this.userData.tenant.organization.name+"</p><p class='my-3 font-weight-bolder'>"+i.item.proposal_date +"</p><p class='mb-2'>" + i.item.client_name  +",</p></div>";
      // const getBase64FromUrl = async (url) => {
      //   const data = await fetch(url);
      //   const blob = await data.blob()
      //   return new Promise((resolve) => {
      //     const reader = new FileReader();

      //     reader.readAsDataURL(blob);
      //     reader.onloadend = () => {
      //       const base64data = reader.result;
      //       this.base64data = base64data
      //       resolve(base64data);
      //     }
      //   });

      // }

      // let imagesUrls = [

      //   "https://jmi-aero.com/media/cxmmngdb/centrik-logo-final.jpg",
      //   // "https://img-19.commentcamarche.net/cI8qqj-finfDcmx6jMK6Vr-krEw=/1500x/smart/b829396acc244fd484c5ddcdcb2b08f3/ccmcms-commentcamarche/20494859.jpg",
      // ];
      let pdfContent = "";
      // fetch('https://img-19.commentcamarche.net/cI8qqj-finfDcmx6jMK6Vr-krEw=/1500x/smart/b829396acc244fd484c5ddcdcb2b08f3/ccmcms-commentcamarche/20494859.jpg')
      //   //                         vvvv
      //   .then(response => response.blob())
      //   .then(imageBlob => {
      //     // Then create a local URL for that image and print it
      //     const imageObjectURL = URL.createObjectURL(imageBlob);
      //     console.log(imageObjectURL);
      //   });

      // let urlBase64 = await getBase64FromUrl('https://img-19.commentcamarche.net/cI8qqj-finfDcmx6jMK6Vr-krEw=/1500x/smart/b829396acc244fd484c5ddcdcb2b08f3/ccmcms-commentcamarche/20494859.jpg');
      // console.log(urlBase64);
      // console.log(urlb);

      // dco
      // // lo
      // var iframe = document.createElement('iframe');
      // 	iframe.setAttribute('style', 'position:absolute;top:0;right:0;height:100%; width:600px');
      // 	document.body.appendChild(iframe);
      //   iframe.src= '<img crossorigin="*" src="' + urlBase64 + '" width="100" ><hr/><br>'
      // iframe.src = pdf.output('datauristring');
      document.getElementById("InvoicepdfContent2").style.fontSize = "12px";
      // pdfContent += '<img crossorigin="*" src="' + urlBase64 + '" width="100" ><hr/><br>';
      pdfContent += document.getElementById("InvoicepdfContent2").innerHTML;

      // pdfContent += "<h3> End of test </h3>";
      // html2pdf(pdfContent, {
      //   margin: 1,
      //   filename: "document.pdf",
      //   image: { type: "jpeg", quality: 0.98 },
      //   html2canvas: { dpi: 192, letterRendering: true },
      //   jsPDF: { unit: "in", format: "letter", orientation: "landscape" },
      // });

      console.log(document.getElementById("InvoicepdfContent2").innerHTML);
      // var doc = new jspdf()
      // doc.addPage(document.getElementById('pdfContent'))
      //  var canvasElement = document.createElement('canvas');
      //     html2canvas(document.getElementById('pdfContent'), { canvas: canvasElement }).then(function (canvas) {
      //       // const img = canvas.toDataURL("image/jpeg", 0.8);
      //       // doc.addImage(img,'JPEG',20,20);
      //       // doc.save("sample.pdf");
      //       const img = canvas.toDataURL("image/jpeg", 0.8);
      //       doc.addImage(img,'JPEG',20,20);
      //       doc.save("sample.pdf");
      //       // window.open(doc.output('bloburl'))
      //     });
      // var total = doc.internal.getNumberOfPages();
      //       for (let index = 0; index < total.length; index++) {
      //         doc.setPage(i)
      //         doc.setFontSize(12)
      //         doc.text('page',10,10)

      //       }

      // pdfDoc.text("<div>hello</div>")
      // html2canvas(options.component)
      html2pdf()
        .from(pdfContent)
        .set({
          margin: 0.5,
          filename: "document.pdf",
          image: { type: "jpeg", quality: 0.98 },
          html2canvas: { scale: 2 },
          // html2canvas: { dpi: 192, letterRendering: true },
          jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
          pagebreak: { mode: ["avoid-all", "css", "legacy"] },
          // before: function(pdf) {
          //   pdf.setFontSize(10)
          //   pdf.text(75, 285, 'Footer content goes here')
          // }
        })
        // .header(() => {
        //   return `<h1>Header</h1>`
        // }).footer(() => {
        //   return `<p>Footer</p>`
        // })
        .outputPdf()
        .get("pdf")
        .then(function (pdf) {
          // pdf.text('my header', 10, 10)
          //           var totalPages = pdf.internal.getNumberOfPages();

          // for (i = 1; i <= totalPages; i++) {
          //   pdf.setPage(i);
          //   pdf.setFontSize(10);
          //   pdf.setTextColor(150);
          //   pdf.text('Page ' + i + ' of ' + totalPages, pdf.internal.pageSize.getWidth() - 100, pdf.internal.pageSize.getHeight() - 30);
          // }
          // pdf.addImage(imgLogo, 'PNG', 0, pdf.internal.pageSize.height - 20, 600, 20)

          window.open(pdf.output("bloburl"), "F");
        });

      // pdfDoc.html(document.getElementById('pdfContent'), {
      // callback: function () {
      //     window.open(pdfDoc.output('bloburl'));
      // }
      // });
      // }).then(() =>{
      // window.open(pdfDoc.output('bloburl'));

      // exportDataGrid(options).then(() => {

      // })
    },
    async exportToPDFPayment(i) {
      this.loader_payment = true;
      setTimeout(() => {
        this.loader_payment = false;
      }, 2000);
      // const toDataUrl = await function (url, callback) {
      //   //Convert to base64
      //   return new Promise((resolve, reject) => {
      //     var xhr = new XMLHttpRequest();
      //     xhr.onload = function () {
      //       var reader = new FileReader();
      //       reader.onloadend = function () {
      //         resolve(reader.result);
      //       };
      //       reader.readAsDataURL(xhr.response);
      //     };
      //     xhr.onerror = () => {
      //       reject({
      //         status: this.status,
      //         statusText: xhr.statusText,
      //       });
      //     };
      //     xhr.open("GET", url);
      //     xhr.responseType = "blob";
      //     xhr.send();
      //   });
      // };

      // // var pdfContent = "<div style='margin-left:2rem;'><img style='width:50%' src='"+ toDataUrl(logo) +"'/><p class='font-weight-bolder'>"+this.userData.tenant.organization.name+"</p><p class='my-3 font-weight-bolder'>"+i.item.proposal_date +"</p><p class='mb-2'>" + i.item.client_name  +",</p></div>";
      // const getBase64FromUrl = async (url) => {
      //   const data = await fetch(url);
      //   const blob = await data.blob()
      //   return new Promise((resolve) => {
      //     const reader = new FileReader();

      //     reader.readAsDataURL(blob);
      //     reader.onloadend = () => {
      //       const base64data = reader.result;
      //       this.base64data = base64data
      //       resolve(base64data);
      //     }
      //   });

      // }

      // <p class="mb-2">{{ i.item.address }}</p>
      // <p class="mb-2 font-weight-bolder">Subject: {{ i.item.subject }}</p>
      // <p class="mb-2">{{ i.item.prephase }}</p>
      // <p class="mb-2">Dear {{ i.item.concerned_person }}</p>
      // <div v-for="(proposal, index) in i.item.proposal_section" :key="proposal.id">
      //   <p class="mb-2 font-weight-bolder">{{proposal.title}}</p>
      //   <p class="mb-3" v-html="proposal.description"></p>
      // </div>
      // <p class="font-weight-bolder">Fee Details</p>
      // <table class="mb-3">
      //   <thead>
      //     <th>SI No</th>
      //     <th>Description</th>
      //     <th>Amount</th>
      //   </thead>
      //   <tbody>
      //     <tr v-for="(amount, index) in i.item.proposal_fees" :key="amount.id">
      //       <td>{{ index+1 }}</td>
      //       <td>{{ amount.description }}</td>
      //       <td>{{ amount.amount }}</td>

      //     </tr>
      //     <tr v-if="i.item.proposal_fees.length > 1">
      //       <td style="font-weight: bolder;">total (<font-awesome-icon  icon="indian-rupee-sign" class="icon cursor-pointer"   />)

      //       </td>
      //       <td> </td>
      //       <td>

      //        {{getTotalAmt(i.item.proposal_fees)}}
      //       </td>
      //     </tr>
      //   </tbody>
      // </table>
      // <p class="font-weight-bolder">{{ i.item.footer_title }}</p>
      // <p v-html="i.item.footer_description"></p>"
      // pdfContent += '</div>'
      // html2pdf('<div>hello</div>', {
      //   margin:1,
      //   filename:"html.pdf"
      // })
      // let imagesUrls = [

      //   "https://jmi-aero.com/media/cxmmngdb/centrik-logo-final.jpg",
      //   // "https://img-19.commentcamarche.net/cI8qqj-finfDcmx6jMK6Vr-krEw=/1500x/smart/b829396acc244fd484c5ddcdcb2b08f3/ccmcms-commentcamarche/20494859.jpg",
      // ];
      let pdfContent = "";
      // fetch('https://img-19.commentcamarche.net/cI8qqj-finfDcmx6jMK6Vr-krEw=/1500x/smart/b829396acc244fd484c5ddcdcb2b08f3/ccmcms-commentcamarche/20494859.jpg')
      //   //                         vvvv
      //   .then(response => response.blob())
      //   .then(imageBlob => {
      //     // Then create a local URL for that image and print it
      //     const imageObjectURL = URL.createObjectURL(imageBlob);
      //     console.log(imageObjectURL);
      //   });

      // let urlBase64 = await getBase64FromUrl('https://img-19.commentcamarche.net/cI8qqj-finfDcmx6jMK6Vr-krEw=/1500x/smart/b829396acc244fd484c5ddcdcb2b08f3/ccmcms-commentcamarche/20494859.jpg');
      // console.log(urlBase64);
      // console.log(urlb);

      // dco
      // lo
      document.getElementById("PaymentpdfContent").style.fontSize = "12px";
      // pdfContent += '<img crossorigin="*" src="' + urlBase64 + '" width="100" ><hr/><br>';
      pdfContent += document.getElementById("PaymentpdfContent").innerHTML;

      // pdfContent += "<h3> End of test </h3>";
      // html2pdf(pdfContent, {
      //   margin: 1,
      //   filename: "document.pdf",
      //   image: { type: "jpeg", quality: 0.98 },
      //   html2canvas: { dpi: 192, letterRendering: true },
      //   jsPDF: { unit: "in", format: "letter", orientation: "landscape" },
      // });

      console.log(document.getElementById("PaymentpdfContent").innerHTML);
      // var doc = new jspdf()
      // doc.addPage(document.getElementById('pdfContent'))
      //  var canvasElement = document.createElement('canvas');
      //     html2canvas(document.getElementById('pdfContent'), { canvas: canvasElement }).then(function (canvas) {
      //       // const img = canvas.toDataURL("image/jpeg", 0.8);
      //       // doc.addImage(img,'JPEG',20,20);
      //       // doc.save("sample.pdf");
      //       const img = canvas.toDataURL("image/jpeg", 0.8);
      //       doc.addImage(img,'JPEG',20,20);
      //       doc.save("sample.pdf");
      //       // window.open(doc.output('bloburl'))
      //     });
      // var total = doc.internal.getNumberOfPages();
      //       for (let index = 0; index < total.length; index++) {
      //         doc.setPage(i)
      //         doc.setFontSize(12)
      //         doc.text('page',10,10)

      //       }

      // pdfDoc.text("<div>hello</div>")
      // html2canvas(options.component)
      html2pdf()
        .from(pdfContent)
        .set({
          margin: 0.5,
          filename: "document.pdf",
          image: { type: "jpeg", quality: 0.98 },
          html2canvas: { scale: 2 },
          // html2canvas: { dpi: 192, letterRendering: true },
          jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
          pagebreak: { mode: ["avoid-all", "css", "legacy"] },
          // before: function(pdf) {
          //   pdf.setFontSize(10)
          //   pdf.text(75, 285, 'Footer content goes here')
          // }
        })
        // .header(() => {
        //   return `<h1>Header</h1>`
        // }).footer(() => {
        //   return `<p>Footer</p>`
        // })
        .outputPdf()
        .get("pdf")
        .then(function (pdf) {
          // pdf.text('my header', 10, 10)
          //           var totalPages = pdf.internal.getNumberOfPages();

          // for (i = 1; i <= totalPages; i++) {
          //   pdf.setPage(i);
          //   pdf.setFontSize(10);
          //   pdf.setTextColor(150);
          //   pdf.text('Page ' + i + ' of ' + totalPages, pdf.internal.pageSize.getWidth() - 100, pdf.internal.pageSize.getHeight() - 30);
          // }
          // pdf.addImage(imgLogo, 'PNG', 0, pdf.internal.pageSize.height - 20, 600, 20)

          window.open(pdf.output("bloburl"), "F");
        });

      // pdfDoc.html(document.getElementById('pdfContent'), {
      // callback: function () {
      //     window.open(pdfDoc.output('bloburl'));
      // }
      // });
      // }).then(() =>{
      // window.open(pdfDoc.output('bloburl'));

      // exportDataGrid(options).then(() => {

      // })
    },

    uploadAttach(id, c_id, links, type) {
      let data = {
        attachment: [],
        type: type,
        company_id: c_id,
        task_id: id,
      };
      links.forEach((x) => {
        data.attachment.push({
          attachment_url: x.url,
        });
      });
      console.log(data);
      this.dropTask = false;
      this.dropClient = false;
      this.$store.dispatch("attachments/store", data).then(() => {
        this.file_name = [];
        this.$store.state.attachments.links = [];
        console.log(data);
      });
    },
    removes3(file, i) {
      console.log("bbbb");
      var data = {
        attach_url: file ?? "null",
      };
      this.$store.dispatch("attachments/remove", { data: data }).then(() => {
        this.$store.state.attachments.links.splice(i, 1);
        this.file_name.splice(i, 1);
      });
    },
    // uploadFile(e) {
    //   console.log(e.target.files);
    //   let image = e.target.files;
    //   console.log("e:", e);
    //   console.log("inside onload before2:", this.file_name2);
    //   image.forEach((x) => {
    //     const reader = new FileReader();
    //     reader.onload = (e) => {
    //       let data = {
    //         file: e.target.result,
    //         name: x.name,
    //       };
    //       console.log("data:", data);
    //       console.log("inside onload before:", this.file_name2);
    //       this.file_name.push(data);
    //       console.log("inside onload:", this.file_name2);
    //       console.log("inside onload:", this.file_name2.length);
    //       this.uploadFileS3(this.file_name2);
    //     };
    //     reader.readAsDataURL(x);
    //   });
    // },
    // uploadFileS3(file) {
    //   let data = {
    //     attach: file ? file : "null",
    //   };
    //   this.$store
    //     .dispatch("attachments/add", { data: data })
    //     .then(() => {
    //       resolve();
    //     })
    //     .catch(() => { });
    // },
    clientAttachmentDropdown(e) {
      if (this.dropClient === false) {
        this.dropClient = true;
        setTimeout(() => {
          document.body.addEventListener("click", this.clickEventClient);
        }, 1);
      }
    },
    clickEventClient(ev) {
      console.log(ev.target, "evevevevevevev");
      console.log(this.$refs.clientDrop.contains(ev.target), "eeeeeeeeeee");
      if (
        ev.target != this.$refs.clientDrop &&
        !this.$refs.clientDrop.contains(ev.target)
      ) {
        this.dropClient = false;
      }
    },
    taskAttachmentDropdown(e) {
      if (this.dropTask === false) {
        this.dropTask = true;
        setTimeout(() => {
          document.body.addEventListener("click", this.clickEventTask);
        }, 1);
      }
    },
    clickEventTask(ev) {
      console.log(ev.target, "evevevevevevev");
      console.log(this.$refs.taskDrop.contains(ev.target), "eeeeeeeeeee");
      if (
        ev.target != this.$refs.taskDrop &&
        !this.$refs.taskDrop.contains(ev.target)
      ) {
        this.dropTask = false;
      }
    },
    onProgress(e) {
      console.log(e);
    },
    hasStartedGeneration() {
      console.log("started");
    },
    hasGenerated(e) {
      console.log(e);
    },
    generateReport() {
      this.$refs.html2Pdf.generatePdf();
    },
    threadedMail() {
      var arr = [];
      // if(this.$store.state.emails.all_emails.length === 0){

      // }
      this.$store.state.comments.extraComment.forEach((element) => {
        // if(this.taskId)
        // if(element.parent.task_id === id){
        // this.threadedMail = element.childs
        // message_id = element.parent.message_id
        if (element.childs) {
          if (element.childs.length > 0) {
            element.childs.forEach((c) => {
              arr.push(c);
            });
          }
          // }
        }
      });
      // this.arr_comment = []
      // this.arr_comment = arr;
      return arr;
    },
    sendTask() {
      var tasks = this.$store.state.tasks.all.filter((e) => e.type === "task");
      var leads = this.$store.state.leads.all.filter((e) => e.type === "lead");
      var combine = [];
      var details = null;
      leads.forEach((element) => {
        combine.push(element);
      });
      tasks.forEach((element) => {
        combine.push(element);
      });
      combine.forEach((element) => {
        // combine.push(element)
        if (this.taskId != 0 || this.taskId != null) {
          if (element.id === this.taskId) {
            details = element;
          }
        }
      });
      return details || {};
    },
    replyModal() {
      this.$refs["reply-modal"].show();

      this.composeData.from = this.outBoundEmails[0];
      var tasks = this.$store.state.tasks.all.filter((e) => e.type === "task");
      var leads = this.$store.state.leads.all.filter((e) => e.type === "lead");
      var details = null;
      if (this.$router.currentRoute.name == "leads") {
        leads.forEach((element) => {
          // combine.push(element)
          if (this.taskId != 0 || this.taskId != null) {
            if (element.id === this.taskId) {
              details = element;
            }
          }
        });
      } else {
        tasks.forEach((element) => {
          // combine.push(element)
          if (this.taskId != 0 || this.taskId != null) {
            if (element.id === this.taskId) {
              details = element;
            }
          }
        });
      }
      this.composeData.to = [];
      this.emails_contact.forEach((element) => {
        if (details != null) {
          if (details.mailbox != null) {
            if (
              element == details.mailbox.from_email &&
              details.mailbox.folder == "INBOX"
            ) {
              this.composeData.to.push(element);
            }
          }
        }
      });
      var signAll = [];
      if (this.$store.state.users.signAll != null) {
        signAll.push(this.$store.state.users.signAll);
      }
      var header = "";
      if (this.$router.currentRoute.name == "leads") {
        header =
          header +
          '<p style="margin-left:2rem;">Hi ' +
          this.$store.state.leads.all
            .filter((e) => e.type === "lead")
            .filter((e) => e.id === this.taskId)[0].contact_person.name +
          ", Greeting from " +
          JSON.parse(localStorage.getItem("userData")).tenant.id +
          "</p><br><br>";
      } else {
        header =
          header +
          '<p style="margin-left:2rem;">Hi ' +
          this.$store.state.tasks.all
            .filter((e) => e.type === "task")
            .filter((e) => e.id === this.taskId)[0].contact_person.name +
          ", Greeting from " +
          JSON.parse(localStorage.getItem("userData")).tenant.id +
          "</p><br><br>";
      }
      if (signAll.length > 0) {
        this.composeData.message = header + signAll[0].signature;

        return signAll[0].signature || "";
      }
    },
    getStatusColor(percent) {
      console.log("state" + percent.split("%")[0]);
      if (Number(percent.split("%")[0]) >= 100) {
        return "success";
      } else {
        return "danger";
      }
    },
    getStatusForInvoice(data) {
      console.log("status");
      var percent = 0;
      var total = 0;
      var state = false;
      var status = 0;
      this.allProposals.forEach((element) => {
        if (element.title == "payment") {
          element.record_pay_invoice.forEach((e) => {
            if (e.invoice_id === data.id) {
              // total = element
              state = true;
              status = status + e.paid_amount;
            }
          });
          element.invoice.forEach((i) => {
            if (i.id === data.id) {
              total = i.total_amt;
            }
          });
        }
      });
      percent = (status / total) * 100;
      console.log(percent);
      if (state) {
        return percent.toFixed(2) + "% paid";
      }
    },
    getStatusForProposal(data) {
      console.log("status");
      var percent = 0;
      var total = 0;
      var status = 0;
      var state = false;
      this.$store.state.invoice.all.forEach((element) => {
        // if(element.title == 'invoice'){

        element.proposal.forEach((e) => {
          if (e.proposal_id === Number(data.id)) {
            // total = element
            // status = status + e.paid_amount
            // total = e.amount
            state = true;
            total = element.amount;
            status = status + e.amount;
          }
        });

        // element.invoice.forEach(i => {
        //   if(i.id === data.id){
        //     total = i.total_amt
        //   }
        // });
        // }
      });
      percent = (total / status) * 100;
      console.log("status: ", status);
      console.log("total: ", total);
      console.log(data);
      if (state) {
        return percent.toFixed(1) + "% invoiced";
      }
    },
    getStatusForProposalNumber(data) {
      console.log("status");
      console.log(data);
      var percent = 0;
      var total = 0;
      var status = 0;
      var state = false;
      this.$store.state.invoice.allData.forEach((element) => {
        // if(element.title == 'invoice'){

        element.proposal.forEach((e) => {
          if (e.proposal_id === Number(data.id)) {
            // total = element
            // status = status + e.paid_amount
            // total = e.amount
            state = true;
            total = element.amount;
            status = status + e.amount;
          }
        });

        // element.invoice.forEach(i => {
        //   if(i.id === data.id){
        //     total = i.total_amt
        //   }
        // });
        // }
      });
      // alert(state)
      percent = (total / status) * 100;
      console.log("status: ", status);
      console.log("total: ", total);
      console.log(data);
      if (state) {
        return percent.toFixed(1);
      }
    },

    updatePayment() {
      var invoice_tds = [];
      for (let index = 0; index < this.payment.payment.length; index++) {
        // const element = array[index];
        invoice_tds.push({
          invoice_id: this.payment.payment[index].invoice_id,
          tds_deducted: this.payment.payment[index].tds,
          paid_amount: this.payment.payment[index].amount,
        });
      }
      var branch_id = 0;
      this.$store.state.branches.all.forEach((element) => {
        if (element.name == this.payment.branch) {
          branch_id = element.id;
        }
      });
      const data = {
        task_id: this.taskId,
        client_id: this.payment.client.id,
        branch_id: branch_id,
        pay_date: this.payment.date,
        payment_mode: this.payment.mode.name,
        amount: this.payment.amount,
        reference_id: this.payment.reference_id,
        notes: this.payment.notes,
        invoice: invoice_tds,
      };
      console.log(data, this.payment.edit_id);
    },
    seteditPayment(index) {
      var amount = 0;
      this.payment.payment.forEach((element) => {
        if (element.invoice_id === index) {
          amount = element.amount;
        }
      });
      return amount;
      // return this.payment.payment[index].amount
    },
    setedittds(index) {
      var tds = 0;
      this.payment.payment.forEach((element) => {
        if (element.invoice_id === index) {
          tds = element.tds;
        }
      });
      // return this.payment.payment[index].tds
      return tds;
    },
    getFinalPayment(invoice_id, record_pay_invoice) {
      var amount = 0;
      record_pay_invoice.forEach((element) => {
        if (element.invoice_id === invoice_id) {
          amount = element.paid_amount;
        }
      });
      return amount;
    },
    getTdsForPayment(invoice_id, record_pay_invoice) {
      var tds = 0;
      record_pay_invoice.forEach((element) => {
        if (element.invoice_id === invoice_id) {
          tds = element.tds_deducted;
        }
      });
      return tds;
    },
    getPaymentClient(client_id) {
      var name = "";
      if (client_id) {
        this.show_companys.forEach((element) => {
          if (element.id === client_id) {
            name = element.name;
          }
        });
        return name;
      }
    },
    getPaymentAmt(amount) {
      if (amount) {
        return amount.reduce((a, b) => a + b.paid_amount, 0);
      }
    },
    recordPayment() {
      var invoice_tds = [];
      for (let index = 0; index < this.payment.payment.length; index++) {
        // const element = array[index];
        if (this.payment.payment[index].amount != 0) {
          invoice_tds.push({
            invoice_id: this.payment.payment[index].invoice_id,
            tds_deducted: this.payment.payment[index].tds,
            paid_amount: this.payment.payment[index].amount,
          });
        }
      }
      var branch_id = 0;
      this.$store.state.branches.all.forEach((element) => {
        if (element.name == this.payment.branch) {
          branch_id = element.id;
        }
      });
      const data = {
        task_id: this.taskId,
        client_id: this.payment.client.id,
        branch_id: branch_id,
        pay_date: this.payment.date,
        payment_mode: this.payment.mode.name,
        amount: this.payment.amount,
        reference_id: this.payment.reference_id,
        notes: this.payment.notes,
        invoice: invoice_tds,
      };
      console.log(data);
      this.$store.dispatch("recordPayment/store", data).then(() => {
        this.$store.dispatch("recordPayment/get", this.taskId);
        this.$refs["payment-modal"].hide();
      });
    },
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
      );

      // }else{
      //   return 0
      // }
    },
    // addPayment(){

    setPayment(index, e) {
      console.log([index, e]);
      // let tempTotalAmount = getTotalAmt(this.payment.payment);
      console.log("before update ", this.getTotalAmt(this.payment.payment));
      this.payment.payment.forEach((element) => {
        if (element.invoice_id == index) {
          element.amount = Number(e);
          console.log("after update ", this.getTotalAmt(this.payment.payment));

          if (this.getTotalAmt(this.payment.payment) > this.payment.amount) {
            element.amount = Number(0);
            console.log(
              "inside the function of after update",
              this.getTotalAmt(this.payment.payment),
              element.amount
            );
          }
        }
        this.$forceUpdate();
      });
      // console.log(this.payment, "this is this.payment");
      // this.payment.payment[index].amount = Number(e)
    },
    setTds(index, e) {
      console.log([index, e]);
      this.payment.payment.forEach((element) => {
        if (element.invoice_id === index) {
          element.tds = Number(e);
          if (element.tds != 0) {
            element.amount = element.amount - element.tds;
          }
        }
      });
      // this.payment.payment[index].tds = Number(e)
      // this.payment.payment[index].amount = this.payment.payment[index].amount - this.payment.payment[index].tds
    },
    // },
    getinvoiceBranch(task_id) {
      console.log(task_id, "taskid from branch");
      var task = [];
      var name = "";
      // combine task and lead
      let arr = this.$store.state.leads.all;
      arr = arr.concat(this.$store.state.tasks.all);
      // if (this.$router.currentRoute.name == "tasks") {
      //   task = this.$store.state.tasks.all;
      // } else {
      //   task = this.$store.state.leads.all;
      // }
      task = arr;
      task.forEach((element) => {
        if (element.id === task_id) {
          name = element.branch.name;
        }
      });
      return name;
    },
    getinvoiceDate(date) {
      var d = new Date(date);
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
      ];

      var date_no = d.getDate();
      var month = ms[d.getMonth()];
      var year = d.getFullYear();
      return date_no + " " + month + " " + year;
    },
    getLargestId() {
      var invoice = this.$store.state.invoice.allData;
      var array = [];
      if (invoice.length > 0) {
        invoice.forEach((element) => {
          array.push(element.id);
        });
        this.invoice.id = Math.max(...array) + 1;
        // let prefix = invoice.filter(e => e.id = this.invoice.id).invoice_number
        // this.invoice.id = prefix+'/'+this.invoice.id
        // return Math.max(...array) + 1
        let prefix = invoice.filter((e) => (e.id = this.invoice.id))[0]
          .invoice_number;
        this.invoice.id = prefix + "/" + this.invoice.id;
      } else {
        // return 1;
        this.invoice.id = 1;
      }
      console.log(this.invoice.id);
    },
    getSubTotal(invoice) {
      let total = invoice.sub_total - invoice.pocket_expenses;
      let t = 0;
      if (invoice.adjustment_amt > 0) {
        t = total - invoice.adjustment_amt;
        console.log("positive");
      } else {
        t = total + invoice.adjustment_amt;
        console.log("negative");
      }
      return t;
    },
    getTotalInvoice() {
      var data = this.$store.state.invoice.all;
      var total = 0;
      data.forEach((element) => {
        total = total + element.total_amt;
      });
      return total;
    },
    validNumber(e) {
      let stringValue = e.target.value.toString();
      let regex = /^\d*(\.\d{1,2})?$/;
      if (!stringValue.match(regex) && this.price !== "") {
        this.invoice.total_amt = this.previousPrice;
      }
      this.previousPrice = this.invoice.total_amt;
    },
    getStateCode(data) {
      console.log(data);
      this.invoice.state_code = Number(data.fips_code);
    },

    shortText() {
      if (this.textLength) {
        let newText = this.text.substring(0);
        return newText;
      } else {
        /*let newText = this.lorem.substring(0,50) + `...`;*/
        let newText = this.text.substring(0, 400);
        return newText;
      }
    },
    addAllProposalAmt() {
      var all = this.$store.state.proposals.allProposals;
      var total = 0;
      all.forEach((element) => {
        element.proposal_fees.forEach((e) => {
          total = total + e.amount;
        });
      });
      this.invoice.amount = total;
    },
    showHidePendingFollowups() {
      var y = document.getElementById("desc_pending_followups");
      if (y.style.display === "none") {
        this.pendingIconName = "ChevronDownIcon";
        y.style.display = "block";
      } else {
        this.pendingIconName = "ChevronRightIcon";

        y.style.display = "none";
      }
    },
    showHideHistoryFollowups() {
      var z = document.getElementById("desc_history_followups");
      if (z.style.display === "none") {
        this.historyIconName = "ChevronDownIcon";
        z.style.display = "block";
      } else {
        this.historyIconName = "ChevronRightIcon";

        z.style.display = "none";
      }
    },
    showHideUpcomingFollowups() {
      var x = document.getElementById("desc_upcoming_followups");

      if (x.style.display === "none") {
        this.upcomingIconName = "ChevronDownIcon";
        x.style.display = "block";
      } else {
        this.upcomingIconName = "ChevronRightIcon";

        x.style.display = "none";
      }
    },
    showOrHideTaskAttach() {
      var x = document.getElementById("desc_task_attach");
      if (x.style.display === "none") {
        this.taskIconName = "ChevronDownIcon";
        x.style.display = "block";
      } else {
        this.taskIconName = "ChevronRightIcon";

        x.style.display = "none";
      }
    },
    showOrHideClientAttach() {
      var x = document.getElementById("desc_client_attach");
      if (x.style.display === "none") {
        this.clientIconName = "ChevronDownIcon";
        x.style.display = "block";
      } else {
        this.clientIconName = "ChevronRightIcon";

        x.style.display = "none";
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
          let states = this.$store.state.branches.states;
          let stateFilter = states.filter((x) => {
            return x.fips_code === this.invoice.gstNumber.slice(0, 2);
          });
          console.log(stateFilter, "sssss");
          console.log(stateFilter);
          this.invoice.state = stateFilter;
          // this.selectedState=stateFilter[0].name;
          this.gsterr = false;
          console.log("noerr");
        }
      } else {
        // this.formData.pan_number=''
        this.invoice.state = null;
      }
    },
    addInvoice() {
      console.log(this.invoice, "this is add invoice from accounts");
      const data = {
        id: Number(this.invoice.id),
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
      };
      console.log(data);
      this.$store.dispatch("invoice/store", data).then(() => {
        this.$store.dispatch("invoice/get", this.taskId);
        this.$store.dispatch("invoice/fetch");
        this.$refs["invoice-modal"].hide();
      });
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
      };
      console.log(data);
      this.$store
        .dispatch("invoice/update", { payload: data, id: this.invoice.editId })
        .then(() => {
          this.$store.dispatch("invoice/get", this.taskId);
          this.$store.dispatch("invoice/fetch");
          this.$refs["invoice-modal"].hide();
        });
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
      this.invoice.taxble_amt = this.invoice.amount - this.invoice.discount;
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
        Number(this.invoice.igst ?? 0);
      this.invoice.sgst_amt =
        (Number(this.invoice.taxble_amt ?? 0) / 100) *
        Number(this.invoice.sgst ?? 0);
      this.invoice.cgst_amt =
        (Number(this.invoice.taxble_amt ?? 0) / 100) *
        Number(this.invoice.cgst ?? 0);
      this.invoice.utgst_amt =
        (Number(this.invoice.taxble_amt ?? 0) / 100) *
        Number(this.invoice.utgst ?? 0);

      this.invoice.total_amt =
        Number(this.invoice.taxble_amt ?? 0) +
        Number(
          Number(this.invoice.igst_amt ?? 0) +
            Number(this.invoice.sgst_amt ?? 0) +
            Number(this.invoice.cgst_amt ?? 0) +
            Number(this.invoice.utgst_amt ?? 0)
        );
      this.invoice.sub_total = Number(this.invoice.total_amt ?? 0);
      var adjust = 0;
      if (this.invoice.adjustments != 0) {
        if (this.invoice.adjustments.includes("-")) {
          adjust = Number(this.invoice.adjustments.split("-")[1]);
        }
      }
      if (adjust != 0) {
        this.invoice.total =
          Number(this.invoice.sub_total ?? 0) +
          Number(Number(this.invoice.pocket_expense ?? 0)) -
          Number(adjust);
      } else {
        this.invoice.total =
          Number(this.invoice.sub_total ?? 0) +
          Number(this.invoice.pocket_expense ?? 0) +
          Number(this.invoice.adjustments);
      }
      // }
      // this.invoice.taxble_amt = this.invoice.amount - Number(this.invoice.discount)
      // return this.invoice.taxble_amt
    },
    destroyProposal(id) {
      if (confirm("Are you sure do you want to delete this item?")) {
        this.$store.dispatch("proposals/destroy", id).then(() => {
          this.$store.dispatch("proposals/getAll");
        });
      }
    },
    destroyInvoice(id) {
      if (confirm("Are you sure do you want to delete this item?")) {
        this.$store.dispatch("invoice/destroy", id).then(() => {
          this.$store.dispatch("invoice/fetch");
        });
      }
    },
    destroyPayment(id) {
      if (confirm("Are you sure do you want to delete this item?")) {
        this.$store.dispatch("invoice/destroy", id).then(() => {
          this.$store.dispatch("invoice/get", this.taskId);
        });
      }
    },
    getPL(date, id) {
      var dates = new Date(date);
      if (id < 10) {
        var p_date = "PL-0" + id + "-" + dates.getFullYear();
      } else {
        var p_date = "PL-" + id + "-" + dates.getFullYear();
      }
      return p_date;
    },
    getTotalAmt(amount) {
      if (amount) {
        return amount.reduce((a, b) => a + b.amount, 0);
      }
    },
    getTotalTds(tds) {
      return tds.reduce((a, b) => a + b.tds, 0);
    },
    timeFormat(date) {
      var hours = new Date(date).getHours();
      var minutes = new Date(date).getMinutes();
      var noon = hours >= 12 ? " PM" : " AM";
      hours = hours % 12;
      hours = hours ? hours : 12; // the hour '0' should be '12'
      minutes = minutes < 10 ? "0" + minutes : minutes;

      var maketime = hours + ":" + minutes + noon;
      var date = new Date(date).toDateString();
      var fullyear = new Date(date).getFullYear();
      var today = new Date().toDateString();
      console.log(today);
      if (date == today) {
        return "today ," + maketime;
      } else {
        return date; //.split(fullyear)[0] //+ ','+ maketime;
        // return date + ','+ maketime;
      }
    },
    getCommentUser(comments, users) {
      let latest_index = comments.length - 1;
      var string = "";
      if (latest_index !== -1) {
        // console.log(comments[latest_index]);
        var user_id = comments[latest_index].user_id;
        var username = "~ ";
        users.forEach((element) => {
          if (element.id === user_id) {
            username = username + element.name;
          }
        });
        username =
          username + ", " + this.timeFormat(comments[latest_index].created_at);
        // string = comment

        // console.log(latest_index);
        return username; //.substring(0,22)
      }
    },
    getLatestCommentLength(comments, length) {
      var arr = comments;

      return arr.length;
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

      let latest_index = comments.length - 1;
      var string = "";

      if (latest_index !== -1) {
        var comment = comments[latest_index].comment;
        string = comment;

        // console.log(latest_index);
        return string;
      }
    },
    getAssigneeString(users) {
      var user = [];
      users.forEach((element) => {
        user.push(element.name);
      });
      return user.join(); //.substring(0,28);
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
      this.$refs["proposal-modal"].hide();
      let arr = [];
      this.proposalFields.forEach((data) => {
        arr.push({
          title: data.title,
          description: data.desc,
        });
      });
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
      };
      this.$store.dispatch("proposals/create", data).then(() => {
        this.$store.dispatch("proposals/get", this.taskId).then(() => {
          console.log(this.allProposals);
        });
      });
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
      var arr = [];
      this.proposalFields.forEach((element) => {
        arr.push({
          title: element.title,
          description: element.desc,
        });
      });
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
        // footer_description: this.pfooterdesc ?? null,
        internal_notes: this.pnotes,
        proposalSection: arr,
        proposalFees: this.amountField,
      };
      console.log(data, "this is data edit ");
      this.$store
        .dispatch("proposals/proposal_update", {
          payload: data,
          id: this.proposal_edit_id,
        })
        .then(() => {
          this.$refs["proposal-edit-modal"].hide();
          this.$store.dispatch("proposals/getAll").then(() => {});
          console.log(this.proposals.map((e) => e.total));
        });
    },
    // onRowClickedProposal(i) {
    //   const { detailsRowProposal } = this;
    //   if (detailsRowProposal && detailsRowProposal !== i) {
    //     detailsRowProposal._showDetails = false;
    //   }

    //   this.$set(i, "_showDetails", !i._showDetails);
    //   console.log(i);
    //   if (i.title == "invoice") {
    //     this.invoice.editId = i.id;
    //   } else if (i.title == "payment") {
    //     this.payment.edit_id = i.id;
    //   } else {
    //     this.proposal_edit_id = i.id;
    //     this.taskId = i;
    //   }
    //   this.detailsRowProposal = i;
    // },
    onRowClicked(item) {
      console.log("on row clicked", item);
      const { detailsRow } = this;
      if (detailsRow && detailsRow !== item) {
        detailsRow._showDetails = false;
      }

      this.$set(item, "_showDetails", !item._showDetails);
      this.detailsRow = item;
      this.taskId = item.id;
      if (item.subject.includes("Re:")) {
        this.replySubject = item.subject;
      }
      if (!item.subject.includes("Re:")) {
        this.replySubject = "re: " + item.subject;
      }
      this.$store.dispatch("proposals/get", item.id).then(() => {
        console.log(this.allProposals);
      });
      this.$store.dispatch("comments/getMailComment", item.id).then(() => {});
      this.$store.dispatch("invoice/get", item.id).then(() => {
        // console.log(this.allProposals)
      });
      this.$store.dispatch("recordPayment/get", item.id);

      if (item.description) {
        this.text = item.description.replace(/(<([^>]+)>)/gi, "");
      }
      // this.parseHtml(item.description)
    },
    addTodo(id) {
      if (this.default_todo.length === 0) {
        return;
      }
      // });
      var c_todo = [];
      if (this.default_todo.length > 0) {
        this.default_todo.forEach((element) => {
          c_todo.push(element);
        });
      }
      if (this.additional_todo.length > 0) {
        this.additional_todo.forEach((element) => {
          c_todo.push(element);
        });
      }
      const data = {
        to_do: c_todo,
        task_id: id,
        user_ids: this.subtask_mentions,
      };
      this.$store.dispatch("appTodo/store", data).then(() => {
        this.$store.dispatch("appTodo/fetch");
      });
      if (this.additional_todo.length > 1) {
        while (this.additional_todo.length > 0) {
          this.additional_todo.pop();
        }
      }
    },
    onOpen(key) {
      // this.items = key === '@' ? this.mentions[0].dataSource : ""
    },

   onApply(item, key, replacedWith) {
      let count = 0
      this.subtask_mentions.forEach(element => {
        if(element.id === item.id){
          count++
        }
      });
      if(count === 0){
        this.subtask_mentions.push({ name: item.name, id: item.id })
      }else{

        let index = this.subtask_mentions.findIndex(e => e.id === item.id)
        if(index !=-1){
          
          this.subtask_mentions.splice(index,count)
        }
        
      }

      console.log(item, `has been replaced with ${replacedWith}`)
    },

    parseHtml(item) {
      // return item;
      var text = item.replace(/(<([^>]+)>)/gi, "");
      this.text = text;
      this.text = this.text.substr(0, 400);
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
      });
      // console.log(this.inputs)
    },
    addAmount() {
      this.amountField.push({
        description: "",
        amount: null,
      });
      // console.log(this.inputs)
    },
    addProposalField() {
      this.proposalFields.push({
        title: "",
        description: "",
      });
      // console.log(this.inputs)
    },
    remove(index) {
      this.inputs.splice(index, 1);
    },
    removeAmount(index) {
      this.amountField.splice(index, 1);
    },
    removeProposal(index) {
      this.proposalFields.splice(index, 1);
    },
    SearchChange(assignee) {
      // alert(assignee)
      // console.log();
      // console.log(this.search.split('@'));
      if (assignee.includes("@")) {
        this.search = assignee.split("@")[1];
      } else if (!assignee.includes("@")) {
      } else {
        this.search = "";
      }
    },
    openModal(modal, task) {
      // if(mod)

      if (modal.includes("_")) {
        this.$refs[modal.split("_")[0]].show();
        // this.task
        this.proposal_edit_id = modal.split("_")[2];
      } else {
        this.$refs[modal].show();
      }
      if (task) {
        this.todo_subtask = task.to_do;
        this.todo_id_subtask = task.id;
        this.task_id_subtask = task.task_id;
        // if(document.getElementById('subtask_todo'))
        // document.getElementById('subtask_todo').value = task.to_do
      }
    },
    autofillClient() {
      var data = [];
      for (
        let index = 0;
        index < this.$store.state.clients.all.length;
        index++
      ) {
        data[index] = this.$store.state.clients.all[index].name;
      }

      var filtered = "";
      if (this.pclient != null) {
        filtered = data.filter((data) => data === this.pclient.name);
      }
      if (filtered.length > 0) {
        console.log(filtered);
        //this.pclientName='Centrik'//filtered2[0].replace(/['"]+/g, '');
        this.pname = filtered[0].replace(/['"]+/g, "");
      }
    },
    autofillContact() {
      var data = [];
      for (
        let index = 0;
        index < this.$store.state.contactPeople.allForLeads.length;
        index++
      ) {
        data[index] = this.$store.state.contactPeople.allForLeads[index].name;
      }
      var filtered = [];
      if (this.pcontact != null) {
        filtered = data.filter((data) => data === this.pcontact.name);
      }
      if (filtered.length > 0) {
        this.pperson = filtered[0].replace(/['"]+/g, "");
      }
    },
    SetColor(id) {
      if (id === 1) {
        return "#9e9e9e";
      } else if (id === 2) {
        return "#607d8b";
      } else if (id === 3) {
        return "#ffe821";
      } else if (id === 4) {
        return "#ff9800";
      } else if (id === 5) {
        return "#e91e63";
      } else {
        return "#fff";
      }
    },
    SetText(id) {
      if (id === 1) {
        return "  Lowest";
      } else if (id === 2) {
        return "  Low";
      } else if (id === 3) {
        return "  Medium";
      } else if (id === 4) {
        return "  High";
      } else if (id === 5) {
        return "  Highest";
      } else {
        return "-";
      }
    },
    SelectItem(item) {
      // item.toggleDetails
      this.selected_item = item;
      this.$set(this.selected_item);
    },
    open_datepicker() {
      if (document.getElementById("open_datepicker2").click) {
        document.getElementById("open_datepicker2").style.display = "block";
      }
      // console.log(document.getElementById('open_datepicker2'))
    },

    inline_due_date(due_date, task_id) {
      var t = "info";
      if (due_date == "") {
        this.closed();
      }
      if (due_date != "") {
        var date = {
          due_date: due_date,
          task_id: task_id,
        };
        if (this.$router.currentRoute.name == "leads") {
          this.$store.dispatch("leads/inline_update", { date }).then(() => {
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
              });
            }
          });
        } else {
          this.$store.dispatch("tasks/inline_update", { date }).then(() => {
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
              });
            }
          });
        }
      }

      this.startDate2 = "";
    },
    inline_user_update(user_id, task_id) {
      var t = "info";

      var user_data = {
        user_id: user_id,
        task_id: task_id,
      };
      if (this.$router.currentRoute.name == "leads") {
        this.$store.dispatch("leads/inline_update", { user_data }).then(() => {
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
            });
          }
        });
      } else {
        this.$store.dispatch("tasks/inline_update", { user_data }).then(() => {
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
            });
          }
        });
      }
    },
    handleHide(bvEvent) {
      if (!this.isCloseable) {
        bvEvent.preventDefault();
      } else {
        this.$refs.dropdown.hide();
      }
    },
    closeMe(due_date, task_id) {
      this.isCloseable = true;

      this.$refs.dropdown.hide();
      if (due_date != null) {
        this.inline_due_date(due_date, task_id);
      }
      this.startDate2 = "";
    },
    closed() {
      this.isCloseable = true;

      this.$refs.dropdown.hide();
    },
    inlineUpdate(ev, type, index, priority, task_id) {
      // console.log(444);
      var t = "info";
      priority = index;
      var data = {
        id: index,
        task_id: task_id,
      };
      if (this.$router.currentRoute.name == "leads") {
        this.$store.dispatch("leads/inline_update", { data }).then(() => {
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
          });
          // }
        });
      } else {
        this.$store.dispatch("tasks/inline_update", { data }).then(() => {
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
          });
          // }
        });
      }

      // console.log(type);
    },
    dropdownShouldOpen(search, VueSelect) {
      // console.log(VueSelect);
      return VueSelect.closed;
      // if (search.length) {
      //   return VueSelect.open
      // }

      // return VueSelect.search.length !== 0 && VueSelect.open
    },

    onSearch(query) {
      this.search = query;
      this.offset = 0;
    },
    editLead(index) {
      // this.a = index;
      // editLead = index
      router.push("leads/" + index);
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
      this.filterCategory = "";
      this.filterContact = "";
      this.filterSearch = "";
      this.filterStatus = "";
      this.filterUsers = "";
      this.filtercompany = "";
      this.FilterPriority = "";
      this.filterBranch = "";
      this.fetchAll();
    },
    async onOpen() {
      if (this.hasNextPage) {
        await this.$nextTick();
        this.observer.observe(this.$refs.load);
      }
    },
    onClose() {
      this.observer.disconnect();
    },
    async infiniteScroll([{ isIntersecting, target }]) {
      if (isIntersecting) {
        const ul = target.offsetParent;
        const scrollTop = target.offsetParent.scrollTop;
        this.limit += 10;
        await this.$nextTick();
        ul.scrollTop = scrollTop;
      }
    },

    filter(event) {
      console.log(this.filterStatus);
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
            console.log(this.successMessage);
          })
          .catch(() => {
            console.log(this.errorMessage);
          });
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
            console.log(this.successMessage);
          })
          .catch(() => {
            console.log(this.errorMessage);
          });
      }
    },
    // filterWithUsers(event) {
    //   // console.log(this.filterStatus);
    //   this.$store.dispatch('leads/filter', { user: this.filterUsers, status: this.filterStatus,
    //     branch: this.filterBranch,
    //     company: this.filtercompany,
    //     category: this.filterCategory,
    //     search: this.filterSearch,
    //     priority: this.FilterPriority }).then(() => {
    //     console.log(this.successMessage);
    //   }).catch(() => {
    //     console.log(this.errorMessage);
    //   })
    // },
    // filterWithBranch(event) {
    //   // console.log(this.filterStatus);
    //   this.$store.dispatch('leads/filter', { branch: this.filterBranch,
    //     status: this.filterStatus,
    //     // branch: this.filterBranch,
    //     company: this.filtercompany,
    //     category: this.filterCategory,
    //     search: this.filterSearch,
    //     priority: this.FilterPriority }).then(() => {
    //     console.log(this.successMessage);
    //   }).catch(() => {
    //     console.log(this.errorMessage);
    //   })
    // },
    openFilter() {
      this.isFilterActive = !this.isFilterActive;
    },
    // filterWithcompany(event) {
    //   console.log(this.filtercompany);
    //   this.$store.dispatch('leads/filter', { company: this.filtercompany, status: this.filterStatus,
    //     branch: this.filterBranch,
    //     // company: this.filtercompany,
    //     category: this.filterCategory,
    //     search: this.filterSearch,
    //     priority: this.FilterPriority }).then(() => {
    //     console.log(this.successMessage);
    //   }).catch(() => {
    //     console.log(this.errorMessage);
    //   })
    // },
    // filterWithCategory(event) {
    //   console.log(this.filtercompany);
    //   this.$store.dispatch('leads/filter', { category: this.filterCategory, status: this.filterStatus,
    //     branch: this.filterBranch,
    //     company: this.filtercompany,
    //     // category: this.filterCategory,
    //     search: this.filterSearch,
    //     priority: this.FilterPriority }).then(() => {
    //     console.log(this.successMessage);
    //   }).catch(() => {
    //     console.log(this.errorMessage);
    //   })
    // },
    // filterWithContact(event) {
    //   console.log(this.filtercompany);
    //   this.$store.dispatch('leads/filter', { contact: this.filterContact, status: this.filterStatus,
    //     branch: this.filterBranch,
    //     company: this.filtercompany,
    //     category: this.filterCategory,
    //     search: this.filterSearch,
    //     priority: this.FilterPriority }).then(() => {
    //     console.log(this.successMessage);
    //   }).catch(() => {
    //     console.log(this.errorMessage);
    //   })
    // },
    // filterWithSearch(event) {
    //   console.log(this.filtercompany);
    //   this.$store.dispatch('leads/filter', { search: this.filterSearch, status: this.filterStatus,
    //     branch: this.filterBranch,
    //     company: this.filtercompany,
    //     category: this.filterCategory,
    //     search: this.filterSearch,
    //     priority: this.FilterPriority }).then(() => {
    //     console.log(this.successMessage);
    //   }).catch(() => {
    //     console.log(this.errorMessage);
    //   })
    // },
    // filterWithPriority(event) {
    //   console.log(this.filtercompany);
    //   this.$store.dispatch('leads/filter', { priority: this.FilterPriority, status: this.filterStatus,
    //     branch: this.filterBranch,
    //     company: this.filtercompany,
    //     category: this.filterCategory,
    //     search: this.filterSearch,
    //     priority: this.FilterPriority }).then(() => {
    //     console.log(this.successMessage);
    //   }).catch(() => {
    //     console.log(this.errorMessage);
    //   })
    // },
    fetchAll() {
      console.log(this.$router.currentRoute.params.status);
      if (this.$router.currentRoute.params.status) {
        if (this.$router.currentRoute.name == "tasks") {
          this.$store.dispatch(
            "tasks/get",
            this.$router.currentRoute.params.lead_id
          );
        } else {
          this.$store.dispatch(
            "leads/get",
            this.$router.currentRoute.params.lead_id
          );
        }
      }
      if (!this.$router.currentRoute.params.status) {
        if (this.$router.currentRoute.name == "tasks") {
          this.$store.dispatch("tasks/fetch");
        } else {
          this.$store.dispatch("leads/fetch");
        }
      }
    },
    formatDate(date) {
      const dates = new Date(date);

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
      ];
      return `${dates.getDate()} ${
        ms[dates.getMonth()]
      } ${dates.getFullYear()}`;
    },
    DaysLeft(start, end) {
      // const startDate = start
      const endDate = end;
      const diffInMs = new Date(endDate) - new Date();
      var diffInDays = diffInMs / (1000 * 60 * 60 * 24);
      diffInDays = Math.round(diffInDays);
      // eslint-disable-next-line no-bitwise
      return diffInDays | 0;
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
            this.fetchAll();
          });
        } else {
          this.$store.dispatch("tasks/destroy", id).then(() => {
            this.fetchAll();
          });
        }
      }
    },
    buttonVariant(status) {
      if (status == "open") {
        return "primary";
      } else if (status == "completed") {
        return "success";
      } else if (status == "invoiced") {
        return "warning";
      } else if (status == "closed") {
        return "secondary";
      } else {
        return "warning";
      }
    },
    priorityVariant(priority) {
      if (priority === 1) {
        return "secondary";
      }
      if (priority === 2) {
        return "warning";
      }
      if (priority === 3) {
        return "info";
      }
      if (priority === 4) {
        return "danger";
      }
      if (priority === 5) {
        return "success";
      }
      return "";

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

    // copied from leads
    onRowClickedProposal(i) {
      console.log("on row clicked proposal", i);
      const { detailsRowProposal } = this;
      if (detailsRowProposal && detailsRowProposal !== i) {
        detailsRowProposal._showDetails = false;
      }
      if (i._showDetails) {
        if (this.$store.state.leads.all.length === 0) {
          this.$store.dispatch("leads/fetch");
        }
      }
      this.$set(i, "_showDetails", !i._showDetails);
      console.log(i);
      // if (i.title == 'invoice') {

      //   this.invoice.editId = i.id
      // } else if (i.title == 'payment') {
      //   this.payment.edit_id = i.id
      // }
      // else {
      //   this.proposal_edit_id = i.id
      // }
      this.composeData.subject = i.subject;
      this.proposal_edit_id = i.id;
      if (i.subject.includes("Re:")) {
        this.replySubject = i.subject;
      }
      if (!i.subject.includes("Re:")) {
        this.replySubject = "re: " + i.subject;
      }
      this.taskId = i.task_id;
      this.detailsRowProposal = i;
    },
    // onRowClickedInvoices(item) {
    //   console.log(item, "this is item");
    //   const { detailsRowInvoices } = this;
    //   if (detailsRowInvoices && detailsRowInvoices !== item) {
    //     detailsRowInvoices._showDetails = false;
    //   }

    //   this.$set(item, "_showDetails", !item._showDetails);
    //   console.log(item, "this is item");
    //   // if (i.title == 'invoice') {

    //   //   this.invoice.editId = i.id
    //   // } else if (i.title == 'payment') {
    //   //   this.payment.edit_id = i.id
    //   // }
    //   // else {
    //   //   this.proposal_edit_id = i.id
    //   // }
    //   this.taskId = item.
    //   this.detailsRowInvoices = item;
    //   this.composeData.subject = item.subject;
    // },
    getPaymentAmt() {
      var amount = 0;
      this.paymentItems.forEach((element) => {
        amount = amount + element.amount;
      });
      return amount;
    },
    getTotal(data) {
      var amount = 0;
      this.proposalItems.forEach((element) => {
        amount = amount + element.amount;
      });
      return amount;
    },
    getPL(date, id) {
      var dates = new Date(date);
      if (id < 10) {
        var p_date = "PL-0" + id + "-" + dates.getFullYear();
      } else {
        var p_date = "PL-" + id + "-" + dates.getFullYear();
      }
      return p_date;
    },

    async exportToPDFPayment(i) {
      this.loader_payment = true;
      setTimeout(() => {
        this.loader_payment = false;
      }, 2000);
      // const toDataUrl = await function (url, callback) {
      //   //Convert to base64
      //   return new Promise((resolve, reject) => {
      //     var xhr = new XMLHttpRequest();
      //     xhr.onload = function () {
      //       var reader = new FileReader();
      //       reader.onloadend = function () {
      //         resolve(reader.result);
      //       };
      //       reader.readAsDataURL(xhr.response);
      //     };
      //     xhr.onerror = () => {
      //       reject({
      //         status: this.status,
      //         statusText: xhr.statusText,
      //       });
      //     };
      //     xhr.open("GET", url);
      //     xhr.responseType = "blob";
      //     xhr.send();
      //   });
      // };

      // // var pdfContent = "<div style='margin-left:2rem;'><img style='width:50%' src='"+ toDataUrl(logo) +"'/><p class='font-weight-bolder'>"+this.userData.tenant.organization.name+"</p><p class='my-3 font-weight-bolder'>"+i.item.proposal_date +"</p><p class='mb-2'>" + i.item.client_name  +",</p></div>";
      // const getBase64FromUrl = async (url) => {
      //   const data = await fetch(url);
      //   const blob = await data.blob()
      //   return new Promise((resolve) => {
      //     const reader = new FileReader();

      //     reader.readAsDataURL(blob);
      //     reader.onloadend = () => {
      //       const base64data = reader.result;
      //       this.base64data = base64data
      //       resolve(base64data);
      //     }
      //   });

      // }

      // <p class="mb-2">{{ i.item.address }}</p>
      // <p class="mb-2 font-weight-bolder">Subject: {{ i.item.subject }}</p>
      // <p class="mb-2">{{ i.item.prephase }}</p>
      // <p class="mb-2">Dear {{ i.item.concerned_person }}</p>
      // <div v-for="(proposal, index) in i.item.proposal_section" :key="proposal.id">
      //   <p class="mb-2 font-weight-bolder">{{proposal.title}}</p>
      //   <p class="mb-3" v-html="proposal.description"></p>
      // </div>
      // <p class="font-weight-bolder">Fee Details</p>
      // <table class="mb-3">
      //   <thead>
      //     <th>SI No</th>
      //     <th>Description</th>
      //     <th>Amount</th>
      //   </thead>
      //   <tbody>
      //     <tr v-for="(amount, index) in i.item.proposal_fees" :key="amount.id">
      //       <td>{{ index+1 }}</td>
      //       <td>{{ amount.description }}</td>
      //       <td>{{ amount.amount }}</td>

      //     </tr>
      //     <tr v-if="i.item.proposal_fees.length > 1">
      //       <td style="font-weight: bolder;">total (<font-awesome-icon  icon="indian-rupee-sign" class="icon cursor-pointer"   />)

      //       </td>
      //       <td> </td>
      //       <td>

      //        {{getTotalAmt(i.item.proposal_fees)}}
      //       </td>
      //     </tr>
      //   </tbody>
      // </table>
      // <p class="font-weight-bolder">{{ i.item.footer_title }}</p>
      // <p v-html="i.item.footer_description"></p>"
      // pdfContent += '</div>'
      // html2pdf('<div>hello</div>', {
      //   margin:1,
      //   filename:"html.pdf"
      // })
      // let imagesUrls = [

      //   "https://jmi-aero.com/media/cxmmngdb/centrik-logo-final.jpg",
      //   // "https://img-19.commentcamarche.net/cI8qqj-finfDcmx6jMK6Vr-krEw=/1500x/smart/b829396acc244fd484c5ddcdcb2b08f3/ccmcms-commentcamarche/20494859.jpg",
      // ];
      let pdfContent = "";
      // fetch('https://img-19.commentcamarche.net/cI8qqj-finfDcmx6jMK6Vr-krEw=/1500x/smart/b829396acc244fd484c5ddcdcb2b08f3/ccmcms-commentcamarche/20494859.jpg')
      //   //                         vvvv
      //   .then(response => response.blob())
      //   .then(imageBlob => {
      //     // Then create a local URL for that image and print it
      //     const imageObjectURL = URL.createObjectURL(imageBlob);
      //     console.log(imageObjectURL);
      //   });

      // let urlBase64 = await getBase64FromUrl('https://img-19.commentcamarche.net/cI8qqj-finfDcmx6jMK6Vr-krEw=/1500x/smart/b829396acc244fd484c5ddcdcb2b08f3/ccmcms-commentcamarche/20494859.jpg');
      // console.log(urlBase64);
      // console.log(urlb);

      // dco
      // lo
      document.getElementById("PaymentpdfContent").style.fontSize = "12px";
      // pdfContent += '<img crossorigin="*" src="' + urlBase64 + '" width="100" ><hr/><br>';
      pdfContent += document.getElementById("PaymentpdfContent").innerHTML;

      // pdfContent += "<h3> End of test </h3>";
      // html2pdf(pdfContent, {
      //   margin: 1,
      //   filename: "document.pdf",
      //   image: { type: "jpeg", quality: 0.98 },
      //   html2canvas: { dpi: 192, letterRendering: true },
      //   jsPDF: { unit: "in", format: "letter", orientation: "landscape" },
      // });

      console.log(document.getElementById("PaymentpdfContent").innerHTML);
      // var doc = new jspdf()
      // doc.addPage(document.getElementById('pdfContent'))
      //  var canvasElement = document.createElement('canvas');
      //     html2canvas(document.getElementById('pdfContent'), { canvas: canvasElement }).then(function (canvas) {
      //       // const img = canvas.toDataURL("image/jpeg", 0.8);
      //       // doc.addImage(img,'JPEG',20,20);
      //       // doc.save("sample.pdf");
      //       const img = canvas.toDataURL("image/jpeg", 0.8);
      //       doc.addImage(img,'JPEG',20,20);
      //       doc.save("sample.pdf");
      //       // window.open(doc.output('bloburl'))
      //     });
      // var total = doc.internal.getNumberOfPages();
      //       for (let index = 0; index < total.length; index++) {
      //         doc.setPage(i)
      //         doc.setFontSize(12)
      //         doc.text('page',10,10)

      //       }

      // pdfDoc.text("<div>hello</div>")
      // html2canvas(options.component)
      html2pdf()
        .from(pdfContent)
        .set({
          margin: 0.5,
          filename: "document.pdf",
          image: { type: "jpeg", quality: 0.98 },
          html2canvas: { scale: 2 },
          // html2canvas: { dpi: 192, letterRendering: true },
          jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
          pagebreak: { mode: ["avoid-all", "css", "legacy"] },
          // before: function(pdf) {
          //   pdf.setFontSize(10)
          //   pdf.text(75, 285, 'Footer content goes here')
          // }
        })
        // .header(() => {
        //   return `<h1>Header</h1>`
        // }).footer(() => {
        //   return `<p>Footer</p>`
        // })
        .outputPdf()
        .get("pdf")
        .then(function (pdf) {
          // pdf.text('my header', 10, 10)
          //           var totalPages = pdf.internal.getNumberOfPages();

          // for (i = 1; i <= totalPages; i++) {
          //   pdf.setPage(i);
          //   pdf.setFontSize(10);
          //   pdf.setTextColor(150);
          //   pdf.text('Page ' + i + ' of ' + totalPages, pdf.internal.pageSize.getWidth() - 100, pdf.internal.pageSize.getHeight() - 30);
          // }
          // pdf.addImage(imgLogo, 'PNG', 0, pdf.internal.pageSize.height - 20, 600, 20)

          window.open(pdf.output("bloburl"), "F");
        });

      // pdfDoc.html(document.getElementById('pdfContent'), {
      // callback: function () {
      //     window.open(pdfDoc.output('bloburl'));
      // }
      // });
      // }).then(() =>{
      // window.open(pdfDoc.output('bloburl'));

      // exportDataGrid(options).then(() => {

      // })
    },
    getTdsForPayment(invoice_id, record_pay_invoice) {
      var tds = 0;
      record_pay_invoice.forEach((element) => {
        if (element.invoice_id === invoice_id) {
          tds = element.tds_deducted;
        }
      });
      return tds;
    },
    getFinalPayment(invoice_id, record_pay_invoice) {
      var amount = 0;
      record_pay_invoice.forEach((element) => {
        if (element.invoice_id === invoice_id) {
          amount = element.paid_amount;
        }
      });
      return amount;
    },
    // onRowClickedProposal(item) {
    //   const { detailsRowProposal } = this;
    //   if (detailsRowProposal && detailsRowProposal !== item) {
    //     detailsRowProposal._showDetails = false;

    //   }
    //   this.taskId = item;
    //   this.$set(item, "_showDetails", !item._showDetails);
    //   this.detailsRowProposal = item;
    // },
    onRowClickedInvoices(i) {
      console.log("this is ", i);
      const { detailsRowInvoices } = this;
      if (detailsRowInvoices && detailsRowInvoices !== i) {
        detailsRowInvoices._showDetails = false;
      }

      this.$set(i, "_showDetails", !i._showDetails);
      if (i._showDetails) {
        if (this.$store.state.leads.all.length === 0) {
          this.$store.dispatch("leads/fetch");
        }
      }
      this.detailsRowInvoices = i;
      this.taskId = i.task_id;
      this.invoice.editId = i.id;
      // this.composeData.subject = i.subject;
    },
    onRowClickedPayments(item) {
      const { detailsRowPayments } = this;
      if (detailsRowPayments && detailsRowPayments !== item) {
        detailsRowPayments._showDetails = false;
      }

      if (i._showDetails) {
        if (this.$store.state.leads.all.length === 0) {
          this.$store.dispatch("leads/fetch");
        }
      }
      this.$set(item, "_showDetails", !item._showDetails);
      this.detailsRowPayments = item;
    },
    fetchingDescription() {},
  },

   created() {
    if (this.$router.currentRoute.name != "auth-login") {
  //   this.$store.dispatch("expenses/fetch");
    if (this.$store.state.branches.all.length === 0) {
      this.$store.dispatch("branches/fetch");
    }
  //   if (this.outBoundEmails.length === 0) {
  //     this.$store.dispatch("emails/fetch_all_out_mails");
  //   }
  //   // this.$store.dispatch("emails/fetch_all_out_mails");
  //   this.$store.dispatch("contactPeople/fetch");
  //   this.$store.dispatch("proposals/getAll");
  //   this.$store.dispatch("invoice/fetch");

  //   this.$store.dispatch(`recordPayment/fetch`);
  //   if (this.$store.state.clients.all.length === 0) {
  //     this.$store.dispatch(`clients/fetch`);
  //   }
  //   if (this.$store.state.users.all.length === 0) {
  //     this.$store.dispatch(`users/fetch`);
  //   }
  //   // if(this.$store.state.)
  //   this.$store.dispatch("tasks/fetch");
  }
},
};
</script>

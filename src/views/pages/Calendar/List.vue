<template>
  <div>
    <!-- <create-sidebar :is-create-sidebar-active.sync="isCreateSidebarActive" @refetch-data="fetchAll" />
      <edit-sidebar :is-edit-sidebar-active.sync="isEditSidebarActive" :edit-item.sync="editItem"
        @refetch-data="() => {
          fetchAll(),
          setLocalStoragePrivilege()
        }" /> -->


    <div class="block-header" style="margin-bottom: 12px;
      min-height: 60px;">

      <div class="row d-flex " style="background: #fff;
                  margin: 0;">
        <div class="col-md-12 col-sm-12 col-xs-12">
          <div class="h-left clearfix">
            <div class="card">
              <div class="header d-flex justify-content-between ">
                <div>


                  <h2 class="text-uppercase text-20-black  ">
                    Calendar
                  </h2>
                </div>
                <div class=" d-flex justify-content-end">



                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <b-card no-body />
    <div class="mt-2 mb-2">
      <b-row>
        <b-col cols="12" md="6" class="d-flex align-items-center justify-content-start mb-1 mb-md-0" />
        <b-col cols="12" md="6">
          <div class="d-flex align-items-center justify-content-end">
            <div class="btn-filter d-flex">

              &emsp;

            </div>
          </div>
        </b-col>
      </b-row>
    </div>
    <!-- BTABS -->

    <div style=" margin-top: -71px;
  ">
      <b-tabs class="mb-2" v-model="activeTab">
        <b-tab active id="all" >
          <template #title>
            {{ 'ALL' }}
            <!-- {{activeTab }} -->
          </template>

        </b-tab>
        <b-tab id="upcoming-tab" >
          <template #title>
            {{ 'UPCOMING' }}
          </template>

        </b-tab>
        <b-tab id="pending-tab" >
          <template #title>
            {{ 'PENDING' }}
          </template>

        </b-tab>
        <b-tab id="completed-tab" >
          <template #title>
            {{ 'COMPLETED' }}
          </template>

        </b-tab>

       
        <b-tab id="email-tab" >
          <template #title>
            {{ 'EMAIL' }}
          </template>

        </b-tab>
        <b-tab id="phone-tab" >
          <template #title>
            {{ 'PHONE' }}
          </template>

        </b-tab>
        <b-tab id="visit-tab" >
          <template #title>
            {{ 'VISIT' }}
          </template>

        </b-tab>





      </b-tabs>
      <!-- {{ tasks() }} -->
      <div class="card oas-calendar-card">
        <div class="border h-100">
          <div class="text-white p-1 bg-primary d-flex justify-content-between">
            <div @click="decreaseDate" class="cursor-pointer">
              <feather-icon icon="ChevronLeftIcon" size="22" />
            </div>
            <div>{{ day }} {{ month }} {{ year }}</div>
            <div @click="increaseDate" class="cursor-pointer">
              <feather-icon icon="ChevronRightIcon" size="22" />
            </div>
          </div>
          <div class="pall background font-weight-bolder">{{ getDayname(new Date(day + month + year).getDay()) }}
          </div>
          <table class="w-100">
            <tbody>
              <tr v-if="tasks().length === 0">
                <td class="pall text-center">No Records Found</td>
              </tr>
              <tr class="b-bottom cursor-pointer" v-else v-for="(task, index) in tasks()" :key="index"
                @click="goToTask(task)">
                <td class="pall pe-none" v-if="(task.company !== null || task.contact_person !== null)">{{ (task.company
                  !== null ? task.company.name : task.contact_person.name) }}</td>
                <td class="px pe-none">
                  <div class="task-dot bg-primary pe-none" style="margin-left: -1rem;"></div>
                 
                </td>
                <td class="pall pl-0 pe-none">#{{ task.id }} - {{ (task.subject.length > 50 ? task.subject.substr(0, 50)
                  +
                  '...' : task.subject) }}</td>
              </tr>
              
            </tbody>
          </table>
          <!-- {{ tasks }} -->
          <!-- <b-pagination v-if="tasks.allData.length > 10" v-model="currentPage" :total-rows="tasks.allData.length"
            :per-page="pageSize" align="center" first-number last-number class="mb-0 mt-1" prev-class="prev-item"
            next-class="next-item">
            <template #prev-text>
              <feather-icon icon="ChevronLeftIcon" size="18" />
            </template>
            <template #next-text>
              <feather-icon icon="ChevronRightIcon" size="18" />
            </template>
          </b-pagination> -->
        </div>
        <div v-if="$store.state.leads.isLoading" class="b-overlay position-absolute"
              style="inset: 0px;z-index: 10;/* display: none; */">
              <div class="position-absolute bg-white rounded-sm"
                style="inset: 0px; opacity: 0.75; backdrop-filter: blur(0px);"></div>
              <div class="position-absolute" style="top: 50%; left: 50%; transform: translateX(-50%) translateY(-50%);">
                <span aria-hidden="true" class="spinner-border text-primary"> <!----></span>
                <br><span style="margin-left:-2rem;">Processing..</span>
              </div>
            </div>

      </div>

    </div>

    <div class="text-center">
      <!-- <b-spinner label="Loading..." variant="primary" v-if="isLoading" /> -->
      <!-- <b-spinner v-if="isLoading" /> -->

    </div>
  </div>
</template>
    
<script>
import LeadsTableGlobal from '../leads/LeadsTableGlobal.vue'
import { BProgress } from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { BTabs, BTab, BFormGroup, BFormInput, VBTooltip, BCard, BContainer, BRow, BCol, BLink, BAvatar, BMediaBody, BBadge, BPagination, BMedia, BSpinner, BForm, BTable, BButton, BDropdown, BDropdownItem } from "bootstrap-vue";
import { ref, onUnmounted } from "@vue/composition-api";
import ToastificationContent from "@core/components/toastification/ToastificationContent.vue";
//   import CreateSidebar from "./CreateSidebar.vue";
//   import EditSidebar from "./EditSidebar.vue";
import { avatarText } from '@core/utils/filter'
import vSelect from 'vue-select'
import List from '../tasks/List.vue';
import FeatherIcon from "@/@core/components/feather-icon/FeatherIcon.vue";
// import InviteUser from './InviteUser.vue'
export default {
  components: {
    BFormGroup,
    BForm, BFormInput,
    BProgress,
    LeadsTableGlobal,
    FontAwesomeIcon,
    BCard,
    vSelect,
    BPagination,
    BAvatar,
    BContainer,
    BTabs,
    BTab,
    BRow,
    BBadge,
    BCol,
    BTable,
    BButton,
    BLink,
    BMedia,
    BSpinner,
    BDropdown,
    BMediaBody,
    BDropdownItem,
    //   CreateSidebar,
    //   EditSidebar,
    List
  },
  directives: {
    'b-tooltip': VBTooltip,
    Ripple,
  },
  data() {
    const date = new Date();

    let days = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

    let day = date.getDate();
    let month = days[date.getMonth()];
    let monthNo = date.getMonth() + 1;
    let year = date.getFullYear();
    return {
      follow_up:[],
      followUp:[],
      day: day,
      month: month,
      monthNo: monthNo,
      year: year,
      dataTimesheet: [
        { date: '2022-04-12', status: 'Holiday', time_devoted: '04:33', cost: 0.00, contri: 0.00, profit: 0.00 }
      ],
      SearchEmployee: '',
      employeeData: [],
      userItems: [],
      timesheet_fields: [
        {
          key: 'date',
          label: 'Date',
        },
        {
          key: 'status',
          label: 'Status',
        },
        {
          key: 'time_devoted',
          label: 'Time Devoted',
        },
        {
          key: 'cost',
          label: 'Cost',
        },
        {
          key: 'contri',
          label: 'Contribution',
        },
        {
          key: 'profit',
          label: 'Profit/Loss',
        }
      ],
      search: '',
      limit: 5,
      offset: 0,
      value: 0,
      max: 100,
      textLength: false,
      file_name: [],
      text: "",
      previleges: {
        edit: false,
        task: false,
        timeSheet: false,
        delete: false,
      },
      Tasksprevileges: {
        edit: false,
        onRowEdit: false,
        viewAll: false,
        conversion: false,
        clientDetails: false,
        timeSheet: false,
        checklist: false,
        delete: false,
        download: false,

        Leadsedit: false,
        LeadsonRowEdit: false,
        LeadsviewAll: false,
        Leadsconversion: false,
        LeadsclientDetails: false,
        LeadstimeSheet: false,
        Leadschecklist: false,
        Leadsdelete: false,
        Leadsdownload: false,
      },
      filterEmployee: null,
      detailsRowProposal: null,
      activeTab: 0,
      extraTabs: 0,
      leadsData: [],
      startDate2: null,

      importance: [{ id: 1, star: "StarIcon" }, { id: 2, star: "StarIcon" }, { id: 3, star: "StarIcon" }, { id: 4, star: "StarIcon" }, { id: 5, star: "StarIcon" }],

      fieldsTasks: [{ key: 'priority', label: 'priority', tdClass: 'width-0' }, { key: 'iconAttach', label: '', thClass: 'width-0 p-0' }, { key: 'id', label: '#', tdClass: 'text-left width-0', thClass: 'text-left' }, { key: 'client', label: 'client', tdClass: 'width-0' }, { key: 'subject', label: 'subject', tdClass: 'width-18', html: true }, { key: 'commentCount', label: 'commentCount', tdClass: 'width-0' }, { key: 'postDate', label: 'postDate', tdClass: 'width-3' }, { key: 'daysLeft', tdClass: 'width-0', thClass: 'text-center', thStyle: 'padding-right:5rem;' }, { key: 'employees', label: 'employees', tdClass: 'text-left width-0', thClass: 'text-left ' }, { key: 'status', tdClass: 'text-capitalize width-0' }],

      fields: [{ label: "Employee Name", key: "name" },
      { label: "Designation", key: 'user_designation.designation_name' },
        "Open",
        "Completed",
      // { key: 'invoiced_number', label: 'Invoiced', thClass: 'th-color', tdClass: 'text-center' },
      { key: 'total', label: 'Total' },
        "Closed", { label: "assigned ", key: 'emailsAssigned', tdStyle: 'line-height:2;' }, "status"], id: 0,
      fields: [{ label: "Employee Name", key: "name" }, { label: "Designation", key: 'user_designation.designation_name' }, "Open", "Completed",
        // "Invoiced",
        "Closed", "Total",/*{ label: "assigned ", key: 'emailsAssigned', tdStyle: 'line-height:2;' },*/ "status"], id: 0,
      fields1: [
        {
          key: "priority",
          label: "priority",
          tdClass: "width-0",
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
          thStyle: { paddingLeft: '0rem', width: "28%" },
          tdClass: 'pl-0',
          html: true,
        },
        {
          key: "commentCount",
          label: "commentCount",
          tdClass: "width-0",
          thStyle: { paddingLeft: '0rem', width: "5%" },
          tdClass: 'pl-0',
        },

        {
          key: "postDate",
          label: "postDate",
          tdClass: "width-3",
          thStyle: { paddingLeft: '0rem', width: "10%" },
          tdClass: 'pl-0',
        },
        {
          key: "daysLeft",
          tdClass: "width-0",
          thClass: "text-center",
          thStyle: { paddingLeft: '0rem', width: "10%" },
          tdClass: '',
        },
        {
          key: "employees",
          label: "employees",
          tdClass: "text-left width-0",
          thClass: "text-left ",
          thStyle: { paddingLeft: '0rem', width: "10%" },
          tdClass: 'pl-0',
        },
        {
          key: "status",
          tdClass: "text-capitalize width-0",
          thStyle: { paddingLeft: '0rem', width: "10%" },
          tdClass: 'pl-0',
        },
      ],
      fields2: [
        {
          key: "date",
          label: "date",
          tdClass: "width-0",
          thStyle: { width: "0%" },
        },
        {
          key: "status",
          label: "status",
          tdClass: "width-0",
          thStyle: { width: "0%" },
        },
        {
          key: "time devoted",
          label: "time devoted",
          tdClass: "width-0",
          thStyle: { width: "0%" },
        },
        {
          key: "cost",
          label: "cost",
          tdClass: "width-0",
          thStyle: { width: "0%" },
        },
        {
          key: "contribution",
          label: "contribution",
          tdClass: "width-0",
          thStyle: { width: "0%" },
        },
        {
          key: "profit/loss",
          label: "profit/loss",
          tdClass: "width-0",
          thStyle: { width: "0%" },
        },



      ],
      detailsRow: null,
      detailsRowLeads: null,


      search: ''
    };
  },
  computed: {
 
    filterWithEmployees() {
      let array = this.$store.state.users.all;
      let arr = []
      let search_arr = []

      if (this.filterEmployee) {
        array.forEach(element => {
          if (element.name === this.filterEmployee.name) {
            arr.push(element)
          }
        });
        this.employeeData = arr
      } else if (this.SearchEmployee) {
        const searchterm = this.SearchEmployee.toLowerCase()
        array.forEach(element => {
          const name = element.name.toLowerCase()
          if (name.includes(searchterm)) {
            search_arr.push(element)
          }
        })
        this.employeeData = search_arr
      }

      else {
        this.employeeData = array
      }
      return this.employeeData;
    },
    paginated_employees() {
      // return this.employees.slice(this.offset, this.limit + this.offset)
      return this.employees
    },
    employees() {
      var data = [];
      this.$store.state.users.all.forEach(element => {
        data.push({
          id: element.id,
          name: element.name
        })
      });
      return data//data.filter((country) => country.toLocaleLowerCase().includes(this.search.toLocaleLowerCase()))

    },
    showFilesTask() {
      let data = this.$store.state.tasks.allAttachments;
      let filter = []
      let num = 0
      data.forEach(element => {
        if (element.type === 'task') {
          let split = element.attachment.split('/')
          element.name = split[split.length - 1]
          filter.push(element)
          num++
        }
      });
      this.taskNum = num
      return filter;
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
      let data = this.$store.state.tasks.allAttachments;
      let filter = []
      let num = 0
      data.forEach(element => {
        if (element.type === 'company') {
          let split = element.attachment.split('/')
          element.name = split[split.length - 1]
          filter.push(element)
          num++
        }
      });
      this.clientNum = num
      return filter;
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
    setPrivileges() {
      let priveleges = [];
      var data = this.previleges;


      if (this.$store.state.users.all.length > 0) {
        let roles = this.$store.state.users.all;
        let currUser = [JSON.parse(localStorage.getItem('userData'))]//.user_role_id

        let designations = this.$store.state.designation.all;

        let d2 = designations.filter(x => {
          for (let i = 0; i < x.users.length; i++) {
            if (x.users[i].user_role_id === currUser[0].user_role_id) {
              return true;
            }
          }
          return false;
        })

        d2.forEach(x => {
          x.privileges.forEach(y => {
            priveleges.push(y)
          })
        })

        let arr = [];

        this.$store.state.status.all_master.forEach(x => {
          if (x.name === 'Employees') {
            x.privileges.forEach(y => {
              priveleges.forEach(z => {
                if (y.id === z.privilege_id) {
                  arr.push({
                    name: y.name,
                    status: z.status
                  })
                }
              })
            })
          }
        })

        console.log(arr, 'ppppppppppp')

        arr.forEach(x => {
          if (x.name === 'Users Edit') {
            if (x.status === 'active') {
              data.edit = true
            }
          }
          else if (x.name === 'Users Tasks') {
            if (x.status === 'active') {
              data.task = true
            }
          }
          else if (x.name === 'Users Timesheet') {
            if (x.status === 'active') {
              data.timeSheet = true
            }
          }
          else if (x.name === 'Users Delete') {
            if (x.status === 'active') {
              data.delete = true
            }
          }
        })


        console.log(data, 'mmmmmmmmmmm');

      }

      return data
    },
    users_to_assign() {
      var items = this.$store.state.users.all;
      var data = [];
      var leads = this.$store.state.leads.all;
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
          avatar: items[index].avatar
        }
        // if(leads[i].users[j].id === items[index].id){
        //   console.log('already assigned');
        // }


        // }
        // }
      }
      return data.filter((country) => country.name.toLocaleLowerCase().includes(this.search.toLocaleLowerCase()));
    },
    paginated_users_to_assign() {
      return this.users_to_assign.slice(this.offset_users, this.limit_users + this.offset_users)
    },
    itemsTasks() {
      var items = []
      // if (this.$router.currentRoute.name == 'tasks') {
      items = this.$store.state.leads.all
      items.concat(this.$store.state.tasks.all)
      // } else {
      // }
      // var users= items.map(item => item.users.length > 0 ? item : null)
      // var users= items.map(item => item.users.length > 0 ?? item.id)
      // items.splice(users)
      var element = [];
      var element2 = '';
      for (let index = 0; index < items.length; index++) {
        element[index] = items[index];

        if ((items[index].users.length === 0 && this.filterUsers != null) || (items[index].status_master == null && this.filterStatus != null)) {
          // if(this.filterUsers != null){
          element.splice(element.indexOf(element[index]), 1)

          // }
          // if(this.filterUsers == null){
          //   element[index] = items[index]
          // }
        }



      }

      return element.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));
      // return element;

      return items

    },
    user_emails() {
      return this.$store.state.users.user_emails;

    },
    isLoading() {
      if (this.$store.state.users.isLoading || this.$store.state.users.isGetLoading) {
        return true;
      } else {
        return false
      }
    },
    successMessage() {
      return this.$store.state.users.successMessage;
    },
    errorMessage() {
      return this.$store.state.users.errorMessage;
    },
    totalCount() {
      return this.$store.state.users.all.length;

    },
    errors() {
      return JSON.parse(JSON.stringify(this.$store.state.users.errors));
    },
    items() {

      let timesheet = this.$store.state.users.timesheet;
      console.log(this.$store.state.users.all)
      this.employeeData = this.$store.state.users.all;
      this.userItems = this.$store.state.users.all;
      this.userItems.forEach(element => {
        element.timeSheet = []
        timesheet.forEach(e => {
          if (e.user_id === element.id) {
            element.timeSheet.push(e)
          }
        });
      });
      return;




    },
    items1() {

      let arr = this.$store.state.leads.all;
      // // this.leadsData= this.$store.state.leads.all;
      // if(this.extraTabs===1){

      //   // console.log(arr[0].contact_person.name,'lllllllllllllllllllllllllllllllllllllll');

      // }
      // this.leadsData=arr.filter(e =>e.priority==4)
      this.leadsData = this.tasks()

      return


    },
    items2() {

    },
    path() {
      return this.$store.state.users.path;
    }
  },
  methods: {
    tasks() {
      let data = []
   
      if(this.showPrivileges().viewAll){

        data= this.$store.state.leads.all.filter(e => e.type === 'task');
      }
      if(this.showPrivileges().LeadsviewAll){

        data= this.$store.state.leads.all.filter(e => e.type === 'lead');
      }
      if(this.showPrivileges().LeadsviewAll &&  this.showPrivileges().viewAll){
        data= this.$store.state.leads.all 
      }
      // return data
      if (this.monthNo.toString().length === 1 && this.day.toString().length === 1) {
        console.log('hello');
        var date = `${this.year}-0${this.monthNo}-0${this.day}`
      }
      else if (this.monthNo.toString().length === 1) {
        console.log('hello');
        var date = `${this.year}-0${this.monthNo}-${this.day}`
      } else if (this.day.toString().length === 1) {
        console.log('hello');
        var date = `${this.year}-${this.monthNo}-0${this.day}`
      }
      else {
        console.log('bye');
        var date = `${this.year}-${this.monthNo}-${this.day}`
      }
      let follow_up = []
      data.forEach(element => {
        if (element.follow_up) {
          element.follow_up.forEach(cb => {
            if (cb.date === date ) {
              if(this.activeTab === 0){

                // follow_up = []
                
                follow_up.push({
                  id: cb.task_id,
                  subject: cb.description,
                  company: element.company,
                  contact_person: element.contact_person,
                  type: element.type,
                  due_date: cb.date
                })
              }
              if(this.activeTab === 1){
               const b = new Date(cb.date)
               const c = new Date(date);
                if(b > c){

                  follow_up = []
                
              follow_up.push({
                id: cb.task_id,
                subject: cb.description,
                company: element.company,
                contact_person: element.contact_person,
                type: element.type,
                due_date: cb.date
              })
            }
              }
              if(this.activeTab === 2){
                
                if(cb.status === 'pending'){
                  follow_up = []

                
              follow_up.push({
                id: cb.task_id,
                subject: cb.description,
                company: element.company,
                contact_person: element.contact_person,
                type: element.type,
                due_date: cb.date
              })
            }
              }
              if(this.activeTab === 3){
                
                if(cb.status === 'done'){

                  follow_up = []
                
              follow_up.push({
                id: cb.task_id,
                subject: cb.description,
                company: element.company,
                contact_person: element.contact_person,
                type: element.type,
                due_date: cb.date
              })
            }
              }
              if(this.activeTab === 4){
                
                if(cb.activity_type.name === 'Email'){

                  follow_up = []
                
              follow_up.push({
                id: cb.task_id,
                subject: cb.description,
                company: element.company,
                contact_person: element.contact_person,
                type: element.type,
                due_date: cb.date
              })
            }
              }
              if(this.activeTab === 5){
                
                if(cb.activity_type.name === 'Phone'){

                follow_up = []
              follow_up.push({
                id: cb.task_id,
                subject: cb.description,
                company: element.company,
                contact_person: element.contact_person,
                type: element.type,
                due_date: cb.date
              })
            }
              }
              if(this.activeTab === 6){
                
                if(cb.activity_type.name === 'Visit'){
                  follow_up = []

                
              follow_up.push({
                id: cb.task_id,
                subject: cb.description,
                company: element.company,
                contact_person: element.contact_person,
                type: element.type,
                due_date: cb.date
              })
            }
              }
          }
          });
        }
      });
      let fg = follow_up
      this.leadsData = follow_up
      // this.followUp = fg
      return follow_up;

    // })
    },
    increaseDate() {
      let currentDate = `${this.year}-${this.monthNo}-${this.day}`;
      let updatedDate = new Date(new Date(currentDate).setDate(new Date(currentDate).getDate() + 1))
      let days = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
      this.day = updatedDate.getDate();
      this.month = days[updatedDate.getMonth()];
      this.monthNo = updatedDate.getMonth() + 1;
      this.year = updatedDate.getFullYear();
    },
    decreaseDate() {
      let currentDate = `${this.year}-${this.monthNo}-${this.day}`;
      let updatedDate = new Date(new Date(currentDate).setDate(new Date(currentDate).getDate() - 1))
      let days = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
      this.day = updatedDate.getDate();
      this.month = days[updatedDate.getMonth()];
      this.monthNo = updatedDate.getMonth() + 1;
      this.year = updatedDate.getFullYear();
    },
    goToTask(task) {
      if (task.type === 'task') {

        this.$router.push({
          name: 'tasks',
          params: {
            status: true,
            lead_id: task.id
          }
        })
      } else {
        this.$router.push({
          name: 'leads',
          params: {
            status: true,
            lead_id: task.id
          }
        })
      }
    },
    getDayname(dayno) {
      var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

      return days[dayno];
    },
    showPrivileges() {
      let priveleges = [];
      let data = this.Tasksprevileges;
      let roles = this.$store.state.users.all;
      // let currUser = roles.filter((x) => {
      //   return x.id === JSON.parse(localStorage.getItem("userData")).id;
      // });

      if (this.$store.state.users.all.length > 0) {
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
          if (x.name === "Tasks") {
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
          if (x.name === "Leads") {
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

        console.log(arr, "ppppppppppp");

        arr.forEach((x) => {
          console.log(x.name === "Leads Editing", "nnnnnnnnnn");
          if (x.name === "Leads Editing") {
            if (x.status === 'active') {
              data.Leadsedit = true;
            }
          } else if (x.name === "View All Leads") {
            if (x.status === 'active') {
              data.LeadsviewAll = true;
            } else {
              data.LeadsviewAll = false;

            }
          } else if (x.name === "Leads On Row Editing") {
            if (x.status === 'active') {
              data.LeadsonRowEdit = true;
            }
          } else if (x.name === "Leads Conversion") {
            if (x.status === 'active') {
              data.Leadsconversion = true;
            }
          } else if (x.name === "Client Contact Details") {
            if (x.status === 'active') {
              data.LeadsclientDetails = true;
            }
          } else if (x.name === "Timesheet") {
            if (x.status === 'active') {
              data.LeadstimeSheet = true;
            }
          } else if (x.name === "Checklist") {
            if (x.status === 'active') {
              data.Leadschecklist = true;
            }
          } else if (x.name === "Leads Delete") {
            if (x.status === 'active') {
              data.Leadsdelete = true;
            }
          } else if (x.name === "Leads Download") {
            if (x.status === 'active') {
              data.Leadsdownload = true;
            }
          }
          if (x.name === "Tasks Editing") {
            if (x.status === "active") {
              data.edit = true;
            }
          } else if (x.name === "View All Tasks") {
            if (x.status === "active") {
              data.viewAll = true;
            } else {
              data.viewAll = false;

            }
          } else if (x.name === "Tasks On Row Editing") {
            if (x.status === "active") {
              data.onRowEdit = true;
            }
          } else if (x.name === "Accounts") {
            if (x.status === "active") {
              data.accounts = true;
            }
          } else if (x.name === "Client Contact Details") {
            if (x.status === "active") {
              data.clientDetails = true;
            }
          } else if (x.name === "Timesheet") {
            if (x.status === "active") {
              data.timeSheet = true;
            }
          } else if (x.name === "Checklist") {
            if (x.status === "active") {
              data.checklist = true;
            }
          } else if (x.name === "Tasks Delete") {
            if (x.status === "active") {
              data.delete = true;
            }
          } else if (x.name === "Tasks Download") {
            if (x.status === "active") {
              data.download = true;
            }
          } else if (x.name === "Task Value") {
            if (x.status === "active") {
              data.value = true;
            }
          } else if (x.name === "Estimates $ Invoices") {
            if (x.status === "active") {
              data.inovices = true;
            }
          }
        });

        console.log(data, "mmmmmmmmmmm");
      }
      return data;
    },
    filterWithuser() {
      // this.clientData = this.clientData.filter(e => e.name === this.filtercompany)
      // return;
      let array = this.$store.state.users.all;
      let arr = []
      let search_arr = []
      if (this.filterEmployee != null) {
        array.forEach(element => {
          if (element.name === this.filterEmployee) {
            arr.push(element)
          }
        });
        this.clientData = arr
      } else if (this.SearchEmployee != "") {
        const searchTerm1 = this.SearchEmployee.toLowerCase();
        array.forEach(element => {
          const name1 = element.name.toLowerCase();
          if (name1.includes(searchTerm1)) {
            search_arr.push(element)
          }
        });
        this.employeeData = search_arr
      }
      else {
        this.resetStateData()
      }

    },
    onSearch(query) {
      this.search = query
      this.offset = 0
    },

    resetStateData() {
      this.filterEmployee = ''
      this.SearchEmployee = ''

      const b = this.filterWithEmployees
      return;
      // this.fetchAll()

    },


    openFilter() {
      this.isFilterActive = !this.isFilterActive

    },
    openFilter2() {
      if (this.isFilterActive == true) {
        this.isFilterActive = false
      }
    },
    getTimeDate(date2) {
      const date = new Date(date2)
      const day = date.getDate()
      const dayname = date.getDay()

      const month = date.getMonth()
      const year = date.getFullYear()
      const days = ['MON', 'TUES', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];

      const months = ['', 'JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUNE', 'JULY', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
      return `${days[dayname]}, ${months[month]} ${day}`;
    },
    setLocalStoragePrivilege() {
      this.$store.state.designation.all.forEach(element => {
        element.users.forEach(x => {
          if (x.email === JSON.parse(localStorage.getItem('userData')).email) {
            const data = { id: element.id, designation_name: element.designation_name, masters: element.masters }
            // localStorage.removeItem('privileges')
            localStorage.setItem('privileges', JSON.stringify(data))


          } else {
            // localStorage.removeItem('privileges')

          }
        });
      });
    },
    // getContri(cost,time){
    //   const t = new Date('2023-04-13 '+ time)
    //   const minutes = t.getHours()*60+t.getMinutes()
    //   const contri = (cost/60)*minutes;
    //   return contri.toFixed(2);
    // },
    // getCostPerHr(salary){
    //   const cost = (Number(salary) * 150) / (22*7*100)
    //   return cost.toFixed(2);
    // },
    // onRowClickedTimesheet(item){
    //   const { detailsRowTimesheet } = this
    //   if (detailsRowTimesheet && detailsRowTimesheet !== item) {
    //     detailsRowTimesheet._showDetails = false;
    //   }

    //   this.$set(item, '_showDetails', !item._showDetails
    //   )
    //   // this.detailsRow = item;
    // },
    // handleChildFunction(name){
    //   let arr = []
    //   this.$store.state.leads.all.forEach(element => {
    //     element.users.forEach(x => {
    //       if(x.email === name){
    //         arr.push(element)
    //       }
    //     });
    //   });
    //   // return this.$store.state.leads.all.filter(e => e.users.length > 0 ? e.users.filter(x => x.email === name) : '')
    //   return arr;
    // },
    // statusCal(id, type) {
    //   let filtered = []//.filter(e => e.type === 'task').concat(this.$store.state.leads.all.filter(e => e.type === 'lead'));
    //   let items = []
    //   if(this.Tasksprevileges.viewAll){
    //     items = this.$store.state.leads.all.filter(e => e.type === 'task');


    //   }else if(!this.Tasksprevileges.viewAll){
    //     // if (this.$store.state.users.all.filter(e => e.email === JSON.parse(localStorage.getItem('userData')).email)[0].user_role_id === 1) {
    //     //     data = this.$store.state.tasks.all.filter(e => e.type === 'task')//.filter(e => e.type === 'task');
    //     //     // items = this
    //     //   } else {
    //       items = []

    //         this.$store.state.leads.all.filter(e => e.type === 'task')//.filter(e => e.type === 'task')
    //         .forEach(a => {
    //           if (a.users.filter(e => e.email === JSON.parse(localStorage.getItem('userData')).email).length > 0) {
    //             items.push(a)
    //           }
    //         })
    //       // }
    //   }
    //   if(this.Tasksprevileges.LeadsviewAll){
    //     items = this.$store.state.leads.all.filter(e => e.type === 'lead');


    //   }else if(!this.Tasksprevileges.LeadsviewAll){
    //     // if (this.$store.state.users.all.filter(e => e.email === JSON.parse(localStorage.getItem('userData')).email)[0].user_role_id === 1) {
    //     //     data = this.$store.state.tasks.all.filter(e => e.type === 'task')//.filter(e => e.type === 'task');
    //     //     // items = this
    //     //   } else {
    //       items = []
    //         this.$store.state.leads.all.filter(e => e.type === 'lead')//.filter(e => e.type === 'task')
    //         .forEach(a => {
    //           if (a.users.filter(e => e.email === JSON.parse(localStorage.getItem('userData')).email).length > 0) {
    //             items.push(a)
    //           }
    //         })
    //       // }
    //   }
    //   if(this.Tasksprevileges.LeadsviewAll && this.Tasksprevileges.viewAll){
    //     items = this.$store.state.leads.all//.filter(e => e.type === 'lead');


    //   }else if(!this.Tasksprevileges.LeadsviewAll && !this.Tasksprevileges.LeadsviewAll){
    //     // if (this.$store.state.users.all.filter(e => e.email === JSON.parse(localStorage.getItem('userData')).email)[0].user_role_id === 1) {
    //     //     data = this.$store.state.tasks.all.filter(e => e.type === 'task')//.filter(e => e.type === 'task');
    //     //     // items = this
    //     //   } else {
    //       items = []

    //         this.$store.state.leads.all//.filter(e => e.type === 'lead')//.filter(e => e.type === 'task')
    //         .forEach(a => {
    //           if (a.users.filter(e => e.email === JSON.parse(localStorage.getItem('userData')).email).length > 0) {
    //             items.push(a)
    //           }
    //         })
    //       // }
    //   }
    //   items.forEach(element => {
    //     element.users.forEach(x => {
    //       if(x.id === id){
    //         filtered.push(element)
    //       }
    //     });
    //   });
    //   console.log(filtered, 'uuuuuuuuuuuuuuuuuuuuu');
    //   let open = 0;
    //   let completed = 0;
    //   let closed = 0;
    //   let invoiced = 0;
    //   if(type === 'open'){

    //     open = filtered.filter(e => e.status_master.type === type).length
    //   }else if(type === 'completed'){

    //     completed = filtered.filter(e => e.status_master.type === type ).length
    //   }else if(type === 'closed'){
    //   closed = filtered.filter(e => e.status_master.type === type ).length
    //   }else if(type === 'invoiced'){
    //   invoiced = filtered.filter(e => e.status_master.type === type ).length
    //   }
    //   // filtered.forEach(x => {
    //   //   console.log(x.status_master.type, 'hhhhhhhhhhh');
    //   //   if(x.status_master.type==='open') {
    //   //     open=open+1;
    //   //   }
    //   //   else if(x.status_master.type==='closed') {
    //   //     closed=closed+1;
    //   //   }
    //   //   else if(x.status_master.type==='completed') {
    //   //     completed=completed+1;
    //   //   }
    //   //   else if(x.status_master.type==='invoiced') {
    //   //     invoiced=invoiced+1;
    //   //   }
    //   // })
    //   // console.log(open, closed, completed, invoiced);
    //   if(type === 'open'){
    //     return {
    //       open:open
    //     }
    //   }else if(type === 'completed'){
    //     return {
    //       completed:completed
    //     }
    //   }else if(type === 'closed'){
    //     return {
    //       closed:closed
    //     }
    //   }else if(type === 'invoiced'){
    //     return {
    //       invoiced:invoiced
    //     }
    //   }

    // }, 
    // shortText() {
    //   if (this.textLength) {
    //     let newText = this.text.substring(0);
    //     return newText;
    //   } else {
    //     /*let newText = this.lorem.substring(0,50) + `...`;*/
    //     let newText = this.text.substring(0, 400);
    //     return newText;
    //   }
    // },
    // getAssigneeString(users) {
    //   var user = [];
    //   users.forEach((element) => {
    //     user.push(element.name);
    //   });
    //   return user.join(); //.substring(0,28);
    // },
    // getCommentUser(comments, users) {
    //   let latest_index = comments.length - 1;
    //   var string = ''
    //   if (latest_index !== -1) {
    //     // console.log(comments[latest_index]);
    //     var user_id = comments[latest_index].user_id
    //     var username = '~ ';
    //     users.forEach(element => {
    //       if (element.id === user_id) {
    //         username = username + element.name
    //       }

    //     });
    //     username = username + ', ' + this.timeFormat(comments[latest_index].created_at)
    //     // string = comment


    //     // console.log(latest_index);
    //     return username//.substring(0,22)
    //   }
    // },
    // timeFormat(date) {
    //   var hours = new Date(date).getHours();
    //   var minutes = new Date(date).getMinutes();
    //   var noon = hours >= 12 ? ' PM' : ' AM';
    //   hours = hours % 12;
    //   hours = hours ? hours : 12; // the hour '0' should be '12'
    //   minutes = minutes < 10 ? '0' + minutes : minutes;

    //   var maketime = hours + ':' + minutes + noon;
    //   var date = new Date(date).toDateString();
    //   var fullyear = new Date(date).getFullYear();
    //   var today = new Date().toDateString();
    //   console.log(today);
    //   if (date == today) {
    //     return 'today ,' + maketime
    //   } else {

    //     return date//.split(fullyear)[0] //+ ','+ maketime;
    //     // return date + ','+ maketime;

    //   }
    // },
    // SetColor(id) {
    //   if (id === 1) {
    //     return '#9e9e9e'
    //   }
    //   else if (id === 2) {
    //     return '#607d8b'
    //   }
    //   else if (id === 3) {
    //     return '#ffe821'
    //   }
    //   else if (id === 4) {
    //     return '#ff9800'
    //   }
    //   else if (id === 5) {
    //     return '#e91e63'
    //   } else {
    //     return '#fff'
    //   }

    // },
    // SetText(id) {


    //   if (id === 1) {
    //     return '  Lowest'
    //   }
    //   else if (id === 2) {
    //     return '  Low'
    //   }
    //   else if (id === 3) {
    //     return '  Medium'
    //   }
    //   else if (id === 4) {
    //     return '  High'
    //   }
    //   else if (id === 5) {
    //     return '  Highest'
    //   } else {
    //     return '-'
    //   }

    // },
    // getLatestCommentLength(comments, length) {
    //   var arr = comments

    //   return arr.length;
    // },
    // getLatestComment(comments, length) {
    //   // var arr = comments

    //   // var extra = this.$store.state.comments.extraComments
    //   // var all =arr
    //   //     if(arr.length > 0){

    //   //       var latest_id= arr[arr.length - 1].id + 1;
    //   //     }
    //   //     var user= null
    //   //     extra.forEach(element => {
    //   //       this.$store.state.users.all.forEach(e => {

    //   //         if(element.from_email == e.email){

    //   //           user = e
    //   //         }else{
    //   //           user={
    //   //             email: element.from_email,
    //   //             name:element.from_name,
    //   //             avatar:element.avatar,
    //   //             id:latest_id
    //   //           } 
    //   //         }
    //   //       });
    //   //     });

    //   //       extra.forEach(element => {
    //   //       all.push({

    //   //         comment:element.message,
    //   //         created_at:element.created_at,
    //   //         id:latest_id,
    //   //         user:user,
    //   //         user_id:user.id

    //   //     });
    //   //     });

    //   let latest_index = comments.length - 1;
    //   var string = ''

    //   if (latest_index !== -1) {
    //     var comment = comments[latest_index].comment
    //     string = comment


    //     // console.log(latest_index);
    //     return string;
    //   }
    // },
    // formatDate(date) {
    //   const dates = new Date(date)

    //   const ms = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    //   return `${dates.getDate()} ${ms[dates.getMonth()]} ${dates.getFullYear()}`
    // },
    // DaysLeft(start, end) {
    //   // const startDate = start
    //   const endDate = end
    //   const diffInMs = new Date(endDate) - new Date()
    //   var diffInDays = diffInMs / (1000 * 60 * 60 * 24)
    //   diffInDays = Math.round(diffInDays);
    //   // eslint-disable-next-line no-bitwise
    //   return diffInDays | 0
    // },
    onRowClicked(item) {
      // console.log(item,'mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm');
      const { detailsRow } = this
      if (detailsRow && detailsRow !== item) {
        detailsRow._showDetails = false;
      }

      this.$set(item, '_showDetails', !item._showDetails
      )
      this.detailsRow = item;
    },


    //     inlineUpdate(ev, type, index, priority, task_id) {
    //       // console.log(444);
    //       var t = "info";
    //       priority = index;
    //       var data = {
    //         id: index,
    //         task_id: task_id,
    //       };
    //       if (this.$router.currentRoute.name == "leads") {
    //         this.$store.dispatch("leads/inline_update", { data }).then(() => {
    //           this.$store.dispatch('leads/fetch');

    //           // if (this.$store.state.leads.isLoadingLeads == true) {
    //           // this.$refs.snackbar[t](this.successMessage)
    //           this.$toast.success(this.successMessage, {
    //             position: "bottom-left",
    //             timeout: 5000,
    //             closeOnClick: true,
    //             pauseOnFocusLoss: true,
    //             pauseOnHover: true,
    //             draggable: true,
    //             draggablePercent: 0.6,
    //             showCloseButtonOnHover: false,
    //             hideProgressBar: true,
    //             closeButton: "button",
    //             icon: true,
    //             rtl: false,
    //           });
    //           // }
    //         });
    //       } else {
    //         this.$store.dispatch("tasks/inline_update", { data }).then(() => {
    //           this.$store.dispatch('tasks/fetch');

    //           // if (this.$store.state.leads.isLoadingLeads == true) {
    //           // this.$refs.snackbar[t](this.successMessage)
    //           this.$toast.success(this.successMessage, {
    //             position: "bottom-left",
    //             timeout: 5000,
    //             closeOnClick: true,
    //             pauseOnFocusLoss: true,
    //             pauseOnHover: true,
    //             draggable: true,
    //             draggablePercent: 0.6,
    //             showCloseButtonOnHover: false,
    //             hideProgressBar: true,
    //             closeButton: "button",
    //             icon: true,
    //             rtl: false,
    //           });
    //           // }
    //         });
    //       }

    //       // console.log(type);
    //     },



    //     onRowClickedTasks(item) {
    //       const { detailsRowtasks } = this
    //       if (detailsRowtasks && detailsRowtasks !== item) {
    //         detailsRowtasks._showDetails = false;
    //       }

    //       this.$set(item, '_showDetails', !item._showDetails
    //       )
    //       // this.detailsRow = item;
    //     },
    //     activateUser(id,name,userId,branchId,email,image,type,monthlyCost,desigId){
    //       let arr = []
    //       this.user_emails.forEach(element => {
    //         if(element.user_id === id){
    //           element.emails_setting.forEach(e => {

    //             arr.push(e)
    //           });
    //         }
    //         this.fetchAll()
    //       });
    //       const data={
    //         id:id,
    //         name:name,
    //         user_role_id:userId,
    //         status:"active",
    //         branch_id:branchId,
    //         emails:arr,
    //         image:null,
    //         type:'',
    //         monthly_cost:monthlyCost,
    //         desig_id:desigId
    //       };
    //       this.$store.dispatch('users/update',{
    //         payload:data, id:data.id}).then(()=>{
    //         if (this.$store.state.users.successMessage) {

    // this.$toast.success('User Activated Successfully!', {
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
    // }
    //       })
    //     },
    //     reInviteUser(id) {
    //       const data = {
    //         id: id
    //       };
    //       this.$store.dispatch('users/reInvite', data).then(() => {
    //         if (this.$store.state.users.successMessage) {

    //           this.$toast.success(this.$store.state.users.successMessage, {
    //             position: "bottom-left",
    //             timeout: 5000,
    //             closeOnClick: true,
    //             pauseOnFocusLoss: true,
    //             pauseOnHover: true,
    //             draggable: true,
    //             draggablePercent: 0.6,
    //             showCloseButtonOnHover: false,
    //             hideProgressBar: true,
    //             closeButton: "button",
    //             icon: true,
    //             rtl: false
    //           })
    //         }
    //       })

    //     },
    //     showEditSidebar(status, data) {
    //       this.isEditSidebarActive = status;
    //       var emails = [];
    //       var length_null = [];
    //       var count = 0;
    //       // for (let index = 0; index < this.user_emails.length; index++) {
    //       //   for (let j = 0; j < this.user_emails[index].emails_setting.length; j++) {


    //       //     if (this.user_emails[index].user_id == data.id) {

    //       //       emails[index] = this.user_emails[index].emails_setting[j]

    //       //     } else {
    //       //       length_null[index] = null
    //       //     }
    //       //   }
    //       // }
    //       this.user_emails.forEach(element =>{
    //         if(element.user_id === data.id){
    //         element.emails_setting.forEach(e => {
    //             emails.push(e)
    //             });
    //           }
    //       });
    //         // for (let i = 0; i < emails.length; i++) {
    //         //   // const element = array[i];
    //         //   if (emails[i] == null) {
    //         //     emails.splice(emails[i], length_null.length)
    //         //   }

    //         // }

    //       console.log(emails);
    //       var em = {
    //         branches: data.branches,
    //         user_role_id: data.user_role_id,
    //         avatar: data.avatar,
    //         monthly_cost :data.monthly_cost,
    //         id: data.id,
    //         email: data.email,
    //         length:length_null,
    //         name: data.name,
    //         monthly_cost:data.monthly_cost,
    //         status: data.status,
    //         _showDetails: data._showDetails,
    //         emails_setting: emails
    //       }
    //       this.editItem = em
    //     },
    //     update_data(user_id, other_id) {
    //       if (user_id === other_id) {
    //         return ''
    //       } else {
    //         return 'no'
    //       }
    //     },
    //     fetchUserVise(){

    //       // if( JSON.parse(localStorage.getItem('userData')).user_role_id === 1){
    //       //   this.$store.dispatch('users/fetch')
    //       // }
    //     },
    //     fetchAll() {
    //       // if(this.$store.state.users.all.length === 0){

    //         // }
    //         this.setLocalStoragePrivilege()
    //         if (this.$router.currentRoute.params.status ) {
    //         this.$store.dispatch("users/get", this.$router.currentRoute.params.user_id)
    //         this.$store.dispatch("leads/fetch");

    //       }

    //       if (!this.$router.currentRoute.params.status ) {
    //         if( JSON.parse(localStorage.getItem('userData')).user_role_id === 1){


    //           this.$store.dispatch("users/fetch").then(() => {
    //             // this.fetchUserVise()

    //           });
    //         }
    //         if( JSON.parse(localStorage.getItem('userData')).user_role_id !== 1){
    //         this.$store.dispatch('users/get',  JSON.parse(localStorage.getItem('userData')).id)
    //       }

    //         if (this.$router.currentRoute.name == "tasks") {
    //           this.$store.dispatch("tasks/fetch");
    //         } else {
    //           this.$store.dispatch("leads/fetch");
    //         }
    //       }


    //     },

    //     destroyItem(id) {
    //       if (confirm("Are you sure do you want to deactivate this item?")) {
    //         this.$store.dispatch("users/deactivate", {payload:'',id:id}).then(() => {
    //           this.fetchAll();
    //           this.$toast.success('Deleted Successfully!', {
    //             position: "bottom-left",
    //             timeout: 5000,
    //             closeOnClick: true,
    //             pauseOnFocusLoss: true,
    //             pauseOnHover: true,
    //             draggable: true,
    //             draggablePercent: 0.6,
    //             showCloseButtonOnHover: false,
    //             hideProgressBar: true,
    //             closeButton: "button",
    //             icon: true,
    //             rtl: false,
    //           });
    //         });
    //       }
    //     },
  },
  created() {
    // this.$store.dispatch('followUp/fetch')
    this.showPrivileges()

    this.tasks()
    this.$store.dispatch('leads/fetch').then(() => {
    })



    //   this.fetchAll();
    //   this.setLocalStoragePrivilege()
    //   this.$store.dispatch('branches/fetch')
    // if (this.$store.state.designation.all.length === 0) {
    //   this.$store.dispatch('designation/fetch')
    // }


  },
  updated() {
    this.setLocalStoragePrivilege()
    this.showPrivileges()

    this.tasks()

  },
  beforeUpdate() {
    this.tasks()

    this.showPrivileges()
  },
  beforeDestroy() {
    this.setLocalStoragePrivilege()

  },
  setup() {
    const isCreateSidebarActive = ref(false);
    const isEditSidebarActive = ref(false);
    const editItem = ref({});
    const perPage = ref(10)
    const isFilterActive = ref(false)

    let statusOptions = ['Open', 'Completed', 'Invoiced', 'Closed']
    // const totalCount = ref(store.state.emails.all.length)
    const currentPage = ref(1)
    const perPageOptions = [10, 25, 50, 100]
    return {
      // Sidebar
      isCreateSidebarActive, perPage, currentPage, perPageOptions,
      isEditSidebarActive,
      editItem,
      statusOptions,
      avatarText,
      isFilterActive
    };
  },
};
</script>
<style lang="scss" scoped>






.task-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
}

.p-bottom {
  padding-bottom: 2rem;
}



.border {
  border: 1px solid rgb(221, 221, 221);
}

.b-bottom {
  border-bottom: 1px solid rgb(221, 221, 221);
}



.py {
  padding: 0.6rem 0;
}

.pall {
  padding: 0.6rem 1rem;
}




.per-page-selector {
  width: 90px;
}

// td.pall.pe-none {
//   padding: 0.6rem 1rem;
// }
.pall.background.font-weight-bolder {
  padding: 0.6rem 1rem !important;
  background-color: rgb(238, 238, 238) !important;
  
  
}
.my-custom-select ::placeholder {
  font-size: 1rem;
  /* color: rgba(128, 128, 128, 0.442) !important; */
  color: rgb(85, 81, 81) !important;

}
</style>
<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';

// @import 'bootstrap-vue/src/icons.scss';
//  @import '@/assets/scss/vendors/bootstrap-vue/_custom';
// @import '@/assets/scss/vendors/bootstrap-vue/index' ;
</style>
<style></style>
   
    
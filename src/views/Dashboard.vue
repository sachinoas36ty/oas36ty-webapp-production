<template>
  <!-- <div></div> -->
  <!-- <b-card
    
    text-variant="center"
    class="card card-congratulations"
  >
    images
    <b-img
      :src="require('@/assets/images/elements/decore-left.png')"
      class="congratulations-img-left"
    />
    <b-img
      :src="require('@/assets/images/elements/decore-right.png')"
      class="congratulations-img-right"
    />
    / images

    <b-avatar
      variant="primary"
      size="70"
      class="shadow mb-2"
    >
      <feather-icon
        size="28"
        icon="AwardIcon"
      />
    </b-avatar>
    <h1 class="mb-1 mt-50 text-white">
      Welcome {{ name.name }},
    </h1>
    <b-card-text class="m-auto w-75">
      You have done <strong>{{ data.saleToday }}%</strong> more sales today. Check your new badge in your profile.
      You have logged in Successfully
    </b-card-text>
  </b-card> -->
  <div>
    <div class="block-header" style="margin-bottom: 12px;
        min-height: 60px;margin-top:-1rem;">

      <div class="row" style="        background: #fff;
                    margin: 0;">
        <div class="col-md-12 col-sm-12 col-xs-12">
          <div class="h-left clearfix">
            <div class="card">
              <div class="header d-flex justify-content-between">
                <div>

                  <h2 class="text-uppercase text-20-black ">
                    Dashboard
                  </h2>
                </div>
                <div class=" d-flex justify-content-end">
                  <div class="d-inline-flex ">
                    <b-button @click="journeyPage()" size="sm" variant="primary" class="mr-1">
                      <span class="text-nowrap">
                        <feather-icon icon="ArrowRightCircleIcon" />
                        Get Started
                      </span>

                    </b-button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <b-row class="d-flex">
      <b-col md="3">
        <b-card>
          <div class="d-flex justify-content-between" style="text-transform: uppercase; font-weight: 500;">
            Leads
            <div>
              <feather-icon class="cursor-pointer" @click="refreshLeads()" icon="RotateCwIcon" size="20" />
            </div>
          </div>
          <hr style="border-color:#F75949">
          <div class="position-relative">
            <div v-if="spinnerL === true"
              class="shimmer position-absolute h-100 w-100 d-flex justify-content-center align-items-center">
              <b-spinner></b-spinner>
            </div>
            <div id="chart">
              <apexchart type="donut" class="chart2 mb-1" height="180"
                :options="leadsDonut.length === 1 ? donutOptionsEmpty : donutOptions" :series="leadsDonut">
              </apexchart>
            </div>
            <div class="d-flex align-items-center justify-content-between py cursor-pointer b-bottom b-top"
              @mouseover="legendInLeads" @mouseleave="legendOutLeads" id="Overxdue" @click="goToLeadOverdue()">
              <div class="d-flex align-items-center">
                <div class="legend" style="background-color: rgb(255, 165, 0);"></div>Over due
              </div>
              <b-badge class="donut-badge" style="background-color: rgb(255, 165, 0);">{{
                leadsDonut.length > 1 ?
                leadsDonut[0] : 0
              }}</b-badge>
            </div>
            <div class="d-flex align-items-center justify-content-between py cursor-pointer b-bottom"
              @mouseover="legendInLeads" @mouseleave="legendOutLeads" id="Duextoday" @click="goToLeadDueToday()">
              <div class="d-flex align-items-center">
                <div class="legend" style="background-color: rgb(236, 59, 87);"></div>Due today
              </div>
              <b-badge class="donut-badge" style="background-color: rgb(236, 59, 87);">{{
                leadsDonut[1] ? leadsDonut[1] :
                0 }}</b-badge>
            </div>
            <div class="d-flex align-items-center justify-content-between py cursor-pointer b-bottom"
              @mouseover="legendInLeads" @mouseleave="legendOutLeads" id="Duextomorrow" @click="goToLeadDueTomorrow()">
              <div class="d-flex align-items-center">
                <div class="legend" style="background-color: rgb(69, 127, 202);"></div>Due tomorrow
              </div>
              <b-badge class="donut-badge" style="background-color: rgb(69, 127, 202);">{{
                leadsDonut[2] ? leadsDonut[2] :
                0 }}</b-badge>
            </div>
            <div class="d-flex align-items-center justify-content-between py cursor-pointer b-bottom"
              @mouseover="legendInLeads" @mouseleave="legendOutLeads" id="Duexinxaxweek" @click="goToDueThisWeek()">
              <div class="d-flex align-items-center">
                <div class="legend" style="background-color: rgb(158, 158, 158);"></div>Due in a week
              </div>
              <b-badge class="donut-badge" style="background-color: rgb(158, 158, 158);">{{
                leadsDonut[3] ? leadsDonut[3]
                : 0 }}</b-badge>
            </div>
            <div class="d-flex align-items-center justify-content-between py cursor-pointer b-bottom">
              <div class="d-flex align-items-center">
                <div class="legend" style="background-color: transparent;"></div>New & updated
              </div>
              <b-badge class="donut-badge" style="background-color: rgb(92, 184, 92);">{{ newLeads }}</b-badge>
            </div>
            <div class="d-flex align-items-center justify-content-between py cursor-pointer b-bottom"
              @click="goToLeadImportant()">
              <div class="d-flex align-items-center">
                <div class="legend" style="background-color: transparent;"></div>Top priority
              </div>
              <b-badge class="donut-badge" style="background-color: red;">{{ topLeads }}</b-badge>
            </div>
          </div>
        </b-card>
      </b-col>
      <b-col md="3">
        <b-card>
          <div class="d-flex justify-content-between" style="text-transform: uppercase; font-weight: 500;">
            Tasks
            <div>
              <feather-icon class="cursor-pointer" @click="refreshTasks()" icon="RotateCwIcon" size="20" />
            </div>
          </div>
          <hr style="border-color:#F75949">
          <div class="position-relative">
            <div v-if="spinnerT === true"
              class="shimmer position-absolute h-100 w-100 d-flex justify-content-center align-items-center">
              <b-spinner></b-spinner>
            </div>
            <div id="chart">
              <apexchart type="donut" class="chart1 mb-1" height="180"
                :options="tasksDonut.length === 1 ? donutOptionsEmpty : donutOptions" :series="tasksDonut">
              </apexchart>
            </div>
            <div class="d-flex align-items-center justify-content-between py cursor-pointer b-bottom b-top"
              @mouseover="legendInTasks" @mouseleave="legendOutTasks" id="Overxdue" @click="goToTaskOverdue()">
              <div class="d-flex align-items-center">
                <div class="legend" style="background-color: rgb(255, 165, 0);"></div>Over due
              </div>
              <b-badge class="donut-badge" style="background-color: rgb(255, 165, 0);">{{
                tasksDonut.length > 1 ?
                tasksDonut[0] : 0
              }}</b-badge>
            </div>
            <div class="d-flex align-items-center justify-content-between py cursor-pointer b-bottom"
              @mouseover="legendInTasks" @mouseleave="legendOutTasks" id="Duextoday" @click="goToTaskDueToday()">
              <div class="d-flex align-items-center">
                <div class="legend" style="background-color: rgb(236, 59, 87);"></div>Due today
              </div>
              <b-badge class="donut-badge" style="background-color: rgb(236, 59, 87);">{{
                tasksDonut[1] ? tasksDonut[1] :
                0 }}</b-badge>
            </div>
            <div class="d-flex align-items-center justify-content-between py cursor-pointer b-bottom"
              @mouseover="legendInTasks" @mouseleave="legendOutTasks" id="Duextomorrow" @click="goToTaskDueTomorrow()">
              <div class="d-flex align-items-center">
                <div class="legend" style="background-color: rgb(69, 127, 202);"></div>Due tomorrow
              </div>
              <b-badge class="donut-badge" style="background-color: rgb(69, 127, 202);">{{
                tasksDonut[2] ? tasksDonut[2] :
                0 }}</b-badge>
            </div>
            <div class="d-flex align-items-center justify-content-between py cursor-pointer b-bottom"
              @mouseover="legendInTasks" @mouseleave="legendOutTasks" id="Duexinxaxweek" @click="goToTaskDueThisWeek()">
              <div class="d-flex align-items-center">
                <div class="legend" style="background-color: rgb(158, 158, 158);"></div>Due in a week
              </div>
              <b-badge class="donut-badge" style="background-color: rgb(158, 158, 158);">{{
                tasksDonut[3] ? tasksDonut[3]
                : 0 }}</b-badge>
            </div>
            <div class="d-flex align-items-center justify-content-between py cursor-pointer b-bottom">
              <div class="d-flex align-items-center">
                <div class="legend" style="background-color: transparent;"></div>New & updated
              </div>
              <b-badge class="donut-badge" style="background-color: rgb(92, 184, 92);">{{ newTasks }}</b-badge>
            </div>
            <div class="d-flex align-items-center justify-content-between py cursor-pointer b-bottom"
              @click="goToTaskimportant()">
              <div class="d-flex align-items-center">
                <div class="legend" style="background-color: transparent;"></div>Top priority
              </div>
              <b-badge class="donut-badge" style="background-color: red;">{{ topTasks }}</b-badge>
            </div>
          </div>
        </b-card>
      </b-col>
      <b-col md="6 p-bottom">
        <b-card class="h-100 mb-0">
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
                <tr v-if="tasks.allData.length === 0">
                  <td class="pall text-center">No Records Found</td>
                </tr>
                <tr class="b-bottom cursor-pointer" v-else v-for="(task, index) in tasks.showData" :key="index"
                  @click="goToTask(task)">
                  <td class="pall pe-none" v-if="(getCombinedTasks(task).company !== null || getCombinedTasks(task).contact_person !== null)  ">{{  (task.company !== null ? task.company.name : task.contact_person.name) }}</td>
                  <td class="px pe-none">
                    <div class="task-dot bg-primary pe-none"></div>
                  </td>
                  <td class="pall pl-0 pe-none">#{{  task.id }} - {{ (task.subject.length > 50 ? task.subject.substr(0, 50)
                    +
                    '...' : task.subject) }}</td>
                </tr>
              </tbody>
            </table>
            <!-- {{ tasks }} -->
            <b-pagination v-if="tasks.allData.length > 10" v-model="currentPage" :total-rows="tasks.allData.length"
              :per-page="pageSize" align="center" first-number last-number class="mb-0 mt-1" prev-class="prev-item"
              next-class="next-item">
              <template #prev-text>
                <feather-icon icon="ChevronLeftIcon" size="18" />
              </template>
              <template #next-text>
                <feather-icon icon="ChevronRightIcon" size="18" />
              </template>
            </b-pagination>
          </div>
        </b-card>
      </b-col>
    </b-row>
    <b-row>
      <b-col md="12">
        <b-card>
          <div class="d-flex justify-content-between" style="text-transform: uppercase; font-weight: 500;">
            Total Recievables
            <div>
              <feather-icon @click="spinnerP = true; setTimeout(() => { spinnerP = false }, [1000])"
                class="cursor-pointer" icon="RotateCwIcon" size="20" />
            </div>
          </div>
          <hr style="border-color:#F75949">
          <div class="position-relative">
            <div v-if="spinnerP === true"
              class="shimmer position-absolute h-100 w-100 d-flex justify-content-center align-items-center">
              <b-spinner></b-spinner>
            </div>
            <div class="mb-1">Total Receivables ₹ {{ max }}</div>
            <b-progress :max="max">
              <b-progress-bar :value="max / 2" variant="success"></b-progress-bar>
              <b-progress-bar :value="(max / 2) / 2" variant="warning"></b-progress-bar>
              <b-progress-bar :value="(max / 2) / 2" variant="danger"></b-progress-bar>
            </b-progress>
          </div>
        </b-card>
      </b-col>
    </b-row>
    <b-row>
      <b-col md="9">
        <b-card>
          <div class="mb-1">Hours Logged Today</div>
          <b-progress :max="max" class="mb-2">
            <b-progress-bar :value="value" animated></b-progress-bar>
          </b-progress>
          <div class="mb-1">Hours Logged Yesterday</div>
          <b-progress :max="max" class="mb-2">
            <b-progress-bar :value="value" animated></b-progress-bar>
          </b-progress>
          <div class="mb-1">Hours Logged in last week</div>
          <b-progress :max="max" class="mb-2">
            <b-progress-bar :value="value" animated></b-progress-bar>
          </b-progress>
          <div class="mb-1">Hours Logged in last month</div>
          <b-progress :max="max" class="mb-2">
            <b-progress-bar :value="value" animated></b-progress-bar>
          </b-progress>
        </b-card>
      </b-col>
      <b-col md="3">
        <b-row class="d-flex flex-column h-100">
          <b-col md="6" class="mw-100 p-bottom">
            <b-card class="h-100 mb-0">
              <div class="h3">00:00</div>
              <div class="mb-1 h6">Average Daily Hours Logged</div>
              <b-progress :max="max">
                <b-progress-bar :value="0" animated></b-progress-bar>
              </b-progress>
              <small>100% lower than last month</small>
            </b-card>
          </b-col>
          <b-col md="6" class="mw-100 p-bottom">
            <b-card class="h-100 mb-0">
              <div class="h3">1</div>
              <div class="mb-1 h6">Average Daily Tasks Completed</div>
              <b-progress :max="max">
                <b-progress-bar :value="value" animated></b-progress-bar>
              </b-progress>
              <small>16.67% lower than last month</small>
            </b-card>
          </b-col>
        </b-row>
      </b-col>
    </b-row>
    <b-row>
      <b-col md="9">
        <b-card>
          <div class="d-flex justify-content-between salesHeading" style="text-transform: uppercase; font-weight: 500;">
            Sales And Expenses (₹)
            <div>
              <b-dropdown id="file_drop" class="dashBtn" variant="link" right>
                <template #button-content>
                  <span class="text-secondary d-flex align-items-center">
                    {{ currData }} <feather-icon icon="ChevronDownIcon" size="20" />
                  </span>
                </template>
                <b-dropdown-item class="text-lowercase text-capitalize" @click="currData = $event.target.innerText">This
                  Financial Year</b-dropdown-item>
                <b-dropdown-item class="text-lowercase text-capitalize" @click="currData = $event.target.innerText">Last
                  Financial Year</b-dropdown-item>
                <b-dropdown-item class="text-lowercase text-capitalize" @click="updateChart">Past 12
                  Months</b-dropdown-item>
              </b-dropdown>
            </div>
          </div>
          <hr style="border-color:#F75949">
          <div id="chart">
            <apexchart ref="barChart" type="bar" height="400" :options="chartOptions" :series="series"></apexchart>
          </div>
        </b-card>
      </b-col>
      <b-col md="3">
        <b-row class="d-flex flex-column h-100">
          <b-col md="4" class="mw-100 p-bottom">
            <b-card class="h-100 mb-0">
              <div class="h3">00:00</div>
              <div class="mb-1 h6">Total Sales</div>
              <b-progress :max="max">
                <b-progress-bar :value="value" variant="success" animated></b-progress-bar>
              </b-progress>
              <small>15.36% higher than previous 1</small>
            </b-card>
          </b-col>
          <b-col md="4" class="mw-100 p-bottom">
            <b-card class="h-100 mb-0">
              <div class="h3">1</div>
              <div class="mb-1 h6">Total Receipts</div>
              <b-progress :max="max">
                <b-progress-bar :value="value" variant="success" animated></b-progress-bar>
              </b-progress>
              <small>15.14% higher than previous 1</small>
            </b-card>
          </b-col>
          <b-col md="4" class="mw-100 p-bottom">
            <b-card class="h-100 mb-0">
              <div class="h3">1</div>
              <div class="mb-1 h6">Total Expenses</div>
              <b-progress :max="max">
                <b-progress-bar :value="value" animated></b-progress-bar>
              </b-progress>
              <small>28.97% lower than previous 12</small>
            </b-card>
          </b-col>
        </b-row>
      </b-col>
    </b-row>
    <b-row>
      <b-col md="12">
        <b-card>
          <div class="d-flex justify-content-between" style="text-transform: uppercase; font-weight: 500;">
            Sales, Receipts And Dues
            <div>
              <feather-icon class="cursor-pointer" @click="refreshSales()" icon="RotateCwIcon" size="20" />
            </div>
          </div>
          <hr style="border-color:#F75949">
          <div class="position-relative">
            <div v-if="spinnerS === true"
              class="shimmer position-absolute h-100 w-100 d-flex justify-content-center align-items-center">
              <b-spinner></b-spinner>
            </div>
            <table class="w-100">
              <thead class="b-bottom">
                <th></th>
                <th class="py" v-for="(field, index) in fields" :key="index">{{ field }}</th>
              </thead>
              <tbody>
                <tr class="b-bottom" v-for="(item, index) in items" :key="index">
                  <td class="py">{{ item.time }}</td>
                  <td class="py">0</td>
                  <td class="py">{{ item.amount }}</td>
                  <td class="py">{{ item.reciept }}</td>
                  <td class="py">{{ item.closingDue }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { ref } from "@vue/composition-api";
import { BButton, BImg, BPagination, BSpinner, BAvatar, BCard, BCardText, BLink, BRow, BCol, BProgressBar, BProgress, BTable, BBadge, BDropdown, BDropdownItem } from "bootstrap-vue";
import Vue from "vue";
import VueApexCharts from 'vue-apexcharts'

Vue.use(VueApexCharts);

Vue.component('apexchart', VueApexCharts)

export default {
  components: {
    BButton,
    BCard,
    BPagination,
    BSpinner,
    BImg,
    BAvatar,
    BCardText,
    BLink,
    BRow,
    BCol,
    Vue,
    BProgressBar,
    BProgress,
    BTable,
    BBadge,
    BDropdown,
    BDropdownItem
  },
  data() {
    const date = new Date();

    let days = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

    let day = date.getDate();
    let month = days[date.getMonth()];
    let monthNo = date.getMonth() + 1;
    let year = date.getFullYear();

    return {
      previleges: {
     
        viewAll: null,
       
      },
      pageSize: 9,
      spinnerL: false,
      spinnerT: false,
      spinnerP: false,
      spinnerS: false,
      currData: 'This Financial Year',
      amount: [],
      reciept: [],
      topLeads: 0,
      topTasks: 0,
      newLeads: 0,
      newTasks: 0,
      day: day,
      month: month,
      monthNo: monthNo,
      year: year,
      fields: ['Opening Due (₹)', 'Sales (₹)', 'Receipts (₹)', 'Closing Due (₹)'],
      value: 1,
      max: 7,
      leadsDonut: [],
      tasksDonut: [],
      donutOptions: {
        chart: {
          type: 'donut',
        },
        labels: ['Over due', 'Due today', 'Due tomorrow', 'Due in a week'],
        fill: {
          colors: ['rgb(255, 165, 0)', 'rgb(236, 59, 87)', 'rgb(69, 127, 202)', 'rgb(158, 158, 158)']
        },
        // responsive: true,
        legend: {
          show: false,
        },
        dataLabels: {
          enabled: false
        },
        plotOptions: {
          pie: {
            donut: {
              size: '50%'
            }
          }
        }
      },
      donutOptionsEmpty: {
        chart: {
          type: 'donut',
        },
        labels: ['No Data Found'],
        fill: {
          colors: ['#f0f0f0']
        },
        // responsive: true,
        legend: {
          show: false,
        },
        dataLabels: {
          enabled: false
        },
        plotOptions: {
          pie: {
            donut: {
              size: '50%'
            }
          }
        },
        states: {
          hover: {
            filter: {
              type: 'none',
            },
          },
        },
        tooltip: {
          custom: function ({ series, seriesIndex, dataPointIndex, w }) {
            return '<div class="pall">No records found</div>';
          }
        }
      },
      // series: [{
      //   name: 'Sales',
      //   data: []
      // }, {
      //   name: 'Reciepts',
      //   data: []
      // }, {
      //   name: 'Expenses',
      //   data: [35, 41, 36, 26, 45, 48, 52, 53, 41]
      // }],
      chartOptions: {
        chart: {
          type: 'bar',
          height: 200
        },
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: '55%',
          },
        },
        dataLabels: {
          enabled: false
        },
        legend: {
          position: 'top'
        },
        stroke: {
          show: true,
          width: 2,
          colors: ['transparent']
        },
        xaxis: {
          categories: ['Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar'],
        },
        yaxis: {
        },
        fill: {
          opacity: 1
        },
        tooltip: {
          y: {
            formatter: function (val) {
              return "$ " + val + " thousands"
            }
          }
        }
      }
    }
  },
  methods: {
    getCombinedTasks(task){
      let data = null
      if(task.task_id){
        if(this.$store.state.leads.all.filter(e => e.id === task.task_id).length > 0){

          data = this.$store.state.leads.all.filter(e => e.id === task.task_id)[0]
        }
      }else{
        if(this.$store.state.leads.all.filter(e => e.id === task.id).length > 0){

          data = this.$store.state.leads.all.filter(e => e.id === task.id)[0] 
        }

      }
 
        return data;
      
    },
    DaysLeft(start, end) {
      // const startDate = start
      const endDate = end;
      if (new Date(endDate).getDate() === new Date().getDate()) {

        var diffInMs = new Date(endDate) - new Date();
        diffInMs = Math.round(diffInDays);
        // eslint-disable-next-line no-bitwise
        return diffInMs | 0;
      } else {
        var diffInMs = new Date(endDate) - new Date();

        var diffInDays = diffInMs / (1000 * 60 * 60 * 24);
        diffInDays = Math.round(diffInDays);
        // eslint-disable-next-line no-bitwise
        return diffInDays | 0;
      }
      // const diffInMs = new Date(endDate) - new Date();
      // var diffInDays = diffInMs / (1000 * 60 * 60 * 24);
      // diffInDays = Math.round(diffInDays);
      // // eslint-disable-next-line no-bitwise
      // return diffInDays | 0;
    },
    journeyPage() {
      this.$router.push({ name: 'GettingStarted' })
    },
    getAllTasks2() {
      // this.$store.dispatch('tasks/fetch').then(() => {
        this.spinnerT = true
      let date = new Date();

      let day = date.getDate();

      let data = []//this.$store.state.leads.all.filter(e => e.type === 'task')
      if(this.previleges.viewAll){
        data = this.$store.state.leads.all.filter(e => e.type === 'task');
      
          
      }else{
        // if (this.$store.state.users.all.filter(e => e.email === JSON.parse(localStorage.getItem('userData')).email)[0].user_role_id === 1) {
        //     data = this.$store.state.tasks.all.filter(e => e.type === 'task')//.filter(e => e.type === 'task');
        //     // items = this
        //   } else {

            this.$store.state.leads.all.filter(e => e.type === 'task')//.filter(e => e.type === 'task')
            .forEach(a => {
              if (a.users.filter(e => e.email === JSON.parse(localStorage.getItem('userData')).email).length > 0) {
                data.push(a)
              }
            })
          // }
      }
      let over_due = 0;
      let due_tod = 0;
      let due_tom = 0;
      let due_week = 0;
      data.forEach((x) => {
        x.priority > 3 ? this.topTasks = this.topTasks + 1 : null;
        console.log(new Date(x.due_date), 'kkkkkkkk')
        if (new Date(x.due_date).getDate() - day < 0) {
          over_due = over_due + 1;
        }
        else if (new Date(x.due_date).getDate() === day) {
          due_tod = due_tod + 1;
        }
        else if (new Date(x.due_date).getDate() === day + 1) {
          due_tom = due_tom + 1;
        }
        else if (new Date(x.due_date).getDate() < day + 7) {
          due_week = due_week + 1;
        }
      })
      console.log([over_due, due_tod, due_tom, due_week], 'mmmmmm')
      if (over_due === 0 && due_tod === 0 && due_tom === 0 && due_week === 0) {
        this.tasksDonut = [1]
      }
      else {
        this.tasksDonut = [over_due, due_tod, due_tom, due_week]
      }
      this.spinnerT = false
      // })
    },
    getAllLeads2() {
      // this.$store.dispatch('leads/fetch').then(() => {
      const date = new Date();

      var day = date.getDate();
      let data = []
      
      if(this.previleges.viewAll){
        data = this.$store.state.leads.all.filter(e => e.type === 'lead');
      
          
      }else{
        // if (this.$store.state.users.all.filter(e => e.email === JSON.parse(localStorage.getItem('userData')).email)[0].user_role_id === 1) {
        //     data = this.$store.state.tasks.all.filter(e => e.type === 'task')//.filter(e => e.type === 'task');
        //     // items = this
        //   } else {

            this.$store.state.leads.all.filter(e => e.type === 'lead')//.filter(e => e.type === 'task')
            .forEach(a => {
              if (a.users.filter(e => e.email === JSON.parse(localStorage.getItem('userData')).email).length > 0) {
                data.push(a)
              }
            })
          // }
      }
      // alert(data.length)
      let over_due = 0;
      let due_tod = 0;
      let due_tom = 0;
      let due_week = 0;
      data.forEach((x) => {
        x.priority > 3 ? this.topLeads = this.topLeads + 1 : null;
        if (this.DaysLeft(x.created_at, x.due_date) < 0) {
          over_due = over_due + 1;
        }
        else if (new Date(x.due_date).getDate() === day) {
          due_tod = due_tod + 1;
        }
        else if (new Date(x.due_date).getDate() === day + 1) {
          due_tom = due_tom + 1;
        }
        else if (new Date(x.due_date).getDate() < day + 7) {
          due_week = due_week + 1;
        }
      })
      console.log(over_due, due_tod, due_tom, due_week, 'ssssssssss')
      if (over_due === 0 && due_tod === 0 && due_tom === 0 && due_week === 0) {
        this.leadsDonut = [1]
        // return
      }
      else {
        this.leadsDonut = [over_due, due_tod, due_tom, due_week]
        // return

      }
      // })
    },
    getAllInvoice() {
      this.$store.dispatch(`invoice/fetch`).then(() => {
        let date = new Date();
        let firstDayWeek = new Date(date.setDate(date.getDate() - date.getDay()));
        let lastDayWeek = new Date(date.setDate(date.getDate() - date.getDay() + 6));
        let currQuarter = Math.floor((date.getMonth() / 3));
        let firstDayQuarter = new Date(date.getFullYear(), currQuarter * 3, 1);
        let lastDayQuarter = new Date(firstDayQuarter.getFullYear(), firstDayQuarter.getMonth() + 3, 0);
        if (date.getMonth() > 3) {
          var firstDayYear = new Date(date.getFullYear(), 3, 1);
          var lastDayYear = new Date(firstDayYear.getFullYear() + 1, 3, 0);
        }
        else if (date.getMonth() < 3) {
          var firstDayYear = new Date(date.getFullYear() - 1, 3, 1);
          var lastDayYear = new Date(firstDayYear.getFullYear() + 1, 3, 0);
        }
        let today = 0;
        let week = 0;
        let month = 0
        let lastMonth = 0;
        let quarter = 0;
        let year = 0;
        let lastYear = 0;
        this.$store.state.invoice.allData.forEach(x => {
          let updated = new Date(x.updated_at.slice(0, 10))
          if (updated - date === 0) {
            today = today + Math.round(x.amount);
          }
          else if (new Date(firstDayWeek.getFullYear(), firstDayWeek.getMonth(), firstDayWeek.getDate() + 1) <= updated && updated <= new Date(lastDayWeek.getFullYear(), lastDayWeek.getMonth(), lastDayWeek.getDate() + 1)) {
            week = week + Math.round(x.amount);
          }
          else if (new Date(date.getFullYear(), date.getMonth(), 1) <= updated && updated <= new Date(date.getFullYear(), date.getMonth() + 1, 0)) {
            month = month + Math.round(x.amount);
          }
          else if (new Date(date.getFullYear(), date.getMonth() - 1, 1) <= updated && updated < new Date(date.getFullYear(), date.getMonth(), 1)) {
            lastMonth = lastMonth + Math.round(x.amount);
          }
          else if (firstDayQuarter <= updated && updated <= lastDayQuarter) {
            quarter = quarter + Math.round(x.amount);
          }
          else if (firstDayYear <= updated && updated <= lastDayYear) {
            year = year + Math.round(x.amount);
          }
          else if (new Date(firstDayYear.getFullYear() - 1, 3, 1) <= updated && updated <= new Date(firstDayYear.getFullYear(), 3, 0)) {
            lastYear = lastYear + Math.round(x.amount);
          }
        })
        this.amount = [today, week, month, lastMonth, quarter, year, lastYear];
      })
    },
    getAllPayments() {
      this.$store.dispatch(`recordPayment/fetch`).then(() => {
        let date = new Date();
        let firstDayWeek = new Date(date.setDate(date.getDate() - date.getDay()));
        let lastDayWeek = new Date(date.setDate(date.getDate() - date.getDay() + 6));
        let currQuarter = Math.floor((date.getMonth() / 3));
        let firstDayQuarter = new Date(date.getFullYear(), currQuarter * 3, 1);
        let lastDayQuarter = new Date(firstDayQuarter.getFullYear(), firstDayQuarter.getMonth() + 3, 0);
        if (date.getMonth() > 3) {
          var firstDayYear = new Date(date.getFullYear(), 3, 1);
          var lastDayYear = new Date(firstDayYear.getFullYear() + 1, 3, 0);
        }
        else if (date.getMonth() < 3) {
          var firstDayYear = new Date(date.getFullYear() - 1, 3, 1);
          var lastDayYear = new Date(firstDayYear.getFullYear() + 1, 3, 0);
        }
        let today = 0;
        let week = 0;
        let month = 0
        let lastMonth = 0;
        let quarter = 0;
        let year = 0;
        let lastYear = 0;
        this.$store.state.recordPayment.allData.forEach(x => {
          x.record_pay_invoice.forEach(y => {
            let updated = new Date(y.created_at.slice(0, 10))
            if (updated - date === 0) {
              today = today + Math.round(y.paid_amount);
            }
            else if (new Date(firstDayWeek.getFullYear(), firstDayWeek.getMonth(), firstDayWeek.getDate() + 1) <= updated && updated <= new Date(lastDayWeek.getFullYear(), lastDayWeek.getMonth(), lastDayWeek.getDate() + 1)) {
              week = week + Math.round(y.paid_amount);
            }
            else if (new Date(date.getFullYear(), date.getMonth(), 1) <= updated && updated <= new Date(date.getFullYear(), date.getMonth() + 1, 0)) {
              month = month + Math.round(y.paid_amount);
            }
            else if (new Date(date.getFullYear(), date.getMonth() - 1, 1) <= updated && updated < new Date(date.getFullYear(), date.getMonth(), 1)) {
              lastMonth = lastMonth + Math.round(y.paid_amount);
            }
            else if (firstDayQuarter <= updated && updated <= lastDayQuarter) {
              quarter = quarter + Math.round(y.paid_amount);
            }
            else if (firstDayYear <= updated && updated <= lastDayYear) {
              year = year + Math.round(y.paid_amount);
            }
            else if (new Date(firstDayYear.getFullYear() - 1, 3, 1) <= updated && updated <= new Date(firstDayYear.getFullYear(), 3, 0)) {
              lastYear = lastYear + Math.round(y.paid_amount);
            }
          })
        })
        this.reciept = [today, week, month, lastMonth, quarter, year, lastYear];

      })
    },
    refreshSales() {
      this.spinnerS = true
      this.$store.dispatch(`invoice/fetch`).then(() => {
        let date = new Date();
        let firstDayWeek = new Date(date.setDate(date.getDate() - date.getDay()));
        let lastDayWeek = new Date(date.setDate(date.getDate() - date.getDay() + 6));
        let currQuarter = Math.floor((date.getMonth() / 3));
        let firstDayQuarter = new Date(date.getFullYear(), currQuarter * 3, 1);
        let lastDayQuarter = new Date(firstDayQuarter.getFullYear(), firstDayQuarter.getMonth() + 3, 0);
        if (date.getMonth() > 3) {
          var firstDayYear = new Date(date.getFullYear(), 3, 1);
          var lastDayYear = new Date(firstDayYear.getFullYear() + 1, 3, 0);
        }
        else if (date.getMonth() < 3) {
          var firstDayYear = new Date(date.getFullYear() - 1, 3, 1);
          var lastDayYear = new Date(firstDayYear.getFullYear() + 1, 3, 0);
        }
        let today = 0;
        let week = 0;
        let month = 0
        let lastMonth = 0;
        let quarter = 0;
        let year = 0;
        let lastYear = 0;
        this.$store.state.invoice.allData.forEach(x => {
          let updated = new Date(x.updated_at.slice(0, 10))
          if (updated - date === 0) {
            today = today +Math.round( x.amount);
          }
          else if (new Date(firstDayWeek.getFullYear(), firstDayWeek.getMonth(), firstDayWeek.getDate() + 1) <= updated && updated <= new Date(lastDayWeek.getFullYear(), lastDayWeek.getMonth(), lastDayWeek.getDate() + 1)) {
            week = week +Math.round( x.amount);
          }
          else if (new Date(date.getFullYear(), date.getMonth(), 1) <= updated && updated <= new Date(date.getFullYear(), date.getMonth() + 1, 0)) {
            month = month +Math.round( x.amount);
          }
          else if (new Date(date.getFullYear(), date.getMonth() - 1, 1) <= updated && updated < new Date(date.getFullYear(), date.getMonth(), 1)) {
            lastMonth = lastMonth +Math.round( x.amount);
          }
          else if (firstDayQuarter <= updated && updated <= lastDayQuarter) {
            quarter = quarter +Math.round( x.amount);
          }
          else if (firstDayYear <= updated && updated <= lastDayYear) {
            year = year +Math.round( x.amount);
          }
          else if (new Date(firstDayYear.getFullYear() - 1, 3, 1) <= updated && updated <= new Date(firstDayYear.getFullYear(), 3, 0)) {
            lastYear = lastYear +Math.round( x.amount);
          }
        })
        this.amount = [today, week, month, lastMonth, quarter, year, lastYear];
      })
      this.$store.dispatch(`recordPayment/fetch`).then(() => {
        let date = new Date();
        let firstDayWeek = new Date(date.setDate(date.getDate() - date.getDay()));
        let lastDayWeek = new Date(date.setDate(date.getDate() - date.getDay() + 6));
        let currQuarter = Math.floor((date.getMonth() / 3));
        let firstDayQuarter = new Date(date.getFullYear(), currQuarter * 3, 1);
        let lastDayQuarter = new Date(firstDayQuarter.getFullYear(), firstDayQuarter.getMonth() + 3, 0);
        if (date.getMonth() > 3) {
          var firstDayYear = new Date(date.getFullYear(), 3, 1);
          var lastDayYear = new Date(firstDayYear.getFullYear() + 1, 3, 0);
        }
        else if (date.getMonth() < 3) {
          var firstDayYear = new Date(date.getFullYear() - 1, 3, 1);
          var lastDayYear = new Date(firstDayYear.getFullYear() + 1, 3, 0);
        }
        let today = 0;
        let week = 0;
        let month = 0
        let lastMonth = 0;
        let quarter = 0;
        let year = 0;
        let lastYear = 0;
        this.$store.state.recordPayment.allData.forEach(x => {
          x.record_pay_invoice.forEach(y => {
            let updated = new Date(y.created_at.slice(0, 10))
            if (updated - date === 0) {
              today = today + Math.round(y.paid_amount);
            }
            else if (new Date(firstDayWeek.getFullYear(), firstDayWeek.getMonth(), firstDayWeek.getDate() + 1) <= updated && updated <= new Date(lastDayWeek.getFullYear(), lastDayWeek.getMonth(), lastDayWeek.getDate() + 1)) {
              week = week + Math.round(y.paid_amount);
            }
            else if (new Date(date.getFullYear(), date.getMonth(), 1) <= updated && updated <= new Date(date.getFullYear(), date.getMonth() + 1, 0)) {
              month = month + Math.round(y.paid_amount);
            }
            else if (new Date(date.getFullYear(), date.getMonth() - 1, 1) <= updated && updated < new Date(date.getFullYear(), date.getMonth(), 1)) {
              lastMonth = lastMonth + Math.round(y.paid_amount);
            }
            else if (firstDayQuarter <= updated && updated <= lastDayQuarter) {
              quarter = quarter + Math.round(y.paid_amount);
            }
            else if (firstDayYear <= updated && updated <= lastDayYear) {
              year = year + Math.round(y.paid_amount);
            }
            else if (new Date(firstDayYear.getFullYear() - 1, 3, 1) <= updated && updated <= new Date(firstDayYear.getFullYear(), 3, 0)) {
              lastYear = lastYear + Math.round(y.paid_amount);
            }
          })
        })
        this.reciept = [Math.round(today), Math.round(week), Math.round(month), Math.round(lastMonth), Math.round(quarter), Math.round(year), Math.round(lastYear)];
        this.spinnerS = false
      })
    },
    refreshTasks() {
      this.spinnerT = true
      this.topTasks = 0
      this.$store.dispatch('tasks/fetch').then(() => {
        let date = new Date();

        let day = date.getDate();

        let data = []//this.$store.state.leads.all.filter(e => e.type === 'task')
        if(this.previleges.viewAll){
        data = this.$store.state.leads.all.filter(e => e.type === 'task');
      
          
      }else{
        // if (this.$store.state.users.all.filter(e => e.email === JSON.parse(localStorage.getItem('userData')).email)[0].user_role_id === 1) {
        //     data = this.$store.state.tasks.all.filter(e => e.type === 'task')//.filter(e => e.type === 'task');
        //     // items = this
        //   } else {

            this.$store.state.leads.all.filter(e => e.type === 'task')//.filter(e => e.type === 'task')
            .forEach(a => {
              if (a.users.filter(e => e.email === JSON.parse(localStorage.getItem('userData')).email).length > 0) {
                data.push(a)
              }
            })
          // }
      }
        let over_due = 0;
        let due_tod = 0;
        let due_tom = 0;
        let due_week = 0;
        data.forEach((x) => {
          x.priority > 3 ? this.topTasks = this.topTasks + 1 : null;
          console.log(new Date(x.due_date), 'kkkkkkkk')
          if (new Date(x.due_date).getDate() - day < 0) {
            over_due = over_due + 1;
          }
          else if (new Date(x.due_date).getDate() === day) {
            due_tod = due_tod + 1;
          }
          else if (new Date(x.due_date).getDate() === day + 1) {
            due_tom = due_tom + 1;
          }
          else if (new Date(x.due_date).getDate() < day + 7) {
            due_week = due_week + 1;
          }
        })
        console.log([over_due, due_tod, due_tom, due_week], 'mmmmmm')
        if (over_due === 0 && due_tod === 0 && due_tom === 0 && due_week === 0) {
          this.tasksDonut = [1]
        }
        else {
          this.tasksDonut = [over_due, due_tod, due_tom, due_week]
        }
        this.spinnerT = false
      })
    },
    refreshLeads() {

      this.spinnerL = true
      this.topLeads = 0
      this.$store.dispatch('leads/fetch').then(() => {
        const date = new Date();

        let day = date.getDate();
        console.log('date after 7', day + 7);
        let data = []//this.$store.state.leads.all.filter(e => e.type !== "task")
        if(this.previleges.viewAll){
        data = this.$store.state.leads.all.filter(e => e.type === 'lead');
      
          
      }else{
        // if (this.$store.state.users.all.filter(e => e.email === JSON.parse(localStorage.getItem('userData')).email)[0].user_role_id === 1) {
        //     data = this.$store.state.tasks.all.filter(e => e.type === 'task')//.filter(e => e.type === 'task');
        //     // items = this
        //   } else {

            this.$store.state.leads.all.filter(e => e.type === 'lead')//.filter(e => e.type === 'task')
            .forEach(a => {
              if (a.users.filter(e => e.email === JSON.parse(localStorage.getItem('userData')).email).length > 0) {
                data.push(a)
              }
            })
          // }
      }
        let over_due = 0;
        let due_tod = 0;
        let due_tom = 0;
        let due_week = 0;
        data.forEach((x) => {
          x.priority > 3 ? this.topLeads = this.topLeads + 1 : null;
          if (this.DaysLeft(x.created_at, x.due_date) < 0) {
            over_due = over_due + 1;
          }
          else if (new Date(x.due_date).getDate() === day) {
            due_tod = due_tod + 1;
          }
          else if (new Date(x.due_date).getDate() === day + 1) {
            due_tom = due_tom + 1;
          }
          else if (new Date(x.due_date).getDate() < day + 7) {
            due_week = due_week + 1;
          }
        })
        console.log(over_due, due_tod, due_tom, due_week, 'ssssssssss')
        if (over_due === 0 && due_tod === 0 && due_tom === 0 && due_week === 0) {
          this.leadsDonut = [1]
        }
        else {
          this.leadsDonut = [over_due, due_tod, due_tom, due_week]
        }
        this.spinnerL = false
      })
    },
    updateChart(event) {
      this.currData = event.target.innerText;
      let date = new Date();
      let minusDate = new Date(date.setMonth(date.getMonth() - 12));
      let startDate = new Date(minusDate.getFullYear(), minusDate.getMonth(), 1)
      let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
      this.$refs.barChart.updateOptions({
        xaxis: {
          categories: [months[startDate.getMonth()], months[startDate.getMonth() + 1], months[startDate.getMonth() + 2], months[startDate.getMonth() + 3], months[startDate.getMonth() + 4], months[startDate.getMonth() + 5], months[startDate.getMonth() + 6], months[startDate.getMonth() + 7], months[startDate.getMonth() + 8], months[startDate.getMonth() + 9], months[startDate.getMonth() + 10], months[startDate.getMonth() + 11]]
        }
      })
    },
    goToLeadOverdue() {

        
      this.$router.push({

        name: 'leads',
        params: {

          overdue_status: true,


        }
      }
      )

    },
    goToLeadDueToday() {
      this.$router.push({

        name: 'leads',
        params: {

          dueToday_status: true,


        }
      }
      )
    },
    goToLeadImportant() {
      this.$router.push({

        name: 'leads',
        params: {

          important_status: true,


        }
      }
      )
    },
    goToLeadDueTomorrow() {
      this.$router.push({

        name: 'leads',
        params: {

          dueTomorrow_status: true,


        }
      }
      )
    },
    goToDueThisWeek() {
      this.$router.push({

        name: 'leads',
        params: {

          dueThisWeek_status: true,


        }
      }
      )
    },
    goToTaskOverdue() {
      this.$router.push({

        name: 'tasks',
        params: {

          overdueTask_status: true,


        }
      }
      )
    },
    goToTaskDueToday() {
      this.$router.push({

        name: 'tasks',
        params: {

          dueToday_status: true,


        }
      }
      )
    },
    goToTaskDueTomorrow() {
      this.$router.push({

        name: 'tasks',
        params: {

          dueTomorrow_status: true,


        }
      }
      )
    },
    goToTaskimportant() {
      this.$router.push({

        name: 'tasks',
        params: {

          important_status: true,


        }
      }
      )
    },
    goToTaskDueThisWeek() {
      this.$router.push({

        name: 'tasks',
        params: {

          taskDueThisWeek_status: true,


        }
      }
      )
    },
    goToTask(task) {
      console.log('yyyy')
      // if(task.task_id){
      //   if(this.$store.state.leads.all.filter(e => e.id === task.task_id)[0].type === 'task'){
      //     this.$router.push({
      //     name: 'tasks',
      //     params: {
      //       status: true,
      //       lead_id: task.task_id? task.task_id: task.id
      //     }
      //   })
      //   }else{
      //     this.$router.push({
      //     name: 'leads',
      //     params: {
      //       status: true,
      //       lead_id: task.task_id? task.task_id: task.id
      //     }
      //   })
      //   }
      // }else{

      
      if (task.type === 'task') {

        this.$router.push({
          name: 'tasks',
          params: {
            status: true,
            lead_id:  task.id
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
    // }
    },
    getDayname(dayno) {
      var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

      return days[dayno];
    },
    legendInLeads(event) {
      if (+event.currentTarget.querySelector('.donut-badge').innerText > 0) {
        const elms = document.querySelector(`.chart2`).querySelectorAll('.apexcharts-pie-series');
        const elmsArr = Array.from(elms);
        elmsArr.forEach((x, i) => {
          if (x.getAttribute('seriesName') !== event.currentTarget.id) {
            x.classList.add('legend-mouseover-inactive')
          }
        });
      }
    },
    legendOutLeads(event) {
      if (+event.currentTarget.querySelector('.donut-badge').innerText > 0) {
        const elms = document.querySelector('.chart2').querySelectorAll('.apexcharts-pie-series');
        const elmsArr = Array.from(elms);
        elmsArr.forEach((x, i) => {
          if (x.getAttribute('seriesName') !== event.currentTarget.id.replace(' ', 'x')) {
            x.classList.remove('legend-mouseover-inactive')
          }
        });
      }
    },
    legendInTasks(event) {
      if (+event.currentTarget.querySelector('.donut-badge').innerText > 0) {
        const elms = document.querySelector('.chart1').querySelectorAll('.apexcharts-pie-series');
        const elmsArr = Array.from(elms);
        elmsArr.forEach((x, i) => {
          if (x.getAttribute('seriesName') !== event.currentTarget.id) {
            x.classList.add('legend-mouseover-inactive')
          }
        });
      }
    },
    legendOutTasks(event) {
      if (+event.currentTarget.querySelector('.donut-badge').innerText > 0) {
        const elms = document.querySelector(`.chart1`).querySelectorAll('.apexcharts-pie-series');
        const elmsArr = Array.from(elms);
        elmsArr.forEach((x, i) => {
          if (x.getAttribute('seriesName') !== event.currentTarget.id) {
            x.classList.remove('legend-mouseover-inactive')
          }
        });
      }
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

        // console.log(arr, "ppppppppppp");

        arr.forEach((x) => {
          // console.log(x.name === "Leads Editing", "nnnnnnnnnn");
          // if (x.name === "Leads Editing") {
          //   if (x.status === 'active') {
          //     data.edit = true;
          //   }
          // }
            if (x.name === "View All Leads") {
            if (x.status === 'active') {
              data.viewAll = true;
            }else{
              data.viewAll = false;

            }
          // } else if (x.name === "Leads On Row Editing") {
          //   if (x.status === 'active') {
          //     data.onRowEdit = true;
          //   }
          // } else if (x.name === "Leads Conversion") {
          //   if (x.status === 'active') {
          //     data.conversion = true;
          //   }
          // } else if (x.name === "Client Contact Details") {
          //   if (x.status === 'active') {
          //     data.clientDetails = true;
          //   }
          // } else if (x.name === "Timesheet") {
          //   if (x.status === 'active') {
          //     data.timeSheet = true;
          //   }
          // } else if (x.name === "Checklist") {
          //   if (x.status === 'active') {
          //     data.checklist = true;
          //   }
          // } else if (x.name === "Leads Delete") {
          //   if (x.status === 'active') {
          //     data.delete = true;
          //   }
          // } else if (x.name === "Leads Download") {
          //   if (x.status === 'active') {
          //     data.download = true;
          //   }
          }
        
        });
      }
      // console.log(data, "dddddddddd");
      return data;
    },
  },
  computed: {
  
    series() {
      var d1 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      var d2 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      var d3 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      if (this.currData === ("This Financial Year" || "Last Financial Year")) {
        let date = new Date();
        if (this.currData === "This Financial Year") {
          if (date.getMonth() > 3) {
            var year = date.getFullYear() + 1
          }
          else if (date.getMonth() < 3) {
            var year = date.getFullYear()
          }
        }
        else if (this.currData === "Last Financial Year") {
          if (date.getMonth() > 3) {
            var year = date.getFullYear()
          }
          else if (date.getMonth() < 3) {
            var year = date.getFullYear() - 1
          }
        }
        this.$store.state.invoice.allData.forEach(x => {
          let updated = new Date(x.updated_at.slice(0, 10))
          updated.setHours(0, 0, 0, 0);
          if (new Date(year - 1, 3, 1) <= updated && new Date(year - 1, 4, 0) >= updated) {
            d1[0] = d1[0] + x.amount
          }
          else if (new Date(year - 1, 4, 1) <= updated && new Date(year - 1, 5, 0) >= updated) {
            d1[1] = d1[1] + x.amount
          }
          else if (new Date(year - 1, 5, 1) <= updated && new Date(year - 1, 6, 0) >= updated) {
            d1[2] = d1[2] + x.amount
          }
          else if (new Date(year - 1, 6, 1) <= updated && new Date(year - 1, 7, 0) >= updated) {
            d1[3] = d1[3] + x.amount
          }
          else if (new Date(year - 1, 7, 1) <= updated && new Date(year - 1, 8, 0) >= updated) {
            d1[4] = d1[4] + x.amount
          }
          else if (new Date(year - 1, 8, 1) <= updated && new Date(year - 1, 9, 0) >= updated) {
            d1[5] = d1[5] + x.amount
          }
          else if (new Date(year - 1, 9, 1) <= updated && new Date(year - 1, 10, 0) >= updated) {
            d1[6] = d1[6] + x.amount
          }
          else if (new Date(year - 1, 10, 1) <= updated && new Date(year - 1, 11, 0) >= updated) {
            d1[7] = d1[7] + x.amount
          }
          else if (new Date(year - 1, 11, 1) <= updated && new Date(year, 0, 0) >= updated) {
            d1[8] = d1[8] + x.amount
          }
          else if (new Date(year, 0, 1) <= updated && new Date(year, 1, 0) >= updated) {
            d1[9] = d1[9] + x.amount
          }
          else if (new Date(year, 1, 1) <= updated && new Date(year, 2, 0) >= updated) {
            d1[10] = d1[10] + x.amount
          }
          else if (new Date(year, 2, 1) <= updated && new Date(year, 3, 0) >= updated) {
            d1[11] = d1[11] + x.amount
          }
        })
        this.$store.state.recordPayment.allData.forEach(x => {
          x.record_pay_invoice.forEach(y => {
            let updated = new Date(y.created_at.slice(0, 10))
            updated.setHours(0, 0, 0, 0);
            if (new Date(year - 1, 3, 1) <= updated && new Date(year - 1, 4, 0) >= updated) {
              d2[0] = d2[0] + Math.round(y.paid_amount)
            }
            else if (new Date(year - 1, 4, 1) <= updated && new Date(year - 1, 5, 0) >= updated) {
              d2[1] = d2[1] + Math.round(y.paid_amount)
            }
            else if (new Date(year - 1, 5, 1) <= updated && new Date(year - 1, 6, 0) >= updated) {
              d2[2] = d2[2] + Math.round(y.paid_amount)
            }
            else if (new Date(year - 1, 6, 1) <= updated && new Date(year - 1, 7, 0) >= updated) {
              d2[3] = d2[3] + Math.round(y.paid_amount)
            }
            else if (new Date(year - 1, 7, 1) <= updated && new Date(year - 1, 8, 0) >= updated) {
              d2[4] = d2[4] + Math.round(y.paid_amount)
            }
            else if (new Date(year - 1, 8, 1) <= updated && new Date(year - 1, 9, 0) >= updated) {
              d2[5] = d2[5] + Math.round(y.paid_amount)
            }
            else if (new Date(year - 1, 9, 1) <= updated && new Date(year - 1, 10, 0) >= updated) {
              d2[6] = d2[6] + Math.round(y.paid_amount)
            }
            else if (new Date(year - 1, 10, 1) <= updated && new Date(year - 1, 1, 0) >= updated) {
              d2[7] = d2[7] + Math.round(y.paid_amount)
            }
            else if (new Date(year - 1, 11, 1) <= updated && new Date(year, 0, 0) >= updated) {
              d2[8] = d2[8] + Math.round(y.paid_amount)
            }
            else if (new Date(year, 0, 1) <= updated && new Date(year, 1, 0) >= updated) {
              d2[9] = d2[9] + Math.round(y.paid_amount)
            }
            else if (new Date(year, 1, 1) <= updated && new Date(year, 2, 0) >= updated) {
              d2[10] = d2[10] + Math.round(y.paid_amount)
            }
            else if (new Date(year, 2, 1) <= updated && new Date(year, 3, 0) >= updated) {
              d2[11] = d2[11] + Math.round(y.paid_amount)
            }
          })
        })
      }

      else if (this.currData === "Past 12 Months") {

        let date = new Date();
        let minusDate = new Date(date.setMonth(date.getMonth() - 12));
        let startDate = new Date(minusDate.getFullYear(), minusDate.getMonth(), 1)
        this.$store.state.invoice.allData.forEach(x => {
          let updated = new Date(x.updated_at.slice(0, 10))
          updated.setHours(0, 0, 0, 0);
          if (new Date(startDate.getFullYear(), startDate.getMonth(), 1) <= updated && new Date(startDate.getFullYear(), startDate.getMonth() + 1, 0) >= updated) {
            d1[0] = d1[0] + Math.round(x.amount)
          }
          else if (new Date(startDate.getFullYear(), startDate.getMonth() + 1, 1) <= updated && new Date(startDate.getFullYear(), startDate.getMonth() + 2, 0) >= updated) {
            d1[1] = d1[1] + Math.round(x.amount)
          }
          else if (new Date(startDate.getFullYear(), startDate.getMonth() + 2, 1) <= updated && new Date(startDate.getFullYear(), startDate.getMonth() + 3, 0) >= updated) {
            d1[2] = d1[2] + Math.round(x.amount)
          }
          else if (new Date(startDate.getFullYear(), startDate.getMonth() + 3, 1) <= updated && new Date(startDate.getFullYear(), startDate.getMonth() + 4, 0) >= updated) {
            d1[3] = d1[3] + Math.round(x.amount)
          }
          else if (new Date(startDate.getFullYear(), startDate.getMonth() + 4, 1) <= updated && new Date(startDate.getFullYear(), startDate.getMonth() + 5, 0) >= updated) {
            d1[4] = d1[4] + Math.round(x.amount)
          }
          else if (new Date(startDate.getFullYear(), startDate.getMonth() + 5, 1) <= updated && new Date(startDate.getFullYear(), startDate.getMonth() + 6, 0) >= updated) {
            d1[5] = d1[5] + Math.round(x.amount)
          }
          else if (new Date(startDate.getFullYear(), startDate.getMonth() + 6, 1) <= updated && new Date(startDate.getFullYear(), startDate.getMonth() + 7, 0) >= updated) {
            d1[6] = d1[6] + Math.round(x.amount)
          }
          else if (new Date(startDate.getFullYear(), startDate.getMonth() + 7, 1) <= updated && new Date(startDate.getFullYear(), startDate.getMonth() + 8, 0) >= updated) {
            d1[7] = d1[7] + Math.round(x.amount)
          }
          else if (new Date(startDate.getFullYear(), startDate.getMonth() + 8, 1) <= updated && new Date(startDate.getFullYear(), startDate.getMonth() + 9, 0) >= updated) {
            d1[8] = d1[8] + Math.round(x.amount)
          }
          else if (new Date(startDate.getFullYear(), startDate.getMonth() + 9, 1) <= updated && new Date(startDate.getFullYear(), startDate.getMonth() + 10, 0) >= updated) {
            d1[9] = d1[9] + Math.round(x.amount)
          }
          else if (new Date(startDate.getFullYear(), startDate.getMonth() + 10, 1) <= updated && new Date(startDate.getFullYear(), startDate.getMonth() + 11, 0) >= updated) {
            d1[10] = d1[10] + Math.round(x.amount)
          }
          else if (new Date(startDate.getFullYear(), startDate.getMonth() + 11, 1) <= updated && new Date(startDate.getFullYear(), startDate.getMonth() + 12, 0) >= updated) {
            d1[11] = d1[11] + Math.round(x.amount)
          }
        })
        this.$store.state.recordPayment.allData.forEach(x => {
          x.record_pay_invoice.forEach(y => {
            let updated = new Date(y.created_at.slice(0, 10))
            updated.setHours(0, 0, 0, 0);
            if (new Date(startDate.getFullYear(), startDate.getMonth(), 1) <= updated && new Date(startDate.getFullYear(), startDate.getMonth() + 1, 0) >= updated) {
              d2[0] = d2[0] + Math.round(y.paid_amount)
            }
            else if (new Date(startDate.getFullYear(), startDate.getMonth() + 1, 1) <= updated && new Date(startDate.getFullYear(), startDate.getMonth() + 2, 0) >= updated) {
              d2[1] = d2[1] + Math.round(y.paid_amount)
            }
            else if (new Date(startDate.getFullYear(), startDate.getMonth() + 2, 1) <= updated && new Date(startDate.getFullYear(), startDate.getMonth() + 3, 0) >= updated) {
              d2[2] = d2[2] + Math.round(y.paid_amount)
            }
            else if (new Date(startDate.getFullYear(), startDate.getMonth() + 3, 1) <= updated && new Date(startDate.getFullYear(), startDate.getMonth() + 4, 0) >= updated) {
              d2[3] = d2[3] + Math.round(y.paid_amount)
            }
            else if (new Date(startDate.getFullYear(), startDate.getMonth() + 4, 1) <= updated && new Date(startDate.getFullYear(), startDate.getMonth() + 5, 0) >= updated) {
              d2[4] = d2[4] + Math.round(y.paid_amount)
            }
            else if (new Date(startDate.getFullYear(), startDate.getMonth() + 5, 1) <= updated && new Date(startDate.getFullYear(), startDate.getMonth() + 6, 0) >= updated) {
              d2[5] = d2[5] + Math.round(y.paid_amount)
            }
            else if (new Date(startDate.getFullYear(), startDate.getMonth() + 6, 1) <= updated && new Date(startDate.getFullYear(), startDate.getMonth() + 7, 0) >= updated) {
              d2[6] = d2[6] + Math.round(y.paid_amount)
            }
            else if (new Date(startDate.getFullYear(), startDate.getMonth() + 7, 1) <= updated && new Date(startDate.getFullYear(), startDate.getMonth() + 8, 0) >= updated) {
              d2[7] = d2[7] + Math.round(y.paid_amount)
            }
            else if (new Date(startDate.getFullYear(), startDate.getMonth() + 8, 1) <= updated && new Date(startDate.getFullYear(), startDate.getMonth() + 9, 0) >= updated) {
              d2[8] = d2[8] + Math.round(y.paid_amount)
            }
            else if (new Date(startDate.getFullYear(), startDate.getMonth() + 9, 1) <= updated && new Date(startDate.getFullYear(), startDate.getMonth() + 10, 0) >= updated) {
              d2[9] = d2[9] + Math.round(y.paid_amount)
            }
            else if (new Date(startDate.getFullYear(), startDate.getMonth() + 10, 1) <= updated && new Date(startDate.getFullYear(), startDate.getMonth() + 11, 0) >= updated) {
              d2[10] = d2[10] + Math.round(y.paid_amount)
            }
            else if (new Date(startDate.getFullYear(), startDate.getMonth() + 11, 1) <= updated && new Date(startDate.getFullYear(), startDate.getMonth() + 12, 0) >= updated) {
              d2[11] = d2[11] + Math.round(y.paid_amount)
            }
          })
        })
      }

      return ([
        {
          name: 'Sales',
          data: d1
        },
        {
          name: 'Reciepts',
          data: d2
        },
        {
          name: 'Expenses',
          data: d3
        }
      ])
    },
    items() {
      let data = []
      let closingDue = 0;
      let timings = ['Today', 'This Week', 'This Month', 'Last Month', 'This Quarter', 'This Financial Year', 'Last Financial Year'];
      timings.forEach((x, i) => {
        if (this.reciept.length && this.amount.length) {

          closingDue = this.amount[i] - this.reciept[i];
        }
        data.push({ time: x, amount: this.amount[i], reciept: this.reciept[i], closingDue: closingDue })
        closingDue = 0
      })
      return data
    },
    name() {
      var name = localStorage.getItem('userData');
      return JSON.parse(name);
    },
    tasks() {
      let tasks = []
      let total = []

      // this.$store.state.followUp.all.forEach(element => {
      //   // if(this.$store.state.leads.all.find(e => e.id === element.task_id)){

      //     followUp.push(element)
      //   }
      // });
      // var date = new Date();
      // var day = date.getDay()
      // var month = date.getMonth() + 1
      // var year = date.getFullYear()
      // var currentDate = `${year}-0${month}-${day}`
      // alert(currentDate)

      total = []//this.$store.state.leads.all//.filter(e => e.type === 'lead')
      if(this.previleges.viewAll){
        // let f = this.$store.state.leads.all.filter(e => e.follow_up.length > 0)

        let d =  this.$store.state.leads.all//.filter(e => e.type !== 'lead');
        let followUp = []
        d.forEach(element => {
          if(element.follow_up.length > 0){

            element.follow_up.forEach(c => {
              if(c.status === 'pending'){
              
              followUp.push({
                type:element.type,
                id:c.task_id,
                subject: c.description,
                contact_person:element.contact_person?? null,
                company:element.company?? null,
                users:element.users,
                due_date:c.date
              })
            }
            });
          }

        });
      // followUp.forEach(element => {
      //   total.push(element)
      // });
       d= d.concat(followUp)
        total = d
          
      }else{
        // if (this.$store.state.users.all.filter(e => e.email === JSON.parse(localStorage.getItem('userData')).email)[0].user_role_id === 1) {
        //     data = this.$store.state.tasks.all.filter(e => e.type === 'task')//.filter(e => e.type === 'task');
        //     // items = this
        //   } else {
          // let f = this.$store.state.leads.all.filter(e => e.follow_up.length > 0)
          let d =  this.$store.state.leads.all//.filter(e => e.type !== 'lead');
        let followUp = []
        d.forEach(element => {
          if(element.follow_up.length > 0){

            element.follow_up.forEach(c => {
              if(c.status === 'pending'){

                followUp.push({
                  type:element.type,
                  
                  id:c.task_id,
                  subject: c.description,
                  contact_person:element.contact_person?? null,
                  company:element.company?? null,
                  users:element.users,
                  due_date:c.date
                  
                })
              }
              });
          }

        });
      // followUp.forEach(element => {
      //   total.push(element)
      // });
        d = d.concat(followUp)
        // total = d
            d//.filter(e => e.type === 'lead')//.filter(e => e.type === 'task')
            .forEach(a => {
              if (a.users.filter(e => e.email === JSON.parse(localStorage.getItem('userData')).email).length > 0) {
                total.push(a)
              }
            })
          // }
      }
    
      //total = total.concat(this.$store.state.leads.all.filter(e => e.type === 'task'))
      // console.log(this.monthNo.toString().length);
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
      // alert(date)
      tasks = []
      
      total.forEach(x => {
        // if(x.date === date){
        //   tasks.push(x)
        // }else{

          if (x.due_date === date) {
            tasks.push(x)
            console.log('checking data with due date ', x);
          }
        // }
      })
      console.log(tasks, 'ttttttttttttttttttttttt')
      const start = (this.currentPage - 1) * this.pageSize;
      const end = start + this.pageSize;
      return {
        allData: tasks,
        showData: tasks.slice(start, end)
      }
    },

  },

  beforeUpdate() {
    const b = this.setPrivileges()
  },

  created() {
    this.$store.dispatch('followUp/fetch')
    const b = this.setPrivileges()

    if (this.$store.state.leads.all.length === 0 || this.$store.state.leads.all.length === 1) {

      this.$store.dispatch('tasks/fetch').then(() => {
        this.$store.dispatch('designation/fetch').then(() => {
        })
        this.getAllLeads2()

        this.getAllTasks2()
      });
    } else {
      this.getAllLeads2()

      this.getAllTasks2()
    }
    //     if(this.$store.state.leads.all.filter(e => e.type === 'task').length === 0){

    // this.$store.dispatch('tasks/fetch');
    // }
    // if(this.$store.state.leads.all.filter(e => e.type === 'lead').length === 0){

    // if(this.$store.state.leads.all.filter(e => e.type === 'task').length === 0){
    // }
    if (this.$store.state.invoice.allData.length === 0) {
      this.getAllInvoice()
    } else {
      let date = new Date();
      let firstDayWeek = new Date(date.setDate(date.getDate() - date.getDay()));
      let lastDayWeek = new Date(date.setDate(date.getDate() - date.getDay() + 6));
      let currQuarter = Math.floor((date.getMonth() / 3));
      let firstDayQuarter = new Date(date.getFullYear(), currQuarter * 3, 1);
      let lastDayQuarter = new Date(firstDayQuarter.getFullYear(), firstDayQuarter.getMonth() + 3, 0);
      if (date.getMonth() > 3) {
        var firstDayYear = new Date(date.getFullYear(), 3, 1);
        var lastDayYear = new Date(firstDayYear.getFullYear() + 1, 3, 0);
      }
      else if (date.getMonth() < 3) {
        var firstDayYear = new Date(date.getFullYear() - 1, 3, 1);
        var lastDayYear = new Date(firstDayYear.getFullYear() + 1, 3, 0);
      }
      let today = 0;
      let week = 0;
      let month = 0
      let lastMonth = 0;
      let quarter = 0;
      let year = 0;
      let lastYear = 0;
      this.$store.state.invoice.allData.forEach(x => {
        let updated = new Date(x.updated_at.slice(0, 10))
        if (updated - date === 0) {
          today = today + Math.round(x.amount);
        }
        else if (new Date(firstDayWeek.getFullYear(), firstDayWeek.getMonth(), firstDayWeek.getDate() + 1) <= updated && updated <= new Date(lastDayWeek.getFullYear(), lastDayWeek.getMonth(), lastDayWeek.getDate() + 1)) {
          week = week + Math.round(x.amount);
        }
        else if (new Date(date.getFullYear(), date.getMonth(), 1) <= updated && updated <= new Date(date.getFullYear(), date.getMonth() + 1, 0)) {
          month = month + Math.round(x.amount);
        }
        else if (new Date(date.getFullYear(), date.getMonth() - 1, 1) <= updated && updated < new Date(date.getFullYear(), date.getMonth(), 1)) {
          lastMonth = lastMonth + Math.round(x.amount);
        }
        else if (firstDayQuarter <= updated && updated <= lastDayQuarter) {
          quarter = quarter + Math.round(x.amount);
        }
        else if (firstDayYear <= updated && updated <= lastDayYear) {
          year = year + Math.round(x.amount);
        }
        else if (new Date(firstDayYear.getFullYear() - 1, 3, 1) <= updated && updated <= new Date(firstDayYear.getFullYear(), 3, 0)) {
          lastYear = lastYear + Math.round(x.amount);
        }
      })
      this.amount = [today, week, month, lastMonth, quarter, year, lastYear];
    }
    if (this.$store.state.recordPayment.allData.length === 0) {
      this.getAllPayments()
    } else {
      let date = new Date();
      let firstDayWeek = new Date(date.setDate(date.getDate() - date.getDay()));
      let lastDayWeek = new Date(date.setDate(date.getDate() - date.getDay() + 6));
      let currQuarter = Math.floor((date.getMonth() / 3));
      let firstDayQuarter = new Date(date.getFullYear(), currQuarter * 3, 1);
      let lastDayQuarter = new Date(firstDayQuarter.getFullYear(), firstDayQuarter.getMonth() + 3, 0);
      if (date.getMonth() > 3) {
        var firstDayYear = new Date(date.getFullYear(), 3, 1);
        var lastDayYear = new Date(firstDayYear.getFullYear() + 1, 3, 0);
      }
      else if (date.getMonth() < 3) {
        var firstDayYear = new Date(date.getFullYear() - 1, 3, 1);
        var lastDayYear = new Date(firstDayYear.getFullYear() + 1, 3, 0);
      }
      let today = 0;
      let week = 0;
      let month = 0
      let lastMonth = 0;
      let quarter = 0;
      let year = 0;
      let lastYear = 0;
      this.$store.state.recordPayment.allData.forEach(x => {
        x.record_pay_invoice.forEach(y => {
          let updated = new Date(y.created_at.slice(0, 10))
          if (updated - date === 0) {
            today = today + Math.round(y.paid_amount);
          }
          else if (new Date(firstDayWeek.getFullYear(), firstDayWeek.getMonth(), firstDayWeek.getDate() + 1) <= updated && updated <= new Date(lastDayWeek.getFullYear(), lastDayWeek.getMonth(), lastDayWeek.getDate() + 1)) {
            week = week + Math.round(y.paid_amount);
          }
          else if (new Date(date.getFullYear(), date.getMonth(), 1) <= updated && updated <= new Date(date.getFullYear(), date.getMonth() + 1, 0)) {
            month = month + Math.round(y.paid_amount);
          }
          else if (new Date(date.getFullYear(), date.getMonth() - 1, 1) <= updated && updated < new Date(date.getFullYear(), date.getMonth(), 1)) {
            lastMonth = lastMonth + Math.round(y.paid_amount);
          }
          else if (firstDayQuarter <= updated && updated <= lastDayQuarter) {
            quarter = quarter + Math.round(y.paid_amount);
          }
          else if (firstDayYear <= updated && updated <= lastDayYear) {
            year = year + Math.round(y.paid_amount);
          }
          else if (new Date(firstDayYear.getFullYear() - 1, 3, 1) <= updated && updated <= new Date(firstDayYear.getFullYear(), 3, 0)) {
            lastYear = lastYear + Math.round(y.paid_amount);
          }
        })
      })
      this.reciept = [today, week, month, lastMonth, quarter, year, lastYear];

    }


  },
  setup(){
    const currentPage = ref(1);
    return {
      currentPage,
    }

  }
};
</script>

<style>
/* @media screen and (max-width: 500px) {
  body{
    
  }
} */

.salesHeading {
  margin-bottom: -10px;
}

.shimmer {
  background-color: rgba(255, 255, 255, 0.4);
  z-index: 200;
}

.apexcharts-legend {
  flex-direction: row;
}

.task-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
}

.p-bottom {
  padding-bottom: 2rem;
}

.background {
  background-color: rgb(238, 238, 238);
}

.border {
  border: 1px solid rgb(221, 221, 221);
}

.b-bottom {
  border-bottom: 1px solid rgb(221, 221, 221);
}

.b-top {
  border-top: 1px solid rgb(221, 221, 221);
}

.legend {
  height: 25px;
  width: 6px;
  margin-right: 5px;
}

.py {
  padding: 0.6rem 0;
}

.pall {
  padding: 0.6rem 1rem;
}

.dropdown-menu {
  z-index: 30;
}

.dashBtn button {
  padding: 0 !important;
  height: fit-content;
}
</style>

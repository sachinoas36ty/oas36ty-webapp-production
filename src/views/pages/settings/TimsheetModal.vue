<template>
    <div>
        <!-- {{ setHours }} -->
        <b-modal no-close-on-esc no-close-on-backdrop id="timesheet-modal" ref="timesheet-modal" size="lg" title="add office timings"
            hide-footer>

            <template #modal-header>
                <h5 class="modal-title">


                    add time
                    <small>

                       {{getDateMonth(latestDate2)}} - {{currDate}}
                    </small>
                    {{ getDateMonth(latestDate2)+', '+ year}}

                </h5>
                <b-row style="margin-left: 20px;">
                    <b-col>
                        <div>
                            <b-button class="mr-1" size="sm" @click="() => {
                                $refs['timesheet-modal'].hide()
                            }" v-if="getDateMonth(latestDate2) === currDate" variant="primary">
                                Skip
                            </b-button>
                            <b-button size="sm" variant="primary">
                                History
                            </b-button>
                            <span>{{ totalHours }}/07:00 hrs</span>
                            <!-- <span id="internal">Internal</span> -->
                        </div>
                    </b-col>
                </b-row>

            </template>
            <div class="table-responsive" style="max-height: 28rem;"> 
                <table class="table" >
                    <thead>
                        <tr>
                            <th id="task">Task Id</th>
                            <th>Subject</th>
                            <th>Description</th>
                            <th>Time Devoted (<feather-icon icon="ClockIcon" size="17"></feather-icon>)</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                
                    <tbody id="body-append">
                        <tr :id="'form-others' + Number(data.count + 1)" :key="String(Number(data.count) + 1)"
                            v-if="multipleForms.length > 0"
                            v-for="data, index in multipleForms.filter(e => e.type === 'others')">
                            <td></td>
                            <td>
                                <b-form-input required v-model="data.subject" placeholder="Enter Subject"></b-form-input>
                            </td>
                            <td>
                                <b-form-input required @input="checkValid" v-model="data.description" placeholder="Enter Description"></b-form-input>
                                <b-form-invalid-feedback class="d-block">
                                    {{ data.validation }}
                                </b-form-invalid-feedback>
                            </td>
                            <td>
                                <b-form-input required @focus="data.old_values = data.time_devoted" v-model="data.time_devoted"
                                    @input="time_devotion" placeholder="Enter Time Devoted"></b-form-input>
                                <div>
                                    <b-button size="sm" @click="minusMin('form-others', data.count)"
                                        variant="primary">-5m</b-button>&emsp;
                                    <b-button size="sm" @click="addMin('form-others', data.count, '5')"
                                        variant="primary">+5m</b-button>&emsp;
                                    <b-button size="sm" @click="addMin('form-others', data.count, '15')"
                                        variant="primary">+15m</b-button>&emsp;
                                    <b-button size="sm" @click="addMin('form-others', data.count, '30')"
                                        variant="primary">+30m</b-button>
                                </div>
                            </td>
                            <td>
                                <!-- <b-form-input placeholder="Enter Subject"></b-form-input>  -->
                                <!-- <b-button size="sm" variant="primary">Update</b-button> -->
                                <feather-icon icon="XCircleIcon" size="20" class=" cursor-pointer"
                                    @click="deleteForms('form-others', index)"></feather-icon>
                                <feather-icon icon="PlusCircleIcon" size="20" @click="AddForms('others')"
                                    class="ml-1 cursor-pointer"></feather-icon>

                            </td>
                        </tr>
                        <tr :id="'select-task' + Number(data.count + 1)" :key="String(Number(data.count) + 1)"
                            v-if="multipleForms.length > 0"
                            v-for="data, index in multipleForms.filter(e => e.type === 'task')">
                            <td> {{ '#' + data.taskId }}</td>
                            <td >
                                <b-form-input v-if="data.editable" required v-model="data.subject" @input="checkValid" placeholder="Enter Subject"></b-form-input>

                                <span v-else v-b-tooltip.hover="data.subject">

                                    {{ data.subject.substr(0,25) }}
                                </span>
                            </td>
                            <td>
                                <b-form-input @input="checkValid" required v-model="data.description" placeholder="Enter Description"></b-form-input>
                                <b-form-invalid-feedback class="d-block">
                                    {{ data.validation }}
                                    </b-form-invalid-feedback>
                            </td>
                            <td>
                                <b-form-input required v-model="data.time_devoted" @input="time_devotion"
                                    placeholder="Enter Time Devoted"></b-form-input>
                                <div>
                                    <b-button size="sm" @click="minusMin('select-task', data.count)"
                                        variant="primary">-5m</b-button>&emsp;
                                    <b-button size="sm" @click="addMin('select-task', data.count, '5')"
                                        variant="primary">+5m</b-button>&emsp;
                                    <b-button size="sm" @click="addMin('select-task', data.count, '15')"
                                        variant="primary">+15m</b-button>&emsp;
                                    <b-button size="sm" @click="addMin('select-task', data.count, '30')"
                                        variant="primary">+30m</b-button>
                                </div>
                            </td>
                            <td>
                                <!-- <b-form-input placeholder="Enter Subject"></b-form-input>  -->
                                <!-- <b-button size="sm" variant="primary">Update</b-button> -->
                                <feather-icon v-if="!data.editable" icon="XCircleIcon" size="20" class=" cursor-pointer"
                                    @click="deleteForms('select-task', index)"></feather-icon>
                                <!-- <feather-icon icon="PlusCircleIcon" size="20" @click="AddForms('others')" class="ml-1 cursor-pointer"></feather-icon> -->

                            </td>
                        </tr>
                        <tr id="half-day-leave" v-if="multipleForms.length > 0"
                            v-for="data, index in multipleForms.filter(e => e.type === 'half')">
                            <td></td>
                            <td>
                                <!-- <b-form-input v-if="data.editable" required v-model="data.subject" @input="checkValid" placeholder="Reason for Leave"></b-form-input> -->
                                <!-- <span v-if="!data.editable"> -->

                                    {{data.subject}}
                                <!-- </span> -->
                            </td>
                            <td>
                                <b-form-input required v-model="data.description" @input="checkValid" placeholder="Reason for Leave"></b-form-input>
                                <b-form-invalid-feedback class="d-block" v-if="data.validation">
                                    {{ data.validation }}
                                </b-form-invalid-feedback>
                            </td>
                            <td>
                                {{ data.time_devoted }}
                            </td>
                            <td>
                                <feather-icon icon="XCircleIcon" @click="removeHoliday(index, 'half')" size="20" />
                            </td>
                        </tr>
                        <tr id="full-day-leave" v-if="multipleForms.length > 0"
                            v-for="data, index in multipleForms.filter(e => e.type === 'full')">
                            <td></td>
                            <td>
                                {{data.subject}}
                            </td>
                            <td>
                                <b-form-input required @input="checkValid" v-model="data.description" placeholder="Reason for Leave"></b-form-input>
                                <b-form-invalid-feedback class="d-block">
                                    {{ data.validation }}
                                </b-form-invalid-feedback>
                            </td>
                            <td>
                                {{data.time_devoted}}
                            </td>
                            <td>
                                <feather-icon icon="XCircleIcon" @click="removeHoliday(index, 'full')" size="20" />
                            </td>
                        </tr>
                        <tr id="holiday" v-if="multipleForms.length > 0"
                            v-for="data, index in multipleForms.filter(e => e.type === 'holiday')">
                            <td></td>
                            <td>
                                {{data.subject}}
                            </td>
                            <td>
                                <b-form-input required @input="checkValid" v-model="data.description" placeholder="Description"></b-form-input>
                                <b-form-invalid-feedback class="d-block">
                                    {{ data.validation }}
                                </b-form-invalid-feedback>
                            </td>
                            <td>
                                {{ data.time_devoted }}
                            </td>
                            <td>
                                <feather-icon @click="removeHoliday(index, 'holiday')" icon="XCircleIcon" size="20" />
                            </td>
                        </tr>

                    </tbody>
                </table>
                <div v-if="multipleForms.length === 0" class="mt-1 text-center">
                    There are no pending timesheet entries
                    </div>
            </div>
            <div class="d-flex justify-content-between">
                <b-dropdown id="add-more-dropdown" variant="primary" size="sm">

                    <template #button-content>
                        Add more
                    </template>
                    <b-dropdown-item @click="showHolidays('half')">
                        Half Day Leave
                    </b-dropdown-item>
                    <b-dropdown-item @click="showHolidays('full')">
                        Full Day Leave
                    </b-dropdown-item>
                    <b-dropdown-item @click="showHolidays('holiday')">
                        Holiday
                    </b-dropdown-item>
                    <b-dropdown-item @click="$refs['choose-tasks-modal'].show()">
                        Select task/Lead
                    </b-dropdown-item>
                    <b-dropdown-item @click="showForm()">
                        Others
                    </b-dropdown-item>
                    <b-dropdown-item v-b-modal.modal-leads>
                        Add Lead
                    </b-dropdown-item>
                </b-dropdown>
                <div class="text-right">

                    <b-button :disabled="$store.state.timesheet.isSidebarLoading" @click="updateTimesheet()" size="sm" variant="primary">
                        Update
                    </b-button>
                </div>
            </div>
        </b-modal>
        <b-modal no-close-on-backdrop id="choose-tasks-modal" ref="choose-tasks-modal" size="md" title="choose task/lead"
            hide-footer>
            <b-row>
                <b-col md="12">
                    <b-form-group>
                        <v-select v-model="tasks_data" placeholder="Choose task/Lead" :options="tasks" label="subject">
                            <template #option="item">
                                <div class="d-flex justify-content-between">
                                    {{ '#' + item.id }} {{ item.subject.substr(0, 30) }}
                                    <div>
                                        <b-badge variant="primary">
                                            {{ item.status_master.type }}
                                        </b-badge>
                                    </div>
                                </div>
                            </template>
                            <template #selected-option="item">
                                <div class="d-flex justify-content-between">
                                    {{ '#' + item.id }} {{ item.subject.substr(0, 30) }}
                                    <div>
                                        <b-badge variant="primary">
                                            {{ item.status_master.type }}
                                        </b-badge>
                                    </div>
                                </div>
                            </template>
                        </v-select>
                    </b-form-group>
                </b-col>
            </b-row>
            <div class="text-right">
                <b-button class="mr-1" @click="() => {
                    $refs['choose-tasks-modal'].hide()
                    tasks_data = null
                }" size="sm" variant="primary">
                    Cancel
                </b-button>
                <b-button @click="() => {
                    AddForms('task'),
                        $refs['choose-tasks-modal'].hide()
                        tasks_data = null
                }" size="sm" variant="primary">
                    Choose
                </b-button>
            </div>
        </b-modal>
    </div>
</template>
<script>
import formValidation from '@/@core/comp-functions/forms/form-validation';
import {
    BFormCheckbox,VBTooltip,BTooltip,
    BTab, VBModal, BModal, BFormGroup, BFormInput, BSpinner, BPagination, BDropdown, BDropdownItem,
    BTabs, BFormInvalidFeedback, BBadge, BRow, BCol, BContainer,
    BTable, BCard, BForm, BButton, BAvatar,
} from 'bootstrap-vue';
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import { ref } from 'vue-demi';
import { faToggleOn, faToggleOff } from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import vSelect from 'vue-select'

library.add(faToggleOff, faToggleOn);

import CreateSidebar from "../branches/CreateSidebar.vue";
import EditSidebar from "../branches/EditSidebar.vue";
import BankDetails from '../bank_details/List.vue'
import { ArrowLeftCircleIcon } from 'vue-feather-icons';
import { isUserLoggedIn } from '@/auth/utils';
import { current_date, date_plus, time_check,check_date_less_greater } from '@/api/DateFunction';
export default {
    components: {
        FontAwesomeIcon, BFormCheckbox, BAvatar,
        BTab, BTabs, BCard, BFormGroup, BFormInput, BForm, BButton, BModal, VBModal, BRow, BCol,
        BSpinner, BPagination, BDropdown, BDropdownItem, BankDetails,
        ValidationObserver, ValidationProvider, BContainer, vSelect
        , BFormInvalidFeedback, BTable, CreateSidebar, EditSidebar, BBadge,
    },
    directives: {
        'b-modal': VBModal,
        'b-tooltip': VBTooltip,
        esc: {
      bind(el, binding, vnode) {
        el.eventHandler = function (event) {
          if (event.keyCode === 27) {
            vnode.context[binding.expression]();
          }
        };
        document.addEventListener('keydown', el.eventHandler);
      },
    }
    },
    data() {
        const dated = new Date();
        const date = dated.getDate();
        const month = dated.getMonth()+1;
        const year = dated.getFullYear();
        const monthArray = ['','JAN','FEB','MAR','APR','MAY','JUN','JULY', 'AUG', "SEP",'OCT','NOV','DEC'];
        return {
            latestDate: JSON.parse(localStorage.getItem('userTimesheet')) != null ? JSON.parse(localStorage.getItem('userTimesheet')).latest_date : `${date < 10 ? '0'+date : date} ${monthArray[month]}`,
            latestDate2: null,

            currDate:`${date < 10 ? '0'+date : date} ${monthArray[month]}`,
            currentDate:`${date < 10 ? '0'+date : date} ${monthArray[month]}, ${year}`,
            year: `${year}`,
            tasks_data: null,
            totalHours: '00:00',
            formsCount: 0,
            multipleForms: [],
            selectTaskForm: [],
            holiday: [],
            fullDayLeave: [],
            halfDayLeave: [],
            office: {
                branches: null,
                users: null,
                daysOfweek: [
                    {
                        id: 1,
                        name: 'Monday',
                        start_time: '10:00',
                        end_time: '18:30',
                        min_hours: '07:00:00',
                        isValid: true
                    },
                    {
                        id: 2,
                        name: 'Tuesday',
                        start_time: '10:00',
                        end_time: '18:30',
                        min_hours: '07:00:00',
                        isValid: true
                    },
                    {
                        id: 3,
                        name: 'Wednesday',
                        start_time: '10:00',
                        end_time: '18:30',
                        min_hours: '07:00:00',
                        isValid: true
                    },
                    {
                        id: 4,
                        name: 'Thursday',
                        start_time: '10:00',
                        end_time: '18:30',
                        min_hours: '07:00:00',
                        isValid: true
                    },
                    {
                        id: 5,
                        name: 'Friday',
                        start_time: '10:00',
                        end_time: '18:30',
                        min_hours: '07:00:00',
                        isValid: true
                    },
                    {
                        id: 6,
                        name: 'Saturday',
                        start_time: '10:00',
                        end_time: '18:30',
                        min_hours: '07:00:00',
                        isValid: true
                    },
                    {
                        id: 7,
                        name: 'Sunday',
                        start_time: null,
                        end_time: null,
                        min_hours: null,
                        isValid: true
                    },
                ]
            },
            time: '',
            isValid: true,
            isDropdown2Visible: false
        }
    },
    updated() {
        // let data = this.$store.state.leads.filter;
        // if(data.length > 0){
        //     data.forEach(element => {
        //         this.formsCount++
        //         this.multipleForms.push({
        //             count:this.formsCount,
        //             taskId:element.id,
        //             subject:element.subject,
        //             description:null,
        //             time_devoted:'00:30',
        //             validation:null
        //         })
        //     });
        // }
    },
    computed: {
        setLogs(){
            let data = this.$store.state.tasks.audits;
            data.forEach(element => {
                this.formsCount++
                let taskId = 0;
                let subject = ''
                let desc = ''

                if(element.auditable_type.includes('Task') ){
                    taskId = element.new_values.id;
                    subject = element.new_values.subject ? element.new_values.subject : '';  
                    desc = element.new_values.description ? element.new_values.description.replace(/(<([^>]+)>)/gi, ""): '';  

                }else{
                    if(element.new_values.task_id){
                    taskId = element.new_values.task_id
                    // subject = element.new_values.item_details;

                        subject = this.$store.state.leads.all.filter(e => e.id === taskId).length ? this.$store.state.leads.all.filter(e => e.id === taskId)[0].subject : null;   
                        if(this.$store.state.leads.all.filter(e => e.id === taskId).length){
                            if(this.$store.state.leads.all.filter(e => e.id === taskId)[0].description != null ){

                                desc = this.$store.state.leads.all.filter(e => e.id === taskId)[0].description.replace(/(<([^>]+)>)/gi, "");   
                            }else{
                                desc = null
                            }
                        }else{
                            desc = null

                        }
                    }else{
                        taskId = null
                        subject = null//this.$store.state.leads.all.filter(e => e.id === taskId).length ? this.$store.state.leads.all.filter(e => e.id === taskId)[0].subject : '';   
                        desc=null
                    }

                }
                // else if(element.auditable_type.includes('Invoice')){
                //     taskId = element.new_values.task_id
                //     subject = element.new_values.item_details;
                //     desc = 'Created Invoice'//this.$store.state.leads.all.filter(e => e.id === element.new_values.task_id)[0].description;   

                // }
                // else if(element.auditable_type.includes('Proposal')){
                //     taskId = element.new_values.task_id
                //     subject = element.new_values.subject;   
                //     desc = 'Created Proposal'//this.$store.state.leads.all.filter(e => e.id === element.new_values.task_id)[0].description;   

                    
                // }
                // else if(element.auditable_type.includes('RecordPayment')){
                //     taskId = element.new_values.task_id
                //     subject = this.$store.state.leads.all.filter(e => e.id === element.new_values.task_id)[0].subject;   
                //     desc = 'Payment Made'//this.$store.state.leads.all.filter(e => e.id === element.new_values.task_id)[0].description;   

                // }
                // else if(element.auditable_type.includes('Expense')){
                //     taskId = element.new_values.task_id
                //     // subject = element.new_values.description;   
                //     subject = this.$store.state.leads.all.filter(e => e.id === element.new_values.task_id)[0].subject;   
                //     desc = 'Created Expense'//this.$store.state.leads.all.filter(e => e.id === element.new_values.task_id)[0].description;   

                  
                // }
            if(taskId && subject && desc){

                this.multipleForms.push({
                    type: 'task',
                    validation:null,
                    editable:true,
                    count: this.formsCount,
                    taskId: taskId,
                    subject: subject,
                    description: desc,
                    time_devoted: '00:30'
                });
            }
                if(this.multipleForms.filter(e => e.taskId === taskId).length > 1){
                    let i =   this.multipleForms.findIndex(e => e.taskId === taskId)
                    this.multipleForms.splice(i,1)
                }
            });
            return;
        },
        tasks() {
            return this.$store.state.leads.all;
        },
        isLoading() {
            return this.$store.state.officeTimings.isSidebarLoading
        },
        branches() {
            return this.$store.state.branches.all;
        },
        users() {
            return this.$store.state.users.all;
        },

    },
    beforeUpdate() {
        const d = this.setLogs
        const date = new Date()
       this.latestDate2 =  JSON.parse(localStorage.getItem('userTimesheet')) != null ? JSON.parse(localStorage.getItem('userTimesheet')).latest_date : current_date
    },
    methods: {
        handleEsc(event){
            if (event.keyCode === 27) {
                console.log('dfg');
        event.preventDefault();
      
      }
        },
        getDateMonth(date){
            const d = new Date(date)
        const monthArray = ['','JAN','FEB','MAR','APR','MAY','JUN','JULY', 'AUG', "SEP",'OCT','NOV','DEC'];

            let g = `${d.getDate()} ${monthArray[d.getMonth()+1]}`
            return g;
        },
        checkValid(){
            this.multipleForms.forEach(element => {
                if(element.description){
                    element.validation = null
                }
            });
        },
        updateTimesheet(){
            let l = JSON.parse(localStorage.getItem('userTimesheet'))
            if(this.multipleForms.length === 0){
                this.$swal('','Atleast 07:00 hours is required!', 'error')
                return;
            }
            let half_valid = this.multipleForms.filter(e => e.description === null || e.description === "")
            if(half_valid.length > 0){
                half_valid.forEach(element => {
                    element.validation = 'This field is required!'
                });
                return;
            }else{

            // const date = new Date('2022-04-13 ' + this.totalHours)
                console.log('hehhe');
            if(this.latestDate2 !== current_date && Number(this.totalHours.split(':')[0]) < 7 ){
                this.$swal('','Please fill atleast 07:00 hours!','error')
                return;

            }
            if(Number(this.totalHours.split(':')[0]) >= 24 ){
                console.log('hello');
                this.$swal('','Total time logged should be less than or equal to 23:59 hrs','error')
                return;
            }else{
                let date = new Date(this.latestDate2);
                let day = date.getDate()
                let month = date.getMonth()
                let year = date.getFullYear()
                let data = []
                this.multipleForms.forEach(element => {
                    if(element.type === 'task'){
                        data.push({
                            task_id:element.taskId,
                            subject:element.subject,
                            description:element.description,
                            date: this.latestDate2,
                            time_devoted : element.time_devoted
                        });
                    }else{
                        data.push({
                            // task_id:element.taskId,
                            subject:element.subject,
                            date: this.latestDate2,

                            description:element.description,
                            time_devoted : element.time_devoted

                        });
                    }
                });
                console.log(data);
                this.$store.dispatch('timesheet/store',{timesheet:data}).then(() => {

                    let date = this.$store.state.timesheet.hours.latest_date//[this.$store.state.timesheet.all.length - 1].date
                    let hours = this.$store.state.timesheet.hours.total_worked_hour//[this.$store.state.timesheet.all.length - 1].time_devoted
                    let ab = {
                    latest_date:date,
                    total_worked_hour:hours
                };
                    localStorage.removeItem('userTimesheet')

                localStorage.setItem('userTimesheet', JSON.stringify(ab))

                    // let latest_date = new Date(date)
                    // let latest_date2 =  `${latest_date.getFullYear()}-${latest_date.getMonth() < 10 ? '0'+(latest_date.getMonth()+1): (latest_date.getMonth()+1)}-${latest_date.getDate() < 10 ? '0'+(latest_date.getDate()): (latest_date.getDate())}`;
                    // let latest_plus =  `${latest_date.getFullYear()}-${latest_date.getMonth() < 10 ? '0'+(latest_date.getMonth()+1): (latest_date.getMonth()+1)}-${latest_date.getDate() < 10 ? '0'+(latest_date.getDate()+1): (latest_date.getDate()+1)}`;
                    // let curDate = new Date()
                    // // let currentDate = `${curDate.getFullYear()}-${curDate.getMonth() < 10 ? '0'+(curDate.getMonth()+1): (curDate.getMonth()+1)}-${curDate.getDate() < 10 ? '0'+curDate.getDate(): curDate.getDate()}`
                    // let d = {
                    //     latest_date:`${latest_date.getFullYear()}-${latest_date.getMonth() < 10 ? '0'+(latest_date.getMonth()+1): (latest_date.getMonth()+1)}-${latest_date.getDate() < 10 ? '0'+latest_date.getDate(): latest_date.getDate()}`,
                    //     total_worked_hour:hours
                    // };
                    // localStorage.removeItem('userTimesheet')
                    // localStorage.setItem('userTimesheet', JSON.stringify(d))

                    const b = current_date;
                    let localData = JSON.parse(localStorage.getItem('userTimesheet'))
            if(localData.latest_date !== b ){
              
               if(time_check(localData.total_worked_hour) === 'greater than'){
                let abc = {
                  latest_date:date_plus(localData.latest_date),
                  total_worked_hour:'00:00'
                }
                localStorage.removeItem('userTimesheet')

                localStorage.setItem('userTimesheet', JSON.stringify(abc))
                
              }
              if(check_date_less_greater(localData.latest_date,localData.total_worked_hour) === 'enable' && time_check(localData.total_worked_hour) === 'less than'){
                // alert('alert 2')

               this.totalHours = localData.total_worked_hour
              }
            }

            // console.log(currentDate+','+latest_date2+','+latest_plus);
            if(check_date_less_greater(localData.latest_date,localData.total_worked_hour) === 'disable'){
                // const la_date = new Date(date_plus(localData.latest_date))
                // const curr_date = new Date(current_date)
                // alert('alert 1')
                // alert('last: '+date_plus(localData.latest_date))
                // alert('current: '+current_date)


                if(date_plus(localData.latest_date) == current_date){
                    // alert('alert 3')

                            this.$refs['timesheet-modal'].hide()
                            // this.$refs['timesheet-alert'].hide()
                            // $('#timesheet-alert').modal('hide')
                            // document.getElementById('timesheet-alert').style.visibility = 'hidden'
                        }

                    }
                    // }else if(currentDate !== latest_date2){
                    //     if(new Date('2023-04-13 '+ d.total_worked_hour).getHours() >= 7){

                    //         this.latestDate2 = latest_plus
                    //     }else if(new Date('2023-04-13 '+ d.total_worked_hour).getHours() < 7){
                    //        this.$swal('','Please fill atleast 07:00 hours!','error')
                    //     }
                    // }
                    
                    this.multipleForms = []
                    this.totalHours = '00:00'
                });
            }
        }

        },
        time_devotion(ev) {


            const inputFields = []
            this.multipleForms.forEach(element => {
                inputFields.push(element.time_devoted)
            });
            let local = JSON.parse(localStorage.getItem('userTimesheet'))
            if(local !== null){

                inputFields.push(local.total_worked_hour)
            }
            // console.log(inputFields);
            const timeArrays = [];
            // const timeArray = []
            for (let i = 0; i < inputFields.length; i++) {
                const timeArray = inputFields[i].split(',').map(time => time.split(':'));
                // const timeArray = inputFields[i].split(':')
                timeArrays.push(timeArray);
            }
            console.log(timeArrays);


            const totalMinutes = timeArrays.reduce((total, timeArray) => {
                const timeMinutes = timeArray.reduce((acc, [hours, minutes]) => acc + parseInt(hours) * 60 + parseInt(minutes), 0);
                return total + timeMinutes;
            }, 0);

            // Convert total minutes to hours and minutes

            const hours = Math.floor(totalMinutes / 60);
            const minutes = totalMinutes % 60;
            // const date_hours = new Date('2022-04-13 '+this.totalHours)
            // if(date_hours.getHours() < 23 && date_hours.getMinutes() < 59){

                this.totalHours = (String(hours).length === 1 ? '0'+String(hours) : String(hours))  + ':' + (String(minutes).length === 1 ? '0'+String(minutes) : String(minutes))
            
            // }else{
            //     this.$swal('','Total time logged should be less than or equal to 23:59 hrs','error')

            // }

            // console.log(ev.split(':')[1]);
            // let input = new Date('2022-04-13 '+ ev);
            // let date = new Date('2023-04-13 '+this.totalHours)
            // if(date.getHours() < 23 || date.getMinutes() < 55){

            //     const [hours, minutes] = ev.split(':');
            //     const times =[ [hours === '00'?0: Number(hours),minutes === '00' ? 0 : Number(minutes)]];
            //     console.log(times);


            //   input.setHours(input.getHours() + Number(hours));
            //   input.setMinutes(input.getMinutes() + Number(hours*60) +Number(minutes));
            // let min = input.setMinutes(input.getMinutes() + Number(ev.split(':')[1]))
            // let hour = input.setHours(input.getHours() + Number(ev.split(':')[0]))
            //             const totalMinutes = times.reduce((total, [hours, minutes]) => {
            //   return total + (hours * 60) + minutes;
            // }, 0);
            // const hours2 = Math.floor(totalMinutes / 60);
            // const minutes2 = totalMinutes % 60;
            // this.totalHours = String(hours2) + ':' + String(minutes2)



            // date.setMinutes(date.getMinutes() + totalMinutes)
            // this.totalHours = String(date.getHours() < 10 ? '0'+date.getHours() : date.getHours()) + ':' +  String(date.getMinutes() < 10 ? '0'+date.getMinutes() : date.getMinutes() )  
            // this.totalHours = String(input.getHours() < 10 ? '0'+input.getHours() : input.getHours()) + ':' +  String(input.getMinutes() < 10 ? '0'+input.getMinutes() : input.getMinutes() )  

            // }else{
            // }

        },
        removeHoliday(index, type) {
            if (type === 'half') {
                // document.getElementById('half-day-leave').style.display = 'table-row'
                this.multipleForms.splice(index, 1)
                this.time_devotion(210)

            }
            if (type === 'full') {
                // document.getElementById('full-day-leave').style.display = 'table-row'
                this.multipleForms.splice(index, 1)
                this.time_devotion(420)

            }
            if (type === 'holiday') {
                // document.getElementById('holiday').style.display = 'table-row'
                this.multipleForms.splice(index, 1)
                this.time_devotion(420)


            }
        },
        showHolidays(type) {
            // document.getElementById('task').style.display = 'none'
            // if (new Date('2023-04-13 ' + this.totalHours).getHours() < 20) {

                if (type === 'half') {
                    // document.getElementById('half-day-leave').style.display = 'table-row'
                    this.multipleForms.push({
                        type: 'half',
                        description: null,
                        subject:'Half Day Leave',
                        validation:null,

                        time_devoted:'03:30'

                    })
                    // this.addTimeTotal(210)
                    this.time_devotion('0')


                }
                if (type === 'full') {
                    // document.getElementById('full-day-leave').style.display = 'table-row'
                    this.multipleForms.push({
                        type: 'full',
                        time_devoted:'07:00',
                        validation:null,

                        subject:'Full Day Leave',

                        description: null
                    })
                    // this.addTimeTotal(420)
                    this.time_devotion('0')



                }
                if (type === 'holiday') {
                    // document.getElementById('holiday').style.display = 'table-row'
                    this.multipleForms.push({
                        type: 'holiday',
                        time_devoted:'07:00',
                        validation:null,

                        subject:'Holiday',

                        description: null
                    })
                    // this.addTimeTotal(420)
                    this.time_devotion('0')



                }
            // } else {
            //     this.$swal('', 'Total time logged should be less than or equal to 23:59 hrs', 'error')
            // }

        },
        minusMin(type, id) {
            if (type === 'form-others') {

                this.multipleForms.forEach(element => {
                    if (element.count === id) {
                        let date = new Date('2023-04-13 ' + element.time_devoted)
                        if ((date.getMinutes() !== 0 && date.getHours() === 0) || date.getHours() !== 0) {

                            date.setMinutes(date.getMinutes() - 5)
                        }
                        element.time_devoted = String(date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':' + String(date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes())
                        // this.time_devotion(element.time_devoted)
                        this.time_devotion(5)

                    }
                });
            } else {
                this.multipleForms.forEach(element => {
                    if (element.count === id) {
                        let date = new Date('2023-04-13 ' + element.time_devoted)
                        if ((date.getMinutes() !== 0 && date.getHours() === 0) || date.getHours() !== 0) {

                            date.setMinutes(date.getMinutes() - 5)
                        }
                        element.time_devoted = String(date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':' + String(date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes())
                        // this.time_devotion(element.time_devoted)
                        this.time_devotion(5)

                    }
                });
            }

            // console.log(this.multipleForms);
        },
        addMin(type, id, number) {
            if (type === 'form-others') {

                this.multipleForms.forEach(element => {
                    if (element.count === id) {
                        let date = new Date('2023-04-13 ' + element.time_devoted)
                        date.setMinutes(date.getMinutes() + Number(number))
                        element.time_devoted = String(date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':' + String(date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes())
                        this.time_devotion(number)

                    }
                });
            } else {
                this.multipleForms.forEach(element => {
                    if (element.count === id) {
                        let date = new Date('2023-04-13 ' + element.time_devoted)
                        date.setMinutes(date.getMinutes() + Number(number))
                        element.time_devoted = String(date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':' + String(date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes())
                        this.time_devotion(number)

                    }
                });
            }

            // console.log(this.multipleForms);
        },
        deleteForms(type, index) {
            if (type === 'form-others') {

                let time = this.multipleForms[index].time_devoted
                // this.
                this.multipleForms.splice(index, 1)
                this.time_devotion(time.split(':')[1])
            } else {
                let time = this.multipleForms[index].time_devoted
                // this.
                this.multipleForms.splice(index, 1)
                this.time_devotion(time.split(':')[1])
            }

        },
        addTimeTotal(number) {
            let date = new Date('2023-04-13 ' + this.totalHours)
            date.setMinutes(date.getMinutes() + Number(number))
            this.totalHours = String(date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':' + String(date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes())
        },
        minusTimeTotal(number) {
            let date = new Date('2023-04-13 ' + this.totalHours)
            date.setMinutes(date.getMinutes() - Number(number))
            this.totalHours = String(date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':' + String(date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes())
        },
        AddForms(type) {
            this.formsCount++
            if (type === 'others') {
                // this.addTimeTotal(30)


                this.multipleForms.push({
                    type: 'others',
                    count: this.formsCount,
                    validation:null,

                    subject: null,
                    description: null,
                    time_devoted: '00:30',
                    // old_values:'00:30'
                });
                this.time_devotion('0')

            } else {
                // document.getElementById('task').style.display = 'block'
                // this.addTimeTotal(30)

                this.multipleForms.push({
                    type: 'task',
                    validation:null,

                    count: this.formsCount,
                    taskId: this.tasks_data.id,
                    subject: this.tasks_data.subject,
                    description: null,
                    time_devoted: '00:30'
                });
                this.time_devotion('0')

            }
        },

        showForm() {
            // document.getElementById('task').style.display = 'none'
            // this.multipleForms = []
            // document.getElementById('form-others').style.display = 'table-row'
            this.formsCount++
            // this.time_devotion('00:30')
            // this.addTimeTotal(30)

            this.multipleForms.push({
                type: 'others',
                count: this.formsCount,
                subject: null,
                description: null,
                validation:null,

                time_devoted: '00:30',
                old_values: '00:30'
            });
            this.time_devotion('0')

        }
    },

    setup() {
        const { refFormObserver, getValidationState } =
            formValidation();
        return {
            refFormObserver,
            getValidationState,
            formValidation
        }
    }
}
</script>
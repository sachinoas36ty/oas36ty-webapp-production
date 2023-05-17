<template>
    <b-modal no-close-on-backdrop id="edit-office-timings-modal" ref="edit-office-timings-modal" size="lg" title="edit office timings"
        hide-footer :visible="isEditSidebarActive"  @change="(val) => $emit('update:is-edit-sidebar-active', val)">

        <validation-observer #default="{ handleSubmit }" ref="refFormObserver">


            <b-form @submit.prevent="handleSubmit(createTimings)" class="">

                <b-row>
                    <b-col md="6">
                        <!-- branches -->
                        <validation-provider #default="validationContext" name="branches" vid="branches" rules="required">

                            <b-form-group label="Branches *">
                                <v-select disabled id="branches" v-model="office.branches" :options="branches" label="name" placeholder="Search">
                                    
                                </v-select>
                                <b-form-invalid-feedback class="d-block">

                                    {{ validationContext.errors[0] }}
                                </b-form-invalid-feedback>
                            </b-form-group>
                        </validation-provider>
                    </b-col>
                    <b-col md="6">
                        <!-- users -->
                        <b-form-group label="Users">
                            <v-select disabled v-model="office.users" placeholder="Search" :options="users" label="name">
                                <template #option="item">
                                    <div class="d-flex jusitfy-content-between ">
                                        <b-avatar size="28" :src="item.avatar">


                                        </b-avatar>
                                        <span class="ml-1 ">
                                            {{ item.name }}
                                        </span>

                                    </div>
                                </template>
                                <template #selected-option="item">
                                    <div class="d-flex jusitfy-content-between ">
                                        <b-avatar size="28" :src="item.avatar">


                                        </b-avatar>
                                        <span class="ml-1 ">
                                            {{ item.name }}
                                        </span>

                                    </div>
                                </template>
                            </v-select>
                        </b-form-group>
                    </b-col>


                </b-row>
                <b-row class="hide-when-mobile mb-1">
                    <!-- <div> -->

                    <b-col md="3">
                        <h4 class="ml-2">
                            <b>

                                Days of Week
                            </b>
                        </h4>
                    </b-col>
                    <b-col md="3" class="text-center">
                        <h4><b>
                                Start Time
                            </b></h4>

                    </b-col>
                    <b-col md="3" class="text-center">
                        <h4><b>
                                End Time
                            </b></h4>

                    </b-col>
                    <b-col md="3" class="text-center">
                        <h4><b>
                                Min Working Hours
                            </b></h4>

                    </b-col>

                    <!-- </div> -->

                </b-row>
                <b-row class="hide-when-mobile" v-for="dayname in office.daysOfweek" :id="String(Number(dayname.id + 1))">
                    <b-col md="3">
                        <!-- days of week -->
                        <div class="ml-2">
                            <b>

                                {{ dayname.name }}
                            </b>
                        </div>
                    </b-col>
                    <b-col md="3">
                        <!-- start time -->
                        <b-form-group>
                            <b-form-input v-model="dayname.start_time" type="time">

                            </b-form-input>
                        </b-form-group>
                    </b-col>
                    <b-col md="3">
                        <!-- end time -->
                        <b-form-group>
                            <b-form-input v-model="dayname.end_time" type="time">

                            </b-form-input>
                        </b-form-group>
                    </b-col>
                    <b-col md="3">
                        <!-- min working hours -->
                        <b-form-group>
                            <!-- <b-form-input v-model="dayname.min_hours" class="min_hours_time" type="time">

                            </b-form-input> -->
                            <b-form-input id="time-input" v-model="dayname.min_hours" @input="validateTime($event,dayname.id)">

                            </b-form-input>
                            <b-form-invalid-feedback  v-if="!dayname.isValid" class="d-block">

                                <span>Please enter a valid time value (H:i:s).</span>
                            </b-form-invalid-feedback>
                            <!-- <input type="text" id="time-input" v-model="time" @input="validateTime"> -->
                        </b-form-group>
                    </b-col>
                </b-row>
                <b-row class="mobile-view-days" style="display: none;" :id="String(Number(dayname.id + 1))" v-for="dayname in office.daysOfweek"
                    >
                    <b-col md="3">
                        <!-- days of week -->
                        {{ dayname.name }}
                    </b-col>
                    <b-col md="3">
                        <!-- start time -->
                        <b-form-group label="Start Time">
                            <b-form-input v-model="dayname.start_time" type="time">

                            </b-form-input>
                        </b-form-group>
                    </b-col>
                    <b-col md="3">
                        <!-- end time -->
                        <b-form-group label="End Time">
                            <b-form-input type="time" v-model="dayname.end_time">

                            </b-form-input>
                        </b-form-group>
                    </b-col>
                    <b-col md="3">
                        <!-- min working hours -->
                        <b-form-group label="Min Working Hours">
                            <!-- <b-form-input v-model="dayname.min_hours" class="min_hours_time" type="time">

                            </b-form-input> -->
                            <b-form-input id="time-input" v-model="dayname.min_hours" @input="validateTime($event,dayname.id)">

                            </b-form-input>
                            <b-form-invalid-feedback  v-if="!dayname.isValid" class="d-block">

                                <span>Please enter a valid time value (H:i:s).</span>
                            </b-form-invalid-feedback>
                            <!-- <input type="text" id="time-input" v-model="time" @input="validateTime"> -->
                        </b-form-group>
                    </b-col>
                </b-row>
                <div class="text-right mt-1">
                    <b-button size="sm" variant="primary" @click="() => {

                        $refs['edit-office-timings-modal'].hide()
                        resetform()
                    }" class="mr-1">
                        Cancel
                    </b-button>
                    <b-button :disabled="isLoading" size="sm" type="submit" variant="primary">
                        Update
                        <b-spinner class="ml-1" small v-if="isLoading" /> 
                    </b-button>
                </div>
            </b-form>
        </validation-observer>
    </b-modal>
</template>
<script>
import formValidation from '@/@core/comp-functions/forms/form-validation';
import {
    BFormCheckbox,
    BTab, VBModal, BModal, BFormGroup, BFormInput, BSpinner, BPagination, BDropdown, BDropdownItem,
    BTabs, BFormInvalidFeedback, BRow, BCol, BContainer,
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
export default {
    components: {
        FontAwesomeIcon, BFormCheckbox, BAvatar,
        BTab, BTabs, BCard, BFormGroup, BFormInput, BForm, BButton, BModal, VBModal, BRow, BCol,
        BSpinner, BPagination, BDropdown, BDropdownItem, BankDetails,
        ValidationObserver, ValidationProvider, BContainer, vSelect
        , BFormInvalidFeedback, BTable, CreateSidebar, EditSidebar,
    },
    directives: {
        'b-modal': VBModal,
    },
    data() {
        return {
            office: {
                branches: null,
                users: null,
                daysOfweek: [
                    {
                        id: 1,
                        name: 'Monday',
                        start_time: null,
                        end_time: null,
                        min_hours: null,
                        isValid:true
                    },
                    {
                        id: 2,
                        name: 'Tuesday',
                        start_time: null,
                        end_time: null,
                        min_hours: null,
                        isValid:true
                    },
                    {
                        id: 3,
                        name: 'Wednesday',
                        start_time: null,
                        end_time: null,
                        min_hours: null,
                        isValid:true
                    },
                    {
                        id: 4,
                        name: 'Thursday',
                        start_time: null,
                        end_time: null,
                        min_hours: null,
                        isValid:true
                    },
                    {
                        id: 5,
                        name: 'Friday',
                        start_time: null,
                        end_time: null,
                        min_hours: null,
                        isValid:true
                    },
                    {
                        id: 6,
                        name: 'Saturday',
                        start_time: null,
                        end_time: null,
                        min_hours: null,
                        isValid:true
                    },
                    {
                        id: 7,
                        name: 'Sunday',
                        start_time: null,
                        end_time: null,
                        min_hours: null,
                        isValid:true
                    },
                ]
            },
            time: '',
      isValid: true,
        }
    },
    model: {
    prop: "OfficeisEditSidebarActive",
    event: "update:is-edit-sidebar-active",
  },
  props: {
    isEditSidebarActive: {
      type: Boolean,
      required: true,
    },
    editItem: {
      type: Object,
      required: true,
    },
    officeId:{
        type:Number,
        required:true
    }
  },
  beforeUpdate() {
    this.office.branches = this.branches.filter(e => e.id === this.editItem.branch_id)[0]
    this.office.users = this.users.filter(e => e.id === this.editItem.user_id)[0]
    this.office.daysOfweek.forEach((e) => {
        this.editItem.office_day_time.forEach(element => {
            if(element.day_of_week === e.name){

                e.start_time = element.starting_time != null ? element.starting_time.substr(0,element.starting_time.length - 3) : null
                e.end_time = element.ending_time!= null ?element.ending_time.substr(0,element.ending_time.length - 3):null
                e.min_hours = element.min_office_hours!=null  ?element.min_office_hours.substr(0,element.min_office_hours.length):null
            }
        });
    })

  },
    computed: {
        isLoading(){
            return this.$store.state.officeTimings.isSidebarLoading
        },
        branches() {
            return this.$store.state.branches.all;
        },
        users() {
            return this.$store.state.users.all;
        },
   
    },
    methods: {
        resetform(){
            this.office.branches = null
            this.office.users = null
            this.office.daysOfweek.forEach(element => {
                element.start_time = null
                element.end_time = null
                element.min_hours = null
                element.isValid = true

            });

        },
        validateTime(ev,id){
            console.log(ev);
            const regex = /^([0-1][0-9]|2[0-3]):([0-5][0-9]):([0-5][0-9])$/
            this.office.daysOfweek.forEach((e) => {
                // if(e.)
                if(e.id === id){

                    e.isValid = regex.test(ev)
                }
            })
    //   this.isValid = regex.test(ev)
        },
        createTimings() {
            var count = 0
            if(this.office.daysOfweek.filter(e => e.isValid === false).length > 0){
                return;
            }
            let arr = []
            this.office.daysOfweek.forEach(element => {
                if(element.start_time != null && element.end_time != null){
                    count++;
                }
                var date = new Date(element.min_hours)
             

                    arr.push({
                        day_of_week:element.name,
                        starting_time:element.start_time,
                        ending_time:element.end_time,
                        min_office_hours:element.min_hours,
                        
                        
                    })
                
                
            });

            const data = {
                branch_id:this.office.branches.id,
                user_id:this.office.users ? this.office.users.id : null,
                branch_id:this.office.branches.id,
                office_days:count,
                officeDayTime:arr
            }
            this.$store.dispatch('officeTimings/update',{payload:data, id:this.officeId}).then(() => {
                this.$refs['edit-office-timings-modal'].hide()
                this.resetform()
            })
            console.log(data);
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
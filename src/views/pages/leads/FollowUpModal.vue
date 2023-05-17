<template>
    <!-- <div> -->
    <b-modal no-close-on-backdrop id="follow-up-modal" ref="follow-up-modal" size="lg" :title="'ADD NEW FOLLOW UP'" hide-footer>
      <b-form @submit.prevent="onSubmit()">

      <b-row>
        <b-col md="3">
          <b-form-group label="Follow Up Type *">
  
            <v-select @input="checkValid" v-model="composeData.follow_up" label="name" :options="emails_contact" placeholder="Select Type">
              <template #option="item">
                <span v-if="item.name == 'Visit'">
                  <feather-icon icon="FileIcon" size="18" />
                  {{ item.name }}
                </span>
                <span v-if="item.name == 'Email'">
                  <feather-icon icon="MailIcon" size="18" />
                  {{ item.name }}
                </span>
                <span v-if="item.name == 'Phone'">
                  <feather-icon icon="PhoneIcon" size="18" />
                  {{ item.name }}
                </span>
              </template>
              <template #selected-option="item">
                <span v-if="item.name == 'Visit'">
                  <feather-icon icon="FileIcon" size="18" />
                  {{ item.name }}
                </span>
                <span v-if="item.name == 'Email'">
                  <feather-icon icon="MailIcon" size="18" />
                  {{ item.name }}
                </span>
                <span v-if="item.name == 'Phone'">
                  <feather-icon icon="PhoneIcon" size="18" />
                  {{ item.name }}
                </span>
              </template>
            </v-select>
            <b-form-invalid-feedback class="d-block">
              {{ errors.follow_up }}
            </b-form-invalid-feedback>
          </b-form-group>
  
        </b-col>
        <b-col md="3">
          <b-form-group label="Description *">
            <b-form-input @input="checkValid" v-model="composeData.subject" placeholder="Enter Description"></b-form-input>
            <!-- <v-select multiple v-model="composeData.to" :options="emails_contact" placeholder="Select To"></v-select> -->
            <b-form-invalid-feedback class="d-block">
              {{ errors.subject }}
            </b-form-invalid-feedback>
          </b-form-group>
  
        </b-col>
        <b-col md="3">
          <b-form-group label="Date">
            <!-- <b-form-input  v-model="composeData.date"></b-form-input> -->
            <!-- <input type="text" class="form-control my-custom-select" style="cursor:pointer;border:1px solid black;"
                    @click=" openCalendar() "  placeholder="Choose Date" /> -->
                  <VueDatePicker format="DD-MM-YYYY" style="border:1px solid #d8d6de;border-radius: 0.357rem;"
                     v-model=" composeData.date "
                    :id=" 'vue-date-pickr-follow'" :minDate=" currentDate " />
            <!-- <v-select multiple v-model="composeData.to" :options="emails_contact" placeholder="Select To"></v-select> -->
          </b-form-group>
  
        </b-col>
        <b-col md="3">
          <b-form-group label="Time">
            <b-form-input type="time" @input="checkValid" v-model="composeData.time"></b-form-input>
            <!-- <v-select multiple v-model="composeData.to" :options="emails_contact" placeholder="Select To"></v-select> -->
            <b-form-invalid-feedback class="d-block">
              {{ errors.time }}
            </b-form-invalid-feedback>
          </b-form-group>
  
        </b-col>
       
      
  
        
      </b-row>

      
      <div class="text-right">
         <b-button size="sm" @click="() => {
          $refs['follow-up-modal'].hide(),
          resetFollowUp()
         }" variant="primary" class="mr-1">
          Cancel
        </b-button>
         <b-button :disabled="$store.state.followUp.isLoading" type="submit" size="sm" variant="primary">
          Create
          <b-spinner v-if="$store.state.followUp.isLoading" small style="margin-left:0.5rem"></b-spinner>
        </b-button>
        
      </div>
    </b-form>
    </b-modal>
    <!-- </div> -->
  </template>
  <script>
import { VueDatePicker } from '@mathieustan/vue-datepicker';

  import { BFormInvalidFeedback,BSpinner,
    BRow, BFormGroup, BCol, BImg, BMedia, BMediaAside, BModal,
    BCard, BCardHeader, BAvatar, BForm, BFormInput, BInputGroup, BButton, BAvatarGroup, VBTooltip
  } from 'bootstrap-vue'
  import VuePerfectScrollbar from 'vue-perfect-scrollbar'
  //   import ChatLog from './ChatLog.vue'
  //   import SearchMessages from './SearchMessages.vue'
  //   import ChatFormVue from './ChatForm.vue'
  //   import TodoLeftSidebar from './TodoLeftSidebar.vue'
  import FeatherIcon from '@/@core/components/feather-icon/FeatherIcon.vue'
  import Echo from 'laravel-echo'
  import { quillEditor } from 'vue-quill-editor'
  import vSelect from 'vue-select'
  
  
  //import ChatLog from '/ChatLog.vue'
  //import Vue from 'vue';
  import axios from 'axios';
  import { ref } from 'vue-demi'
import store from '@/store'
  //import VueAxios from 'vue-axios'
  //Vue.use(VueAxios,axios)
  export default {
    components: {
      BAvatarGroup, BModal,
      VBTooltip,
      //   SearchMessages,
      vSelect,BSpinner,
      BCard,
      BCardHeader,
      BAvatar,
      VueDatePicker,BFormInvalidFeedback,
      BRow, BFormGroup, BCol, BImg, BMedia, BMediaAside,
      quillEditor,
      // TodoLeftSidebar,
      BForm,
      BFormInput,
      BInputGroup,
      BButton,
      // SFC
      //   ChatLog,
      //   ChatFormVue,
      // 3rd party
      VuePerfectScrollbar,
      FeatherIcon
    },
    data() {
      const date = new Date();

let day = date.getDate();
let month = date.getMonth() + 1;
let year = date.getFullYear();
let hours = date.getHours();
      let minutes = date.getMinutes();
      let seconds = date.getSeconds();
      return {
        currentTime:null,
        editorOption: {
          modules: {
            toolbar: [['bold', 'italic', 'underline', 'strike', { 'script': 'sub' }, { 'script': 'super' }], ['clean'], [{ 'color': [] }, { 'background': [] }], [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'align': [] }], ['image'], [{ 'header': [] }, { 'font': [] }, { 'size': [] }], ['link']],
          },
          placeholder: 'Message',
        },
      currentDate: `${year}-${month}-${day}`,
        errors:{
          follow_up:'',
          subject:'',
          time:''
        },
        composeData: {
          message: '',
          follow_up:null,
          to: [],
          cc: [],
          date:`${year}-${month}-${day}`,
          bcc: [],
          subject:'',
          time:`${hours}:${minutes}`,
          from: null
        },
        proposalPdf: 'PL-0009.pdf',
        file_name: [],
        previewImage: null,
        file: null,
        image: null,
  
      }
    },
    // props: {
      
    //   replySubject: {
    //     type: String,
    //     required: true
    //   },
    //   signature: {
    //     type: String,
    //     required: true
    //   },
    //   taskDetails: {
    //     type: Object,
    //     required: true
    //   }
    // },
    computed: {
      emails_contact() {
        // return this.$store.state.contactPeople.allForLeads
        var data = [];
        let items = []
        // var index2 = [];
        // for (let index = 0; index < this.$store.state.contactPeople.all.length; index++) {
        // index2[index] = [index];

        // for (let i = 0; i < this.$store.state.contactPeople.emails.length; i++) {
  
        //   data[i] = this.$store.state.contactPeople.emails[i];
        // }
        // }
        // return index2;

            data = this.$store.state.followUp.allActivity
          data.forEach(element => {
            if(element.status == 'active'){
              items.push({
                id:element.id,
                name:element.name
                
              })
            }
          });
        return items;
      },
    
    },
    mounted(){

      // this.$store.dispatch('followUp/fetchActivity')
    },
    created(){
      this.updateTime()
      setInterval(this.updateTime(), 1000); // update the time every second

        // this.$store.dispatch('followUp/fetchActivity')
    },
 
    updated(){
      // this.updateTime()
     
    },
    methods: {
      checkValid(){
        if(this.composeData.follow_up){
          this.errors.follow_up = null
        }
        if(this.composeData.subject){
          this.errors.subject = null
        }
        if(this.composeData.date === this.currentDate && (this.to24HourFormat(data.time) > this.to24HourFormat(this.currentTime))){
          this.errors.time = null
          
        }
        if(this.composeData.date !== this.currentDate){
          this.errors.time = null
        }
      },
      onSubmit(){
        let data = this.composeData
        if(!data.follow_up ){
          this.errors.follow_up = 'This field is required!'

        }
        if(!data.subject){
          this.errors.subject = 'This field is required!'
          
        }
        
        if(data.date === this.currentDate && (this.to24HourFormat(data.time) < this.to24HourFormat(this.currentTime))){
          this.errors.time = 'The time should not be less than the current time!'
          
        }
        
        if(!data.follow_up || !data.subject || (data.date === this.currentDate && (this.to24HourFormat(data.time) < this.to24HourFormat(this.currentTime)))){
          return;
        }
        if(data.follow_up && data.subject){
          const data = {
            task_id: this.$store.state.leads.expandedTaskId,
            _activity_type_id:this.composeData.follow_up.id,
            description:this.composeData.subject,
            date:this.composeData.date,
            time:this.composeData.time
          }
          this.$store.dispatch('followUp/store',data).then(() => {
            
            this.$store.dispatch('followUp/get', this.$store.state.leads.expandedTaskId).then(() => {
              this.$refs['follow-up-modal'].hide()
              this.resetFollowUp()
            })
          })
        }
      },
      to24HourFormat(time12) {
      const [time, period] = time12.split(' ');
      const [hours, minutes] = time.split(':');
      let hours24 = parseInt(hours);
      if (period === 'PM' && hours24 !== 12) {
        hours24 += 12;
      } else if (period === 'AM' && hours24 === 12) {
        hours24 = 0;
      }
      return hours24 * 60 + parseInt(minutes);
    },
      resetFollowUp(){
        this.composeData.subject = null;
        this.composeData.follow_up = null
        this.composeData.date = this.currentDate;
        this.updateTime()
        this.composeData.time = this.currentTime
      },
      updateTime() {
      const date = new Date();
      const hours = date.getHours();
      const minutes = date.getMinutes();
      const seconds = date.getSeconds();
      this.composeData.time = `${hours}:${minutes}`;
      this.currentTime = `${hours}:${minutes}`;

    },
      openCalendar(id) {
      document.getElementById('vue-date-pickr-follow').click()
    },
      handleUpload(e) {
  
      },
    
    },
    setup(){
    }
  }
  </script>
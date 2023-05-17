<template>
  <div>
    <create-sidebar :is-create-sidebar-active.sync="isCreateSidebarActive" @refetch-data="fetchAll" />
    <!-- <edit-sidebar :is-edit-sidebar-active.sync="isEditSidebarActive" :edit-item.sync="editItem"
        @refetch-data="fetchAll" /> -->


    <!-- <div class="mt-2 mb-2">
      <b-row>
        <b-col cols="12" md="6" class="d-flex align-items-center justify-content-start mb-1 mb-md-0" />
        <b-col cols="12" md="6">
          <div class="d-flex align-items-center justify-content-end">
            <div class="btn-filter">

             
              <create-email />
            </div>
           

          </div>

        </b-col>
      </b-row>
    </div> -->


    <div class="mt-2 mb-2">


<div class="btn-filter d-flex justify-content-between align-items-center">
    <span >

MAIL SETTINGS 
 </span>
    &emsp;
   
                      <create-email />

                  
    <!-- </div> -->
</div>
<hr style="border-color: #F75949;">



</div>

    <b-card no-body >



      <b-table id="email-config" class="mb-0" selectable :per-page="perPage" responsive :current-page="currentPage" :items="items" :show-empty="items.length === 0"
        :fields="fields" :select-mode="'single'" @row-clicked="expandDetails">
        <template #row-details="item">
          
          <b-card>

            <div class="d-flex justify-content-between" style="text-transform: uppercase;"> <b>
                Mail Settings
              </b>
              <div>
                <b-button v-b-toggle.collapse-1 size="sm" variant="primary">
                  How to do
                </b-button>
              </div>
              <!-- <div>
                <feather-icon @click="isEditSidebarActive = true;
                editItem = item.item" icon="EditIcon" size="20" />
              </div> -->
            </div>
            <hr style="border-color:#F75949">

            <b-collapse id="collapse-1" class="mt-2">
    <b-card class=" mb-0">
      <b-card-text class="card-text">
        <ul class="steps-inbound" style="margin-top:-1rem;margin-left:-4.5rem;list-style: none;">
          <li>
              <feather-icon icon="ChevronsRightIcon" size="20" />
              <span>First Login to your Gmail Account with the above email</span>
          </li>
          <li>
              <feather-icon icon="ChevronsRightIcon" size="20" />
              <span>Go to Manage your Google Account</span>
          </li>
          <li>
              <feather-icon icon="ChevronsRightIcon" size="20" />
              <span>Go to Security Tab</span>
          </li>
          <li>
              <feather-icon icon="ChevronsRightIcon" size="20" />
              <span>Enable Two Step Verification (if disabled)</span>
          </li>
          <li>
              <feather-icon icon="ChevronsRightIcon" size="20" />
              <span>Go To App Password in Security Tab</span>
          </li>
          <li>
              <feather-icon icon="ChevronsRightIcon" size="20" />
              <span>Create a Password and copy it</span>
          </li>
          <li>
              <feather-icon icon="ChevronsRightIcon" size="20" />
              <span>Put that Password in the below password field (inbound and outbound)</span>
          </li>
        </ul>
      </b-card-text>
      
      
    </b-card>
  </b-collapse>
            <b-row style="margin-left: -2rem;">




              <b-container class="ml-0">
                <!-- <b-row class=""> -->
                  <b-form>
                  <b-col md="12">

                      <b-form-group label="Email" class="" label-for="mc-first-name">
                        <b-form-input id="mc-first-name" placeholder="Email" v-model="email" />
                        
                      </b-form-group>
                    </b-col>
                    <b-col>
                       <b-button size="sm" v-ripple.400="'rgba(255, 255, 255, 0.15)'" type="submit" variant="primary" class="mr-1"
                      @click="UpdateEmail(item.item)" :disabled="isLoadingEmail">
                      Update
                      <b-spinner small class="ml-1" v-if="isLoadingEmail" />
                    </b-button>
                    </b-col>
                  </b-form>
                    <!-- <b-button
                      v-ripple.400="'rgba(186, 191, 199, 0.15)'"
                      type="reset"
                      variant="outline-secondary"
                      >
                      Reset
                    </b-button> -->
                  <!-- </b-col> -->
                  <!-- </b-row> -->
                </b-container>



            </b-row>

            <b-card style="margin-left: -1.5rem;">


              <b-row>

                <b-col md="6">
                  <b-card-text>

                    <b-row>

                      <b class="ml-1 text-uppercase" style="font-size: 17px;">
                        Email Inbound Settings
                      </b>
                    </b-row>
                  </b-card-text>
               
               
                  <b-form class="mt-2" @submit.prevent="" autocomplete="off">
                    <b-row>
                      <b-col cols="12">
                        <b-form-group label="Method" label-cols-md="4">

                          <v-select required placeholder="Select the Method" v-model="mail_inbound.mail_transport" label="option"
                            :options="mail_inbound.method">

                          </v-select>
                        </b-form-group>
                      </b-col>
                      <b-col cols="12">
                        <b-form-group label="Host" label-for="h-host" label-cols-md="4">
                          <!-- <b-form-input v-if="email_master.email_inbound !== null" id="h-host" @input="'hh'" v-model="mail_host" type="text" placeholder="Host" /> -->
                          <b-form-input required id="h-host" v-model="mail_inbound.mail_host" type="text" placeholder="Host" />

                        </b-form-group>
                      </b-col>

                      <b-col cols="12">
                        <b-form-group label="Port" label-for="h-port" label-cols-md="4">
                          <b-form-input required id="h-port" v-model="mail_inbound.mail_port" type="number" placeholder="Port" />
                        </b-form-group>
                      </b-col>
                      <b-col cols="12">
                        <b-form-group label="Username" label-for="h-email" label-cols-md="4">
                          <b-form-input autocomplete="off" required id="h-email"
                            onfocus="this.removeAttribute('readonly')" v-model="mail_inbound.mail_username" type="email"
                            placeholder="Username" />
                        </b-form-group>
                      </b-col>

                      <b-col cols="12">
                        <b-form-group label="Password" label-for="h-password" label-cols-md="4">
                          <b-form-input required autocomplete="off" onfocus="this.removeAttribute('readonly')"
                            id="h-password" v-model="mail_inbound.mail_password" type="password" placeholder="Password" />
                        </b-form-group>
                      </b-col>
                      <b-col cols="12">
                        <b-form-group label="Encryption" label-for="h-encryption" label-cols-md="4">
                          <v-select required id="h-ecryption" v-model="mail_inbound.mail_encryption"
                            placeholder="Select the Encryption" label="option" :options="mail_inbound.encrypt" />
                        </b-form-group>
                      </b-col>
                      <!-- <b-col
            md="8"
            offset-md="4"
          >
            <b-form-group>
              <b-form-checkbox
                id="checkbox-2"
                name="checkbox-2"
                value="Remember_me"
              >
                Remember me
              </b-form-checkbox>
            </b-form-group>
          </b-col> -->

                      <!-- submit and reset -->
                      <b-col offset-md="4">
                         <b-button size="sm" v-ripple.400="'rgba(255, 255, 255, 0.15)'" type="submit" variant="primary"
                          class="mr-1" :disabled="inBoundLoading" @click="responseInbound(item.item)">
                          Submit
                          <b-spinner small class="ml-1" v-if="inBoundLoading" />

                        </b-button>
                         <b-button size="sm" v-ripple.400="'rgba(186, 191, 199, 0.15)'" type="reset" variant="outline-secondary">
                          Reset
                        </b-button>
                      </b-col>
                    </b-row>

                  </b-form>
                </b-col>

                <b-col md="6">
                  <b-card-text>

                    <b-row >

                      <b class="spacing text-uppercase ml-1" style="font-size: 17px;">
                        Email Outbound Settings
                      </b>
                     
                    </b-row>
                  </b-card-text>
              
               
                  <b-form class="mt-2" @submit.prevent="" autocomplete="off">
                    <b-row>
                      <b-col cols="12">
                        <b-form-group label="Method" label-cols-md="4">

                          <v-select required placeholder="Select the Method" disabled v-model="mail_outbound.method" label="option"
                            :options="mail_outbound.method">

                          </v-select>
                        </b-form-group>
                      </b-col>
                      <b-col cols="12">
                        <b-form-group label="Host" label-for="h-host" label-cols-md="4">
                          <!-- <b-form-input v-if="email_master.email_inbound !== null" id="h-host" @input="'hh'" v-model="mail_host" type="text" placeholder="Host" /> -->
                          <b-form-input required id="h-host" v-model="mail_outbound.mail_host" type="text" placeholder="Host" />

                        </b-form-group>
                      </b-col>

                      <b-col cols="12">
                        <b-form-group label="Port" label-for="h-port" label-cols-md="4">
                          <b-form-input required id="h-port" v-model="mail_outbound.mail_port" type="number" placeholder="Port" />
                        </b-form-group>
                      </b-col>
                      <b-col cols="12">
                        <b-form-group label="Username" label-for="h-email" label-cols-md="4">
                          <b-form-input autocomplete="off" required id="h-email"
                            onfocus="this.removeAttribute('readonly')" v-model="mail_outbound.mail_username" type="email"
                            placeholder="Username" />
                        </b-form-group>
                      </b-col>

                      <b-col cols="12">
                        <b-form-group label="Password" label-for="h-password" label-cols-md="4">
                          <b-form-input required autocomplete="off" onfocus="this.removeAttribute('readonly')"
                            id="h-password" v-model="mail_outbound.mail_password" type="password" placeholder="Password" />
                        </b-form-group>
                      </b-col>
                      <b-col cols="12">
                        <b-form-group label="Encryption" label-for="h-encryption" label-cols-md="4">
                          <v-select required id="h-ecryption" v-model="mail_outbound.mail_encryption"
                            placeholder="Select the Encryption" label="option" :options="mail_outbound.encrypt" />
                        </b-form-group>
                      </b-col>
                      <!-- <b-col
            md="8"
            offset-md="4"
          >
            <b-form-group>
              <b-form-checkbox
                id="checkbox-2"
                name="checkbox-2"
                value="Remember_me"
              >
                Remember me
              </b-form-checkbox>
            </b-form-group>
          </b-col> -->

                      <!-- submit and reset -->
                      <b-col offset-md="4">
                         <b-button size="sm" v-ripple.400="'rgba(255, 255, 255, 0.15)'" type="submit" variant="primary"
                          class="mr-1" :disabled="outBoundLoading" @click="responseOutBound(item.item)">
                          Submit
                          <b-spinner small class="ml-1" v-if="outBoundLoading" />

                        </b-button>
                         <b-button size="sm" v-ripple.400="'rgba(186, 191, 199, 0.15)'" type="reset" variant="outline-secondary">
                          Reset
                        </b-button>
                      </b-col>
                    </b-row>

                  </b-form>
                </b-col>
              </b-row>
            </b-card>


            <!-- <b-card-text > -->
            <!-- <b-col cols="4" class="d-flex">
                    <span style="font-weight: bolder;">Edit Email :</span>
                    <div class="ml-2">

                      {{ item.item }}
                    </div>
                    
                    
                  </b-col> -->
            <!-- </b-card-text> -->






            <!-- </b-row> -->






            <!-- about -->



          </b-card>


        </template>
        <template #cell(Email)="data">
          {{ data.item.email }}
        </template>
        <template #cell(Inbound)="data">
          <feather-icon size="22" v-if="data.item.inbound_status === 'tick'" icon="CheckIcon" />
          <feather-icon size="22" v-if="data.item.inbound_status === 'cross'" icon="XIcon" />
          <feather-icon size="22" v-if="data.item.inbound_status === 'alert'" icon="AlertCircleIcon" />



        </template>
        <template #cell(Outbound)="data">
          <feather-icon size="22" v-if="data.item.outbound_status === 'tick'" icon="CheckIcon" />
          <feather-icon size="22" v-if="data.item.outbound_status === 'cross'" icon="XIcon" />
          <feather-icon size="22" v-if="data.item.outbound_status === 'alert'" icon="AlertCircleIcon" />

        </template>
        <template #cell(actions)="data">
          <b-dropdown variant="link" no-caret :right="$store.state.appConfig.isRTL">

            <template #button-content>
              <feather-icon icon="MoreVerticalIcon" size="16" class="align-middle text-body" />
            </template>
            <span class="align-middle " variant="outline-secondary">
              <b-dropdown-item>
                <!-- <feather-icon icon="EditIcon" /> <span class="align-middle ml-50" variant="outline-secondary" @click="
                  isEditSidebarActive = true;
                editItem = data.item;">Edit</span> -->
                <feather-icon icon="EditIcon" /> Edit
              </b-dropdown-item>
            </span>
            <span class="align-middle " variant="outline-danger" @click="destroyItem(data.item.id)">
              <b-dropdown-item>
                <feather-icon icon="TrashIcon" />
                Delete
              </b-dropdown-item>
            </span>

          </b-dropdown>

        </template>
      </b-table>
      <div v-if="items.length > 0" class="mx-2 mb-2">
        <b-row>

          <b-col cols="12" sm="6" class="d-flex align-items-center justify-content-center justify-content-sm-start">
            <!-- <span class="text-muted">Showing {{ items.from }} to {{ items.to }} of {{ items.total }} entries</span> -->
          </b-col>
          <!-- Pagination -->
          <b-col cols="12" sm="6" class="d-flex align-items-center justify-content-center justify-content-sm-end">

            <b-pagination v-model="currentPage" :total-rows="totalCount" :per-page="perPage" first-number last-number
              class="mb-0 mt-1 mt-sm-0" prev-class="prev-item" next-class="next-item">
              <template #prev-text>
                <feather-icon icon="ChevronLeftIcon" size="18" />
              </template>
              <template #next-text>
                <feather-icon icon="ChevronRightIcon" size="18" />
              </template>
            </b-pagination>

          </b-col>

        </b-row>
      </div>
    </b-card>
    <!-- <b-spinner label="Loading..." variant="primary" v-if="isLoading" /> -->
    <div class="text-center">
      <b-spinner v-if="isLoading" />

    </div>

  </div>
</template>
  
<script>
// import Vue from 'vue'
// import DisableAutocomplete from 'vue-disable-autocomplete';
// Vue.use(DisableAutocomplete);
import {
  VBToggle,BCollapse,
  BCard, BContainer, BForm, BCardText, BRow, BCol, BTable, BButton, BFormInput, BPagination, BSpinner, BDropdown, BDropdownItem, BAvatarGroup, BAvatar, BFormGroup, BIconStarFill,
} from 'bootstrap-vue'
import { ref } from '@vue/composition-api'
// import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import Ripple from 'vue-ripple-directive'
// import parse from 'html-dom-parser'
// import { required } from 'vee-validate/dist/rules'
// import 'bootstrap-vue/dist/bootstrap-vue-icons.min.css'
import CreateSidebar from './CreateSidebar.vue'
// import EditSidebar from './EditSidebar.vue'
import vSelect from 'vue-select'
// import axios from 'axios'
import store from '@/store'
// import router from '@/router'
// import "vue-toastification/dist/index.css";
import CreateEmail from './CreateEmail.vue'
// import { useToast } from 'vue-toastification/composition';
// import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'


export default {
  components: {
    CreateEmail,
    BCard, BPagination, BContainer,
    BSpinner, BCardText,
    BFormInput, BForm,
    BRow,
    // ToastificationContent,
    BCol,
    BFormGroup,
    BIconStarFill,
    BTable,
    BButton,
    BDropdown,
    // eslint-disable-next-line vue/no-unused-components
    // VBTooltip,
    BAvatarGroup,
    BAvatar,
    BDropdownItem,
    vSelect,
    BCollapse,
    CreateSidebar,
    // EditSidebar,
  },
  directives: {
    // 'b-tooltip': VBTooltip,
    'b-toggle': VBToggle,
    Ripple,
    // required,
  },
  data() {
    return {
      mail_outbound:{

        method : [{option:'SMTP'}],
        mail_transport: "",
        encrypt: [{ option: 'SSL' }, { option: 'TLS' }, { option: 'STARTLS' }],
        // codeHorizontal,
        mail_encryption: "",
        mail_host: "",
        mail_port: "",
        mail_username: "",
        mail_password: "",
      },
      mail_inbound: {

        method: [{ option: 'POP' }, { option: 'IMAP' }],
        mail_transport: "",
        encrypt: [{ option: 'SSL' }, { option: 'TLS' }, { option: 'STARTLS' }],
        // codeHorizontal,
        mail_encryption: "",
        mail_host: "",
        mail_port: "",
        mail_username: "",
        mail_password: "",
      },
      email_master:{},
      email: '',

      // fields: ["subject", "description","actions"],

      // option: [{ title: "open" }, { title: "closed" }, { title: "overdue" }],
      selected: { title: "open" },

      fields: ['Email', 'Inbound', 'Outbound'],

      selected: 1,
      detailsRow:null,

      a: {}
    }
  },
  computed: {
    isLoading() {
      return this.$store.state.emails.isLoading
    },
    isLoadingEmail() {
      return this.$store.state.emails.isLoadingEmail
    },
    outBoundLoading(){
      return this.$store.state.emails.out_bound_loading;
    },
    inBoundLoading(){
      return this.$store.state.emails.in_bound_loading;
    },
    SuccessMessage() {
      return this.$store.state.emails.successMessage
    },
    ErrorMessage() {
      return this.$store.state.emails.errorMessage
    },
    errors() {
      return JSON.parse(JSON.stringify(this.$store.state.emails.errors))
    },
    totalCount() {
      return this.$store.state.emails.all.length;

    },
    items() {
      return this.$store.state.emails.all
    },
    single_out_bound(){
      return this.$store.state.emails.single_outbound_emails
    }
  },
  created() {
    this.fetchAll()
    // this.get_outbound_emails()
    // this.get_inbound_emails();

  },
  methods: {
 
    UpdateEmail(item) {
      // id: id,
      let payload = {
        email: this.email
      };
      // console.log(update);
      this.$store.dispatch('emails/update', {
        id: item.id,
        payload
      }).then(() => {
        if (this.SuccessMessage != "") {
          this.$toast.success(this.SuccessMessage, {
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
        }
        var currentIndex = this.items.findIndex(p => p.id === item.id);
        var updateEmail = this.$store.state.emails.single_emails;
        this.items.splice(currentIndex, 1 , updateEmail);
      }).catch(() => {
        if(this.ErrorMessage != ""){
          this.$toast.error(this.ErrorMessage, {
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
        }
      })
    },
    expandDetails(item){
  
      const { detailsRow } = this
      if (detailsRow && detailsRow !== item) {
        detailsRow._showDetails = false;
      }

      this.$set(item, '_showDetails', !item._showDetails
        )
        this.detailsRow = item;

      this.get_inbound_emails(item);
      this.get_outbound_emails(item)
       
      this.email = item.email

    },
    get_outbound_emails(item){
      this.mail_outbound.mail_host = item.email_outbound ? item.email_outbound.mail_host : ''
        this.mail_outbound.mail_port = item.email_outbound ? item.email_outbound.mail_port : ''
        this.mail_outbound.mail_username = item.email_outbound ? item.email_outbound.mail_username : ''
        this.mail_outbound.mail_password = item.email_outbound ? item.email_outbound.mail_password : ''
        this.mail_outbound.mail_port = item.email_outbound ? item.email_outbound.mail_port : ''
        this.mail_outbound.mail_transport = item.email_outbound ? item.email_outbound.mail_transport.toUpperCase() : ''

        this.mail_outbound.mail_encryption = item.email_outbound ? {option:  item.email_outbound.mail_encryption.toUpperCase()} : null


    },

    responseOutBound(item) {
      const blankFormData = {
        id: item.id,
        mail_transport: "smtp",
        mail_host: this.mail_outbound.mail_host,
        mail_port: this.mail_outbound.mail_port,
        mail_username: this.mail_outbound.mail_username,
        mail_password: this.mail_outbound.mail_password,
        mail_encryption: this.mail_outbound.mail_encryption

      };
      if(item.email_outbound === null){
        // console.log('hello it error');
        this.$store.dispatch('emails/storeEmailOutbound',
        blankFormData
      ).then(() => {
        if (this.SuccessMessage != "") {

          this.$toast.success(this.SuccessMessage, {
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
        }

      }).catch(() => {
        if (this.ErrorMessage != "") {

          this.$toast.error(this.ErrorMessage, {
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
        }
      })
    }
    if(item.email_outbound !== null){
      store.dispatch('emails/update_email_outbound',{
        payload:blankFormData,
        id: item.id
      }).then(() => {

        if (this.SuccessMessage != "") {
          

          this.$toast.success(this.SuccessMessage, {
            position: 'bottom-left',
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
          
        }
        // this.fetchAll()
        var currentIndex = this.items.findIndex(p => p.id === item.id);
       console.log(currentIndex);
        var updateEmail =  this.$store.state.emails.single_outbound_emails
        this.items.splice(currentIndex, 1 , updateEmail)
        
      }).catch(() => {
        if (this.ErrorMessage != "") {

          this.$toast.error(this.ErrorMessage, {
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
        }
      })
    }
    // this.get_outbound_emails(item)

    },

    get_inbound_emails(item){
      this.mail_inbound.mail_host = item.email_inbound ? item.email_inbound.mail_host : ''
        this.mail_inbound.mail_port = item.email_inbound ? item.email_inbound.mail_port : ''
        this.mail_inbound.mail_username = item.email_inbound ? item.email_inbound.mail_username : ''
        this.mail_inbound.mail_password = item.email_inbound ? item.email_inbound.mail_password : ''
        // this.mail_port = this.items.email_inbound.mail_port ?? ''
        this.mail_inbound.mail_transport = item.email_inbound ? {option: item.email_inbound.mail_transport.toUpperCase() } :null

        this.mail_inbound.mail_encryption = item.email_inbound ? {option:  item.email_inbound.mail_encryption.toUpperCase()} : null


    },
    responseInbound(item) {
      const blankFormData = {
        id: item.id,
        mail_transport: this.mail_inbound.mail_transport,
        mail_host: this.mail_inbound.mail_host,
        mail_port: this.mail_inbound.mail_port,
        mail_username: this.mail_inbound.mail_username,
        mail_password: this.mail_inbound.mail_password,
        mail_encryption: this.mail_inbound.mail_encryption

      };
      console.log(blankFormData);
      if(item.email_inbound === null){
        

        this.$store.dispatch('emails/storeEmailInbound',
        blankFormData
      ).then(() => {
        if (this.SuccessMessage != "") {
          
          this.$toast.success(this.SuccessMessage, {
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
        }
        
      }).catch(() => {
        if (this.ErrorMessage != "") {
          
          this.$toast.error(this.ErrorMessage, {
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
        }
      })
    }
    if(item.email_inbound !== null) {
      
      this.$store.dispatch('emails/update_email_inbound',{
        payload: blankFormData,
        id: item.id
      }).then(() => {
        if (this.SuccessMessage != "") {
          
          this.$toast.success(this.SuccessMessage, {
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
        }
        var currentIndex = this.items.findIndex(p => p.id === item.id);
       console.log(currentIndex);
        var updateEmail =  this.$store.state.emails.single_inbound_emails
        this.items.splice(currentIndex, 1 , updateEmail)
      }).catch(() => {
        if (this.ErrorMessage != "") {
          
          this.$toast.error(this.ErrorMessage, {
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
        }
      })
    }
    },
    // editEmail(index) {
    //   this.a = index;
    //   // router.push('emails/'+this.a[0].id)
    //   window.location.href = 'emails/' + this.a[0].id
    //   // console.log(this.a[0]);
    // },
    fetchAll() {
      this.$store.dispatch('emails/fetch')
    },
    // showEdit(index) {
    //   // console.log(index);
    //   this.a = index;
    //   window.location.href = 'emails/' + index
    // },

    // convertToTask() {
    //   const task = {
    //     type: 'task',
    //   }
    //   console.log(task)
    // },
    destroyItem(id) {
      // eslint-disable-next-line no-restricted-globals
      if (confirm('Are you sure do you want to delete this item?')) {
        this.$store.dispatch('emails/destroy', id).then(() => {
          this.fetchAll()
        })
      }
    },


    // eslint-disable-next-line consistent-return
    // AddEmployee(employee) {
    //   const findEmp = this.employee(employ => employ.title === employee.title)
    //   if (findEmp === undefined) { return findEmp }
    // },
  },
  setup() {
    const isCreateSidebarActive = ref(false)
    //   const isEditSidebarActive = ref(false)
    const editItem = ref({})
    //   const isFilterActive = ref(false)
    //   let statusOptions = ['Open', 'Completed','Invoiced','Closed']
    const perPage = ref(10)
    // const totalCount = ref(store.state.emails.all.length)
    const currentPage = ref(1)
    const perPageOptions = [10, 25, 50, 100]

    return {
      // Sidebar
      isCreateSidebarActive, perPage, currentPage, perPageOptions,
      // isEditSidebarActive,
      editItem,
      // isFilterActive,
      // statusOptions,
    }
  },
}
</script>
  
<style lang="scss" scoped>
.per-page-selector {
  width: 90px;
}
</style>
<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';

// @import 'bootstrap-vue/src/icons.scss';
//  @import '@/assets/scss/vendors/bootstrap-vue/_custom';
// @import '@/assets/scss/vendors/bootstrap-vue/index' ;
</style>
<style>
  /* @media (max-width: 550px){
    .spacing{
      margin-top: 2rem;
    }
  } */
  
</style>
<style>
.vs__open-indicator{
  fill: darkgray;
}

</style>
     <!--  <b-table responsive :items="items" :fields="fields" class="mb-0">
          <template #cell(actions)="data">
            <b-button
              @click="
                isEditSidebarActive = true;
                editItem = data.item;
              "
              variant="outline-secondary"
              class="btn-icon rounded-circle"
            >
              <feather-icon icon="EditIcon" class="mx-auto" />
            </b-button>
            <b-button
              @click="destroyItem(data.item.id)"
              variant="outline-danger"
              class="btn-icon rounded-circle ml-2"
            >
              <feather-icon icon="TrashIcon" class="mx-auto" />
            </b-button>
          </template>
        </b-table>-->
  
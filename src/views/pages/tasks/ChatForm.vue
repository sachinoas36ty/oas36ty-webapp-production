<template>
  <div>

    <validation-observer #default="{handleSubmit}" ref="refFormObserver">
    <b-form class="d-block chat-app-form" style="" @submit.prevent="handleSubmit(sendMessage)">

      <Mentionable style="width: 100%;" :keys="['@', '#']" :items="users_to_assign" offset="6" insert-space @open="onOpen"
        @apply="onApply">

        <!-- <textarea v-model="newMessage" /> -->
        <validation-provider #default="validationContext" name="newMessage" vid="comment" rules="required">
        <div class="input-group-merge" style="margin-left: -1rem;">

          <b-form-input   id="comment" v-model="newMessage" placeholder="Enter your message " />
          <b-form-invalid-feedback class="d-block">
                    {{ validationContext.errors[0] }}
                  </b-form-invalid-feedback>
                </div>
      </validation-provider>
        <template #no-result>
          <div class="dim">
            No result
          </div>
        </template>

        <template #item-@="{ item }">
          <div class="user">
            <b-avatar :src="item.avatar">

            </b-avatar>
            <span class="ml-1 mentionable-name">
              {{ item.value }}
            </span>
              <!-- ({{ item.name }}) -->
          </div>
        </template>

        <!-- <template #item-#="{ item }">
      <div class="issue">
        <span class="number">
          #{{ item.value }}
        </span>
        <span class="dim">
          {{ item.name }}
        </span>
      </div>
    </template> -->
      </Mentionable>
      <div class="text-right">
         <b-button size="sm" class="mr-1 "    @click="closeTask()" variant="primary">
          Close
        </b-button>
         <b-button size="sm"  @click="takeAction()" class="mr-1" variant="primary">
          <span v-if="$router.currentRoute.name == 'leads'">
            Convert to task
          </span> 
          <span v-if="$router.currentRoute.name == 'tasks'  && client.status_master.type == 'completed'">
            Reopen
          </span> 
          <span v-if="$router.currentRoute.name == 'tasks' && client.status_master.type != 'completed'">
            Mark as Complete
          </span> 
          <span v-if="$router.currentRoute.name == 'clients' && client.status_master.type != 'completed'">
            Mark as Complete
          </span> 
        </b-button>
        
         <b-button size="sm"  variant="primary" type="submit">
          Send
        </b-button>
      </div>
    </b-form>
  </validation-observer>
  <b-modal no-close-on-backdrop id="second-proposal-modal" ref="second-proposal-modal" size="md"
      title="convert to task" hide-footer>
      <ValidationObserver #default="{handleSubmit}" ref="refFormObserver">
      <b-form @submit.prevent="handleSubmit(convert_proposal)">

      <b-row>
        <b-col md="12">
          <validation-provider #default="validationContext" name="pclient" vid="client" rules="required">

          <b-form-group label="Client Name">
            <v-select id="client" v-model="pclient" :options="$store.state.clients.all" label="name" placeholder="Select Client" />
            <b-form-invalid-feedback v-if="validationContext.errors.length > 0" class="d-flex">
                        <!-- {{ validationContext.errors[0] }} -->
                        The Client field is required
                      </b-form-invalid-feedback>
          </b-form-group>
          </validation-provider>
        </b-col>
      </b-row>

      <b-row>
        <b-col md="12">
          <validation-provider #default="validationContext" name="proposal_amt" vid="value" rules="required">
          <b-form-group label="Value">
            <!-- <v-select :options="$store.state.clients.all" label="name" placeholder="Select Client" /> -->
            <b-form-input   id="value" v-model="proposal_amt"/>
            <b-form-invalid-feedback class="d-block">
                    {{ validationContext.errors[0] }}
                  </b-form-invalid-feedback>
          </b-form-group>
        </validation-provider>
        </b-col>
      </b-row>
      <div>
         <b-button size="sm" type="submit" variant="primary">
          Convert
        </b-button>
      </div>
    </b-form>
  </ValidationObserver>
      </b-modal>
  </div>
</template>
<!-- <script src="./mention.js"></script> -->
<script>
// var myMention = new Mention({
//     selector: 'textarea',
//     options: ['CSS', 'Script', '.Com']
// })
import { ValidationProvider, ValidationObserver } from 'vee-validate'

import { BRow,BCol,BFormGroup,BModal,BFormInvalidFeedback,BAvatar, BForm, BInputGroup, BFormInput, BButton } from 'bootstrap-vue'
import { Mentionable } from 'vue-mention'
// import Mention from './mention.js'
const users = [
  {
    value: 'akryum',
    firstName: 'Guillaume',
  },
  {
    value: 'posva',
    firstName: 'Eduardo',
  },
  {
    value: 'atinux',
    firstName: 'Sébastien',
  },
]

const issues = [
  {
    value: 123,
    label: 'Error with foo bar',
    searchText: 'foo bar'
  },
  {
    value: 42,
    label: 'Cannot read line',
    searchText: 'foo bar line'
  },
  {
    value: 77,
    label: 'I have a feature suggestion',
    searchText: 'feature'
  }
]
// import 'floating-vue/dist/style.css'
import 'floating-vue/dist/style.css'
import vSelect from 'vue-select'

import Pusher from 'pusher-js'
import formValidation from '@/@core/comp-functions/forms/form-validation'

export default {
  components: {
    BForm,ValidationObserver,ValidationProvider,
    Mentionable,BModal,BRow,BCol,BFormGroup,
    BInputGroup,BFormInvalidFeedback,
    BFormInput,vSelect,
    BAvatar,
    BButton
  },
  props:{
    user:{
      type:String,
      required:true,
    },
    client:{
      type:Object,
      required:true,
    }
  },
  data() {
    return {
      proposal_amt:0,
      pclient:this.client.company != null ? this.client.company : '',
      mentions: [{
        dataSource: [],
        searchExpr: 'text',
        displayExpr: 'text',
        valueExpr: 'text',
      }],
      pusher:null,
      channel:null,
      newMessage: "",
      search: '',
      limit_users: 4,
      offset_users: 0,
      items: [],
      comment_mentions:[]
    }
  },
  computed: {

    users_to_assign() {
      var items = this.$store.state.users.all;
      var data = [];
      var leads = this.$store.state.leads.all.filter(e => e.type === 'lead');
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
      this.items = data
      console.log(this.items);
      return data.filter((country) => country.name.toLocaleLowerCase().includes(this.search.toLocaleLowerCase()));
    },
    paginated_users_to_assign() {
      // this.users_to_assign.slice(this.offset_users, this.limit_users + this.offset_users)

      return this.users_to_assign.slice(this.offset_users, this.limit_users + this.offset_users)
    },
  },
  created(){
    
  },
  methods: {
    convert_proposal(){
      const date = new Date();

let day = date.getDate();
let month = date.getMonth() + 1;
let year = date.getFullYear();
      const data = {
        task_id: this.client.id,
  proposal_date: `${year}-${month}-${day}`,
  client_name: this.client.company != null ? this.client.company.name : this.pclient.name,
  concerned_person: this.client.contact_person.name,
  address: this.client.branch.name,
  subject: this.client.subject,
  prephase: "As per discussion, please find below the brief proposal",
  footer_title: "Thanking you,",
  footer_description: JSON.parse(localStorage.getItem('userData')).name+"<br/>For, "+JSON.parse(localStorage.getItem('userData')).tenant.organization.name +"<br/><br/>P:<br/>GSTIN:<br/>(Authorised Representative)",
  internal_notes: "Thanking you",
  proposalSection: [],
  proposalFees: [{
    description:this.client.subject,
    amount: this.proposal_amt
  }],
  type:'task',
  client_id:this.client.company != null ? this.client.company.id : this.pclient.id
      }
      console.log(data);
      this.$store.dispatch('proposals/create', data).then(() => {
        this.sendMessage();
        this.$store.dispatch('leads/fetch');
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
          rtl: false
        })
        
      })
    },
    closeTask(){
      if(!this.newMessage){

console.log(this.refFormObserver['fields'])
this.refFormObserver['errors'].comment.push('the newmessage field is required')
this.refFormObserver['fields']['comment'].failed = true
this.refFormObserver['fields']['comment'].failedRules.required = 'the newmessage field is required'
this.refFormObserver['fields']['comment'].validated = true
return;
}else{
  // alert('close task');
  const data = {
    task_id: this.client.id,
    status: {
      id:4,
      type:'closed'
    }
  };
  this.$store.dispatch('leads/markTask',data).then(() => {
    this.sendMessage()
    this.$store.dispatch('leads/fetch')

  })
}
    },
    takeAction(){
      if(this.client.status_master.type == 'completed'){
        const data = {
    task_id: this.client.id,
    status: {
      id:1,
      type:'open'
    }
  };
  this.$store.dispatch('leads/markTask',data).then(() => {
    this.sendMessage()
    this.$store.dispatch('leads/fetch')
    
  })
  return;
      }
      if(!this.newMessage){

      console.log(this.refFormObserver['fields'])
      this.refFormObserver['errors'].comment.push('the newmessage field is required')
      this.refFormObserver['fields']['comment'].failed = true
      this.refFormObserver['fields']['comment'].failedRules.required = 'the newmessage field is required'
      this.refFormObserver['fields']['comment'].validated = true
      return;
      }else{

        if(this.$router.currentRoute.name == 'leads'){
          // open modal to create proposal
          this.$refs['second-proposal-modal'].show()
        }else{
          // open modal to mark as complete task
          if(this.client.status_master.type != 'completed'){

          
         const data = {
    task_id: this.client.id,
    status: {
      id:2,
      type:'completed'
    }
  };
  this.$store.dispatch('leads/markTask',data).then(() => {
    this.sendMessage()
    this.$store.dispatch('leads/fetch')
    
  })
}
        }
      }
     
    },
    onOpen(key) {
      // this.items = key === '@' ? this.mentions[0].dataSource : ""
    },

    onApply(item, key, replacedWith) {
      this.comment_mentions.push({name:item.name, id:item.id})

      console.log(item, `has been replaced with ${replacedWith}`)
    },
    assignMention(user) {
      console.log(user);
      this.newMessage = '@' + user.name
    },
    SearchChange(assignee) {
      // alert(assignee)
      // console.log();
      // console.log(this.search.split('@'));
      if (assignee.includes('@')) {

        this.search = assignee.split('@')[1]
      }
      else if (!assignee.includes('@')) {
        this.search = null
      }
      else {
        this.search = ""
      }
    },
    subscribe_pusher() {
      this.pusher = new Pusher('2c89bc9e9569378716c0',{
      cluster:'ap2'
    });
    this.pusher.connect()
    this.pusher.connection.bind('connected', (data) => {
      console.log('connected');
    })
    var that = this;
    this.channel = this.pusher.subscribe('chat')
    this.channel.bind('MessageSent', (data) => {
      console.log(data);
      // that.chatData.push(data[0])
    })
    this.pusher.connection.bind('disconnected', (data) => {
      console.error('disconneccted');
    })
      // Pusher.logToConsole = true;
      // var options = new PusherOptions().setMaxReconnectionAttempts(1000000);
    //   var pusher = new Pusher('2c89bc9e9569378716c0', {
    //     cluster: 'ap2',
    //   });
    //   // pusher.signin()
    //   // console.log(pusher);
    //   pusher.connect()
    //  console.log(pusher.connection.state)
    //   pusher.subscribe('chat');
    //   pusher.bind('MessageSent', data => {

    //     console.log(data[0]);


    //     this.chatData.push(data[0])
    //   //   // console.log;
    //   });
      // console.log(pusher);
    },
    sendMessage() {
      // this.newMessage = this.newMessage.
      this.subscribe_pusher()
      this.$emit('messagesent', {
        user: this.user,
        comment: this.newMessage,//.replace(/@([a-z\d_]+)/ig,''),
        mentions: this.comment_mentions
      });

      this.newMessage = ''

      //this.$store.state.comments.all.push({comment:this.chatInputMessage})
      //   this.$store.dispatch("comments/store",{comment:this.chatInputMessage})
      //   then(()=>{

      //   });
      // this.items();

      // this.$store.dispatch('comments/fetch', 19)
      /* this.chatData.chat.chat.push({
        message: this.chatInputMessage,
        time: new Date(),
        senderId: 11,
      })*/
      //   this.chatInputMessage = ''

      // Update scroll position
      // Scroll to bottom
      //   this.$nextTick(() => {
      //     this.psToBottom()
      //   })
    },
  },
  setup(){
    const { refFormObserver, getValidationState } =
      formValidation();
      return {
        refFormObserver,
        getValidationState,
        formValidation,
      }
  }
}
</script>
<style>
.mentionable-name {
  background: yellow;
}
.mention-item {
  padding: 4px 10px;
  border-radius: 4px;
}
#second-proposal-modal .modal-dialog{
  /* max-width: 630px; */
}
.mention-selected {
  background: rgb(192, 250, 153);
}
</style>
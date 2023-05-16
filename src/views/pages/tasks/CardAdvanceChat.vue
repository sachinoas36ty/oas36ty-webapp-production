<template>
  <b-card
    class="chat-widget"
    no-body
  >
    <b-card-header>
      <div class="d-flex align-items-center">
        <b-avatar-group size="32px">
          <b-avatar  v-for="user in assignedUsers.users"
      v-b-tooltip.hover
      class="pull-up"
      :title="user.name"
        :src="user.avatar"
    />
  
   <!--  <b-avatar
      v-b-tooltip.hover
      class="pull-up"
      title="Elicia Rieske"
      variant="danger"
      :src="require('@/assets/images/portrait/small/avatar-s-8.jpg')"
    />-->
  
        </b-avatar-group>
        <!-- <b-avatar
          size="34"
          :src="require('@/assets/images/avatars/1.png')"
          class="mr-50 badge-minimal"
          badge
          badge-variant="success"
        />
       <h5 class="mb-0">
          Carrie Hawkins
        </h5>-->
      </div>
      <div class="d-flex align-items-end">
      
      <feather-icon
        icon="SearchIcon"
        size="18"
        class="cursor-pointer mr-1"
      />
      <feather-icon
        icon="MoreVerticalIcon"
        size="18"
        class="cursor-pointer mr-1"
      />
    
      </div>
     
    </b-card-header>

    <section class="chat-app-window">
      <!-- User Chat Area -->
      <vue-perfect-scrollbar
        ref="refChatLogPS"
       
        class="user-chats scroll-area"
      >
      
        <chat-log
          :chat-data="items"
          :profile-user-avatar="require('@/assets/images/avatars/10.png')"
        />
      </vue-perfect-scrollbar>

      <!-- Message Input -->
      <chat-form-vue
      v-on:messagesent="sendMessage"
                        :user="user"
 />
    </section>
  </b-card>
</template>

<script>
  
import {
  BCard, BCardHeader, BAvatar, BForm, BFormInput, BInputGroup, BButton, BAvatarGroup,  VBTooltip
} from 'bootstrap-vue'
import VuePerfectScrollbar from 'vue-perfect-scrollbar'
import ChatLog from './ChatLog.vue'
import Echo from 'laravel-echo'
import ChatFormVue from './ChatForm.vue'
import FeatherIcon from '@/@core/components/feather-icon/FeatherIcon.vue'
//import ChatLog from '/ChatLog.vue'
//import Vue from 'vue';
import axios from 'axios';
//import VueAxios from 'vue-axios'
//Vue.use(VueAxios,axios)
export default {
  components: {
    BAvatarGroup,
    VBTooltip,
    BCard,
    BCardHeader,
    BAvatar,
    BForm,
    BFormInput,
    BInputGroup,
    BButton,
    // SFC
    ChatLog,
    ChatFormVue,
    // 3rd party
    VuePerfectScrollbar,
    FeatherIcon
},
  directives: {
    'b-tooltip': VBTooltip,
  },
  data() {
    return {
      // perfectScrollbarSettings: {
      //   maxScrollbarLength: 150,
      //   wheelPropagation: false,
      // },
      chatInputMessage: '',
      chatData: {
        senderId:this.sender ?? 0,
        userId: JSON.parse(localStorage.getItem('userData')).id
        // chat: {
        //   id: 2, userId: 1, unseenMsgs: 0,
        //    chat:
        //    [
        //     { message: "How can we help? We're here for you!", time: 'Mon Dec 10 2018 07:45:00 GMT+0000 (GMT)', senderId: 11 }, { message: 'Hey John, I am looking for the best admin template. Could you please help me to find it out?', time: 'Mon Dec 10 2018 07:45:23 GMT+0000 (GMT)', senderId: 1 }, { message: 'It should be Bootstrap 4 compatible.', time: 'Mon Dec 10 2018 07:45:55 GMT+0000 (GMT)', senderId: 1 }, { message: 'Absolutely!', time: 'Mon Dec 10 2018 07:46:00 GMT+0000 (GMT)', senderId: 11 }, { message: 'Modern admin is the responsive bootstrap 4 admin template.!', time: 'Mon Dec 10 2018 07:46:05 GMT+0000 (GMT)', senderId: 11 }, { message: 'Looks clean and fresh UI.', time: 'Mon Dec 10 2018 07:46:23 GMT+0000 (GMT)', senderId: 1 }, { message: "It's perfect for my next project.", time: 'Mon Dec 10 2018 07:46:33 GMT+0000 (GMT)', senderId: 1 }, { message: 'How can I purchase it?', time: 'Mon Dec 10 2018 07:46:43 GMT+0000 (GMT)', senderId: 1 }, { message: 'Thanks, from ThemeForest.', time: 'Mon Dec 10 2018 07:46:53 GMT+0000 (GMT)', senderId: 11 }, { message: 'I will purchase it for sure. 👍', time: '2020-12-08T13:52:38.013Z', senderId: 1 }],
        // },
        // contact: {
        //   id: 1,
        //   fullName: 'Felecia Rower',
        //   // eslint-disable-next-line global-require
        //   avatar: [require('@/assets/images/avatars/1.png'),
        //   require('@/assets/images/portrait/small/avatar-s-5.jpg'),require('@/assets/images/portrait/small/avatar-s-7.jpg'),require('@/assets/images/portrait/small/avatar-s-20.jpg')],
        //   status: 'away',
        // },
      },
      items: []
    }
  },
  mounted() {
    
   
    this.psToBottom()
  },
  // conecting api
  computed: {
    isLoading() {
      return this.$store.state.comments.isLoading;
    },
    successMessage() {
      return this.$store.state.comments.successMessage;
    },
    errorMessage() {
      return this.$store.state.comments.errorMessage;
    },
    errors() {
      return JSON.parse(JSON.stringify(this.$store.state.comments.errors));
    },
   
    items() {
      console.log("chatsLog:",this.$store.state.comments.all)
        this.$store.state.comments.all;
    },
    user(){
      return localStorage.getItem('userData');
    },
    sender(){
      return this.$store.state.comments.single.id
    },
    hshsh(){
        return 0;
      },
  },
  created() {
    this.fetchAll()
   
  },
  methods: {
  
    fetchAll() {
     
      this.$store.dispatch("comments/fetch").then(() => {
        this.items = this.$store.state.comments.all
      });
      console.log("fetchChat:", this.$store.dispatch("comments/fetch"))
      
    },
    sendMessage(message) {
      //this.$store.state.comments.all.push({comment:this.chatInputMessage})
      this.items.push(message);
      var comment = message.comment;
      this.$store.dispatch("comments/store",{comment})
      then(()=>{
     
      });
    // this.items();
    
   
      /* this.chatData.chat.chat.push({
        message: this.chatInputMessage,
        time: new Date(),
        senderId: 11,
      })*/
      this.chatInputMessage = ''

      // Update scroll position
      // Scroll to bottom
      // this.$nextTick(() => {
      //   this.psToBottom()
      // })
    },
    // psToBottom() {
    //   const scrollEl = this.$refs.refChatLogPS.$el || this.$refs.refChatLogPS
    //   scrollEl.scrollTop = scrollEl.scrollHeight
    // },
  },
}
</script>

<style lang="scss">
@import "@core/scss/base/pages/app-chat-list.scss";
</style>

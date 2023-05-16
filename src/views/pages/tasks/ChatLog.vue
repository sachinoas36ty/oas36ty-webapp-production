<template>
  <div class="chats">
    <div v-for="(msgGrp, index) in formattedChatData.formattedChatLog" :key="msgGrp.senderId + String(index)" class="chat"
      :class="[msgGrp.senderId == formattedChatData.contact.id ? 'chat-right' : 'chat-left']">
      <!-- <div
        v-for="(msgGrp, index) in formattedChatData.formattedChatLog"
        :key="msgGrp.senderId+String(index)"
        class="chat"
        :class="[msgGrp.senderId == formattedChatData.contact.id ? 'chat-right' : 'chat-left']"
      > -->
      <!-- <div class="chat-avatar">
          <b-avatar
            size="36"
            class="avatar-border-2 box-shadow-1"
            variant="transparent"
            :src="msgGrp.senderId === formattedChatData.contact.id ? 
            formattedChatData.contact.avatar[Math.floor(Math.random()* formattedChatData.contact.avatar.length)] : profileUserAvatar"
          /> -->
          <div class="chat-avatar">
        <b v-if="msgGrp.senderId == formattedChatData.contact.id">
          <small style="margin-right: 0.5rem;">{{ timeFormat(msgGrp.time) }}</small>
          Me
          <feather-icon icon="CircleIcon" fill="#2ab27b" stroke="#2ab27b"   />
        </b>
        <b style="text-transform: capitalize;" v-if="msgGrp.senderId != formattedChatData.contact.id">
          <feather-icon  fill="#e38968" stroke="#e38968" icon="CircleIcon"  />
          {{msgGrp.messages[0].user.name}}
        <small style="margin-left: 0.5rem;"> {{ timeFormat(msgGrp.time) }}</small>
        
        </b>

        <!-- <b-avatar :title="msgGrp.messages[0].user.name" size="36" class="avatar-border-2 box-shadow-1"
          variant="transparent" :src="msgGrp.senderId === formattedChatData.contact.id ?
  formattedChatData.contact.avatar : msgGrp.avatar" /> -->

      </div>
      <!-- <b v-if="msgGrp.senderId == formattedChatData.contact.id">Me</b> -->

      <!--  -->
      <div class="chat-body">
        <div v-for="msgData in msgGrp.messages" :key="msgData.time" class="chat-content">
          <p>{{ msgData.msg }}
            <!-- <small>{{ formatDate(msgData.time) }}</small> -->
          </p>

        </div>
      </div>
    </div>
  </div>
</template>
<script>

import { computed } from '@vue/composition-api'
import { BAvatar } from 'bootstrap-vue'
import { formatDate } from '@/@core/utils/filter'
import Pusher from 'pusher-js';
import {CircleIcon} from 'vue-feather-icons';
export default {
  components: {
    BAvatar,
    CircleIcon,
  },
  props: {
    chatData: {
      type: Array,
      required: true,
    },
    profileUserAvatar: {
      type: String,
      required: true,
    },
  },
  data() {
    return {

      v: [],
      pusher:null,
      channel:null
    }
  },
  created() {
    
    this.subscribe_pusher()
  },
  updated() {
    // this.subscribe_pusher()
    // var c = this.v;

    // console.log(hello);
    // console.log(hello);
  },
  methods: {
    timeFormat(date){
      var hours = new Date(date).getHours();
      var minutes = new Date(date).getMinutes();
      var noon =  hours >= 12 ? ' PM': ' AM';
      hours = hours % 12;
      hours = hours ? hours : 12; // the hour '0' should be '12'
      minutes = minutes < 10 ? '0'+minutes : minutes;

      var maketime = hours + ':' + minutes + noon;
      var date = new Date(date).toDateString();
      var fullyear = new Date(date).getFullYear();
      
      return date.split(fullyear)[0] + ','+ maketime;
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
      that.chatData.push(data[0])
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
    }
  },
  setup(props) {

    console.log("props:", props)
    const formattedChatData = computed(() => {
      var user_id = 0;
      var avatar = ''
      props.chatData.forEach((msg, index) => {
        // console.log(msg.user);
        if (JSON.parse(localStorage.getItem('userData')).id == msg.user.id) {

          user_id = msg.user.id
          avatar = msg.user.avatar
        }

      })
      console.log(user_id);
      const contact = {
        id: user_id,
        // avatar2: msg,
        avatar: avatar,
      }

      let chatLog = []
      if (props.chatData) {
        chatLog = props.chatData
      }

      const formattedChatLog = []
      let chatMessageSenderId = chatLog[0] ? chatLog[0].user_id : undefined
      var sender_id = 0;
      props.chatData.forEach((msg, index) => {
        console.log(msg.id);
        sender_id = msg.id
      })
      let msgGroup = {
        avatar: '',
        senderId: '',
        time:null,
        messages: [],
      }

      chatLog.forEach((msg, index) => {
        if (chatMessageSenderId === msg.user_id) {
          msgGroup.avatar = msg.user.avatar
          msgGroup.senderId = msg.user.id
          msgGroup.time = msg.created_at

          msgGroup.messages.push({
            user: msg.user,
            msg: msg.comment,
            time: msg.created_at,
            mentions: msg.mentions ? msg.mentions : null
          })
        } else {
          chatMessageSenderId = msg.user_id ?? JSON.parse(localStorage.getItem('userData')).id
          // msgGroup.avatar = msg.user.avatar
          // msgGroup.senderId = msg.user_id
          // formattedChatLog.forEach(d => {
          //   if(formattedChatData.contact.id === d.senderId){
          //     d.messages.push(msgGroup)
          //   }
          // });
          // var indexes = formattedChatLog.findIndex(e => e.senderId === JSON.parse(localStorage.getItem('userData')).id);
          // // if(indexes != -1){

          formattedChatLog.push(msgGroup)
          // }
          msgGroup = {
            senderId: msg.user_id ?? JSON.parse(localStorage.getItem('userData')).id,
            avatar: msg.user.avatar ?? null,
            time: msg.created_at ?? null,

            messages: [{
              user: msg.user,
              mentions: msg.mentions ? msg.mentions : null,

              msg: msg.comment,
              time: msg.created_at ?? null,
            }],
          }
        }
        if (index === chatLog.length - 1) formattedChatLog.push(msgGroup)
      })
      console.log("format:", formattedChatLog)
      return {
        formattedChatLog,
        contact,
        profileUserAvatar: props.profileUserAvatar,
        chatMessageSenderId,
      }
    })

    return {
      formattedChatData,
      formatDate,

    }
  },
}
</script>
  
<style>
.chat-left .chat-avatar{
  margin-top: -2rem;
  margin-left: 1rem;

}
.chat-right .chat-avatar{
  margin-top: -2rem;
  margin-right: 1rem;

}
.chat-right .chat-body{
  margin-right: 0rem!important;
}
</style>
  
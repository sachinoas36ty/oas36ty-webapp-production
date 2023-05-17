<template>
  <div  class="chats">
    <div v-for="(msgGrp, index) in getCommentsArr()" :key="String(msgGrp.senderId + String(index))" class="chat"
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
          <div class="chat-avatar"  >
        <b v-if="msgGrp.senderId == formattedChatData.contact.id">
          <FontAwesomeIcon icon="reply" @click="updateValue()" style="margin-right: 0.5rem;" />
          <small style="margin-right: 0.5rem;">{{ timeFormat(getTime(msgGrp)) }}</small>
          Me
          <feather-icon icon="CircleIcon" fill="#2ab27b" stroke="#2ab27b"   />
        </b>
        <b class="" v-if="msgGrp.senderId != formattedChatData.contact.id">
          
          <feather-icon  fill="#e38968" stroke="#e38968" icon="CircleIcon"  />
          <span style="text-transform: lowercase;"> {{ getUserName(msgGrp) }}</span>
          <small  style="text-transform: capitalize;margin-left: 0.5rem;"> {{ timeFormat(getTime(msgGrp)) }}</small>
          <FontAwesomeIcon @click="updateValue()" icon="share" style="margin-left: 0.5rem;" />
        
        
      </b>
      

        <!-- <b-avatar :title="msgGrp.messages[0].user.name" size="36" class="avatar-border-2 box-shadow-1"
          variant="transparent" :src="msgGrp.senderId === formattedChatData.contact.id ?
  formattedChatData.contact.avatar : msgGrp.avatar" /> -->

      </div>
      
      <!-- <b v-if="msgGrp.senderId == formattedChatData.contact.id">Me</b> -->

      <!--  -->
      <div class="chat-body">
        
        <!-- <div :id="msgData.id" v-for="(msgData, index) in msgGrp.messages" :key="String(msgData.id + String(index))" :class="{'bg-me':msgGrp.senderId == formattedChatData.contact.id, 'bg-other':msgGrp.senderId != formattedChatData.contact.id}" class="chat-content"> -->
        <div  :class="{'bg-me':msgGrp.senderId == formattedChatData.contact.id, 'bg-other':msgGrp.senderId != formattedChatData.contact.id}" class="chat-content">

          <p>
            <div style="max-width: 400px;" v-html="showComment(msgGrp)"></div>

            <span style="color:red;" v-if="textLength === false && msgGrp.msg.length > 300" @click="textLength = true" class="pointer"> ... Read
                        more</span>
                      <span class="mt-1" style="color:red;" v-if="textLength === true && msgGrp.msg.length > 300" @click="textLength = false"> ... Read less</span>
            <!-- {{ msgData.msg. }} -->
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
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from "@fortawesome/fontawesome-svg-core";
import {  faReply,faShare } from "@fortawesome/free-solid-svg-icons";
library.add(faReply,faShare);
export default {
  components: {
    BAvatar,
    FontAwesomeIcon,
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
    reply:{
      type:String,
      required:true
    }
  },
  data() {
    return {
      textLength:false,
      text:'',
      v: [],
      pusher:null,
      channel:null
    }
  },
  created() {
    
    // pusher.connect()
  },
  watch:{
    currentRoom(){
      // this.subscribe_pusher()
    }
  },
  updated() {
    Pusher.logToConsole = true
    const pusher = new Pusher('2c89bc9e9569378716c0 ',{
  cluster:'ap2',
  // activity_timeout: 300000,
  // encrypted:true

});
    // this.subscribe_pusher()
    const channel = pusher.subscribe('chat')
    channel.bind('MessageSent', (data) => {
      console.log(data);
      // this.chatData.push(data[0])
    })
    // this.subscribe_pusher()
    // var c = this.v;
//     var objDiv = document.getElementById("chat-app");
// objDiv.scrollTop = objDiv.scrollHeight + 10;
    // console.log(hello);
    // console.log(hello);
  },
  methods: {
    updateValue() {
      this.$emit("update:value", 'new value');
},
    getCommentsArr(){
      this.formattedChatData.arr.forEach(element => {
        element.textLength = false
      });
      this.formattedChatData.arr.sort(function(a,b){
        return a.time.localeCompare(b.time)
      })
      return this.formattedChatData.arr
    },
    getUserName(data){
      let name=  null
      // data.messages.forEach(element => {
      //   name = element.user.email
      // });
      name = data.user.name
      return name
    },
    getTime(data){
      let time=  null
      // data.messages.forEach(element => {
      //   time = element.time
      // });
      time= data.time
      return time
    },
    expandText(data){
      data.textLength = "true"
      // data.msg.substring(0)
      console.log(data.textLength);
      // this.showComment(data)
    },
    
    showComment(comment){
      // this.text = comment.msg
      // console.log(comment.msg);
      if (this.textLength === true) {
        let newText = comment.msg.substring(0);
        // console.log('hshs');
        return newText;
      } else {
        /*let newText = this.lorem.substring(0,50) + `...`;*/
        let newText = comment.msg.substring(0, 290);
        
        return newText;
      }
      // if(comment.length > 200){
      //   return comment.substring(0,200)
      // }else{
      //   return comment;
      // }
    },
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
    //   this.pusher = new Pusher('2c89bc9e9569378716c0',{
    //   cluster:'ap2',
    //   activity_timeout: 300000

    // });
    // this.pusher.connect()
    // this.pusher.connection.bind('connected', (data) => {
    //   console.log('connected');
    // })
    // var that = this;
    // this.channel = this.pusher.subscribe('chat')
    // this.channel.bind('MessageSent', (data) => {
    //   console.log(data);
    //   that.chatData.push(data[0])
    // })
    // this.pusher.connection.bind('disconnected', (data) => {
    //   console.error('disconneccted');
    // })
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
      const arr = []
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
      let msgGroup2 = {
        avatar: '',
        senderId: '',
        time:null,
        // messages: [],
      }

      chatLog.forEach((msg, index) => {
        // avatar = msg.user.avatar
        //   senderId = msg.user.id
        //   time = msg.created_at
        //   msg = msg.comment,
        //   user = msg.user,
        //   mentions = msg.mentions //? msg.mentions : null

          arr.push({
            avatar : msg.user.avatar,
          senderId : msg.user.id,
          time : msg.created_at,
          msg : msg.comment,
          user : msg.user,
          mentions : msg.mentions ? msg.mentions : null
          })
        if (chatMessageSenderId === msg.user_id) {
    

          msgGroup.avatar = msg.user.avatar
          msgGroup.senderId = msg.user.id
          msgGroup.time = msg.created_at
          msgGroup.msg = msg.comment,
          msgGroup.user = msg.user,
          msgGroup.mentions = msg.mentions ? msg.mentions : null

          // msgGroup

          msgGroup.messages.push({
            user: msg.user,
            msg: msg.comment,
            textLength : false,
            time: msg.created_at,
            mentions: msg.mentions ? msg.mentions : null
          })
          // formattedChatLog.push(msgGroup)

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
          // msgGroup2 = {
          //   senderId: msg.user_id ?? JSON.parse(localStorage.getItem('userData')).id,
          //   avatar: msg.user.avatar ?? null,
          //   time: msg.created_at ?? null,
          //   user:msg.user  ?? null,
          //   mentions: msg.mentions ? msg.mentions : null,
          //   msg: msg.comment,
          // }
          // arr.push(msgGroup2)
          msgGroup = {
            senderId: msg.user_id ?? JSON.parse(localStorage.getItem('userData')).id,
            avatar: msg.user.avatar ?? null,
            time: msg.created_at ?? null,
            user:msg.user  ?? null,
            mentions: msg.mentions ? msg.mentions : null,
            msg: msg.comment,

            // textLength:false,
            messages: [{
              user: msg.user,
              mentions: msg.mentions ? msg.mentions : null,
              textLength : false,

              msg: msg.comment,
              time: msg.created_at ?? null,
            }],
          }
        }
        // formattedChatLog.push(msgGroup)
        // arr.push(msgGroup2)
        if (index === chatLog.length - 1) formattedChatLog.push(msgGroup)
      })
      console.log("format:", formattedChatLog)
      return {
        formattedChatLog,
        arr,
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
  
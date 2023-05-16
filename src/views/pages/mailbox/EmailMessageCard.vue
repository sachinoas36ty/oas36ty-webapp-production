<template>
  <b-card no-body>
    <div v-if="message">

      <b-card-header
    
    class="email-detail-head"
    >
    <div class="user-details d-flex justify-content-between align-items-center flex-wrap">
      <!-- <b-avatar
        v-if="message.avatar != null"
        size="48"
        :src="message.avatar"
        class="mr-75"
      /> -->
      <b-avatar
        
        size="48"
        :src="'https://ui-avatars.com/api/?name='+filterTags(parse_from_name(message.from_name))"
        class="mr-75"
      />
      <div class="mail-items">
        <h5 class="mb-0">
          {{ filterTags(parse_from_name(message.from_name)) }}
          <!-- Dev Sindhwani -->
        </h5>
        <b-dropdown
          variant="link"
          no-caret
          toggle-class="p-0"
          class="email-info-dropup"
        >
          <template #button-content>
            <span class="font-small-3 text-muted mr-25">{{ message.from_email }} </span>
            <!-- <span class="font-small-3 text-muted mr-25">dev16sindh@gmail.com</span> -->
    
            <feather-icon
              icon="ChevronDownIcon"
              size="10"
            />
          </template>
          <table class="table table-sm table-borderless font-small-3">
            <tbody>
              <tr>
                <td class="text-right text-muted align-top">
                  From:
                </td>
                <td>{{ message.from_email }}</td>
                <!-- <td>dev16sindh@gmail.com</td> -->
    
              </tr>
              <tr>
                <td class="text-right text-muted align-top">
                  To:
                </td>
                <!-- <td v-if="message.to_email.length > 1">{{ message.map(receiver => receiver.to_email).join(', ') }}</td> -->
                <td>{{message.to_email}}</td>
    
              </tr>
              <tr v-if="message.ccaddress != null">
                <td class="text-right text-muted align-top">
                  CC:
                </td>
                <!-- <td v-if="message.to_email.length > 1">{{ message.map(receiver => receiver.to_email).join(', ') }}</td> -->
                <td>{{message.ccaddress}}</td>
    
              </tr>
              <!-- <tr> -->
              <tr>
                
                <td class="text-right text-muted align-top">
                  Date:
                </td>
                <!-- <td>4:25 AM 13 Jan 2018</td> -->
                <td>{{date_time(message.date)}}</td>
              </tr>
            </tbody>
          </table>
        </b-dropdown>
      </div>
    </div>
    <div class="mail-meta-item d-flex align-items-center">
      <!-- <small class="mail-date-time text-muted">{{ formatDate(message.time) }}</small> -->
      <small class="mail-date-time text-muted">{{ formatDate(message.date) }}</small>
    
      <!-- Mail Action DD -->
      <!-- <b-dropdown
        variant="link"
        no-caret
        toggle-class="p-0"
        right
      >
        <template #button-content>
          <feather-icon
            icon="MoreVerticalIcon"
            size="17"
            class="ml-50 text-body"
          />
        </template>
    
        <b-dropdown-item >
          <feather-icon icon="Edit2Icon" />
          <span class="align-middle ml-50" @click="$emit('update:shallshowemailcomposemodal', true); $emit('close-left-sidebar')">Draft</span>
        </b-dropdown-item>
    
        <b-dropdown-item>
          <feather-icon icon="AlertCircleIcon" />
          <span class="align-middle ml-50">Spam</span>
        </b-dropdown-item>
    
        <b-dropdown-item >
          <feather-icon icon="TrashIcon" />
          <span class="align-middle ml-50">Trash</span>
        </b-dropdown-item>
      </b-dropdown> -->
    </div>
    </b-card-header>

    <b-card-body class="mail-message-wrapper pt-2" v-if="message" >
  <!-- eslint-disable vue/no-v-html -->
  <div id="div_iframe"
  class="mail-message text-center"
  
  >
  <!-- <iframe  id="myIframe" 
  
  
  
   :srcdoc="message.message"   :onload="resizeIframe(this)" :height="initialHeight != '0px' ? initialHeight : ''" style=" 
width: 100%; border: 1px solid white;"></iframe> -->
<iframe 
  name="ifr" id="my-iframe" scrolling="no"  :srcdoc="message.message" onload="javascript:(function(o){o.style.height=o.contentWindow.document.body.scrollHeight+40+'px'; o.style.width = o.contentWindow.document.body.scrollWidth+5+'px'; scroll(0,0)}(this));"
   style="width: 60%;pointer-events:auto;height: 8rem; border: 1px solid white" >
 
  </iframe>




  <!-- <div id="my_message"  style=" text-align:  left; display: block;" v-html="message.message"></div> -->
</div>

<!-- eslint-enable -->
</b-card-body>

<b-card-footer v-if=" message && message.attachments && message.attachments">
<div class="mail-attachments">
  <div class="d-flex align-items-center mb-1">
    <feather-icon
      icon="PaperclipIcon"
      size="16"
    />
    <h5 class="font-weight-bolder text-body mb-0 ml-50">
      {{ message.attachments }} Attachment{{ message.attachments > 1 ? 's' : '' }}
      <!-- <a href="https://oas36ty-files.s3.ap-south-1.amazonaws.com/email-files/myw3schoolsimage1669205895.jpeg" download="file.jpeg">image</a> -->
      <!--  <b-button size="sm" @click="downloaded('https://oas36ty-files.s3.ap-south-1.amazonaws.com/email-files/myw3schoolsimage1669205895.jpeg')">
        Download
      </b-button> -->

    </h5>
  </div>
  <!-- <div v-for="file in message.attachments_file" :key="file.id">
    <a :href="file.attachment_url" target="_blank" class="font-weight-bolder text-body">
      <b-avatar :src="file.attachment_url"/>
      {{file.attachment_name}}
      
    </a>
  </div> -->
  
  <!-- {{file.attachment_name}} -->

  <div class="d-flex flex-column">
    <b-link
      v-for="(attachment, index) in message.attachments_file"
      :key="index"
      :href="attachment.attachment_url"
      target="_blank"
      :download="attachment.attachment_name"
      :class="{'mt-75': index}"
      
    >
    <!-- {{ attachment.attachment_name.search('txt') }} -->
    <!-- {{ attachment.attachment_name.split('.').pop() }} -->
    
    <b-img v-if="attachment.attachment_name == 'undefined' "
    :src="'https://cdn.vectorstock.com/i/preview-1x/65/30/default-image-icon-missing-picture-page-vector-40546530.jpg'"
    width="16px"
    class="mr-50"
    />
    <b-img v-if="attachment.attachment_name.split('.').pop() == 'txt' "
    :src="'https://www.freeiconspng.com/thumbs/txt-file-icon/document-file-format-line-outline-text-txt-icon--icon-search--11.png'"
    width="16px"
    class="mr-50"
    />
    <b-img v-if="attachment.attachment_name.split('.').pop() == 'pdf' "
    :src="'https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/PDF_file_icon.svg/1200px-PDF_file_icon.svg.png'"
    width="16px"
    class="mr-50"
    />
    <b-img v-if="attachment.attachment_name != 'undefined' && attachment.attachment_name.split('.').pop() != 'txt' && attachment.attachment_name.split('.').pop() != 'pdf'"
      :src="attachment.attachment_url"
      width="16px"
      class="mr-50"
    />
      <span v-if="attachment.attachment_name != 'undefined'" class="text-muted font-weight-bolder align-text-top">{{ attachment.attachment_name }}</span>
      <span v-if="attachment.attachment_name == 'undefined'" class="text-muted font-weight-bolder align-text-top">{{'default.txt'}}</span>
    </b-link>
  </div>
</div>
</b-card-footer>
</div>

  </b-card>
</template>

<script>
// document.getElementById('div_iframe').scrollTop = 438
// $('#div_iframe').scrollTop(438)
// console.log(document.querySelector('iframe'))
// console.log(frames.ifr);
// document.querySelector('iframe').scrollIntoView()
// iframe.onload = function () {this.contentWindow}
// window.onscroll = function()
// {
  // iframe.document.documentElement.scrollTop = window.pageYOffset;
  // iframe.document.body.scrollTop = window.pageYOffset; // Google Chrome, Safari, documents without valid doctype
  // }
  // $('body').bind('mousewheel DOMMouseScroll', onWheel);
  // var iframe = document.getElementById('my-iframe');
// iframe.scroll
function onWheel (e){
    if (e.target === document.getElementById('my-iframe')){
      
      e.preventDefault();
      console.log(e.target);
    }
};
  // document.querySelector('iframe')
  //       .contentDocument.write("<h1>Injected from parent frame</h1>")
import {
  BDropdown, BDropdownItem,BButton, BCard, BCardHeader, BCardBody, BCardFooter, BAvatar, BLink, BImg,
} from 'bootstrap-vue'
import { filterTags, formatDate } from '@core/utils/filter'

// const DELTAS = {
//         "100":481,
//         "200":427,
//         "300":400,
//         "400":400,
//         "500":400,
//         "700":400,
//         "800":400,
//         "900":400,
//         "1000":400,
// };
export default {
  
  components: {
    BDropdown, BDropdownItem,BButton, BCard, BCardHeader, BCardBody, BCardFooter, BAvatar, BLink, BImg,
  },
  props: {
    message: {
      type: Object,
      required: true,
    },
    initialHeight:{
      type: String,
      required: true

    }
  },
  
 
 
  methods:{
    downloaded(url){
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'file.png'); //or any other extension
      document.body.appendChild(link);
      link.click();
    },

    resizeIframe(event)
    {


    	    
        
      var iFrameID = document.querySelector('iframe');
      
      // iFrameID.style.height = '974px';
      // console.log(iFrameID.style.height);
      // iFrameID.width = width

      // iFrameID.style.height =  iFrameID.contentWindow.document.body.scrollHeight + 3 + 'px';
      // if(iFrameID.contentWindow.document.body.scrollHeight != 0){
      // iFrameID.height=  iFrameID.contentWindow.document.body.scrollHeight + 3 + 'px';
      // }
    // // console.log(this._props.message.message);

    //   // document.getElementById('myIframe').style.height = iFrameID.contentWindow.document.body.scrollHeight + 'px';
    //   console.log(iFrameID.style.height);

    },
    date_time(time){
      var date=  new Date(time)
      var actual_date = formatDate(time)
      var actual_time = date.toLocaleTimeString();
      return actual_date + ' '+ actual_time;

    },
    // message(message){
    //   return message.replace(/[\[\]']/g,'' );
    // },
    format_to_html(message){
      const utf8 = require('utf8');
      
      return utf8.encode(message)
    },
    parse_from_name(name){
      return name ? name.replace(/ *\([^)]*\) */g, "") : name;
    }
  },
  setup() {
    return {
      formatDate,
      filterTags
    }
  },
}
</script>

<style>
 
  #my_message{
      width: 86%;
    }
  @media(max-width:560px){
    #my_message{
      width: 100%;
    }
  }
</style>

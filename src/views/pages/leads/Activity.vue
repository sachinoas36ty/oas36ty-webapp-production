<template>
  <div>

  
    <app-timeline>
      <div  class="d-flex flex-sm-row flex-column flex-wrap justify-content-between mb-1 mb-sm-0">
      <p>
        <b-avatar
          :src="'https://oas36ty-files.s3.ap-south-1.amazonaws.com/user-images/16661842141.jpeg'"

          size="45"
          class="mr-1 pull-up"
        />
        <span class="align-middle">Dev Sindhwani
          <!-- <span v-if="audit.event == 'created'">created </span>
          <span v-if="audit.event == 'deleted'">deleted </span>
          <span v-if="audit.event == 'updated'">updated </span> -->
          <!-- <span v-if="audit.event == 'created'">created </span> -->



        </span>
      </p>
          <!-- <h6>12 Invoices have been paid</h6> -->
          <small class="text-muted">12 mins ago</small>
        </div>
        <p>Invoices have been paid to the company.</p>
      <!-- 12 INVOICES HAVE BEEN PAID -->
      <!-- <app-timeline-item icon="DollarSignIcon">
        <div class="d-flex flex-sm-row flex-column flex-wrap justify-content-between mb-1 mb-sm-0">
          <h6>12 Invoices have been paid</h6>
          <small class="text-muted">12 min ago</small>
        </div>
        <p>Invoices have been paid to the company.</p>
        <p>
          <b-img
            :src="require('@/assets/images/icons/pdf.png')"
            height="auto"
            width="20"
            class="mr-1"
          />
          <span class="align-bottom">invoice.pdf</span>
        </p>
      </app-timeline-item> -->
  
      <!-- <app-timeline-item
        variant="secondary"
        icon="UserIcon"
      >
  
        <div class="d-flex flex-sm-row flex-column flex-wrap justify-content-between mb-1 mb-sm-0">
          <h6>Client Meeting</h6>
          <small class="text-muted">45 min ago</small>
        </div>
        <p>Project meeting with john @10:15am.</p>
        <b-media>
          <template #aside>
            <b-avatar :src="require('@/assets/images/avatars/12-small.png')" />
          </template>
          <h6>John Doe (Client)</h6>
          <p>CEO of Infibeam</p>
        </b-media>
      </app-timeline-item> -->
  
      <!-- FINANCIAL REPORT -->
      <!-- <app-timeline-item
        variant="success"
        icon="FileTextIcon"
      >
  
        <div class="d-flex flex-sm-row flex-column flex-wrap justify-content-between mb-1 mb-sm-0">
          <h6>Financial Report</h6>
          <small class="text-muted">2 hours ago</small>
        </div>
        <p>Click the button below to read financial reports</p>
        <b-button
          v-b-toggle.report-list-with-icon
          v-ripple.400="'rgba(113, 102, 240, 0.15)'"
           
          variant="outline-primary"
        >
          Show Report
        </b-button>
        <b-collapse id="report-list-with-icon">
          <b-list-group
            flush
            class="mt-1"
          >
            <b-list-group-item
              href="#"
              class="d-flex justify-content-between align-items-center bg-transparent"
            >
              <span>Last Year's Profit: $20,000</span>
              <feather-icon icon="Share2Icon" />
            </b-list-group-item>
            <b-list-group-item
              href="#"
              class="d-flex justify-content-between align-items-center bg-transparent"
            >
              <span>This Year's Profit: $25,000</span>
              <feather-icon icon="Share2Icon" />
            </b-list-group-item>
            <b-list-group-item
              href="#"
              class="d-flex justify-content-between align-items-center bg-transparent"
            >
              <span>Last Year's Commision: $5,000</span>
              <feather-icon icon="Share2Icon" />
            </b-list-group-item>
            <b-list-group-item
              href="#"
              class="d-flex justify-content-between align-items-center bg-transparent"
            >
              <span>This Year's Commision: $7,000</span>
              <feather-icon icon="Share2Icon" />
            </b-list-group-item>
            <b-list-group-item
              href="#"
              class="d-flex justify-content-between align-items-center bg-transparent"
            >
              <span>This Year's Total Balance: $70,000</span>
              <feather-icon icon="Share2Icon" />
            </b-list-group-item>
          </b-list-group>
        </b-collapse>
      </app-timeline-item> -->
  
      <!-- INTERVIEW SCHEDULE -->
      <!-- <app-timeline-item
        variant="warning"
        icon="MapPinIcon"
      >
        <div class="d-flex flex-sm-row flex-column flex-wrap justify-content-between mb-1 mb-sm-0">
          <h6>Interview Schedule</h6>
          <small class="text-muted">03:00 PM</small>
        </div>
        <p>Have to interview Katy Turner for the developer job.</p>
        <div class="d-flex flex-sm-row flex-column justify-content-between align-items-start">
          <b-media>
            <template #aside>
              <b-avatar :src="require('@/assets/images/avatars/1-small.png')" />
            </template>
            <h6>Katy Turner</h6>
            <span class="text-muted">Javascript Developer</span>
          </b-media>
          <div>
            <feather-icon
              icon="MessageSquareIcon"
              class="mr-1"
            />
            <feather-icon icon="PhoneCallIcon" />
          </div>
        </div>
      </app-timeline-item> -->
  
      <!-- ONLINE STORE -->
     
  
     
    </app-timeline>
    </div>
  </template>
  
  <script>
  import {
    BImg, BAvatar, BMedia, BButton, BCollapse, VBToggle, BListGroup, BListGroupItem, BAvatarGroup, BBadge, VBTooltip,
  } from 'bootstrap-vue'
  import AppTimeline from '@core/components/app-timeline/AppTimeline.vue'
  import AppTimelineItem from '@core/components/app-timeline/AppTimelineItem.vue'
  import Ripple from 'vue-ripple-directive'
import { formatDate } from '@/@core/utils/filter'
  
  export default {
    components: {
      AppTimeline,
      AppTimelineItem,
      BImg,
      BMedia,
      BAvatar,
      BButton,
      BCollapse,
      BListGroup,
      BListGroupItem,
      BAvatarGroup,
      BBadge,
    },
  
    directives: { 'b-toggle': VBToggle, 'b-tooltip': VBTooltip, Ripple },
    computed:{
      audits(){
        return this.$store.state.leads.audits;
      }
    },
    setup(){
      return{
        formatDate,
      }
    }
  }
  </script>
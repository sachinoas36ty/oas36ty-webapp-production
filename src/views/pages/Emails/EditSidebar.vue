<template>
    <b-row class="match-height">
        <b-col lg="12">
        <edit-email />
      </b-col>
      <b-col lg="6">
        <in-bound />
      </b-col>
      <b-col lg="6">
        <out-bound />
      </b-col>
      <!-- <b-col lg="6">
        <form-layout-horizontal-icon />
      </b-col>
      <b-col lg="6">
        <form-layout-vertical />
      </b-col>
      <b-col lg="6">
        <form-layout-vertical-icon />
      </b-col>
      <b-col cols="12">
        <form-layout-multiple-column />
      </b-col>
      <b-col lg="6">
        <form-layout-datalist-helper />
      </b-col>
      <b-col lg="6">
        <form-layout-feedback-helper />
      </b-col> -->
    </b-row>
  </template>
  
  <script>
  import { BRow, BCol } from 'bootstrap-vue'
  
  import InBound from './Email_InBound_Form.vue'
  import OutBound from './Email_OutBound_Form.vue'

  import EditEmail from './EditEmail.vue'

//   import FormLayoutHorizontalIcon from './FormLayoutHorizontalIcon.vue'
//   import FormLayoutVertical from './FormLayoutVertical.vue'
//   import FormLayoutVerticalIcon from './FormLayoutVerticalIcon.vue'
//   import FormLayoutMultipleColumn from './FormLayoutMultipleColumn.vue'
//   import FormLayoutDatalistHelper from './FormLayoutDatalistHelper.vue'
//   import FormLayoutFeedbackHelper from './FormLayoutFeedbackHelper.vue'
  
  export default {
    components: {
      BRow,
      BCol,
      EditEmail,
      InBound,
      OutBound,

    //   FormLayoutHorizontalIcon,
    //   FormLayoutVertical,
    //   FormLayoutVerticalIcon,
    //   FormLayoutMultipleColumn,
    //   FormLayoutDatalistHelper,
    //   FormLayoutFeedbackHelper,
    },
  }
  </script>
  <style>
.vs__open-indicator{
  fill: darkgray;
}
</style>
  
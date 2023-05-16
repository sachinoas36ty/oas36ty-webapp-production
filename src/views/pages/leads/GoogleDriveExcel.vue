<template>
    <div>

       <b-modal no-close-on-backdrop id="attachment-excel-modal" ref="attachment-excel-modal" size="md" hide-footer>
      <template #modal-title>
        <!-- <span >
          {{ 'Create New Google Document' }}
          <img
            :src='wordIcon'
            width='25px' data-type='2' />
        </span> -->
        <span >
          {{ 'Create New Google Spreadsheet' }}
          <img
            :src='excelIcon'
            width='25px' data-type='2' />
        </span>
      
      </template>
      <b-form @submit.prevent="saveToDrive()">

        <b-row>
          <b-col md="12">
            <b-form-group>
              <b-form-input v-model="file_name" placeholder="Enter File name"></b-form-input>
            </b-form-group>
          </b-col>
        </b-row>
        <div class="text-right ">

           <b-button size="sm" variant="primary" @click="$refs['attachment-excel-modal'].hide()" class="mr-1">Cancel</b-button>
           <b-button size="sm" type="submit" variant="primary" :disabled="$store.state.tasks.isDriveAttachment">
            Create
            <b-spinner small class="ml-1" v-if="$store.state.tasks.isDriveAttachment" />

          </b-button>
        </div>
      </b-form>
    </b-modal>
</div>

</template>
<script>
    import {BFormGroup,BButton,BFormInput,BModal,BForm,BRow,BCol,BSpinner} from 'bootstrap-vue'
    import wordIcon from "../../../assets/images/logo/word-icon.png";
import excelIcon from "../../../assets/images/logo/excel-icon.png";
    export default {
        components:{
            BModal,
            BForm,
            BFormGroup,
            BButton,
            BRow,
            BSpinner,
            BFormInput,
            BCol,
        },
        data(){
            return {
                file_name:"",
                wordIcon:wordIcon,
                excelIcon:excelIcon
            }
        },
        methods: {
            saveToDrive(){
              let all = this.$store.state.leads.all;
              const data = {
                name:this.file_name,
                company_id:all.find(e => e.id=== this.$store.state.leads.expandedTaskId).company_id,
                task_id:this.$store.state.leads.expandedTaskId
              }
              this.$store.dispatch('tasks/saveToExcel', data).then(() => {
                this.$refs['attachment-excel-modal'].hide()
                this.$toast.success("Created Successfully!", {
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
        rtl: false,
      });
                this.$store.dispatch('tasks/getAttachments', this.$store.state.leads.expandedTaskId)
              })
            }
        },

    }
</script>
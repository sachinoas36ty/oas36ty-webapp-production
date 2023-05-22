<template>
  <!-- <div> -->
  <b-modal
    no-close-on-backdrop
    id="reply-modal"
    ref="reply-modal"
    size="lg"
    :title="replySubject"
    hide-footer
    class="b-overlay position-relative"
  >
    <b-row>
      <b-col md="3">
        <b-form-group label="From">
          <v-select
            v-model="composeData.from"
            :options="emails_contact"
            placeholder="Select From"
          ></v-select>
        </b-form-group>
      </b-col>
      <b-col md="3">
        <b-form-group label="To">
          <v-select
            multiple
            v-model="composeData.to"
            :options="emails_contact"
            placeholder="Select To"
          ></v-select>
        </b-form-group>
      </b-col>
      <b-col md="3">
        <b-form-group label="Cc">
          <v-select
            multiple
            v-model="composeData.cc"
            :options="emails_contact"
            placeholder="Select Cc"
          ></v-select>
        </b-form-group>
      </b-col>
      <b-col md="3">
        <b-form-group label="Bcc">
          <v-select
            multiple
            v-model="composeData.bcc"
            :options="emails_contact"
            placeholder="Select Bcc"
          ></v-select>
        </b-form-group>
      </b-col>
    </b-row>
    <b-row>
      <b-col md="12">
        <b-form-group label="Body">
          <quill-editor
            v-model="composeData.message"
            :options="editorOption"
          ></quill-editor>
        </b-form-group>
      </b-col>
    </b-row>
    <b-row>
      <b-col md="6">
        <div class="border-l">
          <div class="d-flex flex-column">
            <div
              class="d-flex justify-content-between align-items-center p-1 border-bottom-light bg-light"
            >
              <div>Attachment(s)</div>
              <div>
                <input
                  type="file"
                  ref="file"
                  @change="handleUpload"
                  style="display: none;"
                />
                <b-button
                  size="sm"
                  variant="primary"
                  @click="$refs.file.click()"
                  >Choose File(s)</b-button
                >
              </div>
            </div>
            <!-- </b-form> -->
          </div>
          <div class="d-flex justify-content-between align-items-center p-1">
            <div v-if="file_name.length > 0">{{ file_name }}</div>
            <div v-else>No file(s) selected</div>
            <b-media-aside class="mr-0">
              <b-img
                v-if="file !== null && previewImage != null"
                id="ref_image_base_64"
                ref="refPreviewEl"
                v-model="image"
                :src="previewImage"
                height="40"
                width="40"
                rounded="circle"
                class="border border-l"
              />
            </b-media-aside>
          </div>
        </div>
      </b-col>
      <b-col md="6">
        <b-form-group label="Proposal">
          <div title="click to view" class="cursor-pointer border-l p-1">
            {{ proposalPdf }}
          </div>
        </b-form-group>
      </b-col>
    </b-row>
    <div class="text-right">
      <b-button
        size="sm"
        @click="$refs['reply-modal'].hide()"
        variant="primary"
        class="mr-1"
      >
        Cancel
      </b-button>
      <b-button size="sm" variant="primary">
        Send
      </b-button>
    </div>
    <div
      v-if="$store.state.emails.isLoading"
      class="b-overlay position-absolute"
      style="inset: 0px; z-index: 10; /* display: none; */"
    >
      <div
        class="position-absolute bg-white rounded-sm"
        style="inset: 0px; opacity: 0.75; backdrop-filter: blur(0px);"
      ></div>
      <div
        class="position-absolute d-flex align-items-center flex-column"
        style="
          top: 50%;
          left: 50%;
          transform: translateX(-50%) translateY(-50%);
        "
      >
        <span aria-hidden="true" class="spinner-border text-primary">
          <!----></span
        >
        <br /><span>Sending Email..</span>
      </div>
    </div>
  </b-modal>
  <!-- </div> -->
</template>
<script>
import {
  BRow,
  BFormGroup,
  BCol,
  BImg,
  BMedia,
  BMediaAside,
  BModal,
  BCard,
  BCardHeader,
  BAvatar,
  BForm,
  BFormInput,
  BInputGroup,
  BButton,
  BAvatarGroup,
  VBTooltip,
} from "bootstrap-vue"
import VuePerfectScrollbar from "vue-perfect-scrollbar"
//   import ChatLog from './ChatLog.vue'
//   import SearchMessages from './SearchMessages.vue'
//   import ChatFormVue from './ChatForm.vue'
//   import TodoLeftSidebar from './TodoLeftSidebar.vue'
import FeatherIcon from "@/@core/components/feather-icon/FeatherIcon.vue"
import Echo from "laravel-echo"
import { quillEditor } from "vue-quill-editor"
import vSelect from "vue-select"

//import ChatLog from '/ChatLog.vue'
//import Vue from 'vue';
import axios from "axios"
import { ref } from "vue-demi"
//import VueAxios from 'vue-axios'
//Vue.use(VueAxios,axios)
export default {
  components: {
    BAvatarGroup,
    BModal,
    VBTooltip,
    //   SearchMessages,
    vSelect,
    BCard,
    BCardHeader,
    BAvatar,
    BRow,
    BFormGroup,
    BCol,
    BImg,
    BMedia,
    BMediaAside,
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
    FeatherIcon,
  },
  data() {
    return {
      editorOption: {
        modules: {
          toolbar: [
            [
              "bold",
              "italic",
              "underline",
              "strike",
              { script: "sub" },
              { script: "super" },
            ],
            ["clean"],
            [{ color: [] }, { background: [] }],
            [{ list: "ordered" }, { list: "bullet" }, { align: [] }],
            ["image"],
            [{ header: [] }, { font: [] }, { size: [] }],
            ["link"],
          ],
        },
        placeholder: "Message",
      },
      composeData: {
        message: "",
        to: [],
        cc: [],
        bcc: [],
        from: null,
      },
      proposalPdf: "PL-0009.pdf",
      file_name: [],
      previewImage: null,
      file: null,
      image: null,
    }
  },
  props: {
    replySubject: {
      type: String,
      required: true,
    },
    signature: {
      type: String,
      required: true,
    },
    taskDetails: {
      type: Object,
      required: true,
    },
  },
  computed: {
    emails_contact() {
      // return this.$store.state.contactPeople.allForLeads
      var data = []
      // var index2 = [];
      // for (let index = 0; index < this.$store.state.contactPeople.all.length; index++) {
      // index2[index] = [index];
      for (let i = 0; i < this.$store.state.contactPeople.emails.length; i++) {
        data[i] = this.$store.state.contactPeople.emails[i]
      }
      // }
      // return index2;

      return data
    },
  },
  created() {},
  beforeUpdate() {
    this.composeData.message = this._props.signature
    if (this.taskDetails.mailbox != null) {
      // this.composeData.to = []
      // this.composeData.to.push(this.taskDetails.mailbox.to_email)
      this.composeData.from = this.taskDetails.mailbox.from_email
    }

    // this.getFrom()
  },
  updated() {},
  methods: {
    handleUpload(e) {},
    getFrom() {
      this.composeData.to = []
      var data = []
      var email = null
      // var index2 = [];
      // for (let index = 0; index < this.$store.state.contactPeople.all.length; index++) {
      // index2[index] = [index];
      if (this.$store.state.contactPeople.allForLeads.length > 0) {
        for (
          let i = 0;
          i < this.$store.state.contactPeople.allForLeads.length;
          i++
        ) {
          // data[i] = this.$store.state.contactPeople.emails[i];
          if (
            this.$store.state.contactPeople.allForLeads[i].name ==
            this.taskDetails.contact_person.name
          ) {
            if (
              this.$store.state.contactPeople.allForLeads[i].emails.length > 0
            ) {
              email = this.$store.state.contactPeople.allForLeads[i].emails[0]
                .email
            }
          }
        }
      }
      // }
      // return index2;
      // this.emails_contact.forEach(element => {
      //   if(element == email){

      //     this.composeData.from = element
      //   }
      // });
      // this.emails_contact.forEach(element => {
      //   if(this.taskDetails.mailbox != null){

      //     if(element == this.taskDetails.mailbox.to_email){

      //       // this.composeData.from = element
      //       this.composeData.to.push(element)
      //     }
      //   }
      // });
      return email
    },
  },
}
</script>

<template>
     <b-modal
            id="reply-modal-global"
            ref="reply-modal-global"
            size="lg"
            :title="replySubject"
            hide-footer
          >
          <template #modal-header>
            <h5 v-if="taskId" class="modal-title">

             {{$store.state.leads.all.filter(e => e.id === taskId)[0].subject.includes('Re:') ? "" : "Re: "}} {{  $store.state.leads.all.filter(e => e.id === taskId)[0].subject }}
            </h5>
            <h5 v-else class="modal-title">
              {{ 'Send Email' }}
            </h5>
            </template>
            
            <b-form @submit.prevent="sendEmail(composeData, file_name2)">
              <b-row>
                <b-col md="3">
                  <b-form-group label="From">
                    <v-select
                      v-model="composeData.from"
                      :options="outBoundEmails"
                      label="email"
                      placeholder="Select From"
                    ></v-select>
                  </b-form-group>
                </b-col>
                <b-col md="3">
                  <b-form-group label="To">
                    <v-select
                      multiple
                      v-model="composeData.to"
                      :options="contactPerson"
                      placeholder="Select To"
                    ></v-select>
                  </b-form-group>
                </b-col>
                <b-col md="3">
                  <b-form-group label="Cc">
                    <v-select
                      multiple
                      v-model="composeData.cc"
                      :options="contactPerson"
                      placeholder="Select Cc"
                    ></v-select>
                  </b-form-group>
                </b-col>
                <b-col md="3">
                  <b-form-group label="Bcc">
                    <v-select
                      multiple
                      v-model="composeData.bcc"
                      :options="contactPerson"
                      placeholder="Select Bcc"
                    ></v-select>
                  </b-form-group>
                </b-col>
              </b-row>
              <b-row>
                <b-col md="3">
                  <b-form-group label="Subject">
                    <b-form-input
                    v-model="composeData.subject"
              placeholder="Add Subject"
            ></b-form-input>
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
                        <b-form-file
                          id="fileUpload2"
                          plain
                          v-model="composeData.file2"
                          class="d-none"
                          multiple
                          @change="onFileChange2"
                        />
                        <div>Attachment(s)</div>
                        <div>
                          <input type="file" ref="file" style="display: none" />
                          <b-button
                            size="sm"
                            variant="primary"
                            @click="file_upload"
                            >Choose File(s)</b-button
                          >
                        </div>
                      </div>
                    </div>
                    <div
                      class="d-flex justify-content-between align-items-center p-1"
                    >
                      <div>
                        <div
                          v-if="
                            file_name2.length > 0 &&
                            !$store.state.emails.isLoadingUrl
                          "
                        >
                          <div
                            v-for="(i, index) in $store.state.tasks.s3_url"
                            :key="index"
                          >
                            {{ i.fileName }}
                            <span v-b-tooltip.hover.top="'Remove Attachment'">
                              <feather-icon
                                class="mr-1 cursor-pointer"
                                @click="removeFileS3(i.url, index)"
                                icon="XIcon"
                              />
                            </span>
                          </div>
                        </div>
                        <div v-else>No file(s) selected</div>
                      </div>
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
                <b-col md="6" style="display: none">
                  <b-form-group label="Proposal">
                    <div
                      title="click to view"
                      class="cursor-pointer border-l p-1"
                    >
                      {{ proposalPdf }}
                    </div>
                  </b-form-group>
                </b-col>
              </b-row>
              <div class="text-right">
                <b-button
                  size="sm"
                  @click="$refs['reply-modal-global'].hide()"
                  variant="primary"
                  class="mr-1"
                >
                  Cancel
                </b-button>
                <b-button size="sm" variant="primary" type="submit">
                  Send
                </b-button>
              </div>
            </b-form>
          </b-modal>
</template>
<script>
import { ref } from "@vue/composition-api";
import "vue-toastification/dist/index.css";

import imgLogo from "../../../assets/images/logo/centrik-logo.png";
// import imgLogo from "../../../assets/images/logo/";
import { ValidationProvider, ValidationObserver } from "vee-validate";
import vSelect from "vue-select";
import html2pdf from "html2pdf.js";
import formValidation from "@/@core/comp-functions/forms/form-validation";
import { quillEditor } from "vue-quill-editor";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faBars,
  faEnvelopeOpen,
  faEnvelope,
  faComments,
  faComment,
  faCommentDots,
  faCommentDollar,
  faIndianRupee,
} from "@fortawesome/free-solid-svg-icons";
import {
  faTwitter,
  faFacebook,
  faStackOverflow,
  faGithub,
} from "@fortawesome/free-brands-svg-icons";

// library.add()
library.add(
  faBars,
  faComments,
  faComment,
  faCommentDollar,
  faCommentDots,
  faTwitter,
  faEnvelopeOpen,
  faEnvelope,
  faFacebook,
  faStackOverflow,
  faGithub,
  faIndianRupee
);

import {
  VBTooltip,
  BTabs,
  BTab,
  BTable,
  BCard,
  BBadge,
  BButton,
  BContainer,
  BRow,
  BCol,
  VBToggle,
  BCollapse,
  BSpinner,
  BFormInput,
  BFormGroup,
  BFormDatepicker,
  BForm,
  BMediaAside,
  BFormInvalidFeedback,
  BModal,
  BFormTextarea,
  BFormFile,
  // BSelect,
} from "bootstrap-vue";
export default {
    components: {
    VBTooltip,
    BFormFile,
    BFormTextarea,
    BFormInvalidFeedback,
    ValidationProvider,
    FontAwesomeIcon,
    quillEditor,

    BFormDatepicker,
    // BSelect,
    ValidationObserver,
    BModal,
    BSpinner,
    BTabs,
    BTab,
    BTable,
    BCard,
    BBadge,
    BTab,
    BTable,
    BCard,
    BBadge,
    BButton,
    BContainer,
    BRow,
    BCol,
    VBToggle,
    BCollapse,
    BFormInput,
    BFormGroup,
    vSelect,
    BForm,
    BMediaAside,
  },
  computed:{
    outBoundEmails() {
      return this.$store.state.emails.all_outbound_emails;
    },
    contactPerson() {
      // return this.$store.state.contactPeople.allForLeads
      var data = [];
      // var index2 = [];
      // for (let index = 0; index < this.$store.state.contactPeople.all.length; index++) {
      // index2[index] = [index];
      for (let i = 0; i < this.$store.state.contactPeople.emails.length; i++) {
        data[i] = this.$store.state.contactPeople.emails[i];
      }
      // }
      // return index2;

      return data;
      // return data.filter((country) => country.includes(this.search));
    },
  },
  created(){
    if (this.outBoundEmails.length === 0) {
      this.$store.dispatch("emails/fetch_all_out_mails");
    }
    this.composeData.from = this.outBoundEmails[0];
  },
  directives: {
    "b-tooltip": VBTooltip,
    "b-toggle": VBToggle,
  },
  data(){
    return {
      
        file:null,
        previewImage:null,
        replySubject:"",
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
        file_name2: [],
      composeData: {
        to: [],
        bcc: [],
        message: "",
        subject: "",
        from: null,
        file2: null,
      },
      proposalPdf: "PL-0009.pdf",
    }
  },
  methods:{
    file_upload() {
      console.log("hloo2:file_upload");
      document.getElementById("fileUpload2").click();
      //  this.uploadFileS3(this.file_name2)
      // const image = e.target.files[0];
      // const reader = new FileReader();
      // var base = reader.readAsDataURL(image)
      // console.log(base);
      // console.log(e);
    },
    sendEmail(data2, file_name2) {
      console.log("sending emails...");
      console.log(data2, "data2");
      var bcc_email = [];
      var cc_email = [];

      var s3_url = null;
      var s3_urls = [];
      if (this.$store.state.tasks.s3_url.length > 0) {
        s3_url = this.$store.state.tasks.s3_url;
      }
      if (s3_url != null) {
        for (let index = 0; index < s3_url.length; index++) {
          s3_urls[index] = s3_url[index].url;
        }
      }
      if (!data2.from || !data2.message || !data2.to || !data2.subject) {
        return;
      } else {
        this.$refs["reply-modal-global"].hide();
      }
      if (data2.bcc) {
        data2.bcc.forEach(function (email, index) {
          // console.log(email.email);
          bcc_email[index] = email.email;
        });
      }
      if (data2.cc) {
        data2.cc.forEach(function (email, index) {
          // console.log(email.email);
          cc_email[index] = email.email;
        });
      }
      var data = {};
      if (data2.bcc || data2.cc) {
        data = {
          to: data2.to,
          bcc: data2.bcc,
          cc: data2.cc,
          attach_url: s3_urls,
          message: data2.message,
          plain_text: data2.message.replace(/(<([^>]+)>)/gi, ""),
          subject: data2.subject,
          from: data2.from,
        };
      } else {
        data = {
          to: data2.to,
          // "bcc" : bcc_email,
          // "cc" : cc_email,
          attach_url: s3_urls,
          plain_text: data2.message.replace(/(<([^>]+)>)/gi, ""),
          message: data2.message,
          subject: data2.subject,
          from: data2.from,
        };
      }
      this.$toast.success("Sending", {
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
      console.log(data);
      // this.success = this.$toast();
      this.$store.dispatch("emails/sendEmail", { data }).then(() => {
        // console.log(res);
        if (this.successMessage) {
          this.$toast.success('Email Sent Succesfully!', {
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
        }
        // this.$refs['compose-modal'].hide()
        this.composeData.to = "";
        this.composeData.from = "";
        this.composeData.cc = "";
        this.composeData.bcc = "";
        this.composeData.subject = "";
        this.composeData.message = "";
        while (this.file_name2.length > 0) {
          this.file_name2.pop();
        }

        // while (this.name_to_display.length > 0) {
        //   this.name_to_display.pop();
        // }
        // for (let index = 0; index < this.file_name2.length; index++) {

        //   this.file_name2.splice(this.file_name2.indexOf(this.file_name2[index]), this.file_name2.length)
        // }
        // for (let index = 0; index < this.name_to_display.length; index++) {
        //   // const element = array[index];

        //   this.name_to_display.splice(this.name_to_display.indexOf(this.name_to_display[index]), this.name_to_display.length)
        // }

        // this.$emit('update:shall-show-email-compose-modal', false)
      });
    },
    async onFileChange2(e) {
      // alert('hh');
      console.log("hllo1 : onfileChange2")


      let image = e.target.files;
      let image_name = []
      const filePathsPromises = [];
    image.forEach(file => {
      filePathsPromises.push(this.base64(file));
      image_name.push(file.name)
      // filePathsPromises.push(file.name)
    });
    const filePaths = await Promise.all(filePathsPromises,image_name);
    const mappedFiles = filePaths.map((base64File,image_name) => ({ file: base64File,name:image[image_name].name }));
    let tempFile = mappedFiles


    tempFile.forEach((obj2)=>{
      const exists = this.file_name2.some(obj1=>obj1.name === obj2.name);
      if(!exists){
        console.log("not duplicate")
        this.file_name2.push(obj2);
      }
    })
    
    console.log(mappedFiles);
    this.uploadFileS3(this.file_name2)
    e.target.value = ''


    },
    base64(file) {
      return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
      // let data = null
      //  const reader = new FileReader();

      //   console.log("reader:", reader)
      //   reader.onload = (e) => {
      //     //  data = {
      //     //   file: e.target.result,
      //     //   name: x.name
      //     // }
      //     data = e.target.result

          
          
      //   }
      //   reader.readAsDataURL(file)
      //   // this.file_name2.push(data)
      //   return data;
        
},
    removeFileS3(url, index) {
      console.log("url of attachment", url);
      var data = {
        attach_url: url ?? "null",
      };
      this.$store.state.tasks.s3_url.splice(
        index,
        1
      );
      this.file_name2.splice(index,1)
      this.$store
        .dispatch("tasks/remove_file_s3", { data: data })
        .then(() => {
          console.log(this.$store.state.tasks.s3_url);
          console.log("removed");
          // if(this.$store.state.tasks.s3_url.includes(filename)){
          //   this.$store.state.tasks.s3_url.splice(this.$store.state.tasks.s3_url[this.$store.state.tasks.s3_url.findIndex(e => e.fileName.includes(filename))],1)
          // }
        })
        .catch(() => {
          console.log("error");
        });
    },
    uploadFileS3(file) {
      // document.getElementById('fileUpload2').click()
      console.log("filelength:", file.length);
      console.log("file:", file);
      var data = {
        attach: file ? file : "null",
      };
      this.$store.dispatch("tasks/upload_file_s3", { data: data });
      // .then(() => {
      //   // resolve();
      // })
      // .catch(() => {});
      //   var emails_data = {
      //   folder: router.currentRoute.params.folder,
      //   currrent : JSON.parse(localStorage.getItem('userData'))
      // };
      // this.$store.dispatch('emails/fetch_emails', emails_data)
    },
  }
}
</script>
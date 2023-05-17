<template>
  <div class="mt--4">
    <div>
      <b-modal
        no-close-on-backdrop
        id="files-modal"
        ref="files-modal"
        size="lg"
        hide-footer
        class="b-overlay position-relative"
      >
        <!-- <b-card-body> -->
        <template #modal-header>
          <h5 class="modal-title">
            <span> Add new file/documents </span>
          </h5>
          <ul>
            <!-- <li>
      
                
              <div>
      
              <div class="switch">
                <label >
                  <input type="checkbox" v-model="switchOption" @click="{
                    if(switchOption) {
                    switchOption = true
                    // desig_type.text = 'ToggleRightIcon'
                  } else {
                    switchOption = false
                    // desig_type.text = 'ToggleLeftIcon'
                  }
                  }">
                  <span class="slider round"></span>
                Internal
                  
                </label>
              </div>
            </div>
          </li> -->
          </ul>
        </template>

        <validation-observer #default="{ handleSubmit }" ref="refFormObserver">
          <b-form @submit.prevent="handleSubmit(onSubmit)">
            <b-row>
              <b-col :md="'12'">
                <validation-provider
                  #default="validationContext"
                  name="task"
                  vid="task"
                  rules="required"
                >
                  <b-form-group label="Task/Lead *">
                    <v-select
                      id="task"
                      v-model="formData.task"
                      :options="allData"
                      label="subject"
                      placeholder="Search Task/Lead"
                    >
                      <template #list-header class="add_contacts">
                        <div class="ml-2 mb-1 mt-1" v-b-modal.modal-leads>
                          <!--  <b-button size="sm" variant="primary"   v-b-modal.modal-1>
      
                      <feather-icon size="14" style="margin-right: 0.5rem;"  icon="SearchIcon" /> Add Contacts</b-button> -->
                          <a href="#">
                            <feather-icon
                              size="14"
                              style="margin-right: 0.5rem;"
                              icon="PlusIcon"
                            />
                            New Lead/Task
                          </a>
                        </div>
                      </template>
                      <template #option="item">
                        <div class="d-flex justify-content-between">
                          #{{ item.id }} - {{ item.subject }}
                          <div>
                            <b-badge
                              :variant="buttonVariant(item.self_user.status)"
                            >
                              {{ item.status_master.type }}
                            </b-badge>
                          </div>
                        </div>
                      </template>
                      <template #selected-option="item">
                        <div class="d-flex justify-content-between">
                          #{{ item.id }} - {{ item.subject }}
                          <div>
                            <b-badge
                              :variant="buttonVariant(item.self_user.status)"
                            >
                              {{ item.status_master.type }}
                            </b-badge>
                          </div>
                        </div>
                      </template>
                      <!-- </v-select> -->
                    </v-select>
                    <!-- <create-contact/> -->
                    <b-form-invalid-feedback
                      v-if="validationContext.errors.length > 0"
                      class="d-flex"
                    >
                      <!-- {{ validationContext.errors[0] }} -->
                      This field is required
                    </b-form-invalid-feedback>
                  </b-form-group>
                </validation-provider>
              </b-col>
            </b-row>
            <div v-if="formData.task != null" class="col-sm-12">
              <table class="client-details-table table">
                <thead>
                  <tr>
                    <th class="padding-10">Client Name</th>
                    <td style="background-color: #f3f2f7; color: black;">
                      {{
                        formData.task.company != null
                          ? formData.task.company.name
                          : "-"
                      }}
                    </td>
                    <th class="">
                      Contact Person
                    </th>
                    <td style="background-color: #f3f2f7; color: black;">
                      {{
                        formData.task.contact_person
                          ? formData.task.contact_person.name
                          : "-"
                      }}
                    </td>
                  </tr>
                </thead>
              </table>
            </div>
            <b-row class="mt-2">
              <b-col>
                <b-form-group>
                  <!-- <quill-editor v-model="tempFields[0].description"
                                :options="editorOption"></quill-editor> -->
                                <div class="border-l" style="">
                                  <div class="d-flex flex-column">
                                    <div
                                      class="d-flex justify-content-between align-items-center p-1 border-bottom-light bg-light"
                                    >
                                      <div>Attachment</div>
                                      <div>
                                        <input
                                          type="file"
                                          ref="file_task"
                                          style="display: none;"
                                          @change="uploadFile" 
                
                                        />
                                        <b-dropdown
                                          id="file_drop"
                                          class=""
                                          style="width: 50%;"
                                          variant="primary"
                                        >
                                          <template #button-content>
                                            <span class="text-capitalize">
                                              Choose File
                                            </span>
                                          </template>
                                          <b-dropdown-item @click="$refs.file_task.click()"
                                            ><img
                                              class="mr-1"
                                              :src="browseIcon"
                                              width="25px"
                                            />Browse</b-dropdown-item
                                          >
                                          <b-dropdown-item
                                            ><img
                                              class="mr-1"
                                              :src="excelIcon"
                                              width="25px"
                                              data-type="1"
                                            />Google Sheets</b-dropdown-item
                                          >
                                          <b-dropdown-item
                                            ><img
                                              class="mr-1"
                                              :src="wordIcon"
                                              width="25px"
                                              data-type="2"
                                            />Google Docs</b-dropdown-item
                                          >
                                        
                                        </b-dropdown>
                                      </div>
                                    </div>
                                  </div>
                                  <div
                                    class="d-flex justify-content-between align-items-center p-1"
                                  >
                                  <div v-if="file_name && fileLinks.length === 0 ">No file selected </div>
                                    <div v-else-if="file_name && fileLinks">
                                      
                                      <div v-for="(file, index) in fileLinks" :key="index" class="d-flex justify-content-between">
                                        <span v-if="file_name.name === file.fileName">
                                          {{
                                            file.fileName
                                          }}
                                          <feather-icon icon="XIcon" class="cursor-pointer"
                                            @click="removes3(file.url, index)" />
                                          </span>
                                        </div>
                                    </div>
                                    
                                    <div v-else>No file selected </div>
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
                </b-form-group>
              </b-col>
            </b-row>

            <div class="mt-1 text-right">
              <b-button size="sm" variant="primary" @click="closeModal()">
                Cancel </b-button
              >&emsp;
              <b-button
                size="sm"
                :disabled="$store.state.attachments.isLoading"
                variant="primary"
                type="submit"
              >
                Save
                <b-spinner
                  small
                  class="ml-1"
                  v-if="$store.state.attachments.isLoading"
                />
              </b-button>
            </div>
          </b-form>
        </validation-observer>
        <!-- </b-card-body> -->
        <div
          v-if="$store.state.attachments.isLoading"
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
            <br /><span>Adding New Files..</span>
          </div>
        </div>
      </b-modal>
    </div>
  </div>
</template>
<script>
import { VueDatePicker } from "@mathieustan/vue-datepicker"
import wordIcon from "../../../assets/images/logo/word-icon.png"
import excelIcon from "../../../assets/images/logo/excel-icon.png"
import slideIcon from "../../../assets/images/logo/slide-icon.png"
import browseIcon from "../../../assets/images/logo/browse-icon.png"
import { ValidationProvider, ValidationObserver } from "vee-validate"
import vSelect from "vue-select"
import flatPickr from "vue-flatpickr-component"

import {
  BModal,
  BFormInvalidFeedback,
  BFormDatepicker,
  VBTooltip,
  BAvatar,
  BMediaAside,
  BImg,
  BBadge,
  BForm,
  VBModal,
  BFormInput,
  BFormGroup,
  BCard,
  BContainer,
  BRow,
  BCol,
  BPagination,
  BTable,
  BButton,
  BDropdown,
  BDropdownItem,
  BSpinner,
} from "bootstrap-vue"
import store from "@/store"
import formValidation from "@/@core/comp-functions/forms/form-validation"
import { ref, computed } from "@vue/composition-api"
import { required, email } from "@validations"
import { quillEditor } from "vue-quill-editor"
import "quill/dist/quill.core.css"
// import { mapGetters } from 'vuex'
//   import CreateContact from './CreateContactLead.vue';
//   import CreateClients from './CreateClientLead.vue';

// eslint-disable-next-line
import "quill/dist/quill.snow.css"
// eslint-disable-next-line
import "quill/dist/quill.bubble.css"
import { Mentionable } from "vue-mention"

// import InviteUser from '../users/InviteUser.vue';
export default {
  components: {
    quillEditor,
    VueDatePicker,
    //   CreateContact,
    //   CreateClients
    VBTooltip,
    BMediaAside,
    BImg,
    flatPickr,
    Mentionable,
    BFormDatepicker,
    BAvatar,
    BBadge,
    BForm,
    BFormGroup,
    BDropdown,
    BDropdownItem,
    BButton,
    BModal,
    BFormInvalidFeedback,
    BFormInput,
    BRow,
    BCol,
    ValidationObserver,
    ValidationProvider,
    BSpinner,
    vSelect,
    // InviteUser
  },
  data() {
    const date = new Date()
    const day = date.getDate()
    const month = date.getMonth() + 1
    const year = date.getFullYear()
    return {
      task: null,
      description: "",
      users: [],
      currentDate: `${year}-0${month}-${day}`,
      file_name: [],
      date: `${year}-0${month}-${day}`,
      browseIcon: browseIcon,
      slideIcon: slideIcon,
      wordIcon: wordIcon,
      excelIcon: excelIcon,
      file_name: null,
      file: null,
      previewImage: null,
      allFile:[]
    }
  },
  directives: {
    "b-modal": VBModal,
    "b-tooltip": VBTooltip,
  },
  computed: {
    allData() {
      return this.$store.state.leads.all
    },
    users_data() {
      this.formData.users = this.$store.state.users.all.filter(
        (e) => e.email === JSON.parse(localStorage.getItem("userData")).email
      )
      return this.$store.state.users.all.filter((e) => e.status === "active")
    },
    fileLinks() {
      let data = this.$store.state.attachments.links;
      return data
    },
  },
  methods: {
    uploadFileS3(file) {
      let data = {
        attach: file ? file : "null",
      };
      this.$store.dispatch('attachments/add', { data: data }).then(() => {

        resolve();

      }).catch(() => {


      })
    },
    removes3(file, i) {
      console.log('bbbb')
      var data = {
        attach_url: file ?? "null",
      };
      this.$store.dispatch('attachments/remove', { data: data }).then(() => {

        this.$store.state.attachments.links.splice(i, 1)
        const index = this.allFile.findIndex((file) => file.name === this.file_name.name);
        if (index !== -1) {
          this.allFile.splice(index, 1);
        }
        this.file_name=null;

      })
    },
    async uploadFile(e) {
      let image = e.target.files;
      let image_name = []
      const filePathsPromises = [];
    image.forEach(file => {
      filePathsPromises.push(this.base64(file));
      image_name.push(file.name)
      // filePathsPromises.push(file.name)
    });
    const filePaths = await Promise.all(filePathsPromises,image_name);
    const mappedFiles = filePaths.map((base64File,image_name) => ({
       file: base64File,
       name:image[image_name].name,
       type:'attachmentsType'
       }));

       if(this.file_name){
        let index = this.fileLinks.findIndex((e)=>e.fileName === this.file_name.name);
        this.fileLinks.splice(index,1);
        let index2 = this.allFile.findIndex((e)=>e.name === this.file_name.name);
        this.allFile.splice(index2,1);
       }

       this.file_name = mappedFiles[0]


       
       this.allFile.push(this.file_name)

    console.log(mappedFiles);
    this.uploadFileS3(mappedFiles)
    e.target.value = ''


    },
    base64(file) {
        return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
      });
    },
    isNumber(ev) {
      const keysAllowed = [
        "0",
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        ".",
      ]
      const keyPressed = ev.key

      if (!keysAllowed.includes(keyPressed)) {
        ev.preventDefault()
      }
    },
    buttonVariant(status) {
      if (status == "open") {
        return "primary"
      } else if (status == "completed") {
        return "success"
      } else if (status == "invoiced") {
        return "warning"
      } else if (status == "closed") {
        return "secondary"
      } else {
        return "warning"
      }
    },

    fetchContactPeople() {
      this.$store.dispatch("contactPeople/fetchForLeads")
    },
    fetchAllUsers() {
      this.$store.dispatch("allUsers/fetch")
    },

    resetFormData() {
      this.formData.task = null
      this.formData.description = null

      this.formData.expense = null
      this.formData.users = this.users_data.filter(
        (e) => e.email === JSON.parse(localStorage.getItem("userData")).email
      )
      this.formData.date = this.currentDate

      //   this.formData.email = '';

      // this.formData.due_date = 2;
      // this.formData.users = [];
    },
    closeModal() {
      this.$refs["files-modal"].hide()
      this.resetFormData()
    },
    onSubmit() {
      let users = []
      this.formData.users.forEach((element) => {
        users.push({
          user_id: element.id,
        })
      })
      console.log(this.formData)
      const data = {
        task_id: this.formData.task.id,
        description: this.formData.description,
        date: this.formData.date,
        expense: this.formData.expense,
        users: users,
      }
      this.$store
        .dispatch("comments/store", data)
        .then(() => {
          // this.$store.dispatch("expenses/fetch")
          this.$refs["files-modal"].hide()
          this.$toast.success("Added Successfully!", {
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
          })
          this.resetFormData()
        })
        .then(() => {
          this.$store.dispatch("comments/fetch")
        })
    },
  },
  setup() {
    const date = new Date()

    const day = date.getDate()
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    // blankFormData.users = default_users
    const blankFormData = {
      users: [],
      task: null,
      date: `${year}-0${month}-${day}`,
      expense: null,
      description: "",

      //   email: "",
    }

    const formData = ref(JSON.parse(JSON.stringify(blankFormData)))

    // let email = JSON.parse(localStorage.getItem('userData')).email
    // function onBeforeUpdate(() => {

    //   if(store.state.users.all.length > 0){

    //     store.state.users.all.forEach(element => {
    //       if(element.email === email){
    //         // this.formData.users.push(element)
    //         formData.value.users.push(element)
    //       }
    //     });
    //   }
    // })
    const resetFormData = () => {
      formData.value = JSON.parse(JSON.stringify(blankFormData))
    }

    const errors = computed(() => {
      return JSON.parse(JSON.stringify(store.state.leads.errors))
    })

    const { refFormObserver, getValidationState, resetForm } = formValidation(
      resetFormData
    )

    //    const onSubmit = () => {
    //     console.log(formData);
    //   store
    //     .dispatch("clients/store", formData.value)
    //     .then(() => {
    //       emit("refetch-data");
    //       // ref('modal-branches').hide();
    //       // emit("update:is-create-sidebar-active", false);
    //     })
    //     .catch(() => {
    //       refFormObserver.value.setErrors(errors.value);
    //     });
    //     store.dispatch('clients/fetch')
    //   };
    return {
      formData,
      //   onSubmit,

      refFormObserver,
      getValidationState,
      resetForm,
    }
  },
}
</script>
<style lang="scss">
@import "@core/scss/vue/libs/vue-select.scss";
@import "@core/scss/vue/libs/vue-flatpicker.scss";
</style>
<style>
.switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 21px;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 13px;
  bottom: 0;
  background-color: #818181;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 18px;
  width: 19px;
  left: -1px;
  bottom: 2px;
  background-color: #f1f1f1;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

input:checked + .slider {
  background-color: #f75949;
}

input:focus + .slider {
  box-shadow: 0 0 1px #f75949;
}

input:checked + .slider:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
}

/* Rounded sliders */
.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}
</style>
<style>
label {
  color: #202126;
  font-size: 14px;
}

.modal-lg {
  margin-top: 6.5rem;
}

@media (min-width: 992px) {
  #files-modal .modal-lg {
    max-width: 1300px;
  }
}

.modal-title {
  text-transform: uppercase;
}
</style>

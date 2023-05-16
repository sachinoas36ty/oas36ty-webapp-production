<template>
  <div>
    <b-modal
      no-close-on-backdrop
      id="todo-modal"
      ref="todo-modal"
      size="lg"
      :title="'Add Sub Tasks'"
      hide-footer
      class="b-overlay position-relative"
    >
      <template #modal-header>
        <h5 class="modal-title">{{ "Add Sub Tasks" }}</h5>
        <!-- <button type="button" aria-label="Close" class="close">x</button> -->
        <feather-icon
          icon="XIcon"
          size="24"
          class="cursor-pointer"
          @click="
            () => {
              remove_all_fields()
              $refs['todo-modal'].hide()
            }
          "
        />
      </template>
      <!-- <b-form-input  /> -->
      <validation-observer #default="{ handleSubmit }" ref="refFormObserver">
        <b-form @submit.prevent="handleSubmit(createTemplate)">
          <b-row class="mt-1">
            <b-col md="6">
              <validation-provider
                #default="validationContext"
                name="temp_name"
                vid="template"
                rules="required"
              >
                <b-form-group>
                  <b-form-input
                    v-model="temp_name"
                    id="template"
                    placeholder="Enter sub-task name"
                  />
                  <b-form-invalid-feedback class="d-block">
                    {{ validationContext.errors[0] }}
                  </b-form-invalid-feedback>
                  <!-- </b-form-input> -->
                </b-form-group>
              </validation-provider>
              <validation-provider
                #default="validationContext"
                name="title"
                vid="title"
                rules="required"
              >
                <b-form-group>
                  <Mentionable
                    style="width: 100%;"
                    :keys="['@']"
                    :items="users_to_assign"
                    offset="6"
                    insert-space
                    @open="onOpen"
                    @apply="onApply"
                  >
                    <b-form-input
                      v-model="tempFields[0].title"
                      id="title"
                      placeholder="Enter sub-task Steps and assign @someone"
                    />

                    <template #no-result>
                      <div class="dim">
                        No result
                      </div>
                    </template>

                    <template #item-@="{ item }">
                      <div class="user">
                        <b-avatar :src="item.avatar"> </b-avatar>
                        <!-- hh -->
                        <span class="ml-1">
                          {{ item.value }}
                          <!-- ({{ item.name }}) -->
                        </span>
                      </div>
                    </template>
                  </Mentionable>
                  <b-form-invalid-feedback class="d-block">
                    {{ validationContext.errors[0] }}
                  </b-form-invalid-feedback>
                </b-form-group>
              </validation-provider>
            </b-col>
            <b-col md="6">
                <b-form-group>
                  <!-- <quill-editor v-model="tempFields[0].description"
                          :options="editorOption"></quill-editor> -->
                  <div class="border-l" style="">
                    <div class="d-flex flex-column">
                      <div
                        class="d-flex justify-content-between align-items-center p-1 border-bottom-light bg-light"
                      >
                        <div>Attachment(s)</div>
                        <div>
                          <input
                            type="file"
                            ref="file_task"
                            @change="handleUpload"
                            style="display: none;"
                          />
                          <b-dropdown
                            id="file_drop"
                            class=""
                            style="width: 50%;"
                            variant="primary"
                          >
                            <template #button-content>
                              <span class="text-capitalize">
                                Choose File(s)
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
                            <b-dropdown-item
                              ><img
                                class="mr-1"
                                :src="slideIcon"
                                width="25px"
                                data-type="3"
                              />Google Slides</b-dropdown-item
                            >
  
                            <!-- <b-dropdown-item>
  
  </b-dropdown-item> -->
                          </b-dropdown>
                        </div>
                      </div>
                    </div>
                    <div class="p-1">
                      <div
                        class="d-flex justify-content-center"
                        v-if="attachmentLoading"
                      >
                        <b-spinner variant="primary" />
                      </div>
                      <div v-else-if="file_name.length">
                        <div
                          v-for="(file, index) in fileLinks"
                          :key="index"
                          class="d-flex justify-content-between"
                        >
                          {{ file.fileName }}
                          <feather-icon
                            icon="XIcon"
                            class="cursor-pointer"
                            @click="removes3(file.url, index)"
                          />
                        </div>
                      </div>
                      <div
                        v-else
                        class="d-flex justify-content-center align-items-center"
                      >
                        No file(s) selected
                      </div>
                    </div>
                    <!-- <div class="d-flex justify-content-between align-items-center p-1">
                              <div v-if="file_name.length > 0">{{ file_name }} <feather-icon icon="XIcon"
                        class="cursor-pointer" @click="removes3(file.url, index)" /></div>
                              <div v-else>No file(s) selected</div>
                              <b-media-aside class="mr-0">
                                  <b-img v-if="file !== null && previewImage != null" id="ref_image_base_64"
                                      ref="refPreviewEl" v-model="image" :src="previewImage" height="40"
                                      width="40" rounded="circle" class=" border border-l" />
  
                              </b-media-aside>
                          </div> -->
                  </div>
                </b-form-group>
              </b-col>
          </b-row>
          <div class="text-right mt-3">
            <b-button size="sm" class="mr-1" type="reset" @click="() => {
               remove_all_fields()
               $refs['template-modal-global'].hide()
           }" variant="primary">
               Cancel
           </b-button>
            <b-button size="sm" :disabled="isLoading" type="submit " variant="primary">
               {{ 'Create' }}
               <b-spinner style="margin-left: 0.5rem;" small v-if="isLoading" />
           </b-button>
       </div>
        </b-form>
      </validation-observer>
      <div v-if="isLoading" class="b-overlay position-absolute"
      style="inset: 0px;z-index: 10;/* display: none; */">
      <div class="position-absolute bg-white rounded-sm"
        style="inset: 0px; opacity: 0.75; backdrop-filter: blur(0px);"></div>
      <div class="position-absolute d-flex align-items-center flex-column" style="top: 50%; left: 50%; transform: translateX(-50%) translateY(-50%);">
        <span aria-hidden="true" class="spinner-border text-primary"> <!----></span>
        <br><span>Adding New Sub Task..</span>
      </div>
    </div>
    </b-modal>
  </div>
</template>
<script>
import wordIcon from "../../../assets/images/logo/word-icon.png"
import excelIcon from "../../../assets/images/logo/excel-icon.png"
import slideIcon from "../../../assets/images/logo/slide-icon.png"
import browseIcon from "../../../assets/images/logo/browse-icon.png"
import formValidation from "@/@core/comp-functions/forms/form-validation"
import {
  BAvatar,
  BDropdown,
  BDropdownItem,
  BMediaAside,
  BImg,
  BFormInvalidFeedback,
  BContainer,
  BSpinner,
  BRow,
  BTable,
  BCard,
  BCol,
  BButton,
  BModal,
  BFormInput,
  BFormGroup,
  BForm,
} from "bootstrap-vue"
import { ValidationProvider, ValidationObserver } from "vee-validate"
import { Mentionable } from "vue-mention"

export default {
  components: {
    BAvatar,
    BDropdown,
    BDropdownItem,
    BMediaAside,
    BImg,
    BFormInvalidFeedback,
    BContainer,
    BSpinner,
    BRow,
    BTable,
    BCard,
    BCol,
    BButton,
    BModal,
    BFormInput,
    BFormGroup,
    BForm,
    ValidationProvider,
    ValidationObserver,
    Mentionable,
  },
  data() {
    return {
      browseIcon: browseIcon,
      slideIcon: slideIcon,
      wordIcon: wordIcon,
      excelIcon: excelIcon,
      subtask_mentions: [],
      search: "",
      previewImage: null,
      file: null,
      file_name: [],
      image: null,
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
      temp_name: "",
      tempFields: [
        {
          title: null,
          description: null,
        },
      ],
      templateFields: [],
    }
  },
  computed: {
    attachmentLoading() {
      let data = this.$store.state.attachments.isLoading
      return data
    },
    fileLinks() {
      let data = this.$store.state.attachments.links
      return data
    },
    users_to_assign() {
      var items = this.$store.state.users.all.filter(
        (e) => e.email !== JSON.parse(localStorage.getItem("userData")).email
      )
      var data = []
      var leads = this.$store.state.leads.all.filter((e) => e.type === "lead")
      var user_assigned = []

      // return user_assigned;
      for (let index = 0; index < items.length; index++) {
        // for (let i = 0; i < leads.length; i++) {
        // for (let j = 0; j < leads[i].users.length; j++) {
        //  user_assigned[j] = {
        //     id: leads[i].users[j].id,
        //     name: leads[i].users[j].name,
        //     avatar: leads[i].users[j].avatar,

        //  }
        // user_assigned = leads[i]
        // }

        data[index] = {
          id: items[index].id,
          value: items[index].name,

          name: items[index].name,
          avatar: items[index].avatar,
        }
        // if(leads[i].users[j].id === items[index].id){
        //   console.log('already assigned');
        // }

        // }
        // }
      }
      return data.filter((country) =>
        country.name
          .toLocaleLowerCase()
          .includes(this.search.toLocaleLowerCase())
      )
    },
    isLoading() {
      return this.$store.state.subtaskTemplate.isLoading
    },
  },
  methods: {
    openFile() {
      document.getElementById("file").click()
    },
    removes3(file, i) {
      console.log("bbbb")
      var data = {
        attach_url: file ?? "null",
      }
      this.$store.dispatch("attachments/remove", { data: data }).then(() => {
        this.$store.state.attachments.links.splice(i, 1)
        this.file_name.splice(i, 1)
      })
    },
    removes3_from_addmore(file, index) {
      console.log("bbbb")

      var data = {
        // attach_url: file ?? "null",
      }
      this.fileLinks.forEach((element) => {
        if (element.fileName == file) {
          data.attach_url = element.url
        } else {
          data.attach_url = null
        }
      })
      let index2 = this.fileLinks.findIndex((e) => e.fileName == file)
      //   let local_index = this.templateFields[index].file_name.findIndex(e => e.name == file)
      this.$store.dispatch("attachments/remove", { data: data }).then(() => {
        this.$store.state.attachments.links.splice(index2, 1)
        // this.file_name.splice(i, 1)
        this.templateFields[index].file_name.pop()
      })
    },
    handleUpload(e) {
      // console.log(e);
      let image = e.target.files[0]
      const reader = new FileReader()
      reader.onload = (e) => {
        let data = {
          file: e.target.result,
          name: image.name,
        }
        //   console.log("data:", data)
        //   console.log("inside onload before:", this.file_name)
        this.file_name.push(data)
        //   console.log("inside onload:", this.file_name)
        //   console.log("inside onload:", this.file_name.length)
        this.uploadFileS3(this.file_name)
      }
      reader.readAsDataURL(image)
      e.target.value = ""
    },
    handleUpload2(e, index) {
      // console.log(e);
      let image = e.target.files[0]
      const reader = new FileReader()
      reader.onload = (e) => {
        let data = {
          file: e.target.result,
          name: image.name,
        }
        //   console.log("data:", data)
        //   console.log("inside onload before:", this.file_name)
        this.templateFields[index].file_name.push(data)
        //   console.log("inside onload:", this.file_name)
        //   console.log("inside onload:", this.file_name.length)
        this.uploadFileS3(this.templateFields[index].file_name)
      }
      reader.readAsDataURL(image)
      e.target.value = ""
    },
    uploadFileS3(file) {
      // console.log(file);
      let data = {
        attach: file ? file : "null",
      }
      this.$store
        .dispatch("attachments/add", { data: data })
        .then(() => {
          resolve()
        })
        .catch(() => {})
    },
    onOpen(key) {
      // this.items = key === '@' ? this.mentions[0].dataSource : ""
    },
    onApply(item, key, replacedWith) {
      this.subtask_mentions.push({ id: item.id, name: item.name })
      console.log(item, `has been replaced with ${replacedWith}`)
    },
    remove_all_fields() {
      while (this.templateFields.length > 0) {
        this.templateFields.pop()
      }
      this.tempFields[0].title = null
      this.tempFields[0].description = null
      this.temp_name = null
    },
    createTemplate() {
      var arr = []
      arr.push({
        steps_body: this.tempFields[0].title,
        attachment_url:
          this.file_name.length > 0
            ? this.fileLinks.find((e) => e.fileName == this.file_name[0].name)
                .url
            : null,
      })
      this.templateFields.forEach((element) => {
        arr.push({
          steps_body: element.title,
          attachment_url:
            element.file_name.length > 0
              ? this.fileLinks.find(
                  (e) => e.fileName == element.file_name[0].name
                ).url
              : null,
        })
      })
      // this.templateFields.push(this.tempFields[0]);
      const data = {
        name: this.temp_name,
        subtaskBody: arr,
      }

      this.$store.dispatch("subtaskTemplate/store", data).then(() => {
        this.$refs["todo-modal"].hide()
        this.$store.dispatch("subtaskTemplate/fetch")
        this.remove_all_fields()
      })
    },
    removeTemplate(index) {
      this.templateFields.splice(index, 1)
    },
    addTemplate() {
      this.templateFields.push({
        title: null,
        description: null,
        file_name: [],
      })
      // console.log(this.inputs)
    },
  },
  setup() {
    const { refFormObserver, getValidationState, resetForm } = formValidation(
      resetForm
    )
    return {
      refFormObserver,
      getValidationState,
      resetForm,
      formValidation,
    }
  },
}
</script>
<style lang="scss">
@import "@core/scss/vue/libs/quill.scss";
</style>
<style>
#todo-modal .modal-dialog {
  max-width: 880px;
}

/* .ql-toolbar.ql-snow+.ql-container.ql-snow {
    height: 10rem !important;
} */
</style>

<template>
  <div>
    <div class="mt-2 mb-2">
      <!-- <b-row> -->
      <!-- <b-col  md="6" class="d-flex align-items-center justify-content-start mb-1 mb-md-0" > -->
      <!-- <b-col > -->
      <!-- <div class="d-flex align-items-center justify-content-end"> -->
      <div class="btn-filter d-flex justify-content-between align-items-center">
        <span> SUB-TASK TEMPLATES </span>
        &emsp;
        <b-button
          size="sm"
          variant="primary"
          @click="openModal('template-modal', 'add', 0)">
          <span class="text-nowrap"> Add </span>
        </b-button>
        <!-- </div> -->
      </div>
      <hr style="border-color: #f75949" />
      <!-- </b-col> -->
      <!-- </b-col> -->
      <!-- </b-row> -->
    </div>
    <b-card no-body>
      <b-table
        :show-empty="items.length === 0"
        id="proposal-templates-table"
        selectable
        responsive
        class="mb-0"
        @row-clicked="onRowClicked"
        :items="items"
        :fields="TemplateTable">
        <template #row-details="item">
          <b-card no-body class="ml-2 mt-2 mr-2 mb-0">
            <div
              class="d-flex justify-content-between"
              style="text-transform: uppercase; font-weight: 500">
              {{ item.item.name }} - Template Details

              <div>
                <feather-icon
                  style="margin-right: 0.5rem"
                  @click="
                    () => {
                      temp_name = item.item.name;
                      // if(item.item.proposal_template_section.length === 1){

                      tempFields[0].title =
                        item.item.subtask_body[0].steps_body;
                      // tempFields[0].description = item.item.proposal_template_section[0].description
                      file_name =
                        item.item.subtask_body[0].attachment_url == null
                          ? []
                          : [{ url: item.item.subtask_body[0].attachment_url }];

                      if (item.item.subtask_body.length > 1) {
                        item.item.subtask_body.forEach((element) => {
                          if (element.steps_body != tempFields[0].title) {
                            templateFields.push({
                              title: element.steps_body,
                              // description: element.description
                              file_name:
                                element.attachment_url == null
                                  ? []
                                  : [{ url: element.attachment_url }],
                            });
                          }
                        });
                      }

                      // }

                      openModal('template-modal', 'edit', item.item.id);
                    }
                  "
                  icon="EditIcon"
                  size="20" />
                <feather-icon
                  icon="TrashIcon"
                  size="20"
                  @click="destroyItem(item.item.id)" />
              </div>
            </div>
            <hr style="border-color: #f75949" />
            <table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Steps</th>
                  <th>Attachment</th>
                  <!-- <th>Actions</th> -->
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(body, index) in item.item.subtask_body"
                  :key="body.steps_body">
                  <td>{{ index + 1 }}</td>
                  <td>
                    {{ body.steps_body }}
                  </td>
                  <td>
                    {{ body.attachment_url != null ? body.attachment_url : "" }}
                  </td>
                  <!-- <td>
                                     <b-button size="sm" variant="primary">Edit</b-button>
                                     <b-button size="sm" class="ml-1" variant="primary">Delete</b-button>
                                </td> -->
                </tr>
              </tbody>
            </table>
          </b-card>
        </template>
        <template #cell(temp_name)="{ item }">
          {{ item.name }}
        </template>
      </b-table>
    </b-card>
    <b-modal
      no-close-on-backdrop
      id="template-modal"
      ref="template-modal"
      size="lg"
      :title="modalTitle"
      hide-footer>
      <template #modal-header>
        <h5 class="modal-title">{{ modalTitle }}</h5>
        <!-- <button type="button" aria-label="Close" class="close">x</button> -->
        <feather-icon
          icon="XIcon"
          size="24"
          class="cursor-pointer"
          @click="
            () => {
              remove_all_fields();
              $refs['template-modal'].hide();
            }
          " />
      </template>
      <!-- <b-form-input  /> -->
      <validation-observer #default="{ handleSubmit }" ref="refFormObserver">
        <b-form
          @submit.prevent="
            handleSubmit(
              modalTitle == 'add subtask template'
                ? createTemplate
                : updateTemplate
            )
          ">
          <b-row class="mt-1">
            <b-col md="6">
              <validation-provider
                #default="validationContext"
                name="temp_name"
                vid="template"
                rules="required">
                <b-form-group>
                  <b-form-input
                    v-model="temp_name"
                    id="template"
                    placeholder="Enter sub-task template name" />
                  <b-form-invalid-feedback class="d-block">
                    {{ validationContext.errors[0] }}
                  </b-form-invalid-feedback>
                  <!-- </b-form-input> -->
                </b-form-group>
              </validation-provider>
            </b-col>
          </b-row>
          <b-row class="mt-1">
            <b-col md="6">
              <validation-provider
                #default="validationContext"
                name="title"
                vid="title"
                rules="required">
                <b-form-group>
                  <Mentionable
                    style="width: 100%"
                    :keys="['@']"
                    :items="users_to_assign"
                    offset="6"
                    insert-space
                    @open="onOpen"
                    @apply="onApply">
                    <b-form-input
                      v-model="tempFields[0].title"
                      id="title"
                      placeholder="Enter sub-task Steps and assign @someone" />

                    <template #no-result>
                      <div class="dim">No result</div>
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
                      class="d-flex justify-content-between align-items-center p-1 border-bottom-light bg-light">
                      <div>Attachment</div>
                      <div>
                        <input
                          type="file"
                          ref="file_task"
                          @change="handleUpload"
                          style="display: none" />
                        <b-dropdown
                          id="file_drop"
                          class=""
                          style="width: 50%"
                          variant="primary">
                          <template #button-content>
                            <span class="text-capitalize">
                              Choose File
                            </span>
                          </template>
                          <b-dropdown-item @click="$refs.file_task.click()"
                            ><img
                              class="mr-1"
                              :src="browseIcon"
                              width="25px" />Browse</b-dropdown-item
                          >
                          <b-dropdown-item
                            ><img
                              class="mr-1"
                              :src="excelIcon"
                              width="25px"
                              data-type="1" />Google Sheets</b-dropdown-item
                          >
                          <b-dropdown-item
                            ><img
                              class="mr-1"
                              :src="wordIcon"
                              width="25px"
                              data-type="2" />Google Docs</b-dropdown-item
                          >
                          <b-dropdown-item
                            ><img
                              class="mr-1"
                              :src="slideIcon"
                              width="25px"
                              data-type="3" />Google Slides</b-dropdown-item
                          >

                          <!-- <b-dropdown-item>

        </b-dropdown-item> -->
                        </b-dropdown>
                      </div>
                    </div>
                  </div>
                  <div class="p-1">
                    
                    <div v-if="file_name">
                      <div
                        v-for="(file, index) in fileLinks"
                        :key="index"
                        class="d-flex justify-content-between">
                        <span v-if="file.fileName === file_name.name">
                          {{ file.fileName }}
                          <feather-icon
                            icon="XIcon"
                            class="cursor-pointer"
                            @click="removes3(file.url, index)" />
                        </span>
                      </div>
                    </div>
                    <div
                      v-else
                      class="d-flex justify-content-center align-items-center">
                      No file selected
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
              <div class="text-right">
                <b-button
                  size="sm"
                  @click="addTemplate()"
                  class="cursor-pointer"
                  variant="outline-primary">
                  Add more 
                </b-button>
              </div>
            </b-col>
          </b-row>

          <b-row
            class="mt-1"
            v-for="(items, index) in templateFields"
            :key="items.template">
            <b-col md="6">
              <validation-provider
                #default="validationContext"
                name="temp_title"
                :vid="'title' + index"
                rules="required">
                <Mentionable
                  style="width: 100%"
                  :keys="['@']"
                  :items="users_to_assign"
                  offset="6"
                  insert-space
                  @open="onOpen"
                  @apply="onApply">
                  <b-form-group>
                    <b-form-input
                      v-model="templateFields[index].title"
                      :id="'title' + index"
                       
                      placeholder="Enter sub-task Steps and assign @someone" />
                    <b-form-invalid-feedback class="d-block">
                      {{ validationContext.errors[0] }}
                    </b-form-invalid-feedback>
                  </b-form-group>
                  <template #no-result>
                    <div class="dim">No result</div>
                  </template>

                  <template #item-@="{ item }">
                    <div class="user">
                      <b-avatar :src="item.avatar"> </b-avatar>
                      <span class="ml-1">
                        {{ item.value }}
                        <!-- ({{ item.name }}) -->
                      </span>
                    </div>
                  </template>
                </Mentionable>
              </validation-provider>
            </b-col>
            <b-col md="6">
              <b-form-group>
                <div class="border-l" style="">
                  <div class="d-flex flex-column">
                    <div
                      class="d-flex justify-content-between align-items-center p-1 border-bottom-light bg-light">
                      <div>Attachment</div>
                      <div>
                        <input
                          type="file"
                          :id="'file-'+index"
                          @change="(event)=>handleUpload2(event, index)"
                          style="display: none" />
                        <b-dropdown
                          id="file_drop"
                          class=""
                          style="width: 50%"
                          variant="primary">
                          <template #button-content>
                            <span class="text-capitalize">
                              Choose File
                            </span>
                          </template>
                          <b-dropdown-item @click="openFile(index)"
                            ><img
                              class="mr-1"
                              :src="browseIcon"
                              width="25px" />Browse</b-dropdown-item
                          >
                          <b-dropdown-item
                            ><img
                              class="mr-1"
                              :src="excelIcon"
                              width="25px"
                              data-type="1" />Google Sheets</b-dropdown-item
                          >
                          <b-dropdown-item
                            ><img
                              class="mr-1"
                              :src="wordIcon"
                              width="25px"
                              data-type="2" />Google Docs</b-dropdown-item
                          >
                          <b-dropdown-item
                            ><img
                              class="mr-1"
                              :src="slideIcon"
                              width="25px"
                              data-type="3" />Google Slides</b-dropdown-item
                          >

                          <!-- <b-dropdown-item>

        </b-dropdown-item> -->
                        </b-dropdown>
                      </div>
                    </div>
                  </div>
                  <div class="p-1">
                    <!-- <div
                      class="d-flex justify-content-center"
                      v-if="attachmentLoading">
                      <b-spinner variant="primary" />
                    </div> -->
                    <div v-if="templateFields[index].file_name">
                        <div v-for="(file,ind) in fileLinks" :key="ind" class="text-left">
                          <span  v-if="file.fileName === templateFields[index].file_name.name">

                            {{ file.fileName }}
                            <feather-icon
                              icon="XIcon"
                              class="cursor-pointer"
                              @click="
                                removes3_from_addmore(
                                  file.url,
                                  ind,index
                                )
                              " />
                          </span>
                        </div>
                    </div>
                    <div
                      v-else
                      class="d-flex justify-content-center align-items-center">
                      No file selected
                    </div>
                  </div>
                </div>
              </b-form-group>
              <div class="text-right">
                <b-button
                  size="sm"
                  class="mr-1"
                  @click="removeTemplate(index)"
                  variant="outline-primary">
                  Remove 
                </b-button>
                <b-button
                  size="sm"
                  @click="addTemplate()"
                  variant="outline-primary">
                  Add more
                </b-button>
              </div>
            </b-col>
          </b-row>
          <div class="text-right mt-3">
            <b-button
              size="sm"
              class="mr-1"
              type="reset"
              @click="
                () => {
                  remove_all_fields();
                  $refs['template-modal'].hide();
                }
              "
              variant="primary">
              Cancel
            </b-button>
            <b-button
              size="sm"
              :disabled="isLoading"
              type="submit "
              variant="primary">
              {{ modalTitle == "add subtask template" ? "Create" : "Update" }}
              <b-spinner style="margin-left: 0.5rem" small v-if="isLoading" />
            </b-button>
          </div>
        </b-form>
      </validation-observer>
    </b-modal>
  </div>
</template>
<script>
import wordIcon from "../../../assets/images/logo/word-icon.png";
import excelIcon from "../../../assets/images/logo/excel-icon.png";
import slideIcon from "../../../assets/images/logo/slide-icon.png";
import browseIcon from "../../../assets/images/logo/browse-icon.png";
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
} from "bootstrap-vue";
import { quillEditor } from "vue-quill-editor";
import { ValidationProvider, ValidationObserver } from "vee-validate";
import formValidation from "@/@core/comp-functions/forms/form-validation";
import { ElementType } from "htmlparser2";
import { Mentionable } from "vue-mention";

export default {
  name: "subtask-Template",
  components: {
    BAvatar,
    BDropdown,
    Mentionable,
    BDropdownItem,
    BMediaAside,
    BImg,
    BRow,
    BCol,
    BButton,
    BSpinner,
    BTable,
    BCard,
    ValidationObserver,
    BFormInvalidFeedback,
    BModal,
    BFormInput,
    BFormGroup,
    quillEditor,
    BForm,
    ValidationProvider,
    BContainer,
  },
  data() {
    return {
      fileArrayMultiple:[],
      file_name2: null,
      browseIcon: browseIcon,
      slideIcon: slideIcon,
      wordIcon: wordIcon,
      excelIcon: excelIcon,
      subtask_mentions: [],
      search: "",
      previewImage: null,
      file: null,
      file_name: null,
      image: null,
      TemplateTable: [
        { key: "id", label: "#", thClass: "width-7" },
        { key: "temp_name", label: "template name" },
      ],
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
      edit_temp_id: 0,
      temp_name: "",
      tempFields: [
        {
          title: null,
          description: null,
        },
      ],
      templateFields: [],
      modalTitle: "",
    };
  },
  computed: {
    attachmentLoading() {
      let data = this.$store.state.attachments.isLoading;
      return data;
    },
    fileLinks() {
      let data = this.$store.state.attachments.links;
      return data;
    },
    users_to_assign() {
      var items = this.$store.state.users.all.filter(
        (e) => e.email !== JSON.parse(localStorage.getItem("userData")).email
      );
      var data = [];
      var leads = this.$store.state.leads.all.filter((e) => e.type === "lead");
      var user_assigned = [];

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
        };
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
      );
    },
    items() {
      return this.$store.state.subtaskTemplate.all;
    },
    isLoading() {
      return this.$store.state.subtaskTemplate.isLoading;
    },
  },
  created() {
    this.$store.dispatch("subtaskTemplate/fetch");
  },
  methods: {
    destroyItem(id) {
      if (confirm("Are you sure do you want to delete this item?")) {
        this.$store.dispatch("subtaskTemplate/destroy", id).then(() => {
          this.$store.dispatch("subtaskTemplate/fetch");
          this.$toast.success("Deleted Successfully!", {
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
        });
      }
    },
    openFile(index) {
      document.getElementById('file-'+index).click();
    },
    removes3(file, i) {
      var data = {
        attach_url: file ?? "null",
      };
      this.$store.dispatch("attachments/remove", { data: data }).then(() => {
        this.$store.state.attachments.links.splice(i, 1);
        const index = this.fileArrayMultiple.findIndex((file) => file.name === this.file_name.name);
        if (index !== -1) {
          this.fileArrayMultiple.splice(index, 1);
        }
        this.file_name = null;
      });
    },
    removes3_from_addmore(file, i, ind) {

      
      var data = {
        attach_url: file ?? "null",
      };
      this.$store.dispatch('attachments/remove', { data: data }).then(() => {

        this.$store.state.attachments.links.splice(i, 1)
        const index = this.fileArrayMultiple.findIndex((file) => file.name === this.templateFields[ind].file_name.name);
        if (index !== -1) {
          this.fileArrayMultiple.splice(index, 1);
        }
        this.templateFields[ind].file_name=null;
        

      })
    },
    async handleUpload(e) {
      let image = e.target.files;
      let image_name = [];
      const filePathsPromises = [];
      image.forEach((file) => {
        filePathsPromises.push(this.base64(file));
        image_name.push(file.name);
      });
      const filePaths = await Promise.all(filePathsPromises, image_name);
      const mappedFiles = filePaths.map((base64File, image_name) => ({
        file: base64File,
        name: image[image_name].name,
      }));
      if(this.file_name){
        let index = this.fileLinks.findIndex((e)=>e.fileName === this.file_name.name);
        this.fileLinks.splice(index,1);
        let index2 = this.fileArrayMultiple.findIndex((e)=>e.name === this.file_name.name);
        this.fileArrayMultiple.splice(index2,1);
      }

      this.file_name = mappedFiles[0];

      this.fileArrayMultiple.push(this.file_name);
      console.log(mappedFiles);
      this.uploadFileS3(mappedFiles);
      e.target.value = ''

    },
    base64(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
      });
    },
    async handleUpload2(e, index) {
      console.log("this is index broo" , index)
      let image = e.target.files;
      let image_name = [];
      const filePathsPromises = [];
      image.forEach((file) => {
        filePathsPromises.push(this.base64(file));
        image_name.push(file.name);
      });
      const filePaths = await Promise.all(filePathsPromises, image_name);
      const mappedFiles = filePaths.map((base64File, image_name) => ({
        file: base64File,
        name: image[image_name].name,
      }));
      if(this.templateFields[index].file_name){
        let index1 = this.fileLinks.findIndex((e)=>e.fileName === this.templateFields[index].file_name.name);
        this.fileLinks.splice(index1,1);
        let index2 = this.fileArrayMultiple.findIndex((e)=>e.name === this.templateFields[index].file_name.name);
        this.fileArrayMultiple.splice(index2,1);
       }
      this.templateFields[index].file_name = mappedFiles[0];
      this.fileArrayMultiple.push(this.templateFields[index].file_name);
      console.log(mappedFiles);
      this.uploadFileS3(mappedFiles);
      e.target.value = ''

    },
    uploadFileS3(file) {
      // console.log(file);
      let data = {
        attach: file ? file : "null",
      };
      this.$store
        .dispatch("attachments/add", { data: data })
        .then(() => {
          resolve();
        })
        .catch(() => {});
    },
    onOpen(key) {
      // this.items = key === '@' ? this.mentions[0].dataSource : ""
    },
   onApply(item, key, replacedWith) {
      let count = 0
      this.subtask_mentions.forEach(element => {
        if(element.id === item.id){
          count++
        }
      });
      if(count === 0){
        this.subtask_mentions.push({ name: item.name, id: item.id })
      }else{

        let index = this.subtask_mentions.findIndex(e => e.id === item.id)
        if(index !=-1){
          
          this.subtask_mentions.splice(index,count)
        }
        
      }

      console.log(item, `has been replaced with ${replacedWith}`)
    },
    remove_all_fields() {
      while (this.templateFields.length > 0) {
        this.templateFields.pop();
      }
      this.tempFields[0].title = null;
      this.tempFields[0].description = null;
      this.temp_name = null;
      this.templateFields = [];
      this.fileArrayMultiple = [];
      this.$store.state.attachments.links = [];
      this.fileLinks = [];
      this.file_name = null;
    },
    createTemplate() {
      var arr = [];
      arr.push({
        steps_body: this.tempFields[0].title,
        attachment_url:
          this.file_name !=null
            ? this.fileLinks.find((e) => e.fileName == this.file_name.name)
                .url
            : null,
      });
      this.templateFields.forEach((element) => {
        arr.push({
          steps_body: element.title,
          attachment_url:
            element.file_name !=null
              ? this.fileLinks.find(
                  (e) => e.fileName == element.file_name.name
                ).url
              : null,
        });
      });
      // this.templateFields.push(this.tempFields[0]);
      const data = {
        name: this.temp_name,
        subtaskBody: arr,
      };

      this.$store.dispatch("subtaskTemplate/store", data).then(() => {
        this.$refs["template-modal"].hide();
        this.$store.dispatch("subtaskTemplate/fetch");
        this.remove_all_fields();
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
      });
    },
    updateTemplate() {
      // alert(this.edit_temp_id)
      var arr = [];
      arr.push({
        steps_body: this.tempFields[0].title,
        attachment_url:
          this.file_name.length > 0
            ? this.fileLinks.find((e) => e.fileName == this.file_name[0].name)
                .url
            : null,
      });
      this.templateFields.forEach((element) => {
        arr.push({
          steps_body: element.title,
          attachment_url:
            element.file_name.length > 0
              ? this.fileLinks.find(
                  (e) => e.fileName == element.file_name[0].name
                ).url
              : null,
        });
      });
      // this.templateFields.push(this.tempFields[0]);
      const data = {
        name: this.temp_name,
        subtaskBody: arr,
      };
      this.$store
        .dispatch("subtaskTemplate/update", {
          payload: data,
          id: this.edit_temp_id,
        })
        .then(() => {
          this.$refs["template-modal"].hide();
          this.$store.dispatch("subtaskTemplate/fetch");
          this.remove_all_fields();
          this.$toast.success("Updated Successfully!", {
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
        });
    },
    removeTemplate(i) {
      let file = null
      const index = this.fileLinks.findIndex((file) => file.fileName === this.templateFields[i].file_name.name);
        if (index !== -1) {
        file =  this.fileLinks[index].url;
        }
        var data = {
        attach_url: file ?? "null",
      };
      this.$store.dispatch("attachments/remove", { data: data })

      const index2 = this.fileArrayMultiple.findIndex((file) => file.name === this.templateFields[i].file_name.name);
        if (index2 !== -1) {
          this.fileArrayMultiple.splice(index2, 1);
        }

      this.templateFields.splice(i, 1);
    },
    addTemplate() {
      this.templateFields.push({
        title: null,
        description: null,
        file_name: null,
      });
      // console.log(this.inputs)
    },
    openModal(name, key, edit_id) {
      // var str = ''

      // if(key.includes('_')){
      //     str  = key.split('_')[0]
      // }
      if (key == "add") {
        this.modalTitle = "add subtask template";
        this.$refs[name].show();
      }
      if (key == "edit") {
        if (edit_id != 0) {
          this.modalTitle = "edit subtask template";

          this.edit_temp_id = edit_id;
        }
        this.$refs[name].show();
      }
    },
    onRowClicked(item) {
      const { detailsRow } = this;
      if (detailsRow && detailsRow !== item) {
        detailsRow._showDetails = false;
      }

      this.$set(item, "_showDetails", !item._showDetails);
      this.detailsRow = item;
    },
  },
  setup() {
    const { refFormObserver, getValidationState, resetForm } =
      formValidation(resetForm);
    return {
      refFormObserver,
      getValidationState,
      resetForm,
      formValidation,
    };
  },
};
</script>
<style lang="scss">
@import "@core/scss/vue/libs/quill.scss";
</style>
<style>
#template-modal .modal-dialog {
  max-width: 880px;
}

/* .ql-toolbar.ql-snow+.ql-container.ql-snow {
    height: 10rem !important;
} */
</style>

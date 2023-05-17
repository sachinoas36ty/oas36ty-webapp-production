<template>
  <div>
    <b-modal
      v-model="openTemplateModal"
      no-close-on-backdrop
      id="template-modal"
      ref="template-modal"
      size="md"
      @close="()=>{
        $refs['template-modal'].hide();
        resetFormTemplateModal();

      }"
      hide-footer>
      <template #modal-header>
        <h5 class="modal-title">Add to Template</h5>
        <!-- <button type="button" aria-label="Close" class="close">x</button> -->
        
      </template>
      <validation-observer #default="{ handleSubmit }" ref="refFormObserver">
        <b-form
          @submit.prevent="
          handleSubmit(
              createTemplate
            )
          ">
      <b-row class="mt-1">
        <b-col md="12">
          <validation-provider
            #default="validationContext"
            name="Template Name"
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
      <!-- <b-form-input  /> -->
      
         
          <div class="text-right mt-1">
            <b-button
              size="sm"
              class="mr-1"
              type="reset"
              @click="
                () => {
                  $refs['template-modal'].hide();
                  resetFormTemplateModal()
                }
              "
              variant="primary">
              Cancel
            </b-button>
            <b-button
              size="sm"
              type="submit "
              variant="primary">
              Create
            </b-button>
          </div>
        </b-form>
      </validation-observer>
    </b-modal>
    <!-- <b-modal
      v-model="openTemplateModal2"
      no-close-on-backdrop
      id="choose-template-modal"
      ref="choose-template-modal"
      size="md"
      @close="()=>{
        $refs['choose-template-modal'].hide();

      }"
      hide-footer>
      <template #modal-header>
        <h5 class="modal-title">Choose to Templates</h5>
        
      </template>
      <div class="table responsive-sm">

        <table>
          <thead>
            <tr>
            <th>Template Name</th>
            <th>Actions</th>

          </tr>
        </thead>
        <tbody>
          <tr v-for="data in $store.state.subtaskTemplate.all" :key="data" :id="String(Number(data.id + 1))">
            <td>
              {{ data.name }}
            </td>
            <td >
              Choose
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    </b-modal> -->
    <b-tab id="lead">
      <template #title>
        {{ "SUB-TASK" }}
        <b-badge v-if="todos.length > 0" style="margin-left: 0.5rem;">
          {{ todos.length }}
          <!-- {{ getTodolength(todos, item.item.id) }} -->
        </b-badge>
      </template>
      <!-- <b-card-text>Sub Task</b-card-text> -->
      <!-- <div style="width:100%"> -->
        <span v-if="todo.length === 0" class="d-none">{{ todos }}</span>

      <!-- <Todo /> -->
      <!-- <vue-perfect-scrollbar
        :settings="perfectScrollbarSettings"
        class="todo-task-list-wrapper list-group scroll-area"
        > -->
        <!-- {{ checkIfSelected() }} -->
          <div class="d-flex justify-content-between header ml-2 mt-1 mb-1">
            <h4>Sub-Task</h4>
            
            <div >
              <b-dropdown
              text="Status"
              class="mr-1"
              size="sm"
              variant="primary"
            >
              <b-dropdown-item>Pending</b-dropdown-item>
              <b-dropdown-item @click="updateTodoItem(todos.filter(e => e.checked === true))">Complete</b-dropdown-item>
    
            </b-dropdown>
            <b-button size="sm" v-if="todos.length > 0" variant="primary" style="
              width: 132px;
                
          " @click="()=>{
            openTemplateModal = true;
          }">
                Add to Template 
              </b-button>
              <!-- <b-button size="sm" v-if="todos.length === 0" variant="primary" style="
              
                
          " @click="()=>{
            openTemplateModal = true;
          }">
                Choose From Templates
              </b-button> -->
            </div>
          </div>
          <hr style="border-color:#F75949!important;">
          <!-- {{ checkedItemCount }} -->
  
      <table class="table">
        <thead>
          <tr>
            <th></th>
            <th>#</th>
            <th>Steps</th>
            <th>Actions</th>
          </tr>
        </thead>
        <draggable
          id="lead"
          v-model="todos"
          tag="tbody"
          handle=".draggable-task-handle"
          class="todo-task-list media-list"
        >
          <!-- <tbody >  -->
          <tr
            v-for=" (task , index) in todos"
            :key="index"
            class="draggable-task-handle"
            v-if="task.task_id === task_id"
          >
            <!-- <feather-icon
            icon="MoreVerticalIcon"
            class="draggable-task-handle d-inline"
            /> -->

            <!-- <div class="todo-title-wrapper draggable-task-handle d-inline">
              <div class="todo-title-area">
                <div class="title-wrapper d-flex"> -->
            <td style="width: 0%;">
              <b-form-checkbox
                style="color: black;"
               v-model="task.checked"
                
              />
            </td>

            <td>
              {{ index +1}}
            </td>
            <td>
              <span class="todo-title">{{ task.to_do }}</span>
            </td>
            <td>
              <!--  <b-button size="sm" @click="openModal('subtask-modal')" variant="success"> -->
              <span v-b-tooltip.hover.top="'Edit'">
                <feather-icon
                  size="21"
                  @click="openModal('subtask-modal', task)"
                  icon="EditIcon"
                >
                </feather-icon>
              </span>
              <!-- </b-button> -->
              &emsp13;
              <!--  <b-button size="sm" variant="danger"> -->
              <span v-b-tooltip.hover.top="'Delete'">
                <feather-icon
                  @click="deleteTodo(task.id)"
                  size="21"
                  icon="TrashIcon"
                >
                </feather-icon>
              </span>
              <!-- </b-button> -->
            </td>
            <!-- </div>
              </div>
           
            </div> -->
          </tr>
          <!-- <li
            v-for="task in todo"
            :key="task.id"
            class="todo-item"
            :class="{ 'completed': task.isCompleted }"
            @click="handleTaskClick(task)"
          >
            <feather-icon
              icon="MoreVerticalIcon"
              class="draggable-task-handle d-inline"
            />
            <div class="todo-title-wrapper">
              <div class="todo-title-area">
                <div class="title-wrapper">
                  <b-form-checkbox
                    :checked="task.isCompleted"
                    @click.native.stop
                    @change="updateTaskIsCompleted(task)"
                  />
                  <span class="todo-title">{{ task.to_do }}</span>
                </div>
              </div>
            
            </div>

          </li> -->
          <!-- </tbody> -->
        </draggable>
      </table>
      <div
        class="no-results text-center mt-1"
        :class="{ show: $store.state.appTodo.isLoading }"
      >
        <b-spinner v-if="$store.state.appTodo.isLoading" />
      </div>
      <!-- </vue-perfect-scrollbar> -->
      <validation-observer
        v-if="task.status_master.type != 'closed'"
        #default="{ handleSubmit }"
        ref="refFormObserver"
      >
        <b-form @submit.prevent="handleSubmit(addTodo(task_id))">
          <b-row class="mt-1">
            <b-col md="12" class="d-flex">
              <div style="width: 60%;">
                <validation-provider
                  #default="validationContext"
                  name="default_todo"
                  vid="default_todo"
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
                        v-model.trim="default_todo[0]" @input="checkValid"
                        placeholder="Enter sub-task steps and assign @someone"
                      />
                      <b-form-invalid-feedback v-if="errors.todo" class="d-block">
                        <!-- {{ validationContext.errors[0] }} -->
                        {{ errors.todo }}
                      </b-form-invalid-feedback>
                      <div class="text-right">
                        <b-button
                          size="sm"
                          variant="primary"
                          @click="repeatAgain"
                        >
                          Add more
                        </b-button>
                      </div>
                      <!-- <option v-if="search != null && search != ''" value="">hh</option> -->
                      <!-- <datalist  id="my-list-id"> -->

                      <!-- <option v-for="size in sizes">{{ size }}</option> -->
                      <!-- </datalist> -->
                      <template #no-result>
                        <div class="dim">
                          No result
                        </div>
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
                  </b-form-group>
                </validation-provider>
              </div>
              <div style="padding-left: 4rem; width: 50%;">
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
              </div>
              <!-- <b-col md="6">

                <b-form-group style="width:40%">
                 
                </b-form-group>
              </b-col> -->
            </b-col>
          </b-row>
          <b-row
            class="mt-1"
            v-for="(item, index) in todo_field"
            :id="item.id"
            :key="item.id"
          >
            <b-col md="12" class="d-flex">
              <!-- <div  ref="row" class="mb-1"
               > -->
              <div style="width: 60%;">
                <validation-provider
                  #default="validationContext"
                  name="additional_todo"
                  vid="additional_todo"
                  rules="required"
                >
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
                      placeholder="Enter sub-task steps and assign @someone"
                      v-model="additional_todo[index]"
                    />
                    <b-form-invalid-feedback class="d-block">
                      {{ validationContext.errors[0] }}
                    </b-form-invalid-feedback>
                    <div class="text-right">
                      <b-button
                        size="sm"
                        variant="outline-primary"
                        @click="removeItem(index)"
                      >
                        Remove
                      </b-button>
                    </div>
                    <template #no-result>
                      <div class="dim">
                        No result
                      </div>
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
              </div>
              <div style="padding-left: 4rem; width: 50%;">
                <div class="border-l" style="">
                  <div class="d-flex flex-column">
                    <div
                      class="d-flex justify-content-between align-items-center p-1 border-bottom-light bg-light"
                    >
                      <div>Attachment </div>
                      <div>
                        <input
                          type="file"
                          :id="'file_task1_' + item.id + '_' + index"
                          ref="file_task1"
                          style="display: none;"
                          @change="(event) => uploadFile2(event, item.id)" 
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
                          <b-dropdown-item @click="file_upload(item.id,index)"
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
                  <div
                    class="d-flex justify-content-between align-items-center p-1"
                  ><div v-if="fileNames[item.id] && fileLinks.length === 0 ">No file selected </div>
                    <div v-else-if="fileNames[item.id]">
                      <div v-for="(file, index) in fileLinks" :key="index" class="d-flex justify-content-between">
                        <span v-if="fileNames[item.id].name === file.fileName">
                          {{
                            file.fileName
                          }}
                          <feather-icon icon="XIcon" class="cursor-pointer"
                            @click="removes3Multiple(file.url, index,item.id)" />
                          </span>
                        </div>
                    </div>
                    <div v-else>No file selected</div>
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
              </div>
              <!-- </div> -->
            </b-col>
          </b-row>
          <div class="text-right mt-1">
            <b-button size="sm" variant="primary" type="submit">
              Add
            </b-button>
          </div>
        </b-form>
      </validation-observer>
      <!-- </div> -->
    </b-tab>
    <b-modal
      no-close-on-backdrop
      id="subtask-modal"
      ref="subtask-modal"
      size="lg"
      title="update checklist"
      hide-footer
    >
      <!-- <b-card-body> -->
      <b-row>
        <b-col md="12">
          <b-form-group
            class="text-truncate"
            label="Enter sub-task Steps and assign @someone"
          >
            <!-- </b-form-input> -->

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
                id="subtask_todo"
                v-model="todo_subtask"
                placeholder=""
              />
              <!-- <div></div> -->
              <!-- <option v-for="size in sizes">{{ size }}</option> -->
              <!-- </datalist> -->
              <template #no-result>
                <div class="dim">
                  No result
                </div>
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
            <div
              class="d-block invalid-feedback text-capitalize"
              v-if="this.todo_subtask == '' || this.todo_subtask == null"
            >
              the todo field is required
            </div>
          </b-form-group>
        </b-col>
      </b-row>
      <div class="text-right">
        <b-button
          size="sm"
          @click="$refs['subtask-modal'].hide()"
          variant="primary"
        >
          Cancel
        </b-button>
        <b-button
          size="sm"
          :disabled="todo_status"
          @click="updateTodo(todo_id_subtask)"
          class="ml-1"
          variant="primary"
        >
          Update
          <b-spinner small v-if="todo_status" />

          <!-- </b-spinner> -->
        </b-button>
      </div>
    </b-modal>
  </div>
</template>
<script>
import wordIcon from "../../../assets/images/logo/word-icon.png";
import excelIcon from "../../../assets/images/logo/excel-icon.png";
import slideIcon from "../../../assets/images/logo/slide-icon.png";
import browseIcon from "../../../assets/images/logo/browse-icon.png";
import {
  BDropdown,
  BDropdownItem,
  VBTooltip,
  BModal,
  BAvatar,
  BImg,
  BMediaAside,
  BButton,
  BCol,
  BRow,
  BTab,
  BFormInput,
  BFormInvalidFeedback,
  BBadge,
  BFormCheckbox,
  BSpinner,
  BForm,
  BFormGroup,
} from "bootstrap-vue";
import draggable from "vuedraggable";
import { Mentionable } from "vue-mention";
import { ValidationProvider, ValidationObserver } from "vee-validate";
import formValidation from "@/@core/comp-functions/forms/form-validation";

export default {
  components: {
    VBTooltip,
    BDropdown,
    BDropdownItem,
    BModal,
    BAvatar,
    BRow,
    BBadge,
    BCol,
    BTab,
    draggable,
    BFormCheckbox,
    BForm,
    BSpinner,
    BFormGroup,
    Mentionable,
    BButton,
    ValidationObserver,
    ValidationProvider,
    BFormInput,
    BImg,
    BMediaAside,
    BFormInvalidFeedback,
  },
  directives: {
    "b-tooltip": VBTooltip,
  },
  data() {
    return {  
      errors:{
        todo:null
      },
      countCheck:0,
      selectedItem: null,
      dropdownOption:[
        "List All", "My Todos", "Others"
      ],
      searchTerm: '',
      checkItemLength:0,
      userDataItem: JSON.parse(localStorage.getItem('userData')),
      checkedItemObject:[],
      checkedItems:[],
      temp_name:"",
      openTemplateModal:false,
      allFile:[],
      fileNames:[],
      fileArray:[],
      // subtask_mentions:[],
      file_name: null,
      browseIcon: browseIcon,
      slideIcon: slideIcon,
      wordIcon: wordIcon,
      excelIcon: excelIcon,
      file: null,
      previewImage: null,
      task_id_subtask: 0,
      todo_subtask: "",
      todo_id_subtask: 0,
      add_todo: false,
      todos: [],
      todo_length: 0,
      todo_field: [],
      nextTodoId: 2,
      default_todo: [],
      additional_todo: [],
      subtask_mentions: [],
      search: "",
      tasks:[],
    };
  },
  props: {
    task: {
      type: Object,
      required: true,
    },
    task_id: {
      type: Number,
      required: true,
    },
  },
  beforeUpdate(){
    
  },
  computed: {
    selectedOption() {
      return this.options.find(option => option.value === this.selectedItem) || { label: 'Select an option' }
    },
    filteredOptions() {
      return this.options.filter(option => option.label.toLowerCase().includes(this.searchTerm.toLowerCase()));
    },
    checkedItemCount() {

      this.countCheck =  this.checkedItems.filter(item => item === true).length;
      return
    },
    fileLinks() {
      let data = this.$store.state.attachments.links;
      return data
    },
    todo_status() {
      return this.$store.state.appTodo.isLoadingUpdate;
    },
    todo() {
      this.todos = []
      this.todos = this.$store.state.appTodo.all;
      this.todos.forEach(element => {
        element.checked = false
      });
      return this.todos//this.$store.state.appTodo.all;
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
    paginated_users_to_assign() {
      return this.users_to_assign.slice(
        this.offset_users,
        this.limit_users + this.offset_users
      );
    },
  },
  created() {
    this.$store.dispatch("subtaskTemplate/fetch")
    this.$store.dispatch("appTodo/fetch", this.task_id);
    if (this.$store.state.appTodo.all) {
      this.todos_length = this.$store.state.appTodo.all.length;
    }
  },
  mounted() {
    // Initialize checkedItems array with default checked state of tasks
    this.checkedItems = this.tasks.map(task => task.isCompleted);
    this.checkItemLength = 0;
    this.checkedItems.forEach((i)=>{
      if(i === true){
        this.checkItemLength  = this.checkItemLength+1;
      }
    })
  },
  methods: {
    checkValid(){
      if(this.default_todo[0]){
        this.errors.todo = ''
        return;
      }else{
        this.errors.todo = 'This field is required!'
        return;
      }
    },
    resetFormTemplateModal(){
      this.temp_name = null
    },
    checkIfSelected(){
      if(this.todos.filter(e => e.checked === true).length > 0){
        return true
      }else{
        return false;
      }
    },
    selectOption(option) {
      this.selectedItem = option.value;
    },
    updateTodoItem(data){
      // alert(data)
      console.log(data);
      let arr= [];
      data.forEach((e) => {
        arr.push({
          to_do:e.to_do,
          task_id:e.task_id,
          status:"done",
          id:e.id,
          user_ids:e.mention_users.map(e => e.id)

        });
        
      });
      console.log(arr);
      // return;
      this.updateTodoItems2(arr)

    },
      updateTodoItems2(arr) {
      for (let i = 0; i < arr.length; i++){
        const data = arr[i];
        console.log(data, "this is data");
         this.$store.dispatch("appTodo/update", { payload: data, id:data.id  }).then(() => {
       this.$store.dispatch("appTodo/fetch",this.task_id);

        });
      }
    },
    updateCheckedItems(index) {
      if(this.todos[index].checked === false){

        this.todos[index].checked = true;
      }else{
        this.todos[index].checked = false;

      }
      this.checkedItems[index] = !this.checkedItems[index];

      // Update corresponding task's isCompleted property
      if(this.checkedItems[index] === true){

        this.checkedItemObject[index] = this.todos[index];
      }else{
        this.checkedItemObject[index] = null;
        
      }
    },
    createTemplate() {
      var arr = [];
      // arr.push({
      //   steps_body: this.tempFields[0].title,
      //   attachment_url:null,
      // });
      console.log(this.checkedItemObject, "checkedItemObject")
      this.todos.filter(e => e.checked === true).forEach((element) => {
        arr.push({
          steps_body: element.to_do,
          attachment_url:null,
        });
      });
      // console.log(arr[0].steps_body)
      // this.templateFields.push(this.tempFields[0]);
      const data = {
        name: this.temp_name,
        subtaskBody: arr,
      };

      this.$store.dispatch("subtaskTemplate/store", data).then(() => {
        this.$refs["template-modal"].hide();
        this.$toast.success("Sub-Task Template Created Successfully!", {
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
        this.$store.dispatch("subtaskTemplate/fetch");
      });
    },
    file_upload(id,i){
      console.log(id, "id from file_upload..............")
      document.getElementById("file_task1_"+id+"_"+i).click();

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
    removes3Multiple(file, i, id) {
      console.log('bbbb')
      var data = {
        attach_url: file ?? "null",
      };
      this.$store.dispatch('attachments/remove', { data: data }).then(() => {

        this.$store.state.attachments.links.splice(i, 1)
        const index = this.allFile.findIndex((file) => file.name === this.fileNames[id].name);
        if (index !== -1) {
          this.allFile.splice(index, 1);
        }
        this.fileNames[id]=null;

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
    async uploadFile2(e,id) {
      console.log("this is iiiiiiiiiiiiiid", id);
      let image = e.target.files;
      let image_name = []
      const filePathsPromises = [];
    image.forEach(file => {
      filePathsPromises.push(this.base64(file));
      image_name.push(file.name)
  
    });
        const filePaths = await Promise.all(filePathsPromises,image_name);
        const mappedFiles = filePaths.map((base64File,image_name) => ({
        file: base64File,
        name:image[image_name].name,
        type:'attachmentsType'
        }));
        
        if(this.fileNames[id]){
        let index = this.fileLinks.findIndex((e)=>e.fileName === this.fileNames[id].name);
        this.fileLinks.splice(index,1);
        let index2 = this.allFile.findIndex((e)=>e.name === this.fileNames[id].name);
        this.allFile.splice(index2,1);
       }

        let filesOject = mappedFiles[0];
        this.fileNames[id] = filesOject;

        
        this.allFile.push(this.fileNames[id])

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

    uploadFileS3(file) {
      let data = {
        attach: file ? file : "null",
      };
      this.$store.dispatch('attachments/add', { data: data }).then(() => {

        resolve();

      }).catch(() => {


      })
    },

    openModal(modal, task) {
      this.$refs[modal].show();
      if (task) {
        this.todo_subtask = task.to_do;
        this.todo_id_subtask = task.id;
        this.task_id_subtask = task.task_id;
        // if(document.getElementById('subtask_todo'))
        // document.getElementById('subtask_todo').value = task.to_do
      }
    },
    SearchChange(assignee) {
      // alert(assignee)
      // console.log();
      // console.log(this.search.split('@'));
      if (assignee.includes("@")) {
        this.search = assignee.split("@")[1];
      } else if (!assignee.includes("@")) {
      } else {
        this.search = "";
      }
    },
    repeatAgain() {
      (this.add_todo = true),
        this.todo_field.push({
          id: (this.nextTodoId += 1),
        });
    },
    removeItem(index) {
      this.todo_field.splice(index, 1);
      this.additional_todo.splice(index, 1);

      // this.trTrimHeight(this.$refs.row[0].offsetHeight)
    },
    deleteTodo(todo_id) {
      // const data = {
      //   to_do: this.todo_subtask,
      //   task_id: this.task_id_subtask,
      //   user_ids: this.subtask_mentions,
      //   to_do_id: todo_id
      // }
      console.log(todo_id);
      if (confirm("Are you sure do you want to delete this item?")) {
        this.$store
          .dispatch(
            "appTodo/destroy",

            todo_id
          )
          .then(() => {
            this.$refs["subtask-modal"].hide();
            this.$store.dispatch("appTodo/fetch", this.task_id).then(() => {});
          });
      }
    },
    updateTodo(todo_id) {
      if (this.todo_subtask == "" || this.todo_subtask == null) {
        return "Invalid";
      } else {
        // const data = {
        //   to_do: this.todo_subtask,
        //   task_id: this.task_id_subtask,
        //   user_ids: this.subtask_mentions,
        //   to_do_id: todo_id
        // }
        // console.log(data);
        this.$store
          .dispatch("appTodo/update", {
            payload: {
              to_do: this.todo_subtask,
              task_id: this.task_id_subtask,
              user_ids: this.subtask_mentions,
              status: "not-done",
            },
            id: todo_id,
          })
          .then(() => {
            this.$refs["subtask-modal"].hide();
            this.$store.dispatch("appTodo/fetch", this.task_id).then(() => {});
          });
      }
    },
    addTodo(id) {
      // this.inputs.forEach(e => {
      //   // e.subtask_assignee
      //   if(e.subtask_assignee == '' || e.subtask_assignee == null){
      //     return ;
      //   }
      if (this.default_todo.length === 0) {
        this.errors.todo = 'This field is required'

        return;
      }
      if(this.default_todo[0] == null || this.default_todo[0] === ''){
        this.errors.todo = 'This field is required'
        return;
      }
      // });
      var c_todo = [];
      if (this.default_todo.length > 0) {
        this.default_todo.forEach((element) => {
          c_todo.push(element);
        });
      }
      if (this.additional_todo.length > 0) {
        this.additional_todo.forEach((element) => {
          c_todo.push(element);
        });
      }
      let to_dos = []
      c_todo.forEach(element => {
        to_dos.push({
          to_do:element,
          task_id:id,
          user_ids:this.subtask_mentions
        })
      });
      const data = to_dos
      this.$store.dispatch("appTodo/store", {
        to_dos:to_dos
      }).then(() => {
        this.$store.dispatch("appTodo/fetch", this.task_id);
      }).then(()=>{
        this.file_name = null;
        this.fileNames = [];
        // this.fileLinks =[];
        this.subtask_mentions = []
        this.allFile = [];
        this.checkedItemObject=[];
        this.checkedItems=[];
      });
      if (this.additional_todo.length > 1) {
        while (this.additional_todo.length > 0) {
          this.additional_todo.pop();
        }
      }
      if (this.default_todo.length) {
        this.default_todo.pop();
      }
      this.todo_field=[] 
      this.file_name = null;
        this.fileNames = [];
        // this.fileLinks =[];
        this.allFile = [];
        this.$store.state.attachments.links = [];
      
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
  },
};
</script>

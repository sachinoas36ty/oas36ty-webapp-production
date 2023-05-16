<template>
    <div>
        <div class="mt-2 mb-2">

            <!-- <b-row> -->
            <!-- <b-col  md="6" class="d-flex align-items-center justify-content-start mb-1 mb-md-0" > -->
            <!-- <b-col > -->
            <!-- <div class="d-flex align-items-center justify-content-end"> -->
            <div class="btn-filter d-flex justify-content-between align-items-center">
                <span>

                    EMAIL TEMPLATES
                </span>
                &emsp;
                 <b-button size="sm"   variant="primary" @click="openModal('template-modal', 'add', 0)">
                    <span class="text-nowrap"  >
                        Add

                    </span>
                </b-button>
                <!-- </div> -->
            </div>
            <hr style="border-color: #F75949;">
            <!-- </b-col> -->
            <!-- </b-col> -->
            <!-- </b-row> -->


        </div>
        <b-card no-body>

            <b-table :show-empty="items.length === 0" id="proposal-templates-table" selectable responsive class="mb-0" @row-clicked="onRowClicked"
                :items="items" :fields="TemplateTable">

                <template #row-details="item">
                    <b-card no-body class="ml-2 mt-2 mr-2 mb-0">

                        <div class="d-flex justify-content-between"
                            style="text-transform: uppercase; font-weight: 500;">
                          <span style="color: #000;">
                           
                            {{ item.item.name }} -
                          Template Details
                        </span>
                            <div>
                                <feather-icon style="margin-right: 0.5rem;" @click="() => {
                                    temp_name = item.item.name
                                    // if(item.item.proposal_template_section.length === 1){
                                
                                
                                    // templateFields[0].title = item.item.proposal_template_section[0].title
                                    templateFields.description = item.item.body//proposal_template_section[0].description
                                    // if (item.item.proposal_template_section.length > 1) {
                                
                                
                                    //     item.item.proposal_template_section.forEach(element => {
                                    //         if (element.title != templateFields[0].title) {
                                    //             templateFields.push({
                                    //                 title: element.title,
                                    //                 description: element.description
                                    //             })
                                    //         }
                                    //     });
                                    // }
                                
                                
                                    // }
                                
                                    openModal('template-modal', 'edit', item.item.id)
                                
                                }" icon="EditIcon" size="20" />
                                <feather-icon @click="destroyItem(item.item.id)" icon="TrashIcon" size="20"/>
                            </div>
                        </div>
                        <hr style="border-color:#F75949">
                        <div v-html="item.item.body">
                        </div>
                        <!-- <b-row v-for="p in item.item.proposal_template_section">
                            <b-container>
                                <b-row>
                                    <b-col md="4">
                                        <span style="font-weight:bolder;">
                                            Title :
                                        </span>

                                    </b-col>
                                    <b-col md="8">
                                        <span>
                                            {{ p.title }}
                                        </span>

                                    </b-col>
                                </b-row>
                                <b-row class="mt-1">
                                    <b-col md="4" class="">
                                        <span style="width: 13%; font-weight:bolder;">
                                            Description :
                                        </span>

                                    </b-col>
                                    <b-col md="8">
                                        <span v-html="p.description">

                                        </span>

                                    </b-col>
                                </b-row>
                            </b-container>
                        </b-row> -->
                    </b-card>

                </template>
                <template #cell(temp_name)="{ item }">
                    {{ item.name }}
                </template>
            </b-table>
        </b-card>
        <b-modal no-close-on-backdrop id="template-modal" ref="template-modal" size="md" :title="modalTitle"
            hide-footer>
            <template #modal-header>
                <h5 class="modal-title">{{ modalTitle }}</h5>
                <!-- <button type="button" aria-label="Close" class="close">x</button> -->
                <feather-icon icon="XIcon" size="24" class="cursor-pointer" @click="() => {
                    remove_all_fields()
                    $refs['template-modal'].hide()
                }" />

            </template>
            <!-- <b-form-input  /> -->
            <validation-observer #default="{ handleSubmit }" ref="refFormObserver">

                <b-form @submit.prevent="handleSubmit(
                modalTitle == 'add email template' ? createTemplate : updateTemplate)">

                    <b-row>
                        <b-col md="12">
                            <validation-provider #default="validationContext" name="temp_name" vid="template"
                                rules="required">

                                <b-form-group label="Template Name">

                                    <b-form-input v-model="temp_name" 
                                        id="template" placeholder="Template Name" />
                                    <b-form-invalid-feedback class="d-block">
                                        {{ validationContext.errors[0] }}
                                    </b-form-invalid-feedback>
                                    <!-- </b-form-input> -->
                                </b-form-group>
                            </validation-provider>
                        </b-col>
                    </b-row>
                    <!-- <b-row>
                        <b-col md="12">
                            <validation-provider #default="validationContext" name="temp_title" vid="title"
                                rules="required">

                                <b-form-group label="Title">

                                    <b-form-input v-model="templateFields[0].title" id="title"
                                          placeholder="Enter Title" />
                                    <b-form-invalid-feedback class="d-block">
                                        {{ validationContext.errors[0] }}
                                    </b-form-invalid-feedback>

                                </b-form-group>
                            </validation-provider>
                        </b-col>
                        <b-col md="12">
                            <b-form-group label="Description">

                                <quill-editor v-model="templateFields[0].description"
                                    :options="editorOption"></quill-editor>
                            </b-form-group>
                            <div class="text-right">
                                 <b-button size="sm"    @click="addTemplate()" class="cursor-pointer" variant="outline-primary">
                                    Add more
                                </b-button>
                            </div>
                        </b-col>
                    </b-row> -->
                    <b-row>

                        <b-col md="12">
                            <b-form-group label="Description">

                                <quill-editor v-model="templateFields.description"
                                    :options="editorOption"></quill-editor>
                            </b-form-group>
                            <!-- <div class="text-right">
                                 <b-button size="sm"   class="mr-1" @click="removeTemplate(index)"
                                    variant="outline-primary">
                                    Remove
                                </b-button>
                                 <b-button size="sm"   @click="addTemplate()" variant="outline-primary">
                                    Add more
                                </b-button>
                            </div> -->
                        </b-col>
                    </b-row>


                    <!-- <b-row v-for="(items, index) in templateFields" :key="items.template">
                        <b-col md="12">
                            <validation-provider #default="validationContext" name="temp_title" :vid="'title' + index"
                                rules="required">

                                <b-form-group label="Title">

                                    <b-form-input v-model="templateFields[index].title" :id="'title' + index"
                                          placeholder="Enter Title" />
                                    <b-form-invalid-feedback class="d-block">
                                        {{ validationContext.errors[0] }}
                                    </b-form-invalid-feedback>

                                </b-form-group>
                            </validation-provider>
                        </b-col>
                        <b-col md="12">
                            <b-form-group label="Description">

                                <quill-editor v-model="templateFields[index].description"
                                    :options="editorOption"></quill-editor>
                            </b-form-group>
                            <div class="text-right">
                                 <b-button size="sm"   class="mr-1" @click="removeTemplate(index)"
                                    variant="outline-primary">
                                    Remove
                                </b-button>
                                 <b-button size="sm"   @click="addTemplate()" variant="outline-primary">
                                    Add more
                                </b-button>
                            </div>
                        </b-col>
                    </b-row> -->
                    <div class="text-right mt-3">
                         <b-button size="sm" class="mr-1" type="reset" @click="() => {
                            remove_all_fields()
                            $refs['template-modal'].hide()
                        }" variant="primary">
                            Cancel
                        </b-button>
                         <b-button size="sm" :disabled="isLoading" type="submit " variant="primary">
                            {{ modalTitle == 'add email template' ? 'Create' : 'Update'}}
                            <b-spinner style="margin-left: 0.5rem;" small v-if="isLoading" />
                        </b-button>
                    </div>
                </b-form>
            </validation-observer>
        </b-modal>
    </div>
</template>
<script>
import { BFormInvalidFeedback, BContainer, BSpinner, BRow, BTable, BCard, BCol, BButton, BModal, BFormInput, BFormGroup, BForm, } from 'bootstrap-vue'
import { quillEditor } from 'vue-quill-editor'
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import formValidation from '@/@core/comp-functions/forms/form-validation'
import { ElementType } from 'htmlparser2'

export default {
    name: 'Template',
    components: {
        BRow, BCol, BButton, BSpinner, BTable, BCard, ValidationObserver, BFormInvalidFeedback,
        BModal, BFormInput, BFormGroup, quillEditor, BForm, ValidationProvider, BContainer,
    },
    data() {
        return {
            TemplateTable: [{ key: 'id', label: '#', thClass: 'width-7' }, { key: 'temp_name', label: 'template name' }],
            editorOption: {
                modules: {
                    toolbar: [['bold', 'italic', 'underline', 'strike', { 'script': 'sub' }, { 'script': 'super' }], ['clean'], [{ 'color': [] }, { 'background': [] }], [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'align': [] }], ['image'], [{ 'header': [] }, { 'font': [] }, { 'size': [] }], ['link']],
                },
                placeholder: 'Message',
            },
            edit_temp_id: 0,
            temp_name: '',
            templateFields:
            {

                // title: null,
                description: null
            }
            ,
            // templateFields: [],
            modalTitle: ''

        }
    },
    computed: {
        items() {


            return this.$store.state.emailTemplate.all;

        },
        isLoading() {


            return this.$store.state.proposals.isLoading;

        }
    },
    created() {
        this.$store.dispatch('emailTemplate/fetch')

    },
    methods: {
        destroyItem(id) {
      // eslint-disable-next-line no-restricted-globals
      if (confirm('Are you sure do you want to delete this item?')) {
        
          this.$store.dispatch('emailTemplate/destroy', id).then(() => {
            this.$store.dispatch('emailTemplate/fetch')
       
          })
      }
    },
        createTemplate() {
            // var arr = [];
            // arr.push(this.templateFields[0])
            // this.templateFields.forEach(element => {
            //     arr.push(element)
            // });
            // this.templateFields.push(this.templateFields[0]);
            const data = {
                name: this.temp_name,
                // templateSection: arr
                body: this.templateFields.description
            };

            this.$store.dispatch('emailTemplate/store', data).then(() => {
                this.$refs['template-modal'].hide()
                this.$store.dispatch('emailTemplate/fetch')
                this.remove_all_fields()
            })
        },
        updateTemplate() {
            // alert(this.edit_temp_id)
            // var arr = [];
            // arr.push(this.templateFields[0])
            // this.templateFields.forEach(element => {
            //     arr.push(element)
            // });
            // this.templateFields.push(this.templateFields[0]);
            const data = {
                name: this.temp_name,
                body: this.templateFields.description
            };
            this.$store.dispatch('emailTemplate/update', {
                payload:


                    data
                ,
                id: this.edit_temp_id
            }).then(() => {
                this.$refs['template-modal'].hide()
                this.$store.dispatch('emailTemplate/fetch')
                this.remove_all_fields()
            })
        },
        remove_all_fields() {


            // this.templateFields[0].title = null
            this.templateFields.description = null
            this.temp_name = null


        },

        openModal(name, key, edit_id) {
            // var str = ''

            // if(key.includes('_')){
            //     str  = key.split('_')[0]
            // }
            if (key == 'add') {
                this.modalTitle = 'add email template'
                this.$refs[name].show()
            }
            if (key == 'edit') {
                if (edit_id != 0) {
                    this.modalTitle = 'edit email template'

                    this.edit_temp_id = edit_id
                }
                this.$refs[name].show()
            }
        },
        onRowClicked(item) {
            const { detailsRow } = this
            if (detailsRow && detailsRow !== item) {
                detailsRow._showDetails = false;
            }

            this.$set(item, '_showDetails', !item._showDetails
            )
            this.detailsRow = item;
        }
    },
    setup() {
        const { refFormObserver, getValidationState, resetForm } =
            formValidation(resetForm);
        return {
            refFormObserver,
            getValidationState,
            resetForm,
            formValidation,
        }
    }


}
</script>
<style lang="scss">
@import '@core/scss/vue/libs/quill.scss';
</style>
<style>
#template-modal .modal-dialog {
    max-width: 880px;
}

.ql-toolbar.ql-snow+.ql-container.ql-snow {
    height: 10rem !important;
}
</style>
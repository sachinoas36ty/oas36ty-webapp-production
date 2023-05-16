<template>
    <b-container fluid="sm">
        {{ updateCategory2 }}
        <div v-if="receivedData.length === 0" class="pb-3 text-center">
            There are no records to show
        </div>
        <validation-observer v-if="receivedData.length > 0" #default="{ handleSubmit }" ref="refFormObserver">
            <b-form @submit.prevent="handleSubmit(updateCategory)" >


                <!-- {{ updateCategory2() }} -->
                <b-row v-for="items in receivedData.slice().reverse()" :key="String(items.id)" >
                    <!-- {{ fade(items) }} -->
                    <!-- {{ items.type }} -->
                    <b-col md="1">
                        <div style="margin-top: 35px;">
                            <label class="switch">
                                <input  type="checkbox" v-model="items.switchOption" @click="{
                   

                                        fadein(items, $event)
                                    
                                }"/>
                                
                               
                                <span class="slider round w-75" ></span>
                            </label>
                            
                        </div>
                    </b-col>
                    <b-col md="3" :class="{ 'fade-in': items.switchOption == false }">
                        <div>

                            <b-form-group label="Category Name">
                                <b-form-input class="" :disabled="items.switchOption == false" :id="'default_date' + items.id"
                                    v-model="items.categoryName">
                                </b-form-input>
                            </b-form-group>
                        </div>
                    </b-col>
                    <b-col md="3" :class="{ 'fade-in': items.switchOption == false }">
                        <div>

                            <b-form-group label="Default Employees">
                                <v-select :disabled="items.switchOption == false" v-model="items.defaultEmployees" multiple
                                    :close-on-select="false" :options="users" label="name"></v-select>
                            </b-form-group>
                        </div>
                    </b-col>
                    <b-col md="3" :class="{ 'fade-in': items.switchOption == false }">
                        <div>

                            <b-form-group label="Default checklist Templates">
                                <v-select :disabled="items.switchOption == false" v-model="items.defaultTemplates"
                                     :options="templates" label="name"></v-select>
                            </b-form-group>
                        </div>
                    </b-col>
                    <b-col md="2" :class="{ 'fade-in': items.switchOption == false }">
                        <div>

                            <b-form-group label="Default Due Date">
                                <b-form-input type="number" class="" :disabled="items.switchOption == false"
                                    :id="'default_date' + items.id" v-model="items.defaultDueDate">
                                </b-form-input>
                            </b-form-group>
                        </div>
                    </b-col>
                </b-row>

                <div class="footer mt-1 text-right">
                    <b-button size="sm" title="Click to save the current changes" type="submit" variant="primary">
                        Save Changes
                    </b-button>
                </div>
            </b-form>
        </validation-observer>


        
    </b-container>
</template>
    
<script>
import formValidation from '@/@core/comp-functions/forms/form-validation';
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import vSelect from "vue-select";
import { BRow, BCard, BCol, BFormInput, BFormGroup, BForm, BButton, BContainer } from "bootstrap-vue";
import { exit } from 'process';

export default {
    name: 'CategoriesComp',
    data() {
        return {
            receivedData: [],
            checked: 0,
            defaultDueDate: '2',
            // disabled:0,
            employee: ['Centrik Banglore Office', 'Anuj Chauhan'],

            categoryName: 'Centrik',
            defaultEmployees: null,
            options: [
                { id: 1, name: 'Option 1' },
                { id: 2, name: 'Option 2' },
                { id: 3, name: 'Option 3' },
            ],

        }

    },
    beforeUpdate() {
        // this.fade()
    },
    updated() {
        // this.fade()
    },
    methods: {
        fadein(items, e) {
            // if(items.type === 'dont_delete' && items.switchOption === true){
            //     alert('Category is already in use')

            // }
            if(items.type === 'dont_delete'){
                
            }else{
                if (items.text == 'ToggleLeftIcon') {
                    items.switchOption = true
                    items.text = 'ToggleRightIcon'
                } else {
                    items.switchOption = false
                    
                    items.text = 'ToggleLeftIcon'
                }
            }
           
        },
        fade() {
            // document.getElementById("cat_name").disabled = true; 
            // let input = document.querySelector("#cat_name");
            this.updateCategory2.forEach(items => {

                if(items.type === "dont_delete"){
                    items.switchOption = true
                }

            });

            // }
        },
        updateCategory() {
           
            let data = []
            this.receivedData.forEach(element => {
                data.push({
                    id:element.id,
                    status: element.switchOption == true? 'active' :'inactive',
                    name:element.categoryName,
                    due_date:element.defaultDueDate,
                    users:element.defaultEmployees,
                    templates:element.defaultTemplates,
                })
            });
            console.log(data);
            this.$store
        .dispatch("categories/update", {payload:data}).then(()=>{
             this.$toast.success('Categories Updated!', {
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
        })

        },

        // toggleText: 'ToggleLeftIcon',
        // switchOption: false,


        fetchAll() {
            this.$store.dispatch("categories/fetch");
        },
    },
    components: {
        vSelect,
        BFormInput, BCard,
        BFormGroup, BButton,
        BForm, BRow, BCol, BContainer, ValidationObserver


    },
    setup() {
        const { refFormObserver, getValidationState } =
            formValidation();
        return {
            refFormObserver,
            getValidationState,
            formValidation
        }
    },

    created() {
        // document.getElementById("cat_name").disabled = true; 

        // this.fetchAll()
       // console.log(this.$store.state.categories.all)
    },
    computed: {
        users() {
            return this.$store.state.users.all
        },
        templates(){
            return this.$store.state.subtaskTemplate.all;
        },
        updateCategory2() {
            this.receivedData = []
            let arr2 = []
            var arr = this.$store.state.categories.all.reverse();
            arr.forEach(element => {
                this.receivedData.push({
                    //checked:0,

                    switchOption: element.status == 'active' ? true : false,
                    switchOption2: "true",
                    text: 'ToggleLeftIcon',
                    id: element.id,
                    defaultDueDate: element.due_date,
                    type: element.type,
                    categoryName: element.name,
                    defaultEmployees:element.users,
                    defaultTemplates: element.subtask_template,
                })
            })
            // return arr2;
        },
        isLoading() {
            return this.$store.state.categories.isLoading;
        },
        successMessage() {
            return this.$store.state.categories.successMessage;
        },
        totalCount() {
            return this.$store.state.categories.all.length;

        },
        errorMessage() {
            return this.$store.state.categories.errorMessage;
        },
        errors() {
            return JSON.parse(JSON.stringify(this.$store.state.categories.errors));
        },
        itemss() {

            let data = this.$store.state.categories.all;
            data.forEach((x) => {
                let assignee = x.users.filter((y, index) => {
                    return index === x.users.length - 1;
                })
                x.default_assignee = assignee[0].name
            })
            return data;
        },
    }

}
</script>
    
<style lang="scss" scoped>
//@import 'src/@core/scss/vue/libs/vue-slider.scss';
@import 'src/@core/scss/vue/libs/vue-select.scss';
//@import 'src/@core/scss/base/bootstrap-extended/buttons.scss';
</style>


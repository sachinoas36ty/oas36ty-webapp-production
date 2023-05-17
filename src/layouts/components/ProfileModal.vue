//profile modal

<template>
  <!-- select 2 demo -->
  
  <div>

    <b-modal no-close-on-backdrop id="profile-modal" ref="profile-modal" size="md" title="Profile" hide-footer>

      <div class="" style="border:1px solid #f3416740;
     background-color:#f6f6f9;
     padding-bottom: 2rem;
     ">


        <b-row>
          <b-col class="d-flex justify-content-center align-items-center" md="4">
            <div class="d-flex flex-column justify-content-center align-items-center text-center">

              <!-- <b-avatar style="width: 68%;height:81%" :src="image" class=" mt-2">

              </b-avatar><br> -->
              <div style="width: 150px; height: 150px; border-radius: 50%; overflow: hidden;">
                <img style="width: 100%; height: 100%;" :src="getImage() || 'https://ui-avatars.com/api/?name=' + name"
                  alt="" />
                <!-- <img style="width: 100%; height: 100%;" :src="'https://ui-avatars.com/api/?name='+username" alt=""/> -->


              </div>
              <span class="text-capitalize text-bolder">

                {{ name }}
              </span>
              <!-- <b-spinner v-if="loading" small /> -->
            </div>

          </b-col>
          <b-col md="8" style="line-height: 3;">
            <b-row class="ml-1 mt-2">
              <!-- <hr style="color: black;"> -->
              <b-col md="4" class="text-bolder">
                Location
               
              </b-col>
              <b-col md="8">
                {{ location2 }}
              </b-col>

            </b-row>
            <b-row class="ml-1 ">
              <b-col md="4" class="text-bolder">
                Email
              </b-col>
              <b-col md="8">
                {{ user_email }}
              </b-col>
            </b-row>
            <b-row class="ml-1 ">
              <b-col md="4" class="text-bolder">
                Phone
              </b-col>
              <b-col md="8">
                {{ phone }}
              </b-col>
            </b-row>
            <b-row class="ml-1 ">
              <b-col md="4" class="text-bolder">
                Category Admin
              </b-col>
              <b-col md="8">
                <!-- Location -->
                <!-- <input
      id="pac-input"
      class="controls"
      refs="origin"
      type="text"
      v-model="location"
      placeholder="Search Box"
    />
    <ul>
      <li v-for="(result, i) in searchResults" :key="i">
        {{ result }} 
      </li>
    </ul>
    <div id="map"></div> -->

              </b-col>
            </b-row>
            <b-row class="ml-1">
              <b-col md="4" class="text-bolder">
                Domain Emails
              </b-col>
              <b-col md="8">
                {{ domain_email }}
                <span class="text-muted">

                  (Default)
                </span>
              </b-col>

            </b-row>

          </b-col>
        </b-row>
        <!-- <div class="text-center" style="padding-bottom:2rem;width:40%">

        <b-avatar style="width: 54%;height:81%" :src="image" class=" mt-2">

        </b-avatar><br>
       <span class="text-capitalize text-bolder">

         {{ username }}
        </span>
      </div>
      <div>
        <b-row>
          <span>
            Location
          </span>
          <span>
            Location
          </span>
        </b-row>
        <b-row>
          <span>
            Email
          </span>
          <span>
            Location
          </span>
        </b-row>
        <b-row>
          <span>
            Phone
          </span>
          <span>
            Location
          </span>
        </b-row>
        <b-row>
          <span>
            Category Admin
          </span>
          <span>
            Location
          </span>
        </b-row>
        <b-row>
          <span>
            Domain Details
          </span>
          <span>
            Location
          </span>
        </b-row>
      </div> -->
      </div>
      <div class=" mt-2">
        <div class=" text-right" style="float: right;">
          <b-button size="sm" @click="() => {
            $refs['profile-modal'].hide()
          }" class="text-capitalize" variant="primary">
            close
          </b-button>
         
          
        </div>
        <div class="text-left inline-grid">

          <!--  <b-button size="sm" class="text-capitalize" variant="primary">
        change photo
      </b-button> -->
          <b-dropdown id="file_drop" class="" size="sm" variant="primary">
            <template #button-content>
              <span class="text-capitalize">

                change Photo
              </span>
            </template>
            <div class="mx-1 border-l">

              <!-- <b-form @submit.prevent="handleSubmit(UpdateProfile)"> -->

              <div class="d-flex flex-column">
                <div class="d-flex justify-content-between align-items-center p-1 border-bottom-light bg-light">
                  <div>Upload Photo</div>
                  <div>
                    <input type="file" ref="file" @change="UpdateProfile" style="display: none" />
                    <b-button size="sm" variant="primary" @click="$refs.file.click()">Choose File</b-button>
                  </div>
                </div>
                <!-- </b-form> -->
              </div>
              <div class="d-flex justify-content-between align-items-center p-1">
                <div v-if="file_name.length > 0">{{ file_name }}</div>
                <div v-else>No file selected</div>
                <b-media-aside class="mr-0">
                  <b-img v-if="file !== null && previewImage != null" id="ref_image_base_64" ref="refPreviewEl"
                    v-model="image" :src="previewImage" height="40" width="40" rounded="circle"
                    class=" border border-light" />

                  
                </b-media-aside>
              </div>
            </div>

            <!-- <b-dropdown-item>

        </b-dropdown-item> -->
          </b-dropdown>
          <b-button size="sm" @click="() => {
            $refs['change-pass-modal'].show()
          }" class="spacing text-capitalize" variant="primary">
            change password
          </b-button>
          <b-button size="sm" @click="() => {
            $refs['email-sign-modal'].show()
          }" class="spacing text-capitalize" variant="primary">
            email signatures
          </b-button>
          <b-button size="sm" @click="() => {
            $store.state.users.all.forEach(element => {
              if (element.id === loggedId) {
                profileData.name = element.name;
                profileData.location = element.location;
                profileData.phone = element.phone;

              }
            });
            $refs['update-profile-data-modal'].show()
          }" class="spacing text-capitalize" variant="primary">
            edit details
          </b-button>
        </div>


      </div>
    </b-modal>
    
    <b-modal no-close-on-backdrop id="change-pass-modal" ref="change-pass-modal" size="md" title="update password"
      hide-footer>
      <validation-observer #default="{ handleSubmit }" ref="refFormObserver">
        <b-form class="mt-2" @submit.prevent="handleSubmit(updatePassword)">

          <b-row>

            <b-col md="4">
              <validation-provider #default="validationContext" name="old_pass" vid="old_pass" rules="required|password">
                <b-form-group>
                  <b-form-input @input="checkValid"   type="password" id="old_pass"
                    v-model="old_pass" placeholder="Current Password" />
                   
                  <b-form-invalid-feedback class="d-block" v-if="validationContext.errors.length > 0">
                    {{ validationContext.errors[0] }}
                  </b-form-invalid-feedback>

                    
                  <b-form-invalid-feedback class="d-block" v-else-if="errors_pass">
                    {{ errors_pass.pass}}
                  </b-form-invalid-feedback>



                 
                  
                  
                </b-form-group>
              </validation-provider>
              
              
            </b-col>

            <b-col md="4">
              <validation-provider #default="validationContext" name="new_pass" vid="new_pass" rules="required|password">
                <b-form-group>
                  <b-form-input   type="password" id="new_pass"
                    v-model="new_pass" placeholder="New Password" />
                  <b-form-invalid-feedback class="d-block">
                    {{ validationContext.errors[0] }}
                  </b-form-invalid-feedback>
                </b-form-group>
              </validation-provider>
            </b-col>

            <b-col md="4">
              <validation-provider #default="validationContext" name="c_new_pass" vid="c_new_pass"
                rules="required|confirmed:new_pass|password">
                <b-form-group>
                  <b-form-input   type="password" id="c_new_pass"
                    v-model="c_new_pass" placeholder="Confirm New Password" />
                  <b-form-invalid-feedback class="d-block">
                    {{ validationContext.errors[0] }}
                  </b-form-invalid-feedback>
                </b-form-group>
              </validation-provider>
            </b-col>
          </b-row>
          <div class="mt-1 text-right">

            <b-button size="sm" class="mr-1" @click="() => {
              resetPassword()
              $refs['change-pass-modal'].hide()
            }" type="reset" variant="primary">
              Cancel
            </b-button>
            <b-button size="sm" type="submit" variant="primary">
              Update
            </b-button>
          </div>

        </b-form>
      </validation-observer>

    </b-modal>
    <b-modal no-close-on-backdrop id="update-profile-data-modal" ref="update-profile-data-modal" size="md"
      title="update profile" hide-footer>
      <validation-observer #default="{ handleSubmit }" ref="refFormObserver">
        <b-form class="mt-2" @submit.prevent="handleSubmit(updateProfileData)">

          <b-row>

            <b-col md="4">
              <validation-provider #default="validationContext" name="name" vid="name" rules="required">
                <b-form-group>
                  <b-form-input   id="name" v-model="profileData.name"
                    placeholder="Name" />
                  <b-form-invalid-feedback>
                    {{ validationContext.errors[0] }}
                  </b-form-invalid-feedback>
                </b-form-group>
              </validation-provider>
            </b-col>

            <b-col md="4">
              <validation-provider #default="validationContext" name="location" vid="location" rules="required">
                <b-form-group>
                  <b-form-input   id="location"
                    v-model="profileData.location" placeholder="Location" />
                  <b-form-invalid-feedback>
                    {{ validationContext.errors[0] }}
                  </b-form-invalid-feedback>
                </b-form-group>
              </validation-provider>
            </b-col>

            <b-col md="4">
              <validation-provider #default="validationContext" name="phone" vid="phone" rules="required|digits:10">
                <b-form-group>
                  <b-form-input type="number" @keypress="isNumber($event)"  
                    id="phone" v-model.number="profileData.phone" placeholder="Phone" />
                  <b-form-invalid-feedback>
                    {{ validationContext.errors[0] }}
                  </b-form-invalid-feedback>
                </b-form-group>
              </validation-provider>
            </b-col>
          </b-row>
          <div class="mt-1 text-right">

            <b-button size="sm" class="mr-1" @click="() => {
              $refs['update-profile-data-modal'].hide()
            }" type="reset" variant="primary">
              Cancel
            </b-button>
            <b-button size="sm" :disabled="$store.state.users.profileLoading" type="submit" variant="primary">
              Update
              <b-spinner class="ml-1" small v-if="$store.state.users.profileLoading">

              </b-spinner>
            </b-button>
          </div>

        </b-form>
      </validation-observer>

    </b-modal>
    <b-modal no-close-on-backdrop id="email-sign-modal" ref="email-sign-modal" size="md" title="update email signature"
      hide-footer>
   
      <b-table responsive selectable
        :fields="[{ key: 'id', label: 'default' }, { key: 'name', label: 'name' }, { key: 'email', label: 'ful email id' }]"
        :items="emailSignature" @row-clicked="onRowClicked">
        <template #row-details="{ item }">
          <b-card>
            <div class="ml-0 row">
              <h2 style="
                margin: 0;
      font-size: 16px;
      font-weight: 400;
      color: #111;
      text-transform: uppercase;
                ">

                UPDATE SIGNATURE
              </h2>
              <!-- {{ item }} -->
            </div>
            <hr style="border-top:1px solid #f65948;">
            <!-- <div class="row"> -->
            <validation-observer #default="{ handleSubmit }" ref="refFormObserver">
              <b-form class="mt-2" @submit.prevent="handleSubmit(updateSignature)">

                <b-row>

                  <b-col md="12">
                    <validation-provider #default="validationContext" name="name" vid="name" rules="required">
                      <b-form-group label="Name">
                        <b-form-input   id="name" v-model="signature.name"
                          placeholder="Name" />
                        <b-form-invalid-feedback>
                          {{ validationContext.errors[0] }}
                        </b-form-invalid-feedback>
                      </b-form-group>
                    </validation-provider>
                  </b-col>




                </b-row>
                <b-row>
                  <b-col md="12">
                    <b-form-group label="Signature">

                      <quill-editor v-model="signature.signature" :options="editorOption"></quill-editor>
                    </b-form-group>

                  </b-col>
                </b-row>
                <div class="mt-1 text-right">


                  <b-button size="sm" :disabled="$store.state.users.signatureLoading" type="submit" variant="primary">
                    Update
                    <b-spinner class="ml-1" small v-if="$store.state.users.signatureLoading">

                    </b-spinner>
                  </b-button>
                </div>

              </b-form>
            </validation-observer>
            <!-- </div> -->
          </b-card>
        </template>
      </b-table>
      <div class="text-right">

        <b-button size="sm" class="mt-3" @click="() => {
          $refs['email-sign-modal'].hide()
        }" type="reset" variant="primary">
          Cancel
        </b-button>
      </div>
    </b-modal>
  </div>
</template>


<script>

// function initMap() {
//     var map = new google.maps.Map(document.getElementById('map'), {
//       center: {lat: -33.8688, lng: 151.2195},
//       zoom: 13
//     });
//     var input = document.getElementById('searchInput');
//     map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

//     var autocomplete = new google.maps.places.Autocomplete(input);
//     autocomplete.bindTo('bounds', map);

//     var infowindow = new google.maps.InfoWindow();
//     var marker = new google.maps.Marker({
//         map: map,
//         anchorPoint: new google.maps.Point(0, -29)
//     });

//     autocomplete.addListener('place_changed', function() {
//         infowindow.close();
//         marker.setVisible(false);
//         var place = autocomplete.getPlace();
//         if (!place.geometry) {
//             window.alert("Autocomplete's returned place contains no geometry");
//             return;
//         }

//         // If the place has a geometry, then present it on a map.
//         if (place.geometry.viewport) {
//             map.fitBounds(place.geometry.viewport);
//         } else {
//             map.setCenter(place.geometry.location);
//             map.setZoom(17);
//         }
//         marker.setIcon(({
//             url: place.icon,
//             size: new google.maps.Size(71, 71),
//             origin: new google.maps.Point(0, 0),
//             anchor: new google.maps.Point(17, 34),
//             scaledSize: new google.maps.Size(35, 35)
//         }));
//         marker.setPosition(place.geometry.location);
//         marker.setVisible(true);

//         var address = '';
//         if (place.address_components) {
//             address = [
//               (place.address_components[0] && place.address_components[0].short_name || ''),
//               (place.address_components[1] && place.address_components[1].short_name || ''),
//               (place.address_components[2] && place.address_components[2].short_name || '')
//             ].join(' ');
//         }

//         infowindow.setContent('<div><strong>' + place.name + '</strong><br>' + address);
//         infowindow.open(map, marker);

//         // Location details
//         for (var i = 0; i < place.address_components.length; i++) {
//             if(place.address_components[i].types[0] == 'postal_code'){
//                 document.getElementById('postal_code').innerHTML = place.address_components[i].long_name;
//             }
//             if(place.address_components[i].types[0] == 'country'){
//                 document.getElementById('country').innerHTML = place.address_components[i].long_name;
//             }
//         }
//         document.getElementById('location').innerHTML = place.formatted_address;
//         document.getElementById('lat').innerHTML = place.geometry.location.lat();
//         document.getElementById('lon').innerHTML = place.geometry.location.lng();
//     });
// }
import { quillEditor } from 'vue-quill-editor'

import {
  BTable,
  BButton,
  BModal, BAvatar,
  VBModal, BCol, BSpinner,
  BRow, BForm, BFormFile,
  BFormInput, BDropdown, BFormInvalidFeedback,
  BFormGroup, BCard,
  BCardText, BDropdownItem,
  BFormSelect, BImg, BMediaAside
} from "bootstrap-vue";
import Ripple from "vue-ripple-directive";
import store from "@/store/index";
import router from "@/router";
import { getUserData, getHomeRouteForLoggedInUser, isUserLoggedIn } from "@/auth/utils";
import formValidation from "@/@core/comp-functions/forms/form-validation";
import { ValidationProvider, ValidationObserver } from "vee-validate";

export default {
  components: {
    BButton, BRow,
    BModal, BAvatar, BDropdown,//BForm,
    BFormFile, ValidationObserver, ValidationProvider,
    BForm, BSpinner, BCard,
    BFormInput, BCol, BDropdownItem, BFormInvalidFeedback,
    BCardText,
    BFormGroup,
    BFormSelect, quillEditor,
    BImg, BTable,
    BMediaAside
  },
  directives: {
    "b-modal": VBModal,
    Ripple,
  },
  data() {

    // if(localStorage.getItem('userData'))
    // {  const userData = getUserData();
    //   const allTenants = userData?.all_tenants;

    //   let switchSelected = userData?.tenant?.id;
    //   let switchOptions = [];

    //   allTenants.forEach(function (tenant, index) {
    //     switchOptions.push({
    //       value: tenant.id,
    //       text:
    //         tenant.organization.name + " (" + tenant.organization.subdomain + ")",
    //     });
    //   });}

    return {
    
      errors_pass:{},
      location: '',
      searchResults: [],
      service: null,
      name: '',
      signature: {
        name: null,
        signature: ''
      },
      loggedIn:isUserLoggedIn(),
      profileData: {
        name: null,
        location: null,
        phone: null,
      },
      old_pass: '',
      new_pass: '',
      c_new_pass: '',
      image: null,
      base64: '',
      file_name: '',
      file: null,
      loading: false,
      detailsRow: null,
      previewImage: null,
      editorOption: {
        modules: {
          toolbar: [['bold', 'italic', 'underline', 'strike', { 'script': 'sub' }, { 'script': 'super' }], ['clean'], [{ 'color': [] }, { 'background': [] }], [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'align': [] }], ['image'], [{ 'header': [] }, { 'font': [] }, { 'size': [] }], ['link']],
        },
        placeholder: 'Signature',
      },
      // switchSelected,
      // switchOptions,
    };
  },
  metaInfo() {
    return {
      script: [{
        src: `https://maps.googleapis.com/maps/api/js?key=AIzaSyCcDJn5gcK90_YG0FOzMyxabMn_ootqDCs&libraries=places`,
        async: true,
        defer: true,
        callback: () => this.MapsInit() // will declare it in methods
      }]
    }
  },
  computed: {
    name(){
    var name=''
      if (this.loggedIn) {

this.$store.state.users.all.forEach(element => {
  if (element.id === JSON.parse(localStorage.getItem('userData')).id) {
    name = element.name;
  }
});
return name;
} else {
return;
}
     },
    phone() {
      
      var phone = ''
      if (this.loggedIn) {

        this.$store.state.users.all.forEach(element => {
          if (element.id === JSON.parse(localStorage.getItem('userData')).id) {
            phone = element.phone;
          }
        });
        return phone;
      } else {
        return;
      }
    },
    location2() {
      var location = ''
      if (this.loggedIn) {
        this.$store.state.users.all.forEach(element => {
          if (element.id === JSON.parse(localStorage.getItem('userData')).id) {
            location = element.location;
          }
        });
        return location;
      } else {
        return;
      }
    },

    loggedId() {
      if (this.loggedIn) {
        return JSON.parse(localStorage.getItem('userData')).id
      } else {
        return;
      }
    },

    emailSignature() {
      // var signAll = this.$store.state.users.signAll.name ? [this.$store.state.users.signAll] : []
      var signAll = []
      if (this.$store.state.users.signAll != null) {
        signAll.push(this.$store.state.users.signAll)
      }
      var all = signAll.length > 0 ? signAll : null;
      var arr = []
      if (this.loggedIn) {
        if (all != null) {
          all.forEach(element => {
            arr.push({
              name: element.name ?? JSON.parse(localStorage.getItem('userData')).name,
              email: this.domain_email,
              id: JSON.parse(localStorage.getItem('userData')).id,

            })
            this.signature.name = element.name
            this.signature.signature = element.signature
          });
          // arr.push()
          return arr;
        } else {
          arr.push({
            name: JSON.parse(localStorage.getItem('userData')).name,
            email: this.domain_email,
            id: JSON.parse(localStorage.getItem('userData')).id,

          })
          this.signature.name = JSON.parse(localStorage.getItem('userData')).name,
            this.signature.signature = this.domain_email
          return arr;
        }
      } else {
        return;
      }
    },
    isLoading() {
      return this.$store.state.auth.isLoading;
    },
    successMessage() {
      return this.$store.state.auth.successMessage;
    },
    errorMessage() {
      return this.$store.state.auth.errorMessage;
    },
    errors() {
      return JSON.parse(JSON.stringify(this.$store.state.auth.errors));
    },
    user_email() {

      if (this.loggedIn) {

        return JSON.parse(localStorage.getItem('userData')).email
      } else {
        return;
      }
    },

    username() {
      var name = ''
      if (this.loggedIn) {
        if (this.$store.state.users.all.length > 0) {

          this.$store.state.users.all.forEach(element => {
            if (element.email === JSON.parse(localStorage.getItem('userData')).email) {
              name = element.name;
            }
          });
        }
        name = this.loggedIn ? JSON.parse(localStorage.getItem('userData')).name : ''
        // JSON.parse(localStorage.getItem('userData')).avatar
        return name;
      } else {
        return '';
      }
    },
    domain_email() {
      var email = ''
      if (this.loggedIn) {
        this.$store.state.users.user_emails.forEach(element => {
          if (element.user_id === JSON.parse(localStorage.getItem('userData')).id) {
            element.emails_setting.forEach(e => {


              email = e.email;
            });
          }
        });
        // JSON.parse(localStorage.getItem('userData')).avatar
        return email;
      } else {
        return;
      }
    }
  },
  updated() {
    // if(this.base64 != ''){



    // }
  },
  created() {
    
    
    let loggedIn = isUserLoggedIn();
      if(loggedIn){
      this.$store.dispatch('users/fetchUserSignature', JSON.parse(localStorage.getItem('userData')).id)
      if( JSON.parse(localStorage.getItem('userData')).user_role_id === 1){

      this.$store.dispatch('users/fetch');
      }
    }
    // const autocomplete = new google.maps.places.Autocomplete(this.$refs['origin']);


  },
  methods: {
    checkValid(){
      this.errors_pass = null
    },


   
    isNumber(ev) {
      const keysAllowed = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.'];
      const keyPressed = ev.key;

      if (!keysAllowed.includes(keyPressed)) {
        ev.preventDefault()
      }
    },
    MapsInit() {
      this.service = new window.google.maps.places.AutocompleteService()
    },
    displaySuggestions(predictions, status) {
      if (status !== window.google.maps.places.PlacesServiceStatus.OK) {
        this.searchResults = []
        return
      }
      this.searchResults = predictions.map(prediction => prediction.description)
    },
    // loadImage() {
    //             this.isLoaded = true;
    //         },
    getImage() {
      // var avatar = ''

      // if(JSON.parse(localStorage.getItem('userData'))){
      this.$store.state.users.all.forEach(element => {
        if (element.id === JSON.parse(localStorage.getItem('userData')).id) {
          this.image = element.avatar;
          this.name = element.name
        }
      });
      // JSON.parse(localStorage.getItem('userData')).avatar
      // console.log(avatar);

      return this.image;
      // }else{
      //   // console.log(avatar);

      //   return;
      // }
    },
    updateProfileData() {
      console.log(this.profileData);
      if (this.loggedIn) {

        this.$store.dispatch('users/updateProfileData', { payload: this.profileData, id: JSON.parse(localStorage.getItem('userData')).id }).then(() => {
          this.$store.dispatch('users/fetch').then(() => {
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
          })
          this.$refs['update-profile-data-modal'].hide()
        })
      }
    },
    onRowClicked(item) {
      // const { detailsRow } = this
      // if (detailsRow && detailsRow !== item) {
      //   detailsRow._showDetails = false;
      // }

      this.$set(item, '_showDetails', !item._showDetails
      )
      // this.detailsRow = item;
      // this.taskId = item.id;
      // this.$store.dispatch('proposals/get', item.id).then(() => {
      //   console.log(this.allProposals)
      // })
      // this.$store.dispatch('invoice/get', item.id).then(() => {
      //   // console.log(this.allProposals)
      // })

    },
    updateSignature() {
      const data = {
        user_id: this.loggedIn ? JSON.parse(localStorage.getItem('userData')).id : 0,
        name: this.signature.name,
        signature: this.signature.signature
      }
      this.$store.dispatch('users/userSignature', { payload: data, id: data.user_id }).then(() => {
        this.$store.dispatch('users/fetchUserSignature', data.user_id)
        this.$refs['email-sign-modal'].hide()
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

      })
      // console.log(data);
    },
    resetPassword(){
      this.old_pass = null;
      this.new_pass = null;
      this.c_new_pass = null;

    },
    updatePassword() {
      this.$store.dispatch('users/updatePassword', {
        old_password:this.old_pass,
        c_password: this.c_new_pass
      }).then(() => {
        this.$refs['change-pass-modal'].hide();
        this.resetPassword()
        this.$toast.success("Profile Updated!", {
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
          rtl: false
        });
      }).catch(() => {
        this.errors_pass.pass = 'Please enter correct password!'
        // console.log(err);
      })
    },
    UpdateProfile(e) {
      this.loading = true
      this.file = e.target.files[0];
      var file = e.target.files[0]
      var file_name = file.name
      this.file_name = file_name
      var file_type = file.type;
      // var base64 = ''
      const reader = new FileReader();
      reader.onload = (e) => {
        // this.image = e.target.result
        this.previewImage = e.target.result;
        this.base64 = e.target.result
        // this.previewImage = e.target.result
        // this.$refs['refPreviewEl'].src = e.target.result
        // this.$refs['refPreviewEl'].value = e.target.result
        this.$store.dispatch('tasks/upload_file_s3', {
          data: {
            attach: [{

              file: this.base64,
              name: this.file_name
            }

            ]
          }
        }).then(() => {
          this.$store.state.tasks.s3_url.forEach(element => {
            if (element.fileName == this.file_name) {
              // url = element.url
              this.submit(element.url)
            }
          });
          // this.$store.dispatch()
        })

      }
      // const element = array[index];


      var base = reader.readAsDataURL(file)
      // console.log(file);

      var url = ''

      if (url != '') {



      }
      e.target.value = ''

    },
    submit(url) {
      this.$store.dispatch('users/updateProfile', {
        url: url
      }).then(() => {
        this.$store.dispatch('users/fetch').then(() => {

          // document.getElementById('file-upload').value = ''
          this.previewImage = null
          this.file = null,
          this.file_name=null,
          this.loading = false
          this.$toast.success("Profile Updated!", {
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
            rtl: false
          });
        })
      })
    },
    handleOk() {
      this.$store
        .dispatch("auth/switchOrg", {
          tenant_id: this.switchSelected,
        })
        .then(() => {
          this.$toast({
            component: ToastificationContent,
            props: {
              title: this.successMessage,
              icon: "CheckIcon",
              variant: "success",
            },
          });
        })
        .catch(() => {
          //   this.$refs.loginValidation.setErrors(this.errors);
          if (this.errorMessage)
            this.$toast({
              component: ToastificationContent,
              props: {
                title: this.errorMessage,
                icon: "BellIcon",
                variant: "danger",
              },
            });
        })
        .finally(() => {
          const resolved = this.$router.resolve({
            name: "dashboard",
          });
          window.location.href = resolved.href;
        });
    },
  },
  watch: {
    location(newValue) {
      if (newValue) {
        // this.service.getPlacePredictions({
        //   input: this.location,
        //   types: ['(cities)']
        // }, this.displaySuggestions)
        console.log(this.service);
      }
    }
  },
  setup() {
    const { refFormObserver, getValidationState, resetForm } =
      formValidation(resetForm);
    return {
      refFormObserver,
      getValidationState,
      formValidation,

    }
  },
};
</script>
<style lang="scss">
@import "@core/scss/vue/libs/quill.scss";
</style>
<style>
.ql-toolbar.ql-snow+.ql-container.ql-snow {
  height: 14rem;
}

.dropdown-menu {
  width: 248%;
  padding-bottom: 0rem;
}

.border-l {
  border: 1px solid rgb(212, 212, 212);
}
</style>

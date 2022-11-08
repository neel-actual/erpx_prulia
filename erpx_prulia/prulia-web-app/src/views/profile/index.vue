<template>
  <div class="pa-0">
    <v-container class="pt-0 px-0">
      <v-list v-if="member">
        <v-list-item>
          <v-list-item-avatar class="cursor_pointer" @click="showUpload = true">
            <user-avatar
              size="36"
              :src="member.profile_photo"
              right
              color="secondary"
            />
          </v-list-item-avatar>
          <v-flex xs2 md2>
		  <v-list-item-title>
		    <div>
		      {{ member.full_name }}
		    </div>
		    <div class="caption">
		      {{ member.email }}
		    </div>
		    
		  </v-list-item-title>
          </v-flex>
         
          <v-list-item-action>
            <v-btn color="primary" icon :disabled="loading" @click="toggleForm"
              ><v-icon>mdi-pencil</v-icon></v-btn
            >
          </v-list-item-action>
        </v-list-item>
      </v-list>
      <v-form
        v-if="memberData"
        :disabled="disableForm"
        v-model="valid"
        @submit.prevent="onSubmit"
      >
        <v-expansion-panels mandatory accordion multiple>
          <v-expansion-panel>
            <v-expansion-panel-header>
              <v-subheader>Personal Information</v-subheader>
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <v-list-item>
                <v-text-field
                  v-model="memberData.full_name"
                  label="Name"
                  required
                  :rules="[
                    val => !!val || 'Name is required!',
                    val =>
                      String(val).length >= 4 ||
                      'Name should be 4 characters and more!'
                  ]"
                />
              </v-list-item>
              <v-list-item>
                <v-text-field
                  v-mask="`######-##-####`"
                  v-model="memberData.nric_number"
                  label="NRIC Number"
                  required
                  :rules="[
                    val => !!val || 'NRIC number is required!',
                    val =>
                      /\d{6}-\d{2}-\d{4}/.test(val) ||
                      'Invalid NRIC number is provided!'
                  ]"
                />
              </v-list-item>
              <v-list-item>
                <v-select
                  v-model="memberData.gender"
                  label="Gender"
                  :items="GENDER"
                >
                </v-select>
              </v-list-item>
              <v-list-item>
                <v-text-field
                  v-mask="`+6### ### ######`"
                  v-model="memberData.cell_number"
                  label="Mobile Number (eg: +601x xxx xxxx)"
                  required
                  :rules="[
                    val => !!val || 'Mobile number is required!',
                    val =>
                      /\+60\d{2}[ |-]\d{3} \d{3,}/.test(val) ||
                      'Invalid mobile number is provided!'
                  ]"
                />
              </v-list-item>
            </v-expansion-panel-content>
          </v-expansion-panel>

          <v-expansion-panel>
            <v-expansion-panel-header>
              <v-subheader>Event Preferences</v-subheader>
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <v-list-item>
                <v-select
                  v-model="memberData.meal_option"
                  label="Meal Option"
                  :items="MEAL_OPTIONS"
                >
                </v-select>
              </v-list-item>
              <v-list-item>
                <v-select
                  v-model="memberData.shirt_size"
                  label="Shirt Size"
                  :items="SHIRT_SIZE"
                >
                </v-select>
              </v-list-item>
            </v-expansion-panel-content>
          </v-expansion-panel>

          <v-expansion-panel>
            <v-expansion-panel-header>
              <v-subheader>Prudential Information</v-subheader>
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <v-list-item>
                <v-text-field
                  v-model="memberData.prudential_id"
                  label="Agent ID (eg: 1234567)"
                  disabled
                />
              </v-list-item>
              <v-list-item>
                <v-text-field
                  v-model="memberData.position"
                  label="Position"
                  disabled
                  :messages="memberData.position ? '' : 'No results found'"
                />
              </v-list-item>
              <v-list-item>
                <v-text-field
                  v-model="memberData.branch"
                  label="Branch"
                  disabled
                  :messages="memberData.branch ? '' : 'No results found'"
                />
              </v-list-item>
              <v-list-item>
                <v-text-field
                  v-model="memberData.agency_no"
                  label="Agency Code (eg: ABC12345)"
                  disabled
                  :messages="memberData.agency_no ? '' : 'No results found'"
                />
              </v-list-item>
            </v-expansion-panel-content>
          </v-expansion-panel>

          <v-expansion-panel>
            <v-expansion-panel-header>
              <v-subheader>Smart Partners</v-subheader>
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <v-list-item>
                <v-text-field
                  v-model="memberData.pa_status"
                  label="Personal Accident"
                  disabled
                  :messages="memberData.agency_no ? '' : 'No results found'"
                />
              </v-list-item>
              <v-list-item>
                <v-text-field
                  v-model="memberData.pi_status"
                  label="Personal Indemnity"
                  disabled
                  :messages="memberData.agency_no ? '' : 'No results found'"
                />
              </v-list-item>
              <v-list-item>
                <v-text-field
                  v-model="memberData.maxis_status"
                  label="Maxis"
                  disabled
                  :messages="memberData.agency_no ? '' : 'No results found'"
                />
              </v-list-item>
            </v-expansion-panel-content>
          </v-expansion-panel>
           <v-expansion-panel>
            <v-expansion-panel-header>
              <v-subheader>Reports</v-subheader>
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <div class="d-md-flex d-lg-flex d-xl-flex">
                <MemberReport></MemberReport>
                <PruliaEventReport/>
                <MembershipEvent/>
              </div>
             </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>

        <v-slide-y-reverse-transition>
          <v-btn
            v-if="!disableForm && dirty"
            :loading="loading"
            :disabled="!valid"
            color="primary"
            fab
            fixed
            bottom
            right
            type="submit"
          >
            <v-icon>mdi-content-save</v-icon>
          </v-btn>
        </v-slide-y-reverse-transition>
      </v-form>
    </v-container>
    <upload-avatar v-model="showUpload" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import cloneDeep from 'lodash/cloneDeep'
import { GENDER, MEAL_OPTIONS, SHIRT_SIZE } from '@/const'
import UserAvatar from '@/components/common/UserAvatar'
import MemberReport from '@/components/member-report'
import MembershipEvent from '@/components/membership-event'
import PruliaEventReport from '@/components/prulia-event-report'
import UploadAvatar from './UploadAvatar'

export default {
  name: 'Profile',
  components: { UploadAvatar, UserAvatar,MemberReport,PruliaEventReport,MembershipEvent},
  data: () => ({
    showUpload: false,
    csvdata:[],
    headers:{},
    APIURL:"https://www.prulia.org.my/api/method/erpx_prulia.prulia_members.report.prulia_member_library.prulia_member_library.get_column_data?user=Wittonlam@erpx.com.my",
    memberData: null,
    disableForm: true,
    valid: false,
    dirty: false,
    loading: false,
    MEAL_OPTIONS,
    SHIRT_SIZE,
    GENDER
    
  }),
  computed: {
    ...mapGetters('auth', ['member'])
  },
  watch: {
    member: {
      deep: true,
      handler(val, oldVal) {
        if (oldVal === null) {
          this.memberData = cloneDeep(this.member)
        }
      }
    },
    memberData: {
      deep: true,
      handler() {
        if (!this.disableForm && !this.dirty) {
          this.dirty = true
        }
      }
    }
  },
  mounted() {
    this.memberData = cloneDeep(this.member)
  },
  methods: {
    toggleForm() {
      this.disableForm = !this.disableForm
    },
    onSubmit() {
      this.loading = true
      this.$store
        .dispatch('auth/updateMemberDetails', this.memberData)
        .then(() => {
          this.dirty = false
          this.disableForm = true
          this.showSnackbar('Profile updated successfully!', 'success')
        })
        .catch(error => {
          let { data } = error
          let { message } = data

          this.showSnackbar(message || 'Please try again!', 'error')
        })
        .finally(() => {
          this.loading = false
        })
    }
  }
}
</script>

<style scoped></style>

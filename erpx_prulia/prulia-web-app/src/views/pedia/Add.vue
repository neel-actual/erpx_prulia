<template>
  <v-container class="pt-0 px-0">
    <v-row>
      <v-col cols="12" sm="12">
        <v-text-field value="" label="Title"></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <h3>Step 1: Questions</h3>
    </v-row>
    <v-row>
      <v-col cols="12" sm="6">
        <v-radio-group v-model="radios">
          <template v-slot:label>
            <div>Does this issue look for your AM/UM assistance ?</div>
          </template>
          <v-radio value="Google">
            <template v-slot:label>
              <div>Yes</div>
            </template>
          </v-radio>
        </v-radio-group>
      </v-col>
      <v-col cols="12" sm="6">
        <v-text-field value="" label="If Yes, provide the name"></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" sm="6">
        <v-radio-group v-model="radios">
          <template v-slot:label>
            <div>Does this issue look for your APM assistances ?</div>
          </template>
          <v-radio value="Google">
            <template v-slot:label>
              <div>Yes</div>
            </template>
          </v-radio>
        </v-radio-group>
      </v-col>
      <v-col cols="12" sm="6">
        <v-text-field value="" label="If Yes, provide the name"></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" sm="6">
        <v-radio-group v-model="radios">
          <template v-slot:label>
            <div>
              Does this issue look for PAMB / PBTB management assistances ?
            </div>
          </template>
          <v-radio value="Google">
            <template v-slot:label>
              <div>Yes</div>
            </template>
          </v-radio>
        </v-radio-group>
      </v-col>
      <v-col cols="12" sm="6">
        <v-text-field value="" label="If Yes, provide the name"></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <h3>STEP 2 : Fill in basic info of contributor</h3>
    </v-row>
    <v-row>
      <v-col cols="12" sm="6">
        <v-text-field value="" label="QA Name"></v-text-field>
      </v-col>
      <v-col cols="12" sm="6">
        <v-text-field value="" label="Agency Code"></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" sm="6">
        <v-text-field value="" label="Region"></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <h3>STEP 3 : Claim Detail</h3>
    </v-row>
    <v-row>
      <v-col cols="12" sm="6">
        <v-select :items="CLAIMS" label="Category"></v-select>
      </v-col>
      <v-col cols="12" sm="6">
        <v-text-field value="" label="If Other please provide"></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <h3>STEP 4 : Policy Details</h3>
    </v-row>
    <v-row>
      <v-col cols="12" sm="6">
        <v-text-field value="" label="Policy Number"></v-text-field>
      </v-col>
      <v-col cols="12" sm="6">
        <v-text-field value="" label="Life Assured Name"></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" sm="6">
        <v-text-field value="" label="Product Name"></v-text-field>
      </v-col>
      <v-col cols="12" sm="6">
        <v-select :items="MED_PLAN" label="Category"></v-select>
      </v-col>
    </v-row>
    <v-row>
      <v-file-input accept="image/*" label="Attachment"></v-file-input>
    </v-row>
    <v-row>
      <v-text-field value="" label="Reason of declined"></v-text-field>
    </v-row>
    <v-row>
      <h3>STEP 5 : Member Concern</h3>
    </v-row>
    <v-row>
      <v-text-field value="" label="Concern or Question"></v-text-field>
    </v-row>
    <v-row>
      <h3>STEP 6 : Disclaimer</h3>
    </v-row>
    <v-row>
      <v-radio-group v-model="radios" mandatory>
        <v-radio label="Agree with Rules & Regulation" value="false"></v-radio>
      </v-radio-group>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'
import { CLAIMS, MED_PLAN } from '@/const'

export default {
  name: 'Pedia',
  data: () => ({
    CLAIMS,
    MED_PLAN
  }),
  computed: {
    ...mapGetters('pedia', {})
  }
}
</script>

<style scoped></style>

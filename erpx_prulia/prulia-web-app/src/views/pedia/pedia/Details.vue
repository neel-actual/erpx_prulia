<template>
  <v-container v-if="currentPedia" class="pt-0 px-0">
    <v-list>
      <v-list-item>
        <v-list-item-title>
          <div>
            {{ currentPedia.title }}
          </div>
          <div class="caption">By {{ currentPedia.full_name }}</div>
        </v-list-item-title>
        <v-list-item-action-text class="caption">
          {{ currentPedia.published_date | formatDate }}
        </v-list-item-action-text>
      </v-list-item>
    </v-list>

    <v-expansion-panels accordion multiple mandatory>
      <template v-for="(section, index) in fields">
        <!--v-if="section.label.toLowerCase()!='disclaimer'" this condition remove disclaimer section-->
        <v-expansion-panel
          v-if="section.label.toLowerCase()!='disclaimer'"
          :key="`section-${index}`"
        >
          <v-expansion-panel-header>
            <v-subheader>{{
              section.label.replace(/STEP *\d+ *\:/, '')
            }}</v-subheader>
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-row class="py-0 px-3" dense>
              <v-col
                class="py-1 px-2"
                :cols="field.columns || 12"
                v-for="(field, field_index) in section.fields"
                :key="`field-${index}-${field_index}`"
              >
                <v-checkbox
                  dense
                  v-if="field.fieldtype === 'Check'"
                  :label="field.description || field.label"
                  v-model="currentPedia[field.fieldname]"
                  readonly
                />
                <v-text-field
                  dense
                  v-if="
                    field.fieldtype === 'Data' ||
                      field.fieldtype === 'Select' ||
                      field.fieldtype === 'Date' ||
                      field.fieldtype === 'Datetime'
                  "
                  :label="field.label"
                  v-model="currentPedia[field.fieldname]"
                  readonly
                ></v-text-field>
                <v-textarea
                  dense
                  v-if="field.fieldtype === 'Long Text'"
                  :label="field.label"
                  v-model="currentPedia[field.fieldname]"
                  class="grey"
                  readonly
                >
                </v-textarea>
                <div class="py-3" v-if="field.fieldtype === 'Attach'">
                  <div>
                    <label class="v-label theme--light">
                      {{ field.label }}
                    </label>
                  </div>
                  <div>
                    <v-btn
                      color="primary darken-2"
                      :href="currentPedia[field.fieldname]"
                      target="_blank"
                      text
                      plain
                      rounded
                    >
                      <v-icon left>mdi-link</v-icon>
                      {{ currentPedia[field.fieldname] || 'No file found' }}
                    </v-btn>
                  </div>
                </div>
              </v-col>
            </v-row>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </template>
    </v-expansion-panels>

    <v-timeline dense class="pr-4">
      <!--comment input-->
      <v-timeline-item
        class="mb-2"
        :color="getRandomColor($store.getters['auth/member'].full_name)"
        large
        fill-dot
      >
        <template #icon>
          <span class="text-uppercase white--text">{{
            getUserShortName($store.getters['auth/member'].full_name)
          }}</span>
        </template>
        <v-form v-model="valid" @submit.prevent="onComment">
          <v-textarea
            v-model="commentText"
            label="Leave a comment..."
            :rules="[v => !!v || 'Comment is required']"
            filled
            hide-details
            auto-grow
            :rows="1"
            row-height="1"
          >
            <template #append-outer>
              <v-btn
                class="mx-0 primary"
                :disabled="!valid"
                :loading="sendingComment"
                rounded
                type="submit"
              >
                Post
              </v-btn>
            </template>
          </v-textarea>
        </v-form>
      </v-timeline-item>

      <template
        v-for="(commentGroup, groupIndex) in Object.keys(commentsGrouped)"
      >
        <!--calendar date header-->
        <v-timeline-item
          :key="`group-${groupIndex}`"
          class="pt-1 pb-3"
          hide-dot
        >
          <span class="caption">{{ commentGroup }}</span>
        </v-timeline-item>
        <template v-for="(comment, index) in commentsGrouped[commentGroup]">
          <!--comments-->
          <v-timeline-item
            :key="`comment-${groupIndex}-${index}`"
            class="mb-3"
            :color="getRandomColor(comment.commenter_name)"
            fill-dot
          >
            <template #icon>
              <span class="text-uppercase white--text caption">{{
                getUserShortName(comment.commenter_name)
              }}</span>
            </template>
            <v-card rounded>
              <v-card-text style="white-space: pre-line">
                {{ comment.comment }}
              </v-card-text>
              <v-divider />
              <v-card-actions class="pt-2 px-4">
                <v-row align="center">
                  <v-col class="caption"
                    >By {{ comment.commenter_name }} ·
                    {{ comment.comment_date | formatDate('h:mm A') }}</v-col
                  >
                  <v-spacer />
                  <v-col class="shrink">
                    <v-btn
                      color="primary"
                      text
                      rounded
                      @click="
                        currentReply === comment.name
                          ? (currentReply = null)
                          : (currentReply = comment.name)
                      "
                      >Reply</v-btn
                    >
                  </v-col>
                </v-row>
              </v-card-actions>
            </v-card>
          </v-timeline-item>

          <!--reply input-->
          <v-timeline
            :key="`reply-input-${groupIndex}-${index}`"
            dense
            class="ml-14 pt-0 mb-3"
          >
            <v-timeline-item
              v-if="currentReply === comment.name"
              class=""
              :color="getRandomColor($store.getters['auth/member'].full_name)"
              hide-dot
            >
              <v-form v-model="validReply" @submit.prevent="onComment">
                <v-textarea
                  v-model="replyText"
                  label="Leave a comment..."
                  :rules="[v => !!v || 'Comment is required']"
                  filled
                  hide-details
                  auto-grow
                  :rows="1"
                  row-height="1"
                >
                  <template #append-outer>
                    <v-btn
                      class="mx-0 primary"
                      :disabled="!validReply"
                      :loading="sendingReply"
                      rounded
                      type="submit"
                    >
                      Post
                    </v-btn>
                  </template>
                </v-textarea>
              </v-form>
            </v-timeline-item>

            <!--replies-->
            <v-timeline-item
              v-for="(reply, replyIndex) in replies[comment.name]"
              :key="`reply-${index}-${replyIndex}`"
              class="mb-3"
              :color="getRandomColor(reply.commenter_name)"
              fill-dot
            >
              <template #icon>
                <span class="text-uppercase white--text caption">{{
                  getUserShortName(reply.commenter_name)
                }}</span>
              </template>
              <v-card>
                <v-card-text style="white-space: pre-line">
                  {{ reply.comment }}
                </v-card-text>
                <v-divider />
                <v-card-actions class="pt-2 px-4">
                  <v-row align="center">
                    <v-col class="caption"
                      >By {{ reply.commenter_name }} ·
                      {{ reply.comment_date | formatCalendar }}</v-col
                    >
                  </v-row>
                </v-card-actions>
              </v-card>
            </v-timeline-item>
          </v-timeline>
        </template>
      </template>
    </v-timeline>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'
import isEqual from 'lodash/isEqual'
import groupBy from 'lodash/groupBy'
import dayjs from '@/config/dayjs'

export default {
  name: 'Details',
  data: () => ({
    valid: false,
    commentText: '',
    sendingComment: false,

    currentReply: null,
    validReply: false,
    replyText: '',
    sendingReply: false
  }),
  computed: {
    ...mapGetters('pedia', ['all', 'meta', 'loaded', 'metaLoaded', 'comments']),
    currentPedia() {
      return this.all?.find(pedia => isEqual(this.$route.params.id, pedia.name))
    },
    fields() {
      let sections = []
      let index = -1

      this.meta?.forEach(_meta => {
        if (_meta.fieldtype === 'Section Break') {
          index++
          sections[index] = {
            ..._meta,
            fields: []
          }
        } else if (sections[index]?.fields) {
          if (!_meta.hidden) {
            sections[index].fields.push(_meta)
          }
        }
      })

      return sections.filter(
        section => section.fields.length && section.options?.includes('show')
      )
    },
    commentsGrouped() {
      let _comments =
        this.comments
          ?.filter(comment => !comment.reply_to)
          .map(comment => {
            return {
              ...comment,
              group: dayjs(comment.comment_date).calendar(null, {
                sameDay: '[Today]', // The same day ( Today at 2:30 AM )
                lastDay: '[Yesterday]', // The day before ( Yesterday at 2:30 AM )
                lastWeek: 'D MMM YYYY', // Everything else ( 7/10/2011 )
                sameElse: 'DD MMM YYYY' // Everything else ( 7/10/2011 )
              })
            }
          }) || []

      return groupBy(_comments, 'group')
    },
    replies() {
      let _comments = this.comments?.filter(comment => comment.reply_to)

      return groupBy(_comments, 'reply_to')
    }
  },
  mounted() {
    if (!this.loaded) {
      this.$store.dispatch('pedia/load')
    }
    if (!this.metaLoaded) {
      this.$store.dispatch('pedia/loadMeta')
    }
    this.$store.dispatch('pedia/loadComments', this.$route.params.id)
  },
  methods: {
    showSection(section) {
      if (
        section.fieldname === 'assistance_section' &&
        !this.currentPedia?.yes_check
      ) {
        return false
      }

      return section.fields.length
    },
    onComment() {
      let data = {
        parent: this.$route.params.id,
        comment: this.commentText
      }

      if (this.currentReply) {
        data.comment = this.replyText
        data.reply_to = this.currentReply
        this.sendingReply = true
      } else {
        this.sendingComment = true
      }

      this.$store.dispatch('pedia/addComment', data).finally(() => {
        this.commentText = ''
        this.replyText = ''
        this.sendingReply = false
        this.sendingComment = false
        this.currentReply = false
      })
    },
    getUserShortName(name) {
      return name
        .split(' ')
        .map(item => item[0])
        .slice(0, 2)
        .join('')
    },
    getRandomColor(name) {
      let colors = [
        'red',
        'pink darken-2',
        'purple',
        'deep-purple',
        'indigo',
        'blue',
        'light-blue',
        'cyan',
        'teal',
        'green',
        'light-green darken-4',
        'lime darken-4',
        'amber darken-4',
        'orange',
        'deep-orange',
        'brown',
        'blue-grey'
      ]
      return colors[name.length % colors.length]
    }
  }
}
</script>

<style scoped></style>


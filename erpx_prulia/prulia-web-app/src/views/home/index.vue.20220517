<template>
  <div class="pa-0">
    <v-container class="pa-0">
      <v-row class="dusk">
        <v-img contain src="@/assets/banners/PRULIA_BannerMain.jpg" />
      </v-row>
      <v-row justify="center" class="vanilla pb-3">
        <v-col
          align-self="center"
          class="pa-4 text-center"
          cols="6"
          md="3"
          v-for="(link, index) in mainLinks"
          :key="`mainLinks-${index}`"
        >
          <a :href="link.href" target="_blank" style="text-decoration: none">
            <v-card
              rounded
              class="vanilla elevate-on-hover"
              hover
              flat
              :to="link.route"
            >
              <v-card-text class=" text-center">
                <v-avatar color="primary" size="108" class="elevate-target">
                  <v-icon color="white" size="72">{{ link.icon }} </v-icon>
                </v-avatar>
              </v-card-text>
              <v-card-subtitle class="py-0 text-center">
                <span>{{ link.title }}</span>
              </v-card-subtitle>
            </v-card>
          </a>
        </v-col>
      </v-row>
      <v-row class="sky" v-if="member && allNews.length">
        <v-col cols="12" class="text-center">
          <span>Latest News</span>
        </v-col>
        <v-col
          align-self="center"
          class="pa-6"
          cols="12"
          sm="6"
          md="4"
          v-for="(news, index) in allNews"
          :key="`news-${index}`"
        >
          <v-card
            rounded
            hover
            :to="{ name: 'NewsDetails', params: { id: news.name } }"
          >
            <v-img contain :src="news.news_image"></v-img>
            <v-card-subtitle class="text-center pb-0">
              <h3>
                <text-truncate>{{ news.title }}</text-truncate>
              </h3>
            </v-card-subtitle>
            <v-card-actions class="">
              <v-spacer />
              <span class="subtitle-2 pa-2 text--darken-4">
                {{ news.publish_date | formatDate('DD MMM YYYY') }}
              </span>
            </v-card-actions>
          </v-card>
        </v-col>
        <v-col cols="12" class="text-center">
          <v-btn plain :to="{ name: 'News' }">
            Read more
          </v-btn>
        </v-col>
      </v-row>
      <v-row justify="center" align="center" class="secondary">
        <v-img src="@/assets/banners/PRULIA_BannerVoice.jpg" contain />
        <div class="white--text text-center" style="position: absolute;">
          <h2>About PRULIA</h2>
          <h5 class="px-4 hidden-sm-and-down">
            It is very important that every agent or leader of Prudential should
            be a member of PRULIA to be united and stand together as one, to be
            the united
          </h5>
          <h1>"Voice of the Agency"</h1>
          <v-btn
            color="white"
            plain
            :to="{ name: 'View', params: { id: 'PHC00003' } }"
          >
            Read more
          </v-btn>
        </div>
      </v-row>
      <v-row class="amber pb-5">
        <v-col cols="12" class="text-center primary--text">
          <h1>Recommended books to read</h1>
        </v-col>
        <v-col>
          <v-img src="@/assets/banners/PRULIA_BannerBook.jpg"></v-img>
        </v-col>

        <v-col cols="12" class="text-center">
          <v-btn plain color="secondary" :to="{ name: 'Book' }">
            Find out more
          </v-btn>
        </v-col>
      </v-row>
      <v-row class="vanilla pb-6">
        <v-col cols="12" class="text-center">
          <h3 class="primary--text">Useful Links</h3>
        </v-col>
        <v-col
          class="pa-4"
          cols="6"
          md="3"
          v-for="(link, index) in usefulLinks"
          :key="`usefulLinks-${index}`"
        >
          <v-btn
            class="text-capitalize"
            style="font-size: 12px;"
            outlined
            color="primary"
            block
            :href="link.href"
            >{{ link.title }}
          </v-btn>
        </v-col>
      </v-row>
      <v-row class="grey px-4 px-md-12 pb-6">
        <v-col cols="12" class="text-center">
          <h3 class="primary--text">Smart Partners</h3>
        </v-col>
        <v-row no-gutters align="center" justify="center">
          <v-col cols="2">
            <v-img src="@/assets/logo/smart-partners/maxis-grey.png" />
          </v-col>
          <v-col cols="2">
            <v-img src="@/assets/logo/smart-partners/dolemon-grey.png" />
          </v-col>
          <v-col cols="2" class="pa-2">
            <v-img src="@/assets/logo/smart-partners/BMW-grey.png" />
          </v-col>
          <v-col cols="2">
            <v-img src="@/assets/logo/smart-partners/Volvo-grey.png" />
          </v-col>
          <v-col cols="2">
            <v-img src="@/assets/logo/smart-partners/chubb-grey.png" />
          </v-col>
          <v-col cols="2">
            <v-img src="@/assets/logo/smart-partners/toptravel-grey.png" />
          </v-col>
        </v-row>
        <v-col cols="12" class="text-center caption" v-if="member">
          <v-btn plain color="secondary" :to="{ name: 'SmartPartners' }">
            Find out more
          </v-btn>
        </v-col>
      </v-row>
      <v-row class="primary pa-6 white--text" justify="center" align="start">
        <v-col cols="12" class="text-center pb-6">
          <h3>Contact Us</h3>
        </v-col>
        <v-col class="py-0">
          <v-row justify="center">
            <v-list class="primary white--text py-0" dense>
              <v-list-item
                ><v-list-item-icon
                  ><v-icon class="amber--text"
                    >mdi-phone</v-icon
                  ></v-list-item-icon
                >
                <v-list-item-title class="white--text"
                  ><span class="font-weight-black mr-3">P</span>03-7727
                  6382</v-list-item-title
                >
              </v-list-item>
              <v-list-item
                ><v-list-item-icon
                  ><v-icon class="amber--text"
                    >mdi-fax</v-icon
                  ></v-list-item-icon
                >
                <v-list-item-title class="white--text"
                  ><span class="font-weight-black mr-3">F</span>03-7727
                  6384</v-list-item-title
                >
              </v-list-item>
              <v-list-item
                ><v-list-item-icon
                  ><v-icon class="amber--text"
                    >mdi-email</v-icon
                  ></v-list-item-icon
                >
                <v-list-item-title class="white--text"
                  ><span class="font-weight-black mr-3">E</span
                  >prulia@yahoo.com</v-list-item-title
                >
              </v-list-item>
            </v-list>
          </v-row>
        </v-col>
        <v-divider class="white hidden-sm-and-down" vertical />
        <v-col cols="12" class="hidden-md-and-up">
          <v-divider class="white" />
        </v-col>
        <v-col class="py-0">
          <v-row justify="center">
            <v-list class="primary py-0" dense>
              <v-list-item>
                <v-list-item-title class="white--text"
                  >Unit No. 531, 5th Floor, Block A, Lobby 8
                </v-list-item-title>
              </v-list-item>
              <v-list-item>
                <v-list-item-title class="white--text"
                  >Damansara Intan, No. 1 Jalan SS20/27, 47400
                </v-list-item-title>
              </v-list-item>
              <v-list-item>
                <v-list-item-title class="white--text"
                  >Petaling Jaya, Selangor Darul Ehsan
                </v-list-item-title>
              </v-list-item>
            </v-list>
          </v-row>
        </v-col>
        <v-col cols="12" class="pa-0">
          <v-expansion-panels
            v-model="panel"
            class="primary pa-0"
            inset
            flat
            accordion
          >
            <v-expansion-panel class="primary">
              <v-expansion-panel-header
                class="white--text text-center"
                hide-actions
              >
                <v-btn rounded plain class="white--text">
                  <h3>
                    {{ panel === 0 ? 'Hide Map' : 'View Map' }}
                  </h3>
                </v-btn>
              </v-expansion-panel-header>
              <v-expansion-panel-content class="pa-0">
                <v-img src="@/assets/LocationMap.png"> </v-img>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Home',
  components: {},
  data: () => ({
    panel: false,
    mainLinks: [
      {
        title: `President's Message`,
        icon: 'mdi-comment-account',
        route: { name: 'View', params: { id: 'PHC00001' } }
      },
      {
        title: 'Committee',
        icon: 'mdi-account-group',
        route: { name: 'View', params: { id: 'PHC00002' } }
      },
      {
        title: 'Membership',
        icon: 'mdi-account-lock',
        route: { name: 'View', params: { id: 'PHC00004' } }
      },
      {
        title: 'Achievements',
        icon: 'mdi-medal',
        route: ''
      },
      {
        title: 'Training',
        icon: 'mdi-teach',
        route: { name: 'Training' }
      },
      {
        title: 'Events',
        icon: 'mdi-calendar-multiple',
        route: { name: 'Events' }
      },
      {
        title: 'Photo Album',
        icon: 'mdi-image-area',
        href: 'https://www.flickr.com/photos/146651706@N07/albums/'
      },
      {
        title: 'News',
        icon: 'mdi-newspaper',
        route: { name: 'News' }
      }
    ],
    usefulLinks: [
      {
        title: 'Prudential Malaysia',
        href: 'http://www.prudential.com.my/'
      },
      {
        title: 'Eastspring Investments',
        href: 'http://www.eastspringinvestments.com.my/'
      },
      {
        title: 'Prudential BSN Takaful',
        href: 'https://www.prubsn.com.my/'
      },
      {
        title: 'NAMLIFA',
        href: 'http://namlifa.org.my/'
      },
      {
        title: 'Bank Negara Malaysia',
        href: 'http://www.bnm.gov.my/'
      },
      {
        title: 'MII',
        href: 'http://www.insurance.com.my/'
      },
      {
        title: 'Securities Commission',
        href: 'http://www.sc.com.my/'
      },
      {
        title: 'Malaysia Takaful Association',
        href: 'http://www.malaysiantakaful.com.my/'
      }
    ]
  }),
  computed: {
    ...mapGetters('auth', ['member']),
    allNews() {
      return this.$store.getters['news/all'].slice(0, 3)
    }
  }
}
</script>

<style lang="scss">
.elevate-on-hover:hover {
  .elevate-target {
    transition: all 0.2s ease-in-out !important;
    box-shadow: 0 3px 5px -1px rgba(0, 0, 0, 0.2),
      0 6px 10px 0 rgba(0, 0, 0, 0.14), 0 1px 18px 0 rgba(0, 0, 0, 0.12) !important;
  }
}
</style>

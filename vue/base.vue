<template>
  <div class="home-page-wrapper">

    <div class="filter-btn-container"> 
      <button v-on:click="openMobileFilter(true, $event)" class="filter-btn">
        Filter Plans 
      </button>
    </div>
    <div class="subscription">
      
      <!-- /// FILTER COLUMN DESKTOP /// -->
      <div class="filters-container filters-container__desktop">
        <p class="list-header">Filter Plans </p>
        <ul id="filter-by-goal">
            <li 
              v-for="(filter, index) in goalFilters"
              :key="filter" 
              :class="{ 'active': activeIndex === index }"
              @click="setActive(filter, index)"
            > 
              {{ filter }} 
            </li>
        </ul>
        <br /> 
        <!-- <p class="list-header">Other filters </p>
        <ul id="filter-by-goal">
            <li 
              v-for="filter in otherFilters" 
              :key="filter" 
              :class="{ 'active': activeIndex === index }"
              @click="setActive(filter, index)"
            > 
              {{ filter }}
            </li>
        </ul> -->
        <div class="gift-card-cta-container">
          <h4>
            {{ settings.gift_card_cta_text_main}}
          </h4>
          <p> {{ settings.gift_card_cta_subheading}} </p>
          <button class="button button--bright" @click="handleClick('gift')">
          {{ settings.gift_card_cta_button_text}}
          </button>
        </div>

        <div class="compare-plans-cta-container">
          <h4>
            {{ settings.compare_plans_cta_text }}
          </h4>
          <button class="button button--primary-inverse" @click="handleClick('compare')">
            {{ settings.compare_plans_cta_button_text}}
          </button>
        </div>
      </div>

      <div v-if="shapedProducts" id="home-cards-container">
        <div id="shop-all-product-container" v-if="selectedFilter">
          <div v-for="product in this.filteredProductSet" :key="product.id"> 
            <product-card :product="product" :addToCartText="addToCartText" :selectOptionsText="selectOptionsText" :viewDetailsLink="viewDetailsLink" :showReviews="showReviews" :buyMoreMessage="buyMoreMessage" />
          </div>
        </div>

          
        <div v-else id="shop-all-product-container">
          <div v-for="product in this.shapedProducts" :key="product.id"> 
            <product-card :product="product" :addToCartText="addToCartText" :selectOptionsText="selectOptionsText" :viewDetailsLink="viewDetailsLink" :showReviews="showReviews" :buyMoreMessage="buyMoreMessage" />
          </div>
        </div>
      </div>
    </div>

    <transition name="fade">
      <div v-show="mobileFilter" class="filters-container__mobile-overlay"></div>
    </transition>
    <transition name="slide">
    <div v-show="mobileFilter" class="filters-container filters-container__mobile filter-mobile">
      <div class="mobile-filter-close">
        <button v-on:click="openMobileFilter(false, $event)"><svg aria-hidden="true" focusable="false" role="presentation" class="icon icon-close" viewBox="0 0 40 40"><path d="M23.868 20.015L39.117 4.78c1.11-1.108 1.11-2.77 0-3.877-1.109-1.108-2.773-1.108-3.882 0L19.986 16.137 4.737.904C3.628-.204 1.965-.204.856.904c-1.11 1.108-1.11 2.77 0 3.877l15.249 15.234L.855 35.248c-1.108 1.108-1.108 2.77 0 3.877.555.554 1.248.831 1.942.831s1.386-.277 1.94-.83l15.25-15.234 15.248 15.233c.555.554 1.248.831 1.941.831s1.387-.277 1.941-.83c1.11-1.109 1.11-2.77 0-3.878L23.868 20.015z" class="layer"/></svg></button>
      </div>
      <p class="list-header">Filter Plans</p>
      <ul id="filter-by-goal">
          <li 
            v-for="(filter, index) in goalFilters"
            :key="filter" 
            :class="{ 'active': activeIndex === index }"
            @click="setActive(filter, index), openMobileFilter(false, $event)"
          > 
            {{ filter }} 
          </li>
      </ul>
      <button class="button button--primary" @click="handleClick('compare')">
        {{ settings.compare_plans_cta_button_text}}
      </button>
      <br /> 
    </div>
    </transition>
  </div> 
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import productCard from './product-card'

export default {
  name: 'home-page',
  components: { 
    productCard 
  },
  props: {
    settings: Object,
    giftCardImage: String,
    blocks: Array,
    allProducts: Array,
    productsWithBiomarkers: Array,
    allBiomarkers: Array,
    allProductsIcons:Array,
    addToCartText: String,
    selectOptionsText: String,
    viewDetailsLink: String,
    showReviews: Boolean,
    buyMoreMessage: String,
  },
  data() {
    return {
      selectedFilter: '',
      activeIndex: 0,
      filteredProductSet: [],
      goalFilters: '',
      otherFilters: '',
      mobileFilter: false,
    };
  },

  computed: mapState({
    shopifyProducts: (state) => state.shopifyProducts,
    overallHealthFilter: (state) => state.categories.overallHealth,
    healthyAgingFilter: (state) => state.categories.healthyAging,
    shapedProducts: (state) => state.shapedProducts,
  }),

  methods: {
    openMobileFilter(bool, e) {
      e.stopPropagation()
      // this.mobileFilter = bool; 
      this.mobileFilter = !this.mobileFilter
    },
    handleClick(cta) {
      if(cta == "compare") {
        window.location.href = this.settings.compare_plans_cta_url
      }

      if(cta == "gift") {
        window.location.href = this.settings.gift_card_cta_url
      }
    },
    setAllFilters () {
      let defaultFilter = this.settings.defaultFilter.trim()
      let goalFilters = this.settings.goalFilters.replace(", ", ",").split(',')

      this.goalFilters = goalFilters;

      if( this.settings.otherFilters ){
        let otherFilters = this.settings.otherFilters.replace(", ", ",").split(',')
        this.otherFilters = otherFilters; 
      }

      let indexOfDefault = goalFilters.indexOf(defaultFilter);
      if(indexOfDefault > -1 ){
        this.activeIndex = indexOfDefault
        if( defaultFilter == "All" ){
          this.selectedFilter = ''
        } else {
          this.selectedFilter = defaultFilter
        }
        this.setFilteredProducts()
      }
    },
    setBiomarkers() {
      let biomarkerCategories = []

      if(this.allBiomarkers){
        this.allBiomarkers.forEach(marker => {
        if (marker.markers) {
          let markersArray = marker.markers[0].split('|')
          let biomarker = {
            header: marker.title,
            markers: markersArray,
          }
          biomarkerCategories.push(biomarker)
          }
      })
      }
    },
     setProductIcons() {
      let productIconsCategories = []

      if(this.allProductsIcons){
        this.allProducts.forEach(icon => {
        if (icon.iconss) {
          let iconsArray = icon.icons[0].split('|')
          let icon = {
            header: icon.title,
            markers: iconsArray,
          }
          productIconsCategories.push(icon)
          }
      })
      }
    },
    setActive(selected, index) { 
      this.activeIndex = index;
      this.selectedFilter = selected
      this.setFilter(selected)
    },
    setFilter(selected) {
      if(selected.trim() == "All") {
        this.selectedFilter = ''
      } else this.selectedFilter = selected

      if(selected.trim() == "Price") {
         let filteredByPrice = this.shapedProducts.sort((a, b) => parseFloat(b.price - a.price))
         return this.filteredProductSet = filteredByPrice
      } else this.setFilteredProducts()
    },
    setFilteredProducts() {
      let allProducts = this.shapedProducts
      let filteredProducts = []

      if ( allProducts ){
        allProducts.forEach(product => {
          let cats = product.categories

          if (cats){
            cats.forEach(cat => {
              let catString = cat.trim().toLowerCase()
              let filterString = this.selectedFilter.trim().toLowerCase()

              if(catString == filterString) {
                filteredProducts.push(product)
              }
            })
          }
        })
      }

      this.filteredProductSet = filteredProducts;

    },
  },
  created() {
    let theProducts = this.productsWithBiomarkers

    this.$store.commit("setAllProducts", theProducts)
  },
  mounted() {
    this.$store.dispatch("setProductData")
    this.setAllFilters()
    this.setBiomarkers()
    this.setProductIcons()
  },
};
</script>

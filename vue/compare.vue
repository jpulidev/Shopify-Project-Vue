<template>
  <div class="compare-products">
    <div class="compare-products-desktop">
      <div class="table-header">
        <div v-if="comparisonTablePage == 1" @click="changeProductSet('prev')" class="product-slider-arrow product-slider-arrow__prev gray-arrow "> 
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z"/></svg>
        </div>
        <div v-if="comparisonTablePage == 2" @click="changeProductSet('prev')" class="product-slider-arrow product-slider-arrow__prev blue-arrow"> 
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z"/></svg>
        </div>
        <compare-products v-if="productSet" :passedProductSet="productSet" :addToCartText="addToCartText" :selectOptionsText="selectOptionsText" :viewDetailsLink="viewDetailsLink" :showReviews="showReviews" />
        <div v-if="comparisonTablePage == 1" @click="changeProductSet('next')" class="product-slider-arrow product-slider-arrow__next  blue-arrow">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M7.33 24l-2.83-2.829 9.339-9.175-9.339-9.167 2.83-2.829 12.17 11.996z"/></svg>
        </div>
        <div v-if="comparisonTablePage == 2" @click="changeProductSet('prev')" class="product-slider-arrow product-slider-arrow__next  gray-arrow"> 
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M7.33 24l-2.83-2.829 9.339-9.175-9.339-9.167 2.83-2.829 12.17 11.996z"/></svg>
        </div>
      </div>
      <div class="compare-tables-lower">
        <top-table v-if="productSet" :passedProductSet="productSet" :showReviews="showReviews" />
        <hr class="solid">
        <energy-metabolism v-if="productSet" />
        <hr class="solid">
        <bone-muscle v-if="productSet" />
        <hr class="solid">
        <strength-endurance v-if="productSet" />
        <hr class="solid">
        <cognition v-if="productSet" />
        <hr class="solid">
        <oxygen-blood v-if="productSet" />
        <hr class="solid">
        <electrolytes-fluid v-if="productSet" />
        <hr class="solid">
        <inflammation v-if="productSet" />
        <hr class="solid">
        <liver-toxicity v-if="productSet" />
        <hr class="solid">
      </div>
    </div>

    <div class="compare-products-mobile">
      <div class="compare-column column-1">
        <compare-mobile v-if="mobileProductOne" :mobileProduct="this.mobileProductOne" :product="this.mobileProductOne" :key="mobileProductOne[0].title" :addToCartText="addToCartText" :selectOptionsText="selectOptionsText" :viewDetailsLink="viewDetailsLink" />
      </div>
      <div class="compare-column column-2">
        <compare-mobile v-if="mobileProductTwo" :mobileProduct="this.mobileProductTwo" :product="this.mobileProductTwo" :key="mobileProductTwo[0].title" :addToCartText="addToCartText" :selectOptionsText="selectOptionsText" :viewDetailsLink="viewDetailsLink" />
      </div>
      <hr class="solid">
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import CompareProducts from './compareTables/products'
import TopTable from './compareTables/top-table'
import EnergyMetabolism from './compareTables/energy-metabolism'
import StrengthEndurance from './compareTables/strength-endurance'
import BoneMuscle from './compareTables/bone-muscle'
import Cognition from './compareTables/cognition'
import OxygenBlood from './compareTables/oxygen-blood'
import ElectrolytesFluid from './compareTables/electrolytes-fluid'
import Inflammation from './compareTables/inflammation'
import LiverToxicity from './compareTables/liver-toxicity'
import CompareMobile from './compare-mobile'


export default {
name: 'compare',
components: {
      'compare-products': CompareProducts,
      'top-table': TopTable,
      'energy-metabolism': EnergyMetabolism,
      'strength-endurance': StrengthEndurance, 
      'bone-muscle': BoneMuscle,
      'cognition': Cognition,
      'oxygen-blood': OxygenBlood,
      'electrolytes-fluid': ElectrolytesFluid,
      'inflammation': Inflammation,
      'liver-toxicity': LiverToxicity,
      'compare-mobile': CompareMobile
  },
  props: {
    settings: Object,
    blocks: Array,
    allProducts: Array,
    productsWithBiomarkers: Array,
    allBiomarkers: Array,
    addToCartText: String,
    selectOptionsText: String,
    viewDetailsLink: String,
    showReviews: Boolean
  },
  data() {
    return {
      selectedFilter: '',
      activeIndex: '',
      mobileProduct1: '',
      mobileProduct2: '',
    };
  },

  computed: mapState({
    kbProducts: (state) => state.kbProducts,
    shopifyProducts: (state) => state.shopifyProducts,
    shapedProducts: (state) => state.shapedProducts,
    comparisonTablePage: (state) => state.comparisonTablePage,
    comparisonTableProducts: (state) => state.comparisonTableProducts,
    productSet: (state) => state.comparisonTableActiveSet,
    mobileProductOne: (state) => state.mobileProductOne,
    mobileProductTwo: (state) => state.mobileProductTwo
  }),

  methods: {
    // setBiomarkers() {
    //   let biomarkerCategories = []
    //   this.allBiomarkers.forEach(marker => {
    //     if (marker.markers) {
    //       let markersArray = marker.markers[0].split('|')

    //       let biomarker = {
    //         header: marker.title,
    //         markers: markersArray,
    //       }
    //       biomarkerCategories.push(biomarker)
    //     }
    //   })
    // },
    changeProductSet(direction) {
      if(direction == 'next') {
        this.$store.commit('setComparisonTablePage', 2)
        this.$store.dispatch('setProductSlice', 2)
      }
      if(direction == 'prev') {
        this.$store.commit('setComparisonTablePage', 1)
        this.$store.dispatch('setProductSlice', 1)
      }
    },
    changeProductMobile(column) {
      if(column == 1) {
        this.$store.commit('setMobileProductOne', [this.mobileProduct1])
      }
      if(column == 2) {
        this.$store.commit('setMobileProductTwo', [this.mobileProduct2])
      }
    }
  },
  created() {
    let theProducts = this.productsWithBiomarkers
    this.$store.commit("setAllProducts", theProducts)
  },
  mounted() {
    this.$store.dispatch("setProductData")
    // this.setBiomarkers()
    this.mobileProduct1 = this.comparisonTableProducts[0]
    this.mobileProduct2 = this.comparisonTableProducts[1]
    this.$store.commit('setMobileProductOne', [this.mobileProduct1])
    this.$store.commit('setMobileProductTwo', [this.mobileProduct2])
  },
  updated() {
  }
};
</script>

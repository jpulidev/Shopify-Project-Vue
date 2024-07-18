<template>
  <div class="compare-products pdp-compare-table">
    <div class="compare-products-desktop">
      <div class="table-header">
        <compare-products v-if="pdpCompareSet" :passedProductSet="pdpCompareSet" :currentProduct="product.id" :addToCartText="addToCartText" :selectOptionsText="selectOptionsText" :viewDetailsLink="viewDetailsLink"  />
      </div>
      <div class="compare-tables-lower">
        <top-table v-if="pdpCompareSet" :passedProductSet="pdpCompareSet" :currentProduct="product.id" :showReviews="showReviews"  />
      </div>
    </div>
   <!-- /*/ MOBILE /*/   -->

    <div class="compare-products-mobile">
      <div class="compare-column column-1">
        <compare-pdp-mobile v-if="mobileProductOne" :mobileProduct="this.mobileProductOne" :product="this.mobileProductOne" :addToCartText="addToCartText" :selectOptionsText="selectOptionsText" :viewDetailsLink="viewDetailsLink" />
      </div>
      <div class="compare-column column-2">
        <compare-pdp-mobile v-if="mobileProductTwo" :mobileProduct="this.mobileProductTwo" :product="this.mobileProductTwo" :addToCartText="addToCartText" :selectOptionsText="selectOptionsText" :viewDetailsLink="viewDetailsLink" />
      </div>
    </div>

  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import CompareProducts from './compareTables/products'
import TopTable from './compareTables/top-table'
import ComparePDPMobile from './compare-pdp-mobile'

export default {
name: 'compare-products-pdp',
components: {
    'compare-products': CompareProducts,
    'top-table': TopTable,
    'compare-pdp-mobile': ComparePDPMobile,
  },
  props: {
    product: Object,
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
      mobileProduct1: '',
      mobileProduct2: '',
    };
  },

  computed: mapState({
    shopifyProducts: (state) => state.shopifyProducts,
    shapedProducts: (state) => state.shapedProducts,
    comparisonTablePage: (state) => state.comparisonTablePage,
    comparisonTableProducts: (state) => state.comparisonTableProducts,
    productSet: (state) => state.comparisonTableActiveSet,
    mobileProductOne: (state) => state.mobileProductOne,
    mobileProductTwo: (state) => state.mobileProductTwo,
    pdpCompareSet: (state) => state.pdpCompareSet
  }),

  methods: {
    // changeProductSet(direction) {
    //   if(direction == 'next') {
    //     this.$store.commit('setComparisonTablePage', 2)
    //     this.$store.dispatch('setProductSlice', 2)
    //   }
    //   if(direction == 'prev') {
    //     this.$store.commit('setComparisonTablePage', 1)
    //     this.$store.dispatch('setProductSlice', 1)
    //   }
    // },
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
    this.mobileProduct1 = this.comparisonTableProducts[0]
    this.mobileProduct2 = this.comparisonTableProducts[1]
    this.$store.commit('setMobileProductOne', [this.mobileProduct1])
    this.$store.commit('setMobileProductTwo', [this.mobileProduct2])
  },
  beforeUpdate() {
  },
};
</script>
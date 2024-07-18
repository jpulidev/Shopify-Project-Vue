<template>
  <div>
      <table class="comparison-table-desktop">
        <tr v-if="showReviews == 'true' ">
          <th>Reviews</th>
          <td v-if="getCurrentProduct[0]">
            <div class="list-view-item" data-product-stars>
              <!-- TrustBox widget - Product Mini Multisource -->
              <div class="trustpilot-widget" data-locale="en-US" data-template-id="577258fb31f02306e4e3aaf9" data-businessunit-id="5df96c4c7890b800016789c7" data-style-height="24px" data-style-width="100%" data-theme="light" data-tags="SelectedReview" :data-sku="getCurrentProduct[0].variants[0].sku" data-star-color="#0AA9FF" data-font-family="Open Sans" data-text-color="#232D37" data-no-reviews="show" data-scroll-to-list="false">
              </div>
              <!-- End TrustBox widget -->
            </div>
          </td>

          <td v-for="(product,i) in sortedTable" :key="i">
            <div class="list-view-item" data-product-stars>
              <!-- TrustBox widget - Product Mini Multisource -->
              <div class="trustpilot-widget" data-locale="en-US" data-template-id="577258fb31f02306e4e3aaf9" data-businessunit-id="5df96c4c7890b800016789c7" data-style-height="24px" data-style-width="100%" data-theme="light" data-tags="SelectedReview" :data-sku="product.variants[0].sku" data-star-color="#0AA9FF" data-font-family="Open Sans" data-text-color="#232D37" data-no-reviews="show" data-scroll-to-list="false">
              </div>
              <!-- End TrustBox widget -->
            </div>
          </td>
        </tr>
        <tr>
          <th>Includes blood test</th>
          <td v-if="getCurrentProduct[0]">
            <div v-if="getCurrentProduct[0].bloodTestIncluded" class="top-table-checkmark"> 
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M9 21.035l-9-8.638 2.791-2.87 6.156 5.874 12.21-12.436 2.843 2.817z"/></svg>
            </div>
            <!-- <div v-if="product.dnaTestIncluded" class="top-table-checkmark"> 
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M9 21.035l-9-8.638 2.791-2.87 6.156 5.874 12.21-12.436 2.843 2.817z"/></svg>
            </div> -->
            <!-- && !product.dnaTestIncluded -->
            <div v-if="!getCurrentProduct[0].bloodTestIncluded" class="top-table-x">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M23 20.168l-8.185-8.187 8.185-8.174-2.832-2.807-8.182 8.179-8.176-8.179-2.81 2.81 8.186 8.196-8.186 8.184 2.81 2.81 8.203-8.192 8.18 8.192z"/></svg>
            </div>
          </td>

          <td v-for="(product,i) in sortedTable" :key="i">
            <div v-if="product.bloodTestIncluded" class="top-table-checkmark"> 
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M9 21.035l-9-8.638 2.791-2.87 6.156 5.874 12.21-12.436 2.843 2.817z"/></svg>
            </div>
            <!-- <div v-if="product.dnaTestIncluded" class="top-table-checkmark"> 
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M9 21.035l-9-8.638 2.791-2.87 6.156 5.874 12.21-12.436 2.843 2.817z"/></svg>
            </div> -->
            <!-- && !product.dnaTestIncluded -->
            <div v-if="!product.bloodTestIncluded" class="top-table-x">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M23 20.168l-8.185-8.187 8.185-8.174-2.832-2.807-8.182 8.179-8.176-8.179-2.81 2.81 8.186 8.196-8.186 8.184 2.81 2.81 8.203-8.192 8.18 8.192z"/></svg>
            </div>
          </td>
        </tr>
        <tr>
          <th>Upload past results</th>
          <td v-if="getCurrentProduct[0]"> 
            <div v-if="getCurrentProduct[0].uploadPastResults" class="top-table-checkmark"> 
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M9 21.035l-9-8.638 2.791-2.87 6.156 5.874 12.21-12.436 2.843 2.817z"/></svg>
            </div>
            <div v-else class="top-table-x">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M23 20.168l-8.185-8.187 8.185-8.174-2.832-2.807-8.182 8.179-8.176-8.179-2.81 2.81 8.186 8.196-8.186 8.184 2.81 2.81 8.203-8.192 8.18 8.192z"/></svg>
            </div>
          </td>

          <td v-for="(product,i) in sortedTable" :key="i"> 
            <div v-if="product.uploadPastResults" class="top-table-checkmark"> 
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M9 21.035l-9-8.638 2.791-2.87 6.156 5.874 12.21-12.436 2.843 2.817z"/></svg>
            </div>
            <div v-else class="top-table-x">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M23 20.168l-8.185-8.187 8.185-8.174-2.832-2.807-8.182 8.179-8.176-8.179-2.81 2.81 8.186 8.196-8.186 8.184 2.81 2.81 8.203-8.192 8.18 8.192z"/></svg>
            </div>
          </td>
        </tr>
        <tr>
          <th>Availability</th>
          <td v-if="getCurrentProduct[0]"> 
            <p v-if="getCurrentProduct[0].availability"> {{ getCurrentProduct[0].availability }} </p>
          </td>

          <td v-for="(product,i) in sortedTable" :key="i"> 
            <p v-if="product.availability"> {{ product.availability }} </p>
          </td>
        </tr>
        <tr>
          <th>Biomarkers</th>
          <td v-if="getCurrentProduct[0]"> {{ getCurrentProduct[0].biomarkerCount }} </td>
          <td v-for="(product,i) in sortedTable" :key="i"> {{ product.biomarkerCount }} </td>
        </tr>
      </table>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
name: 'top-table-desktop',
// components: {
//   },
  props: {
    settings: Object,
    blocks: Array,
    allProducts: Array,
    productsWithBiomarkers: Array,
    allBiomarkers: Array,
    passedProductSet: Array,
    currentProduct: Number,
    showReviews: Boolean
  },
  data() {
    return {
      selectedFilter: '',
      activeIndex: '',
      biomarkerDataSet: false,
    };
  },

  computed: {
    getCurrentProduct() {
      let getCurrentProduct = this.passedProductSet.filter( obj => { return obj.id == this.currentProduct });
      return getCurrentProduct
    },
    sortedTable() {
      let sortedTable = this.passedProductSet.filter( obj => { return obj.id !== this.currentProduct });
      return sortedTable
    },
    shopifyProducts() {
      return this.$store.state.shopifyProducts
    },
    shapedProducts() {
      return this.$store.state.shapedProducts
    },
    productSet() {
      return this.$store.state.productSet
    },
    comparisonTableProducts() {
      return this.$store.state.comparisonTableProducts
    },
  },
  methods: {
  },
  created() {    
  },
  mounted() {
  },
  beforeUpdate() {
  },
  updated() {
  }
};
</script>

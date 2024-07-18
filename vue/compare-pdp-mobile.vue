<template>
  <div class="compare-products compare-mobile">
      <select v-on:change="changeProductMobile()" v-model="mobileProduct" >
        <option disabled value="">Select plan</option>
        <option  v-for="(product, i) in comparisonTableProducts" :key="i" :value="product">
          <div>
          {{ product.title }}
          </div>
        </option>
      </select>

    <table class="comparison-table-mobile comparison-table-mobile-main">
      <compare-products v-if="productSet" :productSet="this.productSet" :addToCartText="addToCartText" :selectOptionsText="selectOptionsText" :viewDetailsLink="viewDetailsLink"/>
      <!-- <tr>
        <th>Reviews</th>
        <td v-for="(product,i) in productSet" :key="i"> {{product.productStarRating}} </td>
      </tr> -->
      <div class="top-compare-table">
      <tr>
        <td v-for="(product,i) in productSet" :key="i"><div>{{ product.bloodTestIncluded ? "Includes blood test" : "" }}</div></td>
      </tr>
      <!-- <tr>
        <td v-for="(product,i) in productSet" :key="i"><div>{{ product.dnaTestIncluded ? "Includes DNA test" : "" }}</div></td>
      </tr> -->
      <tr>
        <td v-for="(product,i) in productSet" :key="i"><div>{{ product.uploadPastResults ? "Upload past results" : "" }}</div></td>
      </tr>
      <tr>
        <td v-for="(product,i) in productSet" :key="i"><div>{{ product.availability }}</div></td>
      </tr>
      <tr>
        <td v-for="(product,i) in productSet" :key="i"><div>{{ product.biomarkerCount }}</div></td>
      </tr>
      </div>
    </table>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import CompareProducts from './compareTablesMobile/products'

export default {
name: 'compare-pdp-mobile',
components: {
    'compare-products': CompareProducts,
  },
  props: {
    settings: Object,
    blocks: Array,
    allProducts: Array,
    productsWithBiomarkers: Array,
    allBiomarkers: Array,
    product: Array,
    addToCartText: String,
    selectOptionsText: String,
    viewDetailsLink: String
  },
  data() {
    return {
      selectedFilter: '',
      activeIndex: '',
      productSet: '',
      mobileProduct: '',
    };
  },

  computed: mapState({
    kbProducts: (state) => state.kbProducts,
    shopifyProducts: (state) => state.shopifyProducts,
    shapedProducts: (state) => state.shapedProducts,
    comparisonTablePage: (state) => state.comparisonTablePage,
    comparisonTableProducts: (state) => state.comparisonTableProducts,
    mobileProductOne: (state) => state.mobileProductOne
  }),

  methods: {
    changeProductMobile(column) {
      this.productSet = [this.mobileProduct]
    }
  },
  created() {
    this.productSet = this.product
  },
  mounted() {
  },
  updated() {
  }
};
</script>

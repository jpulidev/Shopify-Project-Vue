<template>
  <div class="compare-products-slider">
    <div id="shop-all-product-container">
      <div v-if="getCurrentProduct[0]">
        <product-card :product="getCurrentProduct[0]" :addToCartText="addToCartText" :selectOptionsText="selectOptionsText" :viewDetailsLink="viewDetailsLink" :showReviews="showReviews" />
      </div>
      <div v-for="product in sortedTable" :key="product.id"> 
        <product-card :product="product" :addToCartText="addToCartText" :selectOptionsText="selectOptionsText" :viewDetailsLink="viewDetailsLink" :showReviews="showReviews" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import productCard from '../product-card-compare-tables'

export default {
name: 'compare-products',
components: {
    'product-card': productCard,
  },
  props: {
    settings: Object,
    blocks: Array,
    allProducts: Array, 
    productsWithBiomarkers: Array,
    allBiomarkers: Array,
    passedProductSet: Array,
    currentProduct: Number,
    addToCartText: String,
    selectOptionsText: String,
    viewDetailsLink: String,
    showReviews: Boolean
  },
  data() {
    return {
      selectedFilter: '',
      activeIndex: '',
      page: 0,
      addToCartBtn: false,
      selectOptionsBtn: false
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
  },
  methods: {
    addToCart(product) {
      let formattedProducts = [];
      let productForCart = {
        id: product.variantId,
        quantity: 1,
        properties: {},
      };
      formattedProducts.push(productForCart);

      fetch("/cart/add.js", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          "items": formattedProducts,
        }),
      }).then((cart) => {
        cart.json().then((body) => {
          window.location.href = "/cart";
           gtag("send", {
               hitType: "event",
               eventCategory: "Added to Cart",
               eventAction: "click",
               eventLabel: "{{ product.title }}"
           });
        });
      });
    },
    goToPDP(productUrl) {
      window.location.href = productUrl;
    },
  },
  created() {
  },
  mounted() {
    // this.setBiomarkerData()
  },
  beforeUpdate() {
    // this.setBiomarkerData()
  },
};
</script>

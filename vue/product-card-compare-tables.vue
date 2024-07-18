<template>
  <div class="product-card">
    <div
      v-if="product.imageUrl"
      :style="{ 'background-image': 'url(' + product.imageUrl + ')' }"
      class="product-image"
      @click="goToPDP(product.productUrl)"
    >
    </div>
    <span v-if="product.productFlag == 'Most Popular'" class="most-popular-upsell most-popular-upsell-text show-most-popular ">  
      </span>
      <span v-if="product.productFlag == 'New'" class="most-popular-upsell most-popular-upsell-text show-most-popular product-new-flag">  
      </span>
    <h4 class="product-card-title">{{ product.title }}</h4>
    <h4 v-if="product.variants[0].price"> ${{ product.variants[0].price.toString().slice(0, -2) }} </h4>
    <div class="product-text-content">
    </div>
        <button v-if="addToCartBtn" @click="addToCart(product)" class="button button--primary">
          {{ addToCartText }}
        </button>
        <button v-if="selectOptionsBtn" @click="goToPDP(product.productUrl)" class="button button--primary">
            {{ selectOptionsText }}
        </button>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";

export default {
  name: "product-card",
  props: {
    product: Object,
    addToCartText: String,
    selectOptionsText: String,
    viewDetailsLink: String
  },
  data() {
    return {
      selected: "",
      addToCartBtn: false,
      selectOptionsBtn: false
    };
  },

  computed: mapState({
    shapedProducts: (state) => state.shapedProducts,
  }),
  methods: {
    setActive(selected, index) {
      this.activeIndex = index;
      this.selectedFilter = selected;
      this.setFilter(selected);
    },
    goToPDP(productUrl) {
      window.location.href = productUrl;
    },
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
  },
  created() {
    if (this.product.variants.length > 1) {
      this.selectOptionsBtn = true;
    } else if (this.product.variants.length == 1) {
      this.addToCartBtn = true;
    }
  },
  mounted() {},
};
</script>

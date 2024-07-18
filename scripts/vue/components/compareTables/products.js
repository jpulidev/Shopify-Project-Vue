//
//
//
//
//
//
//
//
//
//
//
//
//

import { mapState, mapMutations } from 'vuex';
import productCard from '../product-card-compare-tables';

var __script__ = {
  name: 'compare-products',
  components: {
    'product-card': productCard
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
      let getCurrentProduct = this.passedProductSet.filter(obj => {
        return obj.id == this.currentProduct;
      });
      return getCurrentProduct;
    },
    sortedTable() {
      let sortedTable = this.passedProductSet.filter(obj => {
        return obj.id !== this.currentProduct;
      });
      return sortedTable;
    },
    shopifyProducts() {
      return this.$store.state.shopifyProducts;
    },
    shapedProducts() {
      return this.$store.state.shapedProducts;
    },
    productSet() {
      return this.$store.state.productSet;
    }
  },
  methods: {
    addToCart(product) {
      let formattedProducts = [];
      let productForCart = {
        id: product.variantId,
        quantity: 1,
        properties: {}
      };
      formattedProducts.push(productForCart);

      fetch("/cart/add.js", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          "items": formattedProducts
        })
      }).then(cart => {
        cart.json().then(body => {
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
    }
  },
  created() {},
  mounted() {
    // this.setBiomarkerData()
  },
  beforeUpdate() {
    // this.setBiomarkerData()
  }
};

var render = function () {
  var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;
  return _c('div', {
    staticClass: "compare-products-slider"
  }, [_c('div', {
    attrs: {
      "id": "shop-all-product-container"
    }
  }, [_vm.getCurrentProduct[0] ? _c('div', [_c('product-card', {
    attrs: {
      "product": _vm.getCurrentProduct[0],
      "addToCartText": _vm.addToCartText,
      "selectOptionsText": _vm.selectOptionsText,
      "viewDetailsLink": _vm.viewDetailsLink,
      "showReviews": _vm.showReviews
    }
  })], 1) : _vm._e(), _vm._v(" "), _vm._l(_vm.sortedTable, function (product) {
    return _c('div', {
      key: product.id
    }, [_c('product-card', {
      attrs: {
        "product": product,
        "addToCartText": _vm.addToCartText,
        "selectOptionsText": _vm.selectOptionsText,
        "viewDetailsLink": _vm.viewDetailsLink,
        "showReviews": _vm.showReviews
      }
    })], 1);
  })], 2)]);
};
var staticRenderFns = [];
var __template__ = { render: render, staticRenderFns: staticRenderFns };

export default Object.assign({}, __script__, __template__);
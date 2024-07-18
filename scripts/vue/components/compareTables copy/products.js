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
// import CompareColumn from './compare-column'
// import EnergyMetabolism from './energy-metabolism.vue'

var __script__ = {
  name: 'compare-products',
  components: {},
  props: {
    settings: Object,
    blocks: Array,
    allProducts: Array,
    productsWithBiomarkers: Array,
    allBiomarkers: Array
  },
  data() {
    return {
      selectedFilter: '',
      activeIndex: '',
      page: 0
    };
  },

  computed: mapState({
    kbProducts: state => state.kbProducts,
    shopifyProducts: state => state.shopifyProducts,
    shapedProducts: state => state.shapedProducts,
    productSet: state => state.comparisonTableActiveSet
  }),

  methods: {},
  created() {},
  mounted() {},
  beforeUpdate() {
    this.setBiomarkerData();
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
  }, _vm._l(_vm.productSet, function (product) {
    return _c('div', {
      key: product.id,
      staticClass: "product-card"
    }, [_c('div', {
      staticClass: "product-image"
    }), _vm._v(" "), _c('h4', {
      staticClass: "product-card-title"
    }, [_vm._v(_vm._s(product.title) + " ")]), _vm._v(" "), _c('h4', [_vm._v(" $" + _vm._s(product.price.toString().slice(0, -2)) + " ")]), _vm._v(" "), _c('button', {
      staticClass: "product-card-cart-btn"
    }, [_vm._v(" Add to cart ")])]);
  }), 0)]);
};
var staticRenderFns = [];
var __template__ = { render: render, staticRenderFns: staticRenderFns };

export default Object.assign({}, __script__, __template__);
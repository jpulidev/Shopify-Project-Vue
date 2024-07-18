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
import CompareProducts from './compareTables/products';
import TopTable from './compareTables/top-table';
import ComparePDPMobile from './compare-pdp-mobile';

var __script__ = {
  name: 'compare-products-pdp',
  components: {
    'compare-products': CompareProducts,
    'top-table': TopTable,
    'compare-pdp-mobile': ComparePDPMobile
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
      mobileProduct2: ''
    };
  },

  computed: mapState({
    shopifyProducts: state => state.shopifyProducts,
    shapedProducts: state => state.shapedProducts,
    comparisonTablePage: state => state.comparisonTablePage,
    comparisonTableProducts: state => state.comparisonTableProducts,
    productSet: state => state.comparisonTableActiveSet,
    mobileProductOne: state => state.mobileProductOne,
    mobileProductTwo: state => state.mobileProductTwo,
    pdpCompareSet: state => state.pdpCompareSet
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
      if (column == 1) {
        this.$store.commit('setMobileProductOne', [this.mobileProduct1]);
      }
      if (column == 2) {
        this.$store.commit('setMobileProductTwo', [this.mobileProduct2]);
      }
    }
  },
  created() {
    let theProducts = this.productsWithBiomarkers;
    this.$store.commit("setAllProducts", theProducts);
  },
  mounted() {
    this.$store.dispatch("setProductData");
    this.mobileProduct1 = this.comparisonTableProducts[0];
    this.mobileProduct2 = this.comparisonTableProducts[1];
    this.$store.commit('setMobileProductOne', [this.mobileProduct1]);
    this.$store.commit('setMobileProductTwo', [this.mobileProduct2]);
  },
  beforeUpdate() {}
};

var render = function () {
  var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;
  return _c('div', {
    staticClass: "compare-products pdp-compare-table"
  }, [_c('div', {
    staticClass: "compare-products-desktop"
  }, [_c('div', {
    staticClass: "table-header"
  }, [_vm.pdpCompareSet ? _c('compare-products', {
    attrs: {
      "passedProductSet": _vm.pdpCompareSet,
      "currentProduct": _vm.product.id,
      "addToCartText": _vm.addToCartText,
      "selectOptionsText": _vm.selectOptionsText,
      "viewDetailsLink": _vm.viewDetailsLink
    }
  }) : _vm._e()], 1), _vm._v(" "), _c('div', {
    staticClass: "compare-tables-lower"
  }, [_vm.pdpCompareSet ? _c('top-table', {
    attrs: {
      "passedProductSet": _vm.pdpCompareSet,
      "currentProduct": _vm.product.id,
      "showReviews": _vm.showReviews
    }
  }) : _vm._e()], 1)]), _vm._v(" "), _c('div', {
    staticClass: "compare-products-mobile"
  }, [_c('div', {
    staticClass: "compare-column column-1"
  }, [_vm.mobileProductOne ? _c('compare-pdp-mobile', {
    attrs: {
      "mobileProduct": this.mobileProductOne,
      "product": this.mobileProductOne,
      "addToCartText": _vm.addToCartText,
      "selectOptionsText": _vm.selectOptionsText,
      "viewDetailsLink": _vm.viewDetailsLink
    }
  }) : _vm._e()], 1), _vm._v(" "), _c('div', {
    staticClass: "compare-column column-2"
  }, [_vm.mobileProductTwo ? _c('compare-pdp-mobile', {
    attrs: {
      "mobileProduct": this.mobileProductTwo,
      "product": this.mobileProductTwo,
      "addToCartText": _vm.addToCartText,
      "selectOptionsText": _vm.selectOptionsText,
      "viewDetailsLink": _vm.viewDetailsLink
    }
  }) : _vm._e()], 1)])]);
};
var staticRenderFns = [];
var __template__ = { render: render, staticRenderFns: staticRenderFns };

export default Object.assign({}, __script__, __template__);
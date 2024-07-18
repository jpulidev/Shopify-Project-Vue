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
  name: 'compare',
  // components: {
  //       'compare-column': CompareColumn,
  //       'energy-metabolism': EnergyMetabolism
  //   },
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
      activeIndex: ''
    };
  },

  computed: mapState({
    kbProducts: state => state.kbProducts,
    shopifyProducts: state => state.shopifyProducts
  }),

  methods: {}
};

var render = function () {
  var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;
  return _c('div', [_c('table', {
    attrs: {
      "id": "energy-metabolism-desktop"
    }
  }, [_c('caption', [_vm._v("Energy and Metabolsim ")]), _vm._v(" "), _c('tr', [_c('th', [_vm._v("Glucose")]), _vm._v(" "), _vm._l(_vm.kbProducts, function (product, i) {
    return _c('td', {
      key: i
    });
  })], 2), _vm._v(" "), _c('tr', [_c('th', [_vm._v("Hemoglobin A1c (HbA1c)")]), _vm._v(" "), _vm._l(_vm.kbProducts, function (product, i) {
    return _c('td', {
      key: i
    });
  })], 2), _vm._v(" "), _c('tr', [_c('th', [_vm._v("Total Cholesterol")]), _vm._v(" "), _vm._l(_vm.kbProducts, function (product, i) {
    return _c('td', {
      key: i
    });
  })], 2), _vm._v(" "), _c('tr', [_c('th', [_vm._v("High-density Lipoprotein (HDL)")]), _vm._v(" "), _vm._l(_vm.kbProducts, function (product, i) {
    return _c('td', {
      key: i
    });
  })], 2), _vm._v(" "), _c('tr', [_c('th', [_vm._v("Low-density Lipoprotein (HDL)")]), _vm._v(" "), _vm._l(_vm.kbProducts, function (product, i) {
    return _c('td', {
      key: i
    });
  })], 2), _vm._v(" "), _c('tr', [_c('th', [_vm._v("Triglycerides")]), _vm._v(" "), _vm._l(_vm.kbProducts, function (product, i) {
    return _c('td', {
      key: i
    });
  })], 2)])]);
};
var staticRenderFns = [];
var __template__ = { render: render, staticRenderFns: staticRenderFns };

export default Object.assign({}, __script__, __template__);
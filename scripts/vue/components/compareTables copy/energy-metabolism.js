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
  name: 'energy-metabolism',
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
      activeIndex: '',
      biomarkerDataSet: false
    };
  },

  computed: mapState({
    shopifyProducts: state => state.shopifyProducts,
    shapedProducts: state => state.shapedProducts,
    comparisonTableProducts: state => state.comparisonTableProducts,
    productSet: state => state.comparisonTableActiveSet
  }),

  methods: {
    setBiomarkerData() {
      this.productSet.forEach(product => {
        let biomarkers = product.biomarkers;
        biomarkers.forEach(marker => {
          if (marker.title == "Metabolism & Weight Control") {
            let markerIndex = product.biomarkers.indexOf(marker);
            let markers = biomarkers[markerIndex].markers;
            markers.forEach(m => {
              let markerKey = m.replace(/ /g, "").toLowerCase();
              product[markerKey] = true;
              return product;
            });
          }
        });
      });
      this.biomarkerDataSet = true;
    },
    setProducts() {}
  },
  created() {},
  mounted() {
    this.setBiomarkerData();
  },
  beforeUpdate() {
    this.setBiomarkerData();
  },
  updated() {}
};

var render = function () {
  var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;
  return _c('div', [this.biomarkerDataSet ? _c('table', {
    staticClass: "comparison-table-desktop"
  }, [_c('caption', [_vm._v("Metabolism and Weight Control ")]), _vm._v(" "), _c('tr', [_c('th', [_vm._v("Glucose")]), _vm._v(" "), _vm._l(_vm.productSet, function (product, i) {
    return _c('td', {
      key: i
    }, [_vm._v("\n        " + _vm._s(product.glucose ? "✔️" : "") + "\n      ")]);
  })], 2), _vm._v(" "), _c('tr', [_c('th', [_vm._v("Hemoglobin A1c (HbA1c)")]), _vm._v(" "), _vm._l(_vm.productSet, function (product, i) {
    return _c('td', {
      key: i
    }, [_vm._v("\n        " + _vm._s(product.hba1c ? "✔️" : "") + "\n      ")]);
  })], 2), _vm._v(" "), _c('tr', [_c('th', [_vm._v("Total Cholesterol")]), _vm._v(" "), _vm._l(_vm.productSet, function (product, i) {
    return _c('td', {
      key: i
    }, [_vm._v("\n        " + _vm._s(product.totalcholesterol ? "✔️" : "") + "\n      ")]);
  })], 2), _vm._v(" "), _c('tr', [_c('th', [_vm._v("High-density Lipoprotein (HDL)")]), _vm._v(" "), _vm._l(_vm.productSet, function (product, i) {
    return _c('td', {
      key: i
    }, [_vm._v("\n        " + _vm._s(product.hdl ? "✔️" : "") + "\n      ")]);
  })], 2), _vm._v(" "), _c('tr', [_c('th', [_vm._v("Low-density Lipoprotein (LDL)")]), _vm._v(" "), _vm._l(_vm.productSet, function (product, i) {
    return _c('td', {
      key: i
    }, [_vm._v("\n        " + _vm._s(product.ldl ? "✔️" : "") + "\n      ")]);
  })], 2), _vm._v(" "), _c('tr', [_c('th', [_vm._v("Triglycerides")]), _vm._v(" "), _vm._l(_vm.productSet, function (product, i) {
    return _c('td', {
      key: i
    }, [_vm._v("\n        " + _vm._s(product.triglycerides ? "✔️" : "") + "\n      ")]);
  })], 2)]) : _vm._e()]);
};
var staticRenderFns = [];
var __template__ = { render: render, staticRenderFns: staticRenderFns };

export default Object.assign({}, __script__, __template__);
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
  name: 'inflammation',
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
    productSet: state => state.comparisonTableActiveSet
  }),

  methods: {
    setBiomarkerData() {
      this.productSet.forEach(product => {
        let biomarkers = product.biomarkers;
        biomarkers.forEach(marker => {
          if (marker.title == "Inflammation") {
            let markerIndex = product.biomarkers.indexOf(marker);
            let markers = biomarkers[markerIndex].markers;
            markers.forEach(m => {
              let markerKey = m.replace(/ /g, "").toLowerCase();
              if (markerKey.includes('(')) {
                let trimmedMarker = markerKey.slice(0, -9);
                let percentMarker = trimmedMarker.concat("percent");
                product[percentMarker] = true;
              } else product[markerKey] = true;
              return product;
            });
          }
        });
      });
      this.biomarkerDataSet = true;
    }
  },
  created() {},
  mounted() {
    this.setBiomarkerData();
  },
  beforeUpdate() {
    this.setBiomarkerData();
  }
};

var render = function () {
  var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;
  return _c('div', [this.biomarkerDataSet ? _c('table', {
    staticClass: "comparison-table-desktop"
  }, [_c('caption', [_vm._v("Inflammation ")]), _vm._v(" "), _c('tr', [_c('th', [_vm._v("Monocytes (percent)")]), _vm._v(" "), _vm._l(_vm.productSet, function (product, i) {
    return _c('td', {
      key: i
    }, [_vm._v("\n        " + _vm._s(product.monocytespercent ? "✔️" : "") + "\n      ")]);
  })], 2), _vm._v(" "), _c('tr', [_c('th', [_vm._v("Lymphocytes (percent)")]), _vm._v(" "), _vm._l(_vm.productSet, function (product, i) {
    return _c('td', {
      key: i
    }, [_vm._v("\n        " + _vm._s(product.Lymphocytespercent ? "✔️" : "") + "\n      ")]);
  })], 2), _vm._v(" "), _c('tr', [_c('th', [_vm._v("Basophils (percent)")]), _vm._v(" "), _vm._l(_vm.productSet, function (product, i) {
    return _c('td', {
      key: i
    }, [_vm._v("\n        " + _vm._s(product.basophilspercent ? "✔️" : "") + "\n      ")]);
  })], 2), _vm._v(" "), _c('tr', [_c('th', [_vm._v("Eosinophils (percent)")]), _vm._v(" "), _vm._l(_vm.productSet, function (product, i) {
    return _c('td', {
      key: i
    }, [_vm._v("\n        " + _vm._s(product.eosinophilspercent ? "✔️" : "") + "\n      ")]);
  })], 2), _vm._v(" "), _c('tr', [_c('th', [_vm._v("Neutrophils (percent)")]), _vm._v(" "), _vm._l(_vm.productSet, function (product, i) {
    return _c('td', {
      key: i
    }, [_vm._v("\n        " + _vm._s(product.neutrophilspercent ? "✔️" : "") + "\n      ")]);
  })], 2), _vm._v(" "), _c('tr', [_c('th', [_vm._v("Monocytes")]), _vm._v(" "), _vm._l(_vm.productSet, function (product, i) {
    return _c('td', {
      key: i
    }, [_vm._v("\n        " + _vm._s(product.monocytes ? "✔️" : "") + "\n      ")]);
  })], 2), _vm._v(" "), _c('tr', [_c('th', [_vm._v("Lymphocytes")]), _vm._v(" "), _vm._l(_vm.productSet, function (product, i) {
    return _c('td', {
      key: i
    }, [_vm._v("\n        " + _vm._s(product.lymphocytes ? "✔️" : "") + "\n      ")]);
  })], 2), _vm._v(" "), _c('tr', [_c('th', [_vm._v("Eosinophils")]), _vm._v(" "), _vm._l(_vm.productSet, function (product, i) {
    return _c('td', {
      key: i
    }, [_vm._v("\n        " + _vm._s(product.eosinophils ? "✔️" : "") + "\n      ")]);
  })], 2), _vm._v(" "), _c('tr', [_c('th', [_vm._v("Basophils")]), _vm._v(" "), _vm._l(_vm.productSet, function (product, i) {
    return _c('td', {
      key: i
    }, [_vm._v("\n        " + _vm._s(product.basophils ? "✔️" : "") + "\n      ")]);
  })], 2), _vm._v(" "), _c('tr', [_c('th', [_vm._v("Neutrophils")]), _vm._v(" "), _vm._l(_vm.productSet, function (product, i) {
    return _c('td', {
      key: i
    }, [_vm._v("\n        " + _vm._s(product.neutrophils ? "✔️" : "") + "\n      ")]);
  })], 2), _vm._v(" "), _c('tr', [_c('th', [_vm._v("hsCRP")]), _vm._v(" "), _vm._l(_vm.productSet, function (product, i) {
    return _c('td', {
      key: i
    }, [_vm._v("\n        " + _vm._s(product.hscrp ? "✔️" : "") + "\n      ")]);
  })], 2), _vm._v(" "), _c('tr', [_c('th', [_vm._v("White Blood Cells")]), _vm._v(" "), _vm._l(_vm.productSet, function (product, i) {
    return _c('td', {
      key: i
    }, [_vm._v("\n        " + _vm._s(product.whitebloodcells ? "✔️" : "") + "\n      ")]);
  })], 2)]) : _vm._e()]);
};
var staticRenderFns = [];
var __template__ = { render: render, staticRenderFns: staticRenderFns };

export default Object.assign({}, __script__, __template__);
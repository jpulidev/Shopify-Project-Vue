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
  name: 'oxygen-blood',
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
          if (marker.title == "Oxygen Transfer & Blood Function") {
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
  }, [_c('caption', [_vm._v("\"Oxygen Transfer and Blood Function\" ")]), _vm._v(" "), _c('tr', [_c('th', [_vm._v("MPV")]), _vm._v(" "), _vm._l(_vm.productSet, function (product, i) {
    return _c('td', {
      key: i
    }, [_vm._v("\n        " + _vm._s(product.mpv ? "✔️" : "") + "\n      ")]);
  })], 2), _vm._v(" "), _c('tr', [_c('th', [_vm._v("Platelets")]), _vm._v(" "), _vm._l(_vm.productSet, function (product, i) {
    return _c('td', {
      key: i
    }, [_vm._v("\n        " + _vm._s(product.platelets ? "✔️" : "") + "\n      ")]);
  })], 2), _vm._v(" "), _c('tr', [_c('th', [_vm._v("RDW")]), _vm._v(" "), _vm._l(_vm.productSet, function (product, i) {
    return _c('td', {
      key: i
    }, [_vm._v("\n        " + _vm._s(product.rdw ? "✔️" : "") + "\n      ")]);
  })], 2), _vm._v(" "), _c('tr', [_c('th', [_vm._v("MCHC")]), _vm._v(" "), _vm._l(_vm.productSet, function (product, i) {
    return _c('td', {
      key: i
    }, [_vm._v("\n        " + _vm._s(product.mchc ? "✔️" : "") + "\n      ")]);
  })], 2), _vm._v(" "), _c('tr', [_c('th', [_vm._v("MCH")]), _vm._v(" "), _vm._l(_vm.productSet, function (product, i) {
    return _c('td', {
      key: i
    }, [_vm._v("\n        " + _vm._s(product.mchc ? "✔️" : "") + "\n      ")]);
  })], 2), _vm._v(" "), _c('tr', [_c('th', [_vm._v("MCV")]), _vm._v(" "), _vm._l(_vm.productSet, function (product, i) {
    return _c('td', {
      key: i
    }, [_vm._v("\n        " + _vm._s(product.mcv ? "✔️" : "") + "\n      ")]);
  })], 2), _vm._v(" "), _c('tr', [_c('th', [_vm._v("Hematocrit")]), _vm._v(" "), _vm._l(_vm.productSet, function (product, i) {
    return _c('td', {
      key: i
    }, [_vm._v("\n        " + _vm._s(product.hematocrit ? "✔️" : "") + "\n      ")]);
  })], 2), _vm._v(" "), _c('tr', [_c('th', [_vm._v("Red Blood Cells")]), _vm._v(" "), _vm._l(_vm.productSet, function (product, i) {
    return _c('td', {
      key: i
    }, [_vm._v("\n        " + _vm._s(product.redbloodcells ? "✔️" : "") + "\n      ")]);
  })], 2), _vm._v(" "), _c('tr', [_c('th', [_vm._v("Transferrin Saturation")]), _vm._v(" "), _vm._l(_vm.productSet, function (product, i) {
    return _c('td', {
      key: i
    }, [_vm._v("\n        " + _vm._s(product.transferrinsaturation ? "✔️" : "") + "\n      ")]);
  })], 2), _vm._v(" "), _c('tr', [_c('th', [_vm._v("TIBC")]), _vm._v(" "), _vm._l(_vm.productSet, function (product, i) {
    return _c('td', {
      key: i
    }, [_vm._v("\n        " + _vm._s(product.tibc ? "✔️" : "") + "\n      ")]);
  })], 2), _vm._v(" "), _c('tr', [_c('th', [_vm._v("Iron")]), _vm._v(" "), _vm._l(_vm.productSet, function (product, i) {
    return _c('td', {
      key: i
    }, [_vm._v("\n        " + _vm._s(product.iron ? "✔️" : "") + "\n      ")]);
  })], 2), _vm._v(" "), _c('tr', [_c('th', [_vm._v("Hemoglobin")]), _vm._v(" "), _vm._l(_vm.productSet, function (product, i) {
    return _c('td', {
      key: i
    }, [_vm._v("\n        " + _vm._s(product.hemoglobin ? "✔️" : "") + "\n      ")]);
  })], 2), _vm._v(" "), _c('tr', [_c('th', [_vm._v("Ferritin")]), _vm._v(" "), _vm._l(_vm.productSet, function (product, i) {
    return _c('td', {
      key: i
    }, [_vm._v("\n        " + _vm._s(product.ferritin ? "✔️" : "") + "\n      ")]);
  })], 2)]) : _vm._e()]);
};
var staticRenderFns = [];
var __template__ = { render: render, staticRenderFns: staticRenderFns };

export default Object.assign({}, __script__, __template__);
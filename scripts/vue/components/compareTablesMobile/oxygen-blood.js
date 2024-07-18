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
//
//
//
//
//

import { mapState, mapMutations } from 'vuex';

var __script__ = {
  name: 'oxygen-blood',
  props: {
    settings: Object,
    blocks: Array,
    allProducts: Array,
    productsWithBiomarkers: Array,
    allBiomarkers: Array,
    productSet: Array
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
    shapedProducts: state => state.shapedProducts
  }),

  methods: {
    setBiomarkerData() {
      this.productSet.forEach(product => {
        let biomarkers = product.biomarkers;
        biomarkers.forEach(marker => {
          if (marker.title == "Oxygen Transfer & Blood Function") {
            let markerIndex = product.biomarkers.indexOf(marker);
            let markers = biomarkers[markerIndex].markers;
            if (markers.length) {
              markers.forEach(m => {
                let markerKey = m.replace(/ /g, "").toLowerCase();
                product[markerKey] = true;
                return product;
              });
              this.biomarkerDataSet = true;
            }
          }
        });
      });
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
  }, [_c('caption', [_vm._v("\"Oxygen Transfer & Blood Function\" ")]), _vm._v(" "), _c('tr', _vm._l(_vm.productSet, function (product, i) {
    return _c('td', {
      key: i
    }, [product.mpv ? _c('div', [_vm._v("\n          MPV\n         ")]) : _vm._e()]);
  }), 0), _vm._v(" "), _c('tr', _vm._l(_vm.productSet, function (product, i) {
    return _c('td', {
      key: i
    }, [product.platelets ? _c('div', [_vm._v("\n          Platelets\n         ")]) : _vm._e()]);
  }), 0), _vm._v(" "), _c('tr', _vm._l(_vm.productSet, function (product, i) {
    return _c('td', {
      key: i
    }, [product.rdw ? _c('div', [_vm._v("\n          RDW\n         ")]) : _vm._e()]);
  }), 0), _vm._v(" "), _c('tr', _vm._l(_vm.productSet, function (product, i) {
    return _c('td', {
      key: i
    }, [product.mchc ? _c('div', [_vm._v("\n          MCHC\n         ")]) : _vm._e()]);
  }), 0), _vm._v(" "), _c('tr', _vm._l(_vm.productSet, function (product, i) {
    return _c('td', {
      key: i
    }, [product.mcv ? _c('div', [_vm._v("\n          MCV\n         ")]) : _vm._e()]);
  }), 0), _vm._v(" "), _c('tr', _vm._l(_vm.productSet, function (product, i) {
    return _c('td', {
      key: i
    }, [product.hematocrit ? _c('div', [_vm._v("\n          Hematocrit\n         ")]) : _vm._e()]);
  }), 0), _vm._v(" "), _c('tr', _vm._l(_vm.productSet, function (product, i) {
    return _c('td', {
      key: i
    }, [product.redbloodcells ? _c('div', [_vm._v("\n          Red Blood Cells\n         ")]) : _vm._e()]);
  }), 0), _vm._v(" "), _c('tr', _vm._l(_vm.productSet, function (product, i) {
    return _c('td', {
      key: i
    }, [product.transferrinsaturation ? _c('div', [_vm._v("\n          Transferrin Saturation\n         ")]) : _vm._e()]);
  }), 0), _vm._v(" "), _c('tr', _vm._l(_vm.productSet, function (product, i) {
    return _c('td', {
      key: i
    }, [product.tibc ? _c('div', [_vm._v("\n          TIBC\n         ")]) : _vm._e()]);
  }), 0), _vm._v(" "), _c('tr', _vm._l(_vm.productSet, function (product, i) {
    return _c('td', {
      key: i
    }, [product.iron ? _c('div', [_vm._v("\n          Iron\n         ")]) : _vm._e()]);
  }), 0), _vm._v(" "), _c('tr', _vm._l(_vm.productSet, function (product, i) {
    return _c('td', {
      key: i
    }, [product.hemoglobin ? _c('div', [_vm._v("\n          Hemoglobin\n         ")]) : _vm._e()]);
  }), 0), _vm._v(" "), _c('tr', _vm._l(_vm.productSet, function (product, i) {
    return _c('td', {
      key: i
    }, [product.ferritin ? _c('div', [_vm._v("\n          Ferritin\n         ")]) : _vm._e()]);
  }), 0)]) : _vm._e()]);
};
var staticRenderFns = [];
var __template__ = { render: render, staticRenderFns: staticRenderFns };

export default Object.assign({}, __script__, __template__);
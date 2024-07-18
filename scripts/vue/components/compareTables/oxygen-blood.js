//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
  // components: {
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
  }, [_c('caption', [_vm._v("Oxygen Transfer & Blood Function")]), _vm._v(" "), _c('tr', [_c('th', [_vm._v("MPV")]), _vm._v(" "), _vm._l(_vm.productSet, function (product, i) {
    return _c('td', {
      key: i
    }, [product.mpv ? _c('div', {
      staticClass: "success-checkmark"
    }, [_c('svg', {
      attrs: {
        "xmlns": "http://www.w3.org/2000/svg",
        "width": "12",
        "height": "12",
        "viewBox": "0 3 25 30"
      }
    }, [_c('path', {
      attrs: {
        "d": "M9 21.035l-9-8.638 2.791-2.87 6.156 5.874 12.21-12.436 2.843 2.817z"
      }
    })])]) : _vm._e()]);
  })], 2), _vm._v(" "), _c('tr', [_c('th', [_vm._v("Platelets")]), _vm._v(" "), _vm._l(_vm.productSet, function (product, i) {
    return _c('td', {
      key: i
    }, [product.platelets ? _c('div', {
      staticClass: "success-checkmark"
    }, [_c('svg', {
      attrs: {
        "xmlns": "http://www.w3.org/2000/svg",
        "width": "12",
        "height": "12",
        "viewBox": "0 3 25 30"
      }
    }, [_c('path', {
      attrs: {
        "d": "M9 21.035l-9-8.638 2.791-2.87 6.156 5.874 12.21-12.436 2.843 2.817z"
      }
    })])]) : _vm._e()]);
  })], 2), _vm._v(" "), _c('tr', [_c('th', [_vm._v("RDW")]), _vm._v(" "), _vm._l(_vm.productSet, function (product, i) {
    return _c('td', {
      key: i
    }, [product.rdw ? _c('div', {
      staticClass: "success-checkmark"
    }, [_c('svg', {
      attrs: {
        "xmlns": "http://www.w3.org/2000/svg",
        "width": "12",
        "height": "12",
        "viewBox": "0 3 25 30"
      }
    }, [_c('path', {
      attrs: {
        "d": "M9 21.035l-9-8.638 2.791-2.87 6.156 5.874 12.21-12.436 2.843 2.817z"
      }
    })])]) : _vm._e()]);
  })], 2), _vm._v(" "), _c('tr', [_c('th', [_vm._v("MCHC")]), _vm._v(" "), _vm._l(_vm.productSet, function (product, i) {
    return _c('td', {
      key: i
    }, [product.mchc ? _c('div', {
      staticClass: "success-checkmark"
    }, [_c('svg', {
      attrs: {
        "xmlns": "http://www.w3.org/2000/svg",
        "width": "12",
        "height": "12",
        "viewBox": "0 3 25 30"
      }
    }, [_c('path', {
      attrs: {
        "d": "M9 21.035l-9-8.638 2.791-2.87 6.156 5.874 12.21-12.436 2.843 2.817z"
      }
    })])]) : _vm._e()]);
  })], 2), _vm._v(" "), _c('tr', [_c('th', [_vm._v("MCH")]), _vm._v(" "), _vm._l(_vm.productSet, function (product, i) {
    return _c('td', {
      key: i
    }, [product.mchc ? _c('div', {
      staticClass: "success-checkmark"
    }, [_c('svg', {
      attrs: {
        "xmlns": "http://www.w3.org/2000/svg",
        "width": "12",
        "height": "12",
        "viewBox": "0 3 25 30"
      }
    }, [_c('path', {
      attrs: {
        "d": "M9 21.035l-9-8.638 2.791-2.87 6.156 5.874 12.21-12.436 2.843 2.817z"
      }
    })])]) : _vm._e()]);
  })], 2), _vm._v(" "), _c('tr', [_c('th', [_vm._v("MCV")]), _vm._v(" "), _vm._l(_vm.productSet, function (product, i) {
    return _c('td', {
      key: i
    }, [product.mcv ? _c('div', {
      staticClass: "success-checkmark"
    }, [_c('svg', {
      attrs: {
        "xmlns": "http://www.w3.org/2000/svg",
        "width": "12",
        "height": "12",
        "viewBox": "0 3 25 30"
      }
    }, [_c('path', {
      attrs: {
        "d": "M9 21.035l-9-8.638 2.791-2.87 6.156 5.874 12.21-12.436 2.843 2.817z"
      }
    })])]) : _vm._e()]);
  })], 2), _vm._v(" "), _c('tr', [_c('th', [_vm._v("Hematocrit")]), _vm._v(" "), _vm._l(_vm.productSet, function (product, i) {
    return _c('td', {
      key: i
    }, [product.hematocrit ? _c('div', {
      staticClass: "success-checkmark"
    }, [_c('svg', {
      attrs: {
        "xmlns": "http://www.w3.org/2000/svg",
        "width": "12",
        "height": "12",
        "viewBox": "0 3 25 30"
      }
    }, [_c('path', {
      attrs: {
        "d": "M9 21.035l-9-8.638 2.791-2.87 6.156 5.874 12.21-12.436 2.843 2.817z"
      }
    })])]) : _vm._e()]);
  })], 2), _vm._v(" "), _c('tr', [_c('th', [_vm._v("Red Blood Cells")]), _vm._v(" "), _vm._l(_vm.productSet, function (product, i) {
    return _c('td', {
      key: i
    }, [product.redbloodcells ? _c('div', {
      staticClass: "success-checkmark"
    }, [_c('svg', {
      attrs: {
        "xmlns": "http://www.w3.org/2000/svg",
        "width": "12",
        "height": "12",
        "viewBox": "0 3 25 30"
      }
    }, [_c('path', {
      attrs: {
        "d": "M9 21.035l-9-8.638 2.791-2.87 6.156 5.874 12.21-12.436 2.843 2.817z"
      }
    })])]) : _vm._e()]);
  })], 2), _vm._v(" "), _c('tr', [_c('th', [_vm._v("Transferrin Saturation")]), _vm._v(" "), _vm._l(_vm.productSet, function (product, i) {
    return _c('td', {
      key: i
    }, [product.transferrinsaturation ? _c('div', {
      staticClass: "success-checkmark"
    }, [_c('svg', {
      attrs: {
        "xmlns": "http://www.w3.org/2000/svg",
        "width": "12",
        "height": "12",
        "viewBox": "0 3 25 30"
      }
    }, [_c('path', {
      attrs: {
        "d": "M9 21.035l-9-8.638 2.791-2.87 6.156 5.874 12.21-12.436 2.843 2.817z"
      }
    })])]) : _vm._e()]);
  })], 2), _vm._v(" "), _c('tr', [_c('th', [_vm._v("TIBC")]), _vm._v(" "), _vm._l(_vm.productSet, function (product, i) {
    return _c('td', {
      key: i
    }, [product.tibc ? _c('div', {
      staticClass: "success-checkmark"
    }, [_c('svg', {
      attrs: {
        "xmlns": "http://www.w3.org/2000/svg",
        "width": "12",
        "height": "12",
        "viewBox": "0 3 25 30"
      }
    }, [_c('path', {
      attrs: {
        "d": "M9 21.035l-9-8.638 2.791-2.87 6.156 5.874 12.21-12.436 2.843 2.817z"
      }
    })])]) : _vm._e()]);
  })], 2), _vm._v(" "), _c('tr', [_c('th', [_vm._v("Iron")]), _vm._v(" "), _vm._l(_vm.productSet, function (product, i) {
    return _c('td', {
      key: i
    }, [product.iron ? _c('div', {
      staticClass: "success-checkmark"
    }, [_c('svg', {
      attrs: {
        "xmlns": "http://www.w3.org/2000/svg",
        "width": "12",
        "height": "12",
        "viewBox": "0 3 25 30"
      }
    }, [_c('path', {
      attrs: {
        "d": "M9 21.035l-9-8.638 2.791-2.87 6.156 5.874 12.21-12.436 2.843 2.817z"
      }
    })])]) : _vm._e()]);
  })], 2), _vm._v(" "), _c('tr', [_c('th', [_vm._v("Hemoglobin")]), _vm._v(" "), _vm._l(_vm.productSet, function (product, i) {
    return _c('td', {
      key: i
    }, [product.hemoglobin ? _c('div', {
      staticClass: "success-checkmark"
    }, [_c('svg', {
      attrs: {
        "xmlns": "http://www.w3.org/2000/svg",
        "width": "12",
        "height": "12",
        "viewBox": "0 3 25 30"
      }
    }, [_c('path', {
      attrs: {
        "d": "M9 21.035l-9-8.638 2.791-2.87 6.156 5.874 12.21-12.436 2.843 2.817z"
      }
    })])]) : _vm._e()]);
  })], 2), _vm._v(" "), _c('tr', [_c('th', [_vm._v("Ferritin")]), _vm._v(" "), _vm._l(_vm.productSet, function (product, i) {
    return _c('td', {
      key: i
    }, [product.ferritin ? _c('div', {
      staticClass: "success-checkmark"
    }, [_c('svg', {
      attrs: {
        "xmlns": "http://www.w3.org/2000/svg",
        "width": "12",
        "height": "12",
        "viewBox": "0 3 25 30"
      }
    }, [_c('path', {
      attrs: {
        "d": "M9 21.035l-9-8.638 2.791-2.87 6.156 5.874 12.21-12.436 2.843 2.817z"
      }
    })])]) : _vm._e()]);
  })], 2)]) : _vm._e()]);
};
var staticRenderFns = [];
var __template__ = { render: render, staticRenderFns: staticRenderFns };

export default Object.assign({}, __script__, __template__);
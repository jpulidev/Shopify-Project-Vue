//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
  name: 'brain-body',
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
          if (marker.title == "Cognition") {
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
  }, [_c('caption', [_vm._v("Cognition ")]), _vm._v(" "), _c('tr', [_c('th', [_vm._v("Magnesium")]), _vm._v(" "), _vm._l(_vm.productSet, function (product, i) {
    return _c('td', {
      key: i
    }, [product.magnesium ? _c('div', {
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
  })], 2), _vm._v(" "), _c('tr', [_c('th', [_vm._v("RBC Magnesium")]), _vm._v(" "), _vm._l(_vm.productSet, function (product, i) {
    return _c('td', {
      key: i
    }, [product.rbcmagnesium ? _c('div', {
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
  })], 2), _vm._v(" "), _c('tr', [_c('th', [_vm._v("Folate")]), _vm._v(" "), _vm._l(_vm.productSet, function (product, i) {
    return _c('td', {
      key: i
    }, [product.folate ? _c('div', {
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
  })], 2), _vm._v(" "), _c('tr', [_c('th', [_vm._v("Vitamin B12")]), _vm._v(" "), _vm._l(_vm.productSet, function (product, i) {
    return _c('td', {
      key: i
    }, [product.vitaminb12 ? _c('div', {
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
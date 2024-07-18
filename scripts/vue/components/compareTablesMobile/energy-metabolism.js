//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
  name: 'energy-metabolism',
  // components: {
  //   },
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
    shapedProducts: state => state.shapedProducts,
    comparisonTableProducts: state => state.comparisonTableProducts
  }),

  methods: {
    setBiomarkerData() {
      this.productSet.forEach(product => {
        let biomarkers = product.biomarkers;
        biomarkers.forEach(marker => {
          if (marker.title == "Metabolism & Weight Control") {
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
    },
    setProducts() {}
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
  }, [_c('caption', [_vm._v("Metabolism & Weight Control ")]), _vm._v(" "), _c('tr', _vm._l(_vm.productSet, function (product, i) {
    return _c('td', {
      key: i
    }, [product.glucose ? _c('div', [_vm._v("\n          Glucose\n         ")]) : _vm._e()]);
  }), 0), _vm._v(" "), _c('tr', _vm._l(_vm.productSet, function (product, i) {
    return _c('td', {
      key: i
    }, [product.hba1c ? _c('div', [_vm._v("\n          HBA1C\n         ")]) : _vm._e()]);
  }), 0), _vm._v(" "), _c('tr', _vm._l(_vm.productSet, function (product, i) {
    return _c('td', {
      key: i
    }, [product.totalcholesterol ? _c('div', [_vm._v("\n          Total Cholesterol\n         ")]) : _vm._e()]);
  }), 0), _vm._v(" "), _c('tr', _vm._l(_vm.productSet, function (product, i) {
    return _c('td', {
      key: i
    }, [product.hdl ? _c('div', [_vm._v("\n          High-density Lipoprotein (HDL)\n         ")]) : _vm._e()]);
  }), 0), _vm._v(" "), _c('tr', _vm._l(_vm.productSet, function (product, i) {
    return _c('td', {
      key: i
    }, [product.ldl ? _c('div', [_vm._v("\n          Low-density Lipoprotein (LDL)\n         ")]) : _vm._e()]);
  }), 0), _vm._v(" "), _c('tr', _vm._l(_vm.productSet, function (product, i) {
    return _c('td', {
      key: i
    }, [product.triglycerides ? _c('div', [_vm._v("\n          Triglycerides\n         ")]) : _vm._e()]);
  }), 0)]) : _vm._e()]);
};
var staticRenderFns = [];
var __template__ = { render: render, staticRenderFns: staticRenderFns };

export default Object.assign({}, __script__, __template__);
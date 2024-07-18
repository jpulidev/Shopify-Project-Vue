//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
  name: 'strength-endurance',
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
    shapedProducts: state => state.shapedProducts
  }),

  methods: {
    setBiomarkerData() {
      this.productSet.forEach(product => {
        let biomarkers = product.biomarkers;
        biomarkers.forEach(marker => {
          if (marker.title == "Strength & Endurance") {
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
  }, [_c('caption', [_vm._v("Strength & Endurance ")]), _vm._v(" "), _c('tr', _vm._l(_vm.productSet, function (product, i) {
    return _c('td', {
      key: i
    }, [product.creatinekinase ? _c('div', [_vm._v("\n          Creatine Kinase\n         ")]) : _vm._e()]);
  }), 0), _vm._v(" "), _c('tr', _vm._l(_vm.productSet, function (product, i) {
    return _c('td', {
      key: i
    }, [product.testosterone ? _c('div', [_vm._v("\n          Testosterone\n         ")]) : _vm._e()]);
  }), 0), _vm._v(" "), _c('tr', _vm._l(_vm.productSet, function (product, i) {
    return _c('td', {
      key: i
    }, [product.freetestosterone ? _c('div', [_vm._v("\n          Free Testosterone\n         ")]) : _vm._e()]);
  }), 0), _vm._v(" "), _c('tr', _vm._l(_vm.productSet, function (product, i) {
    return _c('td', {
      key: i
    }, [product.dheas ? _c('div', [_vm._v("\n          DHEAS\n         ")]) : _vm._e()]);
  }), 0), _vm._v(" "), _c('tr', _vm._l(_vm.productSet, function (product, i) {
    return _c('td', {
      key: i
    }, [product.cortisol ? _c('div', [_vm._v("\n          Cortisol\n         ")]) : _vm._e()]);
  }), 0), _vm._v(" "), _c('tr', _vm._l(_vm.productSet, function (product, i) {
    return _c('td', {
      key: i
    }, [product.shbg ? _c('div', [_vm._v("\n          Sex-Hormone Binding Globulin (SHBG)\n         ")]) : _vm._e()]);
  }), 0), _vm._v(" "), _c('tr', _vm._l(_vm.productSet, function (product, i) {
    return _c('td', {
      key: i
    }, [product.albumin ? _c('div', [_vm._v("\n          Albumin\n         ")]) : _vm._e()]);
  }), 0)]) : _vm._e()]);
};
var staticRenderFns = [];
var __template__ = { render: render, staticRenderFns: staticRenderFns };

export default Object.assign({}, __script__, __template__);
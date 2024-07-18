//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
  name: 'brain-body',
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
      productSet: '',
      biomarkerDataSet: false
    };
  },

  computed: mapState({
    shopifyProducts: state => state.shopifyProducts,
    shapedProducts: state => state.shapedProducts
  }),

  methods: {
    setProductSlice() {
      this.productSet = this.shapedProducts.slice(3, 6);
    },
    setBiomarkerData() {
      this.productSet.forEach(product => {
        let biomarkers = product.biomarkers;
        biomarkers.forEach(marker => {
          if (marker.title == "Bone & Muscle Health") {
            let markerIndex = product.biomarkers.indexOf(marker);
            let markers = biomarkers[markerIndex].markers;
            console.log('@@@@@@@@ BONE and muscle match', markers, product);
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
  created() {
    this.setProductSlice();
  },
  mounted() {
    this.setBiomarkerData();
  }
};

var render = function () {
  var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;
  return _c('div', [this.biomarkerDataSet ? _c('table', {
    attrs: {
      "id": "energy-metabolism-desktop"
    }
  }, [_c('caption', [_vm._v("Brain and Body ")]), _vm._v(" "), _c('tr', [_c('th', [_vm._v("Magnesium")]), _vm._v(" "), _vm._l(_vm.productSet, function (product, i) {
    return _c('td', {
      key: i
    }, [_vm._v("\n        " + _vm._s(product.magnesium ? "✔️" : "") + "\n      ")]);
  })], 2), _vm._v(" "), _c('tr', [_c('th', [_vm._v("RBC Magnesium")]), _vm._v(" "), _vm._l(_vm.productSet, function (product, i) {
    return _c('td', {
      key: i
    }, [_vm._v("\n        " + _vm._s(product.rbcmagnesium ? "✔️" : "") + "\n      ")]);
  })], 2), _vm._v(" "), _c('tr', [_c('th', [_vm._v("Folate")]), _vm._v(" "), _vm._l(_vm.productSet, function (product, i) {
    return _c('td', {
      key: i
    }, [_vm._v("\n        " + _vm._s(product.folate ? "✔️" : "") + "\n      ")]);
  })], 2), _vm._v(" "), _c('tr', [_c('th', [_vm._v("Vitamin B12")]), _vm._v(" "), _vm._l(_vm.productSet, function (product, i) {
    return _c('td', {
      key: i
    }, [_vm._v("\n        " + _vm._s(product.vitaminb12 ? "✔️" : "") + "\n      ")]);
  })], 2)]) : _vm._e()]);
};
var staticRenderFns = [];
var __template__ = { render: render, staticRenderFns: staticRenderFns };

export default Object.assign({}, __script__, __template__);
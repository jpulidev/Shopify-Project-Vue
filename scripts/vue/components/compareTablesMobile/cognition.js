//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
          if (marker.title == "Cognition") {
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
  }, [_c('caption', [_vm._v("Cognition ")]), _vm._v(" "), _c('tr', _vm._l(_vm.productSet, function (product, i) {
    return _c('td', {
      key: i
    }, [product.magnesium ? _c('div', [_vm._v("\n          Magnesium\n         ")]) : _vm._e()]);
  }), 0), _vm._v(" "), _c('tr', _vm._l(_vm.productSet, function (product, i) {
    return _c('td', {
      key: i
    }, [product.rbcmagnesium ? _c('div', [_vm._v("\n          RBC Magnesium\n         ")]) : _vm._e()]);
  }), 0), _vm._v(" "), _c('tr', _vm._l(_vm.productSet, function (product, i) {
    return _c('td', {
      key: i
    }, [product.folate ? _c('div', [_vm._v("\n          Folate\n         ")]) : _vm._e()]);
  }), 0), _vm._v(" "), _c('tr', _vm._l(_vm.productSet, function (product, i) {
    return _c('td', {
      key: i
    }, [product.vitaminb12 ? _c('div', [_vm._v("\n          Vitamin B12\n         ")]) : _vm._e()]);
  }), 0)]) : _vm._e()]);
};
var staticRenderFns = [];
var __template__ = { render: render, staticRenderFns: staticRenderFns };

export default Object.assign({}, __script__, __template__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
import CompareProducts from './compareTables/products';
import TopTable from './compareTables/top-table';
import EnergyMetabolism from './compareTables/energy-metabolism';
import StrengthEndurance from './compareTables/strength-endurance';
import BoneMuscle from './compareTables/bone-muscle';
import Cognition from './compareTables/cognition';
import OxygenBlood from './compareTables/oxygen-blood';
import ElectrolytesFluid from './compareTables/electrolytes-fluid';
import Inflammation from './compareTables/inflammation';
import LiverToxicity from './compareTables/liver-toxicity';
import CompareMobile from './compare-mobile';

var __script__ = {
  name: 'compare',
  components: {
    'compare-products': CompareProducts,
    'top-table': TopTable,
    'energy-metabolism': EnergyMetabolism,
    'strength-endurance': StrengthEndurance,
    'bone-muscle': BoneMuscle,
    'cognition': Cognition,
    'oxygen-blood': OxygenBlood,
    'electrolytes-fluid': ElectrolytesFluid,
    'inflammation': Inflammation,
    'liver-toxicity': LiverToxicity,
    'compare-mobile': CompareMobile
  },
  props: {
    settings: Object,
    blocks: Array,
    allProducts: Array,
    productsWithBiomarkers: Array,
    allBiomarkers: Array,
    addToCartText: String,
    selectOptionsText: String,
    viewDetailsLink: String,
    showReviews: Boolean
  },
  data() {
    return {
      selectedFilter: '',
      activeIndex: '',
      mobileProduct1: '',
      mobileProduct2: ''
    };
  },

  computed: mapState({
    kbProducts: state => state.kbProducts,
    shopifyProducts: state => state.shopifyProducts,
    shapedProducts: state => state.shapedProducts,
    comparisonTablePage: state => state.comparisonTablePage,
    comparisonTableProducts: state => state.comparisonTableProducts,
    productSet: state => state.comparisonTableActiveSet,
    mobileProductOne: state => state.mobileProductOne,
    mobileProductTwo: state => state.mobileProductTwo
  }),

  methods: {
    // setBiomarkers() {
    //   let biomarkerCategories = []
    //   this.allBiomarkers.forEach(marker => {
    //     if (marker.markers) {
    //       let markersArray = marker.markers[0].split('|')

    //       let biomarker = {
    //         header: marker.title,
    //         markers: markersArray,
    //       }
    //       biomarkerCategories.push(biomarker)
    //     }
    //   })
    // },
    changeProductSet(direction) {
      if (direction == 'next') {
        this.$store.commit('setComparisonTablePage', 2);
        this.$store.dispatch('setProductSlice', 2);
      }
      if (direction == 'prev') {
        this.$store.commit('setComparisonTablePage', 1);
        this.$store.dispatch('setProductSlice', 1);
      }
    },
    changeProductMobile(column) {
      if (column == 1) {
        this.$store.commit('setMobileProductOne', [this.mobileProduct1]);
      }
      if (column == 2) {
        this.$store.commit('setMobileProductTwo', [this.mobileProduct2]);
      }
    }
  },
  created() {
    let theProducts = this.productsWithBiomarkers;
    this.$store.commit("setAllProducts", theProducts);
  },
  mounted() {
    this.$store.dispatch("setProductData");
    // this.setBiomarkers()
    this.mobileProduct1 = this.comparisonTableProducts[0];
    this.mobileProduct2 = this.comparisonTableProducts[1];
    this.$store.commit('setMobileProductOne', [this.mobileProduct1]);
    this.$store.commit('setMobileProductTwo', [this.mobileProduct2]);
  },
  updated() {}
};

var render = function () {
  var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;
  return _c('div', {
    staticClass: "compare-products"
  }, [_c('div', {
    staticClass: "compare-products-desktop"
  }, [_c('div', {
    staticClass: "table-header"
  }, [_vm.comparisonTablePage == 1 ? _c('div', {
    staticClass: "product-slider-arrow product-slider-arrow__prev gray-arrow ",
    on: {
      "click": function ($event) {
        return _vm.changeProductSet('prev');
      }
    }
  }, [_c('svg', {
    attrs: {
      "xmlns": "http://www.w3.org/2000/svg",
      "width": "24",
      "height": "24",
      "viewBox": "0 0 24 24"
    }
  }, [_c('path', {
    attrs: {
      "d": "M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z"
    }
  })])]) : _vm._e(), _vm._v(" "), _vm.comparisonTablePage == 2 ? _c('div', {
    staticClass: "product-slider-arrow product-slider-arrow__prev blue-arrow",
    on: {
      "click": function ($event) {
        return _vm.changeProductSet('prev');
      }
    }
  }, [_c('svg', {
    attrs: {
      "xmlns": "http://www.w3.org/2000/svg",
      "width": "24",
      "height": "24",
      "viewBox": "0 0 24 24"
    }
  }, [_c('path', {
    attrs: {
      "d": "M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z"
    }
  })])]) : _vm._e(), _vm._v(" "), _vm.productSet ? _c('compare-products', {
    attrs: {
      "passedProductSet": _vm.productSet,
      "addToCartText": _vm.addToCartText,
      "selectOptionsText": _vm.selectOptionsText,
      "viewDetailsLink": _vm.viewDetailsLink,
      "showReviews": _vm.showReviews
    }
  }) : _vm._e(), _vm._v(" "), _vm.comparisonTablePage == 1 ? _c('div', {
    staticClass: "product-slider-arrow product-slider-arrow__next  blue-arrow",
    on: {
      "click": function ($event) {
        return _vm.changeProductSet('next');
      }
    }
  }, [_c('svg', {
    attrs: {
      "xmlns": "http://www.w3.org/2000/svg",
      "width": "24",
      "height": "24",
      "viewBox": "0 0 24 24"
    }
  }, [_c('path', {
    attrs: {
      "d": "M7.33 24l-2.83-2.829 9.339-9.175-9.339-9.167 2.83-2.829 12.17 11.996z"
    }
  })])]) : _vm._e(), _vm._v(" "), _vm.comparisonTablePage == 2 ? _c('div', {
    staticClass: "product-slider-arrow product-slider-arrow__next  gray-arrow",
    on: {
      "click": function ($event) {
        return _vm.changeProductSet('prev');
      }
    }
  }, [_c('svg', {
    attrs: {
      "xmlns": "http://www.w3.org/2000/svg",
      "width": "24",
      "height": "24",
      "viewBox": "0 0 24 24"
    }
  }, [_c('path', {
    attrs: {
      "d": "M7.33 24l-2.83-2.829 9.339-9.175-9.339-9.167 2.83-2.829 12.17 11.996z"
    }
  })])]) : _vm._e()], 1), _vm._v(" "), _c('div', {
    staticClass: "compare-tables-lower"
  }, [_vm.productSet ? _c('top-table', {
    attrs: {
      "passedProductSet": _vm.productSet,
      "showReviews": _vm.showReviews
    }
  }) : _vm._e(), _vm._v(" "), _c('hr', {
    staticClass: "solid"
  }), _vm._v(" "), _vm.productSet ? _c('energy-metabolism') : _vm._e(), _vm._v(" "), _c('hr', {
    staticClass: "solid"
  }), _vm._v(" "), _vm.productSet ? _c('bone-muscle') : _vm._e(), _vm._v(" "), _c('hr', {
    staticClass: "solid"
  }), _vm._v(" "), _vm.productSet ? _c('strength-endurance') : _vm._e(), _vm._v(" "), _c('hr', {
    staticClass: "solid"
  }), _vm._v(" "), _vm.productSet ? _c('cognition') : _vm._e(), _vm._v(" "), _c('hr', {
    staticClass: "solid"
  }), _vm._v(" "), _vm.productSet ? _c('oxygen-blood') : _vm._e(), _vm._v(" "), _c('hr', {
    staticClass: "solid"
  }), _vm._v(" "), _vm.productSet ? _c('electrolytes-fluid') : _vm._e(), _vm._v(" "), _c('hr', {
    staticClass: "solid"
  }), _vm._v(" "), _vm.productSet ? _c('inflammation') : _vm._e(), _vm._v(" "), _c('hr', {
    staticClass: "solid"
  }), _vm._v(" "), _vm.productSet ? _c('liver-toxicity') : _vm._e(), _vm._v(" "), _c('hr', {
    staticClass: "solid"
  })], 1)]), _vm._v(" "), _c('div', {
    staticClass: "compare-products-mobile"
  }, [_c('div', {
    staticClass: "compare-column column-1"
  }, [_vm.mobileProductOne ? _c('compare-mobile', {
    key: _vm.mobileProductOne[0].title,
    attrs: {
      "mobileProduct": this.mobileProductOne,
      "product": this.mobileProductOne,
      "addToCartText": _vm.addToCartText,
      "selectOptionsText": _vm.selectOptionsText,
      "viewDetailsLink": _vm.viewDetailsLink
    }
  }) : _vm._e()], 1), _vm._v(" "), _c('div', {
    staticClass: "compare-column column-2"
  }, [_vm.mobileProductTwo ? _c('compare-mobile', {
    key: _vm.mobileProductTwo[0].title,
    attrs: {
      "mobileProduct": this.mobileProductTwo,
      "product": this.mobileProductTwo,
      "addToCartText": _vm.addToCartText,
      "selectOptionsText": _vm.selectOptionsText,
      "viewDetailsLink": _vm.viewDetailsLink
    }
  }) : _vm._e()], 1), _vm._v(" "), _c('hr', {
    staticClass: "solid"
  })])]);
};
var staticRenderFns = [];
var __template__ = { render: render, staticRenderFns: staticRenderFns };

export default Object.assign({}, __script__, __template__);
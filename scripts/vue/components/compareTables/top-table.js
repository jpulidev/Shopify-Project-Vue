//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
  name: 'top-table-desktop',
  // components: {
  //   },
  props: {
    settings: Object,
    blocks: Array,
    allProducts: Array,
    productsWithBiomarkers: Array,
    allBiomarkers: Array,
    passedProductSet: Array,
    currentProduct: Number,
    showReviews: Boolean
  },
  data() {
    return {
      selectedFilter: '',
      activeIndex: '',
      biomarkerDataSet: false
    };
  },

  computed: {
    getCurrentProduct() {
      let getCurrentProduct = this.passedProductSet.filter(obj => {
        return obj.id == this.currentProduct;
      });
      return getCurrentProduct;
    },
    sortedTable() {
      let sortedTable = this.passedProductSet.filter(obj => {
        return obj.id !== this.currentProduct;
      });
      return sortedTable;
    },
    shopifyProducts() {
      return this.$store.state.shopifyProducts;
    },
    shapedProducts() {
      return this.$store.state.shapedProducts;
    },
    productSet() {
      return this.$store.state.productSet;
    },
    comparisonTableProducts() {
      return this.$store.state.comparisonTableProducts;
    }
  },
  methods: {},
  created() {},
  mounted() {},
  beforeUpdate() {},
  updated() {}
};

var render = function () {
  var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;
  return _c('div', [_c('table', {
    staticClass: "comparison-table-desktop"
  }, [_vm.showReviews == 'true' ? _c('tr', [_c('th', [_vm._v("Reviews")]), _vm._v(" "), _vm.getCurrentProduct[0] ? _c('td', [_c('div', {
    staticClass: "list-view-item",
    attrs: {
      "data-product-stars": ""
    }
  }, [_c('div', {
    staticClass: "trustpilot-widget",
    attrs: {
      "data-locale": "en-US",
      "data-template-id": "577258fb31f02306e4e3aaf9",
      "data-businessunit-id": "5df96c4c7890b800016789c7",
      "data-style-height": "24px",
      "data-style-width": "100%",
      "data-theme": "light",
      "data-tags": "SelectedReview",
      "data-sku": _vm.getCurrentProduct[0].variants[0].sku,
      "data-star-color": "#0AA9FF",
      "data-font-family": "Open Sans",
      "data-text-color": "#232D37",
      "data-no-reviews": "show",
      "data-scroll-to-list": "false"
    }
  })])]) : _vm._e(), _vm._v(" "), _vm._l(_vm.sortedTable, function (product, i) {
    return _c('td', {
      key: i
    }, [_c('div', {
      staticClass: "list-view-item",
      attrs: {
        "data-product-stars": ""
      }
    }, [_c('div', {
      staticClass: "trustpilot-widget",
      attrs: {
        "data-locale": "en-US",
        "data-template-id": "577258fb31f02306e4e3aaf9",
        "data-businessunit-id": "5df96c4c7890b800016789c7",
        "data-style-height": "24px",
        "data-style-width": "100%",
        "data-theme": "light",
        "data-tags": "SelectedReview",
        "data-sku": product.variants[0].sku,
        "data-star-color": "#0AA9FF",
        "data-font-family": "Open Sans",
        "data-text-color": "#232D37",
        "data-no-reviews": "show",
        "data-scroll-to-list": "false"
      }
    })])]);
  })], 2) : _vm._e(), _vm._v(" "), _c('tr', [_c('th', [_vm._v("Includes blood test")]), _vm._v(" "), _vm.getCurrentProduct[0] ? _c('td', [_vm.getCurrentProduct[0].bloodTestIncluded ? _c('div', {
    staticClass: "top-table-checkmark"
  }, [_c('svg', {
    attrs: {
      "xmlns": "http://www.w3.org/2000/svg",
      "width": "24",
      "height": "24",
      "viewBox": "0 0 24 24"
    }
  }, [_c('path', {
    attrs: {
      "d": "M9 21.035l-9-8.638 2.791-2.87 6.156 5.874 12.21-12.436 2.843 2.817z"
    }
  })])]) : _vm._e(), _vm._v(" "), !_vm.getCurrentProduct[0].bloodTestIncluded ? _c('div', {
    staticClass: "top-table-x"
  }, [_c('svg', {
    attrs: {
      "xmlns": "http://www.w3.org/2000/svg",
      "width": "24",
      "height": "24",
      "viewBox": "0 0 24 24"
    }
  }, [_c('path', {
    attrs: {
      "d": "M23 20.168l-8.185-8.187 8.185-8.174-2.832-2.807-8.182 8.179-8.176-8.179-2.81 2.81 8.186 8.196-8.186 8.184 2.81 2.81 8.203-8.192 8.18 8.192z"
    }
  })])]) : _vm._e()]) : _vm._e(), _vm._v(" "), _vm._l(_vm.sortedTable, function (product, i) {
    return _c('td', {
      key: i
    }, [product.bloodTestIncluded ? _c('div', {
      staticClass: "top-table-checkmark"
    }, [_c('svg', {
      attrs: {
        "xmlns": "http://www.w3.org/2000/svg",
        "width": "24",
        "height": "24",
        "viewBox": "0 0 24 24"
      }
    }, [_c('path', {
      attrs: {
        "d": "M9 21.035l-9-8.638 2.791-2.87 6.156 5.874 12.21-12.436 2.843 2.817z"
      }
    })])]) : _vm._e(), _vm._v(" "), !product.bloodTestIncluded ? _c('div', {
      staticClass: "top-table-x"
    }, [_c('svg', {
      attrs: {
        "xmlns": "http://www.w3.org/2000/svg",
        "width": "24",
        "height": "24",
        "viewBox": "0 0 24 24"
      }
    }, [_c('path', {
      attrs: {
        "d": "M23 20.168l-8.185-8.187 8.185-8.174-2.832-2.807-8.182 8.179-8.176-8.179-2.81 2.81 8.186 8.196-8.186 8.184 2.81 2.81 8.203-8.192 8.18 8.192z"
      }
    })])]) : _vm._e()]);
  })], 2), _vm._v(" "), _c('tr', [_c('th', [_vm._v("Upload past results")]), _vm._v(" "), _vm.getCurrentProduct[0] ? _c('td', [_vm.getCurrentProduct[0].uploadPastResults ? _c('div', {
    staticClass: "top-table-checkmark"
  }, [_c('svg', {
    attrs: {
      "xmlns": "http://www.w3.org/2000/svg",
      "width": "24",
      "height": "24",
      "viewBox": "0 0 24 24"
    }
  }, [_c('path', {
    attrs: {
      "d": "M9 21.035l-9-8.638 2.791-2.87 6.156 5.874 12.21-12.436 2.843 2.817z"
    }
  })])]) : _c('div', {
    staticClass: "top-table-x"
  }, [_c('svg', {
    attrs: {
      "xmlns": "http://www.w3.org/2000/svg",
      "width": "24",
      "height": "24",
      "viewBox": "0 0 24 24"
    }
  }, [_c('path', {
    attrs: {
      "d": "M23 20.168l-8.185-8.187 8.185-8.174-2.832-2.807-8.182 8.179-8.176-8.179-2.81 2.81 8.186 8.196-8.186 8.184 2.81 2.81 8.203-8.192 8.18 8.192z"
    }
  })])])]) : _vm._e(), _vm._v(" "), _vm._l(_vm.sortedTable, function (product, i) {
    return _c('td', {
      key: i
    }, [product.uploadPastResults ? _c('div', {
      staticClass: "top-table-checkmark"
    }, [_c('svg', {
      attrs: {
        "xmlns": "http://www.w3.org/2000/svg",
        "width": "24",
        "height": "24",
        "viewBox": "0 0 24 24"
      }
    }, [_c('path', {
      attrs: {
        "d": "M9 21.035l-9-8.638 2.791-2.87 6.156 5.874 12.21-12.436 2.843 2.817z"
      }
    })])]) : _c('div', {
      staticClass: "top-table-x"
    }, [_c('svg', {
      attrs: {
        "xmlns": "http://www.w3.org/2000/svg",
        "width": "24",
        "height": "24",
        "viewBox": "0 0 24 24"
      }
    }, [_c('path', {
      attrs: {
        "d": "M23 20.168l-8.185-8.187 8.185-8.174-2.832-2.807-8.182 8.179-8.176-8.179-2.81 2.81 8.186 8.196-8.186 8.184 2.81 2.81 8.203-8.192 8.18 8.192z"
      }
    })])])]);
  })], 2), _vm._v(" "), _c('tr', [_c('th', [_vm._v("Availability")]), _vm._v(" "), _vm.getCurrentProduct[0] ? _c('td', [_vm.getCurrentProduct[0].availability ? _c('p', [_vm._v(" " + _vm._s(_vm.getCurrentProduct[0].availability) + " ")]) : _vm._e()]) : _vm._e(), _vm._v(" "), _vm._l(_vm.sortedTable, function (product, i) {
    return _c('td', {
      key: i
    }, [product.availability ? _c('p', [_vm._v(" " + _vm._s(product.availability) + " ")]) : _vm._e()]);
  })], 2), _vm._v(" "), _c('tr', [_c('th', [_vm._v("Biomarkers")]), _vm._v(" "), _vm.getCurrentProduct[0] ? _c('td', [_vm._v(" " + _vm._s(_vm.getCurrentProduct[0].biomarkerCount) + " ")]) : _vm._e(), _vm._v(" "), _vm._l(_vm.sortedTable, function (product, i) {
    return _c('td', {
      key: i
    }, [_vm._v(" " + _vm._s(product.biomarkerCount) + " ")]);
  })], 2)])]);
};
var staticRenderFns = [];
var __template__ = { render: render, staticRenderFns: staticRenderFns };

export default Object.assign({}, __script__, __template__);
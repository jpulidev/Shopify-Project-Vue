//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
import productCard from './product-card';

var __script__ = {
  name: 'home-page',
  components: {
    productCard
  },
  props: {
    settings: Object,
    giftCardImage: String,
    blocks: Array,
    allProducts: Array,
    productsWithBiomarkers: Array,
    allBiomarkers: Array,
    allProductsIcons: Array,
    addToCartText: String,
    selectOptionsText: String,
    viewDetailsLink: String,
    showReviews: Boolean,
    buyMoreMessage: String
  },
  data() {
    return {
      selectedFilter: '',
      activeIndex: 0,
      filteredProductSet: [],
      goalFilters: '',
      otherFilters: '',
      mobileFilter: false
    };
  },

  computed: mapState({
    shopifyProducts: state => state.shopifyProducts,
    overallHealthFilter: state => state.categories.overallHealth,
    healthyAgingFilter: state => state.categories.healthyAging,
    shapedProducts: state => state.shapedProducts
  }),

  methods: {
    openMobileFilter(bool, e) {
      e.stopPropagation();
      // this.mobileFilter = bool; 
      this.mobileFilter = !this.mobileFilter;
    },
    handleClick(cta) {
      if (cta == "compare") {
        window.location.href = this.settings.compare_plans_cta_url;
      }

      if (cta == "gift") {
        window.location.href = this.settings.gift_card_cta_url;
      }
    },
    setAllFilters() {
      let defaultFilter = this.settings.defaultFilter.trim();
      let goalFilters = this.settings.goalFilters.replace(", ", ",").split(',');

      this.goalFilters = goalFilters;

      if (this.settings.otherFilters) {
        let otherFilters = this.settings.otherFilters.replace(", ", ",").split(',');
        this.otherFilters = otherFilters;
      }

      let indexOfDefault = goalFilters.indexOf(defaultFilter);
      if (indexOfDefault > -1) {
        this.activeIndex = indexOfDefault;
        if (defaultFilter == "All") {
          this.selectedFilter = '';
        } else {
          this.selectedFilter = defaultFilter;
        }
        this.setFilteredProducts();
      }
    },
    setBiomarkers() {
      let biomarkerCategories = [];

      if (this.allBiomarkers) {
        this.allBiomarkers.forEach(marker => {
          if (marker.markers) {
            let markersArray = marker.markers[0].split('|');
            let biomarker = {
              header: marker.title,
              markers: markersArray
            };
            biomarkerCategories.push(biomarker);
          }
        });
      }
    },
    setProductIcons() {
      let productIconsCategories = [];

      if (this.allProductsIcons) {
        this.allProducts.forEach(icon => {
          if (icon.iconss) {
            let iconsArray = icon.icons[0].split('|');
            let icon = {
              header: icon.title,
              markers: iconsArray
            };
            productIconsCategories.push(icon);
          }
        });
      }
    },
    setActive(selected, index) {
      this.activeIndex = index;
      this.selectedFilter = selected;
      this.setFilter(selected);
    },
    setFilter(selected) {
      if (selected.trim() == "All") {
        this.selectedFilter = '';
      } else this.selectedFilter = selected;

      if (selected.trim() == "Price") {
        let filteredByPrice = this.shapedProducts.sort((a, b) => parseFloat(b.price - a.price));
        return this.filteredProductSet = filteredByPrice;
      } else this.setFilteredProducts();
    },
    setFilteredProducts() {
      let allProducts = this.shapedProducts;
      let filteredProducts = [];

      if (allProducts) {
        allProducts.forEach(product => {
          let cats = product.categories;

          if (cats) {
            cats.forEach(cat => {
              let catString = cat.trim().toLowerCase();
              let filterString = this.selectedFilter.trim().toLowerCase();

              if (catString == filterString) {
                filteredProducts.push(product);
              }
            });
          }
        });
      }

      this.filteredProductSet = filteredProducts;
    }
  },
  created() {
    let theProducts = this.productsWithBiomarkers;

    this.$store.commit("setAllProducts", theProducts);
  },
  mounted() {
    this.$store.dispatch("setProductData");
    this.setAllFilters();
    this.setBiomarkers();
    this.setProductIcons();
  }
};

var render = function () {
  var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;
  return _c('div', {
    staticClass: "home-page-wrapper"
  }, [_c('div', {
    staticClass: "filter-btn-container"
  }, [_c('button', {
    staticClass: "filter-btn",
    on: {
      "click": function ($event) {
        return _vm.openMobileFilter(true, $event);
      }
    }
  }, [_vm._v("\n      Filter Plans \n    ")])]), _vm._v(" "), _c('div', {
    staticClass: "subscription"
  }, [_c('div', {
    staticClass: "filters-container filters-container__desktop"
  }, [_c('p', {
    staticClass: "list-header"
  }, [_vm._v("Filter Plans ")]), _vm._v(" "), _c('ul', {
    attrs: {
      "id": "filter-by-goal"
    }
  }, _vm._l(_vm.goalFilters, function (filter, index) {
    return _c('li', {
      key: filter,
      class: {
        'active': _vm.activeIndex === index
      },
      on: {
        "click": function ($event) {
          return _vm.setActive(filter, index);
        }
      }
    }, [_vm._v(" \n            " + _vm._s(filter) + " \n          ")]);
  }), 0), _vm._v(" "), _c('br'), _vm._v(" "), _c('div', {
    staticClass: "gift-card-cta-container"
  }, [_c('h4', [_vm._v("\n          " + _vm._s(_vm.settings.gift_card_cta_text_main) + "\n        ")]), _vm._v(" "), _c('p', [_vm._v(" " + _vm._s(_vm.settings.gift_card_cta_subheading) + " ")]), _vm._v(" "), _c('button', {
    staticClass: "button button--bright",
    on: {
      "click": function ($event) {
        return _vm.handleClick('gift');
      }
    }
  }, [_vm._v("\n        " + _vm._s(_vm.settings.gift_card_cta_button_text) + "\n        ")])]), _vm._v(" "), _c('div', {
    staticClass: "compare-plans-cta-container"
  }, [_c('h4', [_vm._v("\n          " + _vm._s(_vm.settings.compare_plans_cta_text) + "\n        ")]), _vm._v(" "), _c('button', {
    staticClass: "button button--primary-inverse",
    on: {
      "click": function ($event) {
        return _vm.handleClick('compare');
      }
    }
  }, [_vm._v("\n          " + _vm._s(_vm.settings.compare_plans_cta_button_text) + "\n        ")])])]), _vm._v(" "), _vm.shapedProducts ? _c('div', {
    attrs: {
      "id": "home-cards-container"
    }
  }, [_vm.selectedFilter ? _c('div', {
    attrs: {
      "id": "shop-all-product-container"
    }
  }, _vm._l(this.filteredProductSet, function (product) {
    return _c('div', {
      key: product.id
    }, [_c('product-card', {
      attrs: {
        "product": product,
        "addToCartText": _vm.addToCartText,
        "selectOptionsText": _vm.selectOptionsText,
        "viewDetailsLink": _vm.viewDetailsLink,
        "showReviews": _vm.showReviews,
        "buyMoreMessage": _vm.buyMoreMessage
      }
    })], 1);
  }), 0) : _c('div', {
    attrs: {
      "id": "shop-all-product-container"
    }
  }, _vm._l(this.shapedProducts, function (product) {
    return _c('div', {
      key: product.id
    }, [_c('product-card', {
      attrs: {
        "product": product,
        "addToCartText": _vm.addToCartText,
        "selectOptionsText": _vm.selectOptionsText,
        "viewDetailsLink": _vm.viewDetailsLink,
        "showReviews": _vm.showReviews,
        "buyMoreMessage": _vm.buyMoreMessage
      }
    })], 1);
  }), 0)]) : _vm._e()]), _vm._v(" "), _c('transition', {
    attrs: {
      "name": "fade"
    }
  }, [_c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: _vm.mobileFilter,
      expression: "mobileFilter"
    }],
    staticClass: "filters-container__mobile-overlay"
  })]), _vm._v(" "), _c('transition', {
    attrs: {
      "name": "slide"
    }
  }, [_c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: _vm.mobileFilter,
      expression: "mobileFilter"
    }],
    staticClass: "filters-container filters-container__mobile filter-mobile"
  }, [_c('div', {
    staticClass: "mobile-filter-close"
  }, [_c('button', {
    on: {
      "click": function ($event) {
        return _vm.openMobileFilter(false, $event);
      }
    }
  }, [_c('svg', {
    staticClass: "icon icon-close",
    attrs: {
      "aria-hidden": "true",
      "focusable": "false",
      "role": "presentation",
      "viewBox": "0 0 40 40"
    }
  }, [_c('path', {
    staticClass: "layer",
    attrs: {
      "d": "M23.868 20.015L39.117 4.78c1.11-1.108 1.11-2.77 0-3.877-1.109-1.108-2.773-1.108-3.882 0L19.986 16.137 4.737.904C3.628-.204 1.965-.204.856.904c-1.11 1.108-1.11 2.77 0 3.877l15.249 15.234L.855 35.248c-1.108 1.108-1.108 2.77 0 3.877.555.554 1.248.831 1.942.831s1.386-.277 1.94-.83l15.25-15.234 15.248 15.233c.555.554 1.248.831 1.941.831s1.387-.277 1.941-.83c1.11-1.109 1.11-2.77 0-3.878L23.868 20.015z"
    }
  })])])]), _vm._v(" "), _c('p', {
    staticClass: "list-header"
  }, [_vm._v("Filter Plans")]), _vm._v(" "), _c('ul', {
    attrs: {
      "id": "filter-by-goal"
    }
  }, _vm._l(_vm.goalFilters, function (filter, index) {
    return _c('li', {
      key: filter,
      class: {
        'active': _vm.activeIndex === index
      },
      on: {
        "click": function ($event) {
          _vm.setActive(filter, index), _vm.openMobileFilter(false, $event);
        }
      }
    }, [_vm._v(" \n          " + _vm._s(filter) + " \n        ")]);
  }), 0), _vm._v(" "), _c('button', {
    staticClass: "button button--primary",
    on: {
      "click": function ($event) {
        return _vm.handleClick('compare');
      }
    }
  }, [_vm._v("\n      " + _vm._s(_vm.settings.compare_plans_cta_button_text) + "\n    ")]), _vm._v(" "), _c('br')])])], 1);
};
var staticRenderFns = [];
var __template__ = { render: render, staticRenderFns: staticRenderFns };

export default Object.assign({}, __script__, __template__);
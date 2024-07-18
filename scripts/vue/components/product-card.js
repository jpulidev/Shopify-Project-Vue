//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

import { mapState, mapMutations } from "vuex";
import { Swiper, SwiperSlide } from 'vue-awesome-swiper';
import 'swiper/css/swiper.css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

var __script__ = {
  name: "product-card",
  props: {
    product: Object,
    addToCartText: String,
    selectOptionsText: String,
    viewDetailsLink: String,
    showReviews: Boolean,
    buyMoreMessage: String
  },
  name: 'swiper-example-navigation',
  title: 'Navigation',
  components: {
    Swiper,
    SwiperSlide
  },

  data() {
    return {
      selected: "",
      addToCartBtn: false,
      selectOptionsBtn: false,
      isHidden: true,
      discountTwo: 0,
      discountFour: 0,
      discountMessage: "",
      swiperOption: {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        }
      }
    };
  },

  computed: mapState({
    shapedProducts: state => state.shapedProducts
  }),
  methods: {

    getDiscounts(product) {
      let quantityTwo = product.discounts.find(function (discount) {
        if (discount.q == 2) return true;
      });
      if (quantityTwo != undefined) {
        this.discountTwo = quantityTwo.v;
      }

      let quantityFour = product.discounts.find(function (discount) {
        if (discount.q == 4) return true;
      });
      if (quantityFour != undefined) {
        this.discountFour = quantityFour.v;
      }
    },
    setDiscountMessage() {
      if (this.discountTwo != "") {
        let discountTwoMessage = this.buyMoreMessage;

        if (this.buyMoreMessage.includes("{Q}")) {
          discountTwoMessage = discountTwoMessage.replace("{Q}", "2");
        }
        if (this.buyMoreMessage.includes("{V}")) {
          discountTwoMessage = discountTwoMessage.replace("{V}", this.discountTwo);
        }
        this.discountMessage = discountTwoMessage;
      }

      if (this.discountFour != "") {
        let discountFourMessage = this.buyMoreMessage;
        if (discountFourMessage.includes("{Q}")) {
          discountFourMessage = discountFourMessage.replace("{Q}", "4");
        }
        if (this.buyMoreMessage.includes("{V}")) {
          discountFourMessage = discountFourMessage.replace("{V}", this.discountFour);
        }
        this.discountMessage = this.discountMessage + " \n" + discountFourMessage;
      }
    },
    setActive(selected, index) {
      this.activeIndex = index;
      this.selectedFilter = selected;
      this.setFilter(selected);
    },
    goToPDP(productUrl) {
      window.location.href = productUrl;
    },
    addToCart(product) {
      let formattedProducts = [];
      let productForCart = {
        id: product.variantId,
        quantity: 1,
        properties: {}
      };
      formattedProducts.push(productForCart);

      this.isHidden = !this.isHidden;

      fetch("/cart/add.js", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          "items": formattedProducts
        })
      }).then(cart => {
        cart.json().then(body => {
          window.location.href = "/cart";
          gtag("send", {
            hitType: "event",
            eventCategory: "Added to Cart",
            eventAction: "click",
            eventLabel: "{{ product.title }}"
          });
        });
      });
    }
  },
  created() {
    if (this.product.variants.length > 1) {
      this.selectOptionsBtn = true;
    } else if (this.product.variants.length == 1) {
      this.addToCartBtn = true;
    }
  },
  mounted() {
    this.getDiscounts(this.product);
    this.setDiscountMessage();
  }
};

var render = function () {
  var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;
  return _vm.product.productFlag == 'Most Popular' ? _c('div', {
    staticClass: "product-card feature-product-hp "
  }, [_c('div', {
    staticClass: "product-image featured-product-mobile",
    style: {
      'background-image': 'url(' + _vm.product.imageUrl + ')'
    },
    on: {
      "click": function ($event) {
        return _vm.goToPDP(_vm.product.productUrl);
      }
    }
  }), _vm._v(" "), _vm.product.productFlag == 'Most Popular' ? _c('span', {
    staticClass: "most-popular-upsell most-popular-upsell-text show-most-popular "
  }) : _vm._e(), _vm._v(" "), _vm.product.productFlag == 'New' ? _c('span', {
    staticClass: "most-popular-upsell most-popular-upsell-text show-most-popular product-new-flag"
  }) : _vm._e(), _vm._v(" "), _c('div', {
    staticClass: "product-card__content featured-content-product-hp"
  }, [_c('div', {
    staticClass: "product-card__content-top"
  }, [_c('h4', {
    staticClass: "product-card-title"
  }, [_vm._v(_vm._s(_vm.product.title))]), _vm._v(" "), _vm.product.variants[0].sku != null && _vm.showReviews == 'true' ? _c('div', [_c('div', {
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
      "data-style-height": "18px",
      "data-style-width": "100%",
      "data-theme": "light",
      "data-tags": "SelectedReview",
      "data-sku": _vm.product.variants[0].sku,
      "data-star-color": "#0AA9FF",
      "data-font-family": "Open Sans",
      "data-text-color": "#232D37",
      "data-no-reviews": "show",
      "data-scroll-to-list": "false"
    }
  })])]) : _vm._e(), _vm._v(" "), _c('div', {
    staticClass: "product-text-content"
  }, [_c('ul', [_c('li', {
    staticClass: "biomarkers-list"
  }, [_vm._v(_vm._s(_vm.product.biomarkerCount))]), _vm._v(" "), _vm.product.bloodTestIncluded != null ? _c('li', {
    staticClass: "biomarkers-list"
  }, [_vm._v("\n          " + _vm._s(_vm.product.bloodTestIncluded ? "Blood Test Included" : "Blood Test NOT Included") + "\n        ")]) : _vm._e(), _vm._v(" "), _vm.product.dnaTestIncluded != null ? _c('li', {
    staticClass: "biomarkers-list"
  }, [_vm._v("\n          " + _vm._s(_vm.product.dnaTestIncluded ? "DNA Test Included" : "DNA Test NOT Included") + "\n        ")]) : _vm._e(), _vm._v(" "), _c('li', {
    staticClass: "biomarkers-list"
  }, [_vm._v(_vm._s(_vm.product.productDescriptionShort))])])]), _vm._v(" "), _c('h4', {
    staticClass: "product-card__price"
  }, [_vm._v("$" + _vm._s(_vm.product.variants[0].price.toString().slice(0, -2)) + " \n           "), _c('span', [_vm._v("per test")])]), _vm._v(" "), _vm.discountMessage != '' ? _c('div', {
    staticClass: "buy-more-message-svg"
  }, [_c('svg', {
    attrs: {
      "version": "1.0",
      "xmlns": "http://www.w3.org/2000/svg",
      "width": "21px",
      "height": "21px",
      "viewBox": "0 0 512.000000 512.000000",
      "preserveAspectRatio": "xMidYMid meet"
    }
  }, [_c('g', {
    attrs: {
      "transform": "translate(0.000000,512.000000) scale(0.100000,-0.100000)",
      "fill": "#64c800",
      "stroke": "none"
    }
  }, [_c('path', {
    attrs: {
      "d": "M395 5106 c-181 -44 -346 -213 -384 -394 -14 -70 -16 -1915 -1 -1993\n              5 -30 26 -88 46 -129 35 -73 67 -106 1248 -1286 1181 -1181 1213 -1213 1286\n              -1248 150 -72 297 -72 447 -2 77 37 89 47 1035 994 943 943 958 958 993 1034\n              71 149 71 296 1 445 -37 77 -45 86 -1249 1290 -1081 1080 -1219 1215 -1274\n                1242 -126 62 -95 61 -1143 60 -714 -1 -968 -4 -1005 -13z m565 -506 c80 -15\n              149 -51 203 -105 58 -58 91 -120 107 -202 51 -258 -185 -494 -443 -443 -163\n              32 -277 149 -308 315 -35 192 106 396 301 434 63 12 80 12 140 1z"
    }
  })])]), _vm._v(" "), _c('span', [_vm._v(_vm._s(_vm.discountMessage))]), _vm._v(" "), _c('svg', {
    attrs: {
      "version": "1.0",
      "xmlns": "http://www.w3.org/2000/svg",
      "width": "21px",
      "height": "21px",
      "viewBox": "0 0 512.000000 512.000000",
      "preserveAspectRatio": "xMidYMid meet"
    }
  }, [_c('g', {
    attrs: {
      "transform": "translate(0.000000,512.000000) scale(0.100000,-0.100000)",
      "fill": "#64c800",
      "stroke": "none"
    }
  }, [_c('path', {
    attrs: {
      "d": "M395 5106 c-181 -44 -346 -213 -384 -394 -14 -70 -16 -1915 -1 -1993\n              5 -30 26 -88 46 -129 35 -73 67 -106 1248 -1286 1181 -1181 1213 -1213 1286\n              -1248 150 -72 297 -72 447 -2 77 37 89 47 1035 994 943 943 958 958 993 1034\n              71 149 71 296 1 445 -37 77 -45 86 -1249 1290 -1081 1080 -1219 1215 -1274\n                1242 -126 62 -95 61 -1143 60 -714 -1 -968 -4 -1005 -13z m565 -506 c80 -15\n              149 -51 203 -105 58 -58 91 -120 107 -202 51 -258 -185 -494 -443 -443 -163\n              32 -277 149 -308 315 -35 192 106 396 301 434 63 12 80 12 140 1z"
    }
  })])])]) : _vm._e(), _vm._v(" "), _vm.addToCartBtn ? _c('button', {
    staticClass: "button button--primary",
    on: {
      "click": function ($event) {
        return _vm.goToPDP(_vm.product.productUrl);
      }
    }
  }, [_vm._v("\n        " + _vm._s(_vm.selectOptionsText) + "\n      ")]) : _vm._e(), _vm._v(" "), _vm.selectOptionsBtn ? _c('button', {
    staticClass: "button button--primary",
    on: {
      "click": function ($event) {
        return _vm.goToPDP(_vm.product.productUrl);
      }
    }
  }, [_vm._v("\n        " + _vm._s(_vm.selectOptionsText) + "\n      ")]) : _vm._e(), _vm._v(" "), _c('a', {
    staticClass: "product-card-details-btn",
    attrs: {
      "href": _vm.product.productUrl
    }
  }, [_vm._v("\n        " + _vm._s(_vm.viewDetailsLink) + "\n      ")])]), _vm._v(" "), _c('div', {
    staticClass: "product-icons"
  }, _vm._l(_vm.product.productIcons, function (value, propertyName) {
    return _c('div', {
      staticClass: "metafields-icons"
    }, [_c('img', {
      attrs: {
        "src": "" + value[0].src
      }
    })]);
  }), 0)]), _vm._v(" "), _c('div', {
    staticClass: "featured-product-image featured-product-desktop"
  }, [_c('swiper', {
    ref: "mySwiperRef",
    staticClass: "swiper",
    attrs: {
      "options": _vm.swiperOption
    }
  }, [_vm._l(_vm.product.productMedia, function (value, propertyName) {
    return _c('swiper-slide', {
      staticClass: "swiper-slide"
    }, [_c('img', {
      attrs: {
        "src": "" + value
      },
      on: {
        "click": function ($event) {
          return _vm.goToPDP(_vm.product.productUrl);
        }
      }
    })]);
  }), _vm._v(" "), _c('div', {
    staticClass: "swiper-button-prev slide-preview-hide",
    attrs: {
      "slot": "button-prev"
    },
    slot: "button-prev"
  }), _vm._v(" "), _c('div', {
    staticClass: "swiper-button-next",
    attrs: {
      "slot": "button-next"
    },
    slot: "button-next"
  }), _vm._v(" "), _c('div', {
    staticClass: "swiper-pagination",
    attrs: {
      "slot": "pagination"
    },
    slot: "pagination"
  })], 2)], 1)]) : _c('div', {
    staticClass: "product-card"
  }, [_c('div', {
    staticClass: "product-image",
    style: {
      'background-image': 'url(' + _vm.product.imageUrl + ')'
    },
    on: {
      "click": function ($event) {
        return _vm.goToPDP(_vm.product.productUrl);
      }
    }
  }), _vm._v(" "), _vm.product.productFlag == 'Most Popular' ? _c('span', {
    staticClass: "most-popular-upsell most-popular-upsell-text show-most-popular "
  }) : _vm._e(), _vm._v(" "), _vm.product.productFlag == 'New' ? _c('span', {
    staticClass: "most-popular-upsell most-popular-upsell-text show-most-popular product-new-flag"
  }) : _vm._e(), _vm._v(" "), _c('h4', {
    staticClass: "product-card-title"
  }, [_vm._v(_vm._s(_vm.product.title))]), _vm._v(" "), _c('div', {
    staticClass: "product-card__content"
  }, [_c('div', {
    staticClass: "product-card__content-top"
  }, [_vm.product.variants[0].sku != null && _vm.showReviews == 'true' ? _c('div', [_c('div', {
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
      "data-style-height": "18px",
      "data-style-width": "100%",
      "data-theme": "light",
      "data-tags": "SelectedReview",
      "data-sku": _vm.product.variants[0].sku,
      "data-star-color": "#0AA9FF",
      "data-font-family": "Open Sans",
      "data-text-color": "#232D37",
      "data-no-reviews": "show",
      "data-scroll-to-list": "false"
    }
  })])]) : _vm._e(), _vm._v(" "), _c('div', {
    staticClass: "product-text-content"
  }, [_c('p', [_vm._v(_vm._s(_vm.product.productDescriptionShort))]), _vm._v(" "), _c('p', [_vm._v(_vm._s(_vm.product.biomarkerCount))]), _vm._v(" "), _vm.product.bloodTestIncluded != null ? _c('p', [_vm._v("\n          " + _vm._s(_vm.product.bloodTestIncluded ? "Blood Test Included" : "Blood Test NOT Included") + "\n        ")]) : _vm._e(), _vm._v(" "), _vm.product.dnaTestIncluded != null ? _c('p', [_vm._v("\n          " + _vm._s(_vm.product.dnaTestIncluded ? "DNA Test Included" : "DNA Test NOT Included") + "\n        ")]) : _vm._e()])]), _vm._v(" "), _c('div', {
    staticClass: "product-card__content-bottom"
  }, [_c('h4', {
    staticClass: "product-card__price"
  }, [_vm._v("$" + _vm._s(_vm.product.variants[0].price.toString().slice(0, -2)))]), _vm._v(" "), _vm.discountMessage != '' ? _c('p', {
    staticClass: "buy-more-message"
  }, [_vm._v(_vm._s(_vm.discountMessage))]) : _vm._e(), _vm._v(" "), _vm.addToCartBtn ? _c('button', {
    staticClass: "button button--primary",
    on: {
      "click": function ($event) {
        return _vm.goToPDP(_vm.product.productUrl);
      }
    }
  }, [_vm._v("\n        " + _vm._s(_vm.selectOptionsText) + "\n      ")]) : _vm._e(), _vm._v(" "), _vm.selectOptionsBtn ? _c('button', {
    staticClass: "button button--primary",
    on: {
      "click": function ($event) {
        return _vm.goToPDP(_vm.product.productUrl);
      }
    }
  }, [_vm._v("\n        " + _vm._s(_vm.selectOptionsText) + "\n      ")]) : _vm._e(), _vm._v(" "), _c('a', {
    staticClass: "product-card-details-btn",
    attrs: {
      "href": _vm.product.productUrl
    }
  }, [_vm._v("\n        " + _vm._s(_vm.viewDetailsLink) + "\n      ")])])])]);
};
var staticRenderFns = [];
var __template__ = { render: render, staticRenderFns: staticRenderFns };

export default Object.assign({}, __script__, __template__);
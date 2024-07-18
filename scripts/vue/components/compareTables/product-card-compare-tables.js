//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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

var __script__ = {
  name: "product-card",
  props: {
    product: Object,
  },
  data() {
    return {
      selected: "",
    };
  },

  computed: mapState({
    shapedProducts: (state) => state.shapedProducts,
  }),
  methods: {
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
        properties: {},
      };
      formattedProducts.push(productForCart);

      fetch("/cart/add.js", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          "items": formattedProducts,
        }),
      }).then((cart) => {
        cart.json().then((body) => {
          console.log("CART SUCCE$$$$$$$$$", body);
          gtag("send", {
            hitType: "event",
            eventCategory: "Added to Cart",
            eventAction: "click",
            eventLabel: "{{ product.title }}",
          });
        });
      });
    },
  },
  created() {},
  mounted() {},
};

var render = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "div",
    {
      staticClass: "product-card",
    },
    [
      _c("div", {
        staticClass: "product-image",
        style: {
          "background-image": "url(" + _vm.product.imageUrl + ")",
        },
        on: {
          "click": function($event) {
            return _vm.goToPDP(_vm.product.productUrl);
          },
        },
      }),
      _vm._v(" "),
      _c(
        "h4",
        {
          staticClass: "product-card-title",
        },
        [_vm._v(_vm._s(_vm.product.title))]
      ),
      _vm._v(" "),
      _c("h4", [
        _vm._v(" $" + _vm._s(_vm.product.price.toString().slice(0, -2)) + " "),
      ]),
      _vm._v(" "),
      _c("div", {
        staticClass: "product-text-content",
      }),
      _vm._v(" "),
      _c("h4", [
        _vm._v("$" + _vm._s(_vm.product.price.toString().slice(0, -2))),
      ]),
      _vm._v(" "),
      _vm.addToCartBtn
        ? _c(
            "button",
            {
              staticClass: "product-card-cart-btn",
              on: {
                "click": function($event) {
                  return _vm.addToCart(_vm.product);
                },
              },
            },
            [_vm._v("\n        Add to cart\n      ")]
          )
        : _vm._e(),
      _vm._v(" "),
      _vm.selectOptionsBtn
        ? _c(
            "button",
            {
              staticClass: "product-card-cart-btn",
              on: {
                "click": function($event) {
                  return _vm.goToPDP(_vm.product.productUrl);
                },
              },
            },
            [_vm._v("\n          Select Options\n      ")]
          )
        : _vm._e(),
      _vm._v(" "),
      _c(
        "a",
        {
          staticClass: "product-card-details-btn",
          attrs: {
            "href": _vm.product.productUrl,
          },
        },
        [_vm._v("\n    View Details\n  ")]
      ),
    ]
  );
};
var staticRenderFns = [];
var __template__ = { render: render, staticRenderFns: staticRenderFns };

export default Object.assign({}, __script__, __template__);

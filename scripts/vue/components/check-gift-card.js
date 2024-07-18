//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

import { mapState } from 'vuex';

var __script__ = {
  name: 'gift-card',
  props: {
    settings: Object,
    blocks: Array
  },
  data() {
    return {
      blockSettings: this.settings,
      init: true,
      error: false,
      cardCode: '',
      validReturn: false,
      cardValue: 0,
      remainingBalance: 0
    };
  },
  computed: mapState({}),
  methods: {
    postData: async function (url = "", data = {}) {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });

      return response.json();
    },
    checkCardValue: function (e) {
      e.preventDefault();
      if (this.cardCode !== '') {
        let requestData = {
          "code": this.cardCode.replace(/\s/g, '').toLowerCase(),
          "shopName": "segterra.myshopify.com"
        };
        this.postData("/a/it/giftCardLookup", requestData).then(data => {
          if (data.cardFound) {
            this.error = false;
            this.validReturn = true;
            this.cardValue = data.card[0].value;
            this.remainingBalance = data.card[0].balance;
          } else {
            this.error = true;
            this.validReturn = false;
          }
        });
      }
    },
    resetStates: function () {
      this.error = false;
    },
    emptyInput: function () {
      this.cardCode = '';
      this.resetStates();
    }
  },
  created() {},
  mounted() {}
};

var render = function () {
  var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;
  return _c('form', {
    staticClass: "gifted-inner--meta vertical gift-card",
    on: {
      "submit": function ($event) {
        $event.preventDefault();
        return _vm.checkCardValue.apply(null, arguments);
      }
    }
  }, [_vm.validReturn ? _c('div', [_c('div', {
    staticClass: "gifted-result"
  }, [_c('p', {
    staticClass: "gifted-result--item gifted-result--remaining"
  }, [_vm._v("\n        $" + _vm._s(_vm.remainingBalance) + "\n      ")]), _vm._v(" "), _vm._m(0)]), _vm._v(" "), _c('button', {
    staticClass: "button button--primary --full"
  }, [_vm._v("Continue Shopping")])]) : _c('div', [_c('label', {
    class: {
      'invalid': this.error
    }
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model.trim",
      value: _vm.cardCode,
      expression: "cardCode",
      modifiers: {
        "trim": true
      }
    }],
    attrs: {
      "type": "text",
      "required": "",
      "id": "giftedCode",
      "name": "giftedCode"
    },
    domProps: {
      "value": _vm.cardCode
    },
    on: {
      "keyup": function ($event) {
        return _vm.resetStates();
      },
      "input": function ($event) {
        if ($event.target.composing) {
          return;
        }
        _vm.cardCode = $event.target.value.trim();
      },
      "blur": function ($event) {
        return _vm.$forceUpdate();
      }
    }
  }), _vm._v(" "), _c('div', {
    staticClass: "label-text"
  }, [_vm._v(_vm._s(_vm.settings.input_label))]), _vm._v(" "), this.error ? _c('p', {
    staticClass: "clear",
    on: {
      "click": function ($event) {
        return _vm.emptyInput();
      }
    }
  }, [_vm._v("Clear")]) : _vm._e()]), _vm._v(" "), !_vm.error || !_vm.cardCode ? _c('div', [_c('button', {
    staticClass: "button button--primary --full",
    on: {
      "click": _vm.checkCardValue
    }
  }, [_vm._v(_vm._s(_vm.settings.button_label))])]) : _vm._e()]), _vm._v(" "), _vm.error ? _c('div', {
    staticClass: "error-state",
    attrs: {
      "id": "error"
    },
    domProps: {
      "innerHTML": _vm._s(_vm.settings.error_text)
    }
  }) : _vm._e()]);
};
var staticRenderFns = [function () {
  var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;
  return _c('p', [_c('a', {
    attrs: {
      "href": "/pages/check-gift-card-balance"
    }
  }, [_vm._v("Check another gift card")])]);
}];
var __template__ = { render: render, staticRenderFns: staticRenderFns };

export default Object.assign({}, __script__, __template__);
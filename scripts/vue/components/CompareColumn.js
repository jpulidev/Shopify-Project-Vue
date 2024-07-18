//
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
  //   components: { EnterName, PreferredCoffee },
  name: 'compare-column',
  props: {
    settings: Object,
    blocks: Array,
    allProducts: Array
  },
  data() {
    return {
      selectedFilter: '',
      activeIndex: ''
    };
  },

  computed: mapState({
    kbProducts: state => state.kbProducts,
    shopifyProducts: state => state.shopifyProducts
  }),

  methods: {},
  created() {
    console.log('COMPARE COL CREATED!!!! ');
    // let theProducts = this.allProducts
    // this.$store.commit("setAllProducts", theProducts)
  },
  mounted() {
    console.log('COMPARE COL WAS MOUNTED!!!');
    // this.$store.dispatch("setProductData")
    // this.setAllFilters()
  }
};

var render = function () {
  var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;
  return _vm._m(0);
};
var staticRenderFns = [function () {
  var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;
  return _c('div', {
    staticClass: "compare-column"
  }, [_c('p', [_vm._v(" 5 stars ")]), _vm._v(" "), _c('p', [_vm._v(" blood test included ")]), _vm._v(" "), _c('p', [_vm._v(" 45 biomarkers ")]), _vm._v(" "), _c('p', [_vm._v(" ✔️ ")])]);
}];
var __template__ = { render: render, staticRenderFns: staticRenderFns };

export default Object.assign({}, __script__, __template__);
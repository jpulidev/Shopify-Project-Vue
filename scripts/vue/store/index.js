import Vue from "vue";
import Vuex from "vuex";
// Vuex requires Promises which are not supported in IE; below is the polyfill to make that work
import "es6-promise/auto";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    goalFilters: [
      "All",
      "Overall Health",
      "High Performance",
      "Healthy Aging",
      "Immunity",
    ],
    otherFilters: [
      "Available worldwide",
      "Best sellers",
      "Bundles",
      "At-home kits",
    ],
    kbProducts: [
      {
        id: 123,
        title: "Ultimate",
        productStarRating: 5,
        productDescriptionShort: "Maximum characters 20",
        biomarkerCount: "43 biomarkers",
        bloodTestIncluded: true,
        price: 58900,
        productUrl: "",
        categories: ["All", "Best Sellers"],
      },
      {
        id: 345,
        title: "Essentials",
        productStarRating: 4.3,
        productDescriptionShort: "Maximum characters 20",
        biomarkerCount: "13 biomarkers",
        bloodTestIncluded: true,
        price: 19900,
        productUrl: "",
        categories: ["All", "Best Sellers"],
      },
      {
        id: 546,
        title: "Blood Results Upload",
        productStarRating: 5,
        productDescriptionShort: "Maximum characters 20",
        biomarkerCount: "Up to 43 biomarkers",
        bloodTestIncluded: false,
        price: 9900,
        productUrl: "",
        categories: [
          "All",
          "Best Sellers",
          "Available Worldwide",
          "Data Upload Plans",
        ],
      },
    ],
    shopifyProducts: "",
    settings: "",
    shapedProducts: "",
    comparisonTableProducts: "",
    comparisonTablePage: 1,
    comparisonTableActiveSet: "",
    pdpCompareSet: "",
    mobileProductOne: "",
    mobileProductTwo: "",
  },
  getters: {},

  mutations: {
    setSectionSettings: (state, payload) => (state.settings = payload),
    setAllProducts: (state, payload) => (state.shopifyProducts = payload),
    setShapedProducts: (state, payload) => (state.shapedProducts = payload),
    setComparisonTableProducts: (state, payload) =>
      (state.comparisonTableProducts = payload),
    setComparisonTablePage: (state, num) => (state.comparisonTablePage = num),
    setComparisonActiveSet: (state, set) =>
      (state.comparisonTableActiveSet = set),
    setMobileProductOne: (state, product) => (state.mobileProductOne = product),
    setMobileProductTwo: (state, product) => (state.mobileProductTwo = product),
    pdpCompareSet: (state, set) => (state.pdpCompareSet = set),
  },

  actions: {
    setProductData({ commit, dispatch, state }, products) {
      let shopifyProducts = state.shopifyProducts;
      let allProducts = [];
      let comparisonTableProducts = [];

      if (shopifyProducts) {
        shopifyProducts.forEach((i) => {
          const product = i.product;
          const biomarkers = i.biomarkers;
          const productIcons = i.productIcons;
          let bloodTestBool = null;
          let dnaTestBool = null;
          let uploadPastBool = null;
          let markerCount = "";
          let availability = "";
          let productFlag = "";
          let shortDesc = "";
          let multiUnitDiscounts = [];

          if (product.tags) {
            product.tags.forEach((tag) => {
              let trimmedTag = tag.trim().toLowerCase();
              if (trimmedTag == "blood test included") {
                bloodTestBool = true;
              }

              if (trimmedTag == "no blood test") {
                bloodTestBool = false;
              }

              if (trimmedTag == "dna test included") {
                dnaTestBool = true;
              }

              if (trimmedTag == "no dna test") {
                dnaTestBool = false;
              }

              if (trimmedTag == "upload past results") {
                uploadPastBool = true;
              }

              if (trimmedTag == "most popular") {
                productFlag = tag;
              }

              if (trimmedTag == "new") {
                productFlag = tag;
              }

              if (trimmedTag.includes("discount:_")) {
                let discountTag = trimmedTag.replace("discount:_", "");
                if (discountTag.includes("value_")) {
                  let discountObj = discountTag
                    .replace("value_", "")
                    .split("_");
                  multiUnitDiscounts.push({
                    q: discountObj[0],
                    v: discountObj[1],
                  });
                }
              }

              const splitTag = tag.split("|");
              if (splitTag[0].trim().toLowerCase() == "markers count") {
                markerCount = splitTag[1];
              }

              if (splitTag[0].trim().toLowerCase() == "availability") {
                availability = splitTag[1];
              }

              if (splitTag[0].trim().toLowerCase() == "short description") {
                shortDesc = splitTag[1];
              }
            });
          }

          let biomarkersForProduct = [];

          let shapedProduct = {
            id: product.id,
            variantId: product.variants[0].id,
            variants: product.variants,
            title: product.title,
            productStarRating: 5,
            productDescriptionShort: shortDesc,
            biomarkerCount: markerCount,
            bloodTestIncluded: bloodTestBool,
            dnaTestIncluded: dnaTestBool,
            price: product.price,
            productUrl: `/products/${product.handle}`,
            productMedia:product.images,
            categories: product.tags,
            imageUrl: product.featured_image,
            uploadPastResults: uploadPastBool,
            biomarkers: biomarkersForProduct,
            availability: availability,
            productFlag: productFlag,
            productIcons: productIcons,
            discounts: multiUnitDiscounts,
          };
          
          

          if (
            Object.keys(biomarkers).length &&
            biomarkers.constructor === Object
          ) {
            let titles = biomarkers.title;
            let markers = biomarkers.markers;
            if (titles) {
              titles.forEach((title) => {
                let index = titles.indexOf(title);
                let obj = {
                  title,
                  markers: markers[index].split("|"),
                };
                biomarkersForProduct.push(obj);
              });
            }
            comparisonTableProducts.push(shapedProduct);
          }

          allProducts.push(shapedProduct);
        });
      }

      commit("setShapedProducts", allProducts);
      commit("setComparisonTableProducts", comparisonTableProducts);
      dispatch("setProductSlice", 1);
      dispatch("setPDPcompareSlice");
    },
    setProductSlice({ commit }, page) {
      let setOne = this.state.comparisonTableProducts.slice(0, 4);
      let setTwo = this.state.comparisonTableProducts.slice(4, 7);

      // let emptyProduct = {
      //   id: 123,
      //   variantId: 456,
      //   title: "",
      //   productStarRating: 5,
      //   productDescriptionShort: "",
      //   biomarkerCount: "",
      //   bloodTestIncluded: null,
      //   dnaTestIncluded: null,
      //   price: "",
      //   productUrl: "",
      //   categories: [],
      //   imageUrl: "",
      //   uploadPastResults: null,
      //   biomarkers: [],
      // };

      if (page == 1) {
        commit("setComparisonActiveSet", setOne);
      }
      if (page == 2) {
        if (setTwo.length == 3) {
          // setTwo.push(emptyProduct);
        }
        commit("setComparisonActiveSet", setTwo);
      }
    },
    setPDPcompareSlice({ commit }) {
      let pdpCompareSet = this.state.comparisonTableProducts.slice(0, 5);
      commit("pdpCompareSet", pdpCompareSet);
    },
    setCategories({ commit, state }, products) {
      let allProducts = state.shopifyProducts;
      let categories = [];
      if (allProducts) {
        allProducts.forEach((product) => {
          product.tags.forEach((tag) => {
            categories.push(tag);
          });
        });
      }
      let uniqueCats = [...new Set(categories)];
    },
  },
});

<template>
  <div>
    <table v-if="this.biomarkerDataSet" class="comparison-table-desktop">
      <caption>Strength & Endurance </caption>
      <tr>
        <th>Creatine Kinase</th>
        <td v-for="(product,i) in productSet" :key="i">
          <div v-if="product.creatinekinase" class="success-checkmark"> 
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 3 25 30"><path d="M9 21.035l-9-8.638 2.791-2.87 6.156 5.874 12.21-12.436 2.843 2.817z"/></svg>
          </div>
        </td>
      </tr>
      <tr>
        <th>Testosterone</th>
        <td v-for="(product,i) in productSet" :key="i">
          <div v-if="product.testosterone" class="success-checkmark"> 
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 3 25 30"><path d="M9 21.035l-9-8.638 2.791-2.87 6.156 5.874 12.21-12.436 2.843 2.817z"/></svg>
          </div>
        </td>
      </tr>
      <tr>
        <th>Free Testosterone</th>
        <td v-for="(product,i) in productSet" :key="i">
          <div v-if="product.freetestosterone" class="success-checkmark"> 
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 3 25 30"><path d="M9 21.035l-9-8.638 2.791-2.87 6.156 5.874 12.21-12.436 2.843 2.817z"/></svg>
          </div>
        </td>
      </tr>
      <tr>
        <th>DHEAS</th>
        <td v-for="(product,i) in productSet" :key="i">
          <div v-if="product.dheas" class="success-checkmark"> 
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 3 25 30"><path d="M9 21.035l-9-8.638 2.791-2.87 6.156 5.874 12.21-12.436 2.843 2.817z"/></svg>
          </div>
        </td>
      </tr>
      <tr>
        <th>Cortisol</th>
        <td v-for="(product,i) in productSet" :key="i">
          <div v-if="product.cortisol" class="success-checkmark"> 
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 3 25 30"><path d="M9 21.035l-9-8.638 2.791-2.87 6.156 5.874 12.21-12.436 2.843 2.817z"/></svg>
          </div>
        </td>
      </tr>
      <tr>
        <th>Sex-Hormone Binding Globulin (SHBG)</th>
        <td v-for="(product,i) in productSet" :key="i">
          <div v-if="product.shbg" class="success-checkmark"> 
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 3 25 30"><path d="M9 21.035l-9-8.638 2.791-2.87 6.156 5.874 12.21-12.436 2.843 2.817z"/></svg>
          </div>
        </td>
      </tr>
      <tr>
        <th>Albumin</th>
        <td v-for="(product,i) in productSet" :key="i">
          <div v-if="product.albumin" class="success-checkmark"> 
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 3 25 30"><path d="M9 21.035l-9-8.638 2.791-2.87 6.156 5.874 12.21-12.436 2.843 2.817z"/></svg>
          </div>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
// import CompareColumn from './compare-column'
// import EnergyMetabolism from './energy-metabolism.vue'

export default {
name: 'strength-endurance',
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
      biomarkerDataSet: false,
    };
  },

  computed: mapState({
    shopifyProducts: (state) => state.shopifyProducts,
    shapedProducts: (state) => state.shapedProducts,
    productSet: (state) => state.comparisonTableActiveSet,
  }),

  methods: {
    setBiomarkerData() {
      this.productSet.forEach(product => {
        let biomarkers = product.biomarkers
        biomarkers.forEach(marker => {
          if(marker.title == "Strength & Endurance") {
            let markerIndex = product.biomarkers.indexOf(marker)
            let markers = biomarkers[markerIndex].markers
            markers.forEach(m => {
              let markerKey = m.replace(/ /g, "").toLowerCase()
              product[markerKey] = true;
              return product;
            })
          }
        })
      })
      this.biomarkerDataSet = true;
    },
  },
  created() {
  },
  mounted() {
    this.setBiomarkerData();
  },
  beforeUpdate() {
    this.setBiomarkerData()
  },
};
</script>

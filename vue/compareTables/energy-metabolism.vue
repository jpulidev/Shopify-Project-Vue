<template>
  <div>
    <table v-if="this.biomarkerDataSet" class="comparison-table-desktop">
      <caption>Metabolism & Weight Control </caption>
      <tr>
        <th>Glucose</th>
        <td v-for="(product,i) in productSet" :key="i">
          <div v-if="product.glucose" class="success-checkmark"> 
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 3 25 30"><path d="M9 21.035l-9-8.638 2.791-2.87 6.156 5.874 12.21-12.436 2.843 2.817z"/></svg>
          </div>
        </td>
      </tr>
      <tr>
        <th>Hemoglobin A1c (HbA1c)</th>
        <td v-for="(product,i) in productSet" :key="i">
          <div v-if="product.hba1c" class="success-checkmark"> 
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 3 25 30"><path d="M9 21.035l-9-8.638 2.791-2.87 6.156 5.874 12.21-12.436 2.843 2.817z"/></svg>
          </div>
        </td>
      </tr>
      <tr>
        <th>Total Cholesterol</th>
        <td v-for="(product,i) in productSet" :key="i">
          <div v-if="product.totalcholesterol" class="success-checkmark"> 
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 3 25 30"><path d="M9 21.035l-9-8.638 2.791-2.87 6.156 5.874 12.21-12.436 2.843 2.817z"/></svg>
          </div>
        </td>
      </tr>
      <tr>
        <th>High-density Lipoprotein (HDL)</th>
        <td v-for="(product,i) in productSet" :key="i">
          <div v-if="product.hdl" class="success-checkmark"> 
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 3 25 30"><path d="M9 21.035l-9-8.638 2.791-2.87 6.156 5.874 12.21-12.436 2.843 2.817z"/></svg>
          </div>
        </td>
      </tr>
      <tr>
        <th>Low-density Lipoprotein (LDL)</th>
        <td v-for="(product,i) in productSet" :key="i">
          <div v-if="product.ldl" class="success-checkmark"> 
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 3 25 30"><path d="M9 21.035l-9-8.638 2.791-2.87 6.156 5.874 12.21-12.436 2.843 2.817z"/></svg>
          </div>
        </td>
      </tr>
      <tr>
        <th>Triglycerides</th>
        <td v-for="(product,i) in productSet" :key="i">
          <div v-if="product.triglycerides" class="success-checkmark"> 
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 3 25 30"><path d="M9 21.035l-9-8.638 2.791-2.87 6.156 5.874 12.21-12.436 2.843 2.817z"/></svg>
          </div>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
name: 'energy-metabolism',
// components: {
//   },
  props: {
    settings: Object,
    blocks: Array,
    allProducts: Array,
    productsWithBiomarkers: Array,
    allBiomarkers: Array,
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
    comparisonTableProducts: (state) => state.comparisonTableProducts,
    productSet: (state) => state.comparisonTableActiveSet,
  }),

  methods: {
    setBiomarkerData() {
      this.productSet.forEach(product => {
        let biomarkers = product.biomarkers
        biomarkers.forEach(marker => {
          if(marker.title == "Metabolism & Weight Control") {
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
    setProducts() {

    }
  },
  created() {    
  },
  mounted() {
    this.setBiomarkerData();
  },
  beforeUpdate() {
    this.setBiomarkerData()
  },
  updated() {
  }
};
</script>

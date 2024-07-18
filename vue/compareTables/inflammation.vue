<template>
  <div>
    <table v-if="this.biomarkerDataSet" class="comparison-table-desktop">
      <caption>Inflammation </caption>
      <tr>
        <th>Monocytes (percent)</th>
        <td v-for="(product,i) in productSet" :key="i">
          <div v-if="product.monocytespercent" class="success-checkmark"> 
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 3 25 30"><path d="M9 21.035l-9-8.638 2.791-2.87 6.156 5.874 12.21-12.436 2.843 2.817z"/></svg>
          </div>
        </td>
      </tr>
       <tr>
        <th>Lymphocytes (percent)</th>
        <td v-for="(product,i) in productSet" :key="i">
          <div v-if="product.lymphocytespercent" class="success-checkmark"> 
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 3 25 30"><path d="M9 21.035l-9-8.638 2.791-2.87 6.156 5.874 12.21-12.436 2.843 2.817z"/></svg>
          </div>
        </td>
      </tr>
      <tr>
        <th>Basophils (percent)</th>
        <td v-for="(product,i) in productSet" :key="i">
          <div v-if="product.basophilspercent" class="success-checkmark"> 
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 3 25 30"><path d="M9 21.035l-9-8.638 2.791-2.87 6.156 5.874 12.21-12.436 2.843 2.817z"/></svg>
          </div>
        </td>
      </tr>
       <tr>
        <th>Eosinophils (percent)</th>
        <td v-for="(product,i) in productSet" :key="i">
          <div v-if="product.eosinophilspercent" class="success-checkmark"> 
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 3 25 30"><path d="M9 21.035l-9-8.638 2.791-2.87 6.156 5.874 12.21-12.436 2.843 2.817z"/></svg>
          </div>
        </td>
      </tr>
     <tr>
        <th>Neutrophils (percent)</th>
        <td v-for="(product,i) in productSet" :key="i">
          <div v-if="product.neutrophilspercent" class="success-checkmark"> 
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 3 25 30"><path d="M9 21.035l-9-8.638 2.791-2.87 6.156 5.874 12.21-12.436 2.843 2.817z"/></svg>
          </div>
        </td>
      </tr>
       <tr>
        <th>Monocytes</th>
        <td v-for="(product,i) in productSet" :key="i">
          <div v-if="product.monocytes" class="success-checkmark"> 
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 3 25 30"><path d="M9 21.035l-9-8.638 2.791-2.87 6.156 5.874 12.21-12.436 2.843 2.817z"/></svg>
          </div>
        </td>
      </tr>
  <tr>
        <th>Lymphocytes</th>
        <td v-for="(product,i) in productSet" :key="i">
          <div v-if="product.lymphocytes" class="success-checkmark"> 
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 3 25 30"><path d="M9 21.035l-9-8.638 2.791-2.87 6.156 5.874 12.21-12.436 2.843 2.817z"/></svg>
          </div>
        </td>
      </tr>
      <tr>
        <th>Eosinophils</th>
        <td v-for="(product,i) in productSet" :key="i">
          <div v-if="product.eosinophils" class="success-checkmark"> 
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 3 25 30"><path d="M9 21.035l-9-8.638 2.791-2.87 6.156 5.874 12.21-12.436 2.843 2.817z"/></svg>
          </div>
        </td>
      </tr>
      <tr>
        <th>Basophils</th>
        <td v-for="(product,i) in productSet" :key="i">
          <div v-if="product.basophils" class="success-checkmark"> 
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 3 25 30"><path d="M9 21.035l-9-8.638 2.791-2.87 6.156 5.874 12.21-12.436 2.843 2.817z"/></svg>
          </div>
        </td>
      </tr>
      <tr>
        <th>Neutrophils</th>
        <td v-for="(product,i) in productSet" :key="i">
          <div v-if="product.neutrophils" class="success-checkmark"> 
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 3 25 30"><path d="M9 21.035l-9-8.638 2.791-2.87 6.156 5.874 12.21-12.436 2.843 2.817z"/></svg>
          </div>
        </td>
      </tr>
      <tr>
        <th>hsCRP</th>
        <td v-for="(product,i) in productSet" :key="i">
          <div v-if="product.hscrp" class="success-checkmark"> 
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 3 25 30"><path d="M9 21.035l-9-8.638 2.791-2.87 6.156 5.874 12.21-12.436 2.843 2.817z"/></svg>
          </div>
        </td>
      </tr>
      <tr>
        <th>White Blood Cells</th>
        <td v-for="(product,i) in productSet" :key="i">
          <div v-if="product.whitebloodcells" class="success-checkmark"> 
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
name: 'inflammation',
// components: {
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
    productSet: (state) => state.comparisonTableActiveSet
  }),

  methods: {
    setBiomarkerData() {
      this.productSet.forEach(product => {
        let biomarkers = product.biomarkers
        biomarkers.forEach(marker => {
          if(marker.title == "Inflammation") {
            let markerIndex = product.biomarkers.indexOf(marker)
            let markers = biomarkers[markerIndex].markers
            markers.forEach(m => {
              let markerKey = m.replace(/ /g, "").toLowerCase()
              if(markerKey.includes('(')) {
                  let trimmedMarker = markerKey.slice(0, -9)
                  let percentMarker = trimmedMarker.concat("percent")
                  product[percentMarker] = true;
              } else product[markerKey] = true;
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

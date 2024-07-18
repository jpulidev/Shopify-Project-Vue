<template>
  <div>
    <table v-if="this.biomarkerDataSet" class="comparison-table-desktop">
      <caption>Inflammation </caption>
      <tr>
        <td v-for="(product,i) in productSet" :key="i">
          <div v-if="product.monocytespercent">
            Monocytes (percent)
           </div>
        </td>
      </tr>
      <tr>
        <td v-for="(product,i) in productSet" :key="i">
          <div v-if="product.lymphocytespercent">
            Lymphocytes (percent)
           </div>
        </td>
      </tr>
      <tr>
        <td v-for="(product,i) in productSet" :key="i">
          <div v-if="product.basophilspercent">
            Basophils (percent)
           </div>
        </td>
      </tr>
      <tr>
        <td v-for="(product,i) in productSet" :key="i">
          <div v-if="product.eosinophilspercent">
            Eosinophils (percent)
           </div>
        </td>
      </tr>
      <tr>
        <td v-for="(product,i) in productSet" :key="i">
          <div v-if="product.neutrophilspercent">
            Neutrophils (percent)
           </div>
        </td>
      </tr>
      <tr>
        <td v-for="(product,i) in productSet" :key="i">
          <div v-if="product.monocytes">
            Monocytes
           </div>
        </td>
      </tr>
      <tr>
        <td v-for="(product,i) in productSet" :key="i">
          <div v-if="product.lymphocytes">
            Lymphocytes
           </div>
        </td>
      </tr>
      <tr>
        <td v-for="(product,i) in productSet" :key="i">
          <div v-if="product.eosinophils">
            Eosinophils
           </div>
        </td>
      </tr>
      <tr>
        <td v-for="(product,i) in productSet" :key="i">
          <div v-if="product.basophils">
            Basophils
           </div>
        </td>
      </tr>
      <tr>
        <td v-for="(product,i) in productSet" :key="i">
          <div v-if="product.neutrophils">
            Neutrophils
           </div>
        </td>
      </tr>
      <tr>
        <td v-for="(product,i) in productSet" :key="i">
          <div v-if="product.hscrp">
            hsCRP
           </div>
        </td>
      </tr>
      <tr>
        <td v-for="(product,i) in productSet" :key="i">
          <div v-if="product.whitebloodcells">
            White Blood Cells
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
  props: {
    settings: Object,
    blocks: Array,
    allProducts: Array,
    productsWithBiomarkers: Array,
    allBiomarkers: Array,
    productSet: Array,
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
  }),

  methods: {
    setBiomarkerData() {
      this.productSet.forEach(product => {
        let biomarkers = product.biomarkers
        biomarkers.forEach(marker => {
          if(marker.title == "Inflammation") {
            let markerIndex = product.biomarkers.indexOf(marker)
            let markers = biomarkers[markerIndex].markers
            if(markers.length) {
              markers.forEach(m => {
                let markerKey = m.replace(/ /g, "").toLowerCase()
                if(markerKey.includes('(')) {
                    let trimmedMarker = markerKey.slice(0, -9)
                    let percentMarker = trimmedMarker.concat("percent")
                    product[percentMarker] = true;
                } else product[markerKey] = true;
                return product;
              })
              this.biomarkerDataSet = true;
            }
          }
        })
      })
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

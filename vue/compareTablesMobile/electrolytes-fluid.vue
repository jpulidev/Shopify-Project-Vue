<template>
  <div>
    <table v-if="this.biomarkerDataSet" class="comparison-table-desktop">
      <caption>Electrolytes & Fluid</caption>
      <tr>
        <td v-for="(product,i) in productSet" :key="i">
          <div v-if="product.sodium">
            Sodium
           </div>
        </td>
      </tr>
      <tr>
        <td v-for="(product,i) in productSet" :key="i">
          <div v-if="product.potassium">
            Potassium
           </div>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
name: 'electrolytes-fluid',
// components: {
//   },
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
          if(marker.title == "Electrolytes & Fluid Balance") {
            let markerIndex = product.biomarkers.indexOf(marker)
            let markers = biomarkers[markerIndex].markers
            if (markers.length) {
              markers.forEach(m => {
                let markerKey = m.replace(/ /g, "").toLowerCase()
                product[markerKey] = true;
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
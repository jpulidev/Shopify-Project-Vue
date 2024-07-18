<template>
  <div>
    <table v-if="this.biomarkerDataSet" class="comparison-table-desktop">
      <caption>Metabolism & Weight Control </caption>
      <tr>
        <td v-for="(product,i) in productSet" :key="i">
          <div v-if="product.glucose">
            Glucose
           </div>
        </td>
      </tr>
      <tr>
        <td v-for="(product,i) in productSet" :key="i">
          <div v-if="product.hba1c">
            HBA1C
           </div>
        </td>
      </tr>
      <tr>
        <td v-for="(product,i) in productSet" :key="i">
          <div v-if="product.totalcholesterol">
            Total Cholesterol
           </div>
        </td>
      </tr>
      <tr>
        <td v-for="(product,i) in productSet" :key="i">
          <div v-if="product.hdl">
            High-density Lipoprotein (HDL)
           </div>
        </td>
      </tr>
      <tr>
        <td v-for="(product,i) in productSet" :key="i">
          <div v-if="product.ldl">
            Low-density Lipoprotein (LDL)
           </div>
        </td>
      </tr>
      <tr>
        <td v-for="(product,i) in productSet" :key="i">
          <div v-if="product.triglycerides">
            Triglycerides
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
    comparisonTableProducts: (state) => state.comparisonTableProducts,
  }),

  methods: {
    setBiomarkerData() {
      this.productSet.forEach(product => {
        let biomarkers = product.biomarkers
        biomarkers.forEach(marker => {
          if(marker.title == "Metabolism & Weight Control") {
            let markerIndex = product.biomarkers.indexOf(marker)
            let markers = biomarkers[markerIndex].markers
            if(markers.length) {
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
};
</script>

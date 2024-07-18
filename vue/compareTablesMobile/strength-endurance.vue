<template>
  <div>
    <table v-if="this.biomarkerDataSet" class="comparison-table-desktop">
      <caption>Strength & Endurance </caption>
      <tr>
        <td v-for="(product,i) in productSet" :key="i">
          <div v-if="product.creatinekinase">
            Creatine Kinase
           </div>
        </td>
      </tr>
      <tr>
        <td v-for="(product,i) in productSet" :key="i">
          <div v-if="product.testosterone">
            Testosterone
           </div>
        </td>
      </tr>
      <tr>
        <td v-for="(product,i) in productSet" :key="i">
          <div v-if="product.freetestosterone">
            Free Testosterone
           </div>
        </td>
      </tr>
      <tr>
        <td v-for="(product,i) in productSet" :key="i">
          <div v-if="product.dheas">
            DHEAS
           </div>
        </td>
      </tr>
      <tr>
        <td v-for="(product,i) in productSet" :key="i">
          <div v-if="product.cortisol">
            Cortisol
           </div>
        </td>
      </tr>
      <tr>
        <td v-for="(product,i) in productSet" :key="i">
          <div v-if="product.shbg">
            Sex-Hormone Binding Globulin (SHBG)
           </div>
        </td>
      </tr>
      <tr>
        <td v-for="(product,i) in productSet" :key="i">
          <div v-if="product.albumin">
            Albumin
           </div>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
name: 'strength-endurance',
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
          if(marker.title == "Strength & Endurance") {
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

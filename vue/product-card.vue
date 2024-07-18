<template>
  <div v-if="product.productFlag == 'Most Popular'" class="product-card feature-product-hp ">
      <div
      :style="{ 'background-image': 'url(' + product.imageUrl + ')' }"
      class="product-image featured-product-mobile"
      @click="goToPDP(product.productUrl)"
    >
      <!-- <img :src="product.imageUrl" /> --> 
    </div>
    <span v-if="product.productFlag == 'Most Popular'" class="most-popular-upsell most-popular-upsell-text show-most-popular ">  
    </span>
    <span v-if="product.productFlag == 'New'" class="most-popular-upsell most-popular-upsell-text show-most-popular product-new-flag">  
    </span>

    <div class="product-card__content featured-content-product-hp">
   
      <div class="product-card__content-top">
       <h4 class="product-card-title">{{ product.title }}</h4>
        <div v-if="product.variants[0].sku != null && showReviews == 'true'">
          <div class="list-view-item" data-product-stars>
            <!-- TrustBox widget - Product Mini Multisource -->
            <div class="trustpilot-widget" data-locale="en-US" data-template-id="577258fb31f02306e4e3aaf9" data-businessunit-id="5df96c4c7890b800016789c7" data-style-height="18px" data-style-width="100%" data-theme="light" data-tags="SelectedReview" :data-sku="product.variants[0].sku" data-star-color="#0AA9FF" data-font-family="Open Sans" data-text-color="#232D37" data-no-reviews="show" data-scroll-to-list="false">
            </div>
            <!-- End TrustBox widget -->
          </div>
        </div>
        <div class="product-text-content">
          
     <ul>
          <li class="biomarkers-list">{{ product.biomarkerCount }}</li>
          
          <li class="biomarkers-list" v-if="product.bloodTestIncluded != null">
            {{
              product.bloodTestIncluded
                ? "Blood Test Included"
                : "Blood Test NOT Included"
            }}
          </li>
          <li class="biomarkers-list" v-if="product.dnaTestIncluded != null">
            {{
              product.dnaTestIncluded
                ? "DNA Test Included"
                : "DNA Test NOT Included"
            }}
          </li>
          <li class="biomarkers-list">{{ product.productDescriptionShort }}</li>
      </ul>    
        </div>
           <h4 class="product-card__price" >${{ product.variants[0].price.toString().slice(0, -2) }} 
             <span>per test</span>
           </h4>
        <!-- Add to cart Btn
        <button v-if="addToCartBtn"
        class="button button--primary" data-add-to-cart :data-variant-id="product.variantId" :data-product-title="product.title">
          <span class="add-to-cart-text" data-add-to-cart-text :class="isHidden ? '' : 'hide' ">
            {{ addToCartText }}
          </span>
          <span :class="isHidden ? 'hide' : '' " data-loader>
            <svg aria-hidden="true" focusable="false" role="presentation" class="icon icon-spinner" viewBox="0 0 20 20"><path d="M7.229 1.173a9.25 9.25 0 1 0 11.655 11.412 1.25 1.25 0 1 0-2.4-.698 6.75 6.75 0 1 1-8.506-8.329 1.25 1.25 0 1 0-.75-2.385z" fill="#919EAB"/></svg>
          </span>
        </button>
        --> 

        
        <div v-if="discountMessage != ''" class="buy-more-message-svg">
          <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
             width="21px" height="21px" viewBox="0 0 512.000000 512.000000"
             preserveAspectRatio="xMidYMid meet">

            <g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
              fill="#64c800" stroke="none">
              <path d="M395 5106 c-181 -44 -346 -213 -384 -394 -14 -70 -16 -1915 -1 -1993
                5 -30 26 -88 46 -129 35 -73 67 -106 1248 -1286 1181 -1181 1213 -1213 1286
                -1248 150 -72 297 -72 447 -2 77 37 89 47 1035 994 943 943 958 958 993 1034
                71 149 71 296 1 445 -37 77 -45 86 -1249 1290 -1081 1080 -1219 1215 -1274
                  1242 -126 62 -95 61 -1143 60 -714 -1 -968 -4 -1005 -13z m565 -506 c80 -15
                149 -51 203 -105 58 -58 91 -120 107 -202 51 -258 -185 -494 -443 -443 -163
                32 -277 149 -308 315 -35 192 106 396 301 434 63 12 80 12 140 1z"/>
              </g>
               </svg>
          <span>{{ discountMessage }}</span>
           <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
             width="21px" height="21px" viewBox="0 0 512.000000 512.000000"
             preserveAspectRatio="xMidYMid meet">

            <g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
              fill="#64c800" stroke="none">
              <path d="M395 5106 c-181 -44 -346 -213 -384 -394 -14 -70 -16 -1915 -1 -1993
                5 -30 26 -88 46 -129 35 -73 67 -106 1248 -1286 1181 -1181 1213 -1213 1286
                -1248 150 -72 297 -72 447 -2 77 37 89 47 1035 994 943 943 958 958 993 1034
                71 149 71 296 1 445 -37 77 -45 86 -1249 1290 -1081 1080 -1219 1215 -1274
                  1242 -126 62 -95 61 -1143 60 -714 -1 -968 -4 -1005 -13z m565 -506 c80 -15
                149 -51 203 -105 58 -58 91 -120 107 -202 51 -258 -185 -494 -443 -443 -163
                32 -277 149 -308 315 -35 192 106 396 301 434 63 12 80 12 140 1z"/>
              </g>
               </svg>
           </div>
        
        <button v-if="addToCartBtn"  @click="goToPDP(product.productUrl)" class="button button--primary">
          {{ selectOptionsText }}
        </button>
        <button v-if="selectOptionsBtn" @click="goToPDP(product.productUrl)" class="button button--primary">
          {{ selectOptionsText }}
        </button>
        <a class="product-card-details-btn" :href="product.productUrl">
          {{ viewDetailsLink }}
        </a>
      </div>
      <div class="product-icons">
     
     <div v-for="(value, propertyName) in product.productIcons" class="metafields-icons">
      <img :src="`${value[0].src}`">
       </div>
    
      </div>
      
    </div>
   <!-- <div
      :style="{ 'background-image': 'url(' + product.imageUrl + ')' }"
      class="featured-product-image featured-product-desktop"
      @click="goToPDP(product.productUrl)"
    >
       <img :src="product.imageUrl" /> 
    </div>--> 
   <div class="featured-product-image featured-product-desktop"
      >
  <swiper class="swiper" :options="swiperOption" ref="mySwiperRef">
    <swiper-slide  v-for="(value, propertyName) in product.productMedia" class="swiper-slide">
            <img :src="`${value}`" @click="goToPDP(product.productUrl)" >
        </swiper-slide>
  
    <div class="swiper-button-prev slide-preview-hide" slot="button-prev"></div>
    <div class="swiper-button-next" slot="button-next"
    ></div>
     <div class="swiper-pagination" slot="pagination"></div>
  </swiper>
        

  </div> 
  </div>
   <div v-else class="product-card">
     <div
      :style="{ 'background-image': 'url(' + product.imageUrl + ')' }"
      class="product-image"
      @click="goToPDP(product.productUrl)"
    >
      <!-- <img :src="product.imageUrl" /> --> 
    </div>
    <span v-if="product.productFlag == 'Most Popular'" class="most-popular-upsell most-popular-upsell-text show-most-popular ">  
    </span>
    <span v-if="product.productFlag == 'New'" class="most-popular-upsell most-popular-upsell-text show-most-popular product-new-flag">  
    </span>

    <h4 class="product-card-title">{{ product.title }}</h4>

    <div class="product-card__content">
      <div class="product-card__content-top">
        <div v-if="product.variants[0].sku != null && showReviews == 'true'">
          <div class="list-view-item" data-product-stars>
            <!-- TrustBox widget - Product Mini Multisource -->
            <div class="trustpilot-widget" data-locale="en-US" data-template-id="577258fb31f02306e4e3aaf9" data-businessunit-id="5df96c4c7890b800016789c7" data-style-height="18px" data-style-width="100%" data-theme="light" data-tags="SelectedReview" :data-sku="product.variants[0].sku" data-star-color="#0AA9FF" data-font-family="Open Sans" data-text-color="#232D37" data-no-reviews="show" data-scroll-to-list="false">
            </div>
            <!-- End TrustBox widget -->
          </div>
        </div>
        <div class="product-text-content">
        <p>{{ product.productDescriptionShort }}</p>
          <p>{{ product.biomarkerCount }}</p>
          <p v-if="product.bloodTestIncluded != null">
            {{
              product.bloodTestIncluded
                ? "Blood Test Included"
                : "Blood Test NOT Included"
            }}
          </p>
          <p v-if="product.dnaTestIncluded != null">
            {{
              product.dnaTestIncluded
                ? "DNA Test Included"
                : "DNA Test NOT Included"
            }}
          </p>
          
        </div>
      </div>
      <div class="product-card__content-bottom">
        <h4 class="product-card__price" >${{ product.variants[0].price.toString().slice(0, -2) }}</h4>
        <!-- Add to cart Btn
        <button v-if="addToCartBtn"
        class="button button--primary" data-add-to-cart :data-variant-id="product.variantId" :data-product-title="product.title">
          <span class="add-to-cart-text" data-add-to-cart-text :class="isHidden ? '' : 'hide' ">
            {{ addToCartText }}
          </span>
          <span :class="isHidden ? 'hide' : '' " data-loader>
            <svg aria-hidden="true" focusable="false" role="presentation" class="icon icon-spinner" viewBox="0 0 20 20"><path d="M7.229 1.173a9.25 9.25 0 1 0 11.655 11.412 1.25 1.25 0 1 0-2.4-.698 6.75 6.75 0 1 1-8.506-8.329 1.25 1.25 0 1 0-.75-2.385z" fill="#919EAB"/></svg>
          </span>
        </button>
        --> 

        <p v-if="discountMessage != ''" class="buy-more-message">{{ discountMessage }}</p>
        
        <button v-if="addToCartBtn"  @click="goToPDP(product.productUrl)" class="button button--primary">
          {{ selectOptionsText }}
        </button>
        <button v-if="selectOptionsBtn" @click="goToPDP(product.productUrl)" class="button button--primary">
          {{ selectOptionsText }}
        </button>
        <a class="product-card-details-btn" :href="product.productUrl">
          {{ viewDetailsLink }}
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import { Swiper, SwiperSlide } from 'vue-awesome-swiper';
import 'swiper/css/swiper.css'
import 'swiper/css/navigation';
import 'swiper/css/pagination';


export default {
  name: "product-card",
  props: {
    product: Object,
    addToCartText: String,
    selectOptionsText: String,
    viewDetailsLink: String,
    showReviews: Boolean,
    buyMoreMessage: String,
  },
  name: 'swiper-example-navigation',
    title: 'Navigation',
    components: {
      Swiper,
      SwiperSlide
    },
  
  data() {
    return {
      selected: "",
      addToCartBtn: false,
      selectOptionsBtn: false,
      isHidden: true,
      discountTwo: 0,
      discountFour: 0,
      discountMessage: "",
       swiperOption: {
         slidesPerView: 1,
          spaceBetween: 30,
          loop: true,
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
          }
        }
    };
  },


  computed: mapState({
    shapedProducts: (state) => state.shapedProducts,
  }),
  methods: {

    getDiscounts(product){
      let quantityTwo = product.discounts.find(function(discount){
        if(discount.q == 2) return true
      })
      if( quantityTwo != undefined ) {
        this.discountTwo = quantityTwo.v;
      }

      let quantityFour = product.discounts.find(function(discount){
        if(discount.q == 4) return true
      })
      if (quantityFour != undefined){
        this.discountFour = quantityFour.v;
      }
    },
    setDiscountMessage(){
      if( this.discountTwo != ""){
        let discountTwoMessage = this.buyMoreMessage
        
        if(this.buyMoreMessage.includes("{Q}")){
          discountTwoMessage = discountTwoMessage.replace("{Q}", "2")
        }
        if(this.buyMoreMessage.includes("{V}")){
          discountTwoMessage = discountTwoMessage.replace("{V}", this.discountTwo)
        }
        this.discountMessage = discountTwoMessage
      }

      if( this.discountFour != ""){
        let discountFourMessage = this.buyMoreMessage
        if(discountFourMessage.includes("{Q}")){
          discountFourMessage = discountFourMessage.replace("{Q}", "4")
        }
        if(this.buyMoreMessage.includes("{V}")){
          discountFourMessage = discountFourMessage.replace("{V}", this.discountFour)
        }
        this.discountMessage = this.discountMessage + " \n" + discountFourMessage
      }
    },
    setActive(selected, index) {
      this.activeIndex = index;
      this.selectedFilter = selected;
      this.setFilter(selected);
    },
    goToPDP(productUrl) {
      window.location.href = productUrl;
    },
    addToCart(product) {
      let formattedProducts = [];
      let productForCart = {
        id: product.variantId,
        quantity: 1,
        properties: {},
      };
      formattedProducts.push(productForCart);

      this.isHidden = !this.isHidden;

      fetch("/cart/add.js", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          "items": formattedProducts,
        }),
      }).then((cart) => {
        cart.json().then((body) => {
          window.location.href= "/cart"
           gtag("send", {
               hitType: "event",
               eventCategory: "Added to Cart",
               eventAction: "click",
               eventLabel: "{{ product.title }}"
           });
        });
      });
    },
  },
  created() {
    if (this.product.variants.length > 1) {
      this.selectOptionsBtn = true;
    } else if (this.product.variants.length == 1) {
      this.addToCartBtn = true;
    }
  },
  mounted() {
    this.getDiscounts(this.product);
    this.setDiscountMessage(); 
  },
};
</script>

<style lang="scss" scoped>
  @import './base.scss';
</style>
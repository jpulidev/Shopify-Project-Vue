<template>
  <form @submit.prevent="checkCardValue" class="gifted-inner--meta vertical gift-card">
    <div v-if="validReturn">
      <div class="gifted-result">
        <p class="gifted-result--item gifted-result--remaining">
          ${{ remainingBalance }}
        </p>
        <p>
          <a href="/pages/check-gift-card-balance">Check another gift card</a>
        </p>
      </div>
      <button class="button button--primary --full">Continue Shopping</button>
    </div>
    <div v-else>
      <label :class="{ 'invalid': this.error }">
        <input
          type="text"
          required
          id="giftedCode"
          name="giftedCode"
          v-model.trim="cardCode"
          v-on:keyup="resetStates()"
        />
        <div class="label-text">{{ settings.input_label }}</div>
        <p class="clear" v-if="this.error" @click="emptyInput()">Clear</p>
      </label>
      <div v-if="!error || !cardCode">
        <button @click="checkCardValue" class="button button--primary --full">{{ settings.button_label }}</button>
      </div>
    </div>
    <div id="error" v-if="error" class="error-state" v-html="settings.error_text">
    </div>
  </form>
</template>


<script>
  import { mapState } from 'vuex'

  export default {
    name: 'gift-card',
    props: {
      settings: Object,
      blocks: Array
    },
    data() {
      return {
        blockSettings: this.settings,
        init: true,
        error: false,
        cardCode: '',
        validReturn: false,
        cardValue: 0,
        remainingBalance: 0
      };
    },
    computed: mapState({
    
    }),
    methods: {
      postData: async function(url = "", data = {}) {
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data)
        });

        return response.json();
      },
      checkCardValue: function(e) {
        e.preventDefault();
        if (this.cardCode !== '') {
          let requestData = {
            "code": this.cardCode.replace(/\s/g, '').toLowerCase(), 
            "shopName": "segterra.myshopify.com"
          };
          this.postData("/a/it/giftCardLookup", requestData).then((data) => {
            if (data.cardFound) {
              this.error = false;
              this.validReturn = true;
              this.cardValue = data.card[0].value;
              this.remainingBalance = data.card[0].balance;
            } else {
              this.error = true;
              this.validReturn = false;
            }
          })
        }
      },
      resetStates: function() {
        this.error = false;
      },
      emptyInput: function() {
        this.cardCode = '';
        this.resetStates();
      }
    },
    created() {

    },
    mounted() {

    }
  };
</script>

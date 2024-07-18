// Vue
import Vue from "vue";

// Components
import GiftCard from "./components/check-gift-card";

export class CheckGiftCard {
  constructor(id, data) {
    this._sectionId = id;
    this._appType = "check-gift-card";
    this._appInstance = null;
    this._appData = data;
    this._mountingNode = null;
  }
  getSectionId() {
    return this._sectionId;
  }
  setMountingNode() {
    this._mountingNode = document.querySelector(
      `div[data-app-id="${this._sectionId}"][data-app-type="${this._appType}"]`
    );
  }
  // required
  kill() {
    this._appInstance.kill();
  }
  // required
  init() {
    this.setMountingNode();
    this._appInstance = new Vue({
      el: this._mountingNode,
      render: (h) =>
        h(GiftCard, {
          props: {
            ...this._appData,
          },
        }),
      methods: {
        kill() {
          this.$destroy();
        },
      },
    });
  }
}

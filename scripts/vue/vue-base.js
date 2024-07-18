// Vue

import Vue from "vue";
import store from "./store";
import router from "./router";
// Components
import Base from "./components/base";
import Compare from "./components/compare";
import ComparePDP from "./components/compare-pdp";

export class ShopAllApp {
  constructor(id, data) {
    this._sectionId = id;
    this._appType = "subscription";
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
      store: store,
      router,
      el: this._mountingNode,
      render: (h) =>
        h(Base, {
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

export class ComparePlans {
  constructor(id, data) {
    this._sectionId = id;
    this._appType = "compare";
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
      store: store,
      el: this._mountingNode,
      render: (h) =>
        h(Compare, {
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

export class ComparePlansPDP {
  constructor(id, data) {
    this._sectionId = id;
    this._appType = "compare-pdp";
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
      store: store,
      el: this._mountingNode,
      render: (h) =>
        h(ComparePDP, {
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

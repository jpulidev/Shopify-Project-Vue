import MicroModal from "micromodal";
import { createPopper } from "@popperjs/core";
import "./theme/components/faq";
import "./tap-product";

let failObj = {};

let checkCartContents = async function() {
  //reset failObj
  failObj = {
    state: false,
    country: false,
    quantity: false,
    variantId: 0,
    line: 0,
    url: "",
    dnaKit: 0,
    dnaProducts: [],
    bru: 0,
    products: [],
    blockInnerAgePurchase: false,
    innerAgeProductCounter: 0,
    bloodTestProductCounter: 0,
    cartItemCount: 0,
  };

  async function getCart() {
    const result = await fetch("/cart.json");

    if (result.status === 200) {
      return result.json();
    }

    throw new Error(
      `Failed to get request, Shopify returned ${result.status} ${result.statusText}`
    );
  }

  const cart = await getCart();

  failObj.cartItemCount = cart.item_count;

  cart.items.forEach((item, idx) => {
    if (
      item.properties != null &&
      RESTRICTED_STATES.includes(item.properties["Province"]) &&
      !item.variant_title.includes("Mobile")
    ) {
      failObj.state = true;
      failObj.variantId = item.variant_id;
      failObj.line = idx + 1;
      failObj.url = item.url;
    } else if (
      item.properties != null &&
      item.properties["Country"] == "Canada" &&
      !item.variant_title.includes("Mobile")
    ) {
      failObj.country = true;
      failObj.variantId = item.variant_id;
      failObj.line = idx + 1;
      failObj.url = item.url;
    } else if (item.quantity > 10) {
      failObj.quantity = true;
      failObj.variantId = item.variant_id;
      failObj.line = idx + 1;
    }

    // Check for BRU
    if (item.title.includes("Blood Results Upload")) {
      failObj.bru = failObj.bru + item.quantity;
    }

    // Check for DNA Kit
    if (item.title.includes("DNA Kit")) {
      failObj.dnaKit = failObj.dnaKit + item.quantity;
    }

    // Check for DNA Products
    if (item.title.includes("DNA")) {
      failObj.dnaProducts.push(item.title);
    }
    // count number of blood test products
    if (
      item.variant_options.includes("Blood draw in lab") ||
      item.variant_options.includes("Mobile blood draw") ||
      item.title.includes("Blood Results Upload")
    ) {
      failObj.bloodTestProductCounter += 1;
    }
    // check for InnerAge anaylsis only product
    if (
      item.title.includes("InnerAge") &&
      item.variant_title.includes("Analysis only")
    ) {
      failObj.innerAgeProductCounter = item.quantity;
    }

    failObj.products.push(item.title);
  });

  return failObj;
};

function setupRemoveBtnListener(btn, obj) {
  btn.addEventListener("click", function(e) {
    updateCartQuantity().then((value) => {
      value(obj.line, 0);
      setTimeout(() => {
        window.location.href = obj.url;
      }, 500);
    });
  });
}

function handleModalOptions(obj) {
  const addToCartModalBtn = document.querySelectorAll(".button.add");

  if (addToCartModalBtn.length) {
    addToCartModalBtn.forEach((button) => {
      setupRemoveBtnListener(button, obj);
    });
  } else if (addToCartModalBtn) {
    setupRemoveBtnListener(addToCartModalBtn, obj);
  }
}

// TODO: Finish fleshing out this section when we figure out what we want to do
function updateQty(obj) {
  const cartItems = document.querySelectorAll(".page-width tr.cart__row");
  if (cartItems.length) {
    const cartItem = cartItems[obj.line - 1];
    const qtyInputs = cartItem.querySelectorAll(".cart__qty-input");

    if (qtyInputs.length) {
      updateCartQuantity().then((value) => {
        value(obj.line);
      });
    }
  }
}

let updateCartQuantity = async function() {
  async function updateItem(data) {
    const result = await fetch("/cart/change.js", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify({
        ...data,
      }),
    });
    return result.json();
  }

  let updateItemByLine = function(lineIdx, qty) {
    return updateItem({ "line": lineIdx, "quantity": qty });
  };

  return updateItemByLine;
};

function setupCheckout() {
  // get checkout button
  const checkoutBtn = document.querySelector("#checkout_btn");

  // listen for click event
  checkoutBtn.addEventListener("click", function(e) {
    e.preventDefault();
    e.stopPropagation();

    // button state after click
    e.target.setAttribute("disabled", true);
    e.target.querySelector(".add-to-cart-text").classList.add("hide");
    e.target.querySelector("[data-loader]").classList.remove("hide");

    let blockCheckout = false;

    checkCartContents().then((value) => {
      let blockInnerage = false;
      if (value.cartItemCount == 1 && value.innerAgeProductCounter == 1) {
        if (
          customerTags.includes("hasUpgradableTestsForInnerAge") ||
          customerTags.includes("hasBRU")
        ) {
          blockInnerage = false;
        } else {
          blockInnerage = true;
        }
      }
      if (
        value.innerAgeProductCounter > value.bloodTestProductCounter &&
        currentCustomer == ""
      ) {
        blockInnerage = true;
      }

      // check the above values to see if any fail, if so, return / prevent default. else, go to checkout
      if (value.state) {
        blockCheckout = true;
        MicroModal.show("us-blood-modal");
        handleModalOptions(value);
      } else if (value.country) {
        blockCheckout = true;
        MicroModal.show("can-blood-modal");
        handleModalOptions(value);
      } else if (value.quantity) {
        blockCheckout = true;
        MicroModal.show("quantity-modal");
        // Commenting this out for now based on review call with IT team on 7/29
        // Ben and Slava don't want to put a strong limit of 10, just trigger the modal
        // We can revisit if needed! --Jackie
        // updateQty(value);
      } else if (blockInnerage) {
        blockCheckout = true;
        MicroModal.show("innerage-warning-modal");
      } else if (
        value.dnaKit > 1 ||
        (value.dnaKit > 0 && customerTags.includes("hasDNAKit"))
      ) {
        blockCheckout = true;
        MicroModal.show("dna-kit-warning-modal");
      } else if (
        (customerTags.includes("hasDNAProduct") &&
          value.dnaProducts.length > 0) ||
        value.dnaProducts.length > 1
      ) {
        blockCheckout = true;
        MicroModal.show("limit-dna-modal");
      } else if (
        (value.bru > 0 && customerTags.includes("hasBRU")) ||
        value.bru > 1
      ) {
        blockCheckout = true;
        document.querySelector(
          "#limit-one-modal [data-target-product]"
        ).innerHTML = "Blood Results Upload";
        MicroModal.show("limit-one-modal");
      } else if (
        value.products.filter((title) => title.includes("Ultimate")).length >
          0 &&
        value.products.filter((title) => title.includes("Blood Results Upload"))
          .length > 0
      ) {
        blockCheckout = true;
        MicroModal.show("ultimate-bru-modal");
      } else {
        gtag("send", {
          hitType: "event",
          eventCategory: "Checkout",
          eventAction: "click",
          eventLabel: "Checkout Started",
        });
        window.location.href = "/checkout";
      }

      if (blockCheckout) {
        e.target.removeAttribute("disabled");
        e.target.querySelector(".add-to-cart-text").classList.remove("hide");
        e.target.querySelector("[data-loader]").classList.add("hide");
      }
    });
  });
}

function cartProductData() {
  for (var i = 0; i < line_item_discounts.length; i++) {
    var product = line_item_discounts[i];
    var cart_item = document.querySelectorAll(
      "[data-cart-item-key*='" + product.variant_id + ":']"
    );
    if (!cart_item) {
      continue;
    }

    var discounts = product.discounts;
    var save_up_to = 0;
    for (var j = 0; j < discounts.length; j++) {
      if (parseInt(discounts[j].percent) > save_up_to) {
        save_up_to = parseInt(discounts[j].percent);
      }
    }

    if (save_up_to == 0) {
      continue;
    }

    cart_item.forEach(function(item) {
      item.querySelector("[data-total-savings]").innerHTML = save_up_to + "%";
    });

    // grab the discount for quantity of 2
    var buy_two_index = discounts.find(function(discount, index) {
      if (discount.quantity == 2) {
        return true;
      }
    });

    // grab the discount for quantity of 4
    var buy_four_index = discounts.find(function(discount, index) {
      if (discount.quantity == 4) {
        return true;
      }
    });

    // find the popover
    var getModal = document.querySelector(
      "#popover-" + product.variant_id + "-" + (i + 1)
    );

    // fill in numbers for buy 2
    if (buy_two_index) {
      getModal.querySelector("[data-buy-more-value-1]").innerHTML =
        buy_two_index.value;
      getModal.querySelector(
        "[data-buy-more-modal-percent-1]"
      ).innerHTML = parseInt(buy_two_index.percent);
    }

    // fill in numbers for buy 4
    if (buy_four_index) {
      getModal.querySelector("[data-buy-more-value-2]").innerHTML =
        buy_four_index.value;
      getModal.querySelector(
        "[data-buy-more-modal-percent-2]"
      ).innerHTML = parseInt(buy_four_index.percent);
    }
  }
}

window.addEventListener("DOMContentLoaded", function() {
  setupCheckout();

  cartProductData();
});

// Inner Age Addon Modal
document
  .querySelectorAll("[data-innerage-addon-learn-more]")
  .forEach(function(innerAge) {
    innerAge.addEventListener("click", function(e) {
      e.preventDefault();
      var targetProduct = e.target.getAttribute("data-innerage-addon-product");
      var modal = document.querySelector("#inner-age-addon");
      // hide all contents of addon modal
      modal
        .querySelectorAll("[data-innerage-addon-content]")
        .forEach(function(content) {
          content.style.display = "none";
        });
      // show only corresponding message
      var innerAgeMessage = modal.querySelector(
        "[data-innerage-addon-product='" + targetProduct + "']"
      );
      if (innerAgeMessage) {
        modal.querySelector(
          "[data-innerage-addon-product='" + targetProduct + "']"
        ).style.display = "block";
      } else {
        modal.querySelector(
          "[data-innerage-addon-product='default']"
        ).style.display = "block";
      }

      // open modal
      MicroModal.show("inner-age-addon");
    });
  });


// Inner Age Addon Modal
document
  .querySelectorAll("[data-dna-insights-addon-learn-more]")
  .forEach(function(innerAge) {
    innerAge.addEventListener("click", function(e) {
      e.preventDefault();
      var targetProduct = e.target.getAttribute("data-dna-insights-addon-product");
      var modal = document.querySelector("#dna-insights-addon");
      // hide all contents of addon modal
      modal
        .querySelectorAll("[data-dna-insights-addon-content]")
        .forEach(function(content) {
          content.style.display = "none";
        });
      // show only corresponding message
      var innerAgeMessage = modal.querySelector(
        "[data-innerage-addon-product='" + targetProduct + "']"
      );
      if (innerAgeMessage) {
        modal.querySelector(
          "[data-innerage-addon-product='" + targetProduct + "']"
        ).style.display = "block";
      } else {
        modal.querySelector(
          "[data-innerage-addon-product='default']"
        ).style.display = "block";
      }

      // open modal
      MicroModal.show("dna-insights-addon");
    });
  });  

// Buy More and Save Popovers
document.querySelectorAll("[data-popper-trigger]").forEach(function(trigger) {
  trigger.addEventListener("click", function(e) {
    e.preventDefault();
    var tooltip = this.getAttribute("data-popper-controls");

    handlePopover(e.target, tooltip);
  });
});

function handlePopover(trigger, popover_id) {
  var tooltip = document.querySelector(popover_id);

  var instance = createPopper(trigger, tooltip, {
    position: "bottom-end",
  });
  document
    .querySelector("#popover-overlay")
    .setAttribute("aria-hidden", "false");
  tooltip.setAttribute("data-show", "");
  instance.setOptions({ placement: "bottom-end" });

  document
    .querySelector("#popover-overlay")
    .addEventListener("click", function() {
      destroyPopover(tooltip, instance);
    });
}
function destroyPopover(tooltip, instance) {
  tooltip.removeAttribute("data-show");
  document
    .querySelector("#popover-overlay")
    .setAttribute("aria-hidden", "true");
  instance.destroy();
}

$(document).ready(() => {
  $(".cart__row").each(function(i) {
    if ($(this).attr("data-cart-item-quantity") == "1") {
      $(this).each(function() {
        $(".show-info-1").hide();
        $(".show-info-1")
          .closest(".cart__row")
          .addClass("mobile-fix-one");
        $(".show-info-1")
          .closest(".information-container-cart")
          .addClass("mobile-fix-two");
      });
      if ($(".test-info-show").css("display") == "none") {
        $(".test-info-show")
          .closest(".cart__row")
          .addClass("mobile-fix-one");
        $(".test-info-show")
          .closest(".information-container-cart")
          .addClass("mobile-fix-two");
      }
    }
    if ($(this).attr("data-cart-item-quantity") > "2") {
      $(this).each(function() {
        $(".test-info-show")
          .closest(".cart__row")
          .addClass("mobile-fix-one-line");
        $(".test-info-show")
          .closest(".information-container-cart")
          .addClass("mobile-info-line");
      });
    }
  });
});

// Inner Age Addon Add To Cart
document
  .querySelectorAll("[data-innerage-addon-add-to-cart]")
  .forEach(function(addInnerAge) {
    addInnerAge.addEventListener("click", function(e) {
      e.preventDefault();

      // button state after click
      e.target.setAttribute("disabled", true);
      e.target.querySelector(".add-to-cart-text").classList.add("hide");
      e.target.querySelector("[data-loader]").classList.remove("hide");

      // find the current products option data using the cart index
      var productIndex = e.target.getAttribute(
        "data-innerage-addon-linked-product-index"
      );
      var itemCartIndex = parseInt(productIndex) + 2;

      var currentOptions = current_line_items[productIndex];
      var optionsCount = currentOptions.options.length;
      var findAddOn = currentOptions.options
        .map((option) => {
          return option.name;
        })
        .indexOf("AddOn");
      currentOptions.options[findAddOn].value = "InnerAge 2.0";

      var productVariants = product_json[productIndex].variants;
      // get the current product options from the page
      switch (optionsCount) {
        case 1:
          var newVariant = productVariants.find((variant) => {
            return variant.option1 == currentOptions.options[0].value;
          });
          break;
        case 2:
          var newVariant = productVariants.find((variant) => {
            return (
              variant.option1 == currentOptions.options[0].value &&
              variant.option2 == currentOptions.options[1].value
            );
          });
          break;
        case 3:
          var newVariant = productVariants.find((variant) => {
            return (
              variant.option1 == currentOptions.options[0].value &&
              variant.option2 == currentOptions.options[1].value &&
              variant.option3 == currentOptions.options[2].value
            );
          });
          break;
      }
      var currentProductId = currentOptions.variant;
      var newProductId = newVariant.id;

      var request = {
        method: "POST",
        headers: {
          "Content-Type": "application/json;",
        },
        body: JSON.stringify({
          line: itemCartIndex,
          quantity: 0,
        }),
      };

      // get the current properties
      fetch("/cart.js")
        .then((response) => response.json())
        .then((response) => {
          let productHasSellingPlan = "";
          if (response.items[productIndex].selling_plan_allocation) {
            productHasSellingPlan =
              response.items[productIndex].selling_plan_allocation.selling_plan
                .id;
          }
          var addProduct = {
            method: "POST",
            headers: {
              "Content-Type": "application/json;",
            },
            body: JSON.stringify({
              quantity: response.items[productIndex].quantity,
              properties: response.items[productIndex].properties,
              id: newProductId,
              selling_plan: productHasSellingPlan,
            }),
          };
          return fetch("/cart/add.js", addProduct);
        })
        .then((response) => {
          if (response.ok) {
            gtag("send", {
              hitType: "event",
              eventCategory: "Added to Cart",
              eventAction: "click",
              eventLabel: "InnerAge Added",
            });
            return fetch("/cart/change.js", request);
          } else {
            e.target.removeAttribute("disabled");
            e.target
              .querySelector(".add-to-cart-text")
              .classList.remove("hide");
            e.target.querySelector("[data-loader]").classList.add("hide");

            document.querySelector("[data-cart-error-message]").textContent =
              theme.strings.cartError;

            document
              .querySelector("[data-cart-error-message-wrapper]")
              .classList.remove("hide");
          }
        })
        .then((response) => {
          if (response && response.ok) {
            window.location.href = "/cart";
          } else {
            document.querySelector("[data-cart-error-message]").textContent =
              theme.strings.cartError;

            document
              .querySelector("[data-cart-error-message-wrapper]")
              .classList.remove("hide");
          }
        });
    });
  });

function watchItemQuantity() {
  let cartQtyInputs = document.querySelectorAll(".cart__qty-input");
  cartQtyInputs.forEach((qtyInput) => {
    qtyInput.addEventListener("change", function(evt) {
      if (evt.target.max == 1 && evt.target.value > 1) {
        evt.target.value = 1;

        let limitedProductTitle = evt.target
          .closest("[data-cart-item]")
          .dataset.cartItemTitle.split(" - ");
        document.querySelector(
          "#limit-one-modal [data-target-product]"
        ).innerHTML = limitedProductTitle[0];
        MicroModal.show("limit-one-modal");
      }
      if (evt.target.value > 9) {
        MicroModal.show("quantity-modal");
      }
    });
  });
}

let upsellAddToCart = document.querySelectorAll("[data-upsell-add-to-cart]");
upsellAddToCart.forEach((ATC) => {
  ATC.addEventListener("click", function(evt) {
    evt.preventDefault();
    evt.target.setAttribute("disabled", true);
    evt.target.querySelector(".add-to-cart-text").classList.add("hide");
    evt.target.querySelector("[data-loader]").classList.remove("hide");
    let productID = evt.target.dataset.id;
    if (productID) {
      let productData = {
        id: productID,
        quantity: 1,
        properties: {},
      };
      fetch("/cart/add.js", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productData),
      })
        .then((response) => {
          if (!response.ok) {
            evt.target.removeAttribute("disabled");
            evt.target
              .querySelector(".add-to-cart-text")
              .classList.remove("hide");
            evt.target.querySelector("[data-loader]").classList.add("hide");
          } else {
            window.location.href = "/cart";
          }
          return response.json();
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  });
});

$(".ultimate-add-one-more").click(function(){
  let ultimateProduct = $(".ultimate-add-one-more");
  let variantValue = ultimateProduct[0].attributes[1].value;
  let spinnerLoad = $('.spinner');
  let textButton = $('.add-to-cart-ultimate');

  textButton.text('');
  spinnerLoad.removeClass("hide");
 
  jQuery.post('/cart/change.js', { quantity: 2, id: variantValue })
     setTimeout(function() { 
        location.reload();
    }, 800);
});

$(".init-pop-up").click(function(){
  let initPopUp = $('.ultimate-save-popup');
    initPopUp.click();
});

const observedEl = document.querySelector("form.cart table");
const observer = new MutationObserver((mutationRecords) => {
  watchItemQuantity();
});

observer.observe(observedEl, { subtree: true, childList: true });

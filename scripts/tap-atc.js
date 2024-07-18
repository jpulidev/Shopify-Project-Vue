window.addEventListener("DOMContentLoaded", function() {
  let atcSubmitButton = document.querySelectorAll("button[data-add-to-cart]");

  atcSubmitButton.forEach((atc) => {
    atc.addEventListener("click", function(evt) {
      evt.preventDefault();

      // button state after click
      evt.target.setAttribute("disabled", true);
      evt.target.querySelector("[data-add-to-cart-text]").classList.add("hide");
      evt.target.querySelector("[data-loader]").classList.remove("hide");

      let blockATC = false;

      let evtProductForm = evt.target.closest("form");
      let evtProductTitle;
      let evtProductVariant;
      if (evtProductForm) {
        evtProductTitle = evtProductForm.dataset.productTitle;
      } else {
        evtProductVariant = evt.target.dataset.variantId;
        evtProductTitle = evt.target.dataset.productTitle;
      }

      // if the product is limited to one
      if (evtProductForm.classList.contains("product-limit-one")) {
        // check the customer tags
        if (
          evtProductTitle.includes("DNA") &&
          customerTags.includes("hasDNAProduct")
        ) {
          blockATC = true;
          MicroModal.show("limit-dna-modal");

          evt.target.removeAttribute("disabled");
          evt.target
            .querySelector("[data-add-to-cart-text]")
            .classList.remove("hide");
          evt.target.querySelector("[data-loader]").classList.add("hide");
        } else if (
          evtProductTitle.includes("Blood Results Upload") &&
          customerTags.includes("hasBRU")
        ) {
          blockATC = true;
          document.querySelector(
            "#limit-one-modal [data-target-product]"
          ).innerHTML = evtProductTitle;
          MicroModal.show("limit-one-modal");

          evt.target.removeAttribute("disabled");
          evt.target
            .querySelector("[data-add-to-cart-text]")
            .classList.remove("hide");
          evt.target.querySelector("[data-loader]").classList.add("hide");
        } else {
          //check the cart
          checkCart()
            .then((value) => {
              if (
                value.findIndex((el) => {
                  if (el.includes(evtProductTitle)) {
                    return true;
                  }
                }) != -1
              ) {
                blockATC = true;
              }
              return blockATC;
            })
            .then((blockATC) => {
              if (blockATC) {
                //display a modal
                document.querySelector(
                  "#limit-one-modal [data-target-product]"
                ).innerHTML = evtProductTitle;
                MicroModal.show("limit-one-modal");
                evt.target.removeAttribute("disabled");
                evt.target
                  .querySelector("[data-add-to-cart-text]")
                  .classList.remove("hide");
                evt.target.querySelector("[data-loader]").classList.add("hide");
              } else {
                //submit form
                if (evtProductForm) {
                  evtProductForm.submit();
                } else {
                  ajaxATC(evtProductVariant);
                }
              }
            });
        }
      } else {
        //submit form
        if (evtProductForm) {
          evtProductForm.submit();
        } else {
          ajaxATC(evtProductVariant);
        }
      }
    });
  });
});

function ajaxATC(variantID) {
  let productForCart = {
    id: variantID,
    quantity: 1,
    properties: {},
  };
  fetch("/cart/add.js", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      "items": [productForCart],
    }),
  }).then((cart) => {
    cart.json().then((body) => {
      window.location.href = "/cart";
      gtag("send", {
        hitType: "event",
        eventCategory: "Added to Cart",
        eventAction: "click",
        eventLabel: "{{ product.title }}",
      });
    });
  });
}

let checkCart = async function() {
  async function getCart() {
    let result = await fetch("/cart.js");
    return result.json();
  }

  let cartProducts = [];
  const cartContents = await getCart();

  cartContents.items.forEach((item) => {
    cartProducts.push(item.title);
  });

  return cartProducts;
};

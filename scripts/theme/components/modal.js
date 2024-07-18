var MicroModal = require("micromodal"); // commonjs

window.addEventListener("DOMContentLoaded", function() {
  let modalButtons = document.querySelectorAll(".modal-link");

  // prevent modal buttons from adding to cart
  for (let i = 0; i < modalButtons.length; i++) {
    modalButtons[i].addEventListener("click", function(e) {
      e.preventDefault();
    });
  }

  MicroModal.init({
    // onShow: (modal) => console.info(`${modal.id} is shown`), // [1]
    // onClose: (modal) => console.info(`${modal.id} is hidden`), // [2]
    openTrigger: "data-custom-open", // [3]
    openClass: "is-open", // [5]
    disableScroll: true, // [6]
    disableFocus: false, // [7]
    awaitOpenAnimation: false, // [8]
    awaitCloseAnimation: false, // [9]
    debugMode: true, // [10]
    onClose: function(modal, element, event) {
      event.preventDefault();
      event.stopPropagation();
    },
  });
});

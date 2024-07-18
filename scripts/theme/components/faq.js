document.addEventListener("DOMContentLoaded", function () {
  faqToggle();
});
let targetAnswer;
function faqToggle() {
  document
    .querySelectorAll(".product-faqs__item-question")
    .forEach((element) => {
      var answerHeight;
      element.addEventListener("click", function (e) {
        var targetID = element.getAttribute("aria-controls");
        targetAnswer = document.querySelector(targetID);
        element.focus();

        if (element.getAttribute("aria-expanded") == "false") {
          element.setAttribute("aria-expanded", "true");
          targetAnswer.setAttribute("aria-hidden", "false");
          targetAnswer.style.display = "block";
          targetAnswer.style.height = "auto";
          answerHeight = targetAnswer.clientHeight + "px";
          targetAnswer.style.height = "0px";

          setTimeout(function () {
            targetAnswer.style.height = answerHeight;
          }, 0);
        } else if (element.getAttribute("aria-expanded") == "true") {
          element.setAttribute("aria-expanded", "false");
          targetAnswer.setAttribute("aria-hidden", "true");
          targetAnswer.style.height = "0";
          targetAnswer.addEventListener(
            "transitionend",
            function () {
              targetAnswer.style.display = "none";
            },
            {
              once: true,
            }
          );
        }
      });
    });
}

// get the person's name, create a new div at top of page, and insert the things there
const content = document.querySelector(".content");
const pageWidth = document.createElement("div");
pageWidth.classList.add("page-width");
pageWidth.setAttribute(
  "style",
  "display: flex; max-width: 1200px; padding: 2em; margin: 0 auto; justify-content: space-around;"
);
const heroEl = document.createElement("section");
heroEl.classList.add("hero");
const name = document.querySelector(".step__sections > .section");
const messaging = document.createElement("p");
messaging.setAttribute("style", "margin: 20px 0;");
var t = document.createTextNode(
  "You've taken the next step in your health and wellness journey and we’re here to help you reach your goals. Let’s get started and setup your account."
);
messaging.appendChild(t);

// create the button
var btn = document.createElement("a");
btn.innerHTML = "Setup my account";

btn.setAttribute(
  "style",
  "display: inline-block;vertical-align: middle; width: auto; border: 0; text-align: center; white-space: nowrap; text-decoration: none; user-select: none; appearance: none; padding: 11px 20px 13px; border-radius: 3px; font-weight: 600; background: #00AAFF; color: #ffffff; transition: all 0.2s ease-out; border: 2px solid #00AAFF; margin-bottom: 3em;"
);

btn.setAttribute(
  "href",
  "https://www.insidetracker.com/customer/summary/dashboard"
);

heroEl.appendChild(name);
heroEl.appendChild(messaging);
heroEl.appendChild(btn);
pageWidth.appendChild(heroEl);

// create the image
var myImage = new Image();
myImage.src =
  "https://cdn.shopify.com/s/files/1/0529/3185/4511/files/confirmation.svg?v=1630619752";
myImage.classList.add("hero-image");
pageWidth.appendChild(myImage);

content.prepend(pageWidth);

// do some styling things for the bottom of the page
document
  .querySelector(".content .wrap")
  .setAttribute(
    "style",
    "width: 100%; max-width: none; background-color: #f8f8f8; padding: 0 3em; box-sizing: border-box;"
  );
document
  .querySelector(".content .wrap .main")
  .setAttribute("style", "outline: 0;");

// do this in a set timeout so the info has time to load before we hack the styles
setTimeout(function() {
  const contentBoxes = document.querySelectorAll(
    ".section__content .content-box"
  );
  for (var i = 0; i < contentBoxes.length; i++) {
    contentBoxes[i].setAttribute("style", "border-color: transparent;");
  }

  const orderSummary = document.querySelector(".order-summary");

  orderSummary.setAttribute(
    "style",
    "background: #ffffff; border-radius: 5px; padding: 1.7em;"
  );

  const name = document.querySelector(".main .step__sections > .section");
  name.setAttribute("style", "padding-top: 0;");

  const sidebar = document.querySelector(".sidebar");
  sidebar.setAttribute("style", "padding-top: 4em;");
}, 1000);

// do the styling that is media query dependent
var css =
    ".hero {flex: 0 0 40%;} .hero-image {flex: 0 0 40%} @media only screen and (max-width: 768px) {.page-width {flex-wrap: wrap} .hero {flex: 1 1 100%;} .hero-image {display: none;}}",
  head = document.head || document.getElementsByTagName("head")[0],
  style = document.createElement("style");

head.appendChild(style);

style.type = "text/css";
if (style.styleSheet) {
  // This is required for IE8 and below.
  style.styleSheet.cssText = css;
} else {
  style.appendChild(document.createTextNode(css));
}

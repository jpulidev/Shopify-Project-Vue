/**
 * Main JS --  -- The Taproom
 *
 * eg: import "./sections/header";
 */

/* Shopify Starter Theme Scripts */

import "./starter/starter-index";
import { focusHash, bindInPageLinks } from "@shopify/theme-a11y";
import MicroModal from "micromodal"; // es6 module

// Common a11y fixes
focusHash();
bindInPageLinks();

// Apply a specific class to the html element for browser support of cookies.
if (window.navigator.cookieEnabled) {
  document.documentElement.className = document.documentElement.className.replace(
    "supports-no-cookies",
    "supports-cookies"
  );
}

/* Theme Components */
import "./theme/components/modal";
import "./theme/components/gift-card-lookup";
import "./tap-atc";

// Snippets

// Sections

// Templates
// Navigation

var prevScrollpos = window.pageYOffset;
window.onscroll = function() {
  var currentScrollPos = window.pageYOffset;
  if (prevScrollpos > currentScrollPos) {
    document.getElementById("navbar").style.top = "0";
  } else {
    document.getElementById("navbar").style.top = "0px";
  }
  prevScrollpos = currentScrollPos;
};

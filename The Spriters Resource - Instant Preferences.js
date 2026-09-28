// ==UserScript==
// @name         The Spriters Resource - Instant Preferences
// @author       PixelSpark987 - https://is.gd/PS987
// @namespace    http://tampermonkey.net/
// @version      1.1
// @description  Instantly set preferences in The Spriters Resource
// @downloadURL  https://raw.githubusercontent.com/PixelSpark987/The-Spriters-Resource-Instant-Preferences/refs/heads/main/The%20Spriters%20Resource%20-%20Instant%20Preferences.js
// @updateURL    https://raw.githubusercontent.com/PixelSpark987/The-Spriters-Resource-Instant-Preferences/refs/heads/main/The%20Spriters%20Resource%20-%20Instant%20Preferences.js
// @match        *://*.spriters-resource.com/*
// @grant        none
// @run-at       document-start
// ==/UserScript==

(function () {
  'use me strict';

  const TARGET_TITLES = [
    'switch to icon mode',
    'show nsfw assets',
    'switch to dark theme'
  ];

  function tryToggle() {
    const spans = document.querySelectorAll('span[title]');

    for (const span of spans) {
      const titleText = (span.getAttribute('title') || '').toLowerCase().trim();

      if (TARGET_TITLES.includes(titleText)) {
        const parentLink = span.closest('a') || span;
        parentLink.click();
        return true;
      }
    }
    return false;
  }

  const observer = new MutationObserver(() => {
    if (tryToggle()) {
      observer.disconnect();
    }
  });

  observer.observe(document.documentElement, {
    childList: true,
    subtree: true
  });

  //
  if (tryToggle()) {
    observer.disconnect();
  }
})();

// ==UserScript==
// @name         The Spriters Resource - Instant Preferences
// @namespace    http://tampermonkey.net/
// @version      1.1
// @description  Instantly set preferences in The Spriters Resource
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
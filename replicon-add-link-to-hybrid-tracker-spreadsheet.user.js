// ==UserScript==
// @name         Replicon add link to hybrid tracker spreadsheet
// @namespace    http://tampermonkey.net/
// @version      2026-03-18
// @description  Adds a link to my hybrid tracker spreadsheet
// @author       floodmeadows
// @match        https://eu3.replicon.com/Capgemini/my/timesheet/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=replicon.com
// @grant        none
// ==/UserScript==

/* jshint esversion: 11 */

(function() {
    'use strict';

  // -----------------------------
  // CONFIGURATION
  // -----------------------------
  const targetSelector = '.utilityList li:first-child';
  const hybridTrackerSpreadsheetUrl = "https://www.example.com/my-spreadsheet.xlsx";
  const markerId = 'copy-descriptive-link-button-added';

  // -----------------------------
  // INITIALISE
  // -----------------------------
  function init() {
    checkIfElementsNeedAdding();
  }

  function checkIfElementsNeedAdding() {
    console.log("Checking to see if elements need adding...")
    const target = document.querySelector(targetSelector);
    // const target = document.getElementsByClassName("timesheetPeriod")[0]
    setTimeout(() => {
      if (!target) {
        console.log("Target not found. Can't add elements.")
        return
      }
      if (document.getElementById(markerId)) {
        console.log("Marker element found, meaning new elements have already been added. Returning without adding new elements.")
        return;
      }
      console.log("Injecting new elements...");
      const marker = document.createElement('span');
      marker.id = markerId;
      target.after(marker);
      addLi("Hybrid tracker spreadsheet", target, hybridTrackerSpreadsheetUrl)
    }, 500); // delay to allow DOM to settle
  }

  function addLink(linkText, targetElement, url) {
    const link = document.createElement("a");
    link.setAttribute("href", url);
    const text = document.createTextNode(linkText);
    link.appendChild(text);
    targetElement.after(link);
  }

  function addLi(linkText, targetElement, url) {
    const li = document.createElement("li");
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("style", "margin-left: 8px;");
    const text = document.createTextNode(linkText);
    link.appendChild(text);
    li.appendChild(link);
    targetElement.before(li);
  }

  // -----------------------------
  // OBSERVER TO HANDLE DOM CHANGES
  // -----------------------------

  const observer = new MutationObserver((mutationsList, observer) => {
    console.log("DOM changed, checking injected elemenets...");
    checkIfElementsNeedAdding();
  });
  observer.observe(document.body, { childList: true, subtree: true });
  window.__observerActive = true;
  console.log("MutationObserver started");

  // Run on initial load
  init();

})();

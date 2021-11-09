// ==UserScript==
// @name         Show Fill Level
// @namespace    http://starfights.de/
// @version      0.2
// @description  show percentual fill level of res storage
// @author       Tiramon
// @match        https://www.starfights.de/*
// @icon         https://www.google.com/s2/favicons?domain=starfights.de
// @grant        none
// @downloadURL  https://raw.githubusercontent.com/tiramon/starfight_greasemonkey/master/ShowFillLevel.user.js
// @updateURL    https://raw.githubusercontent.com/tiramon/starfight_greasemonkey/master/ShowFillLevel.meta.js
// ==/UserScript==

function refreshPercent() {
    console.log("refreshing fill level");
    const resElements = document.getElementsByClassName("resources-holder");
    for (var resElement of resElements) {
        //console.log(resElement);
        const resAmountElement = resElement.getElementsByClassName("resources-amount")[0];
        //console.log(resAmountElement);
        const max = +resAmountElement.getAttribute("data-stored-max");
        const current = +resAmountElement.getAttribute("data-stored");
        const percent = (100 / max * current).toFixed(2);
        const percentValue = percent.toLocaleString(
  undefined, // leave undefined to use the visitor's browser
             // locale or a string like 'en-US' to override it.
  { minimumFractionDigits: 2 }
) + " %";
        //console.log(max, current, percent, current/100);
        const percentElements = resElement.getElementsByClassName("percent");
        var percentElement;
        if (percentElements.length == 0) {
            percentElement = document.createElement('span');
            percentElement.className = "percent sub-line";
            resElement.appendChild(percentElement);
        } else {
            percentElement = percentElements[0];
        }

        if (percentElement.innerHTML != percentValue) {
            percentElement.innerHTML = percentValue;
        }

    }

}
(function() {
    'use strict';
    refreshPercent();
    setInterval(refreshPercent, 1000);
})();
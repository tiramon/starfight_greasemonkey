// ==UserScript==
// @name         Storage capacity
// @namespace    http://starfights.de/
// @version      0.1
// @description  shows how many hours of resource production can be stored with current storage
// @author       Tiramon
// @match        https://www.starfights.de/*
// @icon         https://www.google.com/s2/favicons?domain=starfights.de
// @grant        none
// @downloadURL  https://raw.githubusercontent.com/tiramon/starfight_greasemonkey/master/StorageTime.user.js
// @updateURL    https://raw.githubusercontent.com/tiramon/starfight_greasemonkey/master/StorageTime.meta.js
// ==/UserScript==

function refreshPercent() {
    const resElements = document.getElementsByClassName("resources-holder");
    let ironValue = -1;
    for (var resElement of resElements) {
        const resAmountElement = resElement.getElementsByClassName("resources-amount")[0];
        const max = +resAmountElement.getAttribute("data-stored-max");
        const gain = +resAmountElement.getAttribute("data-rate");

        const outValue = (max/ gain).toLocaleString(
                undefined, // leave undefined to use the visitor's browser
                           // locale or a string like 'en-US' to override it.
                { minimumFractionDigits: 2 }
            ) + ' hours' ;

        const storageCapacityElements = resElement.getElementsByClassName("storageCapacity");
        var storageCapacityElement;
        if (storageCapacityElements.length == 0) {
            storageCapacityElement = document.createElement('span');
            storageCapacityElement.className = "storageCapacity sub-line";
            resElement.appendChild(storageCapacityElement);
        } else {
            storageCapacityElement = storageCapacityElements[0];
        }

        if (storageCapacityElement.innerHTML != outValue) {
            storageCapacityElement.innerHTML = outValue;
        }
    }
}
(function() {
    'use strict';
    refreshPercent();
    setInterval(refreshPercent, 1000);
})();
// ==UserScript==
// @name         Show relative Production
// @namespace    http://starfights.de/
// @version      0.1
// @description  show production relative to iron production
// @author       Tiramon
// @match        https://www.starfights.de/*
// @icon         https://www.google.com/s2/favicons?domain=starfights.de
// @grant        none
// @downloadURL  https://raw.githubusercontent.com/tiramon/starfight_greasemonkey/master/RelativeProduction.user.js
// @updateURL    https://raw.githubusercontent.com/tiramon/starfight_greasemonkey/master/RelativeProduction.meta.js
// ==/UserScript==

function refreshPercent() {
    const resElements = document.getElementsByClassName("resources-holder");
    let ironValue = -1;
    for (var resElement of resElements) {
        console.log(resElement);
        const resAmountElement = resElement.getElementsByClassName("resources-amount")[0];
        console.log(resAmountElement);
        const gain = +resAmountElement.getAttribute("data-rate");
        if (ironValue < 0 ) {
            ironValue = gain;
        }

        console.log("1. / "+ ironValue +" * "+gain+" = "*(1. / ironValue  * gain))
        const outValue = (1. / ironValue  * gain).toLocaleString(
                undefined, // leave undefined to use the visitor's browser
                           // locale or a string like 'en-US' to override it.
                { minimumFractionDigits: 5 }
            );
        
        const relativeProductionElements = resElement.getElementsByClassName("relativeProduction");
        var relativeProductionElement;
        if (relativeProductionElements.length == 0) {
            relativeProductionElement = document.createElement('span');
            relativeProductionElement.className = "relativeProduction sub-line";
            resElement.appendChild(relativeProductionElement);
        } else {
            relativeProductionElement = relativeProductionElements[0];
        }

        if (relativeProductionElement.innerHTML != outValue) {
            relativeProductionElement.innerHTML = outValue;
        }
    }
}
(function() {
    'use strict';
    refreshPercent();
    setInterval(refreshPercent, 1000);
})();
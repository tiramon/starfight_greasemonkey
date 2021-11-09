// ==UserScript==
// @name         MainScroll
// @namespace    http://starfights.de/
// @version      0.2
// @description  Scroll the main area and pin the resources
// @author       Tiramon
// @match        *.starfights.de/*
// @icon         https://www.google.com/s2/favicons?domain=starfights.de
// @grant        none
// @downloadURL  https://raw.githubusercontent.com/tiramon/starfight_greasemonkey/master/MainScroll.user.js
// @updateURL    https://raw.githubusercontent.com/tiramon/starfight_greasemonkey/master/MainScroll.meta.js
// ==/UserScript==

(function() {
    'use strict';
    console.log('scroll list',document.getElementsByClassName("col-12"));
    const windowHeight = window.innerHeight;
    const res = document.getElementsByClassName("col-12")[0];
    console.log('scroll offset', res.offsetHeight);
    let index = 1;
    console.log(window.location.pathname);
    const pattern  = /\/(mission|alliance|settings)\/\d+/
    if (window.location.pathname.match(pattern)) {
        index = 2;
     }
    const main = document.getElementsByClassName("col-12")[index];
    console.log(main);
    const parent = main.parentElement;
    main.style.height = (windowHeight - res.offsetHeight- 10)+"px";
    main.style.overflow = "scroll";
    // Your code here...
})();
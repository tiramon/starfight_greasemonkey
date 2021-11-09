// ==UserScript==
// @name         RessOverview
// @namespace    Starfights
// @version      0.2
// @description  Sum up resources in storage and produced over all planets after each planet was atleast visited once
// @author       Lieberwolf
// @match        *.starfights.de/*
// @icon         https://www.google.com/s2/favicons?domain=starfights.de
// @grant        GM_setValue
// @grant        GM_getValue
// @require      http://code.jquery.com/jquery-3.4.1.min.js
// @downloadURL  https://raw.githubusercontent.com/tiramon/starfight_greasemonkey/master/ResOverview.user.js
// @updateURL    https://raw.githubusercontent.com/tiramon/starfight_greasemonkey/master/ResOverview.meta.js
/* global $ */
// ==/UserScript==

(function() {
    'use strict';


    var savedValues = readSavedValues();
    var parsedRessources = readRessources();
    saveRessources(savedValues, parsedRessources);
    var sumRessources = sumUpRessources(savedValues);
    printResult(sumRessources);

    function printResult() {
        var i = 1;

        $('.resources-holder').each(function() {
            $(this).append('<span class="resources-amount sub-line">'+formatNumber(sumRessources[Object.keys(savedValues[0])[i++]])+'</span>');
        });
        $('.resources-holder').each(function() {
            $(this).append('<span class="resources-amount sub-line">'+formatNumber(sumRessources[Object.keys(savedValues[0])[i++]])+' /h</span>');
        });
    }

    function formatNumber(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }


    function sumUpRessources(savedValues) {
        var summedUp = newSummedUpObject();

        for (var i=0; i<savedValues.length; i++) {
            summedUp.fe_prod += isNaN(savedValues[i].fe_prod) ? 0 : parseInt(savedValues[i].fe_prod);
            summedUp.lut_prod += isNaN(savedValues[i].lut_prod) ? 0 : parseInt(savedValues[i].lut_prod);
            summedUp.cry_prod += isNaN(savedValues[i].cry_prod) ? 0 : parseInt(savedValues[i].cry_prod);
            summedUp.h2o_prod += isNaN(savedValues[i].h2o_prod) ? 0 : parseInt(savedValues[i].h2o_prod);
            summedUp.h2_prod += isNaN(savedValues[i].h2_prod) ? 0 : parseInt(savedValues[i].h2_prod);

            summedUp.fe_stored += isNaN(savedValues[i].fe_stored) ? 0 : parseInt(savedValues[i].fe_stored);
            summedUp.lut_stored += isNaN(savedValues[i].lut_stored) ? 0 : parseInt(savedValues[i].lut_stored);
            summedUp.cry_stored += isNaN(savedValues[i].cry_stored) ? 0 : parseInt(savedValues[i].cry_stored);
            summedUp.h2o_stored += isNaN(savedValues[i].h2o_stored) ? 0 : parseInt(savedValues[i].h2o_stored);
            summedUp.h2_stored += isNaN(savedValues[i].h2_stored) ? 0 : parseInt(savedValues[i].h2_stored);
        }

        return summedUp;
    }


    function saveRessources(savedValues, parsedRessources) {
        var added = false;
        for (var i=0; i<savedValues.length; i++) {
            if (savedValues[i].planet == parsedRessources.planet) {
                savedValues[i] = parsedRessources;
                added = true;
            }
        }

        if (!added) {
            savedValues.push(parsedRessources);
        }

        GM_setValue("ressourceData", JSON.stringify(savedValues));
        //console.log(GM_getValue("ressourceData"))
    }

    function readSavedValues() {
        var savedValues = GM_getValue("ressourceData");

        return savedValues === undefined ? [] : JSON.parse(savedValues);
    }


    function readRessources() {
        var ressProd = [];
        var ressStored = [];

        var planet = $('a[href*="/overview/"]').attr('href').replaceAll(/[^0-9\\.]+/g, '');

        $('.resources-holder').each(function() {
            ressProd.push($(this).attr('title').replaceAll(/[^0-9\\.]+/g, '').replaceAll(".", ""));
        });

        $('.resources-amount').each(function() {
            ressStored.push($(this).text().replaceAll(".", ""));
        });

        return newPlanetObject(planet, ressProd, ressStored);
    }


    function newPlanetObject(planet, ressProd, ressStored) {
        return {
            'planet': planet,
            'fe_stored': ressStored[0],
            'lut_stored': ressStored[1],
            'cry_stored': ressStored[2],
            'h2o_stored': ressStored[3],
            'h2_stored': ressStored[4],
            'fe_prod': ressProd[0],
            'lut_prod': ressProd[1],
            'cry_prod': ressProd[2],
            'h2o_prod': ressProd[3],
            'h2_prod': ressProd[4]
        };
    }

    function newSummedUpObject() {
        return {
            'planet': 0,
            'fe_stored': 0,
            'lut_stored': 0,
            'cry_stored': 0,
            'h2o_stored': 0,
            'h2_stored': 0,
            'fe_prod': 0,
            'lut_prod': 0,
            'cry_prod': 0,
            'h2o_prod': 0,
            'h2_prod': 0
        };
    }


})();
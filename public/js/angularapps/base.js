"use strict";
/*global $ */
/*global angular */
var application = angular.module('application', ['ngResource'])
    .config(function ($interpolateProvider) {
        $interpolateProvider.startSymbol('~~');
        $interpolateProvider.endSymbol('~~');
    });
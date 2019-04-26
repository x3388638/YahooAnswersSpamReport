"use strict";function _toConsumableArray(a){return _arrayWithoutHoles(a)||_iterableToArray(a)||_nonIterableSpread()}function _nonIterableSpread(){throw new TypeError("Invalid attempt to spread non-iterable instance")}function _iterableToArray(a){if(Symbol.iterator in Object(a)||"[object Arguments]"===Object.prototype.toString.call(a))return Array.from(a)}function _arrayWithoutHoles(a){if(Array.isArray(a)){for(var b=0,c=Array(a.length);b<a.length;b++)c[b]=a[b];return c}}// ==UserScript==
// @name         YahooAnswersSpamReport
// @namespace    https://2yc.tw
// @version      0.1.0
// @description  Make it easy to report a spam on Yahoo! Answers
// @author       YY
// @license      MIT
// @homepage     https://github.com/x3388638/YahooAnswersSpamReport
// @updateURL    https://openuserjs.org/meta/x3388638/YahooAnswersSpamReport.meta.js
// @match        https://*.answers.yahoo.com
// @match        https://*.answers.yahoo.com/answer*
// @match        https://*.answers.yahoo.com/question/*
// @grant        none
// ==/UserScript==
(function(){function a(){var a=new FormData,b="reportq";return m&&(b="reporta",a.append("ansid",m)),a.append("crumb",window.ANSWERS.crumb),a.append("action",b),a.append("qid",l),a.append("abtype","TOS"),a.append("desc",""),fetch("/_post?name=YAReportAbuseModule&abtype=TOS",{method:"POST",body:a}).then(function(a){return a.json()})}function b(){k.style.opacity="0.1"}function c(){var a=m?m:l,b=JSON.parse(window.localStorage["@YahooAnswersSpanReport:reportedList"]);if(!b.includes(a)){var c=[].concat(_toConsumableArray(b),[a]);c.length>50&&c.shift(),window.localStorage["@YahooAnswersSpanReport:reportedList"]=JSON.stringify(c)}}function d(){k.className.includes("Pos-r")||(k.className+=" Pos-r"),o.style.display="initial",k.appendChild(o)}/**
   * event handler
   */function e(a){a.target.className.includes("qTile")&&(k=a.target,l=k.getAttribute("data-qid"),d())}function f(){o.style.display="none"}function g(a){k=a.target,l=k.getAttribute("data-ya-question-id"),m=null,d()}function h(a){k=a.target,l=k.getAttribute("data-ya-question-id"),m=k.getAttribute("data-ya-answer-id"),d()}function j(){a().then(function(){alert("Done!"),c(),b()})}/**
   * init
   */var k,l,m,n=document.createElement("span"),o=document.createElement("span");window.ANSWERS.si&&window.ANSWERS.yi&&(function(){window.localStorage||(window.localStorage={}),window.localStorage["@YahooAnswersSpanReport:reportedList"]=window.localStorage["@YahooAnswersSpanReport:reportedList"]||JSON.stringify([])}(),function(){n.className="rptabuse Wpx-20 Hpx-20 D-ib shared-sprite reportabuse-icon Va-tb",o.id="spam_ReportBtn",o.innerText=" SPAM",o.style.right="10px",o.style.top="10px",o.style.position="absolute",o.style.cursor="pointer",o.style.color="red",o.style.background="#eee",o.style.fontSize="12px",o.style.padding="1px 5px",o.prepend(n)}(),function(){var a=document.getElementById("ya-answer-tab"),b=document.getElementById("ya-question-detail");/**
     * QA page
     */if(a&&(a.addEventListener("mouseenter",e,!0),a.addEventListener("mouseleave",f)),b){var c=document.querySelectorAll("li[data-ya-type=\"answer\"], #ya-best-answer");// show reportBtn for question
b.addEventListener("mouseenter",g),b.addEventListener("mouseleave",f);// show/hide reportBtn for best answer and other answers
for(var d=0;d<c.length;d++)c[d].addEventListener("mouseenter",h),c[d].addEventListener("mouseleave",f)}// click reportBtn
o.addEventListener("click",j)}())})();

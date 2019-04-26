// ==UserScript==
// @name         YahooAnswersSpamReport
// @namespace    https://2yc.tw
// @version      0.2.0
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
"use strict";function _toConsumableArray(a){return _arrayWithoutHoles(a)||_iterableToArray(a)||_nonIterableSpread()}function _nonIterableSpread(){throw new TypeError("Invalid attempt to spread non-iterable instance")}function _iterableToArray(a){if(Symbol.iterator in Object(a)||"[object Arguments]"===Object.prototype.toString.call(a))return Array.from(a)}function _arrayWithoutHoles(a){if(Array.isArray(a)){for(var b=0,c=Array(a.length);b<a.length;b++)c[b]=a[b];return c}}
(function(){function a(){p.className="rptabuse Wpx-20 Hpx-20 D-ib shared-sprite reportabuse-icon Va-tb",q.innerText=" SPAM",q.style.right="10px",q.style.top="10px",q.style.position="absolute",q.style.cursor="pointer",q.style.color="red",q.style.background="#eee",q.style.fontSize="12px",q.style.padding="1px 5px",q.prepend(p),l=q.cloneNode(),l.style.cursor="default",l.innerText="Reported"}function b(){var a=new FormData,b="reportq";return o&&(b="reporta",a.append("ansid",o)),a.append("crumb",window.ANSWERS.crumb),a.append("action",b),a.append("qid",n),a.append("abtype","TOS"),a.append("desc",""),fetch("/_post?name=YAReportAbuseModule&abtype=TOS",{method:"POST",body:a}).then(function(a){return a.json()})}function c(){m.style.opacity="0.1"}function d(){var a=o?o:n,b=JSON.parse(window.localStorage["@YahooAnswersSpanReport:reportedList"]);if(!b.includes(a)){var c=[].concat(_toConsumableArray(b),[a]);c.length>50&&c.shift(),window.localStorage["@YahooAnswersSpanReport:reportedList"]=JSON.stringify(c)}}function f(a){h(),m.className.includes("Pos-r")||(m.className+=" Pos-r");var b=a?l:q;b.style.display="initial",m.appendChild(b)}/**
   * event handler
   */function g(a){if(a.target.className.includes("qTile")){m=a.target,n=m.getAttribute("data-qid");var b=JSON.parse(window.localStorage["@YahooAnswersSpanReport:reportedList"]).includes(n);f(b)}}function h(){q.style.display="none",l.style.display="none"}function i(a){m=a.target,n=m.getAttribute("data-ya-question-id"),o=null;var b=JSON.parse(window.localStorage["@YahooAnswersSpanReport:reportedList"]).includes(n);f(b)}function j(a){m=a.target,n=m.getAttribute("data-ya-question-id"),o=m.getAttribute("data-ya-answer-id");var b=JSON.parse(window.localStorage["@YahooAnswersSpanReport:reportedList"]).includes(o);f(b)}function k(){b().then(function(){alert("Done!"),d(),c()})}/**
   * init
   */var l,m,n,o,p=document.createElement("span"),q=document.createElement("span");window.ANSWERS.si&&window.ANSWERS.yi&&(function(){window.localStorage||(window.localStorage={}),window.localStorage["@YahooAnswersSpanReport:reportedList"]=window.localStorage["@YahooAnswersSpanReport:reportedList"]||JSON.stringify([])}(),a(),function(){var a=document.getElementById("ya-answer-tab"),b=document.getElementById("ya-question-detail");/**
     * QA page
     */if(a&&(a.addEventListener("mouseenter",g,!0),a.addEventListener("mouseleave",h)),b){var c=document.querySelectorAll("li[data-ya-type=\"answer\"], #ya-best-answer");// show reportBtn for question
b.addEventListener("mouseenter",i),b.addEventListener("mouseleave",h);// show/hide reportBtn for best answer and other answers
for(var d=0;d<c.length;d++)c[d].addEventListener("mouseenter",j),c[d].addEventListener("mouseleave",h)}// click reportBtn
q.addEventListener("click",k)}())})();

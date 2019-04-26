"use strict";// ==UserScript==
// @name         YahooAnswersSpamReport
// @namespace    https://2yc.tw
// @version      0.1.0
// @description  try to take over the world!
// @author       YY
// @license      MIT
// @match        https://*.answers.yahoo.com
// @match        https://*.answers.yahoo.com/question/*
// @grant        none
// ==/UserScript==
(function(){function a(){var a=new FormData,b="reportq";return k&&(b="reporta",a.append("ansid",k)),a.append("crumb",window.ANSWERS.crumb),a.append("action",b),a.append("qid",j),a.append("abtype","TOS"),a.append("desc",""),fetch("/_post?name=YAReportAbuseModule&abtype=TOS",{method:"POST",body:a}).then(function(a){return a.json()})}function b(){i.style.opacity="0.1"}function c(){i.className.includes("Pos-r")||(i.className+=" Pos-r"),m.style.display="initial",i.appendChild(m)}/**
   * event handler
   */function d(a){a.target.className.includes("qTile")&&(i=a.target,j=i.getAttribute("data-qid"),c())}function e(){m.style.display="none"}function f(a){i=a.target,j=i.getAttribute("data-ya-question-id"),k=null,c()}function g(a){i=a.target,j=i.getAttribute("data-ya-question-id"),k=i.getAttribute("data-ya-answer-id"),c()}function h(){a().then(function(){alert("Done!"),b()})}/**
   * init
   */var i,j,k,l=document.createElement("span"),m=document.createElement("span");window.ANSWERS.si&&window.ANSWERS.yi&&(function(){l.className="rptabuse Wpx-20 Hpx-20 D-ib shared-sprite reportabuse-icon Va-tb",m.id="spam_ReportBtn",m.innerText=" SPAM",m.style.right="10px",m.style.top="10px",m.style.position="absolute",m.style.cursor="pointer",m.style.color="red",m.style.background="#eee",m.style.fontSize="12px",m.style.padding="1px 5px",m.prepend(l)}(),function(){var a=document.getElementById("ya-answer-tab"),b=document.getElementById("ya-question-detail");/**
     * QA page
     */if(a&&(a.addEventListener("mouseenter",d,!0),a.addEventListener("mouseleave",e)),b){var c=document.querySelectorAll("li[data-ya-type=\"answer\"], #ya-best-answer");// show reportBtn for question
b.addEventListener("mouseenter",f),b.addEventListener("mouseleave",e);// show/hide reportBtn for best answer and other answers
for(var j=0;j<c.length;j++)c[j].addEventListener("mouseenter",g),c[j].addEventListener("mouseleave",e)}// click reportBtn
m.addEventListener("click",h)}())})();

//
// ==UserScript==
// @name         YahooAnswersSpamReport
// @namespace    https://2yc.tw
// @version      0.1.0
// @description 
// @author       YY
// @license      MIT
// @homepage     https://github.com/x3388638/YahooAnswersSpamReport
// @updateURL    https://openuserjs.org/meta/x3388638/YahooAnswersSpamReport.meta.js
// @match        https://*.answers.yahoo.com
// @match        https://*.answers.yahoo.com/answer
// @match        https://*.answers.yahoo.com/question/*
// @grant        none
// ==/UserScript==

(() => {
  const _reportIcon = document.createElement('span');
  const _reportBtn = document.createElement('span');
  let _spamNode;
  let _currentQid;
  let _currentAid;

  function initBtn() {
    _reportIcon.className = 'rptabuse Wpx-20 Hpx-20 D-ib shared-sprite reportabuse-icon Va-tb';

    _reportBtn.id = 'spam_ReportBtn';
    _reportBtn.innerText = ' SPAM';
    _reportBtn.style.right = '10px';
    _reportBtn.style.top = '10px';
    _reportBtn.style.position = 'absolute';
    _reportBtn.style.cursor = 'pointer';
    _reportBtn.style.color = 'red';
    _reportBtn.style.background = '#eee';
    _reportBtn.style.fontSize = '12px';
    _reportBtn.style.padding = '1px 5px';
    _reportBtn.prepend(_reportIcon);
  }

  function bindEvent() {
    const tab = document.getElementById('ya-answer-tab');
    const questionDetail = document.getElementById('ya-question-detail');

    /**
     * Question listing page
     */
    if (tab) {
      // show reportBtn
      tab.addEventListener('mouseenter', handleMouseenterQuestionList, true);
      // hide reportBtn
      tab.addEventListener('mouseleave', handleHideBtn);
    }

    /**
     * QA page
     */
    if (questionDetail) {
      const nodes = document.querySelectorAll('li[data-ya-type="answer"], #ya-best-answer');
      // show reportBtn for question
      questionDetail.addEventListener('mouseenter', handleMouseenterQuestionDetail);
      // hide reportBtn for question
      questionDetail.addEventListener('mouseleave', handleHideBtn);
      // show/hide reportBtn for best answer and other answers
      for (let i = 0; i < nodes.length; i ++) {
        nodes[i].addEventListener('mouseenter', handleMouseenterAnswer);
        nodes[i].addEventListener('mouseleave', handleHideBtn);
      }
    }

    // click reportBtn
    _reportBtn.addEventListener('click', handleReport);
  }

  function postReport() {
    const data = new FormData();
    let actionType = 'reportq';
    if (_currentAid) {
      actionType = 'reporta';
      data.append('ansid', _currentAid);
    }

    data.append('crumb', window.ANSWERS.crumb);
    data.append('action', actionType);
    data.append('qid', _currentQid);
    data.append('abtype', 'TOS');
    data.append('desc', '');

    return fetch('/_post?name=YAReportAbuseModule&abtype=TOS', {
      method: 'POST',
      body: data
    }).then(res => res.json());
  }

  function markSpam() {
    _spamNode.style.opacity = '0.1';
  }

  function showBtnOnSpamNode() {
    if (!_spamNode.className.includes('Pos-r')) {
      _spamNode.className += ' Pos-r';
    }

    _reportBtn.style.display = 'initial';
    _spamNode.appendChild(_reportBtn);
  }

  /**
   * event handler
   */
  function handleMouseenterQuestionList(e) {
    if (e.target.className.includes('qTile')) {
      _spamNode = e.target;
      _currentQid = _spamNode.getAttribute('data-qid');
      showBtnOnSpamNode();
    }
  }

  function handleHideBtn() {
    _reportBtn.style.display = 'none';
  }

  function handleMouseenterQuestionDetail(e) {
    _spamNode = e.target;
    _currentQid = _spamNode.getAttribute('data-ya-question-id');
    _currentAid = null;
    showBtnOnSpamNode();
  }

  function handleMouseenterAnswer(e) {
    _spamNode = e.target;
    _currentQid = _spamNode.getAttribute('data-ya-question-id');
    _currentAid = _spamNode.getAttribute('data-ya-answer-id');
    showBtnOnSpamNode();
  }

  function handleReport() {
    postReport().then(() => {
      alert('Done!');
      markSpam();
    });
  }

  /**
   * init
   */
  if (window.ANSWERS.si && window.ANSWERS.yi) {
    initBtn();
    bindEvent();
  }
})();

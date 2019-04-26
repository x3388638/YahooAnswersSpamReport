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

(() => {
  const REPORTED_LIST = '@YahooAnswersSpanReport:reportedList';
  const MAX_REPORTED_RECORD = 50;
  const _reportIcon = document.createElement('span');
  const _reportBtn = document.createElement('span');
  let _reportedMark;
  let _spamNode;
  let _currentQid;
  let _currentAid;

  function initStorage() {
    if (!window.localStorage) {
      window.localStorage = {};
    }

    window.localStorage[REPORTED_LIST] = window.localStorage[REPORTED_LIST] || JSON.stringify([]);
  }

  function initElement() {
    _reportIcon.className = 'rptabuse Wpx-20 Hpx-20 D-ib shared-sprite reportabuse-icon Va-tb';

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

    _reportedMark = _reportBtn.cloneNode();
    _reportedMark.style.cursor = 'default';
    _reportedMark.innerText = 'Reported';
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

  function updateReportedList() {
    const id = _currentAid ? _currentAid : _currentQid;
    const list = JSON.parse(window.localStorage[REPORTED_LIST]);
    if (!list.includes(id)) {
      const newList = [...list, id];
      if (newList.length > MAX_REPORTED_RECORD) {
        newList.shift();
      }

      window.localStorage[REPORTED_LIST] = JSON.stringify(newList);
    }
  }

  function showBtnOnSpamNode(reported) {
    handleHideBtn();
    if (!_spamNode.className.includes('Pos-r')) {
      _spamNode.className += ' Pos-r';
    }

    const ele = reported ? _reportedMark : _reportBtn;
    ele.style.display = 'initial';
    _spamNode.appendChild(ele);
  }

  /**
   * event handler
   */
  function handleMouseenterQuestionList(e) {
    if (e.target.className.includes('qTile')) {
      _spamNode = e.target;
      _currentQid = _spamNode.getAttribute('data-qid');
      const reported = JSON.parse(window.localStorage[REPORTED_LIST]).includes(_currentQid);
      showBtnOnSpamNode(reported);
    }
  }

  function handleHideBtn() {
    _reportBtn.style.display = 'none';
    _reportedMark.style.display = 'none';
  }

  function handleMouseenterQuestionDetail(e) {
    _spamNode = e.target;
    _currentQid = _spamNode.getAttribute('data-ya-question-id');
    _currentAid = null;
    const reported = JSON.parse(window.localStorage[REPORTED_LIST]).includes(_currentQid);
    showBtnOnSpamNode(reported);
  }

  function handleMouseenterAnswer(e) {
    _spamNode = e.target;
    _currentQid = _spamNode.getAttribute('data-ya-question-id');
    _currentAid = _spamNode.getAttribute('data-ya-answer-id');
    const reported = JSON.parse(window.localStorage[REPORTED_LIST]).includes(_currentAid);
    showBtnOnSpamNode(reported);
  }

  function handleReport() {
    postReport().then(() => {
      alert('Done!');
      updateReportedList();
      markSpam();
    });
  }

  /**
   * init
   */
  if (window.ANSWERS.si && window.ANSWERS.yi) {
    initStorage();
    initElement();
    bindEvent();
  }
})();

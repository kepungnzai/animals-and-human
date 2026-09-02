/* ==========================================================
   Naked Mole-Rat Underground Lab — interactions + mini quiz
   ========================================================== */
(function () {
  'use strict';

  var $ = function (sel, root) { return (root || document).querySelector(sel); };
  var $$ = function (sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); };

  /* ---------- 1. reveal sections on scroll ---------- */
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    $$('[data-reveal]').forEach(function (el) { io.observe(el); });
  } else {
    $$('[data-reveal]').forEach(function (el) { el.classList.add('is-visible'); });
  }

  /* ---------- 2. mini quiz data ---------- */
  var quizData = [
    {
      q: 'What makes the naked mole-rat amazing at avoiding cancer?',
      options: ['It drinks special juice', 'It has two cell safety-doors and a giant jelly-sugar around its cells', 'It never moves', 'It lives in a bubble'],
      correct: 1,
      explain: 'Mole-rats have TWO crowd-control doors (p16 and p27) plus an extra-huge sugary jelly (HMW-HA) around their cells \u2014 a super-powered cancer defense!'
    },
    {
      q: 'How long can a naked mole-rat survive with ZERO oxygen?',
      options: ['About 18 minutes', 'About 18 days', 'About 18 seconds', 'It can\u2019t survive at all'],
      correct: 0,
      explain: 'An amazing 18 minutes! Its heart even slows from ~200 to ~50 beats per minute \u2014 like a pause button for its body.'
    },
    {
      q: 'What happens to a mole-rat\u2019s heart when oxygen runs out?',
      options: ['It beats 10x faster', 'It stops forever', 'It slows way down from ~200 to ~50 beats per minute', 'It pops'],
      correct: 2,
      explain: 'It slows way down! The heartbeat drops to about 50 beats per minute and breathing nearly stops \u2014 saving precious energy with no oxygen.'
    },
    {
      q: 'How long can naked mole-rats live?',
      options: ['About 2 years like a mouse', 'Over 37 years \u2014 the longest of any rodent', 'About 100 years', 'Only 6 months'],
      correct: 1,
      explain: 'Over 37 years! A pet mouse lives only ~2\u20133 years, so this wrinkly digger outlives its mouse cousins by more than 10 times.'
    },
    {
      q: 'In 2023, what did scientists do with the mole-rat\u2019s Has2 gene?',
      options: ['They put it into mice, making them healthier and longer-lived', 'They deleted it', 'They fed it to the mice', 'They painted it on the cage'],
      correct: 0,
      explain: 'They transferred the Has2 gene into mice! The mice became healthier, had less inflammation, and lived about 4.4% longer \u2014 proof the trick works in other animals!'
    },
    {
      q: 'What do scientists hope the mole-rat\u2019s oxygen trick could help people with?',
      options: ['Growing goldfish', 'Recovering from heart attacks or strokes when body parts lose oxygen', 'Digging faster', 'Sleeping better'],
      correct: 1,
      explain: 'They hope it could help people recover from heart attacks and strokes \u2014 when parts of the body suddenly run out of oxygen. Amazing future medicine!'
    }
  ];

  var quizBox = $('#quizBox');
  var quizIndex = 0;
  var quizScore = 0;

  function renderQuiz() {
    var q = quizData[quizIndex];
    var pct = (quizIndex / quizData.length) * 100;
    var btns = '';
    var j;
    for (j = 0; j < q.options.length; j += 1) {
      btns += '<button type="button" class="quiz-option" data-i="' + j + '">' + (j + 1) + '. ' + q.options[j] + '</button>';
    }
    quizBox.innerHTML =
      '<div class="quiz-meta">'
      + '<div class="quiz-progress-wrap"><div class="quiz-progress" style="width:' + pct + '%"></div></div>'
      + '<p class="quiz-count">Question ' + (quizIndex + 1) + ' of ' + quizData.length + '</p>'
      + '</div>'
      + '<p class="quiz-question">' + q.q + '</p>'
      + '<div class="quiz-options">' + btns + '</div>'
      + '<div class="q-feedback" id="qFeedback" style="display:none"></div>'
      + '<div class="quiz-next-row"><button type="button" id="nextBtn" class="btn btn--cool" style="display:none">Next &#187;</button></div>';

    $$('.quiz-option', quizBox).forEach(function (b) {
      b.addEventListener('click', function () { pickAnswer(b); });
    });
  }

  function pickAnswer(btn) {
    if (btn.classList.contains('is-selected')) { return; }
    var q = quizData[quizIndex];
    var pk = Number(btn.getAttribute('data-i'));
    var good = (pk === q.correct);
    if (good) { quizScore += 1; }

    $$('.quiz-option', quizBox).forEach(function (op) {
      op.disabled = true;
      if (+op.getAttribute('data-i') === q.correct) { op.classList.add('is-correct'); }
      if (+op.getAttribute('data-i') !== pk) { op.classList.add('is-dimmed'); }
    });
    btn.classList.add('is-selected', good ? 'is-correct' : 'is-wrong');

    var fb = $('#qFeedback', quizBox);
    fb.style.display = 'block';
    fb.classList.add(good ? 'q-feedback--right' : 'q-feedback--wrong');
    fb.innerHTML = '<span class="fb-emoji">' + (good ? '&#127881;' : '&#129300;') + '</span><p>' + (good ? 'Correct! ' : 'Good try! ') + '<span style="font-weight:600">' + q.explain + '</span></p>';

    var bar = $('.quiz-progress', quizBox);
    if (bar) { bar.style.width = ((quizIndex + 1) / quizData.length * 100) + '%'; }

    var nb = $('#nextBtn', quizBox);
    if (nb) { nb.style.display = 'inline-block'; }
  }

  function nextStep() {
    quizIndex += 1;
    if (quizIndex < quizData.length) {
      renderQuiz();
    } else {
      showRewards();
    }
  }

  function showRewards() {
    var stars = (quizScore === quizData.length) ? 5 : Math.max(1, Math.round(quizScore / quizData.length * 5));
    var titles = ['Ready for round two?', 'Good start!', 'Nice work!', 'Superb!', 'Amazing!', 'Underground Genius!'];
    quizBox.innerHTML =
      '<div class="results-panel">'
      + '<h3>' + titles[stars] + '</h3>'
      + '<p class="big-score">' + quizScore + ' / ' + quizData.length + '</p>'
      + '<div class="star-row">' + starRow(stars) + '</div>'
      + '<span class="badge-result">&#127942; Mole-Rat Explorer Badge</span>'
      + '<p>You now know the mole-rat&rsquo;s super-secrets!</p>'
      + '<div class="results-actions">'
      + '<button type="button" id="againBtn" class="btn btn--cool">&#128260; Play again</button>'
      + '<a href="#superpowers" class="btn btn--ghost">&#11088; Re-view the superpowers</a>'
      + '</div>'
      + '</div>';
    launchConfetti();
  }

  function starRow(num) {
    var out = '';
    var s;
    for (s = 0; s < 5; s += 1) {
      out += '<span class="' + (s < num ? 'star--on' : 'star--off') + '">&#11088;</span>';
    }
    return out;
  }

  function restartQuiz() {
    quizIndex = 0;
    quizScore = 0;
    renderQuiz();
  }

  var confettiColors = ['#ff5eae', '#2c9df0', '#ffd93b', '#35c58b', '#9b5de5', '#ff8b3e'];
  function launchConfetti() {
    var frag = document.createDocumentFragment();
    var i;
    for (i = 0; i < 70; i += 1) {
      var p = document.createElement('i');
      p.className = 'confetti';
      p.style.left = (Math.random() * 100) + 'vw';
      p.style.width = (6 + Math.random() * 8) + 'px';
      p.style.height = p.style.width;
      p.style.background = confettiColors[i % confettiColors.length];
      p.style.animationDelay = (Math.random() * 0.4) + 's';
      p.style.animationDuration = (2.4 + Math.random() * 1.6) + 's';
      frag.appendChild(p);
    }
    document.body.appendChild(frag);
    setTimeout(function () {
      $$('.confetti').forEach(function (c) { c.remove(); });
    }, 5200);
  }

  quizBox.addEventListener('click', function (ev) {
    var t = ev.target;
    if (!t || !t.classList) { return; }
    if (t.classList.contains('quiz-option') && !t.disabled) {
      pickAnswer(t);
    } else if (t.id === 'nextBtn') {
      nextStep();
    } else if (t.id === 'againBtn') {
      restartQuiz();
    }
  });

  renderQuiz();
}());
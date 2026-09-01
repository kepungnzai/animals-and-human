/* ==========================================================
   Snake Venom Lab — interactions + mini quiz
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
      q: 'What is the first step to make antivenom?',
      options: ['Milking venom from snakes', 'Milking cows for milk', 'Asking the snake nicely', 'Bottling ocean water'],
      correct: 0,
      explain: 'First, experts gently \u201cmilk\u201d venom from snakes \u2014 the snake bites a cover stretched over a jar and drops of venom drip out!'
    },
    {
      q: 'Which animal usually acts as the \u201cantibody factory\u201d?',
      options: ['A cat', 'A horse', 'A parrot', 'An elephant'],
      correct: 1,
      explain: 'Small safe doses of venom are given to a horse (or sheep/donkey). Its immune system makes antibodies \u2014 the venom-catching keys!'
    },
    {
      q: 'What do the antibodies in antivenom do?',
      options: ['They turn the bite into ice', 'They grab and neutralize the venom toxins', 'They make the wound bigger', 'They scare the snake away'],
      correct: 1,
      explain: 'Antibodies cruise through the blood and GRAB the venom toxins. Once captured, the venom can\u2019t hurt the person \u2014 that\u2019s neutralizing!'
    },
    {
      q: 'Can ONE kind of antivenom treat bites from ALL snakes?',
      options: ['Yes, one bottle works for every snake', 'No \u2014 it must match the snake or group of snakes', 'Only if the snake is small', 'Only at night'],
      correct: 1,
      explain: 'No! Venoms are different from species to species, and antibodies are like keys \u2014 a key only fits its own lock. Some \u201cpolyvalent\u201d antivenoms cover several local snakes, but there is still no universal one.'
    },
    {
      q: 'Besides antivenom, how has snake venom helped people?',
      options: ['It became a blood-pressure medicine', 'It became a flavour of ice cream', 'It became pet food', 'It became paint'],
      correct: 0,
      explain: 'The blood-pressure medicine CAPTOPRIL came from studying the venom of a Brazilian pit viper. Venom is also studied for pain-killers and blood thinners!'
    },
    {
      q: 'If a friend is bitten by a snake, what is the RIGHT thing to do?',
      options: ['Suck the venom out with your mouth', 'Cut the wound open', 'Stay calm, keep still, and get to a hospital fast', 'Chase the snake to catch it'],
      correct: 2,
      explain: 'Sucking, cutting, and chasing are all dangerous myths! Stay calm, keep the bite still, and get to a hospital FAST so doctors can choose the right antivenom.'
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
    var titles = ['Ready for round two?', 'Good start!', 'Nice work!', 'Superb!', 'Amazing!', 'Venom Expert!'];
    quizBox.innerHTML =
      '<div class="results-panel">'
      + '<h3>' + titles[stars] + '</h3>'
      + '<p class="big-score">' + quizScore + ' / ' + quizData.length + '</p>'
      + '<div class="star-row">' + starRow(stars) + '</div>'
      + '<span class="badge-result">&#127942; Snake-Science Explorer Badge</span>'
      + '<p>You now know how venom turns into life-saving medicine!</p>'
      + '<div class="results-actions">'
      + '<button type="button" id="againBtn" class="btn btn--cool">&#128260; Play again</button>'
      + '<a href="#make" class="btn btn--ghost">&#129514; Re-read the steps</a>'
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
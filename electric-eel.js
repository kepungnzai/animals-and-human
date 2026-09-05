/* ==========================================================
   Electric Eel — The Shock Lab — interactions + mini quiz
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
      q: 'What is an electric eel really?',
      options: ['It is not a true eel \u2014 it is a fish (a knifefish, cousin of catfish)', 'It is a snake', 'It is a worm', 'It is an eel fish'],
      correct: 0,
      explain: 'Even though its name says eel, it is actually a fish called a KNIFEFISH \u2014 a relative of catfish, not a true eel at all!'
    },
    {
      q: 'How much voltage can an electric eel produce?',
      options: ['About 5 volts', 'Up to about 600 volts', 'A thousand million volts', 'Only 1 volt'],
      correct: 1,
      explain: 'An electric eel can deliver a jolt of up to about 600 volts \u2014 more than enough to stun prey! (Volts measure how strong the electric push is.)'
    },
    {
      q: 'What body parts make the electricity?',
      options: ['Its stomach', 'Special bioelectric organs made of electric cells', 'Its eyes', 'Its bones'],
      correct: 1,
      explain: 'The eel has special electricity-making organs, like batteries, packed with electric cells \u2014 that is what scientists call bioelectric organs!'
    },
    {
      q: 'An electric eel uses its shocks for\u2026',
      options: ['Hunting and defending itself', 'Painting', 'Singing', 'Brushing its teeth'],
      correct: 0,
      explain: 'It uses shocks to hunt and defend, and it also uses a weak field like radar to see in muddy water \u2014 a high-voltage shock and a low-voltage sensor!'
    },
    {
      q: 'What did scientists do after studying the electric eel\u2019s genes?',
      options: ['They fully decoded its genome (gene sequencing)', 'They taught it to dance', 'They made it fly', 'They turned it into a plant'],
      correct: 0,
      explain: 'Researchers at Yale University and CUNY finished GENE SEQUENCING \u2014 decoding the eel\u2019s DNA recipe \u2014 to find out which genes build its electric organs!'
    },
    {
      q: 'Why do scientists study the electric eel to help people?',
      options: ['To build bio-batteries and electrical nerve therapies', 'To make electric toys', 'To power street lights', 'To amaze visitors'],
      correct: 0,
      explain: 'Scientists want to copy its electricity-making tricks to build BIO-BATTERIES and electrical nerve-stimulation therapies that could help human nerves and muscles!'
    }
  ];

  var quizBox = $('#quizBox');
  var quizIndex = 0;
  var quizScore = 0;

  function renderQuiz() {
    var q = quizData[quizIndex];
    var pct = (quizIndex / quizData.length * 100);
    var opts = '';
    var i;
    for (i = 0; i < q.options.length; i += 1) {
      opts += '<button type="button" class="quiz-option" data-i="' + i + '"><span>' + q.options[i] + '</span></button>';
    }
    quizBox.innerHTML =
      '<div class="quiz-meta">'
      + '<div class="quiz-progress-wrap"><div class="quiz-progress" style="width:' + pct + '%"></div></div>'
      + '<p class="quiz-count">Question ' + (quizIndex + 1) + ' of ' + quizData.length + '</p>'
      + '</div>'
      + '<p class="quiz-question">' + q.q + '</p>'
      + '<div class="quiz-options">' + opts + '</div>'
      + '<div class="q-feedback" id="qFeedback" hidden></div>'
      + '<button type="button" id="nextBtn" class="btn btn--cool" style="display:none">Next &#8594;</button>';
  }

  function pickAnswer(op) {
    if (!op || op.disabled) { return; }
    var pk = +op.getAttribute('data-i');
    var q = quizData[quizIndex];
    var good = (pk === q.correct);
    if (good) { quizScore += 1; }
    lastPick(pk);
  }

  function lastPick(pk) {
    var q = quizData[quizIndex];
    var good = (pk === q.correct);
    $$('.quiz-option', quizBox).forEach(function (op) {
      op.disabled = true;
      if (+op.getAttribute('data-i') === q.correct) { op.classList.add('is-correct'); }
      if (+op.getAttribute('data-i') !== pk) { op.classList.add('is-dimmed'); }
    });
    var btn = $('.quiz-option[data-i="' + pk + '"]', quizBox);
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
    var titles = ['Ready for round two?', 'Good start!', 'Nice work!', 'Superb!', 'Amazing!', 'Shock Expert!'];
    quizBox.innerHTML =
      '<div class="results-panel">'
      + '<h3>' + titles[stars] + '</h3>'
      + '<p class="big-score">' + quizScore + ' / ' + quizData.length + '</p>'
      + '<div class="star-row">' + starRow(stars) + '</div>'
      + '<span class="badge-result">&#127942; Bioelectric Explorer Badge</span>'
      + '<p>You now know how the electric eel makes its shocks \u2014 and the bio-battery dream for people!</p>'
      + '<div class="results-actions">'
      + '<button type="button" id="againBtn" class="btn btn--cool">&#128260; Play again</button>'
      + '<a href="#lab" class="btn btn--ghost">&#129514; Re-read the lab missions</a>'
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

  var confettiColors = ['#2c9df0', '#ffd93b', '#9b5de5', '#ff8b3e', '#35c58b', '#ffe066'];
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
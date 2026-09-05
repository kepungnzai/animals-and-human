/* ==========================================================
   Hydra — The Immortal Pond Lab — interactions + mini quiz
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
      q: 'What kind of animal is a hydra?',
      options: ['It is a cousin of jellyfish and corals (a cnidarian)', 'It is a fish', 'It is an insect', 'It is a plant'],
      correct: 0,
      explain: 'A hydra is a CNIDARIAN \u2014 part of the animal family that includes jellyfish, corals and sea anemones. It is no plant (even though it looks a bit flowery)!'
    },
    {
      q: 'Where does a hydra live?',
      options: ['In freshwater ponds and lakes', 'In deserts', 'In the deep dark ocean', 'On dry land'],
      correct: 0,
      explain: 'Hydra are tiny FRESHWATER animals. They live in ponds, lakes and streams, holding onto leaves or stones and waiting for a snack to swim by!'
    },
    {
      q: 'What does \u201cbiologically immortal\u201d mean for a hydra?',
      options: ['It shows no signs of aging from time', 'It can never ever die', 'It can turn invisible', 'It never needs food'],
      correct: 0,
      explain: 'It means time alone does not make it age \u2014 it shows almost no getting-old. It can still be eaten or hurt, but it does not wear out just from growing older!'
    },
    {
      q: 'What keeps a hydra\u2019s chromosome caps (telomeres) long?',
      options: ['Telomerase', 'Sunscreen', 'Ice cream', 'Rust'],
      correct: 0,
      explain: 'Hydra keep a helper called TELOMERASE active, so it re-grows the chromosome caps over and over. The cell countdown never runs out!'
    },
    {
      q: 'What do hydra stem cells keep doing?',
      options: ['Keep dividing to renew the body', 'Fall asleep forever', 'Turn into leaves', 'Disappear'],
      correct: 0,
      explain: 'Hydra stem cells keep on dividing, replacing older cells all the time. That continuous RENEWAL is a big part of why its body stays fresh!'
    },
    {
      q: 'Why do scientists study the hydra for humans?',
      options: ['To plan anti-aging therapies', 'To build toys', 'To make it talk', 'To decorate ponds'],
      correct: 0,
      explain: 'Scientists at the Max Planck Institute and Caltech study it to dream up ANTI-AGING therapies \u2014 ways to help people\u2019s cells stay healthy and young for longer!'
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
    var titles = ['Ready for round two?', 'Good start!', 'Nice work!', 'Superb!', 'Amazing!', 'Ageless Genius!'];
    quizBox.innerHTML =
      '<div class="results-panel">'
      + '<h3>' + titles[stars] + '</h3>'
      + '<p class="big-score">' + quizScore + ' / ' + quizData.length + '</p>'
      + '<div class="star-row">' + starRow(stars) + '</div>'
      + '<span class="badge-result">&#127942; Immortal-Explorer Badge</span>'
      + '<p>You now know why a hydra doesn\u2019t age &mdash; and the three lab missions trying to copy its tricks!</p>'
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

  var confettiColors = ['#35c58b', '#17b897', '#ff9a3c', '#ffd93b', '#9b5de5', '#8be13b'];
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
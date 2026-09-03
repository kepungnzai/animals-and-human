/* ==========================================================
   Sea Star Reef Lab — interactions + mini quiz
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
      q: 'What is a sea star\u2019s sneaky escape trick?',
      options: ['It bites back', 'It lets the grabbed arm drop off (autotomy) and runs away', 'It turns invisible', 'It sings a lullaby'],
      correct: 1,
      explain: 'When a predator grabs an arm, some sea stars can DROP the arm on purpose (autotomy) and hurry away \u2014 then grow the arm back later!'
    },
    {
      q: 'Which part of a new arm grows FIRST?',
      options: ['The middle', 'The tip with the terminal tube foot', 'The bottom', 'All parts at once'],
      correct: 1,
      explain: 'The TIP comes first \u2014 with a special terminal tube foot that becomes the future eye-spot and steering wheel, then the arm grows out behind it!'
    },
    {
      q: 'What do cells do near the wound to rebuild an arm?',
      options: ['They disappear', 'They turn back into simple \u201cbuilder cells\u201d and divide', 'They freeze', 'They turn into hair'],
      correct: 1,
      explain: 'Adult cells hit RESET! They become simple builder cells, divide, and build every layer of the new arm \u2014 bones, muscle, skin and tube feet.'
    },
    {
      q: 'What is a \u201ccomet\u201d sea star?',
      options: ['A star that crashes', 'An arm with a piece of the middle disc that grows a whole new sea star', 'A star that shoots fire', 'A star with 5 arms'],
      correct: 1,
      explain: 'If an arm breaks off with a bit of the central disc, it can keep living and grow a whole NEW sea star \u2014 that shape is called a \u201ccomet\u201d!'
    },
    {
      q: 'Is the sea star\u2019s regeneration power written in its DNA?',
      options: ['Yes \u2014 and it\u2019s about which genes turn ON (gene expression)', 'No \u2014 it\u2019s magic', 'Only in its brain', 'It has no DNA'],
      correct: 0,
      explain: 'YES! Its DNA holds the recipe book, but the real magic is GENE EXPRESSION \u2014 which building-genes the cells switch ON, kind of like an embryo playlist starting again!'
    },
    {
      q: 'Why do scientists study sea star regrowth for human medicine?',
      options: ['To make paint', 'To learn how people might one day regrow limbs or repair organs', 'To teach sea stars to talk', 'To find lost treasure'],
      correct: 1,
      explain: 'Humans scar instead of regrowing. By reading sea stars\u2019 gene switches, scientists dream of helping people regrow fingertips, repair organs, or heal spinal-cord injuries one day!'
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
    var titles = ['Ready for round two?', 'Good start!', 'Nice work!', 'Superb!', 'Amazing!', 'Reef Genius!'];
    quizBox.innerHTML =
      '<div class="results-panel">'
      + '<h3>' + titles[stars] + '</h3>'
      + '<p class="big-score">' + quizScore + ' / ' + quizData.length + '</p>'
      + '<div class="star-row">' + starRow(stars) + '</div>'
      + '<span class="badge-result">&#127942; Regeneration Explorer Badge</span>'
      + '<p>You now know how sea stars grow arms back &mdash; and the DNA recipe behind it!</p>'
      + '<div class="results-actions">'
      + '<button type="button" id="againBtn" class="btn btn--cool">&#128260; Play again</button>'
      + '<a href="#dna" class="btn btn--ghost">&#129516; Re-read the DNA section</a>'
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

  var confettiColors = ['#ff5eae', '#2c9df0', '#ffd93b', '#ff8b6b', '#2ec4b6', '#ff8b3e'];
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
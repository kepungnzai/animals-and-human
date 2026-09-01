/* ==========================================================
   Dumbo Octopus Deep Dive — interactions + mini quiz
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

  /* ---------- 2. interactive anatomy map ---------- */
  var dots = $$('.anat-dot');
  var cards = $$('.anatomy-card');
  var currentPart = null;

  function setActive(part) {
    currentPart = part;
    dots.forEach(function (d) {
      d.classList.toggle('active', d.getAttribute('data-anatomy') === part);
    });
    cards.forEach(function (c) {
      c.classList.toggle('active', c.getAttribute('data-anatomy') === part);
    });
  }

  function scrollCardIntoView(part) {
    var target = null;
    cards.forEach(function (c) {
      if (c.getAttribute('data-anatomy') === part) { target = c; }
    });
    if (target && target.scrollIntoView) {
      target.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }

  dots.forEach(function (dot, i) {
    dot.classList.add('anat-dot--' + (i + 1));

    function clickDot() {
      var part = dot.getAttribute('data-anatomy');
      setActive(part);
      scrollCardIntoView(part);
    }

    dot.addEventListener('click', clickDot);
    dot.addEventListener('keydown', function (ev) {
      if (ev.key === 'Enter' || ev.key === ' ') {
        ev.preventDefault();
        clickDot();
      }
    });
  });

  cards.forEach(function (card) {
    card.addEventListener('click', function () {
      setActive(card.getAttribute('data-anatomy'));
    });
  });

  setActive('1');

  /* ---------- 3. mini quiz data ---------- */
  var quizData = [
    {
      q: 'Why can\'t the deep-sea pressure squish Dumbo?',
      options: ['It wears a heavy metal helmet', 'Its body is soft, jelly-like and full of water', 'It blows up a little balloon inside', 'It hides inside a hard shell'],
      correct: 1,
      explain: 'Dumbo\u2019s body is like a water balloon \u2014 full of water with no air pockets. The pressure washes right through, so nothing gets crushed!'
    },
    {
      q: 'How does Dumbo mostly swim around?',
      options: ['It zig-zags super fast like a rocket', 'It flaps its two ear-like fins', 'It walks on tiptoe along the seafloor', 'It rides on the back of a whale'],
      correct: 1,
      explain: 'Dumbo gently flaps its two fins like soft wings. Flapping saves lots of energy \u2014 and energy is precious in the deep sea!'
    },
    {
      q: 'What are the little fuzzy lines on Dumbo\u2019s arms?',
      options: ['They are called cirri and they sweep tiny animals out of the mud', 'They are called noodles and they are for eating spaghetti', 'They are antennas that send messages', 'They are whiskers that help it smell'],
      correct: 0,
      explain: 'Cirri (say \u201cseer-ee\u201d) are finger-like fuzzies that sweep worms, tiny shrimp and snails out of the soft ocean floor!'
    },
    {
      q: 'Why does Dumbo NOT squirt ink like other cousins?',
      options: ['It lost its ink tank at hide-and-seek', 'The dark is already perfect for hiding, and ink would waste energy', 'It really likes being seen', 'Its ink would freeze solid'],
      correct: 1,
      explain: 'In the pitch-dark deep sea, a smoke cloud would not help anyone hide. Finned octopuses like Dumbo skip the ink to save precious energy!'
    },
    {
      q: 'Which one is NOT a dumbo octopus superpower?',
      options: ['A squishy, pressure-proof jelly body', 'Flappy fins that save energy', 'Fuzzy cirri for finding dinner', 'A big, heavy rocky shell'],
      correct: 3,
      explain: 'Ha! Dumbo has NO heavy shell \u2014 that would be a terrible idea deep down. Its soft jelly body is the real superpower!'
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
    var titles = ['Ready for round two?', 'Good start!', 'Nice work!', 'Superb!', 'Amazing!', 'Dumbo Scientist!'];
    quizBox.innerHTML =
      '<div class="results-panel">'
      + '<h3>' + titles[stars] + '</h3>'
      + '<p class="big-score">' + quizScore + ' / ' + quizData.length + '</p>'
      + '<div class="star-row">' + starRow(stars) + '</div>'
      + '<span class="badge-result">&#127942; Deep-Sea Explorer Badge</span>'
      + '<p>You now know Dumbo\u2019s deep-sea secrets!</p>'
      + '<div class="results-actions">'
      + '<button type="button" id="againBtn" class="btn btn--cool">&#128260; Play again</button>'
      + '<a href="#anatomy" class="btn btn--ghost">&#128269; Re-visit the anatomy</a>'
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
/* ==========================================================
   Axolotl Regrow Lab — interactions + mini quiz
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
      q: 'Why do scientists say the axolotl is special at healing?',
      options: ['It grows fur', 'It heals without scars and can regrow whole body parts', 'It sleeps for a year', 'It has three hearts'],
      correct: 1,
      explain: 'The axolotl heals WITHOUT scarring and can regrow whole lost parts like legs and tails — that\u2019s why it\u2019s the champion!'
    },
    {
      q: 'About how long does it take an axolotl to regrow a lost leg or tail?',
      options: ['A few seconds', 'A couple of hours', 'Weeks or months', 'One hundred years'],
      correct: 2,
      explain: 'It\u2019s a slow, careful rebuild — a lost leg or tail grows back over WEEKS or MONTHS, not in an instant!'
    },
    {
      q: 'What is the blob of \u201cbuilder cells\u201d that forms on the wound called?',
      options: ['A bubble', 'A blastema', 'A bandage', 'A banana'],
      correct: 1,
      explain: 'That lump of regrown builder cells is called a BLASTEMA (blass-TEE-ma) — it\u2019s the tiny factory that builds the new body part!'
    },
    {
      q: 'Which of these CAN an axolotl NOT regrow?',
      options: ['Its whole head and brain', 'Its tail with spinal cord', 'Parts of its heart', 'Its lower jaw'],
      correct: 0,
      explain: 'It CAN regrow tail, jaw, heart parts and even parts of its brain — but a whole new HEAD is impossible. That\u2019s a real limit!'
    },
    {
      q: 'What can make the axolotl\u2019s regrowing power get weaker?',
      options: ['Getting older', 'Becoming a land salamander (metamorphosis)', 'A messy wound with no nerve signals', 'All of the above!'],
      correct: 3,
      explain: 'All three! Regrowth needs helpful skin, nerve signals and healthy cells — and it slows with age and fades a lot after metamorphosis.'
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
    var titles = ['Ready for round two?', 'Good start!', 'Nice work!', 'Superb!', 'Amazing!', 'Regrowth Guru!'];
    quizBox.innerHTML =
      '<div class="results-panel">'
      + '<h3>' + titles[stars] + '</h3>'
      + '<p class="big-score">' + quizScore + ' / ' + quizData.length + '</p>'
      + '<div class="star-row">' + starRow(stars) + '</div>'
      + '<span class="badge-result">&#127942; Regrowth Explorer Badge</span>'
      + '<p>You now know the axolotl\u2019s regrowth secrets &mdash; and its limits!</p>'
      + '<div class="results-actions">'
      + '<button type="button" id="againBtn" class="btn btn--cool">&#128260; Play again</button>'
      + '<a href="#can-grow" class="btn btn--ghost">&#128170; Re-visit the green list</a>'
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
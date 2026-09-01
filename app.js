/* ==========================================================
   Animal Discovery HQ — fun interactions + Big Quiz
   ========================================================== */
(function () {
  'use strict';

  const $ = (sel, root) => (root || document).querySelector(sel);
  const $$ = (sel, root) => Array.from((root || document).querySelectorAll(sel));

  /* ---------- 1. reveal sections on scroll ---------- */
  const io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  $$('[data-reveal]').forEach(function (el) { io.observe(el); });

  /* ---------- 2. flip the animal cards ---------- */
  $$('.animal-card').forEach(function (card) {
    card.addEventListener('click', function () {
      card.classList.toggle('flipped');
    });
  });

  /* ---------- 3. Big Quiz data ---------- */
  var quizData = [
    {
      q: 'Why is the deep-sea octopus nicknamed “Dumbo”?',
      options: ['Because it is super heavy', 'Because of its two ear-like fins, like Dumbo the elephant', 'Because it lives in a circus', 'Because it sleeps a lot'],
      correct: 1,
      praise: 'Exactly right! 🎉',
      bummer: 'Almost! 💭',
      explain: 'Its two wavy fins look like the big floppy ears of Dumbo the elephant — that’s how it got its cute name!'
    },
    {
      q: 'Where do WILD axolotls live?',
      options: ['All over the world', 'In one lake system in Mexico City', 'In the Sahara desert', 'On tall mountain tops'],
      correct: 1,
      praise: 'Wow, great animal brain! 🧠',
      bummer: 'Good guess! 🧩',
      explain: 'Wild axolotls are only found in the Xochimilco lake and canals in Mexico — one small spot on Earth! That’s why they are critically endangered.'
    },
    {
      q: 'What is super-special about MALE peacock spiders?',
      options: ['They sing opera songs', 'They dance and flash a rainbow fan', 'They fly like birds', 'They grow wings'],
      correct: 1,
      praise: 'You nailed it! 🌈',
      bummer: 'Not quite! 💭',
      explain: 'These tiny spiders — smaller than a grain of rice — put on a little dance show, raising a rainbow-coloured fan to show off!'
    },
    {
      q: 'What did scientists announce in February 2024 about the green anaconda?',
      options: ['That anacondas can fly', 'That the northern ones are a brand-new species', 'That they live on the moon', 'That they only eat ice cream'],
      correct: 1,
      praise: 'Super detective work! 🔍',
      bummer: 'Keep thinking! 🧩',
      explain: 'By studying DNA, scientists discovered that northern green anacondas are actually a SEPARATE species — a huge brand-new discovery!'
    },
    {
      q: 'About how deep can a dumbo octopus live?',
      options: ['About 1 to 7 kilometres down', 'About 1 metre down', 'About 10 metres down', 'Inside a sunken ice-cream van'],
      correct: 0,
      praise: 'Deep thinker! 🌊',
      bummer: 'So close! 🐙',
      explain: 'The dumbo octopus is the deepest-living octopus known — it can live 1,000 to 7,000 metres down in the cold, dark ocean!'
    },
    {
      q: 'Which of these can an axolotl grow back?',
      options: ['Its legs and tail', 'Its gills', 'Parts of its heart and brain', 'All of the above!'],
      correct: 3,
      praise: 'Champion guesser! 🌟',
      bummer: 'Almost! 💭',
      explain: 'The axolotl is the king of healing — legs, tails, gills and even parts of its heart and brain can grow back. Scientists are studying it to help people too!'
    }
  ];

  /* 3. Big Quiz logic */
  var quizBox = $('#quizBox');
  var quizIndex = 0;
  var quizScore = 0;

  function renderQuiz() {
    var q = quizData[quizIndex];
    var pct = (quizIndex / quizData.length) * 100;
    var btns = '';
    var j = 0;
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

    var opts = $$('.quiz-option', quizBox);
    for (j = 0; j < opts.length; j += 1) {
      opts[j].addEventListener('click', onOptionClick);
    }
  }

  function onOptionClick() {
    pickAnswer(this);
  }

  function pickAnswer(btn) {
    if (btn.classList.contains('is-selected')) { return; }
    var q = quizData[quizIndex];
    var pk = Number(btn.getAttribute('data-i'));
    var good = (pk === q.correct);
    if (good) { quizScore += 1; }

    var opts = $$('.quiz-option', quizBox);
    var m = 0;
    for (m = 0; m < opts.length; m += 1) {
      opts[m].disabled = true;
      if (m === q.correct) { opts[m].classList.add('is-correct'); }
      if (m !== pk) { opts[m].classList.add('is-dimmed'); }
    }
    btn.classList.add('is-selected');
    btn.classList.add(good ? 'is-correct' : 'is-wrong');

    var fb = $('#qFeedback', quizBox);
    fb.style.display = 'block';
    fb.classList.add(good ? 'q-feedback--right' : 'q-feedback--wrong');
    fb.innerHTML = '<span class="fb-emoji">' + (good ? '&#127881;' : '&#129300;') + '</span><p>' + (good ? q.praise : q.bummer) + '</p><p>' + q.explain + '</p>';

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

  function onQuizClick(ev) {
    var t = ev.target;
    if (!t || !t.classList) { return; }
    if (t.classList.contains('quiz-option') && !t.disabled) {
      pickAnswer(t);
    } else if (t.id === 'nextBtn') {
      nextStep();
    } else if (t.id === 'againBtn') {
      restartQuiz();
    }
  }

  function showRewards() {
    var stars = (quizScore === quizData.length) ? 5 : Math.max(1, Math.round(quizScore / quizData.length * 5));
    var titles = ['Ready for round two?', 'Good start!', 'Nice work!', 'Superb!', 'Amazing!', 'Animal Scientist!'];
    quizBox.innerHTML =
      '<div class="results-panel">'
      + '<h3>' + titles[stars] + '</h3>'
      + '<p class="big-score">' + quizScore + ' / ' + quizData.length + '</p>'
      + '<div class="star-row">' + starRow(stars) + '</div>'
      + '<span class="badge-result">&#127942; Explorer Badge</span>'
      + '<p>You are one step closer to being an animal scientist!</p>'
      + '<div class="results-actions">'
      + '<button type="button" id="againBtn" class="btn btn--cool">&#128260; Play again</button>'
      + '<a href="#friends" class="btn btn--ghost">&#128214; Re-read the facts</a>'
      + '</div>'
      + '</div>';
    launchConfetti();
  }

  function starRow(num) {
    var out = '';
    var s = 0;
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

  /* 4. confetti celebration */
  var confettiColors = ['#ff5eae', '#2c9df0', '#ffd93b', '#35c58b', '#9b5de5', '#ff8b3e'];
  function launchConfetti() {
    var frag = document.createDocumentFragment();
    var i = 0;
    for (i = 0; i < 80; i += 1) {
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
    setTimeout(clearConfetti, 5200);
  }
  function clearConfetti() {
    var ps = $$('.confetti');
    var k = 0;
    for (k = 0; k < ps.length; k += 1) { ps[k].remove(); }
  }

  /* 5. start the quiz */
  quizBox.addEventListener('click', onQuizClick);
  renderQuiz();
}());
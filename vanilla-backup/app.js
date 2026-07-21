/**
 * CivilsPage - Dynamic Features and Interactive Script
 * Implements mobile menus, filterable components, testimonial carousels,
 * stateful interactive quizzes, and optimized animations.
 */

document.addEventListener('DOMContentLoaded', () => {

  /* ==========================================================================
     1. NAVIGATION & HAMBURGER MENU
     ========================================================================== */
  const hamburger = document.getElementById('hamburger-menu');
  const mobileMenu = document.getElementById('mobile-menu');
  const overlay = document.getElementById('mobile-menu-overlay');
  const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link, .dropdown-item, .mobile-dropdown-item');

  function toggleMenu() {
    const isOpen = mobileMenu.classList.toggle('open');
    hamburger.classList.toggle('open');
    overlay.classList.toggle('active');
    hamburger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    document.body.style.overflow = isOpen ? 'hidden' : '';
  }

  function closeMenu() {
    mobileMenu.classList.remove('open');
    hamburger.classList.remove('open');
    overlay.classList.remove('active');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  if (hamburger) hamburger.addEventListener('click', toggleMenu);
  if (overlay) overlay.addEventListener('click', closeMenu);

  // Close drawer on click of mobile links & manage active state highlight
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      // Find matching link target and update desktop/mobile links
      const href = link.getAttribute('href');
      if (!href || href === '#') return; // Skip dropdown buttons / triggers
      
      navLinks.forEach(item => {
        if (item.getAttribute('href') === href) {
          item.classList.add('active');
        } else {
          item.classList.remove('active');
        }
      });
      
      closeMenu();
    });
  });

  // Mobile Accordion Toggle
  const mobileDropdowns = document.querySelectorAll('.mobile-dropdown');
  mobileDropdowns.forEach(dropdown => {
    const trigger = dropdown.querySelector('.mobile-dropdown-trigger');
    if (trigger) {
      trigger.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        
        // Toggle the current dropdown
        dropdown.classList.toggle('active');
        
        // Close other dropdowns
        mobileDropdowns.forEach(other => {
          if (other !== dropdown) {
            other.classList.remove('active');
          }
        });
      });
    }
  });


  /* ==========================================================================
     2. CURRENT AFFAIRS TABS SYSTEM
     ========================================================================== */
  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');

  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      const targetTab = button.getAttribute('data-tab');

      tabButtons.forEach(btn => btn.classList.remove('active'));
      tabContents.forEach(content => content.classList.remove('active'));

      button.classList.add('active');
      const targetElement = document.getElementById(`tab-${targetTab}`);
      if (targetElement) {
        targetElement.classList.add('active');
      }
    });
  });


  /* ==========================================================================
     3. INTERACTIVE PYQ FILTER SYSTEM
     ========================================================================== */
  const subjectSelect = document.getElementById('filter-subject');
  const yearSelect = document.getElementById('filter-year');
  const filterPills = document.querySelectorAll('.filter-pill');
  const pyqItems = document.querySelectorAll('.pyq-item');
  const pyqEmptyState = document.getElementById('pyqs-empty');

  function filterPYQs() {
    const selectedSubject = subjectSelect.value;
    const selectedYear = yearSelect.value;
    let matchCount = 0;

    pyqItems.forEach(item => {
      const itemSubject = item.getAttribute('data-subject');
      const itemYear = item.getAttribute('data-year');

      const subjectMatch = (selectedSubject === 'all' || itemSubject === selectedSubject);
      const yearMatch = (selectedYear === 'all' || itemYear === selectedYear);

      if (subjectMatch && yearMatch) {
        item.style.display = 'grid';
        // Add animated reveal effects back
        item.classList.add('active');
        matchCount++;
      } else {
        item.style.display = 'none';
        item.classList.remove('active');
      }
    });

    // Update empty state display
    if (pyqEmptyState) {
      pyqEmptyState.style.display = (matchCount === 0) ? 'block' : 'none';
    }
  }

  // Handle Select Dropdowns
  if (subjectSelect) subjectSelect.addEventListener('change', () => {
    // Sync Select value with pills highlight
    const val = subjectSelect.value;
    filterPills.forEach(pill => {
      if (pill.getAttribute('data-subject') === val) {
        pill.classList.add('active');
      } else {
        pill.classList.remove('active');
      }
    });
    filterPYQs();
  });

  if (yearSelect) yearSelect.addEventListener('change', filterPYQs);

  // Handle Quick Topic pills
  filterPills.forEach(pill => {
    pill.addEventListener('click', () => {
      filterPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');

      const targetSubject = pill.getAttribute('data-subject');
      if (subjectSelect) {
        subjectSelect.value = targetSubject;
      }
      filterPYQs();
    });
  });

  // Action Solve button triggers alert info for realistic design
  const pyqSolveBtns = document.querySelectorAll('.pyq-solve-btn');
  pyqSolveBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const pyqCard = e.target.closest('.pyq-item');
      const title = pyqCard.querySelector('.pyq-title').innerText;
      alert(`Solving Portal: Detailed video analysis & UPSC examiner strategy checklist for question:\n\n"${title.slice(0, 100)}..." is included in our full GS study courses!`);
    });
  });


  /* ==========================================================================
     4. INTERACTIVE MOCK TEST WIDGET
     ========================================================================== */
  const quizQuestions = [
    {
      subject: 'Indian Polity',
      question: 'Which of the following statements best describes the concept of "Basic Structure" of the Constitution of India?',
      options: [
        'It is a doctrine explicitly defined in Article 368 of the Constitution regarding amendments.',
        'It refers to constitutional provisions that can only be amended with a two-thirds majority in Parliament and ratification by all States.',
        'It is a judicial innovation stating that certain features of the Constitution are fundamental and cannot be altered or destroyed by the Parliament.',
        'It refers strictly to the Fundamental Rights enumerated in Part III of the Constitution.'
      ],
      correctAnswer: 2,
      explanation: 'The "Basic Structure" doctrine is a judicial innovation introduced by the Supreme Court in the Kesavananda Bharati judgment (1973). It does not appear in the text of the Constitution, but dictates that Parliament cannot amend the core features (like democracy, rule of law, federalism, judicial review) under Article 368.'
    },
    {
      subject: 'Indian Economy',
      question: 'Which of the following measures by the RBI would help control rising inflation in the economy?',
      options: [
        'Reducing the Cash Reserve Ratio (CRR) and lowering the Repo Rate.',
        'Selling government securities in open market operations and increasing Bank Rate.',
        'Buying government bonds to pump liquidity and reducing Margin Requirements.',
        'Lending more money to commercial banks under Marginal Standing Facility.'
      ],
      correctAnswer: 1,
      explanation: 'To control inflation, the RBI seeks to reduce money supply. Selling government securities sucks liquidity out of the banking system. Increasing key policy rates (Bank Rate/Repo Rate) makes credit expensive, thereby slowing down aggregate demand and price growth.'
    },
    {
      subject: 'History & Culture',
      question: 'Regarding the Ryotwari settlement implemented during the British Raj, consider the following statements: (1) Rent was paid directly by peasants, (2) Land revenue assessment was permanent, (3) The government gave pattas to ryots. Which of these are correct?',
      options: [
        '1 and 2 only',
        '2 and 3 only',
        '1 and 3 only',
        '1, 2 and 3'
      ],
      correctAnswer: 2,
      explanation: 'Under the Ryotwari System (introduced by Munro and Reed), the revenue was paid directly by the peasants (Ryots) to the government (Statement 1) and pattas were issued (Statement 3). However, the land assessment was NOT permanent; it was revised periodically (usually every 20-30 years). Thus statement 2 is incorrect.'
    }
  ];

  let currentQuestionIndex = 0;
  let selectedOptionIndex = null;
  let quizScore = 0;
  let quizTimerInterval = null;
  let quizSeconds = 0;
  let answerSubmitted = false;

  const playScreen = document.getElementById('quiz-play-screen');
  const resultScreen = document.getElementById('quiz-result-screen');
  const progressFill = document.getElementById('quiz-progress-bar-fill');
  const progressText = document.getElementById('quiz-progress-text');
  const timerClock = document.getElementById('quiz-timer-clock');
  const subjectBadge = document.getElementById('quiz-subject-badge');
  const questionDesc = document.getElementById('quiz-question-desc');
  const optionsContainer = document.getElementById('quiz-options-container');
  const explanationBox = document.getElementById('quiz-explanation-box');
  const explanationText = document.getElementById('quiz-explanation-text');
  const actionBtn = document.getElementById('quiz-action-btn');
  const retryBtn = document.getElementById('quiz-retry-btn');
  const resultScoreRing = document.getElementById('quiz-result-ring');
  const resultScoreText = document.getElementById('quiz-result-text');
  const resultTitle = document.getElementById('quiz-result-title');
  const resultSub = document.getElementById('quiz-result-sub');

  function startQuizTimer() {
    quizSeconds = 0;
    if (quizTimerInterval) clearInterval(quizTimerInterval);
    
    quizTimerInterval = setInterval(() => {
      quizSeconds++;
      const mins = String(Math.floor(quizSeconds / 60)).padStart(2, '0');
      const secs = String(quizSeconds % 60).padStart(2, '0');
      if (timerClock) timerClock.innerText = `${mins}:${secs}`;
    }, 1000);
  }

  function renderQuestion() {
    answerSubmitted = false;
    selectedOptionIndex = null;
    if (explanationBox) explanationBox.classList.remove('show');
    if (actionBtn) {
      actionBtn.innerText = 'Submit Answer';
      actionBtn.disabled = true;
    }

    const currentQ = quizQuestions[currentQuestionIndex];
    
    // Update progress bars
    const progressPercent = ((currentQuestionIndex + 1) / quizQuestions.length) * 100;
    if (progressFill) progressFill.style.width = `${progressPercent}%`;
    if (progressText) progressText.innerText = `Question ${currentQuestionIndex + 1} of ${quizQuestions.length}`;
    
    // Update question metadata
    if (subjectBadge) subjectBadge.innerText = currentQ.subject;
    if (questionDesc) questionDesc.innerText = currentQ.question;
    
    // Render options
    if (optionsContainer) {
      optionsContainer.innerHTML = '';
      currentQ.options.forEach((option, idx) => {
        const letter = String.fromCharCode(65 + idx); // A, B, C, D
        const optionBtn = document.createElement('button');
        optionBtn.className = 'quiz-option';
        optionBtn.setAttribute('aria-label', `Option ${letter}: ${option}`);
        optionBtn.innerHTML = `
          <span class="quiz-option-letter">${letter}</span>
          <span class="quiz-option-text">${option}</span>
        `;
        
        optionBtn.addEventListener('click', () => {
          if (answerSubmitted) return;
          
          // Toggle selection styling
          document.querySelectorAll('.quiz-option').forEach(opt => opt.classList.remove('selected'));
          optionBtn.classList.add('selected');
          
          selectedOptionIndex = idx;
          if (actionBtn) actionBtn.disabled = false;
        });
        
        optionsContainer.appendChild(optionBtn);
      });
    }
  }

  function handleQuizAction() {
    const currentQ = quizQuestions[currentQuestionIndex];
    
    if (!answerSubmitted) {
      // Submission of answer
      answerSubmitted = true;
      clearInterval(quizTimerInterval); // Freeze timer for this question
      
      const optionElements = document.querySelectorAll('.quiz-option');
      const correctIdx = currentQ.correctAnswer;
      
      optionElements.forEach((el, idx) => {
        el.classList.add('disabled');
        el.classList.remove('selected');
        
        if (idx === correctIdx) {
          el.classList.add('correct');
        } else if (idx === selectedOptionIndex) {
          el.classList.add('incorrect');
        }
      });
      
      // Update score tracker
      if (selectedOptionIndex === correctIdx) {
        quizScore++;
      }
      
      // Display explanations
      if (explanationText) explanationText.innerText = currentQ.explanation;
      if (explanationBox) explanationBox.classList.add('show');
      
      // Check if this is the final question
      if (actionBtn) {
        if (currentQuestionIndex < quizQuestions.length - 1) {
          actionBtn.innerText = 'Next Question';
        } else {
          actionBtn.innerText = 'View Score Card';
        }
      }
    } else {
      // Proceeding to next question or screen
      if (currentQuestionIndex < quizQuestions.length - 1) {
        currentQuestionIndex++;
        renderQuestion();
        startQuizTimer();
      } else {
        showQuizResults();
      }
    }
  }

  function showQuizResults() {
    if (playScreen) playScreen.style.display = 'none';
    if (resultScreen) resultScreen.classList.add('show');
    
    if (resultScoreText) resultScoreText.innerText = `${quizScore}/${quizQuestions.length}`;
    
    // Conic gradient representation on results ring
    const percentage = (quizScore / quizQuestions.length) * 360;
    if (resultScoreRing) {
      resultScoreRing.style.background = `radial-gradient(circle, var(--bg-surface) 60%, transparent 61%), conic-gradient(var(--color-success) ${percentage}deg, rgba(15, 23, 42, 0.06) 0deg)`;
    }
    
    // Message tuning
    if (quizScore === quizQuestions.length) {
      if (resultTitle) resultTitle.innerText = "Excellent Job! IAS Rank Material";
      if (resultSub) resultSub.innerText = "Perfect score! You possess deep analytical clarity and strong command over Core GS concepts.";
    } else if (quizScore >= 1) {
      if (resultTitle) resultTitle.innerText = "Good Effort! Keep Revising";
      if (resultSub) resultSub.innerText = "Decent score, but details matter in UPSC Prelims. Review the detailed explanations and download our GS Cheat sheets.";
    } else {
      if (resultTitle) resultTitle.innerText = "Need Thorough Concept Building";
      if (resultSub) resultSub.innerText = "UPSC questions require deep syllabus correlation. Start building strong fundamentals by downloading our free Micro-Syllabus breakdowns.";
    }
  }

  function resetQuiz() {
    currentQuestionIndex = 0;
    quizScore = 0;
    if (resultScreen) resultScreen.classList.remove('show');
    if (playScreen) playScreen.style.display = 'block';
    renderQuestion();
    startQuizTimer();
  }

  if (actionBtn) actionBtn.addEventListener('click', handleQuizAction);
  if (retryBtn) retryBtn.addEventListener('click', resetQuiz);

  // Initialize quiz state
  if (playScreen) {
    renderQuestion();
    startQuizTimer();
  }


  /* ==========================================================================
     5. TESTIMONIALS CAROUSEL
     ========================================================================== */
  const track = document.getElementById('testimonial-track');
  const slides = document.querySelectorAll('.carousel-slide');
  const prevBtn = document.getElementById('carousel-prev');
  const nextBtn = document.getElementById('carousel-next');
  const dotsContainer = document.getElementById('carousel-dots-container');
  
  if (track && slides.length > 0) {
    let currentIndex = 0;
    let startX = 0;
    let isDragging = false;
    let autoPlayTimer = null;

    // Generate indicator dots
    slides.forEach((_, idx) => {
      const dot = document.createElement('div');
      dot.className = `carousel-dot ${idx === 0 ? 'active' : ''}`;
      dot.setAttribute('role', 'button');
      dot.setAttribute('aria-label', `Go to testimonial slide ${idx + 1}`);
      
      dot.addEventListener('click', () => {
        goToSlide(idx);
        resetAutoPlay();
      });
      
      if (dotsContainer) dotsContainer.appendChild(dot);
    });

    const dots = document.querySelectorAll('.carousel-dot');

    function updateTrackPosition() {
      track.style.transform = `translateX(-${currentIndex * 100}%)`;
      // Update dots active status
      dots.forEach((dot, idx) => {
        if (idx === currentIndex) {
          dot.classList.add('active');
        } else {
          dot.classList.remove('active');
        }
      });
    }

    function goToSlide(index) {
      if (index < 0) {
        currentIndex = slides.length - 1;
      } else if (index >= slides.length) {
        currentIndex = 0;
      } else {
        currentIndex = index;
      }
      updateTrackPosition();
    }

    function nextSlide() {
      goToSlide(currentIndex + 1);
    }

    function prevSlide() {
      goToSlide(currentIndex - 1);
    }

    if (nextBtn) nextBtn.addEventListener('click', () => {
      nextSlide();
      resetAutoPlay();
    });
    
    if (prevBtn) prevBtn.addEventListener('click', () => {
      prevSlide();
      resetAutoPlay();
    });

    // Touch events swipe handler for mobile devices
    track.addEventListener('touchstart', (e) => {
      startX = e.touches[0].clientX;
      isDragging = true;
    });

    track.addEventListener('touchmove', (e) => {
      if (!isDragging) return;
      const currentX = e.touches[0].clientX;
      const diffX = startX - currentX;
      
      // Threshold for swipe detection
      if (Math.abs(diffX) > 50) {
        if (diffX > 0) {
          nextSlide();
        } else {
          prevSlide();
        }
        isDragging = false; // Reset dragging state
        resetAutoPlay();
      }
    });

    track.addEventListener('touchend', () => {
      isDragging = false;
    });

    // Auto playing rotations
    function startAutoPlay() {
      autoPlayTimer = setInterval(nextSlide, 7000);
    }

    function resetAutoPlay() {
      if (autoPlayTimer) {
        clearInterval(autoPlayTimer);
        startAutoPlay();
      }
    }

    startAutoPlay();
  }


  /* ==========================================================================
     6. NEWSLETTER SIGNUP SIMULATION
     ========================================================================== */
  const newsletterForm = document.getElementById('newsletter-form');
  const newsletterEmail = document.getElementById('newsletter-email');
  const newsletterFeedback = document.getElementById('newsletter-feedback');

  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const emailVal = newsletterEmail.value.trim();
      if (!emailVal) return;

      // Mock submitting API state feedback
      if (newsletterFeedback) {
        newsletterFeedback.className = 'newsletter-feedback';
        newsletterFeedback.innerText = 'Subscribing...';
        newsletterFeedback.style.display = 'block';
      }

      setTimeout(() => {
        if (newsletterFeedback && newsletterEmail) {
          newsletterFeedback.className = 'newsletter-feedback success';
          newsletterFeedback.innerText = '✓ Thank you! You have successfully subscribed to CivilsPage newsletters.';
          newsletterForm.reset();
        }
      }, 1200);
    });
  }


  /* ==========================================================================
     7. SCROLL OBSERVER FOR ENHANCED ENTRANCE ANIMATIONS
     ========================================================================== */
  const revealElements = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        // Once visible, no need to track again for entry animations
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15, // Trigger when 15% of card is in screen
    rootMargin: '0px 0px -40px 0px' // Slightly offset bottom threshold
  });

  revealElements.forEach(element => {
    revealObserver.observe(element);
  });

});

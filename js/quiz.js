document.addEventListener('DOMContentLoaded', function() {
  const quizContainer = document.querySelector('.quiz-container');
  if (!quizContainer) return;
  
  const quizQuestions = [
    {
      id: 1,
      type: 'multiple-choice',
      question: 'Which is the largest volcano on Mars?',
      options: ['Arsia Mons', 'Olympus Mons', 'Elysium Mons', 'Pavonis Mons'],
      correctAnswer: 'Olympus Mons'
    },
    {
      id: 2,
      type: 'multiple-choice',
      question: 'Which rover landed on Mars in 2021?',
      options: ['Curiosity', 'Opportunity', 'Perseverance', 'Spirit'],
      correctAnswer: 'Perseverance'
    },
    {
      id: 3,
      type: 'text',
      question: 'What is the name of the canyon system on Mars often compared to Earth\'s Grand Canyon?',
      correctAnswer: 'Valles Marineris'
    },
    {
      id: 4,
      type: 'multiple-choice',
      question: 'What gives Mars its distinctive red color?',
      options: ['Volcanic activity', 'Iron oxide (rust)', 'Methane gas', 'Sulfur deposits'],
      correctAnswer: 'Iron oxide (rust)'
    },
    {
      id: 5,
      type: 'textarea',
      question: 'Describe why Mars is an important target for space exploration in your own words.'
    }
  ];
  
  let currentStep = 0;
  let answers = {};
  let submitted = false;
  let score = 0;
  let userInfo = {
    name: '',
    email: '',
    dob: '',
    phone: ''
  };
  
  // Initial render
  renderQuestion();
  
  function handleUserInfoChange(e) {
    const { name, value } = e.target;
    userInfo[name] = value;
    validateUserInfo();
  }
  
  function validateUserInfo() {
    const startButton = document.getElementById('start-quiz');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const dobInput = document.getElementById('dob');
    const phoneInput = document.getElementById('phone');
    
    // Name validation
    const nameValid = nameInput.value.trim().length > 0;
    if (!nameValid) {
      nameInput.classList.add('invalid');
    } else {
      nameInput.classList.remove('invalid');
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const emailValid = emailRegex.test(emailInput.value.trim());
    if (!emailValid) {
      emailInput.classList.add('invalid');
    } else {
      emailInput.classList.remove('invalid');
    }
    
    // DOB validation
    const dobValue = dobInput.value;
    const dobDate = new Date(dobValue);
    const today = new Date();
    const minDate = new Date();
    minDate.setFullYear(today.getFullYear() - 100); // Max age 100 years
    const maxDate = new Date();
    maxDate.setFullYear(today.getFullYear() - 10); // Min age 10 years
    
    const dobValid = dobValue && dobDate >= minDate && dobDate <= maxDate;
    if (!dobValid) {
      dobInput.classList.add('invalid');
    } else {
      dobInput.classList.remove('invalid');
    }
    
    // Phone validation
    const phoneRegex = /^\+?[0-9]{10,15}$/;
    const phoneValid = phoneRegex.test(phoneInput.value.trim().replace(/[\s-]/g, ''));
    if (!phoneValid) {
      phoneInput.classList.add('invalid');
    } else {
      phoneInput.classList.remove('invalid');
    }
    
    // Enable/disable start button
    startButton.disabled = !(nameValid && emailValid && dobValid && phoneValid);
  }
  
  function handleAnswerChange(questionId, value) {
    answers[questionId] = value;
  }
  
  function startQuiz() {
    if (userInfo.name && userInfo.email && userInfo.dob && userInfo.phone) {
      currentStep = 1;
      renderQuestion();
    }
  }
  
  function nextQuestion() {
    if (currentStep < quizQuestions.length) {
      currentStep++;
      renderQuestion();
    } else {
      calculateScore();
      submitted = true;
      renderQuestion();
    }
  }
  
  function prevQuestion() {
    if (currentStep > 1) {
      currentStep--;
      renderQuestion();
    }
  }
  
  function calculateScore() {
    let correctCount = 0;
    
    quizQuestions.forEach(question => {
      if (question.correctAnswer && answers[question.id] === question.correctAnswer) {
        correctCount++;
      }
    });
    
    // Only count questions with correct answers (not the textarea)
    const totalScorableQuestions = quizQuestions.filter(q => q.correctAnswer).length;
    score = Math.round((correctCount / totalScorableQuestions) * 100);
  }
  
  function resetQuiz() {
    currentStep = 0;
    answers = {};
    submitted = false;
    score = 0;
    userInfo = {
      name: '',
      email: '',
      dob: '',
      phone: ''
    };
    renderQuestion();
  }
  
  function renderQuestion() {
    const quizCard = document.querySelector('.quiz-card');
    
    if (currentStep === 0) {
      quizCard.innerHTML = `
        <h2 class="quiz-title">Mars Exploration Quiz</h2>
        <div class="form-group">
          <label for="name" class="form-label">Your Name</label>
          <input 
            id="name" 
            name="name" 
            class="form-input" 
            placeholder="Enter your name"
            required
          />
          <div class="error-message" id="name-error">Please enter your name</div>
        </div>
        <div class="form-group">
          <label for="email" class="form-label">Your Email</label>
          <input 
            id="email" 
            name="email" 
            type="email" 
            class="form-input" 
            placeholder="Enter your email"
            required
          />
          <div class="error-message" id="email-error">Please enter a valid email address</div>
        </div>
        <div class="form-group">
          <label for="dob" class="form-label">Date of Birth</label>
          <input 
            id="dob" 
            name="dob" 
            type="date" 
            class="form-input" 
            required
          />
          <div class="error-message" id="dob-error">Please enter a valid date of birth (age between 10-100)</div>
        </div>
        <div class="form-group">
          <label for="phone" class="form-label">Phone Number</label>
          <input 
            id="phone" 
            name="phone" 
            type="tel" 
            class="form-input" 
            placeholder="Enter your phone number (e.g., 1234567890)"
            required
          />
          <div class="error-message" id="phone-error">Please enter a valid phone number (10-15 digits)</div>
        </div>
        <button id="start-quiz" class="btn btn-primary" style="width: 100%;" disabled>
          Start Quiz
        </button>
      `;
      
      // Add event listeners
      document.getElementById('name').addEventListener('input', handleUserInfoChange);
      document.getElementById('email').addEventListener('input', handleUserInfoChange);
      document.getElementById('dob').addEventListener('input', handleUserInfoChange);
      document.getElementById('phone').addEventListener('input', handleUserInfoChange);
      document.getElementById('start-quiz').addEventListener('click', startQuiz);
      
    } else if (submitted) {
      quizCard.innerHTML = `
        <h2 class="quiz-title">Quiz Results</h2>
        <div class="quiz-results">
          <h3>Thank you for completing the quiz, ${userInfo.name}!</h3>
          <div class="quiz-score">${score}%</div>
          <p>
            ${score >= 80 ? 'Excellent! You\'re a Mars expert!' : 
             score >= 60 ? 'Good job! You know quite a bit about Mars.' : 
             'Keep learning about Mars! There\'s so much to discover.'}
          </p>
          <button id="reset-quiz" class="btn btn-primary" style="margin-top: 1rem;">Take Quiz Again</button>
        </div>
      `;
      
      // Add event listener
      document.getElementById('reset-quiz').addEventListener('click', resetQuiz);
      
    } else {
      const question = quizQuestions[currentStep - 1];
      
      let questionHTML = `
        <h2 class="quiz-title">Question ${currentStep} of ${quizQuestions.length}</h2>
        <h3 class="question-text">${question.question}</h3>
      `;
      
      if (question.type === 'multiple-choice') {
        questionHTML += `
          <div class="radio-group">
            ${question.options.map((option, index) => `
              <div class="radio-option">
                <input 
                  type="radio" 
                  id="option-${index}" 
                  name="question-${question.id}" 
                  value="${option}" 
                  ${answers[question.id] === option ? 'checked' : ''}
                />
                <label for="option-${index}">${option}</label>
              </div>
            `).join('')}
          </div>
        `;
      } else if (question.type === 'text') {
        questionHTML += `
          <div class="form-group">
            <input 
              type="text" 
              id="answer-${question.id}" 
              class="form-input" 
              placeholder="Type your answer here"
              value="${answers[question.id] || ''}"
            />
          </div>
        `;
      } else if (question.type === 'textarea') {
        questionHTML += `
          <div class="form-group">
            <textarea 
              id="answer-${question.id}" 
              class="form-textarea" 
              placeholder="Type your answer here"
              rows="5"
            >${answers[question.id] || ''}</textarea>
          </div>
        `;
      }
      
      questionHTML += `
        <div class="quiz-nav">
          <button id="prev-question" class="btn btn-outline" ${currentStep === 1 ? 'disabled' : ''}>
            Previous
          </button>
          <button id="next-question" class="btn btn-primary">
            ${currentStep === quizQuestions.length ? 'Submit Quiz' : 'Next Question'}
          </button>
        </div>
      `;
      
      quizCard.innerHTML = questionHTML;
      
      // Add event listeners
      document.getElementById('prev-question').addEventListener('click', prevQuestion);
      document.getElementById('next-question').addEventListener('click', nextQuestion);
      
      if (question.type === 'multiple-choice') {
        const radioInputs = document.querySelectorAll(`input[name="question-${question.id}"]`);
        radioInputs.forEach(input => {
          input.addEventListener('change', function() {
            handleAnswerChange(question.id, this.value);
          });
        });
      } else if (question.type === 'text' || question.type === 'textarea') {
        const input = document.getElementById(`answer-${question.id}`);
        input.addEventListener('input', function() {
          handleAnswerChange(question.id, this.value);
        });
      }
    }
  }
});
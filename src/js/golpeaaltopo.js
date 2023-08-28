(function() {
    const squares = document.querySelectorAll('.square');
    const timeLeft = document.querySelector('#time-left');
    const score = document.querySelector('#score');
    const restartBtn = document.querySelector('#restart-btn');
    const resultSection = document.querySelector('#result-section');
    const finalScore = document.querySelector('#final-score');
    const playAgainButton = document.querySelector('#play-again-button');
    
    let result = 0;
    let hitPosition;
    let currentTime = 30;
    let timerId = null;
    let countDownTimerId = null;
    let gameInProgress = false;
    
    function randomSquare() {
      squares.forEach(square => {
        square.classList.remove('mole');
      });
    
      if (!gameInProgress) return;
    
      let randomSquare = squares[Math.floor(Math.random() * 9)];
      randomSquare.classList.add('mole');
    
      hitPosition = randomSquare.id;
    }
    
    squares.forEach(square => {
      square.addEventListener('mousedown', () => {
        if (square.id == hitPosition) {
          result++;
          score.textContent = result;
          hitPosition = null;
        }
      });
    });
    
    function startGame() {
      result = 0;
      currentTime = 30;
      score.textContent = result;
      timeLeft.textContent = currentTime;
      resultSection.style.display = 'none';
      gameInProgress = true;
      moveMole();
      countDownTimerId = setInterval(countDown, 1000);
    }
    
    function moveMole() {
      clearInterval(timerId);
      timerId = setInterval(randomSquare, 910); // Cambio a 1000 milisegundos
    }
    
    function countDown() {
      currentTime--;
      timeLeft.textContent = currentTime;
    
      if (currentTime == 0) {
        clearInterval(countDownTimerId);
        clearInterval(timerId);
        gameInProgress = false;
        showGameOverPopup();
      }
    }

    function showGameOverPopup() {
        finalScore.textContent = result;
        resultSection.style.display = 'flex';
      }
    
      playAgainButton.addEventListener('click', () => {
        resultSection.style.display = 'none';
      });

      restartBtn.addEventListener('click', () => {
        clearInterval(countDownTimerId);
        clearInterval(timerId);
        result = 0;
        currentTime = 30;
        score.textContent = result;
        timeLeft.textContent = currentTime;
        resultSection.style.display = 'none';
        gameInProgress = true; // Cambiamos a true para que el juego comience automáticamente
        moveMole();
        countDownTimerId = setInterval(countDown, 1000);
      });
  
    // Start the game initially
    startGame();
  })();
  
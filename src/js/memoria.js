var cards = [
    { id: 1, contentClass: 'card-content-1' },
    { id: 2, contentClass: 'card-content-2' },
    { id: 3, contentClass: 'card-content-3' },
    { id: 4, contentClass: 'card-content-4' },
    { id: 5, contentClass: 'card-content-5' },
    { id: 6, contentClass: 'card-content-6' },
    { id: 7, contentClass: 'card-content-7' },
    { id: 8, contentClass: 'card-content-8' },
    { id: 1, contentClass: 'card-content-1' },
    { id: 2, contentClass: 'card-content-2' },
    { id: 3, contentClass: 'card-content-3' },
    { id: 4, contentClass: 'card-content-4' },
    { id: 5, contentClass: 'card-content-5' },
    { id: 6, contentClass: 'card-content-6' },
    { id: 7, contentClass: 'card-content-7' },
    { id: 8, contentClass: 'card-content-8' }
  ];
  
  function shuffleCards(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  }
  
  cards = shuffleCards(cards);
  
  function createCardElement(card) {
    var element = document.createElement('div');
    element.className = 'card ' + card.contentClass;
    element.dataset.cardId = card.id;
    element.addEventListener('click', cardClickHandler);
    return element;
  }
  
  function renderGameBoard() {
    var gameBoard = document.querySelector('#game-board');
    cards.forEach(function(card) {
      var cardElement = createCardElement(card);
      gameBoard.appendChild(cardElement);
    });
  }
  
  function renderScore() {
    var scoreBoard = document.querySelector('#score1');
    scoreBoard.innerHTML = 'Puntaje: ' + score;
  }
  
  var score = 0;
  var flippedCards = [];
  
  function cardClickHandler(event) {
    var card = event.target;
    if (flippedCards.length < 2 && !card.classList.contains('flipped')) {
      flipCard(card);
      flippedCards.push(card);
      if (flippedCards.length === 2) {
        checkForMatch();
      }
    }
  }
  
  function flipCard(card) {
    card.classList.add('flipped');
    setTimeout(function() {
      card.style.backgroundImage = '';
    }, 300); // Eliminamos la imagen de fondo después de voltear
  }
  
  function checkForMatch() {
    var card1 = flippedCards[0];
    var card2 = flippedCards[1];
    if (card1.dataset.cardId === card2.dataset.cardId) {
      score += 2;
      flippedCards = [];
      renderScore();
      if (score === 16) {
        showResultPopup();
      }
    } else {
      setTimeout(function() {
        card1.classList.remove('flipped');
        card2.classList.remove('flipped');
        card1.style.backgroundImage = '';
        card2.style.backgroundImage = '';
        flippedCards = [];
        renderScore();
      }, 1000);
    }
  }
  
  function restartGame() {
    score = 0;
    flippedCards = [];
    renderScore();
  
    var gameBoard = document.querySelector('#game-board');
    gameBoard.innerHTML = ''; // Elimina las cartas existentes
  
    cards = shuffleCards(cards);
    renderGameBoard();
    hideResultPopup(); // Oculta el popup al reiniciar el juego
  }
  
  function showResultPopup() {
    var resultPopup = document.querySelector('#result-section');
    resultPopup.style.display = 'block';
  }
  
  function hideResultPopup() {
    var resultPopup = document.querySelector('#result-section');
    resultPopup.style.display = 'none';
  }
  
  // Agrega un evento de clic al botón de reinicio
  var restartButton = document.querySelector('#restart-btn');
  restartButton.addEventListener('click', restartGame);
  
  // Agrega un evento de clic al botón "Volver" en el popup
  var playAgainButton = document.querySelector('#play-again-button1');
  playAgainButton.addEventListener('click', hideResultPopup);
  
  renderGameBoard();
  renderScore();
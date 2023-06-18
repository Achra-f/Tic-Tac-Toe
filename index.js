const gameBoard = (() => {
    const cells = Array.from(document.querySelectorAll('.cell'));
    const winConditions = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    let currentPlayer = 'X';
    let running = false;
  
    const initializeGame = () => {
      cells.forEach(cell => cell.addEventListener('click', cellClicked));
      displayController.restartBtn.addEventListener('click', restartGame);
      displayController.statusText.textContent = `${currentPlayer}'s turn.`;
      running = true;
    };
  
    const cellClicked = function() {
      const cellIndex = this.getAttribute('cellIndex');
  
      if (getCellContent(cellIndex) !== '' || !running) {
        return;
      }
  
      updateCell(this, cellIndex);
      checkWinner();
    };
  
    const updateCell = (cell, index) => {
      cells[index].textContent = currentPlayer;
    };
  
    const getCellContent = (index) => {
      return cells[index].textContent;
    };
  
    const changePlayer = () => {
      currentPlayer = (currentPlayer === 'X') ? 'O' : 'X';
      displayController.statusText.textContent = `${currentPlayer}'s turn.`;
    };
  
    const checkWinner = () => {
      let roundWon = false;
  
      for (let i = 0; i < winConditions.length; i++) {
        const condition = winConditions[i];
        const cellA = getCellContent(condition[0]);
        const cellB = getCellContent(condition[1]);
        const cellC = getCellContent(condition[2]);
  
        if (cellA === '' || cellB === '' || cellC === '') {
          continue;
        }
        if (cellA === cellB && cellC === cellB) {
          roundWon = true;
          break;
        }
      }
  
      if (roundWon) {
        displayController.statusText.textContent = `${currentPlayer} wins!`;
        running = false;
      } else if (!cells.some(cell => cell.textContent === '')) {
        displayController.statusText.textContent = `Draw!`;
        running = false;
      } else {
        changePlayer();
      }
    };
  
    const restartGame = () => {
      cells.forEach(cell => {
        cell.textContent = '';
      });
      currentPlayer = 'X';
      displayController.statusText.textContent = `${currentPlayer}'s turn.`;
      running = true;
    };
  
    return {
      initializeGame,
      updateCell,
      getCellContent,
    };
  })();
  
  const displayController = (() => {
    const statusText = document.querySelector('#statusText');
    const restartBtn = document.querySelector('#restartBtn');
  
    return {
      statusText,
      restartBtn,
    };
  })();
  
  gameBoard.initializeGame();
  
const Player = (playerName, playerMarker) => {
	const getName = () => playerName;

	const getMarker = () => playerMarker;

	const setName = (name) => {
		playerName = name;
	};

	const setMarker = (marker) => {
		playerMarker = marker;
	};

	return {
		getName,
		setName,
		getMarker,
		setMarker,
	};
};

const Game = (() => {
	const board = ['', '', '', '', '', '', '', '', ''];
	const playerOne = Player('Player One', 'x');
	const playerTwo = Player('Player Two', 'o');

	const getBoard = () => board;

	const setBoard = (position, marker) => {
		board.splice(position - 1, 1, marker);
	};

	const init = () => {
		const initStartScreen = () => {
			const btnTwoPlayer = document.querySelector('.start-button-1vs1');
			const btnAi = document.querySelector('.start-button-1vsai');
			const btnOnline = document.querySelector('.start-button-online');

			btnTwoPlayer.addEventListener(
				'pointerdown',
				Controller.drawTwoPlayerInput
			);
		};

		initStartScreen();

		const squares = document.querySelectorAll('.square');

		squares.forEach((square) => {
			square.addEventListener('pointerdown', Controller.placeMarker);
		});
	};
	const start = () => {
		init();
	};

	return {
		start,
		getBoard,
		setBoard,
		playerOne,
		playerTwo,
	};
})();

const Controller = (() => {
	const board = Game.getBoard();
	const boardElement = document.querySelector('.board');
	const squares = document.querySelectorAll('.square');
	let playerOneTurn = true;
	let gameOver = false;

	const drawBoard = () => {
		let i = 0;

		squares.forEach((square) => {
			square.textContent = board[i];
			i++;
		});
	};

	const drawTwoPlayerInput = () => {
		const startScreen = document.querySelector('.start');
		const twoPlayerInput = document.querySelector('.two-player-input');
		const btnStartGame = document.querySelector('.two-player-start');

		const drawInputs = () => {
			startScreen.style.display = 'none';
			twoPlayerInput.style.display = 'block';
		};

		const startGame = () => {
			const setNames = () => {
				const playerOneName =
					document.querySelector('#player-one-name').value;
				const playerTwoName =
					document.querySelector('#player-two-name').value;

				Game.playerOne.setName(playerOneName);
				Game.playerTwo.setName(playerTwoName);
			};

			setNames();
			twoPlayerInput.style.display = 'none';
			boardElement.style.display = 'grid';
		};

		drawInputs();
		btnStartGame.addEventListener('pointerdown', startGame);
	};

	const drawWinScreen = (winner) => {
		const winScreen = document.querySelector('.win');
		const winText = winScreen.querySelector('p');
		const btnRestart = winScreen.querySelector('.win-button-restart');
		const btnQuit = winScreen.querySelector('.win-button-quit');

		const restart = () => {
			winScreen.style.display = 'none';
			boardElement.style.display = 'block';
		};

		btnRestart.addEventListener('pointerdown', restart);

		winText.textContent = `${winner} won!`;
		boardElement.style.display = 'none';
		winScreen.style.display = 'block';
	};

	const checkWin = (marker) => {
		const checkRow = () => {
			if (
				board[0] === marker &&
				board[1] === marker &&
				board[2] === marker
			) {
				gameOver = true;
			} else if (
				board[3] === marker &&
				board[4] === marker &&
				board[5] === marker
			) {
				gameOver = true;
			} else if (
				board[6] === marker &&
				board[7] === marker &&
				board[8] === marker
			) {
				gameOver = true;
			}
		};

		const checkColumn = () => {
			if (
				board[0] === marker &&
				board[3] === marker &&
				board[6] === marker
			) {
				gameOver = true;
			} else if (
				board[1] === marker &&
				board[4] === marker &&
				board[7] === marker
			) {
				gameOver = true;
			} else if (
				board[2] === marker &&
				board[5] === marker &&
				board[8] === marker
			) {
				gameOver = true;
			}
		};

		const checkDiagonal = () => {
			if (
				board[0] === marker &&
				board[4] === marker &&
				board[8] === marker
			) {
				gameOver = true;
			} else if (
				board[2] === marker &&
				board[4] === marker &&
				board[6] === marker
			) {
				gameOver = true;
			}
		};

		checkRow();
		checkColumn();
		checkDiagonal();

		if (gameOver) {
			const winner =
				marker === Game.playerOne.getMarker()
					? Game.playerOne.getName()
					: Game.playerTwo.getName();
			drawWinScreen(winner);
		}
	};

	const placeMarker = (e) => {
		const { position } = e.target.dataset;
		const marker = playerOneTurn
			? Game.playerOne.getMarker()
			: Game.playerTwo.getMarker();

		if (e.target.textContent === '' && !gameOver) {
			if (playerOneTurn) {
				Game.setBoard(position, marker);
				drawBoard();
				checkWin(marker);
				playerOneTurn = false;
			} else {
				Game.setBoard(position, marker);
				drawBoard();
				checkWin(marker);
				playerOneTurn = true;
			}
		}
	};

	return {
		drawTwoPlayerInput,
		drawBoard,
		placeMarker,
	};
})();

Game.start();

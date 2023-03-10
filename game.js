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

			btnTwoPlayer.addEventListener(
				'pointerdown',
				Controller.drawTwoPlayerInput
			);

			btnAi.addEventListener('pointerdown', Controller.drawAiInput);
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
	const startScreen = document.querySelector('.start');
	const board = Game.getBoard();
	const boardElement = document.querySelector('.board');
	const squares = document.querySelectorAll('.square');
	let playerOneTurn = true;
	let gameOver = false;
	let draw = false;

	const drawBoard = () => {
		let i = 0;

		squares.forEach((square) => {
			square.textContent = board[i];
			i++;
		});
	};

	const clearBoard = () => {
		for (let i = 0; i < board.length; i++) {
			board[i] = '';
		}
		drawBoard();
	};

	const drawTwoPlayerInput = () => {
		const twoPlayerInput = document.querySelector('.two-player-input');
		const btnStartGame = document.querySelector('.two-player-start');

		const drawInputs = () => {
			startScreen.style.display = 'none';
			twoPlayerInput.style.display = 'flex';
		};

		const startGame = () => {
			const setNames = () => {
				const playerOneName =
					document.querySelector('#player-one-name').value ||
					'Player One';
				const playerTwoName =
					document.querySelector('#player-two-name').value ||
					'Player Two';

				Game.playerOne.setName(playerOneName);
				Game.playerTwo.setName(playerTwoName);
			};

			const setMarkers = () => {
				const playerOneMarker = String.fromCodePoint(
					`0${document.querySelector('#player-one-marker').value}`
				);
				const playerTwoMarker = String.fromCodePoint(
					`0${document.querySelector('#player-two-marker').value}`
				);

				Game.playerOne.setMarker(playerOneMarker);
				Game.playerTwo.setMarker(playerTwoMarker);
			};

			setNames();
			setMarkers();
			twoPlayerInput.style.display = 'none';
			boardElement.style.display = 'grid';
		};

		drawInputs();
		btnStartGame.addEventListener('pointerdown', startGame);
	};

	const drawAiInput = () => {
		const aiInput = document.querySelector('.ai-input');
		const btnStartGame = document.querySelector('.ai-start');

		const drawInputs = () => {
			startScreen.style.display = 'none';
			aiInput.style.display = 'flex';
		};

		const startGame = () => {
			const setNames = () => {
				const playerOneName =
					document.querySelector('#player-ai-name').value ||
					'Player One';

				Game.playerOne.setName(playerOneName);
				Game.playerTwo.setName('CPU');
			};

			const setMarkers = () => {
				const playerOneMarker = String.fromCodePoint(
					`0${document.querySelector('#player-ai-marker').value}`
				);
				const playerTwoMarker = String.fromCodePoint(0x2b55);

				Game.playerOne.setMarker(playerOneMarker);
				Game.playerTwo.setMarker(playerTwoMarker);
			};

			setMarkers();
			setNames();
			aiInput.style.display = 'none';
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
			clearBoard();
			winScreen.style.display = 'none';
			boardElement.style.display = 'grid';
		};

		const quit = () => {
			clearBoard();
			winScreen.style.display = 'none';
			startScreen.style.display = 'flex';
		};

		btnRestart.addEventListener('pointerdown', restart);
		btnQuit.addEventListener('pointerdown', quit);

		if (draw) {
			winText.textContent = 'Draw.';
			draw = false;
		} else {
			winText.textContent = `${winner} won!`;
		}

		boardElement.style.display = 'none';
		winScreen.style.display = 'flex';
	};

	const checkWin = (marker) => {
		const checkRow = () => {
			for (let i = 0; i <= 6; i += 3) {
				if (
					board[i] === marker &&
					board[i + 1] === marker &&
					board[i + 2] === marker
				) {
					gameOver = true;
					return;
				}
			}
		};

		const checkColumn = () => {
			for (let i = 0; i <= 3; i++) {
				if (
					board[i] === marker &&
					board[i + 3] === marker &&
					board[i + 6] === marker
				) {
					gameOver = true;
					return;
				}
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

		const checkDraw = () => {
			if (!board.includes('') && !gameOver) {
				draw = true;
				gameOver = true;
			}
		};

		checkRow();
		checkColumn();
		checkDiagonal();
		checkDraw();

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

		const setBoard = (pos, m) => {
			Game.setBoard(pos, m);
			drawBoard();
			checkWin(m);
		};

		if (Game.playerTwo.getName() === 'CPU') {
			const playerMarker = Game.playerOne.getMarker();
			const cpuMarker = Game.playerTwo.getMarker();

			if (e.target.textContent === '' && !gameOver) {
				setBoard(position, playerMarker);
				if (!gameOver) {
					const random = () => {
						const r = Math.floor(Math.random() * 9 + 1);
						if (Game.getBoard()[r - 1] === '') {
							return r;
						}
						return random();
					};
					setBoard(random(), cpuMarker);
				}
			}
		}

		if (e.target.textContent === '') {
			if (playerOneTurn) {
				setBoard(position, marker);
				playerOneTurn = false;
			} else {
				setBoard(position, marker);
				playerOneTurn = true;
			}
		}

		if (gameOver) {
			gameOver = false;
		}
	};

	return {
		drawTwoPlayerInput,
		drawAiInput,
		drawBoard,
		placeMarker,
	};
})();

Game.start();

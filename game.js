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

		/*
		const squares = document.querySelectorAll('.square');

		squares.forEach((square) => {
			square.addEventListener('pointerdown', Controller.placeMarker);
		});

		Controller.drawBoard();	*/
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
	let playerOneTurn = true;
	let gameOver = false;

	const drawBoard = () => {
		const squares = document.querySelectorAll('.square');
		let i = 0;

		squares.forEach((square) => {
			square.textContent = board[i];
			i++;
		});
	};

	const drawTwoPlayerInput = () => {
		const drawInputs = () => {
			const startScreen = document.querySelector('.start');
			const twoPlayerInput = document.querySelector('.two-player-input');

			startScreen.style.display = 'none';
			twoPlayerInput.style.display = 'block';
		};

		const getInputs = () => {
			const btnStartGame = document.querySelector('.two-player-start');

			const setNames = () => {
				const playerOneName =
					document.querySelector('#player-one-name').value;
				const playerTwoName =
					document.querySelector('#player-two-name').value;

				Game.playerOne.setName(playerOneName);
				Game.playerTwo.setName(playerTwoName);
			};

			btnStartGame.addEventListener('pointerdown', setNames);
		};

		drawInputs();
		getInputs();
	};

	const checkWin = (marker) => {
		const checkRow = () => {
			if (
				board[0] === marker &&
				board[1] === marker &&
				board[2] === marker
			) {
				console.log(`${marker} won!`);
				gameOver = true;
			} else if (
				board[3] === marker &&
				board[4] === marker &&
				board[5] === marker
			) {
				console.log(`${marker} won!`);
				gameOver = true;
			} else if (
				board[6] === marker &&
				board[7] === marker &&
				board[8] === marker
			) {
				console.log(`${marker} won!`);
				gameOver = true;
			}
		};

		const checkColumn = () => {
			if (
				board[0] === marker &&
				board[3] === marker &&
				board[6] === marker
			) {
				console.log(`${marker} won!`);
				gameOver = true;
			} else if (
				board[1] === marker &&
				board[4] === marker &&
				board[7] === marker
			) {
				console.log(`${marker} won!`);
				gameOver = true;
			} else if (
				board[2] === marker &&
				board[5] === marker &&
				board[8] === marker
			) {
				console.log(`${marker} won!`);
				gameOver = true;
			}
		};

		const checkDiagonal = () => {
			if (
				board[0] === marker &&
				board[4] === marker &&
				board[8] === marker
			) {
				console.log(`${marker} won!`);
				gameOver = true;
			} else if (
				board[2] === marker &&
				board[4] === marker &&
				board[6] === marker
			) {
				console.log(`${marker} won!`);
				gameOver = true;
			}
		};

		checkRow();
		checkColumn();
		checkDiagonal();
	};

	const placeMarker = (e) => {
		const { position } = e.target.dataset;
		const marker = playerOneTurn
			? Game.playerOne.marker
			: Game.playerTwo.marker;

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

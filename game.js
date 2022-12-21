const Player = (marker) => ({ marker });

const Game = (() => {
	const board = ['', '', '', '', '', '', '', '', ''];
	const playerOne = Player('x');
	const playerTwo = Player('o');

	const getBoard = () => board;

	const setBoard = (position, marker) => {
		board.splice(position - 1, 1, marker);
	};

	const init = () => {
		const squares = document.querySelectorAll('.square');

		squares.forEach((square) => {
			square.addEventListener('pointerdown', Controller.placeMarker);
		});

		Controller.drawBoard();
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

	const drawBoard = () => {
		const squares = document.querySelectorAll('.square');
		let i = 0;

		squares.forEach((square) => {
			square.textContent = board[i];
			i++;
		});
	};

	const checkWin = (marker) => {
		const checkRow = () => {
			if (
				board[0] === marker &&
				board[1] === marker &&
				board[2] === marker
			) {
				console.log(`${marker} won!`);
			} else if (
				board[3] === marker &&
				board[4] === marker &&
				board[5] === marker
			) {
				console.log(`${marker} won!`);
			} else if (
				board[6] === marker &&
				board[7] === marker &&
				board[8] === marker
			) {
				console.log(`${marker} won!`);
			}
		};

		const checkColumn = () => {
			if (
				board[0] === marker &&
				board[3] === marker &&
				board[6] === marker
			) {
				console.log(`${marker} won!`);
			} else if (
				board[1] === marker &&
				board[4] === marker &&
				board[7] === marker
			) {
				console.log(`${marker} won!`);
			} else if (
				board[2] === marker &&
				board[5] === marker &&
				board[8] === marker
			) {
				console.log(`${marker} won!`);
			}
		};

		const checkDiagonal = () => {
			if (
				board[0] === marker &&
				board[4] === marker &&
				board[8] === marker
			) {
				console.log(`${marker} won!`);
			} else if (
				board[2] === marker &&
				board[4] === marker &&
				board[6] === marker
			) {
				console.log(`${marker} won!`);
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

		if (e.target.textContent === '') {
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
		drawBoard,
		placeMarker,
	};
})();

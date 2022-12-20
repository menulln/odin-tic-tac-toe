const Player = (marker) => ({ marker });

const Game = (() => {
	const x = 'x';
	const o = 'o';
	const playerOne = Player(x);
	const playerTwo = Player(o);
	const board = ['', '', '', '', '', '', '', '', ''];

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
		x,
		o,
	};
})();

const Controller = (() => {
	let playerOneTurn = true;

	const drawBoard = () => {
		const board = Game.getBoard();
		const squares = document.querySelectorAll('.square');
		let i = 0;

		squares.forEach((square) => {
			square.textContent = board[i];
			i++;
		});
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
				playerOneTurn = false;
			} else {
				Game.setBoard(position, marker);
				drawBoard();
				playerOneTurn = true;
			}
		}
	};
	return {
		drawBoard,
		placeMarker,
	};
})();

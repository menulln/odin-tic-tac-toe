const Player = (marker) => ({ marker });

const Game = (() => {
	const x = '\u2716';
	const o = '\u20DD';
	const playerOne = Player(x);
	const playerTwo = Player(o);
	const board = [0, 0, 0, 0, 0, 0, 0, 0, 0];
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
			if (board[i] === Game.x) {
				square.style.fontWeight = 100;
			} else if (board[i] === Game.o) {
				square.style.fontWeight = 1000;
			}
			i++;
		});
	};
	const placeMarker = (e) => {
		const { position } = e.target.dataset;
		const marker = playerOneTurn
			? Game.playerOne.marker
			: Game.playerTwo.marker;
		console.log(playerOneTurn);
		if (playerOneTurn) {
			Game.setBoard(position, marker);
			console.log(Game.getBoard());
			drawBoard();
			playerOneTurn = false;
		} else {
			Game.setBoard(position, marker);
			drawBoard();
			playerOneTurn = true;
		}
	};
	return {
		drawBoard,
		placeMarker,
	};
})();

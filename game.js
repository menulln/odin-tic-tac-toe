const Game = (() => {
	const x = '\u2716';
	const o = '\u20DD';
	const board = [x, o, x, x, o, x, o, x, x];
	const getBoard = () => board;
	return { getBoard };
})();

const Controller = (() => {
	const drawBoard = () => {
		const board = Game.getBoard();
		const squares = document.querySelectorAll('.square');
		const x = '\u2716';
		const o = '\u20DD';
		let i = 0;
		squares.forEach((square) => {
			square.textContent = board[i];
			if (board[i] === x) {
				square.style.fontWeight = 100;
			} else if (board[i] === o) {
				square.style.fontWeight = 1000;
			}
			i++;
		});
	};
	return { drawBoard };
})();

const Player = (marker) => {};

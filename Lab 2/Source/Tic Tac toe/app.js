var app = angular.module('ngOughts', ['ng']);

(function() {
	var Board = (function(){
		var SIZE, EMPTY, NOUGHT, CROSS, PLAYER_MARKERS, Cell;

		SIZE = 3;
		EMPTY = ' ';
		NOUGHT = 'O';
		CROSS = 'X';
		PLAYER_MARKERS = [NOUGHT, CROSS];

		Cell = (function() {
			function Cell(marker){
				this.marker = marker;
				this.winning = false;
			}
			Cell.prototype.mark = function(marker) {
				this.marker = marker;
			}
			Cell.prototype.hasBeenPlayed = function() {
				return this.marker != EMPTY;
			}
			return Cell;
		})();

		function Board() {
			this.reset();
		}

		Board.prototype.reset = function(){
			this.currentPlayer = 0;
			this.grid = [];
			this.won = false;
			this.gameGoingOn = true;

			for(var i=0; i < SIZE; i++) {
				var row = [];

				for(var j=0; j < SIZE; j++) {
					row.push(new Cell(EMPTY));
				}

				this.grid.push(row);
			}

			return this.grid;
		};

		Board.prototype._checkRow = function(rowIndex) {
			var numberOfNoughts = 0;
			var numberOfCrosses = 0;

			for(var columnIndex = 0; columnIndex < SIZE; columnIndex++) {
				var cell = this.grid[rowIndex];
				cell = cell[columnIndex];
				var cellMarker = cell.marker;
				if(cellMarker == EMPTY) {
					return false;
				}
				if(cellMarker == NOUGHT) {
					numberOfNoughts++;
				} else if(cellMarker == CROSS) {
					numberOfCrosses++;
				}
			}

			if(numberOfNoughts == SIZE) {
				return NOUGHT;
			} else if(numberOfCrosses == SIZE) {
				return CROSS;
			}
		};

		Board.prototype._checkColumn = function(columnIndex) {
			var numberOfNoughts = 0;
			var numberOfCrosses = 0;

			for(var rowIndex = 0; rowIndex < SIZE; rowIndex++) {
				var cell = this.grid[rowIndex][columnIndex];
				var cellMarker = cell.marker;
				if(cellMarker == EMPTY) {
					return false;
				}
				if(cellMarker == NOUGHT) {
					numberOfNoughts++;
				} else if(cellMarker == CROSS) {
					numberOfCrosses++;
				}
			}

			if(numberOfNoughts == SIZE) {
				return NOUGHT;
			} else if(numberOfCrosses == SIZE) {
				return CROSS;
			}
		}

		Board.prototype._checkDiagonal1 = function() {
			var numberOfNoughts = 0;
			var numberOfCrosses = 0;

			for(var i = 0; i<SIZE; i++) {
				var cellMarker = this.grid[i][i].marker;
				if(cellMarker == EMPTY) {
					return false;
				}
				if(cellMarker == NOUGHT) {
					numberOfNoughts++;
				} else if(cellMarker == CROSS) {
					numberOfCrosses++;
				}
			}

			if(numberOfNoughts == SIZE) {
				return NOUGHT;
			} else if(numberOfCrosses == SIZE) {
				return CROSS;
			}
		}

		Board.prototype._checkDiagonal2 = function() {
			var numberOfNoughts = 0;
			var numberOfCrosses = 0;

			for(var i = 0; i<SIZE; i++) {
				var cellMarker = this.grid[i][SIZE-i-1].marker;
				if(cellMarker == EMPTY) {
					return false;
				}
				if(cellMarker == NOUGHT) {
					numberOfNoughts++;
				} else if(cellMarker == CROSS) {
					numberOfCrosses++;
				}
			}

			if(numberOfNoughts == SIZE) {
				return NOUGHT;
			} else if(numberOfCrosses == SIZE) {
				return CROSS;
			}
		}

		Board.prototype._setWinner = function(marker) {
			this.won = true;
			this.winning_marker = marker;
			this.gameGoingOn = false;
		};

		Board.prototype._markWinnerRow = function(rowIndex) {
			for(var i = 0; i<SIZE; i++) {
				this.grid[rowIndex][i].winning = true;
			}
		}

		Board.prototype._markWinnerColumn = function(columnIndex) {
			for(var i = 0; i<SIZE; i++) {
				this.grid[i][columnIndex].winning = true;
			}
		}

		Board.prototype._markWinnerDiagonal1 = function() {
			for(var i = 0; i<SIZE; i++) {
				this.grid[i][i].winning = true;
			}
		}

		Board.prototype._markWinnerDiagonal2 = function() {
			for(var i = 0; i<SIZE; i++) {
				this.grid[i][SIZE-i-1].winning = true;
			}
		}



		Board.prototype.checkWinner = function() {
			var rowIndex = 0;
			var columnIndex = 0;
			var diagonal1 = 0;
			var diagonal2 = 0;

			for(rowIndex=0; rowIndex < SIZE; rowIndex++) {
				var val = this._checkRow(rowIndex);
				if(val) {
					this._setWinner(val);
					this._markWinnerRow(rowIndex);
				}
			}

			for(columnIndex = 0; columnIndex < SIZE; columnIndex++) {
				val = this._checkColumn(columnIndex);
				if(val) {
					this._setWinner(val);
					this._markWinnerColumn(columnIndex);
				}
			}

			val = this._checkDiagonal1();
			if(val) {
				this._setWinner(val);
				this._markWinnerDiagonal1();
			}

			val = this._checkDiagonal2();
			if(val) {
				this._setWinner(val);
				this._markWinnerDiagonal2();
			}
		};

		Board.prototype.playCell = function(cell) {
			if(!(this.gameGoingOn)) {
				return;
			}
			if(cell.hasBeenPlayed()) {
				return;
			}
			cell.mark(this.currentPlayerMarker());
			this.checkWinner();
			this.switchPlayer();
		};

		Board.prototype.currentPlayerMarker = function() {
			return PLAYER_MARKERS[this.currentPlayer];
		}

		Board.prototype.switchPlayer = function() {
			this.currentPlayer = 1 - this.currentPlayer;
		}

		return Board;
	})();

	angular.module('ngOughts').factory('Board', function(){
		return Board;
	});

}).call(this);



app.controller('BoardCtrl', function($scope, Board){
	$scope.board = new Board;
});
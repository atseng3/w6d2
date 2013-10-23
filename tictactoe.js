(function (root) {
  var TicTacToe = root.TicTacToe = (root.TicTacToe || {});

	var readline = require ('readline');

	var reader = readline.createInterface({
		input: process.stdin,
		output: process.stdout
	});

	var Game = TicTacToe.Game = function () {
		this.board = new Board();
		this.currentPlayer = 'X';
	}

  var Board = TicTacToe.Board = function () {
		this.grid = [["_", "_", "_"],["_", "_", "_"],["_", "_", "_"]];
  }

	Game.prototype.run = function(callback) {
		if (this.gameOver() == true) {
			callback(this.board.grid);
			return;
		}

		console.log("Current player: " + this.currentPlayer);
		this.board.show();
		var that = this;
		this.promptUser(function(toLocation){
			if (that.conditionsMet(toLocation)) {
			that.move(toLocation);
			that.currentPlayer = (that.currentPlayer == 'X' ? 'O' : 'X');
		}
		that.run(callback);
		 })
	}

	Game.prototype.promptUser = function(giveLocation) {
		reader.question("Please choose a row on the board to place your piece.", function(row) {
			var row = parseInt(row);
			reader.question("Please choose a column on the board to place your piece.", function(col) {
				var col = parseInt(col);

				giveLocation([row, col]);
			})
		})
	}

	Game.prototype.gameOver = function() {
		if (this.board.gameWon() || this.board.full()) {
			return true;
		}
		return false;
	}

	Board.prototype.gameWon = function() {
		var playerX = [[],[]];
		var playerO = [[],[]];

		for (var i = 0; i < this.grid.length; i++) {
			for (var j = 0; j < this.grid[0].length; j++) {
				if (this.grid[i][j] == "X") {
					playerX[0].push(i);
					playerX[1].push(j);
				}
				else if (this.grid[i][j] == "O") {
					playerO[0].push(i);
					playerO[1].push(j);
				}
			}
		}

		if(this.checkSameElement(playerX) || this.checkSameElement(playerO) || this.diagCheck) {
			return true;
		}
		return false;
	}

	var DIAGS1 = [[0,0], [1,1], [2,2]];
	var DIAGS2 = [[2,0], [1,1], [0,2]];

	Board.prototype.diagCheck = function() {
		if (this.grid[DIAGS1[0][0]][DIAGS1[[0][1]]] ==
			  this.grid[DIAGS1[1][0]][DIAGS1[1][1]] ==
			  this.grid[DIAGS1[2][0]][DIAGS1[2][1]]){
			return true;
		}
		if (this.grid[DIAGS2[0][0]][DIAGS2[[0][1]]] ==
			  this.grid[DIAGS2[1][0]][DIAGS2[1][1]] ==
			  this.grid[DIAGS2[2][0]][DIAGS2[2][1]]){
			return true;
		}
		return false;
	}

	Board.prototype.checkSameElement = function(player_arr) {
		var row = player_arr[0];
		var col = player_arr[1];
		for(var i = 1; i < row.length; i++){
			if (row[i] != row[0]) {
				return false;
			}
		}
		for(var j = 1; j < col.length; j++){
			if (col[i] != col[0]) {
				return false;
			}
		}
		return true;
	}

	Board.prototype.full = function() {
		var places = this.grid.join(",").split(",");
		if (places.indexOf("_") !== -1) {
			return false;
		}
		else {
			return true;
		}
	}

	Game.prototype.move = function(toLocation) {
		var row = toLocation[0];
		var col = toLocation[1];
		this.board.grid[row][col] = this.currentPlayer;
	}

	Game.prototype.conditionsMet = function(toLocation) {
		var row = toLocation[0];
		var col = toLocation[1];
		if (this.board.grid[row][col] == "_") {
			return true;
		}
		else {
			return false;
		}
	}

	Board.prototype.show = function() {
		for (var i = 0; i < this.grid.length; i++) {
			console.log(this.grid[i]);
		};
	};

})(this);

var game = new this.TicTacToe.Game();


game.run(function (result) {
	console.log("The result is: " + result)
});
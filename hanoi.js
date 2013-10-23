(function (root) {
  var Hanoi = root.Hanoi = (root.Hanoi || {});

	var readline = require ('readline');

	var reader = readline.createInterface({
		input: process.stdin,
		output: process.stdout
	});

	var Game = Hanoi.Game = function () {
		this.poles = [[3,2,1],[],[]];
	}

	Game.prototype.run = function(callback) {

		if (this.gameOver() == true) {
			callback(this.poles);

			return;
		}
		var that = this;
		var user_choice = this.prompt(function(results) {
			// console.log(results);

			if (that.checkRequirements(results)) {
				that.move(results);
			}
			console.log(that.poles);
			that.run(callback);
			// return results;
		});


			// prompt the user which pole to take from
		// if meet requirements:
		//		move pole
		// else:
		// 		prompt again
		// end
		// if first and another pole is completely empty:
		//	 game over.
	}

	Game.prototype.prompt = function(wait) {

	reader.question("Select pole to move from: ", function (from) {
		var from_pole = parseInt(from);
		console.log(from_pole);

		reader.question("Select pole to move to: ", function (to) {
			var to_pole = parseInt(to);
			console.log(to_pole);

			wait([from, to]);

		});
	});
	}

	Game.prototype.checkRequirements = function(arr) {
		var from = arr[0];
		var to = arr[1];
		// console.log(this.poles);
		console.log(from);
		if (this.notTheSame(arr) &&
				this.fromPoleNotEmpty(from) &&
				this.toPoleAvailable(arr)) {
			return true;
		}
		else {
			return false;
		}
		//from and to pole have to be different
		//from pole canot be empty
		//to pole canont have a higher numbered disc
	}

	Game.prototype.notTheSame = function(arr) {
		var from = arr[0];
		var to = arr[1];
		if (from == to) {
			return false;
		}
		else {
			return true;
		}
	}

	Game.prototype.fromPoleNotEmpty = function(from) {

		if (this.poles[from].length == 0) {
			return false;
		}
		else {
			return true;
		}
	}

	Game.prototype.toPoleAvailable = function(arr) {
		var from = arr[0];
		var to = arr[1];

		var from_disc = this.poles[from][this.poles[from].length - 1]
		var to_disc = this.poles[to][this.poles[to].length - 1]

		if (to_disc == undefined) {
			return true;
		}
		else if (from_disc > to_disc) {
			return false;
		}
		else {
			return true;
		}
	}

	Game.prototype.move = function(arr) {
		var from = arr[0];
		var to = arr[1];

		this.poles[to].push(this.poles[from].pop());
	}

	Game.prototype.gameOver = function() {
		if ((this.poles[0].length == 0) && (this.poles[1].length == 0 || this.poles[2].length == 0)) {
			return true;
		}
		else {
			return false;
		}
	};

})(this);

var game = new this.Hanoi.Game();
// game.run();
// console.log(this.Hanoi.Game());
// game = new this.Hanoi.Game();
// game.poles;
// game = new Game();
// game.prompt();
// game.move([0,1]);
// console.log(game.poles);
// game.move([0,1]);
// console.log(game.poles);
// game.move([0,1]);
// console.log(game.poles);
// console.log(game.gameOver());

game.run(function (result) {
	console.log("The result is: " + result)
});
(function (root) {
  var Hanoi = root.Hanoi = (root.Hanoi || {});
	Hanoi.poles = [[3,2,1],[],[]];

	var readline = require ('readline');

	var reader = readline.createInterface({
		input: process.stdin,
		output: process.stdout
	});

	function run(callback){

		if (gameOver() == true) {
			callback(Hanoi.poles);

			return;
		}

		var user_choice = prompt(function(results) {
			return results;
		});

		if (checkRequirements(user_choice)) {
			move(user_choice);
		}

		run();
			// prompt the user which pole to take from
		// if meet requirements:
		//		move pole
		// else:
		// 		prompt again
		// end
		// if first and another pole is completely empty:
		//	 game over.
	}

	function prompt(wait) {

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

	function checkRequirements(arr) {
		var from = arr[0];
		var to = arr[1];

		if (notTheSame(arr) &&
				fromPoleNotEmpty(from) &&
				toPoleAvailable(arr)) {
			return true;
		}
		else {
			return false;
		}
		//from and to pole have to be different
		//from pole canot be empty
		//to pole canont have a higher numbered disc
	}

	function notTheSamefunction(arr) {
		var from = arr[0];
		var to = arr[1];

		if (from == to) {
			return false;
		}
		else {
			return true;
		}
	}

	function fromPoleNotEmpty(from) {
		if (from.length == 0) {
			return true;
		}
		else {
			return false;
		}
	}

	function toPoleAvailable(arr) {
		var from = arr[0];
		var to = arr[1];

		var from_disc = Hanoi.poles[from][Hanoi.poles[from].length - 1]
		var to_disc = Hanoi.poles[to][Hanoi.poles[to].length - 1]

		if ((from_disc > to_disc) || to_disc == undefined) {
			return false;
		}
		else {
			return true;
		}
	}

	function move(arr) {
		var from = arr[0];
		var to = arr[1];

		Hanoi.poles[to].push(Hanoi.poles[from].pop());
	}

	function gameOver() {
		if ((Hanoi.poles[0].length == 0) && (Hanoi.poles[1].length == 0 || Hanoi.poles[2].length == 0)) {
			return true;
		}
		else {
			return false;
		}
	};

	// Hanoi.gameOver = gameOver
	Hanoi.run = run;

})(this);



this.Hanoi.run();
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

// game.run(function (result) {
// 	console.log("The result is: " + result)
// });
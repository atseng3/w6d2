function Clock() {
	this.time = 0;
}

Clock.prototype.run = function() {
	var time = new Date();
	// time.setSeconds(time.getSeconds() + 5);
	setInterval(function(){
			time.setSeconds(time.getSeconds() + 5);
			var curr_time = time.toLocaleTimeString();
			console.log(curr_time);
	}, 5000);
}

c1 = new Clock();
// c1.run();


var readline = require ('readline');

var reader = readline.createInterface({

	input: process.stdin,
	output: process.stdout
});

function addFourNumbers(callback) {

reader.question("First number: ", function (numString1) {
	var num1 = parseInt(numString1);
	console.log(num1);
		reader.question("Second number: ", function(numString2) {
			var num2 = parseInt(numString2);
			console.log(num1 + num2);
			reader.question("Third number: ", function(numString3) {
				var num3 = parseInt(numString3);
				console.log(num1 + num2 + num3);
				reader.question("Fourth number: ", function(numString4) {
					var num4 = parseInt(numString4);

					callback(num1 + num2 + num3 + num4);

				});
			});
		});
	});
};

// addFourNumbers( function (result) {console.log(result)});

function addNumbers(sum, numsLeft, completionCallback) {

		if (numsLeft == 0) {
			completionCallback(sum);
		}

		reader.question("Give me a number: ", function(newNumber) {
			var num = parseInt(newNumber);
			sum = sum + num;
			console.log(sum);
			numsLeft = numsLeft - 1;
			addNumbers(sum, numsLeft, completionCallback);
		});

};

// addNumbers(0, 3, function (sum) {
//   console.log("Total Sum: " + sum);
// });


function askLessThan(el1, el2, callback) {
	reader.question("Is " + el1 + " < " + el2 + " ?\n", function(answer){
		if(answer == "yes") {
			callback(true);
		}
		else {
			callback(false);
		}
	});
};

function performSortPass(arr, i, madeAnySwaps, callback) {
	if(i < arr.length - 1) {
		askLessThan(arr[i], arr[i + 1], function (lessThan) {
			if(lessThan == false){
				var temp = arr[i];
				arr[i] = arr[i + 1];
				arr[i + 1] = temp;
				madeAnySwaps = true;
			}
			performSortPass(arr, i + 1, madeAnySwaps, callback);
		});
	}
	if(i == (arr.length - 1)) {
		callback(madeAnySwaps);
	}
}

function crazyBubbleSort(arr, sortCompletionCallback) {
	function sortPassCallback(madeAnySwaps) {
		if(madeAnySwaps == true) {
			performSortPass(arr, 0, false, sortPassCallback);
		}
		else {
			sortCompletionCallback(arr);
		}
	};
	sortPassCallback(true);
}

crazyBubbleSort([3,2,1], function(arr) { console.log(arr) });

Function.prototype.myBind = function (obj) {
	that = this;
	return function() {
		that.apply(obj);
	}
};

function Cat(name) {
	this.name = name;
	this.meow = function() {
		console.log(this.name + " meow");
	};
}

function Dog(name) {
	this.name = name;
	this.bark = function() {
		console.log(this.name + "bark");
	}
}

function meow() {
	console.log(this.name + "meow");
}

c1 = new Cat("gizmo");
// console.log(c1.meow.myBind(c1)

d1 = new Dog("snoopy");
var barkOnDog = c1.meow.myBind(d1);
barkOnDog();


// meow.bind(c1);
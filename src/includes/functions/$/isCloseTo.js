isCloseTo(actual, precision=2, not) {
	return new Promise((resolve, reject) => {
		if((Math.abs(this.val - actual) < Math.pow(10, -precision) / 2 && not != false) || (not == false && !(Math.abs(this.val - actual) < Math.pow(10, -precision) / 2))) {
			resolve(true)
		} else {
			resolve(`${this.val} isn't close to ${actual}, with a precision of ${precision}`)
		}
	});
}

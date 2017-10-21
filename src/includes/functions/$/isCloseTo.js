isCloseTo(actual, precision=2, not) {
	if((Math.abs(this.val - actual) < Math.pow(10, -precision) / 2 && not != false) || (not == false && !(Math.abs(this.val - actual) < Math.pow(10, -precision) / 2))) {
		return true;
	} else {
		return `${this.val} isn't close to ${actual}, with a precision of ${precision}`
	}
}

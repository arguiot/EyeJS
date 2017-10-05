isCloseTo(actual, precision=2) {
	return Math.abs(this.val - actual) < Math.pow(10, -precision) / 2;
}

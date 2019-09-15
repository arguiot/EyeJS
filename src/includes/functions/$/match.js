Match(val, not) {
	return new Promise((resolve, reject) => {
		if((val.test(this.val) && not != false) || (not == false && !val.test(this.val))) {
			resolve(true);
		} else {
			resolve(`${this.val} doesn't match ${val}`)
		}
	});
}

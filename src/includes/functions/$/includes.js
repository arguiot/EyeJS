includes(val, not) {
	return new Promise(function(resolve, reject) {
		if((this.val.includes(val) && not != false) || (not == false && !this.val.includes(val))) {
			resolve(true)
		} else {
			resolve(`${this.val} doesn't includes ${val}`)
		}
	});
}

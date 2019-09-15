isSmaller(val, not) {
	return new Promise((resolve, reject) => {
		if((this.val < val && not != false) || (not == false && !(this.val < val))) {
			resolve(true)
		} else {
			resolve(`${this.val} isn't smaller than ${val}`)
		}
	});
}

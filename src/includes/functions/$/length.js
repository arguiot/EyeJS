length(val, not) {
	return new Promise((resolve, reject) => {
		if((this.val.length == val && not != false) || (not == false && this.val.length != val)) {
			resolve(true)
		} else {
			resolve(`${this.val} doesn't have for length ${val}`)
		}
	});
}

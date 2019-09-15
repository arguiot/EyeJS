isTrueFor(callback, not) {
	return new Promise((resolve, reject) => {
		if((callback(this.val) && not != false) || (not == false && !callback(this.val))) {
			resolve(true)
		} else {
			resolve(`${this.val} isn't true for ${callback}`)
		}
	});
}

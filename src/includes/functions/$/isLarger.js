isLarger(val, not) {
	return new Promise(function(resolve, reject) {
		if((this.val > val && not != false) || (not == false && !(this.val > val))) {
			resolve(true)
		} else {
			resolve(${this.val} isn't larger than ${val}`)
		}
	});
}

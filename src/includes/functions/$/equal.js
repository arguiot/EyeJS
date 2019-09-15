Equal(val, not) {
	return new Promise((resolve, reject) => {
		if((JSON.stringify(val) == JSON.stringify(this.val) && not != false) || (not == false && JSON.stringify(val) != JSON.stringify(this.val))) {
			resolve(true)
		} else {
			resolve(`${this.val} isn't equal to ${val}`)
		}
	});
}

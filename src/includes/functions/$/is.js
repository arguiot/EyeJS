is(type, not) {
	return new Promise(function(resolve, reject) {
		if((typeof this.val == type && not != false) || (not == false && typeof this.val != type)) {
			resolve(true)
		} else {
			resolve(`${this.val} isn't a ${type}`)
		}
	});
}

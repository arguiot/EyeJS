hasProperty(name, not) {
	return new Promise(function(resolve, reject) {
		if((this.val.hasOwnProperty(name) && not != false) || (not == false && !this.val.hasOwnProperty(name))) {
			resolve(true)
		} else {
			resolve(`${this.val} doesn't have '${name}' as property`)
		}
	});
}

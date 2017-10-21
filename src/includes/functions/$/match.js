Match(val, not) {
	if((val.test(this.val) && not != false) || (not == false && !val.test(this.val))) {
		return true;
	} else {
		return `${this.val} doesn't match ${val}`
	}
}

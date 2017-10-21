isTrueFor(callback, not) {
	if((callback(this.val) && not != false) || (not == false && !callback(this.val))) {
		return true;
	} else {
		return `${this.val} isn't true for ${callback}`
	}
}

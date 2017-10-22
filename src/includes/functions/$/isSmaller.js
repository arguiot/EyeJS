isSmaller(val, not) {
	if((this.val < val && not != false) || (not == false && !(this.val < val))) {
		return true;
	} else {
		return `${this.val} isn't smaller than ${val}`
	}
}

includes(val, not) {
	if((this.val.includes(val) && not != false) || (not == false && !this.val.includes(val))) {
		return true;
	} else {
		return `${this.val} doesn't includes ${val}`
	}
}

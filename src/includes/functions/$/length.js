length(val, not) {
	if((this.val.length == val && not != false) || (not == false && this.val.length != val)) {
		return true;
	} else {
		return `${this.val} doesn't have for length ${val}`
	}
}

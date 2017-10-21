Equal(val, not) {
	if((JSON.stringify(val) == JSON.stringify(this.val) && not != false) || (not == false && JSON.stringify(val) != JSON.stringify(this.val))) {
		return true;
	} else {
		return `${this.val} isn't equal to ${val}`
	}
}

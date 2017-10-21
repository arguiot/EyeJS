is(type, not) {
	if((typeof this.val == type && not != false) || (not == false && typeof this.val != type)) {
		return true;
	} else {
		return `${this.val} isn't a ${type}`
	}
}

hasProperty(name, not) {
	if((this.val.hasOwnProperty(name) && not != false) || (not == false && !this.val.hasOwnProperty(name))) {
		return true;
	} else {
		return `${this.val} doesn't have '${name}' as property`
	}
}

toRun(not) {
	try {
		this.val()
	} catch (e) {
		return not == false ? true : false
	}
	return not == false ? false : true
}

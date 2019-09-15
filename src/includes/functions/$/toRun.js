toRun(not) {
	return new Promise((resolve, reject) => {
		try {
			this.val()
		} catch (e) {
			resolve(not == false ? true : false)
		}
		resolve(not == false ? false : true)
	});
}

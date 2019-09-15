perf(ms, not) {
	return new Promise((resolve, reject) => {
		try {
			const start = process.hrtime()
			for (var i = 0; i < 15; i++) {
				this.val()
			}
			const end = process.hrtime(start);
			const time = Math.round((end[0] * 1000) + (end[1] / 1000000))
			const average = time / 15
			if (ms < average) {
				resolve(not == true ? false : true)
			} else {
				resolve(`Your function runs in approximately ${average}ms, which is superior to ${ms}ms`)
			}
		} catch (e) {
			resolve(not == false ? true : false)
		}
	});
}

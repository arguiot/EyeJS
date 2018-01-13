perf(ms, not) {
	try {
		const start = process.hrtime()
		for (var i = 0; i < 15; i++) {
			this.val()
		}
		const end = process.hrtime(start);
		const time = Math.round((end[0] * 1000) + (end[1] / 1000000))
		const average = time / 15
		if (ms > average) {
			return not == true ? false : true
		} else {
			return `Your function runs in approximately ${average}ms, which is superior to ${ms}ms`
		}
	} catch (e) {
		return not == false ? true : false
	}
}

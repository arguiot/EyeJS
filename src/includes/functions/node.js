node(name, spinner, callbacks) {
	const $ = this.case;
	let result = !0;
	for (let i in callbacks) {
		const temp = i($)
		if (temp == !1) {
			result = result == !0 || result == !1 ? false : result
		} else if (temp != !1 && temp != !0) {
			result = temp
		}
	}
	if (result == !1) {
		spinner.fail();
		this.data.failed += 1;
	}
	else if (result == !0) {
		spinner.succeed()
	}
	else {
		spinner.warn()
	}
}

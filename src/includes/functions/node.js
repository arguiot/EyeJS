node(name, callback, spinner) {
	this.temp = true;
	const $ = this.case;
	const result = callback($);
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

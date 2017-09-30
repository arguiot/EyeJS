node(name, spinner, callbacks) {
	const $ = $ => {
		class expect {
			constructor(val) {
				this.val = val
			}
			//= $
		}
		return new expect($)
	}
	let result = !0;
	let failed = [];
	for (var i = 0; i < callbacks.length; i++) {
		const temp = callbacks[i]($)
		if (temp == !1) {
			result = result == !0 || result == !1 ? false : result
			failed.push(i + 1)
		} else if (temp != !1 && temp != !0) {
			result = temp
		}
	}
	if (result == !1) {
		spinner.fail();
		this.data.failed += 1;
		console.log(`\nTest ${failed} failed\n`)
	}
	else if (result == !0) {
		spinner.succeed()
	}
	else {
		spinner.warn()
	}
}

test() {
	const $ = $ => {
		class expect {
			constructor(val) {
				this.val = val
			}
			//= ../../src/includes/functions/$
		}
		return new expect($)
	}
	let result = !0;
	let failed = [];
	for (var i = 0; i < arguments.length; i++) {
		const callback = arguments[i];
		const temp = callback($)
		if (temp == !1) {
			result = result == !0 || result == !1 ? false : result
			failed.push(i + 1)
		} else if (temp != !1 && temp != !0) {
			result = temp
		}
	}
	if (result == !1) {
		this.data.failed += 1;
		console.log(`\nTest ${failed} failed\n`)
	}
	else if (result == !0) {
		this.data.tested += 1;
	}
	else {
		this.data.warn += 1;
	}
}

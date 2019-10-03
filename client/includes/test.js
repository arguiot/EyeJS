async test() {
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
	let tothrow = [];

	for (var i = 0; i < arguments.length; i++) {
		const callback = arguments[i];
		const temp = await callback($)
		if (temp == !1 || typeof temp == 'string') {
			result = false;
			tothrow.push(temp)
			failed.push(i + 1)
		} else if (temp != !1 && temp != !0) {
			result = temp
		}
	}
	if (result == !1) {
		this.data.failed += failed.length;
		for (i = 0; i < failed.length; i++) {
			console.log(`\nTest ${failed[i]} failed: ${tothrow[i]}\n`.red)
		}
	} else if (result == !0) {
		this.data.tested += 1;
	} else {
		this.data.warn += 1;
	}
}

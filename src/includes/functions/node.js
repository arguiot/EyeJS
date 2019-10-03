async node(name, spinner, callbacks) {
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
	let tothrow = [];
	for (var i = 0; i < callbacks.length; i++) {
		const r = callbacks[i]($)
		const temp = await r
		if (temp == !1 || typeof temp == 'string') {
			result = false;
			tothrow.push(temp)
			failed.push(i + 1)
		} else if (temp != !1 && temp != !0) {
			result = temp
		}

	}
	if (result == !1) {
		spinner.fail();
		this.data.failed += 1;
		console.group();
		for (i = 0; i < failed.length; i++) {
			console.log(`\nTest ${failed[i]} failed: ${tothrow[i]}\n`.red)
		}
		console.groupEnd();
	} else if (result == !0) {
		spinner.succeed()
	} else {
		spinner.warn()
	}
}

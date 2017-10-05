class EyeJS {
	constructor() {
		this.data = {
			"tested": 0,
			"failed": 0,
			"warn": 0,
			"result": 0
		};
	}
	done() {
		this.data.result = this.data.failed == 0 ? 1 : 0;
		this.data.result = this.data.warn == 0 ? this.data.result : 3;
		const request = new XMLHttpRequest();
		request.open("GET", `/post/?result=${this.data.result}&failed=${this.data.failed}`, true);
		request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
		request.onload = () => {
			if (request.status >= 200 && request.status < 400) {
				const data = request.responseText;
				if (data == 'sucess') {
					window.open('','_self').close();
				}
			} else {
				console.error("EyeJS error: The ajax request loaded, but returned an error.");
			}
		};
		request.onerror = () => {
			// There was a connection error of some sort
			console.error("EyeJS error: The ajax request returned an error.");
		};
		request.send();
	}
	test() {
		const $ = $ => {
			class expect {
				constructor(val) {
					this.val = val
				}
				Equal(val) {
					return JSON.stringify(val) == JSON.stringify(this.val) ? true : false
				}
				is(type) {
					return typeof this.val == type ? true : false;
				}
				isCloseTo(actual, precision=2) {
					return Math.abs(this.val - actual) < Math.pow(10, -precision) / 2;
				}
				isTrueFor(callback) {
					return callback(this.val);
				}
				Match(val) {
					return val.test(this.val) == true ? true : false
				}
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
}
const eye = new EyeJS();
get case() {
	class expect {
		constructor(val) {
			this.val = val;
		}
		toBe(val) {
			return val === this.val ? true : false;
		}
	}
	return new expect;
}

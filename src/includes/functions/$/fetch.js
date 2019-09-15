fetch(callback) {
	const fetch = (url) => new Promise((resolve, reject) => {
		get(url, (res) => {
				let data = '';
				res.on('end', () => resolve(data));
				res.on('data', (buf) => data += buf.toString());
			})
			.on('error', e => reject(e));
	})
	return new Promise(function(resolve, reject) {
		fetch(this.val).then(data => {
			resolve(callback(data))
		})
	});
}

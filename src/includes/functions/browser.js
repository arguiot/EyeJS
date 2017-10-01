browser(name, spinner, file) {
	//create a server object:
	http.createServer((req, res) => {
		const chunks = [];
		request.on('data', chunk => chunks.push(chunk));
		request.on('end', () => {
			const data = JSON.parse(Buffer.concat(chunks));
			const result = data.status;
			const failed = data.failed;
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
		});
		fs.readFile(file, (err, data) => {
			res.writeHead(200, {'Content-Type': 'text/html'});
			res.write(data)
			res.end()
		});
	}).listen(8080); //the server object listens on port 8080
	open.open("http://localhost:8080")
}

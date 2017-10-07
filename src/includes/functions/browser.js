browser(name, spinner, file) {
	// use express
	const app = express();
	const server = app.listen(3000, function () {
		open.open("http://localhost:3000");
	})
	app.get('/', function (req, res) {
		fs.readFile(path.isAbsolute(file[0]) ? file[0] : process.cwd() + "/" + file[0], (err, data) => {
			res.send(data.toString('utf8'));
		});
	})
	app.get('/post/', function (req, res) {
		const result = req.query.result;
		const failed = req.query.failed;
		if (result == 0) {
			spinner.fail();
			// failed += 1;
			console.group();
			console.log(`\nTest ${failed} failed\n`.red)
			console.groupEnd();
			// console.log(this.data);
		}
		else if (result == 1) {
			spinner.succeed()
		}
		else {
			spinner.warn()
		}
		res.send("sucess")
		server.close();
	});
	app.get('/js/', (req, res) => {
		fs.readFile(__dirname + "/../dist/client.js", (err, data) => {
			res.send(data.toString('utf8'));
		});
	});
}

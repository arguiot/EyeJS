browser(name, spinner, file) {
	return new Promise((resolve, reject) => {
		if (process.env.ENV == "CI" || process.env.CI == true) {
			spinner.warn();
			console.group();
			console.log(`\nCan't run browser tests on CI.\n`.red)
			console.groupEnd();
		} else if (parseInt(process.version.split("v")[1].split(".")[0]) < 8) {
			spinner.warn();
			console.group();
			console.log(`\nCan't run browser tests on NodeJS ${process.version}.\n`.red)
			console.groupEnd();
		} else {
			// use express
			const app = express();
			const server = app.listen(3000, () => {
				open.open("http://localhost:3000");
			})
			app.get('/', (req, res) => {
				fs.readFile(path.isAbsolute(file[0]) ? file[0] : `${process.cwd()}/${file[0]}`, (err, data) => {
					res.send(data.toString('utf8'));
				});
			})
			let fail = 0;
			app.get('/post/', (req, res) => {
				const result = req.query.result;
				const failed = req.query.failed;
				if (result == 0) {
					fail += 1;
					spinner.fail();
					// failed += 1;
					console.group();
					console.log(`\n${failed} test(s) failed\n`.red)
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
				server.close(() => {
					resolve(fail)
				});
			});
			app.use('/static', express.static(path.dirname(`${path.dirname(file[0])}/../`)));
			app.get('/eyejs/', (req, res) => {
				fs.readFile(`${__dirname}/../dist/client.js`, (err, data) => {
					res.send(data.toString('utf8'));
				});
			});
		}
	});
}

test(name, type="node", callback) {
	this.data.tested += 1;
	const spinner = ora(name).start();
	return type == "browser" ? this.browser(name, callback, spinner) : this.node(name, callback, spinner);
}

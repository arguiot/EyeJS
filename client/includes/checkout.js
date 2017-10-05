checkout() {
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

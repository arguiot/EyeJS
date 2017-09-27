const eye = require("./eye.js");

eye.test("Test 1", "node", ($) => {

})
eye.test("Test 2", "node", $ =>
	$(true).toBe(true)
)
eye.test("Test 3", "node", ($) => {
	return true;
})

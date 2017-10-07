eye.test("Test", "node",
	$ => $(1+2+3+4+5).Equal((5**2+5)/2)
);

// eye.test("Browser", "browser", path.join(testFileDir, "index.html"))

eye.test("Test2", "node",
	$ => !$(true).Equal(false)
);
function sum(a, b) {
	return a + b
}

eye.test("Sum", "node",
	$ => $(sum(1, 2)).Equal(3),
	$ => $(sum(0.2, 0.4)).isCloseTo(0.6, 1)
)

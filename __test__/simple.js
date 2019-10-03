eye.describe("Node tests", () => {
  eye.test("Test", "node", $ => $(1 + 2 + 3 + 4 + 5).Equal((5*5 + 5) / 2));
  eye.test("Test2", "node", $ => $(true).Equal(false, false));
  function sum(a, b) {
    return a + b;
  }
  eye.test(
    "Sum",
    "node",
    $ => $(sum(1, 2)).Equal(3),
    $ => $(sum(0.2, 0.4)).isCloseTo(0.6, 1)
  );
});
eye.test("isClose", "node",
    $ => $(0.2 + 0.4).isCloseTo(0.6, 1),
    $ => $(10).isCloseTo(11, -1)
)
eye.test("property", "node",
	$ => $({
    	a: "Hello"
    }).hasProperty("a")
)
eye.test("Performances", "node",
	$ => $(() => {
		let a = 1
		for (var i = 0; i < 1000; i++) {
			a += i
		}
	}).perf(1) // shouldn't run in more than 1 ms
)
eye.test("Browser", "browser", __testDir + "index.html");

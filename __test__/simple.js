eye.describe("Node tests", () => {
  eye.test("Test", "node", $ => $(1 + 2 + 3 + 4 + 5).Equal((5*5 + 5) / 2));
  eye.test("Test2", "node", $ => !$(true).Equal(false));
  function sum(a, b) {
    return a + b;
  }
  eye.test("Browser", "browser", __testDir + "index.html");
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

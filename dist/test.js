// const eye = require("./eye.js");
//
// const $ = require("display.js");
//
// var aDay = 24 * 60 * 60 * 1000;
// eye.test("Math Part", "node",
// 	expect => expect($.extend({"a": 1, "b": 3}, {"a": 2, "c": 6})).Equal({"a": 2, "b": 3, "c": 6}),
// 	expect => expect($.linespace(0, 20, 10)).Equal([ 0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20 ]),
// 	expect => expect($.reshape($.range(5), 2)).Equal([ [ 0, 1 ], [ 2, 3 ], [ 4, 5 ] ]),
// 	expect => expect($.flatten([ [ 0, 1 ], [ 2, 3 ], [ 4, 5 ] ])).Equal($.range(5)),
// 	// expect => expect($.drop($.range(5), -1)).Equal($.range(4)), //
// 	expect => expect($.rmFromArray($.range(10), a => a % 2 == 0)).Equal([ 1, 3, 5, 7, 9 ]),
// 	expect => expect($.time_ago(new Date(Date.now() - aDay))).Match(/Yesterday/),
// 	expect => expect($.sum($.range(100))).Equal(5050),
// 	// expect => expect($.multiply($.arange(1, 5, 1))).Equal(120), //
// 	expect => expect($.average([53, 9, 8, 37, 4])).Equal(22.2),
// 	expect => expect($.median([53, 9, 8, 37, 4])).Equal(9),
// 	expect => expect($.predict([[1,3],[2,5],[3,7]], 4)).Equal(9),
// 	expect => expect($.math.mul($.math.div(1, 3), 6)).Equal(2),
// 	expect => expect($.math.add(0.2, 0.4)).Equal(0.6)
// );
// eye.test("test", "browser", "")
const eye = require("./eye.js");

eye.test("Test", "node",
	$ => $(1+2+3+4+5).Equal((5**2+5)/2)
);

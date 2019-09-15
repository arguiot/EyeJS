class EyeJS {
  constructor() {
    this.data = {
      tested: 0,
      failed: 0,
      warn: 0,
      result: 0
    };
  }
  checkout() {
    this.data.result = this.data.failed == 0 ? 1 : 0;
    this.data.result = this.data.warn == 0 ? this.data.result : 3;
    const request = new XMLHttpRequest();
    request.open(
      "GET",
      `/post/?result=${this.data.result}&failed=${this.data.failed}`,
      true
    );
    request.setRequestHeader(
      "Content-Type",
      "application/x-www-form-urlencoded; charset=UTF-8"
    );
    request.onload = () => {
      if (request.status >= 200 && request.status < 400) {
        const data = request.responseText;
        if (data == "sucess") {
          window.open("", "_self").close();
        }
      } else {
        console.error(
          "EyeJS error: The ajax request loaded, but returned an error."
        );
      }
    };
    request.onerror = () => {
      // There was a connection error of some sort
      console.error("EyeJS error: The ajax request returned an error.");
    };
    request.send();
  }
  test() {
    const $ = $ => {
      class expect {
        constructor(val) {
          this.val = val;
        }
        Equal(val, not) {
          return new Promise((resolve, reject) => {
            if (
              (JSON.stringify(val) == JSON.stringify(this.val) &&
                not != false) ||
              (not == false && JSON.stringify(val) != JSON.stringify(this.val))
            ) {
              resolve(true);
            } else {
              resolve(`${this.val} isn't equal to ${val}`);
            }
          });
        }
        fetch(callback) {
          const fetch = url =>
            new Promise((resolve, reject) => {
              get(url, res => {
                let data = "";
                res.on("end", () => resolve(data));
                res.on("data", buf => (data += buf.toString()));
              }).on("error", e => reject(e));
            });
          return new Promise((resolve, reject) => {
            fetch(this.val).then(data => {
              resolve(callback(data));
            });
          });
        }
        hasProperty(name, not) {
          return new Promise((resolve, reject) => {
            if (
              (this.val.hasOwnProperty(name) && not != false) ||
              (not == false && !this.val.hasOwnProperty(name))
            ) {
              resolve(true);
            } else {
              resolve(`${this.val} doesn't have '${name}' as property`);
            }
          });
        }
        includes(val, not) {
          return new Promise((resolve, reject) => {
            if (
              (this.val.includes(val) && not != false) ||
              (not == false && !this.val.includes(val))
            ) {
              resolve(true);
            } else {
              resolve(`${this.val} doesn't includes ${val}`);
            }
          });
        }
        is(type, not) {
          return new Promise((resolve, reject) => {
            if (
              (typeof this.val == type && not != false) ||
              (not == false && typeof this.val != type)
            ) {
              resolve(true);
            } else {
              resolve(`${this.val} isn't a ${type}`);
            }
          });
        }
        isCloseTo(actual, precision = 2, not) {
          return new Promise((resolve, reject) => {
            if (
              (Math.abs(this.val - actual) < Math.pow(10, -precision) / 2 &&
                not != false) ||
              (not == false &&
                !(Math.abs(this.val - actual) < Math.pow(10, -precision) / 2))
            ) {
              resolve(true);
            } else {
              resolve(
                `${
                  this.val
                } isn't close to ${actual}, with a precision of ${precision}`
              );
            }
          });
        }
        isLarger(val, not) {
          return new Promise((resolve, reject) => {
            if (
              (this.val > val && not != false) ||
              (not == false && !(this.val > val))
            ) {
              resolve(true);
            } else {
              resolve(`${this.val} isn't larger than ${val}`);
            }
          });
        }
        isSmaller(val, not) {
          return new Promise((resolve, reject) => {
            if (
              (this.val < val && not != false) ||
              (not == false && !(this.val < val))
            ) {
              resolve(true);
            } else {
              resolve(`${this.val} isn't smaller than ${val}`);
            }
          });
        }
        isTrueFor(callback, not) {
          return new Promise((resolve, reject) => {
            if (
              (callback(this.val) && not != false) ||
              (not == false && !callback(this.val))
            ) {
              resolve(true);
            } else {
              resolve(`${this.val} isn't true for ${callback}`);
            }
          });
        }
        length(val, not) {
          return new Promise((resolve, reject) => {
            if (
              (this.val.length == val && not != false) ||
              (not == false && this.val.length != val)
            ) {
              resolve(true);
            } else {
              resolve(`${this.val} doesn't have for length ${val}`);
            }
          });
        }
        Match(val, not) {
          return new Promise((resolve, reject) => {
            if (
              (val.test(this.val) && not != false) ||
              (not == false && !val.test(this.val))
            ) {
              resolve(true);
            } else {
              resolve(`${this.val} doesn't match ${val}`);
            }
          });
        }
        perf(ms, not) {
          return new Promise((resolve, reject) => {
            try {
              const start = process.hrtime();
              for (var i = 0; i < 15; i++) {
                this.val();
              }
              const end = process.hrtime(start);
              const time = Math.round(end[0] * 1000 + end[1] / 1000000);
              const average = time / 15;
              if (ms < average) {
                resolve(not == true ? false : true);
              } else {
                resolve(
                  `Your function runs in approximately ${average}ms, which is superior to ${ms}ms`
                );
              }
            } catch (e) {
              resolve(not == false ? true : false);
            }
          });
        }
        toRun(not) {
          return new Promise((resolve, reject) => {
            try {
              this.val();
            } catch (e) {
              resolve(not == false ? true : false);
            }
            resolve(not == false ? false : true);
          });
        }
        visual(not) {
          return new Promise((resolve, reject) => {
            this.val instanceof Element ? this.val.scrollIntoView() : null;
            resolve(
              not == false
                ? !window.confirm("EyeJS - Is everything alright?")
                : window.confirm("EyeJS - Is everything alright?")
            );
          });
        }
      }
      return new expect($);
    };
    let result = !0;
    let failed = [];
    let tothrow = [];
    for (var i = 0; i < arguments.length; i++) {
      const callback = arguments[i];
      callback($).then(temp => {
        if (temp == !1 || typeof temp == "string") {
          result = false;
          tothrow.push(temp);
          failed.push(i + 1);
        } else if (temp != !1 && temp != !0) {
          result = temp;
        }
      });
    }
    if (result == !1) {
      this.data.failed += failed.length;
      for (i = 0; i < failed.length; i++) {
        console.log(`\nTest ${failed[i]} failed: ${tothrow[i]}\n`.red);
      }
    } else if (result == !0) {
      this.data.tested += 1;
    } else {
      this.data.warn += 1;
    }
  }
}
const eye = new EyeJS();

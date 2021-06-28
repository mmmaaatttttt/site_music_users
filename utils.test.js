const { shout } = require("./utils");

describe("shout", () => {
  it("uppercases a string", () => {
    expect(shout("matt")).toEqual("MATT!!!");
  });

  it("handles empty strings", () => {
    expect(shout("")).toEqual("!!!");
  });
});

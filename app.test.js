const request = require("supertest");
const app = require("./app");

describe("random app routes", () => {
  it("GET / works", async () => {
    const response = await request(app).get("/");
    expect(response.statusCode).toEqual(200);
    expect(response.body).toEqual({ ping: "pong" });
  });
});

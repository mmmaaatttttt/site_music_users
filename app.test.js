const request = require("supertest");
const app = require("./app");

describe("random app routes", () => {
  it("GET / works", async () => {
    const response = await request(app).get("/");
    expect(response.statusCode).toEqual(200);
    expect(response.body).toEqual({ ping: "pong" });
  });

  it("GET /add works", async () => {
    const response = await request(app).get("/add/7/5");
    expect(response.statusCode).toEqual(200);
    expect(response.body).toEqual({ total: 7 + 5 });
  });
});

const request = require("supertest");
const app = require("../app");

describe("math routes", () => {
  it("GET /add works", async () => {
    const response = await request(app).get("/add/7/5");
    expect(response.statusCode).toEqual(200);
    expect(response.body).toEqual({ total: 7 + 5 });
  });

  it("GET /multiply works", async () => {
    const response = await request(app).get("/multiply/7/5");
    expect(response.statusCode).toEqual(200);
    expect(response.body).toEqual({ total: 7 * 5 });
  });

  it("GET /subtract works", async () => {
    const response = await request(app).get("/subtract/7/5");
    expect(response.statusCode).toEqual(200);
    expect(response.body).toEqual({ total: 7 - 5 });
  });
});

const request = require("supertest");
const app = require("../app");

describe("artist routes", () => {
  it("GET /artists works", async () => {
    const response = await request(app).get("/artists");
    expect(response.statusCode).toEqual(200);
    expect(response.body.artists).toContainEqual({
      id: 1,
      name: "BADBADNOTGOOD"
    });
  });

  it("POST /artists works", async () => {
    const artistsResponse = await request(app).get("/artists");
    const numArtists = artistsResponse.body.artists.length;

    const response = await request(app).post("/artists").send({ name: "test" });
    expect(response.statusCode).toEqual(201);
    expect(response.body.artist.name).toEqual("test");

    const secondArtistsResponse = await request(app).get("/artists");
    expect(secondArtistsResponse.body.artists.length).toEqual(numArtists + 1);
  });
});

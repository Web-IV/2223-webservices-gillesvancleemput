const createServer = require("../../src/createServer");
const supertest = require("supertest");
const { tables } = require("../../src/data/index");
const { getKnex } = require("../../src/data/index");
const { withServer } = require("../helpers");

const data = {
  user: [
    {
      userId: "1",
      name: "van cleemput",
      voornaam: "gilles",
      email: "gilles@gmail.com",
      straat: "straat",
      huisnummer: "1",
      postcode: "9000",
      gemeente: "Gent",
      auth0id: "google-oauth2|116459538618082009237",
      rol: "admin",
    },
    {
      userId: "d55407d8-7495-4d93-99b3-a45246f842ec",
      name: "van cleemput",
      voornaam: "mattis",
      email: "mattis@gmail.com",
      straat: "straat",
      huisnummer: "1",
      postcode: "9000",
      gemeente: "Gent",
      auth0id: "google-oauth2|106578054156971262292",
      rol: "user",
    },
    {
      userId: "e5f5dcc0-3103-45dc-a6d9-8313ead3cdba",
      name: "lammens",
      voornaam: "yasmine",
      email: "yasmine@gmail.com",
      straat: "straat",
      huisnummer: "1",
      postcode: "9000",
      gemeente: "Gent",
      auth0id: "auth0|60f1f1b1b0b2f4006a1b0b1b",
      rol: "user",
    },
  ],
};

const dataToDelete = {
  user: [
    "1",
    "d55407d8-7495-4d93-99b3-a45246f842ec",
    "e5f5dcc0-3103-45dc-a6d9-8313ead3cdba",
  ],
};

describe("user", () => {
  let server;
  let request;
  let knex;
  let authHeader;

  withServer(({ knex: k, request: r, authHeader: a }) => {
    knex = k;
    request = r;
    authHeader = a;
  });

  const url = "/api/User";
  describe("GETbyAuth0Id api/menu", () => {
    beforeAll(async () => {
      await knex(tables.user).insert(data.user);
    });
    afterAll(async () => {
      await knex(tables.user).whereIn("userId", dataToDelete.user).delete();
    });
    it("should return 200 and 1 user", async () => {
      const response = await request
        .get(`${url}/google-oauth2|116459538618082009237`)
        .set("Authorization", authHeader);
      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        userId: "1",
        name: "van cleemput",
        voornaam: "gilles",
        email: "gilles@gmail.com",
        straat: "straat",
        huisnummer: "1",
        postcode: "9000",
        gemeente: "Gent",
        auth0id: "google-oauth2|116459538618082009237",
        rol: "admin",
      });
    });
    it("should return 400 validation failed", async () => {
      const response = await request
        .get(`${url}/google-oauth2|116459`)
        .set("Authorization", authHeader);
      expect(response.status).toBe(500);
    });
  });
  describe("check for user api/menu", () => {
    beforeAll(async () => {
      await knex(tables.user).insert(data.user);
    });
    afterAll(async () => {
      await knex(tables.user).whereIn("userId", dataToDelete.user).delete();
    });
    it("should return 200 and true or false", async () => {
      const response = await request
        .get(`${url}/check/google-oauth2|116459538618082009237`)
        .set("Authorization", authHeader);
      expect(response.status).toBe(200);
    });
    it("should return 400 validation failed", async () => {
      const response = await request
        .get(`${url}/check/`)
        .set("Authorization", authHeader);
      expect(response.status).toBe(500);
    });
  });
  describe("put api/menu", () => {
    beforeAll(async () => {
      await knex(tables.user).insert(data.user);
    });
    afterAll(async () => {
      await knex(tables.user).whereIn("userId", dataToDelete.user).delete();
    });
    it("should return 200 and 1 user", async () => {
      const response = await request
        .put(`${url}/yasmine@gmail.com`)
        .send({
          straat: "destelberge",
          huisnummer: "8348",
          postcode: "9820",
          gemeente: "merelebeke",
        })
        .set("Authorization", authHeader);
      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        straat: "destelberge",
        huisnummer: "8348",
        postcode: "9820",
        gemeente: "merelebeke",
      });
    });
    it("the validation should not be succesful", async () => {
      const response = await request
        .put(`${url}/yasmine@gmail.com`)
        .send({
          straat: "destelberge",
        })
        .set("Authorization", authHeader);
      expect(response.status).toBe(400);
    });
  });
});

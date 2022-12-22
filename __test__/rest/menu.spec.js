const createServer = require("../../src/createServer");
const supertest = require("supertest");
const { tables } = require("../../src/data/index");
const { getKnex } = require("../../src/data/index");
const { withServer } = require("../helpers");

const data = {
  menu: [
    {
      itemId: "00d1535a-b152-4d6c-bd50-b5d408f98948",
      naam: "Wacko Burger",
      prijs: 14,
      type: "Burgers & Wraps",
      beschrijving: "vegan chicken, avocado, tomato, red onion, corn",
    },
    {
      itemId: "097c33bf-01dd-4ae6-ad5c-73ef1630f0de",
      naam: "ShoarMama Burger",
      prijs: 14,
      type: "Burgers & Wraps",
      beschrijving:
        "vegan shoarma, mixed salad, pomegranate, red onion, beetroot",
    },
    {
      itemId: "0ea6daae-45f0-4586-97c7-537aeab87c07",
      naam: "Wacko Wrap",
      prijs: 13,
      type: "Burgers & Wraps",
      beschrijving: "vegan chicken, avocado, tomato, red onion, corn",
    },
    {
      itemId: "0f8c92a2-2290-459c-b094-12a48a27f925",
      naam: "Shoarma Mama Wrap",
      prijs: 13,
      type: "Burgers & Wraps",
      beschrijving:
        "vegan shoarma, mixed salad, pomegranate, red onion, beetroot",
    },
  ],
};

const dataToDelete = {
  menu: [
    "00d1535a-b152-4d6c-bd50-b5d408f98948",
    "097c33bf-01dd-4ae6-ad5c-73ef1630f0de",
    "0ea6daae-45f0-4586-97c7-537aeab87c07",
    "0f8c92a2-2290-459c-b094-12a48a27f925",
  ],
};

describe("menu", () => {
  let server;
  let request;
  let knex;
  let authHeader;

  withServer(({ knex: k, request: r, authHeader: a }) => {
    knex = k;
    request = r;
    authHeader = a;
  });

  const url = "/api/menu";
  describe("GET api/menu", () => {
    beforeAll(async () => {
      await knex(tables.menu).insert(data.menu);
    });
    afterAll(async () => {
      await knex(tables.menu).whereIn("itemId", dataToDelete.menu).delete();
    });
    it("should return 200 and all transactions", async () => {
      const response = await request.get(url).set("Authorization", authHeader);
      expect(response.status).toBe(200);
      expect(response.body).toEqual({ items: data.menu });
    });
  });
  describe("POST api/menu", () => {
    const menuItemsToDelete = [];
    beforeAll(async () => {
      await knex(tables.menu).insert(data.menu);
    });
    afterAll(async () => {
      await knex(tables.menu).whereIn("itemId", menuItemsToDelete).delete();
      await knex(tables.menu).whereIn("itemId", dataToDelete.menu).delete();
    });
    it("should return 200 and the created transaction", async () => {
      const response = await request
        .post(url)
        .send({ naam: "test", prijs: 13, type: "test", beschrijving: "test" })
        .set("Authorization", authHeader);
      expect(response.status).toBe(201);
      expect(response.body.naam).toBe("test");
      expect(response.body.prijs).toBe(13);
      expect(response.body.type).toBe("test");
      expect(response.body.beschrijving).toBe("test");
      menuItemsToDelete.push(response.body.itemId);
    });
    it("should return 400 when naam is missing", async () => {
      const response = await request
        .post(url)
        .send({ prijs: 13, type: "test", beschrijving: "test" })
        .set("Authorization", authHeader);
      expect(response.status).toBe(400);
    });
  });
  describe("PUT api/menu", () => {
    const menuItemsToDelete = [];
    beforeAll(async () => {
      await knex(tables.menu).insert(data.menu);
    });
    afterAll(async () => {
      await knex(tables.menu).whereIn("itemId", menuItemsToDelete).delete();
      await knex(tables.menu).whereIn("itemId", dataToDelete.menu).delete();
    });
    it("should return 200 and the updated transaction", async () => {
      const response = await request
        .put(`${url}/0f8c92a2-2290-459c-b094-12a48a27f925`)
        .send({ naam: "test", prijs: 13, type: "test", beschrijving: "test" })
        .set("Authorization", authHeader);
      expect(response.status).toBe(200);
      expect(response.body.naam).toBe("test");
      expect(response.body.prijs).toBe(13);
      expect(response.body.type).toBe("test");
      expect(response.body.beschrijving).toBe("test");
      menuItemsToDelete.push(response.body.itemId);
    });
    it("should return 400 when naam is missing", async () => {
      const response = await request
        .put(`${url}/0f8c92a2-2290-459c-b094-12a48a27f925`)
        .send({ prijs: 13, type: "test", beschrijving: "test" })
        .set("Authorization", authHeader);
      expect(response.status).toBe(400);
    });
  });
  describe("DELETE api/menu", () => {
    beforeAll(async () => {
      await knex(tables.menu).insert(data.menu);
    });
    afterAll(async () => {
      await knex(tables.menu).whereIn("itemId", dataToDelete.menu).delete();
    });
    it("should return 200 and the deleted transaction", async () => {
      const response = await request
        .delete(`${url}/0f8c92a2-2290-459c-b094-12a48a27f925`)
        .set("Authorization", authHeader);
      expect(response.status).toBe(204);
      expect(response.body).toEqual({});
    });
    it("should return 400 when the validation is not complete", async () => {
      const response = await request
        .delete(`${url}/0f8`)
        .set("Authorization", authHeader);
      expect(response.status).toBe(400);
    });
  });
});

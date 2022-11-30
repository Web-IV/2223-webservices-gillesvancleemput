const createServer = require('../../src/createServer');
const supertest = require('supertest');
const {tables} = require('../../src/data/index');
const {getKnex} = require('../../src/data/index');

const data = {
	menu:[
        {itemId: '00d1535a-b152-4d6c-bd50-b5d408f98948', naam: 'Wacko Burger', prijs: 14, type: 'Burgers & Wraps', beschrijving: 'vegan chicken, avocado, tomato, red onion, corn'},
        {itemId: '097c33bf-01dd-4ae6-ad5c-73ef1630f0de', naam: 'ShoarMama Burger', prijs: 14, type: 'Burgers & Wraps', beschrijving: 'vegan shoarma, mixed salad, pomegranate, red onion, beetroot'},
        {itemId: '0ea6daae-45f0-4586-97c7-537aeab87c07', naam: 'Wacko Wrap', prijs: 13, type: 'Burgers & Wraps', beschrijving: 'vegan chicken, avocado, tomato, red onion, corn'},
        {itemId: '0f8c92a2-2290-459c-b094-12a48a27f925', naam: 'Shoarma Mama Wrap', prijs: 13, type: 'Burgers & Wraps', beschrijving: 'vegan shoarma, mixed salad, pomegranate, red onion, beetroot'}],
	
	bestelling:[
        {bestellingId: "3c6b283a-491d-4152-8197-355e598216dd", userId: 'f98b5c03-8589-4b04-8977-1edd0a931bd9'},
        {bestellingId: '56cab40e-3b28-4043-8280-8e62d7ce7dd3', userId: '8e99e823-7270-475a-beaf-997afcabf5c4'},
        {bestellingId: '8ae089d4-bd01-4135-b5a2-dfc9edbf79d7', userId: 'e5f5dcc0-3103-45dc-a6d9-8313ead3cdba'}],
    user:[
        {id: "8e99e823-7270-475a-beaf-997afcabf5c4", naam: 'van cleemput', voornaam: 'gilles', email: 'gilles@gmail.com'},
        {id: "d55407d8-7495-4d93-99b3-a45246f842ec", naam: 'van cleemput', voornaam: 'mattis', email: 'mattis@gmail.com'},
        {id: "e5f5dcc0-3103-45dc-a6d9-8313ead3cdba", naam: 'lammens', voornaam: 'yasmine', email: 'yasmine@gmail.com'}],
    bestellingItem:[
        {bestellingId: "3c6b283a-491d-4152-8197-355e598216dd", itemId: "0f8c92a2-2290-459c-b094-12a48a27f925", aantal: 7},
        {bestellingId: "3c6b283a-491d-4152-8197-355e598216dd", itemId: "83cbe74d-0d2e-426f-bcec-8c9b78ce1c3d", aantal: 2},
        {bestellingId: "3c6b283a-491d-4152-8197-355e598216dd", itemId: "d45979ca-fd2b-428f-b5c7-56ed3cd41fb7", aantal: 1}]
};

const dataToDelete = {
	menu:["00d1535a-b152-4d6c-bd50-b5d408f98948", "097c33bf-01dd-4ae6-ad5c-73ef1630f0de", "0ea6daae-45f0-4586-97c7-537aeab87c07", "0f8c92a2-2290-459c-b094-12a48a27f925"],
	bestelling: ["3c6b283a-491d-4152-8197-355e598216dd", "56cab40e-3b28-4043-8280-8e62d7ce7dd3", "8ae089d4-bd01-4135-b5a2-dfc9edbf79d7"],
	user : ["8e99e823-7270-475a-beaf-997afcabf5c4", "d55407d8-7495-4d93-99b3-a45246f842ec", "e5f5dcc0-3103-45dc-a6d9-8313ead3cdba"],
    bestellingItem : ["3c6b283a-491d-4152-8197-355e598216dd", "56cab40e-3b28-4043-8280-8e62d7ce7dd3", "8ae089d4-bd01-4135-b5a2-dfc9edbf79d7"]
};

describe("menu",()=>{
    let server;
    let request;
    let knex;
    beforeAll(async()=>{
        server = await createServer();
        request = supertest(server.getApp().callback());
        knex = getKnex();
    });
    afterAll(async()=>{
        await server.stop();
    });
    const url = '/api/menu';
    describe("GET api/menu",()=>{
        beforeAll(async()=>{
            await knex(tables.menu).insert(data.menu);
        });
        afterAll(async()=>{
            await knex(tables.menu).whereIn('itemId',dataToDelete.menu).delete();
        });
        it("should return 200 and all transactions",async()=>{
            const response = await request.get(url);
            expect(response.status).toBe(200);
            expect(response.body).toEqual({"items": data.menu});
        });
    });
    describe("POST api/menu",()=>{
        const menuItemsToDelete =[];
        beforeAll(async()=>{
            await knex(tables.menu).insert(data.menu);
        });
        afterAll(async()=>{
            await knex(tables.menu).whereIn('itemId',menuItemsToDelete).delete();
            await knex(tables.menu).whereIn('itemId',dataToDelete.menu).delete();
        });
        it("should return 200 and the created transaction",async()=>{
            const response = await request.post(url).send(
                {naam: 'test', prijs: 13, type: 'test', beschrijving: 'test'}
            );
            expect(response.status).toBe(201);
            expect(response.body.naam).toBe('test');
            expect(response.body.prijs).toBe(13);
            expect(response.body.type).toBe('test');
            expect(response.body.beschrijving).toBe('test');
            menuItemsToDelete.push(response.body.itemId);
        });
    });
    describe("PUT api/menu",()=>{
        const menuItemsToDelete =[];
        beforeAll(async()=>{
            await knex(tables.menu).insert(data.menu);
        });
        afterAll(async()=>{
            await knex(tables.menu).whereIn('itemId',menuItemsToDelete).delete();
            await knex(tables.menu).whereIn('itemId',dataToDelete.menu).delete();
        });
        it("should return 200 and the updated transaction",async()=>{
            const response = await request.put(`${url}/0f8c92a2-2290-459c-b094-12a48a27f925`).send(
                {naam: 'test', prijs: 13, type: 'test', beschrijving: 'test'}
            );
            expect(response.status).toBe(200);
            expect(response.body.naam).toBe('test');
            expect(response.body.prijs).toBe(13);
            expect(response.body.type).toBe('test');
            expect(response.body.beschrijving).toBe('test');
            menuItemsToDelete.push(response.body.itemId);
        });
    });
    describe("DELETE api/menu",()=>{
        beforeAll(async()=>{
            await knex(tables.menu).insert(data.menu);
        });
        afterAll(async()=>{
            await knex(tables.menu).whereIn('itemId',dataToDelete.menu).delete();
        });
        it("should return 200 and the deleted transaction",async()=>{
            const response = await request.delete(`${url}/0f8c92a2-2290-459c-b094-12a48a27f925`);
            expect(response.status).toBe(204);
            expect(response.body).toEqual({});
        });
    });
    

})
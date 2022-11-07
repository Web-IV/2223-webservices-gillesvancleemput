const { v4: uuidv4 } = require('uuid');
module.exports = {
	seed: async (knex) => {
		// first delete all entries
		await knex('menu').delete();

		// then add the fresh places
		await knex('menu').insert([
            {itemId: '00d1535a-b152-4d6c-bd50-b5d408f98948', naam: 'Wacko Burger', prijs: 14, type: 'Burgers & Wraps', beschrijving: 'vegan chicken, avocado, tomato, red onion, corn'},
            {itemId: '097c33bf-01dd-4ae6-ad5c-73ef1630f0de', naam: 'Shoarma Mama Burger', prijs: 14, type: 'Burgers & Wraps', beschrijving: 'vegan shoarma, mixed salad, pomegranate, red onion, beetroot'},
            {itemId: '0ea6daae-45f0-4586-97c7-537aeab87c07', naam: 'Wacko Wrap', prijs: 13, type: 'Burgers & Wraps', beschrijving: 'vegan chicken, avocado, tomato, red onion, corn'},
            {itemId: '0f8c92a2-2290-459c-b094-12a48a27f925', naam: 'Shoarma Mama Wrap', prijs: 13, type: 'Burgers & Wraps', beschrijving: 'vegan shoarma, mixed salad, pomegranate, red onion, beetroot'},
            {itemId: '25c6b2d0-7b9a-400a-b17f-709b38ad2e80', naam: 'Tuna Bowl', prijs: 12, type: 'Sushibowls', beschrijving: 'vegan tuna, avocado, red onion, edame,lettuce, nori, crispy onion'},
            {itemId: '30a1163b-c28d-4893-8949-6b1609ff6232', naam: 'Salmon Bowl', prijs: 12, type: 'Sushibowls', beschrijving: 'vegan salmon, avocado, red onion, edame,lettuce, nori, crispy onion'},
            {itemId: '624acc36-a292-49a4-b435-bf79d96a89a6', naam: 'bacon', prijs: 1.5, type: 'To Add', beschrijving: ''},   
            {itemId: '67f704af-e2cf-4d97-909c-aab58728b7f7', naam: 'Crushed Wasabi', prijs: 1.25, type: 'To Add', beschrijving: ''},   
            {itemId: '69a7595f-3b04-4956-bb5b-7e001410e8b5', naam: 'Crushed Pistache', prijs: 1.25, type: 'To Add', beschrijving: ''},   
            {itemId: '6c7247e5-9b3d-4916-8fa8-b5acd7077f43', naam: 'Crispy Onion', prijs: 1.25, type: 'To Add', beschrijving: ''},   
            {itemId: '83cbe74d-0d2e-426f-bcec-8c9b78ce1c3d', naam: 'Water Still', prijs: 2.5, type: 'Drinks', beschrijving: ''},   
            {itemId: '8bb6db07-7b62-4bfe-992c-ddffc3a18efa', naam: 'Water Sparkling', prijs: 2.5, type: 'Drinks', beschrijving: ''},  
            {itemId: '8e171c7e-07ed-4d1d-9924-40654580b798', naam: 'Soda', prijs: 3, type: 'Drinks', beschrijving: ''}, 
            {itemId: '9f3f438a-c11a-49b7-bcc5-a7f71f64b070', naam: 'Beer', prijs: 3.5, type: 'Drinks', beschrijving: ''}, 
            {itemId: 'b47f8d09-50fb-4d36-a007-b512dd6eb4f7', naam: 'Yugen ', prijs: 4, type: 'Drinks', beschrijving: ''}, 
            {itemId: 'bbcc801f-e388-416d-b0b6-0445374c83e8', naam: 'Lokales', prijs: 4, type: 'Drinks', beschrijving: ''},
            {itemId: 'c40c2705-4547-4129-8e10-1d0493c557d4', naam: 'Sweet Chilli Mayo', prijs: 0, type: 'Sauces', beschrijving: ''},
            {itemId: 'd45979ca-fd2b-428f-b5c7-56ed3cd41fb7', naam: 'Cocktail', prijs: 0, type: 'Sauces', beschrijving: ''},
            {itemId: 'e2b6d0c8-6df2-4678-9beb-3e26b21adf70', naam: 'Wasabi Mayo', prijs: 0, type: 'Sauces', beschrijving: ''},
            {itemId: 'e8678d0e-b741-4300-a4e4-977b90d621ed', naam: 'Curry', prijs: 0, type: 'Sauces', beschrijving: ''},
            {itemId: 'ec114c5d-cb6d-41e8-985c-fe543385566b', naam: 'Shrimps ', prijs: 6, type: 'Sides', beschrijving: ''},
            {itemId: 'f9734f64-3acf-46a2-8cf9-a05df27608ac', naam: 'Sweet Patato Fries', prijs: 6, type: 'Sides', beschrijving: ''},
            {itemId: 'ffa1c41b-7d32-4cc5-b0fc-01f51bc5bd53', naam: 'Calamaresrings', prijs: 6, type: 'Sides', beschrijving: ''},     
   
        ]);
    },
};
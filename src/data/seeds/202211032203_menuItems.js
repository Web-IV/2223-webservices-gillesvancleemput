const { v4: uuidv4 } = require('uuid');
module.exports = {
	seed: async (knex) => {
		// first delete all entries
		await knex('menu').delete();

		// then add the fresh places
		await knex('menu').insert([
            {itemId: '097c33bf-01dd-4ae6-ad5c-73ef1630f0de', naam: 'burrito', prijs: 13, type: 'eten', beschrijving: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium'},
            {itemId: '0f8c92a2-2290-459c-b094-12a48a27f925', naam: 'bowl', prijs: 12, type: 'eten', beschrijving: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium'},
            {itemId: '83cbe74d-0d2e-426f-bcec-8c9b78ce1c3d', naam: 'zoete aardappel', prijs: 3, type: 'eten', beschrijving: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium'},
            {itemId: 'c40c2705-4547-4129-8e10-1d0493c557d4', naam: 'callamares', prijs: 2, type: 'eten', beschrijving: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium'},
            {itemId: 'd45979ca-fd2b-428f-b5c7-56ed3cd41fb7', naam: 'wrap', prijs: 13, type: 'eten', beschrijving: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium'},   
        ]);
    },
};
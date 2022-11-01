const { v4: uuidv4 } = require('uuid');
module.exports = {
	seed: async (knex) => {
		// first delete all entries
		await knex('user').delete();

		// then add the fresh places
		await knex('user').insert([
            {id: "8e99e823-7270-475a-beaf-997afcabf5c4", naam: 'van cleemput', voornaam: 'gilles', email: 'gilles@gmail.com'},
            {id: "d55407d8-7495-4d93-99b3-a45246f842ec", naam: 'van cleemput', voornaam: 'mattis', email: 'mattis@gmail.com'},
            {id: "e5f5dcc0-3103-45dc-a6d9-8313ead3cdba", naam: 'lammens', voornaam: 'yasmine', email: 'yasmine@gmail.com'},
            {id: "f98b5c03-8589-4b04-8977-1edd0a931bd9", naam: 'lippens', voornaam: 'bram', email: 'bram@gmail.com'},
        ]);
    },
};
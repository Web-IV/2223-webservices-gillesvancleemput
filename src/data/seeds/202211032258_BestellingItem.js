const { v4: uuidv4 } = require('uuid');
module.exports = {
	seed: async (knex) => {
		// first delete all entries
		await knex('bestellingItem').delete();

		// then add the fresh places
		await knex('bestellingItem').insert([
            {bestellingId: "3c6b283a-491d-4152-8197-355e598216dd", itemId: "0f8c92a2-2290-459c-b094-12a48a27f925", aantal: 7},
            {bestellingId: "3c6b283a-491d-4152-8197-355e598216dd", itemId: "83cbe74d-0d2e-426f-bcec-8c9b78ce1c3d", aantal: 2},
            {bestellingId: "3c6b283a-491d-4152-8197-355e598216dd", itemId: "d45979ca-fd2b-428f-b5c7-56ed3cd41fb7", aantal: 1},
            {bestellingId: "3c6b283a-491d-4152-8197-355e598216dd", itemId: "c40c2705-4547-4129-8e10-1d0493c557d4", aantal: 3},
            {bestellingId: "3c6b283a-491d-4152-8197-355e598216dd", itemId: "097c33bf-01dd-4ae6-ad5c-73ef1630f0de", aantal: 4},
           
        ]);
    },
};
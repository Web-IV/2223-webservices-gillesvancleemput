const { v4: uuidv4 } = require("uuid");
module.exports = {
  seed: async (knex) => {
    // first delete all entries
    await knex("user").delete();

    // then add the fresh places
    await knex("user").insert([
      {
        userId: "8e99e823-7270-475a-beaf-997afcabf5c4",
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
      {
        userId: "f98b5c03-8589-4b04-8977-1edd0a931bd9",
        name: "lippens",
        voornaam: "bram",
        email: "bram@gmail.com",
        straat: "straat",
        huisnummer: "1",
        postcode: "9000",
        gemeente: "Gent",
        auth0id: "auth0|60f1f1b1b0b2f4006a1b0b1b",
        rol: "user",
      },
    ]);
  },
};

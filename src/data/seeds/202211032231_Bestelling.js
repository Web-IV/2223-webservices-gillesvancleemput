const { v4: uuidv4 } = require("uuid");
module.exports = {
  seed: async (knex) => {
    // first delete all entries
    await knex("bestelling").delete();

    // then add the fresh places
    await knex("bestelling").insert([
      {
        bestellingId: "3c6b283a-491d-4152-8197-355e598216dd",
        userId: "f98b5c03-8589-4b04-8977-1edd0a931bd9",
        auth0Id: "google-oauth2|116459538618082009237",
      },
      {
        bestellingId: "56cab40e-3b28-4043-8280-8e62d7ce7dd3",
        userId: "8e99e823-7270-475a-beaf-997afcabf5c4",
        auth0Id: "google-oauth2|116459538618082009237",
      },
      {
        bestellingId: "8ae089d4-bd01-4135-b5a2-dfc9edbf79d7",
        userId: "e5f5dcc0-3103-45dc-a6d9-8313ead3cdba",
        auth0Id: "google-oauth2|116459538618082009237",
      },
      {
        bestellingId: "a460eeac-61a5-4d0a-b8f8-4752d392d3bb",
        userId: "8e99e823-7270-475a-beaf-997afcabf5c4",
        auth0Id: "google-oauth2|116459538618082009237",
      },
      {
        bestellingId: "c81b1cb1-635f-46ee-a520-6a0f42ed31b1",
        userId: "f98b5c03-8589-4b04-8977-1edd0a931bd9",
        auth0Id: "google-oauth2|106578054156971262292",
      },
      {
        bestellingId: "cdc0fad2-f723-4be6-8fed-e6b6c91a4925",
        userId: "e5f5dcc0-3103-45dc-a6d9-8313ead3cdba",
        auth0Id: "google-oauth2|106578054156971262292",
      },
      {
        bestellingId: "e0a68d73-c912-4829-a22e-bd54e606d615",
        userId: "8e99e823-7270-475a-beaf-997afcabf5c4",
        auth0Id: "google-oauth2|106578054156971262292",
      },
      {
        bestellingId: "f1a9779d-c786-4a50-ab5b-449e3878ec74",
        userId: "e5f5dcc0-3103-45dc-a6d9-8313ead3cdba",
        auth0Id: "google-oauth2|106578054156971262292",
      },
    ]);
  },
};

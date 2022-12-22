# Examenopdracht Front-end Web Development / Web Services

> Schrap hierboven wat niet past

- Student: Gilles Van Cleemput
- Studentennummer: 182542gv
- E-mailadres: gilles.vancleemput@student.hogent.be

## Vereisten

Ik verwacht dat volgende software reeds geïnstalleerd is:

- [NodeJS](https://nodejs.org)
- [Yarn](https://yarnpkg.com)
- [MySQL Community Server](https://dev.mysql.com/downloads/mysql/)
- ...

## Opstarten

To start this API, create a `.env` file in the root of this folder with this content.

```
NODE_ENV =
DATABASE_USERNAME =""
DATABASE_PASSWORD =""
AUTH_JWKS_URI =""
AUTH_AUDIENCE =""
AUTH_ISSUER =""
AUTH_USER_INFO =""
```

Update the username and password with the credentials of your local database.
Fill the AUTH requirements with the credentials of your AUTH0 API set up.
Update the NODE_ENV requirement with the production or development.

You can also extend the .env file with these configurations, only if the database host/port are different than our default.

```
DATABASE_HOST="localhost"
DATABASE_PORT=3306
```

## How to start

Run the app in development mode with `yarn start`.

Run the app in production mode with `yarn start:prod`. We then assume all necessary environment variables are set, no `.env` file is ever read with this command.

## Testen

Create a `.env.test` with a similar configuration as above (use another database).

Replace the NODE_ENV with test
also add the underneath items

```
AUTH_TEST_USER_USER_ID=""
AUTH_TEST_USER_USERNAME=""
AUTH_TEST_USER_PASSWORD=""
AUTH_TOKEN_URL=""
AUTH_CLIENT_ID=""
AUTH_CLIENT_SECRET="""
```

Fill the env file items with the credentials of your AUTH0 acount and the test user his credentials.
This is to run the tests as an admin so you can test every component of the API.

Run the tests with `yarn test`. To get coverage run `yarn test:coverage`.

## Common errors

- Modules not found errors, try this and run again:

```
yarn install
```

- Migrations failed, try dropping the existing `SinSin` database and run again

- Others: Google is your friend
